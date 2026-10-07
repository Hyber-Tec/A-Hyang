import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { SIGNATURES, type Signature as Sig } from '../data/content'
import { useLang, useT } from '../lib/i18n'
import { Img } from '../components/Img'
import { EASE_OUT, MaskText, Reveal } from '../components/motion'
import { SectionLabel } from '../components/SectionLabel'

export function Signature() {
  const t = useT()
  const { lang } = useLang()
  const [active, setActive] = useState(0)

  return (
    <section id="signature" className="relative bg-ink">
      <div className="mx-auto max-w-[1400px] px-5 pt-24 md:px-8 md:pt-36">
        <SectionLabel index="02">{t({ en: 'Signature dishes', ko: '대표 메뉴' })}</SectionLabel>
        <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-end">
          <MaskText
            as="h2"
            className={`md:col-span-8 ${lang === 'ko' ? 'font-batang text-[clamp(2.4rem,6vw,5.4rem)] leading-[1.12] font-bold' : 'font-display text-[clamp(2.7rem,7vw,6.6rem)] leading-[0.95] font-[380]'}`}
            lines={
              lang === 'ko'
                ? ['한 번 맛보면', <span className="text-gold">다시 찾게 되는 맛.</span>]
                : ['The plates', <>people <span className="italic text-gold">come back</span> for.</>]
            }
          />
          <Reveal delay={0.2} className="md:col-span-4">
            <p className="max-w-sm text-[1.05rem] leading-relaxed text-paper/75">
              {t({
                en: 'Four dishes our regulars order again and again. Start here — then explore the full menu below.',
                ko: '단골손님들이 몇 번이고 다시 주문하는 네 가지. 여기서 시작해 아래 전체 메뉴도 둘러보세요.',
              })}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-x-16 px-5 pb-16 md:grid-cols-2 md:px-8 md:pb-28">
        {/* Pinned photo (desktop) */}
        <div className="sticky top-0 hidden h-[100svh] items-center md:flex">
          <div className="relative aspect-[4/5] max-h-[78svh] w-full overflow-hidden rounded-[32px] bg-ink-2">
            {SIGNATURES.map((s, i) => {
              const on = i === active
              return (
                <motion.div
                  key={s.id}
                  className="absolute inset-0"
                  style={{ zIndex: on ? 2 : 1 }}
                  initial={false}
                  animate={{ clipPath: on ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
                  transition={on ? { duration: 1.05, ease: [0.76, 0, 0.24, 1] } : { duration: 0, delay: 1.05 }}
                >
                  <motion.div
                    className="h-full w-full"
                    initial={false}
                    animate={{ scale: on ? 1 : 1.18 }}
                    transition={{ duration: 1.6, ease: EASE_OUT }}
                  >
                    <Img name={s.image} alt={t(s.imageAlt)} sizes="(min-width: 768px) 45vw, 100vw" className="h-full w-full" position={s.position} />
                  </motion.div>
                </motion.div>
              )
            })}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 z-10 flex items-end justify-between">
              <motion.p key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="font-batang text-3xl font-bold text-paper">
                {SIGNATURES[active].ko}
              </motion.p>
              <p className="font-display text-lg text-paper/80 tabular-nums">
                {String(active + 1).padStart(2, '0')} <span className="text-paper/40">/ {String(SIGNATURES.length).padStart(2, '0')}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Scrolling descriptions */}
        <div>
          {SIGNATURES.map((s, i) => (
            <SignatureItem key={s.id} s={s} index={i} onActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SignatureItem({ s, index, onActive }: { s: Sig; index: number; onActive: (i: number) => void }) {
  const t = useT()
  const ref = useRef<HTMLElement>(null)
  const centered = useInView(ref, { margin: '-45% 0px -45% 0px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const numberY = useTransform(scrollYProgress, [0, 1], ['40%', '-40%'])

  useEffect(() => {
    if (centered) onActive(index)
  }, [centered, index, onActive])

  return (
    <article ref={ref} className="relative flex flex-col justify-center py-14 md:min-h-[88svh] md:py-24">
      <div className="md:hidden">
        <Reveal className="relative mb-8 overflow-hidden rounded-[24px]">
          <Img name={s.image} alt={t(s.imageAlt)} sizes="100vw" className="aspect-[4/5] w-full" position={s.position} />
        </Reveal>
      </div>

      <motion.span
        style={{ y: numberY }}
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 right-0 font-display text-[9rem] leading-none font-[300] text-white/[0.05] md:top-1/4 md:text-[15rem]"
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>

      <Reveal>
        {s.badge && (
          <span className="mb-5 inline-flex rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-[0.8rem] font-semibold tracking-wide text-gold">
            {t(s.badge)}
          </span>
        )}
        <h3 className="font-batang text-[clamp(2.6rem,5.5vw,4.6rem)] leading-[1.05] font-bold text-paper">{s.ko}</h3>
        <p className="mt-2 font-display text-[clamp(1.4rem,2.4vw,2rem)] italic text-gold">{s.en}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-lg font-display text-[1.45rem] leading-snug text-paper md:text-[1.6rem]">{t(s.tagline)}</p>
        <p className="mt-4 max-w-lg text-[1.05rem] leading-relaxed text-paper/70">{t(s.desc)}</p>
      </Reveal>
      {s.price && (
        <Reveal delay={0.2} className="mt-8 flex items-center gap-4">
          <span className="h-px w-12 bg-white/25" />
          <span className="text-[1.05rem] font-semibold tabular-nums text-paper">{t(s.price)}</span>
        </Reveal>
      )}
    </article>
  )
}
