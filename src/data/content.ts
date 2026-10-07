import type { T } from '../lib/i18n'
import type { ImageName } from '../components/Img'

/*
 * Content sources (researched Oct 2026): in-store menu photographed Jul 2026 and the printed menu used 2024–25,
 * Google / Yelp / DoorDash reviews (verbatim), owner replies on Google, and the restaurant's 2012 directory listing.
 * Prices marked "printed 2024–25" were not visible on the 2026 menu photo — confirm with the owner.
 */

/* ----------------------------------------------------------------- Ratings */

export const RATINGS = {
  google: { score: 4.1, countLabel: '500+' },
  others: [{ source: 'DoorDash', score: 4.8, countLabel: '76' }],
}

/* ------------------------------------------------------------------ Ticker */

export const TICKER: { ko: string; en: string }[] = [
  { ko: '왕돈까스', en: 'King Donkatsu' },
  { ko: '전골', en: 'Hot Pot' },
  { ko: '물냉면', en: 'Naengmyeon' },
  { ko: '갈비탕', en: 'Galbitang' },
  { ko: '부대찌개', en: 'Budae Jjigae' },
  { ko: '순두부', en: 'Sundubu' },
  { ko: '감자탕', en: 'Gamjatang' },
]

/* ------------------------------------------------------------------- Story */

export const STORY = {
  statement: {
    en: 'Since 2012, the green sign in Nukoa Plaza has kept the same promise — donkatsu fried the moment you order, hot pots bubbling for the whole table, and naengmyeon so cold it crackles.',
    ko: '2012년부터, 뉴코아 플라자의 초록 간판은 같은 약속을 지켜왔습니다. 주문이 들어와야 튀기는 돈까스, 식탁 위에서 보글보글 끓는 전골, 살얼음이 사각거리는 냉면.',
  } satisfies T,
  highlight: { en: ['fried', 'bubbling', 'cold'], ko: ['튀기는', '보글보글', '살얼음이'] },
  body: {
    en: 'A-Hyang (애향, said “Ae-hyang”) is a family-run Korean kitchen. Side dishes are made fresh every morning, every cutlet is fried to order, and the portions are famously generous — the kind of place where regulars say it feels like eating at a friend’s house.',
    ko: '애향은 가족이 함께 꾸려가는 한식당입니다. 반찬은 매일 아침 새로 만들고, 돈까스는 주문 즉시 튀기며, 양은 늘 넉넉하게 담습니다. 단골손님들이 “친구 집에서 밥 먹는 것 같다”고 말하는 곳이죠.',
  } satisfies T,
  /** The restaurant's own words from its 2012 opening listing. */
  promise: {
    ko: '어머님의 손길 그대로 담은 정갈한 음식',
    en: 'Wholesome food, made with a mother’s touch.',
    caption: { en: 'Our promise since opening day, 2012', ko: '2012년 문을 연 날부터 지켜온 약속' } satisfies T,
  },
  images: ['story-1', 'story-2'] as ImageName[],
  imageAlts: [
    { en: 'A bubbling Korean hot pot', ko: '보글보글 끓는 전골' },
    { en: 'Korean side dishes (banchan)', ko: '정갈한 반찬' },
  ] as T[],
}

export const STATS: { value?: number; from?: number; decimals?: number; suffix?: string; text?: T; label: T }[] = [
  { value: 2012, from: 1990, label: { en: 'Serving Duluth since', ko: '둘루스에서 함께한 시간, 2012년부터' } },
  { value: 4.1, decimals: 1, suffix: '★', label: { en: 'Google rating · 500+ reviews', ko: 'Google 평점 · 리뷰 500개 이상' } },
  { value: 102, label: { en: 'Google reviews that mention our donkatsu', ko: '돈까스를 언급한 Google 리뷰' } },
  { value: 4.8, decimals: 1, suffix: '★', label: { en: 'DoorDash rating', ko: 'DoorDash 평점' } },
]

export const PRESS = {
  quote: { ko: '애향은 두툼하고 푸짐한 돈가스와 푹 우러난 전골의 깊은 맛으로 유명하다.', en: 'A-Hyang is famous for its thick, generous donkatsu and the deep flavor of its slow-simmered hot pots.' } satisfies T,
  source: { en: 'The Atlanta Chosun Ilbo, 2020', ko: '애틀랜타 조선일보, 2020' } satisfies T,
}

/* --------------------------------------------------------------- Signature */

export type Signature = {
  id: string
  ko: string
  en: string
  tagline: T
  desc: T
  price?: T
  badge?: T
  image: ImageName
  imageAlt: T
  position?: string
}

export const SIGNATURES: Signature[] = [
  {
    id: 'donkatsu',
    ko: '왕돈까스',
    en: 'Donkatsu & King Donkatsu',
    badge: { en: 'Our most-loved dish', ko: '애향의 대표 메뉴' },
    tagline: { en: 'Fried the moment you order — never before.', ko: '주문이 들어와야 튀깁니다. 미리 튀겨두지 않습니다.' },
    desc: {
      en: 'A wide, golden cutlet under our house brown sauce, with shredded cabbage and macaroni salad on the side. Go big with the King — famously larger than a sheet of letter paper, and easily enough for two.',
      ko: '넓고 바삭한 돈까스에 애향표 브라운 소스, 양배추 샐러드와 마카로니를 곁들였습니다. 크게 드시고 싶다면 왕돈까스 — A4 용지보다 크다는 바로 그 돈까스, 두 분이 드셔도 넉넉합니다.',
    },
    price: { en: 'Donkatsu $14.99 · King $24.99', ko: '돈까스 $14.99 · 왕돈까스 $24.99' },
    image: 'sig-katsu',
    imageAlt: { en: 'Korean-style donkatsu with brown sauce', ko: '브라운 소스를 올린 경양식 돈까스' },
  },
  {
    id: 'jeongol',
    ko: '전골',
    en: 'Jeongol · Hot Pots',
    badge: { en: 'On our sign since day one', ko: '간판에 새겨진 이름' },
    tagline: { en: 'Brought out bubbling — made for sharing.', ko: '보글보글 끓여 내는, 함께 나눠 먹는 맛.' },
    desc: {
      en: 'Budae, gamja and mushroom-dumpling hot pots sized for two to four. Add ramen or cheese, then finish the last of the broth with fried rice — the way our regulars do.',
      ko: '부대전골, 감자전골, 버섯만두전골을 2–4인분으로. 라면이나 치즈 사리를 넣고, 마지막 국물엔 볶음밥으로 마무리하세요. 단골손님들의 방식입니다.',
    },
    price: { en: 'Serves 2 from $34.99', ko: '2인분 $34.99부터' },
    image: 'sig-jeongol',
    imageAlt: { en: 'A bubbling Korean hot pot', ko: '보글보글 끓는 전골' },
    position: '50% 72%',
  },
  {
    id: 'naengmyeon',
    ko: '냉면',
    en: 'Naengmyeon · Cold Noodles',
    badge: { en: 'A Georgia-summer essential', ko: '여름이면 생각나는 맛' },
    tagline: { en: 'Icy, tangy, impossibly refreshing.', ko: '살얼음 동동, 속까지 시원하게.' },
    desc: {
      en: 'Chewy buckwheat noodles in an ice-cold, tangy beef broth — or tossed in a sweet-and-spicy sauce made with real fruit. Pair it with LA galbi or spicy pork for the classic hot-and-cold combo.',
      ko: '쫄깃한 메밀면에 새콤하고 시원한 육수, 또는 과일로 맛을 낸 매콤달콤한 양념. LA갈비나 제육볶음을 곁들인 콤보로 차갑고 뜨거운 조화를 즐겨보세요.',
    },
    price: { en: 'From $13.99 · combos from $19.99', ko: '$13.99부터 · 콤보 $19.99부터' },
    image: 'sig-naengmyeon',
    imageAlt: { en: 'Cold buckwheat noodles in icy broth', ko: '시원한 물냉면' },
  },
  {
    id: 'stews',
    ko: '탕 · 찌개',
    en: 'Soups & Stews',
    badge: { en: 'Banchan made fresh every morning', ko: '반찬은 매일 아침 직접 만듭니다' },
    tagline: { en: 'Piping hot, deeply comforting.', ko: '펄펄 끓는 뚝배기 한 그릇의 위로.' },
    desc: {
      en: 'Galbitang with tender short ribs, spicy yukgaejang, budae jjigae and soft tofu stews — served steaming in stone pots, alongside banchan our kitchen makes fresh every morning.',
      ko: '부드러운 갈비탕, 얼큰한 육개장, 부대찌개와 순두부까지. 펄펄 끓는 뚝배기에 매일 아침 만드는 반찬을 곁들여 드립니다.',
    },
    price: { en: 'From $13.99', ko: '$13.99부터' },
    image: 'sig-stew',
    imageAlt: { en: 'Spicy Korean stew in a stone pot', ko: '뚝배기에 담긴 얼큰한 찌개' },
  },
]

/* -------------------------------------------------------------------- Menu */

export type Tag = 'popular' | 'signature' | 'spicy' | 'share' | 'cold'
export type Size = { label: T; price: string }
export type MenuItem = { ko: string; en: string; desc?: T; price: string; sizes?: Size[]; tags?: Tag[] }
export type MenuCategory = { id: string; ko: string; en: string; note?: T; image: ImageName; position?: string; items: MenuItem[] }

const serves = (n: number): T => ({ en: `${n} ppl`, ko: `${n}인` })
const SM: T = { en: 'Medium', ko: '보통' }
const LG: T = { en: 'Large', ko: '곱빼기' }

export const MENU_NOTE: T = {
  en: 'In-store prices shown. Every order is made fresh — please call ahead for large groups or to confirm today’s menu.',
  ko: '매장 가격 기준입니다. 모든 메뉴는 주문 즉시 조리하며, 단체 예약이나 오늘의 메뉴는 전화로 문의해 주세요.',
}

export const MENU: MenuCategory[] = [
  {
    id: 'donkatsu',
    ko: '돈까스',
    en: 'Donkatsu',
    image: 'cat-katsu',
    note: {
      en: 'Fried to order, never ahead. Served with shredded cabbage salad and macaroni salad.',
      ko: '미리 튀겨두지 않고 주문 즉시 튀깁니다. 양배추 샐러드와 마카로니가 함께 나갑니다.',
    },
    items: [
      { ko: '돈까스', en: 'Donkatsu', price: '$14.99', tags: ['signature'], desc: { en: 'The original — a golden, crunchy pork cutlet under our house brown sauce.', ko: '애향의 기본. 바삭하게 튀긴 돈까스에 애향표 브라운 소스.' } },
      { ko: '왕돈까스', en: 'King Donkatsu', price: '$24.99', tags: ['popular', 'share'], desc: { en: 'Our legend: a jumbo cutlet bigger than a sheet of letter paper. Easily feeds two.', ko: '애향의 전설. A4 용지보다 큰 왕돈까스, 두 분이 드셔도 넉넉합니다.' } },
      { ko: '치즈 돈까스', en: 'Cheese Donkatsu', price: '$18.99', desc: { en: 'Stuffed with melty mozzarella.', ko: '모짜렐라 치즈가 쭉 늘어나는 돈까스.' } },
      { ko: '왕 치즈 돈까스', en: 'King Cheese Donkatsu', price: '$28.99', tags: ['share'], desc: { en: 'The King, filled with extra cheese.', ko: '치즈를 듬뿍 채운 왕돈까스.' } },
      { ko: '매운 돈까스', en: 'Spicy Donkatsu', price: '$18.99', tags: ['spicy'], desc: { en: 'Our crispy cutlet with a fiery house sauce.', ko: '바삭한 돈까스에 매콤한 불 소스.' } },
      { ko: '멘치까스', en: 'Menchi Katsu', price: '$17.99', desc: { en: 'A crispy fried patty of seasoned minced beef and pork.', ko: '다진 소고기와 돼지고기로 빚어 바삭하게 튀긴 멘치까스.' } },
      { ko: '돈까스 덮밥', en: 'Pork Cutlet Rice Bowl', price: '$12.99', desc: { en: 'Sliced cutlet with onion, mushroom and egg over rice.', ko: '양파, 버섯, 계란과 함께 밥 위에 올린 돈까스.' } },
    ],
  },
  {
    id: 'jeongol',
    ko: '전골',
    en: 'Hot Pots',
    image: 'cat-jeongol',
    note: {
      en: 'Made for the table — sized for 2, 3 or 4. Add ramen, cheese or glass noodles, and finish with fried rice.',
      ko: '2·3·4인분으로 준비됩니다. 라면·치즈·당면 사리를 추가하고, 마무리는 볶음밥으로.',
    },
    items: [
      { ko: '부대전골', en: 'Budae Jeongol (Army Hot Pot)', price: '$34.99', tags: ['popular', 'spicy'], sizes: [{ label: serves(2), price: '$34.99' }, { label: serves(3), price: '$48.99' }, { label: serves(4), price: '$61.99' }], desc: { en: 'Ham, sausage, kimchi and sweet-potato glass noodles in a spicy broth.', ko: '햄, 소시지, 김치, 당면을 넣고 얼큰하게 끓인 부대전골.' } },
      { ko: '감자전골', en: 'Gamja Jeongol (Pork Bone Hot Pot)', price: '$34.99', tags: ['spicy'], sizes: [{ label: serves(2), price: '$34.99' }, { label: serves(3), price: '$48.99' }, { label: serves(4), price: '$61.99' }], desc: { en: 'Fall-off-the-bone pork neck and potatoes in a deep, spicy broth.', ko: '푹 고아낸 돼지 등뼈와 감자가 듬뿍, 진하고 얼큰한 감자전골.' } },
      { ko: '버섯 만두전골', en: 'Mushroom & Dumpling Hot Pot', price: '$39.99', sizes: [{ label: serves(2), price: '$39.99' }, { label: serves(3), price: '$56.99' }, { label: serves(4), price: '$71.99' }], desc: { en: 'A mild, comforting pot of mushrooms and dumplings.', ko: '버섯과 만두를 듬뿍 넣은 순하고 따뜻한 전골.' } },
      { ko: '곱창전골', en: 'Gopchang Jeongol (Beef Tripe Hot Pot)', price: '$39.99', tags: ['spicy'], sizes: [{ label: serves(2), price: '$39.99' }, { label: serves(3), price: '$54.99' }, { label: serves(4), price: '$71.99' }], desc: { en: 'A spicy, rich hot pot of beef tripe and vegetables.', ko: '고소한 곱창과 채소를 얼큰하게 끓인 곱창전골.' } },
    ],
  },
  {
    id: 'naengmyeon',
    ko: '냉면',
    en: 'Cold Noodles',
    image: 'cat-naengmyeon',
    note: {
      en: 'Any combo can be made with bibim naengmyeon. Large size +$2.',
      ko: '콤보는 비빔냉면으로 변경 가능하며, 곱빼기는 $2 추가입니다.',
    },
    items: [
      { ko: '물냉면', en: 'Mul Naengmyeon', price: '$13.99', tags: ['cold', 'popular'], sizes: [{ label: SM, price: '$13.99' }, { label: LG, price: '$15.99' }], desc: { en: 'Chewy buckwheat noodles in an icy, tangy beef broth.', ko: '쫄깃한 메밀면에 새콤하고 시원한 육수.' } },
      { ko: '비빔냉면', en: 'Bibim Naengmyeon', price: '$13.99', tags: ['cold', 'spicy'], sizes: [{ label: SM, price: '$13.99' }, { label: LG, price: '$15.99' }], desc: { en: 'Tossed in a sweet-and-spicy chili sauce made with real fruit.', ko: '과일로 맛을 낸 매콤달콤한 양념에 쓱쓱 비벼 먹는 냉면.' } },
      { ko: '냉면 + 군만두', en: 'Naengmyeon + Fried Dumplings', price: '$19.99', desc: { en: 'Cold noodles with crispy pan-fried dumplings.', ko: '시원한 냉면에 바삭한 군만두.' } },
      { ko: '냉면 + 제육볶음', en: 'Naengmyeon + Spicy Pork', price: '$23.99', desc: { en: 'The classic hot-and-cold pairing.', ko: '차가운 냉면과 매콤한 제육볶음의 찰떡궁합.' } },
      { ko: '냉면 + LA갈비', en: 'Naengmyeon + LA Galbi', price: '$28.99', tags: ['popular'], desc: { en: 'Cold noodles with grilled, sweet-soy short ribs.', ko: '시원한 냉면에 달콤하게 구운 LA갈비.' } },
      { ko: '냉면 사리 추가', en: 'Extra Noodles', price: '$7.99' },
    ],
  },
  {
    id: 'stews',
    ko: '탕 · 찌개',
    en: 'Soups & Stews',
    image: 'cat-stew',
    note: {
      en: 'Served bubbling in stone pots. Soft tofu stews come mild, spicy or very spicy.',
      ko: '뚝배기에 펄펄 끓여 드립니다. 순두부는 순한맛·매운맛·아주 매운맛 중에 고르세요.',
    },
    items: [
      { ko: '갈비탕', en: 'Galbitang', price: '$16.99', tags: ['popular'], desc: { en: 'Tender beef short ribs in a clear, deeply savory broth.', ko: '부드러운 소갈비를 맑고 깊은 국물에.' } },
      { ko: '갈비탕 만두국', en: 'Galbitang with Dumplings', price: '$19.99', desc: { en: 'Short-rib soup with plump dumplings.', ko: '갈비탕에 만두를 더해 더 든든하게.' } },
      { ko: '육개장', en: 'Yukgaejang', price: '$14.99', tags: ['spicy'], desc: { en: 'Spicy shredded-beef soup with scallions.', ko: '결대로 찢은 소고기와 대파를 넣은 얼큰한 육개장.' } },
      { ko: '육개장 칼국수', en: 'Yukgaejang Kalguksu', price: '$16.99', tags: ['spicy'], desc: { en: 'Knife-cut noodles in the same spicy beef broth.', ko: '얼큰한 육개장 국물에 칼국수를.' } },
      { ko: '부대찌개', en: 'Budae Jjigae (Army Stew)', price: '$14.99', tags: ['popular', 'spicy'], desc: { en: 'Ham, sausage, ramen and kimchi, bubbling in a stone pot.', ko: '햄, 소시지, 라면, 김치가 들어간 뚝배기 부대찌개.' } },
      { ko: '감자탕', en: 'Gamjatang (Pork Bone Soup)', price: '$14.99', tags: ['spicy'], desc: { en: 'Our pork bone and potato stew, in a single-serving pot.', ko: '1인 뚝배기로 즐기는 감자탕.' } },
      { ko: '떡만두국', en: 'Rice Cake & Dumpling Soup', price: '$14.99', desc: { en: 'Sliced rice cakes and dumplings in a mild beef broth.', ko: '순한 소고기 육수에 떡과 만두를 듬뿍.' } },
      { ko: '김치찌개', en: 'Kimchi Jjigae', price: '$14.99', tags: ['spicy'], desc: { en: 'Well-fermented kimchi stew with pork.', ko: '잘 익은 김치와 돼지고기로 끓인 김치찌개.' } },
      { ko: '순두부찌개', en: 'Soft Tofu Stew', price: '$13.99', desc: { en: 'Choose beef, kimchi, pork, mushroom or mixed.', ko: '육개장·김치·돼지고기·버섯·섞어 중에 선택.' } },
      { ko: '해물 순두부', en: 'Seafood Soft Tofu Stew', price: '$14.99', desc: { en: 'Silky tofu with assorted seafood.', ko: '해산물을 듬뿍 넣은 순두부찌개.' } },
    ],
  },
  {
    id: 'bibimbap',
    ko: '비빔밥',
    en: 'Bibimbap',
    image: 'cat-bibimbap',
    note: {
      en: 'Stone-pot bowls arrive sizzling — wait a moment for the rice to crisp, then mix.',
      ko: '돌솥은 지글지글 뜨겁게 나갑니다. 누룽지가 생기도록 잠시 기다렸다가 비벼 드세요.',
    },
    items: [
      { ko: '비빔밥', en: 'Bibimbap', price: '$13.99', desc: { en: 'Rice topped with seasoned vegetables and an egg.', ko: '갖은 나물과 계란을 올린 비빔밥.' } },
      { ko: '돌솥 비빔밥', en: 'Dolsot Bibimbap', price: '$14.99', tags: ['popular'], desc: { en: 'In a sizzling stone bowl, with crispy rice at the bottom.', ko: '뜨거운 돌솥에 바삭한 누룽지까지.' } },
      { ko: '제육 돌솥 비빔밥', en: 'Spicy Pork Dolsot', price: '$17.99', tags: ['spicy'] },
      { ko: '오징어 돌솥 비빔밥', en: 'Spicy Squid Dolsot', price: '$18.99', tags: ['spicy'] },
      { ko: '불고기 돌솥 비빔밥', en: 'Bulgogi Dolsot', price: '$19.99' },
      { ko: '낙지 돌솥 비빔밥', en: 'Spicy Octopus Dolsot', price: '$19.99', tags: ['spicy'] },
      { ko: '갈비 돌솥 비빔밥', en: 'Galbi Dolsot', price: '$25.99' },
    ],
  },
  {
    id: 'grill',
    ko: '고기 · 볶음',
    en: 'Grill & Stir-fry',
    image: 'cat-grill',
    note: { en: 'Comes to the table sizzling on a hot plate.', ko: '뜨거운 철판에 지글지글 담아 드립니다.' },
    items: [
      { ko: 'LA 갈비', en: 'LA Galbi', price: '$27.99', tags: ['popular'], desc: { en: 'Grilled beef short ribs in our sweet soy marinade.', ko: '달콤한 간장 양념에 재운 소갈비 구이.' } },
      { ko: '불고기', en: 'Bulgogi', price: '$19.99', desc: { en: 'Sweet-soy marinated beef, stir-fried with vegetables.', ko: '달콤한 간장 양념 소고기를 채소와 함께 볶아냈습니다.' } },
      { ko: '제육볶음', en: 'Jaeyuk Bokkeum (Spicy Pork)', price: '$16.99', tags: ['spicy'], sizes: [{ label: serves(1), price: '$16.99' }, { label: serves(2), price: '$30.99' }, { label: serves(3), price: '$45.99' }], desc: { en: 'Pork stir-fried with vegetables in a zesty gochujang sauce.', ko: '고추장 양념에 채소와 함께 볶은 돼지고기.' } },
      { ko: '오징어볶음', en: 'Ojingeo Bokkeum (Spicy Squid)', price: '$18.99', tags: ['spicy'], sizes: [{ label: { en: 'Small', ko: '소' }, price: '$18.99' }, { label: { en: 'Medium', ko: '중' }, price: '$32.99' }], desc: { en: 'Tender squid and vegetables in a bold, spicy sauce.', ko: '부드러운 오징어와 채소를 매콤하게 볶았습니다.' } },
    ],
  },
  {
    id: 'street',
    ko: '분식 · 라면',
    en: 'Street Food & Ramen',
    image: 'cat-street',
    note: { en: 'New this year: ramen bowls, fried rice and Korean-style sandwiches.', ko: '올해 새로 선보인 라면, 볶음밥, 한국식 샌드위치.' },
    items: [
      { ko: '소떡소떡', en: 'Sotteok Skewers', price: '$9.99', tags: ['popular'], desc: { en: 'Sausage and rice-cake skewers in a sweet-and-spicy glaze.', ko: '소시지와 떡을 꿰어 달콤매콤한 소스를 바른 소떡소떡.' } },
      { ko: '군만두', en: 'Fried Dumplings', price: '$6.99', sizes: [{ label: { en: '4 pcs', ko: '4개' }, price: '$6.99' }, { label: { en: '8 pcs', ko: '8개' }, price: '$12.99' }] },
      { ko: '부대라면', en: 'Budae Ramen', price: '$13.99', tags: ['spicy'], desc: { en: 'Army-stew style ramen with sausage, kimchi and tofu.', ko: '소시지, 김치, 두부를 넣은 부대찌개 스타일 라면.' } },
      { ko: '돈까스 라면', en: 'Donkatsu Ramen', price: '$13.99', desc: { en: 'Ramen topped with a crispy pork cutlet.', ko: '바삭한 돈까스를 올린 라면.' } },
      { ko: '순두부 라면', en: 'Sundubu Ramen', price: '$13.99' },
      { ko: '불고기 라면', en: 'Bulgogi Ramen', price: '$14.99' },
      { ko: '짬뽕밥', en: 'Jjamppong Rice', price: '$14.99', tags: ['spicy'], desc: { en: 'Spicy seafood soup with a bowl of rice.', ko: '얼큰한 해물 짬뽕 국물에 밥 한 공기.' } },
      { ko: '스팸 계란밥', en: 'Spam & Egg Fried Rice', price: '$9.99' },
      { ko: '매운 버섯 볶음밥', en: 'Spicy Mushroom Fried Rice', price: '$11.99', tags: ['spicy'] },
      { ko: '돈까스 필리', en: 'Pork Cutlet Philly', price: '$11.99', desc: { en: 'Crispy cutlet, grilled onions, peppers and mozzarella on a roll.', ko: '바삭한 돈까스에 구운 양파, 피망, 모짜렐라를 더한 샌드위치.' } },
      { ko: '불고기 필리', en: 'Bulgogi Philly', price: '$14.99', desc: { en: 'Bulgogi beef, grilled onions, peppers and mozzarella.', ko: '불고기에 구운 양파, 피망, 모짜렐라를 더한 샌드위치.' } },
    ],
  },
]

/* ----------------------------------------------------------------- Reviews */

export type Review = { text: string; translation?: string; author: string; source: string; rating?: number; date?: string; lang: 'en' | 'ko' }

/** Real reviews, quoted verbatim (trimmed with "…" where shortened). Names shortened to first name + initial. */
export const REVIEWS: Review[] = [
  { lang: 'en', text: 'Hands down crunchiest Donkatsu in the metro.', author: 'Ll G.', source: 'Yelp', rating: 5, date: '2024' },
  { lang: 'en', text: 'A-Hyang has become one of my go-to comfort spots! I always order the Wang Donkatsu (왕돈까스)… The portion size is HUGE—enough to feed two people.', author: 'SB', source: 'Google', rating: 5, date: '2026' },
  { lang: 'ko', text: '여기 정말 맛있어요. 아틀란타 갈때 마다 꼭 들려요. 다 맛있는데, 왕돈까스와 순두부 찌개가 정말 맛있어요. 사장님 부부 정말 친절해요.', translation: 'It’s really delicious here — I stop by every time I’m in Atlanta. Everything is good, but the King Donkatsu and the soft tofu stew are especially delicious. The owner couple is so kind.', author: 'Seihill K.', source: 'Google', rating: 5, date: '2026' },
  { lang: 'en', text: 'The family that owns it has made me feel welcome from the first night I stumbled upon it. There are a lot of Korean restaurants in Duluth, but this is by far my favorite.', author: 'Jessica R.', source: 'Google', rating: 5, date: '2025' },
  { lang: 'en', text: 'The mul naengmyun is delicious and so refreshing in the Georgia heat. Quiet and cute family business.', author: 'Kat S.', source: 'Yelp', rating: 5, date: '2024' },
  { lang: 'en', text: 'The best tonkatsu in the area. The meat is not too thin and not too thick and it is flavored all the way through. The Mac salad is really good and complements the crispy tonkatsu.', author: 'Jessica S.', source: 'Google', rating: 5, date: '2022' },
  { lang: 'en', text: 'Their kimchi is the perfect fermented sour that makes it really flavorful as well, and the other banchan and sides were delicious.', author: 'Leaf W.', source: 'Google', rating: 5, date: '2026' },
  { lang: 'en', text: 'Everyone here is SO nice, so friendly, and so accommodating. It really felt like I was eating at a friend’s house.', author: 'Elizabeth C.', source: 'Yelp', rating: 4, date: '2023' },
  { lang: 'ko', text: '다른 한식집 돈까스는 그냥 마지못해 먹는데 여기는 한국에 있어도 가끔 생각날 것 같은 맛. 연한 황토색 소스 클래식함.', translation: 'At other Korean restaurants I eat the donkatsu reluctantly — this one I’d crave even back in Korea. A classic, light-brown sauce.', author: '김나무', source: 'Google', rating: 5, date: '2022' },
  { lang: 'en', text: 'The stone bowl soups are insanely delicious and arrive at your table hot and bubbling.', author: 'Jess B.', source: 'Yelp', rating: 5, date: '2024' },
  { lang: 'en', text: 'You get an insanely large portion of food for the price. This place deserves a 5/5 for that alone.', author: 'Mohd H.', source: 'Google', rating: 5, date: '2024' },
  { lang: 'en', text: 'A-Hyang is a go-to spot for tonkatsu! The service is always great, the interior is clean, and the food is absolutely delicious.', author: 'Trinity N.', source: 'Yelp', rating: 5, date: '2025' },
  { lang: 'ko', text: '저희 가족이 참 좋아하는 식당입니다. … 올 때 마다 기분이 좋아지는 곳입니다.', translation: 'A restaurant our whole family loves… a place that puts me in a good mood every time I come.', author: '김주평', source: 'Google', rating: 5, date: '2025' },
  { lang: 'en', text: '…the king size tonkatsu (HUGE and can feed 2-3 people and comes with delicious mac salad) and the bibim naengmyeon. Get these two things, you will not regret it!', author: 'Alexandria N.', source: 'Yelp', rating: 5, date: '2024' },
  { lang: 'en', text: 'Not only incredibly generous in size (and value priced, considering the size, plus all the sides!), it was truly amazing! Possibly one of the best Katsu dishes I’ve ever had??', author: 'Rose E.', source: 'Yelp', rating: 5, date: '2023' },
  { lang: 'en', text: 'A-Hyang graciously prepared the food again for me. This is excellent customer service! And of course the food was still hot and delicious.', author: 'Grace C.', source: 'DoorDash', rating: 5, date: '2025' },
  { lang: 'en', text: 'Delicious food, clean place, very friendly owners. Family owned business.', author: 'Eric M.', source: 'Google', rating: 5, date: '2026' },
  { lang: 'en', text: 'a-hyang (their donkatsu is as big as your head)', author: 'r/Gwinnett', source: 'Reddit', date: '2026' },
]

/* ----------------------------------------------------------------- Gallery */

export const GALLERY: { image: ImageName; alt: T; position?: string }[] = [
  { image: 'g-1', alt: { en: 'A Korean table spread', ko: '한상 차림' } },
  { image: 'g-2', alt: { en: 'Cheese donkatsu', ko: '치즈 돈까스' } },
  { image: 'g-3', alt: { en: 'Steaming dumplings', ko: '김이 오르는 만두' } },
  { image: 'g-4', alt: { en: 'Cold buckwheat noodles', ko: '물냉면' } },
  { image: 'g-5', alt: { en: 'Flames in the kitchen', ko: '주방의 불맛' } },
  { image: 'g-6', alt: { en: 'Budae jjigae', ko: '부대찌개' } },
  { image: 'g-7', alt: { en: 'Banchan side dishes', ko: '반찬' } },
]
