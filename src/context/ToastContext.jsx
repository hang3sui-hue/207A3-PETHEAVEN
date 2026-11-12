import { useRef, useState } from 'react'
import { ToastContext } from './contexts'

// Small pop-up messages at the bottom of the screen,
// e.g. "Welcome back, Aisha!" or "Biscuit saved to favourites".

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const nextId = useRef(1)

  function showToast(message, type = 'success') {
    const id = nextId.current++
    setToasts((list) => [...list, { id, message, type }])
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 3200)
  }

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast-area" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
