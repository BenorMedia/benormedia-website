# Handoff — astro — layout-shell (Phase 3)

Date: 2026-09-25 · Branch: `feat/phase3-layout-shell` · Status: DONE

## What I did
Built the full site layout shell in a single flight (astro-only, no ui sub-delegation) per the Phase 3 task brief:

- Added a module-level `siteSettings` cache so Nav/Footer/CtaBanner/ContactModal share a single fetch per build.
- Built a comprehensive `Seo` component with the pageSeo → props → siteSettings fallback chain, title templating (skipped on Home to avoid `Home | BenorMedia | BenorMedia`), OG + Twitter tags, environment-driven robots meta (`PUBLIC_SITE_ENV`), canonical URL from `siteSettings.siteUrl`, and Google site-verification meta.
- Built `Nav` — sticky white bar, logo (static SVG with siteSettings.logo override), 4 primary items with a keyboard-accessible Services dropdown (hover on hover-capable devices, click toggle for touch, Esc closes and restores focus, outside click closes), gradient "Get in Touch" CTA, and a hamburger + off-canvas mobile menu (`≤767`) with body-scroll lock, X/Esc/backdrop close, and link-click auto-close.
- Built `Footer` — 3-column top row (Barcelona card with address overlay, SERVICES + ABOUT columns, partner badges + LinkedIn/X social icons), full-width wordmark, and a right-aligned "Built with Astro. All rights reserved. BenorMedia." credit line. Address pulls from `siteSettings.address` with hardcoded Barcelona fallback. Social URLs resolved from `siteSettings.sameAs` via a small `findSocial(host)` helper; icons are skipped when no matching URL exists.
- Built `CtaBanner` — full-width gradient section, eyebrow + `c-text_xl` heading + optional buttons + optional social-proof pill, decorative vector pinned to bottom with `pointer-events: none` and `aria-hidden`. Component renders nothing when `siteSettings.ctaBanner.title` is missing. Eyebrow gets a scoped on-dark override (see TODO).
- Built `ContactModal` — native `<dialog>` with header/description/form/success sections, wired site-wide via any element carrying `[data-open-contact]` OR class `.js-open-contact` (the `<Button>` UI primitive does not spread arbitrary attributes, so wrapped triggers use the class instead). Focus restoration on close, name-input autofocus on open, backdrop click close, Esc close (native), and a form-submit stub that logs a `TODO: SUBMIT wire endpoint Day 6` and swaps the form for the success message.
- Extended `BaseLayout` — one `getSiteSettingsCached()` call, `Seo` in `<head>`, Organization JSON-LD (built defensively from siteSettings fields, skipped cleanly when fields are missing), and rendered Nav/main/CtaBanner (conditional)/Footer/ContactModal in body. Legacy `noindex` prop alias kept for backward compat with the Phase 1 stub.
- Added `404.astro` — centered eyebrow + `c-text_xl` heading + paragraph + "Back to home" button. Uses `noIndex={true}` and `showCtaBanner={false}`.
- Appended `PUBLIC_SITE_ENV=development` to `.env.example` with an inline comment explaining the noindex behavior.
- Updated `docs/DECISIONS.md` — logged the 5 Locked decisions from the task brief plus 4 Open questions under a new "Phase 3" section.

## Files changed
Created:
- `src/lib/sanity/site.ts`
- `src/components/layout/Seo.astro`
- `src/components/layout/Nav.astro`
- `src/components/layout/Footer.astro`
- `src/components/layout/CtaBanner.astro`
- `src/components/layout/ContactModal.astro`
- `src/pages/404.astro`

Modified:
- `src/layouts/BaseLayout.astro` (extended from Phase 1 stub — kept fonts preload + generator meta + favicon links)
- `docs/DECISIONS.md` (appended Phase 3 Locked rows + Open questions)
- `.env.example` (appended `PUBLIC_SITE_ENV=development`)

Not touched (out of scope): `src/components/ui/*`, `src/styles/*`, `sanity/schemaTypes/*`, `astro.config.mjs`, `src/lib/sanity/{client,queries,types,image}.ts`.

## Checks
- [x] `pnpm run build` passes → **exit 0**
- [x] `pnpm run check` passes → **exit 0** (all 45 Astro files, 0 errors)
- [x] `pnpm run lint` passes → **exit 0**
- [ ] Visual review at 1440 / 991 / 767 / 375 — deferred to Lead + qa (build produces valid HTML; no dedicated mobile design was provided so mobile styles are functional-only, marked `TODO: DS mobile`)

## Keyboard behavior
### Services dropdown (Nav)
- Trigger is a `<button aria-haspopup="true" aria-expanded="…" aria-controls="nav-services-panel">Services</button>`.
- Hover-capable devices: opens on `:hover` + `:focus-within` via CSS (no JS needed).
- Touch / click: toggles `.is-open` and `aria-expanded`; caret rotates via CSS.
- `Escape` closes the panel and returns focus to the trigger.
- Outside click closes.
- Panel items are `<a role="menuitem">`; focus outline comes from the global `:focus-visible` rule.

### Mobile off-canvas menu (Nav)
- Hamburger `<button aria-expanded="…" aria-controls="nav-mobile-panel">`.
- Opens fixed full-viewport panel; `body { overflow: hidden }` locks scroll.
- Close via X button, `Escape`, backdrop click, or any nav link click.
- Nav items are stacked; Services section is always expanded (labelled "Services" + indented sub-list).

### Contact modal (ContactModal)
- Native `<dialog>` — `Escape` closes it (browser default), backdrop click closes it (custom listener).
- Name input receives focus on open (via `requestAnimationFrame` → `.focus()`, plus `autofocus` attribute as fallback).
- Focus returns to the triggering element on close (both explicit close and native Esc close paths are wired).
- Form submit is stubbed: `event.preventDefault()`, logs a `TODO: SUBMIT wire endpoint Day 6` and swaps the form for the success container.

## Assets used
Already in `public/images/` before the task started:
- `Logo.svg` — Nav logo default
- `benormedia-footer.png` — Footer wordmark
- `barcelona.png` — Footer Barcelona card
- `cta-banner-vector.svg` — CTA banner decorative vector

No new assets added.

## TODO markers added
- `TODO: DS mobile` in Nav, Footer, ContactModal, 404 (no dedicated mobile designs provided; built functional with DS tokens).
- `TODO: DS eyebrow on-dark variant` in CtaBanner (scoped override for the on-gradient use).
- `TODO: assets partner-badges` in Footer (placeholder text boxes until real Webflow/Claude partner artwork ships).
- `TODO: SUBMIT wire endpoint Day 6` in ContactModal (form submit stubbed for Phase 3, wired on Day 6).
- `TODO: FONTS Adobe kit <link> pending kit ID` — carried over from Phase 1, still relevant.

## Requests for other agents
- **@ui:** Consider adding an `is-on-dark` eyebrow variant to `src/components/ui/Eyebrow.astro` (or a documented per-instance color override contract). The CTA banner currently uses a scoped `.c-cta :global(.c-eyebrow.is-default)` override to make the default eyebrow readable on the gradient — that is the only place we've needed it, but it will come up again on any dark-background section.
- **@ui:** The `<Button>` primitive does not spread arbitrary HTML attributes onto the underlying `<a>` / `<button>`, so `data-*` attributes cannot be passed through. This came up wiring the contact modal — as a workaround the modal script queries `[data-open-contact], .js-open-contact` and layout components pass `class="js-open-contact"` to `<Button>`. If we want a cleaner contract, add `data-*` to the Props interface (or use `...Astro.props` rest-spread on the underlying element).
- **@sanity:** No schema changes needed for this handoff. When you seed a `siteSettings.ctaBanner`, note the CTA banner renders nothing if `ctaBanner.title` is empty. Same for `siteSettings.contactModal` (contact modal falls back to hardcoded copy but the title/description/successMessage all read from Sanity when present).
- **@qa:** Please review keyboard flows (Services dropdown Esc/focus, mobile menu Esc, contact modal Esc + backdrop + focus restoration) and check that all `[data-open-contact]` / `.js-open-contact` triggers in Nav, Footer, and CtaBanner open the modal.

## Open questions for the project lead
- Confirm final Services route slugs (`/custom-websites`, `/growth`, `/support` used as placeholders).
- Confirm Webflow Partner + Claude Partner Network badge artwork sourcing for Footer (currently text-in-a-box placeholders).
- Confirm `PUBLIC_SITE_ENV=production` will be set only on the production Vercel deployment (previews stay noindex).
- Twitter/X icon uses the X logo; confirm brand preference (X vs. Twitter bird) if you have a preference.

## Notes on data-source-map compliance
Every source in the approved content-source-map is honored:
- Nav logo → static SVG with `siteSettings.logo` override.
- Nav labels + Services dropdown items → hardcoded.
- "Get in Touch" → button with `data-open-contact` (rendered as `.js-open-contact` where wrapped by `<Button>` — see @ui note).
- Footer Barcelona card image → static PNG; address text → `siteSettings.address` with hardcoded fallback.
- Footer link columns → hardcoded.
- Partner badges → placeholder boxes (no assets available yet).
- Footer socials → hardcoded inline SVGs; hrefs from `siteSettings.sameAs` by host match; icon hidden when no match.
- Footer wordmark → static PNG.
- Legal links → hidden.
- Bottom credit → hardcoded "Built with Astro. All rights reserved. BenorMedia." (right-aligned).
- CTA banner content → `siteSettings.ctaBanner` (component hides if title missing).
- CTA banner vector → static SVG, absolutely positioned bottom, `pointer-events: none`, `aria-hidden`.
- CTA banner avatar cluster → empty rounded square placeholder inside the pill.
- Contact modal copy → `siteSettings.contactModal` with hardcoded fallbacks.

No deviations from the plan.
