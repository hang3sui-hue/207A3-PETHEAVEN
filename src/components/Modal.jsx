import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

// A reusable pop-up window. Whatever is placed between <Modal> and </Modal>
// (the "children" prop) is shown inside it.
// It closes with the × button, the Esc key, or a click on the dark background.
// createPortal puts it directly in <body>, so it is always centred on the screen
// (the page fade-in animation uses transform, which would otherwise move it).
export default function Modal({ title, onClose, children }) {
  const closeButton = useRef(null)
  // Keep the latest onClose in a ref, so the effect below only runs once
  // (when the modal opens), even if the parent passes a new function each render.
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onCloseRef.current()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden' // stop the page behind from scrolling
    closeButton.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [])

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <button ref={closeButton} className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
