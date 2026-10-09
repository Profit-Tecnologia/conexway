import { Logo } from "./Icons";

export default function Footer({ t }) {
  const f = t.footer;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-brand">
          <Logo height={30} />
          <span className="footer-tag">{f.tagline}</span>
        </div>
        <div className="footer-links">
          <span>{f.rights}</span>
        </div>
      </div>
    </footer>
  );
}
