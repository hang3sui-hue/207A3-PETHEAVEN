import { Link } from 'react-router-dom'
import { SITE } from '../data/siteInfo'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand brand-light">
            <Logo size={34} />
            <span>
              Pet <b>Heaven</b>
            </span>
          </Link>
          <p className="footer-text">
            A charity society that rescues abandoned cats and dogs and finds them loving homes. {SITE.tagline}
          </p>
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/pets">Adopt a pet</Link></li>
            <li><Link to="/release">Release a pet</Link></li>
            <li><Link to="/care">Pet care tips</Link></li>
            <li><Link to="/community">Member reviews</Link></li>
          </ul>
        </div>

        <div>
          <h4>About</h4>
          <ul>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/mission">Our mission</Link></li>
            <li><Link to="/contact">Contact & FAQ</Link></li>
            <li><Link to="/signup">Become a member</Link></li>
          </ul>
        </div>

        <div>
          <h4>Visit us</h4>
          <address>
            {SITE.address}
            <br />
            <a href={`tel:${SITE.phoneDigits.replace(/\s/g, '')}`}>{SITE.phone}</a> ({SITE.phoneDigits})
            <br />
            <a href={`mailto:${SITE.adminEmail}`}>{SITE.adminEmail}</a>
          </address>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Pet Heaven Society (fictional charity for ISIT207 Assignment 3)</span>
        <span>
          <Link to="/staff">Staff portal</Link> · Made with React for pets
        </span>
      </div>
      <p className="JHyper">JHyper</p>
    </footer>
  )
}
