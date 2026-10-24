/**
 * Case study body (SCHEMAS.md v0.10 `caseStudy.body`) → a render tree for
 * `CaseStudyBody.astro`, plus the table of contents for the sidebar.
 * Pure functions, no fetching, no HTML strings.
 *
 * - H2 = a section, H3 = a phase: each gets a stable id (slugified text,
 *   de-duplicated) and a table of contents entry (Figma 3768:26363 lists the
 *   phases too).
 * - H3 = a phase: everything from an H3 up to the next H2 goes into one
 *   `phase` node (Figma 3768:26281, the block with the left rule).
 * - Lists: consecutive `listItem` blocks become one list; `level` nests.
 * - `blockquote` style → a `quote` node; `caseStudyCallout` items → a
 *   `callout` node (title + plain-text items), SCHEMAS v0.12.
 * - Spans: `strong` / `em` decorators; `link` annotations (relative paths
 *   allowed, `openInNewTab` → new tab). Unsafe hrefs drop the link, keep
 *   the text.
 */
import type { CaseStudyBodyBlock, CaseStudyBodyItem, CaseStudyCalloutBlock, PortableTextLinkDef } from './types';

/** Results heading id (`CaseStudyResults`), reserved so a body H2 never takes it. */
export const CASE_STUDY_RESULTS_ID = 'results';

export interface InlineSpan {
  text: string;
  strong: boolean;
  em: boolean;
}

/** Adjacent spans with the same link share one run (one `<a>`). */
export interface InlineRun {
  href?: string;
  newTab?: boolean;
  spans: InlineSpan[];
}

export interface ListItemNode {
  key: string;
  inline: InlineRun[];
  children?: ListNode;
}

export interface ListNode {
  type: 'list';
  key: string;
  ordered: boolean;
  items: ListItemNode[];
}

export interface CalloutNode {
  type: 'callout';
  key: string;
  title: string;
  items: string[];
}

export type FlowNode =
  | { type: 'p'; key: string; inline: InlineRun[] }
  | { type: 'quote'; key: string; inline: InlineRun[] }
  | CalloutNode
  | { type: 'h3'; key: string; id: string; text: string; inline: InlineRun[] }
  | ListNode;

export type BodyNode =
  | FlowNode
  | { type: 'h2'; key: string; id: string; text: string; inline: InlineRun[] }
  | { type: 'phase'; key: string; children: FlowNode[] };

export interface TocItem {
  id: string;
  text: string;
}

/** Lowercase ASCII words joined by "-"; "section" when nothing is left. */
export function slugifyHeading(text: string): string {
  const slug = text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'section';
}

/** `https:`, `http:`, `mailto:`, `tel:`, a root-relative path or an in-page anchor. */
function safeHref(href: string | undefined): string | undefined {
  const h = href?.trim();
  if (!h) return undefined;
  if (/^(https?:|mailto:|tel:)/i.test(h)) return h;
  if (h.startsWith('/') && !h.startsWith('//')) return h;
  if (h.startsWith('#')) return h;
  return undefined;
}

function blockText(block: CaseStudyBodyBlock): string {
  return (block.children ?? []).map((c) => c.text ?? '').join('');
}

function inlineRuns(block: CaseStudyBodyBlock): InlineRun[] {
  const defs = new Map<string, PortableTextLinkDef>(
    (block.markDefs ?? []).filter((d) => d._type === 'link').map((d) => [d._key, d]),
  );
  const runs: InlineRun[] = [];
  for (const child of block.children ?? []) {
    if (child._type !== 'span' || !child.text) continue;
    const marks = child.marks ?? [];
    const def = marks.map((m) => defs.get(m)).find(Boolean);
    const href = safeHref(def?.href);
    const newTab = href ? def?.openInNewTab === true : false;
    const span: InlineSpan = { text: child.text, strong: marks.includes('strong'), em: marks.includes('em') };
    const last = runs[runs.length - 1];
    if (last && last.href === href && (last.newTab ?? false) === newTab) {
      last.spans.push(span);
    } else {
      runs.push(href ? { href, newTab, spans: [span] } : { spans: [span] });
    }
  }
  return runs;
}

/** Ids for every H2 and H3 in `body`, by block key, in order. */
function headingIds(body: readonly CaseStudyBodyItem[], reserved: readonly string[]): Map<string, string> {
  const used = new Set<string>(reserved);
  const ids = new Map<string, string>();
  body.forEach((block, i) => {
    if (block._type !== 'block' || (block.style !== 'h2' && block.style !== 'h3') || block.listItem) return;
    const text = blockText(block).trim();
    if (!text) return;
    const base = slugifyHeading(text);
    let id = base;
    for (let n = 2; used.has(id); n += 1) id = `${base}-${n}`;
    used.add(id);
    ids.set(block._key || String(i), id);
  });
  return ids;
}

/**
 * The render tree. `reservedIds` are ids other parts of the page already
 * use (default: the results heading).
 */
export function parseCaseStudyBody(
  body: readonly CaseStudyBodyItem[] | null | undefined,
  reservedIds: readonly string[] = [CASE_STUDY_RESULTS_ID],
): BodyNode[] {
  const items = (body ?? []).filter(
    (b): b is CaseStudyBodyBlock | CaseStudyCalloutBlock => b?._type === 'block' || b?._type === 'caseStudyCallout',
  );
  const ids = headingIds(items, reservedIds);
  const top: BodyNode[] = [];
  let phase: { type: 'phase'; key: string; children: FlowNode[] } | null = null;
  // Open list levels: [0] = the list in the current container.
  let stack: { level: number; list: ListNode }[] = [];

  const target = (): BodyNode[] => (phase ? phase.children : top);

  items.forEach((item, i) => {
    if (item._type === 'caseStudyCallout') {
      stack = [];
      const title = item.title?.trim() ?? '';
      const lines = (item.items ?? []).map((t) => t?.trim() ?? '').filter(Boolean);
      // No items → nothing (an empty box); the title alone is not a callout.
      if (lines.length > 0) target().push({ type: 'callout', key: item._key || String(i), title, items: lines });
      return;
    }
    const block = item;
    const key = block._key || String(i);
    const inline = inlineRuns(block);
    const text = blockText(block).trim();

    if (block.listItem) {
      if (!text) return;
      const level = Math.max(1, block.level ?? 1);
      const ordered = block.listItem === 'number';
      while (stack.length > 0 && (stack[stack.length - 1]?.level ?? 0) > level) stack.pop();
      const open = stack[stack.length - 1];
      const item: ListItemNode = { key, inline };
      if (open && open.level === level && (stack.length > 1 || open.list.ordered === ordered)) {
        open.list.items.push(item);
      } else if (open && level > open.level) {
        const parent = open.list.items[open.list.items.length - 1];
        const list: ListNode = { type: 'list', key: `${key}-list`, ordered, items: [item] };
        if (parent) parent.children = list;
        else open.list.items.push(item);
        stack.push({ level, list });
      } else {
        const list: ListNode = { type: 'list', key: `${key}-list`, ordered, items: [item] };
        target().push(list);
        stack = [{ level, list }];
      }
      return;
    }
    stack = [];
    if (!text) return;

    if (block.style === 'h2') {
      phase = null;
      top.push({ type: 'h2', key, id: ids.get(key) ?? slugifyHeading(text), text, inline });
      return;
    }
    if (block.style === 'h3') {
      if (!phase) {
        phase = { type: 'phase', key: `${key}-phase`, children: [] };
        top.push(phase);
      }
      phase.children.push({ type: 'h3', key, id: ids.get(key) ?? slugifyHeading(text), text, inline });
      return;
    }
    if (block.style === 'blockquote') {
      target().push({ type: 'quote', key, inline });
      return;
    }
    target().push({ type: 'p', key, inline });
  });

  return top;
}

/** Table of contents: every body H2 and H3 in order, ids as in `parseCaseStudyBody`. */
export function caseStudyToc(
  body: readonly CaseStudyBodyItem[] | null | undefined,
  reservedIds: readonly string[] = [CASE_STUDY_RESULTS_ID],
): TocItem[] {
  return parseCaseStudyBody(body, reservedIds).flatMap((node) => {
    if (node.type === 'h2') return [{ id: node.id, text: node.text }];
    if (node.type === 'phase') {
      return node.children.flatMap((child) => (child.type === 'h3' ? [{ id: child.id, text: child.text }] : []));
    }
    return [];
  });
}
