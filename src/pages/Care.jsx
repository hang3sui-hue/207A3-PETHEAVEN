import { useState } from 'react'
import careTips, { firstMonthChecklist } from '../data/careTips'
import useLocalStorage from '../hooks/useLocalStorage'
import { img } from '../utils/images'
import usePageTitle from '../hooks/usePageTitle'
import Accordion from '../components/Accordion'
import PageHeader from '../components/PageHeader'
import ReadinessQuiz from '../components/ReadinessQuiz'

// The video is a local file in /public/media, so it loads without any outside website.
const VIDEO = `${import.meta.env.BASE_URL}media/pet-care-basics.mp4`
const POSTER = `${import.meta.env.BASE_URL}media/pet-care-poster.jpg`

export default function Care() {
  usePageTitle('Pet Care Tips')
  const [show, setShow] = useState('All')
  const [checked, setChecked] = useLocalStorage('checklist', [])

  // Tips just for the chosen pet come first, then the tips for both.
  const tips = careTips
    .filter((tip) => show === 'All' || tip.for === show || tip.for === 'Both')
    .sort((a, b) => (show === 'All' ? 0 : (a.for === 'Both') - (b.for === 'Both')))
  const items = tips.map((tip, i) => ({
    id: tip.id,
    title: (
      <>
        <span className="tip-icon" aria-hidden="true">
          {String(i + 1).padStart(2, '0')}
        </span>
        {tip.title}
        {tip.for !== 'Both' && <span className="mini-tag">{tip.for}s</span>}
      </>
    ),
    content: (
      <>
      <img className="tip-img" src={img(`${tip.photo[show] || tip.photo.All}.jpg`)} alt="" loading="lazy" />
      <ul className="tick-list">
        {tip.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      </>
    ),
  }))

  function toggleItem(item) {
    setChecked(checked.includes(item) ? checked.filter((i) => i !== item) : [...checked, item])
  }

  return (
    <>
      <PageHeader
        eyebrow="Learn"
        title="Pet care made simple"
        text="Practical tips from our shelter vet and staff, a short video, and a quiz to check if you are ready to adopt."
      />

      <section className="section section-tight">
        <div className="container care-layout">
          <div>
            <div className="section-head">
              <h2>Care tips</h2>
              <div className="species-tabs small" role="group" aria-label="Show tips for">
                {['All', 'Dog', 'Cat'].map((s) => (
                  <button key={s} className={show === s ? 'active' : ''} aria-pressed={show === s} onClick={() => setShow(s)}>
                    {s === 'All' ? 'All' : `${s}s`}
                  </button>
                ))}
              </div>
            </div>
            {/* key={show} resets which tip is open when the filter changes */}
            <Accordion key={show} items={items} />
          </div>

          <aside className="care-side">
            <div className="card video-card">
              <h3>Video: Pet care basics</h3>
              <video controls preload="none" poster={POSTER} width="100%">
                <source src={VIDEO} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="soft">A short guide (under one minute) to space, food, safety, play and vet care for new adopters.</p>
            </div>

            <div className="card checklist-card">
              <h3>First month checklist</h3>
              <p className="soft">
                {checked.length} of {firstMonthChecklist.length} done – your ticks are saved on this device.
              </p>
              <div className="meter small">
                <span style={{ width: `${(checked.length / firstMonthChecklist.length) * 100}%` }} />
              </div>
              <ul className="checklist">
                {firstMonthChecklist.map((item) => (
                  <li key={item}>
                    <label className={checked.includes(item) ? 'done' : ''}>
                      <input type="checkbox" checked={checked.includes(item)} onChange={() => toggleItem(item)} />
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container narrow">
          <div className="section-head center">
            <div>
              <p className="eyebrow">Interactive quiz</p>
              <h2>Are you ready to adopt?</h2>
              <p className="soft">Answer 5 quick questions to find out – and see which pet might suit you.</p>
            </div>
          </div>
          <ReadinessQuiz />
        </div>
      </section>
    </>
  )
}
