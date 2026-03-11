import { useState } from 'react'
import { useI18n } from '../i18n/index.jsx'

const SIZES = ['short', 'short', 'short', 'short', 'long', 'long', 'long', 'long']

const buildGroups = (items) => {
  const groups = []
  let i = 0
  while (i < items.length) {
    if (SIZES[i] === 'short' && SIZES[i + 1] === 'short') {
      groups.push({ type: 'pair', items: [items[i], items[i + 1]] })
      i += 2
    } else {
      groups.push({ type: 'single', items: [items[i]] })
      i++
    }
  }
  return groups
}

function QuoteIcon({ color = '#7B2D8B' }) {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3 opacity-80">
      <path d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0L16 3.2C10.4 4.8 7.6 8 7.2 12H14.4V24H0ZM17.6 24V14.4C17.6 6.4 22.4 1.6 32 0L33.6 3.2C28 4.8 25.2 8 24.8 12H32V24H17.6Z" fill={color}/>
    </svg>
  )
}

function TestimonialCard({ testimonial, isWide = false }) {
  return (
    <div className={`bg-white rounded-2xl p-5 sm:p-8 shadow-sm flex flex-col gap-3 border-l-4 border-brand-purple ${isWide ? 'w-full' : 'flex-1'}`}>
      <QuoteIcon />
      <p className="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-line flex-1">{testimonial.quote}</p>
      <div className="mt-1 pt-3 border-t border-gray-100">
        <p className="font-bold text-brand-purple text-base">{testimonial.name}</p>
        <p className="text-xs text-gray-500 mt-0.5">{testimonial.role}</p>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const { t } = useI18n()
  const [current, setCurrent] = useState(0)

  const groups = buildGroups(t.testimonials.items)

  const go = (direction) => {
    setCurrent((prev) => (prev + direction + groups.length) % groups.length)
  }

  const group = groups[current]

  return (
    <section id="testimonials" className="relative w-full py-10 sm:py-20 overflow-hidden" style={{ backgroundColor: '#DCF0ED' }}>
      {/* Decorative circles — box-shadow instead of filter:blur for performance */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-30" style={{ backgroundColor: '#7B2D8B', boxShadow: '0 0 80px 40px #7B2D8B' }} />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-30" style={{ backgroundColor: '#7B2D8B', boxShadow: '0 0 80px 40px #7B2D8B' }} />

      <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-20">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-purple mb-3">{t.testimonials.eyebrow}</p>
          <h2 className="text-brand-section-title font-brand-section-title text-brand-purple">
            {t.testimonials.sectionTitle}
          </h2>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Left arrow */}
          <button onClick={() => go(-1)} aria-label="Previous testimonial" className="flex-shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white shadow-md flex items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-all duration-300 hover:scale-105">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>

          {/* Cards */}
          <div
            key={current}
            className={`flex-1 flex flex-col sm:${group.type === 'pair' ? 'flex-row' : 'flex-col'} gap-4 sm:gap-6 animate-[fade-in-up_0.4s_ease-out]`}
          >
            {group.type === 'single' ? (
              <TestimonialCard testimonial={group.items[0]} isWide />
            ) : (
              group.items.map((t, i) => <TestimonialCard key={i} testimonial={t} />)
            )}
          </div>

          {/* Right arrow */}
          <button onClick={() => go(1)} aria-label="Next testimonial" className="flex-shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white shadow-md flex items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-all duration-300 hover:scale-105">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {groups.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to group ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '24px' : '9px',
                height: '9px',
                backgroundColor: i === current ? '#7B2D8B' : 'rgba(123,45,139,0.35)',
              }}
            />
          ))}
        </div>
        <p className="text-center mt-4 text-sm text-brand-purple/60 font-medium">
          {current + 1} / {groups.length}
        </p>
      </div>
    </section>
  )
}
