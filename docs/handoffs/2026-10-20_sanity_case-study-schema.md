# Handoff — sanity — case study schema

Date: 2026-10-20 · Author: sanity agent · Branch: `feat/case-studies` · Status: DONE

**Schema NOT deployed; Sergio deploys it.** No Sanity documents were created, edited or published. Nothing committed or pushed; all changes are uncommitted in the working tree.

## What I did
- New `caseStudy` document per `docs/SCHEMAS.md` v0.10 ("`caseStudy` — Case studies" + "v0.10 changes").
  - Tabs: Overview (default) · Hero · Article · Results · Related · SEO.
  - Overview: `title` (required), `slug` (from title, required, kebab-case, unique among `caseStudy`, same regex and `slugify` as `service`), `client` (ref → client, required), `publishedAt` (`date`, required, default today), `readTime` (optional whole number ≥ 1; empty = calculated from the body).
  - Hero: `intro` (text, 3 rows), `industry` (string), `services` (refs → service, unique), `challenge` (text, 3 rows), `testimonial` (ref → testimonial; falls back to the client's).
  - Article: `body`, Portable Text with Paragraph / H2 / H3, bold + italic, bullet + numbered lists, one `link` annotation (`href` with relative paths allowed, `openInNewTab`, same shape as the `faq` answer link plus the `processStep.note` relative-URL rule). No images, embeds or tables.
  - Results: `results`, array of `kpi`, max 3.
  - Related: `related`, refs → caseStudy, max 3, unique; the picker hides the document itself (draft and published ids) and a custom rule rejects a self reference.
  - SEO: `seo` object.
  - Preview: title · client name · client logo. Orderings: published newest first (desk default), oldest first, title A to Z.
- Registered in `sanity/schemaTypes/index.ts`.
- Desk: "Case studies" list right after Clients, default ordering `publishedAt desc`; `caseStudy` excluded from the generic list so it appears once.
- `service` `RESERVED_SLUGS` gains `case-studies` (SITEMAP already lists it). `KEBAB_CASE` and `slugify` are now exported from `service.ts` so `caseStudy.ts` reuses them.

## Files changed
- `/Users/emilygaitan/benormedia-website/sanity/schemaTypes/documents/caseStudy.ts` (new)
- `/Users/emilygaitan/benormedia-website/sanity/schemaTypes/documents/service.ts`
- `/Users/emilygaitan/benormedia-website/sanity/schemaTypes/index.ts`
- `/Users/emilygaitan/benormedia-website/sanity/structure.ts`
- `/Users/emilygaitan/benormedia-website/docs/handoffs/2026-10-20_sanity_case-study-schema.md` (this file)

## Checks
- [x] `pnpm run build` passes (exit 0)
- [x] `pnpm run check` passes (0 errors, 0 warnings, 0 hints)
- [x] `pnpm run lint` passes (exit 0, no output)
- [x] `pnpm exec sanity schema validate` (local only): 0 errors, 0 warnings
- [ ] Studio not opened in a browser in this run; desk structure verified by code review only
- Visual checks: n/a (no front-end change)

## Requests for other agents
- @sanity: none.
- @astro: types for case studies are hand-written in `src/lib/sanity/types.ts`; add them with the v0.10 queries (`ALL_CASE_STUDIES`, `CASE_STUDY_SLUGS`, `CASE_STUDY_BY_SLUG`, `CASE_STUDY_SLUG_BY_CLIENT`). Notes for those types: `publishedAt` is a `date` (`YYYY-MM-DD`), not a datetime like `post.publishedAt`; body link marks are `{ _type: "link", href, openInNewTab? }` and `href` may be a relative path; `body` is not required, so treat it as possibly missing.
- @ui: none.

## Open questions for the project lead
1. `link.internalRef` (CMS buttons) does not list `caseStudy`, and `post.body`'s `internalLink` annotation does not either. Left unchanged as instructed. Add `caseStudy` to them if buttons or blog posts should link to case studies by reference (needs a SCHEMAS.md bump).
2. SCHEMAS.md doesn't say whether `body` is required. I left it optional (the row has no "required"). Say if it should be required.
3. No max lengths are given for `title`, `intro`, `industry` or `challenge`. None added; tell us if the design breaks past a length.

## TODO markers added
- `TODO: DS` — none
- `TODO: COPY` — none
