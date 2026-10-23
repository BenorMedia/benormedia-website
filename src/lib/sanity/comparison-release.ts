/**
 * Comparisons: production safeguards (same pattern as case studies,
 * `case-study-release.ts`).
 *
 *   - Code copy: once a comparison is published, the `/comparison` hero and
 *     meta and the breadcrumb labels must not be placeholders ("Lorem
 *     ipsum" / "TODO: COPY"). A Sanity publish rebuilds production without a
 *     pull request, so the build checks: production STOPS with a message
 *     that says what to replace and where; other builds warn.
 *   - Sanity copy: a published comparison must not carry a placeholder or an
 *     open marker (`[FACT NEEDED: …]`, `[VERIFY: …]`, `[PERSON: …]`,
 *     `[QUOTE: …]`, `[RESULT NEEDED: …]`, CLAUDE.md "Content files"). Same
 *     behavior: production stops, other builds warn.
 */
import { COMPARISON_COPY } from '../../components/comparison/copy';
import { guardPlaceholderCopy, type CopyField, type GuardScope } from './case-study-release';
import type { Comparison } from './types';

export { isProductionBuild } from './case-study-release';

const SCOPE: GuardScope = { tag: 'comparison', item: 'a comparison' };
const COPY_FILE = 'src/components/comparison/copy.ts';

/** Lorem ipsum, TODO: COPY, or an open content marker. */
const PLACEHOLDER_OR_MARKER = /lorem\s+ipsum|TODO\s*:?\s*COPY|\[(FACT NEEDED|VERIFY|PERSON|QUOTE|RESULT NEEDED)\s*:/i;

/** Copy on `/comparison` (hero, meta tags, JSON-LD name). */
export function comparisonIndexCopyFields(): CopyField[] {
  const hero = COMPARISON_COPY.indexHero;
  const meta = COMPARISON_COPY.indexMeta;
  return [
    { label: '/comparison hero eyebrow', source: `${COPY_FILE} → COMPARISON_COPY.indexHero.eyebrow`, value: hero.eyebrow },
    { label: '/comparison hero title', source: `${COPY_FILE} → COMPARISON_COPY.indexHero.title`, value: hero.title },
    { label: '/comparison hero description', source: `${COPY_FILE} → COMPARISON_COPY.indexHero.description`, value: hero.description },
    { label: '/comparison meta title', source: `${COPY_FILE} → COMPARISON_COPY.indexMeta.title`, value: meta.title },
    { label: '/comparison meta description', source: `${COPY_FILE} → COMPARISON_COPY.indexMeta.description`, value: meta.description },
    { label: 'breadcrumb "Comparison" label', source: `${COPY_FILE} → COMPARISON_COPY.breadcrumb.index`, value: COMPARISON_COPY.breadcrumb.index },
  ];
}

/** Code copy on a published comparison page (JSON-LD breadcrumb labels, FAQ heading). */
export function comparisonDetailCopyFields(): CopyField[] {
  return [
    { label: 'breadcrumb "Home" label', source: 'src/lib/new-pages/copy.json → livePathNames["/"]', value: COMPARISON_COPY.breadcrumb.home },
    { label: 'breadcrumb "Comparison" label', source: `${COPY_FILE} → COMPARISON_COPY.breadcrumb.index`, value: COMPARISON_COPY.breadcrumb.index },
    { label: 'FAQ heading', source: `${COPY_FILE} → COMPARISON_COPY.faqHeading`, value: COMPARISON_COPY.faqHeading },
  ];
}

/** Every string in the published document, labelled by its path (e.g. `reasons[2].stats[0].value`). */
export function comparisonSanityFields(comparison: Comparison): CopyField[] {
  const fields: CopyField[] = [];
  const studio = `Sanity → Comparisons → "${comparison.title}"`;
  const walk = (value: unknown, path: string): void => {
    if (typeof value === 'string') {
      fields.push({ label: `Sanity field ${path}`, source: `${studio} → ${path}`, value });
    } else if (Array.isArray(value)) {
      value.forEach((item, i) => walk(item, `${path}[${i}]`));
    } else if (value && typeof value === 'object') {
      for (const [key, child] of Object.entries(value)) {
        // System fields, keys and image assets hold no visible copy.
        if (key.startsWith('_') || key === 'asset' || key === 'hotspot' || key === 'crop' || key === 'marks') continue;
        // Case studies are their own documents, checked by their own guard.
        if (key === 'caseStudies' || key === 'latestCaseStudies') continue;
        walk(child, path ? `${path}.${key}` : key);
      }
    }
  };
  walk(comparison, '');
  return fields;
}

/** Code copy: stops production / warns elsewhere. Call only when a comparison is published. */
export function guardComparisonCopy(page: string, fields: readonly CopyField[], production: boolean): void {
  guardPlaceholderCopy(SCOPE, page, fields, production);
}

/** Sanity copy of one published comparison: placeholders and open markers. */
export function guardComparisonContent(page: string, comparison: Comparison, production: boolean): void {
  guardPlaceholderCopy(
    SCOPE,
    page,
    comparisonSanityFields(comparison),
    production,
    PLACEHOLDER_OR_MARKER,
    'placeholder copy or an open marker ([FACT NEEDED: …], TODO: COPY, Lorem ipsum)',
  );
}
