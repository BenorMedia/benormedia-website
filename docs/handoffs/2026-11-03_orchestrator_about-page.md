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

## Update (same day)
- Team cards use the lead's card photos (`public/images/about/team/`), in the order of the lead's team screenshot; the `[PERSON]` marker is gone.
- Footer Webflow badge replaced with the lead's "Premium Partner" badge (`public/images/webflow-premium-partner.png`).
- Animations: the lead says they are described in Figma comments. Comments can't be read through the Figma connector or the Plugin API (no annotations, no motion data, no canvas notes next to the frame). Waiting for the comment text.

## Update 2 (same day)
- Motion from the lead's Figma comments: hero photo columns loop (left up, right down), Mission tiles orbit like the /work hero, facts cards get Home's Services hover/in-view states, team cards get ClientCard's hover.
- Stamp and facts badge replaced with the lead's full exports.
- "Webflow Premium Partner" everywhere (copy, meta, llms.txt, rules, checker).
- "About us" link in the footer ABOUT column and the Resources menu (only where /about is built); Resources menu rebuilt per the lead's screenshot.
- Checked with real hovers in headless Chrome (DevTools protocol) at 1440, and at 390 (no horizontal overflow).
