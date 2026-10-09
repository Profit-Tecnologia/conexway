import { useState } from "react";
import { LANGS, HREFS } from "../i18n";
import { Logo } from "./Icons";

export default function Header({ t, lang, onLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = t.nav.map((label, i) => ({ label, href: HREFS[i] }));
  return (
    <header className="header">
      <div className="wrap header-bar">
        <a href="#home" className="brand">
          <Logo tile />
          <span>CONVEXWAY</span>
        </a>
        <div className="spacer" />
        <nav className="nav">
          {items.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <div className="langs" role="group" aria-label="Language">
          {LANGS.map(([code, label]) => (
            <button key={code} aria-pressed={code === lang} onClick={() => onLang(code)}>{label}</button>
          ))}
        </div>
        <button className="menu-btn" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-menu">
          {items.map((n) => <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}>{n.label}</a>)}
        </div>
      )}
    </header>
  );
}
