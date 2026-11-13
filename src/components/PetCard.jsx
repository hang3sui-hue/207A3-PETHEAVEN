import { formatAge } from '../data/pets'
import PetArt from './PetArt'
import { useFavourites } from '../hooks/useAppContext'

// One pet in the list. Reused on the Home page and the Our Pets page.
// "onOpen" is passed in by the parent, so the parent decides what happens on click.
export default function PetCard({ pet, onOpen, look, isNew }) {
  const { isFavourite, toggleFavourite } = useFavourites()
  const saved = isFavourite(pet.id)

  return (
    <article className="pet-card">
      <button className="pet-card-main" onClick={() => onOpen(pet)} aria-label={`See details of ${pet.name}`}>
        <div className="pet-card-art">
          <PetArt species={pet.species} art={pet.art} name={pet.name} />
          <span className={`status-badge ${pet.status === 'Reserved' ? 'reserved' : ''}`}>{pet.status}</span>
          {isNew && <span className="sticker sticker-new">New in</span>}
        </div>
        <div className="pet-card-body">
          {look && <p className="look-no">Look {String(look).padStart(2, '0')}</p>}
          <h3>{pet.name}</h3>
          <p className="pet-meta">
            {pet.gender} · {formatAge(pet.age)} · {pet.size}
          </p>
          <p className="pet-breed">{pet.breed}</p>
          <ul className="tags">
            {pet.personality.slice(0, 2).map((trait) => (
              <li key={trait}>{trait}</li>
            ))}
          </ul>
        </div>
      </button>
      <button
        className={`heart ${saved ? 'saved' : ''}`}
        onClick={() => toggleFavourite(pet)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${pet.name} from favourites` : `Save ${pet.name} to favourites`}
      >
        {saved ? '♥' : '♡'}
      </button>
    </article>
  )
}
