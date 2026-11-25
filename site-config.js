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
    // Official Maps profile checked against the business name, website and contacts.
    verifiedProfiles: Object.freeze([
      "https://www.google.com/maps/place/armmate/data=!4m2!3m1!1s0x0:0xd6718f4fe13d50b7",
    ]),
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
