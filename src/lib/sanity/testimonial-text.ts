/**
 * Text helpers for testimonials (pure, no Sanity calls).
 *
 * - `splitAuthorRole`: `authorRole` holds "Role, Company" in one string
 *   (SCHEMAS.md). The slider shows the role as a tag and the company as its
 *   logo, so split at the LAST ", " ("Senior Director, Digital Marketing,
 *   JOOR" → role "Senior Director, Digital Marketing", company "JOOR").
 *   No comma → the whole string is the company.
 * - `highlightQuote`: splits a quote into plain and bold runs from the
 *   `highlights` field (exact substrings of the quote). Unknown phrases are
 *   ignored; overlapping ones keep the earliest.
 */

export interface AuthorRoleParts {
  role?: string;
  company?: string;
}

export function splitAuthorRole(authorRole: string | null | undefined): AuthorRoleParts {
  const value = authorRole?.trim();
  if (!value) return {};
  const at = value.lastIndexOf(', ');
  if (at === -1) return { company: value };
  return { role: value.slice(0, at).trim(), company: value.slice(at + 2).trim() };
}

export interface QuoteRun {
  text: string;
  bold: boolean;
}

export function highlightQuote(quote: string, highlights: readonly (string | null)[] | null | undefined): QuoteRun[] {
  const ranges = (highlights ?? [])
    .map((h) => h?.trim())
    .filter((h): h is string => Boolean(h))
    .map((h) => ({ start: quote.indexOf(h), end: quote.indexOf(h) + h.length }))
    .filter((r) => r.start !== -1)
    .sort((a, b) => a.start - b.start);

  const runs: QuoteRun[] = [];
  let cursor = 0;
  for (const { start, end } of ranges) {
    if (start < cursor) continue; // overlaps an earlier highlight
    if (start > cursor) runs.push({ text: quote.slice(cursor, start), bold: false });
    runs.push({ text: quote.slice(start, end), bold: true });
    cursor = end;
  }
  if (cursor < quote.length) runs.push({ text: quote.slice(cursor), bold: false });
  return runs;
}
