import type { T } from '../lib/i18n'
import type { Week } from '../lib/hours'

const ADDRESS_QUERY = 'A-Hyang, 3230 Steve Reynolds Blvd #102, Duluth, GA 30096'
const OPEN = { open: 11 * 60, close: 21 * 60 + 30 } // 11:00 AM – 9:30 PM

export const RESTAURANT = {
  name: { en: 'A-Hyang', ko: '애향' } satisfies T,
  phone: '(678) 473-1190',
  phoneHref: 'tel:+16784731190',
  street: '3230 Steve Reynolds Blvd #102',
  city: 'Duluth, GA 30096',
  plaza: { en: 'Nukoa Plaza', ko: '뉴코아 플라자' } satisfies T,
  since: 2012,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_QUERY)}`,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_QUERY)}`,
  mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS_QUERY)}&t=m&z=16&ie=UTF8&iwloc=&output=embed`,
  /** The restaurant's own commission-free DoorDash storefront (the link behind Google's "Order online"). */
  orderUrl: 'https://order.online/store/-25064818/',
  instagramUrl: 'https://www.instagram.com/ahyang_duluth/',
  instagramHandle: 'ahyang_duluth',
  /** Index 0 = Sunday. Closed Mondays. */
  hours: [OPEN, null, OPEN, OPEN, OPEN, OPEN, OPEN] satisfies Week as Week,
  lunchSpecial: { en: 'Lunch specials Tue–Thu, 11 AM – 2:30 PM', ko: '런치 스페셜 화–목 오전 11시 – 오후 2시 30분' } satisfies T,
}

export const NAV: { id: string; label: T }[] = [
  { id: 'signature', label: { en: 'Signature', ko: '대표 메뉴' } },
  { id: 'menu', label: { en: 'Menu', ko: '메뉴' } },
  { id: 'gallery', label: { en: 'Gallery', ko: '갤러리' } },
  { id: 'reviews', label: { en: 'Reviews', ko: '리뷰' } },
  { id: 'visit', label: { en: 'Visit', ko: '오시는 길' } },
]
