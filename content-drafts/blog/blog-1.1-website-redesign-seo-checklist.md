---
slug: website-redesign-seo-checklist
url: /blog/website-redesign-seo-checklist
pageType: guide
draft: true
blockedBy: []
topicId: "1.1"
wave: 1
title: "Website Redesign SEO Checklist for B2B SaaS | BenorMedia"
description: "An SEO checklist for a B2B SaaS website redesign: what to freeze, how to build the redirect map, what to test at launch, and what to watch for 90 days."
h1: "Website redesign SEO: a checklist for B2B SaaS teams, from the URL map to day 90"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-12-15
updatedAt: 2026-12-15
reviewEvery: none
primaryKeyword: "website redesign seo"
secondaryKeywords: []
takeaways:
  - "Record a baseline before the project starts: top pages and queries, conversions, and every URL with its metadata."
  - "Freeze the URLs, titles, and main copy of the pages that bring search traffic, and change them in a second release."
  - "Map every changed URL to one server-side permanent redirect, and return a 404 or 410 for pages with no equivalent instead of sending them all to the home page."
  - "Watch Search Console for 90 days after launch: old URLs should drop out of the index while new ones gain impressions."
faqHeading: "Questions about SEO in a website redesign"
faq:
  - q: "Will a website redesign hurt SEO?"
    a: "It can if URLs change without redirects, top pages lose their content, or internal links break. Google says rankings may fluctuate while it recrawls a moved site, and most pages of a small to medium site take a few weeks to move."
  - q: "How long should you keep redirects after a redesign?"
    a: "Google says to keep them for as long as possible, generally at least 1 year."
  - q: "Should you redirect removed pages to the home page?"
    a: "No. Google advises against redirecting many old URLs to one irrelevant page, which it can treat as a soft 404. Redirect to the closest relevant page, or return a 404 or 410 if there is none."
  - q: "Do you need the Change of Address tool for a redesign?"
    a: "Only if the domain or subdomain changes. Google says not to use it for path changes within the same site, for a move from http to https, or for www changes."
  - q: "How many redirects can a Webflow site have?"
    a: "Webflow has no hard limit but recommends keeping the total to about 1,000 as a best practice. A CSV import replaces all existing redirects, so export the current list first."
related:
  - /website-redesign
  - /guides/wordpress-to-webflow-migration
  - /webflow-migration
  - /webflow-seo-agency
sources:
  - label: "Google Search Central: Site moves with URL changes"
    url: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
    accessed: 2026-10-15
  - label: "Google Search Central: Redirects and Google Search"
    url: https://developers.google.com/search/docs/crawling-indexing/301-redirects
    accessed: 2026-10-15
  - label: "Search Console Help: Change of Address tool"
    url: https://support.google.com/webmasters/answer/9370220?hl=en
    accessed: 2026-10-15
  - label: "Webflow Help Center: How do I set up redirects in Webflow?"
    url: https://help.webflow.com/hc/en-us/articles/33961294898835-How-do-I-set-up-redirects-in-Webflow
    accessed: 2026-10-15
  - label: "Webflow Help Center: Import/export 301 redirects"
    url: https://help.webflow.com/hc/en-us/articles/33961211526291-Import-export-301-redirects
    accessed: 2026-10-15
  - label: "Webflow Help Center: Webflow staging subdomain"
    url: https://help.webflow.com/hc/en-us/articles/33961419650067-Webflow-staging-subdomain
    accessed: 2026-10-15
  - label: "Webflow Help Center: How to update DNS records when migrating a live site to Webflow"
    url: https://help.webflow.com/hc/en-us/articles/44474625240211-How-to-update-DNS-records-when-migrating-a-live-site-to-Webflow
    accessed: 2026-10-15
  - label: "BenorMedia: Website Redesign Services for B2B & SaaS"
    url: https://www.benormedia.com/website-redesign
    accessed: 2026-10-15
  - label: "BenorMedia: How to Migrate WordPress to Webflow"
    url: https://www.benormedia.com/guides/wordpress-to-webflow-migration
    accessed: 2026-10-15
volatile:
  - "Site-move steps: few weeks for small to medium sites, ranking fluctuation, keep redirects generally at least 1 year, changes one after the other, no mass redirects to one irrelevant URL, 404 or 410 for content with no equivalent, internal links, canonicals, sitemaps, and monitoring (source: Site moves with URL changes, updated 2026-08-20)"
  - "Permanent server-side redirects, 301 and 308 (source: Redirects and Google Search, updated 2026-04-14)"
  - "Change of Address tool: domain or subdomain moves only, 180 days (source: Change of Address tool, checked 2026-10-15)"
  - "Webflow redirects: menu path, capture groups, order, about 1,000 recommended, paid plan, publish to apply (source: updated 2026-05-19); CSV import overwrites all redirects, 16MB file (source: updated 2024-10-01)"
  - "Webflow staging subdomain can be kept out of search results (source: updated 2026-08-02); lower DNS TTL at least one TTL period ahead (source: updated 2026-02-02)"
volatileChecked: 2026-10-15
inbound:
  - page: /website-redesign
    anchor: "website redesign SEO checklist"
    sentence: "In 'Protect your rankings through launch.': Use our website redesign SEO checklist to plan each step."
  - page: /webflow-seo-agency
    anchor: "SEO checklist for a redesign"
    sentence: "In the 'Index, crawl and on-page check.' item: If a redesign is coming, start with our SEO checklist for a redesign."
editorNotes:
  - "The live redesign page and the WordPress migration guide already cover the URL map, 301s, staging, and launch checks. This post adds the baseline, the freeze list, the keep, merge, or retire decision, the 404 or 410 rule, the Change of Address limits, and the 90-day plan, and links to the guide for the Webflow steps."
  - "The live redesign page says retired pages get a 301 to their closest match. Google adds that pages with no equivalent should return 404 or 410; the post follows Google, which doesn't contradict the page when a close match exists."
  - "First-hand results from a past redesign are a marker (P11-1)."
  - "No 30-day recheck and no AI note, per Sergio's answers of 2026-10-15."
---

To protect SEO in a website redesign, decide early which pages and URLs stay, map every URL that changes to one permanent redirect, and watch Search Console for at least 90 days after launch. This website redesign SEO checklist for marketing leads and founders at B2B SaaS companies covers each step, as of October 2026.

## Does a website redesign hurt SEO?

It can, when URLs change without 301 redirects, top pages lose their content, internal links break, or new templates load slowly. A redesign that changes the site structure and its URLs is a site move for Google, and Google says rankings may fluctuate while it recrawls and reindexes the site. A small to medium-sized site can take a few weeks for most pages to move in Google's index, and larger sites take longer.

Google also advises planning changes one after the other, not all at the same time. In practice, that means launching the new design and templates first and leaving the copy of your best pages for a second release. If your URLs don't change at all, the redesign isn't a site move, but new templates and copy can still change your search rankings, so the rest of this SEO checklist applies.

## What should you record from the current site before the redesign starts?

A baseline, in effect an SEO audit of the current site, that you can compare against after launch. Without one, nobody can tell a normal post-launch dip from a real loss.

- **Search performance:** clicks and impressions by page and by query from Google Search Console, for as long a period as you can export.
- **Conversions:** demo requests, sign-ups, and other key events by landing page from your analytics.
- **Every URL:** a technical SEO crawl of the old site with each page's title, meta description, canonical, H1, and structured data.
- **Links:** the pages other sites link to most, so they keep a redirect or a live URL.

From that baseline, mark each page **keep**, **merge**, or **retire**. Keep pages are your top performing pages: they bring search traffic, leads, or links. Merge pages overlap with a stronger page. Retire pages have no audience and no equivalent on the new website.

## Which pages and elements should you freeze to protect organic traffic?

Freeze whatever already earns search traffic on the keep pages, and change it later. We hold the copy of top-ranking pages steady at launch and change it in a second release, so a ranking change after launch has one cause, not several.

Table: What to freeze at launch, and when to change it

| Element | At launch | When to change it |
| --- | --- | --- |
| URLs of keep pages | Keep them | Only with a mapped permanent redirect |
| Titles and H1s of keep pages | Keep them | In a second release, one page group at a time |
| Main copy of keep pages | Keep it | After rankings settle |
| Internal links | Update internal links to the new URLs | At launch |
| Structured data | Keep the same types | At launch, tested on staging |
| Navigation and visual design | Change freely | At launch |

Navigation, layout, and visual design are where a redesign improves the user experience, so they can change at launch.

Content needs a short freeze, too. We pause content changes on the old site for the last few days before launch, so the final content move and the redirect tests match what's live.

## How do you build a redirect map?

List every old URL in one sheet and give each one a single destination before the build starts. Useful columns: old URL, status (keep, merge, or retire), new URL, response code, and a "tested" column for QA.

Rules for each row:

1. **Use permanent server-side redirects.** Google recommends a permanent server-side redirect whenever possible; 301 and 308 are both permanent.
2. **One hop.** Send each old URL straight to its final address and avoid redirect chains.
3. **Merge with care.** Redirecting several old pages to one new page is fine when the new page consolidates their content.
4. **Don't send retired pages to the home page.** Google says not to redirect many old URLs to one irrelevant destination, which it can treat as a soft 404. If a page has no equivalent, let its URL return a 404 or 410.
5. **Keep the redirects.** Google says to keep them for as long as possible, generally at least 1 year.

On Webflow, redirects live under Site settings, then Publishing, then 301 redirects, and they need a paid Site plan or a paid Workspace plan. A capture group such as (.*) in the old path, with %1 in the new one, redirects a whole folder when its URL structure changes; put specific rules above broad ones, because order matters. Webflow has no hard limit but recommends keeping the total to about 1,000 as a best practice. A CSV import overwrites all existing redirects, so export the current list first. Redirects take effect when you publish. Our [WordPress to Webflow migration guide](/guides/wordpress-to-webflow-migration) covers the import step by step.

The Change of Address tool in Search Console is only for moving to a new domain or subdomain. Google says not to use it for path changes within the same site, for a move from http to https, or for www changes.

## What should you test before and on launch day?

Test on a staging site that search engines can't index, then test again on the redesigned site once it's live. Webflow lets you keep the webflow.io staging site out of search results by disabling search engine indexing for it.

Before launch, on staging:

- every template has a title, a meta description, and a self-referencing canonical that uses the new URL;
- internal links point to new URLs, not to redirects;
- hreflang annotations, if you have them, use the new URLs;
- every row in the redirect map returns the expected code in one hop;
- there are no broken internal links, and page speed, Core Web Vitals, and mobile usability are checked on the key templates;
- you have a list of every noindex rule used during development, so you can remove each one at launch.

On launch day:

- publish, then check robots.txt and a sample of pages on the live domain for leftover blocks or noindex tags;
- run the whole redirect map against production;
- submit the updated XML sitemap in Google Search Console;
- if DNS changes, lower the TTL at least one full TTL period ahead, as Webflow recommends.

## What should you monitor in the 90 days after launch?

Google Search Console, your analytics, and the redirect map, with a check-in at each stage while search engines recrawl the site. Google says that after a move, sitemaps for old URLs should show fewer indexed pages while those for new URLs grow, search reports should start showing new URLs, and the indexing report should be checked regularly for unexpected crawl errors.

Table: A 90-day monitoring plan after a website redesign

| When | What to check | Where |
| --- | --- | --- |
| Launch day | Redirects, robots.txt, noindex tags, sitemap submitted | A crawl of the live site and Search Console |
| Days 1 to 14 | 404 errors and broken links, crawl errors, new URLs being indexed, demo requests | Indexing reports and analytics, daily |
| Weeks 3 to 6 | Clicks and impressions by page against the baseline; old URLs dropping out | Performance reports, weekly |
| Weeks 7 to 13 | Keep pages back to their baseline; second-release copy changes | Performance reports and analytics |

For the first weeks we check Search Console coverage, 404 errors, and the keep pages daily, and we agree before launch on how much fluctuation counts as normal. If a keep page is still well below its baseline after six weeks, compare its old and new versions before you change anything else.

We run website redesigns and migrations for B2B and SaaS companies, so we have an interest in the topic. For how we run one end to end, see our [website redesign](/website-redesign) page.

## How was this post written and checked?

This post draws on Google Search Central, Search Console Help, and Webflow's help center, all opened on October 15, 2026, and listed in the sources.
