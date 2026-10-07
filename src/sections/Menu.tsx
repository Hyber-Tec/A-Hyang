import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'
import { MENU, MENU_NOTE, type MenuCategory, type MenuItem, type Tag } from '../data/content'
import { RESTAURANT } from '../data/restaurant'
import { useLang, useT, type T } from '../lib/i18n'
import { useScrollTo } from '../lib/scroll'
import { Img } from '../components/Img'
import { EASE_OUT, MaskText, Reveal } from '../components/motion'
import { SectionLabel } from '../components/SectionLabel'
import { ArrowRight, FlameIcon, PhoneIcon, StarIcon, UsersIcon } from '../components/icons'

const TAGS: Record<Tag, { label: T; className: string; icon?: 'flame' | 'star' | 'users' }> = {
  popular: { label: { en: 'Popular', ko: '인기' }, className: 'bg-ink text-paper', icon: 'star' },
  signature: { label: { en: 'Signature', ko: '대표' }, className: 'bg-gold text-ink', icon: 'star' },
  spicy: { label: { en: 'Spicy', ko: '매운맛' }, className: 'bg-chili/12 text-chili', icon: 'flame' },
  share: { label: { en: 'For sharing', ko: '여럿이 함께' }, className: 'bg-leaf-deep/12 text-leaf-deep', icon: 'users' },
  cold: { label: { en: 'Served cold', ko: '시원하게' }, className: 'bg-sky-700/10 text-sky-800' },
}

export function Menu() {
  const t = useT()
  const { lang } = useLang()
  const scrollTo = useScrollTo()
  const [activeId, setActiveId] = useState(MENU[0].id)
  const active = MENU.find((c) => c.id === activeId) ?? MENU[0]
  const panelRef = useRef<HTMLDivElement>(null)

  const select = (id: string) => {
    setActiveId(id)
    // If the reader is already deep in a long list, bring the new category's top into view.
    const top = panelRef.current?.getBoundingClientRect().top ?? 0
    if (top < 0) scrollTo(window.innerWidth >= 1024 ? '#menu-strips' : '#menu-tabs')
  }

  return (
    <section id="menu" className="relative bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-36">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel index="03" tone="light">{t({ en: 'The menu', ko: '메뉴' })}</SectionLabel>
            <MaskText
              as="h2"
              className={`mt-6 ${lang === 'ko' ? 'font-batang text-[clamp(2.6rem,6.5vw,5.6rem)] leading-[1.1] font-bold' : 'font-display text-[clamp(2.8rem,7.5vw,7rem)] leading-[0.92] font-[400]'}`}
              lines={
                lang === 'ko'
                  ? ['오늘은', <>뭘 <span className="text-gold-deep">먹을까요?</span></>]
                  : ['What are you', <span className="italic text-gold-deep">craving today?</span>]
              }
            />
          </div>
          <Reveal delay={0.15} className="md:col-span-5">
            <p className="max-w-md text-[1.05rem] leading-relaxed text-ink/70">{t(MENU_NOTE)}</p>
            <a href={RESTAURANT.phoneHref} className="mt-5 inline-flex items-center gap-2 font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              <PhoneIcon className="h-4 w-4" />
              {t({ en: 'Call for pickup', ko: '포장 주문 전화' })} · {RESTAURANT.phone}
            </a>
          </Reveal>
        </div>

        {/* Desktop: expanding photo strips double as the category picker */}
        <Reveal className="mt-16 hidden lg:block" y={40}>
          <div id="menu-strips" role="tablist" aria-label={t({ en: 'Menu categories', ko: '메뉴 분류' })} className="flex h-[min(56vh,500px)] gap-2.5">
            {MENU.map((c, i) => (
              <Strip key={c.id} c={c} index={i} active={c.id === activeId} onSelect={() => select(c.id)} />
            ))}
          </div>
        </Reveal>

        {/* Phones & tablets: sticky pill tabs */}
        <div id="menu-tabs" className="sticky top-0 z-20 -mx-5 mt-12 bg-paper/90 px-5 py-3 backdrop-blur-md md:-mx-8 md:px-8 lg:hidden">
          <div role="tablist" aria-label={t({ en: 'Menu categories', ko: '메뉴 분류' })} className="no-scrollbar flex gap-2 overflow-x-auto" data-lenis-prevent>
            {MENU.map((c) => {
              const on = c.id === activeId
              return (
                <button
                  key={c.id}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="menu-panel"
                  onClick={() => select(c.id)}
                  className={`relative shrink-0 rounded-full border px-5 py-3 text-[1rem] font-semibold transition-colors duration-300 ${
                    on ? 'border-ink text-paper' : 'border-ink/15 text-ink/75 hover:border-ink/40 hover:text-ink'
                  }`}
                >
                  {on && <motion.span layoutId="menu-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="font-batang">{c.ko}</span>
                    {lang === 'en' && <span className={on ? 'text-paper/70' : 'text-ink/45'}>{c.en}</span>}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Items */}
        <div ref={panelRef} id="menu-panel" role="tabpanel" className="mt-6 scroll-mt-24 lg:mt-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              <div className="relative mb-6 overflow-hidden rounded-[22px] lg:hidden">
                <Img name={active.image} alt={t({ en: active.en, ko: active.ko })} sizes="100vw" className="aspect-[16/9]" position={active.position} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-5 font-batang text-3xl font-bold text-paper">{active.ko}</p>
              </div>

              <div className="mb-2 hidden items-baseline justify-between border-b border-ink/15 pb-5 lg:flex">
                <h3 className="flex items-baseline gap-4">
                  <span className="font-batang text-4xl font-bold">{active.ko}</span>
                  <span className="font-display text-2xl italic text-ink/55">{active.en}</span>
                </h3>
                {active.note && <p className="max-w-md text-right text-[0.95rem] text-ink/60">{t(active.note)}</p>}
              </div>

              <ul className="grid gap-x-14 lg:grid-cols-2">
                {active.items.map((item, i) => (
                  <motion.li
                    key={item.ko + item.en}
                    className="border-b border-ink/10"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05 + i * 0.035, ease: EASE_OUT }}
                  >
                    <MenuRow item={item} />
                  </motion.li>
                ))}
              </ul>
              {active.note && <p className="mt-5 text-[0.95rem] leading-relaxed text-ink/65 lg:hidden">{t(active.note)}</p>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Strip({ c, index, active, onSelect }: { c: MenuCategory; index: number; active: boolean; onSelect: () => void }) {
  const t = useT()
  const from = Math.min(...c.items.map((i) => parseFloat(i.price.replace(/[^0-9.]/g, '')) || Infinity))
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls="menu-panel"
      onClick={onSelect}
      className={`group relative h-full min-w-0 overflow-hidden rounded-[22px] text-left transition-[flex-grow] duration-[900ms] ease-[var(--ease-out-expo)] ${active ? 'grow-[5]' : 'grow hover:grow-[1.35]'}`}
      style={{ flexBasis: 0 }}
    >
      <Img
        name={c.image}
        alt=""
        sizes="(min-width: 1024px) 50vw, 1px"
        className="absolute inset-0 h-full w-full"
        imgClassName={`transition-[filter,transform] duration-[900ms] ease-[var(--ease-out-expo)] ${active ? 'scale-100 grayscale-0' : 'scale-110 grayscale group-hover:grayscale-[0.4]'}`}
        position={c.position}
      />
      <div className={`absolute inset-0 transition-colors duration-700 ${active ? 'bg-gradient-to-t from-black/75 via-black/10 to-transparent' : 'bg-ink/45 group-hover:bg-ink/30'}`} />

      {/* Collapsed: vertical Korean label */}
      <span
        className={`vertical-rl absolute left-1/2 top-7 -translate-x-1/2 font-batang text-[1.6rem] font-bold tracking-[0.2em] text-paper transition-opacity duration-500 ${active ? 'opacity-0' : 'opacity-100'}`}
      >
        {c.ko}
      </span>
      <span className={`absolute bottom-6 left-1/2 -translate-x-1/2 font-display text-sm text-paper/70 tabular-nums transition-opacity duration-500 ${active ? 'opacity-0' : 'opacity-100'}`}>
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Expanded: title block */}
      <span
        className={`absolute inset-x-8 bottom-8 flex items-end justify-between gap-6 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] ${
          active ? 'translate-y-0 opacity-100 delay-200' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <span>
          <span className="block font-batang text-[2.6rem] leading-none font-bold whitespace-nowrap text-paper">{c.ko}</span>
          <span className="mt-2 block font-display text-xl whitespace-nowrap italic text-paper/80">{c.en}</span>
        </span>
        <span className="flex shrink-0 items-center gap-2 rounded-full bg-paper/90 px-4 py-2 text-sm font-semibold whitespace-nowrap text-ink">
          {Number.isFinite(from) ? t({ en: `${c.items.length} dishes · from $${from}`, ko: `${c.items.length}가지 · $${from}부터` }) : t({ en: `${c.items.length} dishes`, ko: `${c.items.length}가지` })}
          <ArrowRight className="h-4 w-4" />
        </span>
      </span>
    </button>
  )
}

function MenuRow({ item }: { item: MenuItem }) {
  const t = useT()
  const { lang } = useLang()
  const primary = lang === 'ko' ? item.ko : item.en
  const secondary = lang === 'ko' ? item.en : item.ko
  return (
    <div className="py-5 md:py-6">
      <div className="flex items-baseline gap-3">
        <h4 className={`text-[1.3rem] leading-snug font-bold md:text-[1.4rem] ${lang === 'ko' ? 'font-batang' : 'font-display font-[560]'}`}>{primary}</h4>
        <span className="mb-1.5 h-px min-w-6 flex-1 self-end border-b border-dotted border-ink/30" aria-hidden="true" />
        <span className="font-display text-[1.3rem] font-[560] whitespace-nowrap tabular-nums md:text-[1.4rem]">
          {item.sizes && <span className="mr-1.5 font-sans text-[0.8rem] font-semibold text-ink/50">{t({ en: 'from', ko: '부터' })}</span>}
          {item.price}
        </span>
      </div>
      <p className={`mt-0.5 text-[0.98rem] text-ink/55 ${lang === 'ko' ? 'font-display italic' : 'font-batang'}`}>{secondary}</p>
      {item.desc && <p className="mt-2 max-w-xl text-[1rem] leading-relaxed text-ink/75">{t(item.desc)}</p>}
      {item.sizes && (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label={t({ en: 'Sizes', ko: '사이즈' })}>
          {item.sizes.map((sz) => (
            <li key={sz.price} className="inline-flex items-baseline gap-1.5 rounded-lg border border-ink/15 bg-cream px-3 py-1.5 text-[0.92rem]">
              <span className="text-ink/60">{t(sz.label)}</span>
              <span className="font-semibold tabular-nums">{sz.price}</span>
            </li>
          ))}
        </ul>
      )}
      {item.tags && item.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((tag) => {
            const tg = TAGS[tag]
            return (
              <span key={tag} className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.78rem] font-semibold ${tg.className}`}>
                {tg.icon === 'flame' && <FlameIcon className="h-3.5 w-3.5" />}
                {tg.icon === 'star' && <StarIcon className="h-3.5 w-3.5" />}
                {tg.icon === 'users' && <UsersIcon className="h-3.5 w-3.5" />}
                {t(tg.label)}
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}
