import { AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react'
import { ReactLenis } from 'lenis/react'
import { useCallback, useState } from 'react'
import { LangProvider } from './lib/i18n'
import { IntroDelayContext, markIntroSeen, shouldPlayIntro } from './lib/intro'
import { Intro, INTRO_MS } from './components/Intro'
import { Nav } from './components/Nav'
import { MobileActionBar } from './components/MobileActionBar'
import { Hero } from './sections/Hero'
import { DishTicker, Story } from './sections/Story'
import { Signature } from './sections/Signature'
import { Menu } from './sections/Menu'
import { Gallery } from './sections/Gallery'
import { Reviews } from './sections/Reviews'
import { Visit } from './sections/Visit'
import { Footer } from './sections/Footer'

export default function App() {
  const reduceMotion = useReducedMotion()
  const [playIntro] = useState(shouldPlayIntro)
  const [introVisible, setIntroVisible] = useState(playIntro)
  const finishIntro = useCallback(() => {
    markIntroSeen()
    setIntroVisible(false)
  }, [])

  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">
        {!reduceMotion && <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 1, touchMultiplier: 1.4 }} />}
        <IntroDelayContext.Provider value={playIntro ? INTRO_MS / 1000 + 0.05 : 0.15}>
          <div className="grain">
            <AnimatePresence>{introVisible && <Intro onDone={finishIntro} />}</AnimatePresence>
            <Nav />
            <main id="top">
              <Hero />
              <DishTicker />
              <Story />
              <Signature />
              <Menu />
              <Gallery />
              <Reviews />
              <Visit />
            </main>
            <Footer />
            <MobileActionBar />
          </div>
        </IntroDelayContext.Provider>
      </MotionConfig>
    </LangProvider>
  )
}
