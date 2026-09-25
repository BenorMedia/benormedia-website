# Handoff — astro — Phase 2 Home + siteSettings query layer

Date: 2026-09-25 · Branch: `feat/phase2-sanity` · Status: DONE

## What I did

Built the server-side Sanity data layer under `src/lib/sanity/` per the astro column of Day 2. Scope is Home + siteSettings only, as instructed — other page singletons and documents (`workPage`, `pricingPage`, `testimonialsPage`, `blogPage`, `post`, `service`) are intentionally left for later handoffs.

- `client.ts` re-exports the `sanityClient` that `@sanity/astro` builds from `astro.config.mjs`. This keeps the project id / dataset / apiVersion / useCdn in a single place (the integration config) rather than duplicating them here.
- `image.ts` seeds `@sanity/image-url` from that same client and exports `urlFor` + a `Source` type alias. Uses the non-deprecated named export `createImageUrlBuilder` (the default export triggered a ts6385 deprecation hint on the first pass).
- `queries.ts` defines `HOME_QUERY` and `SITE_SETTINGS_QUERY` as GROQ template strings built from small named fragments (`IMAGE`, `LINK`, `BUTTON`, `SECTION_HEADER`, `STAT`, `KPI`, `SEO`, and one projection per referenced doc). Every field the schemas ship is projected; every reference is dereferenced with `->` and the only fields the renderer needs; every image field returns raw `asset->{_ref, _id}` + `hotspot` + `crop` + `alt` so `urlFor` works at render time. Two fetchers `getHome()` / `getSiteSettings()` return the singleton or `null`.
- `types.ts` hand-writes the two result shapes plus supporting types (`SanityImage`, `SanityRef<T>`, `Link`, `Button`, `SectionHeader`, `Stat`, `Kpi`, `Seo`, `Client`, `Testimonial`, `Category`, `Author`, `Service`, `Technology`, and every Home + siteSettings sub-object). `Faq` / `FaqSection` are exported now so the blog handoff can pick them up without a merge conflict.

Verified every field name against `sanity/schemaTypes/singletons/homePage.ts`, `siteSettings.ts`, `objects/*.ts`, and the six referenced documents before writing the projections. Optionality in the TS types matches the schema `validation.required()` calls one-for-one.

## Files created

- `src/lib/sanity/client.ts`
- `src/lib/sanity/image.ts`
- `src/lib/sanity/queries.ts`
- `src/lib/sanity/types.ts`

## Files changed

None — no other files touched. `astro.config.mjs`, `sanity.config.ts`, and everything under `sanity/schemaTypes/` are unchanged (per rules).

## Client-reuse decision

Re-exported the `sanityClient` from the `sanity:client` virtual module that `@sanity/astro@3.5.1` sets up (see `node_modules/@sanity/astro/module.d.ts`). Advantages: single source of truth for project id / dataset / apiVersion / useCdn (they live in `astro.config.mjs` already), no risk of drift, and no need to read `.env` from a lib file.

## Live-dataset verification

**Not verified against a live dataset.** No `SANITY_WRITE_TOKEN` in this environment, and the Home + siteSettings singletons haven't been created in the dataset yet (the sanity handoff shipped schemas + a categories seed, not content). Types compile, `astro check` is clean, and the queries are structurally correct against v0.4 schemas — but a smoke query should be run after the project lead populates the Home singleton in Studio.

Suggested smoke test after content exists:
1. `pnpm dev`
2. In any Astro page, `import { getHome } from '~/lib/sanity/queries'` (or relative path) and log the shape.
3. Confirm `hero.title` and `logoStrip.clients[0].name` come through.

## Checks

- [x] `pnpm run check` passes — exit 0. 40 files, 0 errors, 0 warnings, 0 hints.
- [x] `pnpm run build` passes — exit 0. 3 pages built (unchanged: `/`, `/dev/styleguide`, `/studio`).
- [x] `pnpm run lint` passes — exit 0.
- [ ] Checked at 1440 / 991 / 767 / 375 — n/a (data-layer only; no visual output).

## Requests for other agents

- **@sanity** — no action. Schemas are locked and untouched.
- **@ui** — no action.
- **@astro (future handoff)** —
  - When you add Home page rendering, import `getHome` and treat a `null` result as "no content yet" (do not crash the build). Same for `getSiteSettings` in the layout.
  - Alt-text fallback rule from the sanity handoff still stands and should be implemented at the component level, not in `queries.ts`: if `image.alt` is empty, use `client.name` (logo/icon), `author.name` (photo), `testimonial.authorName` (authorPhoto), or the string after the comma in `testimonial.authorRole` (companyLogo).
  - Follow-up queries needed later: `WORK_PAGE_QUERY`, `PRICING_PAGE_QUERY`, `TESTIMONIALS_PAGE_QUERY`, `BLOG_PAGE_QUERY`, `POSTS_QUERY` / `POST_BY_SLUG_QUERY` (`getStaticPaths`), `SERVICE_BY_SLUG_QUERY`, `CATEGORIES_QUERY`. Fragments in `queries.ts` are reusable — extend rather than duplicate.
- **@qa** — once content exists, run the smoke test above and confirm the shape of `getHome()` matches `HomePage` at runtime (Sanity does not enforce TS at the wire).

## Open questions for the project lead

- None from this task. The four open questions the sanity handoff surfaced (testimonial quote max length, technology groups editability, hand-picked vs auto Home selections, service page section shape) are not blocked by this data layer — the current types cover both directions.

## TODO markers added

None. Every field is projected and typed against the shipped v0.4 schemas.
