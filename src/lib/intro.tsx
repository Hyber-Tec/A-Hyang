import { createContext, useContext } from 'react'

/** Seconds the hero should wait before animating in — longer when the intro curtain is playing. */
export const IntroDelayContext = createContext(0.15)
export const useIntroDelay = () => useContext(IntroDelayContext)

const KEY = 'ahyang:intro-seen'

export function shouldPlayIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return !window.sessionStorage.getItem(KEY)
  } catch {
    return true
  }
}

export function markIntroSeen() {
  try {
    window.sessionStorage.setItem(KEY, '1')
  } catch {
    /* ignore */
  }
}
