---
slug: webflow-vs-custom-code
url: /guides/webflow-vs-custom-code
lang: en-US
pageType: guide
wave: 1
draft: false
blockedBy: []
thirdPartyPrices: true
title: "Webflow vs Custom Code: When to Leave Webflow | BenorMedia"
description: "Should you move from Webflow to Next.js, Astro or a headless CMS? What you gain, what you give up, what the code export leaves out, and when to stay."
h1: "Webflow vs custom code: when to move off Webflow, and when to stay"
primaryKeyword: webflow vs custom code
secondaryKeywords: [webflow export code, webflow code export, webflow to react, webflow vs react, webflow to nextjs, webflow alternatives, is webflow worth it, webflow headless cms, webflow cms api, headless cms migration]
targetCountry: US
author: "Sergio Gancedo, Managing Director, BenorMedia"
publishedAt: 2026-10-12
updatedAt: 2026-10-12
reviewEvery: 30
breadcrumb:
  - name: Home
    url: /
  - name: Webflow vs custom code
    url: /guides/webflow-vs-custom-code
schema: [Article, FAQPage, BreadcrumbList]
faqHeading: Questions about moving from Webflow to custom code
faq:
  - q: Can you convert Webflow to React or Next.js?
    a: "Not automatically. Code export gives you static HTML, CSS and JavaScript, and DevLink Export turns Webflow components into React components, with gaps for CMS-bound content and page-level interactions. A working Next.js site or React app still means rebuilding the templates, the content model and the integrations, with the export as a reference."
  - q: How do you get your CMS content out of Webflow?
    a: "Export each Collection as a CSV file from the Designer, or read it through the Webflow Data API if you have many Collections or need repeat syncs. Image and file fields arrive as URLs, so download the files themselves before the project is deleted."
  - q: Is Webflow worth it in 2026?
    a: "For a marketing site your marketers run, usually yes. One bill covers hosting, security, a visual editor and the SEO settings, and the 2026 plan changes raised some prices while lowering others. It's worth less when the site needs app features, data from other systems or an engineering workflow, which is where custom code earns its upkeep."
  - q: Is custom code better for SEO than Webflow?
    a: "Not by itself. Webflow handles the technical basics well. A coded site can match it or beat it on speed and gives you full control over URLs, canonicals and structured data, but every one of those has to be built and tested. Most ranking problems after a move come from missing redirects, dropped metadata or pages that render without their content, and all three can be caught before launch."
  - q: How long does a move from Webflow to Next.js take?
    a: "Templates, content and integrations decide it more than page count. Vellum moved its site in about a week with coding agents, while its CTO moved the content into Sanity over a weekend. A site with many templates, languages and integrations takes longer, because the content model, the redirect map and QA still need people to check them."
  - q: Can you use Webflow as a headless CMS?
    a: "Yes. The Webflow Data API, often called the CMS API, exposes your Collections, so a Next.js or Astro front end can render content your team still edits in Webflow. Plan around the rate limits, 60 to 120 requests a minute depending on the plan, by fetching at build time or caching responses. It suits structured content such as blog posts better than landing pages, because the Designer no longer controls the layout."
  - q: What is the CMS item limit in Webflow?
    a: "The Premium plan, which replaced the CMS and Business plans in 2026, holds 20,000 CMS items. The Team plan raises the number of Collections to 100. Separately, a Collection list on a page shows 100 items by default, so long lists need pagination. If you expect to pass those numbers, plan the content model before you pick a platform."
  - q: Should a startup build its website in Webflow or in code?
    a: "Most early-stage startups are better off in Webflow, because marketers can ship pages without pulling engineers off the product. Code makes sense early when the website is part of the product, such as a developer tool whose docs, changelog and marketing pages share one codebase. It also makes sense when your engineers want to own the site and have time for it."
  - q: What are the main alternatives to Webflow?
    a: "Other visual website builders, such as Framer, or WordPress with a page builder, if you want to keep designing visually. Custom code, usually Next.js or Astro with a headless CMS such as Sanity, Storyblok or Payload, if you want control and engineering ownership. Choose by who will run the site day to day, then by features."
  - q: What happens to Webflow forms and site search after a move?
    a: "Both stop working once the site leaves Webflow's hosting. Forms need a backend, such as an API route that sends submissions to your CRM, or the CRM's own embedded forms. Search needs a hosted search service or search built into the site. List every form and where its submissions go before the build starts."
takeaways:
  - "**Most B2B marketing sites don't need custom code.** The case for moving is strongest when the site needs product data, logged-in features or an engineering workflow."
  - "**More sites leave Webflow for Next.js than the reverse.** In a July 2026 crawl, 988 domains had swapped Webflow for Next.js in about five weeks, against 95 that moved the other way."
  - "**Webflow's code export is a static snapshot.** It leaves out the CMS, working forms, site search, password protection and every language except the primary one."
  - "**Leaving means running what Webflow ran.** Hosting, security patches, forms, sitemaps, redirects and the visual editor become yours to manage, or your agency's."
  - "**Keep your URLs.** If every address stays the same, Google's guidance for a hosting change applies, and there's no redirect map to build."
related: [headless-cms-agency, webflow-enterprise]
inbound:
  - from: /guides/webflow-enterprise
    anchor: Webflow vs custom code
    where: "end of \"When is Webflow not the right fit for an enterprise site?\", one sentence: Weighing a move to code? See Webflow vs custom code."
  - from: /headless-cms-agency
    anchor: Webflow vs custom code
    where: already in its copy
sources:
  - label: "TechnologyChecker, Webflow to Next.js Migration: The Complete 2026 Guide, July 2, 2026"
    url: https://technologychecker.io/blog/webflow-to-nextjs
    accessed: 2026-10-09
  - label: "Webflow Help Center, Updated pricing and simplified plans for May 2026, updated August 31, 2026"
    url: https://help.webflow.com/hc/en-us/articles/51059955082387
    accessed: 2026-10-09
  - label: "Webflow Help Center, How do I export my Webflow site code?, updated October 31, 2025"
    url: https://help.webflow.com/hc/en-us/articles/33961386739347
    accessed: 2026-10-09
  - label: "Webflow Help Center, How do I import content into the Webflow CMS?"
    url: https://help.webflow.com/hc/en-us/articles/33961290794771
    accessed: 2026-10-12
  - label: "Webflow Developers, Rate limits"
    url: https://developers.webflow.com/data/reference/rate-limits
    accessed: 2026-10-09
  - label: "Webflow Help Center, Export components with DevLink Export"
    url: https://help.webflow.com/hc/en-us/articles/44746282129427-Component-export-using-DevLink
    accessed: 2026-10-09
  - label: "Webflow Help Center, Code components, updated April 30, 2026"
    url: https://help.webflow.com/hc/en-us/articles/44650867960595
    accessed: 2026-10-09
  - label: "Webflow Blog, Webflow Cloud. One workspace for your site and your app. Or just the app., updated June 16, 2026"
    url: https://webflow.com/blog/cloud-apps-without-sites
    accessed: 2026-10-09
  - label: "Webflow, Webflow Cloud"
    url: https://webflow.com/feature/cloud
    accessed: 2026-10-09
  - label: "Webflow Developers, Webflow MCP server overview"
    url: https://developers.webflow.com/mcp/reference/overview
    accessed: 2026-10-09
  - label: "Webflow, Security"
    url: https://webflow.com/security
    accessed: 2026-10-09
  - label: "Webflow Help Center, Dynamic content limits"
    url: https://help.webflow.com/hc/en-us/articles/33961370432275-Dynamic-content-limits
    accessed: 2026-10-09
  - label: "Webflow Help Center, Structure and style Collection pages"
    url: https://help.webflow.com/hc/en-us/articles/33961277976467-Structure-and-style-Collection-pages
    accessed: 2026-10-09
  - label: "Webflow Help Center, Import/export 301 redirects"
    url: https://help.webflow.com/hc/en-us/articles/33961211526291-Import-export-301-redirects
    accessed: 2026-10-09
  - label: "Webflow Blog, The technical side of AEO: Structuring your site for AI discovery, updated September 30, 2026"
    url: https://webflow.com/blog/technical-aeo-for-ai-discovery
    accessed: 2026-10-09
  - label: "Anita Kirkovska, Vellum, How I migrated off of Webflow in one week with coding agents, May 12, 2026"
    url: https://www.vellum.ai/blog/how-i-migrated-off-webflow-with-coding-agents
    accessed: 2026-10-09
  - label: "Stack Overflow, 2025 Developer Survey: AI"
    url: https://survey.stackoverflow.co/2025/ai
    accessed: 2026-10-09
  - label: "Next.js, Security Advisory: CVE-2025-66478, December 3, 2025"
    url: https://nextjs.org/blog/CVE-2025-66478
    accessed: 2026-10-09
  - label: "OSV, CVE-2025-29927: Authorization Bypass in Next.js Middleware, March 21, 2025"
    url: https://osv.dev/CVE-2025-29927
    accessed: 2026-10-09
  - label: "Astro Docs, Why Astro?"
    url: https://docs.astro.build/en/concepts/why-astro/
    accessed: 2026-10-09
  - label: "Sanity Docs, Configuring the Presentation Tool"
    url: https://www.sanity.io/docs/visual-editing/presentation-tool
    accessed: 2026-10-09
  - label: "Storyblok Docs, Manage the Visual Editor"
    url: https://www.storyblok.com/docs/concepts/visual-editor
    accessed: 2026-10-09
  - label: "Payload Docs, Live Preview"
    url: https://payloadcms.com/docs/live-preview/overview
    accessed: 2026-10-09
  - label: "Payload, home page"
    url: https://payloadcms.com/
    accessed: 2026-10-09
  - label: "Payload Docs, Production deployment"
    url: https://payloadcms.com/docs/production/deployment
    accessed: 2026-10-12
  - label: "Google Search Central, Site moves with URL changes"
    url: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
    accessed: 2026-10-09
  - label: "Google Search Central, Changing your hosting"
    url: https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes
    accessed: 2026-10-09
volatile:
  - claim: "Webflow plan changes: new Site plans from May 13, 2026; existing sites at renewal from June 29; Freelancer and Agency Workspace sites and legacy discounts from November 16, 2026; Premium holds 20,000 CMS items; Business bandwidth 50 GB"
    source: https://help.webflow.com/hc/en-us/articles/51059955082387
    recheck: open the plan article and confirm the dates, the Premium item limit and the bandwidth figure
  - claim: "Webflow code export: paid Workspace plans only; leaves out CMS content, form processing, site search, password protection, Ecommerce, User Accounts, code components and secondary locales"
    source: https://help.webflow.com/hc/en-us/articles/33961386739347
    recheck: open the export article and confirm each row of the export table
  - claim: "Webflow Data API rate limits: 60 to 120 requests a minute depending on the plan; cached content delivery requests have effectively no rate limits"
    source: https://developers.webflow.com/data/reference/rate-limits
    recheck: open the rate-limit page and confirm the figures and the plan names (it still lists pre-2026 plans)
  - claim: "TechnologyChecker: 988 domains from Webflow to Next.js in about five weeks, 95 the other way; 249,194 active Webflow domains; 570,205 on Next.js; 32.8% of movers in software, IT services or technology"
    source: https://technologychecker.io/blog/webflow-to-nextjs
    recheck: open the article and confirm the Next.js figures (it was revised after July 2 without a new date)
  - claim: "Payload is self-hosted"
    source: https://payloadcms.com/docs/production/deployment
    recheck: open the deployment docs and confirm Payload is still self-hosted
  - claim: "Webflow Cloud runs Next.js and Astro apps on Cloudflare Workers, with or without a Webflow site, with SQLite, key-value and object storage"
    source: https://webflow.com/blog/cloud-apps-without-sites
    recheck: open the Webflow Cloud pages and confirm the frameworks, hosting and storage
  - claim: "Vellum says it saves about 30,000 dollars a year on its Webflow bill (third-party figure, May 12, 2026)"
    source: https://www.vellum.ai/blog/how-i-migrated-off-webflow-with-coding-agents
    recheck: open Vellum's write-up and confirm the figure
volatileChecked: 2026-10-09
editorNotes:
  - "Copy from docs/content/guide-webflow-vs-custom-code.md (draft v3, 2026-10-10), word for word. Review sheet: docs/review-guide-webflow-vs-custom-code.md."
  - "The section 10 callout is a plain paragraph: the guide template has no callout block (the content note allows this)."
  - "Sources: the Payload entry (three links) is split into three entries, so the list has 27 entries; the template adds the access date."
  - "Related cards show each page's H1, as on the live guides, not the content file's card wording."
  - "Visuals to make: the three-column header visual (stay, add code, move) and the optional two-bar visual in section 5. The header keeps the template default."
visuals:
  - after: How do you move off Webflow without losing rankings?
    type: diagram
    brief: "The eight steps of a move off Webflow: Benchmark, Export everything, Map URLs, Rebuild the SEO basics, Move the files, Test on staging, Launch, Monitor. Text outside the image."
    alt: "The eight steps of a move off Webflow, from benchmarking to monitoring"
  - after: Why are teams moving off Webflow in 2026?
    type: diagram
    brief: "Two bars, \"Webflow to Next.js: 988\" and \"Next.js to Webflow: 95\", with \"TechnologyChecker, crawl published July 2, 2026\" under them. Text outside the image."
    alt: "Two bars: 988 domains moved from Webflow to Next.js and 95 from Next.js to Webflow, TechnologyChecker, July 2026"
---

Stay on Webflow if your marketing team runs the website and it does its job. Move to custom code, usually Next.js or Astro with a headless CMS, when the site has to work like part of your product, or when your engineers want it in their own repo. In between, Webflow Cloud, code components and the Webflow Data API let you add code without leaving.

## Should you move from Webflow to custom code?

Usually not, and the reason is who runs the website. Webflow is a visual website builder: marketers design, build and publish pages without a developer. A custom-coded site moves that work into a code repository. Developers make the changes there, or marketers do it with coding agents and a developer checking the result. That trade pays off for some sites and costs others a lot of speed. These signals show which side you're on.

Table: Signals that point to staying on Webflow, adding code to it, or moving

| Signal | Points to | Why |
|---|---|---|
| Marketers build and publish new pages every week | Stay on Webflow | That's what the Designer is for. A coded site only matches it if you rebuild the editing experience. |
| The site is marketing pages, a blog and some landing pages | Stay on Webflow | You're far from the limits: the Premium plan holds 20,000 CMS items. |
| You need one specific app-like feature, such as a calculator or a gated tool | Add code to Webflow | A Webflow Cloud app or a code component covers it without moving the whole site. |
| You want pages generated from product, integration or docs data | Add code, or move | Webflow pages come from its own CMS, so outside data has to be synced in first. A coded front end reads the source directly. |
| Engineers want the site in the same repo and review flow as the product | Move | Pull requests, preview builds and rollbacks work the way they already do for the product. |
| You need logins, personalization or pricing logic tied to your product | Move | These need server code and your own data. In Webflow they end up as embeds and workarounds. |
| Your main reason is the Webflow bill | Do the sum first | Hosting, a headless CMS, form and search services and developer time cost money too. |

Two or more signals in the "Move" rows deserve a closer look. A single one usually has a middle path, covered further down.

## Why are teams moving off Webflow in 2026?

Most Webflow sites aren't going anywhere, but the movement that exists runs mostly one way. In its July 2026 crawl, [TechnologyChecker](https://technologychecker.io/blog/webflow-to-nextjs) counted 988 domains that had dropped Webflow for Next.js in about five weeks, and 95 that went the other way. That's a small share of the 249,194 domains it found on Webflow, but it's roughly ten to one. Software, IT services and technology or internet companies made up 32.8% of the movers. Four reasons stand out.

- **AI tools made code cheaper to change.** In [Stack Overflow's 2025 survey](https://survey.stackoverflow.co/2025/ai), 84% of respondents used or planned to use AI tools in development, and 51% of professional developers used them every day. The AI startup Vellum [moved its site off Webflow](https://www.vellum.ai/blog/how-i-migrated-off-webflow-with-coding-agents) in about a week with coding agents. A showcase page that used to take its team a week now takes half a day.
- **The website became part of the product.** Integration directories, template galleries, docs and calculators all run on product data. Engineers would rather build them in the codebase they already maintain.
- **Webflow changed its plans.** [New Site plans](https://help.webflow.com/hc/en-us/articles/51059955082387) applied to new purchases from May 13, 2026, and to most existing sites at renewal from June 29. Basic costs more, CMS and Business merged into one Premium plan, and former Business sites pay less but get 50 GB of bandwidth instead of 100 GB. Sites in Freelancer and Agency Workspaces, and sites on legacy discounts from 2022 or earlier, switch from November 16, 2026.
- **Ownership.** Code in your own repository runs on any host you choose. A Webflow site leaves as a static export plus CSV files, as the export section below shows.

None of this makes Webflow the wrong choice for most marketing sites. It keeps adding ways to work with code and AI: its [MCP server](https://developers.webflow.com/mcp/reference/overview) lets tools such as Claude Code, ChatGPT and Cursor create pages and work with CMS content inside a Webflow project.

## What does custom code give you that Webflow doesn't?

By custom code we mean a site built in a framework such as Next.js or Astro, with content in a headless CMS such as Sanity, Storyblok or Payload, deployed from your own Git repository. Here's what that setup gives you that Webflow can't, or can only in part.

- **Pages from any data.** Templates can read your product database, docs, changelog or pricing rules directly, for example to generate one page per integration. Nothing has to be copied into a CMS first.
- **No platform ceilings.** Webflow's Premium plan holds 20,000 CMS items, and every CMS item page sits under its [Collection's path](https://help.webflow.com/hc/en-us/articles/33961277976467-Structure-and-style-Collection-pages), such as /blog/post-name. In code, URL patterns and page counts are design decisions.
- **Your engineering workflow.** Pull requests, code review, a preview build for every change, automated tests and rollbacks to any earlier version.
- **Performance control.** You decide which scripts, CSS files and fonts each page loads. Astro sends [zero JavaScript by default](https://docs.astro.build/en/concepts/why-astro/) and adds it only to the components that need it.
- **Room for product features.** Logins, gated content, search across your docs, personalization and anything else that needs server code.
- **Portability.** The code and the content are yours. You can change host or agency without starting over, and swap the CMS without redesigning the site.

Each of these is also something your team now builds, hosts and keeps up to date.

## What do you give up when you leave Webflow?

Mostly the work Webflow does in the background. Vellum's write-up lists the work that became its team's job: robots.txt, the sitemap, 301 redirects, metadata and Open Graph tags, canonical URLs, structured data, image optimization, analytics events, forms and a staging setup. Even with that checklist, it had a few canonical issues on launch day and caught broken social images on a few pages during the migration. The table shows what Webflow runs today and what replaces it.

Table: What Webflow runs for you, and what replaces it after a move

| What Webflow runs | What you need after a move |
|---|---|
| Hosting, SSL and a CDN with DDoS protection | A hosting provider such as Vercel, Netlify or Cloudflare, set up and billed separately |
| Platform security, with SOC 2 Type II and ISO 27001 listed on its [security page](https://webflow.com/security) | Patching your framework and every dependency yourself |
| Visual page building in the Designer | A headless CMS with live preview, and page sections a developer builds in advance |
| SEO settings: sitemaps, robots.txt, 301 redirects and canonical tags | Code or CMS fields for each one, tested before launch |
| Form handling | A form backend, or your CRM's own forms |
| Site search | A hosted search service, or search built into the site |
| Localization with Webflow Localize | Locale routing and hreflang in code, and translated content in the CMS |
| Staging and publishing | Preview deployments, and your own rules on who can publish |

Security is the one teams underestimate. On your own Next.js site, patching is your job. In March 2025, Next.js fixed a [middleware flaw](https://osv.dev/CVE-2025-29927) that let attackers skip authorization checks, rated 9.1 out of 10. In December 2025, a [flaw in React Server Components](https://nextjs.org/blog/CVE-2025-66478), rated 10.0, allowed remote code execution. Affected App Router sites had to upgrade and redeploy, and Next.js recommended rotating every application secret afterwards. Someone has to watch for advisories like these and act within days.

Editing is the other trade. Headless CMSs have narrowed the gap. Sanity's [Presentation tool](https://www.sanity.io/docs/visual-editing/presentation-tool) shows a live preview of your site inside the CMS, with click-to-edit. Storyblok's [Visual Editor](https://www.storyblok.com/docs/concepts/visual-editor) jumps from a content block to its place on the page, and Payload's [Live Preview](https://payloadcms.com/docs/live-preview/overview) updates the page as you type. What none of them gives marketers is the Designer's design freedom: the power to create a new layout on their own. Editors assemble pages from sections a developer built first.

## Can you just export your Webflow code?

You can export it, but the export won't run your site. [Webflow's code export](https://help.webflow.com/hc/en-us/articles/33961386739347) gives you the HTML pages, a CSS folder with three stylesheets, the JavaScript files and an images folder. Only paid Workspace plans can export; Site plans can't. You don't need to keep a Webflow plan, or credit Webflow, to host the files somewhere else.

Table: What the Webflow code export includes and leaves out

| Part of your site | In the export? |
|---|---|
| Static pages, styles, images and interactions | Yes, as HTML, CSS, JavaScript and image files |
| CMS content | No. Collection lists show their empty state |
| Forms, including file uploads and reCAPTCHA | They don't work: form processing isn't included |
| Site search | Stops working |
| Password-protected pages | Exported, but no longer protected |
| Ecommerce and User Accounts | No |
| Code components | No |
| Localized pages and content | No. Only the primary locale is exported |

CMS content comes out separately. Each Collection exports [as a CSV file](https://help.webflow.com/hc/en-us/articles/33961290794771) from the Designer, with image and file fields as URLs, so download those files before you delete the Webflow project. For many Collections, the [Webflow Data API](https://developers.webflow.com/data/reference/rate-limits) reads the items in code, at 60 to 120 requests a minute depending on the plan. If you want a React app out of Webflow, [DevLink Export](https://help.webflow.com/hc/en-us/articles/44746282129427-Component-export-using-DevLink) pulls Webflow components into a React codebase, though components bound to CMS content don't export fully and page-level interactions stay behind. All of it is raw material for a rebuild. None of it is a migration on its own.

## Is there a middle path between Webflow and custom code?

Yes, three of them.

- **Webflow Cloud.** It deploys full-stack Next.js and Astro apps on Webflow's hosting, which runs on Cloudflare Workers. An app can sit next to your Webflow site or [run without one](https://webflow.com/blog/cloud-apps-without-sites) on its own domain, and it gets SQLite, key-value and object storage. Good for a calculator, a customer tool or a gated area, while the marketing pages stay in the Designer.
- **Code components.** Developers build [React components](https://help.webflow.com/hc/en-us/articles/44650867960595) in their own codebase and share them to Webflow, where designers place and configure them like any other component. React only, and changes to the component itself go through code.
- **Webflow as a headless CMS.** Your team keeps editing content in Webflow, and a coded front end renders it through the Webflow Data API. Webflow says cached requests to its content delivery API have effectively no rate limits, while uncached ones count against your plan's limit.

A middle path works while code is a small part of the site. Once most new work happens in code, two systems cost more than one, and a full move is cleaner.

## Next.js, Astro or something else: which stack do teams move to?

Next.js is the usual pick. TechnologyChecker found 570,205 active domains on it, more than twice its Webflow count, and coding agents know it well, which matters if you plan to change the site with them. Vellum chose it partly for that reason: in its words, "the AI tools know it cold." Astro is the other common choice for marketing sites. The CMS matters as much as the framework, because it decides how your marketers work.

Table: Common choices for a site that leaves Webflow

| Option | Good fit when | Watch out for |
|---|---|---|
| Next.js | The site needs app features: logins, personalization, server logic, many dynamic pages | More server code to patch and monitor |
| Astro | Content-heavy marketing sites, docs and blogs where page speed comes first | App-heavy features take more work; interactive parts are added component by component |
| Sanity | Structured content reused across pages, with live preview for editors | The content model needs planning before the build |
| Storyblok | Marketers who want visual, block-based page building | How flexible editing feels depends on how the blocks are designed |
| Payload | Teams that want an [open-source CMS](https://payloadcms.com/) built into their Next.js app | You [host it yourself](https://payloadcms.com/docs/production/deployment), so backups and updates are on you |
| Webflow CMS, used headless | Teams that want to keep editing in Webflow | API rate limits, and the Designer no longer controls the layout |

Our own site runs on Astro, with Sanity as the CMS. We chose Astro because almost everything on our site is content, and Astro sends JavaScript only to the parts of a page that need it. We picked Sanity because it stores content as structured data rather than page layouts, so one piece of content can feed several pages. Running both ourselves also lets us test the setup we recommend, from server-rendered HTML to structured data, before we suggest it to a client.

## What does moving off Webflow cost?

There's no standard price for a headless CMS migration. The cost follows how many pages have to be designed and built, which isn't the same as how many CMS items you have, and how complex they are. Complexity comes down to these six things.

- **Templates.** A website with 300 blog posts and eight templates is cheaper to move than a 60-page site with 30 one-off layouts. Each template becomes a set of coded components and a CMS schema.
- **The editor experience.** Basic editing is quick to set up. Live preview, reusable page sections and field validation take longer, and they decide whether marketers keep publishing after launch.
- **Content.** Clean CSV exports move by script. Rich text with embeds, references between Collections and images that need a new home take manual work.
- **Integrations.** Forms to the CRM, analytics, consent, search and any product data feeds.
- **Languages.** Each locale adds routing, hreflang tags, translated content and its own QA pass.
- **Design.** Rebuilding the current design costs less than a redesign, but it isn't free. Vellum found coding agents get the structure right and miss the spacing and small interactions, and it advises budgeting more time for that than you think.

Then add the running costs: hosting, CMS seats, form and search services, monitoring, and developer time for updates and security patches. Set that against your Webflow plans and add-ons. Vellum says it saves about 30,000 dollars a year on its Webflow bill. A site on a single Basic plan won't save anything close to that, and may pay more after the move.

## How do you move off Webflow without losing rankings?

Once you're ready to move, treat it as a site move and follow Google's guidance. Keep every URL you can: if none change, Google's [hosting-change guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes) applies and there's no redirect map to build. Expect some movement either way. Google says a small to medium site [can take a few weeks](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) for most pages to move.

- **1. Benchmark.** Export Search Console and analytics data for every URL: clicks, impressions, top queries and conversions.
- **2. Export everything.** Crawl the site for a complete list of URLs, titles, meta descriptions, canonicals, Open Graph images, alt text and custom code snippets. Export Webflow's [301 redirects](https://help.webflow.com/hc/en-us/articles/33961211526291-Import-export-301-redirects) and every Collection as CSV.
- **3. Map URLs.** Keep each URL where you can. Where one has to change, map it to its new address.
- **4. Rebuild the SEO basics.** Metadata fields, canonicals, sitemaps, robots.txt, structured data and hreflang, set in templates so every new page gets them. Render content on the server, so search engines and AI answers can use it: Webflow's own [AEO guidance](https://webflow.com/blog/technical-aeo-for-ai-discovery) notes that AI crawlers other than Google's Gemini don't yet run JavaScript.
- **5. Move the files.** Download images and documents and host them with the new site or in the new CMS.
- **6. Test on staging.** Crawl the staging site and compare it with the old crawl. Check redirects, responsive layouts, forms and tracking, and keep staging out of the index.
- **7. Launch.** Lower your DNS TTL to a few hours at least a week ahead, as Google suggests. Switch DNS, remove any noindex tags or robots blocks, submit the new sitemap and check key pages with URL Inspection in Search Console.
- **8. Monitor.** Check crawl errors, indexing and rankings daily for the first weeks. If your URLs stayed the same, Googlebot often crawls less for a while after launch, which Google calls normal; if they changed, expect it to crawl more. Keep redirects for as long as possible, generally at least a year.

The same checks apply in the other direction. Our [Webflow migration services](page:webflow-migration) page covers moves onto Webflow, including from WordPress.

## When is staying on Webflow the better call?

More often than the migration stories suggest. Stick with Webflow if one of these fits.

- **Nobody will own the code.** A coded site without an engineer or an agency on call ages fast. Dependencies fall behind and security fixes wait.
- **Your marketers design pages as well as fill them.** If they create new layouts every month, a headless CMS will slow them down.
- **The website is marketing pages and a blog.** That's what Webflow is built for, and you're far from its limits.
- **The goal is a smaller bill.** Run the numbers in the cost section first. Moving to save a few dollars a month rarely survives the first invoice for developer time.
- **You need to launch soon.** A rebuild adds weeks or months of work before it saves any.

If you need more control, security reviews or governance inside Webflow, our [Webflow Enterprise guide](page:webflow-enterprise) covers what to check.

## How was this guide written and checked?

This guide draws on BenorMedia's Webflow projects and on building our own site in Astro and Sanity. We checked every outside fact against its source on October 12, 2026: Webflow's help center and developer docs, Google Search Central, the Next.js, Astro, Sanity, Storyblok and Payload docs, and the public migration data and write-ups listed below. We recheck it every 30 days. One disclosure: BenorMedia earns money on both sides of this decision. We're a Webflow Professional Partner, and we also build [custom-coded sites on a headless CMS](page:headless-cms-agency).
