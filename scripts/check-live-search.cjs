// Read-only monitoring of public pages. This is not a ranking/indexing check.
const fs = require("node:fs");
const path = require("node:path");
const { parseHTML, DOMParser } = require("linkedom");
const seo = require("../seo.js");
const {
  root,
  canonicalEntries,
  request,
  mapLimit,
} = require("./discovery-utils.cjs");

function allowedByRobots(text, agent, pathname) {
  const groups = [];
  let group;
  for (const line of text.split(/\r?\n/)) {
    const clean = line.split("#")[0].trim();
    const colon = clean.indexOf(":");
    if (colon < 0) continue;
    const field = clean.slice(0, colon).trim().toLowerCase();
    const value = clean.slice(colon + 1).trim();
    if (field === "user-agent") {
      if (!group || group.rules.length) {
        group = { agents: [], rules: [] };
        groups.push(group);
      }
      group.agents.push(value.toLowerCase());
    } else if (group && ["allow", "disallow"].includes(field) && value)
      group.rules.push({ field, value });
  }
  const scores = groups.map((item) =>
    Math.max(
      -1,
      ...item.agents.map((name) =>
        name === "*"
          ? 0
          : agent.toLowerCase().includes(name)
            ? name.length
            : -1,
      ),
    ),
  );
  const best = Math.max(-1, ...scores);
  if (best < 0) return true;
  let chosen = { length: -1, allow: true };
  groups
    .filter((_, index) => scores[index] === best)
    .flatMap((item) => item.rules)
    .forEach((rule) => {
      const anchored = rule.value.endsWith("$");
      const pattern = (anchored ? rule.value.slice(0, -1) : rule.value)
        .split("*")
        .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join(".*");
      const length = rule.value.replace(/[*$]/g, "").length;
      if (
        new RegExp("^" + pattern + (anchored ? "$" : "")).test(pathname) &&
        (length > chosen.length ||
          (length === chosen.length && rule.field === "allow"))
      )
        chosen = { length, allow: rule.field === "allow" };
    });
  return chosen.allow;
}

async function checkLive({ fetchImpl = fetch, log = console.log } = {}) {
  const errors = [];
  const observations = [];
  const expected = canonicalEntries();
  const routeInfo = new Map(
    ["home", ...Object.keys(seo.contentPaths)].flatMap((family) =>
      seo.languages.map((language) => [
        seo.contentPageUrl(family, language),
        { family, language },
      ]),
    ),
  );
  const check = (condition, message) => {
    if (!condition) errors.push(message);
  };
  async function get(url, agent = "ARMMATE-Search-Health") {
    const response = await request(
      url,
      { headers: { "User-Agent": agent, "Cache-Control": "no-cache" } },
      fetchImpl,
    );
    return response;
  }
  let robots = "";
  try {
    const response = await get(new URL("robots.txt", seo.baseUrl).href);
    check(response.ok, "robots.txt is not available");
    robots = await response.text();
    check(
      robots.includes(`Sitemap: ${seo.baseUrl}sitemap.xml`),
      "robots.txt does not point to the canonical sitemap",
    );
  } catch {
    errors.push("Could not fetch robots.txt");
  }
  try {
    const response = await get(new URL("sitemap.xml", seo.baseUrl).href);
    check(response.ok, "sitemap.xml is not available");
    const document = new DOMParser().parseFromString(
      await response.text(),
      "application/xml",
    );
    const actual = [...document.getElementsByTagName("loc")]
      .map((node) => node.textContent)
      .sort();
    check(
      JSON.stringify(actual) ===
        JSON.stringify(expected.map((entry) => entry.url).sort()),
      "Live sitemap differs from the canonical route set",
    );
  } catch {
    errors.push("Could not read the live sitemap");
  }

  const pages = await mapLimit(expected, 4, async (entry) => {
    const row = { url: entry.url };
    try {
      const response = await get(entry.url);
      row.status = response.status;
      check(response.ok, `${entry.url}: HTTP ${response.status}`);
      check(
        !/noindex|nofollow/i.test(response.headers.get("X-Robots-Tag") || ""),
        `${entry.url}: response blocks indexing`,
      );
      const { document } = parseHTML(await response.text());
      const canonical = document.querySelector('link[rel="canonical"]')?.href;
      check(canonical === entry.url, `${entry.url}: wrong live canonical`);
      check(
        document.querySelectorAll("h1").length === 1 &&
          (document.querySelector("main")?.textContent.trim().split(/\s+/)
            .length || 0) > 200,
        `${entry.url}: important HTML content missing`,
      );
      check(
        !/noindex|nofollow|nosnippet/i.test(
          document.querySelector('meta[name="robots"]')?.content || "",
        ),
        `${entry.url}: meta blocks search`,
      );
      const language = document.documentElement.lang;
      check(
        language === routeInfo.get(entry.url)?.language,
        `${entry.url}: invalid HTML language`,
      );
      check(
        document.querySelectorAll('link[rel="alternate"][hreflang]').length ===
          4,
        `${entry.url}: language alternatives missing`,
      );
      for (const other of [...seo.languages, "x-default"]) {
        const actual = document.querySelector(
          `link[rel="alternate"][hreflang="${other}"]`,
        )?.href;
        const intended = seo.contentPageUrl(
          routeInfo.get(entry.url).family,
          other === "x-default" ? "hy" : other,
        );
        check(
          actual === intended,
          `${entry.url}: incorrect ${other} alternative`,
        );
      }
      const icon = document.querySelector(
        'link[rel="icon"][type="image/png"][sizes="192x192"]',
      );
      check(
        icon &&
          new URL(icon.href, entry.url).href ===
            new URL("favicon.png", seo.baseUrl).href,
        `${entry.url}: stable raster favicon missing`,
      );
      const graph = JSON.parse(
        document.querySelector("#structured-data")?.textContent || "null",
      );
      check(
        Array.isArray(graph?.["@graph"]),
        `${entry.url}: structured data missing`,
      );
    } catch (error) {
      errors.push(`${entry.url}: ${error.message}`);
    }
    return row;
  });
  log(`Public canonical pages checked: ${pages.length}`);

  for (const agent of [
    "Googlebot",
    "bingbot",
    "OAI-SearchBot",
    "PerplexityBot",
    "Claude-SearchBot",
  ]) {
    check(
      allowedByRobots(robots, agent, "/en/"),
      `${agent}: search page blocked by robots.txt`,
    );
    try {
      const response = await get(seo.pageUrl("en"), agent);
      const html = await response.text();
      const { document } = parseHTML(html);
      check(
        response.ok &&
          document.querySelector("#structured-data") &&
          document.querySelector('link[rel="canonical"]')?.href ===
            seo.pageUrl("en"),
        `${agent}: public request was blocked or returned a challenge`,
      );
      observations.push({ userAgent: agent, status: response.status });
    } catch {
      errors.push(`${agent}: public request failed`);
    }
  }
  check(
    allowedByRobots(robots, "Googlebot-Image", "/favicon.png"),
    "Googlebot-Image: favicon blocked by robots.txt",
  );
  try {
    const response = await get(
      new URL("favicon.png", seo.baseUrl).href,
      "Googlebot-Image",
    );
    const bytes = Buffer.from(await response.arrayBuffer());
    const validPng =
      bytes.length >= 24 &&
      bytes
        .subarray(0, 8)
        .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    check(
      response.ok &&
        response.headers.get("Content-Type")?.includes("image/png") &&
        validPng,
      "Favicon is not a public PNG for Googlebot-Image",
    );
    if (validPng) {
      const width = bytes.readUInt32BE(16),
        height = bytes.readUInt32BE(20);
      check(
        width === height && width > 48,
        "Favicon should be square and larger than 48px",
      );
      observations.push({
        favicon: "favicon.png",
        width,
        height,
        status: response.status,
      });
    }
  } catch {
    errors.push("Favicon cannot be fetched by Googlebot-Image");
  }
  try {
    const response = await get(
      new URL("favicon.ico", seo.baseUrl).href,
      "Googlebot-Image",
    );
    check(response.ok, "Root favicon.ico is not available");
  } catch {
    errors.push("Root favicon.ico fetch failed");
  }
  return {
    checkedAt: new Date().toISOString(),
    pageCount: pages.length,
    healthy: errors.length === 0,
    errors,
    observations,
    pages,
  };
}

module.exports = { allowedByRobots, checkLive };
function writeReport(report) {
  fs.mkdirSync(path.join(root, "qa"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "qa/live-search-health.json"),
    JSON.stringify(report, null, 2) + "\n",
  );
}
if (require.main === module)
  checkLive()
    .then((report) => {
      writeReport(report);
      console.log(JSON.stringify({ ...report, pages: undefined }));
      if (!report.healthy) process.exitCode = 1;
    })
    .catch((error) => {
      writeReport({
        checkedAt: new Date().toISOString(),
        healthy: false,
        errors: [error.message],
        pages: [],
      });
      console.error(error.message);
      process.exitCode = 1;
    });
