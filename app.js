"use strict";

const translations = window.ARMMATE_TRANSLATIONS;
const seo = window.ARMMATE_SEO;
// Resolve shared resources before a language switch changes the visible URL.
const siteRoot = new URL(
  ".",
  document.querySelector('script[src*="app.js"]').src,
);
const assetUrl = (filename) => new URL("assets/" + filename, siteRoot).href;
const languageUrl = (lang) => new URL(seo.paths[lang], siteRoot);
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {}
  },
};
const supportedLanguages = ["hy", "ru", "en"];
const queryLanguage = new URLSearchParams(location.search).get("lang");
let language = supportedLanguages.includes(queryLanguage)
  ? queryLanguage
  : document.documentElement.lang;
let activeFilter = "all";
let lastDialogTrigger;
let toastTimeout;
let creditsData;
const dialog = $("#detail-dialog");
const contactWidget = $("#contact-widget");

function closeContactWidget(restoreFocus = false) {
  if (!contactWidget.open) return;
  contactWidget.open = false;
  if (restoreFocus)
    contactWidget.querySelector("summary").focus({ preventScroll: true });
}

function closeMenu() {
  $(".menu-toggle").setAttribute("aria-expanded", "false");
  $("#navigation").classList.remove("open");
}

function renderList(selector, items) {
  $(selector).innerHTML = items
    .map((item) => `<li>${icon("check")}<span>${item}</span></li>`)
    .join("");
}

function updateLanguageUrl() {
  const url = languageUrl(language);
  url.search = location.search;
  url.searchParams.delete("lang");
  url.hash = location.hash;
  history.replaceState({}, "", url);
}

function setLanguage(next, updateUrl = true) {
  if (!supportedLanguages.includes(next)) return;
  language = next;
  const t = translations[language];
  seo.updateDocument(document, language, t);
  $$("[data-t]").forEach((el) => {
    el.textContent = t[el.dataset.t];
  });
  $$("[data-html]").forEach((el) => {
    el.innerHTML = t[el.dataset.html];
  });
  $$("[data-placeholder]").forEach((el) => {
    el.placeholder = t[el.dataset.placeholder];
  });
  $$("[data-alt]").forEach((el) => {
    el.alt = t[el.dataset.alt];
  });
  $$("[data-label]").forEach((el) =>
    el.setAttribute("aria-label", t[el.dataset.label]),
  );
  $$("[data-lang]").forEach((el) => {
    el.href = languageUrl(el.dataset.lang).href;
    if (el.dataset.lang === language) el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  });
  $("#navigation").setAttribute("aria-label", t.mainNav);
  $("#languages").setAttribute("aria-label", t.languageLabel);
  $$("a.brand").forEach((link) =>
    link.setAttribute("aria-label", `armmate — ${t.brandName}`),
  );
  $(".menu-toggle").setAttribute("aria-label", t.menu);
  $(".filters").setAttribute("aria-label", t.categoriesLabel);
  $$("[data-content-link]").forEach((link) => {
    link.href = new URL(
      seo.contentPaths[link.dataset.contentLink][language],
      siteRoot,
    ).href;
  });
  $("#support-categories").innerHTML = t.categories
    .map(([title, text]) => `<div><h4>${title}</h4><p>${text}</p></div>`)
    .join("");
  renderList("#companion-list", t.companionItems);
  renderList("#pricing-factors", t.pricingFactors);
  renderList("#included-list", t.includedItems);
  renderList("#agreed-list", t.agreedItems);
  renderExperiences();
  renderFaq();
  storage.set("armmate-language", language);
  if (updateUrl || supportedLanguages.includes(queryLanguage)) {
    updateLanguageUrl();
  }
  closeMenu();
}

function renderExperiences() {
  const t = translations[language];
  const ids = ["all", "city", "culture", "nature"];
  $(".filters").innerHTML = t.filters
    .map(
      (label, index) =>
        `<button type="button" data-filter="${ids[index]}" aria-pressed="${activeFilter === ids[index]}">${label}</button>`,
    )
    .join("");
  $("#experience-grid").innerHTML = t.cards
    .filter((card) => activeFilter === "all" || card.id === activeFilter)
    .map(
      (card) => `
    <button class="experience-card" type="button" data-card="${card.id}">
      <div class="card-image"><img src="${assetUrl(card.image + "-800.webp")}" srcset="${assetUrl(card.image + "-480.webp")} 480w, ${assetUrl(card.image + "-800.webp")} 800w, ${assetUrl(card.image + ".webp")} 1200w" sizes="(max-width: 650px) calc(100vw - 42px), (max-width: 900px) 30vw, 400px" width="1200" height="800" alt="${escapeHtml(card.alt)}" loading="lazy" decoding="async"><span class="card-tag"><span></span>${card.tag}</span></div>
      <div class="card-content"><span class="card-kicker">${icon("pin")}${card.location}</span><h3>${card.title}</h3><p>${card.text}</p><div class="card-bottom"><span>${t.cardMore}</span><span class="card-arrow">${icon("diagonal")}</span></div></div>
    </button>`,
    )
    .join("");
}

function renderFaq() {
  const openIndexes = $$("#faq-list details").flatMap((el, index) =>
    el.open ? [index] : [],
  );
  $("#faq-list").innerHTML = translations[language].faq
    .map(
      ([q, a], index) =>
        `<details${openIndexes.includes(index) ? " open" : ""}><summary>${q}</summary><p>${a}</p></details>`,
    )
    .join("");
}

function openDialog(html, { experience = false } = {}) {
  lastDialogTrigger = document.activeElement;
  closeContactWidget();
  dialog.classList.toggle("dialog-experience", experience);
  $("#dialog-body").innerHTML = html;
  $("#dialog-body h2").id = "dialog-title";
  dialog.setAttribute("aria-labelledby", "dialog-title");
  dialog.showModal();
  if (experience) {
    dialog.focus({ preventScroll: true });
    dialog.scrollTop = 0;
  }
  document.body.style.overflow = "hidden";
}

function showExperience(id) {
  const t = translations[language];
  const card = t.cards.find((item) => item.id === id);
  if (!card) return;
  openDialog(
    `<img src="${assetUrl(card.image + "-800.webp")}" alt="${escapeHtml(card.alt)}"><span class="eyebrow">${card.location}</span><h2>${card.title}</h2><p>${card.detail}</p><p class="demo-notice">${t.ideaNote}</p><button class="button" type="button" data-discuss>${t.choose}${icon("diagonal")}</button>`,
    { experience: true },
  );
}

function toast(message) {
  $("#toast").textContent = message;
  $("#toast").classList.add("visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(
    () => $("#toast").classList.remove("visible"),
    3500,
  );
}

$$("[data-lang]").forEach((link) =>
  link.addEventListener("click", (event) => {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    event.preventDefault();
    setLanguage(link.dataset.lang);
  }),
);
$(".menu-toggle").addEventListener("click", () => {
  const open = $(".menu-toggle").getAttribute("aria-expanded") !== "true";
  $(".menu-toggle").setAttribute("aria-expanded", String(open));
  $("#navigation").classList.toggle("open", open);
});
$$("#navigation a").forEach((link) =>
  link.addEventListener("click", closeMenu),
);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeContactWidget(true);
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".header")) closeMenu();
  if (!event.target.closest("#contact-widget")) closeContactWidget();
});
document.addEventListener("focusin", (event) => {
  if (!contactWidget.contains(event.target)) closeContactWidget();
});
contactWidget.addEventListener("click", (event) => {
  if (event.target.closest("[data-quick-channel]")) closeContactWidget(true);
});
$(".filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  renderExperiences();
  $(`.filters [data-filter="${activeFilter}"]`).focus({ preventScroll: true });
});
$("#experience-grid").addEventListener("click", (event) => {
  const card = event.target.closest("[data-card]");
  if (card) showExperience(card.dataset.card);
});
$(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  )
    dialog.close();
});
dialog.addEventListener("close", () => {
  document.body.style.overflow = "";
  if (lastDialogTrigger?.isConnected)
    lastDialogTrigger.focus({ preventScroll: true });
});
dialog.addEventListener("click", (event) => {
  if (event.target.closest("[data-discuss]")) {
    lastDialogTrigger = $("#channel-links a");
    dialog.close();
    $("#plan").scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    $("#channel-links a").focus({ preventScroll: true });
  }
});
$("#credits-button").addEventListener("click", async () => {
  const t = translations[language];
  try {
    if (!creditsData) {
      const response = await fetch(assetUrl("credits.json"));
      if (!response.ok) throw new Error("Photo credits unavailable");
      creditsData = await response.json();
    }
    openDialog(
      `<span class="eyebrow">${t.brandName} / ${t.credits}</span><h2>${t.creditsTitle}</h2><p>${t.creditsNote}</p><div class="credits-list">${creditsData.map((item) => `<div><strong>${escapeHtml(item.image.replace("assets/", ""))}</strong><p>${escapeHtml(item.author)} · <a href="${escapeHtml(item.licenseUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.license)}</a></p><a href="${escapeHtml(item.source)}" target="_blank" rel="noopener noreferrer">${t.source} ↗</a></div>`).join("")}<p>${t.fontCredits}</p></div>`,
    );
  } catch {
    toast(t.creditsError);
  }
});
const hero = $(".hero-image");
$$('[data-contact-logo="email"]').forEach((image) => {
  image.src = assetUrl("email-logo.png");
});
hero.src = assetUrl("ararat-800.webp");
hero.srcset = [480, 800, 1200]
  .map((size) => `${assetUrl(`ararat-${size}.webp`)} ${size}w`)
  .join(", ");
// Keep the complete static HTML on a normal load. Re-render only when an old
// query-string link requests a different language, or the visitor switches it.
if (language === document.documentElement.lang) {
  storage.set("armmate-language", language);
  if (supportedLanguages.includes(queryLanguage)) updateLanguageUrl();
} else setLanguage(language, false);
