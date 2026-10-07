/**
 * Gap markers (brief 5.8, RULES.md section 3) in the review view.
 *
 * Each printed string (the Markdown body, the author, an FAQ answer, ...) is
 * tokenized on its own, never the raw file: a valid marker becomes a private
 * token (`§np3§`, no pipe, no markup characters), so a marker inside a table
 * row cannot split a cell. After the string is escaped or converted, the
 * tokens become `<mark class="c-np-gap">` elements.
 */
import { findMarkers } from "../../../content-pack/scripts/lib/check.mjs";
import { escapeHtml } from "./html";

export interface Gap {
  id: string;
  kind: string;
  question: string;
  action: string;
}

const TOKEN = /§np(\d+)§/g;

export class GapTable {
  /** Every marker occurrence, in the order it was tokenized. */
  readonly occurrences: Gap[] = [];

  /** Swap each valid marker in `text` for a token. */
  tokenize(text: string): string {
    const markers = findMarkers(text).filter((m) => m.valid);
    const base = this.occurrences.length;
    for (const m of markers) {
      this.occurrences.push({
        id: String(m.id),
        kind: String(m.kind),
        question: String(m.question),
        action: String(m.action),
      });
    }
    let out = text;
    for (let i = markers.length - 1; i >= 0; i--) {
      const m = markers[i]!;
      out = out.slice(0, m.index) + `§np${base + i}§` + out.slice(m.index + m.raw.length);
    }
    return out;
  }

  /** Swap tokens in already-escaped HTML for the visible gap highlight. */
  toHtml(html: string): string {
    return html.replace(TOKEN, (_all, n: string) => {
      const gap = this.occurrences[Number(n)];
      if (!gap) return "";
      return (
        `<mark class="c-np-gap" tabindex="0" data-gap-id="${escapeHtml(gap.id)}" ` +
        `data-kind="${escapeHtml(gap.kind)}" data-default="${escapeHtml(gap.action)}">` +
        `<span class="c-np-gap__id">${escapeHtml(gap.id)}</span> ${escapeHtml(gap.question)}</mark>`
      );
    });
  }

  /** Unique gaps by id, in first-seen order of the page (for the panel and banner). */
  unique(): Gap[] {
    const seen = new Map<string, Gap>();
    for (const g of this.occurrences) if (!seen.has(g.id)) seen.set(g.id, g);
    return [...seen.values()];
  }
}

export const hasToken = (text: string): boolean => /§np\d+§/.test(text);

/** Plain text of a front matter string with its markers removed (JSON-LD). */
export const stripTokens = (text: string): string => text.replace(TOKEN, "").replace(/\s+/g, " ").trim();
