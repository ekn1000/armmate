"use strict";

(function (global) {
  const contacts =
    typeof module !== "undefined" && module.exports
      ? require("./site-config.js")
      : global.ARMMATE_CONTACT;
  const baseUrl = "https://armmate.am/";
  const locales = { hy: "hy_AM", ru: "ru_RU", en: "en_GB" };
  const paths = { hy: "", ru: "ru/", en: "en/" };
  const contentPaths = {
    assistance: {
      hy: "tourist-assistance/",
      ru: "ru/pomoshch-turistam-v-armenii/",
      en: "en/tourist-assistance-armenia/",
    },
    companion: {
      hy: "local-companion/",
      ru: "ru/soprovozhdenie-turistov-v-erevane/",
      en: "en/local-companion-yerevan/",
    },
    contact: {
      hy: "contact/",
      ru: "ru/kontakty/",
      en: "en/contact/",
    },
    planning: {
      hy: "travel-planning/",
      ru: "ru/samostoyatelnoe-puteshestvie-po-armenii/",
      en: "en/visit-armenia-without-tour-guide/",
    },
    yerevan: {
      hy: "destinations/yerevan/",
      ru: "ru/napravleniya/erevan/",
      en: "en/destinations/yerevan/",
    },
    garni: {
      hy: "destinations/garni-geghard/",
      ru: "ru/napravleniya/garni-gegard/",
      en: "en/destinations/garni-geghard/",
    },
    sevan: {
      hy: "destinations/lake-sevan/",
      ru: "ru/napravleniya/ozero-sevan/",
      en: "en/destinations/lake-sevan/",
    },
    dilijan: {
      hy: "destinations/dilijan/",
      ru: "ru/napravleniya/dilizhan/",
      en: "en/destinations/dilijan/",
    },
    gyumri: {
      hy: "destinations/gyumri/",
      ru: "ru/napravleniya/gyumri/",
      en: "en/destinations/gyumri/",
    },
    khorvirap: {
      hy: "destinations/khor-virap/",
      ru: "ru/napravleniya/khor-virap/",
      en: "en/destinations/khor-virap/",
    },
  };
  const languages = Object.keys(paths);
  const assetVersion = "discovery-2026-11-22-2";
  const guidePlaces = {
    planning: ["Armenia"],
    yerevan: ["Yerevan"],
    garni: ["Garni", "Geghard"],
    sevan: ["Lake Sevan"],
    dilijan: ["Dilijan"],
    gyumri: ["Gyumri"],
    khorvirap: ["Khor Virap"],
  };
  const guideFamilies = [
    "planning",
    "yerevan",
    "garni",
    "sevan",
    "dilijan",
    "gyumri",
    "khorvirap",
  ];
  const updated = "2026-11-22";

  function pageUrl(language) {
    return new URL(paths[language], baseUrl).href;
  }

  function contentPageUrl(family, language) {
    return family === "home"
      ? pageUrl(language)
      : new URL(contentPaths[family][language], baseUrl).href;
  }

  function structuredData(language, copy, family = "home") {
    const url = contentPageUrl(family, language);
    const organization = baseUrl + "#organization";
    const website = baseUrl + "#website";
    const service =
      baseUrl + (family === "companion" ? "#companion-service" : "#service");
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": organization,
          name: copy.brandName,
          alternateName: ["Armmate", "armmate", "արմմեյթ", "арммейт"],
          description: copy.serviceSummary,
          url: baseUrl,
          logo: { "@type": "ImageObject", url: baseUrl + "assets/logo.svg" },
          email: contacts.email,
          areaServed: { "@type": "Country", name: "Armenia" },
          sameAs: contacts.channels
            .filter((contact) => contact.id === "telegram")
            .map((contact) => contact.href)
            .concat(contacts.verifiedProfiles || []),
          contactPoint: {
            "@type": "ContactPoint",
            email: contacts.email,
            contactType: "customer service",
            availableLanguage: ["Armenian", "Russian", "English"],
            url: contentPageUrl("contact", language),
          },
          potentialAction: contacts.channels.map((contact) => ({
            "@type": "CommunicateAction",
            name: copy.contactActionNames[contact.id],
            recipient: { "@id": organization },
            target: contact.href,
          })),
        },
        {
          "@type": "WebSite",
          "@id": website,
          name: copy.brandName,
          url: baseUrl,
          publisher: { "@id": organization },
          inLanguage: languages,
        },
        {
          "@type": family === "contact" ? "ContactPage" : "WebPage",
          "@id": url + "#webpage",
          url,
          name: copy.title,
          description: copy.description,
          inLanguage: language,
          isPartOf: { "@id": website },
          about: { "@id": family === "contact" ? organization : service },
          ...(family !== "home"
            ? { breadcrumb: { "@id": url + "#breadcrumbs" } }
            : {}),
          ...(guideFamilies.includes(family)
            ? { mainEntity: { "@id": url + "#article" } }
            : {}),
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: baseUrl + `assets/social-armmate-friends-${language}.png`,
            width: 1200,
            height: 630,
          },
        },
        {
          "@type": "Service",
          "@id": service,
          name: family === "companion" ? copy.h1 : copy.heroLabel,
          description:
            family === "companion" ? copy.description : copy.serviceSummary,
          serviceType:
            family === "companion"
              ? "Local companion in Yerevan"
              : "Personal travel assistance",
          areaServed: { "@type": "Country", name: "Armenia" },
          provider: { "@id": organization },
          url: contentPageUrl(
            family === "companion" ? "companion" : "assistance",
            language,
          ),
        },
        {
          "@type": "FAQPage",
          "@id": url + "#faq",
          url: url + "#faq",
          inLanguage: language,
          isPartOf: { "@id": url + "#webpage" },
          mainEntity: copy.faq.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        },
        ...(guideFamilies.includes(family)
          ? [
              {
                "@type": "Article",
                "@id": url + "#article",
                headline: copy.h1,
                description: copy.description,
                inLanguage: language,
                mainEntityOfPage: { "@id": url + "#webpage" },
                author: { "@id": organization },
                publisher: { "@id": organization },
                datePublished: "2026-11-22",
                dateModified: updated,
                image:
                  baseUrl + `assets/social-armmate-friends-${language}.png`,
                citation: (copy.sources || []).map((source) => source.url),
                about: guidePlaces[family].map((name) =>
                  name === "Armenia"
                    ? { "@type": "Country", name }
                    : {
                        "@type": "Place",
                        name,
                        containedInPlace: {
                          "@type": "Country",
                          name: "Armenia",
                        },
                      },
                ),
              },
            ]
          : []),
      ].filter((item) => family !== "contact" || item["@type"] !== "Service"),
    };
  }

  function updateDocument(document, language, copy, family = "home") {
    const currentUrl = contentPageUrl(family, language);
    const head = document.head;
    head
      .querySelectorAll(
        'meta[name="description"], meta[name="robots"], meta[name="google-site-verification"], meta[name="yandex-verification"], meta[name="msvalidate.01"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"], link[rel="alternate"][hreflang], link[rel="sitemap"], #structured-data, #breadcrumbs-data',
      )
      .forEach((element) => element.remove());
    function meta(attribute, name, content) {
      let element = head.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        head.append(element);
      }
      element.setAttribute("content", content);
    }
    function link(rel, href, attributes = {}) {
      let element = head.querySelector(
        `link[rel="${rel}"]${attributes.hreflang ? `[hreflang="${attributes.hreflang}"]` : ""}`,
      );
      if (!element) {
        element = document.createElement("link");
        head.append(element);
      }
      element.setAttribute("rel", rel);
      element.setAttribute("href", href);
      for (const [key, value] of Object.entries(attributes))
        element.setAttribute(key, value);
    }
    document.documentElement.lang = language;
    document.title = copy.title;
    meta("name", "description", copy.description);
    meta("name", "robots", "index, follow, max-image-preview:large");
    if (contacts.searchConsoleVerification)
      meta(
        "name",
        "google-site-verification",
        contacts.searchConsoleVerification,
      );
    if (contacts.yandexVerification)
      meta("name", "yandex-verification", contacts.yandexVerification);
    if (contacts.bingVerification)
      meta("name", "msvalidate.01", contacts.bingVerification);
    meta("property", "og:type", "website");
    meta("property", "og:site_name", copy.brandName);
    meta("property", "og:title", copy.title);
    meta("property", "og:description", copy.description);
    meta("property", "og:url", currentUrl);
    meta("property", "og:locale", locales[language]);
    meta(
      "property",
      "og:image",
      baseUrl + `assets/social-armmate-friends-${language}.png`,
    );
    meta("property", "og:image:type", "image/png");
    meta("property", "og:image:width", "1200");
    meta("property", "og:image:height", "630");
    meta("property", "og:image:alt", copy.footerTag);
    head
      .querySelectorAll('meta[property="og:locale:alternate"]')
      .forEach((el) => el.remove());
    for (const other of languages.filter((lang) => lang !== language)) {
      const element = document.createElement("meta");
      element.setAttribute("property", "og:locale:alternate");
      element.setAttribute("content", locales[other]);
      head.append(element);
    }
    meta("name", "twitter:card", "summary_large_image");
    meta("name", "twitter:title", copy.title);
    meta("name", "twitter:description", copy.description);
    meta(
      "name",
      "twitter:image",
      baseUrl + `assets/social-armmate-friends-${language}.png`,
    );
    meta("name", "twitter:image:alt", copy.footerTag);
    link("canonical", currentUrl);
    for (const other of languages)
      link("alternate", contentPageUrl(family, other), { hreflang: other });
    link("alternate", contentPageUrl(family, "hy"), { hreflang: "x-default" });
    link("sitemap", baseUrl + "sitemap.xml", { type: "application/xml" });
    let schema = head.querySelector("#structured-data");
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "structured-data";
      schema.type = "application/ld+json";
      head.append(schema);
    }
    schema.textContent = JSON.stringify(
      structuredData(language, copy, family),
    ).replace(/</g, "\\u003c");
    if (family !== "home") {
      const breadcrumbs = document.createElement("script");
      breadcrumbs.id = "breadcrumbs-data";
      breadcrumbs.type = "application/ld+json";
      breadcrumbs.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": currentUrl + "#breadcrumbs",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.homeLabel,
            item: pageUrl(language),
          },
          { "@type": "ListItem", position: 2, name: copy.h1, item: currentUrl },
        ],
      }).replace(/</g, "\\u003c");
      head.append(breadcrumbs);
    }
  }

  const api = {
    baseUrl,
    locales,
    paths,
    contentPaths,
    contentPageUrl,
    languages,
    assetVersion,
    guidePlaces,
    guideFamilies,
    updated,
    pageUrl,
    structuredData,
    updateDocument,
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else global.ARMMATE_SEO = api;
})(typeof window !== "undefined" ? window : globalThis);
