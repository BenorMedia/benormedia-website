# QA — Phase 5/6 refinements + hero physics (full project)

- **Date:** 2026-09-30
- **Agent:** qa (report written by the orchestrator; qa is read-only)
- **Branch:** `feat/phase6-hero-physics` (includes `dev` + commits 129e070, cd4983e)
- **Verdict:** FAIL, because of one Blocker that dates from Phase 4 (B1). The two latest rounds on their own are PASS WITH NOTES.

## Commands
- `pnpm run build`: passes. 8 pages built, `sitemap-index.xml` created. One Studio-only Vite warning (`react-compiler-runtime`).
- `pnpm run check`: 0 errors, 0 warnings, 0 hints (95 files).
- `pnpm run lint`: passes.
- Bundles: the shared script loaded on every page is 119 KB (46 KB gzip). The `matter` chunk is 84 KB (26 KB gzip) and loads only on Home, through a dynamic import.
- Built HTML: every page has one h1, the heading order is fine, titles are unique, `/dev/styleguide` and `/404` are noindex, and the sitemap excludes `/dev`, `/studio` and `/404`.

## Blocker
- **B1.** `public/images/home/hero-lines-{left,right}.png` are 4.3 MB and 4.5 MB (2640×2644) and load eagerly on Home (`HomeHero.astro`), at about 490px display width. Together that is 8.8 MB above the fold. Fix: WebP (or SVG) at display size ×2, with width/height and low priority. Added in Phase 4 (2026-09-26).

## Should fix
- **S1.** Physics tiles block page scrolling on touch (`touch-action: none` and `preventDefault` on `pointerdown`). Needs a lead decision.
- **S2.** At 768–900px the pile may reach the stacked hero buttons (59 tiles of about 48px). Unverified; check at 768 and 850.
- **S3.** The featured card video restarts in a loop when the pointer rests near the body's bottom edge: the body lifts 3% out from under the pointer, which fires `pointerleave`, then `pointerenter` again. Fix: read hover on a wrapper that doesn't move, as `ClientList` does.
- **S4.** The featured videos are 30.4 MB (Surfe) and 17.9 MB (Puzzle). `preload="metadata"` also sends a request on touch devices, where the video never plays. Fix: re-encode to 2–5 MB; use `preload="none"` until the first hover.
- **S5.** `technologies-mobile.png` is 914 KB. Fix: WebP at about 1125px wide.
- **S6.** Once scrolled, the glass nav's link text (#5B6170) over the blue hero and the CTA banner is about 1.7–2.7:1 contrast. Design call.
- **S7.** The 59 hero icons load eagerly, including on mobile, where only 30 show. Fix: `fetchpriority="low"`.

## Nits
- **N1.** `hero-physics.ts` keeps rendering all tiles every tick after the pile has settled; skip frames when every body is asleep.
- **N2.** Physics resize edge cases: crossing 767px doesn't re-apply the mobile tile cap; the chamfer radius is measured only once.
- **N3.** The nav entry can replay if the module loads after the 3s fallback timeout. Fix: only run it while `is-nav-intro` is still set.
- **N4.** The nav can hide while the Services panel is open by hover. Fix: also check `:hover`.
- **N5.** On a load slower than 5s, the static pile shows and then jumps into the drop. Accepted.
- **N6.** `Stat.astro` is unused (deleting it needs lead OK). `ClientList` `assetSize()` duplicates `assetDimensions()`.
- **N7.** ClientList markup and styles are identical after the `ClientIcon` refactor.
- **N8.** Stale comments in HomeHero, ClientCard, and the `client.websiteVideo` Studio description (still says autoplay).
- **N9.** Docs: the SCHEMAS v0.8 video note still describes on-screen autoplay; `ALL_CLIENTS_WITH_ICON` isn't documented; the "Needs lead OK" items were misplaced in DECISIONS (fixed by the orchestrator 2026-09-30); DESIGN_SYSTEM §10 still lists "2 stats" (editing it needs lead OK).
- **N10.** `registerPlugin(ScrollTrigger)` is called in 3 modules. Harmless.
- **N11.** The nav panel icons are PNGs (about 75 KB, every page). WebP would be about 5 KB each.
- **N12.** The 40% / 28% description widths are narrow at 768–991. Check.
- **N13.** Hardcoded values: all recorded by the lead in DECISIONS.
- **N14.** 116 `TODO: DS` markers in `src`, plus the `TODO: COPY` list.

## Verified OK
Nav: the inert/focus logic is correct with the panel outside `<header>`, and the dropdown handles Esc, focus-out and outside click. The physics layer is `aria-hidden` with nothing focusable; reduced motion and no-JS both fall back to a static row; pointer capture and cancel are handled; there are no leaks. GSAP animates only transform/opacity and every animation is reduced-motion gated. The LogoStrip intrinsic sizes and margin loop are in place. The ContactModal testimonial images are lazy until the dialog opens. Queries and types match SCHEMAS v0.8.

## Launch blockers still open
Forms endpoint (CEO); production domain / `PUBLIC_SITE_URL`; no `robots.txt`; empty Webflow redirect map; missing `siteSettings` and page singletons (G-32); Adobe Fonts kit ID; dead links (`/growth`, `/ongoing-website-support`, `/blog`, legal pages, socials); `/dev/styleguide` still public; placeholder content and FAQ JSON-LD (P-3); contrast S6.
