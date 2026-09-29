# Handoff — orchestrator — Home Technologies (design-only)

Date: 2026-09-28 · Branch: `feat/phase4-home-part2` · Status: DONE (awaiting lead review)

Ref: `docs/refs/home/technologies.jpg`; asset: `docs/refs/technologies-image.svg`.

## What I did
- New section `c-tech` (`src/components/sections/Technologies.astro`) after Our Work: centered `SectionHeader` ("Technologies" eyebrow; title breaks after "tools."; subtitle `max-width: 46rem`, 100% ≤767) + static diagram image, `margin-top: 3rem`, full container width.
- Diagram `<img>`: `width/height` 1680×1107 (no CLS), `loading="lazy"`, descriptive `alt` built from the diagram's visible labels, `data-anim="tech-diagram"` hook for the pending animation.
- Asset optimization (one-off, done with Python/Pillow outside the repo): the source SVG is 20.3 MB because of 29 embedded PNGs (up to 3840 px wide, displayed ≤ 45 px). Each was re-encoded as WebP, longest side 160 px, quality 88; `<image>` width/height attributes, pattern transforms, vectors and outlined text untouched. Output `public/images/home/technologies.svg` = 394 KB (192 KB gzip). Chrome retina render vs original: 0.04% of pixels differ > 24/255 — visually identical.
- `src/pages/index.astro`: `<Technologies />` after `<OurWork />`.

## Files changed
- `src/components/sections/Technologies.astro` (new)
- `public/images/home/technologies.svg` (new, optimized)
- `src/pages/index.astro`
- `docs/DECISIONS.md`, `docs/BUILD_PLAN.md`

## Checks
- [x] `pnpm run build` / `check` / `lint` pass
- [x] Screenshots 1440 + 390. Desktop matches the ref; mobile renders but labels are unreadable (see open questions).

## Open questions for the project lead
- Animation spec (and whether design can deliver the diagram as separate layers).
- Mobile layout for the diagram.

## TODO markers added
- `TODO: DS` — header → content spacing; mobile layout (`Technologies.astro`).
- `TODO: COPY` — none (copy from the ref).
