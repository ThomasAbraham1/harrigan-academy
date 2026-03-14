import { useI18n } from '../i18n/index.jsx'

export default function ContactSection() {
  const { t } = useI18n()

  return (
    <section id="contact" className="relative w-full py-20 sm:py-28 overflow-hidden bg-white scroll-mt-24 sm:scroll-mt-32">
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-20">
        
        {/* Section Header */}
        <div className="mb-12 text-center lg:text-left">
          <p className="text-sm font-montserrat font-bold uppercase tracking-widest text-brand-purple mb-3">{t.contact.eyebrow}</p>
          <h2 className="text-section-h font-antique font-section-h text-brand-purple leading-tight whitespace-pre-line">
            {t.contact.sectionTitle}
          </h2>
        </div>

        {/* Form and Map Container */}
        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Form Card */}
          <div className="w-full xl:w-[480px] flex-shrink-0">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-100 h-full">
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
                  className="w-full py-3.5 mt-2 rounded-full bg-[#904ba2] text-white font-montserrat font-bold text-base hover:bg-[#7a3f8a] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] transform">
                  {t.contact.submitButton}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: World Map Visual (16:9 ratio) */}
          <div className="flex-grow w-full">
            <div className="relative w-full h-full aspect-video rounded-3xl overflow-hidden border-2 border-brand-purple/20 flex items-center justify-center bg-white">
             <img 
  src="/assets/images/contact-bg.webp" 
  alt="Our Worldwide Community" 
  loading="lazy"
  className="
    w-full h-full object-cover origin-center
    
    /* 📱 MOBILE: Rely on scale and translate to crop/shift */
    scale-[2.1] translate-x-[-30%] translate-y-[10%]
    
    /* 💊 TABLET */
    md:scale-[2.1] md:translate-x-[-35%] md:translate-y-[10%]
    
    /* 💻 DESKTOP */
    lg:scale-[1.6] lg:translate-x-[-25%] lg:translate-y-[0%]
  "
/>
              {/* Subtle overlay to soften the map slightly to blend with white bg, if needed */}
              <div className="absolute inset-0 bg-brand-purple/10 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
