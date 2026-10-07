import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { RESTAURANT } from '../data/restaurant'
import { DAY_NAMES, formatTime } from '../lib/hours'
import { useLang, useT, type Lang } from '../lib/i18n'
import { LogoMark } from '../components/Logo'
import { Magnetic, MaskText, Reveal } from '../components/motion'
import { ArrowUpRight, BagIcon, InstagramIcon, NavigationIcon, PhoneIcon } from '../components/icons'

/** Collapses consecutive days with identical hours: "Mon–Wed  11 AM – 10 PM". */
function groupedHours(lang: Lang) {
  const order = [1, 2, 3, 4, 5, 6, 0]
  const key = (d: number) => {
    const h = RESTAURANT.hours[d]
    return h ? `${h.open}-${h.close}` : 'closed'
  }
  const groups: { days: number[]; key: string }[] = []
  for (const d of order) {
    const last = groups[groups.length - 1]
    if (last && last.key === key(d)) last.days.push(d)
    else groups.push({ days: [d], key: key(d) })
  }
  const short = (d: number) => (lang === 'ko' ? DAY_NAMES.ko[d].slice(0, 1) : DAY_NAMES.en[d].slice(0, 3))
  return groups.map((g) => {
    const first = g.days[0]
    const last = g.days[g.days.length - 1]
    const days = g.days.length === 1 ? short(first) : `${short(first)}–${short(last)}`
    const h = RESTAURANT.hours[first]
    return { days, time: h ? `${formatTime(h.open, lang)} – ${formatTime(h.close, lang)}` : lang === 'ko' ? '휴무' : 'Closed' }
  })
}

export function Footer() {
  const t = useT()
  const { lang } = useLang()
  const markRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: markRef, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['45%', '0%'])

  return (
    <footer className="relative overflow-hidden bg-ink pt-24 text-paper md:pt-36">
      {/* Closing call to action */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex flex-col items-start gap-10 border-b border-white/10 pb-20 md:flex-row md:items-end md:justify-between">
          <MaskText
            as="h2"
            className="font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.92] font-[380]"
            lines={
              lang === 'ko'
                ? ['출출하신가요?', <span className="text-gold">애향으로 오세요.</span>]
                : ['Hungry yet?', <span className="italic text-gold">Come on in.</span>]
            }
          />
          <Reveal delay={0.25} className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Magnetic>
              <a
                href={RESTAURANT.phoneHref}
                className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-5 text-lg font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95"
              >
                <PhoneIcon className="h-5 w-5" />
                {RESTAURANT.phone}
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={RESTAURANT.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-5 text-lg font-semibold transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              >
                <NavigationIcon className="h-5 w-5" />
                {t({ en: 'Directions', ko: '길찾기' })}
              </a>
            </Magnetic>
          </Reveal>
        </div>

        {/* Details */}
        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="eyebrow text-muted">{t({ en: 'A-Hyang', ko: '애향' })}</p>
            <p className="mt-4 max-w-xs leading-relaxed text-paper/80">
              {t({
                en: 'A family-run Korean kitchen in Duluth, Georgia since 2012 — giant donkatsu, bubbling hot pots and ice-cold naengmyeon.',
                ko: '2012년부터 조지아 둘루스를 지켜온 가족 한식당. 왕돈까스, 보글보글 전골, 시원한 냉면.',
              })}
            </p>
          </div>
          <div>
            <p className="eyebrow text-muted">{t({ en: 'Find us', ko: '주소' })}</p>
            <a href={RESTAURANT.mapsUrl} target="_blank" rel="noreferrer" className="group mt-4 block leading-relaxed text-paper/90 hover:text-paper">
              {RESTAURANT.street}
              <br />
              {RESTAURANT.city}
              <br />
              <span className="text-muted">{t(RESTAURANT.plaza)}</span>
              <ArrowUpRight className="ml-1 inline h-4 w-4 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
          <div>
            <p className="eyebrow text-muted">{t({ en: 'Hours', ko: '영업시간' })}</p>
            <dl className="mt-4 space-y-1.5">
              {groupedHours(lang).map((g) => (
                <div key={g.days} className="flex justify-between gap-6 text-paper/90">
                  <dt>{g.days}</dt>
                  <dd className="tabular-nums">{g.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="eyebrow text-muted">{t({ en: 'Contact', ko: '연락처' })}</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href={RESTAURANT.phoneHref} className="inline-flex items-center gap-2 text-paper/90 hover:text-gold">
                  <PhoneIcon className="h-4 w-4" />
                  {RESTAURANT.phone}
                </a>
              </li>
              <li>
                <a href={RESTAURANT.orderUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-paper/90 hover:text-gold">
                  <BagIcon className="h-4 w-4" />
                  {t({ en: 'Order online (DoorDash)', ko: '온라인 주문 (DoorDash)' })}
                </a>
              </li>
              {RESTAURANT.instagramUrl && (
                <li>
                  <a href={RESTAURANT.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-paper/90 hover:text-gold">
                    <InstagramIcon className="h-4 w-4" />@{RESTAURANT.instagramHandle}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div ref={markRef} className="relative mx-auto max-w-[1600px] overflow-hidden px-3 md:px-8" aria-hidden="true">
        <motion.div style={{ y }}>
          <LogoMark className="mx-auto block h-auto w-full max-w-[1100px]" color="var(--color-leaf)" />
        </motion.div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 py-6 pb-28 text-[0.85rem] text-muted md:flex-row md:justify-between md:px-8 md:pb-6">
          <p>© {new Date().getFullYear()} 애향 A-Hyang · Duluth, GA</p>
          <p>{t({ en: 'Menu, prices and hours may change — please call to confirm.', ko: '메뉴·가격·영업시간은 변동될 수 있습니다. 방문 전 전화로 확인해 주세요.' })}</p>
        </div>
      </div>
    </footer>
  )
}
