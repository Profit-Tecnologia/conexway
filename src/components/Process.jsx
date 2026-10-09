export default function Process({ t }) {
  const p = t.process;
  return (
    <section id="process" className="process">
      <div className="wrap process-grid">
        <div className="process-intro">
          <div className="eyebrow-dark">{p.eyebrow}</div>
          <h2>{p.title}</h2>
          <p className="process-note">{p.note}</p>
          <a href="#contact" className="btn-primary">{t.hero.cta2}</a>
        </div>
        <ol className="steps">
          {p.steps.map((st, i) => (
            <li key={i} className="step">
              <div className="step-rail">
                <span className="step-num">0{i + 1}</span>
                <span className="step-line" />
              </div>
              <div className="step-body">
                <div className="step-t">{st.t}</div>
                <div className="step-d">{st.d}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
