import pets from '../data/pets'
import { petPhoto } from '../utils/images'

// Photo of a pet. Every page that shows a pet uses this one component.
// If a photo is missing, a soft placeholder with the pet's name is shown instead.
export default function PetArt({ species, name, cover = false }) {
  const pet = pets.find((p) => p.name === name)
  if (!pet) {
    return (
      <div className={`photo-slot ${cover ? 'photo-slot-cover' : ''}`} role="img" aria-label={`Photo of ${name}, coming soon`}>
        <span className="photo-slot-heart" aria-hidden="true">♥</span>
        <span className="photo-slot-name">{name}</span>
        <span className="photo-slot-note">{species} photo coming soon</span>
      </div>
    )
  }
  return (
    <img
      className={`pet-photo ${cover ? 'pet-photo-cover' : ''}`}
      src={petPhoto(pet)}
      alt={`${name}, a ${pet.breed.toLowerCase()} ${species.toLowerCase()} at Pet Heaven`}
      loading="lazy"
      decoding="async"
    />
  )
}
