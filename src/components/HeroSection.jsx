import { useState, useEffect, useCallback, useRef, memo } from 'react'
import { useI18n } from '../i18n/index.jsx'

const slideConfig = [
  {
    image:       '/assets/images/hero-main.jpg',
    mobileImage: '/assets/images/hero-mobile-1.jpg',
    alt:   'Student learning English online',
    align: 'left',
    decorators: [
      { src: '/assets/images/element-sun.webp', className: 'top-[10%] left-[8%] w-32 md:w-48 opacity-[0.25]' },
    ]
  },
  {
    image:       '/assets/images/hero-carousel-5.jpg',
    mobileImage: '/assets/images/hero-mobile-2.jpg',
    alt:   'Fun English class with an international teacher',
    align: 'right',
    decorators: [
      { src: '/assets/images/element-plane.webp', className: 'top-[15%] right-[10%] w-24 md:w-36 opacity-[0.25]' },
   
    ]
  },
  {
    image:       '/assets/images/hero-carousel-2.jpg',
    mobileImage: '/assets/images/hero-mobile-3.jpg',
    alt:   'Happy student in an online class',
    align: 'left',
    decorators: [
      { src: '/assets/images/element-stars.webp', className: 'top-[12%] left-[10%] w-20 md:w-32 opacity-30' },
   
    ]
  },
  {
    image:       '/assets/images/hero-carousel-3.jpg',
    mobileImage: '/assets/images/hero-mobile-4.jpg',
    alt:   'Children enjoying online learning',
    align: 'right',
    decorators: [
      { src: '/assets/images/element-paper-plane.webp', className: 'top-[22%] right-[12%] w-20 md:w-32 opacity-[0.25]' },
    ]
  },
  {
    image:       '/assets/images/hero-carousel-4.jpg',
    mobileImage: '/assets/images/hero-mobile-5.jpg',
    alt:   'Interactive online English classroom',
    align: 'left',
    decorators: [
      { src: '/assets/images/element-rainbow.webp', className: 'top-[12%] left-[5%] w-32 md:w-48 opacity-[0.25]' },

    ]
  },
]

function HeroSection() {
  const { t } = useI18n()
  const [current, setCurrent] = useState(0)

  const intervalRef = useRef(null)

  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideConfig.length)
    }, 5000)
  }, [])

  useEffect(() => {
    startTimer()
    return () => clearInterval(intervalRef.current)
  }, [startTimer])

  const goTo = useCallback((index) => {
    setCurrent(index)
    startTimer() // reset timer from zero
  }, [startTimer])

  const slide = slideConfig[current]

  return (
    <section
      className="relative w-full overflow-hidden bg-white min-h-[160vw] sm:min-h-0 sm:aspect-[4/3] md:aspect-video lg:aspect-auto lg:h-[min(90vw,720px)] lg:min-h-[320px]"
    >
      {/* Full-bleed background slides — picture element for responsive images */}
      {slideConfig.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 bg-white"
          style={{ opacity: i === current ? 1 : 0, willChange: 'opacity' }}
          aria-hidden={i !== current}
        >
          {/* Lock image to 3:4 ratio and anchor to top */}
          <div className="relative w-full aspect-[3/4] sm:aspect-auto sm:h-full">
            <picture>
              <source media="(max-width: 639px)" srcSet={s.mobileImage} />
              <img
                src={s.image}
                alt={s.alt}
                decoding="async"
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                className="w-full h-full object-cover object-top"
                style={{ aspectRatio: '16/9' }}
              />
            </picture>
            
            {/* Dynamic Decorators */}
            {s.decorators?.map((decorator, decIdx) => (
              <img
                key={`dec-${i}-${decIdx}`}
                src={decorator.src}
                alt=""
                className={`absolute hidden md:block ${decorator.className} transition-opacity duration-[1500ms] pointer-events-none z-0 mix-blend-multiply`}
                aria-hidden="true"
              />
            ))}

            {/* Seam blender to soften the bottom edge of the image */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent sm:hidden pointer-events-none"></div>
          </div>
        </div>
      ))}

      {/* Text overlay
          Mobile:  anchored to bottom-left, with breathing room above the bottom edge
          Desktop: vertically centered, left/right per slide
      */}
      <div className="absolute inset-0 z-10 flex items-end sm:items-center mb-2">
        {/* Changed mobile padding-bottom from pb-16 to pb-8 to keep text anchored low in the white space */}
        <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-20 pb-12 sm:pb-8 lg:pb-0">
          <div
            key={current}
            className={`
              w-full sm:w-[85%] md:w-1/2 lg:w-1/2
              flex flex-col items-start gap-3 sm:gap-4 lg:gap-6
              text-left sm:text-left
              animate-[fade-in-up_0.6s_ease-out]
              ${slide.align === 'right'
                ? 'md:ml-auto md:text-right md:items-end'
                : 'md:ml-0 md:text-left md:items-start'}
            `}
          >
            <h1 className="text-hero-h font-antique font-hero-h text-brand-purple leading-[1.12] whitespace-pre-line">
              {t.hero.slides[current].title}
            </h1>

            <p className="text-gray-900 lg:w-[60%] text-hero-p font-montserrat font-hero-p leading-relaxed whitespace-pre-line">
              {t.hero.slides[current].subtitle}
            </p>

            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 rounded-full font-montserrat font-hero-cta text-hero-cta text-white transition-transform duration-300 hover:scale-105 mt-2 sm:mt-4 bg-brand-purple"
            >
              {t.hero.cta}
            </a>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center sm:bottom-12">
        {slideConfig.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width:           i === current ? '24px' : '9px',
              height:          '9px',
              backgroundColor: i === current ? '#904ba2' : 'rgba(144, 75, 162, 0.35)',
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default memo(HeroSection)
