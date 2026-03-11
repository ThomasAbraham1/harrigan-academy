import { createContext, useContext, useState } from 'react'
import en from './en.js'
import ru from './ru.js'
import ja from './ja.js'

// ── Available locales ─────────────────────────────────────────────────────────
export const LOCALES = {
  en: { label: 'EN', nativeLabel: 'English',  strings: en },
  ru: { label: 'RU', nativeLabel: 'Русский',  strings: ru },
  ja: { label: 'JA', nativeLabel: '日本語',    strings: ja },
}

// ── Context ───────────────────────────────────────────────────────────────────
const I18nContext = createContext(null)

// ── Provider — wrap <App /> with this ────────────────────────────────────────
export function I18nProvider({ children }) {
  const [locale, setLocale] = useState('en')

  const value = {
    locale,
    setLocale,
    t: LOCALES[locale].strings,  // shorthand: const { t } = useI18n()
    locales: LOCALES,
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

// ── Hook — use inside any component ──────────────────────────────────────────
export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used inside <I18nProvider>')
  }
  return context
}
