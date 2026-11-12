import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <section className="section">
      <div className="container narrow empty-state">
        <p className="empty-icon" aria-hidden="true">🐾</p>
        <h1>Oops! This page ran away.</h1>
        <p>We could not find the page you were looking for.</p>
        <Link to="/" className="btn btn-primary">
          Go back home
        </Link>
      </div>
    </section>
  )
}
