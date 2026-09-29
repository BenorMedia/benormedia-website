# Phase 5 — Open items per page

Everything still to solve on the secondary pages: QA should-fix items, nits, flags, questions for the lead, design-team and content gaps.

How this file works:
- One section per page, in build order. `Global` holds items shared by several pages.
- Each item has an ID (`W-` Work, `P-` Pricing, `G-` Global…) so it can be referenced in chat and commits.
- Status: `Open` / `Resolved YYYY-MM-DD (how)`.
- Per-page QA is paused during Phase 5 (lead, 2026-09-29). The lead runs a full QA on all secondary pages after V1 of every page and after these items are resolved.
- Details for Work: `docs/handoffs/2026-09-29_qa_phase5-work-review.md`, `docs/handoffs/2026-09-29_astro_phase5-work.md`, `docs/handoffs/2026-09-29_ui_phase5-primitives.md`.

---

## Global (shared components, all pages)

### QA should-fix
| ID | Item | Where | Proposed fix | Status |
|---|---|---|---|---|
| G-1 | Canonical + `og:url` end in a trailing slash (`/work/`) while all internal links and SITEMAP use `/work` | `src/components/layout/Seo.astro:61-67`, `astro.config.mjs` | Set `trailingSlash: "never"` (needs lead OK) or strip the slash in Seo | Open |
| G-2 | SegmentedControl in `tabs` mode renders dead tab buttons without JS (inactive tab also `tabindex=-1`) | `src/components/ui/SegmentedControl.astro:70-82`, `src/scripts/ui/tabs.ts` | Render the tablist `hidden`; `initTabs` reveals it (same pattern as WorkListing) | Resolved 2026-09-29 (tabs mode renders the tablist `hidden` + `.c-segmented[hidden] { display: none }`; `initTabs` removes `hidden` on init and its cleanup restores the no-JS state; styleguide copy updated; verified with and without JS on `/pricing` and `/dev/styleguide`) |
| G-3 | Gradient text (section-header accents, pricing prices) is 2.29:1 on white at its light end; large text needs 3:1 | `SectionHeader.astro:130-143`, `PricingCard.astro:123-134` | Design decision: accept, or a darker text gradient | Open |
| G-4 | ClientList downloads every hover-preview screenshot on page load (≈830 KB on `/work`), touch devices never see them | `src/components/ui/ClientList.astro:127-138` | Set the image `src` on first hover/focus (needs lead OK) | Open |

### QA nits
| ID | Item | Where | Status |
|---|---|---|---|
| G-5 | `initTabs` makes each panel a Tab stop even when it contains focusable items | `src/scripts/ui/tabs.ts:38` | Open |
| G-6 | `initTabs` swallows Alt/Ctrl/Cmd + arrow and Home/End (Alt+Left no longer navigates back) | `src/scripts/ui/tabs.ts:65-89` | Open |
| G-7 | SectionHeader accent match can highlight part of a word ("art" inside "start") | `SectionHeader.astro:54-55` | Open |
| G-8 | FaqAccordion gap without `TODO: DS`; PricingCard reuses a SectionHeader value without a marker | `FaqAccordion.astro:76`, `PricingCard.astro:103` | Open |
| G-9 | PricingCard renders an empty `<p>` when there is no price; "/mo" ≈14.6px vs ≈20px in the ref | `PricingCard.astro:54-57` | Open |
| G-10 | Nav has no `aria-current="page"` on the current page link | `src/components/layout/Nav.astro:87` | Open |
| G-11 | A `TODO: COPY` HTML comment placed before `<html>` ships in the built page | pages using that pattern (`src/pages/work.astro:27`) | Open |
| G-12 | Shell images without width/height (missed by the Phase 4 list) | `Footer.astro:93-94, 113`, `CtaBanner.astro:137-142` | Open |
| G-13 | Footer images are heavy (526 / 195 / 125 KB), social links have empty `href` and 16.9px tap targets | `Footer.astro` | Open |
| G-14 | Add a global `cc-sr-only` utility (WorkListing uses a scoped visually-hidden class) | `src/styles/utilities.css` | Open |
| G-15 | Add `src/scripts/ui/` to the CLAUDE.md folder tree (needs lead OK to edit CLAUDE.md) | `CLAUDE.md` | Open |

### Phase 4 carry-overs (not fixed in Phase 5 unless the lead says so)
| ID | Item | Status |
|---|---|---|
| G-16 | N5 — `<img>` without width/height in LogoStrip, ClientCard, ClientList icons, TestimonialCard, Services, HomeHero (breaks the Phase 5 image rule on every page that reuses them) | Open |
| G-17 | N6 — LogoStrip and ClientList render when their list is empty | Open |
| G-18 | N9 — Nav uses `menu` / `menuitem` roles (Phase 5 rule: disclosure pattern) | Open |
| G-19 | N1 contact modal missing space · N2/N3 marquee a11y · N4 badge refill · N7 no Organization JSON-LD / `og:image` (no `siteSettings`) · N8 untokenized font sizes · N10 accent tag contrast 4.48:1 | Open |
| G-20 | Q26 Services mobile title size · Q27 mobile menu backdrop click · Eyebrow `is-on-dark` variant · `Button` doesn't pass attributes · S6 gradient contrast (deferred by lead) | Open |

### Questions for the lead
| ID | Question | Status |
|---|---|---|
| G-21 | No trailing slashes site-wide? (G-1) | Open |
| G-22 | Load hover screenshots on first hover instead of with the page? (G-4) | Open |
| G-23 | Fix G-16 / G-17 / G-18 in this branch? | Open |
| G-24 | Approve the shared primitives (Proposed): SectionHeader `accent`, SegmentedControl + `initTabs`, FaqAccordion on `<details name>`, PricingCard subgrid, shared `PageHero` | Open |
| G-25 | 404 cleanup (`Container` instead of hardcoded max-width, mobile `TODO: DS`)? | Open |

### Design team
| ID | Item | Status |
|---|---|---|
| G-26 | Which base converts ref px → rem: 14px (DS text classes, SectionHeader, Phase 5) or 16px (Our Work cards)? Affects every measured value | Open |
| G-27 | Active segmented pill: ref `#F5F5F5` is not a token (built `--color-gray-light`); contrast vs white is 1.14:1 (state indicators expect 3:1). No hover spec | Open |
| G-28 | Corner squares on the Work filter but not on the FAQ tabs — intended? | Open |
| G-29 | Faint full-height vertical lines in `work-preview.png` / `Home.png` (x ≈ 120 / 260 / 1660 / 1800): decorative grid or Figma guides? | Open |
| G-30 | No mobile / tablet refs for any secondary page — built with DS tokens, `TODO: DS mobile` | Open |
| G-31 | DESIGN_SYSTEM §10 still mentions `caseStudy` / `project` / `technology` types (needs lead OK to edit) | Open |

### Content
| ID | Item | Status |
|---|---|---|
| G-32 | No page singletons exist in Sanity (`homePage`, `siteSettings`, `workPage`, `pricingPage`…): every page uses fallback SEO from code | Open |
| G-33 | `fundsRaised` empty on every client (funds tags hidden) | Open |

---

## Work (`/work`)
Status: V1 built. Per-page QA done once (PASS WITH NOTES).

### QA nits
| ID | Item | Where | Status |
|---|---|---|---|
| W-1 | Filter bar is revealed by a deferred script: the list could shift ≈116px on slow connections (0 locally) | `WorkListing.astro:84, 158` | Open |
| W-2 | With no clients and no testimonials, the hero sits flush against the CTA banner | `src/pages/work.astro` | Open |
| W-3 | Fallback meta description is 196 characters (keep the real one ≤160) | `src/pages/work.astro` | Open |
| W-4 | List → Testimonials gap 168px vs ≈221px in the ref (global section spacing) | `.c-container` / section rhythm | Open |

### Questions for the lead
| ID | Question | Status |
|---|---|---|
| W-5 | List order: automatic (category A→Z, then name — AI & Technology comes first) or the pinned ref order (Surfe, Puzzle, HireArt…)? Pinning = hardcoded ID list like Home, or a new `order` field on `client` | Open |
| W-6 | Filter mapping: SaaS / B2B Tech = `saas-b2b-tech` + `saas` (12 clients). Should AI & Technology, Marketing Tech or Sales Tech count too? Professional Services = 6, Agency = 2 | Open |
| W-7 | Put the filter in the URL (`?category=`) so filtered views can be shared? | Open |
| W-8 | Approve: page structure, `ALL_CLIENTS` query, ClientList `data-category` + overlap rule, filter behavior (hidden without JS, tabs with 0 matches dropped) | Open |

### Design team
| ID | Item | Status |
|---|---|---|
| W-9 | Spacing measured at 1/14 rem (`TODO: DS`): nav → eyebrow 7.857rem, description → filters 8.286rem, filters → list 4rem. Mobile guesses 5 / 5 / 3rem | Open |
| W-10 | Hero type: ref title ≈91px (bigger than `c-text_xxl`), description ≈24px (between `c-paragraph_m` and `_l`). Built with the closest classes | Open |

### Content
| ID | Item | Status |
|---|---|---|
| W-11 | `TODO: COPY`: fallback meta title "Our Work" + description, hidden h2 "All projects", live-region text "Showing {shown} of {total} projects" | Open |
| W-12 | Create the `workPage` document in Studio with real SEO copy | Open |

---

## Pricing (`/pricing`)
Status: V1 built (no per-page QA). Details: `docs/handoffs/2026-09-29_astro_phase5-pricing.md`.

### Known issues / nits
| ID | Item | Where | Status |
|---|---|---|---|
| P-1 | At 1440 the cards are 400px wide (ref 441px at the 1920 frame, container capped at 1440px): "Growth (AEO/GEO + CRO)" wraps to 2 lines and descriptions to 3–4 lines. Subgrid keeps prices and buttons aligned | `PricingPlans.astro` / `.c-container` | Open |
| P-2 | Hero title breaks "needs." onto a 3rd line at 991 (forced `\n` + 66px title) | `PageHero` / `c-text_xxl` at 12px root | Open |
| P-3 | FAQPage JSON-LD ships the placeholder FAQ copy until the final copy lands (staging is noindex) | `FaqSection.astro`, `src/lib/content/faqs.ts` | Open |
| P-4 | Reused components still render `<img>` without width/height (162 of 186 on this page: LogoStrip, ClientCard, ClientList, TestimonialCard, G-16). No new `<img>` added. LogoStrip / OurWork are guarded in the page so they don't render empty (G-17) | `src/pages/pricing.astro` | Open |
| P-5 | Solid white FAQ rows hide most of the globe when every row is closed (ref rows look slightly see-through) | `FaqAccordion.astro` | Open |
| P-6 | Faint dotted row near the bottom-right of the FAQ background: it is in the source `faqs-bg.png` too (export artifact) | `public/images/pricing/faqs-bg*.webp` | Open |
| P-7 | Hidden h2 uses a scoped visually-hidden class until `cc-sr-only` exists (G-14) | `PricingPlans.astro` | Open |
| P-8 | FAQ tabs wrap to 2 rows at 375 (ui primitive's mobile behavior) | `SegmentedControl.astro` | Open |
| P-9 | Home: `OurWork` CSS is now emitted as its own chunk because two pages use it. Markup is identical to before (verified); only the `<link>` list changed | build output | Open (info) |
| P-10 | G-2 fix touched ui-owned files (`SegmentedControl.astro`, `tabs.ts`) at the orchestrator's request: @ui to review | `src/components/ui/`, `src/scripts/ui/` | Open |

### Questions for the lead
| ID | Question | Status |
|---|---|---|
| P-11 | Plan name: the card says "Growth (AEO/GEO + CRO)", the nav / footer say "Growth (AEO / SEO / CRO)". Which one? (built as the card) | Open |
| P-12 | FAQ default state: the ref shows the 2nd question open. Keep all closed, or open the first one? | Open |
| P-13 | OK to keep the generated placeholder FAQ answers (and the 5 AEO questions) on staging until final copy? | Open |
| P-14 | Approve: page structure, plans data in `src/lib/content/pricing.ts`, shared `FaqSection` (tabs, no-JS group headings, JSON-LD), shared `src/lib/content/` (Our Work pins moved from Home), FAQ background export | Open |

### Design team
| ID | Item | Status |
|---|---|---|
| P-15 | `TODO: DS` spacing, measured at 1/14 rem: hero title → cards 7.357rem (103px), cards → logo strip 4.357rem (61px), card gap 1.071rem (15px), logo strip → FAQ title 8.571rem (120px), title → tabs 1.714rem (24px), tabs → first row 3.5rem (49px), last row → section end 8.571rem (120px), no-JS panel gap 4rem. Mobile guesses: 5rem section padding, 3rem tabs → rows (G-26 base question applies) | Open |
| P-16 | Pricing section background not built: faint line-art arcs left and right of the cards + lavender glow on cards 1 and 3. Asset needed | Open |
| P-17 | Card button is 50px tall in the ref, the DS button is ≈56px (DS kept) | Open |
| P-18 | Gradient price text contrast at its light end (see G-3) | Open |
| P-19 | FAQ title ≈60px in the ref vs `c-text_xl` 54.7px (kept the SectionHeader default) | Open |
| P-20 | FAQ background: current asset is a WebP export of the PNG (flattened on white, 21 KB 1x / 55 KB 2x). An SVG from design would be sharper and lighter | Open |
| P-21 | Mobile / tablet: no refs. Cards stack full width at ≤991 (811px wide at 991); on phones the FAQ globe shows as a faint crop (`cover`). `TODO: DS mobile` | Open |

### Content
| ID | Item | Status |
|---|---|---|
| P-22 | `TODO: COPY` placeholder FAQ copy: 5 generated answers ("Web Design And Development") and 5 generated questions + answers ("Answer Engine Optimization (AEO)") in `src/lib/content/faqs.ts` | Open |
| P-23 | `TODO: COPY` fallback meta title "Pricing" + 156-char description, until the `pricingPage` document exists in Studio | Open |
| P-24 | `TODO: COPY` visually hidden h2 "Plans" above the cards | Open |
| P-25 | Create the `pricingPage` document in Studio with real SEO copy | Open |

---

## Testimonials (`/testimonials`)
Status: V1 built (no per-page QA). Details: `docs/handoffs/2026-09-29_astro_phase5-testimonials.md`.

### Known issues / nits
| ID | Item | Where | Status |
|---|---|---|---|
| T-1 | Only 4 testimonials are published, so the grid is one full row + one card (the ref shows 5 × 3 filler cards). No duplicates are rendered | `TestimonialsGrid.astro` | Open |
| T-2 | Grid reuses the shared marquee `TestimonialCard` with `width: 100%` on this page only (`TestimonialsGrid.astro`); cards keep the fixed marquee height 23.03rem | `src/components/sections/TestimonialsGrid.astro` | Resolved 2026-09-29 (lead: width 100% only on this page; `fluid` prop dropped) |
| T-3 | Client logo `<img>` in `TestimonialCard` still has no width/height (G-16): the query has no asset dimensions, so it isn't a trivial fix. 4 on this page; no new `<img>` added | `TestimonialCard.astro` | Open |
| T-4 | Cards are `<article>` without a heading (quote + author only), under a visually hidden `<h2>` | `TestimonialCard.astro`, `TestimonialsGrid.astro` | Open (info) |
| T-5 | Hidden h2 uses a scoped visually-hidden class until `cc-sr-only` exists (G-14) | `TestimonialsGrid.astro` | Open |
| T-6 | Hero title renders smaller than the ref (`c-text_xxl` vs ≈91px at 1920, same as W-10); at 375 "clients." wraps to a 3rd line | `PageHero` | Open |
| T-7 | Cards use curly quotes (shared card), the ref shows straight quotes | `TestimonialCard.astro` | Open (info) |

### Questions for the lead
| ID | Question | Status |
|---|---|---|
| T-8 | OK to show only the published testimonials (4 today) instead of filling the 5 × 3 grid? | Open |
| T-9 | OK to ship no Review / AggregateRating JSON-LD (Google ignores self-serving reviews)? | Open |
| T-10 | Approve: page structure, `TestimonialsGrid` | Open |

### Design team
| ID | Item | Status |
|---|---|---|
| T-11 | `TODO: DS` spacing, measured at 1/14 rem: hero title ink → first card 112px (7.286rem padding below the h1 line box), card gap 1.429rem (20px, columns and rows), last card → CTA banner 15.714rem (220px). Mobile guesses 5rem / 5rem | Open |
| T-12 | Card size: the ref card is 544 × 369px = the marquee card at 1/16 rem, while the page spacing uses 1/14 rem (G-26). Fluid in the grid: 397 × 322px at 1440, 397 × 276px at 991 | Open |
| T-13 | Mobile / tablet: no refs. 2 columns at ≤991, 1 at ≤767; at 767 the single cards are 731px wide with a large gap between quote and author (23.03rem min-height). `TODO: DS mobile` | Open |
| T-14 | No section background behind the grid in the ref (plain white): confirm the Home line art isn't wanted here | Open |

### Content
| ID | Item | Status |
|---|---|---|
| T-15 | All 4 testimonials are placeholders (Rob Alfano, Lorem ipsum, no photo). The ref uses a SimpleTiger quote with a photo | Open |
| T-16 | `TODO: COPY` fallback meta title "Testimonials" + 146-char description, until the `testimonialsPage` document exists | Open |
| T-17 | `TODO: COPY` visually hidden h2 "Client testimonials" | Open |
| T-18 | Create the `testimonialsPage` document in Studio with real SEO copy | Open |
