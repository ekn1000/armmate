# External search visibility: business-owner actions

Status: prepared on 22 November 2026. No accounts, directory listings, reviews, social posts or outreach messages were created or published during this work. Website code is maintained through the existing GitHub Pages workflow; this plan is for separately managed third-party profiles and partnerships.

## Start with existing accounts

The owner reports completing Google Search Console setup with DNS TXT verification and requesting indexing. The public TXT proof is present. Preserve the existing property rather than creating another one. Account reports and individual URL indexing states cannot be inspected without the owner's authenticated access.

A Google Business Profile was being created in the earlier setup conversation. Complete or claim that existing profile; do not create a duplicate. Yandex's genuine HTML ownership file remains available at `https://armmate.am/yandex_9cce45b71192c2d1.html`. Its publication is not proof that the owner clicked the verification button. Check the account for confirmation.

## Platforms and eligibility

| Platform                                                                  | What the owner should do                                                                                                                                                                                       | Evidence and limits                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Google Business Profile](https://business.google.com/)                   | Finish the existing profile and Google's offered verification method. Use the actual brand, website, realistic service hours and available contact fields. Add the approved logo and genuine operating photos. | The real in-person companionship service can support eligibility as a service-area business. A purely online business does not qualify on that basis. Keep a verification-only address hidden if customers are not received there. Do not publish that address in website schema merely to fill a field. |
| [Bing Webmaster Tools](https://www.bing.com/webmasters/)                  | Add the site, preferably by importing the existing Search Console property if offered. Otherwise obtain a genuine verification tag. Submit the sitemap and inspect key English pages.                          | `site-config.js` supports the real `msvalidate.01` value. Nothing is emitted while it is empty. No ownership or Bing indexing is claimed.                                                                                                                                                                |
| [Bing Places](https://www.bingplaces.com/)                                | Check whether the business type and Armenia are supported in the current product. If eligible, claim or create one accurate profile and complete verification.                                                 | Do not choose another country or invent a storefront to make a form accept a listing. Availability and fields vary by product and region.                                                                                                                                                                |
| [Tripadvisor for owners](https://www.tripadvisor.com/Owners)              | Check the current listing criteria for the actual in-person activity offered. Apply only if the service meets the appropriate visitor-experience requirements.                                                 | General online assistance does not automatically qualify as an attraction or tour. Do not manufacture tours, listings or reviews to gain eligibility.                                                                                                                                                    |
| [Armenia Travel](https://armenia.travel/contact-us/)                      | Ask about legitimate tourism-provider information or suitable cooperation once the operating details are ready.                                                                                                | No affiliation, approval or endorsement is currently claimed. The site links to Armenia Travel as a factual resource only.                                                                                                                                                                               |
| [Spyur](https://www.spyur.am/) and relevant Armenian business directories | Establish one accurate service listing using the actual name, website, service area and contact methods allowed by the platform.                                                                               | Check an existing entry before adding a new one. Use a public address only if it is intentionally public and accurate.                                                                                                                                                                                   |
| Hotels, hostels and accommodation hosts                                   | Develop real referral relationships for guests who want independent travel with a local contact. Provide a clear service description and actual agreed terms.                                                  | The owner must approve and conduct outreach. No messages or partnership claims have been sent or added.                                                                                                                                                                                                  |
| Travel writers and genuine traveller communities                          | Offer useful local knowledge, disclose the business relationship when relevant and follow community rules. Suggest a relevant guide only when it answers the question.                                         | Avoid purchased links, invented mentions, automated forum replies and repeated promotional posts.                                                                                                                                                                                                        |

Google's [representation guidelines](https://support.google.com/business/answer/3038177?hl=en) and [service-area guidance](https://support.google.com/business/answer/9157481?hl=en) govern the Business Profile. Search Console domain verification and Business Profile business verification are separate processes.

## Consistent public identity

- Brand: `armmate` in the approved wordmark; `Armmate` in English prose, `արմմեյթ` in Armenian and `арммейт` in Russian. Use the real-world business name in a listing, without appended search keywords or repeated multilingual names.
- Main website: `https://armmate.am/`. An English-language listing can link directly to `https://armmate.am/en/`.
- Telegram: `https://t.me/armmate_support`.
- WhatsApp: `https://wa.me/37491110799`; no calling link is added to the website.
- Email: `armmate.support@gmail.com`.
- Pricing: individual offers, agreed in advance. Transport, accommodation, tickets, specialist guides and other partner services are separate expenses.
- Hours and response expectations: use real operating arrangements; do not imply unconditional 24/7 support.

The owner chose to remove visible secondary username/email lines from website buttons. Their destinations and machine-readable email remain available. Do not reintroduce those display lines or a public office address as an incidental SEO change.

## Ready-to-use English description

> Armmate provides personal travel assistance for visitors to Armenia. A local assistant helps with recommendations, itineraries, reservations, transport arrangements, translation and everyday travel needs through WhatsApp or Telegram. Optional in-person companionship in Yerevan and across Armenia helps you explore at your own pace. Assistance is tailored to your dates, interests and budget, with pricing and service terms agreed individually in advance.

Choose the platform's appropriate fields for website and contact links. Some descriptions do not permit URLs, and WhatsApp or social-link fields are not available in every region or profile.

## Useful evidence to develop

1. Real operating photos that the owner has the right to publish; upload the approved logo in the logo field.
2. Clear staff/service information and a public business/legal identity when the owner is ready to disclose it. Do not invent staff names or professional credentials.
3. Genuine guest feedback after actual service, without fabricated text, incentives or review filtering.
4. A public cancellation/refund and privacy policy based on the owner's actual decisions, reviewed before adding bookings, payment or analytics collection.
5. After profiles are verified, send their exact public URLs to the developer. Only then add appropriate `sameAs` references to the website's Organization entity.

## Indexing notifications

The sitemap is discovered through `robots.txt`. Under the owner's earlier explicit authorisation to submit the site to Yandex, one IndexNow request was sent after validating the 22 November deployment. Yandex accepted all 33 new/changed canonical URLs with HTTP 200 at `2026-11-22T12:54:29.147Z`; key validation was no longer pending. This is notification acceptance, not proof of crawling, indexing, rankings or Yandex Webmaster account verification. The earlier 20 November response had been HTTP 202 for the original 12 URLs. The latest response is retained locally in `qa/yandex-indexnow-submission.json`.

Normal main-branch updates now notify only changed pages automatically after tests and publication checks, using the global IndexNow endpoint. See [SEARCH-AUTOMATION.md](SEARCH-AUTOMATION.md). The Yandex command remains available for deliberate recovery/manual use; do not submit the same change separately to several participating engines. No directory profile, social post or outreach message was published as part of these notifications.

Google does not provide a general-purpose anonymous submission API for ordinary service pages. Use the verified Search Console property, sitemap and URL Inspection. New content is not guaranteed to be indexed or recommended by any search or AI system.
