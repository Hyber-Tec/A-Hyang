import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'ko'
/** A bilingual string. */
export type T = { en: string; ko: string }

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void }
const LangContext = createContext<Ctx | null>(null)
const STORAGE_KEY = 'ahyang:lang'

function initialLang(): Lang {
  try {
    const q = new URLSearchParams(window.location.search).get('lang')
    if (q === 'ko' || q === 'en') return q
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'ko' || saved === 'en') return saved
  } catch {
    /* storage can be unavailable (private mode) — fall through */
  }
  return navigator.language?.toLowerCase().startsWith('ko') ? 'ko' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const setLang = useCallback((l: Lang) => setLangState(l), [])
  const toggle = useCallback(() => setLangState((l) => (l === 'en' ? 'ko' : 'en')), [])
  const value = useMemo(() => ({ lang, setLang, toggle }), [lang, setLang, toggle])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}

/** Returns a translator: t({ en, ko }) → string for the active language. */
export function useT() {
  const { lang } = useLang()
  return useCallback((v: T | string) => (typeof v === 'string' ? v : v[lang]), [lang])
}
