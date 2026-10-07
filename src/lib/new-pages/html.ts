/** Small HTML helpers for the new-page renderer. */

export const escapeHtml = (text: string): string =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** ` name="value"` pairs; `undefined` values are left out. */
export function attrs(map: Record<string, string | undefined>): string {
  return Object.entries(map)
    .filter((entry): entry is [string, string] => entry[1] !== undefined)
    .map(([k, v]) => ` ${k}="${escapeHtml(v)}"`)
    .join("");
}

/**
 * Heading ids: lower-case ASCII slug of the text, hyphens, de-duplicated with
 * a numeric suffix. One instance per page, shared by the body headings, the
 * FAQ heading and the table of contents.
 */
export class Slugger {
  private readonly used = new Map<string, number>();

  slug(text: string): string {
    const base =
      text
        .normalize("NFKD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "section";
    const count = this.used.get(base) ?? 0;
    this.used.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  }
}

/** `2026-10-06` → `October 6, 2026` (section 8). */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1));
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

/** Fill `{name}` placeholders of a section 8 string. */
export const fill = (template: string, values: Record<string, string>): string =>
  template.replace(/\{(\w+)\}/g, (all, key: string) => values[key] ?? all);
