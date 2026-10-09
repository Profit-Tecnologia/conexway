import { useState } from "react";
import { LANGS } from "../i18n";

const EMPTY = { name: "", company: "", email: "", country: "", category: "", message: "", lang: "", origin: "" };
const REQUIRED = ["name", "company", "email", "country", "category", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({ id, label, error, full, children }) {
  return (
    <div className={"field" + (full ? " full" : "") + (error ? " invalid" : "")}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error !== undefined && <span className="field-error">{error}</span>}
    </div>
  );
}

export default function Contact({ t, lang, onSent }) {
  const c = t.contact;
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const label = (k) => c[k] + (REQUIRED.includes(k) ? " *" : "");
  const bind = (k) => ({
    id: "cf-" + k,
    value: form[k],
    onChange: (e) => {
      const v = e.target.value;
      setForm((f) => ({ ...f, [k]: v }));
      setErrors((er) => ({ ...er, [k]: undefined }));
    },
  });
  const text = (k, type = "text", full = false) => (
    <Field key={k} id={"cf-" + k} label={label(k)} error={errors[k] || ""} full={full}>
      <input type={type} {...bind(k)} />
    </Field>
  );

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    REQUIRED.forEach((k) => { if (!form[k].trim()) errs[k] = c.required; });
    if (form.email.trim() && !EMAIL_RE.test(form.email.trim())) errs.email = c.emailErr;
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setForm(EMPTY);
    setErrors({});
    onSent();
  };

  return (
    <section id="contact">
      <div className="wrap contact-grid">
        <div className="col" style={{ gap: 20 }}>
          <div className="eyebrow">{c.eyebrow}</div>
          <h2 className="h2">{c.title}</h2>
          <p className="lead">{c.intro}</p>
          <a href="mailto:customerdesk@convexway.com" className="mail">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#0E8C7A" aria-hidden="true"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" /></svg>
            customerdesk@convexway.com
          </a>
          <div className="include">
            <div className="include-t">{c.includeT}</div>
            {c.include.map((i) => <div key={i} className="include-item">{i}</div>)}
          </div>
        </div>
        <form className="form" onSubmit={submit} noValidate>
          {text("name")}
          {text("company")}
          {text("email", "email")}
          {text("country")}
          <Field id="cf-lang" label={c.lang}>
            <select {...bind("lang")} value={form.lang || lang}>
              {LANGS.map(([code, , , name]) => <option key={code} value={code}>{name}</option>)}
            </select>
          </Field>
          <Field id="cf-origin" label={c.origin}>
            <select {...bind("origin")} value={form.origin || "0"}>
              {c.originOpts.map((o, i) => <option key={i} value={String(i)}>{o}</option>)}
            </select>
          </Field>
          {text("category", "text", true)}
          <Field id="cf-message" label={label("message")} error={errors.message || ""} full>
            <textarea rows={5} {...bind("message")} />
          </Field>
          <div className="form-foot">
            <p className="privacy">{c.privacy} <a href="#privacy">{t.footer.privacy}</a></p>
            <button type="submit" className="submit">{c.submit}</button>
          </div>
        </form>
      </div>
    </section>
  );
}
