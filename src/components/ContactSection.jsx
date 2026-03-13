import { useI18n } from '../i18n/index.jsx'

export default function ContactSection() {
  const { t } = useI18n()

  return (
    <section id="contact" className="relative w-full py-20 sm:py-28 overflow-hidden scroll-mt-24 sm:scroll-mt-32">
      {/* World map background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/assets/images/contact-bg.webp)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      />
      {/* Dark overlay */}
      {/* Dark overlay - Reduced opacity to 0.4 as requested */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(144, 75, 162, 0.4)' }} />

      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-20 text-center lg:text-left">
        {/* Section Header moved to top */}
        <div className="mb-12 lg:mb-16">
          <p className="text-sm font-montserrat font-bold uppercase tracking-widest text-brand-purple mb-3">{t.contact.eyebrow}</p>
          <h2 className="text-section-h font-antique font-section-h text-white leading-tight whitespace-pre-line">
            {t.contact.sectionTitle}
          </h2>
        </div>

        <div className="flex flex-col gap-10 items-start max-w-[540px]">
          {/* Top — contact form */}
          <div className="w-full">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl">
              <h3 className="text-2xl font-antique font-section-h text-brand-purple mb-6">{t.contact.formTitle}</h3>
              <form name="contact" method="POST" data-netlify="true" className="flex flex-col gap-5">
                <input type="hidden" name="form-name" value="contact" />

                <div>
                  <label className="block text-sm font-montserrat font-semibold text-gray-600 mb-1.5">{t.contact.labelName}</label>
                  <input type="text" name="name" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#904ba2] focus:ring-2 focus:ring-[#904ba2]/20 outline-none transition font-montserrat text-gray-800 placeholder-gray-400 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-montserrat font-semibold text-gray-600 mb-1.5">{t.contact.labelEmail}</label>
                  <input type="email" name="email" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#904ba2] focus:ring-2 focus:ring-[#904ba2]/20 outline-none transition font-montserrat text-gray-800 placeholder-gray-400 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-montserrat font-semibold text-gray-600 mb-1.5">{t.contact.labelMessage}</label>
                  <textarea name="message" required rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#904ba2] focus:ring-2 focus:ring-[#904ba2]/20 outline-none transition font-montserrat text-gray-800 placeholder-gray-400 text-sm resize-none" />
                </div>

                <button type="submit"
                  className="w-full py-3.5 rounded-full bg-[#904ba2] text-white font-montserrat font-bold text-base hover:bg-[#7a3f8a] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] transform">
                  {t.contact.submitButton}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
