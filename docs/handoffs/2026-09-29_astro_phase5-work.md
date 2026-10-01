# Handoff — astro — Phase 5 Work page (`/work`)

Date: 2026-09-29 · Author: astro agent · Branch: `feat/phase5-secondary-pages` · Status: DONE (not committed)

## What I did
- Built `/work` (`src/pages/work.astro`), static, per `work-preview.png`:
  1. `PageHero`: eyebrow "Our Work", `<h1>` "Websites\nwe've launched.", description.
  2. `WorkListing`: industry filters and all 56 clients in the shared `ClientList`.
  3. `Testimonials`: reused unchanged. It already renders the secondary-page subtitle, so no `description` prop was needed.
  4. CTA banner: rendered by BaseLayout, which is the default.
- New shared section `PageHero`: a centered secondary-page hero built on `SectionHeader as="h1"` + `c-text_xxl`, with an optional `accent`. Pricing, Testimonials and Blog can reuse it.
- New section `WorkListing`:
  - Filters use `SegmentedControl mode="toggle" squares` with the 4 tabs from the ref: View All · Professional Services · SaaS / B2B Tech · Agency. The ref shows "SaaS / B2B Tech" as a single tab.
  - A static tab → slug map lives in the component (Proposed):
    - professional-services → `professional-services`
    - saas-b2b-tech → `saas-b2b-tech` + `saas`
    - agency → `agency`
  - Any tab with 0 matching clients is dropped at build time. If only "View All" would be left, no filter bar renders at all.
  - **No JS:** the filter bar wrapper is rendered `hidden` and every row shows. The component `<script>` removes `hidden`, so there are never dead buttons.
  - **Click:** the script sets `aria-pressed` + `is-active` on every item and `hidden` on the non-matching `<li>`. A visually hidden `role="status" aria-live="polite"` then reads "Showing N of 56 projects". The copy template lives in `data-template` in the markup.
  - A visually hidden `<h2>` "All projects" keeps the heading outline h1 → h2.
  - The whole section is hidden when the client list is empty.
- `ClientList` (shared, minimal and non-breaking; Home renders the same):
  - Each `<li>` now carries `data-category="<slug>"` when the client has a category.
  - Stacked-deck overlap selector changed from `.item + .item` to `.item:not([hidden]) ~ .item`. Without this, the first visible row after hidden rows kept the −14px overlap. Verified: the first visible row gets `margin-top: 0` and the rest get −10.5px (−0.875rem at 12px root).
  - Added an explicit `.c-client-list__item[hidden] { display: none; }`.
  - The list has no first/last-child styling that filtering could break.
- Data layer:
  - `getPageSeo(type)`, `getAllClients()`, and a shared `CLIENT_LIST_FIELDS` fragment. Details below.
  - `workPage` does not exist in Sanity, so it returns `null` and the page falls back to the title/description props.
- Logged the decisions and open questions in `docs/DECISIONS.md`:
  - Global: 2 Proposed rows (PageHero, ClientList hook), their Needs lead OK lines, and an sr-only utility follow-up.
  - Work: 3 Proposed rows, plus Content, Design team and Needs lead OK items.

## Files changed
- `src/pages/work.astro` (new)
- `src/components/sections/PageHero.astro` (new)
- `src/components/sections/WorkListing.astro` (new)
- `src/components/ui/ClientList.astro` (modified: `data-category` on `<li>`, hidden-row overlap rule, doc comment)
- `src/lib/sanity/queries.ts` (modified: `CLIENT_LIST_FIELDS` fragment, `PAGE_SEO`, `ALL_CLIENTS`, 2 fetchers)
- `src/lib/sanity/types.ts` (modified: `PageSingletonType`, `PageSeoDoc<T>`)
- `docs/DECISIONS.md` (Global + Work)

## Queries added (`src/lib/sanity/queries.ts`)
| Query / fetcher | GROQ | Returns |
|---|---|---|
| `PAGE_SEO` / `getPageSeo<T extends PageSingletonType>(type)` | `*[_id == $type && _type == $type][0]{ _id, _type, "seo": seo${SEO} }` | `PageSeoDoc<T> \| null` |
| `ALL_CLIENTS` / `getAllClients()` | `*[_type == "client" && defined(name) && !(_id in path("drafts.**"))] \| order(category->title asc, name asc){ ${CLIENT_LIST_FIELDS} }` | `Client[]` |

Notes on the queries:
- **`PAGE_SEO`:**
  - `PageSingletonType = 'workPage' | 'pricingPage' | 'testimonialsPage' | 'blogPage'`.
  - Singleton `_id` is the type name: `sanity/structure.ts` sets `.documentId(typeName)`. Matching the exact `_id` therefore excludes `drafts.<type>`.
- **`CLIENT_LIST_FIELDS`:** `_id, _type, name, icon, websiteScreenshot, fundsRaised, websiteUrl, category->{_id,_type,title,slug}`.
  - These are exactly the fields `ClientList` renders.
  - `CLIENTS_BY_IDS` now spreads it and adds `logo`, `cardThumbnail` and `testimonial->`. Its result is unchanged; only the field order differs.
- **`ALL_CLIENTS`:** also skips unnamed clients, per SCHEMAS ("skip incomplete clients in listings").

## data-anim hooks
| Hook | Element | Likely motion | State |
|---|---|---|---|
| `page-hero` | `PageHero.astro` · `<section>` | hero reveal (eyebrow → h1 → description) | static |
| `work-list` | `WorkListing.astro` · `.c-work-listing__list` | row stagger on enter / on filter change | static (filter swaps are instant) |
| `segmented` | `SegmentedControl` root (existing, ui) | sliding active pill | static |
| `testimonials-marquee` | `TestimonialMarquee` (existing) | infinite rows | running (CSS) |

## Checks
- [x] `pnpm run build` passes. It outputs `dist/work/index.html` plus the `.vercel/output/static` copy.
- [x] `pnpm run check` passes (0 errors, 0 warnings, 0 hints).
- [x] `pnpm run lint` passes.
- [x] **Rendered HTML:**
  - 56 `<li class="c-client-list__item">` rows, each with `data-category`.
  - Exactly one `<h1>`. Outline: h1 → h2 "All projects" → h2 Testimonials → h2 CTA.
  - `<div class="c-work-listing__filters" data-work-filters hidden>`.
  - `<title>Our Work | BenorMedia</title>` and the fallback meta description.
- [x] **Behavior in headless Chrome (built site):**
  - After JS the filter bar is visible.
  - Counts are Professional Services 6/56, SaaS / B2B Tech 12/56, Agency 2/56, View All 56/56. For each, `aria-pressed` and the live-region text are correct and the first visible row has 0 margin.
- [x] **Screenshots:** 1440 and 991 in a real window, 767 and 375 in fixed-width iframes, a filtered state (Professional Services), and a no-JS copy (scripts stripped). No-JS: no filter bar, every row visible.
- **Compared to the refs:**
  - Structure and spacing match `work-hero.jpg` / `work-list.jpg`.
  - At ≤767 the filter wraps to 2 rows at 375 (the ui primitive's mobile behavior). The list rows use the existing ClientList mobile layout, with tags on a second line.
  - Body text is in the fallback font (Adobe kit pending), so wraps differ slightly.

## Requests for other agents
- @ui:
  - Please add a global visually-hidden utility (`cc-sr-only`). `WorkListing` scopes its own `.c-work-listing__sr-only` until then.
  - Please review the `ClientList` CSS change (the overlap selector and the `[hidden]` rule). It's your component; I touched it only because filtering needs it.
- @sanity:
  - Create the `workPage` singleton when the lead supplies the SEO copy. Nothing breaks without it.
- @qa:
  - Known carry-over nit N5 on reused components: `ClientList` icon `<img>` and `TestimonialCard` images have no `width`/`height`. I did not change them (out of scope); every other image on the page is from existing components.
  - I added no new `<img>`.

## Open questions for the project lead
**Needs lead OK**
1. **List order:** built as category title A→Z, then name. `AI & Technology` comes first, then Agency, Cleantech, and so on. The ref (`work-list.jpg`) uses a curated order (Surfe, Puzzle, HireArt, SimpleTiger…). Keep automatic, or pin the ref order? Pinning would need a hardcoded ID list like Home, or a new `order` field on `client` (a schema change, @sanity).
2. **Filter mapping:** SaaS / B2B Tech = `saas-b2b-tech` + `saas` (12 clients), Professional Services = 6, Agency = 2. Should AI & Technology, Marketing Tech, Sales Tech, etc. also count as "B2B Tech"?
3. **Filter behavior:**
   - The bar is hidden without JS.
   - Zero-match tabs are dropped.
   - There's no URL state (`?category=`). Unlike the Blog spec, filtered Work views aren't shareable. Add it?
4. **`PageHero`** as the shared hero for the secondary pages. Also the `ClientList` `data-category` hook and the hidden-row overlap rule.

**Design team**
5. **Spacing measured at 1/14 rem, `TODO: DS`:**
   - nav → eyebrow 7.857rem (110px)
   - description → filters 8.286rem (116px)
   - filters → first row 4rem (56px)
   - Mobile values are guesses: 5rem / 5rem / 3rem.
6. **Hero type:**
   - The ref title is ≈91px at 1920 (≈6.5rem at 1/14), bigger than `c-text_xxl` (5.5rem). The ref description is ≈24px, between `c-paragraph_m` and `c-paragraph_l`.
   - Built with `c-text_xxl` + `c-paragraph_m` (the closest classes, no new sizes).
   - This hinges on the open Global "ref px → rem" base question.

**Content**
7. `TODO: COPY` placeholders:
   - Fallback meta title "Our Work" and meta description (the hero text), until `workPage.seo` exists.
   - The hidden h2 "All projects".
   - The live-region text "Showing {shown} of {total} projects".

## Known issues
- The list order differs from the ref (see Q1).
- Filter changes are instant, with no animation (per phase scope).
- Carry-over N5 (images without width/height in `ClientList` / `TestimonialCard`).

## TODO markers added
- `TODO: DS`:
  - `PageHero.astro`: hero top spacing (7.857rem)
  - `WorkListing.astro`: description → filters (8.286rem), filters → list (4rem)
- `TODO: DS mobile`:
  - `PageHero.astro`: 5rem top
  - `WorkListing.astro`: 5rem top, 3rem filters → list
- `TODO: COPY`:
  - `work.astro`: fallback meta title / description
  - `WorkListing.astro`: hidden h2 "All projects", live-region template
- `TODO` (engineering): `WorkListing.astro`: move `.c-work-listing__sr-only` to a global `cc-sr-only` (@ui).
