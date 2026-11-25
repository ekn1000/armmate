const { test, expect } = require("@playwright/test");
const fs = require("node:fs");
const path = require("node:path");
const { parseHTML } = require("linkedom");
const seo = require("../seo.js");
const contacts = require("../site-config.js");
const {
  canonicalEntries,
  selectChangedEntries,
  waitForPublication,
  changedFiles,
  root,
} = require("../scripts/discovery-utils.cjs");
const {
  ownership,
  submit,
  globalEndpoint,
} = require("../scripts/notify-indexnow.cjs");
const {
  allowedByRobots,
  checkLive,
} = require("../scripts/check-live-search.cjs");

function publicFixture(url, options = {}) {
  const pathname = new URL(url).pathname;
  const relative =
    pathname.slice(1) + (pathname.endsWith("/") ? "index.html" : "");
  const file = path.join(root, relative);
  if (!fs.existsSync(file))
    return Promise.resolve(new Response("Not found", { status: 404 }));
  const type = relative.endsWith(".png")
    ? "image/png"
    : relative.endsWith(".ico")
      ? "image/x-icon"
      : relative.endsWith(".xml")
        ? "application/xml"
        : relative.endsWith(".txt")
          ? "text/plain"
          : "text/html";
  return Promise.resolve(
    new Response(fs.readFileSync(file), { headers: { "Content-Type": type } }),
  );
}

test("all language homepages and a deep guide declare the same stable large favicon", async ({
  request,
}) => {
  for (const route of [
    "/",
    "/en/",
    "/ru/",
    "/en/destinations/garni-geghard/",
  ]) {
    const response = await request.get(route);
    const { document } = parseHTML(await response.text());
    const icon = document.querySelector(
      'link[rel="icon"][type="image/png"][sizes="192x192"]',
    );
    expect(icon.href).toBe("/favicon.png");
    expect(document.querySelector('link[rel="shortcut icon"]').href).toBe(
      "/favicon.ico",
    );
  }
  const icon = await request.get("/favicon.png", {
    headers: { "User-Agent": "Googlebot-Image/1.0" },
  });
  expect(icon.status()).toBe(200);
  expect(icon.headers()["content-type"]).toContain("image/png");
  const bytes = await icon.body();
  expect([bytes.readUInt32BE(16), bytes.readUInt32BE(20)]).toEqual([192, 192]);
  const ico = await request.get("/favicon.ico");
  expect(ico.status()).toBe(200);
  const directory = await ico.body();
  expect(directory.readUInt16LE(2)).toBe(1);
  const sizes = Array.from(
    { length: directory.readUInt16LE(4) },
    (_, index) => directory[6 + index * 16] || 256,
  );
  expect(sizes).toEqual(expect.arrayContaining([16, 32, 48, 64, 128, 256]));
});

test("communication actions point only to the actual public contact channels", () => {
  for (const lang of seo.languages) {
    const html = fs.readFileSync(
      path.join(root, seo.paths[lang], "index.html"),
      "utf8",
    );
    const { document } = parseHTML(html);
    const organization = JSON.parse(
      document.querySelector("#structured-data").textContent,
    )["@graph"].find((item) => item["@type"] === "Organization");
    expect(organization.potentialAction.map((action) => action.target)).toEqual(
      contacts.channels.map((channel) => channel.href),
    );
    for (const action of organization.potentialAction) {
      expect(action["@type"]).toBe("CommunicateAction");
      expect(action.recipient["@id"]).toBe(organization["@id"]);
      expect(action.name).toBeTruthy();
    }
  }
  for (const family of seo.guideFamilies) {
    const file = path.join(root, seo.contentPaths[family].en, "index.html");
    const { document } = parseHTML(fs.readFileSync(file, "utf8"));
    const article = JSON.parse(
      document.querySelector("#structured-data").textContent,
    )["@graph"].find((item) => item["@type"] === "Article");
    expect(article.about.map((place) => place.name)).toEqual(
      seo.guidePlaces[family],
    );
    expect(JSON.stringify(article.about)).not.toMatch(
      /streetAddress|latitude|longitude/,
    );
  }
});

test("changed-page selection skips documentation and includes homepages for favicon updates", () => {
  const entries = canonicalEntries();
  expect(selectChangedEntries(entries, ["docs/SEO.md", "README.md"])).toEqual(
    [],
  );
  expect(
    selectChangedEntries(entries, [
      "docs/SEO.md",
      "en/destinations/dilijan/index.html",
    ]).map((entry) => entry.url),
  ).toEqual(["https://armmate.am/en/destinations/dilijan/"]);
  expect(
    selectChangedEntries(entries, ["favicon.png"]).map((entry) => entry.url),
  ).toEqual([
    "https://armmate.am/",
    "https://armmate.am/ru/",
    "https://armmate.am/en/",
  ]);
  expect(selectChangedEntries(entries, null)).toEqual(entries);
  expect(() => changedFiles("--help")).toThrow("full base commit SHA");
});

test("stale or challenged public content blocks publication verification", async () => {
  const entries = canonicalEntries().slice(0, 1);
  await expect(
    waitForPublication(entries, {
      waitMs: 0,
      log: () => {},
      fetchImpl: async () => new Response("old deployment"),
    }),
  ).rejects.toThrow("no indexing notification was sent");
  await waitForPublication(entries, {
    waitMs: 0,
    log: () => {},
    fetchImpl: publicFixture,
  });
});

test("a missing ownership proof prevents the indexing POST", async () => {
  const calls = [];
  await expect(
    submit(canonicalEntries().slice(0, 1), {
      fetchImpl: async (url, options) => {
        calls.push({ url, options });
        return new Response("wrong proof");
      },
    }),
  ).rejects.toThrow("ownership proof is not deployed");
  expect(calls).toHaveLength(1);
  expect(calls.some((call) => call.options.method === "POST")).toBe(false);
});

for (const status of [200, 202, 429])
  test(`IndexNow HTTP ${status} is reported accurately without repeated submissions`, async () => {
    const entry = canonicalEntries()[0];
    const proof = ownership();
    const posts = [];
    const report = await submit([entry, entry], {
      fetchImpl: async (url, options) => {
        if (url === proof.keyLocation) return new Response(proof.key);
        expect(url).toBe(globalEndpoint);
        posts.push(JSON.parse(options.body));
        return new Response(null, {
          status,
          headers: status === 429 ? { "Retry-After": "300" } : {},
        });
      },
    });
    expect(posts).toHaveLength(1);
    expect(posts[0].urlList).toEqual([entry.url]);
    expect(posts[0].host).toBe("armmate.am");
    expect(report.accepted).toBe(status === 200 || status === 202);
    expect(report.pendingKeyValidation).toBe(status === 202);
    if (status === 429) expect(report.retryAfter).toBe("300");
    expect(JSON.stringify(report)).not.toContain(proof.key);
  });

test("foreign URLs are rejected before any network request", async () => {
  let requests = 0;
  await expect(
    submit([{ url: "https://example.com/" }], {
      fetchImpl: async () => {
        requests++;
      },
    }),
  ).rejects.toThrow("canonical URLs");
  expect(requests).toBe(0);
});

test("robot rules use the most specific agent and longest matching path", () => {
  const robots =
    "User-agent: *\nDisallow: /\n\nUser-agent: OAI-SearchBot\nDisallow: /\nAllow: /en/\nDisallow: /en/private/\n\nUser-agent: GPTBot\nDisallow: /\n";
  expect(allowedByRobots(robots, "OAI-SearchBot", "/en/")).toBe(true);
  expect(allowedByRobots(robots, "OAI-SearchBot", "/en/private/")).toBe(false);
  expect(allowedByRobots(robots, "GPTBot", "/en/")).toBe(false);
  expect(
    allowedByRobots("User-agent: *\nDisallow: /x\nAllow: /x", "bingbot", "/x"),
  ).toBe(true);
});

test("live monitoring accepts a healthy site without contacting external services", async () => {
  const report = await checkLive({ fetchImpl: publicFixture, log: () => {} });
  expect(report.healthy).toBe(true);
  expect(report.pageCount).toBe(canonicalEntries().length);
  expect(report.errors).toEqual([]);
});

test("live monitoring detects bot blocking and invalid favicon responses", async () => {
  const report = await checkLive({
    log: () => {},
    fetchImpl: async (url, options) => {
      if (options.headers["User-Agent"] === "OAI-SearchBot")
        return new Response("Forbidden", { status: 403 });
      if (new URL(url).pathname === "/favicon.png")
        return new Response("challenge page", {
          headers: { "Content-Type": "text/html" },
        });
      return publicFixture(url, options);
    },
  });
  expect(report.healthy).toBe(false);
  expect(report.errors.some((error) => error.includes("OAI-SearchBot"))).toBe(
    true,
  );
  expect(
    report.errors.some((error) =>
      error.includes("Favicon is not a public PNG"),
    ),
  ).toBe(true);
});
