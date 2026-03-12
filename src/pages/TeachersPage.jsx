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
    bio: 'John Harrigan is the founder of Harrigan Academy and brings over 30 years of experience teaching languages around the world. Having lived and worked across multiple cultures, he is passionate about helping students build confidence in speaking English while developing a deeper appreciation for language and communication.',
    image: '/assets/images/teachers/john.webp',
    featured: true,
  },
  {
    id: 'keiko',
    name: 'Keiko Harrigan',
    role: 'Teacher',
    bio: 'Keiko Harrigan has more than 15 years of experience teaching students of different ages and backgrounds. Her lessons focus on building strong language foundations while helping students feel comfortable expressing themselves in English.',
    image: '/assets/images/teachers/keiko.webp',
  },
  {
    id: 'ema',
    name: 'Ema Ito',
    role: 'Teacher',
    bio: 'Ema Ito focuses on helping students strengthen their English through structured learning and clear communication practice. She supports learners in developing confidence while improving both written and spoken English.\nSpecializations: Essay Writing, Grammar, TOEIC Preparation, IELTS Preparation',
    image: '/assets/images/teachers/ema.webp',
  },
  // {
  //   id: 'elizabeth',
  //   name: 'Elizabeth Crawford',
  //   role: 'Teacher',
  //   bio: 'Elizabeth Crawford has over 25 years of experience teaching languages to children, teenagers, and adults. Her teaching style focuses on creating an engaging and supportive learning environment where students feel comfortable practicing and improving their English.\n\nShe enjoys helping learners connect language with culture, making lessons both meaningful and memorable.',
  //   image: '/assets/images/teachers/elizabeth.webp',
  // },
  {
    id: 'naomi',
    name: 'Naomi Aoki',
    role: 'Teacher',
    bio: 'Naomi Aoki has several years of experience teaching English to students from different cultural backgrounds. She enjoys helping learners expand their language abilities while building the confidence needed to communicate effectively.',
    image: '/assets/images/teachers/naomi.webp',
  },
  {
    id: 'caleb',
    name: 'Caleb',
    role: 'Teacher',
    bio: 'Caleb focuses on helping students develop clear communication skills through practical English usage. His teaching style emphasizes conversation, active participation, and building confidence in everyday speaking situations.',
    image: '/assets/images/teachers/caleb.webp',
  },
  // {
  //   id: 'hiromi',
  //   name: 'Hiromi',
  //   role: 'Teacher',
  //   bio: 'Hiromi believes that education has the power to open doors and create new opportunities for students. Her teaching approach focuses on helping learners discover their potential while developing the confidence to use English in real-life situations.\n\nShe encourages students to stay curious, motivated, and open to learning new skills.',
  //   image: '/assets/images/teachers/hiromi.webp',
  // },
  {
    id: 'lucy',
    name: 'Lucy',
    role: 'Teacher',
    bio: 'Lucy, our Chinese language teacher, brings an international perspective to her teaching and enjoys introducing students to language through cultural understanding. Her lessons combine structured language practice with engaging activities that help students develop communication skills.',
    image: '/assets/images/teachers/lucy.webp',
  },
  {
    id: 'abe',
    name: 'Abe',
    role: 'Teacher',
    bio: 'Abe enjoys helping students improve their English in a relaxed and encouraging learning environment. His lessons focus on building confidence through conversation practice and interactive activities.',
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
        style={{ backgroundColor: '#904ba2' }}
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
          <p className="text-white text-sm font-montserrat font-bold uppercase tracking-widest mb-3">
            {activeLang === 'en' ? 'Our Teachers' : t.nav.teachers}
          </p>
          <h1 className="text-hero-h font-antique font-hero-h text-white leading-tight mb-4">
            Meet Our Team
          </h1>
          <p className="text-white/80 font-montserrat font-hero-p text-hero-p max-w-xl mx-auto">
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
      </section>

      <Footer />
    </div>
  )
}
