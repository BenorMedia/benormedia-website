# Handoff — astro — QA fixes S3, S4, S5, S10 (Nav + Services)

Date: 2026-09-29 · Author: astro · Branch: `feat/phase4-home-part2` · Status: DONE (not committed)

## What I did
- **S3 — Services card markup.** Each card is now `div.c-services__item` (carrying `is-active`, `data-index`, `data-image`) containing `h3.c-services__heading > button.c-services__trigger[aria-pressed]` (title + arrow) and the body `<p>` outside the button. The button is stretched over the card with `::after { position: absolute; inset: 0 }` on a `position: relative` wrapper, so the whole card stays clickable. The blue border and approved shadow stay on `.c-services__item.is-active`. The focus ring moved to the wrapper via `.c-services__item:has(.c-services__trigger:focus-visible)` (same 2px `--color-accent`, 2px offset), and the button's own outline is suppressed. Button UA styles are reset (padding, border, background). The script now toggles `is-active` on the wrapper and `aria-pressed` on the button. The first card is still active in the server-rendered HTML.
- **S10.** `.c-services__trigger-label` now uses `font-size: var(--fs-text-m)` instead of `1.8rem`.
- **S4 — Services dropdown.** Removed `:focus-within` from the `(hover: hover)` open and caret rules; hover-to-open is unchanged. Added a `focusout` listener on the dropdown `li`: when focus moves outside it, `is-open` is removed and `aria-expanded` is set to `false`. Esc (existing handler) now closes the panel visibly and returns focus to the trigger.
- **S5 — Mobile menu.**
  - The panel has `role="dialog" aria-modal="true" aria-label="Menu"`.
  - On open: focus moves to the close button. `inert` is set on every `body` child except the nav `header` (main, CTA section, footer, ContactModal dialog), plus on `.c-nav__inner` (the logo and burger bar behind the panel). Only elements this code made inert are restored.
  - On close (X, Esc, backdrop, link): `inert` is removed and focus goes to the burger.
  - Menu "Get in Touch": a capture-phase click listener on the panel closes the menu before ContactModal's own listener runs, so the page is no longer inert and the scroll lock is re-applied by the modal. Because the burger is focused before `showModal()`, the dialog returns focus to it on close. There is also a fallback: on the modal's `close` event, if focus was lost or is on a hidden element, it goes to the burger.
  - The menu also closes when the viewport grows to 768px or wider (the CSS hides the panel there), so the page is never left inert.
  - The existing body-scroll lock and fade animation are unchanged. The header doc comment is updated.

## Files changed
- `src/components/sections/Services.astro`: markup L79-97, CSS L165-243 (wrapper `position: relative`, `:has()` focus ring, trigger reset, `::after`, `--fs-text-m`), script L310-337.
- `src/components/layout/Nav.astro`: doc comment L9-17, panel attributes L110-117, `focusout` L186-192, mobile focus management L207-305, hover-only CSS open rule L422-433.

## Checks
- [x] `pnpm run build` passes (only the existing studio "use no memo" Vite warning).
- [x] `pnpm run check`: 0 errors, 0 warnings, 0 hints.
- [x] `pnpm run lint` passes.
- [x] Before/after screenshots of Services at 1440 / 991 / 767 / 375: the structure, borders, active state, arrow rotation/gradient and spacing are identical. The only difference is the S10 title size (see below).
- [x] Keyboard test in headless Chrome over CDP against the static build: 25/25 pass.
  - **S3:** no block elements inside a button. Tab reaches each card. Enter and Space activate cards 2, 3 and 1. `is-active`, `aria-pressed` and the image `src` update. The AX names are exactly "Web Design", "Web Development", "Web Growth (SEO + GEO + CRO)" with the pressed state. Clicking the body text activates the card. The focus ring renders on the wrapper.
  - **S4:** Enter opens the dropdown. Esc gives `visibility: hidden`, `opacity: 0`, `aria-expanded="false"` and focus on the trigger. Tabbing past the 3rd link lands on "Work" with the dropdown closed and `aria-expanded="false"`. Esc from inside a link closes it. Hover still opens it, and moving off closes it. The desktop nav CTA modal still restores focus to the CTA.
  - **S5 (375):** the burger opens the menu and focus lands on the close button. `main`, the CTA section, `footer` and `.c-nav__inner` are inert. Over 14 Tabs focus cycles only inside the panel (plus the browser's own UI stop). Esc and X close the menu, un-inert the page and focus the burger. The menu's "Get in Touch" closes the menu and opens the modal with focus on Name and scroll locked. Esc on the modal closes it and focus lands on the visible burger.

## Requests for other agents
- @sanity: none
- @astro: none
- @ui: none

## Open questions for the project lead
- S10 makes Services card titles larger on mobile, as the DS requires: 16.2px becomes 22.5px at 767 and 375. At 375, "Web Growth (SEO + GEO + CRO)" now wraps to two lines and the cards grow from 106px to 128px tall. Desktop goes from 25.2px to 25.9px (1.8rem to 1.85rem) with no layout change. Please confirm this matches Figma mobile.

## Notes / pre-existing, not changed
- Mobile menu "backdrop click" can't really trigger: `.c-nav__mobile-inner` has `min-height: 100%`, so no click ever lands on the panel element itself. The handler is kept as-is. The X, Esc and link closes all work.

## TODO markers added
- `TODO: DS`: none
- `TODO: COPY`: none
