import SourcingMap from "./SourcingMap";

export default function Sourcing({ t, lang }) {
  const m = t.markets;
  return (
    <section id="markets" className="bg-white">
      <div className="wrap section">
        <h2 className="h2">{m.title}</h2>
        <p className="lead markets-sub">{m.sub}</p>
        <div className="markets-grid">
          <div className="map-box">
            <SourcingMap lang={lang} />
          </div>
          <ul className="market-list">
            {m.items.map((it) => (
              <li key={it.n} className={"market " + it.k}>
                <span className="market-dot" />
                <span className="market-name">{it.n}</span>
                <span className="market-tag">{it.t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
