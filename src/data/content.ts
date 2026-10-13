import type { T } from '../lib/i18n'
import type { ImageName } from '../components/Img'

/*
 * Content sources: the in-store menu photographed in October 2026 (every dish, price, the lunch special and the
 * hours), Google / Yelp / DoorDash / Reddit / Atlanta TalkTalk reviews quoted verbatim, and Google's ratings and
 * review topics (checked October 2026).
 * The site deliberately makes no claims about the restaurant's history or kitchen routines — the business has
 * changed hands over the years, so confirm anything like that with the current owner before adding it.
 */

/* ----------------------------------------------------------------- Ratings */

export const RATINGS = {
  google: { score: 4.1, countLabel: '500+' },
  others: [{ source: 'DoorDash', score: 4.8, countLabel: '76' }],
}

/* ------------------------------------------------------------------ Ticker */

export const TICKER: { ko: string; en: string }[] = [
  { ko: '왕돈까스', en: 'King Donkatsu' },
  { ko: '물냉면', en: 'Mul Naengmyeon' },
  { ko: '부대전골', en: 'Budae Jeongol' },
  { ko: '갈비탕', en: 'Galbitang' },
  { ko: '순두부', en: 'Sundubu' },
  { ko: '돌솥비빔밥', en: 'Dolsot Bibimbap' },
  { ko: '부대찌개', en: 'Budae Jjigae' },
]

/* ------------------------------------------------------------------- Story */

export type Quote = { text: string; author: string; source: string; date: string }

export const STORY = {
  statement: {
    en: 'Under the green sign in Nukoa Plaza, A-Hyang serves the Korean comfort food Duluth keeps coming back for — crisp golden donkatsu, cold buckwheat naengmyeon, and stews that arrive still bubbling.',
    ko: '뉴코아 플라자의 초록 간판 아래, 애향은 둘루스가 다시 찾는 한식을 차려냅니다. 바삭한 황금빛 돈까스, 시원한 메밀 냉면, 보글보글 끓어오르는 뚝배기까지.',
  } satisfies T,
  highlight: { en: ['crisp', 'cold', 'bubbling'], ko: ['바삭한', '시원한', '보글보글'] },
  body: {
    en: 'A-Hyang (애향, said “Ae-hyang”) is a family-run Korean kitchen with more than fifty dishes on the menu: donkatsu and cold noodles, soups and stews, stone-pot bibimbap, stir-fries and a new lineup of ramen bowls. The portions are big, and regulars say it feels like eating at a friend’s house.',
    ko: '애향은 가족이 함께 꾸려가는 한식당입니다. 돈까스와 냉면, 찌개와 탕, 돌솥비빔밥과 볶음 요리, 새로 선보인 라면까지 50가지가 넘는 메뉴를 넉넉한 양으로 차려냅니다. 단골손님들은 “친구 집에서 밥 먹는 것 같다”고 말합니다.',
  } satisfies T,
  /** A real review in each language, shown as the section's pull quote. */
  quote: {
    en: { text: 'The family that owns it has made me feel welcome from the first night I stumbled upon it.', author: 'Jessica R.', source: 'Google', date: '2025' },
    ko: { text: '올 때 마다 기분이 좋아지는 곳입니다.', author: '김주평', source: 'Google', date: '2025' },
  } satisfies Record<'en' | 'ko', Quote>,
  images: ['story-1', 'story-2'] as ImageName[],
  imageAlts: [
    { en: 'A bubbling Korean hot pot', ko: '보글보글 끓는 전골' },
    { en: 'Korean side dishes (banchan)', ko: '정갈한 반찬' },
  ] as T[],
}

export const STATS: { value?: number; from?: number; decimals?: number; suffix?: string; text?: T; label: T }[] = [
  { value: 4.1, decimals: 1, suffix: '★', label: { en: 'Google rating · 500+ reviews', ko: 'Google 평점 · 리뷰 500개 이상' } },
  { value: 102, label: { en: 'Google reviews that mention our donkatsu', ko: '돈까스를 언급한 Google 리뷰' } },
  { value: 4.8, decimals: 1, suffix: '★', label: { en: 'DoorDash rating', ko: 'DoorDash 평점' } },
  { value: 50, suffix: '+', label: { en: 'Dishes on the menu', ko: '메뉴 가짓수' } },
]

/** The big pull quote in the reviews section — a regular's post on Atlanta TalkTalk (Sept 28, 2024). */
export const FEATURED = {
  text: '내심 왕돈까스를 주문하려했는데 지인의 만류로 주문한 보통돈까스인데 저의 얼굴 싸이즈입니다.',
  translation: 'I secretly wanted the King Donkatsu, but a friend talked me out of it. This is the regular one — and it’s the size of my face.',
  source: { en: '아틀란타 맛객 · Atlanta TalkTalk, 2024', ko: '아틀란타 맛객 · 아틀란타 톡톡, 2024' } satisfies T,
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
    tagline: { en: 'Golden, crunchy — and famously huge.', ko: '바삭하고 고소하게, 그리고 큼직하게.' },
    desc: {
      en: 'A crispy breaded pork cutlet with a house-made brown sauce, cabbage salad and macaroni on the side. Go big with the King: jumbo-sized, and regulars say it easily feeds two.',
      ko: '바삭하게 튀긴 돈까스에 직접 만든 브라운 소스, 양배추 샐러드와 마카로니를 곁들였습니다. 크게 드시고 싶다면 점보 사이즈 왕돈까스 — 두 분이 드셔도 넉넉하다는 단골손님들의 평입니다.',
    },
    price: { en: 'Donkatsu $14.99 · King $24.99', ko: '돈까스 $14.99 · 왕돈까스 $24.99' },
    image: 'sig-katsu',
    imageAlt: { en: 'Korean-style donkatsu with brown sauce', ko: '브라운 소스를 올린 경양식 돈까스' },
  },
  {
    id: 'jeongol',
    ko: '부대전골',
    en: 'Budae Jeongol · Army Hot Pot',
    badge: { en: 'A-Hyang Special', ko: '애향 스페셜' },
    tagline: { en: 'Brought out bubbling — made for sharing.', ko: '보글보글 끓여 내는, 함께 나눠 먹는 맛.' },
    desc: {
      en: 'Sausage, Spam, tofu, noodles and vegetables in a spicy broth, in small, medium or large pots for the table. Add extra ramen noodles for $2.',
      ko: '소시지, 스팸, 두부, 면과 채소를 얼큰한 국물에 끓여낸 부대전골. S·M·L 사이즈로 함께 나눠 드세요. 라면 사리는 $2에 추가할 수 있습니다.',
    },
    price: { en: 'S $34.99 · M $48.99 · L $61.99', ko: 'S $34.99 · M $48.99 · L $61.99' },
    image: 'sig-jeongol',
    imageAlt: { en: 'A bubbling Korean hot pot', ko: '보글보글 끓는 전골' },
    position: '50% 72%',
  },
  {
    id: 'naengmyeon',
    ko: '냉면',
    en: 'Naengmyeon · Cold Noodles',
    badge: { en: 'A Georgia-summer essential', ko: '여름이면 생각나는 맛' },
    tagline: { en: 'Cold, tangy, and so refreshing.', ko: '새콤하고 시원하게, 속까지 개운하게.' },
    desc: {
      en: 'Buckwheat noodles in a cold, tangy beef broth — or tossed in a spicy-sweet chili sauce as bibim naengmyeon. Make it a combo with fried dumplings, spicy pork or LA galbi.',
      ko: '새콤하고 시원한 소고기 육수에 메밀면, 또는 매콤달콤한 양념에 비벼 먹는 비빔냉면. 군만두·제육볶음·LA갈비 콤보로도 즐겨보세요.',
    },
    price: { en: 'From $13.99 · combos from $19.99', ko: '$13.99부터 · 콤보 $19.99부터' },
    image: 'sig-naengmyeon',
    imageAlt: { en: 'Cold buckwheat noodles in icy broth', ko: '시원한 물냉면' },
  },
  {
    id: 'stews',
    ko: '탕 · 찌개',
    en: 'Soups & Stews',
    badge: { en: 'Sundubu, six ways', ko: '순두부만 여섯 가지' },
    tagline: { en: 'Piping hot, deeply comforting.', ko: '펄펄 끓는 뚝배기 한 그릇의 위로.' },
    desc: {
      en: 'Galbitang with tender short ribs, spicy yukgaejang and kalguksu, budae jjigae served bubbling in a clay pot — and soft tofu stew six ways, from regular to very spicy.',
      ko: '부드러운 갈비탕, 얼큰한 육개장과 칼국수, 뚝배기에 보글보글 끓여 내는 부대찌개, 그리고 보통맛부터 아주 매운맛까지 여섯 가지 순두부.',
    },
    price: { en: 'From $13.99', ko: '$13.99부터' },
    image: 'sig-stew',
    imageAlt: { en: 'Spicy Korean stew in a stone pot', ko: '뚝배기에 담긴 얼큰한 찌개' },
  },
]

/* -------------------------------------------------------------------- Menu */

export type Tag = 'popular' | 'spicy' | 'share' | 'cold' | 'new' | 'special' | 'veg'
export type Size = { label: T; price: string }
export type Choice = { label: T; options: T[] }
export type MenuItem = { ko: string; en: string; desc?: T; price: string; sizes?: Size[]; choices?: Choice[]; tags?: Tag[] }
export type Extra = { ko: string; en: string; price: string }
export type LunchTier = { price: string; items: { ko: string; en: string }[] }
export type MenuCategory = {
  id: string
  ko: string
  en: string
  note?: T
  image: ImageName
  position?: string
  items: MenuItem[]
  /** Small add-ons listed compactly under the dishes. */
  extras?: Extra[]
  /** Fixed-price groups (the lunch special) shown instead of individual dishes. */
  tiers?: LunchTier[]
}

const M: T = { en: 'Medium', ko: '보통' }
const L: T = { en: 'Large', ko: '곱빼기' }
const S3: T[] = [
  { en: 'Small', ko: '소' },
  { en: 'Medium', ko: '중' },
  { en: 'Large', ko: '대' },
]
const serves = (n: number): T => ({ en: `${n} ppl`, ko: `${n}인` })

export const SUNDUBU_FLAVORS: T[] = [
  { en: 'Yukgaejang (spicy beef)', ko: '육개장 순두부' },
  { en: 'Kimchi', ko: '김치 순두부' },
  { en: 'Pork', ko: '돼지 순두부' },
  { en: 'Mushroom', ko: '버섯 순두부' },
  { en: 'Assorted (seafood & beef)', ko: '섞어 순두부' },
  { en: 'Seafood', ko: '해물 순두부' },
]

export const MENU_NOTE: T = {
  en: 'Prices from our in-store menu (October 2026) and may change — please call to confirm. Call ahead for pickup or large groups.',
  ko: '2026년 10월 매장 메뉴판 기준 가격이며 변동될 수 있습니다. 포장 주문이나 단체 방문은 미리 전화 주세요.',
}

export const LUNCH_ID = 'lunch'

export const MENU: MenuCategory[] = [
  {
    id: 'donkatsu',
    ko: '돈까스',
    en: 'Donkatsu',
    image: 'cat-katsu',
    note: {
      en: 'The A-Hyang Special — the dish we’re best known for. Plates come with cabbage salad and macaroni.',
      ko: '애향 스페셜 — 애향을 대표하는 메뉴입니다. 양배추 샐러드와 마카로니가 함께 나갑니다.',
    },
    items: [
      { ko: '돈까스', en: 'Donkatsu', price: '$14.99', tags: ['popular'], desc: { en: 'The original crispy breaded pork cutlet, with a house-made brown sauce.', ko: '바삭하게 튀긴 오리지널 돈까스에 직접 만든 브라운 소스.' } },
      { ko: '치즈 돈까스', en: 'Cheese Donkatsu', price: '$18.99', desc: { en: 'Pork cutlet stuffed with premium mozzarella.', ko: '프리미엄 모짜렐라 치즈를 가득 채운 돈까스.' } },
      { ko: '매운 돈까스', en: 'Spicy Donkatsu', price: '$18.99', tags: ['spicy'], desc: { en: 'A fiery pork cutlet for spice lovers.', ko: '매운맛을 좋아하는 분들을 위한 화끈한 돈까스.' } },
      { ko: '멘치까스', en: 'Menchi Katsu', price: '$17.99', desc: { en: 'Juicy, crispy fried patties made with a seasoned blend of minced beef and pork.', ko: '양념한 다진 소고기와 돼지고기로 빚어 바삭하게 튀긴 멘치까스.' } },
      { ko: '왕 돈까스', en: 'King Donkatsu', price: '$24.99', tags: ['popular', 'share'], desc: { en: 'A jumbo-sized traditional pork cutlet. Regulars say it easily feeds two.', ko: '점보 사이즈 왕돈까스. 두 분이 드셔도 넉넉하다는 단골손님들의 평입니다.' } },
      { ko: '왕 치즈 돈까스', en: 'King Cheese Donkatsu', price: '$28.99', tags: ['share'], desc: { en: 'The jumbo cutlet, filled with extra cheese.', ko: '치즈를 듬뿍 채운 점보 사이즈 왕돈까스.' } },
      { ko: '돈까스 덮밥', en: 'Pork Cutlet Rice Bowl', price: '$12.99', tags: ['new'], desc: { en: 'Sliced pork cutlet with onion, mushroom and egg over rice.', ko: '양파, 버섯, 계란과 함께 밥 위에 올린 돈까스.' } },
    ],
  },
  {
    id: 'naengmyeon',
    ko: '냉면 · 콤보',
    en: 'Cold Noodles & Combos',
    image: 'cat-naengmyeon',
    note: {
      en: 'Combos: swap the mul naengmyeon for spicy bibim naengmyeon, or size up to large for $2 more.',
      ko: '콤보는 물냉면을 비빔냉면으로 바꿀 수 있고, $2 추가 시 곱빼기(라지)로 드립니다.',
    },
    items: [
      { ko: '물냉면', en: 'Mul Naengmyeon', price: '$13.99', tags: ['cold', 'popular'], sizes: [{ label: M, price: '$13.99' }, { label: L, price: '$15.99' }], desc: { en: 'Buckwheat noodles in a cold, tangy beef broth.', ko: '새콤하고 시원한 소고기 육수에 메밀면.' } },
      { ko: '비빔냉면', en: 'Bibim Naengmyeon', price: '$13.99', tags: ['cold', 'spicy'], sizes: [{ label: M, price: '$13.99' }, { label: L, price: '$15.99' }], desc: { en: 'Buckwheat noodles with a spicy-sweet chili sauce.', ko: '매콤달콤한 양념에 비벼 먹는 메밀면.' } },
      { ko: '물냉면 + 군만두 콤보', en: 'Mul Naengmyeon + Dumplings', price: '$19.99', desc: { en: 'Cold buckwheat noodles in chilled broth, with fried dumplings.', ko: '시원한 물냉면에 바삭한 군만두.' } },
      { ko: '물냉면 + 제육볶음 콤보', en: 'Mul Naengmyeon + Jaeyuk', price: '$23.99', desc: { en: 'Cold buckwheat noodles with spicy marinated pork.', ko: '시원한 물냉면에 매콤한 제육볶음.' } },
      { ko: '물냉면 + LA갈비 콤보', en: 'Mul Naengmyeon + LA Galbi', price: '$28.99', tags: ['popular'], desc: { en: 'Cold buckwheat noodles with grilled beef short ribs.', ko: '시원한 물냉면에 구운 LA갈비.' } },
      { ko: '순두부 + 제육 콤보', en: 'Sundubu + Jaeyuk', price: '$23.99', desc: { en: 'Any of our six soft tofu stews, with spicy marinated pork.', ko: '여섯 가지 순두부 중 하나에 매콤한 제육볶음.' } },
      { ko: '순두부 + 갈비 콤보', en: 'Sundubu + Galbi', price: '$26.99', desc: { en: 'Any of our six soft tofu stews, with grilled beef short ribs.', ko: '여섯 가지 순두부 중 하나에 구운 갈비.' } },
    ],
    extras: [{ ko: '냉면 추가 사리', en: 'Extra noodles', price: '$7.99' }],
  },
  {
    id: 'stews',
    ko: '탕 · 찌개',
    en: 'Soups & Stews',
    image: 'cat-stew',
    note: {
      en: 'Budae jjigae comes bubbling in a traditional clay pot. Sundubu is made regular, spicy or very spicy.',
      ko: '부대찌개는 뚝배기에 보글보글 끓여 드리고, 순두부는 보통맛·매운맛·아주 매운맛 중에 고르실 수 있습니다.',
    },
    items: [
      { ko: '김치찌개', en: 'Kimchi Jjigae', price: '$14.99', tags: ['spicy'], desc: { en: 'Spicy kimchi stew with pork and tofu.', ko: '돼지고기와 두부를 넣은 얼큰한 김치찌개.' } },
      { ko: '육개장', en: 'Yukgaejang', price: '$14.99', tags: ['spicy'], desc: { en: 'Spicy beef soup with shredded beef and scallions.', ko: '결대로 찢은 소고기와 대파를 넣은 얼큰한 육개장.' } },
      { ko: '떡만두국', en: 'Tteok Mandu Guk', price: '$14.99', desc: { en: 'Rice cake and dumpling soup in a mild beef broth.', ko: '순한 소고기 육수에 떡과 만두를 넣었습니다.' } },
      { ko: '부대찌개 뚝배기', en: 'Budae Jjigae', price: '$14.99', tags: ['popular', 'spicy'], desc: { en: 'A savory, spicy stew with ham, sausage, ramen noodles and kimchi, served bubbling in a hot clay pot.', ko: '햄, 소시지, 라면, 김치를 넣고 뚝배기에 보글보글 끓여 내는 부대찌개.' } },
      { ko: '육개장 칼국수', en: 'Yukgaejang Kalguksu', price: '$16.99', tags: ['spicy'], desc: { en: 'Noodles in a deep, spicy beef broth with shredded beef and crisp vegetables.', ko: '진하고 얼큰한 육개장 국물에 칼국수와 소고기, 아삭한 채소.' } },
      { ko: '해물 칼국수', en: 'Seafood Kalguksu', price: '$17.99', desc: { en: 'Fresh clams, shrimp and vegetables in a savory seafood broth with hearty knife-cut noodles.', ko: '조개, 새우, 채소로 우려낸 시원한 해물 국물에 쫄깃한 칼국수.' } },
      { ko: '육개장 만두국', en: 'Yukgaejang Mandu Guk', price: '$16.99', tags: ['spicy'], desc: { en: 'Rich, spicy beef broth with shredded beef, vegetables and dumplings.', ko: '진하고 얼큰한 육개장 국물에 소고기, 채소, 만두.' } },
      { ko: '갈비탕', en: 'Galbitang', price: '$16.99', desc: { en: 'Tender beef short ribs in a savory, clear beef broth.', ko: '부드러운 소갈비를 맑고 깊은 국물에 담았습니다.' } },
      { ko: '갈비탕 만두국', en: 'Galbitang Mandu Guk', price: '$19.99', desc: { en: 'Tender short ribs and dumplings in a deep, savory beef broth.', ko: '부드러운 갈비와 만두를 깊은 소고기 국물에.' } },
      {
        ko: '순두부찌개',
        en: 'Sundubu (Soft Tofu Stew)',
        price: '$13.99',
        tags: ['popular'],
        desc: { en: 'Silky soft tofu stew — pick a flavor and how spicy you like it.', ko: '부드러운 순두부찌개 — 종류와 맵기를 골라 주세요.' },
        choices: [
          { label: { en: 'Flavor', ko: '종류' }, options: SUNDUBU_FLAVORS },
          { label: { en: 'Spice', ko: '맵기' }, options: [{ en: 'Regular', ko: '보통맛' }, { en: 'Spicy', ko: '매운맛' }, { en: 'Very spicy', ko: '아주 매운맛' }] },
        ],
      },
    ],
  },
  {
    id: 'bibimbap',
    ko: '비빔밥',
    en: 'Bibimbap',
    image: 'cat-bibimbap',
    note: {
      en: 'Dolsot bowls come sizzling in a hot stone pot, with crispy rice at the bottom.',
      ko: '돌솥 비빔밥은 뜨거운 돌솥에 담겨 나와 바닥에 바삭한 누룽지가 생깁니다.',
    },
    items: [
      { ko: '비빔밥', en: 'Bibimbap', price: '$13.99', desc: { en: 'Rice bowl topped with assorted vegetables and an egg.', ko: '갖은 나물과 계란을 올린 비빔밥.' } },
      { ko: '돌솥 비빔밥', en: 'Dolsot Bibimbap', price: '$14.99', desc: { en: 'Bibimbap in a hot stone bowl with crispy rice.', ko: '뜨거운 돌솥에 담아 누룽지까지 바삭한 비빔밥.' } },
      { ko: '제육 돌솥 비빔밥', en: 'Jaeyuk Dolsot Bibimbap', price: '$17.99', tags: ['spicy'], desc: { en: 'Spicy pork with vegetables in a hot stone bowl.', ko: '매콤한 제육과 채소를 올린 돌솥 비빔밥.' } },
      { ko: '불고기 돌솥 비빔밥', en: 'Bulgogi Dolsot Bibimbap', price: '$19.99', desc: { en: 'Marinated beef with vegetables in a hot stone bowl.', ko: '양념 불고기와 채소를 올린 돌솥 비빔밥.' } },
      { ko: '오징어 돌솥 비빔밥', en: 'Squid Dolsot Bibimbap', price: '$18.99', tags: ['spicy'], desc: { en: 'Spicy squid with vegetables in a hot stone bowl.', ko: '매콤한 오징어와 채소를 올린 돌솥 비빔밥.' } },
      { ko: '낙지 돌솥 비빔밥', en: 'Octopus Dolsot Bibimbap', price: '$19.99', tags: ['spicy'], desc: { en: 'Spicy octopus with vegetables in a hot stone bowl.', ko: '매콤한 낙지와 채소를 올린 돌솥 비빔밥.' } },
      { ko: '갈비 돌솥 비빔밥', en: 'Galbi Dolsot Bibimbap', price: '$25.99', desc: { en: 'Marinated short ribs with vegetables in a hot stone bowl.', ko: '양념 갈비와 채소를 올린 돌솥 비빔밥.' } },
    ],
  },
  {
    id: 'grill',
    ko: '고기 · 전골',
    en: 'Meat & Hot Pot',
    image: 'cat-grill',
    note: {
      en: 'Budae jeongol and spicy squid are A-Hyang Specials, sized to share.',
      ko: '부대전골과 오징어 볶음은 함께 나눠 먹기 좋은 애향 스페셜입니다.',
    },
    items: [
      { ko: '불고기', en: 'Bulgogi', price: '$19.99', desc: { en: 'Thinly sliced ribeye in a sweet and savory soy marinade, stir-fried with vegetables.', ko: '달콤짭짤한 간장 양념에 재운 얇은 소고기를 채소와 함께 볶았습니다.' } },
      { ko: 'LA 갈비', en: 'LA Galbi', price: '$27.99', tags: ['popular'], desc: { en: 'Tender beef short ribs marinated in a signature sweet soy sauce.', ko: '애향만의 달콤한 간장 양념에 재운 부드러운 소갈비.' } },
      { ko: '제육볶음', en: 'Jaeyuk Bokkeum (Spicy Pork)', price: '$16.99', tags: ['spicy'], sizes: [{ label: serves(1), price: '$16.99' }, { label: serves(2), price: '$30.99' }, { label: serves(3), price: '$45.99' }], desc: { en: 'Spicy marinated pork stir-fried with fresh vegetables in a zesty gochujang sauce.', ko: '고추장 양념에 재운 돼지고기를 신선한 채소와 함께 볶았습니다.' } },
      { ko: '부대전골', en: 'Budae Jeongol (Army Hot Pot)', price: '$34.99', tags: ['special', 'spicy', 'share'], sizes: [{ label: S3[0], price: '$34.99' }, { label: S3[1], price: '$48.99' }, { label: S3[2], price: '$61.99' }], desc: { en: 'Sausage, Spam, tofu, noodles and vegetables in a spicy broth.', ko: '소시지, 스팸, 두부, 면과 채소를 얼큰한 국물에 끓인 부대전골.' } },
      { ko: '오징어 볶음', en: 'Ojingeo Bokkeum (Spicy Squid)', price: '$18.99', tags: ['special', 'spicy'], sizes: [{ label: S3[0], price: '$18.99' }, { label: S3[1], price: '$32.99' }], desc: { en: 'Tender squid stir-fried with vegetables in a bold, spicy sauce.', ko: '부드러운 오징어를 채소와 함께 매콤하게 볶았습니다.' } },
    ],
  },
  {
    id: 'new',
    ko: '신메뉴',
    en: 'New on the Menu',
    image: 'g-6',
    note: {
      en: 'Ramen bowls, fried rice and sandwiches — all new on our menu.',
      ko: '새로 선보인 라면, 볶음밥, 샌드위치입니다.',
    },
    items: [
      { ko: '부대 라면', en: 'Budae Ramen', price: '$13.99', tags: ['spicy'], desc: { en: 'Spicy army-stew-style ramen with kimchi, sausage, tofu and assorted toppings.', ko: '김치, 소시지, 두부 등을 넣은 얼큰한 부대찌개 스타일 라면.' } },
      { ko: '순두부 라면', en: 'Sundubu Ramen', price: '$13.99', desc: { en: 'Soft tofu stew served with ramen noodles.', ko: '순두부찌개에 라면을 넣었습니다.' } },
      { ko: '불고기 라면', en: 'Bulgogi Ramen', price: '$14.99', desc: { en: 'Savory ramen topped with stir-fried beef and vegetables.', ko: '볶은 불고기와 채소를 올린 라면.' } },
      { ko: '돈까스 라면', en: 'Donkatsu Ramen', price: '$13.99', desc: { en: 'Ramen topped with a crispy pork cutlet and vegetables.', ko: '바삭한 돈까스와 채소를 올린 라면.' } },
      { ko: '짬뽕밥', en: 'Jjamppong Rice', price: '$14.99', tags: ['spicy'], desc: { en: 'Spicy seafood soup served with a side of steamed rice.', ko: '얼큰한 해물 짬뽕 국물에 공기밥.' } },
      { ko: '스팸 계란밥', en: 'Spam Egg Fried Rice', price: '$9.99', desc: { en: 'Savory fried rice with Spam, eggs and vegetables.', ko: '스팸, 계란, 채소를 넣고 볶은 볶음밥.' } },
      { ko: '매운 버섯 볶음밥', en: 'Spicy Mushroom Fried Rice', price: '$11.99', tags: ['spicy', 'veg'], desc: { en: 'Fried rice with mushrooms, egg and green onion, tossed in a spicy sauce.', ko: '버섯, 계란, 파를 넣고 매콤한 소스에 볶은 볶음밥.' } },
      { ko: '돈까스 필리', en: 'Pork Cutlet Philly', price: '$11.99', desc: { en: 'Crispy pork cutlet, grilled onions and peppers with mozzarella on a sandwich.', ko: '바삭한 돈까스에 구운 양파, 피망, 모짜렐라 치즈를 넣은 샌드위치.' } },
      { ko: '불고기 필리', en: 'Bulgogi Philly', price: '$14.99', desc: { en: 'Marinated bulgogi beef, grilled onions and peppers with mozzarella on a sandwich.', ko: '불고기에 구운 양파, 피망, 모짜렐라 치즈를 넣은 샌드위치.' } },
      { ko: '치포틀레 파니니', en: 'Chipotle Panini', price: '$13.99', desc: { en: 'Grilled chicken with mozzarella and chipotle sauce on toasted panini bread.', ko: '구운 치킨과 모짜렐라, 치포틀레 소스를 넣어 구운 파니니.' } },
    ],
  },
  {
    id: 'sides',
    ko: '전채 · 사이드',
    en: 'Appetizers & Sides',
    image: 'cat-street',
    note: { en: 'Starters to share, plus extra sides and sauces.', ko: '함께 나눠 먹기 좋은 전채 요리와 추가 사이드.' },
    items: [
      { ko: '군만두', en: 'Gun-Mandu (Fried Dumplings)', price: '$8.99', sizes: [{ label: { en: '4 pcs', ko: '4개' }, price: '$8.99' }, { label: { en: '8 pcs', ko: '8개' }, price: '$14.99' }], desc: { en: 'Crispy, golden-fried Korean dumplings filled with seasoned meat and vegetables.', ko: '고기와 채소 소를 넣어 노릇하게 튀긴 군만두.' } },
      { ko: '소떡소떡', en: 'Sotteok Sotteok', price: '$9.99', desc: { en: 'Sausage and rice cake skewers, grilled and glazed with a sweet and spicy sauce — a Korean street-food favorite.', ko: '소시지와 떡을 꼬치에 꿰어 굽고 달콤매콤한 소스를 바른 길거리 간식.' } },
      { ko: '길거리 오믈렛', en: 'Street Omelette', price: '$7.99', desc: { en: 'A hearty Korean street-style omelette folded with diced ham, cabbage, carrot and onion, with mozzarella.', ko: '햄, 양배추, 당근, 양파를 넣고 모짜렐라 치즈와 함께 부친 길거리 오믈렛.' } },
      { ko: '돈까스 오믈렛', en: 'Pork Cutlet Omelette', price: '$9.99', desc: { en: 'An omelette with green onion, onion, cabbage and mozzarella, served with a crispy pork cutlet.', ko: '파, 양파, 양배추, 모짜렐라 치즈를 넣은 오믈렛에 바삭한 돈까스.' } },
    ],
    extras: [
      { ko: '라면 사리', en: 'Ramen noodles', price: '$2.00' },
      { ko: '공기밥', en: 'Steamed rice', price: '$1.50' },
      { ko: '돈까스 양배추 샐러드', en: 'Cabbage salad', price: '$1.00' },
      { ko: '마카로니', en: 'Macaroni salad', price: '$1.50' },
      { ko: '돈까스 소스', en: 'Donkatsu sauce', price: '$0.50' },
      { ko: '매운 돈까스 소스', en: 'Spicy donkatsu sauce', price: '$2.00' },
      { ko: '소다', en: 'Soft drink', price: '$1.50' },
    ],
  },
  {
    id: LUNCH_ID,
    ko: '점심 특선',
    en: 'Lunch Special',
    image: 'g-1',
    note: { en: 'Tuesday to Friday, 11 AM – 3 PM.', ko: '화요일–금요일, 오전 11시 – 오후 3시.' },
    items: [],
    tiers: [
      {
        price: '$12.99',
        items: [
          { ko: '물냉면', en: 'Mul Naengmyeon' },
          { ko: '비빔냉면', en: 'Bibim Naengmyeon' },
          { ko: '비빔밥', en: 'Bibimbap' },
          { ko: '김치찌개', en: 'Kimchi Jjigae' },
          { ko: '육개장', en: 'Yukgaejang' },
          { ko: '떡만두국', en: 'Tteok Mandu Guk' },
          { ko: '순두부 (택1)', en: 'Sundubu (any flavor)' },
        ],
      },
      {
        price: '$13.99',
        items: [
          { ko: '부대찌개 뚝배기', en: 'Budae Jjigae' },
          { ko: '돌솥 비빔밥', en: 'Dolsot Bibimbap' },
          { ko: '돈까스', en: 'Donkatsu' },
        ],
      },
      {
        price: '$15.99',
        items: [
          { ko: '갈비탕', en: 'Galbitang' },
          { ko: '육개장 만두국', en: 'Yukgaejang Mandu Guk' },
          { ko: '제육볶음', en: 'Jaeyuk Bokkeum' },
          { ko: '제육 돌솥 비빔밥', en: 'Jaeyuk Dolsot Bibimbap' },
        ],
      },
      { price: '$23.99', items: [{ ko: '갈비 돌솥 비빔밥', en: 'Galbi Dolsot Bibimbap' }] },
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
  { lang: 'en', text: 'The mul naengmyun is delicious and so refreshing in the Georgia heat. Quiet and cute family business.', author: 'Kat S.', source: 'Yelp', rating: 5, date: '2024' },
  { lang: 'en', text: 'The best tonkatsu in the area. The meat is not too thin and not too thick and it is flavored all the way through. The Mac salad is really good and complements the crispy tonkatsu.', author: 'Jessica S.', source: 'Google', rating: 5, date: '2022' },
  { lang: 'en', text: 'Their kimchi is the perfect fermented sour that makes it really flavorful as well, and the other banchan and sides were delicious.', author: 'Leaf W.', source: 'Google', rating: 5, date: '2026' },
  { lang: 'en', text: 'Everyone here is SO nice, so friendly, and so accommodating. It really felt like I was eating at a friend’s house.', author: 'Elizabeth C.', source: 'Yelp', rating: 4, date: '2023' },
  { lang: 'ko', text: '다른 한식집 돈까스는 그냥 마지못해 먹는데 여기는 한국에 있어도 가끔 생각날 것 같은 맛. 연한 황토색 소스 클래식함.', translation: 'At other Korean restaurants I eat the donkatsu reluctantly — this one I’d crave even back in Korea. A classic, light-brown sauce.', author: '김나무', source: 'Google', rating: 5, date: '2022' },
  { lang: 'en', text: 'The stone bowl soups are insanely delicious and arrive at your table hot and bubbling.', author: 'Jess B.', source: 'Yelp', rating: 5, date: '2024' },
  { lang: 'en', text: 'You get an insanely large portion of food for the price. This place deserves a 5/5 for that alone.', author: 'Mohd H.', source: 'Google', rating: 5, date: '2024' },
  { lang: 'en', text: 'A-Hyang is a go-to spot for tonkatsu! The service is always great, the interior is clean, and the food is absolutely delicious.', author: 'Trinity N.', source: 'Yelp', rating: 5, date: '2025' },
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
