const { test, expect } = require("@playwright/test");
const { renderRobots } = require("../scripts/crawler-policy.cjs");
const { parseHTML } = require("linkedom");
const fs = require("node:fs");
const vm = require("node:vm");
const contacts = require("../site-config.js");

test("training can be disabled while search discovery remains allowed", () => {
  const robots = renderRobots("https://armmate.am/", {
    allowGPTBotTraining: false,
  });
  expect(robots).toContain("User-agent: GPTBot\nDisallow: /");
  for (const agent of [
    "Googlebot",
    "bingbot",
    "OAI-SearchBot",
    "PerplexityBot",
    "Claude-SearchBot",
  ]) {
    expect(robots).toContain(`User-agent: ${agent}\nAllow: /`);
  }
});

test("Bing verification is emitted only for an owner-provided value", () => {
  const sandbox = {
    URL,
    window: {
      ARMMATE_CONTACT: {
        ...contacts,
        bingVerification: "verification-fixture",
      },
    },
  };
  vm.runInNewContext(fs.readFileSync("seo.js", "utf8"), sandbox);
  vm.runInNewContext(fs.readFileSync("translations.js", "utf8"), sandbox);
  const { document } = parseHTML(
    "<!doctype html><html><head></head><body></body></html>",
  );
  const api = sandbox.window.ARMMATE_SEO;
  const copy = sandbox.window.ARMMATE_TRANSLATIONS.en;
  api.updateDocument(document, "en", copy);
  expect(document.querySelector('meta[name="msvalidate.01"]').content).toBe(
    "verification-fixture",
  );
  sandbox.window.ARMMATE_CONTACT.bingVerification = "";
  api.updateDocument(document, "en", copy);
  expect(document.querySelector('meta[name="msvalidate.01"]')).toBeNull();
});

test("contact events work without collecting data or contacting messengers", async ({
  page,
}) => {
  const requests = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("/en/destinations/yerevan/");
  await page.evaluate(() => {
    window.contactEvents = [];
    window.addEventListener("armmate:contact", (event) =>
      window.contactEvents.push(event.detail),
    );
    document.addEventListener(
      "click",
      (event) => {
        if (event.target.closest("a[data-channel], a[data-quick-channel]"))
          event.preventDefault();
      },
      true,
    );
  });
  await page.locator('[data-channel="telegram"]').click();
  await page.locator("#contact-widget summary").click();
  await page.locator('[data-quick-channel="email"]').click();
  expect(await page.evaluate(() => window.contactEvents)).toEqual([
    { channel: "telegram", placement: "main", language: "en" },
    { channel: "email", placement: "floating", language: "en" },
  ]);
  expect(
    requests.every((url) => new URL(url).origin === "http://127.0.0.1:4187"),
  ).toBe(true);
  expect(await page.context().cookies()).toEqual([]);
});

test("English and Russian language labels use the small Armenian subset", async ({
  page,
}) => {
  const fonts = [];
  page.on("request", (request) => {
    if (request.url().endsWith(".woff2")) fonts.push(request.url());
  });
  for (const lang of ["en", "ru"]) {
    await page.goto(`/${lang}/`);
    await page.evaluate(() => document.fonts.ready);
  }
  expect(fonts.some((url) => url.endsWith("armenian-navigation.woff2"))).toBe(
    true,
  );
  expect(fonts.some((url) => /armenian-(regular|bold)\.woff2$/.test(url))).toBe(
    false,
  );
});
