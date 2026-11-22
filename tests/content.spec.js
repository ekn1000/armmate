const { test, expect } = require("@playwright/test");
const seo = require("../seo.js");
const content = require("../scripts/search-content.cjs");

for (const language of seo.languages) {
  test(`${language}: service and contact pages are crawlable with working local assets`, async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    const failures = [];
    page.on("response", (response) => {
      if (response.status() >= 400) failures.push(response.url());
    });
    for (const family of Object.keys(seo.contentPaths)) {
      const route = seo.contentPaths[family][language];
      await page.goto("http://127.0.0.1:4187/" + route);
      await expect(page.locator("html")).toHaveAttribute("lang", language);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(content[family][language].h1);
      await expect(page).toHaveTitle(content[family][language].title);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        seo.contentPageUrl(family, language),
      );
      const alternatives = await page
        .locator('link[rel="alternate"][hreflang]')
        .evaluateAll((links) =>
          Object.fromEntries(links.map((link) => [link.hreflang, link.href])),
        );
      expect(alternatives).toEqual({
        ...Object.fromEntries(
          seo.languages.map((lang) => [lang, seo.contentPageUrl(family, lang)]),
        ),
        "x-default": seo.contentPageUrl(family, "hy"),
      });
      await expect(page.locator('[data-channel="telegram"]')).toHaveAttribute(
        "href",
        "https://t.me/armmate_support",
      );
      await expect(page.locator('[data-channel="email"]')).toHaveAttribute(
        "href",
        "mailto:armmate.support@gmail.com",
      );
      await expect(
        page.locator("form, input, textarea, select, a[href^='tel:']"),
      ).toHaveCount(0);
      const schema = JSON.parse(
        await page.locator("#structured-data").textContent(),
      );
      expect(
        schema["@graph"].some(
          (item) =>
            item["@type"] ===
            (family === "contact" ? "ContactPage" : "WebPage"),
        ),
      ).toBe(true);
      const faq = schema["@graph"].find((item) => item["@type"] === "FAQPage");
      expect(
        faq.mainEntity.map((item) => [item.name, item.acceptedAnswer.text]),
      ).toEqual(content[family][language].faq);
      const breadcrumbs = JSON.parse(
        await page.locator("#breadcrumbs-data").textContent(),
      );
      expect(breadcrumbs.itemListElement.map((item) => item.item)).toEqual([
        seo.pageUrl(language),
        seo.contentPageUrl(family, language),
      ]);
      await expect(
        page.locator(".content-related-link:not(.content-destination-link)"),
      ).toHaveCount(3);
      await expect(page.locator(".content-destination-link")).toHaveCount(
        family === "planning" ? 6 : 0,
      );
      await expect(page.locator("#faq details")).toHaveCount(
        content[family][language].faq.length,
      );
      const other = language === "en" ? "ru" : "en";
      await page.locator(`[data-lang="${other}"]`).click();
      await expect(page).toHaveURL(
        new RegExp("/" + seo.contentPaths[family][other] + "$"),
      );
    }
    expect(failures).toEqual([]);
    await context.close();
  });
}

for (const width of [320, 768, 1440])
  test(`content navigation, contacts and layout at ${width}px`, async ({
    page,
  }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    for (const language of seo.languages) {
      for (const family of Object.keys(seo.contentPaths)) {
        await page.goto("/" + seo.contentPaths[family][language]);
        await page.evaluate(() => document.fonts.ready);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${family}/${language}/${width}`,
        ).toBe(true);
        await page.locator("#contact-widget summary").click();
        await expect(page.locator("#quick-channel-links a")).toHaveCount(3);
        await expect(
          page.locator('[data-quick-channel="telegram"]'),
        ).toHaveAttribute("href", "https://t.me/armmate_support");
        await page.keyboard.press("Escape");
        await expect(page.locator("#quick-contact-panel")).toBeHidden();
        if (width === 320) {
          await page.locator(".menu-toggle").click();
          await expect(page.locator("#navigation")).toBeVisible();
          await page.locator("#navigation a").first().click();
          expect(new URL(page.url()).pathname).toBe("/" + seo.paths[language]);
          expect(new URL(page.url()).hash).toBe("#services");
        }
      }
    }
    expect(errors).toEqual([]);
  });

test("home-page service links follow the selected language", async ({
  page,
}) => {
  await page.goto("/");
  for (const language of seo.languages) {
    await page.locator(`[data-lang="${language}"]`).click();
    for (const family of ["assistance", "companion", "contact", "planning"]) {
      const href = await page
        .locator(`[data-content-link="${family}"]`)
        .getAttribute("href");
      expect(new URL(href, page.url()).pathname).toBe(
        "/" + seo.contentPaths[family][language],
      );
    }
  }
});
