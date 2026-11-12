import { useState } from 'react'

// A reusable hook for every form on the site.
// - initialValues: the starting value of each field
// - validate: a function that gets all values and returns { fieldName: 'error message' }
// The hook keeps the values, errors and "touched" fields in state,
// so each form component only needs to describe its own fields.

export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})

  const allErrors = validate(values)
  // Only show an error after the user has left the field (or pressed submit).
  const errors = Object.fromEntries(Object.entries(allErrors).filter(([field, msg]) => msg && touched[field]))

  function handleChange(event) {
    const { name, type, value, checked } = event.target
    setValues((old) => ({ ...old, [name]: type === 'checkbox' ? checked : value }))
  }

  function setValue(name, value) {
    setValues((old) => ({ ...old, [name]: value }))
  }

  function handleBlur(event) {
    setTouched((old) => ({ ...old, [event.target.name]: true }))
  }

  // Returns true when the whole form is valid.
  function validateAll() {
    const allTouched = Object.fromEntries(Object.keys(initialValues).map((field) => [field, true]))
    setTouched(allTouched)
    const firstError = Object.keys(allErrors).find((field) => allErrors[field])
    if (firstError) {
      // Move the cursor to the first wrong field, so the user can fix it quickly.
      document.querySelector(`[name="${firstError}"]`)?.focus()
      return false
    }
    return true
  }

  function reset(newValues = initialValues) {
    setValues(newValues)
    setTouched({})
  }

  // Props that every input needs: name, value, onChange, onBlur.
  function field(name) {
    return { name, id: name, value: values[name], onChange: handleChange, onBlur: handleBlur }
  }

  return { values, errors, field, setValue, handleChange, validateAll, reset }
}
