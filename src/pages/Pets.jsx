import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import pets, { findPet, getAgeGroup } from '../data/pets'
import usePageTitle from '../hooks/usePageTitle'
import PageHeader from '../components/PageHeader'
import RandomMatch from '../components/RandomMatch'
import PetCard from '../components/PetCard'
import PetDetails from '../components/PetDetails'
import { useFavourites } from '../hooks/useAppContext'
import { img } from '../utils/images'

const EMPTY_FILTERS = { search: '', species: 'All', age: 'All', size: 'All', gender: 'All', kids: false, favourites: false, sort: 'newest' }

const SORTS = {
  newest: (a, b) => b.arrived.localeCompare(a.arrived),
  longest: (a, b) => a.arrived.localeCompare(b.arrived),
  name: (a, b) => a.name.localeCompare(b.name),
  youngest: (a, b) => a.age - b.age,
}

export default function Pets() {
  usePageTitle('Our Pets')
  const [searchParams] = useSearchParams()
  // The quiz on the Pet Care page can link here with ?species=Cat
  const [filters, setFilters] = useState({ ...EMPTY_FILTERS, species: searchParams.get('species') || 'All' })
  const [selectedPet, setSelectedPet] = useState(() => findPet(searchParams.get('pet')) || null)
  const { favourites } = useFavourites()

  function update(event) {
    const { name, type, value, checked } = event.target
    setFilters({ ...filters, [name]: type === 'checkbox' ? checked : value })
  }

  // Filter and sort the pets every time a filter changes.
  const results = useMemo(() => {
    const text = filters.search.trim().toLowerCase()
    return pets
      .filter((p) => !text || `${p.name} ${p.breed} ${p.colour} ${p.personality.join(' ')}`.toLowerCase().includes(text))
      .filter((p) => filters.species === 'All' || p.species === filters.species)
      .filter((p) => filters.age === 'All' || getAgeGroup(p.age) === filters.age)
      .filter((p) => filters.size === 'All' || p.size === filters.size)
      .filter((p) => filters.gender === 'All' || p.gender === filters.gender)
      .filter((p) => !filters.kids || p.goodWith.includes('Kids'))
      .filter((p) => !filters.favourites || favourites.includes(p.id))
      .sort(SORTS[filters.sort])
      // pets we remember are always shown last
      .sort((a, b) => (a.status === 'Memorial') - (b.status === 'Memorial'))
  }, [filters, favourites])

  const activeFilters = JSON.stringify(filters) !== JSON.stringify(EMPTY_FILTERS)

  return (
    <>
      <PageHeader image={img('hero/home-hero.jpg')}
        eyebrow="Adopt"
        title="Meet our cats and dogs"
        text="Every pet is vaccinated, health-checked and waiting for a family. Click a pet to read its story."
      />

      <section className="section section-tight">
        <div className="container">
          <form className="filter-bar" onSubmit={(e) => e.preventDefault()} role="search" aria-label="Search and filter pets">
            <div className="species-tabs" role="group" aria-label="Type of pet">
              {['All', 'Dog', 'Cat'].map((s) => (
                <button
                  key={s}
                  type="button"
                  className={filters.species === s ? 'active' : ''}
                  aria-pressed={filters.species === s}
                  onClick={() => setFilters({ ...filters, species: s })}
                >
                  {s === 'All' ? 'All' : s === 'Dog' ? 'Dogs' : 'Cats'}
                </button>
              ))}
            </div>

            <div className="filter-row">
              <label className="search-box">
                <span className="sr-only">Search pets</span>
                <input name="search" type="search" placeholder="Search by name, breed or trait…" value={filters.search} onChange={update} />
              </label>
              <label>
                <span>Age</span>
                <select name="age" value={filters.age} onChange={update}>
                  <option value="All">Any age</option>
                  <option value="Young">Young (under 2)</option>
                  <option value="Adult">Adult (2–6)</option>
                  <option value="Senior">Senior (7+)</option>
                </select>
              </label>
              <label>
                <span>Size</span>
                <select name="size" value={filters.size} onChange={update}>
                  <option value="All">Any size</option>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </label>
              <label>
                <span>Gender</span>
                <select name="gender" value={filters.gender} onChange={update}>
                  <option value="All">Any</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </label>
              <label>
                <span>Sort by</span>
                <select name="sort" value={filters.sort} onChange={update}>
                  <option value="newest">Newest arrivals</option>
                  <option value="longest">Waiting longest</option>
                  <option value="name">Name A–Z</option>
                  <option value="youngest">Youngest first</option>
                </select>
              </label>
            </div>

            <div className="filter-row filter-checks">
              <label className="check">
                <input type="checkbox" name="kids" checked={filters.kids} onChange={update} /> Good with kids
              </label>
              <label className="check">
                <input type="checkbox" name="favourites" checked={filters.favourites} onChange={update} /> My favourites (
                {favourites.length})
              </label>
              <span className="result-count" aria-live="polite">
                Showing <strong>{results.length}</strong> of {pets.length} pets
              </span>
              {activeFilters && (
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setFilters(EMPTY_FILTERS)}>
                  Clear filters
                </button>
              )}
            </div>
          </form>

          {results.length > 0 ? (
            <div className="pet-grid">
              {results.map((pet) => (
                <PetCard key={pet.id} pet={pet} onOpen={setSelectedPet} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-icon" aria-hidden="true">0</p>
              <h3>No pets match your search</h3>
              <p>Try removing a filter. New pets arrive every week!</p>
              <button className="btn btn-primary" onClick={() => setFilters(EMPTY_FILTERS)}>
                Show all pets
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <RandomMatch onOpen={setSelectedPet} />
        </div>
      </section>

      {selectedPet && <PetDetails pet={selectedPet} onClose={() => setSelectedPet(null)} />}
    </>
  )
}
