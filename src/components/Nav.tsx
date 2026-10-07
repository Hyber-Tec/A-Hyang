import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'
import { Logo } from './Logo'
import { NAV, RESTAURANT } from '../data/restaurant'
import { useLang, useT } from '../lib/i18n'
import { useScrollTo } from '../lib/scroll'
import { formatTime, useOpenStatus } from '../lib/hours'
import { EASE_OUT } from './motion'
import { BagIcon, PhoneIcon } from './icons'

export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang()
  return (
    <div
      role="group"
      aria-label="Language"
      className={`relative flex items-center rounded-full border border-white/15 bg-black/20 p-1 text-sm font-semibold backdrop-blur ${className}`}
    >
      {(['en', 'ko'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative z-10 min-w-11 rounded-full px-3 py-1.5 transition-colors duration-300 ${lang === l ? 'text-ink' : 'text-paper/75 hover:text-paper'}`}
        >
          {lang === l && (
            <motion.span layoutId="lang-pill" className="absolute inset-0 -z-10 rounded-full bg-paper" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
          )}
          {l === 'en' ? 'EN' : '한국어'}
        </button>
      ))}
    </div>
  )
}

export function Nav() {
  const t = useT()
  const { lang } = useLang()
  const scrollTo = useScrollTo()
  const lenis = useLenis()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { status } = useOpenStatus(RESTAURANT.hours)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > 40)
    // Desktop keeps the floating pill (and its Call button) on screen; phones tuck it away while reading.
    setHidden(y > prev && y > 520 && !open && window.innerWidth < 1024)
  })

  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open, lenis])

  const go = (id: string) => {
    setOpen(false)
    window.setTimeout(() => scrollTo(`#${id}`), open ? 350 : 0)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="fixed inset-x-0 top-0 z-50 lg:px-4"
      >
        <div
          className={`mx-auto border transition-[max-width,margin,background-color,border-color,border-radius,box-shadow] duration-700 ease-[var(--ease-out-expo)] ${
            open
              ? 'max-w-full border-transparent border-b-white/10 bg-ink'
              : solid
                ? 'max-w-full border-transparent border-b-white/10 bg-ink/80 backdrop-blur-xl lg:mt-3 lg:max-w-[1180px] lg:rounded-full lg:border-white/10 lg:bg-ink/70 lg:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)]'
                : 'max-w-[1400px] border-transparent'
          }`}
        >
          <nav
            className={`flex items-center justify-between gap-4 px-5 transition-[height,padding] duration-700 ease-[var(--ease-out-expo)] ${
              solid && !open ? 'h-[64px] md:px-8 lg:pl-6 lg:pr-2.5' : 'h-[72px] md:px-8'
            }`}
            aria-label="Main"
          >
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                setOpen(false)
                lenis ? lenis.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="shrink-0"
              aria-label="애향 a-hyang — home"
            >
              <Logo className="h-9 w-auto md:h-10" shadow />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      go(n.id)
                    }}
                    className="group relative rounded-full px-4 py-2 text-[0.95rem] font-medium text-paper/80 transition-colors hover:text-paper"
                  >
                    {t(n.label)}
                    <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 md:gap-3">
              <LangToggle className="hidden sm:flex" />
              <a
                href={RESTAURANT.phoneHref}
                className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[0.95rem] font-semibold text-ink transition-transform duration-300 hover:scale-[1.03] active:scale-95 md:inline-flex"
              >
                <PhoneIcon className="h-4 w-4" />
                {RESTAURANT.phone}
              </a>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="relative grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/20 backdrop-blur lg:hidden"
              >
                <span className={`absolute h-[2px] w-5 rounded bg-paper transition-transform duration-500 ${open ? 'rotate-45' : '-translate-y-[5px]'}`} />
                <span className={`absolute h-[2px] w-5 rounded bg-paper transition-transform duration-500 ${open ? '-rotate-45' : 'translate-y-[5px]'}`} />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink px-6 pb-10 pt-28 lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            <ul className="flex flex-col gap-1">
              {NAV.map((n, i) => (
                <li key={n.id} className="overflow-hidden">
                  <motion.a
                    href={`#${n.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      go(n.id)
                    }}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: EASE_OUT }}
                    className="flex items-baseline gap-4 py-2 font-display text-[2.6rem] leading-tight text-paper"
                  >
                    <span className="font-sans text-sm text-muted tabular-nums">0{i + 1}</span>
                    {t(n.label)}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="mt-auto space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <LangToggle className="w-fit sm:hidden" />
              <p className="text-muted">
                <span className={`mr-2 inline-block h-2 w-2 rounded-full ${status.open ? 'bg-leaf' : 'bg-chili'}`} />
                {status.open
                  ? `${lang === 'ko' ? '영업 중' : 'Open now'} · ${lang === 'ko' ? `${formatTime(status.closesAt, lang)}까지` : `until ${formatTime(status.closesAt, lang)}`}`
                  : lang === 'ko'
                    ? '영업 준비 중'
                    : 'Closed now'}
              </p>
              <a href={RESTAURANT.phoneHref} className="flex items-center justify-center gap-3 rounded-full bg-gold py-4 text-lg font-semibold text-ink">
                <PhoneIcon className="h-5 w-5" /> {RESTAURANT.phone}
              </a>
              <a
                href={RESTAURANT.orderUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 rounded-full border border-white/20 py-4 text-lg font-semibold text-paper"
              >
                <BagIcon className="h-5 w-5" /> {lang === 'ko' ? '온라인 주문' : 'Order online'}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
