# Release and follow-up brief: benormedia.com (2026-11-23)

Prepared by Claude for Sergio on November 23, 2026, from a check of the live site that day. It amends `docs/content-refresh-brief-2026-11-16.md` and `docs/content-refresh-brief-update-2026-11-17.md`. Where they differ, this file wins. Every quoted string is final copy: Claude Code places it and writes nothing itself.

## 1. Why this round

The November 17 release went out half-finished.

- **The two rebuilt service pages are in production as drafts.** /custom-websites-migrations and /growth still serve their legacy pages (H1s "Build a website your ambition deserves." and "Show up where buyers actually look."). Both URLs have dropped out of sitemap-0.xml (87 URLs on November 16, 85 now). Body links to them print as plain text, as update section 1 warned they would while the files are `draft: true`. Seen on /pricing (FAQ answers 8 and 9), /blog/saas-technical-seo (the 4.2 sentence), and /website-redesign (the 3.2 sentence). Nav and footer links still work.
- **Several blocks never reached the live site.**

What the live site showed on November 23, 2026:

| Item | Page | Live? | What the page shows |
| --- | --- | --- | --- |
| 1A | /guides/webflow-enterprise | Yes | Team plan H2, JOOR 10 to 14 weeks, "Updated November 17, 2026" |
| 1B.1, 1B.2, 1B.4 | /webflow-enterprise-agency | Yes | Team plan sentence and FAQ answers |
| 1B.3, update B2 | /webflow-enterprise-agency | No | H2 "Larger companies on our work page." followed by project cards only; "JOOR" appears nowhere on the page |
| 2 | /blog/webflow-price-increase | Yes | New H1, H2 "Which Webflow plan do you need?", updated November 17 |
| 2.11 | /guides/website-redesign-cost | No | The paragraph with "$15 or $25 a month billed yearly" is there; the pricing-guide sentence isn't |
| 3.2 | /website-redesign | Yes, unlinked | Inbound sentence present as plain text |
| 3.2 | /b2b-saas-web-design | No | The paragraph under "A component library your marketers can build from." is still one sentence, with no inbound sentence |
| 4.2 | /blog/saas-technical-seo | Yes, unlinked | Inbound sentence present as plain text |
| 4B | /pricing | Yes | "Pricing and plan FAQs." with 10 items; the links in answers 8 and 9 are plain text |
| 5A | /blog/how-to-rank-in-chatgpt | Yes | Updated November 17 |
| 5B | /blog/optimize-for-ai-overviews | No | "Updated October 26, 2026"; no Gemini 4 Hydrogen paragraph |
| 6 | /blog/cro-audit | No | Old title and H1, "Updated October 17, 2026", no tools H2 |
| 7 | /blog/webflow-mcp | Yes | v2.1, updated November 17 |
| Q1, Q4, Q7, Q8 | Several | Yes | |
| Q5 | /blog/programmatic-seo-webflow | No | Still ends "or on pricing from 2022 or earlier, from November 16, 2026." |
| Q6 | /blog/headless-cms-visual-editor | No | "Sanity's Astro integration" still links to /blog/astro-cms |
| Q9 | Bylines | Partly | "General Manager" still shows on /blog/programmatic-seo-webflow, /blog/headless-cms-visual-editor, and /blog/webflow-editor |
| Q11 | /website-redesign | Yes | "2 to 4 weeks for about 20 pages, and a large site takes 8 to 10 weeks" |

## 2. Discovery (do first, change nothing)

Post these findings before the first commit:

1. Git state: main's head commit, whether `content/refresh-2026-11` and `content/refresh-2026-11-service-pages` are merged into main, and which of their commits are on main.
2. For every row above marked No or Partly: is it on main, on a branch only, or never committed? If never committed, give the reason: from your November 17 report, or re-run the block's "Where" check now and quote what doesn't match.
3. The cause of the sitemap gap and the plain-text links. Are `content-pack/content/custom-websites-migrations.md` and `content-pack/content/growth.md` on main with `draft: true`? Show the code that leaves draft URLs out of the sitemap and prints links to them as plain text.
4. How the legacy /custom-websites-migrations and /growth pages are served today (file path or Sanity document), and where their current titles come from ("Webflow Design & Development Agency for B2B | BenorMedia" and "B2B SaaS SEO Agency: SEO & CRO | BenorMedia"). Confirm that `draft: false` makes each content-pack page serve at its URL with no duplicate route.
5. /webflow-enterprise-agency: is the update B2 JOOR paragraph in the source under "Larger companies on our work page."? If it is, why doesn't it render?
6. Whether `docs/content-refresh-brief-2026-11-16.md` and `docs/content-refresh-brief-update-2026-11-17.md` are in the repo. If they aren't, stop and ask Sergio to attach them.

## 3. Branch and order

One branch from main: `content/release-2026-11-23`. One commit per task, in this order: R1, R2, then the F items that discovery shows are missing (section 6). Sergio reviews the Vercel preview and merges.

Release date: today's date. If the merge slips to a later day, Sergio will ask for one commit that moves every date set in this round to the merge day.

## 4. R1. Release /custom-websites-migrations and /growth

Sergio signs off both pages in the prompt that came with this brief.

Commit: `content(pages): release custom-websites-migrations and growth`.

- In both content-pack files: set `draft: false`, set `publishedAt` and `updatedAt` to the release date, and set `LASTMOD` for both URLs to the same date. Change nothing else in either file.
- If retiring a legacy page means touching Sanity, STOP: don't touch it, and report what Sergio has to do there.

Checks, with results in the report:

1. `pages:check` passes for both files, and the build passes.
2. The built sitemap-0.xml lists both URLs (87 URLs if nothing else changed).
3. Each URL renders one H1 (the file's `h1`), the title and meta description from its file, and Service, FAQPage, and BreadcrumbList JSON-LD.
4. Links to both URLs render as links again: /pricing FAQ answers 8 and 9, /blog/saas-technical-seo, /website-redesign, and every other page that links to them. Give the count of pages.

## 5. R2. Link /webflow-seo-agency and /aeo-agency up to /growth

Planned in the November 16 brief (section 4: "After the Nov 23 recheck of those two pages, add one up-link from each to /growth"). Commit it after R1 on the same branch, so the links go live with the page.

Commit: `content(pages): link webflow-seo-agency and aeo-agency to growth`.

Links-only change: don't change `updatedAt`, `dateModified`, or `LASTMOD`. The "Where" quotes come from the rendered pages, so match on the words.

- **/webflow-seo-agency.** Under H2 "Reporting you can take to a pipeline meeting.", in the bullet "Pipeline from search and AI.", after the sentence `When visits grow but demos don't, the fix is CRO on those pages, which Growth includes.` add:

```markdown
Our [B2B SaaS SEO agency](/growth) page shows how SEO, AEO, and CRO run together in that plan.
```

- **/aeo-agency.** In the paragraph under the H1 that reads `AI visibility tracking and reporting are part of every Growth engagement, on Webflow and custom-coded sites.`, add after that sentence:

```markdown
Our [SaaS SEO agency](/growth) page covers the whole Growth plan, including the SEO and CRO work.
```

## 6. F. The November 17 blocks that didn't ship

Apply each one only if discovery shows it isn't on main. Use the copy exactly as written in the November 16 brief, as amended by the November 17 update, with the same "Where" quotes and STOP rules.

Dates follow update section 4. Copy changes (F1, F2, F4, F7) set `updatedAt`, `dateModified`, and `LASTMOD` to the release date. Links-only and byline-only items (F3, F5, F6, F8) change no dates.

- **F1. Task 5B, /blog/optimize-for-ai-overviews.** Rechecked on November 23, 2026: Google's incident page for the November 2026 core update still has no completion note, and the Search Console data anomalies entry for November 9 to 11 still has no restore note. So 5B.4 c ships as written. Set `volatileChecked: 2026-11-23`.
- **F2. Task 6, /blog/cro-audit.** The vendor facts were rechecked on November 23, 2026 (Microsoft Clarity FAQ, Contentsquare's Hotjar page, PostHog pricing) and haven't changed. In the Sources block, change the access date of items 7, 8, and 9 to `Accessed November 23, 2026`. Set `volatileChecked: 2026-11-23`. The /growth link in 6.9 renders as a link once R1 is in.
- **F3. Block 2.11, /guides/website-redesign-cost.** As in update section 3: add the sentence at the end of the body paragraph that says `$15 or $25 a month billed yearly`.
- **F4. Q5, /blog/programmatic-seo-webflow.** The live sentence ends `or on pricing from 2022 or earlier, from November 16, 2026.` Apply Q5's exact replacement. If the sentence doesn't read correctly afterward, STOP and quote it in full.
- **F5. Q6, /blog/headless-cms-visual-editor.** Link target only, as written in Q6.
- **F6. Q9, bylines.** Change "General Manager" to "Managing Director" on /blog/programmatic-seo-webflow, /blog/headless-cms-visual-editor, /blog/webflow-editor, and any other page discovery finds, as written in update section 3 (Q9).
- **F7. Update B2, /webflow-enterprise-agency.** Make the approved JOOR paragraph render under "Larger companies on our work page.", before the project cards. If that needs a change to a shared component or template, an opt-in change that leaves every other page's output identical is approved. For anything else, show the diff and wait.
- **F8. Block 3.2, /b2b-saas-web-design.** The inbound sentence, appended to the paragraph under "A component library your marketers can build from." as the November 16 brief says. Q11 is already live, so it needs nothing.

## 7. Unchanged

- Test A runs until December 9, 2026. On /webflow-enterprise-agency, /guides/webflow-enterprise, /guides/wordpress-to-webflow-migration, and /blog/import-wordpress-to-webflow, titles, H1s, meta descriptions, and H2s don't change, and /webflow-migration isn't touched at all.
- Everything else in the two earlier briefs stands, including the notes for Sergio: the "dedicated pod" and response-time wording on /webflow-enterprise-agency (#OWS-3), and the /webflow-migration link to /custom-websites-migrations after December 9.

## 8. Report

1. Discovery findings (section 2).
2. For each commit: the hash, the files changed, and any STOP with the exact text that didn't match.
3. The R1 checks (section 4).
4. `pages:check` and build output.
5. Anything Sergio has to do outside the repo (Sanity, Search Console).

## 9. After the merge (Sergio)

- Search Console: URL Inspection, Request indexing for /custom-websites-migrations and /growth, plus /blog/optimize-for-ai-overviews and /blog/cro-audit if F1 and F2 shipped. Resubmit /sitemap-index.xml.
- Check that https://www.benormedia.com/sitemap-0.xml lists both service URLs.
- Note the merge date in the SEO playbook (tests G and H).

## 10. Checks on this brief

- New copy: the two R2 sentences, 33 words together. That's too short for Surfer's AI detector, which needs at least 100 words. Both follow house style: no em dashes, serial comma, and US English.
- Surfer, rescored on November 23, 2026 with the release text: /growth (editor 17047416) SEO 65 / AI Search 67 / total 66. The November 16 score was 65 / 69 / 67, measured before the November 17 detector rewrites and Sergio's answers went in. /custom-websites-migrations (editor 17047398) is unchanged since November 16: 62 / 70 / 66.
- Facts rechecked on November 23, 2026: Webflow's pricing page (Premium and Team at 20,000 CMS items, Localization an add-on on Site plans, 2 locales on Team, Team at $2,500 a month on an annual contract), Google's core update incident page, the Search Console data anomalies page, and the three CRO vendor pages.
