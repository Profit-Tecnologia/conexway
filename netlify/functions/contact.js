// Netlify function: POST /api/contact
import { handleContact } from "../../server/contact.js";

export default async (req) => {
  if (req.method !== "POST") {
    return Response.json({ ok: false, error: "method_not_allowed" }, { status: 405, headers: { Allow: "POST" } });
  }
  const body = await req.json().catch(() => null);
  const { status, body: out } = await handleContact(body);
  return Response.json(out, { status });
};

export const config = { path: "/api/contact" };
