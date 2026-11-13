import { useState } from 'react'
import { Link } from 'react-router-dom'
import pets from '../data/pets'
import reviews from '../data/reviews'
import usePageTitle from '../hooks/usePageTitle'
import { img } from '../utils/images'
import PetCard from '../components/PetCard'
import PetDetails from '../components/PetDetails'

// Home page in a streetwear "lookbook" style:
// big wordmark, a running ticker, pets shown as numbered looks, and a split adopt / release banner.

const available = pets.filter((p) => p.status === 'Available')
const lookbook = [...available].sort((a, b) => b.arrived.localeCompare(a.arrived)).slice(0, 6)
const newestId = lookbook[0]?.id
const quote = reviews[0]

const TICKER = ['Adopt, don’t shop', 'Every pet deserves a home', 'No pet left behind', 'Loved since 2015', 'Kindness is free']

export default function Home() {
  usePageTitle('')
  const [selectedPet, setSelectedPet] = useState(null)

  return (
    <>
      <section className="street-hero">
        <div className="container">
          <div className="street-hero-top">
            <span>Cat & dog rescue / Singapore</span>
            <span>{available.length} pets are waiting for a family</span>
          </div>
          <div className="home-hero-grid">
            <div>
              <h1 className="wordmark">
                Pet
                <br />
                Heaven<span className="wordmark-dot">♥</span>
              </h1>
              <p className="home-hero-text">
                We look after abandoned cats and dogs with love, until each one finds a family of its own. Come meet them, or let us
                help when you can no longer care for yours. No judgement, only kindness.
              </p>
              <div className="street-actions">
                <Link to="/pets" className="btn btn-primary btn-lg">
                  Meet our pets
                </Link>
                <Link to="/release" className="btn btn-outline btn-lg">
                  Release a pet
                </Link>
              </div>
            </div>
            <figure className="home-hero-photo">
              <img src={img('hero/home-hero.jpg')} alt="A golden dog and a ginger cat resting together on a cream sofa" />
              <figcaption>
                <span aria-hidden="true">♥</span> Best friends, both adopted from Pet Heaven
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i}>
              {t} <b>♥</b>
            </span>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="look-head">
            <h2>
              Waiting
              <br />
              for you
            </h2>
            <p>
              Each of them was once left behind. Our vet has checked every one, and they are ready to love again. Tap a pet to read their story.
            </p>
            <Link to="/pets" className="link-arrow">
              Meet all {pets.length} pets →
            </Link>
          </div>
          <div className="pet-grid lookbook">
            {lookbook.map((pet, i) => (
              <PetCard key={pet.id} pet={pet} look={i + 1} isNew={pet.id === newestId} onOpen={setSelectedPet} />
            ))}
          </div>
        </div>
      </section>

      <section className="split">
        <Link to="/pets" className="split-panel split-adopt">
          <span className="split-label">01 / Adopt</span>
          <strong>Give a pet a home.</strong>
          <span className="split-text">Join for free, choose a pet and send the form. Our staff will call you for a friendly chat.</span>
          <span className="split-go">Find your pet →</span>
        </Link>
        <Link to="/release" className="split-panel split-release">
          <span className="split-label">02 / Release</span>
          <strong>Can’t keep your pet?</strong>
          <span className="split-text">Life changes. Tell us about your pet and we will find the safest, kindest next step together.</span>
          <span className="split-go">Release form →</span>
        </Link>
      </section>

      <section className="section">
        <div className="container street-quote">
          <span className="sticker sticker-green">Happy tails</span>
          <blockquote>“{quote.text}”</blockquote>
          <p className="street-quote-by">
            {quote.name} / adopted {quote.pet}
          </p>
          <Link to="/community" className="link-arrow">
            Read all reviews →
          </Link>
        </div>
      </section>

      {selectedPet && <PetDetails pet={selectedPet} onClose={() => setSelectedPet(null)} />}
    </>
  )
}
