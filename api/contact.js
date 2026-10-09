// Vercel serverless function: POST /api/contact
import { handleContact } from "../server/contact.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  const { status, body: out } = await handleContact(body);
  res.status(status).json(out);
}
