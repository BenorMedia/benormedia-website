# SEO/GEO implementation report (2026-11-09)

Brief: `docs/seo-geo-implementation-brief-2026-11-09.md`. Tasks T1 to T6 and T8 are done. T7 (release) waits for Sergio's sign-off on each new page.

- **Branch:** `seo/geo-implementation-2026-11`, from `bb1ad26`, the commit live in production on 2026-11-09. `origin/dev` doesn't contain that commit yet.
- **Pull request:** https://github.com/BenorMedia/benormedia-website/pull/111 (into `dev`)
- **Preview:** the Vercel preview linked from the pull request

## Commits

| Commit | Task |
| --- | --- |
| `9d342e2` docs(seo): add the SEO/GEO implementation brief | setup |
| `a2069be` fix(seo): correct the Webflow partner claim | T1 |
| `cf0f2ca` feat(nav): list every service page in the Services menu | T2 |
| `5e9f127` fix(seo): keep AEO wording on /aeo-agency | T3 |
| `f28eea8` content(blog): add internal links to under-linked posts | T4 |
| `3b1ff27` content(blog): refresh headless-cms-comparison | T5.1 |
| `4ecc14f` content(blog): refresh website-maintenance-checklist | T5.2 |
| `e6eb4a1` content(blog): refresh astro-cms | T5.3 |
| `78fbe44` content(blog): refresh saas-website-redesign | T5.4 |
| `a0b50e3` content(blog): refresh track-brand-mentions-in-chatgpt | T5.5 |
| `e60f9c6` feat(pages): add three draft pages | T6 |
| `fc056d5` fix(blog): open headless-cms-comparison's body with the at-a-glance table | T5.1 fix |

## Decisions Sergio needs to make

1. **Third-party prices block the new guides' release.** `scripts/check-new-pages.mjs` check 10 fails on any currency amount such as "$38,105" (98 hits on the cost guide, 32 on Webflow vs WordPress). Existing pages write amounts in words ("30,000 dollars"), and the guides' copy is final. There are two options:
   - Exempt pages with `thirdPartyPrices: true` from check 10. This is a script change; `pages:check` already honors the flag.
   - Rewrite the amounts in words. This is a copy change and would go through the copy process.
2. **Gap markers can't go into blog posts.** The blog build gate (`src/lib/new-pages/loader.ts`, `blogGate`) stops the build on any marker, draft or not. The brief's defaults were applied:
   - **astro-cms:** paragraph 2 (#P32-5 and #P32-6) is left out. The new H2 carries paragraph 1 only.
   - **track-brand-mentions-in-chatgpt:** the "What did our own first reading show?" section (#P64-9) is left out, and the second meta description is used.

   Answer any of them and the sentences go back in, with the first meta description for #P64-9.
3. **Cost guide URL.** `content-pack/data/plan.json` reserves `b2b-website-redesign-cost` at `/guides/b2b-website-redesign-cost`, wave 3. The content file used `website-redesign-cost` at `/guides/website-redesign-cost`, wave 2. Following the brief, the file now uses the plan's slug and URL; its wave stays 2. Moving to the shorter URL is a one-line change in both files before release.
4. **WL-2 default.** The brief's default for the NDA FAQ is to replace the answer with "Ask us about confidentiality terms before you share the brief." The checker only accepts `DELETE-ITEM` for a marker in a FAQ answer, so the marker says `DELETE-ITEM`. If WL-2 is unanswered at release, use the brief's sentence instead of deleting the FAQ.

## What discovery found

| Content | Where it lives |
| --- | --- |
| Header nav, desktop and mobile | `src/components/layout/Nav.astro` (code, not Sanity) |
| Home services section | `src/components/sections/Services.astro` (four cards, not three: the fourth is "Full rebrands") |
| Home meta description | `src/lib/content/seo.ts` (`PAGE_META.home`), reused as the Organization JSON-LD `description` in `src/pages/index.astro` |
| Home hero "stats band" | The second eyebrow in `src/components/sections/HomeHero.astro` (the stats row was removed earlier) |
| Entity constants | `src/lib/content/entity.ts` |
| `copy.json` | `src/lib/new-pages/copy.json`. It has no proof strip and no partner wording, so T1's third row had nothing to change. The proof strip text lives in `content-pack/scripts/build-outline.mjs` and is already correct. |
| Blog posts | Markdown files in `content-drafts/blog/`, not Sanity |
| `/webflow-seo-agency` | `content-pack/content/webflow-seo-agency.md` |

- **Partner-claim hits:** step 4's search is case-sensitive and missed the hero's all-caps line. Also found: `public/llms.txt` line 3 ("6+ years") and `content-pack/content/webflow-seo-agency.md` ("6+ years as a Webflow Premium Partner"). "Professional Partner" remains only in internal notes (`content-pack/outlines/`, `CLAIMS-REGISTER.md`, `FACTS-REGISTRY.md`), which aren't published.
- **Baseline:** the build needs `PUBLIC_SITE_URL` (Vercel sets it); without it every canonical points to localhost. With it, `check-seo` fails only one check: robots.txt has no Sitemap line, and robots.txt is off limits.

## What changed, task by task

### T1. Partner claim
- **Home meta description and Organization JSON-LD:** "Webflow Premium Partner since 2022, 100+ clients." (148 characters).
- **Home hero eyebrow:** "WEBFLOW PREMIUM PARTNER SINCE 2022", in capitals like the eyebrow next to it.
- **`llms.txt` summary:** the same wording as the meta description.
- **`/webflow-seo-agency` proof line:** "Webflow Premium Partner, and 100+ launches." Sergio chose this wording on 2026-11-09.
- **Checker:** check 10 bans `Professional Partner` and `years as a Webflow`.
- **Dates:** Home `LASTMOD` and `/webflow-seo-agency` `updatedAt` set to 2026-11-09.

### T2. Services menu and Home links
- **Services dropdown:** four plain-text groups (Build, Grow, Support, Industries) with the brief's labels, on desktop and mobile.
- **No descriptions:** the existing dropdown link has no room for a description, so it shows labels only, as the brief allows.
- **Icons removed:** only three of the eleven items had one, and mixing icons with plain labels looked broken. If you want them back, each item needs an icon.
- **Wider panel:** the Services panel now opens centered on the bar, like Resources, so the four columns fit at 1024 px.
- **Keyboard:** Tab moves through all 11 links in order, and the panel closes when focus leaves it.
- **White label:** left out until T7.
- **Home:** a "Specialist services." H3 with text links to the 8 pages sits under the service cards, on Home only. The commercial pages use the same section component but don't show it. There's no Figma frame for this block, so its styles reuse the section's spacing and the site's link arrow, marked `TODO: DS`.

### T3. `/webflow-seo-agency`
- **Changed:** the title, eyebrow, H1 and AI search H2, plus the link anchor "AEO and GEO services". The H2's visual anchor follows the new heading, so the diagram stays in place.
- **Heading position:** the AEO heading is the fourth H2, not the third as the brief says. Its text matched exactly.
- **Left alone:** the breadcrumb label ("Webflow SEO & AEO"), the footer link label ("Webflow SEO & AEO") and the Service JSON-LD `name` ("Webflow SEO and AEO", which isn't the old title). The brief doesn't list any of them.

### T4. Internal links
- **Added:** all 11 rows and both `/aeo-agency` sentences. No row was skipped: none of the source posts' bodies linked to the target yet.
- **Existing `/aeo-agency` links:** optimize-for-ai-overviews and ai-crawlers-robots-txt already link to it from their "Related pages" cards, not from the body.
- **Placement:**
  - **Appended to a paragraph** in optimize-for-ai-overviews (Search Console section), webflow-analytics (monthly report), b2b-marketing-attribution, webflow-cms-api, what-b2b-buyers-need-from-your-website and how-long-does-a-website-redesign-take.
  - **Own paragraph at the end of the named section** in the others.
  - **ai-crawlers-robots-txt:** the `/aeo-agency` sentence ends the crawler-check section. The "How was this post written and checked?" section isn't rendered, so that's the spot just before the FAQ.
- **Dates:** none changed.

### T5. Post refreshes
- **All five:** `updatedAt` and `dateModified` are 2026-11-09. Titles are used as written in the brief, with no "| BenorMedia" suffix; the blog uses no title template, and 8 posts already go without it.
- **headless-cms-comparison:**
  - The at-a-glance table repeats wording from the post's tables and its SaaS or self-hosted section. No cell needed "See below".
  - The Self-hosting cells come from that section: "SaaS" for Contentful, Prismic and Storyblok; "Open source, MIT licensed" for Payload; Sanity's hybrid hosting; Strapi's MIT license and paid Cloud option.
  - I added `heroLead: 1`, as webflow-source already has. Otherwise the new paragraph and table rendered inside the hero and the page overflowed by 49 px at 390 px.
- **website-maintenance-checklist:**
  - The template table has 26 rows: 11 from the monthly table, the backup restore test, 8 quarterly items and 6 yearly items. Owners come from the owners table.
  - Seven tasks have no owner there (uptime, core SEO elements, devices and browsers, release notes, conversion review, plan limits, analytics settings). Their owner cell says "Assign an owner", after the post's own rule of one named person per row. Change it if you'd rather name owners.
- **astro-cms:** the new meta description, and the H2 with paragraph 1. Paragraph 2 is on its default (see decision 2).
- **saas-website-redesign:** the new meta description, the sixth FAQ, and "redesign timelines" linked. The FAQPage JSON-LD keeps the answer as plain text.
- **track-brand-mentions-in-chatgpt:** the new title, the second meta description and the sixth FAQ. The first-reading section is on its default (see decision 2).

### T6. Draft pages

#### Front matter keys changed
No visible copy changed, except the marker defaults listed further down.

| File | Key | Change |
| --- | --- | --- |
| all three | `reviewEvery` | `30 days` / `90 days` changed to `30` / `90` |
| all three | `breadcrumb[].path` | renamed `url` |
| all three | `inbound[]` | `page` / `sentence` renamed `from` / `where` ("one sentence: ...") |
| both guides | `volatile[]` | strings changed to `{claim, source, recheck}`, sources taken from each file's `sources` list |
| cost guide | `slug`, `url`, breadcrumb `url`, file name | changed to `b2b-website-redesign-cost` from `plan.json` (see decision 3) |
| white label | `author` | removed: service pages show no byline (RULES section 7) |
| white label | `service` | string changed to `{name: White label Webflow development, serviceType: Website design and development}`, the same `serviceType` as the other build pages |
| white label | `testimonial: none` | kept: the checker and template accept it, and no testimonial shows |

#### Links
- **Converted to `page:<slug>`:** links to pack pages (`webflow-enterprise`, `webflow-vs-custom-code`, `webflow-migration`, `wordpress-to-webflow-migration`, `website-redesign`, `webflow-vs-wordpress`).
- **No `LIVE_PATHS` changes:** the checker already accepts every published blog post through `releasedBlogPaths()`. `/guides/webflow-enterprise` is a pack page, so it uses `page:`.
- **All present:** every path the brief lists exists in the baseline build.

#### Other
- **Plan file:** `plan.json` has a new entry, "White label web development". `webflow-vs-wordpress` was already there.
- **Diagram:** `FlowDiagram` shows the five step names from "How a white label project runs." It's numbered, three per row; five per row clipped "Site transfer" in the side figure.
- **Previews:** all three pages are `noindex`, with one H1 each and every table captioned. Tables scroll inside their wrapper at 390 px, and no page overflows. Drafts are left out of the production build.

## Checks

| Check | Result |
| --- | --- |
| `pnpm run build`, `check`, `lint` | Pass (0 errors, 0 warnings) |
| `check-seo.mjs dist/client` | Unchanged: 886 pass, 1 fail (robots.txt Sitemap line, failing before this branch) |
| `pages:check` | 0 failures on the three new pages; warnings only |
| `pages:verify` | Every page already fails check 8 (service-card artwork images without width and height) and the guides fail check 3 (lead paragraph): both are template-level, and the new pages fail them the same way. The only new failure is check 10 on the two guides (decision 1). |
| Diff against the baseline (header removed, random slider IDs ignored) | Changes only on the pages this brief names, on cards that repeat their H1s or descriptions, on blog "Related resources" lists (these pick recent posts, so the T5 dates reorder them), on `llms.txt` and on sitemap `lastmod` |
| Internal links | All 13 new T4 links and every link on the new pages resolve; no new `href="#"` (the only one is on the internal styleguide and was there before) |
| Lighthouse (local build) | Home: Accessibility 88, SEO 61; headless-cms-comparison: 96 and 61. Identical before and after. The SEO score is low because local builds are noindex. |

Screenshots at 1440 and 390 px (Services menu, mobile menu, the Home block, the `/webflow-seo-agency` hero, refreshed sections and the new pages) were checked during the run. They aren't committed.

## Word counts (pages:check)

| Page | Words | Range |
| --- | --- | --- |
| Webflow vs WordPress | 2,278 | 1,800 to 3,000 |
| Website redesign cost | 1,867 | 1,800 to 3,200 |
| White label web development | 1,031 | 650 to 1,200 |

## Open gap markers

| File | Markers |
| --- | --- |
| `content-pack/content/webflow-vs-wordpress.md` | WVW-1 (DELETE-LINE) |
| `content-pack/content/b2b-website-redesign-cost.md` | RDC-1 (DELETE-LINE) |
| `content-pack/content/white-label-webflow-development.md` | WL-1 (KEEP: removes the marker only), WL-2 (DELETE-ITEM; see decision 4), WL-3 (DELETE-LINE), WL-4 (DELETE-LINE), WL-5 (KEEP) |
| astro-cms (not in the file) | P32-5, P32-6: defaults applied |
| track-brand-mentions-in-chatgpt (not in the file) | P64-9: default applied |

## Visuals still to make

None. The white-label diagram is built from `FlowDiagram`. The Webflow vs WordPress YouTube walkthrough is on Sergio's list (brief section 11).

## Lists

**What Sergio must do**
- Decide items 1 to 4 above.
- Review the preview, then sign off each new page for T7.
- After deploy, request indexing in Search Console (brief T7 step 5).

**What I couldn't verify**
- The live site after 2026-11-09. I checked the repo and builds only.
- The Vercel preview itself (see the pull request).
- How Lighthouse scores in production.

**What I noticed but left alone**
- robots.txt has no Sitemap line, but astro-cms says "its robots.txt points to a sitemap index".
- The breadcrumb and footer label "Webflow SEO & AEO" on `/webflow-seo-agency`.
- "Professional Partner" in the internal outlines and registers.
- `docs/webflow-seo-agency.md` and `docs/content/webflow-seo-agency.md` still hold the old proof line.
- The untracked `docs/handoffs/2026-10-12_orchestrator_service-step-link.md`.
