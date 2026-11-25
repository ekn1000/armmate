# Authenticated search follow-up — 25 November 2026

This follow-up used the existing `armmate.support@gmail.com` account and only Armmate's site/profile. Account identity was checked in Google Search Console, Yandex Webmaster and Bing Webmaster Tools before account changes. The supported Chrome connection became available during this pass; earlier connection failures no longer describe its final state.

## Completed account work

| Service                 | Observed state                                                                                                                                                         | Completed action                                                                                                                                                                                                                                            | Still pending                                                                                     |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Google Search Console   | Performance showed 4 clicks and 9 impressions with the three-month range selected; the available chart covered 19–23 November. The Pages summary was still processing. | Requested indexing for `/en/about-armmate/`; Google displayed **Indexing requested** and confirmed a priority crawl queue. Resubmitted the current sitemap; Google displayed **Sitemap submitted successfully**.                                            | Crawling/indexing the new page and refreshing the Pages/sitemap reports.                          |
| Google Business Profile | The Armmate account shows the verification badge and the existing profile. Its Maps place opens with the matching business name, website, phone and office address.    | Retrieved the actual Google-provided profile/share URLs and linked the observed Maps place in the site's Organization `sameAs` data.                                                                                                                        | Appearance for every public search or location is not established by the owner's management view. |
| Bing Webmaster Tools    | Homepage: **Discovered but not crawled**, discovered 20 November. Live test: **URL can be indexed by Bing**, **No SEO/GEO issues found**.                              | Submitted a support ticket requesting the specific exclusion reason; the final page confirmed **Your request has been successfully submitted**. Resubmitted the existing sitemap; its last-submit date changed to 25 November and status to **Processing**. | Support response and crawl/index decisions. No ticket number was displayed in the receipt.        |
| Yandex Webmaster        | Only the HTTP property was initially present. Its recommendation was **The main site URL doesn't use the HTTPS protocol**.                                             | Added `https://armmate.am/`, verified ownership using the already-published HTML file, and submitted ten priority URLs. All ten displayed **In queue**.                                                                                                     | Yandex's sitemap and site-relocation tools remain in read-only mode.                              |

Google's performance table included `armmate` (2 clicks, 4 impressions), `travel assistant` (1 click, 2 impressions) and `сопровождение` (0 clicks, 1 impression). These tiny samples are observations, not stable rankings; query totals can differ from the overall total.

Before the new sitemap submissions, Google's report showed a successful read on 25 November with 33 discovered URLs. Bing showed a successful read on 22 November with 33 discovered URLs, zero warnings and zero errors. The published sitemap contains 36 URLs; report counts need time to refresh and do not mean 33 indexed pages.

## Google profile identity and favicon

The Google-generated share link is <https://share.google/WDKHxjGWvf9ExXrrE>. The observed Maps place is:

<https://www.google.com/maps/place/armmate/data=!4m2!3m1!1s0x0:0xd6718f4fe13d50b7>

The profile shows `armmate`, Personal concierge service, `4 Arshakunyats Ave, Yerevan 0023`, `091 110799` and `armmate.am`. The owner requested retention of this real office address. The address, phone and opening hours were not copied into website schema or changed in the profile. The profile currently shows **Open 24 hours**; the owner should ensure this matches actual availability.

The ordinary Maps place opened successfully under the authorized account. An anonymous/signed-out view was not independently tested. A general Google search and the owner-specific business result are different observations.

Google web results visibly included the English homepage, tourist-assistance page and contact page. The checked results still showed a generic globe instead of the site's favicon. `/favicon.png` and `/favicon.ico` are already published; public availability does not establish that Google's favicon cache has refreshed. Avoid changing the icon URL repeatedly or repeatedly submitting the same URL.

## AI visibility and remaining external work

Bing's **AI Performance** report showed 0 citations and 0 average cited pages for 25 August–24 November, with no grounding-query data. The report identifies its sources as Microsoft Copilots and Partners and describes the data as a sample. It is not a measurement of all AI assistants.

One observed Google AI Overview for the ambiguous query `armmate` described a separate robotics business at `armmate.com`. This does not establish that every AI answer is wrong. It does demonstrate the need for consistent Armenia/travel context and genuine external references. The site's existing localized business overviews and the newly verified Maps identity address the first-party side of that work.

No fake reviews, directory accounts, partner relationships or third-party mentions were created. Genuine hotel/hostel partnerships, honest customer reviews and useful tourism-site mentions still require actual customers and relationships. A correctly indexed and understandable site is a candidate for retrieval, not a guarantee of AI recommendations.

## Yandex follow-up when its tools reopen

The HTTPS property was verified on 25 November, with `armmate.support@gmail.com` listed as Owner. The original verification file/code was reused; no DNS changes or new credentials were necessary.

The ten queued pages were the three homepages, the three localized business overviews, the Russian and English tourist-assistance pages, and the Russian and English contact pages. The site's daily quota of ten was reached; no further requests were attempted.

HTTP already returns **301** to `https://armmate.am/`. When Yandex restores **Relocate site**, review the old HTTP property and request its move to the verified HTTPS property if Yandex has not already consolidated them. Its read-only restriction was respected. When **Sitemap files** reopens, add `https://armmate.am/sitemap.xml` to the HTTPS property. The sitemap is already declared in public robots.txt.

## Code and verification

`site-config.js` now contains the actual observed Google Maps profile in `verifiedProfiles`. Regeneration includes it in Organization `sameAs` on all 36 canonical pages. An existing three-language SEO test now verifies that the profile is present in initial HTML without JavaScript. No layout, language route, pricing rule, contact channel or service promise changed.

- Build and generated-output verification passed.
- Static audit: 36 canonical pages, zero errors and zero warnings.
- All three affected no-JavaScript language/SEO integration tests passed.
- The complete 42-test suite passed earlier on 25 November for the previous publication; this follow-up reran the affected tests rather than presenting that earlier run as a new full-suite run.

Account screenshots are retained locally under ignored `qa/` paths and are not committed. The final Bing receipt, Google indexing/sitemap receipts, Yandex ownership/queue and Maps identity were saved. No credentials, cookies or private account tokens are included in this report.
