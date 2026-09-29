# Handoff — ui — Phase 5 primitives (Work + Pricing)

Date: 2026-09-29 · Author: ui agent · Branch: `feat/phase5-secondary-pages` · Status: DONE (not committed)

## What I did
- `SectionHeader`: new optional `accent` prop (gradient text on a substring of the title). Existing callers are unchanged.
- New `SegmentedControl` (toggle mode for the Work filters, tabs mode for the FAQ tabs, optional corner squares).
- New `src/scripts/ui/tabs.ts` → `initTabs(root)` (WAI-ARIA tabs behavior).
- New `FaqAccordion` (native `<details name>`; works without JS).
- New `PricingCard` (subgrid card, gradient price, gradient check icons, full-width contact button).
- Added all of them to `/dev/styleguide` (section 6) with the ref copy as sample data.
- Logged the Proposed decisions and the open DS questions in `docs/DECISIONS.md` → Global.
- Static only, no animations. `data-anim` hooks are listed below.

## Files changed
- `src/components/ui/SectionHeader.astro` (modified)
- `src/components/ui/SegmentedControl.astro` (new)
- `src/components/ui/FaqAccordion.astro` (new)
- `src/components/ui/PricingCard.astro` (new)
- `src/scripts/ui/tabs.ts` (new)
- `src/pages/dev/styleguide.astro` (section 6 + demo script)
- `docs/DECISIONS.md` (Global: 4 Proposed rows, 6 Design team questions, 4 Needs lead OK lines)

## Component APIs

### SectionHeader (new prop only)
- `accent?: string`: a substring of `title`, wrapped in `<span class="c-section-header__accent">`.
  - Whitespace in `accent` matches any whitespace in `title`, including a `\n` break. Both of these work:
    - `title="Simple and transparent\npricing that meets your needs." accent="that meets your needs."`
    - `title="Where marketing\nambition meets creative." accent="marketing ambition"`
  - Gradient = `--gradient-primary` clipped to the text (same technique as the `is-white` button text). `box-decoration-break: clone` restarts the gradient on each line, which matches the service hero ref.
  - Falls back to `--color-blue` text when `background-clip: text` isn't supported. If nothing matches, the title renders plain.
- The header is still always centered, with no `align` prop.

### SegmentedControl
```ts
items: { label: string; value: string; controls?: string; id?: string }[]
active?: string        // value; defaults to the first item
label: string          // aria-label
mode?: "toggle" | "tabs"   // default "toggle"
squares?: boolean      // corner squares (Work filters); default false
class?: string
```
- **toggle:** `<div class="c-segmented" role="group" aria-label>` containing `<button type="button" class="c-segmented__item c-paragraph [is-active]" aria-pressed data-value>`. **The caller wires clicks**: set `aria-pressed` and toggle `is-active` on every item.
- **tabs:** `<div class="c-segmented" role="tablist" aria-label aria-orientation="horizontal">` containing `<button type="button" role="tab" id aria-selected aria-controls tabindex data-value>`.
  - Each item needs `controls` (its panel id). The tab id defaults to `<controls>-tab`.
  - In dev, a missing `controls` logs a warning.
- Renders nothing when `items` is empty.

### initTabs (`src/scripts/ui/tabs.ts`)
```ts
initTabs(root: HTMLElement): () => void   // returns cleanup
```
- `root` can be the tablist itself or any element that contains one. Panels are found through `aria-controls`.
- Keyboard and state:
  - Click selects a tab. Left/Right move between tabs (wrapping) and Home/End jump to the first/last. Selection follows focus.
  - Roving tabindex: only the selected tab is in the Tab order.
  - Keeps `aria-selected`, `is-active` and each panel's `hidden` in sync.
- On init it hides the non-active panels. If a panel is missing `role="tabpanel"`, `tabindex="0"` or `aria-labelledby`, it adds them.
- It sets `data-tabs-ready` on the tablist.
- Tested in jsdom against the styleguide markup: init, ArrowRight, wrap, End, Home and click all behave correctly.

### FaqAccordion
```ts
items: { question: string; answer: string }[]   // answer = plain text; blank line → new <p>
name: string            // <details name> group, unique per accordion
openFirst?: boolean     // default false (all closed)
class?: string
```
- Markup: `.c-faq` > `details.c-faq__item[name]` > `summary.c-faq__summary`.
  - The summary contains only phrasing content: `span.c-faq__question.c-paragraph_m` plus `span.c-faq__icon[aria-hidden]` (an inline SVG +).
  - The answer is `div.c-faq__answer` holding one or more `p.c-paragraph_m`.
- The + rotates 45° to × on `[open]`. The default marker is hidden.
- The component sets its own width: `max-width: 68.571rem`, centered.
- Renders nothing when `items` is empty.

### PricingCard
```ts
name: string; description: string
price?: string; period?: string     // "€2,000" + "/mo"
priceLabel?: string                 // "Let's chat" (same gradient style, no period); `price` wins if both
features: string[]
ctaLabel?: string                   // default "Get In Touch"
class?: string
```
- Markup:
  - `article.c-pricing-card` > `.c-pricing-card__header` (`h3.__name.c-text_l` + `p.__description.c-paragraph_m`)
  - `p.__price` (`span.__amount.c-text_xxl` gradient + `span.__period.c-paragraph`)
  - `ul.__features[role=list]` > `li.__feature.c-paragraph` (`span.__check[aria-hidden]` + text)
  - `.__cta` > `Button variant="gradient" class="c-pricing-card__button js-open-contact"`
- The check icon is a CSS `--gradient-primary` circle with a white `currentColor` SVG tick, so there are no SVG gradient ids and no duplicate ids.

## New classes
- `c-section-header__accent`
- `c-segmented`, `c-segmented__item`, `is-active`, `is-squared`
- `c-faq`, `c-faq__item`, `c-faq__summary`, `c-faq__question`, `c-faq__icon`, `c-faq__answer`
- `c-pricing-card`, `__header`, `__name`, `__description`, `__price`, `__amount`, `__period`, `__features`, `__feature`, `__check`, `__cta`, `__button`

## data-anim hooks
| Hook | Element | Likely motion |
|---|---|---|
| `section-header-accent` | `.c-section-header__accent` | gradient/text reveal |
| `segmented` | `.c-segmented` root | sliding active pill |
| `faq-item` | `details.c-faq__item` | reveal on scroll |
| `faq-answer` | `.c-faq__answer` | open/close height + icon rotate |
| `pricing-card` | `article.c-pricing-card` | reveal / stagger |
| `pricing-amount` | `.c-pricing-card__amount` | counter |

## Checks
- [x] `pnpm run build` passes
- [x] `pnpm run check` passes (0 errors, 0 warnings, 0 hints)
- [x] `pnpm run lint` passes
- [x] Checked at 1440 / 991 / 767 / 375 in headless Chrome, using fixed-width iframes for 991/767/375. Also checked with scripts stripped: both FAQ panels visible and the `openFirst` item open. With JS: the inactive panel is hidden and the tabs switch.
- Body text renders in the fallback font (the Adobe kit is still pending), so line wraps differ slightly from the refs.

## Requests for other agents
- @astro:
  - **Pricing grid:** put `PricingCard`s **directly** in a grid parent (e.g. `display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.071rem;` for the 15px gap in the ref, then `1fr` at ≤991). The card uses `grid-template-rows: subgrid; grid-row: span 4`, which is what lines up prices and buttons across cards. Outside a grid it still renders, just without cross-card alignment.
  - **Pricing headings:** the plan name is an `<h3>`. The page needs the `<h1>` (hero) and a section `<h2>` (a visually hidden one is fine) above the cards.
  - **FAQ tabs:**
    - Render `SegmentedControl mode="tabs"` with `controls` = each panel's id.
    - Render every panel **visible** in markup (no `hidden`), each with `aria-labelledby="<controls>-tab"` (or let `initTabs` add it).
    - Then call `initTabs(el)` from a page `<script>`.
    - Give each panel's `FaqAccordion` its own `name`.
    - Without JS, all panels show and the tabs do nothing. If you'd rather hide the tablist without JS, style off `[data-tabs-ready]`.
  - **Work filters:** `SegmentedControl` (toggle mode) with `squares`. Your script sets `aria-pressed` and `is-active` and filters the list. Content must stay visible without JS (show all clients by default).
  - **Heroes:** use `SectionHeader` with `accent`, `as="h1"` and the hero `titleClass`. `\n` breaks work inside and around the accent.
  - **Contact modal:** the `ContactModal` binds `.js-open-contact` with `querySelectorAll` at load, so the pricing buttons must be in the initial HTML (they are, when rendered server-side).
  - **Card glow and FAQ background:** the faint lavender glow on pricing cards 1 and 3 is not in the card. If design confirms it's a section background, it goes on the pricing section (asset pending). The same applies to the FAQ line-art background (`faqs-bg.png`, already logged under Pricing).

## Open questions for the project lead
All are logged in DECISIONS.md → Global → Design team / Needs lead OK.
1. **Segmented control:** the active pill is `#F5F5F5` in the ref and isn't a token (using `--color-gray-light` `#F0F0F0`). There's no hover spec. Corner squares appear on the Work filters but not on the FAQ tabs: intended?
2. **FAQ rows:** the ref looks slightly see-through over the line art; built solid white. Is that OK, or add a translucent-white token?
3. **Pricing card:** ref text `#222222` isn't a token (using `--color-black-secondary`). The ref button is 50px tall vs the DS button's ≈56px; the DS button is kept. Do we need a smaller button size?
4. **Pricing glow:** is the lavender glow a section background asset? It isn't built.
5. **Ref px → rem:** these primitives use 1 ref px = 1/14 rem (the ≥1440 root, where the DS type classes match the 1920 refs), like `SectionHeader`. The Our Work cards used 1/16. Which base is right, site-wide?
6. **Mobile:** no mobile refs for any of these (see TODO: DS mobile below).
7. **Needs lead OK:** `SectionHeader` accent, `SegmentedControl` + `initTabs`, `FaqAccordion` on `<details name>`, `PricingCard` subgrid.

## TODO markers added
- `TODO: DS`, `SegmentedControl.astro`:
  - container gap `0.714rem` (10px), padding `0.357rem` (5px), radius `6px`
  - item padding `0.934rem 1.714rem` (48px pill), pill radius `5px`
  - active bg `--color-gray-light` (ref `#F5F5F5`), hover text `--color-black-secondary`
- `TODO: DS`, `FaqAccordion.astro`:
  - row gap `0.75rem`, max-width `68.571rem` (960px)
  - summary padding `1.607rem 2.286rem`, radius `6px`
  - icon `0.857rem` (12px)
  - answer padding `2.643rem 2.286rem 1.857rem`, paragraph gap `1rem`
- `TODO: DS`, `PricingCard.astro`:
  - padding `1.714rem 1.536rem 1.536rem`, radius `6px`
  - text color `--color-black-secondary` (ref `#222222`)
  - amount → period gap `0.357rem`, description → price `2.5rem`, price → features `2.857rem`
  - feature gap `1.143rem`, check icon `1.429rem`, icon → text `0.714rem`, CTA min gap `1.714rem`
  - glow not built
- `TODO: DS mobile`:
  - `SegmentedControl` items wrap and center at ≤767.
  - `FaqAccordion` summary padding `1.607rem 1.714rem`, answer `1.714rem 1.714rem 1.143rem`, icon `1.3333rem` (12px).
  - `PricingCard` padding `2.286rem 2rem 2rem`, price/features margin `2rem`.
- `TODO: COPY`: styleguide sample only (the AEO FAQ tab).
