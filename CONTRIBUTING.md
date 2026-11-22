# Developing ARMMATE together

Clone `https://github.com/ekn1000/armmate.git`. A GitHub collaborator must accept their repository invitation before pushing. Write access is sufficient for normal code contributions; owner/admin access is not required.

1. Pull the latest `main` and create a branch for the change.
2. Run the static site locally as described in the README.
3. Update all three languages in `translations.js` together. Edit shared layout in the root `index.html`, then run `npm run build` and commit the regenerated language pages and sitemap. Run `npm run check:generated` to catch drift.
   Service and contact page copy belongs in `scripts/search-content.cjs`; planning/destination copy belongs in `scripts/guide-content.cjs`; route families belong in `seo.js`. Keep each family's language alternatives reciprocal. Regenerate all 33 pages after changing shared contacts or metadata, including `llms.txt`.
4. Keep verified public business contacts in `site-config.js`; never commit passwords, tokens or private customer information.
5. Run `npm ci`, `npx playwright install chromium`, `npm test`, `npm run audit:site` and `npm run check:format`.
6. Push the branch and open a pull request with the behaviour change and validation results.
7. Merge reviewed changes into `main`. GitHub Pages automatically publishes the root of that branch.

Preserve the `#plan` link and compatibility with `?lang=hy|ru|en`. The canonical language paths are `/` (Armenian), `/ru/` and `/en/`. Static files are committed and served directly; use the generator when changing their source content. Do not introduce fixed price packages, automatic pricing, guaranteed response times or 24/7 promises without an explicit business decision.

Browser tests inspect the public messenger destinations without opening them. Keep real messages, booking requests and payments out of automated tests.

Photo attributions and font licences in `assets/` must stay with the relevant assets. See `docs/BUSINESS_CONCEPT.md` for product requirements and `docs/LAUNCH_CHECKLIST.md` for outstanding operational setup.
