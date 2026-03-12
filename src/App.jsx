import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { I18nProvider } from './i18n/index.jsx'
import HomePage from './pages/HomePage'
import TeachersPage from './pages/TeachersPage'
import FAQPage from './pages/FAQPage'

// Wrapper that provides I18nProvider inside the route (so useParams works)
function LangLayout() {
  const { lang } = useParams()
  const validLangs = ['en', 'ru', 'ja']

  if (!validLangs.includes(lang)) {
    return <Navigate to="/en/" replace />
  }

  return (
    <I18nProvider>
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/faq"      element={<FAQPage />} />
        <Route path="*"         element={<Navigate to={`/${lang}/`} replace />} />
      </Routes>
    </I18nProvider>
  )
}

function App() {
  return (
    <Routes>
      {/* Root redirect → /en/ */}
      <Route path="/" element={<Navigate to="/en/" replace />} />

      {/* All language routes */}
      <Route path="/:lang/*" element={<LangLayout />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/en/" replace />} />
    </Routes>
  )
}

export default App
