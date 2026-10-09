export default function Process({ t }) {
  const p = t.process;
  return (
    <section id="process">
      <div className="wrap section" style={{ gap: 40 }}>
        <div className="process-head">
          <h2 className="h2">{p.title}</h2>
          <a href="#contact" className="btn-tonal">{t.hero.cta1}</a>
        </div>
        <ol className="steps">
          {p.steps.map((st, i) => (
            <li key={i} className={"step tone-" + i}>
              <span className="step-num">0{i + 1}</span>
              <div className="step-t">{st.t}</div>
              <div className="step-d">{st.d}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
