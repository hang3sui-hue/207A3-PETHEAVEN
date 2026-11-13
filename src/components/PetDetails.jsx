import { Link } from 'react-router-dom'
import { formatAge, getAgeGroup, statusLabel } from '../data/pets'
import Modal from './Modal'
import PetArt from './PetArt'
import { useFavourites } from '../hooks/useAppContext'

// The detail view of one pet, shown inside the reusable Modal.
export default function PetDetails({ pet, onClose }) {
  const { isFavourite, toggleFavourite } = useFavourites()
  const saved = isFavourite(pet.id)

  const facts = [
    ['Breed', pet.breed],
    ['Age', `${formatAge(pet.age)} (${getAgeGroup(pet.age)})`],
    ['Gender', pet.gender],
    ['Size', pet.size],
    ['Colour', pet.colour],
    ['With us since', new Date(pet.arrived).toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' })],
  ]
  const health = [
    ['Vaccinated', pet.health.vaccinated],
    ['Sterilised', pet.health.sterilised],
    ['Microchipped', pet.health.microchipped],
  ]

  return (
    <Modal title={`${pet.name} details`} onClose={onClose}>
      <div className="pet-details">
        <div className="pet-details-art" style={{ background: pet.art.bg }}>
          <PetArt species={pet.species} art={pet.art} name={pet.name} cover />
        </div>
        <div className="pet-details-info">
          <p className="eyebrow">{pet.species} · {statusLabel(pet.status)}</p>
          <h2>Hi, I'm {pet.name}!</h2>
          <p>{pet.story}</p>

          <dl className="facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <h4>Personality</h4>
          <ul className="tags">
            {pet.personality.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <h4>Good with</h4>
          <ul className="tags tags-green">
            {pet.goodWith.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <h4>Health</h4>
          <ul className="health-list">
            {health.map(([label, done]) => (
              <li key={label} className={done ? 'done' : 'todo'}>
                {done ? '✓' : '…'} {label}
                {!done && ' (before going home)'}
              </li>
            ))}
          </ul>

          <div className="modal-actions">
            {pet.status === 'Memorial' ? (
              <p className="memorial-note">♥ Forever in our hearts. Thank you for loving {pet.name}.</p>
            ) : pet.status === 'Available' ? (
              <Link to={`/adopt?pet=${pet.id}`} className="btn btn-primary">
                Adopt {pet.name}
              </Link>
            ) : (
              <span className="btn btn-disabled" aria-disabled="true">
                Meeting a family right now
              </span>
            )}
            <button className="btn btn-outline" onClick={() => toggleFavourite(pet)}>
              {saved ? '♥ Saved' : '♡ Save'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
