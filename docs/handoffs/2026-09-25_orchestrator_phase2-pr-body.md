# PR body — copy into GitHub UI

**Title:** `Phase 2 Sanity: schemas v0.5 + client layer + 22-category seed`
**Base:** `dev` ← **Compare:** `feat/phase2-sanity`
**Open at:** https://github.com/BenorMedia/benormedia-website/pull/new/feat/phase2-sanity

---

## Summary

Ships Phase 2 of `docs/BUILD_PLAN.md` in full: Sanity schemas, desk structure, singleton hardening, category seed, and the typed Astro client layer for Home + siteSettings.

Schemas landed as **v0.5** after mid-review Lead feedback pivoted the contract away from a content-in-CMS model to an **SEO-only page singleton** model with page copy authored in Astro components. See `docs/SCHEMAS.md` §"v0.5 changes vs v0.4" and the four new locked entries in `docs/DECISIONS.md`.

## Schemas (v0.5)

**Documents (5):** `client`, `testimonial`, `post` (Portable Text + `@sanity/table`), `author`, `category`. `service` and `technology` were dropped mid-review.

**Objects (8):** `seo`, `link`, `button` (variant enum mirrors `Button.astro`), `sectionHeader`, `stat`, `kpi`, `faq`, `faqSection`.

**Singletons (6):** `siteSettings` with four tabs (General / SEO & Meta / Organization / Global sections), plus five page singletons (`homePage`, `workPage`, `pricingPage`, `testimonialsPage`, `blogPage`) that each hold **only** an `seo` object.

**Desk structure** — singletons at the top, then a divider, then the five documents:
```
Site Settings → Home Page → Work Page → Pricing Page → Testimonials Page → Blog Page
── divider ──
Clients → Testimonials → Blog (posts) → Authors → Categories
```

**Singleton hardening** — `document.actions` strips `duplicate`/`delete`; `newDocumentOptions` hides singletons from the global "+ New" menu.

**Validations** — `service` reserved-slug list removed with the doc; `post.slug` unique; `category.title` unique; `testimonial.kpis` max 2; `faqSection.faqs` min 1; SEO field length warnings; every image field has `alt` (hard-required on `cardThumbnail`, `websiteScreenshot`, `post.thumbnail`); `client.logo` required; `button.variant` locked to `gradient | gradient-outline | white | glass`.

## Seed

`scripts/seed-categories.mjs` — self-contained Node ESM using `@sanity/client` + `createOrReplace` with deterministic `_id = category-<slug>` (idempotent). Reads `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, `SANITY_WRITE_TOKEN` from `process.env` — fails clearly if missing. Runs via `pnpm seed:categories`.

The 22 canonical categories from SCHEMAS.md: Fintech, SaaS, HR Tech, Cleantech, Venture Capital, E-Commerce, Marketing, Recruiting, Consumer, Design Studio, AI & Technology, SaaS / B2B Tech, Sales Tech, Cybersecurity, Marketing Tech, Professional Services, Agency, Nonprofit, Hospitality, Energy, Media & Entertainment, Education.

## Astro client layer — `src/lib/sanity/`

- **`client.ts`** — re-exports `sanityClient` from the `sanity:client` virtual module (`@sanity/astro`), so project ID / dataset / apiVersion have a single source of truth.
- **`image.ts`** — named `createImageUrlBuilder` (not the deprecated default); exports `urlFor` + `Source` type.
- **`queries.ts`** — `HOME_QUERY` returns `{ _id, _type, seo }`; `SITE_SETTINGS_QUERY` projects General + SEO & Meta + Organization + Global sections; fully dereferenced. Other pages land later phases.
- **`types.ts`** — hand-written, `strictest`-safe (no `any`, no non-null assertions).

## Verification

| Check | Result |
|---|---|
| `pnpm run build` | 3 pages built |
| `pnpm run check` | 0 errors / 0 warnings / 0 hints (38 files) |
| `pnpm run lint` | 0 errors |
| QA review | PASS WITH NOTES → all three Should-fix items applied inline (`twitterHandle` group, `post.slug` uniqueness, `client.logo` required) |
| Studio boots at `/studio` | Verified by project lead; desk order + singleton controls confirmed |
| Stale `service` reference in `post.body` internalLink annotation | Caught after Studio boot ("Unknown type: service"), fixed |

## Docs

- `docs/SCHEMAS.md` — bumped to **v0.5** with a changelog block; removed `service`/`technology`; rewrote Singletons + Site Settings tabs; simplified "Tabs on routable documents".
- `docs/DECISIONS.md` — seven new locked entries (v0.4 approval, PT + `@sanity/table`, siteSettings tabs, staging noindex via env, v0.5 SEO-only pivot, removed `service`/`technology`, removed Navigation/Footer tabs).
- `docs/handoffs/2026-09-25_sanity_schemas.md` and `_astro_home-queries.md` — describe what the two subagent runs shipped **before** the v0.5 pivot. Kept as historical record; the code + `SCHEMAS.md` + `DECISIONS.md` reflect the final v0.5 state.

## Follow-ups (not in this PR)

- **Lead** — add `SANITY_WRITE_TOKEN` to `.env` (locally) and Vercel, then run `pnpm seed:categories` → confirm 22 categories in Studio.
- **Lead + sanity** — wire the Sanity → Vercel publish webhook (BUILD_PLAN Day 2 last row, deferred). Steps documented in `docs/handoffs/2026-09-25_sanity_schemas.md`.
- **Lead** — populate `homePage.seo` + `siteSettings` in Studio, then smoke-test `getHome()` / `getSiteSettings()` from a temp Astro page to close the live-dataset verification gap.
- **@astro (Phase 3)** — `BaseLayout` reads `siteSettings.titleTemplate` + `defaultMetaTitle`/`defaultMetaDescription`/`defaultOgImage` as fallbacks; page-level `seo` overrides.
- **@lead** — answer remaining open questions in `SCHEMAS.md` §"Open questions" (testimonial quote max length; category uniqueness on title vs slug).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
