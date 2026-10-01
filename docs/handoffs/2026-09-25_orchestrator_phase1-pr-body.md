# PR body — copy into GitHub UI

**Title:** `Phase 1 design system: global CSS + primitives + /dev/styleguide`
**Base:** `dev` ← **Compare:** `feat/phase1-design-system`
**Open at:** https://github.com/BenorMedia/benormedia-website/pull/new/feat/phase1-design-system

---

## Summary

Ships Phase 1 of `docs/BUILD_PLAN.md` in full: global CSS foundation, `BaseLayout`, UI primitives, and the internal styleguide. Everything sourced from `docs/DESIGN_SYSTEM.md` and cross-checked against `docs/refs/Home.png` + `docs/refs/eyebrow-preview.png`.

- **Global CSS** in `src/styles/`: `tokens.css` (colors, font families, motion, fluid type-scale), `base.css` (modern reset + fluid root per §1 + `prefers-reduced-motion` guard), `typography.css` (every `c-text_*` / `c-paragraph_*` / `c-button` class), `buttons.css` (4 variants incl. masked gradient border + glass w/ backdrop-filter), `utilities.css` (minimal — `.c-container`, `.cc-hidden`, margin helpers actually in use).
- **`BaseLayout.astro`** — Brulia preload + `@font-face`; Acumin `<link>` deferred to a `TODO: FONTS` comment until Adobe kit ID lands; `noindex` prop; canonical from `Astro.url`.
- **Primitives** in `src/components/ui/`:
  - **`Button`** — 4 variants (`gradient`, `gradient-outline`, `white`, `glass`); renders `<a>` when `href` is set, `<button>` otherwise; always emits `.c-button__text` inner span for gradient-clipped text.
  - **`Eyebrow`** — 2 variants (`is-default` with two decorative pseudo-element squares, `is-accent` with `--color-accent` border + 8% tint bg via `color-mix`). Locked spec in `DESIGN_SYSTEM.md` §3.3.
  - **`Tag`**, **`Container`** — placeholders with `TODO: DS` markers pending final specs.
- **`/dev/styleguide`** (noindex) — every color, every text class at real size, all button variants on white AND dark-gradient backgrounds (verifies `is-glass`), both eyebrow variants, tag, container.

## Verification

| Check | Result |
|---|---|
| `pnpm run build` | 3 pages built (`/`, `/dev/styleguide`, `/studio`) |
| `pnpm run check` | 0 errors / 0 warnings / 0 hints (13 files) |
| `pnpm run lint` | 0 errors |
| Visual `/dev/styleguide` at 1440 / 991 / 767 / 375 | Reviewed and approved by project lead |
| QA review | PASS WITH NOTES → `prefers-reduced-motion` guard added; nice-to-haves logged |

## Rules honored

- No shadows anywhere.
- No hardcoded colors or font sizes in components — all via `var(--token)`.
- `rem` throughout; `em` only for tag-like internal padding (`.c-button`, `.c-eyebrow`); `px` only for borders / radius / blur / media queries.
- Class naming: `c-`, `c-x__y`, `is-`, `cc-_` conventions followed.
- No touch to `main`; branched from `dev`.

## Docs updated

- `docs/DESIGN_SYSTEM.md` §3.3 — locked Eyebrow spec (two variants, padding `0.5em 1.05em`, squares vertically self-centered).
- `docs/DECISIONS.md` — Phase 1 open questions appended (Acumin kit ID, Tag specs, section vertical spacing, text color on dark bg, `/dev/*` sitemap exclusion). Locked table untouched.
- `docs/handoffs/2026-09-25_ui_design-system.md` — ui subagent handoff.

## Follow-ups (not in this PR)

- **@astro (Phase 2):** migrate `src/pages/index.astro` to `BaseLayout`; add sitemap integration excluding `/dev/*`.
- **@ui (later):** wire real Acumin `<link>` once kit ID lands; finalize Tag specs; nice-to-have `--color-white-10` token; discriminated union on `Button` props.
- **@lead:** answer the 5 remaining open questions in `DECISIONS.md`.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
