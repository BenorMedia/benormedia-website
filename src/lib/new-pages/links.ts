/**
 * One resolver for every link to another page (brief 5.4): `page:slug` in the
 * body, `related` entries and `breadcrumb` items.
 *
 *   released  pack page with `draft: false` (the page being rendered counts)
 *   draft     pack page with `draft: true`
 *   planned   in `data/plan.json` without a content file, or unknown (warns)
 *   live      a path in the pack's `LIVE_PATHS`
 */
import { LIVE_PATHS } from "../../../content-pack/scripts/lib/check.mjs";
import copy from "./copy.json";
import { attrs, escapeHtml } from "./html";

export type LinkStatus = "released" | "draft" | "planned" | "live" | "external";

export interface Target {
  status: LinkStatus;
  href: string | undefined;
  slug: string | undefined;
}

export interface PlanPage {
  slug: string;
  url: string;
  label?: string;
}

export interface LinkContext {
  currentSlug: string;
  includeDrafts: boolean;
  /** Pack pages by slug. */
  pack: ReadonlyMap<string, { url: string; draft: boolean; h1: string; description?: string; pageType?: string }>;
  plan: ReadonlyMap<string, PlanPage>;
  warn: (message: string) => void;
}

export function resolveTarget(ref: string, ctx: LinkContext): Target {
  if (/^https:\/\//.test(ref)) return { status: "external", href: ref, slug: undefined };

  let slug: string | undefined;
  if (ref.startsWith("page:")) slug = ref.slice(5);
  else if (ref.startsWith("/")) {
    for (const [s, p] of ctx.pack) if (p.url === ref) slug = s;
    if (!slug) for (const [s, p] of ctx.plan) if (p.url === ref) slug = s;
    if (!slug) {
      if (LIVE_PATHS.has(ref)) return { status: "live", href: ref, slug: undefined };
      ctx.warn(`unknown path ${ref}: treated as planned`);
      return { status: "planned", href: undefined, slug: ref };
    }
  } else slug = ref;

  const page = ctx.pack.get(slug);
  if (page) {
    if (slug === ctx.currentSlug || !page.draft) return { status: "released", href: page.url, slug };
    return { status: "draft", href: page.url, slug };
  }
  const planned = ctx.plan.get(slug);
  if (planned) {
    // A plan entry whose URL is a live path (e.g. `/growth`) is the live page.
    if (LIVE_PATHS.has(planned.url)) return { status: "live", href: planned.url, slug };
    return { status: "planned", href: undefined, slug };
  }
  ctx.warn(`unknown page ${ref}: treated as planned`);
  return { status: "planned", href: undefined, slug };
}

/** A body link: `textHtml` is already rendered inline HTML. */
export function bodyLinkHtml(textHtml: string, ref: string, ctx: LinkContext): string {
  const t = resolveTarget(ref, ctx);
  switch (t.status) {
    case "external":
      return `<a${attrs({ href: t.href, target: "_blank", rel: "noopener" })}>${textHtml}</a>`;
    case "released":
    case "live":
      return `<a${attrs({ href: t.href })}>${textHtml}</a>`;
    case "draft":
      return ctx.includeDrafts
        ? `<a${attrs({ href: t.href, "data-draft-target": t.slug })}>${textHtml}</a>`
        : textHtml;
    case "planned":
      return ctx.includeDrafts
        ? `<span${attrs({ class: "c-np-planned", "data-planned": t.slug })}>${textHtml}</span>`
        : textHtml;
  }
}

export interface RelatedItem {
  text: string;
  href: string | undefined;
  /** Preview only: `data-draft-target` / `data-planned`. */
  data: Record<string, string>;
  planned: boolean;
}

const LIVE_NAMES: Record<string, string> = copy.livePathNames;

/** A `related` entry (section 8 link text), or `null` when it is omitted. */
export function relatedItem(ref: string, ctx: LinkContext): RelatedItem | null {
  const t = resolveTarget(ref, ctx);
  let text: string | undefined;
  if (t.status === "live" && !t.slug) text = LIVE_NAMES[ref];
  else if (t.slug) {
    text = ctx.plan.get(t.slug)?.label ?? ctx.pack.get(t.slug)?.h1;
    if (t.status === "live" && t.href && LIVE_NAMES[t.href]) text = LIVE_NAMES[t.href];
  }
  if (!text) {
    ctx.warn(`related ${ref}: no link text (not in plan.json, no live name)`);
    return null;
  }
  switch (t.status) {
    case "released":
    case "live":
      return { text, href: t.href, data: {}, planned: false };
    case "draft":
      return ctx.includeDrafts ? { text, href: t.href, data: { "data-draft-target": t.slug ?? "" }, planned: false } : null;
    case "planned":
      return ctx.includeDrafts ? { text, href: undefined, data: { "data-planned": t.slug ?? "" }, planned: true } : null;
    case "external":
      return { text, href: t.href, data: {}, planned: false };
  }
}

export interface Crumb {
  name: string;
  url: string;
}

export interface VisibleCrumb {
  label: string;
  href?: string;
  attrs?: Record<string, string>;
}

/**
 * Breadcrumb: the visible trail (articles) and the BreadcrumbList items (every
 * page). Draft and planned levels are dropped from the JSON-LD in every view.
 */
export function breadcrumbs(items: readonly Crumb[], ctx: LinkContext): { visible: VisibleCrumb[]; ld: Crumb[] } {
  const visible: VisibleCrumb[] = [];
  const ld: Crumb[] = [];
  items.forEach((item, i) => {
    const isLast = i === items.length - 1;
    const t = isLast ? ({ status: "released", href: item.url, slug: ctx.currentSlug } as Target) : resolveTarget(item.url, ctx);
    if (t.status === "released" || t.status === "live") {
      ld.push(item);
      visible.push(isLast ? { label: item.name } : { label: item.name, href: item.url });
    } else if (ctx.includeDrafts && t.status === "draft") {
      visible.push({ label: item.name, href: item.url, attrs: { "data-draft-target": t.slug ?? "" } });
    } else if (ctx.includeDrafts && t.status === "planned") {
      visible.push({ label: `${item.name} ${copy.plannedSuffix}`, attrs: { "data-planned": t.slug ?? item.url } });
    }
  });
  return { visible, ld };
}

export { escapeHtml };
