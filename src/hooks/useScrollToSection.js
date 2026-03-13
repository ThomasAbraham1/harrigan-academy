import { useCallback } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

/**
 * Hook to handle scrolling to a section on the home page.
 * If not on the home page, it navigates home first and passes the section ID
 * via router state so the HomePage can scroll to it after mounting.
 */
export function useScrollToSection() {
  const navigate   = useNavigate()
  const { lang }   = useParams()
  const activeLang = lang || 'en'
  const location   = useLocation()

  return useCallback((sectionId, isMobile = false) => {
    const isHome = location.pathname === `/${activeLang}/` ||
                   location.pathname === `/${activeLang}`
    
    if (isHome) {
      // If mobile, wait for drawer to close before calculation to avoid offset errors
      const delay = isMobile ? 350 : 0 
      
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          // Clear any hash/state without full reload
          window.history.replaceState(null, '', window.location.pathname)
        }
      }, delay)
    } else {
      // Navigate home and pass the target section in router state
      navigate(`/${activeLang}/`, { state: { scrollTo: sectionId } })
    }
  }, [navigate, activeLang, location.pathname])
}
