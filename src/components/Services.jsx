import { useState } from "react";
import { ServicesAnimation } from "./Animations";
import { Chevron } from "./Icons";

export default function Services({ t }) {
  const s = t.services;
  const [open, setOpen] = useState(null);
  return (
    <section id="services">
      <div className="wrap section" style={{ gap: 48 }}>
        <div className="services-head">
          <div className="col" style={{ gap: 20, maxWidth: 640 }}>
            <div className="eyebrow">{s.eyebrow}</div>
            <h2 className="h2" style={{ textWrap: "initial" }}>{s.title}</h2>
          </div>
          <p className="muted" style={{ margin: 0, maxWidth: 360 }}>{s.intro}</p>
        </div>
        <div className="services-anim"><ServicesAnimation /></div>
        <div className="services-grid">
          {s.items.map((it, i) => (
            <div key={i} className="service">
              <button className="toggle" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                <span className="service-num">0{i + 1}</span>
                <span className="service-t">{it.t}</span>
                <Chevron open={open === i} />
              </button>
              {open === i && <div className="muted" style={{ paddingLeft: 38 }}>{it.d}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
