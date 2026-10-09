// Deterministic pseudo-random generator so the artwork is identical on every render.
const seeded = (seed) => {
  let s = seed;
  return () => (s = (s * 9301 + 49297) % 233280) / 233280;
};

const svgProps = (W, H) => ({
  className: "cvx-anim",
  viewBox: `0 0 ${W} ${H}`,
  preserveAspectRatio: "xMidYMid slice",
  style: { width: "100%", height: "100%", display: "block" },
  "aria-hidden": true,
});

const ABOUT = (() => {
  const rnd = seeded(7);
  const W = 2000, H = 880, hx = 1180, hy = 440, inc = [], out = [];
  for (let i = 0; i < 30; i++) {
    const y = (H * (i + 0.5)) / 30 + (rnd() - 0.5) * 20;
    inc.push({
      d: `M-20,${y.toFixed(1)} C${hx * 0.55},${y.toFixed(1)} ${hx * 0.6},${hy} ${hx},${hy}`,
      o: 0.18 + rnd() * 0.3,
      w: 1 + rnd() * 1.6,
      dur: (3 + rnd() * 4).toFixed(2),
      del: (-rnd() * 6).toFixed(2),
    });
  }
  for (let i = 0; i < 5; i++) {
    const y = hy + (i - 2) * H * 0.16;
    out.push({ d: `M${hx},${hy} C${hx + (W - hx) * 0.4},${hy} ${hx + (W - hx) * 0.5},${y} ${W + 20},${y}`, main: i === 2 });
  }
  return { W, H, hx, hy, inc, out };
})();

export function AboutAnimation() {
  const A = ABOUT;
  return (
    <svg {...svgProps(A.W, A.H)}>
      {A.inc.map((p, i) => [
        <path key={"b" + i} d={p.d} fill="none" stroke="#8FA6C8" strokeOpacity={p.o} strokeWidth={p.w} />,
        <path key={"f" + i} d={p.d} fill="none" stroke="#C9D6EA" strokeWidth={p.w + 0.6} strokeLinecap="round" strokeDasharray="40 360"
          style={{ animation: `cvxFlow ${p.dur}s linear ${p.del}s infinite` }} />,
      ])}
      {A.out.map((p, i) => [
        <path key={"o" + i} d={p.d} fill="none" stroke="#2BC4A8" strokeOpacity={p.main ? 1 : 0.4} strokeWidth={p.main ? 4 : 2} />,
        <path key={"of" + i} d={p.d} fill="none" stroke="#B8F2E6" strokeWidth={p.main ? 5 : 2.5} strokeLinecap="round" strokeDasharray="60 340"
          style={{ animation: `cvxFlow ${p.main ? 2.4 : 3.4}s linear ${-i * 0.7}s infinite` }} />,
      ])}
      {[0, -1.2].map((d, i) => (
        <circle key={"p" + i} cx={A.hx} cy={A.hy} r={22} fill="#2BC4A8"
          style={{ transformOrigin: `${A.hx}px ${A.hy}px`, animation: `cvxPulse 2.4s ease-out ${d}s infinite` }} />
      ))}
      <circle cx={A.hx} cy={A.hy} r={12} fill="#2BC4A8" stroke="#0B1F3A" strokeWidth={3} />
    </svg>
  );
}

const SVC = (() => {
  const rnd = seeded(3);
  const nodes = [];
  for (let i = 0; i < 22; i++) nodes.push([80 + Math.round(rnd() * 23) * 80, 80 + Math.round(rnd() * 7) * 80]);
  const links = nodes.map((p, i) => {
    const q = nodes[(i * 7 + 3) % nodes.length];
    return `M${p[0]},${p[1]} H${q[0]} V${q[1]}`;
  });
  return { W: 2000, H: 760, nodes, links };
})();

const MAIN_ROUTE = "M0,400 H720 V240 H1360 V480 H2000";
const TURNS = [[720, 400], [720, 240], [1360, 240], [1360, 480]];

export function ServicesAnimation() {
  const { W, H, nodes, links } = SVC;
  const xs = [], ys = [];
  for (let x = 0; x <= W; x += 80) xs.push(x);
  for (let y = 0; y <= H; y += 80) ys.push(y);
  return (
    <svg {...svgProps(W, H)}>
      {xs.map((x) => <line key={"vx" + x} x1={x} y1={0} x2={x} y2={H} stroke="#DCE2EA" strokeWidth={1} />)}
      {ys.map((y) => <line key={"hy" + y} x1={0} y1={y} x2={W} y2={y} stroke="#DCE2EA" strokeWidth={1} />)}
      {links.map((d, i) => [
        <path key={"l" + i} d={d} fill="none" stroke="#13315C" strokeOpacity={0.5} strokeWidth={3} />,
        i % 3 === 0 && (
          <path key={"lf" + i} d={d} fill="none" stroke="#13315C" strokeWidth={4} strokeLinecap="round" strokeDasharray="30 370"
            style={{ animation: `cvxFlow ${4 + (i % 5)}s linear ${-i * 0.6}s infinite` }} />
        ),
      ])}
      <path d={MAIN_ROUTE} fill="none" stroke="#2BC4A8" strokeWidth={5} />
      <path d={MAIN_ROUTE} fill="none" stroke="#0E8C7A" strokeWidth={7} strokeLinecap="round" strokeDasharray="80 320"
        style={{ animation: "cvxFlow 3s linear infinite" }} />
      {nodes.map((p, i) => <circle key={"n" + i} cx={p[0]} cy={p[1]} r={9} fill="#fff" stroke="#13315C" strokeWidth={3} />)}
      {TURNS.map((p, i) => {
        const origin = `${p[0]}px ${p[1]}px`;
        return [
          <circle key={"pp" + i} cx={p[0]} cy={p[1]} r={13} fill="#2BC4A8"
            style={{ transformOrigin: origin, animation: `cvxPulse 3s ease-out ${i * 0.75}s infinite` }} />,
          <circle key={"pn" + i} cx={p[0]} cy={p[1]} r={13} fill="#2BC4A8"
            style={{ transformOrigin: origin, animation: `cvxNode 3s ease-in-out ${i * 0.75}s infinite` }} />,
        ];
      })}
    </svg>
  );
}
