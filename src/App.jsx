import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesBar from './components/FeaturesBar'
import WhyUsSection from './components/WhyUsSection'
import AboutSection from './components/AboutSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      {/* Header / Navigation */}
      <Navbar />

      {/* Hero & Features — tightly coupled */}
      <div>
        <HeroSection />
        <FeaturesBar />
      </div>

      {/* Why Us */}
      <WhyUsSection />

      {/* About Our Program */}
      <AboutSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
