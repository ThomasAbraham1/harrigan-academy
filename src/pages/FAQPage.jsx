import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useI18n } from '../i18n/index.jsx'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const faqs = [
  {
    q: 'What age groups do you teach?',
    a: 'We welcome students of all ages — from young children (age 4+) to adults. Our lessons are tailored to each age group with appropriate materials and teaching techniques.',
  },
  {
    q: 'How are the classes conducted?',
    a: 'All classes are conducted live online via video call. Our teachers use interactive tools, whiteboards, games, and visual aids to make lessons engaging and effective.',
  },
  {
    q: 'What level of English do I need to start?',
    a: 'Absolutely no experience required! We welcome complete beginners and work with all levels from beginner to advanced. Your teacher will adapt the lesson to your current level.',
  },
  {
    q: 'How long are the lessons?',
    a: 'Standard lessons are 50 minutes long. We also offer 25-minute trial lessons for new students to experience our teaching style before committing to a full course.',
  },
  {
    q: 'Can I choose my own teacher?',
    a: 'Yes! You can browse our team of teachers and choose the one that best fits your goals, schedule, and learning style. We also offer a free consultation to help match you.',
  },
  {
    q: 'How much do lessons cost?',
    a: 'Pricing varies based on the teacher and lesson package selected. Please contact us for a personalised quote and information about our current packages and discounts.',
  },
  {
    q: 'What happens if I need to cancel a lesson?',
    a: 'We ask for at least 24 hours notice to cancel or reschedule a lesson. Cancellations within 24 hours may not be eligible for a refund depending on your package.',
  },
  {
    q: 'Do you offer group classes?',
    a: 'Currently we specialise in one-on-one lessons which gives students maximum attention and faster progress. Group classes may be available — contact us for details.',
  },
  {
    q: 'Are your teachers native English speakers?',
    a: 'Our teachers include native English speakers as well as highly proficient non-native speakers who are Cambridge certified and have years of international teaching experience.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        className="w-full text-left py-5 flex items-center justify-between gap-4 focus:outline-none group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-brand-logo font-montserrat font-bold text-gray-900 group-hover:text-brand-purple transition-colors">
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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Header banner */}
      <div
        className="relative overflow-hidden py-20 sm:py-28 px-6 text-center"
        style={{ backgroundColor: '#904ba2' }}
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
          <p className="text-white text-sm font-montserrat font-bold uppercase tracking-widest mb-3">
            Questions
          </p>
          <h1 className="text-hero-h font-antique font-hero-h text-white leading-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-white/80 font-montserrat font-hero-p text-hero-p max-w-xl mx-auto">
            Everything you need to know about Harrigan Academy. Can't find your answer? Contact us directly.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <section className="py-16 sm:py-24 w-full flex-grow bg-gray-50">
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
                Still have questions?
              </h3>
              <p className="text-section-p text-gray-600 font-montserrat font-section-p mb-6 max-w-md mx-auto">
                We're happy to help. Reach out and we'll get back to you as soon as possible.
              </p>
              <Link
                to={`/${activeLang}/`}
                onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100)}
                className="inline-flex items-center px-8 py-3 rounded-full bg-brand-purple text-white font-montserrat font-hero-cta text-hero-cta hover:bg-brand-purple-dark hover:scale-105 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
