import { useState, useEffect, useCallback, useRef } from 'react'
import { useI18n } from '../i18n/index.jsx'
import { useSwipe } from '../hooks/useSwipe.js'

const slideConfig = [
  { image: '/assets/images/about-hero.jpg', alt: 'Teacher in an online class',      bgColor: '#FDF1FE', titleColor: '#A32EA6', textColor: '#6B2E6B' },
  { image: '/assets/images/about-2.webp', alt: 'International teachers',           bgColor: '#E6F8F9', titleColor: '#2B8388', textColor: '#2B5E61' },
  { image: '/assets/images/about-3.webp', alt: 'Children enjoying learning',       bgColor: '#FEF4E8', titleColor: '#C97746', textColor: '#8B5A2B' },
]

const FADE_MS = 300
const AUTO_MS = 6000

export default function AboutSection() {
  const { t } = useI18n()
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  const fadeRef    = useRef(null)   // setTimeout for cross-fade
  const intervalRef = useRef(null)  // setInterval for auto-scroll
  const isPausedRef = useRef(false) // hover pause flag

  // ── Core slide change (handles fade) ────────────────────────────────────────
  const changeTo = useCallback((index) => {
    if (fadeRef.current) clearTimeout(fadeRef.current)
    setVisible(false)
    fadeRef.current = setTimeout(() => {
      setCurrent(index)
      setVisible(true)
      fadeRef.current = null
    }, FADE_MS)
  }, [])

  // ── Start / restart the auto-scroll interval ─────────────────────────────────
  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current)
    if (isPausedRef.current) return
    intervalRef.current = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % slideConfig.length
        changeTo(next)
        return prev // changeTo handles the actual state update
      })
    }, AUTO_MS)
  }, [changeTo])

  // Boot the timer once
  useEffect(() => {
    startTimer()
    return () => {
      clearInterval(intervalRef.current)
      if (fadeRef.current) clearTimeout(fadeRef.current)
    }
  }, [startTimer])

  // ── Manual navigation — clears + resets timer ─────────────────────────────
  const go = useCallback((dir) => {
    setCurrent(prev => {
      const next = (prev + dir + slideConfig.length) % slideConfig.length
      changeTo(next)
      return prev
    })
    startTimer() // reset from zero
  }, [changeTo, startTimer])

  const goTo = useCallback((index) => {
    changeTo(index)
    startTimer() // reset from zero
  }, [changeTo, startTimer])

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
  const slideText = t.about.slides[current]

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => go(1),
    onSwipeRight: () => go(-1),
  })

  return (
    <section id="about" className="relative w-full py-10 sm:py-20 bg-white overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Pre-decode all images */}
      <div className="hidden" aria-hidden="true">
        {slideConfig.map((s, i) => (
          <img key={i} src={s.image} alt="" decoding="async" loading="eager" />
        ))}
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-20">
        <h2 className="text-center text-section-h font-antique font-section-h text-brand-purple mb-10 sm:mb-14">
          {t.about.sectionTitle}
        </h2>

        {/* Carousel — pause on hover */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...swipeHandlers}
        >
          {/* Navigation Arrows - Desktop & Mobile Side Position */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 sm:-ml-6 lg:-ml-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md flex items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-all duration-300 z-10 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          {/* Card */}
          <div
            className="rounded-3xl overflow-hidden shadow-sm"
            style={{ backgroundColor: slide.bgColor, transition: 'background-color 0.3s ease' }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div
                className="md:w-[42%] flex-shrink-0 relative h-48 sm:h-64 md:h-auto md:min-h-[320px]"
                style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease`, willChange: 'opacity' }}
              >
                <img src={slide.image} alt={slide.alt} decoding="async" className="absolute inset-0 w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none" />
              </div>
              {/* Text */}
              <div
                className="flex-1 px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-14 flex flex-col justify-center gap-3"
                style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease`, willChange: 'opacity' }}
              >
                <h3 className="text-2xl sm:text-2xl md:text-section-h font-antique font-section-h leading-tight mb-2" style={{ color: slide.titleColor }}>
                  {slideText.title}
                </h3>
                <p className="text-base sm:text-base md:text-section-p-large font-montserrat font-section-p-large leading-relaxed" style={{ color: slide.textColor }}>
                  {slideText.body}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Arrow - Next */}
          <button
            onClick={() => go(1)}
            aria-label="Next slide"
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 sm:-mr-6 lg:-mr-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md flex items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-all duration-300 z-10 active:scale-95"
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
