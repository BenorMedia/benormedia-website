---
slug: saas-technical-seo
url: /blog/saas-technical-seo
pageType: guide
draft: false
blockedBy: []
topicId: "5.3"
wave: 2
title: "SaaS Technical SEO: First 12 Audit Checks | BenorMedia"
description: "SaaS technical SEO, in order: the first 12 checks of an audit, from robots.txt and indexing to rendering, Core Web Vitals, and structured data."
h1: "SaaS technical SEO: the first 12 checks of an audit, in order"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-18
updatedAt: 2026-10-18
reviewEvery: none
primaryKeyword: "saas technical seo"
secondaryKeywords: []
takeaways:
  - "Start with what can stop a page from being indexed at all: robots.txt rules, leftover noindex tags, and the Page indexing report."
  - "A SaaS site is usually several sites: marketing, app, docs, and staging. Check that only the right ones are open to search engines."
  - "robots.txt doesn't keep a page out of the index; a noindex tag does, and only if crawlers can reach the page."
  - "Content and links must be in the HTML as real anchor links, because not every crawler runs JavaScript."
  - "Most SaaS marketing sites are too small for crawl budget to matter; fix indexing and rendering first."
faqHeading: "Questions about SaaS technical SEO"
faq:
  - q: "What is SaaS technical SEO?"
    a: "It's the work that lets search engines crawl, render, and index a SaaS company's public pages, across the marketing site, blog, docs, and any other public subdomains, while keeping the app, staging, and preview environments out of search."
  - q: "How often should a SaaS company run a technical SEO audit?"
    a: "Run a full audit before and after any redesign or migration, and a short check after major releases. Between audits, review the Page indexing report and Core Web Vitals in Search Console monthly."
  - q: "Does crawl budget matter for a SaaS website?"
    a: "Usually not. Google's crawl budget guide is written for sites with more than a million pages, or more than 10,000 pages that change daily. Most SaaS marketing sites are far smaller."
  - q: "Should the app or login pages be indexed?"
    a: "Usually not. Logged-in app screens add no search value and can create thin or duplicate pages. Keep the login page out of the index with noindex if it isn't useful to searchers, and make sure the app itself requires authentication."
  - q: "What are good Core Web Vitals scores?"
    a: "Google's targets are a Largest Contentful Paint within 2.5 seconds, an Interaction to Next Paint under 200 milliseconds, and a Cumulative Layout Shift under 0.1."
related:
  - /webflow-seo-agency
  - /growth
  - /headless-cms-agency
  - /guides/webflow-vs-custom-code
sources:
  - label: "Google Search Central: Introduction to robots.txt"
    url: https://developers.google.com/search/docs/crawling-indexing/robots/intro
    accessed: 2026-10-18
  - label: "Google Search Central: How Google interprets the robots.txt specification"
    url: https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt
    accessed: 2026-10-15
  - label: "Google Search Central: Block Search indexing with noindex"
    url: https://developers.google.com/search/docs/crawling-indexing/block-indexing
    accessed: 2026-10-18
  - label: "Search Console Help: Page indexing report"
    url: https://support.google.com/webmasters/answer/7440203
    accessed: 2026-10-18
  - label: "Google Search Central: Build and submit a sitemap"
    url: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
    accessed: 2026-10-15
  - label: "Google Search Central: How to specify a canonical URL"
    url: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
    accessed: 2026-10-15
  - label: "Google Search Central: Redirects and Google Search"
    url: https://developers.google.com/search/docs/crawling-indexing/301-redirects
    accessed: 2026-10-15
  - label: "Google Search Central: Understand JavaScript SEO basics"
    url: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
    accessed: 2026-10-18
  - label: "Google Search Central: Understanding Core Web Vitals and Google search results"
    url: https://developers.google.com/search/docs/appearance/core-web-vitals
    accessed: 2026-10-18
  - label: "Google Search Central: Mobile-first indexing best practices"
    url: https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing
    accessed: 2026-10-17
  - label: "Google Search Central: Introduction to structured data markup"
    url: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
    accessed: 2026-10-15
  - label: "Search Console Help: Add a website property to Search Console"
    url: https://support.google.com/webmasters/answer/34592
    accessed: 2026-10-18
  - label: "Google Crawling Infrastructure: Crawl budget management"
    url: https://developers.google.com/crawling/docs/crawl-budget
    accessed: 2026-10-18
  - label: "Vercel: Are Vercel preview deployments indexed by search engines?"
    url: https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines
    accessed: 2026-10-15
  - label: "BenorMedia: Webflow SEO Agency"
    url: https://www.benormedia.com/webflow-seo-agency
    accessed: 2026-10-18
volatile:
  - "Page indexing report status names and definitions (source: Page indexing report, checked 2026-10-18)"
  - "Core Web Vitals targets: LCP 2.5 s, INP 200 ms, CLS 0.1 (source: updated 2025-12-10)"
  - "Crawl budget guide audience: 1M+ pages or 10,000+ pages changing daily (source: updated 2026-07-22)"
  - "JavaScript SEO: three phases, server-side or pre-rendering recommended, href links, SPA soft 404 fixes (source: updated 2026-03-04)"
volatileChecked: 2026-10-18
inbound:
  - page: /webflow-seo-agency
    anchor: "the first 12 checks of a SaaS technical SEO audit"
    sentence: "In the 'Index, crawl and on-page check.' item: See the first 12 checks of a SaaS technical SEO audit, in order."
  - page: /growth
    anchor: "SaaS technical SEO checks"
    sentence: "In step 02, Technical SEO & AEO foundation: Read the SaaS technical SEO checks we run first."
editorNotes:
  - "The topic row asks for 'the fixes that mattered'. Without audit records, the post gives the checks and Google's documented fixes; it claims no client results."
  - "No tool names, per the topic row and the drafting rules. 'A crawler' and 'Search Console' are used generically."
  - "Once post 3.1 (headless CMS SEO) is live, link it from check 8."
---

SaaS technical SEO is the work that lets search engines crawl, render, and index your public pages while keeping the app and test environments out of search. These are the first 12 checks of an audit, in the order to run them, so the issues that can hide pages from Google entirely get fixed first.

## What makes technical SEO for SaaS different?

A SaaS company rarely has one website. It has a marketing site, a blog, often a docs or help center on its own subdomain, a login page, the app itself, and staging or preview environments for each of them. Every one of those is a set of URLs that search engines can find, and only some of them should be in search results. Docs and integration pages usually should be: buyers search for them, and they answer specific product questions.

SaaS sites also change often. Product launches add pages, pricing changes rewrite templates, and modern JavaScript frameworks decide what HTML a crawler receives. That's why a technical SEO audit for SaaS companies starts with indexing and rendering, not with keyword research or content strategy. If search engines can't reach or read your web pages, no amount of content will bring organic traffic.

The 12 checks below fall into five groups. Run them in order, because each group depends on the one before.

Table: The first 12 checks of a SaaS technical SEO audit

| # | Check | What it can break |
| --- | --- | --- |
| 1 | robots.txt on every public host | Crawling of whole sections |
| 2 | Leftover noindex tags | Indexing of key pages |
| 3 | Staging, preview, and app environments | Duplicate content in search |
| 4 | Page indexing report | Hidden indexing problems |
| 5 | XML sitemaps | Discovery of new pages |
| 6 | Canonical tags | Which URL Google shows |
| 7 | Redirects and status codes | Lost link equity, soft 404s |
| 8 | Rendering of JavaScript content | Content crawlers can't see |
| 9 | Internal links | Discovery and site structure |
| 10 | Core Web Vitals | Page experience on mobile |
| 11 | Structured data | Rich results and machine-readable facts |
| 12 | Search Console coverage of every subdomain | Problems nobody sees |

## Which crawl and indexing checks come first?

The ones that can remove a page from Google without anyone noticing.

**1. robots.txt on every public host.** Each subdomain has its own robots.txt file, so check the marketing site, the blog, and the docs separately. Look for a leftover "Disallow: /" from development, rules that block CSS and JavaScript files Google needs to render pages, and rules that block AI search crawlers you want to allow. Remember what robots.txt can't do: Google says it isn't a way to keep a page out of Google, and a blocked page can still appear in search results if other pages link to it.

**2. Leftover noindex tags.** A noindex tag left over from development can keep a new page out of organic search without anyone noticing. Crawl the live site and list every URL with a noindex meta tag or an X-Robots-Tag header, then confirm each one is intentional. A noindex rule only works if crawlers can reach the page, so never block a noindexed page in robots.txt.

**3. Staging, preview, and app environments.** Search for your brand on each staging and preview domain to see whether any of them are indexed. Some hosts handle part of this for you; Vercel, for example, adds a noindex header to preview deployments, except custom domains on non-production branches. The logged-in app should require authentication, and the login page usually doesn't need to be in search at all.

**4. The Page indexing report.** In Google Search Console, the Page indexing report lists every reason a known URL isn't indexed. Google says not every URL needs to be indexed, so read the reasons, not the total. "Crawled, currently not indexed" on a key product page needs a closer look; "Alternate page with proper canonical tag" usually needs nothing.

**5. XML sitemaps.** XML sitemaps should list only canonical, indexable URLs that return a 200 status, with an accurate lastmod date. Sitemaps over 50,000 URLs or 50 MB need to be split. Submit one per host in Search Console and compare the number of submitted URLs with the number indexed.

## How do you check canonicals, redirects, and status codes?

These checks decide which version of a page Google shows and whether old URLs still pass value to new ones.

**6. Canonical tags.** Every indexable page should have a self-referencing canonical with the full, final URL: the right protocol, the right host, and consistent trailing slashes. Watch for templates that point every page's canonical at the home page, and for canonicals that point at redirected or noindexed URLs. Check the other meta tags on the same templates while you're there: unique titles and meta descriptions on every indexable page. Google treats a canonical as a strong hint, not a rule, so the internal links and sitemap should agree with it. Duplicate pages aren't a penalty in themselves, but they split signals and leave Google to choose the version it shows. On SaaS sites they often come from URL parameters (tracking, sorting, filtering) and from old pages left live after a rebrand.

**7. Redirects and status codes.** Crawl the site and every URL in the last redirect map. Old URLs should return a single permanent redirect (301 or 308) to their final address, with no chains or loops. Pages that no longer exist should return a real 404 or 410. A "page not found" screen that returns a 200 status is a soft 404, and JavaScript-routed sites are especially prone to them. Include site security in the same pass: every page should load over HTTPS, and every HTTP URL should redirect to its HTTPS version in one hop.

## Can search engines and AI crawlers read your pages?

On a JavaScript-heavy SaaS site, this is where the biggest problems usually hide.

**8. Rendering of JavaScript content.** Google processes JavaScript sites in three phases: crawling, rendering, and indexing. Rendering can happen later than crawling, and not every crawler runs JavaScript at all, which is why Google still recommends server-side rendering or pre-rendering. Compare the raw HTML of a key page with what users see. If the product description, pricing table, or FAQ only appears after scripts run, move it into the server-rendered HTML. The same HTML is what Google AI Overviews and other AI search features draw on, so this check protects search visibility in both places.

**9. Internal linking and site architecture.** Google finds links only when they're HTML anchor elements with an href attribute. Navigation built from click handlers, or links that only appear after a script runs, can leave whole sections undiscovered. Check that every important page is reachable through real links within a few clicks of the home page, and look for orphan pages: pages in the sitemap that no other page links to. Feature pages, solution pages, and comparison pages should link to each other where it helps users, and hub pages, such as an integrations index or a features overview, should link to every page in their group. Every crawl should also report broken links.

## Which checks cover site speed and mobile friendliness?

**10. Core Web Vitals.** Google's targets are a Largest Contentful Paint within 2.5 seconds, an Interaction to Next Paint under 200 milliseconds, and a Cumulative Layout Shift under 0.1. Use field data from real users in Search Console's Core Web Vitals report, not only lab tests, and check the mobile version first, because that's the version Google uses for indexing. Test on a real phone too, and check that buttons and links are large enough to tap. On SaaS websites, slow page load times often come from third-party scripts (chat widgets, tag managers, testing tools), large hero images or videos, and fonts that shift the layout as they load. Site speed fixes there help users as much as rankings.

## How do you check schema markup and Search Console coverage?

**11. Structured data.** Google says structured data markup helps it understand a page and can make it eligible for rich results, and it recommends JSON-LD. On a SaaS site, the useful types are usually Organization on the home page, Article or BlogPosting on posts, BreadcrumbList on deep pages, and SoftwareApplication or Product where the content supports it. Validate each template, and make sure the markup matches what's visible on the page.

**12. Search Console coverage of every subdomain.** A domain property in Search Console covers every subdomain, protocol, and path, and it's verified with a DNS record. That way, problems on docs or blog subdomains don't go unnoticed. Check that the property is verified, that the right people have access, and that someone reviews the Page indexing and Core Web Vitals reports in Google Search Console every month. That review is how technical issues get caught between audits.

## Which technical SEO issues can wait until later?

Crawl budget, for most companies. Google's crawl budget guide is written for sites with more than a million unique pages, or more than 10,000 pages that change daily, and says other sites can rely on an up-to-date sitemap and regular checks of the Page indexing report. A SaaS marketing site with a few hundred pages is nowhere near that.

Fix the first 12 checks, then move on to search intent, content strategy, and link building. Technical SEO efforts keep search engines from missing your best pages; they don't make thin pages rank, and they won't move keyword rankings on their own.

We run SEO audits for B2B and SaaS sites on Webflow and custom code, so we have an interest in this topic. For how an audit fits into our SEO work, see our [Webflow SEO agency](/webflow-seo-agency) page.
