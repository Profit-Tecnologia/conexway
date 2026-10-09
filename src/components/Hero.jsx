// Route artwork from the design: lines converging into a hub, then fanning out.
const HERO_IN = Array.from({ length: 34 }, (_, k) => {
  const y = -40 + k * 15.5;
  return { d: `M-10 ${y} C200 ${y} 300 220 420 220`, o: (0.25 + 0.5 * (1 - Math.abs(k - 17) / 17)).toFixed(2) };
});
const HERO_OUT = Array.from({ length: 10 }, (_, k) => {
  const y = k < 5 ? -20 + k * 30 : 320 + (k - 5) * 30;
  return `M420 220 C500 220 520 ${y} 620 ${y}`;
});

export default function Hero({ t }) {
  const h = t.hero;
  // Highlight the second sentence of the headline ("Simplificando negócios.").
  const [, first = h.h1, second = ""] = h.h1.match(/^(.+?[.。，,]\s*)(.+)$/) || [];
  return (
    <section id="home" className="hero">
      <div className="wrap hero-wrap">
        <div className="hero-card">
          <div className="hero-copy">
            <h1>{first}{second && <span className="hl">{second}</span>}</h1>
            <p className="hero-sub">{h.sub}</p>
            <div className="hero-ctas">
              <a href="#contact" className="btn-primary">{h.cta1}</a>
              <a href="#services" className="btn-ghost">{h.cta2}</a>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <svg viewBox="0 0 600 440" preserveAspectRatio="xMidYMid slice">
              {HERO_IN.map((p, i) => <path key={"i" + i} d={p.d} fill="none" stroke="#A8C7FA" strokeOpacity={p.o} strokeWidth="1" />)}
              {HERO_OUT.map((d, i) => <path key={"o" + i} d={d} fill="none" stroke="#2BC4A8" strokeOpacity="0.45" strokeWidth="1.2" />)}
              <path d="M420 220H600" stroke="#2BC4A8" strokeWidth="3" />
              <circle cx="420" cy="220" r="26" fill="#2BC4A8" fillOpacity="0.18" />
              <circle cx="420" cy="220" r="9" fill="#2BC4A8" stroke="#FFFFFF" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
