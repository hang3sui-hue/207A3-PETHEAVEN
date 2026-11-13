import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useForm from '../hooks/useForm'
import usePageTitle from '../hooks/usePageTitle'
import { checkEmail, required } from '../utils/validation'
import AuthLayout from '../components/AuthLayout'
import FormField from '../components/FormField'
import PasswordInput from '../components/PasswordInput'
import { useAuth, useToast } from '../hooks/useAppContext'

export default function Login() {
  usePageTitle('Log in')
  const { login } = useAuth()
  const showToast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [loginError, setLoginError] = useState('')

  const { values, errors, field, validateAll } = useForm({ email: '', password: '' }, (v) => ({
    email: checkEmail(v.email),
    password: required(v.password, 'Password'),
  }))

  function handleSubmit(event) {
    event.preventDefault()
    setLoginError('')
    if (!validateAll()) return
    if (!login(values.email, values.password)) {
      setLoginError('The email or password is wrong. Please try again.')
      return
    }
    showToast('Welcome back.')
    // Go back to the page that asked for login (e.g. the adoption form), or home.
    navigate(location.state?.from || '/', { replace: true })
  }

  return (
    <AuthLayout title="Welcome back" text="Log in to adopt a pet, save favourites and write reviews.">
      <form className="form" onSubmit={handleSubmit} noValidate>
        {loginError && (
          <p className="form-alert" role="alert">
            {loginError}
          </p>
        )}
        <FormField label="Email" error={errors.email} required>
          <input type="email" autoComplete="email" {...field('email')} />
        </FormField>
        <FormField label="Password" error={errors.password} required>
          <PasswordInput autoComplete="current-password" {...field('password')} />
        </FormField>
        <button type="submit" className="btn btn-primary btn-block">
          Log in
        </button>
        <p className="auth-switch">
          New to Pet Heaven?{' '}
          <Link to="/signup" state={location.state}>
            Join for free
          </Link>
        </p>
        <div className="demo-box">
          <strong>Demo accounts</strong>
          <span>Member: member@petheaven.com / 1234</span>
          <span>Staff: staff@petheaven.com / 1234</span>
        </div>
      </form>
    </AuthLayout>
  )
}
