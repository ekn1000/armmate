# Search visibility follow-up — 25 November 2026

This review compares the published site with the 22 November baseline. The inspected source is `a905811b22eccab71f16f851c947d30c98653ec2`; local `main` and `origin/main` agree. Public checks ran on 25 November at approximately 07:13–07:17 UTC. No DNS, hosting, security rules or external business-account settings were changed.

## Verified technical results

| Check                       | Observed result                                                                                                                                                                                     |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Public canonical pages      | All 33 returned HTTP 200 across Armenian, Russian and English.                                                                                                                                      |
| Published HTML              | All 33 responses match the locally audited generated HTML. Important content is present before JavaScript runs.                                                                                     |
| Titles and descriptions     | Unique and present on all 33 pages. Descriptions are 138–160 characters; social descriptions match. The Armenian homepage remains 152 characters.                                                   |
| Canonical and hreflang      | All canonical URLs and three reciprocal language alternatives plus `x-default` passed validation.                                                                                                   |
| Sitemap and robots          | Public, readable and consistent with the 33 canonical routes; no accidental indexing restrictions were found.                                                                                       |
| Structured data             | Published JSON-LD parses and matches the audited source. Local validation found no conflicting identifiers, broken references, fabricated ratings or unverified addresses.                          |
| Internal links and assets   | The existing whole-site audit passed with zero errors and zero warnings.                                                                                                                            |
| Redirects                   | HTTP apex, HTTPS `www` and the GitHub Pages repository URL each return HTTP 301 to `https://armmate.am/`.                                                                                           |
| Missing page                | A deliberately nonexistent URL returned HTTP 404 with the custom page's `noindex` directive.                                                                                                        |
| Search/AI user-agent probes | Googlebot, bingbot, YandexBot, OAI-SearchBot, PerplexityBot and Claude-SearchBot probes returned HTTP 200. These are header-based probes, not evidence of actual crawler visits or index inclusion. |
| Search favicon assets       | Googlebot-Image can fetch the square 192×192 PNG; the root ICO is also available. Actual display in Google Search was not independently verified.                                                   |
| Yandex ownership file       | The supplied verification HTML remains public with HTTP 200 and matches its local contents. This does not establish the state of the owner's Webmaster account.                                     |

The technical review found no new production defect requiring a website-code change. Public bot probes cannot establish IP-based treatment of actual search-engine crawlers, nor can they expose private Search Console or Webmaster reports.

## Automation verified from GitHub artifacts

- The scheduled [Public search health run on 23 November](https://github.com/ekn1000/armmate/actions/runs/45242294671) succeeded. Its report at `2026-11-23T18:48:48.561Z` records 33 healthy pages and no errors. This confirms that the scheduled workflow actually executed, in addition to the earlier manual run.
- The latest published [Website checks run](https://github.com/ekn1000/armmate/actions/runs/45030995987) succeeded. Its discovery artifact records the six metadata-update URLs received by the global IndexNow endpoint with **HTTP 200**, `accepted: true` and `pendingKeyValidation: false`. This is a historical notification response for the 22 November publication, inspected today; it is not proof that the six URLs are indexed.
- The earlier 33-URL HTTP 202 report belongs to source commit `d92e916...` and remains a distinct historical response. It must not be relabelled HTTP 200.
- The latest [Pages deployment](https://github.com/ekn1000/armmate/actions/runs/45030995676) succeeded. The independent live check today also reports 33 healthy pages, at `2026-11-25T07:13:09.448Z`.

No duplicate IndexNow submission or workflow dispatch was performed during this read-only follow-up.

## Search presence: established and unresolved

| Source                  | Evidence available today                                                                                                                                                                                                           | Conclusion                                                                                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Google Search           | The unauthenticated public search request encountered an unusual-traffic challenge.                                                                                                                                                | Current organic results and the displayed favicon cannot be confirmed from this session. This challenge concerns the review request, not access to armmate.am.            |
| Bing Search             | The public query `site:armmate.am` explicitly returned “There are no results for site:armmate.am”.                                                                                                                                 | No result was observed for this particular query. An authoritative indexed-page count and the reason for exclusion still require Bing Webmaster Tools.                    |
| Yandex Search           | Public search encountered SmartCaptcha.                                                                                                                                                                                            | Search presence remains unverified; the ownership file and bot accessibility are healthy.                                                                                 |
| Google Business Profile | The owner supplied a new screenshot showing “Your business on Google”, the blue verification badge and no former Processing / Not publicly visible banner. The owner reports that searching Maps for armmate does not bring it up. | The owner interface indicates verification is complete, but public visibility remains unconfirmed. No public Maps URL is available to connect to website structured data. |
| Google Search Console   | The owner previously completed DNS verification. No authenticated account connector is available here.                                                                                                                             | Current indexed-page counts, exclusion reasons, impressions and queries have not been read or inferred.                                                                   |

The Business Profile's “Profile strength / Complete info” indicator is a completeness suggestion, separate from verification. No public Maps URL is invented from the previously supplied numeric business identifier. `verifiedProfiles` remains unchanged until a real public profile link can be checked.

The owner's description of the business as “online” requires distinguishing remote-only support from real in-person companion services. [Google's eligibility policy](https://support.google.com/business/answer/13763036?hl=en) requires in-person customer contact and excludes online-only businesses. A genuine service-area business can operate without a customer-facing storefront and should [hide a non-customer-facing address](https://support.google.com/business/answer/3038177?hl=en). The website's existing optional companion service has not been removed or reinterpreted while the owner clarifies how it operates. No profile deletion or account change was performed.

## Owner screens needed to finish the account checks

1. **Google Business Profile:** confirm whether real in-person companion services are available. If the existing profile has a public **Share** link, send it; inability to find the name in Maps alone does not establish an eligibility or verification error. A Maps link is not required to continue website SEO. Do not create a duplicate profile.
2. **Bing Webmaster Tools:** **URL Inspection → `https://armmate.am/` → Bing Index**, including the expanded Crawl/Index reason. The previous successful Live URL result alone does not establish indexing.
3. **Google Search Console:** the verified property's **Indexing → Pages** summary and its exclusion-reason table. The **Performance → Search results** summary is useful to assess impressions and queries.
4. **Google Search:** an actual result for `armmate.am` or `site:armmate.am`, including the site icon, to verify the favicon's displayed appearance.
5. **Yandex Webmaster:** the site's indexing summary or the exact verification/indexing error, if any.

Screenshots or copied status text are sufficient; no passwords, session cookies or verification secrets are needed. New indexing requests should address an actual failed or changed URL rather than repeatedly resubmitting an already accepted request.

## Validation and limits

Today's `check:generated`, `audit:site`, `check:live`, production metadata comparison and routing checks passed. The existing 42-test suite passed on the inspected source in its latest GitHub run; it was not rerun locally for this unchanged implementation. Raw public-check results and the private owner screenshot remain in ignored `qa/` files rather than published documentation.

There is no measured ranking or AI-recommendation gain established by these technical checks. Continued discovery depends on actual indexing decisions, useful content, real business evidence and genuine external references.
