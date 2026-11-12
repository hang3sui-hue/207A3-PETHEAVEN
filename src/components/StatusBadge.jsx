// Coloured label for the status of a request (New, Interview, Approved…).
export default function StatusBadge({ status }) {
  return <span className={`req-status status-${status.toLowerCase().replace(/\s/g, '-')}`}>{status}</span>
}
