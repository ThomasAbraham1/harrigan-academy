import { useRef, useEffect, useState } from 'react'
import { useI18n } from '../i18n/index.jsx'

export default function StatementBanner() {
  const { t } = useI18n()
  const bannerRef = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current) return
      
      const rect = bannerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate how far the center of the banner is from the center of the viewport
      const bannerCenter = rect.top + rect.height / 2
      const viewportCenter = windowHeight / 2
      const distanceFromCenter = bannerCenter - viewportCenter
      
      // Apply a subtle parallax factor
      setOffset(distanceFromCenter * 0.15)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      ref={bannerRef}
      className="relative w-full overflow-hidden flex items-center justify-center min-h-[240px] md:min-h-[200px]"
    >
      {/* Background image container with parallax transform */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute inset-0 scale-125 md:scale-110"
          style={{
            backgroundImage: 'url(/assets/images/why-us-2.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${offset}px)`,
            willChange: 'transform'
          }}
        />
      </div>

      {/* Heavy purple overlay */}
      <div
        className="absolute inset-0 z-1"
        style={{ backgroundColor: 'rgba(144, 75, 162, 0.84)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-12 lg:px-20 text-center">
        <h2 className="text-section-h-large font-antique font-section-h text-white">
          {t.statementBanner.heading}
        </h2>
      </div>
    </section>
  )
}
