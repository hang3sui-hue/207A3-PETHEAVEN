import { useState } from 'react'
import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import { getRequests, updateRequestStatus } from '../utils/requests'
import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'
import { useAuth } from '../hooks/useAppContext'

// The administrator's inbox: every form sent on the website arrives here.
// Staff follow up each request: call the person, interview them, then approve or close it.

const TYPES = { all: 'All', adopt: 'Adoption', release: 'Release', contact: 'Messages' }
const STATUSES = ['New', 'Interview booked', 'Approved', 'Closed']
const TITLE_FIELD = { adopt: 'petName', release: 'petName', contact: 'topic' }
const NAME_FIELD = { adopt: 'fullName', release: 'ownerName', contact: 'name' }

export default function Staff() {
  usePageTitle('Staff Inbox')
  const { user } = useAuth()

  if (user?.role !== 'staff') {
    return (
      <section className="section">
        <div className="container narrow members-only">
          <div className="members-only-icon" aria-hidden="true">
            Staff only
          </div>
          <h3>Staff only</h3>
          <p>This page is for Pet Heaven staff. Please log in with a staff account.</p>
          <Link to="/login" state={{ from: '/staff' }} className="btn btn-primary">
            Staff log in
          </Link>
        </div>
      </section>
    )
  }
  return <Inbox />
}

function Inbox() {
  const [requests, setRequests] = useState(getRequests)
  const [type, setType] = useState('all')
  const [openId, setOpenId] = useState(null)

  const shown = requests.filter((r) => type === 'all' || r.type === type)
  const count = (t) => requests.filter((r) => (t === 'all' || r.type === t) && r.status === 'New').length

  return (
    <>
      <PageHeader eyebrow="Staff" title="Admin inbox" text="All adoption requests, release requests and messages sent from the website." />
      <section className="section section-tight">
        <div className="container">
          <div className="species-tabs" role="group" aria-label="Request type">
            {Object.entries(TYPES).map(([key, label]) => (
              <button key={key} className={type === key ? 'active' : ''} aria-pressed={type === key} onClick={() => setType(key)}>
                {label}
                {count(key) > 0 && <span className="count-dot">{count(key)}</span>}
              </button>
            ))}
          </div>

          {shown.length === 0 ? (
            <div className="empty-state">
              <p className="empty-icon" aria-hidden="true">0</p>
              <h3>No requests yet</h3>
              <p>Forms sent from the Adopt, Release and Contact pages will appear here.</p>
            </div>
          ) : (
            <ul className="request-list inbox">
              {shown.map((r) => (
                <li key={r.id} className={`request-row ${openId === r.id ? 'open' : ''}`}>
                  <button className="request-summary" onClick={() => setOpenId(openId === r.id ? null : r.id)} aria-expanded={openId === r.id}>
                    <span className={`type-pill type-${r.type}`}>{TYPES[r.type]}</span>
                    <span className="request-title">
                      <strong>{r.details[TITLE_FIELD[r.type]]}</strong>
                      <span className="soft">
                        from {r.details[NAME_FIELD[r.type]]} · {r.id} · {new Date(r.sentAt).toLocaleString('en-SG', { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                    </span>
                    <StatusBadge status={r.status} />
                  </button>
                  {openId === r.id && (
                    <div className="request-details">
                      <dl className="facts">
                        {Object.entries(r.details)
                          .filter(([, value]) => value !== '' && typeof value !== 'boolean')
                          .map(([key, value]) => (
                            <div key={key}>
                              <dt>{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</dt>
                              <dd>{value}</dd>
                            </div>
                          ))}
                      </dl>
                      <label className="inline-select">
                        Update status{' '}
                        <select value={r.status} onChange={(e) => setRequests(updateRequestStatus(r.id, e.target.value))}>
                          {STATUSES.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
