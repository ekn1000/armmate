const { test, expect } = require("@playwright/test");
const fs = require("node:fs");
const seo = require("../seo.js");

for (const lang of seo.languages) {
  test(`${lang}: complete localized HTML and SEO work without JavaScript`, async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    const failures = [];
    page.on("response", (response) => {
      if (response.status() >= 400) failures.push(response.url());
    });
    await page.goto("http://127.0.0.1:4187/" + seo.paths[lang]);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).not.toBeEmpty();
    const brandName = { hy: "արմմեյթ", ru: "арммейт", en: "ARMMATE" }[lang];
    await expect(page).toHaveTitle(new RegExp(brandName));
    await expect(page.locator(".brand")).toHaveCount(2);
    for (const brand of await page.locator(".brand").all()) {
      await expect(brand).toHaveAttribute(
        "aria-label",
        `armmate — ${brandName}`,
      );
      await expect(brand).toContainText("armmate");
      await expect(brand.locator('use[href="#i-brand"]')).toHaveCount(1);
    }
    const slogans = {
      hy: "Քո ընկերը Հայաստանում։",
      ru: "Твой друг в Армении.",
      en: "Your friend in Armenia.",
    };
    expect(
      (await page.locator("h1").innerText()).replace(/\s+/g, " ").trim(),
    ).toBe(slogans[lang]);
    await expect(page.locator('[data-t="footerTag"]')).toHaveText(
      slogans[lang],
    );
    expect(await page.locator("body").innerText()).not.toMatch(
      /\bARI\b|We've got your back|Мы рядом/,
    );
    await expect(page.locator("#support-categories>div")).toHaveCount(5);
    await expect(page.locator(".experience-card")).toHaveCount(3);
    await expect(page.locator("#pricing-factors li")).toHaveCount(5);
    await expect(page.locator("#faq-list details")).toHaveCount(8);
    await expect(page.locator("form, input, textarea, select")).toHaveCount(0);
    await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
    const destinations = {
      whatsapp: "https://wa.me/37491110799",
      telegram: "https://t.me/armmate_support",
      email: "mailto:armmate.support@gmail.com",
    };
    for (const [channel, href] of Object.entries(destinations)) {
      await expect(page.locator(`[data-channel="${channel}"]`)).toHaveAttribute(
        "href",
        href,
      );
    }
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      seo.pageUrl(lang),
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      seo.pageUrl(lang),
    );
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
      "content",
      seo.locales[lang],
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /index, follow/,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      seo.baseUrl + `assets/social-armmate-friends-${lang}.png`,
    );
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description.length).toBeGreaterThan(100);
    expect(description.length).toBeLessThan(190);
    const alternates = await page
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll((links) =>
        Object.fromEntries(links.map((link) => [link.hreflang, link.href])),
      );
    expect(alternates).toEqual({
      ...Object.fromEntries(seo.languages.map((l) => [l, seo.pageUrl(l)])),
      "x-default": seo.baseUrl,
    });
    for (const other of seo.languages) {
      const link = page.locator(`[data-lang="${other}"]`);
      expect(
        new URL(await link.getAttribute("href"), page.url()).pathname,
      ).toBe("/" + seo.paths[other]);
      await expect(link).toHaveAttribute("hreflang", other);
    }
    const schema = JSON.parse(
      await page.locator("#structured-data").textContent(),
    );
    for (const type of ["Organization", "WebSite"]) {
      expect(schema["@graph"].find((item) => item["@type"] === type).name).toBe(
        brandName,
      );
    }
    const faq = schema["@graph"].find((item) => item["@type"] === "FAQPage");
    const visibleFaq = await page
      .locator("#faq-list details")
      .evaluateAll((items) =>
        items.map((item) => ({
          q: item
            .querySelector("summary")
            .textContent.replace(/\s+/g, " ")
            .trim(),
          a: item.querySelector("p").textContent.replace(/\s+/g, " ").trim(),
        })),
      );
    expect(
      faq.mainEntity.map((item) => ({
        q: item.name,
        a: item.acceptedAnswer.text,
      })),
    ).toEqual(visibleFaq);
    const service = schema["@graph"].find(
      (item) => item["@type"] === "Service",
    );
    expect(service.areaServed.name).toBe("Armenia");
    const organization = schema["@graph"].find(
      (item) => item["@type"] === "Organization",
    );
    expect(organization.contactPoint.url).toBe(
      seo.contentPageUrl("contact", lang),
    );
    expect(organization.sameAs).toContain("https://t.me/armmate_support");
    expect(organization.sameAs).toContain(
      "https://www.google.com/maps/place/armmate/data=!4m2!3m1!1s0x0:0xd6718f4fe13d50b7",
    );
    expect(organization.email).toBe("armmate.support@gmail.com");
    expect(organization.contactPoint.email).toBe(organization.email);
    expect(JSON.stringify(schema)).not.toMatch(
      /"(price|aggregateRating|review|telephone|streetAddress|openingHours)"/,
    );
    const preload = page.locator('link[rel="preload"][as="image"]');
    expect(
      (await preload.getAttribute("imagesrcset")).replace(/\s+/g, " ").trim(),
    ).toBe(
      (await page.locator(".hero-image").getAttribute("srcset"))
        .replace(/\s+/g, " ")
        .trim(),
    );
    await page.locator(`[data-lang="${lang === "en" ? "ru" : "en"}"]`).click();
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      lang === "en" ? "ru" : "en",
    );
    expect(failures).toEqual([]);
    await context.close();
  });
}

test("language switching and legacy URLs keep metadata and shared assets consistent", async ({
  page,
}) => {
  const failures = [];
  page.on("response", (response) => {
    if (response.status() >= 400) failures.push(response.url());
  });
  await page.goto("/?lang=en&utm_source=test#plan");
  await expect(page).toHaveURL(/\/en\/\?utm_source=test#plan$/);
  for (const lang of ["ru", "hy", "en"]) {
    await page.locator(`[data-lang="${lang}"]`).click();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      seo.pageUrl(lang),
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      seo.pageUrl(lang),
    );
    const json = JSON.parse(
      await page.locator("#structured-data").textContent(),
    );
    expect(
      json["@graph"].find((item) => item["@type"] === "WebPage").inLanguage,
    ).toBe(lang);
    await page.locator("#credits-button").click();
    await expect(page.locator(".credits-list>div")).toHaveCount(4);
    await page.keyboard.press("Escape");
  }
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  expect(failures).toEqual([]);
});

test("sitemap lists home, service and contact pages with reciprocal language alternatives", async ({
  request,
  page,
}) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();
  await page.goto("/");
  const urls = await page.evaluate((xml) => {
    const doc = new DOMParser().parseFromString(xml, "application/xml");
    if (doc.querySelector("parsererror")) throw new Error("Invalid XML");
    return [...doc.getElementsByTagName("url")].map((url) => ({
      loc: url.getElementsByTagName("loc")[0].textContent,
      alternates: [
        ...url.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "link"),
      ].map((link) => ({
        lang: link.getAttribute("hreflang"),
        href: link.getAttribute("href"),
      })),
    }));
  }, xml);
  const families = ["home", ...Object.keys(seo.contentPaths)];
  expect(urls.map((url) => url.loc)).toEqual(
    families.flatMap((family) =>
      seo.languages.map((language) => seo.contentPageUrl(family, language)),
    ),
  );
  expect(urls.every((url) => url.alternates.length === 4)).toBe(true);
  for (const family of families) {
    const alternatives = seo.languages.map((language) => ({
      lang: language,
      href: seo.contentPageUrl(family, language),
    }));
    alternatives.push({
      lang: "x-default",
      href: seo.contentPageUrl(family, "hy"),
    });
    for (const language of seo.languages) {
      expect(
        urls.find((url) => url.loc === seo.contentPageUrl(family, language))
          .alternates,
      ).toEqual(alternatives);
    }
  }
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain(
    "Sitemap: " + seo.baseUrl + "sitemap.xml",
  );
  for (const url of urls) {
    const local = "/" + url.loc.replace(seo.baseUrl, "");
    expect((await request.get(local)).status()).toBe(200);
  }
});

test("optimized assets are available and 404 page stays out of search results", async ({
  request,
}) => {
  for (const file of [
    "armenian-regular",
    "armenian-bold",
    "manrope-regular",
    "manrope-bold",
  ]) {
    const response = await request.get(`/assets/${file}.woff2`);
    expect(response.status()).toBe(200);
    expect((await response.body()).length).toBeLessThan(40000);
  }
  expect(fs.statSync("assets/ararat-800.webp").size).toBeLessThan(130000);
  const response = await request.get("/404.html");
  expect(await response.text()).toContain('content="noindex, follow"');
});
