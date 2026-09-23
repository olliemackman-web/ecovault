import { NextResponse } from "next/server";

/**
 * Enquiry handler. Delivers to whichever is configured:
 *  - RESEND_API_KEY + ENQUIRY_TO_EMAIL  → email via Resend
 *  - ENQUIRY_WEBHOOK_URL                → JSON POST (Zapier / Make / CRM)
 * With neither set (local dev) it logs to the server console and still returns 200.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  if (body.company) return NextResponse.json({ ok: true }); // honeypot – silently accept
  const name = String(body.name ?? "").trim(), email = String(body.email ?? "").trim(), phone = String(body.phone ?? "").trim(), postcode = String(body.postcode ?? "").trim();
  if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || phone.replace(/\D/g, "").length < 10 || !postcode) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    name, email, phone, postcode: postcode.toUpperCase(),
    interests: Array.isArray(body.interests) ? body.interests : [],
    property: body.property ?? "", ownership: body.ownership ?? "", bill: body.bill ?? "",
    message: String(body.message ?? "").slice(0, 2000),
    source: body.source ?? "", page: body.page ?? "",
  };

  const tasks: Promise<unknown>[] = [];
  if (process.env.ENQUIRY_WEBHOOK_URL) {
    tasks.push(fetch(process.env.ENQUIRY_WEBHOOK_URL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(lead) }));
  }
  if (process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL) {
    const rows = Object.entries(lead).map(([k, v]) => `<tr><td style="padding:6px 12px;color:#666">${k}</td><td style="padding:6px 12px"><b>${Array.isArray(v) ? v.join(", ") : String(v)}</b></td></tr>`).join("");
    tasks.push(fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${process.env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL ?? "Eco Volt Website <onboarding@resend.dev>",
        to: process.env.ENQUIRY_TO_EMAIL.split(",").map((s) => s.trim()),
        reply_to: email,
        subject: `New lead: ${name} (${lead.postcode}) – ${lead.interests.join(", ") || "general"}`,
        html: `<h2>New website enquiry</h2><table style="border-collapse:collapse;font:14px system-ui">${rows}</table>`,
      }),
    }));
  }
  if (tasks.length === 0) console.log("[enquiry] (no delivery configured)", lead);

  const results = await Promise.allSettled(tasks);
  const failed = results.some((r) => r.status === "rejected" || (r.status === "fulfilled" && r.value instanceof Response && !r.value.ok));
  if (failed) { console.error("[enquiry] delivery failed", results); return NextResponse.json({ ok: false }, { status: 502 }); }
  return NextResponse.json({ ok: true });
}
