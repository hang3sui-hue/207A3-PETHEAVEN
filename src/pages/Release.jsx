import { useState } from 'react'
import { Link } from 'react-router-dom'
import useForm from '../hooks/useForm'
import usePageTitle from '../hooks/usePageTitle'
import { buildMailto, saveRequest } from '../utils/requests'
import { checkEmail, checkFutureDate, checkMinLength, checkName, checkPhone, dateFromToday, required } from '../utils/validation'
import FormField from '../components/FormField'
import PageHeader from '../components/PageHeader'
import SuccessPanel from '../components/SuccessPanel'
import { useAuth } from '../hooks/useAppContext'

const LABELS = {
  ownerName: 'Owner name',
  email: 'Email',
  phone: 'Phone',
  petName: 'Pet name',
  species: 'Species',
  breed: 'Breed',
  petAge: 'Age (years)',
  petGender: 'Gender',
  sterilised: 'Sterilised',
  vaccinated: 'Vaccinated',
  health: 'Health notes',
  reason: 'Reason for release',
  details: 'More details',
  handoverDate: 'Preferred handover date',
  photoName: 'Photo',
}

function validate(v) {
  const age = Number(v.petAge)
  return {
    ownerName: checkName(v.ownerName),
    email: checkEmail(v.email),
    phone: checkPhone(v.phone),
    petName: required(v.petName, 'Pet name'),
    species: required(v.species, 'Species'),
    petAge: v.petAge === '' ? 'Age is required.' : age < 0 || age > 30 ? 'Please enter an age between 0 and 30.' : '',
    petGender: required(v.petGender, 'Gender'),
    reason: required(v.reason, 'Reason'),
    details: checkMinLength(v.details, 20, 'More details'),
    handoverDate: checkFutureDate(v.handoverDate, 'handover date', 60),
    agree: required(v.agree, 'the declaration'),
  }
}

const MAX_PHOTO_MB = 2

export default function Release() {
  usePageTitle('Release a Pet')
  const { user } = useAuth()
  const [sent, setSent] = useState(null)
  const [photo, setPhoto] = useState({ url: '', name: '', error: '' })

  const { values, errors, field, validateAll, reset } = useForm(
    {
      ownerName: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      petName: '',
      species: '',
      breed: '',
      petAge: '',
      petGender: '',
      sterilised: 'Not sure',
      vaccinated: 'Not sure',
      health: '',
      reason: '',
      details: '',
      handoverDate: '',
      agree: false,
    },
    validate,
  )

  // Show a preview of the photo using FileReader. The photo is only checked, not uploaded.
  function handlePhoto(event) {
    const file = event.target.files[0]
    if (!file) return setPhoto({ url: '', name: '', error: '' })
    if (!file.type.startsWith('image/')) return setPhoto({ url: '', name: '', error: 'Please choose an image file (JPG or PNG).' })
    if (file.size > MAX_PHOTO_MB * 1024 * 1024) return setPhoto({ url: '', name: '', error: `The photo must be smaller than ${MAX_PHOTO_MB} MB.` })
    const reader = new FileReader()
    reader.onload = () => setPhoto({ url: reader.result, name: file.name, error: '' })
    reader.readAsDataURL(file)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!validateAll() || photo.error) return
    setSent(saveRequest('release', { ...values, photoName: photo.name || 'No photo' }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <PageHeader
        eyebrow="Release a pet"
        title="We are here to help"
        text="If you can no longer care for your pet, tell us about them below. A staff member will call you to talk about the best next step for your pet."
      />

      <section className="section section-tight">
        <div className="container release-layout">
          {sent ? (
            <SuccessPanel
              title="Request received"
              reference={sent.id}
              mailto={buildMailto(sent, LABELS)}
              actions={
                <Link to="/" className="btn btn-outline">
                  Back to home
                </Link>
              }
            >
              <p>
                Thank you for trusting us with <strong>{sent.details.petName}</strong>. Please send the form to our administrator using the
                button below. We will call you within 2 working days to confirm the handover on <strong>{sent.details.handoverDate}</strong>.
              </p>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  reset()
                  setPhoto({ url: '', name: '', error: '' })
                  setSent(null)
                }}
              >
                Fill in another form
              </button>
            </SuccessPanel>
          ) : (
            <form className="card form" onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend>
                  <span className="legend-num">1</span> Your details
                </legend>
                <div className="form-grid">
                  <FormField label="Your name" error={errors.ownerName} required>
                    <input type="text" autoComplete="name" {...field('ownerName')} />
                  </FormField>
                  <FormField label="Email" error={errors.email} required>
                    <input type="email" autoComplete="email" {...field('email')} />
                  </FormField>
                  <FormField label="Mobile number" error={errors.phone} hint="8-digit Singapore number" required>
                    <input type="tel" autoComplete="tel" placeholder="9123 4567" {...field('phone')} />
                  </FormField>
                </div>
              </fieldset>

              <fieldset>
                <legend>
                  <span className="legend-num">2</span> Your pet
                </legend>
                <div className="form-grid">
                  <FormField label="Pet's name" error={errors.petName} required>
                    <input type="text" {...field('petName')} />
                  </FormField>
                  <div className={`field ${errors.species ? 'has-error' : ''}`}>
                    <span className="label" id="species-label">
                      Species <span className="req">*</span>
                    </span>
                    <div className="radio-pills" role="radiogroup" aria-labelledby="species-label">
                      {['Dog', 'Cat'].map((opt) => (
                        <label key={opt} className={values.species === opt ? 'checked' : ''}>
                          <input type="radio" {...field('species')} id={undefined} value={opt} checked={values.species === opt} />
                          {opt === 'Dog' ? '🐶 Dog' : '🐱 Cat'}
                        </label>
                      ))}
                    </div>
                    {errors.species && <p className="field-error">{errors.species}</p>}
                  </div>
                  <FormField label="Breed" hint="Leave blank if not sure">
                    <input type="text" {...field('breed')} />
                  </FormField>
                  <FormField label="Age (years)" error={errors.petAge} hint="Use 0.5 for 6 months" required>
                    <input type="number" min="0" max="30" step="0.5" {...field('petAge')} />
                  </FormField>
                  <FormField label="Gender" error={errors.petGender} required>
                    <select {...field('petGender')}>
                      <option value="">-- Select --</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </FormField>
                  <FormField label="Sterilised?">
                    <select {...field('sterilised')}>
                      <option>Yes</option>
                      <option>No</option>
                      <option>Not sure</option>
                    </select>
                  </FormField>
                  <FormField label="Vaccinated?">
                    <select {...field('vaccinated')}>
                      <option>Yes</option>
                      <option>No</option>
                      <option>Not sure</option>
                    </select>
                  </FormField>
                  <FormField label="Health problems or medicine" hint="Optional">
                    <input type="text" {...field('health')} />
                  </FormField>
                </div>
                <div className="field">
                  <label htmlFor="photo">Photo of your pet (optional)</label>
                  <div className="photo-upload">
                    <input id="photo" type="file" accept="image/*" onChange={handlePhoto} />
                    {photo.url && <img src={photo.url} alt={`Preview of ${values.petName || 'your pet'}`} />}
                  </div>
                  {photo.error ? <p className="field-error">{photo.error}</p> : <p className="field-hint">JPG or PNG, up to {MAX_PHOTO_MB} MB</p>}
                </div>
              </fieldset>

              <fieldset>
                <legend>
                  <span className="legend-num">3</span> Release details
                </legend>
                <div className="form-grid">
                  <FormField label="Main reason" error={errors.reason} required>
                    <select {...field('reason')}>
                      <option value="">-- Select --</option>
                      <option>Moving house / overseas</option>
                      <option>Allergy in the family</option>
                      <option>Not enough time</option>
                      <option>Money problems</option>
                      <option>Behaviour problems</option>
                      <option>Found a stray animal</option>
                      <option>Other</option>
                    </select>
                  </FormField>
                  <FormField label="Preferred handover date" error={errors.handoverDate} hint="We are closed on Mondays" required>
                    <input type="date" min={dateFromToday(1)} max={dateFromToday(60)} {...field('handoverDate')} />
                  </FormField>
                </div>
                <FormField label="Tell us more about your pet" error={errors.details} hint="Personality, habits, likes and dislikes" required>
                  <textarea rows="4" {...field('details')} />
                </FormField>
                <label className={`check check-box ${errors.agree ? 'has-error' : ''}`}>
                  <input type="checkbox" {...field('agree')} checked={values.agree} value={undefined} />
                  I am the owner (or the finder) of this pet and the information above is true.
                </label>
                {errors.agree && <p className="field-error">{errors.agree}</p>}
              </fieldset>

              <div className="form-footer">
                <p className="soft">Fields marked * are required.</p>
                <button type="submit" className="btn btn-primary btn-lg">
                  Send release request
                </button>
              </div>
            </form>
          )}

          <aside className="side-note">
            <h3>Before you release</h3>
            <ul>
              <li>Many problems (behaviour, allergy, cost) can be solved. Ask us for free advice first.</li>
              <li>Releasing a pet on the street is illegal in Singapore and very dangerous for the pet.</li>
              <li>Please bring the pet's vaccination card and favourite toy on handover day.</li>
            </ul>
            <p className="soft">
              Urgent? Call our rescue line <a href="tel:+6567382468">+65 6738 2468</a>.
            </p>
          </aside>
        </div>
      </section>
    </>
  )
}
