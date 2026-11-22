// Validate the complete generated public site without a browser or network.
const fs = require("node:fs");
const path = require("node:path");
const { parseHTML, DOMParser } = require("linkedom");
const seo = require("../seo.js");
const content = require("./search-content.cjs");
const root = path.resolve(__dirname, "..");
const origin = new URL(seo.baseUrl).origin;
const errors = [];
const warnings = [];
const pages = new Map();
const titles = new Map();
const descriptions = new Map();
const normalize = (value) => value.replace(/\s+/g, " ").trim();
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const fileFor = (url) => {
  let file = decodeURIComponent(new URL(url).pathname).slice(1);
  if (!file || file.endsWith("/")) file += "index.html";
  const absolute = path.resolve(root, file);
  if (!absolute.startsWith(root + path.sep))
    throw new Error("Resource outside project root");
  return absolute;
};

for (const family of ["home", ...Object.keys(seo.contentPaths)]) {
  for (const language of seo.languages) {
    const url = seo.contentPageUrl(family, language);
    const { document } = parseHTML(fs.readFileSync(fileFor(url), "utf8"));
    pages.set(url, { family, language, document });
  }
}

for (const [url, { family, language, document }] of pages) {
  const prefix = `${url}: `;
  const $ = (selector) => document.querySelector(selector);
  const all = (selector) => [...document.querySelectorAll(selector)];
  check(
    document.documentElement.lang === language,
    prefix + "incorrect HTML language",
  );
  check(
    all("main").length === 1 && all("h1").length === 1,
    prefix + "expected one main and H1",
  );
  check(
    normalize($("main").textContent).split(/\s+/).length > 200,
    prefix + "insufficient initial HTML content",
  );
  check(
    all('link[rel="canonical"]').length === 1 &&
      $('link[rel="canonical"]').href === url,
    prefix + "invalid canonical",
  );
  check(
    !/noindex|nofollow|nosnippet/.test($('meta[name="robots"]')?.content || ""),
    prefix + "unexpected indexing restriction",
  );
  check(
    all('meta[name="description"]').length === 1,
    prefix + "expected one description",
  );
  for (const [label, value, map] of [
    ["title", normalize(document.title), titles],
    ["description", $('meta[name="description"]')?.content, descriptions],
  ]) {
    check(Boolean(value), prefix + `missing ${label}`);
    check(
      !map.has(value),
      prefix + `duplicate ${label} with ${map.get(value)}`,
    );
    map.set(value, url);
  }
  check(
    $('meta[property="og:url"]')?.content === url,
    prefix + "Open Graph URL mismatch",
  );
  check(
    $('meta[property="og:title"]')?.content === normalize(document.title),
    prefix + "Open Graph title mismatch",
  );
  check(
    $('meta[name="twitter:card"]')?.content === "summary_large_image",
    prefix + "missing Twitter card",
  );
  check(
    $('meta[property="og:image"]')?.content ===
      $('meta[name="twitter:image"]')?.content,
    prefix + "social image mismatch",
  );
  const alternates = all('link[rel="alternate"][hreflang]');
  check(
    alternates.length === 4,
    prefix + "expected three languages and x-default",
  );
  for (const other of [...seo.languages, "x-default"]) {
    const expected = seo.contentPageUrl(
      family,
      other === "x-default" ? "hy" : other,
    );
    check(
      alternates.find((link) => link.hreflang === other)?.href === expected,
      prefix + `bad ${other} alternative`,
    );
  }
  let previous = 0;
  for (const heading of all("h1,h2,h3,h4,h5,h6")) {
    const level = Number(heading.tagName.slice(1));
    check(
      level <= previous + 1,
      prefix + `skipped heading level: ${normalize(heading.textContent)}`,
    );
    previous = level;
  }
  const ids = new Set();
  for (const node of all("[id]")) {
    check(!ids.has(node.id), prefix + `duplicate ID ${node.id}`);
    ids.add(node.id);
  }
  for (const image of all("img")) {
    check(image.hasAttribute("alt"), prefix + "image without alt");
    check(
      image.hasAttribute("width") && image.hasAttribute("height"),
      prefix + "image missing layout dimensions",
    );
  }
  for (const node of all("a[href],img[src],script[src],link[href]")) {
    const value = node.getAttribute(node.hasAttribute("src") ? "src" : "href");
    if (!value || /^(mailto:|tel:|data:)/.test(value)) continue;
    const target = new URL(value, url);
    if (target.origin !== origin) continue;
    check(
      fs.existsSync(fileFor(target)),
      prefix + `broken local resource ${target.href}`,
    );
    if (
      node.tagName === "A" &&
      target.hash &&
      pages.has(target.origin + target.pathname)
    ) {
      check(
        pages
          .get(target.origin + target.pathname)
          .document.getElementById(decodeURIComponent(target.hash.slice(1))),
        prefix + `broken fragment ${target.href}`,
      );
    }
  }
  const graph = all('script[type="application/ld+json"]').flatMap((node) => {
    try {
      const parsed = JSON.parse(node.textContent);
      check(
        parsed["@context"] === "https://schema.org",
        prefix + "invalid JSON-LD context",
      );
      return parsed["@graph"] || [parsed];
    } catch {
      errors.push(prefix + "invalid JSON-LD JSON");
      return [];
    }
  });
  const graphIds = graph.map((item) => item["@id"]).filter(Boolean);
  check(
    new Set(graphIds).size === graphIds.length,
    prefix + "conflicting JSON-LD IDs",
  );
  const webpage = graph.find(
    (item) =>
      item["@type"] === (family === "contact" ? "ContactPage" : "WebPage"),
  );
  check(
    webpage?.url === url && webpage?.inLanguage === language,
    prefix + "incorrect WebPage graph",
  );
  const organization = graph.find((item) => item["@type"] === "Organization");
  check(
    organization?.email === "armmate.support@gmail.com",
    prefix + "incorrect organization email",
  );
  check(
    organization?.alternateName?.includes("арммейт") &&
      organization?.alternateName?.includes("արմմեյթ"),
    prefix + "missing brand aliases",
  );
  check(
    !graph.some(
      (item) =>
        item["@type"] === "LocalBusiness" ||
        item.aggregateRating ||
        item.review ||
        item.openingHours ||
        item.address,
    ),
    prefix + "unverified business data",
  );
  const faq = graph.find((item) => item["@type"] === "FAQPage");
  const visibleFaq = all(
    family === "home" ? "#faq-list details" : "#faq details",
  ).map((node) => [
    normalize(node.querySelector("summary").textContent),
    normalize(node.querySelector("p").textContent),
  ]);
  check(
    JSON.stringify(
      faq?.mainEntity.map((item) => [
        normalize(item.name),
        normalize(item.acceptedAnswer.text),
      ]),
    ) === JSON.stringify(visibleFaq),
    prefix + "FAQ schema differs from visible answers",
  );
  const nodes = new Set(graphIds);
  function references(value) {
    if (!value || typeof value !== "object") return;
    if (Object.keys(value).length === 1 && value["@id"])
      check(
        nodes.has(value["@id"]),
        prefix + `unresolved graph reference ${value["@id"]}`,
      );
    Object.values(value).forEach((item) => {
      if (Array.isArray(item)) item.forEach(references);
      else references(item);
    });
  }
  graph.forEach(references);
  if (seo.guideFamilies.includes(family)) {
    const article = graph.find((item) => item["@type"] === "Article");
    check(
      article?.headline === content[family][language].h1,
      prefix + "article headline mismatch",
    );
    const sources = all(".content-sources a").map((link) => link.href);
    check(
      sources.length > 0 &&
        JSON.stringify(article?.citation) === JSON.stringify(sources),
      prefix + "article citations differ from visible sources",
    );
  }
}

const sitemap = new DOMParser().parseFromString(
  fs.readFileSync(path.join(root, "sitemap.xml"), "utf8"),
  "application/xml",
);
const locations = [...sitemap.getElementsByTagName("loc")].map(
  (node) => node.textContent,
);
check(new Set(locations).size === locations.length, "Duplicate sitemap URLs");
check(
  locations.length === pages.size && locations.every((url) => pages.has(url)),
  "Sitemap differs from canonical HTML pages",
);
for (const entry of sitemap.getElementsByTagName("url")) {
  const url = entry.getElementsByTagName("loc")[0].textContent;
  const page = pages.get(url);
  const alternatives = [...entry.getElementsByTagName("xhtml:link")];
  check(alternatives.length === 4, `${url}: sitemap alternatives missing`);
  for (const node of alternatives) {
    const lang = node.getAttribute("hreflang");
    check(
      node.getAttribute("href") ===
        seo.contentPageUrl(page.family, lang === "x-default" ? "hy" : lang),
      `${url}: sitemap alternative mismatch`,
    );
  }
}
const robots = fs.readFileSync(path.join(root, "robots.txt"), "utf8");
check(
  robots.includes(`Sitemap: ${seo.baseUrl}sitemap.xml`),
  "Missing sitemap in robots.txt",
);
check(
  robots.includes("User-agent: OAI-SearchBot\nAllow: /"),
  "Search bot permission missing",
);
check(
  robots.includes("User-agent: GPTBot\n"),
  "Training bot policy not independent",
);
const llms = fs.readFileSync(path.join(root, "llms.txt"), "utf8");
for (const match of llms.matchAll(/\]\((https:\/\/[^)]+)\)/g)) {
  const url = new URL(match[1]);
  if (url.origin === origin)
    check(fs.existsSync(fileFor(url)), `Broken llms.txt link ${url.href}`);
}
check(
  /noindex, follow/.test(fs.readFileSync(path.join(root, "404.html"), "utf8")),
  "404 should not be indexed",
);
check(
  fs
    .readFileSync(path.join(root, "yandex_9cce45b71192c2d1.html"), "utf8")
    .includes("Verification: 9cce45b71192c2d1"),
  "Yandex ownership file changed",
);
for (const match of fs
  .readFileSync(path.join(root, "styles.css"), "utf8")
  .matchAll(/url\("?([^)"]+)/g)) {
  check(
    fs.existsSync(path.join(root, match[1])),
    `Missing CSS resource ${match[1]}`,
  );
}
console.log(
  JSON.stringify(
    { canonicalPages: pages.size, languages: seo.languages, errors, warnings },
    null,
    2,
  ),
);
if (errors.length) process.exitCode = 1;
