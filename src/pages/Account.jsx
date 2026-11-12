import { useState } from 'react'
import { Link } from 'react-router-dom'
import pets from '../data/pets'
import usePageTitle from '../hooks/usePageTitle'
import { getRequests } from '../utils/requests'
import MembersOnly from '../components/MembersOnly'
import PageHeader from '../components/PageHeader'
import PetCard from '../components/PetCard'
import PetDetails from '../components/PetDetails'
import StatusBadge from '../components/StatusBadge'
import { useAuth, useFavourites } from '../hooks/useAppContext'

export default function Account() {
  usePageTitle('My Account')
  const { user } = useAuth()
  return (
    <>
      <PageHeader eyebrow="My account" title={user ? `Hello, ${user.name.split(' ')[0]}!` : 'My account'} />
      <section className="section section-tight">
        <div className="container">
          <MembersOnly message="Please log in to see your account.">
            <AccountContent />
          </MembersOnly>
        </div>
      </section>
    </>
  )
}

function AccountContent() {
  const { user } = useAuth()
  const { favourites } = useFavourites()
  const [selectedPet, setSelectedPet] = useState(null)
  const myRequests = getRequests().filter((r) => r.type === 'adopt' && r.details.member === user.email)
  const favouritePets = pets.filter((p) => favourites.includes(p.id))

  return (
    <div className="account-grid">
      <aside className="card profile-card">
        <span className="avatar avatar-lg" aria-hidden="true">
          {user.name.charAt(0)}
        </span>
        <h2 className="h3">{user.name}</h2>
        <p className="soft">{user.email}</p>
        <dl className="facts">
          <div>
            <dt>Membership</dt>
            <dd>{user.plan}</dd>
          </div>
          <div>
            <dt>Member since</dt>
            <dd>{user.joined}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{user.phone}</dd>
          </div>
        </dl>
      </aside>

      <div>
        <h2 className="h3">My adoption requests</h2>
        {myRequests.length ? (
          <ul className="request-list">
            {myRequests.map((r) => (
              <li key={r.id} className="request-row">
                <div>
                  <strong>{r.details.petName}</strong>
                  <span className="soft">
                    {r.id} · sent {new Date(r.sentAt).toLocaleDateString('en-SG')} · visit {r.details.visitDate}
                  </span>
                </div>
                <StatusBadge status={r.status} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="soft">
            No requests yet. <Link to="/pets">Find a pet to adopt →</Link>
          </p>
        )}

        <h2 className="h3" style={{ marginTop: '2rem' }}>
          My favourite pets ({favouritePets.length})
        </h2>
        {favouritePets.length ? (
          <div className="pet-grid">
            {favouritePets.map((pet) => (
              <PetCard key={pet.id} pet={pet} onOpen={setSelectedPet} />
            ))}
          </div>
        ) : (
          <p className="soft">Tap the ♡ on any pet to save it here.</p>
        )}
      </div>
      {selectedPet && <PetDetails pet={selectedPet} onClose={() => setSelectedPet(null)} />}
    </div>
  )
}
