import { useI18n } from '../i18n/index.jsx'

export default function StatementBanner() {
  const { t } = useI18n()

  return (
    <section className="relative w-full overflow-hidden flex items-center justify-center min-h-[210px] md:min-h-[160px]">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/assets/images/why-us-2.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      {/* Heavy purple overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(100, 22, 120, 0.84)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-12 lg:px-20 text-center flex items-center justify-center h-full">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white whitespace-nowrap">
          {t.statementBanner.heading}
        </h2>
      </div>
    </section>
  )
}
