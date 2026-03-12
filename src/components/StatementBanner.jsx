import { memo } from 'react'
import { useI18n } from '../i18n/index.jsx'

function StatementBanner() {
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
        }}
      />
      {/* Heavy purple overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(144, 75, 162, 0.84)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-12 lg:px-20 text-center flex items-center justify-center h-full">
        <h2 className="text-[1.875rem] font-antique font-light text-white whitespace-nowrap">
          {t.statementBanner.heading}
        </h2>
      </div>
    </section>
  )
}

export default memo(StatementBanner)
