// Photo slot for a pet. Real photos are not ready yet, so this shows a
// clear text placeholder (pet name + type). When the photo files are added,
// only this one component needs to change – every page that shows a pet uses it.
export default function PetArt({ species, name, cover = false }) {
  return (
    <div className={`photo-slot ${cover ? 'photo-slot-cover' : ''}`} role="img" aria-label={`Photo of ${name}, coming soon`}>
      <span className="photo-slot-heart" aria-hidden="true">♥</span>
      <span className="photo-slot-name">{name}</span>
      <span className="photo-slot-note">
        {species} photo coming soon
      </span>
    </div>
  )
}
