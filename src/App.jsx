import { useEffect, useRef, useState } from "react";
import { T, LANGS } from "./i18n";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About, { Audience } from "./components/About";
import Sourcing from "./components/Sourcing";
import Services from "./components/Services";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const DEFAULT_LANG = "pt";
// "markets" -> "Connecting markets…", "borders" -> "Your business, without borders."
const HEADLINE = "markets";

const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
};

function initialLang() {
  const q = new URLSearchParams(location.search).get("lang");
  if (T[q]) return q;
  const saved = store.get("cvx_lang");
  return T[saved] ? saved : DEFAULT_LANG;
}

function updateMeta(code) {
  const t = T[code];
  const L = LANGS.find((l) => l[0] === code);
  document.documentElement.lang = L[2];
  document.title = t.meta.title;
  let m = document.querySelector('meta[name="description"]');
  if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
  m.content = t.meta.desc;
  document.querySelectorAll("link[data-cvx-alt]").forEach((n) => n.remove());
  LANGS.forEach((l) => {
    const a = document.createElement("link");
    a.rel = "alternate";
    a.hreflang = l[2];
    a.href = location.pathname + "?lang=" + l[0];
    a.setAttribute("data-cvx-alt", "");
    document.head.appendChild(a);
  });
}

export default function App() {
  const [lang, setLang] = useState(initialLang);
  const [showCookie, setShowCookie] = useState(() => !store.get("cvx_cookie"));
  const [sent, setSent] = useState(false);
  const sentTimer = useRef();
  const t = T[lang];

  useEffect(() => updateMeta(lang), [lang]);
  useEffect(() => () => clearTimeout(sentTimer.current), []);

  const changeLang = (code) => {
    setLang(code);
    store.set("cvx_lang", code);
    try { history.replaceState(null, "", location.pathname + "?lang=" + code + location.hash); } catch { /* ignore */ }
  };

  const onSent = () => {
    setSent(true);
    clearTimeout(sentTimer.current);
    sentTimer.current = setTimeout(() => setSent(false), 6000);
  };

  return (
    <div className="page">
      <Header t={t} lang={lang} onLang={changeLang} />
      <main>
        <Hero t={t} headline={HEADLINE} />
        <Audience t={t} />
        <About t={t} />
        <Sourcing t={t} lang={lang} />
        <Services t={t} />
        <Process t={t} />
        {/* key resets form errors when the language changes, like the original */}
        <Contact key={lang} t={t} lang={lang} onSent={onSent} />
      </main>
      <Footer t={t} />

      {showCookie && (
        <div className="cookie">
          <span>{t.cookie.text}</span>
          <button onClick={() => { setShowCookie(false); store.set("cvx_cookie", "1"); }}>{t.cookie.ok}</button>
        </div>
      )}
      {sent && (
        <div className="toast" role="status">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
          <span>{t.contact.success}</span>
          <button aria-label="Close" onClick={() => setSent(false)}>×</button>
        </div>
      )}
    </div>
  );
}
