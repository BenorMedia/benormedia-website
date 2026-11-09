# Claude Code brief: SEO/GEO implementation for benormedia.com

Prepared 2026-11-09 for Sergio (BenorMedia). It turns the approved SEO/GEO plan and its review (`claude/seo-geo-plan-review-2026-11-09.md` in the project) into site changes. All new copy in this brief and in the three content files was written from keyword research (Ahrefs, Search Console), briefed and scored in Surfer, and run through Surfer's AI detector (results in section 9).

Nothing in this brief publishes anything. New pages stay `draft: true`. Edits to live pages go on a branch for Sergio to review, merge, and deploy.

## 0. How to run this (Sergio)

1. Put the files in the website repo:
   - this brief at `docs/seo-geo-implementation-brief-2026-11-09.md`
   - `webflow-vs-wordpress.md`, `website-redesign-cost.md`, and `white-label-webflow-development.md` in `content-pack/content/`
2. Open Claude Code in the repo root and paste:

   > Read docs/seo-geo-implementation-brief-2026-11-09.md in full. Do section 3 (discovery) first and post what you found. Then work on a new branch `seo/geo-implementation-2026-11`, one commit per task, and stop at every STOP line. Don't merge, push the base branch, or deploy. Finish with the report in section 8.

3. Inputs (defaults in brackets):
   - Base branch: [`main`]
   - May Claude Code push the feature branch for a Vercel preview? [yes]

## 1. What changes, in order

| Task | What | Why (data, internal) |
| --- | --- | --- |
| T1 | Fix the Webflow partner claim everywhere | The homepage says "6+ years as a Webflow Premium Partner". Webflow's profile shows Premium Partner since June 2022, and Webflow no longer has a "Professional" tier (now Foundations, Certified, Premium) |
| T2 | Services menu and homepage links to all service pages | The 8 newer service pages are linked only from the footer; the homepage body links to none of them |
| T3 | Take "AEO" out of the /webflow-seo-agency title, eyebrow, H1, and one H2 | That page gets the AEO searches, while /aeo-agency had 1 impression in 28 days |
| T4 | 11 internal links to the 7 zero-impression posts, plus 2 to /aeo-agency | All 7 are indexed (URL Inspection) but get no impressions. Each link goes where a related post doesn't link yet (checked on the live site, 2026-11-09) |
| T5 | Refresh 5 posts with the exact copy in section 5 | Real striking-distance queries, plus two posts that dropped to zero after their first week |
| T6 | Build the 3 new pages from the content files as drafts | Webflow vs WordPress (2,900 searches/mo), website redesign cost (800), white label web development (900) |
| T7 | Release steps for the new pages, only after Sergio signs off | Inbound links, llms.txt, check-seo, sitemap |
| T8 | Verify and report | |

Do not do any of these:

- Don't add a "Webflow to WordPress" section to `/guides/wordpress-to-webflow-migration`. That idea came from a data misread: the query is 11 of the page's 1,530 impressions.
- Don't create blog posts beyond the three files listed above.
- Don't touch Sanity content or schema, robots.txt, `vercel.json`, Vercel settings, environment variables, or DNS.
- Don't reword live copy beyond the edits listed here. If a sentence you must insert doesn't fit, report it instead of changing it.

## 2. Ground rules

1. **Copy is exact.** Every new string in this brief is final. Don't reword, shorten, or "improve" it. House style: US English, no em dashes, serial comma, sentence-case headings.
2. **No new facts.** Don't write copy that isn't in this brief or in a content file, including `alt` text, `aria-label`s, and schema descriptions.
3. **Reuse before you create.** Use the site's existing components, tokens, and styles. New CSS only where nothing exists, scoped to the new element.
4. **One commit per task**, conventional messages (`fix(seo): ...`, `feat(nav): ...`, `content(blog): ...`, `feat(pages): ...`).
5. **Dates.** On a refreshed post, set `updatedAt` (and `dateModified` in its Article JSON-LD) to the day the change ships. Leave `publishedAt` alone. Adding an internal link alone doesn't change the date.
6. **When unsure, STOP and ask.** A short question beats a wrong guess on a live page.
7. **New copy goes through Sergio.** If a task needs copy that isn't in this brief or a content file, stop and ask. New copy is written through the standard procedure (keyword research, a Surfer brief and score, and an AI detector result under 20%), not improvised in the repo.

## 3. Discovery (read first, change nothing)

1. `git status` is clean apart from the new files. Note the base branch and the remote.
2. Find where each piece of content lives, and post the list:
   - the header nav (desktop and mobile), and the homepage services section ("A website your team can run, and growth that keeps pipeline coming.")
   - the homepage meta description and the hero stats band
   - the shared entity constants and Organization JSON-LD (`rg -n "ORG_ID|ENTITY" src`), `src/lib/new-pages/copy.json`, `public/llms.txt`, and the PAGES map in `scripts/check-seo.mjs`
   - the source file of each blog post this brief edits (`rg -l "slug: <slug>"`, or the blog collection folder)
   - `/webflow-seo-agency` (a content-pack file or a page component)
3. Run the production build the way Vercel does and keep a copy of the output (`/tmp/dist-before`). Run `node scripts/check-seo.mjs dist` and `pages:check`, and keep a two-line summary of each.
4. `rg -n "Professional Partner|years as a Webflow|Official Webflow Partner" src content-pack public scripts` and list every hit.

**STOP and ask** if:

- a blog post this brief edits lives in Sanity rather than in the repo (Sanity is off limits; Sergio decides);
- the baseline build fails or needs secrets you don't have;
- the header nav is rendered from Sanity data rather than code.

## 4. Site tasks

### T1. Partner claim (commit `fix(seo): correct the Webflow partner claim`)

| Where | Current text | New text |
| --- | --- | --- |
| Homepage meta description | BenorMedia builds high-converting, AEO-optimized Webflow websites for B2B SaaS and tech companies. Webflow Premium Partner, 6+ years, 100+ clients. | BenorMedia builds high-converting, AEO-optimized Webflow websites for B2B SaaS and tech companies. Webflow Premium Partner since 2022, 100+ clients. |
| Homepage hero stats band, second item | 6+ years as a Webflow Premium Partner | Webflow Premium Partner since 2022 |
| `src/lib/new-pages/copy.json`, proof strip, fourth item | Webflow Professional Partner | Webflow Premium Partner |
| Any other hit from discovery step 4 (entity constants, JSON-LD descriptions, llms.txt, page copy) | "Webflow Professional Partner", or a partner claim tied to "6+ years" | "Webflow Premium Partner", and keep "6+ years" only as "6+ years of experience" |

Also:

- The Organization JSON-LD repeats the old meta description in its `description`; change it to the new homepage meta description. It already has `"alternateName": "Benor Media"` and `https://webflow.com/@benor-media` in `sameAs` (checked on the live homepage), so leave the rest of it alone.
- In `scripts/check-new-pages.mjs` (check 10, banned strings), add `Professional Partner` and `years as a Webflow`.
- Keep the "$700M+ raised by our clients" item as it is.

Acceptance: `rg -n "Professional Partner|years as a Webflow" src content-pack public` returns nothing outside the checker's banned list; the homepage meta description is 148 characters; the build passes.

### T2. Services menu and homepage links (commit `feat(nav): list every service page in the Services menu`)

Replace the Services dropdown (today: Custom Websites & Migrations, Growth (SEO/GEO + CRO), Ongoing Website Support) with these groups. Use the existing dropdown component. If it can't show a one-line description, show labels only. The mobile menu gets the same items in the same order.

| Group | Label | URL | One-line description |
| --- | --- | --- | --- |
| Build | Webflow design & development | /custom-websites-migrations | Custom Webflow sites for B2B teams. |
| Build | Webflow migration | /webflow-migration | Move to Webflow with every redirect tested. |
| Build | Website redesign | /website-redesign | Redesigns for B2B and SaaS sites. |
| Build | Headless CMS development | /headless-cms-agency | Astro and Next.js builds on Sanity. |
| Build | White label for agencies | /white-label-webflow-development | Webflow builds under your agency's brand. |
| Grow | SEO, GEO & CRO | /growth | Organic growth for B2B SaaS. |
| Grow | Webflow SEO | /webflow-seo-agency | Technical SEO and content for Webflow sites. |
| Grow | AEO & GEO | /aeo-agency | Get named in AI answers. |
| Support | Webflow maintenance & support | /ongoing-website-support | Monthly design and development help. |
| Industries | B2B SaaS | /b2b-saas-web-design | (no description) |
| Industries | Cybersecurity | /cybersecurity-web-design | (no description) |
| Industries | Enterprise | /webflow-enterprise-agency | (no description) |

- Leave out "White label for agencies" until that page is released (T7). Add it in the T7 pull request.
- Group labels are plain text (Build, Grow, Support, Industries), not links.
- Keep the Resources menu as it is.

Homepage: directly under the three service cards, add a short block with an H3 `Specialist services.` and text links to the 8 newer pages (/webflow-migration, /website-redesign, /headless-cms-agency, /webflow-seo-agency, /aeo-agency, /b2b-saas-web-design, /cybersecurity-web-design, /webflow-enterprise-agency), each with its label and one-line description from the table above (the three industry items use their label alone). Reuse the existing card or link styles.

Acceptance: each of the 8 pages is linked from the header (desktop and mobile) and from the homepage body; the header markup is identical on every page; no console errors; keyboard navigation through the dropdown works as before; screenshots at 1440 and 390 px in the report.

### T3. /webflow-seo-agency (commit `fix(seo): keep AEO wording on /aeo-agency`)

The current values below were checked on the live page on 2026-11-09.

| Element | Current | New |
| --- | --- | --- |
| Title tag | Webflow SEO Agency: SEO & AEO for B2B \| BenorMedia | Webflow SEO Agency & Services for B2B Teams \| BenorMedia |
| Eyebrow | Webflow SEO & AEO | Webflow SEO services |
| H1 | Webflow SEO and AEO for B2B teams, measured in pipeline. | Webflow SEO for B2B teams, measured in pipeline. |
| Third H2 | AEO and AI search on Webflow: what helps and what doesn't. | AI search on Webflow: what helps and what doesn't. |
| Link to /aeo-agency in the body | For the full program across ChatGPT, Perplexity, Gemini and Google, see our AEO and GEO service. (anchor: "AEO and GEO service") | The same sentence ending "see our AEO and GEO services." (anchor: "AEO and GEO services", same URL) |

Leave the meta description, the FAQ (including "What's the difference between SEO and AEO?"), and the rest of the body as they are. Update the page's Service JSON-LD `name` only if it repeats the old title.

Acceptance: the title, eyebrow, and H1 contain no "AEO"; the page still links to /aeo-agency.

### T4. Internal links (commit `content(blog): add internal links to under-linked posts`)

For each row: the live site was checked on 2026-11-09 and the source page didn't link to the target. Check again; if it now does, skip the row and list it in the report. Otherwise add the sentence exactly as written, as the last sentence of the most relevant paragraph in the section named, or as its own short paragraph there. The text in square brackets is the anchor.

| Target | Source page | Section (H2 on the live page) | Sentence to add |
| --- | --- | --- | --- |
| /blog/ai-mode-tracking | /blog/track-brand-mentions-in-chatgpt | How do you run the prompts in ChatGPT search and other answer engines? | For Google's AI Mode in particular, our guide to [AI Mode tracking](/blog/ai-mode-tracking) covers what you can and can't measure today. |
| /blog/ai-mode-tracking | /blog/optimize-for-ai-overviews | How do you measure AI Overviews and AI Mode in Search Console? | Search Console won't show whether an AI Mode answer names your brand without linking to you; that's what [AI Mode tracking](/blog/ai-mode-tracking) is for. |
| /blog/zero-click-searches-b2b-saas | /blog/webflow-analytics | What should a monthly analytics report show? | When clicks drop but impressions hold, [the zero-click searches guide](/blog/zero-click-searches-b2b-saas) explains what to report instead. |
| /blog/zero-click-searches-b2b-saas | /blog/b2b-marketing-attribution | How do you turn the three sources into a monthly account-based attribution report? | Fewer clicks doesn't mean less demand; see what to measure as [zero-click searches](/blog/zero-click-searches-b2b-saas) grow. |
| /blog/consent-mode-v2-webflow | /blog/webflow-analytics | How do you add GA4 and Tag Manager to a Webflow site? | Consent settings change what reaches GA4, so set up [Consent Mode v2 on Webflow](/blog/consent-mode-v2-webflow) before you trust the numbers. |
| /blog/do-you-need-an-llms-txt-file | /blog/ai-crawlers-robots-txt | How do you block GPTBot and other training crawlers in robots.txt? | Whether you also need an [llms.txt file](/blog/do-you-need-an-llms-txt-file) is a separate question, and the evidence on it is thin so far. |
| /blog/programmatic-seo-webflow | /blog/webflow-cms-api | What can the Webflow CMS API do? | When the CMS feeds hundreds of pages, the same API powers [programmatic SEO on Webflow](/blog/programmatic-seo-webflow). |
| /blog/programmatic-seo-webflow | /blog/is-webflow-good-for-seo | What does Webflow handle for on-page SEO and technical SEO? | Webflow can run large CMS page sets within its plan limits; our guide to [programmatic SEO on Webflow](/blog/programmatic-seo-webflow) covers those limits and how to keep the pages useful. |
| /blog/saas-pricing-page | /blog/what-b2b-buyers-need-from-your-website | What should your pricing page tell buyers? | For the bigger call, whether to publish prices at all and what to show if you don't, see our guide to [SaaS pricing page decisions](/blog/saas-pricing-page). |
| /blog/website-launch-checklist | /blog/website-redesign-seo-checklist | What should you test before and on launch day? | The last week before go-live needs its own list; use our [website launch checklist](/blog/website-launch-checklist). |
| /blog/website-launch-checklist | /blog/how-long-does-a-website-redesign-take | What are the phases of a website redesign, and how long does each take? | Plan the final week of the project around a [website launch checklist](/blog/website-launch-checklist), so nothing slips at go-live. |

Left out because the link already exists (2026-11-09): /blog/optimize-for-ai-overviews to the zero-click post, /blog/google-tag-gateway to the Consent Mode post, /blog/ai-seo-myths to the llms.txt post, and /blog/saas-homepage-design to the pricing post.

AEO links: /blog/optimize-for-ai-overviews and /blog/ai-crawlers-robots-txt don't link to /aeo-agency yet. In each, add this sentence as its own paragraph just before the FAQ: "If you'd rather have a team run this for you, see our [AEO and GEO services](/aeo-agency)." /blog/how-to-rank-in-chatgpt, /blog/copilot-seo, and /blog/schema-markup-ai-search already link to it; leave them.

Acceptance: every added link resolves; no other text changed (show the diff per file in the report).

## 5. Post refreshes (T5, one commit per post: `content(blog): refresh <slug>`)

General rules for T5: change only what each block lists; set `updatedAt` and `dateModified` to the ship date; keep `volatileChecked` unless you re-verify the facts it covers.

### 5.1 /blog/headless-cms-comparison

Data: "headless cms comparison" 150/mo (KD 0), 95 impressions at position 15.6 in 28 days and rising; Surfer baseline 63.

- Title: `Headless CMS Comparison: 6 Platforms for Marketing Sites`
- Meta description: `Contentful, Payload, Prismic, Sanity, Storyblok, and Strapi compared on visual editing, roles, localization, hosting, and pricing. Checked October 2026.`
- Directly after the lead, before the first H2, add this paragraph and a summary table:

  > Short on time? This table pulls one line per platform from the detailed tables further down. Each cell repeats what those tables say, so read the section below before you rule a platform in or out.

  Caption line: `Table: Six headless CMSs at a glance (checked October 23, 2026)`. Columns: `CMS | Visual editing or preview | Localization model | Self-hosting | Free tier`. One row per CMS, alphabetical. **Fill every cell only with wording already on the page**, shortened to a few words: the Feature column of the visual editing table, the Localization model column of the localization table, the section "Should the CMS be SaaS or self-hosted?", and the Free tier column of the pricing table ("What each headless CMS meters"). Add no fact that isn't already on the page. If a cell can't be filled from the page, write "See below".
- Add a sixth FAQ item (the post has 5 today):
  - Q: `What does a headless CMS cost?`
  - A: `It depends on what each vendor meters, which the pricing table above lists platform by platform. Scheduling, custom roles, and single sign-on often sit on higher plans, so price the plan your team's workflow needs, not just the entry plan.`

### 5.2 /blog/website-maintenance-checklist

Data: "website maintenance checklist" 150/mo (KD 3), "website maintenance checklist template" 150 (KD 6), "monthly website maintenance checklist" 100; the page sits around position 27 to 35; Surfer baseline 77.

- Title: `Website Maintenance Checklist: Monthly, Quarterly, Yearly`
- Meta description: `A website maintenance checklist for B2B SaaS sites: what to check monthly, quarterly, and yearly, who owns each task, and a template you can copy.`
- New H2 after "What should you check every year to keep your site current and accessible?":
  - H2: `Is there a website maintenance checklist template you can copy?`
  - Opening paragraph: `Yes. The table below puts every task from this checklist on one page, with how often to run it, who owns it, and what done looks like. Copy it into a spreadsheet, swap in your team's names, and add a column for the date each check last passed.`
  - Caption line: `Table: Website maintenance checklist template`. Columns: `Task | How often | Owner | Done when`. **Build the rows only from tasks already in the post** (the monthly table, the quarterly and yearly lists, the backup section, and the owners table), one row per task, using the post's own frequency and owner for each. "Done when" is a short pass condition in the post's own words for that task: the "What to look for" column for monthly checks, the list wording for the rest. Add no task the post doesn't mention.

### 5.3 /blog/astro-cms

Data: "astro cms" 800/mo (KD 0). The post ranked at positions 8 to 13 from October 27 to 30, then dropped to zero impressions (Search Console flags -96%). It is indexed. Surfer baseline 56. Surfer also suggested use-case recommendations, which the post's "CMS types for Astro sites" table already covers (it has a "Good fit" column), so the refresh adds first-hand detail only.

- Keep the title.
- Meta description: `Astro has no built-in CMS. How to choose one in 2026: content collections, Git-based and headless options, connecting Sanity, and what Astro 7 changed.`
- New H2 right after "How do you connect Sanity to Astro?":
  - H2: `How do we run benormedia.com on Astro and Sanity?`
  - Paragraph 1: `Our own site runs on Astro and Sanity. Titles, descriptions, Open Graph images, and canonical tags are CMS fields, and content reaches the HTML through server-side rendering or static generation, so crawlers and AI assistants get the full page.`
  - Paragraph 2: `We chose Sanity because [FACT NEEDED #P32-5: Why did we choose Sanity for benormedia.com (one or two reasons), and do editors use Visual Editing or the Presentation tool? | default: delete this sentence]. A change published in Sanity reaches the live site [FACT NEEDED #P32-6: Where is benormedia.com hosted, how does a Sanity publish reach the live site (rebuild, server rendering, cache), and one measured number such as time from publish to live? | default: delete this sentence].`
  - If Sergio hasn't answered by release, apply the defaults (delete both sentences).

### 5.4 /blog/saas-website-redesign

Data: "saas website redesign" 100/mo, position 14; "website relaunch" 350/mo (KD 1) is the closest bigger query.

- Keep the title.
- Meta description: `When a phased SaaS website redesign beats one big relaunch: how to sequence phases, share one domain, keep publishing, and protect SEO in between.`
- Add a sixth FAQ item (the post has 5 today):
  - Q: `Is a website relaunch the same as a redesign?`
  - A: `Not quite. A redesign changes how the site looks and how it's organized; the relaunch is the day the new version goes live. A phased redesign swaps one big relaunch for several smaller ones, section by section.`
- While in the file: the FAQ answer to "What goes in a website redesign plan for a phased project?" ends "Our post on redesign timelines covers how long each project phase takes." with no working link (the live page shows plain text). Link "redesign timelines" to `/blog/how-long-does-a-website-redesign-take`, or fill in the URL if the source has an empty link there.

### 5.5 /blog/track-brand-mentions-in-chatgpt

Data: "how to track brand mentions in chatgpt" 800/mo, "track chatgpt mentions" 700. The post earned 449 impressions in its first week (positions 11 to 42), then none since October 26. URL Inspection: indexed, Google-selected canonical is the page itself, last crawled October 19.

- Title: `How to Track Brand Mentions in ChatGPT for Free`
- Meta description: `Track brand mentions in ChatGPT and other AI chats for free: a 30-prompt method, a scoring sheet, and what our own first reading showed. November 2026.` If the first-reading section below is deleted, use this one instead: `Track brand mentions in ChatGPT and other AI chats for free: a 30-prompt method, a clean way to run it, a scoring sheet, and what it can't tell you.`
- New H2 before "Questions about tracking brand mentions in AI answers":
  - H2: `What did our own first reading show?`
  - Paragraph 1: `On November 9, 2026, we ran 10 buyer prompts in Google's AI Mode (US, English, logged out). BenorMedia was named in 1 of the 10 answers, and that was the branded question. The other nine named different agencies and leaned on "best agencies" roundups and Reddit threads rather than on agency service pages. [VERIFY #P64-9: Sergio confirms this section can be published as written: the November 9 setup (10 buyer prompts in Google AI Mode, US, English, logged out), the result (named in 1 of 10, the branded prompt), and the weekly rerun | default: delete this section]`
  - Paragraph 2: `That pattern is the useful part. The answers we wanted to show up in were assembled from third-party lists, so our next moves are reviews, case studies, and getting onto those lists, not more service pages. We rerun the same 10 prompts each week and score the answers with the sheet described above.`
  - If #P64-9 is not confirmed by release, delete the whole H2 section and use the second meta description.
- Add a sixth FAQ item (the post has 5 today):
  - Q: `How do you track brand mentions in other AI chats?`
  - A: `Run the same prompt set in each assistant you care about, such as ChatGPT, Claude, Gemini, Perplexity, or Google's AI Mode, in a clean session. Log the same fields for every answer, named or not, position, competitors, and cited pages, and give each assistant its own column so the gaps stand out.`
- Use marker id #P64-9 unless it already exists in the file; if it does, use the next free number and report it.

### 5.6 /cybersecurity-web-design (later, when the Base Operations case study is live)

No copy change now. When `/work/base-operations` exists, add it to the page's proof section with the case study's own H1 as the anchor, and link the case study back to /cybersecurity-web-design. Same rule for /webflow-enterprise-agency (JOOR) and /webflow-seo-agency (Base Operations).

## 6. New pages (T6, commit `feat(pages): add three draft pages`)

| File | URL | Family | Notes |
| --- | --- | --- | --- |
| `content-pack/content/webflow-vs-wordpress.md` | /guides/webflow-vs-wordpress | article (`comparison`) | 1 open gap (#WVW-1) |
| `content-pack/content/website-redesign-cost.md` | /guides/website-redesign-cost | article (`guide`) | 1 open gap (#RDC-1) |
| `content-pack/content/white-label-webflow-development.md` | /white-label-webflow-development | commercial (`service`) | 5 open gaps (#WL-1 to #WL-5), 1 diagram |

1. **Keep `draft: true`.** Previews only, as in the pack's existing rules.
2. **Plan file.** If `content-pack/data/plan.json` already reserves a slug for these pages (it reserves `webflow-vs-wordpress`; check for a "B2B website cost guide" entry), keep the slug and URL in the files consistent with it, and report any difference instead of editing the copy. Add entries for pages that aren't in the plan, with labels: "Webflow vs WordPress", "Website redesign cost", "White label web development".
3. **Front matter.** The files follow the topic-bank and build-brief formats. If `pages:check` reports a missing or misnamed key, fix the key only (RULES.md section 7), never the visible copy, and list each change in the report. `thirdPartyPrices: true` is set on the two guides because they quote Webflow, WordPress.com, Clutch, Forbes Advisor, and BLS figures. `testimonial: none` on the white-label page: if the template only accepts `surfe`, `puzzle`, or `both`, leave the testimonial out and report it.
4. **Links.** Bodies use plain paths. Convert each one to the form the resolver expects: `page:<slug>` for pages in the pack, a plain path for paths in `LIVE_PATHS`. The guides link to these live paths, which may not be in `LIVE_PATHS` yet (all returned 200 on the live site on 2026-11-09): /blog/security-questionnaire, /blog/webflow-security-php2shell, /blog/is-webflow-good-for-seo, /blog/webflow-salesforce-integration, /blog/webflow-cms-api, /blog/webflow-export-code, /blog/webflow-accessibility-checklist, /blog/website-maintenance-checklist, /blog/how-long-does-a-website-redesign-take, /blog/website-rfp-template, /blog/website-redesign-seo-checklist, /blog/saas-website-redesign, /guides/webflow-enterprise. Confirm each exists in the baseline build, then add it to `LIVE_PATHS` in `content-pack/scripts/lib/check.mjs`, or use `page:<slug>` if it's a pack page. Report any that don't exist.
5. **Visual.** The white-label page has one diagram (`white-label-webflow-development:1`): a five-step flow. Use the existing `FlowDiagram` component; labels come only from the visual's `brief` and the section text.
6. **Preview check.** Both views (`review`, `defaults`) render; `pages:verify` passes; one H1 each; tables have captions and scroll on a phone; no production URL appears.

## 7. Release (T7, only after Sergio signs off each page)

Follow section 11 of `content-pack/BUILD-BRIEF.md`, plus:

1. Gaps answered, or defaults applied with `apply-defaults.mjs`; `draft: false`; `publishedAt` and `updatedAt` set to the sign-off date; `volatileChecked` re-verified (prices and counts change).
2. Inbound links from each file's `inbound` list, in a separate pull request.
3. For the white-label page, add "White label for agencies" to the Services menu (T2 table) in the same pull request.
4. One line per page in `public/llms.txt`, and an entry in the PAGES map of `scripts/check-seo.mjs` with its schema types and `primaryKeyword`.
5. After Sergio deploys: `node scripts/indexnow.mjs <url>` for each changed or new URL. Sergio requests indexing in Search Console for the new pages and for the five refreshed posts (track-brand-mentions-in-chatgpt and astro-cms first; Google last crawled the former on October 19).
6. Release order: /guides/webflow-vs-wordpress goes live before or with /guides/website-redesign-cost, which links to it.

## 8. Verification and report (T8)

1. `diff -r /tmp/dist-before dist`: only the pages this brief names have changed.
2. `node scripts/check-seo.mjs dist` before and after; `pages:check` and `pages:verify` for all views.
3. Every internal link added by this brief resolves; no `href="#"`.
4. Screenshots at 1440 and 390 px: the header with the open Services menu, the homepage services block, /webflow-seo-agency hero, and each refreshed post's new section.
5. Lighthouse on the homepage and one refreshed post: no drop in Accessibility or SEO against the baseline.

Report (in the chat and in `docs/seo-geo-implementation-report.md`): branch and commits; the preview URL; what discovery found (file locations); the T4 rows you skipped and why; every front matter key you changed; the `LIVE_PATHS` additions; any copy that didn't fit; the open gap markers per file.

## 9. Where the copy came from (internal)

**Search Console (direct, 2026-11-09).** 87 pages indexed, 7 not (3 redirects, 1 noindex, 1 404, 2 crawled but not indexed). Sitemap read November 8, 84 URLs, status Success. Links report: 1,885 external links, 1,884 of them to the homepage, almost all from "Website by BenorMedia" footer credits (getorchestra.io 774, joor.com 332, hibambi.com 206, majorplayers.co.uk 135, darwin.cx 95). One external link points to an inner page. /blog/track-brand-mentions-in-chatgpt: indexed, canonical OK, last crawled October 19.

**Keyword research (Ahrefs, US, 2026-11-09).**

| Page | Main keyword (volume, KD) | Variants used |
| --- | --- | --- |
| /guides/webflow-vs-wordpress | webflow vs wordpress (2,900, 10) | wordpress vs webflow 400; webflow vs wordpress seo 90; is webflow better than wordpress 70; webflow or wordpress 50 |
| /guides/website-redesign-cost | website redesign cost (800, 2) | how much does a website redesign cost 100; website redesign pricing 70; cost to redesign a website 20 |
| /white-label-webflow-development | white label web development (900, 1) | white label web design agency 250; white label website development 200; webflow white label 80; white label webflow development 50 |
| /webflow-seo-agency | webflow seo agency (250, 1) | webflow seo services 350; webflow seo expert 250 |
| Refreshes | headless cms comparison 150; website maintenance checklist 150 (+ template 150, monthly 100); astro cms 800; saas website redesign 100 (+ website relaunch 350); how to track brand mentions in chatgpt 800 (+ track chatgpt mentions 700) | |

**Surfer (workspace BenorMedia, United States).**

| Content Editor | Editor id | SEO | AI Search | Total | Note |
| --- | --- | --- | --- | --- | --- |
| Webflow vs WordPress | 17005233 | 54 | 74 | 64 | Gaps filled from the brief: disadvantages, learning curve, ecommerce, speed |
| Website redesign cost | 17005248 | 50 | 72 | 61 | Gaps filled: redesign types, when to redesign, questions for vendors |
| White label web development | 17005286 | 38 | 47 | 43 | Commercial template is about 1,100 words against 3,000-word competitor pages. Audience and capacity sections added; not padded further |
| headless-cms-comparison (baseline, live page) | 17005367 | 63 | n/a | 63 | Re-score after the refresh ships |
| website-maintenance-checklist (baseline) | 17005378 | 77 | n/a | 77 | Re-score after the refresh ships |
| astro-cms (baseline) | 17005383 | 56 | n/a | 56 | First-hand section added; the use-case gap is already covered by the post's CMS types table |

saas-website-redesign and track-brand-mentions-in-chatgpt only get a meta description, an FAQ item, and (for the latter) one first-hand section, so no editor was created.

**AI detector (Surfer's free detector, target under 20%).** Webflow vs WordPress 16% (first draft 28%; takeaways, lead, and cost section rewritten), website redesign cost 7%, white label page 0%, all new site and refresh copy in this brief 0% (final strings, checked 2026-11-09).

## 10. Open gap markers for Sergio

| Id | File | Question | Default if unanswered |
| --- | --- | --- | --- |
| WVW-1 | webflow-vs-wordpress.md | Most common reason clients give for leaving WordPress | Delete the sentence |
| RDC-1 | website-redesign-cost.md | Which redesign line grows most often after kickoff | Delete the sentence |
| WL-1 | white-label-webflow-development.md | Do we join partners' client calls under their name? | Delete the sentence |
| WL-2 | white-label-webflow-development.md | Do we sign partner NDAs by default? | "Ask us about confidentiality terms before you share the brief." |
| WL-3 | white-label-webflow-development.md | Can we name SimpleTiger as a partner, years and sites | Delete the bullet |
| WL-4 | white-label-webflow-development.md | Every partner project delivered by our own staff, no subcontractors? | Delete the bullet |
| WL-5 | white-label-webflow-development.md | Which US and European hours we cover | Delete the sentence |
| P32-5, P32-6 | /blog/astro-cms refresh | Why Sanity; hosting and publish-to-live | Delete both sentences |
| P64-9 | /blog/track-brand-mentions-in-chatgpt refresh | Publish the November 9 AI Mode reading as written (setup, result, weekly rerun) | Delete the section; use the second meta description |

## 11. Not for Claude Code (Sergio's list)

- Webflow partner profile (@benor-media): add 6 to 10 showcase projects and case-study links, and change "from $1,000" to the real starting price. It brought 1 of the last 10 clients.
- Retire or update the old @benormedia Webflow profile (Asturias, Spanish copy, no badge, joined October 2021).
- Clutch: 10+ reviews at 4.8 or higher; ask in the same call as the case-study quote.
- Roundup pitches: add the neutral lists with the most AI citations (SaaSInsight, Retainable, topagency.webflow.io) to the list in the plan, plus AEO/GEO agency roundups.
- Record a 5 to 8 minute walkthrough of the Webflow vs WordPress table for YouTube: 6 of the 13 sources in Google's AI Overview for that query are YouTube videos.
- Footer credits: keep the existing branded ones; don't add more. Track links from case studies and roundups instead of DR.
- After deploy: request indexing in Search Console for the URLs listed in T7.
