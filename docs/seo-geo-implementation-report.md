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
| `baebee9` feat(pages): fill the answered gaps on the three draft pages | T6 gaps |
| `cb9c24e` content(blog): add why we chose Sanity to astro-cms | T5.3 gap |
| `0fe74e4` content(blog): add our first AI Mode reading to track-brand-mentions-in-chatgpt | T5.5 gap |

## Decisions Sergio needs to make

1. **Third-party prices: resolved.** Sergio's decision (2026-11-09): check 10 in `scripts/check-new-pages.mjs` now allows currency amounts only on guide and comparison pages that set `thirdPartyPrices: true`, list `sources` and carry a `volatileChecked` date. Every other page, service pages included, keeps the check, and the amounts stay as figures. A negative test confirmed it: a dollar amount on the white-label page still fails, and so does the cost guide with the flag turned off.
2. **Gap markers: resolved.** Sergio answered every gap on 2026-11-09, and the answers are in (see "Gap markers" below).
3. **Cost guide URL: resolved.** Sergio chose `/guides/website-redesign-cost` (2026-11-09). The file is `content-pack/content/website-redesign-cost.md` again, and `plan.json` now reserves `website-redesign-cost` at that URL (label "Website redesign cost"; its wave stays 3, the file's 2). The old planned address also changed in the `/guides/b2b-saas-website-pages` related list, `RULES.md` and the page's outline. It was never published, so no redirect is needed.
4. **WL-2: resolved.** The NDA FAQ answer is "Yes. We sign your NDA before you share any client details."

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
- **Home:** a "Specialist services." block was added under the service cards, then removed at Sergio's request (2026-11-09). The homepage links to the 8 pages through the Services menu only.

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
- **astro-cms:** the new meta description, and the H2 with both paragraphs (paragraph 2 answers #P32-5 and #P32-6).
- **saas-website-redesign:** the new meta description, the sixth FAQ, and "redesign timelines" linked. The FAQPage JSON-LD keeps the answer as plain text.
- **track-brand-mentions-in-chatgpt:** the new title, the first meta description, the sixth FAQ, and the "What did our own first reading show?" section, which ends the body so it renders just before the FAQ (#P64-9 confirmed).

### T6. Draft pages

#### Front matter keys changed
No visible copy changed, except the marker defaults listed further down.

| File | Key | Change |
| --- | --- | --- |
| all three | `reviewEvery` | `30 days` / `90 days` changed to `30` / `90` |
| all three | `breadcrumb[].path` | renamed `url` |
| all three | `inbound[]` | `page` / `sentence` renamed `from` / `where` ("one sentence: ...") |
| both guides | `volatile[]` | strings changed to `{claim, source, recheck}`, sources taken from each file's `sources` list |
| cost guide | `slug`, `url`, breadcrumb `url`, file name | briefly `b2b-website-redesign-cost` from `plan.json`, then back to `website-redesign-cost` (decision 3) |
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
| `pages:verify` | Every page already fails check 8 (service-card artwork images without width and height) and the guides fail check 3 (lead paragraph): both are template-level, and the new pages fail them the same way. With decision 1, the guides no longer fail check 10. |
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

## Gap markers

All answered by Sergio on 2026-11-09, and no marker is left (`pages:check`: 0 open markers).

| Id | Where the answer went |
| --- | --- |
| WVW-1 | Webflow vs WordPress: the end of the security section's second paragraph (the old sentence in the editing section is gone) |
| RDC-1 | Website redesign cost: the sentence after the cost drivers table |
| WL-1, WL-4, WL-5 | White label: the "No client contact", "The same people" and "Hours that overlap" bullets |
| WL-2 | White label: the NDA FAQ answer |
| WL-3 | White label: the SimpleTiger bullet (SimpleTiger approved being named) |
| P32-5, P32-6 | astro-cms: paragraph 2 of the new H2 |
| P64-9 | track-brand-mentions-in-chatgpt: the first-reading section and the first meta description |

## Visuals still to make

None. The white-label diagram is built from `FlowDiagram`. The Webflow vs WordPress YouTube walkthrough is on Sergio's list (brief section 11).

## Lists

**What Sergio must do**
- Nothing left to decide from the list above.
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

## T7 release (2026-11-09)

Sergio signed off all three pages. They are released together on this branch, and go live when the pull request is merged and deployed.

- **Front matter:** `draft: false`; `publishedAt`, `updatedAt` and `volatileChecked` are all 2026-11-09. `pages:release-check` passes on all three with no key fixes.
- **Volatile facts rechecked 2026-11-09:**
  - **Webflow pricing:** all figures unchanged.
  - **W3Techs:** 39.4%.
  - **Patchstack:** all 2025 figures unchanged.
  - **WordPress.com:** $45 and $4 plans unchanged.
  - **Yoast:** 10+ million installs.
  - **Clutch:** all figures unchanged.
  - **BLS:** both May 2025 figures unchanged.
  - **WordPress.org plugin count:** kept as "more than 78,000". Sergio confirmed it on the directory page; the plugin API counts about 74,500.
  - **Forbes Advisor:** figures, including the $10 to $35 domain range, confirmed by Sergio. Forbes blocks automated access.
- **Services menu:** "White label for agencies" sits under Build.
- **Site lists:** one line per page in `public/llms.txt`, and PAGES entries in `scripts/check-seo.mjs`.
- **Inbound links:** 9 of 11 added, in their own commit:
  - wordpress-to-webflow-migration, webflow-vs-custom-code, is-webflow-good-for-seo and webflow-price-increase link to Webflow vs WordPress.
  - website-redesign, how-long-does-a-website-redesign-take, website-rfp-template and saas-website-redesign link to the cost guide.
  - webflow-migration links to the white label page.
  - On `/website-redesign`, the sentence sits in "Start with what your current site already wins." The process section's intro renders as plain text and would have dropped the link.
- **Left out:** the two links from `/custom-websites-migrations` and `/ongoing-website-support`. Their copy is in Sanity. Sergio can add them in Studio:
  - "Agencies can also hire us for white label web development under their own brand." (anchor "white label web development")
  - "Support can run under your agency's brand too; see white label Webflow support." (anchor "white label Webflow support")
- **Checks (production build):**
  - `check-seo.mjs`: all checks passed.
  - All three pages are indexable and in the sitemap, with the expected JSON-LD.
  - The `pages:verify` production view includes all 15 pages. Its only failures are the template-level checks 8 and 3.
  - `check` and `lint` pass.
- **After the deploy:** run `node scripts/indexnow.mjs` for the three new URLs and the five refreshed posts, then request indexing in Search Console.
