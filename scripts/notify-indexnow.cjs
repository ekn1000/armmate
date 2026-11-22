// Only public new/changed URLs. No customer messages or private data are sent.
const fs = require("node:fs");
const path = require("node:path");
const seo = require("../seo.js");
const {
  root,
  canonicalEntries,
  changedFiles,
  selectChangedEntries,
  publicationTargets,
  request,
  waitForPublication,
} = require("./discovery-utils.cjs");

const globalEndpoint = "https://api.indexnow.org/indexnow";

function ownership(directory = root) {
  const files = fs
    .readdirSync(directory)
    .filter((file) => /^[a-f0-9]{32}\.txt$/.test(file));
  if (files.length !== 1)
    throw new Error("Expected one public IndexNow ownership file");
  const key = fs.readFileSync(path.join(directory, files[0]), "utf8").trim();
  if (key !== files[0].slice(0, -4))
    throw new Error("IndexNow ownership file does not match its name");
  return { key, keyLocation: new URL(files[0], seo.baseUrl).href };
}

async function submit(
  entries,
  { endpoint = globalEndpoint, fetchImpl = fetch, directory = root } = {},
) {
  if (![globalEndpoint, "https://yandex.com/indexnow"].includes(endpoint))
    throw new Error("Unsupported IndexNow endpoint");
  const allowed = new Set(
    canonicalEntries(directory).map((entry) => entry.url),
  );
  const urls = [...new Set(entries.map((entry) => entry.url))];
  if (!urls.length || urls.some((url) => !allowed.has(url)))
    throw new Error("Submit only canonical URLs belonging to this site");
  const { key, keyLocation } = ownership(directory);
  const proof = await request(
    keyLocation,
    { headers: { "Cache-Control": "no-cache" } },
    fetchImpl,
  );
  if (!proof.ok || (await proof.text()).trim() !== key)
    throw new Error(
      "The public ownership proof is not deployed; notification cancelled",
    );
  const response = await request(
    endpoint,
    {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(seo.baseUrl).hostname,
        key,
        keyLocation,
        urlList: urls,
      }),
    },
    fetchImpl,
  );
  return {
    engine:
      endpoint === globalEndpoint ? "IndexNow participating engines" : "Yandex",
    endpoint,
    submittedAt: new Date().toISOString(),
    status: response.status,
    accepted: response.status === 200 || response.status === 202,
    pendingKeyValidation: response.status === 202,
    urlCount: urls.length,
    urls,
    ...(response.headers.get("Retry-After")
      ? { retryAfter: response.headers.get("Retry-After") }
      : {}),
  };
}

async function main(argv = process.argv.slice(2), options = {}) {
  const endpoint = options.endpoint || globalEndpoint;
  const filename =
    options.reportPath || path.join(root, "qa/indexnow-submission.json");
  const report = { endpoint, accepted: false, phase: "selection" };
  try {
    const dryRun = argv.includes("--dry-run");
    const changed = argv.includes("--changed");
    const base =
      argv.find((arg) => arg.startsWith("--since="))?.slice(8) ||
      process.env.INDEXNOW_BASE_COMMIT;
    const head = process.env.INDEXNOW_HEAD_COMMIT || "HEAD";
    const requested = argv.filter((arg) => !arg.startsWith("--"));
    if (
      argv.some(
        (arg) =>
          arg.startsWith("--") &&
          !["--changed", "--dry-run"].includes(arg) &&
          !arg.startsWith("--since="),
      )
    )
      throw new Error("Unknown discovery option");
    if (changed && requested.length)
      throw new Error("Choose changed pages or explicit paths, not both");
    if (argv.some((arg) => arg.startsWith("--since=")) && !changed)
      throw new Error("Use --changed together with --since");
    const all = canonicalEntries();
    const files = changed ? changedFiles(base, head) : [];
    const requestedUrls = requested.map(
      (url) => new URL(url, seo.baseUrl).href,
    );
    if (requestedUrls.some((url) => !all.some((entry) => entry.url === url)))
      throw new Error("Requested URL is outside the canonical sitemap");
    const entries = changed
      ? selectChangedEntries(all, files)
      : requested.length
        ? all.filter((entry) => requestedUrls.includes(entry.url))
        : all;
    Object.assign(report, {
      sourceCommit: head,
      changedMode: changed,
      urlCount: entries.length,
      urls: entries.map((entry) => entry.url),
    });
    if (!entries.length || dryRun) {
      Object.assign(report, {
        phase: "complete",
        skipped: true,
        dryRun,
        reason: dryRun
          ? "Dry run: no external request made"
          : "No canonical page or favicon changed",
      });
    } else {
      report.phase = "publication";
      await waitForPublication(publicationTargets(entries, files));
      report.phase = "submission";
      Object.assign(report, await submit(entries, { endpoint }));
      if (!report.accepted)
        throw new Error(
          `IndexNow did not accept the notification (HTTP ${report.status}); do not retry repeatedly`,
        );
      report.phase = "complete";
    }
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, JSON.stringify(report, null, 2) + "\n");
    console.log(JSON.stringify({ ...report, urls: undefined }));
    return report;
  } catch (error) {
    Object.assign(report, { accepted: false, error: error.message });
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, JSON.stringify(report, null, 2) + "\n");
    throw error;
  }
}

module.exports = { ownership, submit, main, globalEndpoint };
if (require.main === module)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
