# Content refresh 2026-11-16: blockers and issues found in discovery

Prepared by Claude Code on November 17, 2026, after running section 0.3 (discovery) of `content-refresh-brief-2026-11-16.md` against the repo. Production is at commit `5c905b8`, which is the repo state checked here. Nothing has been changed or committed yet.

Use this file to rewrite the brief. Five items block execution under the brief's own STOP rules (section 1). The rest are corrections to facts the brief assumes about the repo (section 2) and smaller points the rewrite should settle (section 3).

## 1. Blockers

### B1. Tasks 3 and 4: both page files fail `pages:check` (STOP rule 4)

`pnpm run pages:check` gives 10 failures on `custom-websites-migrations.md` and 9 on `growth.md`. All of them are front matter; none are in the copy. The brief's file format differs from the format the content pack expects.

| Field | Brief writes | Pack expects |
|---|---|---|
| `reviewEvery` | `90 days` | `90` (a whole number of days) |
| `author` | `"BenorMedia team"` | not allowed on service pages ("a service page shows no byline"); remove it |
| `breadcrumb` items | `name` + `path` | `name` + `url` |
| `service` | a string, e.g. `"Webflow design and development"` | an object with `name` and `serviceType` |
| `related` | URLs, e.g. `/webflow-migration` | slugs, e.g. `webflow-migration` (`/pricing` stays a path because it isn't a pack page) |
| `inbound` items | `page`, `anchor`, `sentence` | `from`, `anchor`, `where` (the `where` value reads `"one sentence: <the sentence>"`) |

Working example, from `content-pack/content/ongoing-website-support.md` (a released service page):

```yaml
reviewEvery: 90
service:
  name: Webflow maintenance and support
  serviceType: Webflow website maintenance and support
breadcrumb:
  - name: "Home"
    url: /
  - name: "Webflow maintenance services"
    url: /ongoing-website-support
related:
  - white-label-webflow-development
  - webflow-seo-agency
  - website-redesign
  - /pricing
inbound:
  - from: /blog/website-maintenance-checklist
    anchor: "Webflow maintenance services"
    where: "one sentence: If you'd rather hand this checklist to a team, see our Webflow maintenance services."
```

**The rewrite needs:** both page files in this format, with a `serviceType` for each page (it goes into the Service JSON-LD, so it counts as schema copy). Leave out `author`.

Warnings only (they don't block): the bodies run 2,164 words (/custom-websites-migrations) and 1,700 words (/growth) against the checker's 650 to 1,200 range for service pages.

### B2. Task 1B.3: the "project grid" doesn't exist (STOP rule 1)

The brief says to insert a paragraph "directly under the H2, before the project grid". The section on /webflow-enterprise-agency has no grid. Its current source text (`content-pack/content/webflow-enterprise-agency.md`, from line 169) is:

```markdown
## Larger companies on our work page

JOOR, tagged Fashion with $107.5M raised as shown on our [work page](/work), has been a direct client for more than 3 years. Other larger names listed there include:

- **Novo**, finance, has raised $295.5M.
- **Sublime Security**, cybersecurity, has raised $150.0M.
- **Unit21**, cybersecurity, has raised $92.0M.
- **Sama**, data, has raised $85.0M.
- **Subject**, e-learning, has raised $74.5M.
- **Mashgin**, retail, has raised $73.7M.

The amounts show what each company has raised, not results of our work.

Our largest build runs to more than 1,000 pages and CMS items across 4 locales.
```

Putting the new paragraph above this would state the JOOR facts twice ("more than three years" and "more than 3 years"). The new paragraph's second sentence ("The companies below run marketing sites with several editors, regions, or review steps.") also introduces a list of funding amounts, not a grid of sites.

Also note: this section carries currency amounts ($107.5M and so on) on a service page, which the brief's house rule forbids. They're live today.

**The rewrite needs:** the exact replacement for this section. Options: replace only the first paragraph, replace the whole section, or drop 1B.3.

### B3. Task 4B: /pricing already has an FAQ, hidden, with live FAQPage schema

The brief says /pricing "has no FAQ today". In fact, `src/pages/pricing.astro` already renders a `FaqSection` with the `hidden` attribute ("FAQs hidden for now (lead 2026-09-30)"). It holds 10 placeholder questions from `src/lib/content/faqs.ts`, in two tabs: "Web Design And Development" (5) and "Answer Engine Optimization (AEO)" (5). The page also outputs FAQPage JSON-LD for those 10 hidden questions today.

The current order on /pricing is: hero, plan cards, logo strip, (hidden FAQ), testimonials, Our Work, then the global CTA banner. So "after the plan cards and before the closing call to action" covers three possible slots.

Two technical constraints:

- **Links in answers.** `FaqSection`, the component /pricing uses, renders answers as plain text. The links in answers 8, 9, and 10 wouldn't work. The content-pack service pages use a different component (`NpFaq`) that does render links.
- **Two FAQPage blocks.** Adding the new FAQ without removing the hidden one would put two FAQPage schema blocks on the page, one of them for hidden content.

**The rewrite needs:** to say whether the 10 new items replace the hidden placeholders (and whether the placeholder data is deleted, which needs Sergio's explicit OK under hard rule 4). It also needs the exact slot, and which component to use (`NpFaq`, or a change to the shared `FaqSection` so it can render links).

### B4. Quick fix Q3: the cause is a shared loader, and it affects 57 pages (STOP rule 3)

The duplicate intro isn't limited to the 8 posts listed. It's on 57 of the 59 articles: every blog post and guide except `/blog/webflow-source` and `/blog/headless-cms-comparison`.

Cause: `src/lib/new-pages/loader.ts`, lines 513 to 516, added in commit `704485e` (October 28, 2026). A post's `heroLead` setting decides how many intro paragraphs go in the header. When it's missing (only those two posts set it), `slice(undefined)` returns every paragraph, so the whole intro prints in the header and again at the top of the body.

Proposed one-line fix (no copy changes, no files deleted):

```diff
-    intro: rendered.lead
-      .slice(heroLead)
+    intro: (heroLead === undefined ? [] : rendered.lead.slice(heroLead))
```

**The rewrite needs:** Sergio's approval of this diff. It changes the rendered output of 57 pages; Claude Code would not change their dates. Block 2.2's "Template check" note (delete the second copy of the lead) becomes unnecessary: the fix handles it.

### B5. Internal links written as absolute URLs (tasks 1A, 1B, 2)

The brief writes internal links as `https://www.benormedia.com/...` (for example `[Webflow pricing guide](https://www.benormedia.com/blog/webflow-price-increase)`). The site's link resolver (`src/lib/new-pages/links.ts`) treats any `https://` link as external: it renders with `target="_blank" rel="noopener"`, opens in a new tab, and bypasses the draft and planned-page checks.

The repo writes internal links as `/path` or `page:<slug>`.

**The rewrite needs:** every internal link as a relative path (for example `/blog/webflow-price-increase`, `/guides/webflow-enterprise`). Affected blocks: 1A.2 (paragraph after the table), 1A.6, 1B.1, 2.4 (Team and Enterprise section), 2.11 (inbound sentence on /guides/website-redesign-cost). Source URLs to benormedia.com in a Sources list (6's `BenorMedia: Testimonials`) can stay absolute.

## 2. Corrections to what the brief assumes

| Item | Brief says | Repo shows |
|---|---|---|
| Where copy lives | Some pages might be in Sanity | All pages in tasks 1A to 7 and Q1 to Q11 are in the repo. Blog posts: `content-drafts/blog/blog-*.md`. Guides and the new service pages: `content-pack/content/*.md`. /pricing: `src/pages/pricing.astro` + `src/lib/content/faqs.ts`. /guides meta: `src/lib/content/seo.ts`. Byline: `src/lib/new-pages/authors.ts` + each post's `author:` line |
| Legacy /growth and /custom-websites-migrations | — | Sanity `service` documents, served by `src/pages/[service].astro`. A content-pack file at the same URL replaces them (same mechanism as the /ongoing-website-support rebuild) |
| Q2 "Professional Partner" | Found on /guides/webflow-vs-custom-code and possibly two other pages | Zero hits in the built site. Only internal docs, outlines, registers, and the checkers' banned-word lists still contain it. Already fixed: no commit |
| Q3 duplicate intro | 8 posts | 57 of 59 articles (see B4) |
| Q8 /blog/website-architecture-seo meta | 164 characters | 160 characters: "Website architecture SEO for B2B SaaS: which pages to build, how to plan URLs and internal links, how to fix a messy structure, and what a real site looks like." |
| 7.1 /blog/webflow-mcp head | Change "MCP 2.0" if present | Neither says it. Title (59): "Webflow MCP: What to Allow on a Marketing Site \| BenorMedia". Meta (155): "The Webflow MCP server lets AI tools edit, publish, and delete on your site. What each action does, what to allow or block, and a review policy that works." Nothing to change |
| Q7 /guides current meta | Names 4 of the 6 guides | Confirmed (155): "In-depth BenorMedia guides for B2B SaaS teams: WordPress to Webflow migration, Webflow Enterprise, the pages a SaaS site needs, and Webflow vs custom code." New meta verified at 153 characters |
| Q10 testimonial twice | Possibly renders twice | One testimonial section per page. The slider (`src/components/ui/TestimonialSlider.astro`) repeats its cards to fill an infinite loop, so a text import sees 13 quotes twice. The repeated cards aren't `aria-hidden`. Report only, as the brief says |
| 2.11 inbound on /guides/website-redesign-cost | Paragraph quoting "15 or 25 dollars a month billed yearly" | That paragraph says "$15 or $25 a month billed yearly" (body line 153; the same figure is also in an FAQ answer). The paragraph exists once in the body, so the sentence can go there |
| 1A.5 sentence | Plain text | In the source, "guide to choosing a Webflow agency" is a link to a planned page (`page:how-to-choose-a-webflow-agency`) that renders as plain text. The replacement drops it, as intended |
| Q4b sentence | Plain text | In the source, "Stack Overflow's 2025 survey" links to https://survey.stackoverflow.co/2025/ai. The replacement has no link, and the old source "Stack Overflow, 2025 Developer Survey: AI" stays in the source list with nothing citing it. Say whether to remove it |
| Q9 byline | Change "General Manager" to "Managing Director" | `authors.ts` line 28 notes "lead 2026-11-03 (was Managing Director)", so this reverses a November 3 decision. The role shown comes from each post's `author:` line: 46 blog posts and 4 guides say "General Manager" (`webflow-enterprise`, `webflow-vs-custom-code`, `wordpress-to-webflow-migration`, `b2b-saas-website-pages`, written "General Manager, BenorMedia"). Two guides already say "Managing Director" (`webflow-vs-wordpress`, `website-redesign-cost`). `authors.ts` also says "General Manager" in `jobTitle`, `description`, and the bio |
| 2 keyword map | Move "webflow pricing" and "webflow enterprise pricing" to this post | `content-pack/data/keyword-map.csv` has "webflow pricing" and "webflow plans" with Target page "Pricing guide". "webflow enterprise pricing" isn't in the map. `content-pack/data/plan.json` still plans a guide `webflow-pricing` at `/guides/webflow-pricing`, and `webflow-enterprise.md` links to it twice (both links are replaced by 1A copy). Say whether to remove the plan entry (a deletion, which needs Sergio's OK) or leave it |

## 3. Smaller points for the rewrite to settle

- **Ship date.** The brief says "set `updatedAt` and `dateModified` to the ship date" without giving one. The new pages use `publishedAt: 2026-11-23`. Give one date for the refreshed pages.
- **`LASTMOD`.** Repo rules require updating `LASTMOD` in `astro.config.mjs` for every new or changed page. The brief doesn't mention it; Claude Code will do it unless told otherwise.
- **Links to the rebuilt URLs while they're drafts.** Once the two draft pack files exist, links to /growth and /custom-websites-migrations from 37 other pack pages and posts render as plain text in production builds until release. The legacy Sanity pages still exist at those URLs, but the resolver sees the draft pack page first. The same applies to the new inbound links in 3.2, 4.2, and 6.9. The links come back when `draft` flips. 4B's links (in a TypeScript file, not the resolver) would link to the legacy pages.
- **Q5 rate-limit rows.** Still naming the retired CMS and Business plans: `/blog/programmatic-seo-webflow` (FAQ answer, table row at line 201) and `/blog/webflow-cms-api` (FAQ answer, body line 120, table row line 126). For a later brief, as asked.
- **Q5 sentence.** The one body sentence (line 187) reads correctly after the exact replacement: "...and sites in agency or freelancer workspaces, or on pricing from 2022 or earlier, at their first renewal or billable change on or after November 16, 2026."
- **H2 periods.** The brief quotes service-page H2s with a final period (for example "Larger companies on our work page."). The source files have no period; the template adds it. Not a problem, but quote H2s without the period to match the source.
- **1B "dedicated pod" note.** Confirmed: the phrase is still on /webflow-enterprise-agency (once).
- **Pages:check baseline.** Before the two new files, `pages:check` passes with 0 failures. The 19 failures are all from B1.
