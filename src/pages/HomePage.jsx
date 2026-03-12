import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import FeaturesBar from '../components/FeaturesBar'
import WhyUsSection from '../components/WhyUsSection'
import StatementBanner from '../components/StatementBanner'
import AboutSection from '../components/AboutSection'
import TestimonialsSection from '../components/TestimonialsSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function HomePage() {
  const location = useLocation()

  // If navigated here from another page with a scrollTo state (e.g. clicking
  // "Why Us" from the Teachers page), scroll to that section after mount.
  useEffect(() => {
    const target = location.state?.scrollTo
    if (!target) return

    // Small delay to allow the page to fully render before scrolling
    const id = setTimeout(() => {
      const el = document.getElementById(target)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // Clear the state so a back-navigation doesn't re-trigger the scroll
        window.history.replaceState({}, '', window.location.pathname)
      }
    }, 120)

    return () => clearTimeout(id)
  }, [location.state])

  return (
    <div className="min-h-screen relative">
      <Navbar />
      
      {/* Sentinel for Navbar scroll state */}
      <div id="scroll-sentinel" className="absolute top-0 left-0 w-px h-px pointer-events-none" aria-hidden="true" />

      <div>
        <HeroSection />
        <FeaturesBar />
      </div>

      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 1000px' }}>
        <WhyUsSection />
      </div>

      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 250px' }}>
        <StatementBanner />
      </div>

      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}>
        <AboutSection />
      </div>

      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}>
        <TestimonialsSection />
      </div>

      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 1000px' }}>
        <ContactSection />
      </div>

      <Footer />
    </div>
  )
}
