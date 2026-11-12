// The Pet Heaven logo: a paw print with a small halo.
export default function Logo({ size = 38 }) {
  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="34" r="30" fill="var(--primary)" />
      <ellipse cx="32" cy="9" rx="13" ry="4" fill="none" stroke="var(--sun)" strokeWidth="3" />
      <g fill="#fff">
        <ellipse cx="32" cy="43" rx="11" ry="9" />
        <ellipse cx="19" cy="31" rx="4.5" ry="6" />
        <ellipse cx="45" cy="31" rx="4.5" ry="6" />
        <ellipse cx="26" cy="22" rx="4.5" ry="6" />
        <ellipse cx="38" cy="22" rx="4.5" ry="6" />
      </g>
    </svg>
  )
}
