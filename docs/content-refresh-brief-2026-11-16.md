# Content refresh brief: benormedia.com (2026-11-16)

Prepared by Claude for Sergio, delivered November 17, 2026. Source: the full-site audit in `claude/content-refresh-audit-2026-11-16.md` (all 87 sitemap URLs, Search Console through November 11, Ahrefs US data, Surfer content editors). Every string in this brief is final copy. Claude Code places it; it writes nothing itself.

What's in it:

| Task | Page | What changes |
| --- | --- | --- |
| 1A | /guides/webflow-enterprise | Team plan comparison, timeline answer, missing-guide mentions fixed, JOOR proof (body only, test A) |
| 1B | /webflow-enterprise-agency | Team plan in the FAQ, current Localization facts, JOOR proof (body only, test A) |
| 2 | /blog/webflow-price-increase | Becomes the full "Webflow pricing" page at the same URL; three factual errors fixed |
| 3 | /custom-websites-migrations | Full rebuild as the Webflow development agency page (new content-pack file) |
| 4 | /growth | Full rebuild as the B2B SaaS SEO agency page for the Growth plan (new content-pack file) |
| 4B | /pricing | New plan FAQs (unlimited design and development, SEO retainer, Webflow agency pricing) with FAQPage schema |
| 5A | /blog/how-to-rank-in-chatgpt | Current crawler facts, dated evidence, our AI Mode reading |
| 5B | /blog/optimize-for-ai-overviews | Google's November changes, consistent control name, our own readings |
| 6 | /blog/cro-audit | Retargeted to "CRO audit", tools table, a real example, 5 internal links |
| 7 | /blog/webflow-mcp | MCP v2.1, allow/ask/block up top, new table rows |
| 8 | Several | Quick fixes (Q1 to Q11) |

Sections 9 to 11: Surfer scores, the gap markers (Sergio answered all of them on November 17), and the report Claude Code sends back. Surfer's AI detector was run on all new copy on November 17, 2026 (13 chunks, `ai-detector-pack-2026-11-16.md`): every chunk passes under 20%, two of them after the rewrites now included in task 4.

## 0. How to run this

Paste this into Claude Code at the repo root, with the three files attached (this brief, custom-websites-migrations.md, and growth.md):

```
I've attached three files: content-refresh-brief-2026-11-16.md, custom-websites-migrations.md, and growth.md. Before anything else, save them unchanged: the brief as docs/content-refresh-brief-2026-11-16.md, and the two page files in content-pack/content/. The page files are the same text as sections 3.1 and 4.1 of the brief. If they differ in any way, or you can't save any file exactly as attached, stop and tell me.

You're working in the benormedia.com repo. Some context before you start.

WHO WE ARE
BenorMedia designs and builds marketing websites for B2B SaaS, fintech, cybersecurity, and AI companies, mostly Series A to C. Our buyers are marketing leads. We're Webflow-first, but we also build headless sites (Astro or Next.js on Sanity) and run growth work (SEO, GEO, CRO). benormedia.com itself runs on Astro and Sanity, deployed on Vercel. New pages are built from the content pack in content-pack/ (see content-pack/BUILD-BRIEF.md and RULES.md).

WHAT WE'RE DOING
A content refresh round from a full-site audit on November 16, 2026. New posts get one launch week of impressions and then go quiet; two posts refreshed and resubmitted on November 9 came back within days. Two old-template service pages (/custom-websites-migrations and /growth) get only branded impressions although their target terms add up to about 5,600 searches a month. Several pages carry facts that went stale after Webflow's May 2026 plan change, MCP v2.1, and Google's November updates.

WHAT'S ALREADY DONE (OUTSIDE THE REPO)
Keyword research, SERP review, Surfer briefs and scores, fact checks against primary sources on November 16 and 17, and a read of the live pages to confirm the current text you'll be matching. An AI-detector check on every new string: all under 20% on November 17, after two rewrites on /growth.

YOUR JOB
1. Read docs/content-refresh-brief-2026-11-16.md in full. It's the source of truth: exact copy, where it goes, and STOP rules.
2. Do section 0.3 (discovery) first and post what you found before changing anything.
3. Then work on a new branch, content/refresh-2026-11, one commit per task: 1A, 1B, 2, 3, 4, 4B, 5A, 5B, 6, 7, then section 8 (one commit per quick fix).
4. The two rebuilt service pages stay draft: true. Release waits for my sign-off on each page.
5. Finish with the report described in section 11.

RULES
- Use the copy exactly as written. Don't reword it, add facts, or write new copy, including alt text and schema descriptions. If something needs copy that isn't in the brief, stop and ask me.
- Leave the gap markers ([FACT NEEDED], [VERIFY]) in place. I'll answer them or approve the defaults at release.
- Don't merge, push to main, or deploy. Don't touch Sanity, robots.txt, vercel.json, Vercel settings, environment variables, or DNS.
- Do only what the brief lists. Everything a block doesn't name stays word for word.
- House style: US English, no em dashes, serial comma, sentence-case headings. No BenorMedia prices anywhere, and no currency amounts on service pages.
- Not bugs, so leave them: there's no /contact page on purpose, and the webflow.io links on /work are intentional.
- If the repo doesn't match the brief (a quoted sentence isn't there, a heading has changed), stop and tell me instead of guessing.
```

## 0.1 Ground rules

- Each block quotes the current text it changes ("Where", "Replace the paragraph that begins ..."). The quote must match exactly once on that page. Text is quoted from the live pages as imported on November 16, 2026.
- Test A (keyword overlap fix) runs until December 9 on /webflow-enterprise-agency, /guides/webflow-enterprise, /webflow-migration, /guides/wordpress-to-webflow-migration, and /blog/import-wordpress-to-webflow: their titles, H1s, and meta descriptions don't change in this round, and /webflow-migration isn't touched at all.
- Set `updatedAt` and `dateModified` to the ship date on every page whose copy changes. Links-only changes (Q6, the inbound links in 3.2 and 4.2) don't change dates.
- Third-party prices are allowed only on blog posts and guides, with `thirdPartyPrices: true` in front matter (blocks 1A and 2 set it). The release checker rejects currency amounts anywhere else.
- New FAQ items go into each page's FAQPage schema along with the visible FAQ.
- Gap markers: `[FACT NEEDED #ID: question | default: ...]` and `[VERIFY #ID: ...]` stay in the copy until Sergio answers. Section 10 lists every marker and its default; "DELETE" removes the marker (and, where section 10 says so, the sentences it covers).

## 0.2 STOP rules

Stop and report instead of changing anything when:

1. A quoted "Where" text isn't found exactly once on its page.
2. A page's copy lives in Sanity rather than in the repo.
3. A fix would change a shared template or component used by pages the brief doesn't list (Q3 in particular): show the diff and wait.
4. `pages:check` fails for any reason other than open gap markers on draft pages.
5. A change would need copy that isn't in this brief.

## 0.3 Discovery (do first, change nothing)

Post these findings before the first commit:

1. Where each page's content lives (file path, or Sanity document), for every page in tasks 1A to 7 (including 4B) and Q1 to Q11.
2. For each block, whether every quoted "Where" text is found exactly once. List any misses.
3. How the blog and guide templates render the post description or excerpt next to the first body paragraph (for Q3), checked on /blog/webflow-mcp.
4. Every place the string "Professional Partner" appears, including badge labels and alt text (Q2).
5. The current title and meta description of /blog/webflow-mcp and /blog/website-architecture-seo, with character counts, and the current meta of /guides.
6. Whether content-pack/ already has files or routes for custom-websites-migrations and growth, and how the legacy pages at those URLs are served, so the new files replace them at the same URL when `draft` flips.
7. The byline title shown for Sergio on each post (Q9).

## 1A. /guides/webflow-enterprise: add the Team plan, answer the timeline question, fix the missing-guide mentions

Data: webflow enterprise 400/mo (KD 0), webflow enterprise plan 90, webflow for enterprise 60 (Ahrefs, US, 2026-11-16). Search Console: the fastest riser on the site, 162 to 373 impressions a week and position 42.8 to 18.8 (weeks of Oct 29 and Nov 5). Ranking pages for "webflow enterprise" compare Webflow's plans (Surfer terms: Team plan, Site plans, Premium and Basic Site plan, Workspace plan, static pages), and this guide never mentions the Team plan Webflow launched on May 13, 2026.

Commit: `content(guides): add the Team plan to webflow-enterprise`. Change only what this block lists; everything else stays word for word. Keyword-overlap test A runs until Dec 9, so the title tag, meta description, H1, existing H2 wording, and the sentence that links to /webflow-enterprise-agency all stay as they are. Set `updatedAt` and `dateModified` to the ship date. Front matter: set `thirdPartyPrices: true` (the guide now quotes Webflow's prices) and `volatileChecked: 2026-11-16`.

### 1A.1 Head

Unchanged (title, meta description, H1).

### 1A.2 "What does Webflow Enterprise offer?"

Replace the first paragraph of the section (it begins `Webflow Enterprise is Webflow's plan for larger organizations, and Webflow's own pages list`) with:

```markdown
Webflow Enterprise is Webflow's plan for larger organizations: a custom-priced contract with single sign-on, custom roles, an audit log API, higher limits, and contractual support terms. Since May 13, 2026, some features that used to be Enterprise-only, such as publishing workflows and security headers, are also listed on Webflow's Team plan, so the plan you need depends on which of your requirements Team leaves out. Enterprise is separate from an agency's partner status, which describes the agency's relationship with Webflow.
```

In the table, replace the "What Webflow says" cell of four rows, and add the listed sources to each row's Source cell:

| Row | New "What Webflow says" text | Add to Source |
| --- | --- | --- |
| Release and approval flow | `A designer or editor works on a page branch and submits it for review, and an approver must approve it before it is merged and published. Permissions set who branches, who approves, and who publishes to staging or production. Since May 2026, Webflow also lists publishing workflows, page branching, and single-page publishing on the Team plan.` | `[plan update](https://webflow.com/blog/simplified-plans-and-updated-pricing-2026)` |
| Audit trail | `The Site Activity log records changes to components, CMS content, code, and publishes, and its history does not expire; the Team plan lists it too. The Workspace audit log API covers logins and role changes, keeps logs for 1 year, can feed a security monitoring (SIEM) tool, and stays an Enterprise feature.` | `[plan update](https://webflow.com/blog/simplified-plans-and-updated-pricing-2026)` |
| Site security settings | `Custom security headers, such as Content-Security-Policy and X-Frame-Options, and custom SSL certificates are listed on Enterprise and, since May 2026, on the Team plan. The help center still describes the headers as an Enterprise feature that Webflow's sales team switches on per site, after which a republish applies them.` | `[pricing page](https://webflow.com/pricing)`, `[plan update](https://webflow.com/blog/simplified-plans-and-updated-pricing-2026)` |
| Uptime, support, and limits | `The Enterprise page cites 99.99% uptime SLAs, 24/7 support, and a dedicated customer success manager. Webflow's pricing page lists 99.99% uptime for hosted sites on Enterprise and 99.00% on Team, with 99.90% for the application on both. The help center says non-Enterprise plans have no contractual SLA for uptime or support reply times and carry standard caps on CMS items, Collections, and API requests.` | `[pricing page](https://webflow.com/pricing)` |

Replace the paragraph right after the table (it begins `If your review requires single sign-on, custom roles, an audit trail, custom security headers, or a contractual SLA`) with:

```markdown
If your review requires single sign-on, SCIM provisioning, custom roles, the audit log API, or a contractual SLA, Webflow lists those as Enterprise features, so the requirement decides the plan. Publishing workflows, page branching, the site activity log, custom SSL, and security headers no longer decide it on their own, because the Team plan lists them too. Webflow's [pricing page](https://webflow.com/pricing) shows Enterprise as Custom, with no price, and our [Webflow pricing guide](https://www.benormedia.com/blog/webflow-price-increase) covers the other plans.
```

Leave the numbered release-flow graphic (Branch a page ... Publish to production) as it is.

### 1A.3 New H2 after "What does Webflow Enterprise offer?"

Insert after the release-flow graphic, before the H2 `How long does an enterprise website project take?`:

```markdown
## Is the Webflow Team plan enough, or do you need Enterprise?

The Team plan is enough when one site needs approvals, page branching, an activity log, security headers, and a couple of locales. Enterprise is the step up when your review asks for single sign-on, SCIM provisioning, custom roles, the audit log API, contractual SLAs, several sites under one contract, or limits above Team's. Webflow added Team on May 13, 2026.

Table: Webflow Team plan vs Enterprise (checked November 16, 2026)

| Area | Team plan | Enterprise |
| --- | --- | --- |
| Price | $2,500 a month on an annual contract | Custom quote |
| Sites | One site; more by arrangement with Webflow | Set in the contract |
| Seats | 5 full and 5 limited, plus up to 100 free seats | Set in the contract |
| CMS and pages | 20,000 CMS items, 100 Collections, 500 static pages | Custom limits |
| Localization | 2 locales included, more for a fee | A custom number of locales |
| Releases | Publishing workflows, page branching, single-page publishing | Configurable workflows and advanced governance |
| Security | Custom SSL certificates, security headers, and the site activity log | Adds SSO, SCIM, custom roles, and the audit log API |
| Uptime listed | 99.90% for the application, 99.00% for hosted sites | 99.90% for the application, 99.99% for hosted sites |

Enterprise also brings what Webflow calls a dedicated partner, a priority support queue, and SLAs written into the contract. Below Team, the self-serve Site plans (Basic and Premium) and Workspace plans cover smaller sites without any of these review features.

Check one thing before a security review relies on Team. Webflow's help center articles on plan differences and on custom security headers still describe headers, custom SSL, publishing workflows, and branching as Enterprise features, while the pricing page lists them on Team. Ask Webflow to confirm your plan's features in writing, and keep that answer in the review file.
```

### 1A.4 "How long does an enterprise website project take?"

Replace the first paragraph of the section (it begins `There is no fixed length:`) with:

```markdown
Moving a large site to Webflow takes us 8 to 10 weeks, and a full redesign adds design time on top of that. JOOR's rebuild, 100+ pages in 8+ languages on one design system, landed in the 10 to 14 week range from kickoff to launch. Enterprise projects land at the long end, or past it, when locales, integrations, and security, legal, and privacy reviews multiply, so the drivers below decide the real date.
```

Keep the drivers table and the paragraph after it.

### 1A.5 "How do you evaluate an agency for an enterprise Webflow site?"

Replace the sentence `These eight questions work for any agency, BenorMedia included, and the guide to choosing a Webflow agency covers the wider decision.` with:

```markdown
These eight questions work for any agency, BenorMedia included.
```

(That guide doesn't exist. Keep the sentence that links to /webflow-enterprise-agency exactly where it is.)

### 1A.6 "When is Webflow not the right fit for an enterprise site?"

Replace the last bullet (it begins `**You only need a refreshed marketing site for one team of editors.**`) with:

```markdown
* **You only need a refreshed marketing site for one team of editors.** A smaller plan or a simpler build may be enough, and our [Webflow pricing guide](https://www.benormedia.com/blog/webflow-price-increase) covers the other plans.
```

### 1A.7 "How was this guide written and checked?"

Replace the paragraph with:

```markdown
Every Webflow row in this guide was first read on Webflow's own pages, listed at the end, on 6 or 7 October 2026. The plan rows and the Team plan comparison were rechecked on November 16, 2026, and the guide is rechecked every 30 days because plans and limits change. We build Webflow sites for B2B companies, including large ones: for JOOR, the wholesale platform for global fashion, we rebuilt 100+ pages in 8+ languages on one design system. So we have an interest in the topic.
```

### 1A.8 FAQ ("Questions about Webflow Enterprise")

- Replace the answer to `How is Webflow Enterprise priced?` with: `Webflow quotes Enterprise per customer, and its pricing page shows it as Custom, with no price. The Team plan, launched on May 13, 2026, is listed at $2,500 a month on an annual contract, and the self-serve Site plans start at $15 a month billed yearly. Our Webflow pricing guide lists every plan.` (Link "Webflow pricing guide" to `/blog/webflow-price-increase`.)
- Replace the answer to `Do you need Webflow Enterprise for an enterprise website?` with: `Only if your review needs something Webflow keeps for Enterprise: single sign-on, SCIM provisioning, custom roles, the audit log API, contractual SLAs, or limits above the Team plan's. If approvals, page branching, an activity log, Localization, and security headers for one site are enough, the Team plan covers them.`
- Add as the third item: Q `What is the Webflow Team plan?` A `Team is a Webflow plan between the self-serve Site plans and Enterprise, launched on May 13, 2026. It's billed yearly at $2,500 a month and covers one site with publishing workflows, page branching, a site activity log, custom SSL, security headers, Localization with 2 locales, and 10 seats.` (The FAQ ends with 7 items; add it to the FAQPage schema.)
- Keep the other four items as they are.

### 1A.9 Sources and dates

- Add: `Webflow: We're updating our pricing and simplifying our plans` (https://webflow.com/blog/simplified-plans-and-updated-pricing-2026), Accessed November 16, 2026.
- Add: `Webflow Help Center: Updated pricing and simplified plans for May 2026` (https://help.webflow.com/hc/en-us/articles/51059955082387), Accessed November 16, 2026.
- Change the access date of `Webflow: Plans and pricing`, `Webflow Help Center: Differences between Enterprise and non-Enterprise plans`, and `Webflow Help Center: Custom security headers` to November 16, 2026 (all three were rechecked that day).
- Volatile facts: Team price, Team limits, uptime figures, Site plan starting price. `volatileChecked: 2026-11-16`.

### 1A.10 Links

- Added: two links to /blog/webflow-price-increase with the anchor "Webflow pricing guide" (1A.2 and 1A.6), plus one in the FAQ. The existing link to /webflow-enterprise-agency doesn't move.

### Markers

- None open. #ENT-1 (1A.4) was answered by Sergio on 2026-11-17 (JOOR: 10 to 14 weeks) and is now in the copy.

### Checks

- Surfer, Content Editor 17047396 ("webflow enterprise", imported from the live page): before SEO 36 / AI Search 77 / total 57; after: see the scores table in section 9.
- First-hand facts used: JOOR rebuild (published on /website-redesign) and its 10 to 14 weeks (Sergio, 2026-11-17); the 8 to 10 week large-site migration range (published on /guides/wordpress-to-webflow-migration, confirmed by Sergio on 2026-11-17); "a full redesign adds design time" (/website-redesign).
- AI detector (Surfer's free detector, run November 17, 2026; pass is under 20%): 0% on the new copy in 1A and 1B (chunk 1).

## 1B. /webflow-enterprise-agency: the Team plan in the FAQ, current Localization facts, JOOR as proof

Data: webflow enterprise agency 200/mo, enterprise webflow agency 80 (keyword map, Oct); Search Console: about 50 impressions a week at position 60 ("webflow enterprise agency" 111 at 39.8 over 28 days).

Commit: `content(pages): update webflow-enterprise-agency for the Team plan`. Change only what this block lists. Test A runs until Dec 9: title, meta description, H1, and H2s stay as they are. No currency amounts on this page (service page rule).

### 1B.1 "Security and access questions answered up front."

Replace the paragraph that begins `Webflow publishes its own security evidence for your team to review.` with:

```markdown
Webflow publishes its own security evidence for your team to review. Our [Webflow Enterprise guide](https://www.benormedia.com/guides/webflow-enterprise) lists what Webflow says its Enterprise plan includes, how it compares with the Team plan Webflow added in May 2026, and the source and date behind each row.
```

### 1B.2 "Global sites in more than one language."

Replace the sentence that begins `Webflow supports several locales through its` with:

```markdown
Webflow runs languages through [Localization](https://webflow.com/feature/localize): an add-on on Site plans with up to 3 or up to 10 locales depending on the tier, 2 locales included on the Team plan, and a custom number on Enterprise, as of November 2026.
```

### 1B.3 "Larger companies on our work page."

Insert directly under the H2, before the project grid:

```markdown
For JOOR, the wholesale platform for global fashion, we rebuilt 100+ pages in 8+ languages on one design system, and we've kept working with their team for more than three years. The companies below run marketing sites with several editors, regions, or review steps.
```

### 1B.4 FAQ ("Webflow enterprise agency FAQs.")

- Replace the answer to `Do you need Webflow Enterprise for an enterprise website?` with: `Only if your review needs what Webflow keeps for Enterprise: single sign-on, SCIM provisioning, custom roles, the audit log API, contractual SLAs, or limits above the Team plan's. Since May 2026, Webflow's Team plan covers publishing workflows, page branching, a site activity log, custom SSL, security headers, and Localization for one site, so many teams can start there. Our Webflow pricing overview lists every plan, and we match each of your requirements to a plan before you sign anything with Webflow.` Keep the existing link on "Webflow pricing" (to /blog/webflow-price-increase).
- Replace the answer to `Can Webflow run a multi-language enterprise site?` with: `Yes. Webflow's Localization runs several locales on one site, with locale-specific URLs and hreflang tags in the generated sitemap. Site plans add it as a paid add-on with up to 10 locales, the Team plan includes 2, and Enterprise sets a custom number, so count your locales before you pick a plan. On Enterprise, editors can also be limited to specific locales, so each regional team edits only its own content.`
- Keep the other five items as they are.

### Sources and dates

- The Localization and Team facts come from https://webflow.com/pricing and https://webflow.com/blog/simplified-plans-and-updated-pricing-2026, both checked November 16, 2026.

### Notes for Sergio (no change in this brief)

- The section "A dedicated team and response times after launch." still says "a dedicated pod" and promises "a 48-hour standard response to 6-hour critical bug fixes". The rebuilt /ongoing-website-support dropped "dedicated pod" (it implies a team per client) and left the priority SLA as an open question (#OWS-3). Decide which wording is right and align both pages.

### Checks

- Surfer, Content Editor 17047409 ("webflow enterprise agency", imported from the live page): before SEO 42 / AI Search 43 / total 43; after: see the scores table in section 9.
- First-hand facts used: JOOR rebuild and 3+ years (published on /website-redesign).
- AI detector (Surfer's free detector, run November 17, 2026; pass is under 20%): 0% on the new copy in 1A and 1B (chunk 1).

## 2. /blog/webflow-price-increase: the complete Webflow pricing page

Decision (recommended option, applied 2026-11-16 pending Sergio's sign-off): this post becomes the site's answer for "webflow pricing" at the same URL. The Webflow pricing guide reserved in the topic bank is folded into it, so update the keyword map's reservation ("webflow pricing" and "webflow enterprise pricing" now go to this post).

Data: webflow pricing 4,700/mo (KD 1), webflow enterprise pricing 150 (KD 33), webflow price increase 100 (KD 22) (Ahrefs, US, 2026-11-16). Search Console, Oct 15 to Nov 11: 21 impressions at about position 12, mostly "webflow price increase". The post was retargeted to "webflow pricing 2026" on Nov 9 (playbook test D): log this change date in the test.

Commit: `content(blog): make webflow-price-increase the Webflow pricing page`. Keep the URL. Change only what this block lists; everything else stays word for word. Set `updatedAt` and `dateModified` to the ship date. Front matter: `thirdPartyPrices: true` (if not set already), `volatileChecked: 2026-11-16`, and add the new FAQ items to the FAQPage schema.

### 2.1 Head

- Title: `Webflow Pricing 2026: Every Plan, Price, and Change` (51 characters; the " | BenorMedia" suffix is dropped under blog rule 9 because it would push the title past 60)
- Meta description: `Webflow pricing in 2026: Basic costs 15 dollars a month and Premium 25, billed yearly. Every Site, Workspace, Team, and Enterprise plan, and which to pick.` (155 characters)
- H1: `Webflow pricing in 2026: every plan, what it costs, and what changed.`

### 2.2 Lead

Replace the opening paragraph (it begins `Webflow's price increase reaches sites in Freelancer and Agency Workspaces`) with:

```markdown
Webflow pricing in 2026 starts at 15 dollars a month for a Basic Site plan billed yearly and 25 dollars for Premium, the plan a marketing site with a blog or other CMS content needs. The Team plan is listed at 2,500 dollars a month on an annual contract, and Enterprise is quoted per customer. This page lists every plan and add-on for B2B marketing leads and founders, helps you pick one, and explains the 2026 price change, whose last step reached sites in Freelancer and Agency Workspaces on November 16, 2026.
```

Template check: the opening paragraph is reported to print twice (under the H1 and again after the key takeaways). If it does, keep the first and remove the second copy.

### 2.3 "How much does Webflow cost in 2026?"

- Replace the sources line under the Workspace table (it begins `Sources: [Webflow pricing page]`) with: `Sources: [Webflow pricing page](https://webflow.com/pricing) and Webflow's help center notice [Updated pricing and simplified plans for May 2026](https://help.webflow.com/hc/en-us/articles/51059955082387-Updated-pricing-and-simplified-plans-for-May-2026), checked on November 9, 2026; yearly Site plan, Team, Workspace, and seat prices rechecked on November 16, 2026.`
- Replace the sentence `Webflow sells eleven bandwidth steps in all, from 50 GB extra up to a 2.5 TB total.` with `Bandwidth add-ons run from 50 GB extra up to a 2.5 TB total; the table shows the main steps.` (The text said eleven steps; the table lists seven.)

### 2.4 New H2 after "How much does Webflow cost in 2026?"

Insert before the H2 `Which Webflow sites change on November 16, 2026?`:

```markdown
## Which Webflow plan do you need?

Premium, if your site has a blog, case studies, or any other content in the CMS, because Basic has no CMS at all. Basic fits a small site of static pages, Starter is only for building and testing, and Team or Enterprise come in when a larger team needs approvals, more seats, or single sign-on.

Table: Which Webflow plan fits which site

| Your site | Plan | Why |
| --- | --- | --- |
| A test or practice site with no custom domain | Starter, free | Publishes only to a webflow.io address, with 2 static pages and 1 GB of bandwidth a month |
| A few static pages and a contact form | Basic | Up to 300 static pages, a custom domain, and unlimited form submissions, but no CMS |
| A B2B marketing site with a blog, resources, or case studies | Premium | 20,000 CMS items, 40 Collections, site search, and form file uploads |
| An online store | Ecommerce Standard, Plus, or Advanced | Priced by the number of ecommerce items, from 500 to 15,000 |
| One large site that needs approvals, page branching, and Localization | Team | Publishing workflows, 10 seats, and 2 locales on one site |
| Single sign-on, custom roles, several sites, or contractual SLAs | Enterprise | A custom contract with a priority support queue |

Workspace plans are a separate decision about seats and staging, not about the live site. Core and Growth are for in-house teams, Freelancer and Agency for people who build sites for clients, and the free Starter Workspace covers 2 staging sites and 1 full seat.

## What do the Team and Enterprise plans include?

Team and Enterprise are Webflow's platform plans for larger teams. Team costs 2,500 dollars a month on an annual contract and covers one site; Enterprise has no public price and is set per contract. Both raise the limits of the self-serve plans, and Enterprise adds single sign-on, custom roles, and contractual SLAs.

Table: Webflow Team plan vs Enterprise plan (checked November 16, 2026)

| Area | Team | Enterprise |
| --- | --- | --- |
| Price | 2,500 dollars a month, annual contract only | Custom, quoted by Webflow |
| Sites | One site; more by arrangement with Webflow | Set in the contract |
| Seats | 5 full and 5 limited, plus up to 100 free seats | Set in the contract |
| Limits | 20,000 CMS items, 100 Collections, 500 static pages, up to 30 TB of bandwidth a year | Custom |
| Localization | 2 locales included, more for a fee | Custom |
| Publishing | Publishing workflows, page branching, single-page publishing | Configurable workflows |
| Security | Custom SSL certificates, security headers, a site activity log | Adds single sign-on, SCIM, custom roles, and an audit log API |
| Uptime listed | 99.90% for the application, 99.00% for hosted sites | 99.90% for the application, 99.99% for hosted sites |
| Support | Not stated on the pricing page | Contractual SLAs and a priority support queue |

Webflow's older help center articles still describe security headers, custom SSL, and publishing workflows as Enterprise features, so if a security review depends on them, ask Webflow to confirm what your plan includes. Our [Webflow Enterprise guide](https://www.benormedia.com/guides/webflow-enterprise) compares the two plans for teams with security and governance reviews.
```

### 2.5 "Which Webflow sites change on November 16, 2026?"

- Rename the H2 to `Which Webflow sites changed on November 16, 2026?`
- Replace the first paragraph (it begins `Two groups are on the November 16, 2026 timeline:`) with:

```markdown
Two groups moved to the new terms from November 16, 2026: existing sites in Freelancer or Agency Workspaces, and sites on legacy discounts from 2022 or earlier. Each site switches at its first renewal or billable change on or after that date, so a site whose renewal is months away runs on its old plan until then.
```

- Replace the second paragraph (it begins `Webflow rolled the change out in three steps.`) with:

```markdown
Webflow rolled the change out on three dates. New Site plan purchases got the new terms on May 13, 2026; other existing sites followed at renewal from June 29; and Freelancer and Agency Workspace sites and sites on legacy pricing from 2022 or earlier came last, from November 16. Webflow says it notified the customers on the November timeline in advance.
```

### 2.6 "What changes for the Basic plan, CMS plan, and Business plan?"

- In the table, replace the "Plan price" cells:
  - Basic: `From 14 to 15 dollars a month billed yearly; 25 billed monthly`
  - CMS: `From 23 to 25 dollars a month billed yearly; 39 billed monthly`
  - Business: `From 39 to 25 dollars a month billed yearly, and from 49 to 39 billed monthly`
  - Ecommerce: unchanged (`No change`)
- Replace the paragraph that begins `Webflow also launched a new Team plan, which bundles a Workspace` with: `Webflow also launched the Team plan on May 13, 2026; the section on Team and Enterprise above covers what it includes.`

### 2.7 "Can you keep your current Webflow plan for another year?"

- Rename the H2 to `Can you still keep your old Webflow plan for another year?`
- Replace the first paragraph (it begins `Only by switching to yearly billing before the changes take effect`) with: `No, unless you switched in time. Webflow let a site keep its current Site plan for one more year if the owner moved it to yearly billing before the change reached it, and that window has now closed for every group.`
- Replace the second paragraph (it begins `For a site in a Freelancer or Agency Workspace, that means switching before November 16, 2026.`) with:

```markdown
For most existing sites the window closed on June 29, 2026, and for sites in Freelancer or Agency Workspaces or on legacy discounts it closed on November 16, 2026. Since those dates, a switch between billing cycles is itself a billable change, so it moves a site to the new terms instead of protecting the old ones. A site that switched in time keeps its old plan until the end of that extra year, then moves at its next renewal.
```

- Replace the third paragraph (it begins `The lock-in suits sites that will pay more:`) with: `If one of your sites is in that extra year, note when it ends and run Webflow's pricing change calculator a month before, so the new price doesn't arrive as a surprise. A Business site on monthly billing with modest traffic may even pay less on Premium, as the example table above shows.`
- Keep the fourth paragraph (how to switch a Site plan to yearly billing).

### 2.8 "What if your site sits in an Agency or Freelancer Workspace?"

Replace the sentence that begins `Our advice to clients follows the checklist above, in that order:` with: `Our advice to clients follows the checklist above, in that order: compare the calculator's result with your current price, move to yearly billing where it now saves money, and agree who pays the Site plan from then on.` Keep the sentence after it.

### 2.9 FAQ ("Questions about Webflow pricing in 2026")

- Replace the answer to `When does the Webflow price increase apply to my site?` with: `At your site's first renewal or billable change after its change date: May 13, 2026 for new purchases, June 29, 2026 for most existing sites, and November 16, 2026 for sites in Freelancer or Agency Workspaces or on legacy discounts from 2022 or earlier. Ecommerce plans didn't change.`
- Replace the answer to `Can I keep my current Webflow plan for longer?` with: `Only if you switched to yearly billing before the change reached your site: by June 29, 2026 for most sites, or by November 16, 2026 for sites in Freelancer or Agency Workspaces or on legacy discounts. That switch kept the current Site plan for one more year. Since those dates, a billing switch is a billable change and moves the site to the new terms.`
- Add after `How much does Webflow cost per month in 2026?`:
  - Q `Is Webflow free?` A `For building and testing, yes. The Starter Site plan and the Starter Workspace cost nothing, but a Starter site publishes only to a webflow.io address, with 2 static pages, 50 CMS items, and 1 GB of bandwidth a month. A custom domain needs a paid Site plan, from 15 dollars a month billed yearly.`
  - Q `Which Webflow plan do I need for a business website?` A `Premium, if the site has a blog, case studies, or a resource library, because those run on the CMS and Basic has none. Premium costs 25 dollars a month billed yearly and includes 20,000 CMS items and 40 Collections. Team and Enterprise come in when you need approvals, more seats, or single sign-on.`
  - Q `How much did Webflow cost before the 2026 change?` A `Billed yearly, Basic was 14 dollars a month, CMS 23, and Business 39, or 49 billed monthly. Basic now costs 15, and CMS and Business sites move to Premium at 25 dollars a month billed yearly, or 39 monthly.`
- Keep the other six items. The FAQ ends with 11 items.

### 2.10 Sources and dates

- Change the access date of source 1 (`Webflow: Plans and pricing`) and source 2 (`Webflow Help Center: Updated pricing and simplified plans for May 2026`) to November 16, 2026.
- Add: `Webflow: We're updating our pricing and simplifying our plans` (https://webflow.com/blog/simplified-plans-and-updated-pricing-2026), Accessed November 16, 2026.
- Add: `Webflow Help Center: Differences between Enterprise and non-Enterprise plans` (https://help.webflow.com/hc/en-us/articles/46651891357971-Differences-between-Enterprise-and-non-Enterprise-plans), Accessed November 16, 2026.
- Add: `PricingSaaS: Webflow pricing changes, Q2 2026 (snapshots of March 30 and June 29, 2026)` (https://pricingsaas.com/companies/webflow/diffs/2026Q2), Accessed November 16, 2026. Used only for the old Basic and CMS prices.
- Volatile: every price and limit on the page. `volatileChecked: 2026-11-16`.

### 2.11 Links

- Added: one link to /guides/webflow-enterprise in the new Team and Enterprise section (the post already links there once).
- Inbound, one sentence (add it; change nothing else on the page):
  - /guides/website-redesign-cost, at the end of the paragraph that quotes Webflow's Site plan prices (15 or 25 dollars a month billed yearly): `Our [Webflow pricing guide](https://www.benormedia.com/blog/webflow-price-increase) lists every Site, Workspace, and Team plan.` If no paragraph there quotes those prices, skip this and report it.
  - /guides/webflow-enterprise links here three times after block 1A.

### Markers

- #PRC-1 (2.6 and FAQ), resolved 2026-11-17: Sergio couldn't confirm the old Basic (14 dollars) and CMS (23 dollars) yearly prices from an invoice, so they stay as the pricing tracker's March 30, 2026 snapshot shows them, with that source cited. Business (39 yearly, 49 monthly) is in Webflow's own notice.

### Checks

- Surfer, Content Editor 17047340 ("webflow pricing", imported from the live page): before SEO 66 / AI Search 64 / total 65; after: see the scores table in section 9. Surfer's AI Search check flagged that the old opening didn't set expectations or explain why the topic matters now; the new lead does both.
- Verified on webflow.com/pricing on November 16, 2026: Basic 15 and Premium 25 billed yearly, Team 2,500 a month on an annual contract with its limits, Enterprise custom, Starter limits, Workspace prices (Core 19, Growth 49, Freelancer 16, Agency 35, billed yearly), extra seats (39 full, 15 limited), and the uptime figures.
- AI detector (Surfer's free detector, run November 17, 2026; pass is under 20%): 1% (chunk 2).

## 3. /custom-websites-migrations: rebuild as the Webflow development agency page

Decision (audit item 3): rebuild the old-template page on the current service template as the Webflow design and development page. Same URL, no redirect. Migration intent goes to /webflow-migration.

Data: webflow development agency 1,300/mo (KD 7), webflow design agency 1,300 (KD 2), webflow development services 700 (KD 0) (Ahrefs, US, 2026-11-16). Search Console, Oct 15 to Nov 11: 25 impressions, all branded or client names. Surfer Content Editor 17047398 ("webflow development agency", keyword-only): legacy page as imported (editor 17047427) SEO 8 / AI Search 46 / total 27; this draft: see the scores table in section 9.

Commit: `content(pages): rebuild custom-websites-migrations as the Webflow development agency page`. Save the file below as `content-pack/content/custom-websites-migrations.md` exactly as written (`draft: true`). It replaces the legacy page at the same URL when Sergio sets `draft: false`. Run `pages:check`. No currency amounts on this page.

### 3.1 Page file: `content-pack/content/custom-websites-migrations.md`

````markdown
---
slug: custom-websites-migrations
url: /custom-websites-migrations
pageType: service
draft: true
blockedBy: []
wave: 3
title: "Webflow Development Agency: Design & Build | BenorMedia"
description: "Webflow development agency for B2B SaaS and tech teams. We design and build Webflow sites your marketers can run. Webflow Premium Partner since 2022."
h1: "A Webflow development agency that designs, builds, and supports B2B marketing sites"
eyebrow: "Webflow design & development"
lang: en-US
author: "BenorMedia team"
publishedAt: 2026-11-23
updatedAt: 2026-11-23
reviewEvery: 90 days
primaryKeyword: "webflow development agency"
secondaryKeywords: ["webflow design agency", "webflow development services", "webflow agency", "webflow design and development"]
service: "Webflow design and development"
breadcrumb:
  - name: "Home"
    path: /
  - name: "Webflow design & development"
    path: /custom-websites-migrations
schema: ["Service", "FAQPage", "BreadcrumbList"]
testimonial: surfe
closing:
  heading: "Plan your Webflow build with us."
  text: "Send us your current site or your brief, and we'll reply with a scope, a timeline, and the questions to settle first. One of our team members will be in touch within 24 hours."
faqHeading: "Webflow development agency FAQs."
faq:
  - q: "What does a Webflow development agency do?"
    a: "A Webflow agency plans, designs, and builds websites in Webflow, then hands them over in a state your marketing team can run. Ours also models the CMS, connects your CRM and analytics, sets up technical SEO and redirects, and runs QA and launch, so you deal with one team instead of a designer, a developer, and an SEO consultant."
  - q: "How much does a Webflow agency cost?"
    a: "Cost follows the project scope: how many page templates, how much new design, how deep the CMS goes, and which integrations you need. Our fixed-scope projects and monthly plans are on our [pricing page](/pricing). Webflow bills its own site plan separately, and our [Webflow pricing breakdown](/blog/webflow-price-increase) lists every plan."
  - q: "How long does a Webflow build take?"
    a: "A new design and Webflow build for a B2B site of 20 to 40 pages usually takes 6 to 8 weeks. Moving an existing site to Webflow without a redesign takes about 2 to 4 weeks for a site of about 20 pages and 8 to 10 weeks for a large site. Surfe's redesign and migration took 8 weeks from the first mapping session to launch."
  - q: "Do you design the site, or only build it in Webflow?"
    a: "Both. We work as a Webflow design agency and a development team in one, so a full project covers strategy, UX, and visual design before the build. If your team or another agency already has designs in Figma, we build from those files, which is also how our white label work runs for partner agencies."
  - q: "What are the disadvantages of Webflow?"
    a: "Plan limits, mostly. Premium and Team sites hold up to 20,000 CMS items, Localization is a paid add-on on Site plans, and a [Webflow code export](/blog/webflow-export-code) leaves CMS content, forms, and site search behind, so leaving Webflow means rebuilding those. Webflow also changed its plans and prices in May 2026, so budgets set before then need a second look."
  - q: "Will our marketing team be able to edit the site without a developer?"
    a: "Yes, and we build for it. Content editors change copy, images, and CMS items without touching layouts, and page builders assemble new pages from the component library. Every fixed-scope project includes tutorials and training, and Webflow's Team plan adds publishing workflows and page branching for larger teams."
  - q: "Who will work on our site?"
    a: "Our own team, from discovery to launch, with no subcontractors or freelancers. Strategy, design, and development stay with one team, and you get a dedicated client manager. We're based in Barcelona and work remotely, and our hours cover the European working day and overlap with every US time zone."
  - q: "Can you move our site from WordPress to Webflow?"
    a: "Yes. We've run 30+ WordPress to Webflow migrations in the last six years. If you're keeping your design, our [Webflow migration services](/webflow-migration) page covers how we map URLs, move content, and test redirects. If the move comes with a redesign, it's a build like the ones on this page."
  - q: "Are you a Webflow partner?"
    a: "Yes. BenorMedia has been a Webflow Premium Partner since 2022, and we've launched 100+ sites over 6+ years for B2B companies, including JOOR, Surfe, Puzzle, and Unit21."
  - q: "What happens after launch?"
    a: "Support continues for 30 days after launch. For the first weeks we watch rankings, conversions, and errors, then hand you a short plan for what to improve next. After that, some teams run the site themselves, and others keep us on for ongoing support through the Design + Development plan or our [Webflow maintenance services](/ongoing-website-support)."
related:
  - /webflow-migration
  - /website-redesign
  - /ongoing-website-support
  - /headless-cms-agency
visuals:
  - type: diagram
    side: right
    after: "How our Webflow development agency runs a build."
    brief: "The seven build stages left to right (discovery and mapping; information architecture and wireframes; visual design and the design system; Webflow development; content, SEO, and redirects; QA and launch; after launch). Underneath, Surfe's 8 weeks as one bar: 0.5 weeks mapping, 4 design, 3 build and content, 0.5 launch and audits."
    alt: "The seven stages of a BenorMedia Webflow build, with Surfe's 8-week project as an example"
inbound:
  - page: /b2b-saas-web-design
    anchor: "Webflow development agency"
    sentence: "For the full scope of a build, from the component library to launch, see our Webflow development agency page."
  - page: /website-redesign
    anchor: "Webflow design and development"
    sentence: "Starting from a blank page instead of an existing site? Our Webflow design and development page covers new builds."
editorNotes:
  - "Data (Ahrefs US, 2026-11-16): webflow development agency 1,300/mo (KD 7), webflow design agency 1,300 (KD 2), webflow development services 700 (KD 0). Search Console Oct 15 to Nov 11: 25 impressions, all branded or client names."
  - "SERP read (US, 2026-11-16): the top 10 mixes Webflow's homepage, two Reddit threads, agency service pages, and 'best Webflow agencies' lists. We don't rank agencies; the page answers the questions those lists and People Also Ask raise (cost, timeline, disadvantages of Webflow, partner status) from our own published facts."
  - "Kept from the legacy page: the discovery step ('Before anyone builds anything...' and 'Most surprises in a build...') and its deliverables list, and the Surfe testimonial block. Dropped: the H1 'Build a website your ambition deserves.' and the unlimited-requests FAQs (decision #CWM-1)."
  - "Facts and where they are published (checked 2026-11-16): JOOR, the 30 days of support, and the first-weeks monitoring sentence (/website-redesign); migration week ranges (/guides/wordpress-to-webflow-migration, confirmed by Sergio on 2026-11-17); 6 to 8 weeks for a new design and build of 20 to 40 pages (Sergio, 2026-11-17); Surfe numbers (/guides/wordpress-to-webflow-migration); quotes from Surfe, Energy Domain, Puzzle, Releventful, DeepSeas, and EmpowerEMR (/testimonials); plan inclusions (/pricing); 30+ migrations (/guides/wordpress-to-webflow-migration); Gartner survey (press release, March 9, 2026); Poplin, Base Operations, and Orchestra CMS page sets, own staff only, Barcelona hours (Sergio)."
  - "Decision #CWM-1 (Sergio, 2026-11-17): the legacy subscription FAQs are rewritten as new plan FAQs with FAQPage schema on /pricing (task 4B)."
  - "Surfer Content Editor 17047398: legacy page (editor 17047427) SEO 8 / AI Search 46 / total 27; this draft: see section 9 of the brief."
---

BenorMedia is a Webflow development agency for B2B SaaS, fintech, cybersecurity, and AI companies: we design and build marketing sites your team can update without waiting on a developer. That matters more now that buyers do most of the work alone; in a [Gartner survey](https://www.gartner.com/en/newsroom/press-releases/2026-03-09-gartner-sales-survey-finds-67-percent-of-b2b-buyers-prefer-a-rep-free-experience) published in March 2026, 67% of B2B buyers said they prefer a rep-free buying experience. We've launched 100+ sites over 6+ years and have been a Webflow Premium Partner since 2022.

## Webflow design services and development, under one team.

Strategy, web design, and web development stay with one team, so design decisions don't get reinterpreted at handoff. You get design and Webflow development services from the same people, under one project scope.

- **New marketing sites.** Positioning and sitemap, UX design and wireframes, visual design in Figma, then the Webflow build: homepage, product, pricing, comparison, customer, and resource pages.
- **Redesigns of sites that already rank.** We start from your Search Console data and the pages that bring in demos, then design around them. Our [website redesign services](/website-redesign) page covers that process.
- **Design systems and reusable components.** Pages are assembled from components with properties and variables, so new pages come out of approved sections. As DeepSeas' marketing operations lead put it: "The design systems they created are the foundation of every page on our new website."
- **CMS structures for content at scale.** Blog, guides, customer stories, integrations, and glossary collections get modeled before anyone builds a template. We built Poplin's city pages, Base Operations' threat glossary, and Orchestra's guides library as CMS page sets in Webflow.
- **Integrations and custom code.** API integrations with your CRM, analytics, and consent tools, plus custom development where Webflow's native features stop. Our guide to [connecting Webflow to Salesforce](/blog/webflow-salesforce-integration) shows the kind of decisions involved.
- **Moves to Webflow.** If your site lives on WordPress or another platform, our [Webflow migration services](/webflow-migration) cover URL mapping, content moves, and redirects. We've run 30+ WordPress to Webflow migrations in the last six years.
- **Headless builds when Webflow isn't the fit.** Astro or Next.js on Sanity, the stack our own site runs on. See our [headless CMS agency](/headless-cms-agency) page.

## How our Webflow development agency runs a build.

Every one of our Webflow projects moves through seven stages, and the same team carries it from the first workshop to launch.

- **Discovery and mapping.** Before anyone builds anything, we map what your site actually has to do: the content, the integrations, the things that absolutely cannot break. Most surprises in a build are just questions nobody asked early. We ask them early. This stage produces a technical audit, a content inventory, redirect mapping, the sitemap architecture, a timeline, and stakeholder alignment.
- **Information architecture and wireframes.** Page types, the CMS model, and the route from each buyer question to a demo request.
- **Visual design and the design system.** Figma designs for the key templates, then the components, type scale, and color variables the build will use.
- **Webflow development.** Components, CMS Collections and templates, interactions, forms, and integrations, built on a staging domain your team reviews as it grows.
- **Content, SEO, and redirects.** Titles, meta descriptions, schema, alt text, and a 301 redirect for every URL that changes.
- **QA and launch.** Browser and device testing, form and integration tests, speed checks, and the domain switch.
- **After launch.** Support continues for 30 days after launch. For the first weeks we watch rankings, conversions, and errors, then hand you a short plan for what to improve next.

Surfe's project shows how the time splits. Their redesign and move from WordPress took 8 weeks from the first mapping session to launch on August 20, 2026: half a week of mapping, 4 weeks of design, 3 for the build and content, and half a week for launch and audits.

Before anything moved, we reviewed more than 3,000 pages. We kept 300, merged 50, redirected 2,400, and removed 250, and every redirect was tested before launch.

## Built for the marketing teams that run the site.

At SaaS companies, a marketing site pays off after launch, when someone on the marketing team can publish a new page in an afternoon without a ticket to engineering.

- **Components editors can't break.** Layout lives in the component. Copy, images, and links are properties your team fills in.
- **CMS fields named for the people who use them.** Each Collection gets help text, required fields, and its own SEO fields: title, meta description, and social image.
- **Roles that match your team.** Full seats for the people who build pages, limited seats for people who only edit content. Larger teams can add publishing workflows and page branching, which Webflow includes in its Team plan (launched May 2026) and in Enterprise. Our [Webflow Enterprise guide](/guides/webflow-enterprise) compares the two.
- **Training at handover.** Every fixed-scope project includes tutorials and training, so the team that inherits the site knows how it was built.

"The structure of the site they put in place allows us to make regular updates without any trouble," says Sharif Zeid, Business Director at EmpowerEMR.

## SEO and AI search are part of the build.

Technical SEO costs less to build in than to retrofit, so every build ships with it in scope.

- **Templates that output clean metadata.** One H1 per page, titles and meta descriptions from CMS fields, canonical tags, and schema markup such as Organization, BreadcrumbList, FAQPage, and Article where it fits.
- **Redirects before launch.** Every changed URL gets a 301 in Webflow's redirect settings. Our guide to [Webflow redirects](/blog/webflow-redirects) explains how they work.
- **Speed you can measure.** Image formats, font loading, and third-party scripts are budgeted per template. Here's [how to improve Core Web Vitals](/blog/core-web-vitals-optimization) on a marketing site.
- **Pages AI assistants can quote.** Question-led sections, comparison tables, and FAQs, plus robots.txt rules that let AI search crawlers in. See [which AI crawlers to allow in robots.txt](/blog/ai-crawlers-robots-txt).

After Surfe's launch, the site scored 97 for performance and 100 for SEO in PageSpeed Insights, and the October 5, 2026 site audit found no internal URLs with errors. For search visibility and organic traffic after launch, see our [Webflow SEO agency](/webflow-seo-agency) and [AEO agency](/aeo-agency) services.

## B2B SaaS and enterprise builds you can check.

These sites are live, and the results below are the ones our clients have published or said on the record.

Table: Webflow builds by BenorMedia and what each client has said

| Client | What we built | On the record |
| --- | --- | --- |
| JOOR, the wholesale platform for global fashion | A rebuild of 100+ pages in 8+ languages on one design system | Client for more than three years |
| Surfe | Redesign and move from WordPress: 3,000+ pages reviewed, 2,400 redirected, 8 weeks to launch | Demo bookings "more than doubled" within two months of launch (Thibaut Davoult, Head of Growth); 50% more traffic and a 3x faster go-to-market than the month before launch |
| Energy Domain | The entire site, "from the new design to the build," across hundreds of pages | "Every one came out consistent and on brand" (Braxton Huggins, CMO) |
| Puzzle | A "flexible, system-driven website" | Helps the team "launch faster, experiment more" (Ozgur Uzuner, CEO) |
| Releventful | Two redesigns and rebuilds in four years | Would "hire them a third time" (Daniel Wright, Founder) |

More projects are on our [work page](/work), and every quote here is on our [testimonials page](/testimonials).

## Project or plan: two ways to work with us.

You can hire us for one project or keep us on a monthly plan.

- **A fixed-scope project.** A new site or a redesign with an agreed scope: Webflow development, conversion-focused design, design and development systems, custom illustrations, technical SEO, tutorials and training, a dedicated client manager, and several review rounds.
- **The Design + Development plan.** For teams that ship pages and campaigns every week: unlimited design and development requests, unlimited revisions, updates through our dashboard, Slack, or email, a dedicated client manager, and you can cancel anytime.

Both are on our [pricing page](/pricing). If the site is built and you only need upkeep, our [Webflow maintenance services](/ongoing-website-support) cover it. Agencies that need a build partner can use our [white label Webflow development](/white-label-webflow-development) service.

## When Webflow is the right platform, and when it isn't.

We build on Webflow and on headless stacks, so the platform call comes after we know what the site has to do.

Table: Which build fits which situation

| Situation | What we'd recommend | Why |
| --- | --- | --- |
| A marketing site your team edits every week | Webflow | Visual editing, hosting, and security updates come with the platform |
| Very large sites: more than 20,000 CMS items, or content shared with an app | A headless CMS such as Sanity, with Astro or Next.js, or Webflow Enterprise | Premium and Team sites hold up to 20,000 CMS items |
| Several regions or brands with review steps | Webflow's Team or Enterprise plan | Publishing workflows, page branching, and an activity log |
| Logged-in product features or heavy server-side logic | Custom code with your engineering team | That's application work; our [Webflow vs custom code guide](/guides/webflow-vs-custom-code) covers the trade-offs |
| A five-page site with no CMS and a small budget | A Webflow template | An agency build would cost more than the site needs |

Coming from WordPress? Our [Webflow vs WordPress comparison](/guides/webflow-vs-wordpress) is the place to start.

## When an in-house team or another service fits better.

A Webflow development agency isn't always the right hire, and we'd rather say so before you sign anything.

- **You only need to change platforms.** Keep the design and go straight to our Webflow migration team.
- **The site is built and needs upkeep.** A maintenance plan costs less than a new build.
- **You already have a Webflow developer in-house.** If the gap is design, or extra capacity for a few months, the Design + Development plan covers it without a full project.
- **The site is really a web app.** Product features belong with your engineers. We'd build the marketing site around them.
- **You need ten pages next week.** A template and a freelancer will get you there faster than any agency process.
````

### 3.2 Inbound links

- /b2b-saas-web-design: append the `inbound` sentence (anchor "Webflow development agency") to the end of the paragraph under H2 "A component library your marketers can build from." (the paragraph that begins "We build a component system first and pages come out of it,").
- /website-redesign: add the `inbound` sentence (anchor "Webflow design and development") as a new last paragraph of the section under H2 "Rebuild on a system your marketing team can run."
- /webflow-migration: no link now (test A runs until Dec 9). After Dec 9, add one sentence linking "Webflow development agency" to this page.

### Markers

- None open. #CWM-2 was answered by Sergio on 2026-11-17 (6 to 8 weeks for a new design and build of 20 to 40 pages; the migration guide's 2 to 4 and 8 to 10 week ranges are current, and quick fix Q11 aligns /website-redesign). #CWM-1 became task 4B.

### Checks

- Title 55 characters; meta description 149 characters (counted with a script).
- Rule check done: statement H2s with final periods, no prices, no research-tool or agency names, only published or Sergio-confirmed first-hand facts, quotes copied from /testimonials as published on 2026-11-16.
- AI detector (Surfer's free detector, run November 17, 2026; pass is under 20%): 2%, 0%, and 14% on this page's three chunks (chunks 3 to 5).

## 4. /growth: rebuild as the B2B SaaS SEO agency page (the Growth plan)

Decision (recommended option, applied 2026-11-16 pending Sergio's sign-off): /growth becomes the umbrella page for the Growth (SEO/GEO + CRO) plan and targets "b2b saas seo agency". /webflow-seo-agency and /aeo-agency stay the detailed pages, and a table on /growth routes readers between the three. After the Nov 23 recheck of those two pages, add one up-link from each to /growth.

Data: b2b saas seo agency 1,400/mo (KD 2), saas seo services 900 (KD 3), saas seo agency 3,300 (KD 5) (Ahrefs, US). Search Console, Oct 15 to Nov 11: 70 impressions, all branded. Surfer Content Editor 17047416 ("b2b saas seo agency", keyword-only): legacy page as imported (editor 17047445) SEO 8 / AI Search 37 / total 23; this draft: see the scores table in section 9.

Commit: `content(pages): rebuild growth as the B2B SaaS SEO agency page`. Save the file below as `content-pack/content/growth.md` exactly as written (`draft: true`). It replaces the legacy page at the same URL when Sergio sets `draft: false`. Run `pages:check`. No currency amounts on this page.

### 4.1 Page file: `content-pack/content/growth.md`

````markdown
---
slug: growth
url: /growth
pageType: service
draft: true
blockedBy: []
wave: 3
title: "B2B SaaS SEO Agency: SEO, AEO & CRO | BenorMedia"
description: "B2B SaaS SEO agency for teams that need search to drive pipeline. One monthly plan covers SEO, AEO for AI answers, and CRO, reported in demo requests."
h1: "B2B SaaS SEO agency for teams that need search to drive pipeline"
eyebrow: "Growth: SEO, AEO & CRO"
lang: en-US
author: "BenorMedia team"
publishedAt: 2026-11-23
updatedAt: 2026-11-23
reviewEvery: 90 days
primaryKeyword: "b2b saas seo agency"
secondaryKeywords: ["saas seo agency", "saas seo services", "b2b saas seo", "aeo services"]
service: "Growth (SEO/GEO + CRO)"
breadcrumb:
  - name: "Home"
    path: /
  - name: "Growth: SEO, AEO & CRO"
    path: /growth
schema: ["Service", "FAQPage", "BreadcrumbList"]
testimonial: surfe
closing:
  heading: "Get a Growth plan built around your pipeline."
  text: "Send us your URL and the three competitors you lose deals to, and we'll show you where search and AI answers leave you out. One of our team members will be in touch within 24 hours."
faqHeading: "B2B SaaS SEO agency FAQs."
faq:
  - q: "What does a B2B SaaS SEO agency do?"
    a: "It wins SaaS companies qualified leads from Google and from AI assistants. The work covers technical SEO, content built around buyer questions, link building and digital PR, and reporting tied to pipeline. On top of that we run AEO, to get you named in ChatGPT and Google's AI answers, and CRO, so more of the extra traffic converts."
  - q: "How is SaaS SEO different from SEO for other businesses?"
    a: "Few people search for any one SaaS category, sales cycles run long, and more buyers now ask an AI assistant for a shortlist. That's why your comparison, alternatives, pricing, integration, and security pages matter as much as the blog. We judge the work on demo requests and pipeline."
  - q: "What's the difference between SEO, AEO, and GEO?"
    a: "SEO is about ranking in search engines. AEO (answer engine optimization) and GEO (generative engine optimization) target the answers from ChatGPT, Perplexity, Gemini, Claude, and Google's AI Overviews, where you win by getting mentioned or cited. Most of the work is shared; our [AEO agency](/aeo-agency) page covers what's different."
  - q: "How long does SaaS SEO take to show results?"
    a: "Google's own guidance says an SEO engagement can take four months to a year to show results. Technical fixes and updates to pages that already rank usually move first; new pages and AI mentions take longer. We report every month from the first one, so you can see what's moving and what isn't."
  - q: "How much does a SaaS SEO agency cost?"
    a: "Our Growth plan is billed monthly and you can cancel anytime; the price is on our [pricing page](/pricing). When you compare agencies, compare what's included, because content, links, AI visibility tracking, and CRO are often sold separately."
  - q: "Do you write the content?"
    a: "Yes, content creation is part of the Growth plan. We build each piece from your sales conversations and search data, and your experts review it before it goes live. Nothing is published without the review step we agree on at the start."
  - q: "Do you guarantee rankings or AI mentions?"
    a: "No. Google sets the rankings, and each AI assistant picks its own sources. What we can promise is the work itself, a report every month, and a reason behind each recommendation."
  - q: "Does the Growth plan include CRO?"
    a: "Yes. We run behavior analysis and conversion rate experiments on the pages closest to pipeline, like pricing, demo, and signup. Low traffic? Then we start with an audit, and our guide to [running a CRO audit](/blog/cro-audit) shows what that covers."
  - q: "Do we need a Webflow site to work with you?"
    a: "No. Every Growth engagement includes AI visibility tracking and reporting, whether the site is on Webflow or custom code, and the SEO and CRO work fits any CMS. On Webflow? Our [Webflow SEO agency](/webflow-seo-agency) page lists what we check there."
related:
  - /webflow-seo-agency
  - /aeo-agency
  - /custom-websites-migrations
  - /website-redesign
visuals:
  - type: diagram
    side: right
    after: "How a Growth engagement runs."
    brief: "A monthly loop. Month one: audit and baseline (search data, AI prompt set, analytics). Then each month: ship (pages, technical fixes, outreach, CRO tests), measure (Search Console, prompt tracking, analytics), report (pipeline first). A quarterly review ring sits around the loop."
    alt: "How a BenorMedia Growth engagement runs: a baseline month, then a monthly ship, measure, and report loop with quarterly reviews"
inbound:
  - page: /blog/saas-technical-seo
    anchor: "B2B SaaS SEO agency"
    sentence: "For SEO, AEO, and CRO run as one monthly program, see our B2B SaaS SEO agency page."
editorNotes:
  - "Data (Ahrefs US, 2026-11-16): b2b saas seo agency 1,400/mo (KD 2), saas seo services 900 (KD 3), saas seo agency 3,300 (KD 5). Search Console Oct 15 to Nov 11: 70 impressions, all branded."
  - "Role of the page: umbrella for the Growth plan. /webflow-seo-agency (Webflow SEO) and /aeo-agency (AI answers) keep the detail; the routing table sends readers there. Add up-links from both after their Nov 23 recheck."
  - "SERP read: ranking pages for 'saas seo agency' are agency service pages and 'best SaaS SEO agencies' lists. They cover technical SEO, content strategy, link building, digital PR, and AI search visibility, and most report in pipeline or revenue terms."
  - "Kept from the legacy page: the Surfe testimonial block. The legacy copy (about 450 words, H1 'Show up where buyers actually look.') is replaced in full."
  - "Facts and sources (checked 2026-11-16): Gartner survey (press release, March 9, 2026); 25 of 40 cited pages (published on /aeo-agency); November 9 AI Mode reading (published on /blog/track-brand-mentions-in-chatgpt); plan contents (/pricing, /webflow-seo-agency, /aeo-agency); quotes (/testimonials); Surfe numbers (/guides/wordpress-to-webflow-migration); four months to a year (Google Search Central, 'Do you need an SEO?'); CRO tools and test threshold, and Sprii and Unit21 doubling their organic traffic on the Growth plan (Sergio, 2026-11-17)."
  - "Surfer Content Editor 17047416: legacy page (editor 17047445) SEO 8 / AI Search 37 / total 23; this draft: see section 9 of the brief."
---

BenorMedia is a B2B SaaS SEO agency that runs search, AI answers, and conversion as one monthly program: the Growth (SEO/GEO + CRO) plan. It's for B2B SaaS companies whose buyers research on Google and in ChatGPT before they talk to sales. We report it in demo requests and pipeline first, rankings second.

## Why SaaS SEO works differently.

B2B software buyers do most of their research alone. In a [Gartner survey](https://www.gartner.com/en/newsroom/press-releases/2026-03-09-gartner-sales-survey-finds-67-percent-of-b2b-buyers-prefer-a-rep-free-experience) of 646 B2B buyers (fielded August and September 2025, published March 9, 2026), 67% said they prefer a rep-free buying experience, and 45% had used AI during a recent purchase. That changes what a SaaS SEO strategy has to cover.

- **Few searches, high value.** A query with 50 searches a month can be worth more than a 5,000-search informational term when the people typing it already have a shortlist.
- **Long sales cycles, many readers.** A buying group reads your pricing, security, integration, and comparison pages over several weeks of the buyer journey, so those pages need to rank and answer, alongside the blog.
- **AI answers lean on third-party pages.** In our own tracking for the web agency category, roundups were 25 of the 40 pages AI assistants cited most. On November 9, 2026, we ran 10 buyer prompts in Google AI Mode: BenorMedia was named in 1 of the 10 answers, the branded question, and the other nine leaned on "best agencies" roundups and Reddit threads.

A search plan that skips those third-party pages leaves the shortlist to whoever is already on them.

## The pages a SaaS SEO strategy works on first.

Blog posts bring readers. These pages bring buyers who are already comparing vendors, so most Growth plans start here.

Table: Page types a B2B SaaS SEO plan usually starts with

| Page | The buyer's question | What it needs to rank and get cited |
| --- | --- | --- |
| Comparison (you vs. a named competitor) | How are you different from the tool we use now? | A fair feature table, the pricing model, and a migration path, updated whenever either product changes |
| Alternatives | What else should we look at? | An honest list that includes you, with who each option suits |
| Pricing | What will this cost at our size? | Plan limits written as text, and answers to the questions procurement asks; see [what a SaaS pricing page needs](/blog/saas-pricing-page) |
| Integrations | Does it work with our stack? | One page per major integration, with setup steps and limits |
| Security and trust | Will this pass our security review? | Certifications, data handling, and a trust center; see [what goes in a SaaS trust center](/blog/trust-center) |
| Use case or industry | Is this built for teams like ours? | Specific workflows and a customer from that industry |

## What our SaaS SEO services cover.

The Growth plan covers work that often sits with three vendors: an SEO agency, an AEO or GEO specialist, and a CRO consultant.

- **Technical SEO and AEO.** Technical SEO audits of crawl, indexing, site architecture, and Core Web Vitals, schema markup, and robots.txt rules for AI search crawlers such as OAI-SearchBot, PerplexityBot, and Claude-SearchBot.
- **Content strategy and content creation.** Built from keyword research, your sales conversations, and search data. Updating pages that already rank often beats publishing something new, and your experts review each piece before it goes live.
- **AI search analytics and visibility reporting.** A fixed set of 30 to 50 buyer prompts tracked in ChatGPT, Perplexity, Gemini, Claude, and Google's AI answers, with mention rate, citations, and AI-referred pipeline reported every month.
- **Link building and digital PR.** Getting your company in front of the editors of the comparison pages AI assistants already cite in your category, plus partner directories, marketplaces, review profiles, and short studies built from your product data.
- **Competitive intelligence.** Which competitors each AI platform names instead of you, and which pages it cites as sources.
- **Conversion rate optimization.** Behavior analysis on your key pages, and conversion rate experiments on the ones that carry pipeline, such as pricing, demo, and signup. We use PostHog and Microsoft Clarity for this, and we start A/B tests only once a site has roughly 8,000 to 10,000 sessions a month, on pages that get enough of that traffic to reach a result.

## How a Growth engagement runs.

The first month sets the baseline every later report is measured against.

- **Month one: audit and baseline.** Index and crawl checks, a CMS architecture review, page speed from real-user data, twelve months of Search Console and analytics data by page and query, and how often each AI platform names you for your prompt set.
- **Every month: ship, measure, report.** New and rewritten pages for the queries and prompts you lose, technical fixes, outreach, and CRO tests. Nothing is published without the review step we agree on at the start.
- **Every quarter: decide what's next.** We review what ships next and why with you, so every recommendation comes with its reason.

Monthly reports lead with pipeline: demo requests and sign-ups from organic search and AI referrals. Below that sits the SEO performance behind it: organic traffic, keyword rankings, clicks, impressions, and positions for the pages in the plan, then mention rate by platform and the citations Bing Webmaster Tools reports.

## SEO, AEO, and CRO: where each one is explained.

The Growth plan is one engagement, and each part has its own page with the detail.

Table: Where to read about each part of the Growth plan

| If your question is | Read | What you'll find |
| --- | --- | --- |
| How do we grow organic search on a Webflow site? | [Webflow SEO agency](/webflow-seo-agency) | Webflow audits, CMS architecture, content, and reporting |
| How do we get named in ChatGPT, Perplexity, and Google AI Overviews? | [AEO agency services](/aeo-agency) | Prompt tracking, citations, and digital PR |
| Why do visitors leave our pricing or demo page? | [How a CRO audit works](/blog/cro-audit) | What an audit checks, and the data behind it |
| What does a SaaS site need technically? | [Technical SEO for SaaS](/blog/saas-technical-seo) | Crawl, indexing, canonicals, speed, and schema checks |

## Proof you can check from SaaS teams we've worked with.

Some of these results come from the Growth plan and some from rebuilds, so we say which is which.

- **Sprii and Unit21 (Growth plan).** Both doubled their organic traffic on the Growth plan.
- **Surfe.** After the redesign and move from WordPress, Surfe saw 50% more traffic and a 3x faster go-to-market compared with the month before launch. Demo bookings "more than doubled" within two months, says Thibaut Davoult, Head of Growth.
- **Bambi Health.** After the rebuild: "Mobile form completion went from 68% to 83%, and our contact page now converts nearly a third of its visitors into leads," says N.O., Chief Marketing Officer.
- **Releventful.** "We've seen huge gains in organic search since launch," says founder Daniel Wright, after the second redesign and rebuild in four years.
- **DarwinCX.** "The site went from an afterthought to one of our best sources of demo requests," says Erin Christopher, SVP of Marketing.


All four quotes are on our [testimonials page](/testimonials), and the Surfe figures are in our [WordPress to Webflow migration guide](/guides/wordpress-to-webflow-migration).

## When you don't need a Growth plan.

Search compounds slowly, and for some teams the budget works harder somewhere else first.

- **Pipeline is due this quarter.** Paid search and outbound demand generation reach buyers this month. [Google's own guidance](https://developers.google.com/search/docs/fundamentals/do-i-need-seo) says SEO can take four months to a year to show results.
- **Not enough traffic to test?** Experiments need enough visits to reach a verdict. Until then, a one-time CRO audit finds the obvious leaks.
- **The site itself is the bottleneck.** If templates, speed, or the CMS hold you back, fix the foundation with our [Webflow development agency](/custom-websites-migrations) team before paying for content.
- **You're shopping for guaranteed rankings.** Nobody controls Google's or ChatGPT's answers, and we don't sell shortcuts.
- **Your ideal customer is still a moving target.** Content written before the ideal customer is clear usually gets rewritten.
````

### 4.2 Inbound links

- /blog/saas-technical-seo: add the `inbound` sentence (anchor "B2B SaaS SEO agency") directly after the sentence "For how an audit fits into our SEO work, see our Webflow SEO agency page." in the same paragraph. Links-only change: don't change `updatedAt`.
- /blog/cro-audit: the link to /growth is part of block 6.
- /webflow-seo-agency and /aeo-agency: no change now (both under recheck until Nov 23).

### Markers

- None open. #GRW-1, #GRW-2, and #GRW-3 were answered by Sergio on 2026-11-17 and are now in the copy (PostHog and Microsoft Clarity, tests above roughly 8,000 to 10,000 sessions a month; Sprii and Unit21 doubled their traffic; the doubling is organic traffic).

### Checks

- Title 48 characters; meta description 150 characters (counted with a script).
- Rule check done: statement H2s with final periods, no prices, no research-tool or agency names, no ranking promises, client results framed as rebuild results where they are.
- AI detector (Surfer's free detector, run November 17, 2026; pass is under 20%): 2% on chunk 6. Chunks 7 and 8 first scored 29% and 51%; with Sergio's approved rewrites, now in this file (the five lead-ins under "When you don't need a Growth plan." and six FAQ answers), they score 2% and 1%.

## 4B. /pricing: plan FAQs and FAQPage schema

Decision (Sergio, 2026-11-17): the unlimited-requests and Growth-plan FAQs from the legacy /custom-websites-migrations page don't move over as they are. They come back as new FAQs written for search and AI answers, with FAQPage schema, on /pricing, which has no FAQ today.

Data: seo retainer 900/mo (KD 1), unlimited web design 700 (KD 4), design subscription 150 (KD 34), web development retainer 150, webflow agency pricing 80 (KD 12), webflow retainer 80, web design subscription 80 (KD 33), website retainer 70 (KD 1) (Ahrefs, US, 2026-11-17). One of the ten AI questions we track asks "How much does a Webflow agency retainer cost per month?" Every fact below comes from the plan cards on /pricing or the legacy FAQ answers on /custom-websites-migrations (both read on 2026-11-16 and 2026-11-17). The answers carry no prices: the plan cards above them do.

Commit: `content(pages): add plan FAQs and FAQPage schema to pricing`. Change nothing else on /pricing. Set `updatedAt` and `dateModified` if the page has them.

### 4B.1 Placement

Add a FAQ section after the plan cards and before the closing call to action, using the same FAQ accordion component as the service pages. Section heading: `Pricing and plan FAQs.` If /pricing's content lives in Sanity rather than the repo, STOP (rule 2).

### 4B.2 FAQ items, in this order

1. Q `How does BenorMedia's unlimited web design and development plan work?`
   A `The Design + Development plan is a monthly subscription for unlimited web design, marketing design, and web development requests. You add requests, set the order, and we work through them with unlimited revisions. It's billed monthly, you can cancel anytime, and a dedicated client manager is your main contact.`

2. Q `Are design and development requests really unlimited?`
   A `Yes. You can submit as many development, web design, marketing design, and technical SEO requests as you need, and revisions are unlimited too. We work through them in the order you prioritize, and you can change that order whenever your plans change.`

3. Q `How fast is the turnaround on requests?`
   A `We work on your requests in the order you set and keep turnaround fast. You can follow the status of every request in our dashboard, in Slack, or by email, and your dedicated client manager makes sure your feedback is clear and acted on.`

4. Q `Is there a minimum contract, and can we cancel anytime?`
   A `There's no long contract. The Design + Development and Growth plans are billed monthly and you can cancel anytime. One Off projects work differently: they have a fixed scope agreed before work starts, so they suit a single build with a clear end date.`

5. Q `How many months will we need?`
   A `It depends on your goals and your backlog. You can stay for a single project, such as a redesign, or keep us on as an ongoing extension of your team. Because the plans are billed monthly, you can stop when the work is done.`

6. Q `What if we're not happy with the work?`
   A `Revisions are unlimited, so we keep iterating until the work is right. Your dedicated client manager makes sure your feedback is clear and acted on, and because the plans are billed monthly with no long contract, you're never locked in.`

7. Q `How do we send requests and talk to your team?`
   A `Whichever way suits your team: our dashboard, Slack, or email. You also get a dedicated client manager as your main point of contact. We're based in Barcelona, and our hours cover the European working day and overlap with every US time zone.`

8. Q `Is a monthly plan or a one-off project better for a new website?`
   A `A One Off project suits a new site or a redesign with a fixed scope: Webflow development, conversion-focused design, design and development systems, technical SEO, and training, with several review rounds. The monthly Design + Development plan suits teams with a steady flow of pages, campaigns, and updates. Our [Webflow development agency](/custom-websites-migrations) page shows how a build runs.`

9. Q `Is the Growth plan an SEO retainer?`
   A `Yes: a monthly retainer for SEO, AEO, and CRO. It includes content creation, AI search analytics, AI visibility reporting, competitive intelligence, technical optimization, conversion rate experiments, content opportunity analysis, and behavior analysis, billed monthly and cancellable anytime. Our [B2B SaaS SEO agency](/growth) page shows how it runs.`

10. Q `How does Webflow agency pricing work at BenorMedia?`
    A `Two ways: a monthly plan (Design + Development or Growth), cancellable anytime, or a One Off project with a fixed scope. The prices are in the plan cards above. Webflow bills its own site plan, which covers hosting, separately; our [Webflow pricing breakdown](/blog/webflow-price-increase) lists every Webflow plan.`

### 4B.3 FAQPage schema

Generate the FAQPage JSON-LD from the same list with the helper the service pages use. If /pricing can't use that helper, add this block to the page head as written:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "How does BenorMedia's unlimited web design and development plan work?", "acceptedAnswer": {"@type": "Answer", "text": "The Design + Development plan is a monthly subscription for unlimited web design, marketing design, and web development requests. You add requests, set the order, and we work through them with unlimited revisions. It's billed monthly, you can cancel anytime, and a dedicated client manager is your main contact."}},
    {"@type": "Question", "name": "Are design and development requests really unlimited?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. You can submit as many development, web design, marketing design, and technical SEO requests as you need, and revisions are unlimited too. We work through them in the order you prioritize, and you can change that order whenever your plans change."}},
    {"@type": "Question", "name": "How fast is the turnaround on requests?", "acceptedAnswer": {"@type": "Answer", "text": "We work on your requests in the order you set and keep turnaround fast. You can follow the status of every request in our dashboard, in Slack, or by email, and your dedicated client manager makes sure your feedback is clear and acted on."}},
    {"@type": "Question", "name": "Is there a minimum contract, and can we cancel anytime?", "acceptedAnswer": {"@type": "Answer", "text": "There's no long contract. The Design + Development and Growth plans are billed monthly and you can cancel anytime. One Off projects work differently: they have a fixed scope agreed before work starts, so they suit a single build with a clear end date."}},
    {"@type": "Question", "name": "How many months will we need?", "acceptedAnswer": {"@type": "Answer", "text": "It depends on your goals and your backlog. You can stay for a single project, such as a redesign, or keep us on as an ongoing extension of your team. Because the plans are billed monthly, you can stop when the work is done."}},
    {"@type": "Question", "name": "What if we're not happy with the work?", "acceptedAnswer": {"@type": "Answer", "text": "Revisions are unlimited, so we keep iterating until the work is right. Your dedicated client manager makes sure your feedback is clear and acted on, and because the plans are billed monthly with no long contract, you're never locked in."}},
    {"@type": "Question", "name": "How do we send requests and talk to your team?", "acceptedAnswer": {"@type": "Answer", "text": "Whichever way suits your team: our dashboard, Slack, or email. You also get a dedicated client manager as your main point of contact. We're based in Barcelona, and our hours cover the European working day and overlap with every US time zone."}},
    {"@type": "Question", "name": "Is a monthly plan or a one-off project better for a new website?", "acceptedAnswer": {"@type": "Answer", "text": "A One Off project suits a new site or a redesign with a fixed scope: Webflow development, conversion-focused design, design and development systems, technical SEO, and training, with several review rounds. The monthly Design + Development plan suits teams with a steady flow of pages, campaigns, and updates. Our Webflow development agency page shows how a build runs."}},
    {"@type": "Question", "name": "Is the Growth plan an SEO retainer?", "acceptedAnswer": {"@type": "Answer", "text": "Yes: a monthly retainer for SEO, AEO, and CRO. It includes content creation, AI search analytics, AI visibility reporting, competitive intelligence, technical optimization, conversion rate experiments, content opportunity analysis, and behavior analysis, billed monthly and cancellable anytime. Our B2B SaaS SEO agency page shows how it runs."}},
    {"@type": "Question", "name": "How does Webflow agency pricing work at BenorMedia?", "acceptedAnswer": {"@type": "Answer", "text": "Two ways: a monthly plan (Design + Development or Growth), cancellable anytime, or a One Off project with a fixed scope. The prices are in the plan cards above. Webflow bills its own site plan, which covers hosting, separately; our Webflow pricing breakdown lists every Webflow plan."}}
  ]
}
```

### Checks

- Every answer is 40 to 60 words and stands on its own, so search and AI answers can quote it; questions use the phrasing people search for (unlimited web design, SEO retainer, Webflow agency pricing).
- No prices in the answers; facts only from /pricing and the legacy FAQ answers; no em dashes.
- AI detector (Surfer's free detector, run November 17, 2026; pass is under 20%): 0% on the ten answers (chunk 9).

## 5A. /blog/how-to-rank-in-chatgpt: date the evidence, current crawler facts, our own AI Mode reading

Data: how to rank in chatgpt 900/mo (KD 6), chatgpt seo 1,000, seo for chatgpt 600, chatgpt search optimization 350 (Ahrefs, US, 2026-11-16). Search Console: 78 impressions in its launch week (week of Oct 26) at positions 73 to 78, about 0 since Nov 2. Like track-brand-mentions-in-chatgpt and astro-cms before their Nov 9 refresh, it went quiet after launch week, so this block updates the facts that aged and adds dated first-hand evidence; then Sergio requests indexing. Surfer Content Editor 17047395 ("how to rank in chatgpt", imported from the live page): before SEO 69 / AI Search 76 / total 73; after: see the scores table in section 9.

Commit: `content(blog): refresh how-to-rank-in-chatgpt`. Change only what this block lists; everything else stays word for word. Set `updatedAt` and `dateModified` to the ship date.

### 5A.1 Head

- Title, meta description, and H1: unchanged.

### 5A.2 Lead

Where: the first paragraph, which ends `This guide is for B2B SaaS marketing leads, as of October 2026.` Replace that last sentence with:

```markdown
This guide is for B2B SaaS marketing leads, as of November 2026.
```

### 5A.3 "How do you make sure ChatGPT can crawl your site?": crawler table

Where: the table under this H2 (columns "Crawler", "What OpenAI says it does", "If you block it"). Add this row after the `ChatGPT-User` row:

```markdown
| OAI-AdsBot | Visits only pages submitted as ads in ChatGPT, to check them; OpenAI says its data isn't used to train foundation models | Only matters if you advertise in ChatGPT |
```

### 5A.4 Same section: list item 4

Where: the numbered list under "A technical SEO check for ChatGPT access:". Replace the item that begins `Serve important content as HTML. In Vercel's December 2024 analysis of crawler traffic,` (the whole item) with:

```markdown
4. Serve important content as HTML. OpenAI's crawler documentation says nothing about JavaScript rendering (checked November 16, 2026). The largest public test, Vercel and MERJ's December 2024 analysis of AI crawler traffic, found that ChatGPT's crawlers fetched JavaScript files but didn't run them. In late September 2026, [one developer's server logs](https://dev.to/hisashispace/traffic-from-chatgpt-jumped-is-it-because-its-crawlers-now-run-javascript-5961) suggested GPTBot and OAI-SearchBot had started rendering some Next.js pages. OpenAI hasn't confirmed it, and the developer thinks it's switched on for only some sites. Until OpenAI says more, put every answer you want quoted in the HTML your server sends. On a Webflow site, text from the Designer and CMS fields ships in the page HTML. Check anything a script adds after load, such as review widgets, pricing calculators, or "load more" lists. To test, open the page source and search for a sentence from your key answer.
```

### 5A.5 Same section: list item 5

Replace the item that begins `Fix 404 errors and redirect chains. The same analysis found ChatGPT spent 34.82%` (the whole item) with:

```markdown
5. Fix 404 errors and redirect chains. In Vercel's December 2024 analysis, ChatGPT spent 34.82% of its fetches on 404 pages, so keep your XML sitemap current and redirect retired URLs.
```

### 5A.6 "How do brand mentions shape your brand's visibility in ChatGPT?"

Replace the paragraph that begins `In our own tracking for the web agency category, roundups were 25 of the 40` (the whole paragraph, which ends `the company writing it ranked itself first.`) with:

```markdown
Google's AI Mode shows the same pull in our own category. On November 9, 2026, we ran 10 buyer prompts in Google AI Mode (US, English, logged out). BenorMedia was named in 1 of the 10 answers, the branded question; the other nine leaned on "best agencies" roundups and Reddit threads. In our own tracking for the web agency category, roundups were 25 of the 40 pages AI assistants cited most. The Ahrefs study found the pattern in software prompts too, along with a warning sign. In 169 of the 250 "best X software" searches it checked in Google (67.6%), the results included a list in which the company writing it ranked itself first.
```

(The last two sentences are the current copy, unchanged.)

### 5A.7 Sources

- Item 1, `OpenAI: Overview of OpenAI crawlers`: change `Accessed October 26, 2026` to `Accessed November 16, 2026`.
- Add as item 10:

```markdown
10. [Hisashi Space, DEV Community: Traffic from ChatGPT jumped! Is it because its crawlers now run JavaScript?](https://dev.to/hisashispace/traffic-from-chatgpt-jumped-is-it-because-its-crawlers-now-run-javascript-5961) Accessed November 16, 2026
```

### Links

- New outbound link: the developer's log write-up (5A.4). No internal link changes; no inbound changes.

### Sources and dates

- Re-opened 2026-11-16: OpenAI's crawler overview (still no statement on JavaScript rendering; lists OAI-AdsBot; robots.txt changes take about 24 hours; IP ranges published as JSON files).
- New: the developer's write-up (DEV Community, September 30, 2026; changes first seen September 25, 2026; OpenAI hadn't confirmed anything). Cross-checked against Digital Drift's summary (October 1, 2026) and an October 28, 2026 audit of 342 sites that still cites the Vercel and MERJ figures.
- Vercel and MERJ figures (JavaScript fetched but not run, 34.82% of ChatGPT fetches on 404s) are as published in December 2024; that source's access date stays October 26, 2026.

### Markers

- None open. #RNK-1: Sergio chose on 2026-11-17 to keep the "25 of the 40" sentence undated, as it reads today.

### Checks

- Rule check done: no em dashes, dated claims with named sources, first-hand facts only from the allowed list.
- AI detector (Surfer's free detector, run November 17, 2026; pass is under 20%): 0% (chunk 10).
- After deploy, Sergio: Search Console URL Inspection, Request indexing.

## 5B. /blog/optimize-for-ai-overviews: Google's November changes, one name for the control, our own readings

Data: optimize for ai overviews 600/mo (KD 6), how to rank in ai mode 350, ai overviews seo 300, ai mode seo 250 (Ahrefs, US, 2026-11-16). Search Console: 93 impressions in its launch week (week of Oct 26) at positions 73 to 78, about 0 since Nov 2. The post was current on Oct 26; since then Google upgraded the model behind Search (Nov 12), started a core update (Nov 10), and logged a Generative AI report anomaly (Nov 9 to 11). The post also had no first-hand data. Surfer Content Editor 17047410 ("optimize for ai overviews", imported from the live page): before SEO 65 / AI Search 74 / total 70; after: see the scores table in section 9.

Commit: `content(blog): refresh optimize-for-ai-overviews`. Change only what this block lists; everything else stays word for word. Set `updatedAt` and `dateModified` to the ship date. Front matter: `volatileChecked: 2026-11-17`.

### 5B.1 Head

- Title, meta description, and H1: unchanged.

### 5B.2 Lead

Where: the first paragraph, which ends `This guide is for B2B SaaS marketing teams, as of October 2026.` Replace that last sentence with:

```markdown
This guide is for B2B SaaS marketing teams, as of November 2026.
```

### 5B.3 "How do Google's AI Overviews and AI Mode choose which pages to show?"

Insert after the paragraph that begins `The audience is large. In its July 22, 2026 earnings remarks,` and before the comparison table:

```markdown
Two changes since then point the same way. On November 12, 2026, Google said its Gemini 4 Hydrogen model "is now available globally in Google Search for all users," called it "the biggest model upgrade to Search yet," and said it "supercharges our query fan-out technique," connecting people "to a broader range of helpful links than before." On its October 28, 2026 earnings call, Google added that queries in AI Mode are on average three times longer than traditional searches, and one in five AI Mode searches globally use voice, images, or documents. More fan-out and longer questions both reward pages that answer the sub-questions around a query.
```

### 5B.4 "How do you measure AI Overviews and AI Mode in Search Console?"

a) Where: the paragraph that begins `How Google counts it:`. After its last sentence (ending `that's what [AI Mode tracking](https://www.benormedia.com/blog/ai-mode-tracking) is for.`), add in the same paragraph:

```markdown
When we ran 10 buyer prompts in Google AI Mode on November 9, 2026 (US, English, logged out), BenorMedia was named in 1 of the 10 answers, the branded question; the other nine leaned on "best agencies" roundups and Reddit threads. None of those mentions appears in Search Console.
```

b) Insert two new paragraphs right after that paragraph, before the table:

```markdown
Longer questions also change your query data. Because AI Mode queries run about three times longer than classic searches, expect more question-style and long-tail queries in the Performance report, and check what they are before you plan content around them.

Our own site shows why. In the 28 days to November 9, 2026, queries phrased as questions or seven or more words long drew about 1,380 impressions and 1 click on benormedia.com, at an average position of 21.9. Many read like prompts typed into AI Mode, and some come from prompt-tracking tools, so we read them as visibility rather than buyer demand.
```

c) Insert after the paragraph that begins `The report's help page describes impressions only.` (the last paragraph of the section):

```markdown
Two November 2026 events affect any before-and-after comparison. Google began rolling out its November 2026 core update on November 10 (it said the rollout may take up to two weeks), and a logging error lowered impressions in the Generative AI performance report for November 9 to 11, 2026; Google's data anomalies page says it "affects data logging only." Mark both on your baseline before you compare periods.
```

### 5B.5 "What is a 30-day plan to optimize for AI Overviews?"

Replace list item 1, `Day 1: confirm the Search generative AI setting, and export a baseline from the Generative AI performance report and the Performance report.`, with:

```markdown
1. Day 1: confirm the Search generative AI control is set to include, and export a baseline from the Generative AI performance report and the Performance report. Note any core update or data anomaly dates inside the baseline period.
```

(This also makes the control's name consistent: everywhere else the post says "Search generative AI control" and "Generative AI performance report", which match Google's Search Console Help titles.)

### 5B.6 Sources

Add as items 9 to 12:

```markdown
9. [Google: Q3 2026 earnings call: Remarks from our CEO](https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q3-2026/) Accessed November 17, 2026

10. [Google: Gemini 4 Hydrogen in Search (Robby Stein, November 12, 2026)](https://blog.google/products-and-platforms/products/search/gemini-4-hydrogen-search-upgrade/) Accessed November 17, 2026

11. [Google Search Status Dashboard: November 2026 core update](https://status.search.google.com/incidents/WLxcJyC6jMWMfryxsKMc) Accessed November 17, 2026

12. [Search Console Help: Data anomalies in Search Console](https://support.google.com/webmasters/answer/6211453?hl=en) Accessed November 17, 2026
```

### Links

- No internal link changes. New outbound links are the four sources above (in the Sources list only).

### Sources and dates

- All four new sources were opened on 2026-11-17. The core update had no completion notice that day; the anomaly entry had no restore note. Both sentences are written to stay true after either changes.
- `volatileChecked: 2026-11-17`. Recheck the anomaly entry at the next refresh; if Google restores the data, add "Google has since restored the missing data." to 5B.4 c.

### Markers

- None open. #AIO-1: Sergio approved publishing benormedia.com's own Search Console figures on 2026-11-17.

### Checks

- Rule check done: no em dashes, quotes copied from Google's pages (each under 125 characters, checked on 2026-11-17), first-hand AI Mode reading from the allowed list.
- AI detector (Surfer's free detector, run November 17, 2026; pass is under 20%): 0% (chunk 11).
- After deploy, Sergio: Search Console URL Inspection, Request indexing.

## 6. /blog/cro-audit: retarget to "CRO audit", real tools, a real example, internal links

Data: cro audit 900/mo (KD 2) (Ahrefs, US, 2026-11-16). Search Console: 87 impressions in its launch week at position 51, then 1 to 2 a week. The head targeted low-traffic sites only, the post named no heatmap, recording, or survey tool, its examples were illustrative, and it had one internal link (/growth). The low-traffic angle stays as the sections it already has ("How much traffic does A/B testing need at your conversion rate?" and "How do you prioritize fixes when A/B testing isn't an option?"). The rebuilt /growth page (section 4) links here with the anchors "How a CRO audit works" and "running a CRO audit". Surfer Content Editor 17047403 ("cro audit", imported from the live page): before SEO 84 / AI Search 86 / total 85; after: see the scores table in section 9.

Commit: `content(blog): retarget cro-audit to "CRO audit"`. Change only what this block lists; everything else stays word for word. Set `updatedAt` and `dateModified` to the ship date. Front matter: `volatileChecked: 2026-11-17` (vendor free plans). Add the new FAQ item to the FAQPage schema.

### 6.1 Head

- Title: `CRO Audit: Checklist, Tools, and Steps for B2B SaaS` (51 characters; no " | BenorMedia" suffix, which would pass 60)
- Meta description: `A CRO audit finds where B2B SaaS visitors drop out and why. The checks, tools, and funnel steps to run one, and how to rank fixes without A/B tests.` (148 characters)
- H1: `CRO audit: how to find what stops B2B SaaS visitors from converting, with or without A/B tests.`

### 6.2 Lead

Replace the first paragraph (begins `A CRO audit finds where visitors drop out of your conversion funnel and why`) with:

```markdown
A CRO audit finds where visitors drop out of your conversion funnel and why, then ranks the fixes. On a B2B SaaS site it covers tracking, the funnel from landing page to booked demo, the reasons behind each drop, and a checklist for every key page. Most of these sites don't have the traffic to A/B test small changes, so this guide, for marketing leads and founders, also shows the traffic math and how to decide what to change without a test.
```

### 6.3 "What is a CRO audit, and how is it different from SEO?"

At the end of the paragraph that begins `On a B2B SaaS site, the audit usually covers a short list of page types:`, add:

```markdown
Our guides to [SaaS homepage design](/blog/saas-homepage-design) and [SaaS pricing pages](/blog/saas-pricing-page) cover what those two pages need.
```

### 6.4 "How do you conduct a CRO audit, starting with your analytics data?"

In list item 3 (begins `**Traffic is segmented by source.**`), add at the end of the item:

```markdown
To separate assistant referrals, see [how to track AI traffic in GA4](/blog/ai-traffic-in-ga4).
```

### 6.5 "How do you run a conversion funnel analysis on a B2B SaaS site?"

Insert after the paragraph that begins `A large exit rate between the landing page and pricing may be normal` and before the paragraph that begins `Break each step down by device and traffic source.`:

```markdown
One real example of what can change at that step: after we rebuilt Bambi Health's site, its Chief Marketing Officer said, "Mobile form completion went from 68% to 83%, and our contact page now converts nearly a third of its visitors into leads." On the forms, the rebuild cut fields, fixed mobile issues, and gave them a clearer design. It changed the rest of the site too, so treat the numbers as one site's result, not a benchmark.
```

### 6.6 "How do you find out why users drop off when you can't run tests?"

In the bullet that begins `**Sales and support notes.**`, add at the end of the bullet:

```markdown
For buyer research on what a site should answer, see [what B2B buyers need from your website](/blog/what-b2b-buyers-need-from-your-website).
```

### 6.7 New H2 after "How do you find out why users drop off when you can't run tests?"

Insert after that section (it ends `and 40 or more for narrow confidence intervals.`) and before H2 `What does a CRO audit checklist cover at each conversion point?`:

```markdown
## Which tools do you need for a CRO audit?

Three kinds: an analytics tool that shows where users drop, such as GA4, Search Console for queries and field speed data, and one behavior tool for heatmaps, session recordings, and on-page surveys. Microsoft Clarity, Contentsquare (which now includes Hotjar), and PostHog all have free plans that cover a low-traffic B2B site.

Table: Tools for a CRO audit and what their free plans cover (checked November 17, 2026)

| Tool | What it adds to the audit | Free plan |
| --- | --- | --- |
| Google Analytics 4 | Key events and funnel explorations: where users drop | Free |
| Google Search Console | The queries that bring visitors, and Core Web Vitals field data | Free |
| Microsoft Clarity | Heatmaps, session recordings, and funnels, with a GA4 integration | Free, recording up to 100,000 sessions per project per day |
| Contentsquare (Hotjar's new home) | Heatmaps, recordings, surveys, user interviews, and funnels | Up to 200,000 sessions a month, 100 survey responses, and 5 user interviews; Hotjar no longer accepts new accounts |
| PostHog | Product analytics, session replay, surveys, and A/B experiments in one tool | 1 million events, 5,000 recordings, and 1,500 survey responses a month, with no credit card |

Keep the behavior tools to one or two: each one adds a script to every page, and extra scripts slow the templates you're auditing. If you expect to run experiments once a page has the traffic, a tool that combines recordings and tests saves a second install. On client audits we use PostHog and Microsoft Clarity, and we only start A/B tests once a site has roughly 8,000 to 10,000 sessions a month, on pages that get enough of that traffic to reach a result.
```

### 6.8 "What does a CRO audit checklist cover at each conversion point?"

At the end of the paragraph that begins `This CRO audit checklist covers the usual conversion bottlenecks`, add:

```markdown
For the speed row, see [how to improve Core Web Vitals](/blog/core-web-vitals-optimization).
```

### 6.9 "How do you prioritize fixes when A/B testing isn't an option?": closing paragraph

Replace the paragraph that begins `We offer growth work that includes conversion rate optimization for B2B and SaaS companies` with:

```markdown
We run CRO for B2B and SaaS companies as part of our Growth plan, so we have an interest in this topic. For how it fits with SEO and AEO, see our [B2B SaaS SEO agency](/growth) page.
```

### FAQ ("Questions about CRO audits")

Add after `What is the difference between CRO and SEO?`:

- Q: `Which tools do you need for a CRO audit?`
- A: `An analytics tool with funnel reports, such as GA4, Search Console for queries and field speed data, and one behavior tool for heatmaps, session recordings, and surveys. Microsoft Clarity, Contentsquare (which now includes Hotjar), and PostHog all had free plans when we checked on November 17, 2026.`

### Links

- New internal links (5): /blog/saas-homepage-design, /blog/saas-pricing-page (6.3), /blog/ai-traffic-in-ga4 (6.4), /blog/what-b2b-buyers-need-from-your-website (6.6), /blog/core-web-vitals-optimization (6.8). The /growth link keeps its URL and gets the service anchor "B2B SaaS SEO agency" (6.9).
- Inbound: the rebuilt /growth page (section 4) links here twice.

### Sources and dates

Add to the Sources list:

```markdown
7. [Microsoft Learn: Clarity frequently asked questions](https://learn.microsoft.com/en-us/clarity/faq) Accessed November 17, 2026

8. [Contentsquare: Hotjar is now part of Contentsquare](https://contentsquare.com/hotjar/) Accessed November 17, 2026

9. [PostHog: Pricing](https://posthog.com/pricing) Accessed November 17, 2026

10. [BenorMedia: Testimonials](https://www.benormedia.com/testimonials) Accessed November 16, 2026
```

- Vendor facts checked on 2026-11-17: Clarity is "a free service forever" and records up to 100,000 sessions per project per day, with heatmaps, recordings, funnels, and a GA4 integration; Hotjar's site now redirects to Contentsquare, says new Hotjar accounts can't be created, and lists Contentsquare Free at up to 200,000 sessions a month, 100 survey responses, and 5 user interviews a month; PostHog's free plan covers 1 million analytics events, 5,000 recordings, and 1,500 survey responses a month, "No credit card, not a trial." No currency amounts, so `thirdPartyPrices` isn't needed.

### Markers

- None open. #CRO-1 and #CRO-2 were answered by Sergio on 2026-11-17: we use PostHog and Microsoft Clarity and test only above roughly 8,000 to 10,000 sessions a month; Bambi Health's forms got fewer fields, mobile fixes, and a clearer design.

### Checks

- Title 51 characters; meta description 148 characters (counted with a script).
- Rule check done: question H2 with a standalone answer of about 50 words, quote copied from /testimonials, vendor facts from vendor pages, no em dashes.
- AI detector (Surfer's free detector, run November 17, 2026; pass is under 20%): 1% (chunk 12).
- After deploy, Sergio: Search Console URL Inspection, Request indexing.

## 7. /blog/webflow-mcp: update to MCP v2.1, allow/ask/block up top, remove the duplicate intro

Data: webflow mcp 500/mo (KD 9) (Ahrefs, US, 2026-11-16). Search Console: 20 impressions in 28 days (Oct 15 to Nov 11), 0 since Nov 5. The post describes MCP 2.0 (July 21, 2026) as the current server, but Webflow shipped MCP v2.1 on September 21, 2026 (GSAP interactions, Webflow Cloud, Campaigns, branch actions), and the live page prints its intro twice. Surfer Content Editor 17047415 ("webflow mcp", imported from the live page): before SEO 68 / AI Search 83 / total 76; after: see the scores table in section 9.

Commit: `content(blog): update webflow-mcp to MCP v2.1`. Change only what this block lists; everything else stays word for word. Set `updatedAt` and `dateModified` to the ship date. Front matter: `volatileChecked: 2026-11-17`.

### 7.1 Head

- H1: unchanged. Title and meta description: unchanged, unless either says "MCP 2.0"; if so, change "2.0" to "2.1" (same length).

### 7.2 Lead and a short answer up top

a) In the first paragraph, replace `for B2B SaaS marketing leads, as of October 2026.` with `for B2B SaaS marketing leads, as of November 2026.`

b) Insert a new paragraph right after the first paragraph, before H2 `What is the Webflow MCP server?`:

```markdown
Our short answer: allow reads and draft CMS edits, ask each time before style, interaction, and single-page or item publishes, and block whole-site publishes, deletes, custom code and robots.txt edits, access changes, and Webflow Cloud deploys. Version 2.1 of the server, released September 21, 2026, added tools for GSAP interactions, Webflow Cloud, and Campaigns, so those rows are new in our table below.
```

### 7.3 "What is the Webflow MCP server?"

a) In the bullet that begins `**Cost.**`, replace the sentence `MCP 2.0 launched on July 21, 2026, at no additional cost.` with:

```markdown
MCP 2.0 launched on July 21, 2026, at no additional cost, and version 2.1 followed on September 21, 2026. Its changes are additive, so tool names from version 2.0.1 still work.
```

b) Replace the whole bullet that begins `**Who can connect.**` with:

```markdown
* **Who can connect.** Webflow's Help Center says users with any site role except Reviewer can connect, and that the server respects each user's role permissions. Its developer FAQ says only site owners and admins can authorize the server for a site. Read together, an owner or admin authorizes it once, and teammates then connect within their own role.
```

### 7.4 "What can the Webflow MCP server change on a live site?"

a) In the table, replace the `Webflow Cloud` row with:

```markdown
| Webflow Cloud              | Manage apps and environments, deploy and redeploy, check deployment status, and read build and runtime logs | Webflow says the logs are unsanitized and may contain secrets; environment variable values can't be set through MCP |
```

b) Add these three rows directly after it, before the `Access (Enterprise)` row:

```markdown
| Interactions (GSAP)        | Create, update, remove, and list GSAP interactions, with their triggers and timelines | Classic interactions are invisible to these tools and can't be edited through them |
| Campaigns (Early Access)   | Create a campaign and its landing page from a markdown brief, with up to 30 page variations per call, and read its results | Launching stays in the Campaigns interface; deleting a campaign removes its landing page and assets |
| Branches (Enterprise)      | Update, merge, and publish a page branch, and read merge conflicts | Merging or publishing a branch changes the live page |
```

c) Replace the sentence after the table, `Webflow's developer docs list no action that deletes a page or a whole CMS collection.`, with:

```markdown
Webflow's developer docs list no action that deletes a regular page or a whole CMS collection. Campaigns are the exception: deleting a campaign also removes its landing page and assets.
```

### 7.5 "Which controls does Webflow give you over AI agents?"

At the end of list item 3 (begins `**AI agent instructions.**`), add:

```markdown
Since version 2.1, agents can also draft these instructions themselves (brand guidelines, design system, asset and CMS guidelines); they're saved as drafts for a person to review, and generating them uses Webflow AI credits.
```

### 7.6 "What would we allow, ask about, or block?"

Add these rows to the table, after the `Replace custom code or robots.txt` row and before the `Manage members and access (Enterprise)` row:

```markdown
| Create or update GSAP interactions                     | Ask each time                                  | They change how live pages move and respond |
| Create a campaign and its landing pages (Early Access) | Allow, with review                             | Launching stays a manual step in the Campaigns interface |
| Delete a campaign                                      | Block                                          | It removes the campaign's landing page and assets |
| Merge or publish a page branch (Enterprise)            | Block; a person merges after review            | Branch changes reach the live page |
| Deploy or redeploy a Webflow Cloud app                 | Block; a developer deploys                     | It changes production code |
| Read Webflow Cloud build and runtime logs              | Ask each time                                  | Webflow says the logs are unsanitized and may contain secrets |
```

### 7.7 Duplicate intro

The Surfer import of the live page holds the opening paragraph once, so the repeat comes from rendering, most likely the template printing the post's description or excerpt above a body that starts with the same text. Fix it with quick fix Q3 (section 8), which covers this post and seven others; don't delete the body's first paragraph.

### 7.8 FAQ ("Questions about the Webflow MCP server")

- In the answers, find any wording that presents MCP 2.0 as the current version (for example in `Does the Webflow MCP server cost extra?`). Where it does, add `, and version 2.1 followed on September 21, 2026` after the 2.0 mention. No other FAQ changes.

### 7.9 Sources

- Items 3 (`Webflow Developers: MCP FAQs`) and 8 (`Webflow Help Center: Connect your AI tools to the Webflow MCP server`): change the access date to `Accessed November 17, 2026`.
- Add as item 31:

```markdown
31. [Webflow Developers changelog: MCP v2.1: Interactions with GSAP, Webflow Cloud, and Campaigns](https://developers.webflow.com/home/changelog/2026/9/21) Accessed November 17, 2026
```

### Links

- No internal link changes. New source link: the v2.1 changelog.

### Sources and dates

- Re-opened 2026-11-17: the v2.1 changelog (dated September 21, 2026; its neighbors are Webflow CLI entries from September 17 and 24 with no later MCP release linked), Webflow's developer MCP FAQ ("Only site owners and admins can authorize the MCP server and MCP Bridge App"), and the Help Center connection article ("Users with any site role except Reviewer can connect"; "The MCP server respects each user's existing role permissions").
- Webflow Cloud log and environment-variable cautions, Campaigns limits, and the agent-instructions feature: from the v2.1 changelog as verified on 2026-11-16 (writer kit).

### Markers

- None open. #MCP-1: Sergio confirmed on 2026-11-17 that a Content editor can connect once an owner or admin has authorized the site.

### Checks

- Rule check done: no em dashes, v2.1 facts from Webflow's changelog, table rows kept in the post's three-column format.
- AI detector (Surfer's free detector, run November 17, 2026; pass is under 20%): 0% (chunk 13).
- After deploy, Sergio: Search Console URL Inspection, Request indexing.

## 8. Quick fixes

One commit per fix: `fix(content): <short description>`. Q8 and Q10 are report-only.

### Q1. /blog/ai-seo-myths: meta description count

The meta description says "Seven" AI SEO myths; the post has nine (verified 2026-11-16). In the meta description only, replace `Seven` with `Nine` (or `seven` with `nine`, matching case). Nothing else changes; no date change.

### Q2. "Professional Partner" anywhere on the site

BenorMedia is a Webflow Premium Partner. Replace every `Webflow Professional Partner` with `Webflow Premium Partner`, and every remaining `Professional Partner` that refers to Webflow with `Premium Partner`, in body copy, badge labels, alt text, and components (discovery item 4 lists them). The audit found it on /guides/webflow-vs-custom-code (body and footer badge) and reported it on /b2b-saas-web-design and /guides/b2b-saas-website-pages; a read on November 16 found the body copy on two of those pages already says Premium. If the search finds nothing, report "already fixed" and skip the commit.

### Q3. Opening paragraph printed twice

Verified on /blog/webflow-mcp; reported on /blog/webflow-accessibility-checklist, /blog/webflow-devlink, /blog/webflow-editor, /blog/webflow-price-increase, /blog/webflow-redirects, /blog/webflow-security-php2shell, and /blog/website-rfp-template. Surfer's import of /blog/webflow-mcp holds the paragraph once, so the repeat most likely comes from the template printing the description or excerpt above a body that starts with the same text. Find the cause (discovery item 3) and fix it once, at its source, without rewriting any copy and without deleting a body's first paragraph. If the fix touches the shared blog template, show the diff first (STOP rule 3). Block 2 replaces the lead of /blog/webflow-price-increase, so check that post again after task 2.

### Q4. /guides/webflow-vs-custom-code: two dated sentences

Under H2 "Why are teams moving off Webflow in 2026?":

a) Replace `Sites in Freelancer and Agency Workspaces, and sites on legacy discounts from 2022 or earlier, switch from November 16, 2026.` with:

```markdown
Sites in Freelancer and Agency Workspaces, and sites on legacy discounts from 2022 or earlier, move to the new plans at their first renewal or billable change on or after November 16, 2026.
```

b) Replace the sentence that begins `In Stack Overflow's 2025 survey, 84% of respondents used or planned to use AI tools in development,` (it ends `used them every day.`) with:

```markdown
In Stack Overflow's 2026 Developer Survey, with results published October 6, 2026, 73% of respondents who use AI coding assistants or agents used them daily.
```

Add to the guide's sources: `Stack Overflow: The results of the 2026 Developer Survey are here (October 6, 2026), https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/, accessed November 17, 2026`, in the same format as the existing source entries. Set `updatedAt` and `dateModified`.

### Q5. /blog/programmatic-seo-webflow: "November 16, 2026" phrasing

Find each sentence that says Webflow sites, Workspaces, or plans change "from November 16, 2026". In each, replace only the words `from November 16, 2026` with `at their first renewal or billable change on or after November 16, 2026`. If a sentence doesn't read correctly after that exact replacement, don't edit it: STOP and report the sentence. Also report, without changing them, any rate-limit rows that still name the retired CMS or Business plans (the same check applies to /blog/webflow-cms-api); those need new copy in a later brief.

### Q6. /blog/headless-cms-visual-editor: mislabeled link

The anchor "Sanity's Astro integration" links to /blog/astro-cms. Change only the link target to `https://www.sanity.io/plugins/sanity-astro` (Sanity's page for its official Astro integration, checked November 17, 2026). Keep the anchor text. Links-only change: no date change. The post is climbing, so change nothing else on it.

### Q7. /guides index: meta description

The current meta names 4 of the 6 guides. Replace it with:

`Guides on Webflow and B2B websites: Webflow Enterprise, WordPress migration, Webflow vs WordPress, Webflow vs custom code, redesign cost, and SaaS pages.` (153 characters)

### Q8. /blog/website-architecture-seo: meta length (report only)

The meta description was reported at 164 characters (limit 155). Report the current text and its length from discovery item 5; the replacement goes in the next brief.

### Q9. Sergio's byline title

Sergio chose "Managing Director" (2026-11-17). Wherever his author record or a post byline says "General Manager", change it to "Managing Director", starting with the author record so every post follows. Report the posts affected. No post dates change.

### Q10. Testimonial block rendered twice (report only)

Reported on /, /pricing, and /work (and on the legacy /growth and /custom-websites-migrations, which tasks 3 and 4 replace). Report whether the block really renders twice and why. Don't fix it without sign-off.

### Q11. /website-redesign: migration timelines

Sergio confirmed on 2026-11-17 that the migration guide's ranges are current. On /website-redesign, replace `For reference, a WordPress to Webflow migration typically takes 3 to 4 weeks for about 20 pages and 6 to 8 weeks for a mid-size site with a blog. A large site takes 10 to 14 weeks, and a full redesign adds design time on top.` with:

```markdown
For reference, a WordPress to Webflow migration typically takes 2 to 4 weeks for about 20 pages, and a large site takes 8 to 10 weeks. A full redesign adds design time on top.
```

If the current text isn't found exactly, STOP and report what the page says. Set `updatedAt` and `dateModified`.

## 9. Surfer scores

Content Editors in Surfer workspace 1408080 (United States). Scores are SEO / AI Search / total. "Before" is the live page as imported on November 16, 2026.

| Task | Page | Editor | Before | After |
| --- | --- | --- | --- | --- |
| 1A | /guides/webflow-enterprise | 17047396 | 36 / 77 / 57 | 46 / 82 / 64 |
| 1B | /webflow-enterprise-agency | 17047409 | 42 / 43 / 43 | 42 / 34 / 38, measured on body text without the shared page blocks, so not comparable with the before score |
| 2 | /blog/webflow-price-increase | 17047340 | 66 / 64 / 65 | 80 / 73 / 77 |
| 3 | /custom-websites-migrations | 17047398 (legacy page in 17047427) | 8 / 46 / 27 | 62 / 70 / 66 |
| 4 | /growth | 17047416 (legacy page in 17047445) | 8 / 37 / 23 | 65 / 69 / 67 |
| 5A | /blog/how-to-rank-in-chatgpt | 17047395 | 69 / 76 / 73 | Rescore after deploy |
| 5B | /blog/optimize-for-ai-overviews | 17047410 | 65 / 74 / 70 | Rescore after deploy |
| 6 | /blog/cro-audit | 17047403 | 84 / 86 / 85 | Rescore after deploy |
| 7 | /blog/webflow-mcp | 17047415 | 68 / 83 / 76 | Rescore after deploy |

Tasks 5A to 7 change facts, dates, links, and a few sections on posts that already score 70 to 85, so they weren't rescored before shipping; rescore them from the live URLs once they're deployed. Service-page scores include the H1, body, and FAQ.

## 10. Gap markers for Sergio

Sergio answered these on November 17, 2026, and the answers are already in the copy above:

| ID | Answer |
| --- | --- |
| #ENT-1 | JOOR's rebuild took 10 to 14 weeks (1A.4) |
| #PRC-1 | Not confirmed from an invoice: the old Basic and CMS prices stay, cited to the pricing tracker |
| #CWM-1 | The old plan FAQs become new FAQs with FAQPage schema on /pricing (task 4B) |
| #CWM-2 | A new design and build of 20 to 40 pages takes 6 to 8 weeks; migrations take 2 to 4 weeks (about 20 pages) or 8 to 10 (large site); Q11 aligns /website-redesign |
| #GRW-1, #CRO-1 | We use PostHog and Microsoft Clarity and run A/B tests only above roughly 8,000 to 10,000 sessions a month |
| #GRW-2, #GRW-3 | Sprii and Unit21 doubled their organic traffic on the Growth plan (no period given, so none is stated) |
| #RNK-1 | Keep the "25 of the 40" sentence undated |
| #AIO-1 | Publish our own Search Console figures |
| #CRO-2 | Bambi Health's forms got fewer fields, mobile fixes, and a clearer design |
| #MCP-1 | A Content editor can connect once an owner or admin has authorized the site |
| #Q4 | Resolved by Claude: the 73% figure is quoted from Stack Overflow's own results post |
| Byline | "Managing Director" (Q9) |

Nothing is still open.

Other decisions for Sergio (no copy change in this brief):

- 1B note: the "dedicated pod" and 48-hour/6-hour SLA wording on /webflow-enterprise-agency conflicts with /ongoing-website-support (#OWS-3 from the November 10 brief).
- After November 23, add one up-link to /growth from /webflow-seo-agency and /aeo-agency, and after December 9 one link from /webflow-migration to /custom-websites-migrations.

## 11. Report and release

Claude Code's report, at the end:

1. Discovery findings (section 0.3).
2. For each task and quick fix: the commit hash, files changed, and any STOP with the exact text that didn't match.
3. `pages:check` output for the two content-pack pages.
4. The open gap markers by page.

Release (Sergio): the markers are answered and the AI detector has passed (November 17), so sign off page by page. After deploy:

- Search Console URL Inspection, Request indexing for: /guides/webflow-enterprise, /webflow-enterprise-agency, /blog/webflow-price-increase, /custom-websites-migrations, /growth, /blog/how-to-rank-in-chatgpt, /blog/optimize-for-ai-overviews, /blog/cro-audit, /blog/webflow-mcp, /guides/webflow-vs-custom-code, /pricing, /website-redesign.
- Log the ship dates in the SEO playbook: test D (webflow-price-increase) and test C (the four quiet posts in 5A, 5B, 6, and 7 get a substantive refresh plus Request indexing).
- Rescore tasks 5A to 7 in Surfer from the live URLs.
