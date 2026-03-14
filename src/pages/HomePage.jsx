import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import PageWrapper from '../components/PageWrapper'
import HeroSection from '../components/HeroSection'
import FeaturesBar from '../components/FeaturesBar'
import WhyUsSection from '../components/WhyUsSection'
import StatementBanner from '../components/StatementBanner'
import AboutSection from '../components/AboutSection'
import TestimonialsSection from '../components/TestimonialsSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <PageWrapper>
      <div>
        <HeroSection />
        <FeaturesBar />
      </div>
      <WhyUsSection />
      <StatementBanner />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </PageWrapper>
  )
}
