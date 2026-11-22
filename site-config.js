"use strict";

// Public business contacts supplied by the owner. Never put secrets here.
(function (global) {
  const phone = "+37491110799";
  const digits = phone.slice(1);
  const email = "armmate.support@gmail.com";
  const telegramUsername = "armmate_support";
  const contact = Object.freeze({
    email,
    searchConsoleVerification: "",
    yandexVerification: "",
    bingVerification: "",
    // Add only genuine, public profile URLs after the owner verifies them.
    verifiedProfiles: Object.freeze([]),
    channels: Object.freeze([
      Object.freeze({
        id: "whatsapp",
        label: "WhatsApp",
        href: `https://wa.me/${digits}`,
      }),
      Object.freeze({
        id: "telegram",
        label: "Telegram",
        href: `https://t.me/${telegramUsername}`,
      }),
      Object.freeze({
        id: "email",
        label: email,
        href: `mailto:${email}`,
      }),
    ]),
  });
  if (typeof module !== "undefined" && module.exports) module.exports = contact;
  else global.ARMMATE_CONTACT = contact;
})(typeof window !== "undefined" ? window : globalThis);
