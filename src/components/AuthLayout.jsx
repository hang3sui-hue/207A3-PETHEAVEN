import pets from '../data/pets'
import PetArt from './PetArt'

// Shared layout for the Log in and Sign up pages: a picture on one side, the form on the other.
export default function AuthLayout({ title, text, children }) {
  const [dog, cat] = [pets[8], pets[1]]
  return (
    <section className="auth-page">
      <div className="container auth-card">
        <div className="auth-side" aria-hidden="true">
          <div className="auth-pets">
            <PetArt species={dog.species} art={dog.art} name={dog.name} />
            <PetArt species={cat.species} art={cat.art} name={cat.name} />
          </div>
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
