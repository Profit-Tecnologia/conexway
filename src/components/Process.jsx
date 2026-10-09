const ICONS = ["forum", "travel_explore", "handshake", "verified"];

export default function Process({ t }) {
  const p = t.process;
  return (
    <section id="process">
      <div className="wrap section" style={{ gap: 40 }}>
        <div className="process-head">
          <h2 className="h2">{p.title}</h2>
        </div>
        <ol className="steps">
          {p.steps.map((st, i) => (
            <li key={i} className={"step tone-" + i}>
              <div className="step-top">
                <span className="step-icon msr" aria-hidden="true">{ICONS[i]}</span>
                <span className="step-n">0{i + 1}</span>
              </div>
              <h3 className="step-t">{st.t}</h3>
              <p className="step-d">{st.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
