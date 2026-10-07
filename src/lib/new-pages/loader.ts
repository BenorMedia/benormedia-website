/**
 * New pages loader (brief 5.2–5.9). Reads `content-pack/content/*.md` with the
 * pack's parser, runs the pack's checker as the build gate, applies the
 * defaults view, and renders each page's strings for the two templates.
 *
 *   commercial  service, industry, regional  → `src/pages/[...page].astro`
 *   article     guide, comparison, data-study → `src/pages/guides/[slug].astro`
 *
 * Everything is keyed on the family, never on a slug. Docs: docs/new-pages.md.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
import { basename, join, relative } from "node:path";
import { readContentFile } from "../../../content-pack/scripts/lib/frontmatter.mjs";
import {
  APPLY_DEFAULTS,
  CHECKER,
  DEFAULTED_DIR,
  FAMILY,
  PLAN_FILE,
  ROOT,
  readPackFiles,
  resolveMode,
} from "./registry.mjs";
import { escapeHtml, Slugger } from "./html";
import { GapTable, hasToken, stripTokens, type Gap } from "./markers";
import { breadcrumbs, relatedItem, type Crumb, type LinkContext, type PlanPage, type RelatedItem, type VisibleCrumb } from "./links";
import { renderBody, type RenderedSection } from "./markdown";

export type Family = "commercial" | "article";
export type View = "review" | "defaults";

interface FrontMatter {
  slug?: string;
  url?: string;
  lang?: string;
  pageType?: string;
  draft?: boolean;
  title?: string;
  description?: string;
  h1?: string;
  eyebrow?: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  reviewEvery?: number | string;
  breadcrumb?: Crumb[];
  service?: { name?: string; serviceType?: string };
  closing?: { heading?: string; text?: string };
  faqHeading?: string;
  faq?: { q?: string; a?: string }[];
  takeaways?: string[];
  related?: string[];
  sources?: { label?: string; url?: string; accessed?: string }[];
  visuals?: { after?: string; side?: string; type?: string; brief?: string; alt?: string }[];
}

export interface FaqEntry {
  q: string;
  qHtml: string;
  a: string;
  aHtml: string;
  hasGap: boolean;
}

/** A `visuals` entry; `src/lib/new-pages/visuals.ts` resolves what renders. */
export interface Visual {
  key: string;
  slug: string;
  n: number;
  type: string;
  side: "left" | "right";
  brief: string;
  alt: string;
}

export interface PageSection extends RenderedSection {
  visual: Visual | undefined;
}

export interface NpPage {
  slug: string;
  url: string;
  family: Family;
  pageType: string;
  draft: boolean;
  view: View;
  includeDrafts: boolean;
  lang: string;
  title: string;
  description: string;
  h1: string;
  eyebrowHtml: string;
  lead: string[];
  sections: PageSection[];
  faqHeading: string;
  faqHeadingHtml: string;
  faqId: string;
  faq: FaqEntry[];
  closingHeadingHtml: string;
  closingTextHtml: string;
  related: RelatedItem[];
  breadcrumbVisible: VisibleCrumb[];
  breadcrumbLd: Crumb[];
  service: { name: string; serviceType: string };
  author: { html: string; text: string; hasGap: boolean };
  publishedAt: string;
  updatedAt: string;
  reviewEvery: string;
  takeaways: string[];
  sources: { labelHtml: string; url: string; accessed: string }[];
  gaps: Gap[];
}

const warn = (message: string): void => console.warn(`[new-pages] ${message}`);

function currentMode(): ReturnType<typeof resolveMode> & { isDev: boolean } {
  // `import.meta.env` is Vite's (Astro); plain Node scripts fall back to process.env.
  const meta = (import.meta as { env?: Record<string, unknown> }).env;
  const isDev = meta?.["DEV"] === true;
  const siteEnv = meta?.["PUBLIC_SITE_ENV"];
  const env = { ...process.env, PUBLIC_SITE_ENV: typeof siteEnv === "string" ? siteEnv : process.env["PUBLIC_SITE_ENV"] };
  return { ...resolveMode(env, isDev), isDev };
}

/** Runs the pack's checker CLI; a FAIL stops the build with its lines. */
function gate(files: string[], release: boolean): void {
  if (files.length === 0) return; // the CLI exits 2 with no files
  const args = release ? ["--release", "--ignore-draft", ...files] : files;
  try {
    const out = execFileSync(process.execPath, [CHECKER, ...args], { cwd: ROOT, encoding: "utf8", stdio: "pipe" });
    const warns = out.split("\n").filter((l) => /^\s+warn\b/.test(l));
    if (warns.length) warn(`content check warnings:\n${warns.join("\n")}`);
  } catch (error) {
    const e = error as { stdout?: string; stderr?: string };
    const lines = `${e.stdout ?? ""}${e.stderr ?? ""}`
      .split("\n")
      .filter((l) => /FAIL|^\S.*\.md$|^summary|^result/.test(l))
      .join("\n");
    throw new Error(`[new-pages] ${release ? "release gate" : "content check"} failed:\n${lines}`);
  }
}

function readPlan(): Map<string, PlanPage> {
  const plan = JSON.parse(readFileSync(PLAN_FILE, "utf8")) as { pages: PlanPage[] };
  return new Map(plan.pages.map((p) => [p.slug, p]));
}

let cache: { key: string; pages: NpPage[] } | null = null;

/** Every page built in the current mode. */
export function loadPages(): NpPage[] {
  const mode = currentMode();
  const key = `${mode.includeDrafts}:${mode.view}`;
  if (cache && cache.key === key && !mode.isDev) return cache.pages;

  const files = readPackFiles();
  const built: { file: string; data: FrontMatter }[] = [];
  for (const { file, parsed } of files) {
    const data = parsed.data as FrontMatter;
    const type = String(data.pageType ?? "");
    const isDraft = data.draft !== false;
    if (!(type in FAMILY)) {
      if (!isDraft) throw new Error(`[new-pages] ${relative(ROOT, file)}: pageType "${type}" has no template, but draft is false`);
      warn(`${relative(ROOT, file)}: pageType "${type}" has no template, skipped`);
      continue;
    }
    if (isDraft && !mode.includeDrafts) continue;
    built.push({ file, data });
  }

  gate(built.filter((b) => b.data.draft !== false).map((b) => relative(ROOT, b.file)), false);
  gate(built.filter((b) => b.data.draft === false).map((b) => relative(ROOT, b.file)), true);

  const pack = new Map(
    files.map(({ parsed }) => {
      const d = parsed.data as FrontMatter;
      return [String(d.slug), { url: String(d.url), draft: d.draft !== false, h1: String(d.h1 ?? "") }] as const;
    }),
  );
  const plan = readPlan();

  const pages = built.map(({ file }) => {
    let source = file;
    if (mode.view === "defaults") {
      mkdirSync(DEFAULTED_DIR, { recursive: true });
      source = join(DEFAULTED_DIR, basename(file));
      try {
        execFileSync(process.execPath, [APPLY_DEFAULTS, file, "--out", source], { cwd: ROOT, encoding: "utf8", stdio: "pipe" });
      } catch (error) {
        const e = error as { stdout?: string; stderr?: string };
        throw new Error(`[new-pages] apply-defaults failed for ${relative(ROOT, file)}:\n${e.stdout ?? ""}${e.stderr ?? ""}`);
      }
    }
    const parsed = readContentFile(readFileSync(source, "utf8"));
    return buildPage(parsed.data as FrontMatter, parsed.body, {
      view: mode.view,
      includeDrafts: mode.includeDrafts,
      pack,
      plan,
      file: relative(ROOT, file),
    });
  });

  cache = { key, pages };
  return pages;
}

export const pagesOf = (family: Family): NpPage[] => loadPages().filter((p) => p.family === family);

interface BuildContext {
  view: View;
  includeDrafts: boolean;
  pack: LinkContext["pack"];
  plan: Map<string, PlanPage>;
  file: string;
}

function buildPage(d: FrontMatter, body: string, ctx: BuildContext): NpPage {
  const slug = String(d.slug);
  const pageType = String(d.pageType);
  const family = (FAMILY as Record<string, Family>)[pageType] as Family;
  const gaps = new GapTable();
  const slugger = new Slugger();
  const links: LinkContext = {
    currentSlug: slug,
    includeDrafts: ctx.includeDrafts,
    pack: ctx.pack,
    plan: ctx.plan,
    warn: (m) => warn(`${ctx.file}: ${m}`),
  };
  // A front matter string printed as text (never through Markdown).
  const text = (value: unknown): string => gaps.toHtml(escapeHtml(gaps.tokenize(String(value ?? ""))));

  // Commercial pages use the Home page's text classes (lead 2026-10-07).
  const classes =
    family === "commercial" ? { lead: "c-paragraph_m", firstP: "c-paragraph_m", p: "c-paragraph", li: "c-paragraph" } : undefined;
  const rendered = renderBody(gaps.tokenize(body), {
    links,
    slugger,
    finish: (h) => gaps.toHtml(h),
    ...(classes ? { classes } : {}),
  });

  // Visuals: numbered from 1 in file order, placed after the H2 named in `after`.
  const sections: PageSection[] = rendered.sections.map((s) => ({ ...s, visual: undefined }));
  (d.visuals ?? []).forEach((v, i) => {
    const n = i + 1;
    const key = `${slug}:${n}`;
    const after = String(v.after ?? "");
    const target = sections.find((s) => s.title === after) ?? sections.find((s) => s.title.startsWith(after));
    if (!target) {
      warn(`${ctx.file}: visual ${key} has no section "${after}", dropped`);
      return;
    }
    target.visual = {
      key,
      slug,
      n,
      type: String(v.type ?? "diagram"),
      side: v.side === "left" ? "left" : "right",
      brief: String(v.brief ?? ""),
      alt: String(v.alt ?? ""),
    };
  });

  const faqHeading = String(d.faqHeading ?? "");
  const faqHeadingHtml = text(faqHeading);
  const faqId = slugger.slug(faqHeading);
  const faq: FaqEntry[] = (d.faq ?? []).map((item) => {
    const qTok = gaps.tokenize(String(item.q ?? ""));
    const aTok = gaps.tokenize(String(item.a ?? ""));
    return {
      q: stripTokens(qTok),
      qHtml: gaps.toHtml(escapeHtml(qTok)),
      a: stripTokens(aTok),
      aHtml: gaps.toHtml(escapeHtml(aTok)),
      hasGap: hasToken(qTok) || hasToken(aTok),
    };
  });

  const authorTok = gaps.tokenize(String(d.author ?? ""));
  const crumbs = breadcrumbs(d.breadcrumb ?? [], links);
  const related = (d.related ?? []).map((r) => relatedItem(String(r), links)).filter((r): r is RelatedItem => r !== null);

  return {
    slug,
    url: String(d.url),
    family,
    pageType,
    draft: d.draft !== false,
    view: ctx.view,
    includeDrafts: ctx.includeDrafts,
    lang: String(d.lang ?? "en-US"),
    title: String(d.title ?? ""),
    description: String(d.description ?? ""),
    h1: String(d.h1 ?? ""),
    eyebrowHtml: text(d.eyebrow),
    lead: rendered.lead,
    sections,
    faqHeading,
    faqHeadingHtml,
    faqId,
    faq,
    closingHeadingHtml: text(d.closing?.heading),
    closingTextHtml: text(d.closing?.text),
    related,
    breadcrumbVisible: crumbs.visible,
    breadcrumbLd: crumbs.ld,
    service: { name: String(d.service?.name ?? ""), serviceType: String(d.service?.serviceType ?? "") },
    author: { html: gaps.toHtml(escapeHtml(authorTok)), text: stripTokens(authorTok), hasGap: hasToken(authorTok) },
    publishedAt: String(d.publishedAt ?? ""),
    updatedAt: String(d.updatedAt ?? ""),
    reviewEvery: String(d.reviewEvery ?? ""),
    takeaways: (d.takeaways ?? []).map((t) => text(t)),
    sources: (d.sources ?? []).map((s) => ({
      labelHtml: text(s.label),
      url: String(s.url ?? ""),
      accessed: String(s.accessed ?? ""),
    })),
    gaps: gaps.unique(),
  };
}
