import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useI18n } from '../i18n/index.jsx'
import PageWrapper from '../components/PageWrapper'
import { useScrollToSection } from '../hooks/useScrollToSection.js'

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        className="w-full text-left py-5 flex items-center justify-between gap-4 focus:outline-none group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-section-p-large font-montserrat font-section-p text-gray-900 group-hover:text-brand-purple transition-colors">
          {q}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
          style={{
            backgroundColor: open ? '#904ba2' : '#f3eef9',
            color: open ? 'white' : '#904ba2',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          {open ? '−' : '+'}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '400px' : '0px', opacity: open ? 1 : 0 }}
      >
        <p className="pb-5 text-section-p text-gray-600 font-montserrat font-section-p leading-relaxed pr-12">{a}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  const { t } = useI18n()
  const { lang } = useParams()
  const activeLang = lang || 'en'
  const scrollToSection = useScrollToSection()

  // Safety check for localized content
  const faqs = t.faqPage?.items || []

  return (
    <PageWrapper>
      {/* Header banner */}
      <div
        className="relative overflow-hidden py-20 sm:py-28 px-6 text-center bg-brand-mint"
      >
        <svg
          className="absolute bottom-[-1px] left-0 w-full"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          fill="white"
        >
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-brand-purple text-sm font-montserrat font-bold uppercase tracking-widest mb-3">
            {t.nav.faq}
          </p>
          <h1 className="text-hero-h font-antique font-hero-h text-brand-purple leading-tight mb-4">
            {t.faqPage?.title || 'Frequently Asked Questions'}
          </h1>
          <p className="text-gray-900/80 font-montserrat font-hero-p text-hero-p max-w-xl mx-auto">
            {t.faqPage?.subtitle || "Everything you need to know about Harrigan Academy. Can't find your answer? Contact us directly."}
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <section className="py-16 sm:py-24 w-full flex-grow">
        <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto w-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              {faqs.map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </div>

            {/* Still have questions CTA */}
            <div className="mt-10 text-center p-8 sm:p-10 rounded-2xl border-2 border-brand-purple/20 bg-white">
              <h3 className="text-section-h font-antique font-section-h text-brand-purple mb-3">
                {activeLang === 'en' ? 'Still have questions?' :
                  activeLang === 'ru' ? 'Остались вопросы?' :
                    activeLang === 'zh' ? '还有疑问吗？' :
                      'ご不明な点はありますか？'}
              </h3>
              <p className="text-section-p text-gray-600 font-montserrat font-section-p mb-6 max-w-md mx-auto">
                {activeLang === 'en' ? "We're happy to help. Reach out and we'll get back to you as soon as possible." :
                  activeLang === 'ru' ? 'Мы будем рады помочь. Свяжитесь с нами, и мы ответим вам как можно скорее.' :
                    activeLang === 'zh' ? '我们很乐意提供帮助。联系我们，我们会尽快给您回复。' :
                      'お気軽にお問い合わせください。できるだけ早く返信いたします。'}
              </p>
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center px-8 py-3 rounded-full bg-brand-purple text-white font-montserrat font-hero-cta text-hero-cta hover:bg-brand-purple-dark hover:scale-105 transition-all duration-300 border-0 cursor-pointer"
              >
                {t.nav.contact}
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
