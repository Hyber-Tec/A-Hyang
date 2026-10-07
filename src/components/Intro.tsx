import { motion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { useEffect } from 'react'
import { Logo } from './Logo'
import { EASE_OUT } from './motion'

export const INTRO_MS = 1700

/** A brief curtain with the storefront wordmark, played once per visit. */
export function Intro({ onDone }: { onDone: () => void }) {
  const lenis = useLenis()
  useEffect(() => {
    lenis?.stop()
    const id = window.setTimeout(onDone, INTRO_MS)
    return () => {
      window.clearTimeout(id)
      lenis?.start()
    }
  }, [lenis, onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden="true"
    >
      <motion.div
        className="flex flex-col items-center gap-6"
        exit={{ y: -60, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: EASE_OUT }}
        >
          <Logo className="w-[min(64vw,380px)]" shadow />
        </motion.div>
        <div className="h-px w-40 overflow-hidden bg-white/10">
          <motion.div
            className="h-full origin-left bg-leaf"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: INTRO_MS / 1000 - 0.2, ease: [0.65, 0, 0.35, 1] }}
          />
        </div>
        <motion.p
          className="eyebrow text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Duluth · Georgia
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
