import { useState } from 'react'

// A password box with a Show / Hide button.
// All other props (name, value, onChange…) are passed to the <input>.
export default function PasswordInput(props) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="password-box">
      <input {...props} type={visible ? 'text' : 'password'} />
      <button
        type="button"
        className="show-pass"
        onClick={() => setVisible(!visible)}
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? 'Hide' : 'Show'}
      </button>
    </div>
  )
}
