# Handoff — orchestrator — Mobile tweaks (hero title, tags)

Date: 2026-09-29 · Branch: `feat/phase4-home-part2` · Status: DONE (awaiting lead review)

## What I did
- `HomeHero.astro`: `@media (max-width: 767px)` → `.c-hero__title { font-size: var(--fs-text-xxl); letter-spacing: -0.08rem; }` (placed after the base rule so it wins). 390: 56.6px → 36px, 4 lines → 3.
- `Tag.astro` (global): `@media (max-width: 767px)` → `.c-tag { font-size: 1.3333rem; }` = 12px. Padding is `em`, so tags grow with it.

## Checks
- [x] build / check / lint pass
- [x] Chrome 390: hero title 36px; all 15 Home tags 12px. 1440 unchanged (88px title, 13.1px tags).
