# Search and conversion monitoring

Public availability and crawler/favicons checks are now automated weekly through `Public search health`. Successful main-branch publication also triggers changed-page-only IndexNow notification. See [SEARCH-AUTOMATION.md](SEARCH-AUTOMATION.md) for limits and evidence, and [OWNER-NEXT-STEPS.hy.md](OWNER-NEXT-STEPS.hy.md) for the short owner checklist. These checks do not access private search reports or measure rankings.

## Current configuration

| Component             | Observed state                                                                                                                                                                                      | Next action                                                                                                                                                        |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Google Search Console | Owner reports completion with DNS TXT verification and indexing requests; public TXT proof is present                                                                                               | Review the existing account's reports. No new Google meta token is required.                                                                                       |
| Yandex Webmaster      | Genuine HTML ownership file deployed; account verification and sitemap acceptance cannot be checked here. The separate IndexNow notification for 33 URLs was accepted with HTTP 200 on 22 November. | Confirm ownership, sitemap and actual indexing state in the existing account. The earlier read-only tool message was a platform limitation, not a sitemap failure. |
| Bing Webmaster Tools  | No configured repository verification token or authenticated account access                                                                                                                         | Import the verified Google property, or provide the real `msvalidate.01` value for `site-config.js` → `bingVerification`.                                          |
| Google Analytics 4    | No GA4 library, measurement ID or collection endpoint in the site                                                                                                                                   | Owner supplies the actual `G-...` ID and decides the necessary privacy/consent approach before collection is implemented.                                          |
| Contact measurement   | Local `armmate:contact` browser event implemented                                                                                                                                                   | A configured analytics adapter can consume it. Events currently remain in the browser and are not stored or transmitted.                                           |
| Field Core Web Vitals | No authenticated field data or RUM collector available                                                                                                                                              | Check Search Console/CrUX when sufficient traffic exists. Lab TBT is not field INP.                                                                                |

Keep all ownership files, the Google TXT record and the public IndexNow proof. Never commit credentials or obtain verification values by inventing them.

## Prepared contact-event integration

`analytics.js` is loaded on all 33 canonical pages. Clicking a main or floating contact link dispatches:

```js
window.addEventListener("armmate:contact", (event) => {
  // Available fields only:
  // { channel: "telegram" | "whatsapp" | "email",
  //   placement: "main" | "floating", language: "en" | "ru" | "hy" }
});
```

No message, email address, phone number, full page URL, user identifier or referrer is put in the event. There are no analytics cookies, storage writes or collector requests. The site's existing language preference in local storage is unchanged.

After a real GA4 setup and any required consent handling, an adapter can forward the same fields as `contact_click`:

```js
window.addEventListener("armmate:contact", ({ detail }) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", "contact_click", detail);
  }
});
```

This snippet is documentation, not an enabled tracker. Do not count a contact click as a confirmed booking or sale. Those outcomes require a separate, truthful process for recording enquiries and completed services.

## First checks after publication

1. In Google Search Console, confirm `https://armmate.am/sitemap.xml` is read successfully and contains 33 canonical URLs.
2. Inspect `/en/`, the English assistance page and `/en/visit-armenia-without-tour-guide/`, then one new destination page. Request indexing if available. Inspect Armenian and Russian counterparts too; repeatedly submitting the same URL is unnecessary.
3. Review Google's chosen canonical, indexing exclusions and last crawl. A request or a successful live test is not proof of indexing.
4. In Bing and Yandex, check ownership, sitemap acceptance, fetch failures and indexing states. Preserve source errors and timestamps when investigating.
5. Run `npm run build`, `npm run check:generated`, `npm run audit:site`, `npm run check:format` and `npm test` after substantive edits.

## Weekly for the first two months

- Indexing: submitted, crawled and indexed pages by language and page family; investigate unexpected exclusions rather than expecting all pages to index at once.
- Search impressions and queries: brand spellings plus non-brand assistant, concierge, local-help and destination-planning intents. Compare meaningful time ranges, not single-day fluctuations.
- Organic landing pages: impressions, clicks, country/device mix and which service/guide pages receive traffic.
- Contact intent after analytics is configured: `contact_click` by channel, placement, landing page and language, without collecting message contents.
- Actual business outcomes: enquiries, agreed offers and completed services, using the owner's real records. Avoid implying that every messenger click became a customer.
- Core Web Vitals: field LCP, INP and CLS by page group when enough traffic exists. Lab scores vary; compare repeatable conditions when diagnosing a regression.
- Content accuracy: source availability, operating arrangements and changed transport/admission information.

## AI referrals and citation checks

Where an analytics platform actually receives attribution, review referrals from sources such as `chatgpt.com`, `perplexity.ai`, `gemini.google.com` and `copilot.microsoft.com`, plus identifiable campaign parameters. Some apps omit referrers; direct traffic cannot be assumed to be AI traffic. Google AI-feature traffic may be aggregated into ordinary Search Console search reporting.

Record occasional manual checks of relevant traveller questions with date, system, language, sources cited and actual linked URL. These are observations for a particular session, not a stable ranking metric. Do not manufacture repeated prompts or paid mentions to imitate authority.

## Monthly decisions

Use actual query and enquiry data to decide whether a new guide is needed, whether a current answer is unclear, or whether an existing page should be consolidated. Add a page for a distinct traveller task, not another permutation of a keyword. Review verified external profile links and update the Organization entity only with real public URLs.
