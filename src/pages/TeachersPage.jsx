import { Link, useParams } from 'react-router-dom'
import { useI18n } from '../i18n/index.jsx'
import TeacherCard from '../components/TeacherCard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const teachers = [
  {
    id: 'john',
    name: 'John Harrigan',
    role: 'Founder',
    bio: 'Founder of Harrigan Academy. Based in Moscow, Russia. A teacher with 30+ years of experience and a skilled methodologist. Speaks 5 languages: English, Japanese, Chinese, Hindi, and Russian.',
    image: '/assets/images/teachers/john.png',
    featured: true,
  },
  {
    id: 'keiko',
    name: 'Keiko Harrigan',
    role: 'Teacher',
    bio: 'Teacher with 15 years of experience. Based in Moscow, Russia. Japanese native. Has spoken 5 languages since childhood: English, Japanese, Hindi, Nepali, and Bengali.',
    image: '/assets/images/teachers/keiko.webp',
  },
  {
    id: 'ema',
    name: 'Ema Ito',
    role: 'Teacher',
    bio: 'Fluent in English and Japanese. Cambridge certified. 16 years teaching English at a Japanese language school in New Delhi. Specializes in Essay Writing, Grammar, TOEFL, and IELTS.',
    image: '/assets/images/teachers/ema.webp',
  },
  {
    id: 'naomi',
    name: 'Naomi Aoki',
    role: 'Teacher',
    bio: 'Based in Delhi, India. 8 years of teaching experience. Languages: Japanese, English, Hindi, Nepali. Believes in helping students step outside their comfort zone.',
    image: '/assets/images/teachers/naomi.webp',
  },
  {
    id: 'caleb',
    name: 'Caleb',
    role: 'Teacher',
    bio: 'A dedicated educator passionate about helping students discover their voice in English through immersive, conversation-driven lessons.',
    image: '/assets/images/teachers/caleb.webp',
  },
  {
    id: 'lucy',
    name: 'Lucy',
    role: 'Teacher',
    bio: 'Native English speaker with years of international teaching experience. Creates a warm, supportive environment where every student thrives.',
    image: '/assets/images/teachers/lucy.png',
  },
  {
    id: 'abe',
    name: 'Abe',
    role: 'Teacher',
    bio: 'Enthusiastic teacher who makes every lesson engaging and memorable. Specializes in helping beginners build real confidence quickly.',
    image: '/assets/images/teachers/abe.webp',
  },
]

export default function TeachersPage() {
  const { t } = useI18n()
  const { lang } = useParams()
  const activeLang = lang || 'en'

  const john      = teachers.find(t => t.featured)
  const rest       = teachers.filter(t => !t.featured)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Page hero banner */}
      <div
        className="relative overflow-hidden py-20 sm:py-28 px-6 text-center"
        style={{ backgroundColor: '#7B2D8B' }}
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
          <p className="text-brand-mint text-sm font-bold uppercase tracking-widest mb-3">
            {t.nav.teachers}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Meet Our Team
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Experienced educators from around the world, united by a passion for teaching English.
          </p>
        </div>
      </div>

      {/* Teachers content */}
      <section className="py-16 sm:py-24 w-full">
        <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-12 lg:px-20">

          {/* John — featured hero card */}
          {john && (
            <TeacherCard
              name={john.name}
              role={john.role}
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
                role={teacher.role}
                bio={teacher.bio}
                image={teacher.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gray-50 border-t border-gray-100 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-purple mb-4">
            Ready to find your perfect teacher?
          </h2>
          <p className="text-gray-600 mb-8">
            Book a free trial lesson and see which teaching style fits you best.
          </p>
          <Link
            to={`/${activeLang}/`}
            onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100)}
            className="inline-flex items-center px-8 py-4 rounded-full bg-brand-purple text-white font-brand-button text-lg hover:opacity-90 hover:scale-105 transition-all duration-300"
          >
            Book a Free Trial
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
