import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  animate,
  type MotionValue,
} from 'motion/react'
import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

export const EASE_OUT = [0.16, 1, 0.3, 1] as const

/* ------------------------------------------------------------------ Reveal */

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'section' | 'li' | 'p' | 'span' | 'article' | 'figure' | 'header' | 'footer'
  amount?: number
}

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, className, delay = 0, y = 28, as = 'div', amount = 0.25 }: RevealProps) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
    >
      {children}
    </Comp>
  )
}

/* ---------------------------------------------------------------- MaskText */

type MaskTextProps = {
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
  /** Animate on mount instead of on scroll into view. */
  immediate?: boolean
  as?: ElementType
}

/** Headline lines that slide up from behind a mask, one after another. */
export function MaskText({ lines, className, lineClassName = '', delay = 0, stagger = 0.09, immediate, as: Tag = 'div' }: MaskTextProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const show = immediate || inView
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className={`block will-change-transform ${lineClassName}`}
            initial={{ y: '110%' }}
            animate={show ? { y: '0%' } : { y: '110%' }}
            transition={{ duration: 1.1, delay: delay + i * stagger, ease: EASE_OUT }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/* ------------------------------------------------------- ScrollTextReveal */

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export function ScrollTextReveal({ text, className, highlight = [] }: { text: string; className?: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(/\s+/)
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        const clean = word.replace(/[.,—!?;:"]/g, '')
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} accent={highlight.includes(clean)}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}

function Word({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent: boolean }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <span className="relative mr-[0.26em] inline-block">
      <motion.span style={{ opacity }} className={accent ? 'text-gold italic' : undefined}>
        {children}
      </motion.span>
    </span>
  )
}

/* --------------------------------------------------------- VelocityMarquee */

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

/** An endless ribbon whose speed and direction respond to how fast the page is scrolled. */
export function VelocityMarquee({ children, baseVelocity = -2.4, className = '' }: { children: ReactNode; baseVelocity?: number; className?: string }) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    const f = velocityFactor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    moveBy += direction.current * moveBy * f
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="flex shrink-0 flex-nowrap whitespace-nowrap will-change-transform" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/* ---------------------------------------------------------------- Magnetic */

/** Pulls its child gently toward the pointer on hover (desktop pointers only). */
export function Magnetic({ children, strength = 0.28, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.2 })
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.2 })
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/* ----------------------------------------------------------------- Counter */

/** Counts up to `to` once visible. */
export function Counter({ to, decimals = 0, suffix = '', className }: { to: number; decimals?: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 1.8, ease: EASE_OUT, onUpdate: setVal })
    return () => controls.stop()
  }, [inView, to])
  return (
    <span ref={ref} className={className}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}

/* ------------------------------------------------------------- CircularText */

/** Text set on a circle that slowly rotates — used as a seal-like badge. */
export function CircularText({ text, className = '', children }: { text: string; className?: string; children?: ReactNode }) {
  const chars = Array.from(text)
  return (
    <div className={`relative grid place-items-center ${className}`}>
      <div className="absolute inset-0 animate-spin-slow" aria-hidden="true">
        {chars.map((c, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-0 h-1/2 w-[1ch] origin-bottom text-center text-[0.62rem] font-semibold uppercase"
            style={{ transform: `translateX(-50%) rotate(${(360 / chars.length) * i}deg)` }}
          >
            {c}
          </span>
        ))}
      </div>
      <span className="sr-only">{text}</span>
      {children}
    </div>
  )
}
