# 애향 A-Hyang — restaurant website

Landing page for **애향 (A-Hyang)**, a Korean restaurant in Nukoa Plaza, 3230 Steve Reynolds Blvd, Duluth, GA 30096 · (678) 473-1190.

Live preview: **https://a-hyang.web.app**

- Bilingual (English / 한국어) with a one-tap toggle; picks Korean automatically for Korean-language phones. `?lang=ko` forces Korean.
- Live "Open now / Closed" status computed in Georgia time from the real opening hours.
- Big, readable type and thumb-reach Call / Directions / Menu bar on phones.
- Scroll-driven motion: masked headline reveals, word-by-word story text, pinned signature-dish showcase, velocity marquee, zoom-parallax gallery, review marquee.

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · Motion (`motion/react`) · Lenis smooth scroll · Firebase Hosting (+ Analytics, loaded after idle).

## Commands

```bash
npm install
npm run dev        # local dev server
npm run images     # optimize photos in assets-src/images → public/images (AVIF + WebP, responsive sizes)
npm run build      # type-check + production build into dist/
npm run deploy     # build + firebase deploy --only hosting (project: a-hyang)
```

## Editing content

| What | Where |
| --- | --- |
| Address, phone, hours, links | `src/data/restaurant.ts` |
| Menu, signature dishes, reviews, story copy, gallery | `src/data/content.ts` |
| Photos | drop files in `assets-src/images/` (file name = image name), run `npm run images` |

Every visible string has an English and a Korean version (`{ en: '…', ko: '…' }`).

## Before launch (once the owner approves)

1. Replace representative stock photography with the restaurant's own food photos (same file names in `assets-src/images/`).
2. Confirm menu prices and hours with the owner.
3. Remove `<meta name="robots" content="noindex, nofollow">` from `index.html` so Google can index the site.
4. Optionally connect a custom domain in Firebase Hosting.

## Photo credits

Representative food photography from Unsplash (Unsplash License) — see `assets-src/images/CREDITS.md`.
