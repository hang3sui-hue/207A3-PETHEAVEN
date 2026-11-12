import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useForm from '../hooks/useForm'
import usePageTitle from '../hooks/usePageTitle'
import { checkEmail, checkName, checkPassword, checkPhone, required } from '../utils/validation'
import AuthLayout from '../components/AuthLayout'
import FormField from '../components/FormField'
import PasswordInput from '../components/PasswordInput'
import { useAuth, useToast } from '../hooks/useAppContext'

const PLANS = [
  { value: 'Supporter', text: 'Supporter – free, adopt and review' },
  { value: 'Volunteer', text: 'Volunteer – help at the shelter on weekends' },
  { value: 'Monthly donor', text: 'Monthly donor – give from $10 a month' },
]

function validate(v) {
  return {
    name: checkName(v.name),
    email: checkEmail(v.email),
    phone: checkPhone(v.phone),
    password: checkPassword(v.password),
    confirm: !v.confirm ? 'Please type your password again.' : v.confirm !== v.password ? 'The two passwords do not match.' : '',
    terms: required(v.terms, 'the box to accept the member rules'),
  }
}

// Shows how strong the password is with a coloured bar.
function strength(password) {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return score
}

export default function Signup() {
  usePageTitle('Join as a member')
  const { signup } = useAuth()
  const showToast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [formError, setFormError] = useState('')

  const { values, errors, field, validateAll } = useForm(
    { name: '', email: '', phone: '', plan: 'Supporter', password: '', confirm: '', terms: false, newsletter: true },
    validate,
  )
  const score = strength(values.password)

  function handleSubmit(event) {
    event.preventDefault()
    setFormError('')
    if (!validateAll()) return
    const { confirm: _confirm, terms: _terms, ...newUser } = values
    const problem = signup(newUser)
    if (problem) return setFormError(problem)
    showToast(`Welcome to Pet Heaven, ${values.name.split(' ')[0]}! 🎉`)
    navigate(location.state?.from || '/pets', { replace: true })
  }

  return (
    <AuthLayout title="Become a member" text="Join for free and be a supporter of Pet Heaven.">
      <form className="form" onSubmit={handleSubmit} noValidate>
        {formError && (
          <p className="form-alert" role="alert">
            {formError}
          </p>
        )}
        <FormField label="Full name" error={errors.name} required>
          <input type="text" autoComplete="name" {...field('name')} />
        </FormField>
        <div className="form-grid">
          <FormField label="Email" error={errors.email} required>
            <input type="email" autoComplete="email" {...field('email')} />
          </FormField>
          <FormField label="Mobile number" error={errors.phone} required>
            <input type="tel" autoComplete="tel" placeholder="9123 4567" {...field('phone')} />
          </FormField>
        </div>
        <FormField label="How would you like to support us?">
          <select {...field('plan')}>
            {PLANS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.text}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Password" error={errors.password} hint="At least 8 characters with letters and numbers" required>
          <PasswordInput autoComplete="new-password" {...field('password')} />
        </FormField>
        {values.password && (
          <div className={`strength strength-${score}`} aria-live="polite">
            <span />
            <small>Password strength: {['Very weak', 'Weak', 'Fair', 'Good', 'Strong'][score]}</small>
          </div>
        )}
        <FormField label="Confirm password" error={errors.confirm} required>
          <PasswordInput autoComplete="new-password" {...field('confirm')} />
        </FormField>
        <label className="check">
          <input type="checkbox" {...field('newsletter')} checked={values.newsletter} value={undefined} /> Send me the monthly newsletter
        </label>
        <label className={`check ${errors.terms ? 'has-error' : ''}`}>
          <input type="checkbox" {...field('terms')} checked={values.terms} value={undefined} /> I agree to treat all animals kindly and
          follow the member rules.
        </label>
        {errors.terms && <p className="field-error">{errors.terms}</p>}
        <button type="submit" className="btn btn-primary btn-block">
          Create my account
        </button>
        <p className="auth-switch">
          Already a member?{' '}
          <Link to="/login" state={location.state}>
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
