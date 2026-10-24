# Handoff — sanity — comparison schema

Date: 2026-10-22 · Author: sanity agent · Branch: `feat/comparison` · Status: DONE (code only, not deployed, no documents created; pending the lead's OK on the field list)

## What I did
- New `comparison` document (Studio "Comparisons", newest first), routable at `/comparison/<slug>`, built from Figma template 3790:37245 and index card 3790:37967. Tabs in page order: Overview · Hero · What to choose · Table · Why switch · Migration · Case studies · FAQs · Card · SEO.
- New objects: `accentSectionHeader` (eyebrow + `accentTitle` + description, for the 5 section headers, because `sectionHeader.title` is plain text), `comparisonChoice`, `comparisonTableGroup`, `comparisonTableRow` and `comparisonReason`. `imageAlt.ts` is a helper, not a type: alt is required as soon as an image is set.
- Reused objects: `accentTitle` (hero headline, card titles), `processStep` (migration steps; `note` and `features` hidden there), `stat` (reason stats; new optional `source` + `sourceUrl`, visible in Studio only inside `comparison.reasons`), `faqSection`/`faq` (same as services), `seo`, and references to `caseStudy`.
- Reserved service slugs gain `comparison`.
- `docs/SCHEMAS.md` bumped to v0.13 with the full field contract and the GROQ shapes (`ALL_COMPARISONS`, `COMPARISON_SLUGS`, `COMPARISON_BY_SLUG`, published only).
- `docs/DECISIONS.md` → Comparison: 8 `Proposed` rows and the matching open questions.
- No Sanity dataset writes, no schema deploy, no commit.

## Files changed
- `sanity/schemaTypes/documents/comparison.ts` (new)
- `sanity/schemaTypes/objects/accentSectionHeader.ts` (new)
- `sanity/schemaTypes/objects/comparisonChoice.ts` (new)
- `sanity/schemaTypes/objects/comparisonTable.ts` (new: `comparisonTableGroup`, `comparisonTableRow`)
- `sanity/schemaTypes/objects/comparisonReason.ts` (new)
- `sanity/schemaTypes/objects/imageAlt.ts` (new helper)
- `sanity/schemaTypes/objects/stat.ts` (optional `source`, `sourceUrl`)
- `sanity/schemaTypes/objects/processStep.ts` (`note` and `features` hidden in `migrationSteps`; image description)
- `sanity/schemaTypes/documents/service.ts` (reserved slug `comparison`)
- `sanity/schemaTypes/index.ts`, `sanity/structure.ts`
- `docs/SCHEMAS.md`, `docs/DECISIONS.md`

## Checks
- [x] `pnpm run build` passes
- [x] `pnpm run check` passes (0 errors, 0 warnings, 0 hints)
- [x] `pnpm run lint` passes
- [x] `sanity schema validate`: 0 errors, 0 warnings
- [ ] Checked at 1440 / 991 / 767 / 375: not applicable (no visual change)

## Requests for other agents
- @sanity: none.
- @astro: add `PUBLISHED_COMPARISON`, `ACCENT_SECTION_HEADER`, `ALL_COMPARISONS`, `COMPARISON_SLUGS` and `COMPARISON_BY_SLUG` to `src/lib/sanity/queries.ts` exactly as in SCHEMAS v0.13 "GROQ: comparison". Add types to `src/lib/sanity/types.ts`, for example `AccentSectionHeader`, `ComparisonChoice`, `ComparisonTableRow`, `ComparisonTableGroup`, `ComparisonStat` (`Stat` + `source?`, `sourceUrl?`), `ComparisonReason`, `ComparisonCard` and `Comparison`. Reuse `AccentTitle`, `ProcessStep`, `ServiceFaqSection`, `CaseStudyCard` and `SanityImage`. Rendering rules are in SCHEMAS: card title = `cardTitle ?? title`; `caseStudies` empty → `latestCaseStudies`; the second hero button anchors to the table section; empty sections render nothing. Logo alt falls back to `competitorName`.
- @ui: none from the schema. The competitor logo on the table header uses `competitorLogoOnDark`, else `competitorLogo` with a whitening filter (same as the case-study card's `logoOnDark`).

## Open questions for the project lead
1. Approve the `comparison` field list (SCHEMAS v0.13). Schema deploy is the orchestrator's call after approval.
2. The hero buttons' actions are fixed in code (contact popup, and scroll to the table); only their labels are editable. OK?
3. If no case studies are picked, the 3 newest published ones show. OK, or hide the section?
4. Index order is newest first. OK?
5. Design team: what does the chevron next to the competitor logo in the hero pill do? It needs no schema field either way.
6. Design team: should a stat's source show inline after the label (as "[source]" in Figma) or as a link?

## TODO markers added
- `TODO: DS`: none.
- `TODO: COPY`: none (schema only; no copy written, no initial values except today's date).
