import { useState, useEffect, useCallback, useRef, memo } from 'react'
import { useI18n } from '../i18n/index.jsx'

const slideConfig = [
  { image: '/assets/images/about-hero.jpg', alt: 'Teacher in an online class',      bgColor: '#FDF1FE', titleColor: '#A32EA6', textColor: '#6B2E6B' },
  { image: '/assets/images/about-2.webp', alt: 'International teachers',           bgColor: '#E6F8F9', titleColor: '#2B8388', textColor: '#2B5E61' },
  { image: '/assets/images/about-3.webp', alt: 'Children enjoying learning',       bgColor: '#FEF4E8', titleColor: '#C97746', textColor: '#8B5A2B' },
]

const AUTO_MS = 6000

function AboutSection() {
  const { t } = useI18n()
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef(null)  // setInterval for auto-scroll
  const isPausedRef = useRef(false) // hover pause flag

  // ── Core slide change (handles fade) ────────────────────────────────────────
  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current)
    if (isPausedRef.current) return
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % slideConfig.length)
    }, AUTO_MS)
  }, [])

  // Boot the timer once
  useEffect(() => {
    startTimer()
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [startTimer])

  // ── Manual navigation — clears + resets timer ─────────────────────────────
  const go = useCallback((dir) => {
    setCurrent(prev => (prev + dir + slideConfig.length) % slideConfig.length)
    startTimer() 
  }, [startTimer])

  const goTo = useCallback((index) => {
    setCurrent(index)
    startTimer()
  }, [startTimer])

  // ── Hover pause / resume ──────────────────────────────────────────────────
  const handleMouseEnter = useCallback(() => {
    isPausedRef.current = true
    clearInterval(intervalRef.current)
  }, [])

  const handleMouseLeave = useCallback(() => {
    isPausedRef.current = false
    startTimer()
  }, [startTimer])

  const slide     = slideConfig[current]

  return (
    <section 
      id="about" 
      className="relative w-full py-10 sm:py-20 overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: slide.bgColor }}
    >

      <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-20">
        <h2 className="text-center text-section-h font-antique font-section-h text-brand-purple mb-10 sm:mb-14">
          {t.about.sectionTitle}
        </h2>

        {/* Carousel — pause on hover */}
        <div
          className="relative flex items-center gap-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Left arrow */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md flex items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-colors duration-300 z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          {/* Card */}
          <div className="flex-1 rounded-3xl overflow-hidden relative min-h-[450px] sm:min-h-[400px] md:min-h-[300px]">
            {slideConfig.map((s, i) => (
              <div
                key={i}
                className="absolute inset-0 flex flex-col md:flex-row transition-opacity duration-500 ease-in-out"
                style={{ 
                  opacity: i === current ? 1 : 0, 
                  visibility: i === current ? 'visible' : 'hidden',
                  pointerEvents: i === current ? 'auto' : 'none',
                  zIndex: i === current ? 10 : 0
                }}
              >
                {/* Image */}
                <div className="md:w-[42%] flex-shrink-0 relative h-44 sm:h-60 md:h-auto">
                  <img 
                    src={s.image} 
                    alt={s.alt} 
                    decoding="async" 
                    loading={i === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl" 
                  />
                </div>
                {/* Text */}
                <div className="flex-1 px-6 py-7 sm:px-10 sm:py-10 md:px-12 md:py-14 flex flex-col justify-center gap-3">
                  <h3 className="text-xl sm:text-2xl md:text-section-h font-antique font-section-h leading-tight mb-2" style={{ color: s.titleColor }}>
                    {t.about.slides[i].title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-section-p-large font-montserrat font-section-p-large leading-relaxed" style={{ color: s.textColor }}>
                    {t.about.slides[i].body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => go(1)}
            aria-label="Next slide"
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md flex items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-colors duration-300 z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {slideConfig.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '24px' : '9px',
                height: '9px',
                backgroundColor: i === current ? '#904ba2' : 'rgba(144, 75, 162, 0.3)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(AboutSection)
