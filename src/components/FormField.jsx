// A reusable form field: label + input + hint + error message.
// Used by all forms (login, sign up, adoption, release, contact, review).
//
// <FormField label="Email" error={errors.email}>
//   <input type="email" {...field('email')} />
// </FormField>
//
// The error is linked to the input with aria-describedby for screen readers.
import { Children, cloneElement, isValidElement } from 'react'

export default function FormField({ label, error, hint, required, children, className = '' }) {
  const input = Children.only(children)
  const id = input.props.id || input.props.name
  const helpId = `${id}-help`

  const inputWithA11y = isValidElement(input)
    ? cloneElement(input, {
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error || hint ? helpId : undefined,
      })
    : input

  return (
    <div className={`field ${error ? 'has-error' : ''} ${className}`}>
      <label htmlFor={id}>
        {label}
        {required && <span className="req" aria-hidden="true"> *</span>}
      </label>
      {inputWithA11y}
      {error ? (
        <p className="field-error" id={helpId}>
          {error}
        </p>
      ) : (
        hint && (
          <p className="field-hint" id={helpId}>
            {hint}
          </p>
        )
      )}
    </div>
  )
}
