/**
 * Case study registry (`/work/[slug]`). Add an entry module in `entries/`
 * and list it here; `registry.mjs` reads the same files for the sitemap.
 *
 * Drafts follow `/about`'s rule: built only where drafts are (previews,
 * `astro dev`, `PAGES_INCLUDE_DRAFTS=1`), never in production.
 */
import { includeDrafts } from "../new-pages/loader";
import type { CaseStudy } from "./types";
import { CASE_STUDY as surfe } from "./entries/surfe";

export const CASE_STUDIES: readonly CaseStudy[] = [surfe];

/** The case studies this build has. */
export const builtCaseStudies = (): readonly CaseStudy[] =>
  CASE_STUDIES.filter((c) => !c.draft || includeDrafts());

export const caseStudyPath = (c: Pick<CaseStudy, "slug">): string => `/work/${c.slug}`;
