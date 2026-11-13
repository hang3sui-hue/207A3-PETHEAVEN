import { img } from '../utils/images'

// Shared layout for the Log in and Sign up pages: a picture on one side, the form on the other.
export default function AuthLayout({ title, text, children }) {
  return (
    <section className="auth-page">
      <div className="container auth-card">
        <div className="auth-side" aria-hidden="true">
          <img className="auth-img" src={img('pages/auth.jpg')} alt="" />
          <p>Members can adopt pets, save favourites and share reviews with the Pet Heaven community.</p>
        </div>
        <div className="auth-main">
          <h1>{title}</h1>
          <p className="soft">{text}</p>
          {children}
        </div>
      </div>
    </section>
  )
}
