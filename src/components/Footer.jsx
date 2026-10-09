import { Logo } from "./Icons";

export default function Footer({ t }) {
  const f = t.footer;
  return (
    <footer id="privacy" className="footer">
      <div className="wrap">
        <div className="footer-brand">
          <Logo size={30} />
          <div className="col" style={{ gap: 2 }}>
            <span className="footer-name">CONVEXWAY</span>
            <span className="footer-tag">{f.tagline}</span>
          </div>
        </div>
        <div className="footer-links">
          <span>{f.rights}</span>
          <a href="#privacy">{f.privacy}</a>
          <a href="#privacy">{f.cookies}</a>
        </div>
      </div>
    </footer>
  );
}
