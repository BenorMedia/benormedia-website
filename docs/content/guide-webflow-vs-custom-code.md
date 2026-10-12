# Page content: /guides/webflow-vs-custom-code

Status: DRAFT v3. Written 9 Oct 2026 for BenorMedia (v1 drafted, v2 revised after a Surfer pass and a fact check); v3 on 10 Oct 2026 adds the own-site callout and aligns the cost section with BenorMedia's fixed-price model. Template: the guide `/guides/webflow-enterprise` (the same template as `/guides/wordpress-to-webflow-migration`). Everything under "Visible copy" goes on the page. Lines starting with `>` are builder notes. Inline markers stay visible in the preview and block release until a person resolves them. Guide H2s are questions, as on the two live guides, so the service-page rule (H2s end with a full stop) doesn't apply here.

## SEO fields

| Field | Value |
|---|---|
| URL | `/guides/webflow-vs-custom-code` |
| Canonical | `https://www.benormedia.com/guides/webflow-vs-custom-code` |
| Title tag | `Webflow vs Custom Code: When to Leave Webflow \| BenorMedia` (58 characters) |
| Meta description | `Should you move from Webflow to Next.js, Astro or a headless CMS? What you gain, what you give up, what the code export leaves out, and when to stay.` (149 characters) |
| H1 | `Webflow vs custom code: when to move off Webflow, and when to stay` |
| Primary keyword | webflow vs custom code |
| Secondary keywords | webflow export code, webflow code export, webflow to react, webflow vs react, webflow to nextjs, webflow alternatives, is webflow worth it, webflow headless cms, webflow cms api, headless cms migration |
| Breadcrumb | Home › Webflow vs custom code |
| Byline | Sergio Gancedo, Managing Director, BenorMedia, as on the two live guides |
| Dates | Published and updated: the sign-off day |
| JSON-LD | Whatever the live guides emit, plus `FAQPage` for the FAQ. If they emit nothing: `Article`, `FAQPage`, `BreadcrumbList` |
| Article markup | `headline`: the H1 · `description`: the meta description · `author`: `Person` "Sergio Gancedo", `jobTitle` "Managing Director" · `publisher`: the shared Organization `@id` · `datePublished` and `dateModified`: the sign-off day · `about`: "Webflow", "Next.js", "Astro", "Headless content management system" |
| Open Graph | Title: the H1. Image: the header visual at 1200×630, as on the live guides |

## Visible copy

### 1. Article header
> Component: the guide header from `/guides/webflow-enterprise` (breadcrumb, eyebrow, date line with reading time, H1, lead, visual, share links).
> Visual: three columns side by side, "Stay on Webflow", "Add code to Webflow" and "Move to custom code", with two short labels under each: "Marketers build pages" and "Webflow runs hosting"; "Webflow Cloud apps" and "React code components"; "Next.js or Astro" and "Headless CMS". Labels as live text, not baked into an image.

- Eyebrow: Guides
- H1: Webflow vs custom code: when to move off Webflow, and when to stay
- Lead: Stay on Webflow if your marketing team runs the website and it does its job. Move to custom code, usually Next.js or Astro with a headless CMS, when the site has to work like part of your product, or when your engineers want it in their own repo. In between, Webflow Cloud, code components and the Webflow Data API let you add code without leaving.

### 2. Table of contents
> Component: the numbered table of contents from the live guides, built from the H2s below. Follow the live guides on whether "Sources" and the FAQ appear in it.

### 3. Key takeaways
> Component: the key takeaways callout. If it can't show bold text, drop the bold and keep the words.

- Items:
  - **Most B2B marketing sites don't need custom code.** The case for moving is strongest when the site needs product data, logged-in features or an engineering workflow.
  - **More sites leave Webflow for Next.js than the reverse.** In a July 2026 crawl, 988 domains had swapped Webflow for Next.js in about five weeks, against 95 that moved the other way.
  - **Webflow's code export is a static snapshot.** It leaves out the CMS, working forms, site search, password protection and every language except the primary one.
  - **Leaving means running what Webflow ran.** Hosting, security patches, forms, sitemaps, redirects and the visual editor become yours to manage, or your agency's.
  - **Keep your URLs.** If every address stays the same, Google's guidance for a hosting change applies, and there's no redirect map to build.

### 4. Should you move from Webflow to custom code?
> Component: a body section with a table, as "How long does an enterprise website project take?" on `/guides/webflow-enterprise`. Table caption above the table, as on the live guides.

- H2: Should you move from Webflow to custom code?
- Intro: Usually not, and the reason is who runs the website. Webflow is a visual website builder: marketers design, build and publish pages without a developer. A custom-coded site moves that work into a code repository. Developers make the changes there, or marketers do it with coding agents and a developer checking the result. That trade pays off for some sites and costs others a lot of speed. These signals show which side you're on.
- Table caption: Signals that point to staying on Webflow, adding code to it, or moving

| Signal | Points to | Why |
|---|---|---|
| Marketers build and publish new pages every week | Stay on Webflow | That's what the Designer is for. A coded site only matches it if you rebuild the editing experience. |
| The site is marketing pages, a blog and some landing pages | Stay on Webflow | You're far from the limits: the Premium plan holds 20,000 CMS items. |
| You need one specific app-like feature, such as a calculator or a gated tool | Add code to Webflow | A Webflow Cloud app or a code component covers it without moving the whole site. |
| You want pages generated from product, integration or docs data | Add code, or move | Webflow pages come from its own CMS, so outside data has to be synced in first. A coded front end reads the source directly. |
| Engineers want the site in the same repo and review flow as the product | Move | Pull requests, preview builds and rollbacks work the way they already do for the product. |
| You need logins, personalization or pricing logic tied to your product | Move | These need server code and your own data. In Webflow they end up as embeds and workarounds. |
| Your main reason is the Webflow bill | Do the sum first | Hosting, a headless CMS, form and search services and developer time cost money too. |

- Close: Two or more signals in the "Move" rows deserve a closer look. A single one usually has a middle path, covered further down.

### 5. Why are teams moving off Webflow in 2026?
> Component: a body section with a bulleted list, as "What makes a website project an enterprise project?" on `/guides/webflow-enterprise`.
> Visual (optional): two bars, "Webflow to Next.js: 988" and "Next.js to Webflow: 95", with "TechnologyChecker, crawl published July 2, 2026" under them.

- H2: Why are teams moving off Webflow in 2026?
- Intro: Most Webflow sites aren't going anywhere, but the movement that exists runs mostly one way. In its July 2026 crawl, [TechnologyChecker](https://technologychecker.io/blog/webflow-to-nextjs) counted 988 domains that had dropped Webflow for Next.js in about five weeks, and 95 that went the other way. That's a small share of the 249,194 domains it found on Webflow, but it's roughly ten to one. Software, IT services and technology or internet companies made up 32.8% of the movers. Four reasons stand out.
- Items:
  - **AI tools made code cheaper to change.** In [Stack Overflow's 2025 survey](https://survey.stackoverflow.co/2025/ai), 84% of respondents used or planned to use AI tools in development, and 51% of professional developers used them every day. The AI startup Vellum [moved its site off Webflow](https://www.vellum.ai/blog/how-i-migrated-off-webflow-with-coding-agents) in about a week with coding agents. A showcase page that used to take its team a week now takes half a day.
  - **The website became part of the product.** Integration directories, template galleries, docs and calculators all run on product data. Engineers would rather build them in the codebase they already maintain.
  - **Webflow changed its plans.** [New Site plans](https://help.webflow.com/hc/en-us/articles/51059955082387) applied to new purchases from May 13, 2026, and to most existing sites at renewal from June 29. Basic costs more, CMS and Business merged into one Premium plan, and former Business sites pay less but get 50 GB of bandwidth instead of 100 GB. Sites in Freelancer and Agency Workspaces, and sites on legacy discounts from 2022 or earlier, switch from November 16, 2026.
  - **Ownership.** Code in your own repository runs on any host you choose. A Webflow site leaves as a static export plus CSV files, as the export section below shows.
- Close: None of this makes Webflow the wrong choice for most marketing sites. It keeps adding ways to work with code and AI: its [MCP server](https://developers.webflow.com/mcp/reference/overview) lets tools such as Claude Code, ChatGPT and Cursor create pages and work with CMS content inside a Webflow project.

### 6. What does custom code give you that Webflow doesn't?
> Component: a body section with a bulleted list.

- H2: What does custom code give you that Webflow doesn't?
- Intro: By custom code we mean a site built in a framework such as Next.js or Astro, with content in a headless CMS such as Sanity, Storyblok or Payload, deployed from your own Git repository. Here's what that setup gives you that Webflow can't, or can only in part.
- Items:
  - **Pages from any data.** Templates can read your product database, docs, changelog or pricing rules directly, for example to generate one page per integration. Nothing has to be copied into a CMS first.
  - **No platform ceilings.** Webflow's Premium plan holds 20,000 CMS items, and every CMS item page sits under its [Collection's path](https://help.webflow.com/hc/en-us/articles/33961277976467-Structure-and-style-Collection-pages), such as /blog/post-name. In code, URL patterns and page counts are design decisions.
  - **Your engineering workflow.** Pull requests, code review, a preview build for every change, automated tests and rollbacks to any earlier version.
  - **Performance control.** You decide which scripts, CSS files and fonts each page loads. Astro sends [zero JavaScript by default](https://docs.astro.build/en/concepts/why-astro/) and adds it only to the components that need it.
  - **Room for product features.** Logins, gated content, search across your docs, personalization and anything else that needs server code.
  - **Portability.** The code and the content are yours. You can change host or agency without starting over, and swap the CMS without redesigning the site.
- Close: Each of these is also something your team now builds, hosts and keeps up to date.

### 7. What do you give up when you leave Webflow?
> Component: a body section with a table, as "What goes wrong on enterprise projects, and how is it prevented?" on `/guides/webflow-enterprise`, followed by two paragraphs.

- H2: What do you give up when you leave Webflow?
- Intro: Mostly the work Webflow does in the background. Vellum's write-up lists the work that became its team's job: robots.txt, the sitemap, 301 redirects, metadata and Open Graph tags, canonical URLs, structured data, image optimization, analytics events, forms and a staging setup. Even with that checklist, it had a few canonical issues on launch day and caught broken social images on a few pages during the migration. The table shows what Webflow runs today and what replaces it.
- Table caption: What Webflow runs for you, and what replaces it after a move

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

- Body: Security is the one teams underestimate. On your own Next.js site, patching is your job. In March 2025, Next.js fixed a [middleware flaw](https://osv.dev/CVE-2025-29927) that let attackers skip authorization checks, rated 9.1 out of 10. In December 2025, a [flaw in React Server Components](https://nextjs.org/blog/CVE-2025-66478), rated 10.0, allowed remote code execution. Affected App Router sites had to upgrade and redeploy, and Next.js recommended rotating every application secret afterwards. Someone has to watch for advisories like these and act within days.
- Body: Editing is the other trade. Headless CMSs have narrowed the gap. Sanity's [Presentation tool](https://www.sanity.io/docs/visual-editing/presentation-tool) shows a live preview of your site inside the CMS, with click-to-edit. Storyblok's [Visual Editor](https://www.storyblok.com/docs/concepts/visual-editor) jumps from a content block to its place on the page, and Payload's [Live Preview](https://payloadcms.com/docs/live-preview/overview) updates the page as you type. What none of them gives marketers is the Designer's design freedom: the power to create a new layout on their own. Editors assemble pages from sections a developer built first.

### 8. Can you just export your Webflow code?
> Component: a body section with a table.

- H2: Can you just export your Webflow code?
- Intro: You can export it, but the export won't run your site. [Webflow's code export](https://help.webflow.com/hc/en-us/articles/33961386739347) gives you the HTML pages, a CSS folder with three stylesheets, the JavaScript files and an images folder. Only paid Workspace plans can export; Site plans can't. You don't need to keep a Webflow plan, or credit Webflow, to host the files somewhere else.
- Table caption: What the Webflow code export includes and leaves out

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

- Close: CMS content comes out separately. Each Collection exports [as a CSV file](https://help.webflow.com/hc/en-us/articles/33961290794771) from the Designer, with image and file fields as URLs, so download those files before you delete the Webflow project. For many Collections, the [Webflow Data API](https://developers.webflow.com/data/reference/rate-limits) reads the items in code, at 60 to 120 requests a minute depending on the plan. If you want a React app out of Webflow, [DevLink Export](https://help.webflow.com/hc/en-us/articles/44746282129427-Component-export-using-DevLink) pulls Webflow components into a React codebase, though components bound to CMS content don't export fully and page-level interactions stay behind. All of it is raw material for a rebuild. None of it is a migration on its own.

### 9. Is there a middle path between Webflow and custom code?
> Component: a body section with a bulleted list.

- H2: Is there a middle path between Webflow and custom code?
- Intro: Yes, three of them.
- Items:
  - **Webflow Cloud.** It deploys full-stack Next.js and Astro apps on Webflow's hosting, which runs on Cloudflare Workers. An app can sit next to your Webflow site or [run without one](https://webflow.com/blog/cloud-apps-without-sites) on its own domain, and it gets SQLite, key-value and object storage. Good for a calculator, a customer tool or a gated area, while the marketing pages stay in the Designer.
  - **Code components.** Developers build [React components](https://help.webflow.com/hc/en-us/articles/44650867960595) in their own codebase and share them to Webflow, where designers place and configure them like any other component. React only, and changes to the component itself go through code.
  - **Webflow as a headless CMS.** Your team keeps editing content in Webflow, and a coded front end renders it through the Webflow Data API. Webflow says cached requests to its content delivery API have effectively no rate limits, while uncached ones count against your plan's limit.
- Close: A middle path works while code is a small part of the site. Once most new work happens in code, two systems cost more than one, and a full move is cleaner.

### 10. Next.js, Astro or something else: which stack do teams move to?
> Component: a body section with a table, then the callout.

- H2: Next.js, Astro or something else: which stack do teams move to?
- Intro: Next.js is the usual pick. TechnologyChecker found 570,205 active domains on it, more than twice its Webflow count, and coding agents know it well, which matters if you plan to change the site with them. Vellum chose it partly for that reason: in its words, "the AI tools know it cold." Astro is the other common choice for marketing sites. The CMS matters as much as the framework, because it decides how your marketers work.
- Table caption: Common choices for a site that leaves Webflow

| Option | Good fit when | Watch out for |
|---|---|---|
| Next.js | The site needs app features: logins, personalization, server logic, many dynamic pages | More server code to patch and monitor |
| Astro | Content-heavy marketing sites, docs and blogs where page speed comes first | App-heavy features take more work; interactive parts are added component by component |
| Sanity | Structured content reused across pages, with live preview for editors | The content model needs planning before the build |
| Storyblok | Marketers who want visual, block-based page building | How flexible editing feels depends on how the blocks are designed |
| Payload | Teams that want an [open-source CMS](https://payloadcms.com/) built into their Next.js app | You [host it yourself](https://payloadcms.com/docs/production/deployment), so backups and updates are on you |
| Webflow CMS, used headless | Teams that want to keep editing in Webflow | API rate limits, and the Designer no longer controls the layout |

- Callout: Our own site runs on Astro, with Sanity as the CMS. We chose Astro because almost everything on our site is content, and Astro sends JavaScript only to the parts of a page that need it. In our crawl on October 5, 2026, the home page's HTML linked to a single JavaScript file. We picked Sanity because it stores content as structured data rather than page layouts, so one piece of content can feed several pages. Running both ourselves also lets us test the setup we recommend, from server-rendered HTML to structured data, before we suggest it to a client.
> Component: a callout or quote block inside the article. If the template has none, a plain paragraph.

### 11. What does moving off Webflow cost?
> Component: a body section with a bulleted list.

- H2: What does moving off Webflow cost?
- Intro: There's no standard price for a headless CMS migration. The cost follows how many pages have to be designed and built, which isn't the same as how many CMS items you have, and how complex they are. Complexity comes down to these six things.
- Items:
  - **Templates.** A website with 300 blog posts and eight templates is cheaper to move than a 60-page site with 30 one-off layouts. Each template becomes a set of coded components and a CMS schema.
  - **The editor experience.** Basic editing is quick to set up. Live preview, reusable page sections and field validation take longer, and they decide whether marketers keep publishing after launch.
  - **Content.** Clean CSV exports move by script. Rich text with embeds, references between Collections and images that need a new home take manual work.
  - **Integrations.** Forms to the CRM, analytics, consent, search and any product data feeds.
  - **Languages.** Each locale adds routing, hreflang tags, translated content and its own QA pass.
  - **Design.** Rebuilding the current design costs less than a redesign, but it isn't free. Vellum found coding agents get the structure right and miss the spacing and small interactions, and it advises budgeting more time for that than you think.
- Close: Then add the running costs: hosting, CMS seats, form and search services, monitoring, and developer time for updates and security patches. Set that against your Webflow plans and add-ons. Vellum says it saves about 30,000 dollars a year on its Webflow bill. A site on a single Basic plan won't save anything close to that, and may pay more after the move.

### 12. How do you move off Webflow without losing rankings?
> Component: the numbered list and the eight-step stepper graphic from `/guides/wordpress-to-webflow-migration`, with these eight step names: Benchmark, Export everything, Map URLs, Rebuild the SEO basics, Move the files, Test on staging, Launch, Monitor.

- H2: How do you move off Webflow without losing rankings?
- Intro: Once you're ready to move, treat it as a site move and follow Google's guidance. Keep every URL you can: if none change, Google's [hosting-change guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes) applies and there's no redirect map to build. Expect some movement either way. Google says a small to medium site [can take a few weeks](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) for most pages to move.
- Items:
  - **1. Benchmark.** Export Search Console and analytics data for every URL: clicks, impressions, top queries and conversions.
  - **2. Export everything.** Crawl the site for a complete list of URLs, titles, meta descriptions, canonicals, Open Graph images, alt text and custom code snippets. Export Webflow's [301 redirects](https://help.webflow.com/hc/en-us/articles/33961211526291-Import-export-301-redirects) and every Collection as CSV.
  - **3. Map URLs.** Keep each URL where you can. Where one has to change, map it to its new address.
  - **4. Rebuild the SEO basics.** Metadata fields, canonicals, sitemaps, robots.txt, structured data and hreflang, set in templates so every new page gets them. Render content on the server, so search engines and AI answers can use it: Webflow's own [AEO guidance](https://webflow.com/blog/technical-aeo-for-ai-discovery) notes that AI crawlers other than Google's Gemini don't yet run JavaScript.
  - **5. Move the files.** Download images and documents and host them with the new site or in the new CMS.
  - **6. Test on staging.** Crawl the staging site and compare it with the old crawl. Check redirects, responsive layouts, forms and tracking, and keep staging out of the index.
  - **7. Launch.** Lower your DNS TTL to a few hours at least a week ahead, as Google suggests. Switch DNS, remove any noindex tags or robots blocks, submit the new sitemap and check key pages with URL Inspection in Search Console.
  - **8. Monitor.** Check crawl errors, indexing and rankings daily for the first weeks. If your URLs stayed the same, Googlebot often crawls less for a while after launch, which Google calls normal; if they changed, expect it to crawl more. Keep redirects for as long as possible, generally at least a year.
- Close: The same checks apply in the other direction. Our [Webflow migration](/webflow-migration) page covers moves onto Webflow, including from WordPress.

### 13. When is staying on Webflow the better call?
> Component: a body section with a bulleted list, as "When is Webflow not the right fit for an enterprise site?" on `/guides/webflow-enterprise`.

- H2: When is staying on Webflow the better call?
- Intro: More often than the migration stories suggest. Stick with Webflow if one of these fits.
- Items:
  - **Nobody will own the code.** A coded site without an engineer or an agency on call ages fast. Dependencies fall behind and security fixes wait.
  - **Your marketers design pages as well as fill them.** If they create new layouts every month, a headless CMS will slow them down.
  - **The website is marketing pages and a blog.** That's what Webflow is built for, and you're far from its limits.
  - **The goal is a smaller bill.** Run the numbers in the cost section first. Moving to save a few dollars a month rarely survives the first invoice for developer time.
  - **You need to launch soon.** A rebuild adds weeks or months of work before it saves any.
- Close: If you need more control, security reviews or governance inside Webflow, our [Webflow Enterprise guide](/guides/webflow-enterprise) covers what to check.

### 14. How was this guide written and checked?
> Component: the same section on `/guides/webflow-enterprise` (one paragraph).

- H2: How was this guide written and checked?
- Body: This guide draws on BenorMedia's Webflow projects and on building our own site in Astro and Sanity. We checked every outside fact against its source on October 9, 2026: Webflow's help center and developer docs, Google Search Central, the Next.js, Astro, Sanity, Storyblok and Payload docs, and the public migration data and write-ups listed below. We recheck it every 30 days. One disclosure: BenorMedia earns money on both sides of this decision. We're a Webflow Professional Partner, and we also build [custom-coded sites on a headless CMS](/headless-cms-agency).

### 15. Sources
> Component: the numbered sources list from the live guides. Each entry links its title.

- H2: Sources
- Sources:
  - TechnologyChecker, [Webflow to Next.js Migration: The Complete 2026 Guide](https://technologychecker.io/blog/webflow-to-nextjs), July 2, 2026. Accessed October 9, 2026.
  - Webflow Help Center, [Updated pricing and simplified plans for May 2026](https://help.webflow.com/hc/en-us/articles/51059955082387), updated August 31, 2026. Accessed October 9, 2026.
  - Webflow Help Center, [How do I export my Webflow site code?](https://help.webflow.com/hc/en-us/articles/33961386739347), updated October 31, 2025. Accessed October 9, 2026.
  - Webflow Help Center, [How do I import content into the Webflow CMS?](https://help.webflow.com/hc/en-us/articles/33961290794771). Accessed October 12, 2026.
  - Webflow Developers, [Rate limits](https://developers.webflow.com/data/reference/rate-limits). Accessed October 9, 2026.
  - Webflow Help Center, [Export components with DevLink Export](https://help.webflow.com/hc/en-us/articles/44746282129427-Component-export-using-DevLink). Accessed October 9, 2026.
  - Webflow Help Center, [Code components](https://help.webflow.com/hc/en-us/articles/44650867960595), updated April 30, 2026. Accessed October 9, 2026.
  - Webflow Blog, [Webflow Cloud. One workspace for your site and your app. Or just the app.](https://webflow.com/blog/cloud-apps-without-sites), updated June 16, 2026. Accessed October 9, 2026.
  - Webflow, [Webflow Cloud](https://webflow.com/feature/cloud). Accessed October 9, 2026.
  - Webflow Developers, [Webflow MCP server overview](https://developers.webflow.com/mcp/reference/overview). Accessed October 9, 2026.
  - Webflow, [Security](https://webflow.com/security). Accessed October 9, 2026.
  - Webflow Help Center, [Dynamic content limits](https://help.webflow.com/hc/en-us/articles/33961370432275-Dynamic-content-limits). Accessed October 9, 2026.
  - Webflow Help Center, [Structure and style Collection pages](https://help.webflow.com/hc/en-us/articles/33961277976467-Structure-and-style-Collection-pages). Accessed October 9, 2026.
  - Webflow Help Center, [Import/export 301 redirects](https://help.webflow.com/hc/en-us/articles/33961211526291-Import-export-301-redirects). Accessed October 9, 2026.
  - Webflow Blog, [The technical side of AEO: Structuring your site for AI discovery](https://webflow.com/blog/technical-aeo-for-ai-discovery), updated September 30, 2026. Accessed October 9, 2026.
  - Anita Kirkovska, Vellum, [How I migrated off of Webflow in one week with coding agents](https://www.vellum.ai/blog/how-i-migrated-off-webflow-with-coding-agents), May 12, 2026. Accessed October 9, 2026.
  - Stack Overflow, [2025 Developer Survey: AI](https://survey.stackoverflow.co/2025/ai). Accessed October 9, 2026.
  - Next.js, [Security Advisory: CVE-2025-66478](https://nextjs.org/blog/CVE-2025-66478), December 3, 2025. Accessed October 9, 2026.
  - OSV, [CVE-2025-29927: Authorization Bypass in Next.js Middleware](https://osv.dev/CVE-2025-29927), March 21, 2025. Accessed October 9, 2026.
  - Astro Docs, [Why Astro?](https://docs.astro.build/en/concepts/why-astro/). Accessed October 9, 2026.
  - Sanity Docs, [Configuring the Presentation Tool](https://www.sanity.io/docs/visual-editing/presentation-tool). Accessed October 9, 2026.
  - Storyblok Docs, [Manage the Visual Editor](https://www.storyblok.com/docs/concepts/visual-editor). Accessed October 9, 2026.
  - Payload Docs, [Live Preview](https://payloadcms.com/docs/live-preview/overview); Payload, [home page](https://payloadcms.com/). Accessed October 9, 2026.
  - Payload Docs, [Production deployment](https://payloadcms.com/docs/production/deployment). Accessed October 12, 2026.
  - Google Search Central, [Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes). Accessed October 9, 2026.
  - Google Search Central, [Changing your hosting](https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes). Accessed October 9, 2026.

### 16. Byline
> Component: the byline block after the sources, with headshot and published date, as on the live guides.

- Byline: Sergio Gancedo, Managing Director, BenorMedia

### 17. FAQ
> Component: the FAQ from the live guides. Match the punctuation of their FAQ H2. The FAQ array feeds the visible FAQ and `FAQPage`; links become plain text in the markup.

- H2: Questions about moving from Webflow to custom code

**Q: Can you convert Webflow to React or Next.js?**
A: Not automatically. Code export gives you static HTML, CSS and JavaScript, and DevLink Export turns Webflow components into React components, with gaps for CMS-bound content and page-level interactions. A working Next.js site or React app still means rebuilding the templates, the content model and the integrations, with the export as a reference.

**Q: How do you get your CMS content out of Webflow?**
A: Export each Collection as a CSV file from the Designer, or read it through the Webflow Data API if you have many Collections or need repeat syncs. Image and file fields arrive as URLs, so download the files themselves before the project is deleted.

**Q: Is Webflow worth it in 2026?**
A: For a marketing site your marketers run, usually yes. One bill covers hosting, security, a visual editor and the SEO settings, and the 2026 plan changes raised some prices while lowering others. It's worth less when the site needs app features, data from other systems or an engineering workflow, which is where custom code earns its upkeep.

**Q: Is custom code better for SEO than Webflow?**
A: Not by itself. Webflow handles the technical basics well. A coded site can match it or beat it on speed and gives you full control over URLs, canonicals and structured data, but every one of those has to be built and tested. Most ranking problems after a move come from missing redirects, dropped metadata or pages that render without their content, and all three can be caught before launch.

**Q: How long does a move from Webflow to Next.js take?**
A: Templates, content and integrations decide it more than page count. Vellum moved its site in about a week with coding agents, while its CTO moved the content into Sanity over a weekend. A site with many templates, languages and integrations takes longer, because the content model, the redirect map and QA still need people to check them.

**Q: Can you use Webflow as a headless CMS?**
A: Yes. The Webflow Data API, often called the CMS API, exposes your Collections, so a Next.js or Astro front end can render content your team still edits in Webflow. Plan around the rate limits, 60 to 120 requests a minute depending on the plan, by fetching at build time or caching responses. It suits structured content such as blog posts better than landing pages, because the Designer no longer controls the layout.

**Q: What is the CMS item limit in Webflow?**
A: The Premium plan, which replaced the CMS and Business plans in 2026, holds 20,000 CMS items. The Team plan raises the number of Collections to 100. Separately, a Collection list on a page shows 100 items by default, so long lists need pagination. If you expect to pass those numbers, plan the content model before you pick a platform.

**Q: Should a startup build its website in Webflow or in code?**
A: Most early-stage startups are better off in Webflow, because marketers can ship pages without pulling engineers off the product. Code makes sense early when the website is part of the product, such as a developer tool whose docs, changelog and marketing pages share one codebase. It also makes sense when your engineers want to own the site and have time for it.

**Q: What are the main alternatives to Webflow?**
A: Other visual website builders, such as Framer, or WordPress with a page builder, if you want to keep designing visually. Custom code, usually Next.js or Astro with a headless CMS such as Sanity, Storyblok or Payload, if you want control and engineering ownership. Choose by who will run the site day to day, then by features.

**Q: What happens to Webflow forms and site search after a move?**
A: Both stop working once the site leaves Webflow's hosting. Forms need a backend, such as an API route that sends submissions to your CRM, or the CRM's own embedded forms. Search needs a hosted search service or search built into the site. List every form and where its submissions go before the build starts.

### 18. CTA band
> Shared component, as on the live guides ("Ready to build your website? Let's chat." with "Get in Touch" and "See Pricing"). No new copy.

### 19. Related resources
> Component: the two related cards from the live guides, each with a "Learn more" button.

- H2: Related resources.
- Items:
  - Services: [Headless CMS development, built so your marketing team can still publish](/headless-cms-agency)
  - Guides: [Webflow Enterprise: security, governance, and what to check before you commit](/guides/webflow-enterprise)

### 20. Testimonial and contact form
> Shared components. No new copy.

## Internal links

- Out: `/headless-cms-agency` (sections 14 and 19), `/webflow-migration` (section 12), `/guides/webflow-enterprise` (sections 13 and 19).
- Into this page (add during the build):
  - from `/headless-cms-agency` (already in its copy: sections 4, 6, 10, 13 and 14);
  - from `/guides/webflow-enterprise`, at the end of "When is Webflow not the right fit for an enterprise site?": "Weighing a move to code? See [Webflow vs custom code](/guides/webflow-vs-custom-code)."
  - from the footer's Guides group, if it's built from a list the other two guides are in: "Webflow vs Custom Code".

## Sources (tier B)

| Claim on the page | Source | Checked |
|---|---|---|
| 988 domains dropped Webflow for Next.js in about five weeks (crawler live since 2026-05-29), 95 the other way; 249,194 active Webflow domains; 570,205 on Next.js; 32.8% of movers in software development, IT services or technology/internet | TechnologyChecker, published 2 Jul 2026: https://technologychecker.io/blog/webflow-to-nextjs (its Webflow-to-Framer figures run to 7 Sep 2026, after the publish date, so the page uses none of them) | 9 Oct 2026 |
| Plan changes: new purchases 13 May 2026; existing sites from 29 Jun 2026, at renewal or on a billable change; Freelancer or Agency Workspace sites and sites on legacy discounts from 2022 or earlier from 16 Nov 2026; CMS and Business merged into Premium; Business price down, bandwidth 100 GB to 50 GB; Premium holds 20,000 CMS items (CMS item add-ons removed); Team plan has 100 CMS Collections; Basic price up | Webflow Help, "Updated pricing and simplified plans for May 2026" (updated 31 Aug 2026): https://help.webflow.com/hc/en-us/articles/51059955082387 ; Basic's old price (14 dollars a month billed yearly) from https://www.nocode.tech/article/webflow-just-overhauled-its-pricing-what-agencies-and-freelancers-need-to-know | 9 Oct 2026 |
| Code export: paid Workspace plans only, Site plans can't; HTML, CSS folder with three stylesheets, JS, images; no CMS (Collection lists empty), User Accounts, Ecommerce, code components or localized content; form processing (with file upload and reCAPTCHA) and site search don't work; password-protected pages "will no longer be protected"; no plan or attribution needed to host elsewhere; CSV image links break if the original project is deleted | Webflow Help, "How do I export my Webflow site code?": https://help.webflow.com/hc/en-us/articles/33961386739347 | 9 Oct 2026 |
| CSV export per Collection from the Designer; image and file fields exported as URLs | https://help.webflow.com/hc/en-us/articles/33961290794771 | 12 Oct 2026 |
| Data API: 60 requests a minute on Starter and Basic, 120 on CMS, eCommerce and Business; "For cached requests to the content delivery API, there are effectively no rate limits" (the page still uses pre-2026 plan names: recheck when it lists Premium) | https://developers.webflow.com/data/reference/rate-limits | 9 Oct 2026 |
| DevLink Export pulls Webflow components into an external React codebase; CMS-bound components don't export fully; page-level IX3 interactions not included | https://help.webflow.com/hc/en-us/articles/44746282129427-Component-export-using-DevLink | 9 Oct 2026 |
| Code components are React components built outside Webflow, shared via DevLink and the CLI; React only; updates go through code | https://help.webflow.com/hc/en-us/articles/44650867960595 | 9 Oct 2026 |
| Webflow Cloud: Next.js and Astro; apps without a site or alongside one, on their own domains; SQLite, key-value and object storage; Cloudflare Workers | https://webflow.com/blog/cloud-apps-without-sites (updated 16 Jun 2026) ; https://webflow.com/feature/cloud | 9 Oct 2026 |
| Webflow MCP server connects agents to Webflow projects, creates pages and works with the CMS; clients include Claude Code, ChatGPT, Codex and Cursor | https://developers.webflow.com/mcp/reference/overview | 9 Oct 2026 |
| Webflow lists SOC 2 Type II and ISO 27001; TLS with HSTS; CDN with DDoS protection | https://webflow.com/security | 9 Oct 2026 |
| Collection lists display up to 100 items by default (pagination goes past it); CMS item pages sit under their Collection's path, which can sit in a folder ("website.com/content/blog/example-post") | https://help.webflow.com/hc/en-us/articles/33961370432275-Dynamic-content-limits ; https://help.webflow.com/hc/en-us/articles/33961277976467-Structure-and-style-Collection-pages | 9 Oct 2026 |
| 301 redirects export to CSV from Site settings > Publishing > 301 redirects | https://help.webflow.com/hc/en-us/articles/33961211526291-Import-export-301-redirects | 9 Oct 2026 |
| Payload: "Because it's open source, you can self-host it." | https://payloadcms.com/docs/production/deployment | 12 Oct 2026 |
| Webflow: "ensure important content is server-rendered because non-Gemini AI crawlers don't yet render Javascript" | Webflow blog, "The technical side of AEO", updated 30 Sep 2026: https://webflow.com/blog/technical-aeo-for-ai-discovery | 9 Oct 2026 |
| Vellum: off Webflow in about a week with coding agents; the CTO "migrated almost all of our existing content into Sanity over a single weekend"; Next.js, Sanity, Postgres; about 30,000 dollars a year saved on the Webflow bill; showcase page from a week to half a day; "The invisible work that becomes yours" list; "a few canonical issues on launch day"; broken OG images caught on a few pages mid-migration; agents "get the structure" but miss spacing and micro-interactions; budget more time for design replication; Next.js: "Boring, battle-tested, and the AI tools know it cold" | Anita Kirkovska, Vellum, 12 May 2026: https://www.vellum.ai/blog/how-i-migrated-off-webflow-with-coding-agents | 9 Oct 2026 |
| 84% of respondents use or plan to use AI tools in development; 51% of professional developers use them daily (figures about AI tools in general, not agents: the same page says 52% don't use agents or stick to simpler tools) | Stack Overflow Developer Survey 2025: https://survey.stackoverflow.co/2025/ai | 9 Oct 2026 |
| CVE-2025-66478 / CVE-2025-55182: React Server Components flaw, CVSS 10.0, remote code execution, App Router on Next.js 15.x and 16.x; "All users should upgrade to a patched version immediately"; "Once you have patched your version and re-deployed your application, we recommend rotating all your application secrets"; published 3 Dec 2025 | https://nextjs.org/blog/CVE-2025-66478 | 9 Oct 2026 |
| CVE-2025-29927: authorization bypass in Next.js middleware, CVSS 9.1, published 21 Mar 2025, fixed in 12.3.5, 13.5.9, 14.2.25 and 15.2.3 | https://osv.dev/CVE-2025-29927 | 9 Oct 2026 |
| Astro: "Zero JS, by default"; islands; server rendering over client-side rendering | https://docs.astro.build/en/concepts/why-astro/ | 9 Oct 2026 |
| Sanity Presentation tool renders the front end in an iframe inside the Studio, a live preview with click-to-edit (draft content); works with any framework that implements the protocol | https://www.sanity.io/docs/visual-editing/presentation-tool | 9 Oct 2026 |
| Storyblok Visual Editor: click a block to scroll to it in the preview | https://www.storyblok.com/docs/concepts/visual-editor | 9 Oct 2026 |
| Payload Live Preview renders the front end in the Admin Panel, changes in real time; Payload is an open-source headless CMS built into a Next.js app | https://payloadcms.com/docs/live-preview/overview ; https://payloadcms.com/ | 9 Oct 2026 |
| Google: expect temporary ranking fluctuation; a small to medium site can take a few weeks for most pages to move; keep redirects as long as possible, generally at least a year | https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes | 9 Oct 2026 |
| Google, hosting change without URL changes: lower the DNS TTL "to a conservative low value (for example, a few hours)" at least a week before; check Googlebot access with URL Inspection; a temporary drop in crawl rate after launch is normal | https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes | 9 Oct 2026 |
| Google, moves with URL changes: "Google will temporarily crawl your new site more heavily than usual"; "you may experience ranking fluctuations" | https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes | 9 Oct 2026 |

## Already on benormedia.com (tier A, reused)

"Webflow Professional Partner" (footer badge; home page: "6+ years as a Webflow Professional Partner"); the guide pattern itself: question H2s, key takeaways, "How was this guide written and checked?" with a 30-day recheck, a dated sources list and the byline "Sergio Gancedo, Managing Director, BenorMedia" (`/guides/webflow-enterprise`); the related-card wording "Webflow Enterprise: security, governance, and what to check before you commit".

## Statements a person must confirm (review sheet seeds)

1. Section 10 callout, drafted by Claude on 10 Oct 2026 at Sergio's request (he confirmed the same day that BenorMedia is happy to say its site runs on Astro with Sanity). It makes three claims for the person to check: the reason for Astro (a site that is mostly content, with JavaScript only where needed), the reason for Sanity (content stored as structured data, so one piece can feed several pages), and "Running both ourselves also lets us test the setup we recommend ... before we suggest it to a client". The figure comes from BenorMedia's own crawl of benormedia.com on 5 Oct 2026: the home page's HTML links one JavaScript file (other HTML pages link one to four). It counts linked files, not every script a browser may load at runtime, so recheck it in a browser before release.
2. Section 14: "BenorMedia earns money on both sides of this decision", that BenorMedia builds custom-coded sites on a headless CMS (facts sheet item S1 for `/headless-cms-agency`), and "This guide draws on BenorMedia's Webflow projects and on building our own site in Astro and Sanity". If BenorMedia has shipped custom-coded client sites, say so in that sentence.
3. Section 14: the 30-day recheck, as on `/guides/webflow-enterprise`.
4. The byline: Sergio Gancedo as the author.
5. Opinions the page states as BenorMedia's view: "Most B2B marketing sites don't need custom code", "Two or more signals in the 'Move' rows deserve a closer look", "Next.js is the usual pick", "Most early-stage startups are better off in Webflow".
6. Section 11: the template example (300 posts and eight templates against 60 pages and 30 layouts) is illustrative, not a client's numbers.
7. Section 10: "Next.js is the usual pick" sits next to BenorMedia's own preference for Astro on marketing sites (the FAQ on `/headless-cms-agency`). Both are fine together; change one if the person disagrees.
