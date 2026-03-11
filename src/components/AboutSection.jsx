import { useState, useEffect, useCallback, useRef } from 'react'
import { useI18n } from '../i18n/index.jsx'

const slideConfig = [
  { image: '/assets/images/about-1.jpg', alt: 'Teacher in an online class',      bgColor: '#FDF1FE', titleColor: '#A32EA6', textColor: '#6B2E6B' },
  { image: '/assets/images/about-2.jpg', alt: 'International teachers',           bgColor: '#E6F8F9', titleColor: '#2B8388', textColor: '#2B5E61' },
  { image: '/assets/images/about-3.jpg', alt: 'Children enjoying learning',       bgColor: '#FEF4E8', titleColor: '#C97746', textColor: '#8B5A2B' },
]

const FADE_MS = 300

export default function AboutSection() {
  const { t } = useI18n()
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const pendingRef = useRef(null)

  const go = useCallback((dir) => {
    if (pendingRef.current) clearTimeout(pendingRef.current)
    setVisible(false)
    pendingRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + dir + slideConfig.length) % slideConfig.length)
      setVisible(true)
      pendingRef.current = null
    }, FADE_MS)
  }, [])

  const goTo = useCallback((index) => {
    if (pendingRef.current) clearTimeout(pendingRef.current)
    setVisible(false)
    pendingRef.current = setTimeout(() => {
      setCurrent(index)
      setVisible(true)
      pendingRef.current = null
    }, FADE_MS)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => go(1), 6000)
    return () => {
      clearInterval(timer)
      if (pendingRef.current) clearTimeout(pendingRef.current)
    }
  }, [go])

  const slide = slideConfig[current]
  const slideText = t.about.slides[current]

  return (
    <section id="about" className="relative w-full py-10 sm:py-20 bg-white overflow-hidden">
      {/* Pre-decode all images */}
      <div className="hidden" aria-hidden="true">
        {slideConfig.map((s, i) => (
          <img key={i} src={s.image} alt="" decoding="async" loading="eager" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-20">
        <h2 className="text-center text-brand-section-title font-brand-section-title text-brand-purple mb-10 sm:mb-14">
          {t.about.sectionTitle}
        </h2>

        <div className="relative flex items-center gap-4">
          {/* Left arrow */}
          <button onClick={() => go(-1)} aria-label="Previous slide" className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md flex items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-colors duration-300 z-10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          {/* Card */}
          <div
            className="flex-1 rounded-3xl overflow-hidden"
            style={{ backgroundColor: slide.bgColor, transition: 'background-color 0.3s ease' }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div
                className="md:w-[42%] flex-shrink-0 relative h-44 sm:h-60 md:h-auto md:min-h-[300px]"
                style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease`, willChange: 'opacity' }}
              >
                <img src={slide.image} alt={slide.alt} decoding="async" className="absolute inset-0 w-full h-full object-cover rounded-3xl" />
              </div>
              {/* Text */}
              <div
                className="flex-1 px-6 py-7 sm:px-10 sm:py-10 md:px-12 md:py-14 flex flex-col justify-center gap-3"
                style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease`, willChange: 'opacity' }}
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight" style={{ color: slide.titleColor }}>
                  {slideText.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed" style={{ color: slide.textColor }}>
                  {slideText.body}
                </p>
              </div>
            </div>
          </div>

          {/* Right arrow */}
          <button onClick={() => go(1)} aria-label="Next slide" className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md flex items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-colors duration-300 z-10">
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
                backgroundColor: i === current ? '#7B2D8B' : 'rgba(123,45,139,0.3)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
