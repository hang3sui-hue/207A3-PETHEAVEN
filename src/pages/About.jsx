import { Link } from 'react-router-dom'
import { FACILITIES, SITE, TEAM } from '../data/siteInfo'
import usePageTitle from '../hooks/usePageTitle'
import PageHeader from '../components/PageHeader'
import { img, teamPhoto } from '../utils/images'

export default function About() {
  usePageTitle('About Us')
  return (
    <>
      <PageHeader image={img('pages/about.jpg')}
        eyebrow="About us"
        title="A safe place between homes"
        text="Pet Heaven is a volunteer-run charity society in Singapore. We take in cats and dogs whose owners can no longer keep them, and we find each one a new family."
      />

      <section className="section section-tight">
        <div className="container about-intro">
          <div>
            <h2>Our story</h2>
            <p>
              Pet Heaven started in 2015, when a small group of neighbours began caring for dogs left behind at an old kampung. Today we
              are a registered charity with a shelter in the east of Singapore, 12 staff and more than 300 volunteers.
            </p>
            <p>
              Every pet that arrives gets a health check, vaccinations, sterilisation and a microchip. Our staff learn each pet's
              personality, so we can match it with the right family. When someone sends an adoption request online, our team calls
              them, holds a friendly interview, and arranges a visit.
            </p>
            <Link to="/mission" className="link-arrow">
              Read our mission and values →
            </Link>
          </div>
          <div className="info-card">
            <h3>Visit the shelter</h3>
            <p>{SITE.address}</p>
            <table className="hours">
              <tbody>
                {SITE.hours.map((h) => (
                  <tr key={h.days}>
                    <th scope="row">{h.days}</th>
                    <td>{h.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/contact" className="btn btn-primary btn-sm">
              Get directions & contact
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-head center">
            <div>
              <p className="eyebrow">Facilities</p>
              <h2>What we have for our pets</h2>
            </div>
          </div>
          <div className="feature-grid">
            {FACILITIES.map((f, i) => (
              <div key={f.title} className="feature feature-photo">
                <img src={img(`facilities/${f.photo}.jpg`)} alt={f.title} loading="lazy" />
                <span className="feature-icon" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <div>
              <p className="eyebrow">Our team</p>
              <h2>The people behind Pet Heaven</h2>
            </div>
          </div>
          <div className="team-grid">
            {TEAM.map((person) => (
              <div key={person.name} className="team-card">
                {person.photo === false ? (
                  <span className="team-avatar team-photo" style={{ background: person.colour }} aria-hidden="true">
                    {person.name[0]}
                  </span>
                ) : (
                  <img className="team-photo" src={teamPhoto(person.name)} alt={`Illustration of ${person.name}`} loading="lazy" />
                )}
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
