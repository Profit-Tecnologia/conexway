import { useState } from "react";
import { ServicesAnimation } from "./Animations";
import { Chevron } from "./Icons";

export default function Services({ t }) {
  const s = t.services;
  const [open, setOpen] = useState(null);
  return (
    <section id="services">
      <div className="wrap section" style={{ gap: 48 }}>
        <h2 className="h2">{s.title}</h2>
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
