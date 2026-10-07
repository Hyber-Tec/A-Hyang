import { useLenis } from 'lenis/react'
import { useCallback } from 'react'

const NAV_OFFSET = -72

/** Smoothly scrolls to an in-page anchor, through Lenis when it's running. */
export function useScrollTo() {
  const lenis = useLenis()
  return useCallback(
    (hash: string) => {
      const el = document.querySelector(hash)
      if (!el) return
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: NAV_OFFSET, duration: 1.4 })
      else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', hash)
    },
    [lenis],
  )
}
