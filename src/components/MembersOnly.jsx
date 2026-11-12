import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAppContext'

// Wraps content that only members can use (adoption form, writing a review).
// Visitors who are not logged in see a friendly message with Log in / Sign up buttons.
// After logging in, they are sent back to the page they came from.
export default function MembersOnly({ children, message }) {
  const { user } = useAuth()
  const location = useLocation()

  if (user) return children

  const from = location.pathname + location.search
  return (
    <div className="members-only">
      <div className="members-only-icon" aria-hidden="true">
        🔒
      </div>
      <h3>Members only</h3>
      <p>{message}</p>
      <div className="success-actions">
        <Link to="/login" state={{ from }} className="btn btn-primary">
          Log in
        </Link>
        <Link to="/signup" state={{ from }} className="btn btn-outline">
          Join for free
        </Link>
      </div>
    </div>
  )
}
