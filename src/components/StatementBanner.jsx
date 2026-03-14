import { useI18n } from '../i18n/index.jsx'
 
export default function StatementBanner() {
  const { t } = useI18n()
 
  return (
    <section 
      className="relative w-full overflow-hidden flex items-center justify-center min-h-[240px] md:min-h-[200px]"
    >
      {/* Background image container */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/assets/images/why-us-2.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </div>
 
      {/* Heavy purple overlay */}
      <div
        className="absolute inset-0 z-1"
        style={{ backgroundColor: 'rgba(144, 75, 162, 0.84)' }}
      />
 
      {/* Content */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-12 lg:px-20 text-center">
        <h2 className="text-section-h-large font-antique font-section-h text-white">
          {t.statementBanner.heading}
        </h2>
      </div>
    </section>
  )
}
