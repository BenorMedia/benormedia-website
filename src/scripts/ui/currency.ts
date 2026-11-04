/**
 * Currency — shows the pricing cards in US dollars for visitors in the US or
 * Canada (lead, 2026-10-19).
 *
 * The HTML always ships the EUR price. Amounts with a `data-price-usd`
 * attribute (`PricingCard`) get that text instead when `/api/geo` answers
 * `US` or `CA`. Anything else (another country, `null`, a failed request, no
 * JS) leaves EUR in place.
 *
 * - The country is kept in `sessionStorage` for the tab, so it is fetched once
 *   per visit. Storage may be blocked: every access is wrapped.
 * - Testing: `?geo=US` (or any ISO code) skips the lookup, e.g. on a Vercel
 *   preview from Spain or in `pnpm run dev`, where the IP is local.
 */

const USD_COUNTRIES = new Set(["US", "CA"]);
const STORAGE_KEY = "benor-geo-country";

function readStored(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function store(country: string): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, country);
  } catch {
    /* storage blocked: fetch again next page view */
  }
}

async function getCountry(): Promise<string | null> {
  const override = new URLSearchParams(window.location.search).get("geo");
  if (override) return override.toUpperCase();

  const stored = readStored();
  if (stored) return stored;

  try {
    const res = await fetch("/api/geo", { headers: { Accept: "application/json" } });
    if (!res.ok) return null;
    const { country } = (await res.json()) as { country?: unknown };
    if (typeof country !== "string" || !country) return null;
    store(country);
    return country;
  } catch {
    return null;
  }
}

export async function initCurrency(root: ParentNode = document): Promise<void> {
  const amounts = root.querySelectorAll<HTMLElement>("[data-price-usd]");
  if (amounts.length === 0) return;

  const country = await getCountry();
  if (!country || !USD_COUNTRIES.has(country)) return;

  amounts.forEach((el) => {
    const usd = el.dataset["priceUsd"];
    if (usd) el.textContent = usd;
  });
}
