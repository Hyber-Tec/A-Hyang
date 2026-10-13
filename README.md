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
2. Confirm hours with the owner: the October 2026 in-store menu says Tue–Sun 11 AM – 10 PM, while Yelp showed 9:30 PM in July 2026.
3. Menu and prices come from the in-store menu photographed in October 2026. The soft-drink price was partly cut off in the photo ($1.50 assumed), and two drink lines were blacked out on the menu itself.
4. The site makes no claims about the restaurant's history or kitchen routines. If the owner wants a story section (when they opened here, how dishes are made), get it from them first.
5. Remove `<meta name="robots" content="noindex, nofollow">` from `index.html` so Google can index the site.
6. Optionally connect a custom domain in Firebase Hosting.

## Photo credits

Representative food photography is free stock (Unsplash, Pexels and Pixabay licenses) standing in until the restaurant's own photos arrive. The storefront photo is a screenshot supplied for the demo and should be replaced too.
