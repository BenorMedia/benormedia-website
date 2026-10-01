# Handoff — sanity — Phase 2 schemas + desk + seed

Date: 2026-09-25 · Branch: `feat/phase2-sanity` · Status: DONE

## What I did

Implemented docs/SCHEMAS.md v0.4 in full: every object, document and singleton with clear editor-facing titles and descriptions, validation, previews, and field groups (Content / SEO tabs on page docs; General / SEO & Meta / Organization / Navigation / Footer / Global sections tabs on siteSettings).

- Installed `@sanity/image-url` and `@sanity/table` (deps) and `dotenv` (devDep). Did **not** upgrade `sanity` or `@sanity/astro` (pinned per DECISIONS 2026-09-25).
- Built the flat schema registry (`sanity/schemaTypes/index.ts`) and a new desk structure (`sanity/structure.ts`) in the exact order requested: Site Settings, Home, Work, Pricing, Testimonials, Blog, divider, then Clients, Testimonials, Blog (posts), Authors, Categories, Services, Technologies. Singleton types are filtered out of the collections list.
- Wired `structureTool({ structure })` and the `@sanity/table` plugin into `sanity.config.ts`. Added a `document.actions` hook that removes `duplicate` and `delete` for singleton types and a `document.newDocumentOptions` hook that hides singletons from the global "+ New" menu.
- Enforced hard rules from v0.4: RESERVED_SLUGS (`work, pricing, testimonials, blog, studio, dev, 404`) exported from `service.ts` and enforced in a custom slug validator; button.variant restricted to `gradient | gradient-outline | white | glass` (mirrors `src/components/ui/Button.astro`); every image field has an `alt`; hard-required alt on `client.cardThumbnail`, `client.websiteScreenshot`, `post.thumbnail`; every routable doc has `slug` + `seo`; unique validator on `category.title`; `post.body` = Portable Text with H2/H3/H4, bullet/numbered lists, blockquote, bold/italic, internal + external links, image (alt + optional caption) and `@sanity/table` — no embeds, videos, code or CTA.
- Seeded Home text-like fields with `initialValue: 'TODO: COPY — ...'` placeholders per instructions. Reference arrays left empty for the lead to populate after seed.
- Added `scripts/seed-categories.mjs` (Node ESM, idempotent via `createOrReplace` + deterministic `category-<slug>` IDs) and wired `pnpm run seed:categories`. Script errors clearly if `SANITY_WRITE_TOKEN` is missing. Not run — the lead runs it after providing the token.

## Files changed

New:
- `sanity/schemaTypes/objects/seo.ts`
- `sanity/schemaTypes/objects/link.ts`
- `sanity/schemaTypes/objects/button.ts`
- `sanity/schemaTypes/objects/sectionHeader.ts`
- `sanity/schemaTypes/objects/stat.ts`
- `sanity/schemaTypes/objects/kpi.ts`
- `sanity/schemaTypes/objects/faq.ts`
- `sanity/schemaTypes/objects/faqSection.ts`
- `sanity/schemaTypes/documents/category.ts`
- `sanity/schemaTypes/documents/author.ts`
- `sanity/schemaTypes/documents/testimonial.ts`
- `sanity/schemaTypes/documents/client.ts`
- `sanity/schemaTypes/documents/service.ts`
- `sanity/schemaTypes/documents/technology.ts`
- `sanity/schemaTypes/documents/post.ts`
- `sanity/schemaTypes/singletons/siteSettings.ts`
- `sanity/schemaTypes/singletons/homePage.ts`
- `sanity/schemaTypes/singletons/workPage.ts`
- `sanity/schemaTypes/singletons/pricingPage.ts`
- `sanity/schemaTypes/singletons/testimonialsPage.ts`
- `sanity/schemaTypes/singletons/blogPage.ts`
- `sanity/structure.ts`
- `scripts/seed-categories.mjs`

Modified:
- `sanity/schemaTypes/index.ts` — replaced empty stub with flat registry + `SINGLETON_TYPES` export.
- `sanity.config.ts` — loads new desk structure; adds `@sanity/table` plugin; adds singleton document actions filter + newDocumentOptions filter.
- `package.json` — adds `@sanity/image-url`, `@sanity/table` (deps), `dotenv` (devDep), and `seed:categories` script.

Not touched (per rules): `astro.config.mjs`, `benorSanityAliasFix`, `docs/DESIGN_SYSTEM.md`, `src/styles/tokens.css`.

## Deviations from SCHEMAS.md v0.4

**None.** Every field, type, validation and reference in v0.4 is present. Fields that v0.4 explicitly marks as TBD/TODO are stubbed with an inline `// TODO: SCHEMAS —` comment (see below), not omitted.

Minor structural notes (not deviations):
- Alt-text auto-fill (SCHEMAS.md: "Alt auto = client name" for logo/icon, "= author name" for photos, "from role/company" for company logo) cannot be done as pure schema `initialValue` because it depends on a sibling field. It is described to editors in each field's description ("If left blank, the client name is used automatically") and needs to be applied at query/render time by astro. This is a resolution rule, not a stored value.
- `link.internalRef` uses conditional `hidden` + custom validation because Sanity does not support declarative conditional-required.

## TODO markers added (SCHEMAS.md open questions → inline TODOs)

All inline as `// TODO: SCHEMAS —` at the exact field/section:
- `documents/service.ts` — `sections` field: array shape is TBD; placeholder `array of string`, `hidden: true`, until Day 6 designs.
- `documents/technology.ts` — file-level TODO: confirm the 5-group list; confirm whether groups + capability chips are editable in Sanity vs hardcoded.
- `documents/testimonial.ts` — `quote` field: confirm max length once design is finalized.
- `singletons/homePage.ts` — file-level TODO: hand-picked vs automatic selections. Also inline TODOs on `technologies.groups` and `technologies.capabilities` (final shape TBD).
- `singletons/workPage.ts`, `pricingPage.ts`, `testimonialsPage.ts`, `blogPage.ts` — file-level TODO: expand once Day 6 designs land. Currently hero + seo only per SCHEMAS.md.

Also `TODO: COPY` initial values on every text-like Home hero / logo strip / section header field, and on the placeholder page hero titles.

## Checks

- [x] `pnpm run build` passes — exit 0. Static output complete (3 pages: `/`, `/dev/styleguide`, `/studio`).
- [x] `pnpm run check` passes — exit 0. 36 files, 0 errors, 0 warnings, 0 hints.
- [x] `pnpm run lint` passes — exit 0.
- [ ] Checked at 1440 / 991 / 767 / 375 — n/a (schema-only change; no visual output).

## Requests for other agents

- **@astro**
  - Generate types (`sanity typegen`) or hand-write `src/lib/sanity/types.ts` matching the v0.4 shape now that schemas exist. Recommend hand-written for Phase 2, then automate later.
  - Add `src/lib/sanity/queries.ts` for Home + siteSettings per BUILD_PLAN Day 2. Reference arrays on Home need to preserve document order and expand referenced `client` / `testimonial` / `service` / `technology` docs.
  - Implement alt-text fallback resolution at render time: if `alt` empty, use `client.name` (logo/icon), `author.name` (photo), `testimonial.authorName` (authorPhoto). For `companyLogo`, extract from `authorRole` after the comma or fall back to alt.
  - Reserved slugs are enforced schema-side; also block them at build/route time if you create dynamic routes for `service`.
- **@ui** — no action.
- **@qa** — Studio review request: verify each singleton opens directly (no list), that "Create" is disabled for singletons in the global menu, that duplicate/delete are hidden on singleton documents, and that trying to add `service.slug` = `work` / `pricing` / `blog` / etc. is rejected.

## Instructions for the project lead

**Run the categories seed (once, after generating a write token):**

1. In sanity.io/manage → Project → API → Tokens, create a new token with role **Editor** (or higher). Name it e.g. "local seed".
2. Add it to your local `.env` (do NOT commit): `SANITY_WRITE_TOKEN=sk...`
3. Confirm `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` are also set in `.env`.
4. Run: `pnpm run seed:categories`
5. The script is idempotent — safe to re-run if a title changes. It uses deterministic IDs (`category-<slug>`) and `createOrReplace`.
6. Verify in Studio (`/studio` → Categories) that all 22 categories appear.

**Publish webhook → Vercel deploy hook (deferred, NOT in this handoff):**

Per BUILD_PLAN Day 2 and DECISIONS 2026-09-24, this must be wired before launch but is not part of Phase 2 code. When ready:

1. In Vercel → Project → Settings → Git → Deploy Hooks, create a hook for the `dev` branch. Copy the URL.
2. In sanity.io/manage → Project → API → Webhooks, create a webhook:
   - URL: the Vercel deploy hook URL
   - Dataset: `production`
   - Trigger on: Create, Update, Delete
   - Filter: `_type in ["homePage","workPage","pricingPage","testimonialsPage","blogPage","siteSettings","client","testimonial","post","author","category","service","technology"]`
   - HTTP method: POST
   - No secret required (deploy-hook URLs are secret themselves).
3. Verify by editing any document in Studio and confirming a new deploy fires on Vercel.
4. Repeat for the `main` deploy hook once production is live (separate webhook filtered the same way).

## Open questions for the project lead

- Testimonial quote max length — need a number for validation.
- Technologies: are the 5 groups + capability chips fully editable in Sanity, or should they be hardcoded and only the technology cards editable? Current schema treats them as editable via `homePage.technologies.groups`.
- Home selections: hand-picked (current) vs automatic (latest / featured flag)? Current schema is hand-picked.
- Service page section shape — awaiting Day 6 designs.
- Is `category.title` uniqueness the right constraint, or should uniqueness be on the slug? Currently on title (SCHEMAS.md says "required, unique" against title).

## TODO markers added

- `TODO: SCHEMAS` — service.sections shape (`documents/service.ts`); testimonial quote max length (`documents/testimonial.ts`); technology groups + editability (`documents/technology.ts`); Home technologies groups shape + capabilities shape + hand-picked vs auto (`singletons/homePage.ts`); Day 6 expansion of workPage/pricingPage/testimonialsPage/blogPage.
- `TODO: COPY` — every text-like `initialValue` on `homePage` hero + sections and on the four placeholder page heroes.
