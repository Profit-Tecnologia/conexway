const ROUTES = "M7 11C15 11 17 20 24 20M7 29C15 29 17 20 24 20M7 20H33";

export function Logo({ size = 34, tile = false, stroke = "#fff", dot = "#2BC4A8" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {tile && <rect width="40" height="40" rx="8" fill="#13315C" />}
      <path d={ROUTES} stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="33" cy="20" r="2.6" fill={dot} />
    </svg>
  );
}

export function Chevron({ open }) {
  return (
    <svg className={"chevron" + (open ? " open" : "")} width="24" height="24" viewBox="0 0 24 24" fill="#5A6B82" aria-hidden="true">
      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </svg>
  );
}
