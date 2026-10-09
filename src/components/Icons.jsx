// Brand logo geometry (convexway-positivo.svg, 196.6x34): symbol at x 0–34, wordmark from x 42.7.
// The dark (convexway-dark.svg) and text-only (convexway-texto.svg) files reuse it, offset.
const MARK_ROUTES = "M6,26c-0.8,0-1.4-0.6-1.4-1.4s0.6-1.4,1.4-1.4c3,0,4.8-1.8,6.8-3.6c0.5-0.4,0.9-0.9,1.4-1.3H6c-0.8,0-1.4-0.6-1.4-1.4s0.6-1.4,1.4-1.4h8.2c-0.5-0.4-0.9-0.9-1.4-1.3c-2-1.9-3.8-3.6-6.8-3.6c-0.8,0-1.4-0.6-1.4-1.4S5.2,8,6,8c4.1,0,6.5,2.3,8.7,4.4c1.8,1.7,3.4,3.3,5.8,3.3H28c0.8,0,1.4,0.6,1.4,1.4s-0.6,1.4-1.4,1.4h-7.6c-2.3,0-3.9,1.5-5.8,3.3C12.5,23.7,10,26,6,26z";
const WORDMARK = [
  "M42.7,18c0-5.4,3.6-8.9,8.5-8.9c3.4,0,6.4,1.7,7.6,5.1l-3.4,1.4c-0.7-2.1-2.4-3.1-4.3-3.1c-2.9,0-4.7,2.4-4.7,5.5c0,3.4,2.1,5.5,4.9,5.5c2.2,0,3.8-1.3,4.7-3.4l3.3,1.3c-1.2,3.5-4.2,5.5-8,5.5C46.4,26.8,42.7,23.4,42.7,18z",
  "M59.2,18c0-5.2,3.5-8.9,8.6-8.9s8.5,3.7,8.5,8.9c0,5.2-3.5,8.8-8.5,8.8S59.2,23.2,59.2,18z M67.7,23.5c2.9,0,4.8-2.3,4.8-5.5c0-3.2-2-5.5-4.8-5.5c-2.9,0-4.8,2.3-4.8,5.5C62.9,21.2,64.9,23.5,67.7,23.5z",
  "M77.9,9.6h3.5c0,0.9,0,1.8-0.5,3.3h0.5c1.3-2.8,3.3-3.8,5.5-3.8c3,0,5.9,2,5.9,6.7v10.5h-3.6v-8.9c0-2.8-1-4.9-3.6-4.9c-2.4,0-4.2,1.9-4.2,5v8.8h-3.5V9.6z",
  "M92.9,9.6h3.9c1.5,4.1,2.9,8.1,4.1,13.2h0.7c1.2-5,2.6-9,4.1-13.2h3.8l-6.1,16.7h-4.3L92.9,9.6z",
  "M108.7,18c0-5.1,3.5-8.9,8.3-8.9c3.9,0,7.9,2.4,7.9,8.7v0.9h-12.6c0.3,3.1,2.3,4.8,5,4.8c2.1,0,3.7-1.2,4.5-3.2l3.3,1.3c-1.1,2.9-4,5-7.8,5C112.3,26.8,108.7,23.4,108.7,18z M121.3,16.4c-0.2-3-2.3-4.2-4.4-4.2c-2.5,0-4.1,1.7-4.5,4.2H121.3z",
  "M129.7,18.1v-0.5c-2-2.4-3.9-5.3-5.8-8h4.1c1.3,2,2.6,4.1,3.6,6.4h0.5c0.9-2.3,2.3-4.4,3.6-6.4h4c-1.8,2.7-3.7,5.6-5.8,8v0.5c2.1,2.6,4,5.4,5.8,8.2h-4c-1.3-2-2.7-4.3-3.7-6.4h-0.5c-0.9,2.1-2.4,4.4-3.7,6.4h-4.1C125.7,23.5,127.7,20.7,129.7,18.1z",
  "M138.6,9.6h4.1c1.3,4,2.6,8,3.5,12.9h0.7c1.1-4.8,2.5-8.8,3.9-12.9h3.2c1.4,4,2.7,8,3.9,12.9h0.6c0.9-4.8,2.3-8.8,3.5-12.9h4l-5.7,16.7H156c-1.3-3.8-2.5-7.7-3.5-11.9H152c-1,4.2-2.3,8.1-3.6,11.9h-4.1L138.6,9.6z",
  "M165.3,22.1c0-3.2,2.6-4.4,5.6-5c3.5-0.8,5-0.9,5-2.4c0-1.4-1.2-2.6-3.1-2.6c-1.7,0-3.1,1-3.6,2.9l-3.3-1.1c1-3.4,4-4.7,7.1-4.7c3.8,0,6.6,1.9,6.6,5.8v6.1c0,2.8,0.2,3.9,0.5,5.2h-3.6c-0.2-0.8-0.4-1.6,0.1-3.2h-0.5c-0.9,2.5-2.9,3.8-5.3,3.8C168,26.8,165.3,25.3,165.3,22.1z M171.7,24.1c2.6,0,4.2-2.3,4.2-4.1v-1.7c-0.9,0.6-2.2,0.9-3.5,1.2c-1.5,0.3-3.3,1-3.3,2.6C169.2,23.4,170.3,24.1,171.7,24.1z",
  "M186.3,26.9l-6.5-17.3h3.9c1.5,4.1,3,8.1,4.3,13.5h0.5c1.3-5.3,2.8-9.4,4.3-13.5h3.8l-8.9,23.3H184L186.3,26.9z",
];

const NAVY = "#13315C";
const TEAL = "#2BC4A8";
const WHITE = "#FFFFFF";
const TILE = "M6.8,0h20.4C31,0,34,3,34,6.8v20.4c0,3.8-3,6.8-6.8,6.8H6.8C3,34,0,31,0,27.2V6.8C0,3,3,0,6.8,0z";

function Mark({ tile, routes }) {
  return (
    <>
      <path fill={tile} d={TILE} />
      <path fill={routes} d={MARK_ROUTES} />
      <circle fill={TEAL} cx="28.1" cy="17" r="2.2" />
    </>
  );
}
// "conve" + "x" take `fill`; "way" (last three letters) is always teal.
const Words = ({ fill }) => WORDMARK.map((d, i) => <path key={i} fill={i >= 6 ? TEAL : fill} d={d} />);

// variant: "light" (positivo), "dark" (white symbol on a navy plate) or "text" (white wordmark only).
// `height` is the symbol height; markOnly drops the wordmark (compact header on mobile).
export function Logo({ variant = "light", height = 34, markOnly = false, className = "" }) {
  const svg = (w, h, viewBox, children) => (
    <svg className={"logo " + className} width={w} height={h} viewBox={viewBox} role="img" aria-label="Convexway">{children}</svg>
  );
  if (variant === "text") {
    return svg((height * 153.9) / 23.8, height, "42.7 9.1 153.9 23.8", <Words fill={WHITE} />);
  }
  if (variant === "dark") {
    const w = markOnly ? 47 : 212.8;
    const plate = markOnly
      ? <rect width="47" height="47" rx="5.2" fill={NAVY} />
      : <path fill={NAVY} d="M207.7,47H5.2C2.3,47,0,44.7,0,41.8V5.2C0,2.3,2.3,0,5.2,0h202.5c2.9,0,5.2,2.3,5.2,5.2v36.7C212.8,44.7,210.5,47,207.7,47z" />;
    const s = height / 34;
    return svg(w * s, 47 * s, `0 0 ${w} 47`, (
      <>
        {plate}
        <g transform={markOnly ? "translate(6.5 6.5)" : "translate(8.1 6.5)"}>
          <Mark tile={WHITE} routes={NAVY} />
          {!markOnly && <Words fill={WHITE} />}
        </g>
      </>
    ));
  }
  const w = markOnly ? 34 : 196.6;
  return svg((height * w) / 34, height, `0 0 ${w} 34`, (
    <>
      <Mark tile={NAVY} routes={WHITE} />
      {!markOnly && <Words fill={NAVY} />}
    </>
  ));
}

export function Chevron({ open }) {
  return (
    <svg className={"chevron" + (open ? " open" : "")} width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </svg>
  );
}
