# Handoff — orchestrator — CTA banner trusted badge (global)

Date: 2026-09-28 · Branch: `feat/phase4-home-part2` · Status: DONE (awaiting lead review)

Refs: `docs/refs/trusted-badge.png`, `docs/refs/more-badge.png`.

## What I did
- `CtaBanner.astro` (global, every page via BaseLayout): replaced the empty `c-cta__pill` with `.c-cta__badge` below the buttons — lead's box spec in rem, text left (`★ Trusted by +100 companies`, or `siteSettings.ctaBanner.socialProofText`), circles right: 6 client badges + `/images/more-badge.png` (copied from refs).
- Data: `CLIENT_BADGES` query + `getClientBadges()`; `getClientBadgesCached()` in `src/lib/sanity/site.ts` (one fetch per build). `Client` type gained `badge`.
- Rotation: `src/scripts/animations/cta-badges.ts`, initialized from a `<script>` in `BaseLayout`. Every 5s: preload next 6 → fade group out (`is-fading`, `--duration-hover`) → swap `src` → fade in. Shuffled deck, no repeats until every badge has shown; skips while the tab is hidden; off for reduced motion.

## Checks
- [x] build / check (0 hints) / lint pass
- [x] Chrome at 1440 @2x: 34 badges in pool, 7 circles, circle 27.7px (= 1.98rem @14px), all loaded; 4 sets over 15s → 24 distinct badges, no duplicates within or between consecutive sets. Styleguide page renders both of its CTA instances with the badge.

## Open questions
- Badge images are 29×29px (soft on retina); 22 clients have no badge.
- `TODO: DS` — text → circles gap, circle overlap.
- Lead QA: `.c-cta__actions` wraps buttons + badge (column, `width: fit-content`, gap 1.5rem = previous spacing); `.c-cta__buttons` = grid, `grid-auto-flow: column; grid-auto-columns: 1fr`. Measured: actions = buttons row = badge = 388px @1440 / 286px @390; buttons 187 + 187 @1440, 139 + 139 @390.
