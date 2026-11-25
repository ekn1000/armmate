# Armmate identity and AI-search discovery — 25 November 2026

The objective is to make the service understandable for both brand questions (“What is Armmate?”) and practical travel questions (“Who can help me as a tourist in Armenia?”). Publishing useful, accessible facts can support search discovery and citations. It does not register a brand in every model or guarantee recommendations.

[OpenAI's bot documentation](https://platform.openai.com/docs/bots) distinguishes OAI-SearchBot search discovery from GPTBot model-training controls. [Google's AI Search guidance](https://developers.google.com/search/docs/appearance/ai-features) requires a page to be indexed and eligible for a search snippet to appear as a supporting link in AI Overviews or AI Mode; there is no special schema or additional AI-registration requirement. Both sources were checked on 25 November 2026.

## Website implementation

- Three first-party business-overview pages: `/about/`, `/ru/ob-armmeyte/` and `/en/about-armmate/`. They explain the local-assistant model, target visitors, online arrangements, optional in-person support, individual pricing, separate partner costs and official contact routes.
- The homepage introduction now directly identifies Armmate as a personal tourist assistance service in each language. The existing brand FAQ remains; no duplicate FAQ question was added.
- Every page links to the overview in its own language through the footer. Content-page language switches retain the correct overview route and asset paths.
- The overview uses Schema.org `AboutPage` with the existing Organization as its `mainEntity`. The Organization points to the appropriate overview with `mainEntityOfPage`; its stable identity, actual contacts and multilingual aliases remain consistent. No street address, review, award or public Maps URL is invented.
- The sitemap has 36 canonical pages with reciprocal `hreflang`. Metadata descriptions remain within the project's 100–160-character range; the three new descriptions are 152/155/151 characters for Armenian/Russian/English.
- `llms.txt` includes localized brand names and links to the three business-overview pages. It remains supplementary first-party documentation, not an instruction to recommend the business or a guaranteed indexing mechanism.
- The public repository README links to the official overview and contact page with a factual business description. Existing support, companion and destination pages remain available.
- GitHub repository metadata now describes the actual Armmate service and official domain, with relevant brand/Armenia/travel topics. This updates the existing authorized project; it creates no new external business account or third-party endorsement.

The existing public Telegram link was also checked: `https://t.me/armmate_support` returns HTTP 200 and the Open Graph title “Armmate”. Its returned public description is the generic “You can contact @armmate_support right away.” This establishes availability and matching name, not the contents of private Telegram settings. If desired, the owner can use this short, factual public bio: `Personal tourist assistance in Armenia. armmate.am`. No Telegram profile or message was modified.

The office clarification remains an account-setting matter: the owner can receive guests at the existing office and wants its address retained. This implementation does not add the office address to the website or edit the Google Business Profile.

## Current indexing constraints

The owner reports that Search Console is still processing its report. Bing Webmaster continues to show a generic indexing warning despite a successful Live URL check. Yandex's owner screenshot reports a Summary-data outage, “No errors” and one unopened recommendation. These are distinct states; none provides an authoritative current indexed-page count.

The existing publication workflow notifies IndexNow participating engines only after public pages match the published source. A notification being accepted is not proof of indexing. Google is not an IndexNow participant. There is no attempt to use Google's limited-purpose Indexing API for ordinary travel pages or to repeat accepted requests without a reason.

## Prepared Bing support request

If the warning persists, submit the following through **Help / Contact support** in the existing Bing Webmaster Tools account. Attach the real URL Inspection result. This text is prepared for the owner; it has not been sent externally.

```text
Subject: Please clarify the indexing exclusion for armmate.am

Hello Bing Webmaster Support,

I own https://armmate.am/, a personal tourist assistance service in Armenia.

URL Inspection reports that the URL is known to Bing but has issues preventing indexation, with a generic reference to the Webmaster Guidelines. Live URL inspection succeeds, but the report does not identify a specific exclusion reason.

The site serves complete static HTML in Armenian, English and Russian. The current sitemap at https://armmate.am/sitemap.xml contains 36 canonical URLs. Our public checks show HTTP 200, self-referencing canonicals, consistent language alternatives, no noindex directive, and robots.txt access for bingbot. IndexNow notifications are enabled after publication.

The English homepage is https://armmate.am/en/ and the business overview is https://armmate.am/en/about-armmate/.

Could you identify the specific technical, quality or policy issue preventing indexing and review the site? I can provide the URL Inspection screenshot or any other diagnostic information you require.

Thank you.
```

## Owner actions that add actual evidence

1. Check Search Console after the delay it specifies; inspect actual page counts and exclusion reasons once the report is ready.
2. Open Yandex's **1 recommendation** to identify whether it concerns a real site issue. The Summary outage alone does not justify changing a working website.
3. Keep the existing Google Business Profile accurate. Link the real public profile when it is available; do not manufacture a Maps URL from an internal numeric identifier.
4. Develop real references from partner hotels, hostels and tourism sites describing the actual service and linking to the official site. Ask genuine customers for honest reviews. These require the owner's real relationships; no accounts, reviews, posts or outreach messages are fabricated or automatically published.

Website changes can make Armmate a clearer candidate for retrieval. Independent references and actual indexing provide further evidence that first-party schema or additional keywords cannot substitute for.

## Validation

The build and generated-output check passed. The complete static audit validates 36 pages with zero errors or warnings; all descriptions are within the required range. All 42 browser and automation tests passed locally in 5.5 minutes with one worker. The tests cover the new AboutPage primary-entity relationship, language-aware overview links, mobile layouts and existing business/contact rules.

The first parallel local attempt exhausted aggregate 30-second budgets in tests that navigate the entire growing route matrix. Those multi-page cases now have explicit 90/120-second budgets; no assertions were removed. The successful final run exercised the whole suite. Production availability, workflow execution and actual notification responses are checked separately after publishing, rather than inferred from these local tests.
