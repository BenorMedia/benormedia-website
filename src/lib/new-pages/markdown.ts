/**
 * Markdown → HTML for the pack bodies (brief 5.2). The body syntax is limited
 * by RULES.md section 8: `##` / `###` headings, paragraphs, `-` and `1.`
 * lists, `**bold**`, `[text](href)` links and GFM tables with a `Table: `
 * caption line. No raw HTML, images, code or quotes. Astro 7 does not ship a
 * Markdown processor this repo can import, so this small converter covers
 * exactly that subset, with no dependency.
 *
 * Every element that prints content text carries `data-np-src` (brief 10.2).
 * Tables use the `DataTable` markup (role="region" scroll wrapper, visible
 * caption, `th scope="col"`); its styles live in `NpProse.astro`.
 */
import { attrs, escapeHtml, type Slugger } from "./html";
import { bodyLinkHtml, type LinkContext } from "./links";

export interface RenderedSection {
  /** Heading text, Markdown stripped (for `visuals[].after` matching). */
  title: string;
  titleHtml: string;
  id: string;
  /** Everything under the H2, H3s included. */
  html: string;
}

export interface RenderedBody {
  /** The blocks before the first H2 (the lead), each a complete element. */
  lead: string[];
  sections: RenderedSection[];
}

export interface RenderOptions {
  links: LinkContext;
  slugger: Slugger;
  /** Turns gap tokens into highlights (review view). */
  finish: (html: string) => string;
  /**
   * Live typography classes per element (commercial pages use the Home
   * page's: the section-intro size for the framing line, body size for the
   * rest). Without them the elements get no class and `.c-np-prose` styles
   * them (articles).
   */
  classes?: { lead?: string; firstP?: string; p?: string; li?: string };
}

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Inline Markdown → HTML: escape, then links and bold. */
export function inline(text: string, opts: RenderOptions): string {
  let out = "";
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    out += emphasis(escapeHtml(text.slice(last, m.index)));
    out += bodyLinkHtml(emphasis(escapeHtml(m[1] ?? "")), m[2] ?? "", opts.links);
    last = (m.index ?? 0) + m[0].length;
  }
  out += emphasis(escapeHtml(text.slice(last)));
  return opts.finish(out);
}

const emphasis = (html: string): string => html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

/** Plain text of an inline string (link text kept, bold markers dropped). */
export const plainInline = (text: string): string =>
  text.replace(LINK, "$1").replace(/\*\*/g, "").replace(/\s+/g, " ").trim();

const HEADING = /^(#{2,3})\s+(.*?)\s*$/;
const CAPTION = /^Table:\s+(.*)$/;
const TABLE_ROW = /^\s*\|/;
const TABLE_SEP = /^\s*\|?(\s*:?-+:?\s*\|)+\s*:?-*:?\s*$/;
const UL = /^\s*[-*]\s+(.*)$/;
const OL = /^\s*\d+\.\s+(.*)$/;

const cells = (row: string): string[] =>
  row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());

function table(caption: string | undefined, rows: string[], opts: RenderOptions): string {
  const [head, ...rest] = rows;
  const body = rest.filter((r) => !TABLE_SEP.test(r));
  const headCells = head ? cells(head) : [];
  const id = opts.slugger.slug(`table ${caption ?? ""}`);
  const wide = headCells.length >= 3;
  const captionHtml = caption ? `<caption${attrs({ id: `${id}-caption`, "data-np-src": "caption" })}>${inline(caption, opts)}</caption>` : "";
  const thead = `<thead><tr>${headCells.map((c) => `<th scope="col" data-np-src="th">${inline(c, opts)}</th>`).join("")}</tr></thead>`;
  const tbody = `<tbody>${body
    .map((r) => `<tr>${cells(r).map((c) => `<td data-np-src="td">${inline(c, opts)}</td>`).join("")}</tr>`)
    .join("")}</tbody>`;
  const region = caption
    ? attrs({ class: "c-np-table", role: "region", "aria-labelledby": `${id}-caption`, tabindex: "0" })
    : attrs({ class: "c-np-table" });
  return `<div${region}><table${attrs({ class: wide ? "is-wide" : undefined })}>${captionHtml}${thead}${tbody}</table></div>`;
}

/** Converts a (tokenized) body. `leadSrc` names the lead paragraphs. */
export function renderBody(body: string, opts: RenderOptions): RenderedBody {
  const lead: string[] = [];
  const sections: RenderedSection[] = [];
  let current: RenderedSection | null = null;
  const push = (html: string, isLead: boolean): void => {
    if (current) current.html += html;
    else if (isLead) lead.push(html);
  };

  const lines = body.split("\n");
  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let caption: string | undefined;
  let rows: string[] = [];

  const flushPara = (): void => {
    if (para.length === 0) return;
    const text = para.join(" ").trim();
    para = [];
    if (!text) return;
    const c = opts.classes;
    const cls = !current ? c?.lead : current.html === "" ? (c?.firstP ?? c?.p) : c?.p;
    push(`<p${attrs({ class: cls, "data-np-src": current ? "p" : "lead" })}>${inline(text, opts)}</p>`, true);
  };
  const flushList = (): void => {
    if (!list) return;
    const tag = list.ordered ? "ol" : "ul";
    const li = attrs({ class: opts.classes?.li, "data-np-src": "li" });
    push(`<${tag}>${list.items.map((i) => `<li${li}>${inline(i, opts)}</li>`).join("")}</${tag}>`, true);
    list = null;
  };
  const flushTable = (): void => {
    if (rows.length === 0) return;
    push(table(caption, rows, opts), true);
    rows = [];
    caption = undefined;
  };
  const flushAll = (): void => {
    flushPara();
    flushList();
    flushTable();
  };

  for (const line of lines) {
    if (line.trim() === "") {
      flushPara();
      flushList();
      flushTable();
      continue;
    }
    const h = HEADING.exec(line);
    if (h) {
      flushAll();
      const level = h[1]?.length ?? 2;
      const raw = h[2] ?? "";
      const title = plainInline(raw);
      const id = opts.slugger.slug(title);
      const titleHtml = inline(raw, opts);
      if (level === 2) {
        current = { title, titleHtml, id, html: "" };
        sections.push(current);
      } else {
        push(`<h3${attrs({ id, "data-np-src": "h3" })}>${titleHtml}</h3>`, true);
      }
      continue;
    }
    const cap = CAPTION.exec(line);
    if (cap && para.length === 0) {
      flushList();
      flushTable();
      caption = cap[1];
      continue;
    }
    if (TABLE_ROW.test(line)) {
      flushPara();
      flushList();
      rows.push(line);
      continue;
    }
    const ul = UL.exec(line);
    const ol = ul ? null : OL.exec(line);
    if (ul || ol) {
      flushPara();
      flushTable();
      const ordered = !!ol;
      if (list && list.ordered !== ordered) flushList();
      if (!list) list = { ordered, items: [] };
      list.items.push((ul ?? ol)?.[1] ?? "");
      continue;
    }
    if (list && /^\s{2,}\S/.test(line)) {
      // Continuation line of the last list item.
      list.items[list.items.length - 1] += ` ${line.trim()}`;
      continue;
    }
    flushList();
    flushTable();
    para.push(line.trim());
  }
  flushAll();
  return { lead, sections };
}
