import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesBar from './components/FeaturesBar'

function App() {
  return (
    <div className="min-h-screen">
      {/* Header / Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Bar */}
      <FeaturesBar />

      {/* Placeholder for remaining sections */}
      <div className="py-24 bg-white text-center">
        <p className="text-gray-400 text-lg font-medium">
          More sections coming soon...
        </p>
      </div>
    </div>
  )
}

export default App
