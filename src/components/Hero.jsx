// Route artwork: lines converging into a hub, then fanning out. [y, opacity, width, duration, delay]
const HERO_IN = [
  [14.5, .35, 1.18, 3.98, -2.66], [44.1, .2, 2.41, 5.36, -2.46], [69, .41, 2.05, 3.31, -2.99], [97.4, .38, 1.25, 5.24, -2.92],
  [125.5, .2, 2.5, 6.88, -.72], [160.2, .47, 1.3, 4.68, -3.3], [194.1, .26, 1.27, 6.94, -2.67], [214.7, .34, 1.53, 3.61, -4.64],
  [246.4, .29, 1.13, 6.7, -1.43], [286.3, .32, 1.38, 5.41, -2.41], [313.2, .38, 1.22, 3.9, -2.7], [329.1, .19, 1.66, 5.72, -3.88],
  [375.8, .28, 1.7, 4.98, -2.63], [402.8, .32, 1.7, 4.06, -1.42], [430.2, .22, 1.43, 6.07, -5.15], [464, .46, 2.38, 5.99, -3.84],
  [485.1, .19, 1.52, 4.43, -1.29], [511.2, .39, 2.18, 4.07, -5.74], [532.8, .29, 1.94, 4.76, -.54], [581.8, .32, 2.4, 5.35, -2.81],
  [593.8, .42, 2.43, 4.06, -.15], [623.8, .39, 2.12, 5.64, -5.22], [654.6, .43, 1.27, 3.15, -.49], [679.8, .34, 2.33, 6.37, -.87],
  [718.5, .2, 1.45, 4.95, -.38], [745.1, .25, 1.47, 6.16, -.82], [770.6, .18, 2, 3.35, -2.42], [798.8, .32, 1.66, 3.03, -4.54],
  [835, .4, 1.54, 6.72, -4.3], [868.1, .26, 1.58, 3.31, -5.29],
];
const HERO_OUT = [158.4, 299.2, 440, 580.8, 721.6];
const HUB = { x: 1180, y: 440 };

function HeroArt() {
  return (
    <svg className="hero-art cvx-anim" viewBox="0 0 2000 880" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {HERO_IN.map(([y, o, w, dur, delay], i) => {
        const d = `M-20,${y} C649,${y} 708,${HUB.y} ${HUB.x},${HUB.y}`;
        return (
          <g key={"i" + i}>
            <path d={d} fill="none" stroke="#8FA6C8" strokeOpacity={o} strokeWidth={w} />
            <path d={d} fill="none" stroke="#C9D6EA" strokeWidth={w + 0.6} strokeLinecap="round" strokeDasharray="40 360"
              style={{ animation: `cvxFlow ${dur}s linear ${delay}s infinite` }} />
          </g>
        );
      })}
      {HERO_OUT.map((y, i) => {
        const main = y === HUB.y;
        const d = `M${HUB.x},${HUB.y} C1508,${HUB.y} 1590,${y} 2020,${y}`;
        return (
          <g key={"o" + i}>
            <path d={d} fill="none" stroke="#2BC4A8" strokeOpacity={main ? 1 : 0.4} strokeWidth={main ? 4 : 2} />
            <path d={d} fill="none" stroke="#B8F2E6" strokeWidth={main ? 5 : 2.5} strokeLinecap="round" strokeDasharray="60 340"
              style={{ animation: `cvxFlow ${main ? 2.4 : 3.4}s linear ${-0.7 * i}s infinite` }} />
          </g>
        );
      })}
      {[0, -1.2].map((delay) => (
        <circle key={delay} cx={HUB.x} cy={HUB.y} r="22" fill="#2BC4A8"
          style={{ transformOrigin: `${HUB.x}px ${HUB.y}px`, animation: `cvxPulse 2.4s ease-out ${delay}s infinite` }} />
      ))}
      <circle cx={HUB.x} cy={HUB.y} r="12" fill="#2BC4A8" stroke="#0B1F3A" strokeWidth="3" />
    </svg>
  );
}

export default function Hero({ t }) {
  const h = t.hero;
  // Highlight the second sentence of the headline ("Simplificando negócios.").
  const [, first = h.h1, second = ""] = h.h1.match(/^(.+?[.。，,]\s*)(.+)$/) || [];
  return (
    <section id="home" className="hero">
      <HeroArt />
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <h1>{first}{second && <span className="hl">{second}</span>}</h1>
          <p className="hero-sub">{h.sub}</p>
          <div className="hero-ctas">
            <a href="#contact" className="btn-primary">{h.cta1}</a>
            <a href="#services" className="btn-ghost">{h.cta2}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
