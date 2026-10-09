import { useState } from "react";
import { Chevron } from "./Icons";

export default function Services({ t }) {
  const s = t.services;
  const [open, setOpen] = useState(0);
  return (
    <section id="services">
      <div className="wrap section" style={{ gap: 32 }}>
        <h2 className="h2">{s.title}</h2>
        <div className="services-layout">
          <div className="photo services-photo">
            <img src="images/quality-inspection.jpg" alt="" loading="lazy" />
          </div>
          <div className="services-list">
            {s.items.map((it, i) => (
              <div key={i} className="service">
                <button className="toggle" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                  <span className="service-num">0{i + 1}</span>
                  <span className="service-t">{it.t}</span>
                  <Chevron open={open === i} />
                </button>
                {open === i && <div className="muted service-d">{it.d}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
