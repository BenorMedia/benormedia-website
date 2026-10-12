# Page content: /headless-cms-agency

Status: DRAFT v3. Written 9 Oct 2026 for BenorMedia (v1 drafted, v2 revised after a Surfer pass and a fact check); v3 on 10 Oct 2026 applies Sergio's answers on the stack, upkeep, pricing and BenorMedia's own site. Template: the SEO service page `/webflow-migration`. Everything under "Visible copy" goes on the page. Lines starting with `>` are builder notes. Inline markers stay visible in the preview and block release until a person resolves them.

## SEO fields

| Field | Value |
|---|---|
| URL | `/headless-cms-agency` |
| Canonical | `https://www.benormedia.com/headless-cms-agency` |
| Title tag | `Headless CMS Agency: Next.js & Astro Development \| BenorMedia` (61 characters) |
| Meta description | `Headless CMS agency for B2B SaaS. We build Next.js and Astro sites your marketers can edit, and plan moves off Webflow or WordPress around your search traffic.` (159 characters) |
| H1 | `Headless CMS agency for B2B SaaS: custom-coded sites your marketing team can still run.` |
| Primary keyword | headless cms agency |
| Secondary keywords | headless cms development, headless cms development company, headless web development, headless website development, nextjs development company, next js development agency, headless cms migration, sanity agency, storyblok agency, contentful agency, strapi agency, custom coded website, custom website development agency |
| Breadcrumb | Home › Custom Websites & Migrations › Headless CMS Development |
| JSON-LD | `Service`, `FAQPage`, `BreadcrumbList` |
| Service markup | `name`: "Headless CMS development for B2B SaaS" · `serviceType`: "Headless CMS development" · `alternateName`: ["Headless web development", "Custom-coded websites", "Next.js development", "Astro development"] · `provider`: shared Organization `@id` · `description`: the meta description · `audience`: `{"@type": "BusinessAudience", "audienceType": "B2B SaaS companies"}` · no `offers` |

Facts sheet item S1 was answered on 10 Oct 2026: BenorMedia builds in any framework. The page names widely searched frameworks and CMSs from the keyword research: Next.js and Astro in the title and meta description; Nuxt and SvelteKit as other frameworks; Contentful, Strapi, Sanity, Storyblok and Payload as CMSs. "We work with any headless CMS" is still to confirm (item 1 of the confirm list).

## Visible copy

### 1. Hero
> Component: hero from `/webflow-migration`.

- Eyebrow: Headless CMS development
- H1: Headless CMS agency for B2B SaaS: custom-coded sites your marketing team can still run.
- Lead: We design and build custom-coded websites on a headless CMS, in Next.js, Astro or the framework your team already uses, for B2B SaaS teams whose site has outgrown its website builder. Marketers keep a visual editor with live preview, and engineers get a Git repository they can review and deploy like the product. Coding agents have made custom code cheaper to change, but a headless site still needs an owner, so we start by checking it's worth it. Moving from Webflow or WordPress? We plan the move around your search traffic.
- Proof line: Webflow Professional Partner for 6+ years, so we recommend Webflow when it's enough. Our own site runs on Astro and Sanity.
- Buttons: "Get in Touch" · "See Pricing" → `/pricing`

### 2. Logo strip
> Shared component. No new copy.

### 3. How a headless CMS works, in plain terms.
> Component: the "Start with a map of every URL." section (H2, intro, list, diagram).
> Visual: four boxes left to right, "Headless CMS", "Content API", "Next.js or Astro front end", "CDN", with "CRM, analytics, product data" feeding the front end from below. Labels as live text.

- H2: How a headless CMS works, in plain terms.
- Intro: A headless CMS separates content from design. It's a content management system that stores your content and delivers it through an API, without deciding how pages look. A traditional CMS such as WordPress, or a platform like Webflow, keeps content and design in one system. In a headless architecture, your pages are a separate front end, built in a framework such as Next.js or Astro, that requests the content and renders it. That's what headless web development means: we build both halves and the connection between them, so either can change without rebuilding the other.
- Items:
  - **The CMS.** Where your content team writes, edits and publishes structured content. We work with any headless CMS, including common ones such as Contentful, Strapi, Sanity, Storyblok and Payload.
  - **The front end.** The pages your visitors see, written in Next.js, Astro, Nuxt, SvelteKit or another framework. It asks the CMS for content and turns it into HTML.
  - **Content delivery.** Pages built ahead of time with static site generation and served from a content delivery network (CDN), or rendered on the server per request when they need fresh data. Forms and other dynamic features run as server functions, and search runs on a hosted service or inside the site.
  - **The repository.** All code in Git, every change reviewed, every version a rollback away.
- Close: Because the content lives apart from the pages, the same content can feed your website, docs, product and mobile apps.

### 4. When a headless build is worth it.
> Component: the "Rebuild in Webflow with a component library." section (H2, intro, list, diagram).
> Visual: reuse the component-library diagram with five labels: "Product data", "App features", "Engineering workflow", "Platform limits", "Coding agents".

- H2: When a headless build is worth it.
- Intro: Most of the B2B sites we build are in Webflow, because marketing teams can run them without developers. We recommend a headless build when two or more of these are true. One on its own can usually be handled inside Webflow.
- Items:
  - **Pages come from product data.** Hundreds of pages for integrations, templates or use cases, generated from the systems that already hold that data instead of copied into a CMS by hand.
  - **The site needs web app features across many pages.** Logins, personalization or pricing logic that reads your product's data on the server side.
  - **Engineers want ownership.** The site lives in a repository next to the product, with the pull requests, preview builds and tests your development team already uses.
  - **You've hit platform limits.** CMS item caps, fixed URL patterns, many locales or a plan bill that keeps growing.
  - **You want to build with coding agents.** Agents tend to do better in a typed, conventional codebase, and their code changes still go through review before they ship.
- Close: If none of these fit, a well-built Webflow site is usually cheaper to run. Our guide to [Webflow vs custom code](/guides/webflow-vs-custom-code) walks through the decision, including the middle paths.

### 5. How we build a headless site.
> Component: the "Every page moved by hand" section (H2, intro, list). Six items; if the component caps at five, merge items 5 and 6.

- H2: How we build a headless site.
- Intro: Our headless CMS development follows the same [build process](/custom-websites-migrations) as our Webflow projects, from the website strategy plan to training and handoff. These are the steps that work differently when the site is custom-coded.
- Items:
  - **1. Strategy plan and content models.** Every page type, its fields and how content links together, mapped before design starts, along with the URL plan and the choice of CMS and framework.
  - **2. Component library.** A design system in code, with each component matched to a CMS block, so editors build pages from approved sections instead of free-form layouts.
  - **3. Development.** The framework that fits, usually Next.js or Astro, in TypeScript, with a preview build for every change and custom API integrations with your CRM, analytics and product data.
  - **4. Content migration.** Scripts move content from Webflow CSV exports, the Webflow or WordPress APIs, or spreadsheets. Then we check every page by hand and move images and files to the new host. Because the CMS is separate, your editors can start working in it while the front end is still being built.
  - **5. SEO, AEO and QA.** Metadata, canonicals, sitemaps, structured data and redirects built into the templates, then testing, including a staging crawl checked against the live site before launch.
  - **6. Training and handoff.** Editor training, written documentation, and the repository and every account in your name.

### 6. Moving from Webflow or WordPress to headless.
> Component: the "Plugins, forms, and integrations" section (H2, intro, list, diagram rows). Legend not needed.

- H2: Moving from Webflow or WordPress to headless.
- Intro: Leaving Webflow, WordPress or a legacy CMS? A headless CMS migration is mostly about the jobs the old platform did without anyone noticing. We list them first and decide what replaces each one before the build starts.
- Items:
  - **URLs and rankings.** We keep every URL we can. Where one has to change, it gets a 301 redirect, kept as long as possible and generally at least a year, as Google advises.
  - **Forms.** Form plugins and Webflow's form handling don't come with you. We route every form to your CRM or a form backend and test each submission path.
  - **Search and languages.** Site search and language versions are rebuilt in code, with hreflang tags for each locale.
  - **Editing.** Your team gets visual editing in the CMS, such as Sanity's Presentation tool or Storyblok's Visual Editor, and pages built from approved sections. We design this part with the people who will use it every day.
- Close: Webflow's own code export leaves out CMS content, working forms and secondary languages, so we treat it as a reference. The [guide](/guides/webflow-vs-custom-code) lists what it includes.

### 7. SEO, AEO and speed are part of the build.
> Component: the "SEO and AI search readiness are part of the build." section (4 bold items + tags).
- Tags: Server-side rendering · Structured data · Core Web Vitals · AI crawlers

- H2: SEO, AEO and speed are part of the build.
- Intro: A custom-coded site has no SEO settings until someone builds them, so we build them into every template before the first page goes in.
- Items:
  - **Server-rendered HTML.** Content arrives in the HTML through server-side rendering or static site generation, not through client-side rendering alone. That way AI crawlers that don't run JavaScript still see the whole page.
  - **Metadata in the CMS.** Titles, descriptions, Open Graph images and canonicals as fields with sensible defaults, so editors can change them without a developer.
  - **Structured data from content.** Organization, Article and SoftwareApplication markup generated from CMS fields, then checked in Google's Rich Results Test and the Schema Markup Validator.
  - **Performance optimization.** A speed budget for images, fonts, scripts and other static assets, with lab tests for the Core Web Vitals on every build to catch slowdowns before they ship.
- Close: If you also want help getting cited in AI answers, our [AEO and GEO](/aeo-agency) service picks up from there.
> If `/aeo-agency` isn't live when this page ships, render "AEO and GEO" as plain text and list it in the report.

### 8. Handoff, updates and support after launch.
> Component: the "Training, handoff, and support after launch." section (H2, intro, 4-item list, icon labels).

- H2: Handoff, updates and support after launch.
- Intro: You own the result: the code, the CMS project, the hosting account and the domain. What a coded site needs after launch is regular upkeep.
- Items:
  - **Editor training.** Live sessions and short written guides for each page type and block.
  - **Documentation.** How the site is built, how to add a page type and how to deploy, kept in the repository.
  - **Security and dependency updates.** Frameworks need patching. After the critical React Server Components flaw of December 2025, affected Next.js sites had to upgrade immediately. We watch the advisories and apply security and dependency updates as part of ongoing support.
  - **Ongoing support.** New pages, changes and fixes through [ongoing website support](/ongoing-website-support).

### 9. Work grid
> Show custom-coded projects first if `/work` can filter or tag them (facts sheet item S8); otherwise the default grid.

- Eyebrow: Our Work
- H2: B2B SaaS sites we've launched.
- Sub-line: 6+ years of experience and 100+ launches speak for themselves.
- Button: "View All 100+ Projects" → `/work`

### 10. When you don't need a headless CMS.
> Component: the "When staying on WordPress is the better call." section.

- H2: When you don't need a headless CMS.
- Intro: A headless architecture usually costs more to run than a Webflow site, and we'd rather say so before you start. Skip it if one of these fits.
- Items:
  - **There's no one to maintain it.** A coded site needs someone to update packages and apply security fixes. If that's no one, and you don't want an agency on call, stay on a managed platform.
  - **Your marketers design new layouts often.** The Webflow Designer gives them more layout freedom than the headless editors we build with.
  - **You need one feature, not a new stack.** A Webflow Cloud app or a React code component adds it to the site you already have.
- Close: In those cases we'll recommend Webflow and build it there, through [Webflow migration](/webflow-migration) or [Webflow Enterprise](/webflow-enterprise-agency). Our [guide](/guides/webflow-vs-custom-code) covers the other reasons to stay.

### 11. Services cards
> Shared component. No new copy.

### 12. CTA band
- H2: Not sure you need headless? Ask before you rebuild.
- Body: Send us your URL and tell us what's slowing your team down. We'll say whether a headless build, a Webflow add-on or no change fits best, and why.
- Buttons: "Get in Touch" · "See Pricing" → `/pricing`

### 13. FAQ
- H2: Headless CMS agency FAQs.

**Q: What is a headless CMS?**
A: A content management system that stores content and delivers it through an API, without controlling the presentation layer. Your website's front end, built in code, requests the content and renders the pages, and the same content can feed docs, mobile apps or other channels. Contentful, Strapi, Sanity, Storyblok and Payload are common headless CMS platforms.

**Q: What's the difference between a headless CMS and a traditional CMS?**
A: A traditional CMS, such as WordPress, stores content and renders the pages in one system, usually with themes and plugins. A headless CMS only handles content management, and a separate presentation layer, your front end, builds the pages. Your developers choose the framework and control performance and design, but you build things a traditional CMS includes, such as previews, SEO fields and redirects. You'll also see the term decoupled CMS, which usually means a CMS that keeps its own front end but can also deliver content through an API.

**Q: What does a headless CMS agency do?**
A: It plans the content model, builds the front end, connects the two, migrates your content and trains your editors. A good one also tells you when you don't need headless at all. We build in Webflow as well, so we don't need to sell you either option.

**Q: How do we choose a headless CMS agency?**
A: Ask how they'd model your content and how your editors would work in it day to day. Ask who builds and reviews the code, how they move content and redirects, and who patches the site after launch. Ask for a live site they built that you can test. Then ask what they'd recommend if you didn't move at all.

**Q: Which headless CMS should we choose?**
A: There's no single best headless CMS, and we work with all the common ones. We start with the people who'll use it: how often they publish, whether they build new pages or fill templates, how many languages they work in, and what the content has to connect to. Then we compare the editing experience, hosting and pricing of two or three candidates and recommend one in the strategy plan. Our [guide](/guides/webflow-vs-custom-code) compares the common options.

**Q: Do you build in Next.js, Astro or other frameworks?**
A: Any framework your team prefers. For most marketing sites we suggest Astro, because it sends no JavaScript unless a component needs it, and it's what our own site runs on. Next.js fits sites that behave more like a web application, with logged-in areas or a lot of server logic. We also build in Nuxt or SvelteKit when your engineers already work in Vue or Svelte. All of them support server-side rendering and static site generation, so the content is in the HTML for search engines and AI crawlers.

**Q: Can our marketing team edit pages without developers?**
A: Yes, within the blocks we build. Content teams manage content on their own: they create and publish pages, change copy, images and metadata, and preview the result before it goes live. New layouts and new block types need a developer, which is the main difference from Webflow's Designer.

**Q: Can you migrate our Webflow site to Next.js without losing traffic?**
A: We plan the move to protect it: we benchmark every URL, keep URLs where we can, redirect the rest, rebuild metadata and structured data in the templates, and test the staging site against the live one before launch. No one can guarantee rankings through a move, and Google says rankings may fluctuate for a while. Our [guide](/guides/webflow-vs-custom-code) lists the eight steps we follow.

**Q: Can we keep Webflow as our CMS and build the front end in code?**
A: Yes. We can build a coded front end on top of your Webflow CMS, so editors keep working where they are. Our [Webflow vs custom code guide](/guides/webflow-vs-custom-code) covers the limits. If most new work is moving to code, a headless CMS built for the job is usually the better long-term choice.

**Q: What are the benefits of a headless CMS?**
A: Content reuse across multiple channels, because one source of structured content can feed your website, docs and product, or multiple websites at once. Frontend flexibility, because developers choose the framework. Speed and scale, because pages can be built ahead of time and served from a CDN, which absorbs traffic spikes and leaves less to attack. And an engineering workflow with code review and previews. They only pay off if someone owns the code.

**Q: What are the downsides of a headless CMS?**
A: More moving parts. In a headless architecture you run hosting, a CMS and a front end, and someone has to keep the framework patched. Editors get less layout freedom than in a visual builder or a traditional CMS, and features a platform includes, such as form handling, previews and redirects, have to be built. For a small marketing site, it rarely pays to use a headless CMS.

**Q: How much does headless CMS development cost, and how long does it take?**
A: We quote a fixed price for each build, based on the number of pages and how complex they are: the templates, the content model, the integrations and the languages. A page built from an existing template costs less than a one-off layout. We set the project timeline in the strategy plan, once the content model and the URL map are done. Ongoing changes, support and security updates run through [ongoing website support](/ongoing-website-support).

**Q: Who hosts the site and handles security updates?**
A: You choose the host, often Vercel, Netlify or Cloudflare, and the account is in your name. We set it up, and through ongoing support we keep the framework and its dependencies patched. If you have your own development team, we hand the repository to them with documentation instead.

### 14. Related pages
- [Webflow vs custom code](/guides/webflow-vs-custom-code)
- [Webflow migration](/webflow-migration)
- [Ongoing website support](/ongoing-website-support)

### 15. Contact form and testimonial
> Shared component. No new copy.

## Internal links

- Out: `/guides/webflow-vs-custom-code` (sections 4, 6, 10, 13 and 14), `/custom-websites-migrations`, `/webflow-migration`, `/webflow-enterprise-agency`, `/ongoing-website-support`, `/aeo-agency` (only if live), `/work`, `/pricing`.
- Into this page (add during the build):
  - from `/custom-websites-migrations`, step 03 "Website development" (the step that lists "Custom development"): "Building in code? See [headless CMS development](/headless-cms-agency)."
  - from `/guides/webflow-vs-custom-code` (already in its copy: sections 14 and 19);
  - if the earlier `seo/next-pages` branch is merged: on `/website-redesign`, section 5, link the words "custom code" in "The right platform." to `/headless-cms-agency`; on `/cybersecurity-web-design`, FAQ "Do you work with security companies that aren't on Webflow?", link the words "custom-coded sites".

## Sources (tier B)

| Claim on the page | Source | Checked |
|---|---|---|
| Astro ships no JavaScript by default ("Zero JS, by default"); designed for content-rich websites | https://docs.astro.build/en/concepts/why-astro/ | 9 Oct 2026 |
| Next.js, Astro, Nuxt and SvelteKit all render on the server and prerender at build time (framework FAQ) | Astro: "By default, Astro pages, routes, and API endpoints will be pre-rendered at build time as static pages" and can render on demand, https://docs.astro.build/en/guides/on-demand-rendering/ ; Nuxt Rendering Modes (universal rendering; "Prerenders routes at build time"), https://nuxt.com/docs/guide/concepts/rendering ; SvelteKit: "By default, SvelteKit will render (or prerender) any component first on the server", https://svelte.dev/docs/kit/page-options ; Next.js prerendering, https://nextjs.org/docs/app/getting-started/caching | 10 Oct 2026 |
| Next.js prerenders a static shell served from a CDN and renders per request where needed | https://nextjs.org/docs/app/getting-started/caching (Prerendering, Next.js 16.4 docs) | 9 Oct 2026 |
| Sanity Presentation tool: front end inside the Studio with click-to-edit | https://www.sanity.io/docs/visual-editing/presentation-tool | 9 Oct 2026 |
| Storyblok Visual Editor: click a block to scroll to it in the preview | https://www.storyblok.com/docs/concepts/visual-editor | 9 Oct 2026 |
| Payload is an open-source headless CMS built into a Next.js app | https://payloadcms.com/ | 9 Oct 2026 |
| Keep redirects "as long as possible, generally at least 1 year"; "you may experience ranking fluctuations" during a move | https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes | 9 Oct 2026 |
| AI crawlers that don't run JavaScript (Webflow: "non-Gemini AI crawlers don't yet render Javascript") | Webflow blog, "The technical side of AEO", updated 30 Sep 2026: https://webflow.com/blog/technical-aeo-for-ai-discovery | 9 Oct 2026 |
| Webflow code export leaves out CMS content, working forms and localized content | https://help.webflow.com/hc/en-us/articles/33961386739347 | 9 Oct 2026 |
| Webflow Data API for Collections; rate limits | https://developers.webflow.com/data/reference/rate-limits | 9 Oct 2026 |
| Webflow Cloud apps and React code components as ways to add code to a Webflow site | https://webflow.com/feature/cloud ; https://help.webflow.com/hc/en-us/articles/44650867960595 | 9 Oct 2026 |
| React Server Components flaw (CVE-2025-55182 / CVE-2025-66478), December 2025, CVSS 10.0; Next.js: "All users should upgrade to a patched version immediately" | https://nextjs.org/blog/CVE-2025-66478 | 9 Oct 2026 |
| Google's Rich Results Test and the Schema Markup Validator; FAQ rich results no longer appear in Google Search from 7 May 2026 (documentation removed 15 Jun 2026), so FAQ markup isn't named here | https://search.google.com/test/rich-results ; https://validator.schema.org/ ; https://developers.google.com/search/updates | 9 Oct 2026 |

## Already on benormedia.com (tier A, reused)

"Webflow Professional Partner" and "6+ years as a Webflow Professional Partner" (home page and footer); "6+ years of experience and 100+ launches speak for themselves." and "View All 100+ Projects" (home page work grid); the nine-step build process on `/custom-websites-migrations` (01 Website strategy plan, 02 Component library build, 03 Website development with "Custom development" and "Custom API integrations", 04 Content migration, 05 SEO & AEO readiness, 06 Global & secure, 07 Integrations & analytics, 08 QA & launch, 09 Training & handoff); "Get in Touch" and "See Pricing". The live site's metadata names Astro as its generator and its images load from Sanity's CDN, which supports the proof line, but the site doesn't say so in its copy yet (facts sheet item S7).

## Statements a person must confirm (review sheet seeds)

1. S1, answered 10 Oct 2026: BenorMedia builds in any framework. The copy names widely searched frameworks and CMSs from the keyword research. Still to confirm in the review sheet: "We work with any headless CMS" (section 3) and "we work with all the common ones" (FAQ), since Sergio's answer named frameworks; the FAQ's advice (Astro for most marketing sites, Next.js for app-like sites, Nuxt or SvelteKit for Vue or Svelte teams); and the hosts named (Vercel, Netlify, Cloudflare).
2. S2: "Most of the B2B sites we build are in Webflow" (section 4), consistent with the FAQ on `/website-redesign`.
3. S3: the process claims in section 5: TypeScript, a preview build for every change, migration scripts followed by a check of every page by hand, the staging crawl compared with the live site, and the repository and every account in the client's name. Also the CMS selection process in the FAQ "Which headless CMS should we choose?" (two or three candidates compared, one recommended in the strategy plan).
4. S4, answered 10 Oct 2026: yes, ongoing support covers security and dependency updates on custom-coded sites (section 8 and the FAQ "Who hosts the site and handles security updates?").
5. S5, answered 10 Oct 2026: custom builds are fixed-price, based on the number of pages and their complexity (cost FAQ). The FAQ sends upkeep to `/ongoing-website-support` rather than `/pricing`, because `/pricing` only describes Webflow work today.
6. S6: the CTA promise, "We'll say whether a headless build, a Webflow add-on or no change fits best, and why", and the hero line "so we start by checking it's worth it".
7. S7, answered 10 Oct 2026: BenorMedia is happy to say publicly that its own site runs on Astro and Sanity (hero proof line, the framework FAQ and the guide's callout).
8. S8: which projects the work grid shows, and whether any custom-coded or headless client project can be named. The page is much stronger with one. The grid's H2 stays neutral ("B2B SaaS sites we've launched.") so "100+ launches" doesn't read as 100+ headless launches.
9. S9: "We build in Webflow as well, so we don't need to sell you either option" (FAQ) and "We design this part with the people who will use it every day" (section 6).
10. S10: editor training as live sessions plus written guides, documentation kept in the repository, and a speed budget checked on every build.
11. W4 (from the guide's facts sheet): Webflow's partner terms allow this page too. It sells moves off Webflow (section 6) and says BenorMedia's own site runs on Astro and Sanity.
