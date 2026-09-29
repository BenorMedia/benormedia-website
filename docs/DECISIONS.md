# Decisions Log

## How this file works (read before writing)

**Structure.** `## Global` first (stack, workflow, design system, layout shell, and any component reused on more than one page), then one `## <Page>` section per page in `SITEMAP.md` order: Home · Service pages · Work · Testimonials · Pricing · Blog. Add a page section the first time that page needs an entry. Nothing goes outside these sections.

**Each section has exactly two parts, in this order:**

1. `### Decisions` — one table, newest row at the bottom:
   `| Date | Decision | Reason | Status |`
   - `Status` = `Lead` (approved by the project lead) or `Proposed` (built, waiting for the lead's OK).
   - One row per decision, single line. Never put a raw line break inside a cell (write `\n` inside backticks if you need to mention it).
2. `### Open questions` — grouped under these `####` headings, always in this order (omit empty ones):
   - `#### Content` — copy, Sanity data, client assets.
   - `#### Design team` — missing specs, mobile designs, animation specs.
   - `#### Lead / CEO` — business calls, accounts, credentials, third-party setup.
   - `#### Needs lead OK` — one line per `Proposed` decision in the table above.
   - `#### Engineering follow-ups` — tech debt; no lead action needed.

   Item format: `- **Short title** — one or two sentences: what's missing and what is built meanwhile. (YYYY-MM-DD)`

**Where an entry goes.** A shared component (e.g. `ClientList`, `Tag`, `Button`) → `Global`; its page-specific usage (which clients, wrapper spacing) → that page. Page sections (e.g. Home → Services) → that page.

**Resolving.** Never delete an open question: strike it and add the answer — `- ~~**Title**~~ — RESOLVED YYYY-MM-DD: answer (see Decisions).` — and add/update the matching Decisions row (`Status: Lead`).

**Who reads it.** Every agent logs here. The project lead does not read this file: the orchestrator relays open questions to the lead in chat.

---

## Global

### Decisions
| Date | Decision | Reason | Status |
|---|---|---|---|
| 2026-09-24 | Astro static output + TypeScript strict | Performance, agency's new custom-code offer | Lead |
| 2026-09-24 | Sanity Studio embedded at `/studio` | One repo, one deploy | Lead |
| 2026-09-24 | Sanity publish webhook → Vercel rebuild | Static site with fresh content | Lead |
| 2026-09-24 | Vanilla CSS (nesting + custom properties), no SASS/Tailwind | Tokens as runtime CSS vars; native nesting covers SASS's main benefit | Lead |
| 2026-09-24 | GSAP + ScrollTrigger via npm | Standard for agency animations | Lead |
| 2026-09-24 | Branches: `main` prod, `dev` staging, `feat/*` per task | Staging-first workflow | Lead |
| 2026-09-24 | English only | Scope | Lead |
| 2026-09-24 | rem units on fluid root (html), em only for component padding | Avoid em compounding | Lead |
| 2026-09-24 | Figma text class names kept as-is | 1:1 QA with design | Lead |
| 2026-09-24 | Breakpoints 767 / 991 / 1440; 12px root on 768–991 | Tablet legibility | Lead |
| 2026-09-24 | Fixed-field Sanity schemas, no page builder | Approved fixed layouts, safer editing | Proposed |
| 2026-09-25 | Figma is not a dependency; Figma sync is a floating Phase F | Keep build moving without MCP access | Lead |
| 2026-09-25 | Work: listing only, no detail pages | Scope | Lead |
| 2026-09-25 | Services: header dropdown only, routes at root (`/<service-slug>`), no `/services` prefix | No main services area | Lead |
| 2026-09-25 | Contact is a popup (native `<dialog>`), no page | Design | Lead |
| 2026-09-25 | No legal pages for now; footer links hidden | Scope | Lead |
| 2026-09-25 | Blog search + category filter, client-side | Static site, small content volume | Lead |
| 2026-09-25 | Plan: Home by Day 5, remaining pages Day 6, content/QA Day 7 | Deadline | Lead |
| 2026-09-25 | Package manager: pnpm (supersedes earlier implied npm) | Strict node_modules layout, faster installs, better monorepo readiness | Lead |
| 2026-09-25 | Node 22.x LTS pinned via `.nvmrc` and `engines.node >= 22.12.0` | Required by Astro 7 | Lead |
| 2026-09-25 | TypeScript preset `astro/tsconfigs/strictest` | Stronger safety net than plain `strict` | Lead |
| 2026-09-25 | Vercel adapter included with `output: 'static'` + `imageService: true` | Vercel Image Optimization for Sanity images | Lead |
| 2026-09-25 | Sanity Studio routing: hash-based (default under static output) | Avoids `vercel.json` rewrite and 404-on-refresh | Lead |
| 2026-09-25 | Sanity `apiVersion` pinned to `2026-09-25` | Predictable behavior across upgrades | Lead |
| 2026-09-25 | Visual Editing deferred to post-launch; would require on-demand preview routes | Static output only; publish webhook rebuild is sufficient for launch | Lead |
| 2026-09-25 | CORS: no wildcard `vercel.app`; only `http://localhost:4321`, the `dev` branch preview URL, and the production domain (once known) | Least-privilege; wildcard preview URLs expose Studio to any Vercel deploy | Lead |
| 2026-09-25 | Local `benorSanityAliasFix` Vite plugin in `astro.config.mjs` to work around `@sanity/astro@3.5.1` Windows path-strip bug in `sanity:module-dedupe` | Studio unusable in dev on Windows without it; remove when upstream fix ships | Lead |
| 2026-09-25 | Handoff gates: `pnpm build`, `pnpm check` AND `pnpm lint` must pass | Lint now part of pre-handoff green bar | Lead |
| 2026-09-25 | Sanity schemas v0.4 approved | `author` promoted to its own document (single source of truth for bio/photo/LinkedIn); FAQ sections group their questions (`faqSections[].faqs[]`) — no dynamic "FAQ type" dropdown; testimonial `kpis` = array (max 2); `category` = shared document across `client` and `post`, seeded with the 22 canonical values | Lead |
| 2026-09-25 | Blog article body = Portable Text + `@sanity/table` | Native Sanity block content covers everything we need; table plugin fills PT's tables gap. Explicitly excludes embeds, videos, code blocks and CTA blocks | Lead |
| 2026-09-25 | `siteSettings` = single doc with tabs (General, SEO & Meta, Organization, Navigation, Footer, Global sections); every page/routable doc has Content + SEO tabs | Editors group related fields without splitting into multiple singletons; SEO always separated from content so it can't be forgotten | Lead |
| 2026-09-25 | Staging noindex handled via env var in code (BaseLayout), not a CMS toggle | Prevents accidental de-indexing of production from Studio; env-driven means preview deploys are noindex by construction | Lead |
| 2026-09-25 | Sanity schemas v0.5 — page singletons are SEO-only; page copy lives in Astro components | Site is small, copy is stable; removing per-section CMS fields eliminates schema drift and simplifies the editor UX. Every page singleton (`homePage`, `workPage`, `pricingPage`, `testimonialsPage`, `blogPage`) now holds just a `seo` object | Lead |
| 2026-09-25 | Removed `service` and `technology` document types | Services are handled as static Astro pages; the `technology` doc had no confirmed use case | Lead |
| 2026-09-25 | Removed `Navigation` and `Footer` tabs from `siteSettings` | Site chrome (nav + footer) is authored directly in the Astro components. `siteSettings` keeps only General, SEO & Meta, Organization and Global sections | Lead |
| 2026-09-25 | `PUBLIC_SITE_ENV` env var drives Seo noindex | Set to `production` only on the production Vercel deployment; preview/dev deployments render `noindex, nofollow` by construction. Prevents accidental de-indexing via CMS toggle | Lead |
| 2026-09-25 | Nav labels + Services dropdown items + footer link columns are hardcoded in Astro components (confirms SCHEMAS v0.5) | Editing labels/routes is a code change, not a CMS change | Lead |
| 2026-09-25 | Services dropdown routes aligned to `docs/SITEMAP.md`: `/custom-websites-migrations`, `/growth`, `/ongoing-website-support` | SITEMAP.md is the canonical route source; Nav + Footer + service pages must use these exact slugs | Lead |
| 2026-09-25 | Mobile nav / mobile menu design not provided → built functional with DS tokens; visual polish deferred to Phase F | Do not block Phase 3 on missing design | Proposed |
| 2026-09-25 | CTA banner eyebrow on gradient background overrides default `--color-gray` border and `--color-text` to translucent white / white | Default eyebrow variants are only readable on light bg; on-dark reuse needed here. Potential DS gap for an `is-on-dark` eyebrow variant — flagged in Open questions | Proposed |
| 2026-09-25 | Added `Healthcare` as the 23rd canonical category | Requested during Phase 3 content-entry prep; slug `healthcare` | Lead |
| 2026-09-25 | Added `pnpm schema:deploy` script (`sanity schema deploy`) | Keeps the remote Sanity schema in sync with the code so future MCP/content work can validate against it | Lead |
| 2026-09-25 | `.c-container` horizontal padding = 120 px desktop, 2 rem (32 px) mobile | Figma parity (Phase 3 nav sync); the Nav uses the same horizontal padding with 16 px vertical to match the frame | Lead |
| 2026-09-25 | Contact modal rebuilt as a right-side slide-in `<dialog>` (753 px panel, blur backdrop) — replaced the initial centered-modal draft | Matches the approved Figma design; earlier draft was structural only | Lead |
| 2026-09-25 | Footer legal links moved to the bottom **credit strip** (Privacy Policy · Terms & Conditions · Cookie Policy). Middle-columns legal was already hidden | Bottom strip is a separate context from the mid-footer columns; routes `/privacy-policy` etc. are placeholders until pages exist | Lead |
| 2026-09-25 | Footer wordmark sits in a **full-width strip** (258 px tall, border top + bottom) outside `.c-container`; credit strip stays inside the container with 30 px vertical padding | Wordmark spans viewport width regardless of container max; credit stays aligned with the rest of the site | Lead |
| 2026-09-25 | Partner-badge artwork landed as PNG in `/public/images/` (`webflow-partner.png`, `claude-partner.png`, width 216 px each) | Replaces the placeholder bordered text boxes; retires the `TODO: assets partner-badges` marker | Lead |
| 2026-09-28 | `Tag` primitive rebuilt to mirror the locked Eyebrow box (§3.3) without squares: `default` (gray border, text color) and `accent` (accent border, 8% accent tint, accent text, 600). Replaces the pill placeholder | Our Work ref shows square tags identical in size to the eyebrow; closest existing spec until DS tag specs land. `TODO: DS` kept | Proposed |
| 2026-09-28 | `SectionHeader` title accepts `\n` → `<br />` | Our Work title breaks after "B2B" in the design; greedy wrapping can't reproduce it (line 2 is wider than line 1 + "companies") | Proposed |
| 2026-09-26 | `SectionHeader` is always centered — no `align` prop; global styles + `width: 100%` + `text-align: center` + `margin: 0 auto` | Every section header in the refs is centered | Lead |
| 2026-09-26 | Page copy lives in the Astro section components; Sanity only feeds client/testimonial data, pinned by document `_id` (`client-<slug>`) via `getClientsByIds` (order-preserving, warns on missing IDs) | Confirms SCHEMAS v0.5 (singletons are SEO-only) | Lead |
| 2026-09-28 | Shared `ClientList` component (`src/components/ui/ClientList.astro`): data in via `clients` prop + optional `limit`. Rows overlap 14px (stacked deck, 14/30 vertical padding). List has no width — `max-width: 85%` (100% ≤767), `margin: 0 auto`, `flex-grow: 1` to fill flex wrappers | Most-used component on the site; pages fetch, component renders, same as other client sections | Lead |
| 2026-09-28 | Client list rows are links (new tab) only when `websiteUrl` is set; otherwise plain rows | No client detail pages; arrow implies a destination. All 9 Home clients currently have no URL, so rows render static | Proposed |
| 2026-09-28 | Client list hover: arrow → `--color-accent` + `rotate(-30.963deg)`; website-screenshot preview centered on the row, opening from the center (height 0 → full). Preview height `15.58rem`, width auto (full screenshot, no crop). Preview shadow `0 0.6875rem 1.48125rem 0.125rem rgba(0,0,0,0.2)` is the **second approved exception** to the no-shadow rule (after Home Services active card). Triggers on any `:hover` (no media gate); linked rows also trigger on `:focus-visible` | Matches `clients-list-hover.png` | Lead |
| 2026-09-28 | `Button` gained an optional trailing `icon` named slot (`.c-button__icon`, `currentColor`, 0.5em gap `TODO: DS`) | Reusable icon buttons without a new component | Lead |
| 2026-09-28 | `DECISIONS.md` restructured: Global, then per page; each with Decisions table + Open questions by category (see "How this file works") | Lead request; open questions are relayed to the lead in chat | Lead |
| 2026-09-28 | Shared `TestimonialCard` (`src/components/ui/TestimonialCard.astro`): 34rem × 23.03rem, padding 2.375rem 2.125rem, gap 1.5rem, column + `space-between`, radius 0.875rem, `--border-default`, white 5% bg (`color-mix` of `--color-white`) + `backdrop-filter: blur(10px)`. Quote `c-paragraph` `--color-text` with curly quotes; author row = photo (initial fallback) + name (700) + role, client logo right | Lead spec | Lead |
| 2026-09-28 | Card logo = the client that references the testimonial (`client.testimonial`), fallback `testimonial.companyLogo`. New `TESTIMONIALS` query + `getTestimonials()` (all published, oldest first, with `client{ name, logo }`) | Lead: "logo from client related" | Lead |
| 2026-09-28 | Shared `TestimonialMarquee` (`src/components/ui/TestimonialMarquee.astro`): 2 infinite CSS rows (top → left, bottom → right). <8 testimonials: both rows show all, bottom rotated by half; 8+: split alternately. Each half repeated to ≥ 6 cards, track moves −50%, cards spaced by trailing margin (seamless loop). Repeats `aria-hidden`. Component clips itself; full-bleed is the caller's job | Reused on several pages | Lead |
| 2026-09-28 | Testimonial marquee pauses on hover / keyboard focus; reduced motion → no animation, rows scroll horizontally | Accessibility (moving content must be pausable) | Proposed |
| 2026-09-29 | Testimonial marquee: hover/focus pause **removed**; speed 10% slower (13.2s per card, was 12s). Reduced-motion fallback kept (static, horizontally scrollable rows) | Lead request; supersedes the 2026-09-28 pause row | Lead |
| 2026-09-29 | `Tag` mobile (≤767) font-size `1.3333rem` = 12px at the 9px root, for every `c-tag` site-wide (desktop unchanged, 0.9375rem) | Lead request | Lead |
| 2026-09-28 | Animation scripts live in `src/scripts/animations/` (one file per animation) and are initialized from a `<script>` in `BaseLayout`; first file: `cta-badges.ts`. CSS-only motion (marquees) stays in the component | Implements the CLAUDE.md animation rule; folder didn't exist before Phase 4 | Lead |
| 2026-09-29 | Seo: the title template applies only to page-specific titles (Home = "BenorMedia"); canonical + `og:url` use `siteSettings.siteUrl`, else Astro `site` from `PUBLIC_SITE_URL`, else are omitted (no localhost URLs) | QA S1 + S2 | Lead |
| 2026-09-29 | `docs/refs/` and `.claude/scheduled_tasks.lock` added to `.gitignore`; the refs already tracked stay as they are (the lead handles them) | Lead request | Lead |
| 2026-09-28 | `CtaBanner` structure = `<section class="c-cta-section">` → `Container` → `.c-cta` (was `<section class="c-container">`). Still rendered by BaseLayout on every page (Home: right below Testimonials). Content = `siteSettings.ctaBanner` when it has a title, else the approved design copy: "Ready to build your website? Let's chat." + Get in Touch (`is-white`, opens contact modal) + See Pricing (`is-glass`, `/pricing`) | No `siteSettings` document exists in Sanity, so the banner had never rendered; lead asked for section → container → CTA | Lead |
| 2026-09-28 | `CtaBanner`: `.c-cta-section .c-container { padding-top: 0 }`; bottom padding stays the container default | Lead: the section above already provides the spacing | Lead |
| 2026-09-28 | `CtaBanner` trusted badge (replaces the empty `c-cta__pill`, below the buttons, every page): padding 0.4946rem 0.8902rem, gap 0.5341rem, radius 0.2576rem, white 10% bg, shadow `0.445rem 0.178rem 1.7804rem 0 rgba(0,0,0,0.05)` — **third approved shadow exception**. Text = `siteSettings.ctaBanner.socialProofText` or "Trusted by +100 companies"; circles 1.98rem = 6 client `badge` images + `/images/more-badge.png` | Lead spec (`docs/refs/trusted-badge.png`) | Lead |
| 2026-09-28 | Badge rotation: all client badges (new `CLIENT_BADGES` query, cached once per build in `site.ts`) ship as JSON in `data-cta-badges`; `src/scripts/animations/cta-badges.ts` (first file in that folder, initialized from BaseLayout) fades the 6 client circles every 5s and swaps in the next 6 from a shuffled deck, so every badge shows before any repeats. No JS / reduced motion: first 6 stay static | Lead: "show all badges while rotating" | Lead |
| 2026-09-28 | `CtaBanner`: buttons + trusted badge wrapped in `.c-cta__actions` (column, `width: fit-content`) so both share the badge's width; `.c-cta__buttons` is a grid of equal `1fr` columns (one per button) stretched to that width | Lead: buttons and badge must be the same width | Lead |
| 2026-09-29 | Phase 5 builds every remaining page on one branch (`feat/phase5-secondary-pages`), order Work → Pricing → Service template → Testimonials → Blog decision, lead checkpoint per page | Lead: "we will build the whole site pages on this phase" | Lead |
| 2026-09-29 | Secondary page singletons (`workPage`, `pricingPage`, `testimonialsPage`, `blogPage`) stay SEO-only; all other page content (heroes, pricing plans, FAQs, Work filter tabs) is static in Astro for now | Confirms SCHEMAS v0.5 for Phase 5 | Lead |
| 2026-09-29 | `service` document reinstated for the `/[service]` template (supersedes the 2026-09-25 removal). Its fields are proposed in `SCHEMAS.md` and approved by the lead when the service template starts | Three pages share one template; content for two of them is not designed yet | Lead |
| 2026-09-29 | Blog listing + article are optional in Phase 5: production can launch without a blog (no content yet). Decide at the end of Phase 5, after all other pages, whether to build them or keep them out | Agency has no blog content; other phases may be more urgent | Lead |
| 2026-09-29 | `SectionHeader` gained an optional `accent` prop: the matching substring of `title` is wrapped in `.c-section-header__accent` (`--gradient-primary` clipped to text, `box-decoration-break: clone`). Whitespace in `accent` matches a `\n` break in `title`; no match → plain title | Pricing hero ("that meets your needs.") and service hero ("marketing / ambition") refs | Lead |
| 2026-09-29 | Shared `SegmentedControl` (`src/components/ui/`): `mode="toggle"` (`role="group"` + `aria-pressed`, Work filters) or `mode="tabs"` (`role="tablist"`, FAQ tabs), optional `squares` (Eyebrow corner squares, Work filters only). Tabs behavior in `src/scripts/ui/tabs.ts` → `initTabs(root)` (WAI-ARIA, roving tabindex, hides inactive panels on init) | Work filters and FAQ tabs are the same switcher in the refs | Lead |
| 2026-09-29 | Shared `FaqAccordion`: native `<details name>` + `<summary>` (exclusive, works without JS), border on the question row only, answer below it unbordered, + rotates to × on `[open]` | Matches `FAQs.jpg` | Lead |
| 2026-09-29 | Shared `PricingCard`: CSS subgrid (4 rows: header, price, features, CTA) so prices and buttons line up across cards; parent must be a grid. CTA = full-width `Button is-gradient` + `.js-open-contact`. The lavender glow in the ref is not built | Matches `pricing-cards.jpg`; the glow is only on the outer cards, so it reads as a section background | Lead |
| 2026-09-29 | Shared `PageHero` section (`src/components/sections/`): white hero for secondary pages = `SectionHeader as="h1"` + `titleClass="c-text_xxl"`, optional `accent`, top padding 7.857rem (5rem ≤767), no bottom padding (the next section owns it) | Work hero ref; Pricing / Testimonials / Blog heroes follow the same pattern | Lead |
| 2026-09-29 | `ClientList`: every `<li>` emits `data-category="<category slug>"` (when set) as a filter hook; the stacked-deck overlap now applies only after a visible row (`.c-client-list__item:not([hidden]) ~ .c-client-list__item`) and `[hidden]` rows are `display: none`. Home renders the same | Work filters hide rows; the first visible row must not keep the −14px overlap | Proposed |
| 2026-09-29 | `SegmentedControl mode="tabs"` renders its tablist `hidden`; `initTabs` removes `hidden` on init (cleanup restores it and shows every panel). Toggle mode unchanged | QA G-2: no dead tabs without JS; panels stay visible | Lead |
| 2026-09-29 | Shared `FaqSection` (`src/components/sections/`): props `title`, `groups: { label, value, items: {question, answer}[] }[]`, `jsonLd` (default true), `background` (default true), `id` prefix. 2+ groups → tabs + one `FaqAccordion` per group (`initTabs` in the component script); 1 group → accordion only; empty groups dropped, nothing left → no section. No JS: tablist hidden, every panel shown under an `<h3>` with its group label (hidden once tabs work). Emits FAQPage JSON-LD (answered questions only) | Pricing FAQ now, service template later | Proposed |
| 2026-09-29 | Static page copy that more than one page uses lives in `src/lib/content/` (`our-work.ts` Our Work pinned IDs, shared by Home + Pricing; `faqs.ts` FAQ groups; `pricing.ts` plans) | One place to edit shared copy; Home output unchanged | Proposed |
| 2026-09-29 | Testimonials page grid reuses the shared marquee `TestimonialCard` unchanged; only `.c-testimonial-card { width: 100% }` on that page (scoped in `TestimonialsGrid.astro`). The proposed `fluid` prop was dropped; the shared card is untouched | Lead: "only on this page" | Lead |
| 2026-09-29 | Shared `CtaActions` (`src/components/ui/`): the CTA banner's buttons + "Trusted by" badge with rotating client circles, extracted from `CtaBanner` (same classes and markup; other pages' HTML unchanged apart from scope hashes / CSS chunks). Props `buttons` (Sanity `button[]`), `badges` (URL pool, from `getCtaBadgeUrlsCached()`), `trustedText`, `tone="dark"` (banner) or `"light"` (white bg: white badge, 1px gradient border, gradient text) | Lead: service hero reuses the CTA actions incl. the badge animation | Proposed |
| 2026-09-29 | `SectionHeader` gained optional `titleSegments` (`{ text, accent? }[]`, several gradient runs, e.g. Sanity `accentTitle`; overrides `accent` when set) and `description` now renders `\n` as `<br />`. `PageHero` forwards `titleSegments` and has an optional `top` slot (above the header) and default slot (below it). No change for existing callers | Service titles can mark any spans; process description has a forced break | Proposed |
| 2026-09-29 | Shared `Breadcrumbs` (`src/components/layout/`): `<nav aria-label="Breadcrumb"><ol>`, Eyebrow per level, chevron between, last item `aria-current="page"` with a gradient-border eyebrow; items without `href` are plain text; optional BreadcrumbList JSON-LD (`ld`, absolute URLs) | Service hero ref; reusable for blog posts | Proposed |
| 2026-09-29 | Link → href mapping moved to `src/lib/sanity/links.ts` (`hrefFromLink`); `service` refs map to `/<slug>`, `post` to `/blog/<slug>`; `LINK_INTERNAL_REF` projects `coalesce(title, name)` | One mapping for every Sanity link; `service` added to `link.internalRef` (SCHEMAS v0.6) | Proposed |
| 2026-09-29 | Ref px → rem conversion uses a 14px base, only for new changes and new pages from 2026-09-29 on; existing values are not converted (the lead reviews them in visual QA and asks for specific changes). Fluid root unchanged. Noted in `DESIGN_SYSTEM.md` §1 | One base for the whole site; no mass conversion of built values (G-26) | Lead |
| 2026-09-29 | No trailing slashes site-wide: `trailingSlash: 'never'` in `astro.config.mjs` + `"trailingSlash": false` in `vercel.json` (308 `/work/` → `/work`). The Vercel adapter forces `build.format: 'directory'`, so `Seo` strips the trailing slash from the path for canonical / `og:url` (Home stays `/`) | Internal links and SITEMAP already use `/work`; one URL per page (G-1 / G-21) | Lead |
| 2026-09-29 | `@astrojs/sitemap` added: `sitemap-index.xml` + `sitemap-0.xml`, no trailing slashes, `/dev/*`, `/studio` and `/404` excluded. Needs `site` (`PUBLIC_SITE_URL`): skipped with a build warning until the production domain is set | SEO; lead asked for it with the trailing-slash fix | Lead |
| 2026-09-29 | `ClientList` hover screenshots load on demand: the `<img>` ships with `data-src`; `initClientPreviews` (`src/scripts/ui/client-previews.ts`) sets `src` on every preview of a list on the first pointer entry / focus, only when `(hover: hover)` matches (touch never downloads them). A preview opens only once loaded (`is-loaded`). No JS → no previews | ≈830 KB of screenshots were downloaded with `/work` and never seen on touch (G-4 / G-22) | Lead |
| 2026-09-29 | 404 page uses `Container` (max-width + side padding) with a scoped `.c-notfound__inner` class for its own vertical padding (8rem, 5rem ≤767 `TODO: DS mobile`) | Remove the hardcoded max-width (G-25) | Lead |

### Open questions

#### Content
- **Final copy** — many placeholders in design (Lorem ipsum, XXX+). Final copy needed before content entry. (2026-09-25)
- **`siteSettings` document missing in Sanity** — no document exists, so every siteSettings-driven field falls back (CTA banner uses design copy, footer address uses the hardcoded Barcelona fallback, Seo uses code defaults, no social links). Create and fill it in Studio. (2026-09-28)
- **Client badges are 29×29px** — all 34 badge images are below the ≈64px needed for the 31.68px circles on retina, so they look soft. 22 of 56 clients have no badge (not in the rotation). (2026-09-28)

#### Design team
- **DESIGN_SYSTEM §9 gaps** — see `DESIGN_SYSTEM.md` §9 for the full list of values still missing from the DS. (2026-09-25)
- **Animation spec per section** — pending; sections ship static with `data-anim` hooks. (2026-09-25)
- **Header → content spacing** — Featured Work and Our Work refs both show ≈88px (≈5.5rem) between section header and content; built sections use `margin-top: 3rem`. Confirm the value and apply to all sections at once. (2026-09-28)
- **Section vertical spacing** — §8.1 uses `padding: 5rem 3rem` on `.c-container`. Confirm whether 5rem is the intended section rhythm or if a separate section token is needed. Marked `/* TODO: DS section vertical spacing */` in `utilities.css`. (2026-09-25)
- **Tag specs** — §9 flags this. As of 2026-09-28 `src/components/ui/Tag.astro` mirrors the Eyebrow box (see Decisions, Proposed row). Still marked `/* TODO: DS tag specs */` until confirmed. (2026-09-25)
- **Text color on dark / gradient backgrounds** — §4 assumes `--color-white`; needs confirmation for hero, CTA banner and any gradient-backed surfaces. (2026-09-25)
- **Eyebrow on-dark variant** — the two shipped eyebrow variants (`is-default`, `is-accent`) only read on light backgrounds. CTA banner (gradient bg) needs on-dark colors; currently overridden scoped to `.c-cta`. Consider a third variant `is-on-dark` in the DS, or a per-instance color override contract. (2026-09-25)
- **On-dark surface tokens** — DS has no translucent-white or scrim tokens. `CtaBanner.astro` uses `rgba(255,255,255,α)` literals for the social-proof pill background, border and avatar placeholder, and for the eyebrow on-dark override; `ContactModal.astro` uses `rgba(255,255,255,0.05)` + `blur(12px)` for the `::backdrop` scrim (updated 2026-09-29; was `rgba(0,0,0,0.5)`). Consider adding `--color-white-10`, `--color-white-15`, `--color-white-35`, `--color-white-40`, `--color-white-60`, `--color-white-90`, and `--color-scrim` tokens (or a smaller opinionated set) so these components can drop the literals. (2026-09-25)
- **Hero title gradient stop `#8BC1F9`** — the hero title's text gradient (`HomeHero.astro:168`) ends on `#8BC1F9`, which is not a token. Add it to the DS or map it to an existing token. (2026-09-29)
- **Mobile nav / menu / modal designs** — no dedicated mobile designs provided; built functional with DS tokens. Flagged with `/* TODO: DS mobile */` in each component. (2026-09-25)
- **Client list mobile** — no mobile design; tags drop to a second line under icon + name. `TODO: DS mobile`. (2026-09-28)
- **Button text → icon gap** — 0.5em placeholder in `buttons.css`, `TODO: DS`. (2026-09-28)
- **Testimonial marquee speed** — no spec; 13.2s per card (~37 px/s at 1440) after the lead's −10%. `TODO: DS`. (2026-09-28)
- **Testimonial card sizes** — photo 2.75rem, logo 1.8rem tall, photo → name gap, card gap 1.625rem, row gap 1.375rem are measured from the ref. `TODO: DS`. (2026-09-28)
- ~~**CTA banner social-proof pill**~~ — RESOLVED 2026-09-28: lead spec'd the trusted badge (see Decisions).
- **Trusted badge sizes** — gap text → circles (0.875rem) and circle overlap (0.4rem) measured from the ref. `TODO: DS`. (2026-09-28)
- **Segmented control specs** — measured from the refs, `TODO: DS`: container radius 6px, padding 5px, item gap 10px; item 48px tall (padding 0.934rem 1.714rem), pill radius 5px. Active pill is `#F5F5F5` in the ref, not a token (built with `--color-gray-light` `#F0F0F0`). No hover spec (built: text → `--color-black-secondary`). Corner squares appear on the Work filters but not on the FAQ tabs: intended? (2026-09-29)
- **FAQ accordion specs** — measured, `TODO: DS`: width 960px (68.571rem), row 76px (padding 1.607rem 2.286rem), row gap 0.75rem, radius 6px, icon 12px, answer padding 2.643rem / 2.286rem / 1.857rem. The question rows look slightly see-through over the section line art in the ref (built solid `--color-white`). No motion spec for open/close. (2026-09-29)
- **Pricing card specs** — measured, `TODO: DS`: radius 6px, padding 1.714rem / 1.536rem, description → price 2.5rem, price → features 2.857rem, feature gap 1.143rem, check icon 1.429rem, icon → text 0.714rem. Ref text is `#222222`, not a token (built with `--color-black-secondary` `#212427`). The card button is 50px tall in the ref, the DS button is ≈56px (DS button kept). Lavender glow on cards 1 and 3: a section background asset? Not built. (2026-09-29)
- ~~**Ref px → rem conversion**~~ — RESOLVED 2026-09-29: 14px base for new changes and new pages only; existing values are not converted (see Decisions, `DESIGN_SYSTEM.md` §1).
- **Phase 5 primitives mobile** — no mobile refs. Segmented items wrap and center at ≤767, FAQ rows get less side padding, and the icon is 12px. Pricing cards stack via the caller's grid. `TODO: DS mobile`. (2026-09-29)
- ~~**Client list hover**~~ — RESOLVED 2026-09-28: lead spec'd arrow + screenshot preview (see Decisions). The ref's row lift + row shadow were not requested and are not built.
- ~~**Eyebrow specs**~~ — RESOLVED 2026-09-25 by project lead. Two variants shipped: `is-default` (15px Acumin 400, 10/16/8/16px padding, 0.5px `--color-gray` border, 3px radius, 0.96px tracking, two 10×10 decorative squares on outer edges) and `is-accent` (same box but `--color-accent` border, 8% accent tint bg, 600 weight, no squares). Implemented in `src/components/ui/Eyebrow.astro`; TODO marker removed.
- ~~**Partner-badge assets**~~ — RESOLVED 2026-09-25: artwork landed as PNG in `/public/images/` (see Decisions). Originally: Webflow Partner + Claude Partner Network artwork not delivered; footer used bordered text boxes as placeholders.

#### Lead / CEO
- **White-on-gradient contrast (QA S6)** — lead: leave for now (2026-09-29). Hero stat labels (60% white, 1.67–2.39:1), hero body text at the light end of the gradient (2.29:1) and the hero title's gradient end (1.21:1) fail WCAG AA. Accept for brand, or adjust (darker gradient end, full-opacity labels, text shadow is not allowed). Accent tag text is 4.48:1 (just under 4.5). (2026-09-29)
- **Forms: Vercel endpoint → Make webhook** — waiting CEO confirmation. Contact modal ships UI only. (2026-09-24)
- **Production domain** — required for Sanity CORS allow-list, Adobe Fonts kit whitelist and `PUBLIC_SITE_URL` (Astro `site` → canonical / `og:url`). Lead: configure at the end of development. Until then canonical and `og:url` are omitted on Vercel; do not set `PUBLIC_SITE_URL` to a localhost URL there. (2026-09-25, updated 2026-09-29)
- **Adobe Fonts kit ID** — Acumin Pro `<link>` cannot be added to `BaseLayout.astro` until the kit is provisioned and the ID is provided. Kit must also whitelist localhost + Vercel preview + production domains. Placeholder HTML comment in place. Until then body text renders in the fallback font, so text wraps differ from the refs. (2026-09-25)
- **Figma Dev seat → MCP QA of DESIGN_SYSTEM** — requested. (2026-09-25)
- **Phase 4 nits on components reused by Phase 5** — N5 (`<img>` without width/height in LogoStrip, ClientCard, ClientList, TestimonialCard), N6 (LogoStrip + ClientList render when empty) and N9 (Nav `menu` roles) break the Phase 5 QA rules on every new page that reuses them. Not fixed in the Phase 5 branch until the lead says so. (2026-09-29)
- ~~**404 cleanup**~~ — RESOLVED 2026-09-29: `Container` + scoped vertical padding 8rem; mobile stays `TODO: DS mobile` (see Decisions).

#### Needs lead OK
- **Fixed-field Sanity schemas, no page builder** (2026-09-24)
- **Mobile nav / menu built functional without a design** (2026-09-25)
- **CTA banner eyebrow on-dark override** (2026-09-25)
- **`Tag` mirrors the Eyebrow box** (2026-09-28)
- **`SectionHeader` title `\n` line breaks** (2026-09-28)
- **Client list rows link to `websiteUrl` in a new tab** (2026-09-28)
- ~~**`SectionHeader` `accent` prop**~~ — RESOLVED 2026-09-29: approved by the lead (G-24, see Decisions).
- ~~**`SegmentedControl` + `initTabs`**~~ — RESOLVED 2026-09-29: approved by the lead (G-24, see Decisions).
- ~~**`FaqAccordion` on native `<details name>`**~~ — RESOLVED 2026-09-29: approved by the lead (G-24, see Decisions).
- ~~**`PricingCard` subgrid layout, glow not built**~~ — RESOLVED 2026-09-29: approved by the lead (G-24, see Decisions).
- ~~**`PageHero` shared secondary-page hero**~~ — RESOLVED 2026-09-29: approved by the lead (G-24, see Decisions).
- **`ClientList` `data-category` hook + hidden-row overlap rule** (2026-09-29)
- ~~**`SegmentedControl` tabs render the tablist `hidden` until `initTabs` (G-2)**~~ — RESOLVED 2026-09-29: approved by the lead (G-24, see Decisions).
- **Shared `FaqSection` (tabs, no-JS group headings, FAQPage JSON-LD)** (2026-09-29)
- **Shared static copy in `src/lib/content/`** (2026-09-29)
- **Shared `CtaActions` (CTA buttons + trusted badge) with a light tone** (2026-09-29)
- **`SectionHeader` `titleSegments` + `\n` in description; `PageHero` slots** (2026-09-29)
- **Shared `Breadcrumbs` (eyebrow crumbs, gradient current item, JSON-LD)** (2026-09-29)
- **`hrefFromLink` in `src/lib/sanity/links.ts` (`service` → `/<slug>`)** (2026-09-29)
- ~~**`TestimonialCard` `fluid` variant (grid)**~~ — RESOLVED 2026-09-29: dropped; width 100% on the Testimonials page only (see Decisions).
- ~~**Testimonial marquee pauses on hover / focus**~~ — RESOLVED 2026-09-29: lead removed the pause (see Decisions).

#### Engineering follow-ups
- ~~**Phase 4 final QA should-fix items (S1–S11)**~~ — RESOLVED 2026-09-29: S1–S5 and S7–S11 fixed (see `docs/handoffs/2026-09-29_astro_qa-fixes-nav-services.md` and the Phase 4 handoff). S6 (contrast) deferred by the lead — see Lead / CEO.
- **Mobile menu backdrop click can't close the menu** — `.c-nav__mobile-inner` has `min-height: 100%`, so no click lands on the backdrop. X, Esc and link clicks work. Found while fixing S5. (2026-09-29)
- **QA nits N1–N10** — still open, listed in `docs/handoffs/2026-09-29_qa_phase4-home-final-review.md` (modal copy spacing, duplicate SR output in testimonial rows, reduced-motion rows not keyboard-scrollable, partial badge rotation with 7–11 badges, images without width/height, empty LogoStrip, no Organization JSON-LD fallback, untokenized font sizes, nav menu roles without arrow keys, accent tag 4.48:1). (2026-09-29)
- **`@sanity/astro` upstream fix** — file upstream fix for the Windows path-strip bug (one-line regex `/[\\/]package\.json$/`); remove `benorSanityAliasFix` workaround from `astro.config.mjs` once a fixed release ships. (2026-09-25)
- **TypeScript pin** — revisit `typescript` pin (`^6.0.0`) once Astro supports TS 7 via `@astrojs/ts-content-mapper`. (2026-09-25)
- ~~**Sitemap `/dev/*` exclusion**~~ — RESOLVED 2026-09-29: `@astrojs/sitemap` added with `/dev/*`, `/studio` and `/404` filtered out (see Decisions).
- **No visually-hidden utility** — `WorkListing` scopes its own `.c-work-listing__sr-only` (1px clip pattern) for the hidden h2 and the live region. Request to @ui: add a global `cc-sr-only` utility and switch to it. (2026-09-29)
- **Stale data model in `DESIGN_SYSTEM.md` §10** — still mentions `caseStudy`, `project` and `technology` types that don't exist (Work uses `client`). Needs the lead's OK to edit that file. (2026-09-29)

---

## Home

### Decisions
| Date | Decision | Reason | Status |
|---|---|---|---|
| 2026-09-26 | Services: shadow exception on the active card only (`0 0 20px rgba(0,0,0,0.05)`) | CEO-approved deviation from the DS "no shadows" rule to signal the selected service | Lead |
| 2026-09-26 | Hero on the gradient background with white text; CTAs `is-white` (Get in Touch → contact modal) + `is-glass` (See Our Work → `/work`); title gradient text | Matches `hero.jpg` (resolved part-1 QA note) | Lead |
| 2026-09-26 | LogoStrip: title is a default `Eyebrow` ("trusted by 100+ b2b teams"); every client with a logo, alphabetical, in a full-bleed CSS marquee (right → left, 270s loop, off for reduced motion) | Matches `logos-partners.jpg` (resolved part-1 QA note) | Lead |
| 2026-09-26 | Featured Work: 2 `ClientCard variant="featured"` (Surfe, Puzzle), screenshot + testimonial body in a `1fr / .65fr` grid, second card mirrored; single column ≤991 | Matches `featured-work.jpg` (resolved part-1 QA note) | Lead |
| 2026-09-26 | Services: header centered; left = illustration with the 2 CTAs overlaid at the bottom, right = 3 click-to-activate service cards (`<button aria-pressed>`); active card swaps the illustration (`services.png` / `services-2.png`) and rotates its gradient arrow −25deg. Body copy always visible (not an accordion) | Matches `services.jpg` (resolved part-1 QA notes) | Lead |
| 2026-09-28 | Our Work cards pin 6 clients by `_id` (Surfe, Puzzle, Sprii, Arrows, Garaje de Ideas, SimpleTiger) via `getClientsByIds`; rendered with `ClientCard variant="grid"` using `cardThumbnail` + `logo` + funds/category tags. Logos: `is-compact` (Surfe, Arrows) 1.4rem, others 2.35rem | Same pinning pattern as Featured Work; per-logo sizing set by lead visual QA | Lead |
| 2026-09-28 | Our Work client list: `ClientList` inside `.c-work__list` (flex center, `margin-top: 2.5rem`), `limit={9}`, 9 clients pinned by `_id` (Unit21, DarwinCX, Mashgin, Major Players, HireArt, Resourcify, Userled, Sublime Security, Notable Capital) | Matches `clients-list.png` | Lead |
| 2026-09-28 | Our Work "View All 100+ Projects" CTA: `.c-work__cta` (flex, centered, `margin-top: 2.5em`), `Button is-gradient` → `/work` with a 1.5rem arrow in the `icon` slot | Lead spec | Lead |
| 2026-09-28 | Technologies ships design-only: SectionHeader + static diagram `<img src="/images/home/technologies.svg">` with `data-anim="tech-diagram"` hook. The served SVG is an optimized copy of `docs/refs/technologies-image.svg`: the 29 embedded PNGs (up to 3840 px, displayed ≤ 45 px) re-encoded as WebP, longest side 160 px; vectors, text outlines, pattern transforms untouched. 20.3 MB → 394 KB (192 KB gzip); retina render diff 0.04% of pixels | Animation spec pending from design; a 20 MB image is not shippable | Lead |
| 2026-09-28 | Testimonials: SectionHeader + `TestimonialMarquee` fed by `getTestimonials()`, full-bleed via `margin-inline: calc(50% - 50vw)` with `overflow-x: clip` on the section | Matches `testimonials-component.jpg` | Lead |
| 2026-09-28 | Testimonials background: `docs/refs/testimonials-section-bg.svg` → `/images/home/testimonials-bg.svg` (180 KB vector, no embedded bitmaps), `no-repeat center bottom / cover` on `.c-testimonials` | Lead spec; SVG is 1920×1284 = the section at the 1920 frame | Lead |
| 2026-09-29 | Hero title mobile (≤767): `font-size: var(--fs-text-xxl)` (DS mobile H1, 4rem = 36px; was the fixed 6.286rem ≈ 57px), letter-spacing −0.08rem (scaled) | Lead: reduce hero title on mobile; value taken from the DS mobile type scale | Lead |

### Open questions

#### Content
- **Our Work cards — `fundsRaised` empty on all 6 clients** — the "€XXM RAISED" tag is hidden until the field is filled in Studio. Ref values (€14.5M / €66.5M) look like design placeholders; confirm real amounts per client. (2026-09-28)
- **Our Work cards — Garaje de Ideas thumbnail shows "GARAJE CENTRAL" artwork** — all three source files (`card-garaje-de-ideas.png`, `card-garaje-central.png`, `card-garaje.png`) are the same image; the Figma ref shows "GARAJE DE IDEAS". Need the correct asset. (2026-09-28)
- **Our Work client list data** — `fundsRaised` and `websiteUrl` are empty on all 9 list clients (funds tags hidden, rows not linked). Resourcify has no `icon` (initial fallback shown). Major Players' `icon` is an 87×26 wordmark, not the "M" mark in the ref; DarwinCX (41×22) and Major Players icons are low-res. (2026-09-28)
- **Testimonials content** — all 4 testimonials (Surfe, HireArt, Puzzle, SimpleTiger) are placeholders: same author (Rob Alfano, VP of Digital, Verifone), Lorem ipsum quote, no author photo (initial shown). (2026-09-28)
- ~~**Testimonials section description**~~ — RESOLVED 2026-09-28: "What marketing leaders say after launch day, and months into working together."

#### Design team
- **Our Work card interaction** — no hover/link spec for Our Work cards (DS §10 says "Hover"); built static. (2026-09-28)
- **Technologies animation spec** — pending from design. The diagram is one flat SVG (labels are outlined paths, no `<text>`), so an animated version (DS §10: capability marquee, connector lines) will likely need the parts delivered separately (category cards, centre mark, lines, capability pills) or rebuilt in HTML. (2026-09-28)
- **Technologies mobile** — no mobile design; the diagram scales with the container and its labels are ≈3 px tall at 375 px. Needs a mobile layout (stacked cards / marquee) or a mobile-specific asset. `TODO: DS mobile`. (2026-09-28)
- ~~**Testimonials background**~~ — RESOLVED 2026-09-28: lead delivered `testimonials-section-bg.svg` (see Decisions).
- ~~**Our Work logo optical sizing**~~ — RESOLVED 2026-09-28: lead set per-logo sizes (`is-compact` for Surfe + Arrows, see Decisions).

#### Engineering follow-ups
- **Technologies asset pipeline** — future exports of this diagram should come with bitmaps at ≤ 2–3× display size (or be run through the same WebP downscale) before landing in `public/`. (2026-09-28)

---

## Service pages

### Decisions
| Date | Decision | Reason | Status |
|---|---|---|---|
| 2026-09-29 | `service` fields (SCHEMAS v0.6), one Studio tab per page section: Overview (`name`, `slug`, `clients[]` → `client`), Hero (`headline`, `subtitle`), Problem (`problemTitle`, `problemDescription`), Process (`processTitle`, `processDescription`, `steps[]` of `processStep` = name, description, features[] tags, image + alt), FAQs (`faqSections`), SEO (`seo`). `slug` added for routing (from `name`, unique, kebab-case, reserved slugs blocked) | Lead-approved field list; three service pages share one template | Lead |
| 2026-09-29 | Service FAQs reuse the existing `faqSections[]` → `faqSection` → `faq` objects (same as `post`); section title = tab label. No new FAQ type | Lead decision v0.4 (sections contain their questions) | Lead |
| 2026-09-29 | Gradient words in service titles come from a reusable `accentTitle` type: one Portable Text block, style `normal`, no lists/annotations, one decorator `accent` ("Gradient"). Line breaks = Shift+Enter (`\n` in span text) | Editors choose which words get the gradient without a separate "accent" text field that can drift from the title | Lead |
| 2026-09-29 | Process step number = the step's position in `steps[]` (01, 02… in creation order, drag to reorder). No position field | Nothing to keep in sync; reordering renumbers automatically | Lead |
| 2026-09-29 | Seed only the Custom Websites & Migrations service (`_id` `service-custom-websites-migrations`). Growth and Ongoing Website Support documents are not created until their content exists | Only that page has a ref | Lead |
| 2026-09-29 | Keep the `slug` field on `service` (PHASE5 S-8) | Routing needs it | Lead |
| 2026-09-29 | Related clients on Custom Websites & Migrations: any selection for now, 7 clients (the 5 seeded + Emotional Hub, Garaje de Ideas), all with `websiteScreenshot` | Lead: "doesn't matter what to select for now"; final list later | Lead |
| 2026-09-29 | Process steps 02–09 get placeholder names, descriptions and features (`TODO: COPY`, written by the sanity agent); all 9 steps use the lead's `service-step.svg` as a placeholder illustration (`TODO: assets`) | Lead: "placeholder copy for now"; unblocks the 9-tab Process build | Lead |
| 2026-09-29 | Growth and Ongoing Website Support documents stay uncreated; make the one service work first | Lead decision | Lead |
| 2026-09-29 | Service template `src/pages/[service].astro` (`getStaticPaths` from `SERVICE_SLUGS`): ServiceHero → LogoStrip → ServiceProblem → ServiceProcess → OurWork (Home pins) → Testimonials → FaqSection → CTA banner (BaseLayout). Meta fallback title = `name`, description = `subtitle` clamped to 160 chars | Lead brief: 3 custom sections, the rest reused | Proposed |
| 2026-09-29 | Service hero breadcrumb "Services" › name: "Services" is plain text (no index page); BreadcrumbList JSON-LD lists only levels with a page (Home → service), because Google needs a URL on every level | Lead brief; valid structured data | Proposed |
| 2026-09-29 | Hero line art `service-mid-hero-bg.svg` sits behind the hero bottom + logo strip (one wrapper, anchored to the strip bottom at the 1920 frame width); exported as 1x/2x WebP on white (347 KB SVG / 110 KB gzip → 26 KB / 77 KB); the logo strip is transparent on this page only | Matches the preview; lighter than the SVG | Proposed |
| 2026-09-29 | Problem carousels: 4+ related clients are split between the columns (left = first half); 1–3 clients → both columns show all of them (right rotated, `aria-hidden`). Each copy repeats until ≥4 images so the loop never gaps; ≈20s per image (left 80s, right 120s with 7 clients, same speed). Hidden ≤991px | Lead brief; ref shows different sites per column | Proposed |
| 2026-09-29 | Process tabs are a custom tablist (numbered gradient squares, not `SegmentedControl`) wired by the shared `initTabs`; no JS → tablist hidden, all panels in order with "NN Name" h3. ≤767 the bar wraps to squares only (name in the panel h3) | Ref tab design differs from the segmented pill; G-2 no-JS rule | Proposed |
| 2026-09-29 | Service FAQ answers (Portable Text) are flattened to plain paragraphs for `FaqAccordion` + JSON-LD; bold / italic / links are dropped. `FaqAccordion` and Pricing unchanged | Seeded answers are plain; no PT renderer installed | Proposed |

### Open questions

#### Content
- ~~**Process steps 02–09**~~ — RESOLVED 2026-09-29: placeholder copy for now; steps 02–09 have placeholder names/descriptions/features (`TODO: COPY`) and all 9 steps use `service-step.svg` as a placeholder illustration (`TODO: assets`). Final copy and per-step illustrations still to come (see Decisions).
- ~~**Growth + Ongoing Support content**~~ — RESOLVED 2026-09-29: not now; make the one service work first. Their documents and routes stay uncreated (see Decisions).
- **Problem section side images** — the side columns are cropped in `services-problem.jpg`; the full image list is unknown. (2026-09-29)
- ~~**Related clients (seed guess)**~~ — RESOLVED 2026-09-29: any selection for now; 2 added (Emotional Hub, Garaje de Ideas) → 7 clients, all with `websiteScreenshot`. Placeholder selection (see Decisions).
- **Service FAQs placeholder** — the seeded service copies the Pricing placeholder FAQ groups into Sanity; `TODO: COPY` until final copy (PHASE5 S-6). (2026-09-29)

#### Design team
- **Growth service name** — three spellings: nav/footer "Growth (AEO / SEO / CRO)", pricing "Growth (AEO/GEO + CRO)", Home "Web Growth (SEO + GEO + CRO)". Which one is correct? (2026-09-29)
- ~~**Hero line art**~~ — RESOLVED 2026-09-29: the lead supplied `service-mid-hero-bg.svg` (a different asset); placed behind the hero bottom + logo strip (see Decisions).
- **Mobile / tablet** — no mobile refs; built with DS tokens, `TODO: DS mobile`. (2026-09-29)
- **Service template spacing / sizes (`TODO: DS`)** — measured at 1/14 rem: hero bottom 7.857rem, subtitle → buttons ≈40px, Problem padding 14.286rem (200px), frame 71.857rem, line → screenshot gap 3.929rem, screenshot width 32.369rem (453.172px), gap 1.786rem, node 1.339rem; Process top 7.857rem, bottom 6.429rem, description → box 4.786rem, box padding 1.5rem, bar padding 1.786rem, squares 4.571rem, image 33.143rem, pills 0.571rem gap. See PHASE5 S-23. (2026-09-29)
- **Title sizes** — Problem / Process titles (≈71px at 1920) and the step h3 (≈40px) are larger than `c-text_xl` / `c-text_l`, same as W-10 / G-26; built with the existing classes. (2026-09-29)
- **Breadcrumb current item + badge on light** — gradient-border eyebrow with blue squares and the white trusted badge with gradient border/text are read from `services-hero.jpg`; no DS spec (scoped overrides). (2026-09-29)
- **Feature pills** — sentence case with a gray outline in the ref; the shared `Tag` is uppercase, so the pills are scoped in `ServiceProcess`. DS pill / Tag variant? (2026-09-29)
- **Problem carousels below 1920** — the layout is fixed around the center (1920 frame), so at 1440 each side shows ≈160px of a 453px screenshot; hidden ≤991. Confirm the intended behavior at 1440 and on mobile. (2026-09-29)
- **Carousel speed / animation spec** — ≈20s per screenshot, linear, CSS; no spec. (2026-09-29)

#### Needs lead OK
- **Service template structure + meta fallbacks** (2026-09-29)
- **Breadcrumb: "Services" as text, JSON-LD Home → service** (2026-09-29)
- **Hero line art placement + WebP export** (2026-09-29)
- **Problem carousels: column split, repeat rule, speed, hidden ≤991** (2026-09-29)
- **Process tabs markup + no-JS / mobile behavior** (2026-09-29)
- **FAQ answers flattened to plain text** (2026-09-29)

#### Engineering follow-ups
- ~~**accentTitle → SectionHeader**~~ — RESOLVED 2026-09-29: `SectionHeader` / `PageHero` take `titleSegments` built by `accentTitleSegments()` (`src/lib/sanity/portable-text.ts`); every accent run renders, no substring match (see Global Decisions).
- ~~**Step illustration is an SVG asset**~~ — RESOLVED 2026-09-29: `ServiceProcess` serves `-svg` assets as the plain asset URL (`isSvgAsset()` in `src/lib/sanity/image.ts`), raster assets with width/format params.
- **FAQ rich text** — service FAQ answers lose bold / italic / links (plain paragraphs). If editors need them, add a Portable Text renderer and an optional rich answer to `FaqAccordion`. (2026-09-29)
- **BreadcrumbList URLs** — built from `siteSettings.siteUrl`, else Astro `site` (`PUBLIC_SITE_URL`); the local build resolves to `http://localhost:4321`. Set the production URL before launch (same source as the canonical). (2026-09-29)

---

## Work

### Decisions
| Date | Decision | Reason | Status |
|---|---|---|---|
| 2026-09-29 | Page = `PageHero` (Our Work / "Websites we've launched." / description) → `WorkListing` (filters + every client in `ClientList`) → `Testimonials` → CTA banner (BaseLayout). All copy static; Sanity = clients, testimonials, `workPage.seo` (`getPageSeo("workPage")`, null → props fallback "Our Work" + hero description) | `work-preview.png`; SEO-only singleton (Lead 2026-09-29) | Proposed |
| 2026-09-29 | Listing data = new `ALL_CLIENTS` / `getAllClients()`: every published client with a `name`, ordered `category->title asc, name asc`, projection shared with `CLIENTS_BY_IDS` via the `CLIENT_LIST_FIELDS` fragment | New clients appear without code changes | Proposed |
| 2026-09-29 | Filters = 4 toggle buttons as in `work-list.jpg` (View All · Professional Services · SaaS / B2B Tech · Agency) with a static tab → category-slug map in `WorkListing.astro`. Filter bar is `hidden` until the script runs (no JS: every row, no dead buttons); a tab with 0 matches is dropped at build; visually hidden `role="status"` announces "Showing N of M projects" | Progressive enhancement; ref shows one "SaaS / B2B Tech" tab | Proposed |

### Open questions

#### Content
- **`workPage` document missing in Sanity** — no document yet, so the page uses the fallback meta title "Our Work" and the hero description as meta description (`TODO: COPY`). Create it in Studio to override. (2026-09-29)
- **Hidden copy** — visually hidden section heading "All projects" and the live-region text "Showing {shown} of {total} projects" are placeholders (`TODO: COPY`). (2026-09-29)

#### Needs lead OK
- **List order** — default: every client, sorted by category then name (new clients appear automatically). Alternative: a pinned order matching `work-list.jpg`. (2026-09-29)
- **Filter tab → category mapping** — proposed: Professional Services = `professional-services`, SaaS / B2B Tech = `saas` + `saas-b2b-tech`, Agency = `agency`; View All = every client. Current data: 6 / 12 / 2 of 56. (2026-09-29)
- **Work page structure, `ALL_CLIENTS` query, filter behavior** — see the three Proposed rows above. (2026-09-29)

#### Design team
- **Mobile / tablet** — no mobile refs; built with DS tokens, `TODO: DS mobile`. (2026-09-29)
- **Hero and listing spacing** — measured from the 1920 ref at 1/14 rem, `TODO: DS`: nav → eyebrow 7.857rem (110px), hero description → filters 8.286rem (116px), filters → first row 4rem (56px). Mobile: 5rem / 5rem / 3rem, `TODO: DS mobile`. (2026-09-29)
- **Hero type sizes** — ref title ≈ 91px (6.5rem at 1/14) and description ≈ 24px (between `c-paragraph_m` and `c-paragraph_l`). Built with the closest classes, `c-text_xxl` and `c-paragraph_m` (SectionHeader default). Depends on the Global "ref px → rem" question. (2026-09-29)

---

## Testimonials

### Decisions
| Date | Decision | Reason | Status |
|---|---|---|---|
| 2026-09-29 | Page = `PageHero` (Testimonials / "Hear from our more than 100 happy clients." with accent "100 happy clients.") → `TestimonialsGrid` (every published testimonial once, `TestimonialCard` with `width: 100%` on this page, 3 / 2 ≤991 / 1 ≤767 columns, visually hidden `<h2>`) → CTA banner (BaseLayout). All copy static; Sanity = testimonials + `testimonialsPage.seo` (null → fallback title "Testimonials" + 146-char description) | `testimonials-preview.png`; SEO-only singleton (Lead 2026-09-29) | Proposed |
| 2026-09-29 | No placeholder duplicates: the ref's 15 identical cards are filler, the grid renders the 4 published testimonials once. Plain white background (no line art behind the grid in the ref) | Lead brief | Proposed |
| 2026-09-29 | No Review / AggregateRating JSON-LD on the page | Google ignores self-serving reviews (an organization's reviews of itself on its own site) | Proposed |

### Open questions

#### Content
- **Testimonials content** — only 4 testimonials exist and all are placeholders (same author, Lorem ipsum quote, no photo); the ref shows 15 cards. The page fills up as testimonials are published. (2026-09-29)
- **`testimonialsPage` document missing in Sanity** — fallback meta title "Testimonials" and description "Hear from our more than 100 happy clients: what B2B marketing leaders say about working with BenorMedia on their websites, from launch day onward." (`TODO: COPY`). (2026-09-29)
- **Hidden heading** — visually hidden `<h2>` "Client testimonials" above the grid is a placeholder (`TODO: COPY`). (2026-09-29)

#### Design team
- ~~**Page refs**~~ — RESOLVED 2026-09-29: refs landed in `docs/refs/testimonials/` (`testimonials-hero.jpg`, `testimonials-grid.jpg`, `testimonials-preview.png`).
- **Grid spacing** — measured from the 1920 ref at 1/14 rem, `TODO: DS`: hero title ink → first card 112px (7.286rem below the h1 line box), card gap 1.429rem (20px, columns and rows), last card → CTA banner 15.714rem (220px). Mobile guesses 5rem / 5rem. (2026-09-29)
- **Card size in the grid** — the ref card is 544 × 369px = the marquee card at 1/16 rem (34rem × 23.03rem), while the page uses 1/14 rem (see Global "ref px → rem"). In the 1440 container the fluid cards are 397 × 322px (3 columns). (2026-09-29)
- **Mobile / tablet** — no refs; 2 columns at ≤991, 1 column at ≤767, `TODO: DS mobile`. At 767 the single-column cards are 731px wide with the 23.03rem min-height, so there's a large gap between quote and author; at 375 the hero title wraps "clients." to a 3rd line. (2026-09-29)

#### Needs lead OK
- **Testimonials page structure, no filler cards, no Review JSON-LD** — see the three Proposed rows above. (2026-09-29)

---

## Pricing

### Decisions
| Date | Decision | Reason | Status |
|---|---|---|---|
| 2026-09-29 | Page = `PageHero` (Pricing / "Simple and transparent\npricing that meets your needs." with accent "that meets your needs.") → `PricingPlans` (3 `PricingCard`s) → `LogoStrip` → `FaqSection` → `Testimonials` → `OurWork` (same clients as Home) → CTA banner (BaseLayout). All copy static; Sanity = logos, testimonials, Our Work clients, `pricingPage.seo` (null → fallback title "Pricing" + 156-char description) | `pricing-preview.png`; SEO-only singleton (Lead 2026-09-29) | Proposed |
| 2026-09-29 | Plan copy transcribed verbatim from `pricing-cards.jpg` into `src/lib/content/pricing.ts`; cards are direct children of a `repeat(3, 1fr)` grid (1 column ≤991) with a visually hidden `<h2>` "Plans" | Subgrid alignment contract (ui handoff) | Proposed |
| 2026-09-29 | FAQ answers and the whole AEO tab are generated placeholder copy (lead request), based only on facts on the pricing cards; `TODO: COPY` at the top of `src/lib/content/faqs.ts` and per group. The FAQPage JSON-LD ships the same placeholder text until replaced | Ref has questions only for one tab and one lorem answer | Proposed |
| 2026-09-29 | FAQ background = `faqs-bg.png` flattened on white and exported as WebP: `public/images/pricing/faqs-bg.webp` (1920 wide, 21 KB) + `faqs-bg@2x.webp` (3840 wide, 55 KB) via `image-set()`, `cover`, anchored center bottom (source 7680×4140 PNG, 4.6 MB, untouched) | The export is the whole 1920×1035 section at 4x; alpha maxed at 62%, so flattening on the white section bg loses nothing | Proposed |

### Open questions

#### Content
- **FAQ copy** — only the "Web Design And Development" questions are shown, with one lorem answer; the "Answer Engine Optimization (AEO)" tab and 4 of 5 answers are missing. Built with generated placeholder answers and 5 placeholder AEO questions (`TODO: COPY`, `src/lib/content/faqs.ts`). (2026-09-29)
- **`pricingPage` document missing in Sanity** — fallback meta title "Pricing" and description "Simple, transparent pricing for B2B websites: monthly design and development, AEO/GEO growth plans, or one-off projects. Unlimited requests, cancel anytime." (`TODO: COPY`). (2026-09-29)
- **Plan name** — the card says "Growth (AEO/GEO + CRO)", the nav / footer say "Growth (AEO / SEO / CRO)". Built as the card ref. Which is right? (2026-09-29)
- **Hidden heading** — visually hidden `<h2>` "Plans" above the cards is a placeholder (`TODO: COPY`). (2026-09-29)

#### Design team
- ~~**FAQ background asset**~~ — RESOLVED 2026-09-29: web export produced from the PNG (see Decisions). An SVG from design would still be sharper and lighter.
- **Mobile / tablet** — no mobile refs; built with DS tokens, `TODO: DS mobile`. At ≤991 the cards stack full width (811px at 991: lots of empty space); the FAQ globe shows only as a faint crop on phones. (2026-09-29)
- **Pricing section background** — the ref shows faint line-art arcs left and right of the cards plus the lavender glow on cards 1 and 3. No asset delivered; not built. (2026-09-29)
- **Spacing** — measured from the 1920 ref at 1/14 rem, `TODO: DS`: hero title → cards 7.357rem (103px), cards → logo strip 4.357rem (61px), card gap 1.071rem (15px), logo strip → FAQ title and last FAQ row → section end 8.571rem (120px), title → tabs 1.714rem (24px), tabs → first row 3.5rem (49px). Mobile guesses 5rem / 3rem. (2026-09-29)
- **FAQ title size** — ref ≈ 60px at the 1920 frame, `c-text_xl` is 54.7px (SectionHeader default kept). (2026-09-29)
- **Card width at 1440** — the ref cards are 441px wide at 1920 (1680px content); with the 1440px container they are 400px, so "Growth (AEO/GEO + CRO)" wraps to 2 lines and descriptions to 3–4 lines. Subgrid keeps prices and buttons aligned. (2026-09-29)
- **FAQ default state** — the ref shows the second question open; built all closed (FaqAccordion default). (2026-09-29)

#### Needs lead OK
- **Pricing page structure, plans data, placeholder FAQ copy, FAQ background export** — see the four Proposed rows above. (2026-09-29)

---

## Blog

### Decisions
| Date | Decision | Reason | Status |
|---|---|---|---|

### Open questions

#### Lead / CEO
- **Build or keep out** — optional page (see Global Decisions 2026-09-29). Decide at the end of Phase 5. If it stays out, hide the footer "Blog" link. The article page has no refs. (2026-09-29)
