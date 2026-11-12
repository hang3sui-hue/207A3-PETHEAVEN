import { useState } from 'react'
import { Link } from 'react-router-dom'
import pets from '../data/pets'
import reviews from '../data/reviews'
import { ADOPTION_STEPS, STATS } from '../data/siteInfo'
import usePageTitle from '../hooks/usePageTitle'
import CountUp from '../components/CountUp'
import PetArt from '../components/PetArt'
import PetCard from '../components/PetCard'
import PetDetails from '../components/PetDetails'
import StarRating from '../components/StarRating'

// Newest available pets first, for the "Just arrived" section.
const newestPets = pets
  .filter((p) => p.status === 'Available')
  .sort((a, b) => b.arrived.localeCompare(a.arrived))
  .slice(0, 4)

const heroPets = [pets[0], pets[1], pets[3]]

export default function Home() {
  usePageTitle('')
  const [selectedPet, setSelectedPet] = useState(null)

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <p className="eyebrow">Singapore cat & dog rescue · since 2015</p>
            <h1>
              Every pet deserves a <em>second chance</em>.
            </h1>
            <p className="lead">
              Pet Heaven cares for abandoned cats and dogs until they find a loving home. Adopt a new best friend, or let us help
              when you can no longer keep your pet.
            </p>
            <div className="hero-actions">
              <Link to="/pets" className="btn btn-primary btn-lg">
                Meet our pets
              </Link>
              <Link to="/release" className="btn btn-outline btn-lg">
                I need to release a pet
              </Link>
            </div>
            <p className="hero-note">
              <span className="dot" aria-hidden="true" /> {pets.filter((p) => p.status === 'Available').length} pets are waiting for a
              home right now
            </p>
          </div>

          <div className="hero-art" aria-hidden="true">
            {heroPets.map((pet, i) => (
              <div key={pet.id} className={`hero-bubble bubble-${i + 1}`}>
                <PetArt species={pet.species} art={pet.art} name={pet.name} />
              </div>
            ))}
            <span className="paw paw-1">🐾</span>
            <span className="paw paw-2">🐾</span>
            <span className="heart-float">❤</span>
          </div>
        </div>
      </section>

      <section className="stats-band">
        <div className="container stats-grid">
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <strong>
                <CountUp end={s.value} suffix={s.suffix} />
              </strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Just arrived</p>
              <h2>Pets looking for a home</h2>
            </div>
            <Link to="/pets" className="link-arrow">
              See all {pets.length} pets →
            </Link>
          </div>
          <div className="pet-grid">
            {newestPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} onOpen={setSelectedPet} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-head center">
            <div>
              <p className="eyebrow">How adoption works</p>
              <h2>Four simple steps to bring a pet home</h2>
            </div>
          </div>
          <ol className="steps">
            {ADOPTION_STEPS.map((step, i) => (
              <li key={step.title} className="step">
                <span className="step-num">{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container two-paths">
          <div className="path-card path-adopt">
            <span className="path-icon" aria-hidden="true">🏡</span>
            <h3>Want to adopt?</h3>
            <p>Join as a member for free, choose a pet and send an adoption request. Our staff will call you for a friendly interview.</p>
            <Link to="/pets" className="btn btn-primary">
              Find your pet
            </Link>
          </div>
          <div className="path-card path-release">
            <span className="path-icon" aria-hidden="true">🤝</span>
            <h3>Can't keep your pet?</h3>
            <p>Life changes. Tell us about your pet with the release form and we will help you find the safest next step – no judgement.</p>
            <Link to="/release" className="btn btn-dark">
              Release form
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Happy tails</p>
              <h2>What our members say</h2>
            </div>
            <Link to="/community" className="link-arrow">
              Read all reviews →
            </Link>
          </div>
          <div className="quote-grid">
            {reviews.slice(0, 3).map((r) => (
              <figure key={r.id} className="quote">
                <StarRating value={r.rating} size="sm" />
                <blockquote>“{r.text}”</blockquote>
                <figcaption>
                  {r.name}
                  {r.pet && <span> · adopted {r.pet}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cta-band">
          <div>
            <h2>Become a Pet Heaven supporter</h2>
            <p>Free membership lets you adopt, save favourite pets and share your story with the community.</p>
          </div>
          <Link to="/signup" className="btn btn-light btn-lg">
            Join for free
          </Link>
        </div>
      </section>

      {selectedPet && <PetDetails pet={selectedPet} onClose={() => setSelectedPet(null)} />}
    </>
  )
}
