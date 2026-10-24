# Handoff — sanity — case study v0.11 schema fields

Date: 2026-10-22 · Author: sanity agent · Branch: `feat/case-studies-v2` · Status: DONE

**Schema NOT deployed; pending Sergio's OK.** Code only: no `sanity deploy` / `schema deploy`, no MCP writes, no documents touched, no commits.

## What I did
- New object `cardStat` (`value` string required, `label` string required). No max-length warning: the existing `stat` and `kpi` objects have none, so none added. Item preview: `value · label`.
- `caseStudy.cardStats`: optional array of `cardStat`, max 2 (error), in a new **Card** tab placed between Results and Related. Description tells editors it is the stats row on the card and that the row is hidden when empty.
- `client.logoOnDark`: optional image (hotspot) with optional `alt` subfield (falls back to the client name), same pattern as `logo`, placed right after `logo`. Description: logo for dark backgrounds (navy case-study card); empty → the site whitens the regular logo, which only looks right for one-colour logos.
- Registered `cardStat` in `sanity/schemaTypes/index.ts` (header comment now points to SCHEMAS v0.11).
- Matches `docs/SCHEMAS.md` v0.11 (changes block, `client` row, `caseStudy` Card row). No SCHEMAS edit needed.

## Files changed
- `sanity/schemaTypes/objects/cardStat.ts` (new)
- `sanity/schemaTypes/documents/caseStudy.ts`
- `sanity/schemaTypes/documents/client.ts`
- `sanity/schemaTypes/index.ts`

## Checks
- [x] `pnpm exec sanity schema validate` (local): 0 errors, 0 warnings
- [x] `pnpm run build` passes
- [x] `pnpm run check` passes (0 errors, 0 warnings, 0 hints)
- [x] `pnpm run lint` passes
- [ ] Checked at 1440 / 991 / 767 / 375 (n/a, schema only)

## Requests for other agents
- @sanity: after Sergio's OK, deploy the schema (and Studio if hosted); then editors can fill `cardStats` and `logoOnDark`.
- @astro: nothing new. `src/lib/sanity/queries.ts` (card projection) and `types.ts` (`CaseStudyCardStat`, `logoOnDark`) already match v0.11. Until the schema is deployed, the fields are simply empty, so the card hides its stats row and uses the whitened `logo`.
- @ui: none.

## Open questions for the project lead
- Sergio: OK to deploy v0.11 (`caseStudy.cardStats`, `client.logoOnDark`)? (already in DECISIONS → Open questions)

## TODO markers added
- `TODO: DS` — none
- `TODO: COPY` — none
