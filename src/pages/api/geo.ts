/**
 * GET /api/geo — the visitor's country, for the USD prices on /pricing
 * (lead, 2026-10-19; `src/scripts/ui/currency.ts`).
 *
 * On-demand route (Vercel serverless function); the rest of the site stays
 * static. Looks up the request IP with the ipinfo Lite API
 * (`GET https://api.ipinfo.io/lite/<ip>?token=...`, free, country level),
 * through `fetch`: no SDK. If ipinfo has no answer, falls back to Vercel's
 * own `x-vercel-ip-country` header.
 *
 * Env (Vercel project settings + local `.env`, never committed):
 *   IPINFO_TOKEN  required for the ipinfo lookup (ipinfo.io → Token)
 *
 * Response: 200 `{ country: "US" }` (ISO 3166-1 alpha-2) or
 * `{ country: null }` when unknown (local IP, lookup failed, no token).
 * Never cached by the CDN: the answer depends on the visitor. The IP is not
 * logged or returned.
 */
import type { APIContext, APIRoute } from "astro";

export const prerender = false;

const COUNTRY_RE = /^[A-Z]{2}$/;

/** Server env at runtime (Vercel: process.env) or from `.env` in dev. */
function env(name: string): string | undefined {
  const fromProcess = typeof process !== "undefined" ? process.env[name] : undefined;
  return fromProcess ?? (import.meta.env[name] as string | undefined);
}

function json(body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": "private, no-store" },
  });
}

function country(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const code = value.trim().toUpperCase();
  return COUNTRY_RE.test(code) ? code : null;
}

function requestIp(context: APIContext): string | null {
  const { request } = context;
  try {
    // A getter that throws when the adapter can't tell: read it here.
    const ip = context.clientAddress;
    if (ip) return ip;
  } catch {
    /* adapter without clientAddress (e.g. some dev setups) */
  }
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip");
}

async function ipinfoCountry(ip: string, token: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.ipinfo.io/lite/${encodeURIComponent(ip)}?token=${encodeURIComponent(token)}`,
      { signal: AbortSignal.timeout(2500) },
    );
    if (!res.ok) {
      console.error("[geo] ipinfo lookup failed", res.status);
      return null;
    }
    const data = (await res.json()) as { country_code?: unknown };
    return country(data.country_code);
  } catch (err) {
    console.error("[geo] ipinfo request failed", err instanceof Error ? err.message : err);
    return null;
  }
}

export const GET: APIRoute = async (context) => {
  const { request } = context;
  const token = env("IPINFO_TOKEN");
  const ip = requestIp(context);
  if (!token) console.error("[geo] IPINFO_TOKEN is not set");

  const fromIpinfo = token && ip ? await ipinfoCountry(ip, token) : null;
  return json({ country: fromIpinfo ?? country(request.headers.get("x-vercel-ip-country")) });
};
