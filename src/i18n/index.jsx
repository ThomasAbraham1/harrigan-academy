import { createContext, useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import en from './en.js'
import ru from './ru.js'
import ja from './ja.js'

export const LOCALES = {
  en: { label: 'EN', nativeLabel: 'English',  strings: en },
  ru: { label: 'RU', nativeLabel: 'Русский',  strings: ru },
  ja: { label: 'JA', nativeLabel: '日本語',    strings: ja },
}

const VALID_LANGS = Object.keys(LOCALES)

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  // Read lang from URL param (:lang) — fall back to 'en'
  const { lang } = useParams()
  const navigate  = useNavigate()

  const activeLang = VALID_LANGS.includes(lang) ? lang : 'en'
  const [locale, setLocaleState] = useState(activeLang)

  // Sync state if the URL param changes (browser back/forward)
  useEffect(() => {
    setLocaleState(activeLang)
  }, [activeLang])

  // Switching language navigates to the new lang URL
  const setLocale = (newLang) => {
    if (!VALID_LANGS.includes(newLang)) return
    setLocaleState(newLang)
    // Preserve the path suffix (e.g. /en/teachers → /ru/teachers)
    const currentPath = window.location.pathname
    const suffix = currentPath.replace(/^\/(en|ru|ja)/, '') || '/'
    navigate(`/${newLang}${suffix}`)
  }

  const value = {
    locale,
    setLocale,
    locales: LOCALES,
    t: LOCALES[locale].strings,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}
