import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { GALLERY } from '../data/content'
import { useLang, useT } from '../lib/i18n'
import { Img, type ImageName } from '../components/Img'
import { MaskText } from '../components/motion'
import { SectionLabel } from '../components/SectionLabel'

/* Positions of the six satellite photos around the centre one (vw/vh offsets + size). */
const LAYOUT = [
  'h-[27vh] w-[46vw] md:h-[25vh] md:w-[25vw]', // centre
  '-top-[29vh] left-[6vw] h-[22vh] w-[38vw] md:-top-[30vh] md:left-[5vw] md:h-[30vh] md:w-[35vw]',
  '-top-[6vh] -left-[33vw] h-[30vh] w-[26vw] md:-top-[10vh] md:-left-[25vw] md:h-[45vh] md:w-[20vw]',
  'left-[33vw] h-[22vh] w-[26vw] md:left-[27.5vw] md:h-[25vh] md:w-[25vw]',
  'top-[27vh] left-[6vw] h-[20vh] w-[34vw] md:top-[27.5vh] md:left-[5vw] md:h-[25vh] md:w-[20vw]',
  'top-[25vh] -left-[30vw] h-[20vh] w-[34vw] md:top-[27.5vh] md:-left-[22.5vw] md:h-[25vh] md:w-[30vw]',
  'top-[19vh] left-[36vw] h-[13vh] w-[22vw] md:top-[22.5vh] md:left-[25vw] md:h-[15vh] md:w-[15vw]',
]

export function Gallery() {
  const t = useT()
  const { lang } = useLang()
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] })
  const s4 = useTransform(scrollYProgress, [0, 1], [1, 4])
  const s5 = useTransform(scrollYProgress, [0, 1], [1, 5])
  const s6 = useTransform(scrollYProgress, [0, 1], [1, 6])
  const s8 = useTransform(scrollYProgress, [0, 1], [1, 8])
  const s9 = useTransform(scrollYProgress, [0, 1], [1, 9])
  const scales: MotionValue<number>[] = [s4, s5, s6, s5, s6, s8, s9]
  const captionOpacity = useTransform(scrollYProgress, [0.72, 0.92], [0, 1])
  const captionY = useTransform(scrollYProgress, [0.72, 0.95], [40, 0])
  const veil = useTransform(scrollYProgress, [0.7, 0.95], [0, 0.62])

  return (
    <section id="gallery" className="relative bg-ink">
      <div className="mx-auto max-w-[1400px] px-5 pt-24 pb-14 md:px-8 md:pt-36 md:pb-20">
        <SectionLabel index="04">{t({ en: 'From our kitchen', ko: '애향의 주방에서' })}</SectionLabel>
        <MaskText
          as="h2"
          className={`mt-6 ${lang === 'ko' ? 'font-batang text-[clamp(2.4rem,6vw,5.4rem)] leading-[1.12] font-bold' : 'font-display text-[clamp(2.7rem,7vw,6.6rem)] leading-[0.95] font-[380]'}`}
          lines={
            lang === 'ko'
              ? ['보기만 해도', <span className="text-gold">군침이 도는.</span>]
              : ['Best enjoyed', <span className="italic text-gold">hot off the stove.</span>]
          }
        />
      </div>

      <div ref={container} className="relative h-[300vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {GALLERY.slice(0, 7).map((g, i) => (
            <motion.div key={g.image} style={{ scale: scales[i] }} className="absolute inset-0 flex items-center justify-center will-change-transform">
              <div className={`relative overflow-hidden rounded-[6px] ${LAYOUT[i]}`}>
                <Img name={g.image as ImageName} alt={t(g.alt)} sizes={i === 0 ? '100vw' : '40vw'} className="h-full w-full" position={g.position} />
              </div>
            </motion.div>
          ))}
          <motion.div style={{ opacity: veil }} className="pointer-events-none absolute inset-0 bg-ink" />
          <motion.div style={{ opacity: captionOpacity, y: captionY }} className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center [text-shadow:0_2px_24px_rgba(0,0,0,0.65)]">
            <p className="eyebrow text-paper/80">{t({ en: 'Made to order', ko: '주문 즉시 조리' })}</p>
            <p className={`mt-4 max-w-[16ch] text-paper ${lang === 'ko' ? 'font-batang text-[clamp(2.2rem,6vw,5rem)] leading-[1.2] font-bold' : 'font-display text-[clamp(2.4rem,6.5vw,5.6rem)] leading-[1] font-[380]'}`}>
              {lang === 'ko' ? '정성은 기본, 양은 넉넉하게.' : <>Generous plates, <span className="italic text-gold">made with care.</span></>}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
