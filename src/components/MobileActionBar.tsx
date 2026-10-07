import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { RESTAURANT } from '../data/restaurant'
import { useT } from '../lib/i18n'
import { useScrollTo } from '../lib/scroll'
import { BookIcon, NavigationIcon, PhoneIcon } from './icons'
import { EASE_OUT } from './motion'

/** Thumb-reach actions for phones: call, directions, menu. Appears once the hero is scrolled past. */
export function MobileActionBar() {
  const t = useT()
  const scrollTo = useScrollTo()
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => {
    const nearBottom = y + window.innerHeight > document.documentElement.scrollHeight - 160
    setShow(y > window.innerHeight * 0.7 && !nearBottom)
  })

  const item = 'flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[0.8rem] font-semibold tracking-wide'
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          exit={{ y: 120 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 md:hidden"
        >
          <div className="flex overflow-hidden rounded-2xl border border-white/10 bg-ink/85 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <a href={RESTAURANT.phoneHref} className={`${item} bg-gold text-ink`}>
              <PhoneIcon className="h-5 w-5" />
              {t({ en: 'Call', ko: '전화' })}
            </a>
            <a href={RESTAURANT.directionsUrl} target="_blank" rel="noreferrer" className={`${item} text-paper`}>
              <NavigationIcon className="h-5 w-5" />
              {t({ en: 'Directions', ko: '길찾기' })}
            </a>
            <button type="button" onClick={() => scrollTo('#menu')} className={`${item} border-l border-white/10 text-paper`}>
              <BookIcon className="h-5 w-5" />
              {t({ en: 'Menu', ko: '메뉴' })}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
