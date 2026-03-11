import React from 'react'
import { useI18n } from '../i18n/index.jsx'

const cardConfig = [
  {
    image:     '/assets/images/why-us-1.jpg',
    bgColor:   '#FDF1FE',
    textColor: '#D949C6',
    titleColor:'#A32EA6',
    rotation:  'rotate(6deg)',
    zIndex:    10,
    marginTop: '0px',
  },
  {
    image:     '/assets/images/why-us-2.jpg',
    bgColor:   '#E6F8F9',
    textColor: '#57A3A6',
    titleColor:'#2B8388',
    rotation:  'rotate(-2deg)',
    zIndex:    20,
    marginTop: '-5px',
  },
  {
    image:     '/assets/images/why-us-3.jpg',
    bgColor:   '#FEF4E8',
    textColor: '#D98F5E',
    titleColor:'#C97746',
    rotation:  'rotate(4deg)',
    zIndex:    30,
    marginTop: '15px',
  },
]

export default function WhyUsSection() {
  const { t } = useI18n()

  return (
    <section id="why-us" className="relative w-full py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-20 relative z-10">

        {/* Decorative icons */}
        <img src="/assets/images/element-clouds.png" alt="" className="absolute -left-8 md:-left-16 top-10 md:top-20 w-32 md:w-48 opacity-90 z-0 pointer-events-none" />
        <img src="/assets/images/element-cloud.png"  alt="" className="absolute right-4 md:right-10 top-0 md:top-10 w-24 md:w-32 opacity-90 z-0 pointer-events-none" />
        <img src="/assets/images/element-rainbow.png" alt="" className="absolute -right-4 md:-right-10 bottom-0 md:bottom-10 w-32 md:w-40 opacity-90 z-30 pointer-events-none" />

        {/* Title */}
        <div className="text-center mb-12 sm:mb-20 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-brand-section-title leading-tight whitespace-pre-line" style={{ color: '#7B2D8B' }}>
            {t.whyUs.sectionTitle}
          </h2>
        </div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row gap-2 justify-center items-center lg:items-stretch w-full max-w-5xl mx-auto">
          {cardConfig.map((card, index) => (
            <div
              key={index}
              className="w-full sm:w-4/5 md:w-2/3 lg:w-1/3 flex flex-col rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-105 shadow-lg shadow-gray-200/40 mb-8 lg:mb-0"
              style={{
                backgroundColor: card.bgColor,
                transform: `${card.rotation} translateZ(0)`,
                marginTop: card.marginTop,
                zIndex: card.zIndex,
                willChange: 'transform',
              }}
            >
              <div className="w-full aspect-[4/3] p-4 sm:p-5">
                <img src={card.image} alt={t.whyUs.cards[index].title} className="w-full h-full object-cover rounded-xl sm:rounded-2xl" />
              </div>
              <div className="px-6 pb-6 lg:px-8 lg:pb-8 flex flex-col items-center text-center flex-grow">
                <h3 className="text-lg sm:text-xl font-brand-feature-label mb-3" style={{ color: card.titleColor }}>
                  {t.whyUs.cards[index].title}
                </h3>
                <p className="text-sm sm:text-base font-brand-body leading-relaxed" style={{ color: card.textColor }}>
                  {t.whyUs.cards[index].description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
