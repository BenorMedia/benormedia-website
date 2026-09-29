# Handoff — qa — Phase 5 checkpoint 1: Work page + shared primitives

Date: 2026-09-29 · Author: qa (subagent) · Branch: `feat/phase5-secondary-pages` (uncommitted working tree vs `dev`) · Status: DONE — **PASS WITH NOTES** (0 blockers · 4 should-fix · 12 nits)

## What I did
Read-only review of `/work` and the new shared primitives: SectionHeader `accent`, SegmentedControl, `initTabs` (`src/scripts/ui/tabs.ts`), FaqAccordion, PricingCard, PageHero, WorkListing, and the ClientList change (`data-category` plus the hidden-row overlap rule).
- Re-ran the gates.
- Rendered the built site (`dist/`, served by a throwaway static server) in headless Chrome over CDP at 1920, 1440, 991, 767 and 375, and compared it to `docs/refs/work/*` and `docs/refs/pricing/{FAQs,pricing-cards}.jpg`.
- Exercised filters, keyboard, the AX tree, no-JS, reduced motion, the tabs, the accordion and Home regression.
- Ran Lighthouse mobile on `/work` and `/`.
- No source files edited. Temp files and servers were removed.

## Files changed
- None. New file: this handoff.

## Checks
- [x] `pnpm run build` passes: 5 pages (`/404`, `/dev/styleguide`, `/studio`, `/work`, `/`). The only warning is the known `react-compiler-runtime` "use no memo" Vite warning from the Studio bundle.
- [x] `pnpm run check` passes: 68 files, 0 errors / 0 warnings / 0 hints.
- [x] `pnpm run lint` passes (no output).
- [x] Checked at 1440 / 991 / 767 / 375, plus 1920 for a 1:1 comparison with the refs.

### Per viewport (`/work`)
| Check | 1440 | 991 | 767 | 375 |
|---|---|---|---|---|
| Horizontal scroll (`scrollWidth > clientWidth`) | none | none | none | none |
| Elements overflowing the viewport (unclipped) | 0 | 0 | 0 | 0 |
| Console errors / exceptions | 0 | 0 | 0 | 0 |
| Filter bar | 1 row, 567×60 | 1 row, 486×52 | 1 row, 429×43 | wraps to 2 rows, 339×85, centered, squares inside viewport |
| Rows / first-row margin / overlap | 56 / 0 / −12.25px | 56 / 0 / −10.5px | 56 / 0 / −7.875px | 56 / 0 / −7.875px |
| Heading outline | h1 → h2 "All projects" (sr-only) → h2 Testimonials → h2 CTA (+ h2 inside the closed contact dialog) | same | same | same |

### Visual fidelity
- **Hero vs `work-hero.jpg`, at 1920.**
  - Nav → eyebrow is 110px, the same as the ref.
  - Description → filters is 116px, the same as the ref.
  - Title is 77px (`c-text_xxl`) against ≈91px in the ref, and the description is 18.2px against ≈24px. Both are already logged in Work → Design team "Hero type sizes".
  - Body text uses the fallback font (Adobe kit pending), so wraps differ slightly.
- **List vs `work-list.jpg`.**
  - Filter box is 567×60 at 1920 against 590×60 in the ref. Filters → first row is 56px, matching.
  - List width at 1440 is 72.5% of the viewport against 73% in the ref.
  - At 1920 the list is narrower than the ref (1046 vs 1400px). That comes from the DS `.c-container` 1440px cap and applies site-wide. It is not a Work issue.
  - No "$XXM RAISED" tags render, because `fundsRaised` is empty in the data (known content gap). The list order differs from the ref (known open question).
  - List → Testimonials eyebrow is 168px against ≈221px in `work-preview.png`. See N11.
- **Mobile (991 / 767 / 375).** Layout is sane. The hero scales down to the DS mobile h1 (36px). Rows use the existing ClientList mobile layout (tags on a second line). At 375 the filter wraps cleanly into 2 centered rows.
- **Styleguide §6.**
  - FaqAccordion vs `FAQs.jpg`: rows, the + → × icon, and the unbordered gray answer under its row all match.
  - SegmentedControl in tabs mode matches the FAQ tab switcher.
  - PricingCard vs `pricing-cards.jpg`: structure, gradient price, gradient checks and full-width button match. Subgrid alignment holds: price, features and CTA share the same `top` across all 3 cards. Details for the Pricing checkpoint are in N7.
  - At 375 all three stack cleanly with no overflow.

### Behaviour and accessibility (`/work`)
- **Filters.**
  - Click results: Professional Services 6/56, SaaS / B2B Tech 12/56 (`saas` + `saas-b2b-tech`), Agency 2/56, View All 56/56.
  - `aria-pressed` and `is-active` are correct on every item after every change.
  - The first visible row always has `margin-top: 0`. Hidden rows are `display: none`.
- **Keyboard.** Tab reaches "View All" and then each filter in turn. Space and Enter activate them. The focus ring is a visible 2px `--color-accent` outline with a 2px offset. Focus stays on the pressed button after filtering.
- **Live region.** The `role="status"` text updates to "Showing N of 56 projects" on each click and is empty on load, so nothing is announced at load.
- **AX tree.**
  - The group is named "Filter projects by industry".
  - The 4 buttons expose `pressed` state.
  - With Agency active, 0 of the 54 hidden client names appear in the AX tree, so hidden rows really leave it.
- **Stub test** (in the browser, throwaway). I removed `data-category` from the `saas` row. That row is hidden under SaaS / B2B Tech ("Showing 11 of 56") and shown again under View All.
- **No-JS** (scripts disabled, 1440 and 375). The filter bar is `display: none`, all 56 rows are visible, the list margin is 0, and there are no dead buttons.
- **Reduced motion.** Marquee `animation-name: none`. The ClientList arrow and preview transitions collapse to 1e-05s (global rule). Filter swaps have no motion.
- **Contrast.**
  - New elements pass: segmented inactive `#5B6170` on white is 6.2:1, active `#212427` on `#F0F0F0` is 13.7:1, FAQ question is 18.1:1, FAQ answer is 6.2:1, and the FAQ icon and focus ring are 4.98:1.
  - Gradient text on white fails; see S3. The active pill vs white is 1.14:1; see Q2.
- **Home regression (`/`).**
  - 9 rows, margins `0, −12.25px ×8` (1440) and `0, −7.875px ×8` (375). No `[hidden]` rows.
  - Hover preview opens (217px, opacity 1).
  - All 5 SectionHeader titles render as before (same `<br>` output, 0 accent spans).
  - The only DOM change on Home is the new `data-category` attribute on each `<li>`. The overlap selector change is specificity-safe: no other rule sets `margin-top` on `.c-client-list__item`.

### Tabs (`initTabs`, styleguide §6)
- **Init.**
  - Tab 1 has `aria-selected=true` and `tabindex=0`. Tab 2 has `aria-selected=false` and `tabindex=-1`.
  - Panels get `role=tabpanel` and `aria-labelledby=<id>-tab`. The inactive panel gets `hidden`.
  - `data-tabs-ready` is set.
- **Keys and click.** ArrowRight, wrap-around, End, Home and ArrowLeft all move focus and selection and keep the panels in sync. Click also works.
- **AX tree.** Tabs expose `selected`, and the visible tabpanel is named by its tab.

### FAQ accordion
- The summary holds only phrasing content: 2 `<span>`s plus an inline SVG. The icon is `aria-hidden`.
- Enter opens an item and the icon rotates 45°.
- `details[name]` is exclusive: opening item 3 closes item 1.
- The focus ring is visible on the summary.

### Valid HTML
- Only phrasing content inside new `<button>` / `<summary>` elements. PricingCard's CTA is a `<button type="button">` with text only.
- No `menu` / `menuitem` roles in new code. The single `role="menu"` in `/work` HTML comes from Nav (carry-over N9).
- No new `<img>`. Pre-existing offenders are listed under carry-over.

### SEO (`/work`, built locally)
- Title: `Our Work | BenorMedia`, which is unique.
- Meta description: the hero text, 196 characters (N10).
- `og:title`, `og:description`, `og:type`, `og:site_name`, `twitter:card`, `twitter:title` and `twitter:description` are present.
- Robots: `noindex, nofollow`, correct for a non-production build.
- `<h1>` count: 1.
- Canonical and `og:url` are `http://localhost:4321/work/`. The local `.env` provides `PUBLIC_SITE_URL`; on Vercel they are omitted by design (Global Decision 2026-09-29). The path form still disagrees with the rest of the site; see S1.
- `og:image` and Organization JSON-LD are absent (no `siteSettings`; carry-over N7).

### Lighthouse mobile (local static server: no gzip, no cache headers, so treat the numbers as indicative)
| Page | Perf | A11y | Best practices | SEO |
|---|---|---|---|---|
| `/work` | 76 | 92 | 100 | 66 (only `is-crawlable` = expected noindex) |
| `/` (reference) | 74 | 91 | n/a | n/a |

- `/work` has CLS 0 and TBT 0 ms. LCP is 6.8 s, and the LCP element is the hero description.
- Most of the LCP render delay comes from eager shell images that are not in the Phase 5 scope (see carry-over): `barcelona.png` 526 KB, `benormedia-footer.png` 195 KB, `testimonials-bg.svg` 181 KB, `claude-partner.png` 125 KB.
- Removing the 55 hover-preview `<img>` from a throwaway copy cut transfer from 2.14 MB to 1.31 MB but left LCP unchanged. S4 is therefore a byte and data-cost issue, not the LCP driver.
- A11y failures are all carry-over: accent tag 4.48:1 (N10 from Phase 4) and footer social link targets 16.9px.

### Empty / partial data (code reading + one DOM stub)
| Case | Result |
|---|---|
| 0 clients | `WorkListing` renders nothing (`WorkListing.astro:72`). Script no-ops. Hero → Testimonials spacing comes from the Testimonials container. |
| Client without category | No `data-category` attribute (Astro drops `undefined`). Never matched by a tab, shown in View All (verified with the stub). |
| Tab with 0 matches | Dropped at build (`WorkListing.astro:55-60`). If only View All is left, there is no filter bar, and the list margin rule doesn't match, so there is no extra gap. |
| 0 testimonials | Section is not rendered (`Testimonials.astro:21`, the Phase 4 S8 fix). |
| `workPage` null / `seo` null | `workPage?.seo ?? null`, so the "Our Work" + hero description props apply (verified in the build, since the document doesn't exist). |
| 0 clients **and** 0 testimonials | PageHero (no bottom padding) sits flush on the CtaBanner (no top padding). N9. |

### Hardcoded values / naming
- **Hex / rgb.** None in the new CSS. The only hits are inside `TODO: DS` comments (`PricingCard.astro:106`, `SegmentedControl.astro:131`) and the approved ClientList preview shadow (`ClientList.astro:302`).
- **px.** Only on borders, radius, outline and media queries. Also the corner-square offsets `-1px` (border alignment, `SegmentedControl.astro:155-161`) and the sr-only `1px` clip pattern (`WorkListing.astro:205-207`, standard, moves to `cc-sr-only`).
- **em.** No hits in the new files.
- **Shadows.** None new.
- **Font sizes.** All come from type classes. None are hardcoded.
- **`TODO: DS` markers.**
  - Every measured value carries one and is logged in DECISIONS (Global: Segmented / FAQ / Pricing specs; Work: spacing, type).
  - Exceptions without a marker are N6.
- **Naming.** Only `c-`, `c-x__y`, `is-` and `data-` names. No camelCase and no BEM `--`.

## Blockers (must fix before merge to dev)
None.

## Should-fix
1. **S1: Canonical and `og:url` use a trailing slash; every internal link and `SITEMAP.md` don't.** `src/components/layout/Seo.astro:61-67` builds the canonical from `Astro.url.pathname`, which is `/work/` in a `directory`-format build. `Nav.astro`, `Footer.astro` and SITEMAP all use `/work`. `astro.config.mjs` sets no `trailingSlash`, and there is no `vercel.json`, so both forms will serve and the canonical points at the one we never link to.
   - Fix: set `trailingSlash: "never"` in `astro.config.mjs`. The Vercel adapter then redirects `/work/` to `/work`. Confirm in the build that `Astro.url.pathname` becomes `/work`.
   - Alternatively, strip the trailing slash in Seo for any path other than `/`.
   - Needed before the Phase 7 sitemap and redirects, and on every new page from now on.
2. **S2: Tabs mode leaves dead tabs without JS.** `src/components/ui/SegmentedControl.astro:70-82` and `src/scripts/ui/tabs.ts`.
   - Without JS the FAQ tablist still renders `role="tab"` buttons that do nothing. The inactive tab also has `tabindex="-1"` in the markup.
   - That breaks the "no dead filter buttons" rule that WorkListing follows.
   - Not visible on `/work`, but it must be fixed before Pricing uses it.
   - Fix: build the WorkListing pattern into tabs mode. Render the tablist `hidden` and have `initTabs` remove `hidden` after wiring, or have the caller wrap it the same way.
   - Without JS, the panels (already all visible) need a visible or sr-only heading each, so the two FAQ groups stay distinguishable.
3. **S3: Gradient text on white fails large-text contrast.**
   - Affected: `SectionHeader.astro:130-143` (`.c-section-header__accent`) and `PricingCard.astro:123-134` (`.c-pricing-card__amount`).
   - The `--gradient-primary` end `#6BB0F7` on white is 2.29:1; large text needs 3:1. The start `#6275F6` is 3.89:1 and passes.
   - It will affect the Pricing hero ("that meets your needs."), the service hero and every price.
   - The lead deferred S6 for text *on* gradient surfaces; this is the reverse case, gradient text on white.
   - Fix: a design decision. Log it next to the S6 entry in DECISIONS → Global → Lead / CEO. If design agrees, use a darker end stop for text only (for example `--gradient-text`) and add it to tokens once the lead approves.
4. **S4: 55 hover-preview screenshots download with the page.** `src/components/ui/ClientList.astro:127-138`. The previews are `loading="lazy"`, but they sit in the layout inside a 0-height box, so Chrome's lazy-load margin loads them anyway.
   - At 1440, 19 of 55 were already loaded at first paint. On Lighthouse mobile they account for ≈830 KB of the 2.14 MB transfer.
   - Touch devices can't hover, so the bytes are wasted there. Home has 9 rows, so the problem only becomes significant on `/work`.
   - Fix: render `data-src` and set `src` on the row's first `pointerenter` / `focusin`, gated by `matchMedia("(hover: hover)")` for the pointer path. This keeps the lead-approved hover behaviour (Global Decision 2026-09-28) and only changes when the image loads.
   - Keep `width` / `height` as they are.

## Nits
1. **N1: DECISIONS table is broken.** `docs/DECISIONS.md:249-250`: the first Work Decisions row contains a raw line break (the title "Websites / we've launched." was written with a real newline), which breaks the Markdown table. Write it as a backticked `\n` per "How this file works".
2. **N2: A TODO comment ships in the production HTML.** `src/pages/work.astro:27`: the HTML comment renders before `<html>` (`<!DOCTYPE html><!-- TODO: COPY — … --><html lang="en">`). Move it into the frontmatter or use `{/* … */}` inside the template.
3. **N3: Panels become an extra Tab stop.** `src/scripts/ui/tabs.ts:38`: every panel gets `tabindex=0`, even when it already contains focusable content (the FAQ summaries). Per the APG, only add it when the panel has no focusable descendant: `if (!panel.hasAttribute("tabindex") && !panel.querySelector("a,button,summary,input,select,textarea,[tabindex]")) panel.tabIndex = 0;`.
4. **N4: Modified arrow keys are swallowed.** `src/scripts/ui/tabs.ts:65-89`: the keydown handler ignores modifiers, so Alt+ArrowLeft (browser Back) and Ctrl/Cmd+Home on a focused tab get `preventDefault()`. Add `if (event.altKey || event.ctrlKey || event.metaKey) return;`.
5. **N5: The accent regex can match inside a word.** `src/components/ui/SectionHeader.astro:54-55`: for example `accent="art"` would highlight the middle of "start". Wrap it in `\b` boundaries when the accent starts or ends with a word character, or document the limitation.
6. **N6: Two values without markers.** `src/components/ui/FaqAccordion.astro:76` (`gap: 1.714rem`, question → icon) has no `TODO: DS`. `PricingCard.astro:103` reuses the SectionHeader 0.714rem gap without a marker, which is fine if intended. Add the marker, or note the value in the Global "FAQ accordion specs" entry.
7. **N7: PricingCard details, for the Pricing checkpoint.**
   - `PricingCard.astro:54-57` renders an empty `<p>` when neither `price` nor `priceLabel` is set. Guard it with `amount &&`.
   - "/mo" uses `c-paragraph` (≈14.6px at 1440). In `pricing-cards.jpg` it is ≈20px at 1920, closer to `c-paragraph_m` or `c-paragraph_l`. Confirm with design.
8. **N8: Possible layout shift when the filter bar appears.** `WorkListing.astro:84, 158`: the filter bar is un-hidden by a deferred module script. If first paint happens before the script runs (slow connections), the list shifts down ≈116px. Lighthouse measured CLS 0 locally.
   - A no-CLS alternative that keeps the no-JS rule: render the bar visible and add `<noscript><style>.c-work-listing__filters{display:none}</style></noscript>`, or reserve its height.
9. **N9: Edge case with no clients and no testimonials.** PageHero (`PageHero.astro:58`, `padding-bottom: 0`) then sits directly on the CtaBanner (`padding-top: 0`), so the description touches the banner. Cheap guard: have `work.astro` pass a class that restores the container bottom padding when `clients.length === 0 && testimonials.length === 0`. Low priority.
10. **N10: Meta description length.** The fallback meta description is 196 characters, so SERPs will truncate it at about 155–160. Keep the real `workPage.seo.metaDescription` at 160 or less when it's written (Content, `TODO: COPY`).
11. **N11: List → Testimonials gap.** 168px at 1920 against ≈221px in `work-preview.png`. This comes from the global section rhythm (container 6rem + 6rem). Add it to Work → Design team "Hero and listing spacing", or to the Global "Section vertical spacing" question, rather than patching it locally.
12. **N12: No current-page marker in the Nav.** `src/components/layout/Nav.astro:87`: no link carries `aria-current="page"`, so on `/work` the "Work" item isn't marked as the current page. `/work` is the first page where this shows. Add `aria-current` when the link's `href` equals the current path without its trailing slash. A visual active state only if design specifies one.

## Carry-over (pre-existing, affects `/work`; not new findings)
- **Phase 4 N5, images without `width`/`height`.** On `/work`: 55 ClientList icons (`ClientList.astro:98`) and 32 TestimonialCard logos (`TestimonialCard.astro:62`). The Phase 4 N5 list did not include these shell images, which are on every page:
  - `Footer.astro:93-94` (partner badges)
  - `Footer.astro:113` (wordmark)
  - `CtaBanner.astro:137-142` (`cta-banner-vector.svg`)

  Lighthouse flags them under `unsized-images`.
- **Phase 4 N9:** the Nav `role="menu"` is still in the page (1 instance).
- **Phase 4 N10:** accent tag text is 4.48:1. There are 56 instances on `/work` (every category tag), and it is the main Lighthouse a11y deduction.
- **Phase 4 N7:** there is no Organization JSON-LD fallback. Nor is there any `og:image`, because `siteSettings` doesn't exist.
- **Phase 4 S6 (deferred by the lead):** no gradient surfaces on `/work` other than the CTA banner.
- **Shell performance, for the Phase 8 pass.**
  - `Footer.astro:54` `barcelona.png` is 526 KB, eager, and PNG.
  - `benormedia-footer.png` is 195 KB and `claude-partner.png` is 125 KB. All are PNG, not lazy, and larger than their display size.
  - Together with `testimonials-bg.svg` (181 KB), these dominate mobile LCP on both `/` and `/work`.
- **Footer social links.** `Footer.astro:97, 102`: `href=""` (no `siteSettings`) and 16.9px targets, which fail Lighthouse `target-size`.
- **Known content gaps.** `fundsRaised` is empty on every client (no funds tags). The list order differs from the ref.
- **Housekeeping.** `src/scripts/ui/` is a new folder that isn't in the CLAUDE.md folder tree, which lists only `scripts/animations/`. The orchestrator should add it when the lead next OKs a CLAUDE.md edit.

## Requests for other agents
- **@astro:** S1, S4 (ClientList preview loading: it's the ui agent's component, but the change is script and markup; coordinate with @ui), N2, N8, N9, N12.
- **@ui:** S2 (tabs mode no-JS), S3 once design answers, N3, N4, N5, N6, N7.
- **@sanity:** none. `workPage` document creation is already requested.
- **Orchestrator:** N1 (DECISIONS table), N10 and N11 into DECISIONS, and the CLAUDE.md folder-tree note.

## Open questions for the project lead
1. **S3, gradient text contrast:** accept `--gradient-primary` text on white (light end 2.29:1) for the accents and prices, or ask design for a darker text gradient?
2. **Segmented control active state:** the active pill is `#F0F0F0` on white (1.14:1; the ref's `#F5F5F5` is even lighter). The pressed state is carried mostly by that background plus a small text-color change, and WCAG 1.4.11 asks for 3:1 on state indicators. Keep it as designed, or ask design for a stronger active style (e.g. a border)?
3. **S1, URL form:** confirm there are no trailing slashes site-wide (`/work`, per SITEMAP) so canonical, sitemap and redirects all use one form.
4. **Refs:** `work-preview.png` and `Home.png` show faint vertical lines at about x = 120 / 260 / 1660 / 1800 (at 1920) running the full page height. Are they a decorative page grid to build, or Figma layout guides to ignore? Nothing is built today.
5. **S4:** OK to load the client-list hover screenshots on first hover/focus instead of with the page? The visible behaviour is unchanged.
6. The astro handoff's open items still stand: list order, tab → category mapping, and URL state for filters.

## TODO markers added
- `TODO: DS`: none (QA did not edit code).
- `TODO: COPY`: none.
