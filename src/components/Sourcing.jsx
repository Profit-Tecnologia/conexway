import { useState } from "react";
import SourcingMap from "./SourcingMap";

export default function Sourcing({ t, lang }) {
  const s = t.sourcing;
  const [highlight, setHighlight] = useState(null);
  return (
    <section id="sourcing" className="bg-white">
      <div className="wrap section" style={{ gap: 48 }}>
        <div className="col" style={{ gap: 20, maxWidth: 760 }}>
          <div className="eyebrow">{s.eyebrow}</div>
          <h2 className="h2">{s.title}</h2>
          <p className="lead">{s.intro}</p>
        </div>
        <div className="map-box">
          <SourcingMap lang={lang} highlight={highlight} />
        </div>
        <div className="countries">
          {s.countries.map((c) => (
            <div key={c.code} className="country-card"
              onMouseEnter={() => setHighlight(c.code === "+" ? null : c.code)}
              onMouseLeave={() => setHighlight(null)}>
              <div className="country-code">{c.code}</div>
              <div className="country-name">{c.name}</div>
              <div className="muted">{c.d}</div>
            </div>
          ))}
        </div>
        <div className="note">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#0288D1" style={{ flex: "none" }} aria-hidden="true">
            <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          </svg>
          <span>{s.note}</span>
        </div>
        <div className="col" style={{ gap: 16 }}>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>{s.criteriaT}</h3>
          <div className="criteria">
            {s.criteria.map((l, i) => <span key={l} className="criterion"><b>{i + 1}</b>{l}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
