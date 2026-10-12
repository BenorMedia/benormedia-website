# Page content: /website-redesign

Status: DRAFT v2, written 9 Oct 2026 for BenorMedia (v1 drafted, then revised after a Surfer pass the same day). Template: the SEO service page `/webflow-migration` (same section order and components). Everything under "Visible copy" goes on the page. Lines starting with `>` are notes for the builder and never appear on the page. Inline markers (`[VERIFY: …]`, `[FACT NEEDED: …]`) stay visible in the preview and block release until a person resolves them.

## SEO fields

| Field | Value |
|---|---|
| URL | `/website-redesign` |
| Canonical | `https://www.benormedia.com/website-redesign` |
| Title tag | `Website Redesign Services for B2B & SaaS \| BenorMedia` (53 characters) |
| Meta description | `Website redesign services for B2B and SaaS teams. We keep the pages that rank and convert, rebuild the rest, and launch on Webflow or custom code.` (146 characters) |
| H1 | `Website redesign for B2B and SaaS teams, built on what already works.` |
| Primary keyword | website redesign services |
| Secondary keywords | website redesign agency, b2b website redesign, saas website redesign, website redesign company |
| Breadcrumb | Home › Custom Websites & Migrations › Website Redesign |
| JSON-LD | `Service`, `FAQPage`, `BreadcrumbList` (same pattern as `/webflow-migration`) |
| Service markup | `name`: "Website redesign" · `serviceType`: "Website redesign" · `provider`: shared Organization `@id` · `description`: the meta description · `areaServed` and `audience`: as on the other service pages · no `offers` |
| Open Graph | Title = H1 without the final period; description = meta description; image = the default service OG image |

## Visible copy

### 1. Hero
> Component: hero from `/webflow-migration` (eyebrow, H1, lead, proof line, two buttons, decorative graphics).

- Eyebrow: Website redesign
- H1: Website redesign for B2B and SaaS teams, built on what already works.
- Lead: A good website redesign agency changes how your site sells without throwing away the traffic and leads it already earns. Our website redesign services start with your Search Console, analytics and CRM data: we keep the pages that rank and convert, and rebuild the rest on Webflow or custom code.
- Proof line: 100+ launches in 6+ years, including 60+ B2B SaaS websites.
- Buttons: "Get in Touch" (same target as every other page) · "See Pricing" → `/pricing`

### 2. Logo strip
> Shared component. No new copy.

### 3. Start with what your current site already wins.
> Component: the "Start with a map of every URL." section (H2, intro, 5-item list, diagram, inline link).
> Visual: a five-column triage diagram labelled Keep, Improve, Merge, Retire, Add, with a few example URLs flowing into each. If the existing diagram component cannot take new labels, reuse the URL-mapping diagram and list the new visual in the report.

- H2: Start with what your current site already wins.
- Intro: Plenty of redesigns start with what people dislike about the current site. We start with what it does well, because those pages hold your rankings and generate your leads. Before any design work, we pull twelve months of Search Console and analytics data and sort every URL into five groups.
- Items:
  - **Keep.** Pages that rank and convert. Their URLs, headings and core copy stay unless there's a clear reason to change them.
  - **Improve.** Pages with impressions but few clicks, or traffic but few conversions. They get new copy and layouts first.
  - **Merge.** Thin or overlapping pages that compete for the same searches. We combine them and redirect the old URLs to the new one.
  - **Retire.** Pages with no traffic, no links and no use in sales. Each one comes down with a 301 to its closest match.
  - **Add.** Pages buyers look for and can't find today, such as pricing, security, integrations and comparisons.
- Close: That inventory becomes the redirect map, the sitemap and the timeline in the website strategy plan, the first step of [our build process](/custom-websites-migrations).

### 3b. How we plan and run a website redesign.
> Component: the numbered process component from `/custom-websites-migrations` (steps 01–09), cut to seven steps. Step names reuse that page's wording where the step is the same (Website strategy plan, Component library build, Website development, Content migration, QA & launch, Training & handoff). If that component can't sit on this page, use the list component from section 3 with the numbers in the item titles.

- H2: How we plan and run a website redesign.
- Intro: Our redesign process has seven steps, and strategy, design and development stay with one team from the first audit to launch. You know what happens when, and what we need from you at each step.
- Items:
  - **1. Audit and business goals.** Analytics, Search Console and CRM data, a review of competitor sites, and a conversation with sales. We agree what the redesign project has to achieve before anything else.
  - **2. Website strategy plan.** The sitemap, URL map, project scope, platform and timeline, signed off before design starts. It's your redesign strategy in one document.
  - **3. Wireframes and content.** Page structure, navigation and the route each type of buyer takes through the site, with copy written or edited alongside.
  - **4. UI/UX design and design system.** Website design for desktop and mobile devices, built from a design system so every new page matches the last. Navigation and text stay easy to use on a phone.
  - **5. Component library build and website development.** Webflow or custom development, with interactions, breakpoints and integrations built in.
  - **6. Content migration and QA.** Every page moved and checked by hand and every redirect tested. Then browsers, speed, accessibility and mobile usability get tested before launch.
  - **7. Launch, training and handoff.** We're there for the go-live, then we train your team and support the redesigned website while traffic settles.

### 4. Design for buyers who decide before they call you.
> Component: the "Rebuild in Webflow with a component library." section (H2, short intro, 4-item list, diagram + screenshot row).
> Visual: reuse the screenshot row of client sites. Diagram labels: Positioning, Roles, Proof, Conversion.

- H2: Design for buyers who decide before they call you.
- Intro: B2B buyers make most of their decision before they talk to anyone. In [6sense's 2025 Buyer Experience Report](https://6sense.com/science-of-b2b/buyer-experience-report-2025/), 94% of buyers had already ranked their preferred vendors by the time they made first contact. That contact came about 61% of the way through their purchase. Good B2B web design does that early selling, so we design around the questions a buying group asks.
- Items:
  - **Positioning.** One clear statement of who the product is for and why it wins, agreed with sales before the first wireframe.
  - **A path for each role.** Champions want outcomes, technical evaluators want architecture and integrations, and finance wants to understand pricing. Each gets its own route through the site.
  - **Proof next to the claim.** Customer logos, case studies, security details and review scores placed where doubt shows up, not saved for a logo wall.
  - **Conversion paths built for lead generation.** Clear calls to action and demo, pricing and contact forms that ask for what your sales team needs and nothing more.

### 5. Rebuild on a system your marketing team can run.
> Component: the "Every page moved by hand, every redirect tested." section (H2, intro, 5-item list).

- H2: Rebuild on a system your marketing team can run.
- Intro: A redesign that only an agency can update starts aging on launch day. We build a component library and a CMS structure so your team can publish pages, case studies and posts without opening a ticket.
- Items:
  - **Component library.** Sections designed and built once, then reused, with variables and design tokens that keep every page consistent.
  - **CMS structure.** Collections for case studies, resources, integrations and jobs, with SEO fields bound to each item.
  - **The right platform.** Webflow for most marketing sites, and custom code when the site needs logic Webflow doesn't handle well, such as deep product integrations or heavy personalization. [VERIFY: confirm the examples and the frameworks you build custom sites in]
  - **Integrations.** CRM, analytics, consent and enrichment tools connected during the build, not bolted on after launch.
  - **Training.** Live sessions, video walkthroughs and documentation your marketers will actually open.
- Close: For [JOOR](/work), the wholesale platform for global fashion, we rebuilt 100+ pages in 8+ languages on one design system, and we've kept working with their team for more than three years.
> Link "JOOR" to `/work/joor` once the case study is released; until then it points to `/work`.

### 6. Protect your rankings through launch.
> Component: the "Plugins, forms, and integrations" section (H2, intro, list, diagram rows).
> Visual: reuse the URL-mapping diagram from `/webflow-migration` (old path → 301 → new path).

- H2: Protect your rankings through launch.
- Intro: Google treats a redesign that changes URLs as a site move, and its [guidance on site moves](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) is specific. We follow it to protect your search visibility, and we add checks for what a redesign changes even when the URLs stay put.
- Items:
  - **A URL map and permanent redirects.** Every old URL mapped to its new address with a server-side 301, one hop each. Google advises keeping redirects for at least a year.
  - **Content parity on your best pages.** Headings, body copy, internal links and metadata on Keep pages carry over, because layout and content changes can move rankings even when URLs don't.
  - **One change at a time where possible.** Google suggests not combining a new platform and a new layout in a single release. When a redesign has to do both, we hold the copy of top-ranking pages steady at launch and change it in a second release.
  - **Testing on staging.** We crawl the new site on a no-index staging copy, follow every redirect, and check canonicals, sitemaps and structured data before the switch.
  - **Monitoring after launch.** Search Console coverage, 404s and the Keep pages get checked daily for the first weeks. Google says to expect some ranking fluctuation during a move, so we agree in advance what normal looks like.

### 7. Fast, findable and ready for AI search.
> Component: the "SEO and AI search readiness are part of the build." section (4 bold items + tag labels).
- Tags: Core Web Vitals · Technical SEO · Structured data · AEO

- H2: Fast, findable and ready for AI search.
- Intro: Every redesign ships with the groundwork for search engine optimization and AI search already in place.
- Items:
  - **Core Web Vitals.** Templates built to Google's ["good" thresholds](https://web.dev/articles/vitals): Largest Contentful Paint of 2.5 seconds or less, Interaction to Next Paint of 200 milliseconds or less, and Cumulative Layout Shift of 0.1 or less. Images, fonts and scripts get the same performance optimization.
  - **Technical SEO.** One H1 per page, canonical tags, XML sitemaps, internal links and image alt text, set for every page and every CMS item.
  - **Structured data.** Organization, breadcrumb, article and FAQ markup wherever the page content supports it.
  - **AEO readiness.** Content rendered on the server, because [most AI crawlers don't run JavaScript yet](https://webflow.com/blog/technical-aeo-for-ai-discovery); access for search crawlers such as OAI-SearchBot and PerplexityBot; and answers written in plain sentences. [AEO and GEO](/aeo-agency) work continues after launch.

### 8. After launch: measure, fix, keep improving.
> Component: the "Training, handoff, and support after launch." section (H2, intro, 4-item list, icon labels, links).

- H2: After launch: measure, fix, keep improving.
- Intro: Launch is the halfway point of a redesign. For the first weeks we watch rankings, conversions and errors, then hand you a short plan for what to improve next.
- Items:
  - **Post-launch support.** Fixes and adjustments while traffic settles. Support continues for 30 days after launch. [VERIFY: same 30-day window as migrations?]
  - **Before-and-after report.** Search Console, analytics, form and CRM data, including lead quality, for every page that changed, compared with the baseline from the audit.
  - **Ongoing website support.** Weekly updates, quarterly CRO audits and technical SEO monitoring, with SLA-backed response times, through [ongoing website support](/ongoing-website-support).
  - **Growth.** SEO, AEO and conversion optimization through [Growth](/growth), for teams that want ongoing optimization and more pipeline every quarter.

### 9. Work grid
> Shared component. Only the heading changes.

- Eyebrow: Our Work
- H2: B2B and SaaS website redesigns on our work page.
- Sub-line: 6+ years of experience and 100+ launches speak for themselves.
- Button: "View All 100+ Projects" → `/work`

### 10. When a redesign is the wrong call.
> Component: the "When staying on WordPress is the better call." section (intro, items with icons, closing line). This page has 6 items; if the component's grid only works with 5, drop "The problem is in the product."

- H2: When a redesign is the wrong call.
- Intro: A new website is an expensive answer to some problems. Look at these cases before you commit.
- Items:
  - **Too few of the right people visit.** A redesign won't create demand. If website traffic is the problem, SEO, content and digital marketing will move it faster, on the site you already have.
  - **Traffic is healthy and the copy is the problem.** Rewrite and test the key pages first. It's faster and cheaper than a rebuild.
  - **Your positioning is still moving.** A redesign won't decide who the product is for. It will only make an unsettled message look finished.
  - **You need one page for a launch in two weeks.** Build that landing page now and scope the redesign after the launch.
  - **The problem is in the product.** In-app screens and dashboards are product design work, not a website redesign.
  - **No one will own the site after launch.** Without an owner, a new site drifts back to where the old one is.
- Close: If none of these fits, a redesign is worth scoping.

### 11. Services cards
> Shared component ("Your website doesn't stop at launch."). No new copy.

### 12. CTA band
- H2: Bring us the site you have. We'll show you what to keep.
- Body: Send us your URL and what the redesign has to achieve. We'll reply with a first view of what to keep, what to change and how long it should take.
- Buttons: "Get in Touch" · "See Pricing" → `/pricing`

### 13. FAQ
> Component: FAQ accordion. The same array feeds the visible FAQ and the `FAQPage` markup.

- H2: Website redesign agency FAQs.

**Q: How much do website redesign services cost?**
A: Five things set the cost: the number of page templates, how much content moves, the integrations, whether the platform changes, and how much new copy you need. The [pricing page](/pricing) lists a Design + Development plan billed monthly and a One Off plan for fixed-scope projects. Send your URL and page count, and we'll come back with a number.

**Q: How long does a B2B website redesign take?**
A: Templates, content volume, the redirect map and the number of review rounds set the timeline, and we fix it in the website strategy plan once the audit is done. For reference, a WordPress to Webflow migration typically takes 3 to 4 weeks for about 20 pages and 6 to 8 weeks for a mid-size site with a blog. A large site takes 10 to 14 weeks, and a full redesign adds design time on top.

**Q: Will a website redesign hurt our SEO?**
A: It can, if URLs change without redirects, top pages lose their content, or the new templates load slowly. Planned properly, rankings may move for a few weeks and then settle; Google says to expect temporary fluctuation during a site move. We map every URL, keep top-page content stable at launch, and check Search Console daily after the switch.

**Q: What should we check before hiring a website redesign agency?**
A: Five things. Case studies in your category, with results. Real experience with the content management system you'll run, from Webflow to WordPress to custom code. A written SEO plan with a URL map, redirects and testing before launch. A proposal that lists the templates, pages, integrations and review rounds. And clear ownership: you should hold the domain, the code, the design files and the CMS account, with support after launch agreed before work starts. Any web design agency can show a portfolio. Ask a website redesign company for the redirect map from its last redesign, too.

**Q: How do we know it's time to redesign?**
A: Look for structural problems rather than taste: your positioning or audience has changed, or your team can't publish a landing page without a developer. Other signs are key pages that convert worse each quarter, a CMS that limits what you can build, and a new brand identity on the way. If only the visuals feel dated, refreshing the existing templates usually costs less.

**Q: Do we have to move to Webflow?**
A: No. We build most marketing sites in Webflow because marketing teams can run them, and we build custom-coded sites when a project needs logic Webflow doesn't handle well. The platform recommendation comes in the strategy plan, before any design work starts.

**Q: Can we keep publishing while you redesign?**
A: Yes. Your current site stays live while the new one is built and tested on a staging copy. We pause content changes for the last few days before launch, so the final content move and the redirect tests match what's live.

**Q: What do you need from our team?**
A: One decision-maker per review round, access to Search Console, analytics and your current CMS, an hour or two with sales to hear what buyers ask, and someone who will own the site after launch. Copy can come from your team or from ours, and if you have an in-house design team or brand guidelines, we build from them.

**Q: What happens after launch?**
A: Support continues while traffic settles. After that, ongoing support is your choice: ongoing website support for weekly updates, CRO audits and technical SEO monitoring, or Growth for SEO, AEO and CRO work. You can also run the site in-house; we train your team before handoff.

**Q: Can you redesign only part of our site?**
A: Yes. Common partial projects are a new homepage and product pages, a resources hub, or the pricing and demo pages. We still audit the whole site first, because changing one section affects navigation and internal links everywhere else.

### 14. Related pages
- [B2B SaaS web design](/b2b-saas-web-design)
- [WordPress to Webflow migration](/webflow-migration)
- [B2B SaaS website pages guide](/guides/b2b-saas-website-pages)

### 15. Contact form and testimonial
> Shared component. No new copy.

## Internal links

- Out from this page: `/custom-websites-migrations`, `/aeo-agency`, `/ongoing-website-support`, `/growth`, `/work`, `/pricing`, `/b2b-saas-web-design`, `/webflow-migration`, `/guides/b2b-saas-website-pages`.
- Into this page (add during the build): one sentence with a link from `/custom-websites-migrations` (process section: "Redesigning an existing site? See [website redesign](/website-redesign)."), and a link from the `/b2b-saas-web-design` FAQ "Should a SaaS company redesign its website or refresh it?" with the anchor "website redesign".

## Sources (tier B: outside facts used on the page)

| Claim on the page | Source | Checked |
|---|---|---|
| 94% of buyers had ranked preferred vendors before first contact; first contact about 61% through the journey | 6sense, 2025 Buyer Experience Report, about 4,000 buyers: https://6sense.com/science-of-b2b/buyer-experience-report-2025/ and press release https://6sense.com/newsroom/the-timeline-for-influencing-b2b-buyers-is-shrinking-insights-from-6senses-2025-buyer-experience-report/ (Nov 2025) | 9 Oct 2026 |
| URL changes make a redesign a site move; map URLs; server-side 301/308; keep redirects at least 1 year; expect temporary fluctuation; plan changes one after another (new CMS and new layout given as the example) | Google Search Central, Site moves with URL changes (updated 20 Aug 2026): https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes | 9 Oct 2026 |
| Layout and content changes can affect rankings even when URLs stay the same | Google Search Central Office Hours, May 2023 ("treat it more like a site move" for redesigns with new URLs): https://developers.google.com/search/help/office-hours/2023/may ; John Mueller via Search Engine Journal (30 Sep 2020): https://www.searchenginejournal.com/changing-web-layout-can-affect-search-rankings/382700/ | 9 Oct 2026 |
| Core Web Vitals "good" thresholds: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 | web.dev, Web Vitals: https://web.dev/articles/vitals | 9 Oct 2026 |
| Most AI crawlers don't render JavaScript; server-render important content | Webflow blog, Technical AEO for AI discovery (30 Sep 2026): https://webflow.com/blog/technical-aeo-for-ai-discovery | 9 Oct 2026 |
| OAI-SearchBot and PerplexityBot are the search crawlers for ChatGPT search and Perplexity | OpenAI: https://developers.openai.com/api/docs/bots ; Perplexity: https://docs.perplexity.ai/guides/bots | 9 Oct 2026 |

## Already on benormedia.com (tier A, reused)

"6+ years of experience and 100+ launches"; "60+ B2B SaaS websites in the last 6 years"; the website strategy plan as step 01 of the build process; "Live training, video walkthroughs, and documentation your marketers will actually open"; ongoing support with weekly updates, quarterly CRO audits, technical SEO monitoring and SLA-backed response times; Design + Development and One Off plans on `/pricing`; migration timelines (3–4 / 6–8 / 10–14 weeks) from `/webflow-migration`; the site stays live on staging during a migration. Process step names on `/custom-websites-migrations` reused in section 3b: Website strategy plan, Component library build, Website development, Content migration ("Every page moved and checked by hand, every redirect tested"), QA & launch ("Browsers, speed, accessibility", attending the go-live), Training & handoff.

## Statements a person must confirm (review sheet seeds)

1. We pull twelve months of Search Console and analytics data and sort every URL into Keep / Improve / Merge / Retire / Add.
2. We agree positioning with sales before the first wireframe.
3. Custom code examples and frameworks (marker in section 5).
4. "When a redesign has to do both, we hold the copy of top-ranking pages steady at launch and change it in a second release."
5. Daily Search Console checks in the first weeks after launch.
6. 30-day post-launch support for redesigns (marker in section 8).
7. The before-and-after report.
8. The CTA promise: "We'll reply with a first view of what to keep, what to change and how long it should take."
9. FAQ: content freeze in the last days before launch; "Copy can come from your team or from ours."
10. Process (section 3b): the seven steps, including the competitor-site review in step 1, wireframes in step 3, and "strategy, design and development stay with one team".
11. Before-and-after report uses CRM data on lead quality (section 8).
12. FAQ "What should we check before hiring…": the advice that clients should hold the domain, code, design files and CMS account. Confirm this matches how BenorMedia hands over projects (for example, the Webflow site sits in the client's workspace).
13. Section 5 close: the JOOR line (100+ pages, 8+ languages, one design system, 3+ years). Facts from Sergio; JOOR is already named on `/work` and `/webflow-enterprise-agency`.
14. FAQ "What do you need from our team?": "if you have an in-house design team or brand guidelines, we build from them."
