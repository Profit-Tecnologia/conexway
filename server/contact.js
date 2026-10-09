// Shared contact-form handler used by both the Vercel (api/contact.js) and
// Netlify (netlify/functions/contact.js) entry points.
//
// Environment variables:
//   SMTP_HOST, SMTP_PORT (default 465), SMTP_USER, SMTP_PASS
//   SMTP_SECURE  "true" for port 465 (default), "false" for 587/STARTTLS
//   MAIL_TO      recipient (default customerdesk@convexway.com)
//   MAIL_FROM    sender (default SMTP_USER) — must be allowed by the SMTP account
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUIRED = ["name", "company", "email", "country", "category", "message"];
const FIELDS = [
  ["name", "Nome"],
  ["company", "Empresa"],
  ["email", "E-mail"],
  ["country", "País"],
  ["lang", "Idioma de preferência"],
  ["origin", "País de origem desejado"],
  ["category", "Categoria / necessidade"],
  ["message", "Mensagem"],
];
const MAX = { message: 5000, default: 300 };

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
// Strip line breaks from anything that ends up in a header.
const oneLine = (s) => s.replace(/[\r\n]+/g, " ");

let transport;
function getTransport() {
  if (!transport) {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) throw new Error("SMTP is not configured");
    transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 465),
      secure: SMTP_SECURE ? SMTP_SECURE === "true" : true,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return transport;
}

/** @returns {Promise<{status:number, body:object}>} */
export async function handleContact(input) {
  if (!input || typeof input !== "object") return { status: 400, body: { ok: false, error: "invalid_body" } };

  // Honeypot filled in: pretend success so bots don't retry.
  if (input._honey) return { status: 200, body: { ok: true } };

  const data = {};
  for (const [key] of FIELDS) {
    const v = typeof input[key] === "string" ? input[key].trim() : "";
    data[key] = v.slice(0, MAX[key] || MAX.default);
  }
  const missing = REQUIRED.filter((k) => !data[k]);
  if (missing.length) return { status: 400, body: { ok: false, error: "missing_fields", fields: missing } };
  if (!EMAIL_RE.test(data.email)) return { status: 400, body: { ok: false, error: "invalid_email", fields: ["email"] } };

  const rows = FIELDS.filter(([k]) => data[k]);
  const text = rows.map(([k, label]) => `${label}: ${data[k]}`).join("\n");
  const html =
    `<table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">` +
    rows
      .map(([k, label]) =>
        `<tr><th align="left" valign="top" style="border-bottom:1px solid #ddd;white-space:nowrap">${label}</th>` +
        `<td style="border-bottom:1px solid #ddd;white-space:pre-wrap">${escapeHtml(data[k])}</td></tr>`)
      .join("") +
    `</table>`;

  try {
    await getTransport().sendMail({
      from: { name: "Site CONVEXWAY", address: process.env.MAIL_FROM || process.env.SMTP_USER },
      to: process.env.MAIL_TO || "customerdesk@convexway.com",
      replyTo: { name: oneLine(data.name), address: data.email },
      subject: oneLine(`Nova consulta pelo site — ${data.company} (${data.name})`),
      text,
      html,
    });
  } catch (err) {
    console.error("contact: send failed", err);
    return { status: 502, body: { ok: false, error: "send_failed" } };
  }
  return { status: 200, body: { ok: true } };
}
