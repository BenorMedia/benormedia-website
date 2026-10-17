---
slug: headless-cms-seo
url: /blog/headless-cms-seo
pageType: guide
draft: false
blockedBy: []
topicId: "3.1"
wave: 1
title: "Headless CMS SEO: What Changes and What Breaks | BenorMedia"
description: "What a headless CMS changes for SEO on an Astro or Next.js build: rendering, metadata, redirects, sitemaps, and previews, plus checks to run before launch."
h1: "Headless CMS SEO: what changes, what breaks, and what to check before launch"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-17
updatedAt: 2026-10-17
reviewEvery: none
primaryKeyword: "headless cms seo"
secondaryKeywords: []
takeaways:
  - "A headless CMS doesn't hurt SEO by itself, but rendering, metadata, redirects, sitemaps, and previews become your code's job instead of the platform's."
  - "Google still recommends server-side rendering or pre-rendering, and describes dynamic rendering as a workaround, not a long-term solution."
  - "Use permanent server-side redirects, 301 or 308, and check your host's limits: Vercel allows 2,048 redirect rules in its configuration."
  - "Google uses a sitemap's lastmod value only if it's consistently and verifiably accurate, and it ignores priority and changefreq."
  - "Vercel marks preview deployments noindex automatically, except when a custom domain is assigned to a non-production branch."
faqHeading: "Questions about headless CMS and SEO"
faq:
  - q: "Is a headless CMS good for SEO?"
    a: "It can be as good as any platform if pages are rendered on the server or at build time and the SEO basics are built into the templates. Search engines never see the CMS; they see the HTML your front end serves."
  - q: "Does Google render JavaScript on headless sites?"
    a: "Yes, but in a separate step: pages can wait in a render queue for a few seconds or longer. Google still recommends server-side rendering or pre-rendering."
  - q: "Should I use dynamic rendering?"
    a: "No. Google describes dynamic rendering as a workaround, not a long-term solution, and recommends server-side rendering, static rendering, or hydration instead."
  - q: "Are Vercel preview deployments indexed?"
    a: "Not by default. Vercel adds an X-Robots-Tag: noindex header to every preview deployment, but leaves it off when a custom domain is assigned to a non-production branch."
  - q: "Does Astro generate a sitemap automatically?"
    a: "With the @astrojs/sitemap integration, yes: it writes sitemap-index.xml and sitemap-0.xml at build time. It needs your site's URL in the config and can't add routes that are rendered on demand."
related:
  - /headless-cms-agency
  - /guides/webflow-vs-custom-code
  - /custom-websites-migrations
sources:
  - label: "Google Search Central: Understand the JavaScript SEO basics"
    url: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
    accessed: 2026-10-15
  - label: "Google Search Central: Dynamic rendering as a workaround"
    url: https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering
    accessed: 2026-10-15
  - label: "Google Search Central: Introduction to structured data markup in Google Search"
    url: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
    accessed: 2026-10-15
  - label: "Google Search Central: How to specify a canonical URL with rel=\"canonical\" and other methods"
    url: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
    accessed: 2026-10-15
  - label: "Google Search Central: Redirects and Google Search"
    url: https://developers.google.com/search/docs/crawling-indexing/301-redirects
    accessed: 2026-10-15
  - label: "Google Search Central: Build and submit a sitemap"
    url: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
    accessed: 2026-10-15
  - label: "Google Search Central: Site moves with URL changes"
    url: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
    accessed: 2026-10-15
  - label: "Astro Docs: @astrojs/sitemap"
    url: https://docs.astro.build/en/guides/integrations-guide/sitemap/
    accessed: 2026-10-15
  - label: "Astro Docs: On-demand rendering"
    url: https://docs.astro.build/en/guides/on-demand-rendering/
    accessed: 2026-10-15
  - label: "Sanity Docs: Visual editing architecture overview"
    url: https://www.sanity.io/docs/visual-editing/visual-editing-architecture
    accessed: 2026-10-15
  - label: "Sanity Docs: Client setup and stega for visual editing"
    url: https://www.sanity.io/docs/visual-editing/visual-editing-client-stega
    accessed: 2026-10-15
  - label: "Sanity Docs: Visual Editing with Astro"
    url: https://www.sanity.io/docs/astro/astro-visual-editing
    accessed: 2026-10-15
  - label: "Vercel: Are Vercel Preview Deployments indexed by search engines?"
    url: https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines
    accessed: 2026-10-15
  - label: "Vercel: How can I increase the limit of redirects or use dynamic redirects on Vercel?"
    url: https://vercel.com/kb/guide/how-can-i-increase-the-limit-of-redirects-or-use-dynamic-redirects-on-vercel
    accessed: 2026-10-15
  - label: "BenorMedia: Headless CMS Agency"
    url: https://www.benormedia.com/headless-cms-agency
    accessed: 2026-10-15
  - label: "BenorMedia: Webflow vs Custom Code: When to Leave Webflow"
    url: https://www.benormedia.com/guides/webflow-vs-custom-code
    accessed: 2026-10-15
volatile:
  - "Render queue, server-side rendering advice, soft 404 fixes, noindex and canonical behavior (source: JavaScript SEO basics, updated 2026-03-04)"
  - "Dynamic rendering described as a workaround (source: dynamic rendering page, updated 2025-12-10)"
  - "Structured data helps Google understand pages and can enable rich results; JSON-LD recommended (source: structured data intro, updated 2025-12-10); canonical reasons and Google's final choice (source: canonical page, updated 2026-07-10)"
  - "Permanent server-side redirects, 301 and 308 as permanent, JavaScript redirects as a last resort (source: Redirects and Google Search, updated 2026-04-14)"
  - "lastmod accuracy rule, priority and changefreq ignored, 50,000 URLs or 50MB per sitemap (source: Build and submit a sitemap, updated 2026-07-08)"
  - "Astro: static by default, adapters for on-demand rendering, sitemap files and limits (sources: Astro docs, checked 2026-10-15)"
  - "Sanity: Presentation tool and draft mode, stega filtering and cleaning, Astro visual editing needs server output (sources: Sanity docs, updated 2026-07-27, 2026-08-11, and 2026-07-30)"
  - "Vercel: noindex on preview deployments and the custom-domain exception, 2,048 redirect rules (sources: Vercel KB, updated 2026-10-02)"
volatileChecked: 2026-10-15
inbound:
  - page: /headless-cms-agency
    anchor: "what changes for SEO on a headless build"
    sentence: "Where the page explains rendering and metadata: See what changes for SEO on a headless build."
  - page: /guides/webflow-vs-custom-code
    anchor: "headless CMS SEO checks"
    sentence: "Where the guide lists what custom code has to set in templates: The headless CMS SEO checks go into more detail."
editorNotes:
  - "The second-ranking page for this query covers meta tags, slugs, canonicals, sitemaps, and structured data at a high level. This post adds what it lacks: rendering, redirects and host limits, lastmod accuracy, previews, stega, and a pre-launch checklist."
  - "First-hand details of the benormedia.com build are a marker (P31-1). The post states only what the live pages and the public robots.txt and sitemap show."
  - "No 30-day recheck and no AI note, per Sergio's answers of 2026-10-15."
---

A headless CMS doesn't hurt SEO by itself, but it moves jobs that a hosted platform does for you into your own code: rendering, metadata, redirects, sitemaps, and previews. This guide for marketing leads and founders at B2B SaaS companies covers what changes, what breaks, and what to check before launch, as of October 2026.

## Is a headless CMS bad for SEO?

No. A headless CMS, or headless content management system, stores content and sends it through an API to a separate front end, such as an Astro or Next.js site; unlike a traditional CMS, it doesn't build the pages itself, and the same content can feed other channels, such as an app or a help center. Search engines never see the CMS; they see the HTML that front end serves, so a headless site can hold its search rankings as well as any other.

What changes is who does the technical SEO work. On a hosted platform like Webflow, the platform handles sitemaps, robots.txt, 301 redirects, and canonical tags. On a headless build, those have to be set in templates so every new page gets them.

Headless SEO risks are predictable. As our Webflow vs custom code guide puts it, most ranking problems after a move come from missing redirects, dropped metadata, or pages that render without their content.

Table: Where headless builds break, and how to catch it before launch

| Area | What can break | How to catch it |
| --- | --- | --- |
| Rendering | Main content appears only after JavaScript runs | Search the page source for a sentence from the main text |
| Metadata | New templates ship without titles, descriptions, or canonicals | Crawl staging and list empty or duplicate titles |
| Redirects | Rules are missing, chained, or written in JavaScript | Test every old URL for one server-side permanent redirect |
| Sitemaps | Pages rendered on demand are left out, or lastmod is always the build date | Compare the sitemap with your full URL list |
| Previews | Preview URLs get indexed | Check for a noindex header on every preview address |
| Visual editing | Hidden characters end up in titles or structured data | Clean SEO fields before they render |

## Should a headless site use server-side or client-side rendering?

Server-side or static rendering, so search engines get the content in the HTML before any JavaScript runs. Google processes JavaScript pages in three steps, crawling, rendering, and indexing, and with client-side rendering a page can wait in the render queue for a few seconds or longer before Google sees the content JavaScript adds. Google still recommends server-side rendering or pre-rendering, because it makes a site faster for users and crawlers.

Google now describes dynamic rendering, which serves bots a different pre-rendered version, as a workaround and not a long-term solution. It recommends server-side rendering, static rendering, or hydration instead.

Astro makes this the default: it works as a static site generator and pre-renders pages, routes, and endpoints as static pages at build time unless you opt a page into on-demand rendering, which needs an adapter, such as Astro's official adapter for Vercel. On our headless builds, content arrives in the HTML through server-side rendering or static site generation.

To check a page, open its source, not the browser's inspector, which shows the rendered HTML, and search for a sentence from the main text. If it's missing from the source, the content depends on JavaScript.

## What happens to meta tags, canonical URLs, and structured data?

They become fields in your content model and template defaults, and the template decides what happens when a field is empty. We set up titles, descriptions, Open Graph images, and canonical tags as CMS fields with defaults that editors can change without a developer, and generate sitemaps and structured data, or schema markup, from templates.

Both matter more than they look. Google uses structured data to understand the content of a page, and it can make a page eligible for rich results in search; Google recommends JSON-LD in most cases. A canonical URL tells Google which of several similar or duplicate pages you want in search results, though Google makes the final choice.

Four details from Google's documentation matter here:

- Each new URL should carry a self-referencing canonical tag.
- Google can read a canonical tag added with JavaScript but doesn't recommend it, and it shouldn't conflict with the canonical in the HTML.
- If the HTML Google receives has a noindex tag, Google may skip rendering, so removing noindex with JavaScript may not work.
- On sites with client-side routing, a missing page should still return a 404, either through a JavaScript redirect to a URL that returns 404 or a noindex tag, so Google doesn't index an error page as a soft 404.

If your headless CMS is Sanity and you use its visual editing, check one more thing. Sanity's stega encoding adds invisible characters to strings so the editor can link text back to its field. Sanity says stega in the head, in meta tags, in JSON-LD, or in URLs always causes bugs. Its default filter skips SEO and metadata fields and slugs, and Sanity's stegaClean function strips the characters from other values. Stega is usually turned off in production, and a query for a sitemap can turn it off on its own.

## How do redirects work on a headless site?

They live in code or in your host's configuration, not in a settings panel, so someone has to own them. Google recommends a permanent server-side redirect whenever possible. Both 301 and 308 are permanent, and Google takes them as a signal that the target should be the canonical URL. JavaScript redirects are a last resort, because Google only sees them after rendering.

If the URL structure changes, check your host's limits before you plan the redirect map. Vercel allows 2,048 redirect rules in a project's configuration. Beyond that, it points to bulk redirects or Routing Middleware, and its code samples return 308.

Keep redirects for as long as you can, so old links keep sending organic traffic: Google's site-move guidance says generally at least 1 year. We keep every URL we can and give each changed one a permanent redirect.

If your marketing team renames pages often, store redirects as entries in the headless CMS and generate the rules at build time, so a new redirect doesn't wait for a developer.

## How do you keep sitemaps accurate on a headless build?

Generate them from the same headless CMS data that builds the pages, and keep lastmod honest. Astro's sitemap integration writes an XML sitemap index, sitemap-index.xml, and sitemap-0.xml at build time. It needs your site's deployed URL in the config, and it can't add dynamic routes rendered on demand, so those need a sitemap of their own.

Google's rules for sitemaps:

- Google uses lastmod only if it's consistently and verifiably accurate. A change to the main content, the structured data, or links counts; a new copyright date doesn't.
- Google ignores priority and changefreq.
- One sitemap can hold 50,000 URLs or 50MB uncompressed; larger sites need a sitemap index.
- List absolute URLs, and only the URLs you want in search results.

A lastmod that changes on every build isn't accurate, so Google may ignore it. Take it from the CMS's own record of when the content changed.

## Can previews and staging sites get indexed?

They can, so check the headers. Vercel adds an X-Robots-Tag: noindex header to every preview deployment automatically, but it leaves the header off when a custom domain is assigned to a non-production branch. A staging site on its own domain needs its own noindex or password, or search engines may index it.

Previews also change how a headless CMS site renders. Sanity's Presentation tool shows your front end inside the CMS and turns on draft mode through a secret endpoint, and drafts are only returned to requests that carry an auth token. With Astro, Sanity's visual editing needs server output, because draft mode checks cookies on each request, and an edit triggers a full page reload. So a site that's static in production needs a preview build that renders on demand.

## What should you check before a headless site goes live?

Headless SEO means running the checks the platform used to run for you. A pre-launch list for a headless build:

1. Every template's HTML contains its main content.
2. Every template outputs a title, description, and self-referencing canonical from the content model, with no hidden stega characters.
3. Every old URL returns one server-side permanent redirect to its new address, within your host's limits.
4. robots.txt allows the search crawlers you want, and no staging noindex is left on production.
5. The sitemap lists only canonical, indexable, absolute URLs with accurate lastmod values.
6. Preview and staging addresses return noindex.
7. Key templates pass Core Web Vitals lab tests, and a staging crawl matches the live site's URL list.
8. Internal linking uses final URLs, not redirects, and the sitemap is submitted in Google Search Console.

Our own site runs on Astro and Sanity, and its robots.txt points to a sitemap index with one child sitemap. For how we build these sites, see our [headless CMS](/headless-cms-agency) page.

We build headless sites on Astro and Next.js with Sanity, so we have an interest in the topic.

## How was this post written and checked?

This post draws on Google Search Central and on the documentation of Astro, Sanity, and Vercel, all opened on October 15, 2026, and listed in the sources.
