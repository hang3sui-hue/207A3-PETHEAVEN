import { useState } from 'react'

// Shows 1–5 stars. If "onChange" is given, the stars can be clicked (for the review form).
export default function StarRating({ value, onChange, size = 'md' }) {
  const [hover, setHover] = useState(0)
  const shown = hover || value

  if (!onChange) {
    return (
      <span className={`stars stars-${size}`} aria-label={`${value} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={n <= Math.round(value) ? 'on' : ''} aria-hidden="true">
            ★
          </span>
        ))}
      </span>
    )
  }

  return (
    <div className={`stars stars-input stars-${size}`} role="radiogroup" aria-label="Your rating" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          className={n <= shown ? 'on' : ''}
          onMouseEnter={() => setHover(n)}
          onClick={() => onChange(n)}
        >
          ★
        </button>
      ))}
    </div>
  )
}
