import { useState } from 'react'

// A list of questions/titles that open and close when clicked.
// Reused for the pet care tips and the FAQ.
// items: [{ id, title, content }]
export default function Accordion({ items, firstOpen = true }) {
  const [openId, setOpenId] = useState(firstOpen ? items[0]?.id : null)

  return (
    <div className="accordion">
      {items.map((item) => {
        const open = openId === item.id
        return (
          <div key={item.id} className={`accordion-item ${open ? 'open' : ''}`}>
            <h3>
              <button
                aria-expanded={open}
                aria-controls={`panel-${item.id}`}
                id={`button-${item.id}`}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                <span>{item.title}</span>
                <span className="accordion-icon" aria-hidden="true">
                  +
                </span>
              </button>
            </h3>
            <div id={`panel-${item.id}`} role="region" aria-labelledby={`button-${item.id}`} className="accordion-panel">
              <div className="accordion-inner">{item.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
