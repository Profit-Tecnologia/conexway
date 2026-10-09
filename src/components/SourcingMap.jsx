import { useEffect, useMemo, useRef, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import topo from "world-atlas/countries-110m.json";

const NAMES = {
  en: { CN: "China", VN: "Vietnam", BD: "Bangladesh", IN: "India", HK: "Hong Kong" },
  pt: { CN: "China", VN: "Vietnã", BD: "Bangladesh", IN: "Índia", HK: "Hong Kong" },
  zh: { CN: "中国", VN: "越南", BD: "孟加拉国", IN: "印度", HK: "香港" },
  es: { CN: "China", VN: "Vietnam", BD: "Bangladés", IN: "India", HK: "Hong Kong" },
};
// ISO numeric id -> [code, label anchor lon/lat]
const ORIGINS = { "156": ["CN", [104, 34]], "704": ["VN", [106, 15.5]], "050": ["BD", [90.3, 23.8]], "356": ["IN", [78.5, 22]] };
const HK = [114.17, 22.32];

const countries = feature(topo, topo.objects.countries).features;
const focus = { type: "FeatureCollection", features: countries.filter((f) => ORIGINS[f.id]) };

// China is the primary market; the other origins stay visible but secondary.
function fillFor(id) {
  const o = ORIGINS[id];
  if (!o) return "var(--map-land)";
  return o[0] === "CN" ? "var(--map-focus)" : "var(--map-dim)";
}

export default function SourcingMap({ lang }) {
  const boxRef = useRef(null);
  const [size, setSize] = useState(null);

  useEffect(() => {
    const el = boxRef.current;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width && height) setSize({ W: width, H: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const geo = useMemo(() => {
    if (!size) return null;
    const { W, H } = size;
    const proj = geoMercator().fitExtent([[W * 0.08, H * 0.08], [W * 0.92, H * 0.92]], focus);
    const path = geoPath(proj);
    const hk = proj(HK);
    const shapes = countries.map((f, i) => ({ key: f.id ?? "x" + i, id: f.id, d: path(f) }));
    const points = Object.values(ORIGINS).map(([code, ll]) => {
      const p = proj(ll);
      const arc = code === "CN"
        ? `M${p[0]},${p[1]} Q${(p[0] + hk[0]) / 2 + 30},${(p[1] + hk[1]) / 2} ${hk[0]},${hk[1]}`
        : `M${p[0]},${p[1]} Q${(p[0] + hk[0]) / 2},${Math.min(p[1], hk[1]) - Math.abs(hk[0] - p[0]) * 0.25} ${hk[0]},${hk[1]}`;
      return { code, p, arc };
    });
    return { shapes, points, hk };
  }, [size]);

  const names = NAMES[lang] || NAMES.pt;

  return (
    <div ref={boxRef} style={{ width: "100%", height: "100%" }}>
      {geo && (
        <svg className="map-svg" viewBox={`0 0 ${size.W} ${size.H}`} role="img" aria-label="Map">
          <g>
            {geo.shapes.map((s) => (
              <path key={s.key} d={s.d} style={{ fill: fillFor(s.id) }}
                stroke={ORIGINS[s.id] ? "var(--map-halo)" : "var(--map-edge)"} strokeWidth={ORIGINS[s.id] ? 1 : 0.7} />
            ))}
          </g>
          <g>
            {geo.points.map(({ code, arc }) => (
              <path key={"a" + code} className={"map-route" + (code === "CN" ? " cn" : "")} d={arc} fill="none" strokeWidth={2} strokeDasharray="6 6" />
            ))}
            {geo.points.map(({ code, p }) => [
              <circle key={"c" + code} cx={p[0]} cy={p[1]} r={5} fill="#fff" strokeWidth={2}
                style={{ stroke: code === "CN" ? "var(--map-halo)" : "var(--map-focus)" }} />,
              <text key={"t" + code} className={"map-lbl" + (code === "CN" ? " main" : "")} x={p[0]} y={p[1] - 12} textAnchor="middle">
                {names[code]}
              </text>,
            ])}
            <circle className="map-pulse" cx={geo.hk[0]} cy={geo.hk[1]} r={6} fill="#2BC4A8" />
            <circle cx={geo.hk[0]} cy={geo.hk[1]} r={7} fill="#2BC4A8" stroke="#fff" strokeWidth={2.5} />
            <text className="map-hk" x={geo.hk[0] + 14} y={geo.hk[1] + 5}>{names.HK}</text>
          </g>
        </svg>
      )}
    </div>
  );
}
