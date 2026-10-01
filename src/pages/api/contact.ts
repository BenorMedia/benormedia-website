/**
 * POST /api/contact — contact modal submissions → email to the team
 * (lead 2026-10-01: Vercel endpoint, sent through the Google Workspace
 * mailbox over SMTP with `nodemailer`).
 *
 * On-demand route (Vercel serverless function); the rest of the site stays
 * static. Body: the contact form's fields as JSON
 * `{ name, email, company, budget, message, website }`.
 *   - `website` is a honeypot (hidden in the form): filled = a bot; we answer
 *     200 and send nothing.
 *   - name, email, company and budget are required; message is optional.
 *   - Lengths are capped; every value is HTML-escaped in the email.
 * The email is sent from the SMTP_USER mailbox to CONTACT_TO_EMAIL (default
 * info@benor.media) with every field, Reply-To = the visitor, so replying
 * answers them directly.
 *
 * Env (Vercel project settings + local `.env`, never committed):
 *   SMTP_USER          required — the Google Workspace mailbox that sends
 *                      (info@benor.media)
 *   SMTP_PASS          required — that mailbox's app password (16 chars,
 *                      myaccount.google.com/apppasswords; needs 2-step
 *                      verification on the account)
 *   CONTACT_TO_EMAIL   recipient, default info@benor.media
 * SMTP: smtp.gmail.com:465 (TLS). Gmail limit ≈ 2,000 sends / day.
 *
 * Responses: 200 `{ ok: true }` · 400 `{ ok: false, error: "invalid" }`
 * (with `fields`) · 500 `{ ok: false, error: "send" | "config" }`.
 */
import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

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

  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");
  if (!user || !pass) {
    console.error("[contact] SMTP_USER / SMTP_PASS are not set");
    return json(500, { ok: false, error: "config" });
  }
  const to = env("CONTACT_TO_EMAIL") ?? "info@benor.media";

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
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });
    await transporter.sendMail({
      from: { name: "BenorMedia Website", address: user },
      to,
      replyTo: { name, address: email },
      subject: `New contact: ${name} (${company})`,
      html,
      text: plain,
    });
  } catch (err) {
    console.error("[contact] SMTP send failed", err instanceof Error ? err.message : err);
    return json(500, { ok: false, error: "send" });
  }

  return json(200, { ok: true });
};
