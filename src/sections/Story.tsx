import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { STORY, STATS, TICKER } from '../data/content'
import { useLang, useT } from '../lib/i18n'
import { Img } from '../components/Img'
import { Counter, Reveal, ScrollTextReveal, VelocityMarquee } from '../components/motion'
import { SectionLabel } from '../components/SectionLabel'

export function DishTicker() {
  return (
    <div className="relative z-10 border-y border-ink/10 bg-paper py-5 text-ink md:py-7" aria-label="돈까스, 전골, 냉면, 감자탕, 부대찌개">
      <VelocityMarquee baseVelocity={-1.6}>
        {TICKER.map((d) => (
          <span key={d.ko} className="flex items-center">
            <span className="px-5 font-batang text-[clamp(1.9rem,4.4vw,3.6rem)] font-bold md:px-8">{d.ko}</span>
            <span className="font-display text-[clamp(1.5rem,3.4vw,2.8rem)] italic text-ink/55">{d.en}</span>
            <svg viewBox="0 0 24 24" className="mx-6 h-6 w-6 text-gold-deep md:mx-10 md:h-8 md:w-8" aria-hidden="true">
              <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </VelocityMarquee>
    </div>
  )
}

export function Story() {
  const t = useT()
  const { lang } = useLang()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yA = useTransform(scrollYProgress, [0, 1], ['12%', '-14%'])
  const yB = useTransform(scrollYProgress, [0, 1], ['30%', '-30%'])

  return (
    <section id="story" ref={ref} className="relative overflow-hidden bg-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-40">
        <SectionLabel index="01">{t({ en: 'Our place', ko: '애향 이야기' })}</SectionLabel>

        <ScrollTextReveal
          key={lang}
          text={t(STORY.statement)}
          highlight={STORY.highlight[lang]}
          className={`mt-10 max-w-[22ch] text-paper md:max-w-[26ch] ${
            lang === 'ko'
              ? 'font-batang text-[clamp(2rem,4.6vw,4.2rem)] leading-[1.35] font-bold'
              : 'font-display text-[clamp(2.1rem,4.8vw,4.6rem)] leading-[1.12] font-[380]'
          }`}
        />

        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12 md:gap-8">
          {/* Photo pair with differential parallax */}
          <div className="relative md:col-span-7">
            <motion.div style={{ y: yA }} className="relative w-[78%] overflow-hidden rounded-[28px]">
              <Img name={STORY.images[0]} alt={t(STORY.imageAlts[0])} sizes="(min-width: 768px) 40vw, 80vw" className="aspect-[4/5]" />
            </motion.div>
            <motion.div
              style={{ y: yB }}
              className="absolute -bottom-6 right-0 w-[46%] overflow-hidden rounded-[22px] border-[6px] border-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
            >
              <Img name={STORY.images[1]} alt={t(STORY.imageAlts[1])} sizes="(min-width: 768px) 25vw, 45vw" className="aspect-square" />
            </motion.div>
          </div>

          {/* Copy + stats */}
          <div className="flex flex-col justify-end md:col-span-5 md:pl-6">
            <Reveal>
              <p className="text-[1.1rem] leading-relaxed text-paper/75">{t(STORY.body)}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <figure className="mt-10 border-l-2 border-leaf pl-6">
                <blockquote>
                  <p className="font-batang text-[1.55rem] leading-snug font-bold text-paper md:text-[1.75rem]">{STORY.promise.ko}</p>
                  {lang === 'en' && <p className="mt-2 font-display text-[1.2rem] italic text-paper/75">“{STORY.promise.en}”</p>}
                </blockquote>
                <figcaption className="eyebrow mt-4 text-[0.72rem] text-leaf">{t(STORY.promise.caption)}</figcaption>
              </figure>
            </Reveal>
            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/10 pt-10">
              {STATS.map((s, i) => (
                <Reveal key={i} delay={0.08 * i}>
                  <dt className="sr-only">{t(s.label)}</dt>
                  <dd>
                    <p className="font-display text-[clamp(2.6rem,5vw,3.8rem)] leading-none font-[400] text-paper">
                      {s.value !== undefined ? <Counter to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix ?? ''} /> : t(s.text!)}
                    </p>
                    <p className="mt-3 text-[0.95rem] text-muted">{t(s.label)}</p>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
