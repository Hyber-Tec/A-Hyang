import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { RESTAURANT } from '../data/restaurant'
import { RATINGS } from '../data/content'
import { useLang, useT } from '../lib/i18n'
import { useScrollTo } from '../lib/scroll'
import { useIntroDelay } from '../lib/intro'
import { Img } from '../components/Img'
import { LogoMark } from '../components/Logo'
import { OpenBadge } from '../components/OpenBadge'
import { CircularText, EASE_OUT, Magnetic, MaskText } from '../components/motion'
import { ArrowDown, BagIcon, BookIcon, PhoneIcon, StarIcon } from '../components/icons'

export function Hero() {
  const t = useT()
  const { lang } = useLang()
  const scrollTo = useScrollTo()
  const delay = useIntroDelay()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const shade = useTransform(scrollYProgress, [0, 1], [0, 0.65])

  const fade = (d: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay: delay + d, ease: EASE_OUT },
  })

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink" aria-label={t({ en: 'Welcome', ko: '소개' })}>
      {/* Photo */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 will-change-transform">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.22, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.6, delay: Math.max(0, delay - 0.6), ease: EASE_OUT }}
        >
          <Img
            name="hero"
            priority
            sizes="100vw"
            alt={t({ en: 'A golden, freshly fried pork cutlet', ko: '갓 튀겨낸 황금빛 돈까스' })}
            className="h-full w-full"
            position="62% 50%"
          />
        </motion.div>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--color-ink)_2%,rgba(18,16,14,0.55)_38%,rgba(18,16,14,0.15)_70%,rgba(18,16,14,0.45)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(18,16,14,0.78),rgba(18,16,14,0.15)_55%,transparent)]" />
      <motion.div style={{ opacity: shade }} className="pointer-events-none absolute inset-0 bg-ink" />

      {/* Seal badge */}
      <motion.div
        className="absolute right-[6%] top-[19%] hidden md:block"
        initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.4, delay: delay + 0.9, ease: EASE_OUT }}
      >
        <CircularText text="Korean comfort food • Duluth, Georgia • " className="h-36 w-36 text-paper/85 lg:h-40 lg:w-40">
          <LogoMark className="w-14 drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] lg:w-16" color="var(--color-leaf)" />
        </CircularText>
      </motion.div>

      {/* Vertical Korean accent */}
      <motion.p
        {...fade(1.1)}
        aria-hidden="true"
        className="vertical-rl absolute right-6 bottom-40 hidden font-batang text-[0.95rem] tracking-[0.18em] text-paper/55 lg:block"
      >
        돈까스 · 전골 · 냉면
      </motion.p>

      {/* Copy */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-8 pt-28 md:px-8 md:pb-12"
      >
        <motion.p {...fade(0.15)} className="eyebrow mb-6 flex items-center gap-3 text-paper/80">
          <span className="h-px w-8 bg-leaf" />
          {t({ en: 'Korean kitchen · Duluth, GA · Since 2012', ko: '2012년부터 · 조지아 둘루스 한식당' })}
        </motion.p>

        <MaskText
          key={lang}
          immediate
          delay={delay + 0.2}
          stagger={0.12}
          as="h1"
          className={`max-w-[14ch] text-paper ${
            lang === 'ko'
              ? 'font-batang text-[clamp(2.9rem,8.4vw,8rem)] leading-[1.08] font-bold'
              : 'font-display text-[clamp(3rem,10.2vw,10.5rem)] leading-[0.9] font-[380]'
          }`}
          lines={
            lang === 'ko'
              ? ['겉은 바삭하게,', <>속은 <span className="text-gold">따뜻하게.</span></>]
              : ['Crispy outside.', <><span className="italic text-gold">Warm</span> inside.</>]
          }
        />

        <motion.p {...fade(0.55)} className="mt-7 max-w-xl text-[1.1rem] leading-relaxed text-paper/85 md:text-[1.25rem]">
          {t({
            en: 'Giant donkatsu fried the moment you order, bubbling hot pots and ice-cold naengmyeon — a family-run Korean kitchen in Nukoa Plaza.',
            ko: '주문 즉시 튀겨내는 왕돈까스, 보글보글 전골, 살얼음 동동 냉면. 뉴코아 플라자에서 2012년부터 정성껏 차려온 가족 한식당입니다.',
          })}
        </motion.p>

        <motion.div {...fade(0.7)} className="mt-9 flex flex-wrap items-center gap-3">
          <Magnetic>
            <button
              type="button"
              onClick={() => scrollTo('#menu')}
              className="inline-flex items-center gap-2.5 rounded-full bg-gold px-7 py-4 text-[1.05rem] font-semibold text-ink shadow-[0_10px_30px_-10px_rgba(232,169,74,0.7)] transition-transform hover:scale-[1.03] active:scale-95"
            >
              <BookIcon className="h-5 w-5" />
              {t({ en: 'See the menu', ko: '메뉴 보기' })}
            </button>
          </Magnetic>
          <Magnetic>
            <a
              href={RESTAURANT.orderUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-black/25 px-7 py-4 text-[1.05rem] font-semibold text-paper backdrop-blur-md transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            >
              <BagIcon className="h-5 w-5" />
              {t({ en: 'Order online', ko: '온라인 주문' })}
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={RESTAURANT.phoneHref}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-black/25 px-7 py-4 text-[1.05rem] font-semibold text-paper backdrop-blur-md transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            >
              <PhoneIcon className="h-5 w-5" />
              {t({ en: 'Call', ko: '전화' })}
            </a>
          </Magnetic>
        </motion.div>

        <motion.div {...fade(0.85)} className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <OpenBadge />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[0.9rem] font-medium text-paper backdrop-blur-md">
              <StarIcon className="h-4 w-4 text-gold" />
              {RATINGS.google.score.toFixed(1)}
              <span className="text-paper/65">
                · Google {t({ en: `(${RATINGS.google.countLabel} reviews)`, ko: `(리뷰 ${RATINGS.google.countLabel}개)` })}
              </span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => scrollTo('#story')}
            className="group hidden items-center gap-3 text-[0.85rem] font-semibold tracking-[0.2em] text-paper/70 uppercase transition-colors hover:text-paper sm:inline-flex"
          >
            {t({ en: 'Scroll', ko: '스크롤' })}
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition-colors group-hover:border-paper">
              <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
                <ArrowDown className="h-4 w-4" />
              </motion.span>
            </span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
