import { useState, useEffect } from 'react'

const slides = [
  { image: '/assets/images/hero-main.png',       alt: 'Student learning English online' },
  { image: '/assets/images/hero-carousel-2.png', alt: 'Happy student in an online class' },
  { image: '/assets/images/hero-carousel-3.png', alt: 'Children enjoying online learning' },
  { image: '/assets/images/hero-carousel-4.png', alt: 'Interactive online English classroom' },
  { image: '/assets/images/hero-carousel-5.png', alt: 'Fun English class with an international teacher' },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      className="relative w-full overflow-hidden aspect-[3/4] sm:aspect-auto sm:h-[min(90vw,720px)] sm:min-h-[320px]"
    >
      {/* ── Full-bleed background slides (images have built-in fade) ── */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
          aria-hidden={i !== current}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            /* object-top keeps the child/student face visible on every viewport */
            className="w-full h-full object-cover object-top"
          />
        </div>
      ))}

      {/* ── Text overlay ── */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-4 sm:px-10 lg:px-16 pb-8 sm:pb-0">
          {/* Constrain text to left half on md+ so it sits over the white-fade area of the image */}
          <div className="w-full sm:w-3/4 md:w-1/2 flex flex-col gap-1.5 sm:gap-5">

            <h1
              className="text-lg sm:text-4xl md:text-5xl font-black leading-tight"
              style={{ color: '#7B2D8B' }}
            >
              Fun Online Classes to improve your English!
            </h1>

            <p className="text-gray-800 text-xs sm:text-base md:text-lg leading-relaxed font-medium hidden sm:block">
              With experienced international teachers who care about your progress.
            </p>

            <a
              href="#contact"
              className="self-start inline-flex items-center px-4 sm:px-8 py-2 sm:py-3.5 rounded-full font-bold text-white text-xs sm:text-base transition-all duration-300 hover:scale-105 hover:brightness-110 sm:mt-1"
              style={{ backgroundColor: '#7B2D8B' }}
            >
              Start Learning Today
            </a>
          </div>
        </div>
      </div>

      {/* ── Dot indicators — kept well above feature bar overlap ── */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
        {slides.map((_, i) => (
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
