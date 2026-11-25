const { parseHTML } = require("linkedom");
const prettier = require("prettier");
const path = require("node:path");
const seo = require("../seo.js");
const content = require("./search-content.cjs");

const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
const arrow = '<svg aria-hidden="true"><use href="#i-diagonal" /></svg>';

module.exports = async function buildContentPages({
  root,
  homes,
  translations,
  output,
}) {
  for (const family of Object.keys(seo.contentPaths)) {
    for (const language of seo.languages) {
      const route = seo.contentPaths[family][language];
      const prefix = "../".repeat(route.split("/").filter(Boolean).length);
      const { document } = parseHTML(homes[language]);
      const t = translations[language];
      const copy = { ...t, ...content[family][language] };
      const $ = (selector) => document.querySelector(selector);
      const home = prefix + seo.paths[language];
      const contactSection = $("#plan").cloneNode(true);
      if (family === "contact") {
        contactSection.querySelector(".plan-copy").remove();
        contactSection.classList.add("contact-page-details");
        const title = contactSection.querySelector("#contact-title");
        const heading = document.createElement("h2");
        for (const attribute of title.attributes) {
          heading.setAttribute(attribute.name, attribute.value);
        }
        heading.innerHTML = title.innerHTML;
        title.replaceWith(heading);
      }
      const sections = copy.sections
        .map(
          (section) =>
            `<section class="content-section"><h2>${escape(section.title)}</h2>${section.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join("")}${section.bullets ? `<ul>${section.bullets.map((item) => `<li>${escape(item)}</li>`).join("")}</ul>` : ""}</section>`,
        )
        .join("");
      const relatedFamilies = (
        seo.guideFamilies.includes(family)
          ? ["planning", "assistance", "companion", "contact"]
          : ["assistance", "companion", "planning", "contact"]
      )
        .filter((item) => item !== family)
        .slice(0, 3);
      const related = relatedFamilies
        .map(
          (item) =>
            `<a class="content-related-link" href="${prefix + seo.contentPaths[item][language]}"><span>${escape(content[item][language].h1)}</span>${arrow}</a>`,
        )
        .join("");
      const hero = `<section class="container content-hero"><nav class="content-breadcrumbs" aria-label="${escape(t.breadcrumbLabel)}"><a href="${home}">${escape(t.homeLabel)}</a><span aria-hidden="true">/</span><span>${escape(copy.h1)}</span></nav><p class="eyebrow">${escape(t.heroLabel)}</p><h1>${escape(copy.h1)}</h1><p class="content-lead">${escape(copy.lead)}</p>${family !== "contact" ? `<a class="button" href="#plan">${escape(t.contactCta)}${arrow}</a>` : ""}</section>`;
      const destinations =
        family === "planning"
          ? `<section class="container content-related"><h2>${escape(t.destinationGuidesTitle)}</h2><div>${seo.guideFamilies
              .filter((item) => item !== "planning")
              .map(
                (item) =>
                  `<a class="content-related-link content-destination-link" href="${prefix + seo.contentPaths[item][language]}"><span>${escape(content[item][language].h1)}</span>${arrow}</a>`,
              )
              .join("")}</div></section>`
          : "";
      const sources = copy.sources
        ? `<aside class="container content-sources" aria-labelledby="sources-title"><h2 id="sources-title">${escape(t.sourcesTitle)}</h2><p>${escape(t.sourcesNote)}</p><ul>${copy.sources.map((source) => `<li><a href="${escape(source.url)}">${escape(source.label)}</a></li>`).join("")}</ul><p>${escape(t.reviewedLabel)} <time datetime="${seo.updated}">${seo.updated}</time></p></aside>`
        : "";
      const article = `<article class="container content-sections" aria-labelledby="content-title">${sections}</article>${destinations}<section class="container content-faq" id="faq"><h2>${escape(t.faqHeading)}</h2><div class="faq-list">${copy.faq.map(([question, answer]) => `<details><summary>${escape(question)}</summary><p>${escape(answer)}</p></details>`).join("")}</div></section>${sources}<section class="container content-related"><h2>${escape(t.relatedTitle)}</h2><div>${related}</div></section>`;
      $("main").innerHTML =
        family === "contact"
          ? hero + contactSection.outerHTML + article
          : hero + article + contactSection.outerHTML;
      document.body.classList.add("content-page");
      $("h1").id = "content-title";
      document.body.setAttribute("data-content-family", family);
      if (family === "contact") $(".content-hero .eyebrow").remove();
      $("#detail-dialog").remove();
      $("#toast").remove();
      $(".noscript").textContent = t.contactNoScript;
      document
        .querySelectorAll('link[rel="preload"][as="image"]')
        .forEach((node) => node.remove());
      document.querySelectorAll("script[src]").forEach((node) => node.remove());
      const script = document.createElement("script");
      script.setAttribute("src", prefix + "content.js?v=" + seo.assetVersion);
      script.setAttribute("defer", "");
      document.head.append(script);
      const analytics = document.createElement("script");
      analytics.setAttribute(
        "src",
        prefix + "analytics.js?v=" + seo.assetVersion,
      );
      analytics.setAttribute("defer", "");
      document.head.append(analytics);
      document
        .querySelectorAll("a.brand")
        .forEach((link) => link.setAttribute("href", home));
      document.querySelectorAll("[data-content-link]").forEach((link) => {
        const targetFamily = link.getAttribute("data-content-link");
        link.setAttribute(
          "href",
          prefix + seo.contentPaths[targetFamily][language],
        );
      });
      document
        .querySelectorAll("#navigation a")
        .forEach((link) =>
          link.setAttribute("href", home + link.getAttribute("href")),
        );
      document.querySelectorAll("[data-lang]").forEach((link) => {
        const other = link.getAttribute("data-lang");
        link.setAttribute("href", prefix + seo.contentPaths[family][other]);
      });
      // Rebase shared assets from the localized home URL to this deeper route.
      document.querySelectorAll("[src], link[href]").forEach((node) => {
        const attribute = node.hasAttribute("src") ? "src" : "href";
        const raw = node.getAttribute(attribute);
        if (/^(https?:|data:|#)/.test(raw)) return;
        if (node === script || node === analytics) return;
        const resource = new URL(raw, seo.pageUrl(language));
        if (
          /^\/assets\//.test(resource.pathname) ||
          /\.(css|js)$/.test(resource.pathname)
        ) {
          node.setAttribute(
            attribute,
            prefix + resource.pathname.slice(1) + resource.search,
          );
        }
      });
      seo.updateDocument(document, language, copy, family);
      const filename = route + "index.html";
      output(
        filename,
        await prettier.format(document.toString(), {
          filepath: path.join(root, filename),
        }),
      );
    }
  }
};
