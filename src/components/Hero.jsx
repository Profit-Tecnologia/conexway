import { Logo } from "./Icons";

export default function Hero({ t, headline }) {
  const h = t.hero;
  return (
    <section id="home" className="hero">
      <div className="hero-top">
        <img className="hero-bg" src="images/hero-routes.png" alt="" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="eyebrow-dark">{h.eyebrow}</div>
            <h1>{headline === "borders" ? h.h1b : h.h1a}</h1>
            <p className="hero-sub">{h.sub}</p>
            <div className="hero-ctas">
              <a href="#sourcing" className="btn-primary">{h.cta1}</a>
              <a href="#contact" className="btn-ghost">{h.cta2}</a>
            </div>
          </div>
          <div className="hero-panel">
            <div className="panel-label">{h.originsLabel}</div>
            <div className="col" style={{ gap: 8 }}>
              {t.sourcing.countries.map((c) => (
                <div key={c.code} className="origin-row">
                  {c.code === "+" ? (
                    <span className="flag-plus">+</span>
                  ) : (
                    <span className="flag" role="img" aria-label={c.name}
                      style={{ backgroundImage: `url(https://flagcdn.com/w80/${c.code.toLowerCase()}.png)` }} />
                  )}
                  <span className="origin-name">{c.name}</span>
                  <span className="origin-line" />
                </div>
              ))}
            </div>
            <div className="hub">
              <Logo size={26} stroke="#0B1F3A" dot="#fff" />
              <div className="col" style={{ gap: 1 }}>
                <span className="hub-name">CONVEXWAY</span>
                <span className="hub-sub">{h.hub}</span>
              </div>
            </div>
            <div className="panel-caption">{h.caption}</div>
          </div>
        </div>
      </div>
      <div className="pillars-wrap">
        <div className="wrap pillars">
          {h.pillars.map((p) => (
            <div key={p.t} className="col" style={{ gap: 8 }}>
              <div className="pillar-t">{p.t}</div>
              <div className="pillar-d">{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
