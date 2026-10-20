/**
 * Case study helpers (SCHEMAS.md v0.10). Pure functions over the
 * `CASE_STUDY_BY_SLUG` result; no fetching.
 */
import { portableTextReadMinutes } from './portable-text';
import type { CaseStudy, CaseStudyCard } from './types';

/** Max cards in the "Resources" row at the end of a case study. */
const RESOURCES_MAX = 3;

/** `readTime` when the editor set one, else calculated from the body word count. */
export function caseStudyReadMinutes(caseStudy: Pick<CaseStudy, 'readTime' | 'body'>): number {
  const { readTime } = caseStudy;
  if (typeof readTime === 'number' && readTime >= 1) return Math.round(readTime);
  return portableTextReadMinutes(caseStudy.body);
}

/** The editor's `related` picks, or the latest published case studies when there are none. */
export function caseStudyResources(caseStudy: Pick<CaseStudy, 'related' | 'latest'>): CaseStudyCard[] {
  const related = caseStudy.related ?? [];
  return (related.length > 0 ? related : (caseStudy.latest ?? [])).slice(0, RESOURCES_MAX);
}
