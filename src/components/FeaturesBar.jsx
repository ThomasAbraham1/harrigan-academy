import { useI18n } from '../i18n/index.jsx'

const iconConfig = [
  { icon: '/assets/icons/icon-virtual-classes.webp', alt: 'Live virtual classes icon',       key: 'virtualClasses' },
  { icon: '/assets/icons/icon-international.webp',   alt: 'International teachers icon',     key: 'internationalTeachers' },
  { icon: '/assets/icons/icon-age-ranges.webp',       alt: 'All age ranges icon',             key: 'ageRanges' },
  { icon: '/assets/icons/icon-anytime.webp',          alt: 'Learn anytime anywhere icon',     key: 'anytime' },
]

export default function FeaturesBar() {
  const { t } = useI18n()

  return (
    <section
      className="relative w-full flex items-center min-h-[210px] md:min-h-[160px]"
      style={{
        marginTop: '-8px',
        zIndex: 10,
        backgroundImage:    'url(/assets/images/wavy-cloud-border.webp)',
        backgroundRepeat:   'repeat-x',
        backgroundSize:     'auto 100%',
        backgroundPosition: 'center',
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-20">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-5 py-4 w-full"
          style={{ transform: 'translateY(-8px)' }}
        >
          {iconConfig.map((feature) => (
            <div key={feature.key} className="flex items-center gap-2 justify-self-center sm:justify-self-start sm:gap-3 group">
              <img
                src={feature.icon}
                alt={feature.alt}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <p
                className="text-brand-feature-label font-brand-feature-label"
                style={{ color: '#7B2D8B', whiteSpace: 'pre-line' }}
              >
                {t.features[feature.key]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
