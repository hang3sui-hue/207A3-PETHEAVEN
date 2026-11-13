import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { useAuth, useTheme, useToast } from '../hooks/useAppContext'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/pets', label: 'Our Pets' },
  { to: '/care', label: 'Pet Care' },
  { to: '/community', label: 'Community' },
  { to: '/about', label: 'About Us' },
  { to: '/mission', label: 'Mission' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const showToast = useToast()
  const navigate = useNavigate()

  // Add a shadow to the header after the user scrolls down.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleLogout() {
    logout()
    showToast('You have logged out. See you soon!', 'info')
    navigate('/')
  }

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-bar">
        <Link to="/" className="brand" aria-label="Pet Heaven home">
          <Logo />
          <span>
            Pet <b>Heaven</b>
          </span>
        </Link>

        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Close the mobile menu when any link inside it is clicked */}
        <nav
          id="main-menu"
          className={`main-nav ${menuOpen ? 'open' : ''}`}
          aria-label="Main menu"
          onClick={(e) => e.target.closest('a') && setMenuOpen(false)}
        >
          <ul>
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <Link to="/release" className="btn btn-outline btn-sm">
              Release a Pet
            </Link>
            {user ? (
              <div className="user-chip">
                {user.role === 'staff' ? (
                  <Link to="/staff" className="btn btn-dark btn-sm">
                    Staff Inbox
                  </Link>
                ) : (
                  <Link to="/account" className="avatar" title="My account">
                    {user.name.charAt(0)}
                  </Link>
                )}
                <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                  Log out
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm">
                Log in / Join
              </Link>
            )}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
