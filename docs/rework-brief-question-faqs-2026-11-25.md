# Rework brief: question FAQs and H2s on 10 pages (2026-11-25)

Between September 29 and November 22, 2026, searches phrased as questions brought benormedia.com 11.2K impressions in Search Console. Each question below ranks at positions 1 to 9 but isn't yet a heading or FAQ on the page that ranks for it. This brief makes these changes:

- adds 3 H2 sections
- adds 11 FAQ items
- renames one H2
- adds one sentence to an existing FAQ answer

Titles, meta descriptions, H1s, and URLs don't change. The full analysis is in `claude/gsc-question-queries-2026-11-24.md` (project doc, not in the repo).

| # | Page | Question in Search Console (impressions, position) | Change |
| --- | --- | --- | --- |
| 1 | /guides/webflow-enterprise | is webflow a good fit for enterprise website governance? (241, 3.7); does webflow support enterprise security and permissions? (156, 4.8); multi-site management (31, 6.7) | New H2 + 1 FAQ |
| 2 | /blog/aeo-specialist | 7 variants of "should I hire an AEO agency or do AEO in-house?" (239 total, 1.2 to 7.0) | New H2 |
| 3 | /blog/cybersecurity-content-marketing | which agencies understand how to market to cisos and security buyers? (130, 2.5); website design companies for cybersecurity vendors (33, 3.2) | New H2 |
| 4 | /blog/headless-cms-comparison | best headless cms for seo (85, 4.5 to 6.9); how to choose a headless cms? (61, 6.7) | Renamed H2 + 1 FAQ |
| 5 | /blog/webflow-security-php2shell | does webflow use php (91, 7.2); managed security vs. Cloudflare and self-hosting (52, 1.3 to 4.6) | 2 FAQs |
| 6 | /blog/webflow-editor | can content teams edit pages in webflow easily? (136, 3.7 to 7.7) | 1 FAQ |
| 7 | /blog/astro-cms | best git-based cmss for astro (57, 5.2 to 9.3); astro cmss that support mdx (38, 4.0) | 2 FAQs |
| 8 | /blog/track-brand-mentions-in-chatgpt | tool, sentiment, and "over time" variants (78, 3.7 to 14) | 1 FAQ |
| 9 | /blog/webflow-salesforce-integration | custom salesforce objects and fields (42, 3.4); salesforce enterprise edition (33, 3.9) | 1 FAQ + 1 sentence |
| 10 | /blog/webflow-price-increase | does webflow have public pricing? (51, 5.4) | 1 FAQ |

**Facts.** Checked on November 25, 2026. Most of the new copy restates facts the page already sources. The new sources are Webflow's Shared Libraries docs, Salesforce's lead administrator tips, Zapier's Salesforce help, Keystatic's MDX field docs, and Astro's MDX docs. Each one is added to the page's Sources list below.

**AI detector.** All new copy was run through Surfer's free detector on November 25, 2026, in five chunks:

| Chunk | Copy | Result |
| --- | --- | --- |
| 1 | Section 1 | 0% |
| 2 | Section 2 | 2%, after its first paragraph was rewritten (the first version scored 93%) |
| 3 | Section 3 | 13% |
| 4 | Sections 4 to 6 | 1% |
| 5 | Sections 7 to 10 | 0% |

The one-sentence edit in 9a is too short to test.

**Surfer score.** Not run. Each page gains only 40 to 230 words, and the target questions come straight from Search Console.

## 0. Ground rules

1. **Copy is exact.** Don't reword, shorten, or add to it, including schema text. House style:
   - US English
   - no em dashes
   - serial comma
   - sentence-case headings
2. **Only what's listed changes.** Everything else stays word for word.
3. **One commit per page:** `content(<slug>): add question FAQs from Search Console`.
4. **Dates.** On each changed page, set `updatedAt` and the Article JSON-LD `dateModified` to the ship date. Leave `publishedAt` and any `volatileChecked` alone.
5. **The slug and URL don't change.** No redirects.
6. **FAQs, links, and sources** use each page's existing format.
   - New FAQ items must appear in both the visible FAQ and the FAQPage JSON-LD.
   - Write internal links the way the file already writes them.
   - If a page's FAQ format can't hold a link, keep the text, drop the link, and say so in the report.
   - Add a source only if the same URL isn't already listed.
7. **Apostrophes and quotes.** The brief uses straight apostrophes. If a page's source uses curly ones, match the page.
8. **STOP and ask** if:
   - a page lives in Sanity
   - a quoted "Where" text isn't found exactly once in the place described
   - a change needs copy that isn't here

### 0.1 Discovery (change nothing)

For each of the 10 pages, post:

- the source file
- how FAQ items are stored
- the current FAQ count
- whether every "Where" text below is found exactly once

The current FAQ counts should be:

| Page | Expected FAQ count |
| --- | --- |
| webflow-enterprise | 7 |
| aeo-specialist | 5 |
| cybersecurity-content-marketing | 6 |
| headless-cms-comparison | 6 |
| webflow-security-php2shell | 6 |
| webflow-editor | 5 |
| astro-cms | 5 |
| track-brand-mentions-in-chatgpt | 6 |
| webflow-salesforce-integration | 6 |
| webflow-price-increase | 11 |

Also list every link in the repo that points to the heading id of `How should you run a headless CMS comparison for your team?`.

---

## 1. /guides/webflow-enterprise

**1a. New H2.** Where: directly before the H2 `Is the Webflow Team plan enough, or do you need Enterprise?`, at the end of the section `What does Webflow Enterprise offer?`. Insert:

```markdown
## Is Webflow a good fit for enterprise governance and permissions?

For most marketing sites, yes, as long as the controls your security team asks for are on your plan. A governance review usually wants to know who can change the site, who signs off before a change goes live, and where that history is kept.

On Enterprise, Workspace owners and admins can create up to 20 custom roles, each built on the Reviewer, Content Editor, Marketer, or Designer role, and they can limit an editor to specific secondary locales. Sign-off runs through page branching: a change sits on a branch until an approver accepts it, and permissions decide who can publish to staging and who can publish to production. Since May 2026, Webflow has listed publishing workflows and page branching on the Team plan as well. The Site Activity log keeps a history of changes and publishes that doesn't expire, and the Enterprise audit log API adds a year of logins and role changes that can feed your SIEM.

Two limits are worth knowing before the review starts. Single sign-on and SCIM provisioning are Enterprise only, and SCIM doesn't assign roles or groups yet, so someone still sets roles inside Webflow. And Webflow says it isn't HIPAA compliant by default.
```

**1b. FAQ.** Add after the item `Can Webflow run a multi-language enterprise site?`:

- **Q:** `Can Webflow manage multiple sites for one company?`
- **A:** `Yes. One Workspace can hold many sites, each on its own Site plan, and Shared Libraries, available on all paid Workspace plans, let those sites share components, variables, fonts, and assets. Update the Library once, and each site can accept the change. On an Enterprise Workspace, owners and admins can also have a Library installed automatically on every new site.`

The FAQ then has 8 items.

**1c. Sources.** Add:

- Webflow Help Center: Libraries | https://help.webflow.com/hc/en-us/articles/33961343551763 | Accessed November 25, 2026
- Webflow: Centrally manage your Shared Libraries | https://webflow.com/updates/centrally-manage-your-shared-libraries | Accessed November 25, 2026

## 2. /blog/aeo-specialist

**2a. New H2.** Where: directly before the H2 `When should you hire an AEO specialist or consultant?`, after the section `Where do in-house AEO programs get stuck?`. Insert (link "our AEO agency page" to /aeo-agency):

```markdown
## Should you hire an AEO agency or build AEO in-house?

Start with a list of names. In-house AEO needs an SEO lead with a few hours a week for the prompt rerun, a developer who can get crawler fixes into the next sprint, and someone who already pitches the publications and lists that AI assistants cite. If you can fill all three, keep it inside. If a name is missing, or the March rerun got skipped because of a launch, that's usually the sign to bring in an agency.

Large companies mostly keep the work inside. In Branch's January 2026 survey of 300 US enterprise marketing and growth leaders, 25% used outside agencies or vendors for AI search. A 40-person SaaS company rarely has spare hours in all three roles, so a split often makes sense: the agency runs tracking, technical fixes, and outreach, while your team owns product facts, approvals, and the pages only your experts can write.

A tool plus one specialist can work too, if that specialist has developer time and the authority to publish. A tool on its own only measures. It will show the prompts where you're missing, but it won't fix a blocked crawler or earn a mention. If you're weighing the agency route, our AEO agency page shows how we run the program and what you get every month.
```

No FAQ or source changes. The Branch survey is already cited on the page.

## 3. /blog/cybersecurity-content-marketing

**3a. New H2.** Where: directly before the H2 `Questions about cybersecurity marketing`, after the section `How do security buyers find content in search and AI answers?`. Insert (link "Our cybersecurity web design page" to /cybersecurity-web-design):

```markdown
## How do you choose an agency that understands CISOs and security buyers?

Look for an agency that has shipped work for security companies and can show it, then test it on what your own buyers test: technical accuracy, procurement, and tone.

For accuracy, hand the agency one claim from your product page and ask how it would back it up. A good answer involves interviews with your engineers and a practitioner who reviews every technical claim and puts their name on the piece. For procurement, ask whether it has signed master services and data processing agreements and filled in vendor security questionnaires for enterprise clients, because a security vendor's website has to pass a security review of its own. It should also know what belongs on a trust page: certifications, policies, subprocessors, and a way to request your SOC 2 report.

Tone is the quickest check. If the pitch is full of padlocks, hooded hackers, and glowing globes, expect the same hype that skeptical buyers have learned to skip. Our cybersecurity web design page explains how we handle each of these for security companies.
```

No FAQ or source changes.

## 4. /blog/headless-cms-comparison

**4a. Rename one H2.** `How should you run a headless CMS comparison for your team?` becomes `How do you choose a headless CMS?`. The section's text stays as it is. If any link points to the old heading id, update it to the new id and list it in the report.

**4b. FAQ.** Add after the item `What is the best headless CMS for a marketing site?` (link "Our guide to headless CMS SEO" to /blog/headless-cms-seo):

- **Q:** `Which headless CMS is best for SEO?`
- **A:** `None of them ranks better on its own. Search engines never see the CMS, only the HTML your front end serves, so rankings depend on how that front end renders pages and handles meta tags, canonical URLs, redirects, and sitemaps. What the CMS adds is control for editors, such as fields for the title tag, meta description, and slug. Our guide to headless CMS SEO lists what to check before launch.`

The FAQ then has 7 items.

## 5. /blog/webflow-security-php2shell

**5a. FAQ.** Add after the item `Is Webflow affected by PHP2Shell?`:

- **Q:** `Does Webflow use PHP?`
- **A:** `Not in any way your team touches. A Webflow site has no PHP version, plugins, or server configuration for you to update, and WordPress plugins can't run on it; features come from built-in settings, integrations, or custom code that runs in the browser. Webflow doesn't publish which server software runs its platform, so patching that layer is Webflow's job.`

**5b. FAQ.** Add after the item `Is Webflow secure enough for a B2B SaaS company?`:

- **Q:** `How does Webflow's managed security compare with self-hosting behind Cloudflare?`
- **A:** `At the edge they can look alike. Webflow already serves sites through Cloudflare's CDN on AWS infrastructure, with DDoS protection, rate limiting, TLS, automatic patching, and SOC 2 Type II and ISO 27001 certifications included. Self-host a headless CMS behind Cloudflare and your team patches the origin server, the CMS, and its dependencies, then has to show that work in every security review.`

The FAQ then has 8 items.

## 6. /blog/webflow-editor

**6a. FAQ.** Add after the item `What replaced the Webflow Editor?`:

- **Q:** `Can content teams edit pages in Webflow without a developer?`
- **A:** `Yes. Content editors change copy, images, links, and CMS items right on the canvas, and with 'Can publish' turned on they can publish to staging or the live domain. Marketers can also build new pages from existing components. Layout, styles, custom code, and CMS structure stay with designers, who choose which elements editors can touch. Each content editor needs a limited seat.`

The FAQ then has 6 items.

## 7. /blog/astro-cms

**7a. FAQ.** Add after the item `What is the best free CMS for Astro?`:

- **Q:** `Which Git-based CMSs work with Astro?`
- **A:** `CloudCannon, Decap CMS, Keystatic, TinaCMS, and Pages CMS all edit content stored as files in your repository. CloudCannon is the only featured CMS partner in Astro's docs, and Astro has full setup guides for Decap CMS, Keystatic, and TinaCMS. With any of them, every edit is a commit and often a rebuild, which suits a developer-led site better than a marketing team publishing every day.`

**7b. FAQ.** Add directly after 7a:

- **Q:** `Which Astro CMSs support MDX?`
- **A:** `TinaCMS edits Markdown and MDX files, and Keystatic has an MDX field that reads and writes MDX but leaves the rendering to your site. In Astro, that rendering comes from the @astrojs/mdx integration. Keep MDX content in build-time collections, because Astro's live collections can't render MDX at runtime.`

The FAQ then has 7 items.

**7c. Sources.** Add:

- Keystatic: MDX field | https://keystatic.com/docs/fields/mdx | Accessed November 25, 2026
- Astro Docs: @astrojs/mdx | https://docs.astro.build/en/guides/integrations-guide/mdx/ | Accessed November 25, 2026
- Astro Docs: Content collections | https://docs.astro.build/en/guides/content-collections/ | Accessed November 25, 2026

## 8. /blog/track-brand-mentions-in-chatgpt

**8a. FAQ.** Add after the item `How often should you check AI brand mentions?`:

- **Q:** `Which tools track ChatGPT brand mentions and sentiment over time?`
- **A:** `Paid AI visibility trackers do the manual sheet's job on a schedule: they rerun a fixed prompt set in ChatGPT and other assistants and chart your mention rate, the competitors named, the pages cited, and, in many tools, sentiment. Before paying, check that you can load your own prompts and export the raw answers, so the numbers can be audited. Switching makes sense once the sheet takes more than an afternoon or you need daily data.`

The FAQ then has 7 items. No tool names, on purpose.

## 9. /blog/webflow-salesforce-integration

**9a. Add a sentence to an existing FAQ answer.** Where: in the answer to `Does Salesforce have a native Webflow integration?`, directly after `Webflow's Salesforce page says Salesforce doesn't offer an official Webflow app.` Edit only inside this FAQ answer, because the same wording appears elsewhere on the page. Insert:

`That holds on every Salesforce edition, Enterprise Edition included.`

**9b. FAQ.** Add after the item `Does Salesforce have a native Webflow integration?`:

- **Q:** `Can Webflow forms write to custom Salesforce objects and fields?`
- **A:** `Custom fields, yes; custom objects, not through Web-to-Lead. Web-to-Lead only creates Lead records, though it can fill custom fields you add to the Lead object. To create a record in a custom object, send the submission through middleware such as Zapier, whose Salesforce Create Record action works on the object you select, or through a custom build on the Salesforce API.`

The FAQ then has 7 items.

**9c. Sources.** Add:

- Salesforce: Tips for Lead Administrators (PDF) | https://resources.docs.salesforce.com/224/latest/en-us/sfdc/pdf/salesforce_leads_cheatsheet.pdf | Accessed November 25, 2026
- Zapier Help Center: How to get started with Salesforce on Zapier | https://help.zapier.com/hc/en-us/articles/8496020790925 | Accessed November 25, 2026

## 10. /blog/webflow-price-increase

**10a. FAQ.** Add after the item `How much does Webflow cost per month in 2026?`:

- **Q:** `Does Webflow publish its prices?`
- **A:** `Yes, for every plan except Enterprise. Webflow's pricing page lists the Site, Ecommerce, and Workspace plans, plus the Team plan at 2,500 dollars a month on an annual contract. Enterprise shows as Custom, because Webflow quotes it per customer.`

The FAQ then has 12 items.

---

## 11. Checks before you report

1. **Build and SEO script.** Build, then run `node scripts/check-seo.mjs dist`. For each of the 10 pages, confirm:
   - the FAQPage JSON-LD has the same number of questions as the visible FAQ, and both match the new counts above
   - `dateModified` equals the ship date
   - the title tag, meta description, and H1 are unchanged
2. **Headings.** Heading ids are unique on each page and no levels are skipped. The renamed H2 has its new id, and nothing links to the old one.
3. **Em dashes.** `rg -n "—"` on the changed files finds nothing.
4. **Links.**
   - New internal links (/aeo-agency, /cybersecurity-web-design, /blog/headless-cms-seo) resolve.
   - New source links use https and resolve.
5. **Sitemap.** All 10 URLs are still in the sitemap.

## 12. Report

Post the following, and don't merge, push to main, or deploy:

- the branch and its commits
- the discovery answers
- the results of the checks
- anything you couldn't place exactly
- any link you had to drop because of the FAQ format

## 13. After the deploy

1. **Search Console.** Request indexing for:
   - https://www.benormedia.com/guides/webflow-enterprise
   - https://www.benormedia.com/blog/aeo-specialist
   - https://www.benormedia.com/blog/cybersecurity-content-marketing
   - https://www.benormedia.com/blog/headless-cms-comparison
   - https://www.benormedia.com/blog/webflow-security-php2shell
   - https://www.benormedia.com/blog/webflow-editor
   - https://www.benormedia.com/blog/astro-cms
   - https://www.benormedia.com/blog/track-brand-mentions-in-chatgpt
   - https://www.benormedia.com/blog/webflow-salesforce-integration
   - https://www.benormedia.com/blog/webflow-price-increase
2. **28-day check on December 23.** For each page, compare these against the September 29 to November 22 baseline in `claude/gsc-question-queries-2026-11-24.md`:
   - question-query impressions and clicks, using the same regex
   - impressions in the generative AI features report

## 14. Status

- 2026-11-25: brief written. Facts were checked and the AI detector passed. Not shipped yet.
