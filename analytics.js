"use strict";

// A local integration point, with no cookies, storage or network collection.
// An owner-configured analytics adapter can subscribe after consent is handled.
document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-channel], a[data-quick-channel]");
  if (!link) return;
  window.dispatchEvent(
    new CustomEvent("armmate:contact", {
      detail: {
        channel: link.dataset.channel || link.dataset.quickChannel,
        placement: link.dataset.quickChannel ? "floating" : "main",
        language: document.documentElement.lang,
      },
    }),
  );
});
