export default function Hero({ t }) {
  const h = t.hero;
  return (
    <section id="home" className="hero">
      <div className="hero-top">
        <img className="hero-bg" src="images/hero-routes.png" alt="" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>{h.h1}</h1>
            <p className="hero-sub">{h.sub}</p>
            <div className="hero-ctas">
              <a href="#contact" className="btn-primary">{h.cta1}</a>
              <a href="#services" className="btn-ghost">{h.cta2}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
