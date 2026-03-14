import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { I18nProvider } from './i18n/index.jsx'
import HomePage from './pages/HomePage'
import TeachersPage from './pages/TeachersPage'
import FAQPage from './pages/FAQPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Wrapper that provides I18nProvider inside the route (so useParams works)
function LangLayout() {
  const { lang } = useParams()
  const location = useLocation()
  const validLangs = ['en', 'ru', 'ja', 'zh']

  if (!validLangs.includes(lang)) {
    return <Navigate to="/en/" replace />
  }

  return (
    <I18nProvider>
      <div className="flex flex-col min-h-screen">
        {/* Persistent Navbar outside AnimatePresence */}
        <Navbar />
        
        <main className="flex-grow">
          {/* AnimatePresence for smooth route transitions */}
          <AnimatePresence 
            mode="wait"
            onExitComplete={() => {
              // 1. Check if the URL we just navigated to has a #hash (e.g., #contact)
              const hash = window.location.hash;

              if (hash) {
                // 2. If it DOES have a hash, wait a tiny fraction of a second 
                // for Framer Motion to actually render the new page into the DOM
                setTimeout(() => {
                  const element = document.querySelector(hash);
                  if (element) {
                    // Scroll smoothly to the specific section
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100); 
              } else {
                // 3. If it's a normal page link (no hash), just snap to the top
                window.scrollTo({ top: 0 });
              }
            }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/"         element={<HomePage />} />
              <Route path="/teachers" element={<TeachersPage />} />
              <Route path="/faq"      element={<FAQPage />} />
              <Route path="*"         element={<Navigate to={`/${lang}/`} replace />} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Persistent Footer outside AnimatePresence */}
        <Footer />
      </div>
    </I18nProvider>
  )
}

function App() {
  const location = useLocation()
  const lang = location.pathname.split('/')[1] || 'en'

  return (
    <Routes>
      {/* Root redirect → /en/ */}
      <Route path="/" element={<Navigate to="/en/" replace />} />

      {/* All language routes — keying by lang ensures fresh layout when language changes */}
      <Route path="/:lang/*" element={<LangLayout key={lang} />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/en/" replace />} />
    </Routes>
  )
}

export default App
