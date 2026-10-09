import { useState } from "react";
import { LANGS, HREFS } from "../i18n";
import { Logo } from "./Icons";

export default function Header({ t, lang, onLang, theme, onTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = t.nav.map((label, i) => ({ label, href: HREFS[i] }));
  return (
    <header className="header">
      <div className="wrap header-bar">
        <a href="#home" className="brand">
          <Logo variant={theme} className="logo-full" />
          <Logo variant={theme} markOnly className="logo-mark" />
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
        <button className="icon-btn" aria-label="Toggle theme" title="Light / dark" onClick={onTheme}>
          {theme === "dark" ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM2 13h2v-2H2v2zm18 0h2v-2h-2v2zM11 2v2h2V2h-2zm0 18v2h2v-2h-2zM5.99 4.58 4.58 5.99l1.41 1.41 1.41-1.41-1.41-1.41zm12.37 12.02-1.41 1.41 1.41 1.41 1.41-1.41-1.41-1.41zm1.41-10.6-1.41-1.42-1.41 1.42 1.41 1.41 1.41-1.41zM7.4 18.01l-1.41-1.41-1.41 1.41 1.41 1.41 1.41-1.41z" /></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.39 5.39 0 0 1-4.4 2.26 5.4 5.4 0 0 1-5.4-5.4c0-1.81.89-3.42 2.26-4.4A9.1 9.1 0 0 0 12 3z" /></svg>
          )}
        </button>
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
