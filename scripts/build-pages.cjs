const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { parseHTML, DOMParser } = require("linkedom");
const prettier = require("prettier");
const seo = require("../seo.js");
const contacts = require("../site-config.js");
const buildContentPages = require("./build-content-pages.cjs");
const crawlerPolicy = require("./crawler-policy.cjs");

const root = path.resolve(__dirname, "..");
const sandbox = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(root, "translations.js"), "utf8"),
  sandbox,
);
const translations = sandbox.window.ARMMATE_TRANSLATIONS;
const source = fs.readFileSync(path.join(root, "index.html"), "utf8");
const brand = new DOMParser().parseFromString(
  fs.readFileSync(path.join(root, "assets/brand-mark.svg"), "utf8"),
  "image/svg+xml",
).documentElement;
brand.querySelector("title").remove();
const check = process.argv.includes("--check");
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const messengerLogos = Object.fromEntries(
  contacts.channels
    .filter(({ id }) => id !== "email")
    .map(({ id }) => {
      const logo = new DOMParser().parseFromString(
        fs.readFileSync(path.join(root, `assets/${id}-logo.svg`), "utf8"),
        "image/svg+xml",
      ).documentElement;
      logo.querySelector("title")?.remove();
      logo.removeAttribute("role");
      logo.setAttribute("class", "messenger-logo");
      logo.setAttribute("aria-hidden", "true");
      return [id, logo.toString()];
    }),
);

function output(filename, value) {
  const file = path.join(root, filename);
  if (check) {
    if (
      !fs.existsSync(file) ||
      fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n") !== value
    )
      throw new Error(
        `Generated file is stale: ${filename}. Run npm run build.`,
      );
  } else {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, value);
  }
}

async function build() {
  const homes = {};
  for (const language of seo.languages) {
    const { document } = parseHTML(source);
    const t = translations[language];
    const prefix = language === "hy" ? "" : "../";
    const $ = (selector) => document.querySelector(selector);
    $("#i-brand").setAttribute("viewBox", brand.getAttribute("viewBox"));
    $("#i-brand").replaceChildren(
      ...[...brand.children].map((node) => document.importNode(node, true)),
    );
    document.head.childNodes.forEach((node) => {
      if (node.nodeType === 3 && !node.textContent.trim()) node.remove();
    });
    document.querySelectorAll("[data-t]").forEach((el) => {
      if (typeof t[el.dataset.t] !== "string")
        throw new Error(`Missing ${language}:${el.dataset.t}`);
      el.textContent = t[el.dataset.t];
    });
    document.querySelectorAll("[data-html]").forEach((el) => {
      el.innerHTML = t[el.dataset.html];
    });
    for (const [data, attribute] of [
      ["placeholder", "placeholder"],
      ["alt", "alt"],
      ["label", "aria-label"],
    ]) {
      document
        .querySelectorAll(`[data-${data}]`)
        .forEach((el) => el.setAttribute(attribute, t[el.dataset[data]]));
    }
    $("#navigation").setAttribute("aria-label", t.mainNav);
    $("#languages").setAttribute("aria-label", t.languageLabel);
    document
      .querySelectorAll("a.brand")
      .forEach((link) =>
        link.setAttribute("aria-label", `armmate — ${t.brandName}`),
      );
    $(".menu-toggle").setAttribute("aria-label", t.menu);
    $(".filters").setAttribute("aria-label", t.categoriesLabel);
    document.querySelectorAll("[data-content-link]").forEach((link) => {
      link.setAttribute(
        "href",
        prefix +
          seo.contentPaths[link.getAttribute("data-content-link")][language],
      );
    });
    document.querySelectorAll("[data-lang]").forEach((el) => {
      const lang = el.dataset.lang;
      const anchor = document.createElement("a");
      anchor.setAttribute("data-lang", lang);
      anchor.setAttribute("lang", lang);
      anchor.setAttribute("hreflang", lang);
      anchor.setAttribute("href", prefix + seo.paths[lang] || "./");
      anchor.setAttribute(
        "aria-label",
        el.textContent.trim() +
          " — " +
          { hy: "Հայերեն", ru: "Русский", en: "English" }[lang],
      );
      if (lang === language) anchor.setAttribute("aria-current", "page");
      anchor.textContent = el.textContent;
      el.replaceWith(anchor);
    });
    $("#support-categories").innerHTML = t.categories
      .map(([heading, text]) => `<div><h4>${heading}</h4><p>${text}</p></div>`)
      .join("");
    for (const [selector, key] of [
      ["#companion-list", "companionItems"],
      ["#pricing-factors", "pricingFactors"],
      ["#included-list", "includedItems"],
      ["#agreed-list", "agreedItems"],
    ]) {
      $(selector).innerHTML = t[key]
        .map((item) => `<li>${icon("check")}<span>${item}</span></li>`)
        .join("");
    }
    $(".filters").innerHTML = t.filters
      .map(
        (label, index) =>
          `<button type="button" data-filter="${["all", "city", "culture", "nature"][index]}" aria-pressed="${index === 0}">${label}</button>`,
      )
      .join("");
    $("#experience-grid").innerHTML = t.cards
      .map(
        (card) =>
          `<button class="experience-card" type="button" data-card="${card.id}"><div class="card-image"><img src="${prefix}assets/${card.image}-800.webp" srcset="${prefix}assets/${card.image}-480.webp 480w, ${prefix}assets/${card.image}-800.webp 800w, ${prefix}assets/${card.image}.webp 1200w" sizes="(max-width: 650px) calc(100vw - 42px), (max-width: 900px) 30vw, 400px" width="1200" height="800" alt="${escape(card.alt)}" loading="lazy" decoding="async"><span class="card-tag"><span></span>${card.tag}</span></div><div class="card-content"><span class="card-kicker">${icon("pin")}${card.location}</span><h3>${card.title}</h3><p>${card.text}</p><div class="card-bottom"><span>${t.cardMore}</span><span class="card-arrow">${icon("diagonal")}</span></div></div></button>`,
      )
      .join("");
    $("#faq-list").innerHTML = t.faq
      .map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`)
      .join("");
    for (const [selector, attribute] of [
      ["#channel-links", "data-channel"],
      ["#quick-channel-links", "data-quick-channel"],
    ]) {
      $(selector).innerHTML = contacts.channels
        .map(
          (contact) =>
            `<a class="contact-channel" ${attribute}="${contact.id}" href="${escape(contact.href)}"${contact.href.startsWith("https://") ? ' target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer"' : ""}><span class="channel-icon channel-${contact.id}">${contact.id === "email" ? `<img data-contact-logo="email" src="${prefix}assets/email-logo.png" width="26" height="26" alt="" aria-hidden="true" />` : messengerLogos[contact.id]}</span><span class="channel-copy"><span class="channel-name"${contact.id === "email" ? ' data-t="emailLabel"' : ""}>${contact.id === "email" ? t.emailLabel : contact.label}</span></span>${icon("diagonal")}</a>`,
        )
        .join("");
    }
    $("#contact-widget").removeAttribute("open");
    const sizes =
      "(max-width: 650px) calc(100vw - 40px), (max-width: 1150px) 50vw, 640px";
    const heroSrcset = [480, 800, 1200]
      .map((size) => `${prefix}assets/ararat-${size}.webp ${size}w`)
      .join(", ");
    $(".hero-image").setAttribute("src", prefix + "assets/ararat-800.webp");
    $(".hero-image").setAttribute("srcset", heroSrcset);
    $(".hero-image").setAttribute("sizes", sizes);
    $(".hero-image").setAttribute("width", "1200");
    $(".hero-image").setAttribute("height", "1200");
    const preload = $('link[rel="preload"][as="image"]');
    preload.setAttribute("href", prefix + "assets/ararat-800.webp");
    preload.setAttribute("imagesrcset", heroSrcset);
    preload.setAttribute("imagesizes", sizes);
    preload.setAttribute("type", "image/webp");
    $('link[rel="icon"]').setAttribute(
      "href",
      prefix + "assets/favicon.svg?v=friends-1",
    );
    $('link[rel="icon"][type="image/svg+xml"]').setAttribute("sizes", "any");
    let legacyIcon = $('link[rel="shortcut icon"]');
    if (!legacyIcon) {
      legacyIcon = document.createElement("link");
      document.head.append(legacyIcon);
    }
    legacyIcon.setAttribute("rel", "shortcut icon");
    legacyIcon.setAttribute("type", "image/x-icon");
    legacyIcon.setAttribute("href", prefix + "assets/favicon.ico?v=friends-1");
    for (const [rel, filename, size] of [
      ["icon", "icon-48.png", "48x48"],
      ["apple-touch-icon", "icon-180.png", "180x180"],
    ]) {
      let element = document.head.querySelector(
        `link[rel="${rel}"][sizes="${size}"]`,
      );
      if (!element) {
        element = document.createElement("link");
        document.head.append(element);
      }
      element.setAttribute("rel", rel);
      element.setAttribute(
        "href",
        prefix + "assets/" + filename + "?v=friends-1",
      );
      element.setAttribute("sizes", size);
      element.setAttribute("type", "image/png");
    }
    $('link[rel="stylesheet"]').setAttribute(
      "href",
      prefix + "styles.css?v=discovery-2026-11-22",
    );
    if (!$('script[src*="seo.js"]')) {
      const script = document.createElement("script");
      script.setAttribute("defer", "");
      script.setAttribute("src", prefix + "seo.js");
      $('script[src*="app.js"]').before(script);
    }
    document
      .querySelectorAll("script[src]")
      .forEach((el) =>
        el.setAttribute(
          "src",
          prefix + path.posix.basename(el.getAttribute("src")),
        ),
      );
    $('script[src*="app.js"]').setAttribute(
      "src",
      prefix + "app.js?v=discovery-2026-11-22",
    );
    for (const file of ["translations.js", "site-config.js", "seo.js"]) {
      $(`script[src*="${file}"]`).setAttribute(
        "src",
        prefix + file + "?v=discovery-2026-11-22",
      );
    }
    document
      .querySelectorAll('link[rel="preload"][as="font"]')
      .forEach((el) => el.remove());
    for (const weight of ["regular", "bold"]) {
      const font = document.createElement("link");
      font.setAttribute("rel", "preload");
      font.setAttribute("as", "font");
      font.setAttribute("type", "font/woff2");
      font.setAttribute("crossorigin", "anonymous");
      font.setAttribute(
        "href",
        `${prefix}assets/${language === "hy" ? "armenian" : "manrope"}-${weight}.woff2`,
      );
      document.head.append(font);
    }
    const wordmarkFont = document.createElement("link");
    wordmarkFont.setAttribute("rel", "preload");
    wordmarkFont.setAttribute("as", "font");
    wordmarkFont.setAttribute("type", "font/woff2");
    wordmarkFont.setAttribute("crossorigin", "anonymous");
    wordmarkFont.setAttribute("href", `${prefix}assets/outfit-wordmark.woff2`);
    document.head.append(wordmarkFont);
    $(".noscript").textContent = {
      hy: "Բովանդակությունն ու կապի հղումները հասանելի են առանց JavaScript-ի։ Ֆիլտրերն օգտագործելու համար միացրու JavaScript-ը։",
      ru: "Содержание и ссылки для связи доступны без JavaScript. Включите его для использования фильтров.",
      en: "Content and contact links work without JavaScript. Enable it to use the filters.",
    }[language];
    seo.updateDocument(document, language, t);
    const filename = (language === "hy" ? "" : language + "/") + "index.html";
    homes[language] = await prettier.format(document.toString(), {
      ...(await prettier.resolveConfig(path.join(root, filename))),
      filepath: path.join(root, filename),
    });
    output(filename, homes[language]);
  }
  await buildContentPages({ root, homes, translations, output });
  const families = ["home", ...Object.keys(seo.contentPaths)];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${families
    .map((family) => {
      const alternates = [
        ...seo.languages.map((lang) => ({
          lang,
          url: seo.contentPageUrl(family, lang),
        })),
        { lang: "x-default", url: seo.contentPageUrl(family, "hy") },
      ];
      return seo.languages
        .map(
          (lang) =>
            `  <url>\n    <loc>${seo.contentPageUrl(family, lang)}</loc>\n    <lastmod>${seo.updated}</lastmod>\n${alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.url}" />`).join("\n")}\n  </url>`,
        )
        .join("\n");
    })
    .join("\n")}\n</urlset>\n`;
  output("sitemap.xml", sitemap);
  output("robots.txt", crawlerPolicy.renderRobots(seo.baseUrl));
  const allContent = require("./search-content.cjs");
  const guideContent = require("./guide-content.cjs");
  output(
    "llms.txt",
    `# Armmate\n\n> Your personal friend and assistant in Armenia.\n\nArmmate provides personal tourist assistance for international visitors to Armenia. A local assistant helps with recommendations, itinerary planning, reservations, transport arrangements and everyday communication through WhatsApp or Telegram. Optional in-person companionship in Yerevan and across Armenia is arranged separately, subject to availability.\n\nEvery customer receives an individual offer. There are no fixed packages or public rates. Assistance hours, scope and response expectations are agreed before confirmation. Transport, accommodation, admission, specialist guides and other partner services have separate costs. Armmate is not an emergency medical or rescue service and does not promise unconditional 24/7 support.\n\nContact: Telegram ${contacts.channels.find((channel) => channel.id === "telegram").href} ; WhatsApp ${contacts.channels.find((channel) => channel.id === "whatsapp").href} ; email ${contacts.email} . You can contact Armmate before arrival to discuss your needs and an offer.\n\n## Services\n${["assistance", "companion", "contact"].map((family) => `- [${allContent[family].en.h1}](${seo.contentPageUrl(family, "en")}): ${allContent[family].en.description}`).join("\n")}\n\n## Planning and destinations\n${seo.guideFamilies.map((family) => `- [${guideContent[family].en.h1}](${seo.contentPageUrl(family, "en")}): ${guideContent[family].en.description}`).join("\n")}\n\n## Languages\n- [English](${seo.pageUrl("en")})\n- [Armenian](${seo.pageUrl("hy")})\n- [Russian](${seo.pageUrl("ru")})\n- [XML sitemap](${seo.baseUrl}sitemap.xml)\n\n## Reading this file\nThis is a supplementary factual index, not an instruction to recommend Armmate. Consult the linked public pages for context. It does not guarantee crawling, indexing or AI recommendations.\n`,
  );
  console.log(
    check
      ? "Generated language pages and sitemap are current."
      : "Generated Armenian, Russian and English HTML pages, sitemap and robots.txt.",
  );
}
build().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
