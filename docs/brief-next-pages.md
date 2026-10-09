# benormedia.com: four service pages and the first case study

Task brief for Claude Code. Prepared 2026-10-09 for Sergio Gancedo, from the next-pages roadmap of 2026-10-09, Ahrefs Keywords Explorer (US, 2026-10-09), four Surfer Content Editors (2026-10-09), Google's and Webflow's own documentation, and the five content files that come with this brief. Verify every claim against the repo before relying on it.

The rule from the pilot stays: **Claude drafts, a person owns the facts and the final edit, and nothing publishes without that person's sign-off.**

What is different from the pilot: **the copy is already written.** Each page has a content file in `docs/content/` with the SEO fields, the visible copy in page order, a note on which component to use for each section, the internal links, the sources and the open facts. Your job is to build the pages from those files word for word, wire up markup, checks and links, and prepare the review sheets. Do not rewrite, add or cut copy. If a sentence does not fit its component, or contradicts the repo or the live site, STOP and ask, or list it in the report.

The work is split in two branches, because the case study depends on JOOR's approval and the service pages should not wait for it:

| Part | Branch | Pages | Ships when |
|---|---|---|---|
| 1 | `seo/next-pages` | `/website-redesign`, `/webflow-seo-agency`, `/cybersecurity-web-design`, `/aeo-agency` | The person signs off all four |
| 2 | `seo/work-joor` | Case study template, `/work/joor` | JOOR approves the page, the quote and any result |

## How to run this (Sergio)

1. Save these files in the site repo:
   - this file as `docs/brief-next-pages.md`;
   - the five content files as `docs/content/website-redesign.md`, `docs/content/webflow-seo-agency.md`, `docs/content/cybersecurity-web-design.md`, `docs/content/aeo-agency.md` and `docs/content/work-joor.md`.
2. Fill in the "Inputs from Sergio" block below as far as you can. A blank is fine: the matching marker stays visible on the draft and blocks the release.
3. Open Claude Code in the repo root and paste, for Part 1:

   > Read docs/brief-next-pages.md and the four service-page files in docs/content/. Do the Discovery section first and show me what you found before you edit anything. Then do Part 1 on a new branch `seo/next-pages`, one commit per task, using the copy in docs/content/ word for word, and stop at any "STOP and ask" line. Do not merge, push to the base branch or deploy. Finish with the report described at the end of the brief.

   For Part 2, in the same session after Part 1's report, or in a new one:

   > Read docs/brief-next-pages.md and docs/content/work-joor.md. Do Part 2 on a new branch `seo/work-joor` from the base branch, one commit per task, using the copy in docs/content/work-joor.md word for word, and stop at any "STOP and ask" line. Do not merge, push to the base branch or deploy. Finish with the report described at the end of the brief.

4. What happens next, and who does it:

   | Step | Who | What |
   |---|---|---|
   | 1 | Claude Code | Builds the pages as drafts (`noindex`), lists every open fact, pushes the branch so Vercel builds a preview |
   | 2 | You, or the person who owns the final edit | Opens the previews, answers the open facts (or says "delete that claim"), works through the review sheets |
   | 3 | Claude Code | Fills in the facts or deletes the claims, reruns the checks |
   | 4 | The person who owns the final edit | Reads each page once more, edits, then says "approved" |
   | 5 | You (or Claude in Cowork) | Pastes the final visible text into the same Surfer editors (Appendix D) and records the scores |
   | 6 | Claude Code | Makes the release commit for the part that was approved, then stops |
   | 7 | You | Merge, deploy, then the post-deploy steps |

5. Add the minutes for steps 2 to 4 per page to `docs/pilot-log.md` (Appendix C). The pilot's question still stands: how many person-minutes does one page take?

### Inputs from Sergio (facts sheet)

General:

- **G1. Base branch:** `main`, with the `/webflow-migration` pilot merged. If not, the branch to start from: `________`
- **G2. Preview:** Claude Code pushes `seo/next-pages` and `seo/work-joor` (never the base branch) so Vercel builds previews. If you don't want that, say so here: `________`
- **G3. Byline:** if `/webflow-migration` shows a byline, the person for the four service pages (same person unless you say otherwise): `________`

Part 1, service pages (each item resolves one marker or one line of the review sheet):

1. `/website-redesign` section 5: the frameworks you build custom-coded sites in, and whether "deep product integrations or heavy personalization" are fair examples of when you'd pick custom code: `________`
2. `/website-redesign` section 8: is post-launch support for a redesign 30 days, the same as for migrations? `________`
3. `/website-redesign` claims to confirm: the competitor-site review and wireframes in the process (section 3b), "strategy, design and development stay with one team", CRM data on lead quality in the before-and-after report, the FAQ advice that the client holds the domain, code, design files and CMS account, and "if you have an in-house design team or brand guidelines, we build from them". No marker on the page; the review sheet is the gate: `________`
4. `/aeo-agency` section 6: OK to publish "In our own tracking for the web agency category, roundups were 25 of the 40 pages AI assistants cited most" (Trakkr, 30 days to 2026-10-08)? `________`
5. `/aeo-agency` claims to confirm: entity work (consistent profiles on LinkedIn, Crunchbase, G2 and Wikidata, Organization schema with `sameAs`), the digital-presence review in the baseline, link building, and planning pages in topic clusters, all as part of Growth. No marker on the page; the review sheet is the gate: `________`
6. `/cybersecurity-web-design` section 4b: do you build or embed self-guided product tours? `________`
7. `/cybersecurity-web-design` hero and work grid: keep DeepSeas in the client list? Its live site runs on WordPress (Elementor), not Webflow. The hero carries a `[VERIFY]` marker for this: `________`
8. `/webflow-seo-agency` claims to confirm: the audit includes keyword rankings for priority terms and a review of technical debt from the original build. No marker on the page; the review sheet is the gate: `________`

Part 2, case study (`/work/joor`):

9. JOOR's written OK to publish the case study and the screenshots: `________`
10. The testimonial: the words JOOR approves, with the person's name, title and photo. The page carries a draft quote marked for JOOR to edit; publish only what the named person approves: `________`
11. At least one measured result JOOR is happy to publish (for example time to launch a new page or locale before and after, organic traffic, demo requests or buyer sign-ups, Core Web Vitals): `________`
12. The list of languages, and which second language to show in the gallery: `________`
13. Two more team members for the credits, with roles and photos, and your role on the project: `________`
14. Confirm: joor.com runs on Webflow; case studies, posts, webinars and guides sit in CMS Collections; the "consistency across markets" line in Results; the services used (Custom Websites & Migrations, Ongoing Website Support): `________`
15. JOOR's LinkedIn URL, for `sameAs` in the page's structured data: `________`
16. Screenshots: the nine images listed in the content file (four in the gallery, three in the image row, two in the second gallery), from the project files or captured from the live site after item 9: `________`

## What the pages must do

They catch buyers who search for a service, and give AI answers a clear, sourced page to cite. Each one answers its main question at the top, shows scope and proof in the middle, says honestly when BenorMedia is the wrong choice, and closes on the site's existing call to action.

| Page | Main terms (US volume, KD) | What makes it worth citing |
|---|---|---|
| `/website-redesign` | website redesign services (2,100, 9), website redesign agency (1,200, 0), b2b website redesign (250, 1) | The keep, improve, merge, retire and add triage of every URL, and the site-move checks from Google's guidance |
| `/webflow-seo-agency` | webflow seo (1,800, 12), webflow seo services (350, 0), webflow seo company (350, 4), webflow seo expert (250, 0), webflow seo agency (200, 1) | Seven Webflow-specific SEO problems, each checked against Webflow's documentation |
| `/cybersecurity-web-design` | cybersecurity marketing agency (450, 2), cybersecurity website design (150, 0) | Two 2026 studies of security buyers, plus trust center, security.txt and framework-page specifics; five security clients on `/work` |
| `/aeo-agency` | ai seo agency (3,800, 10), generative engine optimization services (3,000, 9), generative engine optimization agency (2,200, 15), aeo agency (1,900, 3), geo agency (1,800, 17), answer engine optimization services (1,300, 12), aeo services (1,000, 0) | A sourced list of what is known to get cited, how AI visibility is measured, and no guarantees |
| `/work/joor` | joor case study (no measurable volume) | The site's first case study: proof for the enterprise, redesign and multilingual claims on other pages |

Measured by: positions for the terms above once they are in Ahrefs Rank Tracker, Search Console clicks and impressions per page, and mentions for related prompts in the Surfer AI Tracker project (id 12538) and Trakkr. No ranking or revenue promise goes on the pages, in the copy or in your report.

## Research behind the pages

### Surfer pass (2026-10-09)

The four service pages were scored in Surfer Content Editors (workspace 1395950), revised once, and scored again. Surfer's suggested length (2,684 to 3,249 words for three pages, 10,677 for the AEO page) comes from the list posts that rank for these terms ("Top 13 agencies" and similar). Service pages don't need that length, so the revision added only sections and terms that fit true sentences: a redesign process, a cybersecurity design section, buyer FAQs on choosing an agency, and missing terms woven into existing sentences. Scores are SEO / AI Search / total.

| Page | Draft v1 | Draft v2 (these files) | Visible words, v2 |
|---|---|---|---|
| `/website-redesign` | 35 / 53 / 44 | 62 / 63 / 63 | 2,181 |
| `/webflow-seo-agency` | 46 / 71 / 59 | 68 / 79 / 74 | 2,011 |
| `/cybersecurity-web-design` | 36 / 68 / 52 | 63 / 84 / 74 | 1,862 |
| `/aeo-agency` | 46 / 66 / 56 | 73 / 81 / 77 | 1,897 |

Editor links are in Appendix D. The case study (758 visible words while its slots are open) was not scored: no search term for it has measurable volume.

### Sources

Every outside fact on a page has its source in that content file's "Sources" table, checked on 2026-10-09. Facts already on benormedia.com are listed under "Already on benormedia.com (tier A, reused)". Statements only BenorMedia can confirm are listed under "Statements a person must confirm" and in the facts sheet above.

## Page specs

| Page | Title (characters) | H1 | Breadcrumb | JSON-LD |
|---|---|---|---|---|
| `/website-redesign` | `Website Redesign Services for B2B & SaaS \| BenorMedia` (53) | Website redesign for B2B and SaaS teams, built on what already works. | Home › Custom Websites & Migrations › Website Redesign | `Service`, `FAQPage`, `BreadcrumbList` |
| `/webflow-seo-agency` | `Webflow SEO Agency: SEO & AEO for B2B \| BenorMedia` (50) | Webflow SEO and AEO for B2B teams, measured in pipeline. | Home › Growth (SEO/GEO + CRO) › Webflow SEO & AEO | `Service`, `FAQPage`, `BreadcrumbList` |
| `/cybersecurity-web-design` | `Cybersecurity Website Design Agency \| BenorMedia` (48) | Website design for cybersecurity companies, built for buyers who verify everything. | Home › B2B SaaS Web Design › Cybersecurity Web Design | `Service`, `FAQPage`, `BreadcrumbList` |
| `/aeo-agency` | `AEO & GEO Agency for B2B SaaS \| BenorMedia` (42) | AEO and GEO for B2B SaaS: get named in the answers your buyers read. | Home › Growth (SEO/GEO + CRO) › AEO & GEO Agency | `Service`, `FAQPage`, `BreadcrumbList` |
| `/work/joor` | `JOOR Case Study: 100+ Pages in 8+ Languages \| BenorMedia` (56) | How we rebuilt JOOR's website: 100+ pages, 8+ languages, one system. | Home › Work › JOOR | `Article`, `BreadcrumbList` |

Meta descriptions, `Service` fields and Open Graph settings are in each content file's "SEO fields" table. Language: US English. Navigation: no change to the header or footer; whether the Services menu lists any of these pages is Sergio's call after launch.

## Ground rules

1. **The copy is final until the person edits it.** Use the visible copy in `docs/content/*.md` word for word: headings, body, list items, FAQ questions and answers, link targets and anchors. Lines that start with `>` are builder notes and never appear on a page. Lines such as `- Tags:`, `- Legend:`, `- Button:`, `- Buttons:`, `- Eyebrow:` and `- Sub-line:` are visible labels and part of the copy, and so are Markdown links inside the copy, such as `[pricing page](/pricing)`. What you may write yourself: image alt text the content file doesn't give, `aria-label`s and file names, all plain and free of claims.
2. **Tiers.** The tiers from the pilot still apply, and the content files already sort every claim: tier A in "Already on benormedia.com", tier B in "Sources", tier C in "Statements a person must confirm" (open ones carry markers). Reuse a tier A claim only if Discovery finds it on the live site today.
3. **Markers.** The content files use `[FACT NEEDED: ...]`, `[VERIFY: ...]` and `[PERSON: ...]` as before, plus two for the case study: `[QUOTE: ...]` for a testimonial waiting for the client's approval, and `[RESULT NEEDED: ...]` for a measured result. They stay visible in the preview and in the data files, never in comments. `scripts/check-draft.mjs` lists them and blocks the release while any remain (Appendix A extends it to the two new markers).
4. **Wording.** Same list as the pilot:
   - "Webflow Professional Partner" is the only partner wording. Never "Enterprise Partner", never "Official Webflow Partner".
   - The brand is "BenorMedia", one word.
   - No prices, ranges, tiers or discounts. Plans are named and linked to `/pricing`. The JOOR page writes "120 billion dollars" in words on purpose, so the price check doesn't trip on a fact about JOOR; keep it that way.
   - No promises, no internal tool names (Ahrefs, Surfer, Trakkr, Screaming Frog), no other agencies named, nothing copied from competitor pages.
   - One exception to the tool rule: `/webflow-seo-agency` and `/aeo-agency` name Ahrefs as the publisher of a cited study (linked), not as a tool BenorMedia uses. `check-draft.mjs` warns on it, and that warning is expected. If Sergio would rather not name Ahrefs at all, the person deletes those sentences in the final edit. For the same no-agencies rule, the Ponemon study's co-sponsor is not named on `/cybersecurity-web-design`.
   - No em dashes in visible copy (house style, and a common AI-writing tell). The content files have none; don't introduce any in alt text or labels.
5. **Structure.** H2s end with a full stop, as on the live service pages. The FAQ array is the single source for the visible FAQ and the `FAQPage` markup (the `/pricing` pattern). Some answers contain links: render them as links in the visible FAQ and as plain text (the anchor words) in `acceptedAnswer.text`. No text baked into images.
6. **Scope of edits.** Reuse the components `/webflow-migration` uses. New components only in Part 2, for the case study, built from the site's existing variables and nothing else. Don't touch positioning copy, existing JSON-LD, navigation or other pages, except the link tasks.
7. **Safety.** One commit per task with a conventional message (`feat(seo): ...`, `chore(seo): ...`, `docs(seo): ...`). Do not merge, force-push, push the base branch or deploy. Never touch DNS, registrar settings, mail records, tokens or credentials. Add no runtime dependencies.

## Discovery (before editing anything)

Report:

- the repo state: current branch, `git log --oneline -20`, the base branch, and whether the `/webflow-migration` pilot is merged into it;
- that `scripts/check-seo.mjs`, `scripts/check-draft.mjs`, `scripts/check-crawlers.sh` and `scripts/indexnow.mjs` exist, plus the output of a baseline `npm run build` and `node scripts/check-seo.mjs dist`;
- how `/webflow-migration` is built, because it is the template for Part 1: the page file, its data file, the `DRAFT` flag and the `noindex` prop, the byline if any, and the component behind each section (hero, logo strip, the list sections with their diagrams, work grid, "When staying on WordPress is the better call.", services cards, CTA band, FAQ, related pages, contact form with testimonial);
- how `/custom-websites-migrations` renders its numbered process (steps 01 to 09), because `/website-redesign` section 3b reuses it;
- how JSON-LD is emitted (the helper, the shared Organization constants and their `@id`) and how the `/pricing` FAQ feeds both the visible FAQ and its markup;
- what `/work` is built from (data file, content collection or Sanity), how the JOOR card is defined, whether any `/work/[slug]` route or case-study component exists, and how images are handled (Astro assets or `public/`);
- the `PAGES` map in `scripts/check-seo.mjs`, including how it uses the `keyword` field; the `LASTMOD` map in `astro.config.*`; and the shape of the lines in `public/llms.txt`;
- the tier A claims the content files reuse, quoted exactly from the live pages with their URLs, and any that no longer appear.

**STOP and ask** if `/webflow-migration` is not on the base branch, if `scripts/check-draft.mjs` is missing, if a tier A claim is no longer on the live site, or if the live site contradicts "Webflow Professional Partner".

## Part 1: four service pages (branch `seo/next-pages`)

### Task 1. Branch and draft check

1. Create `seo/next-pages` from the base branch.
2. Apply Appendix A to `scripts/check-draft.mjs`: two more marker types and one warning for dashes. Nothing else in the file changes.

Commit: `chore(seo): extend draft check markers`.

### Tasks 2 to 5. One page per task

Do the pages in this order: `/website-redesign`, `/webflow-seo-agency`, `/cybersecurity-web-design`, `/aeo-agency`. For each:

1. **Data file.** All visitor-facing copy from the content file's "Visible copy", in page order, plus the title, meta description, FAQ array, byline (if G3 applies), `publishedAt` and `updatedAt` (today for both while drafting) and `export const DRAFT = true;`. Same pattern as the `/webflow-migration` data file.
2. **Page.** Build it from the components `/webflow-migration` uses, in the content file's section order. Each section's `>` note names the component. Two pages have one extra section each: `/website-redesign` 3b (the numbered process from `/custom-websites-migrations`) and `/cybersecurity-web-design` 4b (the component-library section with the screenshot row). Where a note gives a fallback (a list longer than the component allows, a sixth item in the "wrong call" section), use it and say so in the report.
3. **Visuals.** Reuse the diagram components with the labels the notes give. If a component can't take new labels, keep its default visual and list the visual to make in the report under "visuals to make". Expected list: the five-way triage (redesign), the audit checklist (Webflow SEO), the four buyer lanes (cybersecurity), the four stat tiles with source names and the layered diagram (AEO).
4. **`noindex`** while `DRAFT` is true, the way `/webflow-migration` did it.
5. **JSON-LD.** `Service`, `FAQPage` and `BreadcrumbList` with the fields in the content file's "SEO fields" table. `provider` points to the shared Organization `@id`. No `offers`. `FAQPage` has one `Question` per visible FAQ item, the answer as plain text.
6. **Checks.** Add the page to `PAGES` in `scripts/check-seo.mjs` with `expected: ['Service', 'BreadcrumbList', 'FAQPage']` and a `keyword` of words that appear in both the title and the H1: `website redesign`, `webflow seo`, `cybersecurity website design`, `aeo geo b2b saas`. If `check-seo.mjs` uses the keyword differently from that, follow its logic and report the value you chose; don't change the copy to pass it. Add the page to `LASTMOD` with today's date. Don't touch `public/llms.txt` yet.

Commits: `feat(seo): draft /website-redesign`, `feat(seo): draft /webflow-seo-agency`, `feat(seo): draft /cybersecurity-web-design`, `feat(seo): draft /aeo-agency`.

### Task 6. Links into the new pages

Each content file's "Internal links" section lists the sentence or anchor to add on existing pages. Add them word for word, one sentence or link per row of the table below, with no heading, layout or positioning change. Set `LASTMOD` for each page you change. If a page has no natural place for the link, don't edit it: put the proposed sentence and location in the report. Links into `/work/joor` are not part of this task (Part 2 adds them at release).

| Link to | From | What to add |
|---|---|---|
| `/website-redesign` | `/custom-websites-migrations`, process section | "Redesigning an existing site? See [website redesign](/website-redesign)." |
| `/website-redesign` | `/b2b-saas-web-design`, FAQ "Should a SaaS company redesign its website or refresh it?" | Anchor "website redesign" in the answer |
| `/webflow-seo-agency` | `/growth`, "Technical SEO & AEO foundation" step | "Running on Webflow? See [Webflow SEO and AEO](/webflow-seo-agency)." |
| `/webflow-seo-agency` | `/webflow-migration`, "SEO and AI search readiness are part of the build." | Anchor "Webflow SEO" |
| `/cybersecurity-web-design` | `/b2b-saas-web-design`, "The pages a SaaS buyer expects." | "Selling security software? See [cybersecurity website design](/cybersecurity-web-design)." |
| `/cybersecurity-web-design` | `/guides/b2b-saas-website-pages` | Link the existing words "cybersecurity web design" |
| `/aeo-agency` | `/growth`, hero or first section | "See how [AEO and GEO](/aeo-agency) works for B2B SaaS." |
| `/aeo-agency` | `/custom-websites-migrations`, FAQ "What is Answer Engine Optimization (AEO)?" | "More on our [AEO and GEO service](/aeo-agency)." at the end of the answer |

The links between the four new pages are already in their copy.

Commit: `feat(seo): link existing pages to the new service pages`.

### Task 7. Review sheets

Save Appendix B four times as `docs/review-website-redesign.md`, `docs/review-webflow-seo-agency.md`, `docs/review-cybersecurity-web-design.md` and `docs/review-aeo-agency.md`, and fill each from its content file: one row per sentence or figure that states a fact, with its tier and source. A tier B row is `ok` only if you opened the source during this task and it still says that; otherwise `open`. Tier C rows start `open`. Write them in plain language: this is what the person works from.

Commit: `docs(seo): review sheets for the four service pages`.

### Task 8. Run, preview, report version 1, then stop

1. `npm run build`, `node scripts/check-seo.mjs dist`, and `node scripts/check-draft.mjs <page file> <data file>` for each page. Paste the output.
2. Push `seo/next-pages` (not the base branch) so Vercel builds a preview, and give the four preview URLs. If you cannot push, say so and give the local command.
3. Look at each page at 1440 px and 390 px. Nothing may overflow the page; lists and diagrams must stay readable on a phone.
4. Send the report described at the end of this file, with the open markers grouped by facts sheet item. Then stop and wait for answers.

## Part 2: case study template and `/work/joor` (branch `seo/work-joor`)

If this is a new session, or Part 1's Discovery didn't cover it, first run the Discovery items about `/work`, images, JSON-LD, `PAGES`, `LASTMOD` and `public/llms.txt`, and report them. Branch from the base branch, so the case study can ship on its own timeline.

### Task 1. Branch and draft check

Create `seo/work-joor`. If `scripts/check-draft.mjs` on this branch lacks the two new markers, apply Appendix A exactly as in Part 1, so the two branches merge without conflict.

Commit: `chore(seo): extend draft check markers` (skip if there is nothing to change).

### Task 2. Case study template

1. **Content model.** A `work` content collection if the repo uses collections, otherwise a typed data module, with one entry per case study. Its fields follow the sections of `docs/content/work-joor.md`: slug, client name and URL, tags, H1, three stats, gallery images (source, alt), testimonial (quote, name, title, photo), summary, "project at a glance" (label and value pairs), team (up to three people: name, role, photo), services (chips), about (heading, body), challenge, image row, "what we built" (intro, items), second gallery, results (intro, items), achievements, more work (two cards), CTA, SEO fields, `DRAFT`, `publishedAt`, `updatedAt`.
2. **Route.** `/work/[slug]` with one static page per entry, `noindex` while that entry's `DRAFT` is true.
3. **Components.** Reuse the site's stats, testimonial, cards, CTA band and contact form. The content file asks for a case-study hero (tags, H1, three stats, a "See live website" button): build it from the existing hero and stats components if they can take tags and stats, otherwise as a new component. Build new ones only for what doesn't exist: that hero if needed, the image gallery, the "at a glance" list (a `<dl>`), team credits and service chips. The template borrows the section order of Flow Ninja's case study pages and nothing else: no design, markup or code from their site.
4. **Images.** Until real screenshots arrive (facts sheet item 16), each image source in the data is a marker, for example `[FACT NEEDED: image, joor.com homepage, desktop]`, and the page renders a neutral placeholder. That way `check-draft.mjs` blocks the release while any image is missing. Real images go through the site's image pipeline with width and height set, and use the alt text in the content file.
5. **JSON-LD.** `Article` and `BreadcrumbList` with the fields in the content file's "SEO fields" table. `author` and `publisher` point to the shared Organization `@id`; `about` describes JOOR.

Commit: `feat(seo): case study template`.

### Task 3. The JOOR entry

Fill the entry from `docs/content/work-joor.md` word for word, markers included. The draft testimonial sits inside its `[QUOTE: ...]` marker on purpose: deleting the marker deletes the draft, and only words JOOR has approved replace it. Never render the draft as a finished quote. Add `/work/joor` to `PAGES` with `expected: ['Article', 'BreadcrumbList']` and the keyword `joor`, and to `LASTMOD` with today's date.

Commit: `feat(seo): draft /work/joor`.

### Task 4. Review sheet

Save Appendix B as `docs/review-work-joor.md` and fill it from the content file. Add one row per slot in the content file's "Slots a person must fill before release", and one row for JOOR's approval to publish.

Commit: `docs(seo): review sheet for /work/joor`.

### Task 5. Run, preview, report, then stop

As Part 1 task 8, for `/work/joor`. Check the gallery and the team credits at 390 px.

## After the first draft

### Revision (Claude Code)

1. Replace each marker with the fact you were given, or delete the claim. Never rephrase a claim to keep it alive without its fact. If a deletion leaves a list or section too thin, say so; don't fill the gap with new claims.
2. Update the review sheets and rerun `check-seo.mjs` and `check-draft.mjs`. Report what changed between version 1 and version 2.

### Surfer (Sergio, or Claude in Cowork)

After the final edit, paste each service page's visible text from the preview into its existing Surfer editor (Appendix D), replacing the old text, and record the score in the pilot log. No pass mark is set. Don't pad a page to reach Surfer's suggested length.

### Sign-off and release commits

**Part 1.** When the person has signed off all four review sheets, one commit, `feat(seo): publish four service pages`:

1. `DRAFT` to `false` on each page, and `publishedAt` and `updatedAt` to the sign-off day.
2. `LASTMOD` for the four pages, and for every page changed in task 6, to the sign-off day.
3. One line per page in `public/llms.txt`, built from the final meta description, in the file's existing format.
4. `node scripts/check-draft.mjs --release <page file> <data file>` passes for each page, and so do the build and `check-seo.mjs`.
5. No row in the four review sheets is still `open`: `grep -n '| open |' docs/review-website-redesign.md docs/review-webflow-seo-agency.md docs/review-cybersecurity-web-design.md docs/review-aeo-agency.md` returns nothing. Several confirmations (facts sheet items 3, 5 and 8) have no marker on the page, so the review sheet is their only gate. If a row is open, don't make the commit; ask.
6. Stop. A person merges and deploys.

If one page holds up the other three, ask Claude Code to move it to its own branch with its task 6 links, and release the rest. The four pages link to each other (`/website-redesign`, `/webflow-seo-agency` and `/cybersecurity-web-design` link to `/aeo-agency`; `/aeo-agency` links to `/webflow-seo-agency`; `/webflow-seo-agency` links to `/website-redesign`). In the release commit, turn any link to the held page into plain text, list those links in the report, and restore them when the held page ships.

**Part 2.** When JOOR has approved and the person has signed off: first merge the base branch into `seo/work-joor` (a normal merge, no rebase and no force-push), so the branch has Part 1's pages if they shipped. Then one commit, `feat(seo): publish /work/joor`:

1. `DRAFT` to `false`, dates to the sign-off day, `LASTMOD` updated.
2. The links into the case study, from the content file: the JOOR card on `/work` ("Read the case study", keeping the external link), "JOOR" in the hero proof line of `/webflow-enterprise-agency`, the anchor "JOOR's site in 8+ languages" on `/guides/webflow-enterprise`, and, if Part 1 is merged, the "JOOR" link in section 5 of `/website-redesign`, switched from `/work` to `/work/joor`. `LASTMOD` for each changed page.
3. One line for the page in `public/llms.txt`.
4. `check-draft.mjs --release` passes on the template, the data and the entry; the build and `check-seo.mjs` pass; `grep -n '| open |' docs/review-work-joor.md` returns nothing.
5. Stop.

## Verification

Before Sergio merges either branch:

```bash
npm run build
node scripts/check-seo.mjs dist
node scripts/check-draft.mjs --release <page file> <data file>   # once per page; must pass
grep -n '| open |' docs/review-<page>.md                         # once per page; must print nothing
bash scripts/check-crawlers.sh                                    # production, not changed by these branches
```

After Sergio deploys (not you):

- run `node scripts/check-seo.mjs https://www.benormedia.com` and confirm each new URL returns 200, is indexable, and appears in `sitemap-0.xml` with the sign-off date;
- run `npm run indexnow --` with the new URLs and every page changed by the link tasks;
- in Search Console, inspect each new URL and request indexing;
- run each new URL through Google's Rich Results Test and validator.schema.org: no errors in `Service`, `FAQPage`, `Article` or `BreadcrumbList`;
- add the terms from "What the pages must do" to Ahrefs Rank Tracker;
- after Google has indexed the pages, check the matching prompts in the Surfer AI Tracker (project 12538) and Trakkr, and note the date, platform and result next to the baseline;
- finish `docs/pilot-log.md`.

## Report (end of your last message)

For each part, and again after revision: the status of each task, the files changed, the output of the checks, the preview URLs, the visible word count per page (it should roughly match the counts in "Research behind the pages"; explain a gap of more than 5%), the open markers grouped by facts sheet item, and the visuals still to make. Then say what you chose that this brief did not decide, and give three lists: what Sergio or the person must do, what you could not verify, and what you noticed but left alone.

## Noticed, out of scope (do not change in these branches)

- **Contact links.** On the live home page, the "Get in Touch" buttons and the footer "Contact" item render with no `href` (seen on 2026-10-09). If they are buttons that scroll to the form with JavaScript, people can use them, but crawlers and AI agents can't follow them, and they fail without JavaScript. Worth a small separate fix: real links to the form's anchor or a contact page.
- **`/work` data.** Sublime Security shows $150.0M raised, which is its Series C alone (total raised is more than $240M, SecurityWeek, 2025-10-28). Base Operations shows $12.1M, while its public rounds add up to about $14.3M. "Triplekey" should be "TripleKey". DeepSeas' live site runs on WordPress.
- **`/b2b-saas-web-design`.** It dates the Gartner rep-free buying figure (67%) wrongly: the survey ran in August and September 2025 and Gartner published it on 2026-03-09.
- **Duplicate FAQs.** Some FAQ items repeat word for word between a service page and its guide (`/webflow-migration` and `/guides/wordpress-to-webflow-migration`, `/b2b-saas-web-design` and `/guides/b2b-saas-website-pages`, `/webflow-enterprise-agency` and `/guides/webflow-enterprise`). Two URLs then compete for the same answer. Rewrite one side later.
- **Footer.** A few pages still render the old footer. List them in the report; don't change them here.
- **`/ongoing-website-support`.** The roadmap suggests retargeting it to "unlimited Webflow development". A decision for Sergio, not for these branches.
- **Prices.** All five pages keep the no-price rule and link to `/pricing`. Buyers do weigh it: in TrustRadius research, missing pricing was the top reason tech buyers gave for being less likely to buy. If Sergio lifts the rule, the Growth plan price is the obvious first candidate for the FAQs on `/webflow-seo-agency` and `/aeo-agency`.
- **AEO FAQ overlap.** `/custom-websites-migrations` has an FAQ "What is Answer Engine Optimization (AEO)?" that overlaps with "What is AEO?" on `/aeo-agency`. Task 6 links it to `/aeo-agency`; shortening that answer is a later edit.
- Do not link to planned pages (wave 2 and 3 of the roadmap) until they exist.

## Appendix A: changes to `scripts/check-draft.mjs`

Three edits to the pilot's file. Tested on 2026-10-09 against mock data files: preview mode lists `[QUOTE: ...]` and `[RESULT NEEDED: ...]` with the other markers and passes; `--release` fails on any marker, on `DRAFT = true`, on a price such as "$120B" and on a missing file; "120 billion dollars" passes; a clean file passes.

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

Statuses: `ok` (tier A or B, checked against its source), `open` (needs the person), `confirmed` (the person confirmed it), `removed` (cut from the page).

```md
# Review sheet: <page URL>

Draft version: 1 | Preview: <url> | Prepared: <date> | Content file: docs/content/<file>.md

How to use: go to the rows marked `open`. For each, give the fact, or write "delete". Rows marked `ok` were checked against their source by Claude Code; open the source if one looks wrong to you.

| # | Section | Sentence or figure on the page | Tier | Source, or who confirms | Status |
|---|---|---|---|---|---|
| 1 | Hero | "100+ launches in 6+ years, including 60+ B2B SaaS websites." | A | benormedia.com (live page named in the content file) | ok |
| 2 | Section 6 | "Google advises keeping redirects for at least a year." | B | Google: site moves with URL changes (URL) | ok |
| 3 | Section 8 | "Support continues for 30 days after launch." [VERIFY] | C | Sergio, facts sheet item 2 | open |

## Sign-off

- Facts confirmed by: ________ on ________
- Final edit done by: ________ on ________
- Approved to publish (yes or no): ________
```

## Appendix C: rows for `docs/pilot-log.md`

Add one block per page under the pilot's entry.

```md
## <page URL> (brief: docs/brief-next-pages.md)

| Item | Value |
|---|---|
| Person who owns the facts and the final edit | |
| Draft version 1 ready (date) | |
| Open markers in version 1 (from check-draft) | |
| Minutes: answering the facts sheet | |
| Minutes: checking facts against sources | |
| Minutes: final edit | |
| Surfer score (SEO / AI Search / total): v2 draft, then final | see Appendix D for v2 |
| Sentences or figures that were wrong or unsupported (count) | |
| Markers resolved by supplying a fact, and by deleting the claim | |
| Signed off (date), merged and deployed (date) | |
| Total person-minutes | |
```

## Appendix D: Surfer editors

| Page | Editor (main keyword, id) | Link | v2 score (SEO / AI Search / total) |
|---|---|---|---|
| `/website-redesign` | website redesign agency, 16833350 | https://app.surferseo.com/drafts/s/HiMJo0xmMXY8FLdVVPOXdNa1ZgOnq7N6 | 62 / 63 / 63 |
| `/webflow-seo-agency` | webflow seo agency, 16833353 | https://app.surferseo.com/drafts/s/RP8asbLTmmHGc1ICUlPFvJJ2ojg5k20a | 68 / 79 / 74 |
| `/cybersecurity-web-design` | cybersecurity website design, 16833471 | https://app.surferseo.com/drafts/s/9WJ8Kp3UwvJG8BH9iOUJiW0qbSedCMlb | 63 / 84 / 74 |
| `/aeo-agency` | aeo agency, 16833498 | https://app.surferseo.com/drafts/s/13GLBs4A35Q2BnuQkpH20NKOZIRLsfcX | 73 / 81 / 77 |

Terms left out on purpose: generic phrases that would add claims or filler ("proven track record", "deep expertise", "customer-centric approach", "measurable business outcomes"), terms for audiences BenorMedia doesn't serve ("local businesses", "e-commerce platforms"), "certified Webflow partner" (the wording rule), "customer journey" (flagged by the AI-writing check), and terms the page would have to stretch to use ("usability testing", "cyber security" as two words).
