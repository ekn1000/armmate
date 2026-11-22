// Optional lab measurement, kept out of CI because timings vary by environment.
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("@playwright/test");
const seo = require("../seo.js");

async function main() {
  const args = process.argv.slice(2);
  const base = new URL(
    args.find((arg) => arg.startsWith("--base="))?.slice(7) || seo.baseUrl,
  );
  if (!["http:", "https:"].includes(base.protocol))
    throw new Error("Use an HTTP(S) measurement URL");
  const label =
    args.find((arg) => arg.startsWith("--label="))?.slice(8) || "final";
  if (!/^[a-z0-9-]+$/.test(label))
    throw new Error("Use a plain measurement label");
  const selected = args.includes("--all")
    ? ["home", ...Object.keys(seo.contentPaths)].flatMap((family) =>
        seo.languages.map((language) => [family, language]),
      )
    : [
        ["home", "en"],
        ["assistance", "en"],
        ["contact", "en"],
        ["planning", "en"],
        ["garni", "en"],
        ["home", "hy"],
        ["home", "ru"],
      ];
  const { default: lighthouse } = await import("lighthouse");
  const { launch } = await import("chrome-launcher");
  const browser = await launch({
    chromePath: chromium.executablePath(),
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
    logLevel: "silent",
  });
  const directory = path.resolve(__dirname, "../qa");
  fs.mkdirSync(directory, { recursive: true });
  const pages = [];
  try {
    for (const [family, language] of selected) {
      const route =
        family === "home"
          ? seo.paths[language]
          : seo.contentPaths[family][language];
      const url = new URL(route, base).href;
      const result = await lighthouse(url, {
        port: browser.port,
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
        output: "json",
        logLevel: "error",
      });
      if (result.lhr.runtimeError)
        throw new Error(result.lhr.runtimeError.message);
      fs.writeFileSync(
        path.join(directory, `lighthouse-${label}-${family}-${language}.json`),
        result.report,
      );
      const row = {
        family,
        language,
        url,
        scores: Object.fromEntries(
          Object.entries(result.lhr.categories).map(([key, value]) => [
            key,
            Math.round(value.score * 100),
          ]),
        ),
        metrics: Object.fromEntries(
          [
            "largest-contentful-paint",
            "cumulative-layout-shift",
            "total-blocking-time",
            "first-contentful-paint",
          ].map((key) => [key, result.lhr.audits[key].numericValue]),
        ),
      };
      pages.push(row);
      console.log(JSON.stringify(row));
    }
    fs.writeFileSync(
      path.join(directory, `lighthouse-${label}-summary.json`),
      JSON.stringify({ measuredAt: new Date().toISOString(), pages }, null, 2) +
        "\n",
    );
  } finally {
    await browser.kill();
  }
}
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
