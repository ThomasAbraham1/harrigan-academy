const features = [
  { icon: '/assets/icons/icon-virtual-classes.webp', label: 'Live Virtual \n Classes',  alt: 'Live virtual classes icon' },
  { icon: '/assets/icons/icon-international.webp',   label: 'International \n Teachers', alt: 'International teachers icon' },
  { icon: '/assets/icons/icon-age-ranges.webp',       label: 'For all Age \n Ranges',    alt: 'All age ranges icon' },
  { icon: '/assets/icons/icon-anytime.webp',          label: 'Learn Anytime \n Anywhere', alt: 'Learn anytime anywhere icon' },
]

export default function FeaturesBar() {
  return (
    <section
      className="relative w-full flex items-center min-h-[180px] md:min-h-[130px]"
      style={{
        marginTop: '-42px',
        zIndex: 10,
        backgroundImage:    'url(/assets/images/wavy-cloud-border.png)',
        backgroundRepeat:   'repeat-x',
        backgroundSize:     'auto 100%',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-5 py-4 w-full"
          style={{ transform: 'translateY(-8px)' }}
        >
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 justify-self-center sm:justify-self-start sm:gap-3 group">
              {/* Icon — smaller on mobile */}
              <img
                src={feature.icon}
                alt={feature.alt}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0 object-contain
                           transition-transform duration-300 group-hover:scale-110"
              />
              {/* Label */}
              <p
                className="font-bold text-xs sm:text-sm leading-tight"
                style={{ color: '#7B2D8B', whiteSpace: 'pre-line' }}
              >
                {feature.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
