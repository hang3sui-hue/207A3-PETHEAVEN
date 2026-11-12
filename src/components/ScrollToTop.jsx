import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// In a single page app the browser does not reload, so we scroll to the top
// ourselves every time the route changes.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
