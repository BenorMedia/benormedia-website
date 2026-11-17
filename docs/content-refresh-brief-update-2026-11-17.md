# Content refresh 2026-11-16: update after discovery (2026-11-17)

Prepared by Claude for Sergio on November 17, 2026, in answer to Claude Code's `content-refresh-blockers-2026-11-17.md` (discovery at commit `5c905b8`). It amends `docs/content-refresh-brief-2026-11-16.md`: read both, and where they differ, this file wins. Sergio made the decisions below on November 17, 2026.

Attached with it: `custom-websites-migrations.md` and `growth.md`, which replace brief sections 3.1 and 4.1.

## 0. Prompt for Claude Code

Paste this into Claude Code at the repo root, with the three files attached:

```
Here's Sergio's answer to your discovery blockers. Attached: content-refresh-brief-update-2026-11-17.md, custom-websites-migrations.md, and growth.md.

1. Save the update unchanged as docs/content-refresh-brief-update-2026-11-17.md. It amends docs/content-refresh-brief-2026-11-16.md; where they differ, the update wins.
2. Replace the two uncommitted files in content-pack/content/ with the attached ones, saved unchanged. Diff each against section 3.1 or 4.1 of the brief: the only intended differences are the ones listed in update section B1. If anything else differs, use the brief's wording there and list it in the report.
3. Work in two branches (update section 1). Do content/refresh-2026-11 first, because I deploy it today. The two page files stay out of that branch's commits and out of its working tree while you build and check it.
4. Same rules as before: exact copy, the STOP rules, and no merging, pushing to main, or deploying. Finish with the report in update section 6.
```

## 1. Two branches

Once the draft files for /custom-websites-migrations and /growth are in a production build, links to those URLs from 37 pages, plus the new ones in 3.2, 4.2, and 6.9, print as plain text until release. So the drafts stay off the branch that ships today.

- **`content/refresh-2026-11`** (from main): 1A, 1B, 2, the keyword map commit (section 3), 4B, 5A, 5B, 6, 7, then Q1, Q3, Q4, Q5, Q6, Q7, Q8, Q9, and Q11. One commit each, no pack draft files. Until the rebuilds release, the links to /growth and /custom-websites-migrations in 4B and 6.9 go to the legacy pages; that's expected.
- **`content/refresh-2026-11-service-pages`** (from the last commit of the first branch): task 3 with its inbound links (3.2), then task 4 with its inbound link (4.2), both `draft: true`. When Sergio signs off both pages, one commit sets `draft: false`, sets `publishedAt` and `updatedAt` to the release date, and updates `LASTMOD` for both URLs; then Sergio merges. If he signs off only one, stop and ask (growth.md lists custom-websites-migrations under `related`).
- After that release, Sergio requests indexing for /custom-websites-migrations and /growth.

## 2. Blockers

### B1. Tasks 3 and 4: page files

The attached files keep the brief's copy word for word. The only differences from sections 3.1 and 4.1:

1. Front matter in the pack format of `ongoing-website-support.md`: `reviewEvery: 90`; no `author`; breadcrumb items use `url`; `related` lists slugs; `inbound` items use `from`, `anchor`, and `where` ("one sentence: ...").
2. `service` is an object. The names are unchanged, and each gets a new `serviceType` (schema copy): `Webflow website design and development` for /custom-websites-migrations, and `B2B SaaS SEO, AEO, and conversion rate optimization` for /growth.
3. No final period on `##` H2s, `faqHeading`, `closing.heading`, or `visuals[].after`, because the pack sources leave it out and the template adds it. Check `ongoing-website-support.md`: if it writes any of these heading types with the period, do the same in both files (words unchanged, each `after` kept equal to its H2), and say so in the report.
4. The /website-redesign inbound sentence is now one sentence, to fit the `where` format. Use it in 3.2: `If you're starting from a blank page instead of an existing site, our Webflow design and development page covers new builds.`
5. growth.md has one blank line, not two, before "All four quotes are on our testimonials page".

If a `related` slug isn't a pack page, write it as a path, as the example does with `/pricing`. The word-count warnings (2,164 and 1,700 words) stay: they don't block, and cutting would change copy that passed Surfer and the AI detector.

### B2. Task 1B.3: keep the funding figures

Sergio is fine with client funding figures on service pages. The house rule becomes: no prices on service pages, ours or Webflow's; client funding figures are allowed. If a checker flags them, report it and leave them.

On /webflow-enterprise-agency, under `## Larger companies on our work page`, replace only the first paragraph (it begins `JOOR, tagged Fashion with $107.5M raised as shown on our` and ends `Other larger names listed there include:`) with:

```markdown
For JOOR, the wholesale platform for global fashion, we rebuilt 100+ pages in 8+ languages on one design system, and we've kept working with their team for more than three years. Our [work page](/work) lists JOOR with $107.5M raised, and other larger names there include:
```

The list, the sentence after it, the last line, and the H2 (test A) stay as they are.

### B3. Task 4B: the /pricing FAQ

- **Slot.** The 10 items replace the hidden placeholder FAQ, in its slot: after the logo strip, before the testimonials.
- **Remove the hidden FAQ.** Take the hidden `FaqSection` and its FAQPage JSON-LD off /pricing, so the page outputs one FAQPage block, for the visible FAQ. Google's structured data rules don't allow markup for content users can't see.
- **Component.** `NpFaq`, as the brief said ("the same FAQ accordion component as the service pages"), so the links in answers 8 to 10 work. Heading `Pricing and plan FAQs`, punctuated like the service pages' FAQ headings. JSON-LD from the helper the service pages use, with plain-text answers as in 4B.3. Leave the shared `FaqSection` as it is.
- **If `NpFaq` or the helper needs a change** to work on /pricing: an opt-in change that leaves every other page's output identical is approved. Anything else, show the diff and wait.
- **Placeholder data.** Delete the placeholder entries in `src/lib/content/faqs.ts` if nothing imports them after this change; if something does, keep them and report where (Sergio's OK, section 3).
- Dates: section 4.

### B4. Quick fix Q3: approved

Sergio approved the diff on November 17, 2026. In `src/lib/new-pages/loader.ts`, lines 513 to 516:

```diff
-    intro: rendered.lead
-      .slice(heroLead)
+    intro: (heroLead === undefined ? [] : rendered.lead.slice(heroLead))
```

Commit: `fix(templates): print the article lead once when heroLead is unset`. No copy, date, or `LASTMOD` changes on the 57 pages. Check that /blog/webflow-mcp, and /blog/webflow-price-increase after task 2, print the lead once, and that /blog/webflow-source and /blog/headless-cms-comparison render exactly as before. This replaces the "Template check" note in 2.2 and block 7.7; skip both.

### B5. Internal links

Internal links in new copy are relative paths. In blocks 1A.2, 1A.6, 1B.1, 2.4, and 2.11, drop `https://www.benormedia.com` from each link (`/blog/webflow-price-increase`, `/guides/webflow-enterprise`). Nothing else in those blocks changes. URLs in Sources lists stay absolute (task 6, `BenorMedia: Testimonials`).

"Where" quotes came from the rendered pages, so a link inside one may be written differently in the source (for example 5B.4a's `[AI Mode tracking](...)`). Match on the words, and leave existing links as they are.

## 3. Other discovery items

Deletions: Sergio left these to Claude's call on SEO and GEO grounds, and all three are approved: the /pricing placeholder data (B3), the planned guide in `plan.json`, and the uncited 2025 source (Q4).

| Item | Do this |
| --- | --- |
| Keyword map (after task 2) | One commit, `chore(data): point webflow pricing keywords to webflow-price-increase`. In `keyword-map.csv`, set the target of "webflow pricing" and "webflow plans" to /blog/webflow-price-increase, and add "webflow enterprise pricing" (150/mo, KD 33, Ahrefs US, 2026-11-16) with the same target, in the file's format. Search the repo for `page:webflow-pricing` and `/guides/webflow-pricing`, point any link still left after 1A at /blog/webflow-price-increase (target only, anchor unchanged, no date change), and list them. Then delete the `webflow-pricing` guide from `plan.json`, so no second page competes for "webflow pricing". |
| 2.11 | Add the sentence at the end of the body paragraph that says `$15 or $25 a month billed yearly` (line 153), not in the FAQ answer. |
| 1A.5 | Apply as written: dropping the planned-page link is intended. |
| 7.1 | Nothing to change: skip. |
| Q2 | Already fixed: skip, no commit. |
| Q4 | Apply a) and b), add the 2026 source, and delete the source entry `Stack Overflow, 2025 Developer Survey: AI`, which nothing cites after b). |
| Q5 | Apply the exact replacement to the sentence at line 187. The rate-limit rows wait for a later brief. |
| Q8 | Now a fix. Replace the meta description of /blog/website-architecture-seo with `Website architecture SEO for B2B SaaS: which pages to build, how to plan URLs and internal links, how to fix a messy structure, and a real example.` (147 characters). Meta only: no date change. |
| Q9 | "Managing Director" stands (Sergio, 2026-11-17); it reverses the 2026-11-03 note on purpose. Replace "General Manager" with "Managing Director" in `authors.ts` (`jobTitle`, `description`, and the bio) and on the `author:` line of the 46 posts and 4 guides that carry it, keeping the rest of each line ("Managing Director, BenorMedia"). Update the line 28 note to `Sergio 2026-11-17: Managing Director`. One commit, no date or `LASTMOD` changes. |
| Q10 | Your report covers it. No change this round. |

## 4. Dates and LASTMOD

- **Ship date: November 17, 2026** (Sergio deploys today). Set `updatedAt` and `dateModified` to 2026-11-17 on the pages whose copy changes on the first branch: /guides/webflow-enterprise, /webflow-enterprise-agency, /blog/webflow-price-increase, /blog/how-to-rank-in-chatgpt, /blog/optimize-for-ai-overviews, /blog/cro-audit, /blog/webflow-mcp, /guides/webflow-vs-custom-code (Q4), /blog/programmatic-seo-webflow (Q5), /website-redesign (Q11), and /pricing if it has them.
- **`LASTMOD`**: the same pages plus /pricing, same date, in the same commit as each change. Not for links-only, meta-only, or byline-only changes (2.11, Q1, Q6, Q7, Q8, Q9) or for the 57 pages under Q3, so the sitemap date always matches the page's own modified date.
- If the deploy slips past November 17, change those dates to the deploy day in one commit before the merge.
- The two rebuilt pages get their dates at release (section 1).

## 5. Unchanged

Everything else in the brief stands: the copy in every other block, the STOP rules, test A, and the notes for Sergio (the "dedicated pod" wording, the up-links after November 23, and the /webflow-migration link after December 9).

New copy in this update is under 100 words (one paragraph that reuses the detector-checked JOOR sentence, one inbound sentence, two `serviceType` strings, and one meta description), too short for a meaningful AI-detector run.

## 6. Report

As in brief section 11, plus:

1. Each branch with its commits.
2. The diff result from prompt step 2.
3. `pages:check` on both branches.
4. The heading punctuation the pack sources use, and whether you changed the two files to match (B1 item 3).
5. Whether the `faqs.ts` placeholders were deleted or kept, and why.
6. Any links you repointed from the planned pricing guide.
7. The pages whose rendered output changed under Q3 (a count, plus any that aren't posts or guides).
