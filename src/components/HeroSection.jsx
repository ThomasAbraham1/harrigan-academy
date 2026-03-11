import { useState, useEffect } from 'react'
import { useI18n } from '../i18n/index.jsx'

const slideConfig = [
  { image: '/assets/images/hero-main.png',       alt: 'Student learning English online',          align: 'left'  },
  { image: '/assets/images/hero-carousel-5.png', alt: 'Fun English class with an international teacher', align: 'right' },
  { image: '/assets/images/hero-carousel-2.png', alt: 'Happy student in an online class',         align: 'left'  },
  { image: '/assets/images/hero-carousel-3.png', alt: 'Children enjoying online learning',        align: 'right' },
  { image: '/assets/images/hero-carousel-4.png', alt: 'Interactive online English classroom',     align: 'left'  },
]

export default function HeroSection() {
  const { t } = useI18n()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideConfig.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      className="relative w-full overflow-hidden aspect-[3/4] sm:aspect-[4/3] md:aspect-video lg:aspect-auto lg:h-[min(90vw,720px)] lg:min-h-[320px]"
    >
      {/* Full-bleed background slides */}
      {slideConfig.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, willChange: 'opacity' }}
          aria-hidden={i !== current}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            decoding="async"
            className="w-full h-full object-cover object-top"
          />
        </div>
      ))}

      {/* Text overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-20 pb-8 sm:pb-0">
          <div
            key={current}
            className={`w-full sm:w-[85%] md:w-1/2 lg:w-2/3 flex flex-col items-start gap-3 sm:gap-4 lg:gap-6 animate-[fade-in-up_0.6s_ease-out] ${slideConfig[current].align === 'right' ? 'md:ml-auto md:text-right md:items-end' : 'md:ml-0 md:text-left md:items-start'}`}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-brand-hero-title text-brand-purple-hero leading-[1.12] whitespace-pre-line">
              {t.hero.slides[current].title}
            </h1>

            <p className="text-gray-900 text-base sm:text-lg lg:text-3xl font-brand-body leading-relaxed whitespace-pre-line">
              {t.hero.slides[current].subtitle}
            </p>

            <a
              href="#contact"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-full font-brand-button text-white text-base sm:text-lg transition-transform duration-300 hover:scale-105 mt-2 sm:mt-4 bg-brand-purple"
            >
              {t.hero.cta}
            </a>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
        {slideConfig.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width:           i === current ? '24px' : '9px',
              height:          '9px',
              backgroundColor: i === current ? '#7B2D8B' : 'rgba(123,45,139,0.35)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
