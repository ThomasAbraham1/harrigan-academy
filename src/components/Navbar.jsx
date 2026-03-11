import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Why Us',            href: '#why-us' },
  { label: 'About Our Program', href: '#about' },
  { label: 'Our Teachers',      href: '#teachers' },
  { label: 'FAQ',               href: '#faq' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]   = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-xl shadow-purple-900/30' : ''}`}
      style={{ backgroundColor: '#7B2D8B' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo — plain text */}
          <a href="#" className="flex-shrink-0">
            <span className="text-white font-extrabold text-base sm:text-xl tracking-tight">
              Harrigan Academy
            </span>
          </a>

          {/* Desktop Navigation — hidden below lg */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link text-sm xl:text-base">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Contact Us + Globe — shown on lg+ */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <a href="#contact" className="contact-btn text-sm">
              Contact Us
            </a>
            <button className="text-white/80 hover:text-white transition-colors" aria-label="Language switcher">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </button>
          </div>

          {/* Tablet: show Contact Us only (no nav links) */}
          <div className="hidden sm:flex lg:hidden items-center gap-3">
            <a href="#contact" className="contact-btn text-xs px-4 py-2">
              Contact Us
            </a>
            {/* Hamburger for nav links */}
            <button
              className="flex flex-col gap-1.5 p-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger-line ${mobileOpen ? 'rotate-45 translate-y-2 origin-center' : ''}`} />
              <span className={`hamburger-line ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`hamburger-line ${mobileOpen ? '-rotate-45 -translate-y-2 origin-center' : ''}`} />
            </button>
          </div>

          {/* Mobile: hamburger only */}
          <button
            className="sm:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${mobileOpen ? 'rotate-45 translate-y-2 origin-center' : ''}`} />
            <span className={`hamburger-line ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`hamburger-line ${mobileOpen ? '-rotate-45 -translate-y-2 origin-center' : ''}`} />
          </button>
        </div>
      </div>

      {/* Drawer — stacks nav + contact on mobile/tablet */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ backgroundColor: '#6A2578' }}
      >
        <div className="px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white font-semibold text-base py-2.5 border-b border-white/10"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {/* Contact Us in drawer for mobile (sm:hidden above already shows it in tablet bar) */}
          <a href="#contact" className="sm:hidden contact-btn mt-3 text-center" onClick={() => setMobileOpen(false)}>
            Contact Us
          </a>
        </div>
      </div>
    </header>
  )
}
