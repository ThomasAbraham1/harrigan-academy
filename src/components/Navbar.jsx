import { useState, useEffect, useCallback } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/index.jsx'

import { useScrollToSection } from '../hooks/useScrollToSection.js'

export default function Navbar() {
  const { t, locale, setLocale, locales } = useI18n()
  const { lang } = useParams()
  const activeLang = lang || 'en'
  const scrollToSection = useScrollToSection()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const [langOpen, setLangOpen]     = useState(false)
  const location = useLocation()

  // Section links — scroll-only, no page navigation
  const sectionLinks = [
    { label: t.nav.whyUs, sectionId: 'why-us' },
    { label: t.nav.about, sectionId: 'about'  },
  ]

  // Page links — full separate pages
  const pageLinks = [
    { label: t.nav.teachers, to: `/${activeLang}/teachers` },
    { label: t.nav.faq,      to: `/${activeLang}/faq`      },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const handleLogoClick = (e) => {
    // If we are already on the homepage, scroll to top
    if (location.pathname === `/${activeLang}/` || location.pathname === `/${activeLang}`) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-xl shadow-purple-900/30' : ''}`}
      style={{ backgroundColor: '#904ba2' }}
    >
      <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-20">
        <div className="flex items-center justify-between h-20 sm:h-22">

          {/* Logo — goes home */}
          <Link 
            to={`/${activeLang}/`} 
            className="flex-shrink-0"
            onClick={handleLogoClick}
          >
            <img 
              src="/assets/icons/logo.png" 
              alt={t.nav.logo} 
              className="h-14 sm:h-18 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {/* Section scroll links */}
            {sectionLinks.map((link) => (
              <button
                key={link.sectionId}
                onClick={() => scrollToSection(link.sectionId)}
                className="text-sm font-montserrat font-semibold text-white hover:text-[#DCF0ED] transition-colors cursor-pointer bg-transparent border-0 p-0"
              >
                {link.label}
              </button>
            ))}
            {/* Page links */}
            {pageLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-montserrat font-semibold text-white hover:text-[#DCF0ED] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Contact Us + Language switcher */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 bg-white text-[#904ba2] font-montserrat font-bold rounded-full hover:bg-[#FDF1FE] transition-colors cursor-pointer border-0"
            >
              {t.nav.contact}
            </button>

            {/* Language switcher dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/10"
                aria-label={t.nav.langAriaLabel}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <span className="text-xs font-semibold">{locales[locale].label}</span>
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg overflow-hidden z-50 min-w-[120px]">
                  {Object.entries(locales).map(([code, meta]) => (
                    <button
                      key={code}
                      onClick={() => { setLocale(code); setLangOpen(false) }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-brand-purple/10 transition-colors ${locale === code ? 'font-bold text-brand-purple' : 'text-gray-700'}`}
                    >
                      <span className="text-xs font-mono font-bold w-5">{meta.label}</span>
                      <span>{meta.nativeLabel}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tablet: Contact Us + hamburger */}
          <div className="hidden sm:flex lg:hidden items-center gap-3">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 bg-white text-[#904ba2] font-montserrat font-bold rounded-full hover:bg-gray-100 transition-colors border-0"
            >
              {t.nav.contact}
            </button>
            <button className="flex flex-col gap-1.5 p-1.5" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              <span className={`hamburger-line ${mobileOpen ? 'rotate-45 translate-y-2 origin-center' : ''}`} />
              <span className={`hamburger-line ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`hamburger-line ${mobileOpen ? '-rotate-45 -translate-y-2 origin-center' : ''}`} />
            </button>
          </div>

          {/* Mobile: hamburger only */}
          <button className="sm:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <span className={`hamburger-line ${mobileOpen ? 'rotate-45 translate-y-2 origin-center' : ''}`} />
            <span className={`hamburger-line ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`hamburger-line ${mobileOpen ? '-rotate-45 -translate-y-2 origin-center' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ backgroundColor: '#7a3b8d' }}
      >
        <div className="px-4 py-4 flex flex-col gap-2">
          {/* Section scroll links */}
          {sectionLinks.map((link) => (
            <button
              key={link.sectionId}
              onClick={() => { scrollToSection(link.sectionId, true); closeMobile() }}
              className="text-white text-brand-nav-link font-brand-nav-link py-2.5 border-b border-white/10 text-left bg-transparent border-l-0 border-r-0 border-t-0 w-full"
            >
              {link.label}
            </button>
          ))}
          {/* Page links */}
          {pageLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-white text-brand-nav-link font-brand-nav-link py-2.5 border-b border-white/10"
              onClick={closeMobile}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { scrollToSection('contact', true); closeMobile() }}
            className="sm:hidden contact-btn mt-3 text-center text-brand-button font-brand-button px-4 py-2 bg-white text-brand-purple rounded-full hover:bg-gray-100 transition-colors border-0"
          >
            {t.nav.contact}
          </button>
          {/* Language switcher in drawer */}
          <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
            {Object.entries(locales).map(([code, meta]) => (
              <button
                key={code}
                onClick={() => { setLocale(code); closeMobile() }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${locale === code ? 'bg-white text-brand-purple' : 'text-white/70 hover:text-white border border-white/30'}`}
              >
                {meta.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
