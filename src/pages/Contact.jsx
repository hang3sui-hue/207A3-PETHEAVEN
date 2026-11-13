import { useState } from 'react'
import { FAQS, SITE } from '../data/siteInfo'
import useForm from '../hooks/useForm'
import usePageTitle from '../hooks/usePageTitle'
import { buildMailto, saveRequest } from '../utils/requests'
import { checkEmail, checkMinLength, checkName, required } from '../utils/validation'
import Accordion from '../components/Accordion'
import FormField from '../components/FormField'
import PageHeader from '../components/PageHeader'
import SuccessPanel from '../components/SuccessPanel'
import { useAuth } from '../hooks/useAppContext'

const LABELS = { name: 'Name', email: 'Email', topic: 'Topic', message: 'Message' }

export default function Contact() {
  usePageTitle('Contact Us')
  const { user } = useAuth()
  const [sent, setSent] = useState(null)
  const { values, errors, field, validateAll, reset } = useForm(
    { name: user?.name || '', email: user?.email || '', topic: '', message: '' },
    (v) => ({
      name: checkName(v.name),
      email: checkEmail(v.email),
      topic: required(v.topic, 'Topic'),
      message: checkMinLength(v.message, 10, 'Message'),
    }),
  )

  function handleSubmit(event) {
    event.preventDefault()
    if (!validateAll()) return
    setSent(saveRequest('contact', values))
  }

  const faqItems = FAQS.map((f, i) => ({ id: `faq-${i}`, title: f.q, content: <p>{f.a}</p> }))

  return (
    <>
      <PageHeader eyebrow="Contact" title="We'd love to hear from you" text="Questions about adopting, volunteering or releasing a pet? Send us a message or visit the shelter." />

      <section className="section section-tight">
        <div className="container contact-layout">
          <div className="contact-info">
            <div className="info-card">
              <h3>Address</h3>
              <p>{SITE.address}</p>
              <h3>Phone</h3>
              <p>
                <a href={`tel:${SITE.phoneDigits.replace(/\s/g, '')}`}>{SITE.phone}</a> ({SITE.phoneDigits})
                <br />
                <a href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">
                  {SITE.whatsapp}
                </a>{' '}
                (WhatsApp)
              </p>
              <h3>Email</h3>
              <p>
                <a href={`mailto:${SITE.adminEmail}`}>{SITE.adminEmail}</a>
              </p>
              <h3>Opening hours</h3>
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
            </div>
            <div className="map-card" role="img" aria-label="Simple map showing Pet Heaven near Tampines">
              <svg viewBox="0 0 320 180" aria-hidden="true">
                <rect width="320" height="180" fill="var(--map-land)" />
                <path d="M0 120 Q80 100 160 130 T320 110 V180 H0 Z" fill="var(--map-park)" />
                <path d="M0 60 L320 80" stroke="var(--map-road)" strokeWidth="10" />
                <path d="M120 0 L150 180" stroke="var(--map-road)" strokeWidth="8" />
                <path d="M240 0 L220 180" stroke="var(--map-road)" strokeWidth="6" />
                <text x="12" y="52" className="map-label">Tampines Ave</text>
                <text x="156" y="170" className="map-label">Lorong Kasih</text>
                <circle cx="190" cy="105" r="16" fill="var(--primary)" opacity="0.25" />
                <path d="M190 80 C178 80 172 90 176 99 L190 118 L204 99 C208 90 202 80 190 80 Z" fill="var(--primary)" />
                <circle cx="190" cy="92" r="5" fill="#fff" />
              </svg>
              <span>Pet Heaven · 5 min walk from Tampines MRT</span>
            </div>
          </div>

          <div className="card">
            {sent ? (
              <SuccessPanel
                title="Message sent"
                reference={sent.id}
                mailto={buildMailto(sent, LABELS)}
                actions={
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      reset()
                      setSent(null)
                    }}
                  >
                    Write another message
                  </button>
                }
              >
                <p>Thank you! We usually reply within 2 working days.</p>
              </SuccessPanel>
            ) : (
              <form className="form" onSubmit={handleSubmit} noValidate>
                <h2 className="h3">Send us a message</h2>
                <div className="form-grid">
                  <FormField label="Name" error={errors.name} required>
                    <input type="text" autoComplete="name" {...field('name')} />
                  </FormField>
                  <FormField label="Email" error={errors.email} required>
                    <input type="email" autoComplete="email" {...field('email')} />
                  </FormField>
                </div>
                <FormField label="Topic" error={errors.topic} required>
                  <select {...field('topic')}>
                    <option value="">-- Select --</option>
                    <option>Adoption question</option>
                    <option>Releasing a pet</option>
                    <option>Volunteering</option>
                    <option>Donations</option>
                    <option>Report an animal in danger</option>
                    <option>Other</option>
                  </select>
                </FormField>
                <FormField label="Message" error={errors.message} required>
                  <textarea rows="5" {...field('message')} />
                </FormField>
                <button type="submit" className="btn btn-primary">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container narrow">
          <div className="section-head center">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2>Frequently asked questions</h2>
            </div>
          </div>
          <Accordion items={faqItems} firstOpen={false} />
        </div>
      </section>
    </>
  )
}
