import type { T } from '../lib/i18n'
import type { Week } from '../lib/hours'

const ADDRESS_QUERY = 'A-Hyang, 3230 Steve Reynolds Blvd #102, Duluth, GA 30096'
const OPEN = { open: 11 * 60, close: 22 * 60 } // 11:00 AM – 10:00 PM (in-store menu, Oct 2026)

export const RESTAURANT = {
  name: { en: 'A-Hyang', ko: '애향' } satisfies T,
  phone: '(678) 473-1190',
  phoneHref: 'tel:+16784731190',
  street: '3230 Steve Reynolds Blvd #102',
  city: 'Duluth, GA 30096',
  plaza: { en: 'Nukoa Plaza', ko: '뉴코아 플라자' } satisfies T,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_QUERY)}`,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_QUERY)}`,
  mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS_QUERY)}&t=m&z=16&ie=UTF8&iwloc=&output=embed`,
  /** The restaurant's own commission-free DoorDash storefront (the link behind Google's "Order online"). */
  orderUrl: 'https://order.online/store/-25064818/',
  instagramUrl: 'https://www.instagram.com/ahyang_duluth/',
  instagramHandle: 'ahyang_duluth',
  /** Index 0 = Sunday. Closed Mondays. */
  hours: [OPEN, null, OPEN, OPEN, OPEN, OPEN, OPEN] satisfies Week as Week,
  lunch: {
    when: { en: 'Tue–Fri, 11\u00a0AM\u00a0–\u00a03\u00a0PM', ko: '화–금 오전\u00a011시\u00a0–\u00a0오후\u00a03시' } satisfies T,
    from: '$12.99',
  },
  lunchSpecial: { en: 'Lunch special Tue–Fri, 11\u00a0AM\u00a0–\u00a03\u00a0PM · from\u00a0$12.99', ko: '점심 특선 화–금 오전\u00a011시\u00a0–\u00a0오후\u00a03시 · $12.99부터' } satisfies T,
}

export const NAV: { id: string; label: T }[] = [
  { id: 'signature', label: { en: 'Signature', ko: '대표 메뉴' } },
  { id: 'menu', label: { en: 'Menu', ko: '메뉴' } },
  { id: 'gallery', label: { en: 'Gallery', ko: '갤러리' } },
  { id: 'reviews', label: { en: 'Reviews', ko: '리뷰' } },
  { id: 'visit', label: { en: 'Visit', ko: '오시는 길' } },
]
