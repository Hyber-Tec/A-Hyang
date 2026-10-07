import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import '@fontsource-variable/fraunces/full.css'
import '@fontsource-variable/fraunces/full-italic.css'
import '@fontsource/gowun-batang/korean-400.css'
import '@fontsource/gowun-batang/korean-700.css'
import './styles/index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Analytics loads after the page is idle so it never competes with the hero.
const loadAnalytics = () => void import('./lib/firebase').then((m) => m.initAnalytics()).catch(() => {})
if ('requestIdleCallback' in window) window.requestIdleCallback(loadAnalytics, { timeout: 5000 })
else setTimeout(loadAnalytics, 3000)
