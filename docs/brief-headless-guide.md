# benormedia.com: the Webflow vs custom code guide and the headless CMS service page

Task brief for Claude Code. Prepared 2026-10-09 for Sergio Gancedo and updated 2026-10-10 with his answers on the stack, upkeep, pricing and BenorMedia's own site (facts sheet S1, S4, S5, S7 and W1), and for the Claude Code kit: `CLAUDE.md`, the slash commands, and review sheets with answer columns. It draws on the "move off Webflow" research of 2026-10-09: Ahrefs Keywords Explorer and SERP data (US, 2026-10-09), two Surfer Content Editors (2026-10-09), Webflow's, Google's and the frameworks' own documentation, and the two content files that come with this brief. Verify every claim against the repo before relying on it.

The rule from the pilot stays: **Claude drafts, a person owns the facts and the final edit, and nothing publishes without that person's sign-off.**

The repo's `CLAUDE.md` holds the house rules for all content work; this brief repeats the ones that matter here, and for this task the brief wins if the two ever differ.

As with `docs/brief-next-pages.md`, **the copy is already written.** Each page has a content file in `docs/content/`. It holds the SEO fields, the visible copy in page order, a note on which component to use for each section, the internal links, the sources and the open facts. Your job is to build the pages from those files word for word, wire up markup, checks and links, and prepare the review sheets. Do not rewrite, add or cut copy. If a sentence doesn't fit its component, or contradicts the repo or the live site, STOP and ask, or list it in the report.

What is new this time:

- **A guide, not only a service page.** `/guides/webflow-vs-custom-code` uses the template of the two live guides (`/guides/webflow-enterprise` and `/guides/wordpress-to-webflow-migration`): question H2s, key takeaways, tables with captions, a numbered sources list, a byline and an FAQ.
- **The site's first page about custom code.** `/headless-cms-agency` uses the `/webflow-migration` service template. Nothing on benormedia.com mentions Next.js, headless or custom-coded builds today. Sergio answered the four open facts on 2026-10-10, so neither page carries a marker now; the confirmations left are rows in the review sheets.

| Page | Template | Content file | Ships when |
|---|---|---|---|
| `/guides/webflow-vs-custom-code` | Guide (`/guides/webflow-enterprise`) | `docs/content/guide-webflow-vs-custom-code.md` | The person signs off its review sheet (no markers to resolve) |
| `/headless-cms-agency` | Service page (`/webflow-migration`) | `docs/content/headless-cms-agency.md` | The person signs off its review sheet (no markers to resolve) |

Both pages are built on one branch, `seo/headless-guide`, because they link to each other. Either page can ship alone; see "Sign-off and release commit".

**Timing.** Webflow's new Site plans reach sites in Freelancer and Agency Workspaces, and sites on legacy discounts from 2022 or earlier, on November 16, 2026. Searches about Webflow's prices and alternatives are likely to rise around that date. Aim to publish the guide by early November.

## How to run this (Sergio)

1. Install the kit as its START-HERE.md explains: `CLAUDE.md`, the `.claude/` folder, this file as `docs/brief-headless-guide.md` and the content files in `docs/content/`, committed on the base branch.
2. Open Claude Code in the repo root and type `/seo-headless-guide`, or paste:

   > Read docs/brief-headless-guide.md and the two content files it names in docs/content/. Do the Discovery section, show me what you found, and stop until I reply. Then do the tasks on a new branch `seo/headless-guide`, one commit per task, using the copy in docs/content/ word for word, and stop at any "STOP and ask" line. Do not merge into the base branch, push the base branch or deploy. Finish with the report described at the end of the brief.

3. Reply to Discovery with the answers to its questions and to G1 to G3 and W5 below, or say the defaults are fine. The other facts sheet items are confirmations: you answer them in the review sheets, and none blocks the first draft.
4. What happens next, and who does it:

   | Step | Who | What |
   |---|---|---|
   | 1 | Claude Code | Builds both pages as drafts (`noindex`), adds the links, writes the review sheets, pushes the branch so Vercel builds a preview, reports, and stops |
   | 2 | You, or the person who owns the final edit | Opens the previews and fills in "Your answer" for each `open` review-sheet row: the fact, or "delete" |
   | 3 | Claude Code (`/seo-revise`) | Applies the answers, reruns the checks, pushes the branch |
   | 4 | The person who owns the final edit | Reads each page once more, edits, then says "approved" |
   | 5 | You (or Claude in Cowork), optional | Pastes the final visible text into the two Surfer editors (Appendix D) and records the scores |
   | 6 | Claude Code (`/seo-release`) | Makes the release commit, pushes the branch, gives the pull request link, then stops |
   | 7 | You | Merge the pull request, deploy, then the post-deploy steps in "Verification" |

5. Add the minutes for steps 2 and 4 per page to `docs/pilot-log.md` (Appendix C).

### Inputs from Sergio (facts sheet)

G1 to G3 and W5 decide how Claude Code works: answer them in your reply to Discovery, or here before you start. Each has a default, so "defaults are fine" is a full answer. The other items are confirmations. Each becomes a review-sheet row, and you answer it there.

General:

- **G1. Base branch:** `main`. If `seo/next-pages` (the four service pages) is not merged yet, say so here, and whether to branch from `main` anyway: `dev`, not `main` (this repo's integration branch; `main` is production and only the project lead releases to it). Branch from `dev` even if `seo/next-pages` isn't merged yet
- **G2. Preview:** Claude Code pushes `seo/headless-guide` (never the base branch) so Vercel builds a preview. If you don't want that, say so here: `________`
- **G3. Byline:** the guide's byline is "Sergio Gancedo, Managing Director, BenorMedia", as on the two live guides. Change it here if someone else is the author: `________`

The service page `/headless-cms-agency` (each item is one line of the review sheet):

1. **S1. Stack.** Answered 2026-10-10: any framework. The copy names widely searched frameworks and CMSs (see "Framework and CMS demand"): Next.js and Astro in the title and meta description, Nuxt and SvelteKit as other frameworks, and Contentful, Strapi, Sanity, Storyblok and Payload as CMSs. Still to confirm in the review sheet: "We work with any headless CMS" (section 3) and "we work with all the common ones" (FAQ), since the answer named frameworks; the FAQ's advice (Astro for most marketing sites, Next.js for app-like sites, Nuxt or SvelteKit for Vue or Svelte teams); and the hosts named (Vercel, Netlify, Cloudflare): `________`
2. **S2.** "Most of the B2B sites we build are in Webflow" (section 4). It matches the FAQ on `/website-redesign`: `________`
3. **S3. Process claims** (no marker; the review sheet is the gate): TypeScript, a preview build for every change, migration scripts followed by a check of every page by hand, a crawl of the staging site compared with the live one, the repository and every account in the client's name, and the CMS selection process in the FAQ (two or three candidates compared, one recommended in the strategy plan): `________`
4. **S4. Upkeep.** Answered 2026-10-10: yes, ongoing support covers security and dependency updates on custom-coded sites. Section 8 and the FAQ "Who hosts the site and handles security updates?" say so.
5. **S5. Pricing.** Answered 2026-10-10: a fixed price per build, based on the number of pages and their complexity. The cost FAQ says so without figures, and points ongoing changes, support and security updates to `/ongoing-website-support`, because `/pricing` only describes Webflow work today. The guide's cost section uses the same logic (pages and complexity).
6. **S6. Promises.** The CTA ("We'll say whether a headless build, a Webflow add-on or no change fits best, and why") and the hero line "so we start by checking it's worth it": `________`
7. **S7. Your own site.** Answered 2026-10-10: yes. The hero proof line, the framework FAQ and the guide's callout say benormedia.com runs on Astro with Sanity.
8. **S8. Proof.** Can you name any custom-coded or headless client project, with a link or a screenshot? The page is much stronger with one. If yes, the work grid shows it first: `________`
9. **S9 and S10.** "We build in Webflow as well, so we don't need to sell you either option" (FAQ); "We design this part with the people who will use it every day" (section 6); editor training as live sessions plus written guides; documentation kept in the repository; a speed budget with lab tests for the Core Web Vitals on every build: `________`

The guide `/guides/webflow-vs-custom-code`:

10. **W1. Own-site story.** Answered 2026-10-10: Sergio asked Claude to draft it. The callout in section 10 makes three claims for the person to check: why Astro (a site that is mostly content, with JavaScript only where it's needed), why Sanity (content stored as structured data, so one piece can feed several pages), and that running both lets BenorMedia test the setup it recommends before suggesting it to a client. Its one figure comes from BenorMedia's own crawl of 2026-10-05: the home page's HTML links a single JavaScript file. That counts linked files, not every script a browser may load, so recheck it in a browser before release: `________`
11. **W2.** The sentence in "How was this guide written and checked?": "This guide draws on BenorMedia's Webflow projects and on building our own site in Astro and Sanity." If you have shipped custom-coded client sites, say so here and the sentence will name them: `________`
12. **W3. BenorMedia's stated views** (no marker; the review sheet is the gate): "Most B2B marketing sites don't need custom code", "Two or more signals in the 'Move' rows deserve a closer look", "Next.js is the usual pick", "Most early-stage startups are better off in Webflow", the disclosure "BenorMedia earns money on both sides of this decision", and the 30-day recheck: `________`
13. **W4. Partner terms.** Confirm nothing in your Webflow partner agreement stops you from publishing either page. The guide is about leaving Webflow; the service page sells moves off Webflow (section 6) and says your own site runs on Astro and Sanity. The guide recommends Webflow for most sites, names three ways to add code without leaving, and sends readers who should stay to the Webflow Enterprise guide. W4 is a row on both review sheets: `________`
14. **W5. Navigation.** Should the guide be listed in the footer's Guides group, and the service page in the Services menu or footer? Nothing changes in navigation unless you say so here: `________`

## What the pages must do

They catch two kinds of searchers: teams wondering whether to leave Webflow, and teams already looking for someone to build a headless site. They also give AI answers a clear, sourced page to cite. The guide answers the decision honestly, including when to stay. The service page shows what BenorMedia builds and when it would recommend Webflow instead.

| Page | Main terms (US volume, KD where known) | What makes it worth citing |
|---|---|---|
| `/guides/webflow-vs-custom-code` | webflow alternatives (900), webflow export code (150), webflow cms api (150, 0), webflow to react (80), webflow export to react (80), webflow vs react (50), is webflow worth it (50, traffic potential 600), webflow vs custom code (30), webflow headless cms (30, 0), headless cms migration (200), webflow price increase (100, 20) | A decision table, what Webflow's code export leaves out (from Webflow's docs), the three middle paths, the security trade-off with dated CVEs, Google's site-move steps, and when to stay |
| `/headless-cms-agency` | headless cms development (600, 5; mostly informational results), headless cms agency (400, 0), headless cms development company (300, 1), nextjs development company (300, 6), headless web development (250, 0), custom website development agency (250, 16), next js development agency (200, 6), headless website development (200, 3), headless cms migration (200), sanity agency (150, 4), custom coded website (150, 0) | A Webflow Professional Partner that builds both ways and says when headless isn't worth it |

Measured by: positions for these terms once they are in Ahrefs Rank Tracker, Search Console clicks and impressions per page, and mentions for the prompts in "Verification" in the Surfer AI Tracker (project 12538) and Trakkr. No ranking or revenue promise goes on the pages, in the copy or in your report.

## Research behind the pages

### Demand and results pages (Ahrefs, US, 2026-10-09)

- Few people search for "webflow to nextjs" (10) or "webflow vs nextjs" (0) by name. The demand sits around them: the export cluster (about 1,300 searches a month across "webflow export code", "webflow to html", "export webflow" and similar), "should we stay?" searches (about 1,900: "webflow alternatives", "webflow pros and cons", "is webflow worth it", "webflow price increase"), and the headless service terms above. "webflow alternatives" grew from 662 to 1,097 searches between September 2025 and September 2026.
- **"headless cms agency"**: listicles, Reddit and small sites (DR 11 to 58). A service page with clear scope can compete.
- **"headless cms development"**: mostly "what is a headless CMS" guides from CMS vendors. The service page answers that question briefly in section 3 and its FAQ, but the term isn't the page's main target.
- **"headless cms migration"**: one agency service page at the top, then vendor guides.
- **"webflow export code"**: Webflow's help article ranks first and is cited in the AI Overview. The guide's export table summarizes it and links to it.

### Framework and CMS demand (Ahrefs, US, 2026-10-10)

Used to pick which names the service page shows, since BenorMedia builds with any of them.

- Frameworks: "nextjs development company" (300), "next js development agency" (200) and "nextjs agency" (80); "astro js" (1,600) and "astro framework" (1,200); "sveltekit" (6,700); "nuxt js" (600 in the US, 10,000 worldwide). "react development agency" has 500.
- Headless CMSs: "contentful" (21,000), "strapi" (6,000), "sanity cms" (3,400), "storyblok" (2,600), "directus" (2,300) and "payload cms" (2,000). Agency searches: "storyblok agency" (300), "sanity agency" (150), "contentful agency" (90), "strapi agency" (90), "payload cms agency" (50).

### Market data the guide uses

- TechnologyChecker's July 2026 crawl: 988 domains moved from Webflow to Next.js in about five weeks, 95 the other way; 249,194 active Webflow domains, 570,205 on Next.js. The article has been revised since (its Framer figures run to September 7, 2026), so the guide uses only the Next.js figures.
- Webflow's "Updated pricing and simplified plans for May 2026" (updated August 31, 2026) for the plan changes and dates.
- Vellum's write-up of its move off Webflow (May 12, 2026), the only detailed public case with numbers. No agency case studies are cited, under the no-agencies rule.

### Surfer pass (2026-10-09)

Both pages were scored in Surfer Content Editors (workspace 1395950), revised once, fact-checked by a second reviewer, and scored again on 2026-10-10 after Sergio's answers and a final review. Scores are SEO / AI Search / total.

| Page | Draft v1 | Final draft (these files) | Visible words |
|---|---|---|---|
| `/guides/webflow-vs-custom-code` | 64 / not yet calculated / 64 | 71 / 91 / 81 | 3,845 (plus 318 in the sources list) |
| `/headless-cms-agency` | 49 / not yet calculated / 49 | 63 / 74 / 69 | 2,412 |

Surfer suggests 1,216 words for the guide, because the pages ranking for "webflow vs custom code" are short forum and help pages, and 3,412 for the service page, because "headless CMS" guides inflate the target. Neither number is a goal. The guide is longer than the two live guides (about 2,000 and 3,000 words) because it covers several search clusters; if the person wants it shorter, the FAQ is the place to cut, not the tables.

### Fact check

A second reviewer opened every source behind the visible copy on 2026-10-09. The content files include its corrections: Google's DNS advice ("a few hours", at least a week ahead), the crawl-rate note (lower after a hosting change, higher after a move with new URLs), Collection URLs (item pages can sit inside a folder), Vellum's wording, the Webflow plan dates ("at renewal"), and three pairs of near-duplicate sentences between the two pages. Every outside fact has its source in the content file's "Sources (tier B)" table.

**FAQ rich results are gone.** Google stopped showing FAQ rich results on May 7, 2026, and removed their documentation on June 15, 2026 (Search Central updates page). `FAQPage` markup is still valid schema.org and stays on both pages, as on the rest of the site, but it no longer earns a rich result in Google. The Rich Results Test won't report it, so validate it with validator.schema.org instead. This also applies to the verification step in `docs/brief-next-pages.md`.

## Page specs

| Page | Title (characters) | H1 | Breadcrumb | JSON-LD |
|---|---|---|---|---|
| `/guides/webflow-vs-custom-code` | `Webflow vs Custom Code: When to Leave Webflow \| BenorMedia` (58) | Webflow vs custom code: when to move off Webflow, and when to stay | Home › Webflow vs custom code | What the live guides emit, plus `FAQPage`. If they emit nothing: `Article`, `FAQPage`, `BreadcrumbList` |
| `/headless-cms-agency` | `Headless CMS Agency: Next.js & Astro Development \| BenorMedia` (61) | Headless CMS agency for B2B SaaS: custom-coded sites your marketing team can still run. | Home › Custom Websites & Migrations › Headless CMS Development | `Service`, `FAQPage`, `BreadcrumbList` |

Meta descriptions, the `Article` and `Service` fields and Open Graph settings are in each content file's "SEO fields" table. Language: US English. Navigation: no change unless facts sheet item W5 says otherwise.

## Ground rules

1. **The copy is final until the person edits it.** Use the visible copy in `docs/content/*.md` word for word: headings, body, list items, table captions and cells, FAQ questions and answers, source entries, link targets and anchors. Lines that start with `>` are builder notes and never appear on a page. Lines such as `- Tags:`, `- Eyebrow:`, `- Sub-line:`, `- Button:`, `- Buttons:`, `- Table caption:`, `- Callout:` and `- Byline:` are visible labels and part of the copy. What you may write yourself: image alt text the content file doesn't give, `aria-label`s and file names, all plain and free of claims.
2. **Tiers.** Each content file sorts its claims: tier A in "Already on benormedia.com", tier B in "Sources (tier B)", tier C in "Statements a person must confirm" (open ones are review-sheet rows; neither page has markers now). Reuse a tier A claim only if Discovery finds it on the live site today.
3. **Markers.** `[FACT NEEDED: ...]`, `[VERIFY: ...]`, `[PERSON: ...]`, `[QUOTE: ...]` and `[RESULT NEEDED: ...]` stay visible in the preview and in the data files, never in comments. `scripts/check-draft.mjs` lists them and blocks the release while any remain. Since 2026-10-10 neither page carries one, so `check-draft.mjs` should list none; if the person adds a marker during review, it blocks the release as usual.
4. **Wording.** Same list as before:
   - "Webflow Professional Partner" is the only partner wording. Never "Enterprise Partner", never "Official Webflow Partner".
   - The brand is "BenorMedia", one word.
   - No BenorMedia prices, ranges, tiers or discounts. Plans are named and linked to `/pricing`. The guide writes Vellum's saving as "30,000 dollars" on purpose, so the price check doesn't trip on a third-party figure; keep it that way.
   - No promises, no internal tool names (Ahrefs, Surfer, Trakkr, Screaming Frog), no other agencies named, nothing copied from competitor pages. CMS vendors, hosts and frameworks (Contentful, Strapi, Sanity, Storyblok, Payload, Next.js, Astro, Nuxt, SvelteKit, Vercel, Netlify, Cloudflare, Framer, WordPress) are named on purpose. The guide's "October 2026 crawl" is BenorMedia's own crawl of its site; don't name the tool behind it.
   - No em dashes in visible copy. The content files have none; don't introduce any in alt text or labels.
5. **Structure.**
   - Service page: H2s end with a full stop, as on the live service pages.
   - Guide: H2s are questions, as on the live guides. Match the live guides for the FAQ H2's punctuation and for whether "Sources" and the FAQ appear in the table of contents.
   - On both pages the FAQ array is the single source for the visible FAQ and the `FAQPage` markup. Answers with links render as links on the page and as plain text (the anchor words) in `acceptedAnswer.text`.
   - Tables are real HTML tables with a `<caption>` (the content file's "Table caption" line) and header cells with `scope="col"`, using the live guides' table component. At 390 px a table may scroll inside its own wrapper, but the page must not overflow.
   - No text baked into images.
6. **Scope of edits.** Reuse the components the two templates already use. No new components unless Discovery shows the guide template lacks one the content file needs (a callout, a table with three columns); then build the smallest version from the site's existing variables and say so in the report. Don't touch positioning copy, existing JSON-LD, navigation or other pages, except the link tasks.
7. **Safety.** One commit per task with a conventional message (`feat(seo): ...`, `chore(seo): ...`, `docs(seo): ...`). Do not merge into the base branch, force-push, push the base branch or deploy. Merging the base branch into `seo/headless-guide` is fine when this brief or the person asks for it: a normal merge, never a rebase. Never touch DNS, registrar settings, mail records, tokens or credentials. Add no runtime dependencies.

## Discovery (before editing anything)

Report:

- the repo state: current branch, `git log --oneline -20`, the base branch, and whether `seo/next-pages` is merged into it;
- that `scripts/check-seo.mjs`, `scripts/check-draft.mjs`, `scripts/check-crawlers.sh` and `scripts/indexnow.mjs` exist; whether `check-draft.mjs` already has the five-marker pattern and the dash warning (Appendix A); and the output of a baseline `npm run build` and `node scripts/check-seo.mjs dist`;
- **how the two live guides are built**, because they are the template for the new guide:
  - where their content lives: an Astro page with a data file, a content collection, or Sanity documents;
  - the components behind each block: header (breadcrumb, eyebrow, date line, reading time), visual, share links, table of contents, key takeaways, body sections, tables with captions, the eight-step stepper on `/guides/wordpress-to-webflow-migration`, any callout or quote block, "How was this guide written and checked?", the numbered sources list with access dates, the byline, the FAQ, the CTA band, the related cards, testimonial and contact form;
  - how reading time and the dates are set, and whether the guides have a `DRAFT`/`noindex` pattern like `/webflow-migration`;
- how `/webflow-migration` is built (page file, data file, `DRAFT` flag, `noindex`, the component behind each section), because it is the template for `/headless-cms-agency`;
- what a page with `DRAFT = true` does in a production build, which is also what Vercel previews run: built with `noindex` (the `/webflow-migration` pattern) or left out. If it's built, a merged draft would be live, which is why a held page leaves the branch before a release (see "If one page holds up the other");
- how JSON-LD is emitted: the helper, the shared Organization `@id`, what the live guides output (if anything), and how the `/pricing` FAQ feeds both the visible FAQ and its markup;
- how the numbered process on `/custom-websites-migrations` renders step 03 "Website development", where task 4 adds a sentence;
- whether the footer's Guides group and the Services menu come from a data file, and which pages they list;
- the `PAGES` map in `scripts/check-seo.mjs` (including how it uses the `keyword` field), the `LASTMOD` map in `astro.config.*`, and the shape of the lines in `public/llms.txt`;
- the tier A claims the content files reuse, quoted exactly from the live pages with their URLs, and any that no longer appear.

**STOP and ask** if the guides' content lives in Sanity and a new guide can't be added without Sanity credentials. Don't ask for a token in the chat and don't commit one. Sergio decides whether to create the document himself or to build the guide as a data file. If he creates it in Sanity, it stays an unpublished draft until the release; STOP again and agree with him how the preview, the marker check and the release step work for it before Task 3. Also STOP and ask if `scripts/check-draft.mjs` is missing, if a `DRAFT` page is left out of production builds (the previews wouldn't show the new pages), if a tier A claim is no longer on the live site, or if the live site contradicts "Webflow Professional Partner".

## Tasks (branch `seo/headless-guide`)

### Task 1. Branch and draft check

1. Create `seo/headless-guide` from the base branch (facts sheet G1).
2. If the base branch's `scripts/check-draft.mjs` lacks the five marker types or the dash warning, apply the three edits in Appendix A exactly as written and change nothing else in the file. `seo/next-pages` makes the same edits, so the two branches merge without conflict. If the base branch already has them, there is nothing to change.

Commit: `chore(seo): extend draft check markers` (skip if there is nothing to change).

### Task 2. Draft `/headless-cms-agency`

1. **Data file.** All visitor-facing copy from the content file's "Visible copy", in page order, plus the title, meta description, FAQ array, `publishedAt` and `updatedAt` (today for both while drafting) and `export const DRAFT = true;`. Same pattern as the `/webflow-migration` data file.
2. **Page.** Build it from the components `/webflow-migration` uses, in the content file's section order. Each section's `>` note names the component. The FAQ has 13 questions; if the FAQ component has a cap, say so in the report and don't cut questions.
3. **Visuals.** Reuse the diagram components with the labels the notes give (section 3: headless CMS, content API, Next.js or Astro front end, CDN, with CRM, analytics and product data feeding in; section 4: five labels). If a component can't take new labels, keep its default visual and list the one to make in the report under "visuals to make".
4. **Links.** Section 7 links to `/aeo-agency`. If `/aeo-agency` isn't on the base branch, render "AEO and GEO" as plain text and list it in the report.
5. **`noindex`** while `DRAFT` is true.
6. **JSON-LD.** `Service`, `FAQPage` and `BreadcrumbList` with the fields in the content file's "SEO fields" table. `provider` points to the shared Organization `@id`. No `offers`.
7. **Checks.** Add the page to `PAGES` in `scripts/check-seo.mjs` with `expected: ['Service', 'BreadcrumbList', 'FAQPage']` and the keyword `headless cms agency` (in both the title and the H1). If `check-seo.mjs` uses the keyword differently, follow its logic and report the value you chose; don't change the copy to pass it. Add the page to `LASTMOD` with today's date. Don't touch `public/llms.txt` yet.

Commit: `feat(seo): draft /headless-cms-agency`.

### Task 3. Draft `/guides/webflow-vs-custom-code`

1. **Content.** Follow the live guides' pattern from Discovery: data file, collection entry or (after the STOP above) whatever Sergio decided. All visible copy word for word, including the table captions and cells, the callout, the 25 sources with their access dates, the byline and the FAQ array (10 questions). `DRAFT = true` and today's dates while drafting.
2. **Page.** Build it from the live guides' components, in the content file's section order:
   - header with the visual from the section 1 note;
   - table of contents from the H2s;
   - key takeaways;
   - ten body sections with four tables: signals (three columns), what Webflow runs (two columns), what the code export includes (two columns), common choices (three columns);
   - the eight-step stepper from `/guides/wordpress-to-webflow-migration`, with the eight step names in the section 12 note;
   - "How was this guide written and checked?", sources, byline, FAQ, CTA band, the two related cards, testimonial and contact form.
3. **Visuals.** The header visual (three columns: stay, add code, move) and the optional two-bar visual in section 5. If the template can't take them as live text, keep its default and list them under "visuals to make".
4. **`noindex`** while `DRAFT` is true, the same way as the service pages if the guides have no pattern of their own.
5. **JSON-LD.** Whatever the live guides emit, built from the content file's "Article markup" row, plus `FAQPage` from the FAQ array and `BreadcrumbList`. If the live guides emit nothing, add `Article`, `FAQPage` and `BreadcrumbList` with the shared helper, and say in the report that the two older guides still emit nothing (don't change them here).
6. **Checks.** Add the page to `PAGES` with the types you emit and the keyword `webflow vs custom code` (in both the title and the H1), and to `LASTMOD` with today's date. Don't touch `public/llms.txt` yet.

Commit: `feat(seo): draft /guides/webflow-vs-custom-code`.

### Task 4. Links into the new pages

Add these word for word, one sentence or link per row, with no heading, layout or positioning change. Set `LASTMOD` for each page you change. If a page has no natural place for the link, don't edit it: put the proposed sentence and location in the report.

| Link to | From | What to add |
|---|---|---|
| `/headless-cms-agency` | `/custom-websites-migrations`, step 03 "Website development" (the step that lists "Custom development") | "Building in code? See [headless CMS development](/headless-cms-agency)." |
| `/guides/webflow-vs-custom-code` | `/guides/webflow-enterprise`, end of "When is Webflow not the right fit for an enterprise site?" | "Weighing a move to code? See [Webflow vs custom code](/guides/webflow-vs-custom-code)." |
| `/headless-cms-agency` | `/website-redesign`, section 5, item "The right platform." (only if `seo/next-pages` is merged) | Link the existing words "custom code" |
| `/headless-cms-agency` | `/cybersecurity-web-design`, FAQ "Do you work with security companies that aren't on Webflow?" (only if `seo/next-pages` is merged) | Link the existing words "custom-coded sites" |
| `/guides/webflow-vs-custom-code` | Footer Guides group (only if facts sheet W5 says yes and the group is data-driven) | "Webflow vs Custom Code" |

The links between the two new pages are already in their copy. If `seo/next-pages` isn't merged, list the two conditional rows in the report as "to add when `seo/next-pages` merges".

Commit: `feat(seo): link existing pages to the guide and the headless page`.

### Task 5. Review sheets

Save Appendix B twice, as `docs/review-headless-cms-agency.md` and `docs/review-guide-webflow-vs-custom-code.md`. Fill each from its content file: one row per sentence, table cell or figure that states a fact, with its tier and source. A tier B row is `ok` only if you opened the source during this task and it still says that; otherwise `open`. Tier C rows start `open`. Add one numbered row per facts sheet item that touches the page: S1 to S10 and W4 for the service page, W1 to W4 for the guide. Items answered on 2026-10-10 (S4, S5, S7) start `confirmed`, with 2026-10-10 in "Date"; S1 and W1 start `open` for the parts still to confirm. Leave "Your answer" empty, and put today's date in "Date" for each row you mark `ok`. Write the rows in plain language: this is what the person works from.

Commit: `docs(seo): review sheets for the guide and the headless page`.

### Task 6. Run, preview, report version 1, then stop

1. `npm run build`, `node scripts/check-seo.mjs dist`, and `node scripts/check-draft.mjs <page file> <data file>` for each page. Paste the output.
2. Push `seo/headless-guide` with the branch named (`git push -u origin seo/headless-guide`), never the base branch, so Vercel builds a preview, unless facts sheet G2 says otherwise. Get the two preview URLs with `gh`, from the pull request (open a draft pull request into the base branch if there is none) or from GitHub's deployment status, or ask Sergio; the Vercel CLI is blocked. If you cannot push, say so and give the local command.
3. Look at each page at 1440 px and 390 px. Nothing may overflow the page; the four tables, the stepper and the FAQ must stay readable on a phone.
4. Send the report described at the end of this file, with the open review-sheet rows grouped by facts sheet item. Then stop and wait for answers.

## After the first draft

### Revision (Claude Code)

1. Apply the person's answers from the review sheets' "Your answer" column: confirm the row, or delete the claim. Never rephrase a claim to keep it alive without its fact. If the person changes the frameworks or CMSs named, they edit the title, meta description, hero, section 3 and the framework FAQ together; you apply their wording. If a deletion leaves a list or section too thin, say so; don't fill the gap with new claims.
2. Keep the two pages apart. Their FAQs cover related ground in different words, so the guide and the service page don't compete for the same answer. If an edit makes a sentence on one page repeat the other word for word, flag it.
3. Update the review sheets: set each resolved row to `confirmed` or `removed`, with the date. Rerun the build, `check-seo.mjs` and `check-draft.mjs`.
4. Commit (`chore(seo): apply review answers`), push `seo/headless-guide` so the previews update, and report what changed between version 1 and version 2.

### Surfer (optional; Sergio, or Claude in Cowork)

After the final edit, paste each page's visible text from the preview into its Surfer editor (Appendix D), replacing the old text, and record the score in the pilot log. No pass mark is set. Don't pad either page to reach Surfer's suggested length.

### Sign-off and release commit

The person who owns the final edit approves the pages: "approved" in the conversation, or "Approved to publish (yes or no): yes" in the sign-off block of each page being released. Then:

1. Every row in the review sheets of the pages being released is `ok`, `confirmed` or `removed`. This must print nothing:

   ```bash
   for f in docs/review-headless-cms-agency.md docs/review-guide-webflow-vs-custom-code.md; do grep -qE '^\| *[0-9]+ *\|' "$f" 2>/dev/null || echo "MISSING OR EMPTY: $f"; grep -nHE '^\| *[0-9]+ *\|' "$f" 2>/dev/null | grep -viE '\| *`?(ok|confirmed|removed)`? *\| *$' || true; done
   ```

   No page carries a marker, so the review sheets are the only gate for the confirmations left (the rest of S1, S2, S3, S6, S8, S9, S10 and W1 to W4). If a row prints, don't make the commit; ask.
2. If the base branch has moved since `seo/headless-guide` was created, merge it into the branch first: a normal merge, never a rebase or force-push.
3. One commit, `feat(seo): publish the headless guide and service page`:
   - `DRAFT` to `false` on both pages, and `publishedAt` and `updatedAt` to the sign-off day;
   - `LASTMOD` for both pages, and for every page changed in task 4, to the sign-off day;
   - one line per page in `public/llms.txt`, built from the final meta description, in the file's existing format.

   Before you commit, `node scripts/check-draft.mjs --release <page file> <data file>` must pass for each page, and so must the build and `check-seo.mjs`. If one fails, undo the release edits with `git restore`, don't commit, and report.
4. Push `seo/headless-guide` (`git push -u origin seo/headless-guide`), mark its pull request ready for review (`gh pr ready`), or open one into the base branch if there is none, and give the link.
5. Stop. A person merges the pull request and deploys.

**If one page holds up the other.** Either page can ship alone, for example the guide while the service page's review sheet still has open rows. Do this only when the person asks (`/seo-release docs/brief-headless-guide.md hold <URL of the page to hold back>`), and before any release edits:

1. Create a hold branch for the held page from `seo/headless-guide` (`seo/hold-headless-cms-agency` or `seo/hold-guide-webflow-vs-custom-code`) and push it. It keeps both pages as they are, so nothing is lost.
2. On `seo/headless-guide`, in one commit (`chore(seo): hold <page URL> for a later release`):
   - remove the held page: its page and data files, its review sheet, and its `PAGES` and `LASTMOD` entries;
   - remove the task 4 links that point to it;
   - on the page that ships, turn each link to the held page into plain text, and drop the item that only links to it: the Services card in the guide's section 19, or the guide's entry in the service page's section 14.
3. Show the person every change to the page that ships and wait for their OK, since they approved it with those links. List the changes in the report, to undo when the held page ships.
4. Release the page that ships as above, with the gate and the checks run on that page only and its own commit message: `feat(seo): publish /guides/webflow-vs-custom-code` or `feat(seo): publish /headless-cms-agency`.
5. Revise the held page on its hold branch. When it's approved, the person runs `/seo-release docs/brief-headless-guide.md <URL of the held page>`. Create `seo/release-<page>` from the base branch, copy the held page's files in from the hold branch (`git checkout <hold branch> -- <files>`), add back its `PAGES` and `LASTMOD` entries and the links from step 2, and release it the same way. Don't merge the base branch into the hold branch: Git would apply the removal from step 2 and delete the page.

## Verification

Before Sergio merges:

```bash
npm run build
node scripts/check-seo.mjs dist
node scripts/check-draft.mjs --release <page file> <data file>   # once per page; must pass
for f in docs/review-<page>.md; do grep -qE '^\| *[0-9]+ *\|' "$f" 2>/dev/null || echo "MISSING OR EMPTY: $f"; grep -nHE '^\| *[0-9]+ *\|' "$f" 2>/dev/null | grep -viE '\| *`?(ok|confirmed|removed)`? *\| *$' || true; done   # review gate, once per page; must print nothing
bash scripts/check-crawlers.sh                                    # production, not changed by this branch
```

After Sergio deploys (not you):

- run `node scripts/check-seo.mjs https://www.benormedia.com` and confirm each new URL returns 200, is indexable, and appears in `sitemap-0.xml` with the sign-off date;
- run `npm run indexnow --` with the two new URLs and every page changed by task 4;
- in Search Console, inspect each new URL and request indexing;
- run each URL through Google's Rich Results Test (for `Article` and `BreadcrumbList`; it no longer reports FAQ) and through validator.schema.org (for every type, `FAQPage` and `Service` included): no errors;
- add the terms from "What the pages must do" to Ahrefs Rank Tracker;
- after Google has indexed the pages, check these prompts and note the date, platform and result next to a baseline taken before launch:
  - Surfer AI Tracker (project 12538): "Webflow vs custom code for startups" (already tracked, prompt id 187888);
  - Trakkr (already tracked): "Webflow Enterprise vs custom-coded website for a large SaaS company" and "Is Webflow good enough for an enterprise B2B SaaS website?";
  - add to both: "Should we move our Webflow site to Next.js?", "Can you export a Webflow site's code?", "Best headless CMS agency for B2B SaaS", "Webflow alternatives for a SaaS company";
- finish `docs/pilot-log.md`.

## Report (end of your last message)

For the branch, and again after revision, report:

- the status of each task and the files changed;
- the output of the checks and the preview URLs;
- the visible word count per page. The guide is 3,845 words without its sources list and the service page 2,412; explain a gap of more than 5%;
- the open review-sheet rows, grouped by facts sheet item, and any marker the person added;
- the visuals still to make;
- what you chose that this brief did not decide.

Then give three lists: what Sergio or the person must do, what you could not verify, and what you noticed but left alone.

## Noticed, out of scope (do not change in this branch)

- **FAQ rich results.** Google retired them on May 7, 2026. Nothing on the site needs to change; `docs/brief-next-pages.md` was updated on 2026-10-10 to validate `FAQPage` with validator.schema.org.
- **`/webflow-seo-agency` (branch `seo/next-pages`).** Its v2 copy said "CMS items always live at /collection/item" (section "URL structures that can't change later") and "fixed /collection/item URLs" (FAQ). Webflow lets a Collection template page sit inside a folder (for example /content/blog/example-post). `docs/content/webflow-seo-agency.md` v2.1 (2026-10-09) fixes both: "CMS item pages always sit under their Collection's path, such as /blog/post-name, optionally inside a folder" and "item URLs tied to their Collection's path". If that page was built from v2, apply the two changes on `seo/next-pages` before its sign-off.
- **No custom-code offer elsewhere.** `/pricing` and the Services menu mention only Webflow builds. After this page ships, Sergio may want a line on `/pricing` for fixed-price custom builds and a menu entry; facts sheet W5 covers the menu.
- **`/website-redesign` v2.1 (2026-10-10).** Section 5 now names Next.js and Astro and has no marker. Task 4's link on the words "custom code" still applies once `seo/next-pages` is merged.
- **Sources that will change.** TechnologyChecker revised its article after July 2 without changing the date. Webflow's rate-limit page still lists the pre-2026 plan names (60 or 120 requests a minute). Recheck both at the guide's 30-day review.
- **The two older guides.** If Discovery finds they emit no JSON-LD, adding `Article` and `BreadcrumbList` to them is a small, separate task.
- Do not link to planned pages (wave 2 and 3 of the roadmap) until they exist.

## Appendix A: changes to `scripts/check-draft.mjs`

Apply only if Discovery finds the file without them. These are the same three edits as in `docs/brief-next-pages.md`.

1. The comment line that defines a marker:

```js
// A marker is [FACT NEEDED: ...], [VERIFY: ...], [PERSON: ...], [QUOTE: ...] or [RESULT NEEDED: ...] with no square brackets inside, or a TODO, TBD or lorem ipsum.
```

2. The `MARKERS` constant:

```js
const MARKERS = /\[(?:FACT NEEDED|VERIFY|PERSON|QUOTE|RESULT NEEDED)\b[^\]]*\]|\bTODO\b|\bTBD\b|lorem ipsum/gi;
```

3. One more entry at the end of the `WARN` array:

```js
  [/\u2014|\s\u2013\s/, 'em or en dash in copy: the house style uses commas, colons or full stops'],
```

## Appendix B: review sheet template

Statuses: `ok` (tier A or B, checked against its source), `open` (needs the person), `confirmed` (the person confirmed it), `removed` (cut from the page). Number every row, the facts sheet rows included (put the item, such as "S1", in the Section column): the review gate reads only numbered rows, and it passes when every Status is `ok`, `confirmed` or `removed`.

```md
# Review sheet: <page URL>

Draft version: 1 | Preview: <url> | Prepared: <date> | Content file: docs/content/<file>.md

How to use: go to the rows marked `open`. For each, write the fact in "Your answer", or write "delete". Don't use the | character in an answer. Claude Code applies your answers with `/seo-revise` and then sets the status and the date. Rows marked `ok` were checked against their source by Claude Code; open the source if one looks wrong to you.

| # | Section | Sentence, table cell or figure on the page | Tier | Source, or who confirms | Your answer | Date | Status |
|---|---|---|---|---|---|---|---|
| 1 | Hero | "Webflow Professional Partner for 6+ years" | A | benormedia.com home page |  | <date> | ok |
| 2 | Section 8 (guide) | "Only paid Workspace plans can export; Site plans can't." | B | Webflow Help, "How do I export my Webflow site code?" (URL) |  | <date> | ok |
| 3 | Section 5 (service page) | "Then we check every page by hand" | C | Sergio, facts sheet item S3 |  |  | open |
| 4 | Section 8 (service page) | "We watch the advisories and apply security and dependency updates as part of ongoing support." | C | Sergio, facts sheet item S4 | Yes, answered in the facts sheet | 2026-10-10 | confirmed |

## Sign-off

- Facts confirmed by: ________ on ________
- Final edit done by: ________ on ________
- Approved to publish (yes or no): ________
```

## Appendix C: rows for `docs/pilot-log.md`

Add one block per page under the earlier entries.

```md
## <page URL> (brief: docs/brief-headless-guide.md)

| Item | Value |
|---|---|
| Person who owns the facts and the final edit | |
| Draft version 1 ready (date) | |
| Open markers in version 1 (from check-draft) | |
| Minutes: answering the facts sheet | |
| Minutes: checking facts against sources | |
| Minutes: final edit | |
| Surfer score (SEO / AI Search / total): final draft, then final page | see Appendix D for the draft |
| Sentences or figures that were wrong or unsupported (count) | |
| Markers resolved by supplying a fact, and by deleting the claim | |
| Signed off (date), merged and deployed (date) | |
| Total person-minutes | |
```

## Appendix D: Surfer editors

| Page | Editor (main keyword, id) | Link | Final draft score (SEO / AI Search / total) |
|---|---|---|---|
| `/guides/webflow-vs-custom-code` | webflow vs custom code, 16836772 | https://app.surferseo.com/drafts/s/jKM3gVFIvosCgBu3fRwzGJBdIUXsZoWh | 71 / 91 / 81 |
| `/headless-cms-agency` | headless cms agency, 16836778 | https://app.surferseo.com/drafts/s/MQkFSmq3zqRPk8-2xi1wPyGM8urzgS2W | 63 / 74 / 69 |

Terms left out on purpose:

- Generic phrases that would add claims or filler: "innovative solutions", "extensive experience", "engage customers", "future growth", "business grows", "enhanced security", "security best practices".
- Uses that don't fit B2B SaaS marketing sites: "digital signage", "digital kiosks", "e-commerce platforms".
- Forum and video vocabulary from the "webflow vs custom code" results: "comments", "question", "proxy", "trick".
- "Sanity agency", "Storyblok agency" and "Next.js development company" as exact phrases. They would read as a vendor partnership or a claim of scale nobody has confirmed.
