export default function Hero({ t }) {
  const h = t.hero;
  // Highlight the second sentence of the headline ("Simplificando negócios.").
  const [, first = h.h1, second = ""] = h.h1.match(/^(.+?[.。，,]\s*)(.+)$/) || [];
  return (
    <section id="home" className="hero">
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
