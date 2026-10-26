---
slug: astro-cms
url: /blog/astro-cms
pageType: guide
draft: false
blockedBy: []
topicId: "3.2"
wave: 3
title: "Astro CMS: How to Choose and Connect One | BenorMedia"
description: "Astro has no built-in CMS. When content collections are enough, which CMS types fit, and how to connect one like Sanity with previews, as of Astro 7."
h1: "Astro CMS: how to choose a CMS for an Astro site, and how to connect it"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-26
updatedAt: 2026-10-26
reviewEvery: 60 days
primaryKeyword: "astro cms"
secondaryKeywords: ["astro headless cms", "best cms for astro", "sanity astro"]
takeaways:
  - "Astro has no built-in CMS. It renders content from Markdown files in your project or from a headless CMS, and its docs list guides for 45 CMSs."
  - "Content collections in the repository are enough while developers write the content. Add a CMS when marketers need to publish, preview, and schedule without a developer."
  - "Previews and visual editing need server-rendered pages: Sanity's official Astro integration says its Visual Editing only works on server-side rendered pages."
  - "Astro 7, released June 22, 2026, made route caching stable, so cached pages can be invalidated by tag when CMS content changes instead of rebuilding the whole site."
  - "The company behind Astro joined Cloudflare on January 16, 2026, and says Astro stays MIT-licensed and platform-agnostic."
faqHeading: "Questions about choosing a CMS for Astro"
faq:
  - q: "What is the best CMS for Astro?"
    a: "There is no single best one. A Git-based CMS suits small, developer-led sites; a hosted headless CMS suits marketing teams that need previews, roles, and scheduling. Pick two candidates that fit how your team works and build one real page template in each before you decide."
  - q: "What is the best free CMS for Astro?"
    a: "Markdown files in Astro's content collections cost nothing and need no extra service. Open-source CMSs such as Decap CMS, Keystatic, Strapi, Payload, and StudioCMS have free open-source editions, but you still run and update them, and the self-hosted ones need a server and backups."
  - q: "What are Astro content collections?"
    a: "Content collections are Astro's way to manage sets of structurally identical entries, such as blog posts, from local files or remote sources. Build-time collections load data when the site builds; live collections fetch it on each request and need an adapter for on-demand rendering."
  - q: "Is Sanity a good CMS for Astro?"
    a: "It fits teams that want structured content and previews. Sanity maintains an official Astro integration with a configured client, an optional embedded Studio, Visual Editing for server-rendered pages, and an experimental content collections loader. Our own site runs on Astro and Sanity."
  - q: "Does Astro still work outside Cloudflare?"
    a: "Yes. When The Astro Technology Company joined Cloudflare on January 16, 2026, it said Astro stays free, open source, and MIT-licensed and continues to support many deployment targets. Astro 7 even ships experimental CDN cache providers for Netlify, Vercel, and Cloudflare."
related:
  - /headless-cms-agency
  - /custom-websites-migrations
  - /guides/webflow-vs-custom-code
sources:
  - label: "Astro Docs: Use a CMS with Astro"
    url: https://docs.astro.build/en/guides/cms
    accessed: 2026-10-26
  - label: "Astro Docs: Content collections"
    url: https://docs.astro.build/en/guides/content-collections/
    accessed: 2026-10-26
  - label: "Astro Docs: Sanity & Astro"
    url: https://docs.astro.build/en/guides/cms/sanity/
    accessed: 2026-10-26
  - label: "Astro: Astro 7.0"
    url: https://astro.build/blog/astro-7/
    accessed: 2026-10-26
  - label: "Astro: The Astro Technology Company joins Cloudflare"
    url: https://astro.build/blog/joining-cloudflare/
    accessed: 2026-10-26
  - label: "Sanity: @sanity/astro, the official Sanity integration for Astro"
    url: https://www.sanity.io/plugins/sanity-astro
    accessed: 2026-10-26
  - label: "StudioCMS: The Astro-native CMS"
    url: https://studiocms.dev/
    accessed: 2026-10-26
  - label: "Astro Docs: Storyblok & Astro"
    url: https://docs.astro.build/en/guides/cms/storyblok/
    accessed: 2026-10-26
  - label: "Astro Docs: Contentful & Astro"
    url: https://docs.astro.build/en/guides/cms/contentful/
    accessed: 2026-10-26
  - label: "Astro Docs: Strapi & Astro"
    url: https://docs.astro.build/en/guides/cms/strapi/
    accessed: 2026-10-26
  - label: "Astro Docs: Payload CMS & Astro"
    url: https://docs.astro.build/en/guides/cms/payload/
    accessed: 2026-10-26
  - label: "Astro Docs: Keystatic & Astro"
    url: https://docs.astro.build/en/guides/cms/keystatic/
    accessed: 2026-10-26
  - label: "Astro Docs: Tina CMS & Astro"
    url: https://docs.astro.build/en/guides/cms/tina-cms/
    accessed: 2026-10-26
  - label: "Astro Docs: Decap CMS & Astro"
    url: https://docs.astro.build/en/guides/cms/decap-cms/
    accessed: 2026-10-26
  - label: "Astro Docs: Headless WordPress & Astro"
    url: https://docs.astro.build/en/guides/cms/wordpress/
    accessed: 2026-10-26
volatile:
  - "Astro 7.0 released June 22, 2026: stable route caching with Astro.cache and cache tags, experimental CDN cache providers for Netlify, Vercel, and Cloudflare, Rust compiler, Sätteri as the default Markdown processor (source: Astro blog)"
  - "The Astro Technology Company joined Cloudflare on January 16, 2026; Astro stays MIT-licensed and platform-agnostic (source: Astro blog)"
  - "Astro docs list 45 CMS guides, many of them stubs; CloudCannon is the featured CMS partner (source: Astro Docs, checked 2026-10-26)"
  - "Live collections need an adapter, cannot render MDX or optimize images at runtime, and have no built-in live loaders (source: Astro Docs)"
  - "@sanity/astro: Visual Editing only on server-side rendered pages, read token with Viewer permissions, experimental sanityLoader for Astro 5 or later (source: Sanity plugin page, no date shown)"
  - "StudioCMS says it works with any Astro v5 project; Astro 7 support not stated (source: studiocms.dev)"
volatileChecked: 2026-10-26
inbound:
  - page: /headless-cms-agency
    anchor: "how to choose a CMS for Astro"
    sentence: "Where the page explains why Astro is paired with a headless CMS, link to the post."
  - page: /blog/headless-cms-seo
    anchor: "connecting a CMS to Astro"
    sentence: "In the sentence that says our own site runs on Astro and Sanity, link to the post."
  - page: /blog/headless-cms-comparison
    anchor: "CMS options for an Astro site"
    sentence: "Where the post mentions frontend frameworks, link to the post for the Astro-specific view."
  - page: /blog/core-web-vitals-optimization
    anchor: "Astro CMS setup"
    sentence: "In the Astro section, link to the post for how content reaches an Astro site."
editorNotes:
  - "Topic 3.2 re-scoped on 2026-10-26 from 'How we built benormedia.com on Astro, Sanity and Vercel' to the query astro cms, per rule changes 1 and 2. The build story is now one section with two gap markers, so the post can ship without them."
  - "'Our own site runs on Astro and Sanity' and 'We build headless sites on Astro and Next.js with Sanity' are published on /blog/headless-cms-seo (checked 2026-10-26), so they carry no marker. Vercel hosting is not stated on a live page and stays inside #P32-2."
  - "#P32-1 asks why we chose Sanity and whether editors use Visual Editing; #P32-2 asks how publishing works and for one measured number. Both default to delete. Answers would make this the only result in the top 10 written from a real Astro and Sanity build."
  - "No CMS is ranked. Product types and examples come from the Astro docs list of CMS guides. The options table (added 2026-10-26 after Sergio flagged the low content score, since 'best cms for astro' searchers expect named options) is alphabetical and uses each CMS's Astro docs guide or official page; quotes are verbatim, other cells paraphrase those pages."
  - "Body is about 2,250 words with three tables, above the 1,800 guideline: the top results average about 2,700 words, and the extra words are the CMS types and options tables and the Sanity steps (rule change 4)."
---

Astro has no built-in CMS. An Astro site renders content from Markdown files in its own repository or from a headless CMS that it reads through an API or an integration. This guide shows when files are enough, which kinds of CMS fit, and how to connect one, for B2B SaaS teams building on Astro 7, as of October 2026.

## Does Astro have a built-in CMS?

No. Astro is a web framework that handles presentation, so content lives either in Markdown files in your project or in a separate content management system. Astro's own docs put it plainly: "Because Astro takes care of the presentation of your content, you'll want to choose a headless CMS." They list guides for 45 of them.

A headless CMS stores and manages content, then sends it to any frontend through an API. The CMS has no say in how pages look. That split is the point: marketers edit in the CMS, and developers keep control of the components, performance, and markup in Astro.

Two notes on that list of 45. First, Astro says "many of these pages are stubs," so a guide's presence tells you a CMS has been used with Astro, not that it is well supported. Second, one entry is close to a built-in option: StudioCMS calls itself "the Astro-native CMS," is open source under the MIT license, and stores its data in a remote libSQL database. Its site says it works with Astro v5 projects, so check Astro 7 support before you commit.

Ownership changed in 2026, though the license did not. On January 16, 2026, The Astro Technology Company joined Cloudflare and said Astro stays "open-source and MIT-licensed" and continues to support "a wide set of deployment targets, not just Cloudflare."

## When are Astro content collections enough?

Content collections are enough when developers write and publish the content, it changes a few times a month, and nobody needs to preview drafts. Add a CMS when marketers need to publish on their own, preview pages before they go live, schedule posts, manage translations, or control who can edit what.

Content collections are Astro's built-in way to manage "a set of related, structurally identical data," such as blog posts or customer stories. They come in two kinds, and the difference decides much of your CMS setup.

Table: Build-time and live content collections in Astro

| | Build-time collections | Live collections |
| --- | --- | --- |
| When data loads | At build time, saved to a storage layer | On each request, at runtime |
| Defined in | src/content.config.ts | src/live.config.ts |
| Rendering | Static pages work | Needs an adapter for on-demand rendering |
| Loaders | Built-in glob() and file() loaders, plus custom and third-party loaders for CMSs | No built-in live loaders; custom or third-party only |
| Limits | Content changes need a rebuild | No MDX rendering and no image optimization at runtime |
| Good for | Docs, blogs, and pages that change on a schedule | CMS previews and content that changes often |

Astro recommends build-time collections by default and live collections "when your content needs updating in real time." Previews are one of the use cases it lists for live collections, which is the first sign that a marketing team's CMS setup will need some server rendering.

Signs you have outgrown files in the repository:

- Marketers wait for a developer to publish a post or fix a typo.
- Nobody can see a draft page before it ships.
- You publish in more than one language and translations drift.
- Landing pages need reusable sections that non-developers can assemble.
- Legal or brand teams need approval steps and an edit history.

## What types of CMS work with Astro?

Five types work with Astro: Git-based CMSs that write files to your repository, hosted headless CMSs with an API, open-source CMSs you host yourself, traditional CMSs used headless, and Astro-native CMSs. They differ most in where content lives, who maintains the service, and how much previewing and visual editing your team gets.

Table: CMS types for Astro sites (examples from Astro's CMS guides, October 2026)

| CMS type | Where content lives | Examples | Good fit | Watch out for |
| --- | --- | --- | --- | --- |
| Git-based | Files in your Git repository | CloudCannon, Decap CMS, Keystatic, TinaCMS, Pages CMS | Small teams, docs, developer-led blogs | Every edit is a commit and often a rebuild |
| Hosted headless | The vendor's cloud, read through an API | Sanity, Contentful, Storyblok, Hygraph, DatoCMS, Prismic | Marketing teams that need previews, roles, and localization | Usage-based plans and vendor lock-in on content models |
| Open-source, self-hosted | Your own database and server | Strapi, Payload CMS, KeystoneJS | Teams that want full control of data and hosting | You own updates, backups, and security patches |
| Traditional CMS used headless | The CMS's database, read through its API | WordPress, Drupal, Craft CMS | Teams with years of content in that CMS | Two systems to secure and maintain |
| Astro-native | A database the CMS manages inside the Astro project's stack | StudioCMS | Astro-first teams that want one stack | Younger ecosystem; check version support |

For B2B SaaS marketing sites, the choice usually narrows to Git-based for a developer-run site and hosted headless for a site that a marketing team runs day to day. Our [headless CMS comparison](/blog/headless-cms-comparison) covers the criteria in more depth, without a ranking.

## Which CMSs have full Astro guides, and how does each connect?

Most CMSs that Astro teams shortlist have a full setup guide in Astro's docs or an official Astro integration. They connect in one of three ways: an integration package, an SDK or REST API, or an editor that writes files to your repository. The table lists common options alphabetically; it is not a ranking.

Table: Common CMS options for Astro, listed alphabetically (October 2026)

| CMS | Type | How Astro's docs or the vendor describe it | How it connects to Astro |
| --- | --- | --- | --- |
| CloudCannon | Git-based | "Git-based CMS built for speed, security, and zero headaches"; the only featured CMS partner in Astro's docs | Edits the files in your repository |
| Contentful | Hosted headless | A headless CMS to manage content and integrate with other services | Official JavaScript SDK; a preview API with a preview token shows unpublished entries |
| Decap CMS | Git-based, open source | Formerly Netlify CMS | An editor at /admin/, set up with a config.yml file |
| Keystatic | Open source, content stored as files | Saves entries as files in your project and can sync with GitHub | The @keystatic/astro integration, plus the React and Markdoc integrations |
| Payload CMS | Open-source headless | "A headless open-source content management system" | Astro's page links to an official Payload and Astro example project |
| Sanity | Hosted headless | Focuses on structured content | The official @sanity/astro integration; Visual Editing on server-rendered pages |
| Storyblok | Hosted headless | Component-based, with reusable components called Bloks | The official @storyblok/astro integration; storyblokEditable marks elements for its visual editor |
| Strapi | Open-source headless | "An open-source, customizable, headless CMS" | Its REST API, through a small fetch wrapper |
| StudioCMS | Astro-native, open source | "The Astro-native CMS," with data in libSQL | Built for Astro; its site states support for Astro v5 projects |
| TinaCMS | Git-backed headless | "A Git-backed headless content management system" | Edits Markdown and MDX files; production commits go through Tina Cloud or a self-hosted data layer |
| WordPress | Traditional CMS used headless | Has its own frontend but "can also be used as a headless CMS" | The WordPress REST API, with GraphQL plugins as an option |

A full guide counts for more than a logo on a list. Astro marks many of its CMS pages as stubs; Payload's, for example, is a short overview that points to an example project. The guides for Contentful, Decap CMS, Keystatic, Storyblok, Strapi, TinaCMS, and WordPress walk through setup, data fetching, and deployment, and those for Contentful, Storyblok, and Strapi also cover rebuilding the site through webhooks.

## How do you choose a CMS for an Astro site?

Choose by who edits, how often, and what they must see before publishing. Then check five things in a short trial: previews, content modeling for your page sections, localization, roles and workflow, and how the CMS tells Astro that content changed. A one-page pilot built on two candidates shows more than any feature grid.

1. **Previews and visual editing.** Ask how editors see a draft on the real page design, as a live preview or in a visual editor. On Astro, this usually means server-rendered preview routes: live collections need on-demand rendering, and Sanity's Visual Editing, for one, only works on server-rendered pages.
2. **Content modeling.** Model reusable sections, such as a hero, a logo bar, or a pricing table, that map one to one to Astro components. Marketers then assemble approved sections instead of editing raw layouts.
3. **Localization.** If you sell in several markets, test field-level translation and fallbacks on one real page.
4. **Roles and workflow.** Check drafts, scheduled publishing, approvals, and edit history against how your legal and brand reviews work.
5. **Change signals.** Confirm the CMS can send a webhook when content changes, so your site can rebuild or clear its cache.

Add search fields to the model from day one: title, meta description, canonical URL, Open Graph image, and a noindex switch. We set up titles, descriptions, Open Graph images, and canonical tags as CMS fields on our headless builds, and our post on [headless CMS SEO](/blog/headless-cms-seo) covers the rest of the pre-launch checks.

## How does Astro fetch content from a CMS?

Astro fetches CMS content in one of three ways: through an official integration from the CMS vendor, through the vendor's JavaScript SDK or a plain fetch call in a page, or through a content collection loader. Loaders are the tidiest route for most sites, because content arrives typed and validated in one place.

- **Integrations.** Some CMSs ship an Astro integration that wires up a client and helpers; the Astro docs name Storyblok as one example, and Sanity has another.
- **SDK or fetch.** "Others provide a JavaScript SDK," in the docs' words, which you call from a page's frontmatter. This is quick to start but scatters queries across pages.
- **Loaders.** A build-time loader pulls entries into a content collection when the site builds. On third-party loaders, the docs say: "Several already exist for popular content management systems." A live loader fetches on each request instead.

The loader you pick sets your publishing model. With build-time collections, publishing in the CMS usually triggers a webhook that starts a new build, which is simple and fast to serve but slower to update. With live collections and server rendering, content is current on every request, at the cost of a fetch each time.

Astro 7 adds a middle path. Route caching is now stable, a live loader can attach cache hints such as tags and a last-modified time to the data it returns, and code can invalidate cached routes by tag. A CMS webhook can then clear only the pages an edit touched. Astro 7 also adds experimental CDN cache providers for Netlify, Vercel, and Cloudflare.

## How do you connect Sanity to Astro?

Install Sanity's official integration, @sanity/astro, add your project ID and dataset to the Astro config, and query content with its configured client. For previews, add Sanity's Visual Editing on server-rendered routes with a read token. You can also load Sanity content into a content collection with its experimental loader.

1. **Install the integration.** Add @sanity/astro and set your Sanity project ID and dataset in astro.config.
2. **Query content.** Import sanityClient from "sanity:client" in a page or loader and fetch with GROQ, Sanity's query language. Named clients cover more than one project or dataset.
3. **Embed the Studio if you want one URL.** Set studioBasePath, for example /admin, and add a sanity.config.ts file. This needs the React integration, @astrojs/react.
4. **Add Visual Editing for previews.** Sanity's plugin page says "Visual Editing only works for server-side rendered pages," and it needs a read token with Viewer permissions. Keep the token on the server, and keep preview routes out of search with noindex.
5. **Render rich text and images.** Sanity's page points to astro-portabletext for Portable Text and @sanity/image-url for images.
6. **Try the loader.** The experimental sanityLoader feeds GROQ results into Astro content collections and needs Astro 5 or later.

Our own site runs on Astro and Sanity, and its robots.txt points to a sitemap index with one child sitemap. On our headless builds, content arrives in the HTML through server-side rendering or static site generation, so search engines and AI crawlers read it without running JavaScript.

We build headless sites on Astro and Next.js with Sanity, so we have an interest in the topic. See our [headless CMS agency](/headless-cms-agency) page for how we run those projects.

## What changed in Astro 7 for CMS-driven sites?

Astro 7, released June 22, 2026, made route caching stable, switched to a Rust compiler, and made a new Rust-based processor, Sätteri, the default for Markdown and MDX. Sites that render CMS content should test templates and Markdown output before upgrading, because the new compiler is stricter about markup.

Three changes matter for sites fed by a CMS:

- **Stricter markup.** Unclosed tags and unterminated attributes now raise errors instead of being corrected, and whitespace between inline elements collapses. Templates that render CMS content can fail to build, or change spacing, after the upgrade.
- **Markdown pipeline.** Sätteri replaces the unified pipeline by default. If your CMS stores Markdown and you rely on remark or rehype plugins, you need to opt into @astrojs/markdown-remark.
- **Caching.** If you tried route caching while it was experimental, the cache and routeRules settings move out of the experimental block to the top level.

Astro reports build times 15% to 61% faster in its own benchmarks, which helps sites that rebuild on every CMS publish. For Core Web Vitals on Astro sites, the bigger risk is usually third-party scripts, as our [Core Web Vitals guide](/blog/core-web-vitals-optimization) explains.
