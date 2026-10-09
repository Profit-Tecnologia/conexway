import { useState } from "react";
import { AboutAnimation } from "./Animations";
import { Chevron } from "./Icons";

export function Audience({ t }) {
  return (
    <section className="audience">
      <div className="wrap">
        <div className="audience-title">{t.audience.title}</div>
        <div className="chips">
          {t.audience.items.map((a) => <span key={a} className="chip">{a}</span>)}
        </div>
      </div>
    </section>
  );
}

export default function About({ t }) {
  const a = t.about;
  const [open, setOpen] = useState(null);
  return (
    <section id="about">
      <div className="wrap section" style={{ gap: 56 }}>
        <div className="about-intro">
          <div className="col" style={{ gap: 20 }}>
            <div className="eyebrow">{a.eyebrow}</div>
            <h2 className="h2">{a.title}</h2>
          </div>
          <div className="col" style={{ gap: 20 }}>
            <p className="lead">{a.body}</p>
            <p className="lead"><strong style={{ color: "#0B1F3A" }}>{a.visionT}.</strong> {a.visionD}</p>
          </div>
        </div>
        <div className="about-anim"><AboutAnimation /></div>
        <div className="hk-card">
          <div className="col" style={{ gap: 6 }}>
            <div className="hk-eyebrow">Hong Kong · 香港</div>
            <div className="hk-title">{a.hkT}</div>
          </div>
          <p className="hk-text">{a.hkD}</p>
        </div>
        <div className="col" style={{ gap: 24 }}>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>{a.valuesT}</h3>
          <div className="values">
            {a.values.map((v, i) => (
              <div key={i} className="value-card">
                <button className="toggle" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                  <span className="value-t">{v.t}</span>
                  <Chevron open={open === i} />
                </button>
                {open === i && <div className="muted" style={{ paddingTop: 8 }}>{v.d}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
