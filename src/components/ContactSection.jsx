import { memo } from 'react'
import { useI18n } from '../i18n/index.jsx'

function ContactSection() {
  const { t } = useI18n()

  return (
    <section id="contact" className="relative w-full py-20 sm:py-28 overflow-hidden">
      {/* World map background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/assets/images/contact-bg.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      {/* Dark overlay */}
      {/* Dark overlay - Reduced opacity to 0.4 as requested */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(144, 75, 162, 0.4)' }} />

      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-20 text-center lg:text-left">
        {/* Section Header moved to top */}
        <div className="mb-12 lg:mb-16">
          <p className="text-sm font-montserrat font-bold uppercase tracking-widest text-brand-mint mb-3">{t.contact.eyebrow}</p>
          <h2 className="text-section-h font-antique font-section-h text-white leading-tight whitespace-pre-line">
            {t.contact.sectionTitle}
          </h2>
        </div>

        <div className="flex flex-col gap-10 items-start max-w-[540px]">
          {/* Top — contact form */}
          <div className="w-full">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl">
              <h3 className="text-2xl font-antique font-section-h text-brand-purple mb-1">{t.contact.formTitle}</h3>
              <p className="text-gray-500 font-montserrat font-section-p text-sm mb-6">{t.contact.formSubtitle}</p>
              <form name="contact" method="POST" data-netlify="true" className="flex flex-col gap-5">
                <input type="hidden" name="form-name" value="contact" />

                <div>
                  <label className="block text-sm font-montserrat font-semibold text-gray-600 mb-1.5">{t.contact.labelName}</label>
                  <input type="text" name="name" required placeholder={t.contact.placeholderName}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#904ba2] focus:ring-2 focus:ring-[#904ba2]/20 outline-none transition font-montserrat text-gray-800 placeholder-gray-400 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-montserrat font-semibold text-gray-600 mb-1.5">{t.contact.labelEmail}</label>
                  <input type="email" name="email" required placeholder={t.contact.placeholderEmail}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#904ba2] focus:ring-2 focus:ring-[#904ba2]/20 outline-none transition font-montserrat text-gray-800 placeholder-gray-400 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-montserrat font-semibold text-gray-600 mb-1.5">{t.contact.labelMessage}</label>
                  <textarea name="message" required rows={4} placeholder={t.contact.placeholderMessage}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#904ba2] focus:ring-2 focus:ring-[#904ba2]/20 outline-none transition font-montserrat text-gray-800 placeholder-gray-400 text-sm resize-none" />
                </div>

                <button type="submit"
                  className="w-full py-3.5 rounded-full bg-[#904ba2] text-white font-montserrat font-bold text-base hover:bg-[#7a3f8a] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] transform">
                  {t.contact.submitButton}
                </button>
              </form>
            </div>
          </div>

          {/* Bottom details with Glassmorphism for better contrast */}
          <div className="w-full bg-brand-purple/25 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10 shadow-xl overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-white/90 font-montserrat font-section-p text-[1rem] leading-relaxed mb-8">{t.contact.subtitle}</p>

              <div className="flex flex-col gap-6">
                <a href="tel:+79850667846" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-mint" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.25 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  </div>
                  <div>
                    <p className="text-xs text-brand-mint/60 uppercase tracking-wider font-montserrat font-bold">{t.contact.phoneLabel}</p>
                    <p className="text-white font-montserrat font-medium">+7 985 066 78 46</p>
                  </div>
                </a>
                <a href="mailto:john.harrigan0908@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-mint" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  </div>
                  <div>
                    <p className="text-xs text-brand-mint/60 uppercase tracking-wider font-montserrat font-bold">{t.contact.emailLabel}</p>
                    <p className="text-white font-montserrat font-medium break-all">john.harrigan0908@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(ContactSection)
