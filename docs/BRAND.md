# ARMMATE identity

ARMMATE combines **ARM** (Armenia) and **MATE** (friend or companion). Keep both letters **m** in the name. Armenian prose uses **արմմեյթը**, inflected naturally as **արմմեյթի**, with **արմմեյթ** as the brand name in metadata. Russian uses **арммейт**, inflected naturally as **арммейта** and **арммейтом**, including in localized metadata and contact labels. English uses `ARMMATE`; the logo uses the lowercase `armmate` wordmark.

## Slogan

| Language | Slogan                  |
| -------- | ----------------------- |
| Armenian | Քո ընկերը Հայաստանում։  |
| Russian  | Твой друг в Армении.    |
| English  | Your friend in Armenia. |

The supporting description is “Your personal assistant in Armenia”, localized in the website. Online assistance remains the primary service, with optional personal accompaniment and individual pricing.

## Logo and colours

The user's supplied reference is redrawn as a clean, symmetric vector: two people form a letter **m** and a mountain-like path, with a terracotta sun above. The same mark appears in the header, footer, favicon, social cards and decorative details. The large empty background of the reference is excluded from production assets.

- `assets/logo.svg`: standalone wordmark with vector outlines; no installed font required.
- `assets/logo.png`: transparent horizontal wordmark at 3× resolution.
- `assets/logo-stacked.svg`: stacked lockup with “your friend in armenia”, matching the reference; use where the subtitle remains readable.
- `assets/brand-mark.svg`, `assets/brand-mark.png`: symbol without text; the PNG has a transparent background.
- `assets/favicon.svg`, `assets/favicon.ico`, `assets/icon-16.png`, `assets/icon-32.png`, `assets/icon-48.png`: browser icons. The ICO contains actual 16, 32 and 48 pixel versions.
- The shared search favicon is `/favicon.png`, a build-generated copy of the approved 192×192 PNG. `/favicon.ico` is the stable root fallback and contains 16/32/48/64/128/256 variants. The full approved SVG remains a browser alternative; these icon URLs do not rotate with script cache versions.
- `assets/icon-180.png`, `assets/icon-192.png`, `assets/icon-512.png`: home-screen/profile icons.
- `assets/social-armmate-friends-hy.png`, `assets/social-armmate-friends-ru.png`, `assets/social-armmate-friends-en.png`: 1200 × 630 localized social cards.
- Logo green: `#3d6d4e`; logo sun: `#c77944`; paper: `#f7f6f0`. Text and buttons retain darker `#243f35` and `#be4e2d` shades for contrast.
- Manrope and Noto Sans Armenian are bundled under their included SIL Open Font Licenses.

## Wordmark typography

The lowercase `armmate` wordmark uses **Outfit at weight 650**, a rounded geometric sans serif. The website, outlined SVG logos, PNG logo and social cards use the same face. Page headings and body copy retain their original Manrope and Noto Sans Armenian faces.

The source font and its SIL Open Font License come from [Google Fonts / Outfit](https://github.com/google/fonts/tree/main/ofl/outfit). `scripts/optimize-assets.py` creates the static `ARMMATE Wordmark` face and a small WOFF2 subset containing the logo lettering. Each page preloads this local subset with `font-display: swap`.

Regenerate these files with `python scripts/optimize-assets.py`. The page generator reads the generated `brand-mark.svg` into the inline symbol, so the site and downloadable files share the same geometry. After changing assets, the page, translations or metadata, run `npm run build`.

In the navigation use the horizontal symbol + name without the tiny subtitle. Small favicons use only the symbol on a cream background, keeping the two heads and sun recognizable in light and dark browser chrome. The larger footer and social cards show the localized slogan separately. Cache versions and new social filenames prevent the previous arch icon from being reused as the new identity.

## Publishing address

The repository is **https://github.com/ekn1000/armmate** and the active site is **https://armmate.am/**, with `/ru/` and `/en/` language pages. Canonical links, the sitemap, social URLs and error-page links use this custom domain. GitHub Pages enforces HTTPS; `www.armmate.am` redirects to the apex domain.

WhatsApp uses **+374 91 110799**. Telegram uses **@armmate_support**, linked as `https://t.me/armmate_support`. The email address is **armmate.support@gmail.com**. Every contact section and floating menu uses the shared destinations in `site-config.js`.

WhatsApp and Telegram retain their recognizable vector logos in their brand colours (`#25D366`, `#26A5E4`). These vectors come from Simple Icons, which references the platforms' brand resources; its CC0 licence is included in `assets/simple-icons-LICENSE.md`. The Gmail icon is Google's original 96-pixel asset, displayed at 26 pixels. Source URLs and applicable brand guidelines are recorded in `assets/messenger-logos.json`.
