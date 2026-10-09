# Review sheet: /website-redesign

Draft version: 1 | Preview: (added after push) | Prepared: 2026-10-09 | Content file: docs/website-redesign.md (built as content-pack/content/website-redesign.md)

How to use: go to the rows marked `open`. For each, give the fact, or write "delete". Rows marked `ok` were checked against their source by Claude Code; open the source if one looks wrong to you.

| # | Section | Sentence or figure on the page | Tier | Source, or who confirms | Status |
|---|---|---|---|---|---|
| 1 | Hero | "100+ launches in 6+ years" | A | benormedia.com/ and /custom-websites-migrations ("6+ years of experience and 100+ launches") | ok |
| 2 | Hero | "including 60+ B2B SaaS websites" | A | benormedia.com/b2b-saas-web-design ("60+ B2B SaaS websites in the last 6 years") | ok |
| 3 | 3. Start with what your site wins | "we pull twelve months of Search Console and analytics data and sort every URL into five groups" | C | Sergio | open |
| 4 | 3. Start with what your site wins | "the website strategy plan, the first step of our build process" | A | benormedia.com/custom-websites-migrations (step 01 Website strategy plan) | ok |
| 5 | 3b. Process | "Our redesign process has seven steps" | C | Sergio, facts sheet item 3 | open |
| 6 | 3b. Process | "strategy, design and development stay with one team from the first audit to launch" | C | Sergio, facts sheet item 3 | open |
| 7 | 3b. Process, step 1 | "a review of competitor sites, and a conversation with sales" | C | Sergio, facts sheet item 3 | open |
| 8 | 3b. Process, step 3 | "Wireframes and content." | C | Sergio, facts sheet item 3 | open |
| 9 | 3b. Process, steps 2 and 5 | "Website strategy plan." / "Component library build and website development." | A | benormedia.com/custom-websites-migrations (steps 01, 02, 03) | ok |
| 10 | 3b. Process, step 6 | "Every page moved and checked by hand and every redirect tested." | A | benormedia.com/custom-websites-migrations (step 04 Content migration) | ok |
| 11 | 3b. Process, step 6 | "browsers, speed, accessibility ... get tested before launch" | A | benormedia.com/custom-websites-migrations (step 08 QA & launch) | ok |
| 12 | 3b. Process, step 7 | "We're there for the go-live, then we train your team" | A | benormedia.com/custom-websites-migrations (steps 08 and 09). Training is on the live page; "there for the go-live" was not among the lines checked today, so Sergio confirms it | open |
| 13 | 4. Design for buyers | "94% of buyers had already ranked their preferred vendors by the time they made first contact" | B | 6sense, 2025 Buyer Experience Report (https://6sense.com/science-of-b2b/buyer-experience-report-2025/) and 6sense press release, 12 Nov 2025. Both opened today and both say 94% | ok |
| 14 | 4. Design for buyers | "That contact came about 61% of the way through their purchase." | B | 6sense, 2025 Buyer Experience Report (report page says first contact "shifted from 69% of the journey to 61%"; the press release does not give this figure) | ok |
| 15 | 4. Design for buyers | "agreed with sales before the first wireframe" | C | Sergio | open |
| 16 | 5. Rebuild on a system | "custom code when the site needs logic Webflow doesn't handle well, such as deep product integrations or heavy personalization." [VERIFY] RED-1 | C | Sergio, facts sheet item 1 | open |
| 17 | 5. Rebuild on a system | "Live sessions, video walkthroughs and documentation your marketers will actually open." | A | benormedia.com/custom-websites-migrations (step 09 Training & handoff) | ok |
| 18 | 5. Rebuild on a system | "For JOOR ... we rebuilt 100+ pages in 8+ languages on one design system, and we've kept working with their team for more than three years." | C | Sergio. "100+ pages" and "8+ languages" are not on the live site (/webflow-enterprise-agency says "several languages"; it does say "more than 3 years") | open |
| 19 | 6. Protect your rankings | "Google treats a redesign that changes URLs as a site move" | B | Google, Site moves with URL changes (https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes, updated 2026-08-20) and Google Office Hours May 2023 ("treat it more like a site move") | ok |
| 20 | 6. Protect your rankings | "Every old URL mapped to its new address with a server-side 301, one hop each." | B | Google, Site moves with URL changes (map old URLs to new; server-side 301/308; avoid chained redirects) | ok |
| 21 | 6. Protect your rankings | "Google advises keeping redirects for at least a year." | B | Google, Site moves with URL changes ("generally at least 1 year") | ok |
| 22 | 6. Protect your rankings | "layout and content changes can move rankings even when URLs don't" | B | Search Engine Journal, 30 Sep 2020, John Mueller: "Changing the layout of your pages can affect your search results." | ok |
| 23 | 6. Protect your rankings | "Google suggests not combining a new platform and a new layout in a single release." | B | Google, Site moves with URL changes ("Change only one thing at a time", example names a new CMS and a new layout) | ok |
| 24 | 6. Protect your rankings | "we hold the copy of top-ranking pages steady at launch and change it in a second release" | C | Sergio | open |
| 25 | 6. Protect your rankings | "Search Console coverage, 404s and the Keep pages get checked daily for the first weeks." | C | Sergio | open |
| 26 | 6. Protect your rankings | "Google says to expect some ranking fluctuation during a move" | B | Google, Site moves with URL changes ("Expect temporary fluctuation in site ranking during the move") | ok |
| 27 | 7. Fast, findable, AI search | "Largest Contentful Paint of 2.5 seconds or less, Interaction to Next Paint of 200 milliseconds or less, and Cumulative Layout Shift of 0.1 or less" | B | web.dev, Web Vitals (https://web.dev/articles/vitals) | ok |
| 28 | 7. Fast, findable, AI search | "most AI crawlers don't run JavaScript yet" | B | Webflow blog, Technical AEO for AI discovery (https://webflow.com/blog/technical-aeo-for-ai-discovery). Its wording: "non-Gemini AI crawlers don't yet render Javascript" | ok |
| 29 | 7. Fast, findable, AI search | "search crawlers such as OAI-SearchBot and PerplexityBot" | B | OpenAI crawlers page (https://developers.openai.com/api/docs/bots) and Perplexity crawlers page (https://docs.perplexity.ai/guides/bots); both list these as search crawlers | ok |
| 30 | 8. After launch | "Support continues for 30 days after launch." [VERIFY] RED-2 | C | Sergio, facts sheet item 2 | open |
| 31 | 8. After launch | "Before-and-after report. Search Console, analytics, form and CRM data ... compared with the baseline from the audit." | C | Sergio | open |
| 32 | 8. After launch | "including lead quality" (CRM data in the before-and-after report) | C | Sergio, facts sheet item 3 | open |
| 33 | 8. After launch | "Weekly updates, quarterly CRO audits and technical SEO monitoring, with SLA-backed response times" | A | benormedia.com/ongoing-website-support | ok |
| 34 | 9. Work | "6+ years of experience and 100+ launches speak for themselves." / "View All 100+ Projects" | A | benormedia.com/ and /custom-websites-migrations | ok |
| 35 | FAQ: cost | "a Design + Development plan billed monthly and a One Off plan for fixed-scope projects" | A | benormedia.com/pricing (plans and pricing FAQ "Plans are billed monthly and you can cancel anytime") | ok |
| 36 | FAQ: how long | "3 to 4 weeks for about 20 pages and 6 to 8 weeks for a mid-size site with a blog. A large site takes 10 to 14 weeks" | A | benormedia.com/webflow-migration | ok |
| 37 | FAQ: SEO | "Google says to expect temporary fluctuation during a site move." | B | Google, Site moves with URL changes | ok |
| 38 | FAQ: SEO | "check Search Console daily after the switch" | C | Sergio | open |
| 39 | FAQ: before hiring | "you should hold the domain, the code, the design files and the CMS account" (matches how BenorMedia hands over projects) | C | Sergio, facts sheet item 3 | open |
| 40 | FAQ: Webflow | "we build custom-coded sites when a project needs logic Webflow doesn't handle well" | C | Sergio, facts sheet item 1 (no marker here; same fact as row 16) | open |
| 41 | FAQ: keep publishing | "Your current site stays live while the new one is built and tested on a staging copy." | A | benormedia.com/webflow-migration | ok |
| 42 | FAQ: keep publishing | "We pause content changes for the last few days before launch" | C | Sergio | open |
| 43 | FAQ: our team | "Copy can come from your team or from ours" | C | Sergio | open |
| 44 | FAQ: our team | "if you have an in-house design team or brand guidelines, we build from them" | C | Sergio, facts sheet item 3 | open |
| 45 | FAQ: after launch | "Support continues while traffic settles." | C | Sergio, facts sheet item 2 (no marker here; same fact as row 30) | open |
| 46 | FAQ: after launch | "ongoing website support for weekly updates, CRO audits and technical SEO monitoring" / "we train your team before handoff" | A | benormedia.com/ongoing-website-support and /custom-websites-migrations (step 09) | ok |
| 47 | Closing CTA | "We'll reply with a first view of what to keep, what to change and how long it should take." | C | Sergio | open |

## Sign-off

- Facts confirmed by: ________ on ________
- Final edit done by: ________ on ________
- Approved to publish (yes or no): ________
