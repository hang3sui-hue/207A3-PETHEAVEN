import { useState } from 'react'
import { Link } from 'react-router-dom'
import pets from '../data/pets'
import reviews from '../data/reviews'
import usePageTitle from '../hooks/usePageTitle'
import PetCard from '../components/PetCard'
import PetDetails from '../components/PetDetails'

// Home page in a streetwear "lookbook" style:
// big wordmark, a running ticker, pets shown as numbered looks, and a split adopt / release banner.

const available = pets.filter((p) => p.status === 'Available')
const lookbook = [...available].sort((a, b) => b.arrived.localeCompare(a.arrived)).slice(0, 6)
const newestId = lookbook[0]?.id
const quote = reviews[0]

const TICKER = ['Adopt, don’t shop', 'Rescue club Singapore', 'No pet left behind', 'Est. 2015', 'Free membership']

export default function Home() {
  usePageTitle('')
  const [selectedPet, setSelectedPet] = useState(null)

  return (
    <>
      <section className="street-hero">
        <div className="container">
          <div className="street-hero-top">
            <span>Rescue club / Singapore</span>
            <span>Drop 11 / {available.length} looks available</span>
          </div>
          <h1 className="wordmark">
            Pet
            <br />
            Heaven<span className="wordmark-dot">.</span>
          </h1>
          <div className="street-hero-bottom">
            <p>
              Abandoned cats and dogs, cared for until they go home. Pick your new best friend, or hand yours over when life
              changes. No judgement.
            </p>
            <div className="street-actions">
              <Link to="/pets" className="btn btn-primary btn-lg">
                View the lookbook
              </Link>
              <Link to="/release" className="btn btn-outline btn-lg">
                Release a pet
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i}>
              {t} <b>✦</b>
            </span>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="look-head">
            <h2>
              FW26
              <br />
              Lookbook
            </h2>
            <p>
              Every look is a real rescue, checked by our vet and ready to go home. Tap a look to see the full story.
            </p>
            <Link to="/pets" className="link-arrow">
              All {pets.length} looks →
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
          <strong>Take one home.</strong>
          <span className="split-text">Join free, pick a look, send the form. We call you for a chat.</span>
          <span className="split-go">Find your pet →</span>
        </Link>
        <Link to="/release" className="split-panel split-release">
          <span className="split-label">02 / Release</span>
          <strong>Can’t keep yours?</strong>
          <span className="split-text">Tell us about your pet. We find the safest next step together.</span>
          <span className="split-go">Release form →</span>
        </Link>
      </section>

      <section className="section">
        <div className="container street-quote">
          <span className="sticker sticker-green">Word on the street</span>
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
