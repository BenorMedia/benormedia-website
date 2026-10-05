/**
 * POST /api/contact — contact modal submissions → email to the team
 * (lead 2026-10-01: Vercel endpoint; lead 2026-10-05: sent with Resend,
 * replacing Google Workspace SMTP).
 *
 * On-demand route (Vercel serverless function); the rest of the site stays
 * static. Body: the contact form's fields as JSON
 * `{ name, email, company, budget, message, website }`.
 *   - `website` is a honeypot (hidden in the form): filled = a bot; we answer
 *     200 and send nothing.
 *   - name, email, company and budget are required; message is optional.
 *   - Lengths are capped; every value is HTML-escaped in the email.
 * The email is sent from CONTACT_FROM_EMAIL to CONTACT_TO_EMAIL (default
 * info@benor.media) with every field, Reply-To = the visitor, so replying
 * answers them directly.
 *
 * Env (Vercel project settings + local `.env`, never committed):
 *   RESEND_API_KEY     required — Resend API key ("Sending access",
 *                      restricted to benor.media)
 *   CONTACT_FROM_EMAIL sender, an address on the domain verified in Resend;
 *                      default `BenorMedia Website <website@benor.media>`
 *   CONTACT_TO_EMAIL   recipient, default info@benor.media
 * Resend REST API (`POST https://api.resend.com/emails`) through `fetch`: no
 * SDK, so nothing to bundle into the function. Free plan: 100 emails / day,
 * 3,000 / month; every send is listed in Resend → Emails.
 *
 * Responses: 200 `{ ok: true }` · 400 `{ ok: false, error: "invalid" }`
 * (with `fields`) · 500 `{ ok: false, error: "send" | "config" }`.
 */
import type { APIRoute } from "astro";

export const prerender = false;

const BUDGETS = ["<5000", "5000-15000", "15000-30000", "30000+"] as const;
const BUDGET_LABELS: Record<(typeof BUDGETS)[number], string> = {
  "<5000": "<5,000",
  "5000-15000": "5,000 - 15,000",
  "15000-30000": "15,000 - 30,000",
  "30000+": "30,000+",
};

const MAX = { name: 120, email: 254, company: 160, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Server env at runtime (Vercel: process.env) or from `.env` in dev. */
function env(name: string): string | undefined {
  const fromProcess = typeof process !== "undefined" ? process.env[name] : undefined;
  return fromProcess ?? (import.meta.env[name] as string | undefined);
}

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, error: "invalid", fields: [] });
  }

  // Honeypot: pretend it worked, send nothing.
  if (text(body["website"], 200)) return json(200, { ok: true });

  const name = text(body["name"], MAX.name);
  const email = text(body["email"], MAX.email);
  const company = text(body["company"], MAX.company);
  const budget = text(body["budget"], 20);
  const message = text(body["message"], MAX.message);

  const invalid: string[] = [];
  if (!name) invalid.push("name");
  if (!EMAIL_RE.test(email)) invalid.push("email");
  if (!company) invalid.push("company");
  if (!(BUDGETS as readonly string[]).includes(budget)) invalid.push("budget");
  if (invalid.length) return json(400, { ok: false, error: "invalid", fields: invalid });

  const apiKey = env("RESEND_API_KEY");
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return json(500, { ok: false, error: "config" });
  }
  const from = env("CONTACT_FROM_EMAIL") || "BenorMedia Website <website@benor.media>";
  const to = env("CONTACT_TO_EMAIL") || "info@benor.media";

  const budgetLabel = BUDGET_LABELS[budget as (typeof BUDGETS)[number]];
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Company", company],
    ["Engagement budget", budgetLabel],
    ["Message", message || "—"],
  ];
  const html = `<h2 style="font-family:sans-serif">New contact form submission</h2>
<table cellpadding="8" style="font-family:sans-serif;border-collapse:collapse">
${rows
  .map(
    ([label, value]) =>
      `<tr><th align="left" valign="top" style="border-bottom:1px solid #E4E6EA">${label}</th><td style="border-bottom:1px solid #E4E6EA;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
  )
  .join("\n")}
</table>`;
  const plain = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New contact: ${name} (${company})`,
        html,
        text: plain,
      }),
    });
    if (!res.ok) {
      // Resend answers `{ statusCode, name, message }` (no visitor data).
      console.error("[contact] Resend send failed", res.status, await res.text());
      return json(500, { ok: false, error: "send" });
    }
  } catch (err) {
    console.error("[contact] Resend request failed", err instanceof Error ? err.message : err);
    return json(500, { ok: false, error: "send" });
  }

  return json(200, { ok: true });
};
