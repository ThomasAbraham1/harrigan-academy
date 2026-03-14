import { Link, useParams } from 'react-router-dom'
import { useI18n } from '../i18n/index.jsx'
import TeacherCard from '../components/TeacherCard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function TeachersPage() {
  const { t } = useI18n()
  const { lang } = useParams()
  const activeLang = lang || 'en'

  const teachers   = t.teachersPage.items || []
  const john      = teachers.find(item => item.featured)
  const rest       = teachers.filter(item => !item.featured)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Page hero banner */}
      <div
        className="relative overflow-hidden py-20 sm:py-28 px-6 text-center bg-brand-mint"
      >
        {/* Decorative wavy bottom edge */}
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
            {t.nav.logo}
          </p>
          <h1 className="text-hero-h font-antique font-hero-h text-brand-purple leading-tight">
            {activeLang === 'en' ? 'Our Teachers' : t.nav.teachers}
          </h1>
        </div>
      </div>

      {/* Teachers content */}
      <section className="py-16 sm:py-24 w-full">
        <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-20">

          {/* John — featured hero card */}
          {john && (
            <TeacherCard
              name={john.name}
              role={john.languages ? `${john.role} | ${john.languages}` : john.role}
              bio={john.bio}
              image={john.image}
              featured={true}
            />
          )}

          {/* Rest — 3-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map(teacher => (
              <TeacherCard
                key={teacher.id}
                name={teacher.name}
                role={teacher.languages ? `${teacher.role} | ${teacher.languages}` : teacher.role}
                bio={teacher.bio}
                image={teacher.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="py-16 px-6 bg-gray-50 border-t border-gray-100 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-section-h font-antique font-section-h text-brand-purple mb-4">
            Ready to find your perfect teacher?
          </h2>
          <p className="text-section-p text-gray-600 font-montserrat font-section-p mb-8">
            Book a free trial lesson and see which teaching style fits you best.
          </p>
          <Link
            to={`/${activeLang}/`}
            onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100)}
            className="inline-flex items-center px-8 py-4 rounded-full bg-brand-purple text-white font-montserrat font-hero-cta text-hero-cta hover:bg-brand-purple-dark hover:scale-105 transition-all duration-300"
          >
            Book a Free Trial
          </Link>
        </div>
      </section> */}

      <Footer />
    </div>
  )
}
