// The coloured banner at the top of each page (except Home).
// Reused on every page with different text, passed in as props.
export default function PageHeader({ eyebrow, title, text, children }) {
  return (
    <section className="page-header">
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {text && <p className="lead">{text}</p>}
        {children}
      </div>
      <svg className="page-header-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 30 Q 360 70 720 30 T 1440 30 V60 H0 Z" />
      </svg>
    </section>
  )
}
