import { Link } from 'react-router-dom'
import { STATS } from '../data/siteInfo'
import usePageTitle from '../hooks/usePageTitle'
import CountUp from '../components/CountUp'
import PageHeader from '../components/PageHeader'
import { img } from '../utils/images'

const VALUES = [
  { title: 'Kindness', text: 'Every animal is treated with patience and respect, whatever its age or health.' },
  { title: 'Honesty', text: 'We tell adopters the good and the hard parts about each pet, so matches last.' },
  { title: 'No judgement', text: 'Owners who release a pet are helped, not blamed. Life can change suddenly.' },
  { title: 'Education', text: 'We teach the public how to care for pets, so fewer animals are abandoned.' },
]

const WORK = [
  { step: 'Rescue', text: 'We take in abandoned pets and pets released by owners.' },
  { step: 'Recover', text: 'Our vet treats, vaccinates and sterilises every animal.' },
  { step: 'Rehome', text: 'We interview families carefully and match each pet with the right home.' },
  { step: 'Return support', text: 'After adoption we call, visit and offer free training classes.' },
]

export default function Mission() {
  usePageTitle('Our Mission')
  return (
    <>
      <PageHeader image={img('pages/mission.jpg')} eyebrow="Mission & purpose" title="Why Pet Heaven exists" text="No cat or dog in Singapore should be left without care.">
        <blockquote className="mission-quote">
          “Our mission is to give every abandoned cat and dog a safe place to recover and a loving home for life, and to help owners
          make kind choices when they can no longer care for their pets.”
        </blockquote>
      </PageHeader>

      <section className="section section-tight">
        <div className="container">
          <div className="section-head center">
            <div>
              <p className="eyebrow">What we do</p>
              <h2>Our 4 R's</h2>
            </div>
          </div>
          <ol className="steps">
            {WORK.map((w, i) => (
              <li key={w.step} className="step">
                <span className="step-num">{i + 1}</span>
                <h3>{w.step}</h3>
                <p>{w.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-head center">
            <div>
              <p className="eyebrow">Our values</p>
              <h2>What guides our work</h2>
            </div>
          </div>
          <div className="feature-grid four">
            {VALUES.map((v, i) => (
              <div key={v.title} className="feature">
                <span className="feature-icon" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="stats-grid boxed">
            {STATS.map((s) => (
              <div key={s.label} className="stat">
                <strong>
                  <CountUp end={s.value} suffix={s.suffix} />
                </strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="cta-band" style={{ marginTop: '2.5rem' }}>
            <div>
              <h2>Help us reach more pets</h2>
              <p>Adopt, volunteer on weekends, or become a monthly donor. Every bit helps.</p>
            </div>
            <Link to="/signup" className="btn btn-light btn-lg">
              Become a supporter
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
