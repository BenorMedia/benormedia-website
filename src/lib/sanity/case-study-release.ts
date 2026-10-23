/**
 * Case studies: production safeguards (QA round 1, lead 2026-10-21).
 *
 *   - `isProductionBuild()`: the production check of `/dev/case-study` and
 *     `/case-studies` (`resolveMode` in `src/lib/new-pages/registry.mjs`:
 *     `VERCEL_ENV=production` or `PUBLIC_SITE_ENV=production`).
 *   - `guardCaseStudyCopy()`: once a case study is published, the copy that
 *     goes live with it (the `/case-studies` hero and meta, the labels on
 *     the detail pages) must not be a placeholder. A Sanity publish rebuilds
 *     production without a pull request, so the build itself checks: in
 *     production it STOPS with an error that says what to replace and where;
 *     elsewhere (dev, Vercel previews) it only warns.
 *
 * A placeholder is text containing "Lorem ipsum" (any case) or a literal
 * "TODO: COPY" / "TODO COPY". Placeholders that look like real words (the
 * index meta title "Case Studies", marked `TODO: COPY` in a code comment)
 * can't be told apart from final copy, so they are not checked.
 */
import { CASE_STUDY_COPY } from '../../components/case-studies/copy';
import { PAGE_META } from '../content/seo';
import { resolveMode } from '../new-pages/registry.mjs';

/** Same check as the new pages and `/dev/case-study` (`resolveMode`). */
export function isProductionBuild(): boolean {
  const meta = (import.meta.env ?? {}) as Record<string, unknown>;
  const siteEnv = meta['PUBLIC_SITE_ENV'];
  const env = {
    ...process.env,
    PUBLIC_SITE_ENV: typeof siteEnv === 'string' ? siteEnv : process.env['PUBLIC_SITE_ENV'],
  };
  return resolveMode(env, meta['DEV'] === true).production;
}

export interface CopyField {
  /** What the visitor sees, in plain words. */
  label: string;
  /** Where to replace it: file and key. */
  source: string;
  value: string;
}

const PLACEHOLDER = /lorem\s+ipsum|TODO\s*:?\s*COPY/i;

const COPY_FILE = 'src/components/case-studies/copy.ts';
const SEO_FILE = 'src/lib/content/seo.ts';

/** Copy on `/case-studies` (hero, meta tags, JSON-LD name). */
export function indexCopyFields(): CopyField[] {
  const hero = CASE_STUDY_COPY.indexHero;
  return [
    { label: '/case-studies hero eyebrow', source: `${COPY_FILE} → CASE_STUDY_COPY.indexHero.eyebrow`, value: hero.eyebrow },
    { label: '/case-studies hero title', source: `${COPY_FILE} → CASE_STUDY_COPY.indexHero.title`, value: hero.title },
    { label: '/case-studies hero title, gradient part', source: `${COPY_FILE} → CASE_STUDY_COPY.indexHero.accent`, value: hero.accent },
    { label: '/case-studies hero description', source: `${COPY_FILE} → CASE_STUDY_COPY.indexHero.description`, value: hero.description },
    { label: '/case-studies meta title', source: `${SEO_FILE} → PAGE_META.caseStudies.title`, value: PAGE_META.caseStudies.title },
    { label: '/case-studies meta description', source: `${SEO_FILE} → PAGE_META.caseStudies.description`, value: PAGE_META.caseStudies.description },
    { label: 'breadcrumb "Case studies" label', source: `${COPY_FILE} → CASE_STUDY_COPY.breadcrumb.index`, value: CASE_STUDY_COPY.breadcrumb.index },
  ];
}

/**
 * Code copy on a published case study page: the breadcrumb, and the related
 * section heading when that section renders (it needs at least one other
 * published case study).
 */
export function detailCopyFields(hasRelatedSection: boolean): CopyField[] {
  const fields: CopyField[] = [
    { label: 'breadcrumb "Home" label', source: 'src/lib/new-pages/copy.json → livePathNames["/"]', value: CASE_STUDY_COPY.breadcrumb.home },
    { label: 'breadcrumb "Case studies" label', source: `${COPY_FILE} → CASE_STUDY_COPY.breadcrumb.index`, value: CASE_STUDY_COPY.breadcrumb.index },
  ];
  if (hasRelatedSection) {
    fields.push(
      { label: 'related case studies eyebrow', source: `${COPY_FILE} → CASE_STUDY_COPY.related.eyebrow`, value: CASE_STUDY_COPY.related.eyebrow },
      { label: 'related case studies heading', source: `${COPY_FILE} → CASE_STUDY_COPY.related.heading`, value: CASE_STUDY_COPY.related.heading },
    );
  }
  return fields;
}

const warned = new Set<string>();

/** Who is checking, for the messages (case studies, comparisons). */
export interface GuardScope {
  /** Log prefix, e.g. "case-studies". */
  tag: string;
  /** What was published, e.g. "a case study". */
  item: string;
}

/**
 * Stops a production build (or warns elsewhere) when any field is still a
 * placeholder (`pattern`, default "Lorem ipsum" / "TODO: COPY"). Shared by
 * `guardCaseStudyCopy` and the comparison guard (`comparison-release.ts`).
 */
export function guardPlaceholderCopy(
  scope: GuardScope,
  page: string,
  fields: readonly CopyField[],
  production: boolean,
  pattern: RegExp = PLACEHOLDER,
  what = 'placeholder copy (Lorem ipsum / TODO: COPY)',
): void {
  const bad = fields.filter((f) => pattern.test(f.value));
  // One entry per source (the breadcrumb label can appear in both lists).
  const unique = [...new Map(bad.map((f) => [f.source, f])).values()];
  if (unique.length === 0) return;

  const lines = unique.map((f) => `  - ${f.label}: "${f.value.replace(/\s+/g, ' ').slice(0, 60)}" → replace in ${f.source}`);
  if (production) {
    throw new Error(
      [
        `[${scope.tag}] Build stopped on purpose: ${scope.item} is published, so ${page} would go live with ${what}.`,
        'Replace these texts with the final copy, merge, and rebuild:',
        ...lines,
        `Until then, unpublish ${scope.item.replace(/^an? /, 'the ')} in Sanity to let the production build pass again. The live site keeps its previous deploy.`,
      ].join('\n'),
    );
  }
  const key = `${scope.tag}|${page}|${unique.map((f) => f.source).join('|')}`;
  if (warned.has(key)) return;
  warned.add(key);
  console.warn(
    [
      `[${scope.tag}] ${page} uses ${what} while ${scope.item} is published. A production build would stop here:`,
      ...lines,
    ].join('\n'),
  );
}

/**
 * Stops a production build (or warns elsewhere) when any field is still a
 * placeholder. Call it only when at least one case study is published.
 *
 * @param page the page being built, for the message (e.g. "/case-studies")
 */
export function guardCaseStudyCopy(page: string, fields: readonly CopyField[], production: boolean): void {
  guardPlaceholderCopy({ tag: 'case-studies', item: 'a case study' }, page, fields, production);
}
