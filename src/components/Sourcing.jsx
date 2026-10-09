import SourcingMap from "./SourcingMap";

export default function Sourcing({ t, lang }) {
  return (
    <section id="markets" className="bg-white">
      <div className="wrap section" style={{ gap: 32 }}>
        <h2 className="h2">{t.markets.title}</h2>
        <div className="map-box">
          <SourcingMap lang={lang} />
        </div>
      </div>
    </section>
  );
}
