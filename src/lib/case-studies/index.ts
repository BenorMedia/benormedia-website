/**
 * Case study registry (`/work/[slug]`). Every module in `entries/` is
 * picked up (one `CASE_STUDY` export each, ordered by slug); `registry.mjs`
 * reads the same files for the sitemap.
 *
 * Drafts follow `/about`'s rule: built only where drafts are (previews,
 * `astro dev`, `PAGES_INCLUDE_DRAFTS=1`), never in production.
 */
import { includeDrafts } from "../new-pages/loader";
import type { CaseStudy } from "./types";

const modules = import.meta.glob<{ CASE_STUDY: CaseStudy }>("./entries/*.ts", { eager: true });

export const CASE_STUDIES: readonly CaseStudy[] = Object.values(modules)
  .map((m) => m.CASE_STUDY)
  .sort((a, b) => a.slug.localeCompare(b.slug));

/** The case studies this build has. */
export const builtCaseStudies = (): readonly CaseStudy[] =>
  CASE_STUDIES.filter((c) => !c.draft || includeDrafts());

export const caseStudyPath = (c: Pick<CaseStudy, "slug">): string => `/work/${c.slug}`;
