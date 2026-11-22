const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const { DOMParser } = require("linkedom");
const seo = require("../seo.js");

const root = path.resolve(__dirname, "..");
const faviconFiles = [
  "favicon.png",
  "favicon.ico",
  "assets/favicon.svg",
  "assets/icon-192.png",
];

function canonicalEntries(directory = root) {
  const xml = new DOMParser().parseFromString(
    fs.readFileSync(path.join(directory, "sitemap.xml"), "utf8"),
    "application/xml",
  );
  const seen = new Set();
  const entries = [...xml.getElementsByTagName("loc")].map((node) => {
    const url = new URL(node.textContent);
    if (
      url.origin !== new URL(seo.baseUrl).origin ||
      url.search ||
      url.hash ||
      !url.pathname.endsWith("/") ||
      seen.has(url.href)
    )
      throw new Error("Invalid or duplicate canonical sitemap URL");
    seen.add(url.href);
    const relative = decodeURIComponent(url.pathname).slice(1) + "index.html";
    const file = path.resolve(directory, relative);
    if (!file.startsWith(directory + path.sep) || !fs.existsSync(file))
      throw new Error("Canonical page is missing from this checkout");
    return { url: url.href, relative, file };
  });
  if (!entries.length) throw new Error("The sitemap has no canonical pages");
  return entries;
}

function changedFiles(base, head = "HEAD", directory = root) {
  if (
    !base ||
    !/^[a-f0-9]{40,64}$/.test(base) ||
    !(head === "HEAD" || /^[a-f0-9]{40,64}$/.test(head))
  )
    throw new Error("Provide a full base commit SHA and a valid head commit");
  if (/^0+$/.test(base)) return null;
  try {
    execFileSync("git", ["cat-file", "-e", `${base}^{commit}`], {
      cwd: directory,
      stdio: "pipe",
    });
  } catch {
    // A force-push or first checkout may not contain the former base.
    return null;
  }
  return execFileSync(
    "git",
    ["diff", "--name-only", "--diff-filter=ACMRT", "-z", base, head, "--"],
    { cwd: directory },
  )
    .toString("utf8")
    .split("\0")
    .filter(Boolean);
}

function selectChangedEntries(entries, files) {
  if (files === null) return entries;
  const changed = new Set(files.map((file) => file.replace(/\\/g, "/")));
  const iconChanged = faviconFiles.some((file) => changed.has(file));
  return entries.filter(
    (entry) =>
      changed.has(entry.relative) ||
      (iconChanged &&
        ["/", "/en/", "/ru/"].includes(new URL(entry.url).pathname)),
  );
}

function publicationTargets(entries, files = [], directory = root) {
  return [
    ...entries,
    ...faviconFiles
      .filter((file) => files?.includes(file))
      .map((relative) => ({
        url: new URL(relative, seo.baseUrl).href,
        relative,
        file: path.join(directory, relative),
        binary: !relative.endsWith(".svg"),
      })),
  ];
}

async function request(url, options = {}, fetchImpl = fetch) {
  return fetchImpl(url, {
    ...options,
    signal: options.signal || AbortSignal.timeout(15000),
  });
}

async function mapLimit(items, limit, operation) {
  const result = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const index = next++;
        result[index] = await operation(items[index], index);
      }
    }),
  );
  return result;
}

async function waitForPublication(
  targets,
  {
    fetchImpl = fetch,
    waitMs = 300000,
    pollMs = 10000,
    log = console.log,
  } = {},
) {
  const expected = targets.map((target) => fs.readFileSync(target.file));
  const deadline = Date.now() + waitMs;
  while (true) {
    const matches = await mapLimit(targets, 4, async (target, index) => {
      try {
        const response = await request(
          target.url,
          {
            headers: {
              "User-Agent": "ARMMATE-Publication-Check",
              "Cache-Control": "no-cache",
            },
            signal: AbortSignal.timeout(
              Math.max(1, Math.min(15000, deadline - Date.now())),
            ),
          },
          fetchImpl,
        );
        if (!response.ok) return false;
        const actual = Buffer.from(await response.arrayBuffer());
        return target.binary
          ? actual.equals(expected[index])
          : actual.toString("utf8").replace(/\r\n/g, "\n") ===
              expected[index].toString("utf8").replace(/\r\n/g, "\n");
      } catch {
        return false;
      }
    });
    const count = matches.filter(Boolean).length;
    log(`Published content verified: ${count}/${targets.length}`);
    if (matches.every(Boolean)) return;
    if (Date.now() >= deadline)
      throw new Error(
        "Publication is not yet the checked content; no indexing notification was sent",
      );
    await new Promise((resolve) =>
      setTimeout(resolve, Math.min(pollMs, deadline - Date.now())),
    );
  }
}

module.exports = {
  root,
  faviconFiles,
  canonicalEntries,
  changedFiles,
  selectChangedEntries,
  publicationTargets,
  request,
  mapLimit,
  waitForPublication,
};
