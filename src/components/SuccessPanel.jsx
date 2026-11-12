// Shown after a form is sent. Reused by the adoption, release and contact forms.
export default function SuccessPanel({ title, reference, children, mailto, actions }) {
  return (
    <div className="success-panel" role="status">
      <div className="success-check" aria-hidden="true">
        ✓
      </div>
      <h2>{title}</h2>
      {reference && (
        <p className="reference">
          Reference number: <strong>{reference}</strong>
        </p>
      )}
      {children}
      <div className="success-actions">
        {mailto && (
          <a className="btn btn-primary" href={mailto}>
            ✉ Email this form to the administrator
          </a>
        )}
        {actions}
      </div>
    </div>
  )
}
