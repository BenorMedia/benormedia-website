# Handoff — astro — About page (/about)

Date: 2026-10-21 · Author: astro agent · Branch: `feat/phase5-about` · Status: DONE (desktop), with one blocker on the full production-build proof (see "Production guard proof")

## What I did
- Built `/about` from Figma 3790:37097 in desktop layout: hero (`PageHero`) + static photo strip, `LogoStrip`, core values (left-aligned heading, scoped exception), stats, office (divider + Barcelona stamp, 1 + 3 photos), team wall, and leadership (6 × Sergio from `AUTHORS`). The site's CTA banner and footer stay as they are.
- Production guard: `/about` and its photos are not built in production, and the footer "About us" link is not rendered there. Same `isProductionBuild()` check as `/dev/case-study`.
- Placeholder photos are never imported into the Vite graph (see below), so a production build cannot emit them.
- noindex. `/about` is excluded from the sitemap and is in `NOINDEX_PAGES`. It is not in `PAGES`, `LASTMOD` or `llms.txt`.

## Files changed

### 1. Assets
- `src/assets/about/_placeholder/` — 21 WebP placeholders (TODO: ASSET), each pre-cropped to its Figma box at 2x of the 1440 size (capped at the source size):
  - `strip-01…06.webp`
  - `office-01…04.webp`
  - `team-01…11.webp`
- `public/images/about/` — design assets:
  - `values-globe.svg`: Figma export of 3794:41846 as clipped by the section, with the Figma page background, page rect and frame border removed.
  - `value-execution.webp`, `value-curiosity.webp`, `value-humility.webp`, `value-empathy.webp`: 64px, cropped as in Figma.
  - `barcelona-stamp.webp`: 400 × 388.

### 2. Components (`src/components/sections/about/`)
- `content.ts` — all copy (Figma, word for word), the photo manifest and the team-wall layout.
- `AboutSectionHeader.astro` — wraps `SectionHeader` (which is unchanged) with Figma values scoped to stats, office and leadership.
- `AboutGallery.astro`
- `AboutValues.astro`
- `AboutStats.astro`
- `AboutOffice.astro`
- `AboutTeam.astro`
- `AboutLeaders.astro`

### 3. Page + footer + SEO
- `src/pages/about/[...about].astro` — rest route. Its only path is `{ about: undefined }` → `/about`, and it returns `[]` in production.
- `src/pages/about/photos/[file].ts` — static endpoint that reads the placeholders from disk at render time. Returns `[]` in production.
- `src/components/layout/Footer.astro` — "About us" → `/about` is first in `aboutLinks`, added only when `!isProductionBuild()` (absent from the markup in production, not hidden).
- `src/lib/content/seo.ts` — `PAGE_META.about`: "About BenorMedia" (16 chars) plus a neutral 146-char placeholder description (TODO: COPY).
- `astro.config.mjs` — `about` added to the sitemap exclusion regex.
- `scripts/check-seo.mjs` — `'/about'` added to `NOINDEX_PAGES`.
- `docs/DECISIONS.md` — one line under About → Open questions → Design team.
- `docs/handoffs/2026-10-21_astro_about-page.md` (this file).

## Why the photos go through an endpoint
With `adapter: vercel({ imageService: true })`, Astro emits every ESM-imported image into `_astro/` while Vite loads it, even when no page renders it. Its unused-original cleanup (`assets/build/generate.js`) only runs for images transformed at build time, which never happens with the Vercel image service. An `import` of the placeholders would therefore ship them in production even with zero pages.

The placeholders are instead read with `fs` by `src/pages/about/photos/[file].ts`, so they never enter the Vite graph. Its `getStaticPaths` returns `[]` in production, so nothing is emitted. Remove the endpoint and the folder at release.

## Production guard proof
1. **`PUBLIC_SITE_ENV=production pnpm run build`** — it **cannot complete on this branch**. It stops at prerender in the pre-existing case-studies copy guard: "a case study is published, so /case-studies would go live with placeholder copy". `dev` has the same problem (see Requests). The Vite phase did complete first, and that phase is where all bundling and asset emission happen, so its `dist/` is a valid leak test:
   - `dist/client/about` does not exist.
   - SHA-256 of all 554 files in `dist/` and `.vercel/output` compared with the 21 placeholders: **0 matches**.
   - **0 files** named strip-/office-/team- or under `_placeholder`.
2. **Render-level check with `PUBLIC_SITE_ENV=production astro dev`** (real page and footer code):
   - `/about` → 404
   - `/about/photos/strip-01.webp` → 404
   - `/about/photos/team-01.webp` → 404
   - `/pricing` → 200, with 0 `href="/about"` and 0 "About us" in the markup. The footer ABOUT column shows Our Work / Pricing / Contact / (hidden) Testimonials.
3. **Normal `pnpm run build`** (exit 0):
   - `dist/client/about/index.html` exists, with noindex, one `<h1>` "About us", 7 `<h2>` (5 page sections plus the shared CTA banner and contact modal) and 10 `<h3>`.
   - `dist/client/about/photos/` holds 21 files, byte-identical to the sources.
   - The footer has the `href="/about"` "About us" link.
   - `/about` is not in `sitemap-0.xml`.

## Checks
- [x] `pnpm run build` passes (normal). The production-mode build is blocked by the case-studies guard (above).
- [x] `pnpm run check`: 0 errors, 0 warnings, 0 hints (217 files).
- [x] `pnpm run lint` passes.
- [ ] `node scripts/check-seo.mjs dist/client`: **30 FAIL, all environment-dependent and on every page**:
  - 29 × "canonical missing or not on https://www.benormedia.com" (the local canonical is `http://localhost:4321/...`).
  - 1 × robots.txt has no Sitemap line (production-only, needs `PUBLIC_SITE_URL`).
  - The About checks pass: "/about not in sitemap", plus the sitemap, llms.txt and IndexNow checks.
  - `check-seo.mjs dist` (the brief's path) fails a further 3 checks because the output lives in `dist/client`.
  - A pass needs a production build, which the case-studies guard blocks.
- [x] Visual check against the Figma screenshots at 1440 and 1920 (headless Chrome, full page). Structure, order, sizes and assets match.
- [x] No horizontal page overflow (CDP, `scrollWidth == clientWidth`) at 1920, 1440, 991, 767 and 390. At 390 the fallback is sane (stacked).

## Choices the brief didn't decide
- Office photos are full-bleed like Figma. Their heights use Figma aspect ratios (1920:955 and 626.67:740.78) instead of rem, so the crop holds as the width follows the viewport.
- The team wall is a fixed 1392px block (fits in 1440) clipped by the section. Below 991 the text block moves above it.
- Value names use `--fs-text-m` (Figma "Text M"). Headings follow the Figma style names (`c-text_xl`, `c-text_l`) as on the other pages, so the DS scale gap applies as elsewhere.
- The leadership card's LinkedIn link uses `SHARE_LINKEDIN` (same shape as the Figma icon) and the author page's hover/focus. The visually hidden text is "Sergio Gancedo on LinkedIn (opens in a new tab)".
- The stamp label "Barcelona, Spain." is live text (Figma text layer). The stamp image has **no text baked in**.
- Strip alts: 01/02/06 "City photo", 03 "Office photo", 04/05 "Team photo".

## TODO markers
- `TODO: DS`, each Figma value with the token used:
  - `AboutValues.astro`: value name colour #161616 → `--color-black-secondary`.
  - `AboutTeam.astro`: tile #F5F9FE → `color-mix(--color-blue-light 7%, --color-white)`.
  - `AboutOffice.astro`:
    - divider rgba(3,17,28,0.1) → `--color-border`
    - stamp shadow `0 6.24px 24.96px` black 12% → drop-shadow with `--color-heading` 12%
    - stamp label SF Pro 22.714px → `--font-body` + `--fs-p-l`
  - `AboutLeaders.astro`: line-art ring baked into the Figma photo → 1px `--color-blue` circle.
- `TODO: DS mobile (991px, 767px)` — in every About component.
- `TODO: COPY` — the top of `content.ts`, every block in it (hero, values, stats, office, team, leaders), `[...about].astro` (hero and leaders), and `seo.ts` `PAGE_META.about`.
- `TODO: ASSET (replace before release)` — `content.ts` (`PHOTOS`, `ABOUT_GALLERY`, `ABOUT_OFFICE`, `ABOUT_TEAM_WALL`), `photos/[file].ts`, `AboutGallery.astro`, `AboutOffice.astro`, `AboutTeam.astro`.
- `TODO: ANIM` — `AboutGallery.astro` (strip, likely a marquee) and `AboutTeam.astro` (tiles, likely a flip/swap).

## Requests for other agents
- @orchestrator / lead: **production builds of `dev` currently stop** in `guardCaseStudyCopy` (case-studies hero/meta placeholders while a case study is published in Sanity). It is not from this branch, but it blocks any production deploy and the full prod-build proof here.
- @ui / design: export the leadership photo's line-art ring as its own asset.

## Open questions for the project lead
- See DECISIONS → About (copy, photos, leaders, release checklist) and the new "About values with no token" line.
