# Search visibility and technical SEO

## What is implemented

ARMMATE has 33 complete, crawlable HTML pages: the three homepages below, nine service/contact pages, three independent-travel planning guides and 18 practical destination guides.

| Language | Canonical URL          |
| -------- | ---------------------- |
| Armenian | https://armmate.am/    |
| Russian  | https://armmate.am/ru/ |
| English  | https://armmate.am/en/ |

Each page contains its translated service descriptions, pricing explanation, inspiration cards and FAQ in the initial HTML. Search engines and visitors do not need JavaScript to read them. WhatsApp, Telegram and email links are present in the initial HTML and work without JavaScript. There is no enquiry form or calling option.

Each language has a descriptive title, meta description, self-referencing canonical URL, reciprocal `hreflang` links, `html[lang]`, Open Graph locale and localized social image, plus Twitter large-image metadata. Language selectors are real links and continue working without JavaScript. Each page family's Armenian page is its own `x-default` destination.

The public root always opens in Armenian; explicit `/ru/` and `/en/` paths take precedence over stored preferences. This gives each URL stable language content. The older `?lang=hy|ru|en` links still work with JavaScript and normalize to the new paths while keeping the section anchor and other query parameters. New internal links and the sitemap use only canonical paths.

`seo.js` is shared by the static generator and the browser. It keeps metadata and JSON-LD consistent when switching languages while preserving the contact section and selected filters.

The JSON-LD graph describes the ARMMATE organization, website, localized page, personal assistance service in Armenia and the visible FAQ. Its contact point leads to the three contact links and includes the owner-supplied email address. No telephone contact, invented prices, reviews, ratings, business addresses or opening hours are included. The FAQ markup matches the visible questions and answers; it does not imply eligibility for Google's FAQ rich results, which are restricted to particular types of sites.

The sitemap lists all 33 canonical pages with reciprocal alternatives within each page family. Content pages include visible breadcrumbs and matching BreadcrumbList markup. Contact pages use ContactPage markup. Guide pages add Article markup with the publishing organization, real publication/update dates and citations matching the visible source links. The primary Service entity consistently points to the localized assistance page; the companion service has a separate ID. The Organization includes actual brand aliases, Armenia as its service area, the Telegram profile and email address. `404.html` carries `noindex, follow` and offers links back to the language homepages. Images retain translated alt text, responsive WebP sources and reserved layout dimensions. The hero has matching responsive preload hints. Fonts are local WOFF2 files with `font-display: swap`; English and Russian pages use tiny subsets for the Armenian language label and decorative greeting. Original photo attribution and licences apply to the derivatives too.

## Updating the pages

The Armenian `index.html` is the shared homepage structure. Edit homepage copy in `translations.js`, detailed service/contact content in `scripts/search-content.cjs`, guide content and sources in `scripts/guide-content.cjs`, the content renderer in `scripts/build-content-pages.cjs`, metadata and route families in `seo.js`, and verified contacts in `site-config.js`. Homepages link visibly to the three service/contact families and the planning hub. The hub links to all six destinations; every guide links to relevant services. Language switches navigate to the corresponding localized page.

```sh
npm run format
npm run build
npm run check:generated
npm run audit:site
npm run check:format
npm test
```

`npm run build` regenerates all 33 HTML pages, `sitemap.xml`, `robots.txt` and `llms.txt`. Commit the generated files. The existing branch-based GitHub Pages deployment still serves static files directly; no server or paid service is needed. CI rejects stale generated pages and audits every canonical page, local resource/fragment, metadata set, FAQ, schema graph and language family.

Update `seo.js`'s `updated` date only when page content meaningfully changes. Do not bump sitemap dates on unrelated builds. When changing the domain or project path, update `baseUrl` in `seo.js`, rebuild, and update the hardcoded return links in `404.html`.

To recreate the committed responsive images, social cards and WOFF2 fonts, install Python's `Pillow`, `fonttools` and `brotli` packages and run `python scripts/optimize-assets.py`. These dependencies are needed only to regenerate assets, not to serve the site or regenerate HTML. Original TTF/WebP files are retained as sources.

## Custom domain and crawling

The active domain is `armmate.am`, configured in `CNAME` and GitHub Pages. HTTPS is enforced, and `www.armmate.am` redirects to the apex domain. `https://armmate.am/robots.txt` is served from the host root and references `https://armmate.am/sitemap.xml`.

## Remaining work outside the repository

- Use the existing Google Search Console property: the owner reports completing DNS verification and indexing requests. Confirm Yandex ownership through the preserved HTML file. Bing can import the Google property or use a genuine `bingVerification` value. See `docs/SEARCH-SETUP.md`; empty verification values emit no placeholder tags.
- Manually confirm the supplied WhatsApp account, the Telegram username @armmate_support and that armmate.support@gmail.com receives email. Automated checks inspect links without sending messages or authenticating to accounts.
- Once the business has verified public business details and a location it is entitled to represent, decide whether a business profile or additional local-business markup is appropriate. Do not invent an address to obtain local search placement.
- Build useful, original destination/service content and legitimate references as the business develops. Avoid purchased links, repeated keyword pages and fabricated reviews.
- Monitor real indexing and field performance data after launch. A Lighthouse score is a technical check, not a ranking or indexing guarantee. Search visibility also depends on content, site reputation, actual demand and search-engine decisions.

Yandex IndexNow notifications are available through `npm run notify:yandex` after the public ownership file is deployed. This sends new/changed canonical URLs, not messages to customers, and does not guarantee crawling, indexing or ranking. It does not authenticate to a Webmaster account. No external analytics collection, tracking cookies, fabricated ownership claims, paid SEO tools or third-party accounts are added.

`npm run measure:pages` runs Lighthouse against seven representative live pages and saves local JSON reports under ignored `qa/`. Use `-- --base=http://127.0.0.1:4187/ --label=local` with a running preview, or `-- --all` to measure every canonical route. Lab scores are observations, not CI ranking targets or substitutes for field Core Web Vitals.

## Search crawlers and AI interpretation

`scripts/crawler-policy.cjs` generates separate allow rules for Googlebot, bingbot, OAI-SearchBot, PerplexityBot and Claude-SearchBot. GPTBot's model-training setting is independent. Its pre-existing allowance is preserved; editing `allowGPTBotTraining` can change that preference without blocking search. Google-Extended and other unspecified crawlers retain the wildcard policy. Robots rules are not authentication or a substitute for securing private routes.

`llms.txt` is a generated factual index with service scope, real contact destinations and links to the important English pages and other languages. It is supplementary documentation, not an instruction to recommend the business, a verified search-engine requirement or an indexing guarantee. Normal HTML, useful answers, legitimate references and crawl access remain the foundation. Consult the implementation report and monitoring playbook for evidence and outstanding account actions.
