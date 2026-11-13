import { useEffect, useRef, useState } from 'react'
import pets, { formatAge } from '../data/pets'
import PetArt from './PetArt'

// "Can't decide?" – picks a random available pet for the visitor.
// The photos shuffle for a moment (like a slot machine), then one pet is revealed.
// Reusable: the parent passes onOpen to decide what "Meet" does (e.g. open the details modal).
const available = pets.filter((p) => p.status === 'Available')
const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function RandomMatch({ onOpen }) {
  const [type, setType] = useState('Any')
  const [shown, setShown] = useState(null) // pet currently on screen
  const [rolling, setRolling] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearInterval(timer.current), [])

  function roll() {
    const pool = available.filter((p) => type === 'Any' || p.species === type)
    // Avoid giving the same pet twice in a row when there is a choice.
    const choices = pool.length > 1 ? pool.filter((p) => p.id !== shown?.id) : pool
    const winner = choices[Math.floor(Math.random() * choices.length)]

    if (reduceMotion()) {
      setShown(winner)
      return
    }
    setRolling(true)
    let ticks = 0
    clearInterval(timer.current)
    timer.current = setInterval(() => {
      ticks += 1
      setShown(pool[ticks % pool.length])
      if (ticks >= 12) {
        clearInterval(timer.current)
        setShown(winner)
        setRolling(false)
      }
    }, 90)
  }

  return (
    <section className="match" aria-labelledby="match-title">
      <div className="match-text">
        <span className="choice-tag">♥ Can’t decide?</span>
        <h2 id="match-title">Let fate pick your new friend</h2>
        <p>Not sure who to choose? Tap the button and we will match you with one of our pets at random. Maybe it is meant to be.</p>
        <div className="species-tabs small" role="group" aria-label="I would like">
          {['Any', 'Cat', 'Dog'].map((t) => (
            <button key={t} className={type === t ? 'active' : ''} aria-pressed={type === t} onClick={() => setType(t)} disabled={rolling}>
              {t === 'Any' ? 'Cat or dog' : `${t}s`}
            </button>
          ))}
        </div>
        <button className="btn btn-primary btn-lg" onClick={roll} disabled={rolling}>
          {rolling ? 'Finding your match…' : shown ? 'Try again ♥' : 'Match me with a pet ♥'}
        </button>
      </div>

      <div className={`match-card ${rolling ? 'is-rolling' : ''} ${shown && !rolling ? 'is-revealed' : ''}`} aria-live="polite">
        {shown ? (
          <>
            <div className="match-photo">
              <PetArt species={shown.species} name={shown.name} />
            </div>
            {!rolling && (
              <div className="match-info">
                <p className="eyebrow">Your match</p>
                <h3>It’s {shown.name}!</h3>
                <p className="pet-meta">
                  {shown.breed} · {formatAge(shown.age)} · {shown.gender}
                </p>
                <ul className="tags">
                  {shown.personality.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <button className="btn btn-green" onClick={() => onOpen(shown)}>
                  Meet {shown.name} →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="match-empty">
            <span aria-hidden="true">?</span>
            <p>Your match will appear here</p>
          </div>
        )}
      </div>
    </section>
  )
}
