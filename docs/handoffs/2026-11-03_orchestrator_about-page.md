# Handoff — orchestrator — /about page

Date: 2026-11-03 · Author: orchestrator (Claude Code) · Branch: `feat/about-page` · Status: PARTIAL (built as a draft; content questions open)

## What I did
- Built `/about` from Figma 4145:9660 with the SEO spec's title, meta and JSON-LD (AboutPage, BreadcrumbList, Organization, Person × 7).
- Facts section reuses `Services.astro` (`variant="about"`); Home output unchanged (checked in the built HTML).
- Draft guard: preview/dev builds only, noindex, out of the sitemap; open questions print on the page as markers.

## Files changed
- `src/pages/about/[...about].astro` (new route)
- `src/lib/content/about.ts` (copy, meta, DRAFT, markers)
- `src/components/sections/AboutHero.astro`, `AboutMission.astro`, `AboutHowWeWork.astro`, `AboutTeam.astro` (new)
- `src/components/sections/Services.astro` (`variant="about"`)
- `src/lib/new-pages/jsonld.ts` (`aboutPageJsonLd`), `src/lib/new-pages/loader.ts` (`includeDrafts`)
- `astro.config.mjs` (sitemap filter), `scripts/check-seo.mjs` (`/about`)
- `public/images/about/` (Figma assets as webp; mission tiles; rings and glow SVGs)
- `docs/DECISIONS.md` (## About)

## Checks
- [x] `pnpm run build` passes (production-style build leaves /about out)
- [x] `PAGES_INCLUDE_DRAFTS=1 pnpm run build` + `check-seo`: /about passes except the local canonical, as every page locally
- [x] `pnpm run check`, `pnpm run lint` pass
- [x] Looked at 1440 and 390

## Open questions for the project lead
- See DECISIONS → About → Open questions (partner tier, office photos, hero photos, team photos, numberOfEmployees, mobile, links to /about).

## TODO markers added
- `TODO: DS` — mobile/tablet layouts, stamp font and shadow
- `TODO: ASSET` — team card photos
