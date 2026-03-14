import { Link, useParams, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/index.jsx'
import { useScrollToSection } from '../hooks/useScrollToSection.js'

const socials = [
  { label: 'Facebook', href: '#', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg> },
  { label: 'Instagram', href: '#', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg> },
  { label: 'WhatsApp', href: '#', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> },
  { label: 'Telegram', href: '#', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg> },
  { label: 'Email', href: 'mailto:john.harrigan0908@gmail.com', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg> },
]

export default function Footer() {
  const { t } = useI18n()
  const { lang = 'en' } = useParams()
  const location = useLocation()
  const scrollToSection = useScrollToSection()

  const scrollLinks = [
    { label: t.footer.links.whyUs, sectionId: 'why-us' },
    { label: t.footer.links.about, sectionId: 'about' },
    { label: t.footer.links.contact, sectionId: 'contact' },
  ]

  const pageLinks = [
    { label: t.footer.links.teachers, to: `/${lang}/teachers` },
    { label: t.footer.links.faq, to: `/${lang}/faq` },
  ]

  const handleLogoClick = () => {
    if (location.pathname === `/${lang}/` || location.pathname === `/${lang}`) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer style={{ backgroundColor: '#904ba2' }}>

      {/* Top bar */}
      <div className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-20 py-5 flex flex-col sm:flex-row gap-4 sm:gap-8">
          <a href="tel:+79850667846" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.25 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
            </div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider">{t.footer.getInTouch}</p>
              <p className="font-medium text-sm">+7 985 066 78 46</p>
            </div>
          </a>
          <a href="mailto:john.harrigan0908@gmail.com" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            </div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider">{t.footer.writeTo}</p>
              <p className="font-medium text-sm">john.harrigan0908@gmail.com</p>
            </div>
          </a>
        </div>
      </div>

      {/* Main body */}
      <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-20 py-12 flex flex-col sm:flex-row gap-10 justify-between">
        <div className="flex flex-col gap-5 max-w-sm items-start">
          <Link 
            to={`/${lang}/`} 
            onClick={handleLogoClick}
            className="transition-transform hover:scale-105 duration-300"
          >
            <img
              src="/assets/icons/logo.png"
              alt={t.nav.logo}
              className="h-16 sm:h-20 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <p className="text-white/65 font-montserrat text-sm leading-relaxed">{t.footer.brandDescription}</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300 hover:scale-110">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-5">{t.footer.quickLinksLabel}</p>
          <ul className="flex flex-col gap-3">
            {scrollLinks.map((link) => (
              <li key={link.sectionId}>
                <button
                  onClick={() => scrollToSection(link.sectionId)}
                  className="text-white/75 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 text-sm bg-transparent border-0 p-0 cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
            {pageLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-white/75 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-20 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/40 text-xs">{t.footer.copyright}</p>
          <div className="flex gap-5">
            <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">{t.footer.privacy}</a>
            <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
