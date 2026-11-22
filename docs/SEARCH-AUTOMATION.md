# Search discovery and favicon follow-up

Implemented on 22 November 2026. This extends the 33-page SEO implementation without adding thin landing pages, fake profiles, reviews or training promises.

## Favicon

The initial follow-up check found that the primary declared icon was SVG with a cache query, the raster candidate was 48×48, and `/favicon.ico` returned 404. These observations do not establish why Google chose its current search icon: Google controls crawling and favicon selection.

The build now publishes a stable `/favicon.png` copied from the approved 192×192 icon and declares it on every canonical page. SVG remains a browser alternative. `/favicon.ico` is generated from the existing approved asset with 16/32/48/64/128/256 sizes. The icon URLs have no rotating cache parameters; future builds retain them. The custom 404 also uses the stable raster icon.

Google's [current favicon guidance](https://developers.google.com/search/docs/appearance/favicon-in-search) recommends a square image larger than 48px, stable URLs and accessibility to Googlebot and Googlebot-Image. It explicitly does not guarantee display. The owner can request a recrawl of the verified homepage once after this update. No automatic Google URL Inspection or favicon-acceptance claim is made.

## Accurate machine-readable facts

The Organization now exposes Schema.org [CommunicateAction](https://schema.org/CommunicateAction) targets for the actual WhatsApp, Telegram and email links. These describe contacting the service; they do not claim an automated booking API or send a message. Names are localized, and the recipient is the same stable Organization entity.

Guide Articles identify their real subject locations with Place/Country data. Garni and Geghard remain separate places. This creates no branch office, street address, coordinate, rating or fictitious business location. Existing languages and user-facing contact controls remain intact.

The supplied numeric business-profile identifier is not treated as a verified public Maps URL. `verifiedProfiles` stays empty until a genuine public link is supplied and checked.

## Publication-triggered IndexNow

After the existing `Website checks` test job succeeds on a push to `main`, a separate discovery job runs with read-only repository permission. It does not run for pull requests. Checkout includes history so the script compares the entire push's `before` and `after` commits, not only the last commit in a multi-commit push.

1. Read canonical URLs from the generated sitemap and map them to actual HTML files.
2. Select only added/changed/renamed canonical pages. A favicon update also selects the three homepages. Documentation-only commits cause a successful skip with no external request.
3. Wait up to five minutes for the selected public HTML and changed favicon bytes to match the checked source. A stale/challenged deployment stops the submission.
4. Confirm that the existing public IndexNow ownership file is available and matches its basename.
5. Send one batch to the official global endpoint `https://api.indexnow.org/indexnow`. Per the [official protocol](https://www.indexnow.org/documentation) and [FAQ](https://www.indexnow.org/faq), a participating endpoint shares notifications with the other participating engines. Separate duplicate submissions to Bing and Yandex are unnecessary. Google is not an IndexNow participant.
6. Save a public-data-only JSON response as a GitHub Actions artifact. HTTP 200 means received; HTTP 202 means received with key validation pending. HTTP 429 is recorded with Retry-After and is not repeatedly retried. None of these responses prove ranking or indexed pages.

An unavailable former base commit conservatively selects all current canonical pages once. Removed URLs are outside this canonical-only workflow and require a separately reviewed removal plan; this change removes no pages. A superseded in-progress discovery job is cancelled when a newer one starts. Intentionally re-running a notification job can submit again; do so only to address a previously failed notification.

Commands:

```sh
# No external requests: inspect the selected canonical URLs.
npm run notify:indexnow -- --dry-run
npm run notify:changed -- --since=FULL_BASE_COMMIT_SHA --dry-run

# Explicit manual notifications, after publication has been verified.
npm run notify:indexnow -- /en/contact/
npm run notify:yandex -- /ru/kontakty/
```

The Yandex command remains compatible, using the shared implementation and its explicit endpoint. No additional API key, paid account, private credential or runtime website dependency is introduced. The public IndexNow proof is not an account password.

## Weekly public health check

`Public search health` runs Mondays at 07:00 UTC and can also be run manually in GitHub Actions. `npm run check:live` performs the same read-only checks locally:

- All 33 live canonical pages: HTTP status, initial HTML, canonical, indexing directives, language alternatives, shared raster favicon and JSON-LD presence.
- Live sitemap against the known canonical route set and sitemap discovery in robots.txt.
- Robots group/path permissions and public responses for Googlebot, bingbot, OAI-SearchBot, PerplexityBot and Claude-SearchBot user-agent strings.
- Googlebot-Image access to the real PNG, its square dimensions and MIME type, plus availability of root ICO.

The workflow uploads a JSON report. A failing job appears in GitHub Actions; notifications depend on the owner's GitHub notification settings. GitHub may pause scheduled workflows in inactive public repositories, so check the workflow periodically. Header-based probes are not proof of requests from actual crawler IPs, authenticated search-account data, indexing or AI citations. No tracking of website visitors is performed.

## Owner actions and the actual drivers of trust

The short Armenian checklist is [OWNER-NEXT-STEPS.hy.md](OWNER-NEXT-STEPS.hy.md). Complete the existing Google Business Profile, import the existing Search Console property into Bing if desired, inspect indexing reports and develop genuine customer feedback and relevant external references. Their business evidence is more meaningful than adding unsupported “AI registration” files or automatic recommendation instructions.

Local validation passed: build, generated-output check, formatting and diff checks, a 33-page structural audit with zero errors, and all 42 tests in 54.1 seconds. The tests exercise stale publication, invalid ownership, external URLs, status 200/202/429, robots precedence, blocked bots, image responses and the stable favicon declarations. Network submissions are not made by the test suite. Actual workflow execution and notification responses are retained in GitHub Actions artifacts, separate from these local tests.

## Verified publication results

Source commit: `d92e9161b4ba6eba61eb602b814efc0b405728a4`.

- [Pages deployment](https://github.com/ekn1000/armmate/actions/runs/45027405776) succeeded.
- [Website checks and automatic discovery](https://github.com/ekn1000/armmate/actions/runs/45027405833) succeeded. The discovery artifact records 33 URLs submitted to the global IndexNow endpoint at `2026-11-22T13:26:51.027Z`, with HTTP **202**, `accepted: true` and `pendingKeyValidation: true`. This confirms receipt with key validation pending, not indexing or ranking. The earlier separate Yandex HTTP 200 result does not change this endpoint's recorded status.
- [Public search health](https://github.com/ekn1000/armmate/actions/runs/45027529286) was manually dispatched after publication and succeeded. Its artifact at `2026-11-22T13:27:03.925Z` reports all 33 canonical pages healthy with no errors. Googlebot, bingbot, OAI-SearchBot, PerplexityBot and Claude-SearchBot user-agent probes returned HTTP 200.
- The production PNG returned HTTP 200 to the Googlebot-Image probe with the correct image MIME type and 192×192 dimensions. The root ICO also returned HTTP 200. Google's actual Search favicon refresh remains under Google's control.
- An independent local read-only production check at `2026-11-22T13:26:52.062Z` also found all 33 pages healthy. These public probes do not replace Search Console, Bing or Yandex account reports.

The generated JSON reports remain in ignored `qa/` files and GitHub Actions artifacts. No credentials or visitor information are included in this report.
