import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import pets, { findPet, formatAge } from '../data/pets'
import useForm from '../hooks/useForm'
import usePageTitle from '../hooks/usePageTitle'
import { buildMailto, saveRequest } from '../utils/requests'
import { checkEmail, checkFutureDate, checkMinLength, checkName, checkPhone, dateFromToday, required } from '../utils/validation'
import FormField from '../components/FormField'
import MembersOnly from '../components/MembersOnly'
import PageHeader from '../components/PageHeader'
import PetArt from '../components/PetArt'
import SuccessPanel from '../components/SuccessPanel'
import { useAuth } from '../hooks/useAppContext'
import { img } from '../utils/images'

const availablePets = pets.filter((p) => p.status === 'Available')

// Labels used in the email to the administrator.
const LABELS = {
  petName: 'Pet',
  fullName: 'Full name',
  email: 'Email',
  phone: 'Phone',
  address: 'Address',
  housing: 'Type of home',
  household: 'People at home',
  otherPets: 'Other pets',
  experience: 'Experience with pets',
  reason: 'Why this pet',
  visitDate: 'Preferred visit date',
  homeVisit: 'Agrees to home check',
}

function validate(v) {
  return {
    petId: required(v.petId, 'Pet'),
    fullName: checkName(v.fullName),
    email: checkEmail(v.email),
    phone: checkPhone(v.phone),
    address: checkMinLength(v.address, 8, 'Address'),
    housing: required(v.housing, 'Type of home'),
    household: required(v.household, 'People at home'),
    experience: required(v.experience, 'Experience'),
    reason: checkMinLength(v.reason, 30, 'Your reason'),
    visitDate: checkFutureDate(v.visitDate, 'visit date', 30),
    homeVisit: required(v.homeVisit, 'the home check box'),
  }
}

export default function Adopt() {
  usePageTitle('Adoption Form')
  const [searchParams] = useSearchParams()
  const chosen = findPet(searchParams.get('pet'))

  return (
    <>
      <PageHeader image={img('pages/adopt.jpg')}
        eyebrow="Adoption request"
        title={chosen ? `Adopt ${chosen.name}` : 'Adopt a pet'}
        text="Tell us a little about you and your home. Our adoption team will contact you within 3 working days."
      />
      <section className="section section-tight">
        <div className="container narrow">
          <MembersOnly message="Please log in or join for free to send an adoption request. It only takes a minute, and your details will be filled in for you.">
            <AdoptForm initialPetId={chosen?.status === 'Available' ? String(chosen.id) : ''} />
          </MembersOnly>
        </div>
      </section>
    </>
  )
}

function AdoptForm({ initialPetId }) {
  const { user } = useAuth()
  const [sent, setSent] = useState(null)
  const { values, errors, field, validateAll, reset } = useForm(
    {
      petId: initialPetId,
      fullName: user.name,
      email: user.email,
      phone: user.phone || '',
      address: '',
      housing: '',
      household: '',
      otherPets: 'None',
      experience: '',
      reason: '',
      visitDate: '',
      homeVisit: false,
    },
    validate,
  )

  const pet = findPet(values.petId)

  function handleSubmit(event) {
    event.preventDefault()
    if (!validateAll()) return
    const request = saveRequest('adopt', { ...values, petName: `${pet.name} (${pet.species}, #${pet.id})`, member: user.email })
    setSent(request)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (sent) {
    return (
      <SuccessPanel
        title={`Thank you, ${sent.details.fullName.split(' ')[0]}!`}
        reference={sent.id}
        mailto={buildMailto(sent, LABELS)}
        actions={
          <Link to="/pets" className="btn btn-outline">
            Back to pets
          </Link>
        }
      >
        <p>
          Your request to adopt <strong>{pet.name}</strong> has been received. Please send the form to our administrator using the
          button below. We will call you at <strong>{sent.details.phone}</strong> to arrange an interview and a visit on{' '}
          <strong>{sent.details.visitDate}</strong>.
        </p>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => {
            reset()
            setSent(null)
          }}
        >
          Send another request
        </button>
      </SuccessPanel>
    )
  }

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <fieldset>
        <legend>
          <span className="legend-num">1</span> Choose a pet
        </legend>
        <div className="pet-picker">
          <FormField label="Which pet would you like to adopt?" error={errors.petId} required>
            <select {...field('petId')}>
              <option value="">-- Choose a pet --</option>
              {['Dog', 'Cat'].map((species) => (
                <optgroup key={species} label={`${species}s`}>
                  {availablePets
                    .filter((p) => p.species === species)
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} – {p.breed}, {formatAge(p.age)}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </FormField>
          {pet && (
            <div className="picked-pet">
              <PetArt species={pet.species} art={pet.art} name={pet.name} />
              <div>
                <strong>{pet.name}</strong>
                <span>
                  {pet.gender} · {formatAge(pet.age)} · {pet.size}
                </span>
                <span>{pet.personality.join(', ')}</span>
              </div>
            </div>
          )}
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <span className="legend-num">2</span> About you
        </legend>
        <div className="form-grid">
          <FormField label="Full name" error={errors.fullName} required>
            <input type="text" autoComplete="name" {...field('fullName')} />
          </FormField>
          <FormField label="Email" error={errors.email} required>
            <input type="email" autoComplete="email" {...field('email')} />
          </FormField>
          <FormField label="Mobile number" error={errors.phone} hint="8-digit Singapore number" required>
            <input type="tel" autoComplete="tel" placeholder="9123 4567" {...field('phone')} />
          </FormField>
          <FormField label="Home address" error={errors.address} required>
            <input type="text" autoComplete="street-address" placeholder="Block, street, unit, postal code" {...field('address')} />
          </FormField>
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <span className="legend-num">3</span> Your home
        </legend>
        <div className="form-grid">
          <FormField label="Type of home" error={errors.housing} required>
            <select {...field('housing')}>
              <option value="">-- Select --</option>
              <option>HDB flat</option>
              <option>Condominium</option>
              <option>Landed house</option>
              <option>Other</option>
            </select>
          </FormField>
          <FormField label="Who lives with you?" error={errors.household} required>
            <select {...field('household')}>
              <option value="">-- Select --</option>
              <option>Only me</option>
              <option>Adults only</option>
              <option>Family with children under 12</option>
              <option>Family with older children</option>
            </select>
          </FormField>
          <FormField label="Other pets at home" hint="e.g. 1 cat, 2 years old">
            <input type="text" {...field('otherPets')} />
          </FormField>
        </div>

        <div className={`field ${errors.experience ? 'has-error' : ''}`}>
          <span className="label" id="experience-label">
            Have you kept a pet before? <span className="req">*</span>
          </span>
          <div className="radio-pills" role="radiogroup" aria-labelledby="experience-label">
            {['First-time owner', 'Had pets before', 'Have pets now'].map((opt) => (
              <label key={opt} className={values.experience === opt ? 'checked' : ''}>
                <input type="radio" {...field('experience')} id={undefined} value={opt} checked={values.experience === opt} />
                {opt}
              </label>
            ))}
          </div>
          {errors.experience && <p className="field-error">{errors.experience}</p>}
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <span className="legend-num">4</span> Visit
        </legend>
        <FormField label={`Why would ${pet ? pet.name : 'this pet'} be happy with you?`} error={errors.reason} hint={`${values.reason.trim().length}/30 characters minimum`} required>
          <textarea rows="4" placeholder="Tell us about your daily routine and how you will care for the pet." {...field('reason')} />
        </FormField>
        <div className="form-grid">
          <FormField label="Preferred date to meet the pet" error={errors.visitDate} hint="We are closed on Mondays" required>
            <input type="date" min={dateFromToday(1)} max={dateFromToday(30)} {...field('visitDate')} />
          </FormField>
        </div>
        <label className={`check check-box ${errors.homeVisit ? 'has-error' : ''}`}>
          <input type="checkbox" {...field('homeVisit')} checked={values.homeVisit} value={undefined} />
          I agree to a short home check before the adoption is final.
        </label>
        {errors.homeVisit && <p className="field-error">{errors.homeVisit}</p>}
      </fieldset>

      <div className="form-footer">
        <p className="soft">Fields marked * are required.</p>
        <button type="submit" className="btn btn-primary btn-lg">
          Send adoption request
        </button>
      </div>
    </form>
  )
}
