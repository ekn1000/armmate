# Armmate: SEO, GEO and AI search implementation

Audit date: 22 November 2026. Scope: `https://armmate.am/` and the existing `ekn1000/armmate` repository. The implementation preserves the service model, three languages, existing routes, logo, visual design, individual pricing and direct messenger/email contacts.

## 1. Initial audit

The project is a static site, not an assumed React/Next.js application. Committed HTML is generated with Node.js, LinkeDOM and Prettier; Python provides the loopback preview; Playwright tests the browser behaviour. GitHub Pages serves the root of `main` with `.nojekyll` and the custom-domain CNAME. There is no application server, private API, CMS, payment processor or booking backend in this repository.

Before website edits, all 12 existing canonical pages were parsed from disk. The initial check covered their initial HTML, titles, descriptions, heading order, schema JSON, same-origin links, resource paths and fragments. Public checks covered the three language homepages, sitemap, robots, a genuinely missing URL, redirect behaviour, headers, public DNS records and fetches using search crawler user-agent strings.

| Area               | Initial evidence                                                                                                               | Result                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| Rendering          | Full translated service text and contacts present in committed HTML                                                            | Already suitable for crawlers without JavaScript                                      |
| Routes             | `/`, `/ru/`, `/en/` and nine service/contact pages                                                                             | All existing canonical paths preserved                                                |
| Titles             | Armenian home and assistance page shared a title; Russian home and assistance page also shared one                             | Two duplicate title pairs found                                                       |
| Metadata           | Canonical, descriptions, OG, Twitter and reciprocal language alternatives already existed                                      | Preserved and extended rather than replaced unnecessarily                             |
| Internal resources | Initial local crawl found no broken resource or fragment links                                                                 | Healthy baseline                                                                      |
| Redirects          | HTTP → HTTPS, `www` → apex and `/en` → `/en/` returned 301                                                                     | No redirect infrastructure change needed                                              |
| Missing page       | A non-existent public URL returned HTTP 404                                                                                    | Existing custom noindex 404 retained                                                  |
| Robots             | Wildcard allowed public crawling; sitemap declared                                                                             | No initial blanket search-bot block                                                   |
| Hosting/CDN        | Responses identified `GitHub.com`, gzip and `Cache-Control: max-age=600`; no Cloudflare headers/configuration observed         | No DNS, CDN, WAF or hosting settings modified                                         |
| Search crawlers    | Googlebot, bingbot, OAI-SearchBot, GPTBot, PerplexityBot and Claude-SearchBot user-agent requests to English home returned 200 | Public access observed; this is not proof of actual crawler visits or indexing        |
| Fonts              | English home fetched a full Armenian bold face for the language label, and a regular face for the decorative greeting          | Unnecessary full-font downloads identified                                            |
| Search accounts    | Google TXT proof present; owner reports Search Console setup complete; genuine Yandex ownership file present                   | Account verification/indexing reports remain private to owner                         |
| Analytics          | No GA4 collector or measurement ID configured                                                                                  | Prepare an integration point without inventing credentials or collecting visitor data |

The initial live mobile Lighthouse run used the existing Playwright Chromium and Lighthouse dependency:

| English page | Performance | Accessibility | Best practices | SEO | LCP     | CLS | TBT     |
| ------------ | ----------- | ------------- | -------------- | --- | ------- | --- | ------- |
| Home         | 99          | 100           | 100            | 100 | 1.960 s | 0   | 54 ms   |
| Assistance   | 100         | 100           | 100            | 100 | 0.970 s | 0   | 84.5 ms |
| Contact      | 100         | 100           | 100            | 100 | 0.942 s | 0   | 0 ms    |

Lighthouse's existing SEO 100 did not detect the cross-page duplicate titles or establish any search ranking. Lab TBT is not field INP. No authenticated Search Console/CrUX or real-user performance data was available.

## 2. Problems addressed

**Implemented:** unique Armenian/Russian assistance titles; a clearer English service definition; useful planning/destination information; an explicit, independently configurable search/training crawler policy; supplementary `llms.txt`; stable primary Service references; brand aliases; Article/source relationships for guides; accessible wordmark labels; reduced non-Armenian-page font payload; a repeatable whole-site validator in CI; Bing verification and analytics integration points.

**Already present and preserved:** full initial HTML, three languages, self-canonicals, sitemap discovery, valid redirects, custom 404, responsive WebP images, lazy gallery loading, high-priority responsive hero, locally hosted WOFF2 fonts, direct contact links, real photo credits and no fixed prices.

**Requires owner/external configuration:** account-level indexing evidence, Bing ownership, analytics collection, Business Profile completion and legitimate external references. Their absence is not represented as a completed submission or an infrastructure failure.

## 3. New pages: 21 complete pages

Each of seven new families has real Armenian, Russian and English content. Existing 12 pages remain, giving 33 canonical pages in the sitemap.

| Family               | English                                 | Armenian                       | Russian                                        |
| -------------------- | --------------------------------------- | ------------------------------ | ---------------------------------------------- |
| Independent planning | `/en/visit-armenia-without-tour-guide/` | `/travel-planning/`            | `/ru/samostoyatelnoe-puteshestvie-po-armenii/` |
| Yerevan              | `/en/destinations/yerevan/`             | `/destinations/yerevan/`       | `/ru/napravleniya/erevan/`                     |
| Garni and Geghard    | `/en/destinations/garni-geghard/`       | `/destinations/garni-geghard/` | `/ru/napravleniya/garni-gegard/`               |
| Lake Sevan           | `/en/destinations/lake-sevan/`          | `/destinations/lake-sevan/`    | `/ru/napravleniya/ozero-sevan/`                |
| Dilijan              | `/en/destinations/dilijan/`             | `/destinations/dilijan/`       | `/ru/napravleniya/dilizhan/`                   |
| Gyumri               | `/en/destinations/gyumri/`              | `/destinations/gyumri/`        | `/ru/napravleniya/gyumri/`                     |
| Khor Virap           | `/en/destinations/khor-virap/`          | `/destinations/khor-virap/`    | `/ru/napravleniya/khor-virap/`                 |

The content addresses different decisions: walking clusters in Yerevan; separate sites and gorge access at Garni/Geghard; shore choice and season at Sevan; town versus forest plans in Dilijan; city time and overnight choices in Gyumri; monastery access and weather-dependent views at Khor Virap. Shared service terms remain consistent, but place names are not substituted into one repeated city template.

Near-duplicate commercial pages for every assistant/concierge/local-support synonym were deliberately not added. The existing assistance page owns that intent. See [SEARCH-INTENT.md](SEARCH-INTENT.md) for the research method and page mapping.

## 4. Technical SEO and international implementation

**Implemented across all 33 pages:** distinct titles/descriptions, one self-canonical, OG/Twitter metadata, correct HTML language, three reciprocal language alternatives and the existing Armenian `x-default`. English has substantial service and destination content without changing the Armenian root or forcing language redirects.

The generated sitemap contains exactly the canonical indexable pages with reciprocal language alternatives and meaningful update dates. It excludes the 404 and verification documents. Every content page has visible breadcrumbs and matching BreadcrumbList data. Initial HTML includes the complete article, FAQ, contact links and language navigation. The guide article uses semantic `article`, `section`, `aside` and `time` elements.

The original header, footer, experience modals, contact disclosure and branding remain. Homepages link to the planning hub beneath the existing service cards; the hub links to all destinations; guides link back to services and contacts. No forms, calling buttons, Viber, visible secondary contact-detail lines or removed footer-right content were reintroduced.

The 404 gained the existing favicon. Responsive images, descriptive existing filenames/alt text, reserved dimensions, eager/high-priority hero and lazy below-fold gallery are retained. No unnecessary image renaming or recompression was performed.

## 5. GEO/AEO and entity interpretation

**Implemented:** the English home states “Your personal friend and assistant in Armenia.” The assistance page explicitly explains the personal tourist assistant/travel concierge service. The planning guide answers whether an independent visitor needs an assistant, companion or specialist guide, how to budget and what to send before arrival. Relevant terminology is distributed naturally across distinct tasks rather than repeated as a keyword list.

The new FAQs answer practical location questions and supported business questions, including English support before arrival. They do not introduce a promise of unlimited assistance, a free driver, fixed packages or guaranteed 24/7 response. Companion availability and separate third-party costs remain explicit.

Guides cite official Armenia Travel resources and, for Geghard's heritage listing, UNESCO. Six Armenia Travel source URLs returned 200 during checks; UNESCO's standard listing URL returned 403 to the automated fetch, so its live automated availability is not claimed. Geghard's UNESCO status is also supported by the accessible official tourism source. Links are factual references, not endorsements or partnership claims.

The generated `llms.txt` contains the actual service scope, individual-pricing model, contact destinations, important English URLs and links to all three home languages. It is supplementary factual documentation. No claims of universal adoption, automatic AI ingestion or guaranteed recommendations are made.

## 6. Structured data

**Implemented/preserved:** Organization, WebSite, localized WebPage or ContactPage, Service, ContactPoint, FAQPage and BreadcrumbList. Guide pages additionally include Article with the real publishing organization, matching headline, publication/update dates, language, source citations and an unambiguous relationship to the page.

Organization uses a stable ID, actual email, Telegram identity, Armenia service area and real brand aliases. Empty `verifiedProfiles` is prepared for genuine owner-verified public profiles; no Google Business Profile or directory URL is invented. The primary assistance Service consistently points to its localized assistance URL instead of changing its identity to each guide. The companion Service keeps a separate ID.

**Not implemented:** LocalBusiness, a public postal address, opening hours, ratings, reviews, awards, certifications or price offers. A private address used in Business Profile verification is not authorisation to publish a storefront address. Organization/Service accurately represent the current public information. FAQ data does not imply eligibility for Google's restricted FAQ rich results.

Validation checks JSON syntax, required page/entity relationships, unique graph IDs, resolved ID references, FAQ text against visible answers and Article citations against visible links. This is local semantic validation, not a claim that a live Google Rich Results Test or private account validator was run.

## 7. Crawler accessibility

**Implemented:** separate public-search allow groups for Googlebot, bingbot, OAI-SearchBot, PerplexityBot and Claude-SearchBot. GPTBot's training choice is a separate flag, preserving the previously allowed policy. A regression test proves it can be disabled without blocking search. Unspecified crawlers, including Google-Extended, retain the wildcard allowance.

**No infrastructure changes:** no global security protections disabled; no DNS, Cloudflare, WAF, cache or hosting setting altered. No private API or admin route exists in the inspected static application. Robots permissions are not treated as a way to secure confidential content. Production access is observed through public requests, not authenticated crawler logs.

Relevant official documentation reviewed: [OpenAI crawler roles](https://developers.openai.com/api/docs/bots), [Google AI features and search requirements](https://developers.google.com/search/docs/appearance/ai-features) and the supplementary [llms.txt proposal](https://llmstxt.org/).

## 8. Performance and accessibility

**Implemented:** two small font subsets for Armenian text used on English/Russian pages. The navigation subset is 984 bytes and the decorative greeting subset is 908 bytes. They replace the need for 21,324-byte bold and 21,496-byte regular full Armenian faces on those pages, about 40.9 KB less raw font data on a desktop visit that needs both. A mobile view hides the greeting and need not fetch its subset. Full Armenian fonts remain available for Armenian prose and language switching.

The same original font outlines are used, preserving visual quality. Wordmark accessible names include their visible `armmate` label and localized brand name. No new runtime dependency or external collection library was added. Contact tracking integration is one delegated local click listener, not a background collector.

**Not changed:** already-fast image pipeline, the existing design and GitHub Pages' server-controlled cache policy. The baseline's modest image-compression suggestion did not justify another lossy recompression. No field INP or complete Core Web Vitals improvement is claimed without real-user data. `npm run measure:pages` provides reproducible lab reports without turning fluctuating scores into CI targets.

## 9. Files and build integration

| Files                                                                   | Role                                                                                             |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `seo.js`, `site-config.js`                                              | Route families, metadata, entities, aliases, Bing proof and genuine future profile integration   |
| `translations.js`, `app.js`, `index.html`                               | Shared labels, English positioning, accessible wordmarks and a planning-hub link                 |
| `scripts/guide-content.cjs`                                             | Original three-language planning/destination content, FAQs and cited sources                     |
| `scripts/search-content.cjs`                                            | Unique assistance titles, explicit English service definition and combined content exports       |
| `scripts/build-pages.cjs`, `scripts/build-content-pages.cjs`            | All 33 rendered pages, guide sections, sources, contacts, sitemap and machine-readable discovery |
| `scripts/crawler-policy.cjs`, generated `robots.txt`                    | Independent search and model-training rules                                                      |
| Generated `llms.txt`, `sitemap.xml`                                     | Supplementary factual index and 33-URL sitemap                                                   |
| `analytics.js`                                                          | Local `armmate:contact` integration event without collection                                     |
| `styles.css`, `scripts/optimize-assets.py`, two new WOFF2 subsets       | Small targeted layout/font changes with reproducible asset generation                            |
| `404.html`                                                              | Existing error page plus favicon                                                                 |
| `scripts/audit-site.cjs`, `scripts/measure-pages.cjs`                   | Whole-site structural audit and optional lab measurement                                         |
| `tests/content.spec.js`, `tests/seo.spec.js`, `tests/discovery.spec.js` | Expanded route, language, schema, crawler, contact-event and font checks                         |
| `package.json`, `.github/workflows/check.yml`                           | Build/format coverage for new routes and a complete-site audit in CI                             |
| `README.md`, `CONTRIBUTING.md`, existing SEO/setup/launch docs          | Current route counts, development and account setup information                                  |
| New intent, external-presence and monitoring documents                  | Editorial planning and owner-required work                                                       |

All 33 generated canonical HTML files are committed outputs. The genuine Yandex ownership file and existing IndexNow proof are preserved. No dependency or lockfile update is needed for the implementation.

## 10. Validation record

The final application build and checks passed:

- `npm run build`: all 33 HTML pages, sitemap, robots and llms output generated successfully.
- `npm run check:generated`: generated outputs match their sources.
- `npm run check:format` and `git diff --check`: passed.
- `npm run audit:site`: 33 canonical pages, three languages, zero errors and zero warnings. This includes unique metadata, canonical/hreflang, local resources/fragments, heading hierarchy, schema graph references, visible FAQ/source matching and preserved ownership proof.
- `npm test`: all 30 tests passed in 42.6 seconds. Coverage includes every content/language route without JavaScript, language navigation, layouts at 320/768/1440 px on content pages and 320/390/768/1024/1440 px on homepages, contact controls, experience modals, schema, sitemap, independent crawler policies, Bing verification, local event payloads and reduced font requests.
- Seven desktop/mobile captures across English, Armenian and Russian were generated with no overflow or JavaScript errors; representative views in all three languages were visually reviewed.
- Existing locked dependencies are unchanged; `npm ls --depth=0` confirms the expected installed development packages. No new production package is required.

Lighthouse measurements are recorded separately from structural validation. The Python preview serves uncompressed development assets, so preview timings must not be presented as a direct production comparison. Post-publication scores are observations, not field Core Web Vitals or ranking guarantees.

## 11. Prepared owner actions

See the separate [external presence playbook](EXTERNAL-SEARCH-PLAYBOOK.md) and [monitoring plan](SEARCH-MONITORING.md). These contain the actual next steps and explicitly distinguish implemented code from account-bound work.

1. Use the existing verified Google Search Console property; review the updated sitemap, selected English pages and actual indexing states. The owner has already completed initial Google setup, so no new verification request is needed.
2. Confirm Yandex ownership in the existing account, and sitemap submission when its tool is available. The published ownership file alone does not prove account confirmation.
3. Complete Bing Webmaster Tools through Google-property import or a genuine provided token. The code integration is prepared, not falsely verified.
4. Complete the existing Google Business Profile and its business verification. Add the real logo and operating photos. Supply verified public profile URLs for `verifiedProfiles` only after they exist.
5. If analytics collection is desired, provide the actual GA4 ID and the required privacy/consent decisions. The event hook is implemented; visitor tracking is not enabled.
6. Establish legitimate directories and real partnerships where eligible. No accounts, reviews, posts or outreach were automatically published. No new external indexing notification is claimed.

## 12. Next decisions

Review indexing and query data weekly during the first two months. Review real enquiry quality alongside contact clicks once measurement is configured. Add further content only when it answers a distinct observed need. Keep service terms, source information and all translations current. Rankings, indexing and AI citations remain decisions of the respective systems; the implementation improves the evidence and accessibility available to them without promising an outcome.
