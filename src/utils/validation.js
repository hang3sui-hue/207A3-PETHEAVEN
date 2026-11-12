// Reusable checks for form fields.
// Each function returns an error message, or '' when the value is OK.

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())

// Singapore phone numbers: 8 digits starting with 3, 6, 8 or 9.
export const isSgPhone = (value) => /^(\+65\s?)?[3689]\d{3}\s?\d{4}$/.test(value.trim())

export function required(value, label) {
  if (typeof value === 'boolean') return value ? '' : `Please tick ${label}.`
  return String(value ?? '').trim() ? '' : `${label} is required.`
}

export function checkName(value) {
  if (!value.trim()) return 'Name is required.'
  if (value.trim().length < 2) return 'Name must have at least 2 letters.'
  if (!/^[A-Za-z][A-Za-z\s'.-]*$/.test(value.trim())) return 'Name can only use letters, spaces, . - and \'.'
  return ''
}

export function checkEmail(value) {
  if (!value.trim()) return 'Email is required.'
  return isEmail(value) ? '' : 'Please enter a valid email, e.g. name@example.com.'
}

export function checkPhone(value) {
  if (!value.trim()) return 'Phone number is required.'
  return isSgPhone(value) ? '' : 'Please enter an 8-digit Singapore number, e.g. 9123 4567.'
}

export function checkPassword(value) {
  if (!value) return 'Password is required.'
  if (value.length < 8) return 'Password must have at least 8 characters.'
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) return 'Use both letters and numbers.'
  return ''
}

export function checkMinLength(value, min, label) {
  if (!value.trim()) return `${label} is required.`
  return value.trim().length >= min ? '' : `${label} must have at least ${min} characters.`
}

// A date that must be from tomorrow up to "maxDays" days ahead.
export function checkFutureDate(value, label, maxDays = 60) {
  if (!value) return `Please choose a ${label}.`
  const chosen = new Date(value + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const days = (chosen - today) / 86400000
  if (days < 1) return `The ${label} must be after today.`
  if (days > maxDays) return `The ${label} must be within ${maxDays} days.`
  if (chosen.getDay() === 1) return 'We are closed on Mondays. Please choose another day.'
  return ''
}

// Today's local date as "YYYY-MM-DD" plus an offset in days (for min/max on date inputs).
export function dateFromToday(offsetDays) {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
