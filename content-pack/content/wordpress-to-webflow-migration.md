---
slug: wordpress-to-webflow-migration
url: /guides/wordpress-to-webflow-migration
lang: en-US
pageType: guide
wave: 1
draft: false
blockedBy: []
title: "How to Migrate WordPress to Webflow | BenorMedia"
description: "How to migrate from WordPress to Webflow without losing SEO: map URLs, move content, set 301 redirects, test, and monitor. Sourced from Google and Webflow."
h1: "How to migrate from WordPress to Webflow without losing SEO"
primaryKeyword: migrate wordpress to webflow
secondaryKeywords: [migrate from wordpress to webflow]
targetCountry: US
author: "Sergio Gancedo, Managing Director, BenorMedia"
publishedAt: 2026-10-07
updatedAt: 2026-10-25
reviewEvery: 30
breadcrumb:
  - name: Home
    url: /
  - name: Guides
    url: /guides
  - name: How to migrate WordPress to Webflow
    url: /guides/wordpress-to-webflow-migration
schema: [Article, FAQPage, BreadcrumbList]
faqHeading: Questions about migrating from WordPress to Webflow
faq:
  - q: Can you keep your WordPress URLs when you move to Webflow?
    a: "Sometimes. Static pages can keep their paths. Wherever the new structure differs from your WordPress permalinks, each changed URL needs a 301 redirect to its new address. The URL map built before the move shows which URLs change, and Google advises building that map for any move that changes URLs."
  - q: Do you need 301 redirects when you migrate from WordPress to Webflow?
    a: "Yes, for every URL that changes. A 301 is a permanent redirect, and Google recommends permanent server-side redirects for site moves. Webflow takes redirects one at a time in Site settings or in bulk from a CSV file. A bulk import replaces your existing redirect list, so export the current list before you import a new one."
  - q: How long do rankings take to settle after a migration?
    a: "Nobody can give you a date. Google says to expect temporary ranking fluctuation during a move, and for a medium-sized site it can take a few weeks or more before the new URLs are shown. Watch indexing, crawl activity and 404 errors in Search Console, and keep your redirects for at least a year."
  - q: Can you migrate WordPress blog posts to Webflow automatically?
    a: "Largely, yes. Webflow documents a route where you export your WordPress content as an XML file, convert it to CSV, and import it into a CMS Collection, matching fields as you go. Each imported post still needs a check for formatting, images, internal links, and SEO fields before it goes live."
  - q: Will your site go offline during the migration?
    a: "A planned migration does not need downtime. The WordPress site can stay live while the Webflow site is built and tested on a staging copy, and the switch happens when the domain is pointed at the new site. Google advises lowering the DNS TTL about a week ahead and keeping the old setup until its traffic reaches zero."
  - q: What happens to your WordPress plugins when you move to Webflow?
    a: "Plugins do not move to Webflow. Each plugin's job is covered by a Webflow feature, an integration, or custom code, unless that job is dropped. List every active plugin during the audit and decide which of the three applies. SEO fields, redirects, sitemaps, and forms all have native Webflow equivalents."
  - q: How many WordPress to Webflow migrations has BenorMedia done?
    a: "30+ in the last six years, from early-stage companies like Motional Hub to established ones like JOOR, which has raised more than $100 million. The most recent, for Surfe, involved cleaning up more than 3,000 pages."
  - q: What happens in the first call of a WordPress to Webflow migration?
    a: "We map every page on your WordPress site to the new site, which tells us the redirects, templates, and pages to merge, and we agree on the new UI and UX direction."
takeaways:
  - "Plan the URLs first: map every old URL to its new address before anything is built."
  - "Redirect every URL that changes with a permanent 301 redirect, and keep the redirects for at least a year."
  - "Rankings can move for a while after any migration. An unplanned move, not the platform, is what costs them."
  - "WordPress plugins do not move to Webflow. Each plugin's job is covered by a Webflow feature, an integration, or custom code, unless that job is dropped."
  - "Check large CMS volumes, store logic, membership content, and heavy custom plugins before you commit to the move."
related: [webflow-migration, webflow-vs-wordpress, how-to-choose-a-webflow-agency, webflow-pricing, b2b-saas-web-design]
inbound:
  - from: /webflow-migration
    anchor: WordPress to Webflow migration guide
    where: in the intro, one link
  - from: /custom-websites-migrations
    anchor: WordPress to Webflow migration
    where: in the content migration step (process step 04), one sentence with one link
sources:
  - label: "Google Search Central: Site moves with URL changes"
    url: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
    accessed: 2026-10-06
  - label: "Google Search Central: Site moves without URL changes"
    url: https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes
    accessed: 2026-10-06
  - label: "Webflow Help Center: Migrate your site from WordPress to Webflow"
    url: https://help.webflow.com/hc/en-us/articles/33961193662739-Migrate-your-site-from-WordPress-to-Webflow
    accessed: 2026-10-06
  - label: "Webflow Help Center: How do I set up redirects in Webflow?"
    url: https://help.webflow.com/hc/en-us/articles/33961294898835
    accessed: 2026-10-06
  - label: "Webflow Help Center: Import and export 301 redirects"
    url: https://help.webflow.com/hc/en-us/articles/33961211526291
    accessed: 2026-10-06
  - label: "Webflow Help Center: Disable search engine indexing"
    url: https://help.webflow.com/hc/en-us/articles/33961368603539
    accessed: 2026-10-06
  - label: "Webflow Help Center: Create a sitemap in Webflow"
    url: https://help.webflow.com/hc/en-us/articles/33961355371667
    accessed: 2026-10-06
  - label: "Webflow Help Center: Add an SEO title and meta description"
    url: https://help.webflow.com/hc/en-us/articles/33961237278611
    accessed: 2026-10-06
  - label: "Webflow Help Center: How do I add forms in Webflow?"
    url: https://help.webflow.com/hc/en-us/articles/33961347548563
    accessed: 2026-10-06
  - label: "Webflow Help Center: Custom code in head and body tags"
    url: https://help.webflow.com/hc/en-us/articles/33961357265299
    accessed: 2026-10-06
  - label: "Webflow blog: New feature, site search"
    url: https://webflow.com/blog/new-feature-site-search
    accessed: 2026-10-06
  - label: "WordPress.org: Yoast SEO"
    url: https://wordpress.org/plugins/wordpress-seo/
    accessed: 2026-10-24
  - label: "WordPress.org: Rank Math SEO"
    url: https://wordpress.org/plugins/seo-by-rank-math/
    accessed: 2026-10-24
  - label: "WordPress.org: HubSpot All-In-One Marketing"
    url: https://wordpress.org/plugins/leadin/
    accessed: 2026-10-24
  - label: "WordPress.org: Site Kit by Google"
    url: https://wordpress.org/plugins/google-site-kit/
    accessed: 2026-10-24
  - label: "WordPress.org: MonsterInsights"
    url: https://wordpress.org/plugins/google-analytics-for-wordpress/
    accessed: 2026-10-24
volatile:
  - claim: "Webflow settings paths and behavior: Site settings, Publishing, 301 redirects; bulk import replaces the existing redirect list; Site settings, SEO, Indexing; page-level SEO settings"
    source: https://help.webflow.com/hc/en-us/articles/33961294898835
    recheck: open the four Webflow help articles and confirm the menu names and the import behavior
  - claim: "Webflow site search indexes pages and CMS items and is added as a component"
    source: https://webflow.com/blog/new-feature-site-search
    recheck: confirm the feature still exists and is still described this way
volatileChecked: 2026-10-06
editorNotes:
  - "This is the long, sourced how-to. The short commercial page is webflow-migration. Check that the two do not repeat each other."
  - "Every fact comes from Google Search Central or Webflow's help center, read on 2026-10-06. Recheck the Webflow menu names and limits on release day."
  - "The section on whether a move is the right call states a position. Confirm or edit it."
  - "All partner wording uses Webflow Professional Partner. See G2 in the facts sheet before release."
  - "Experience edits applied 2026-10-25 from the lead's brief (Surfe case study, four phases, 30+ migrations, plugin install counts as shown on WordPress.org on 2026-10-24). Surfe and Romain Ginestou approved the case study, the quote, and the images. The quote uses the trimmed version of Romain's message."
visuals:
  - after: How do you migrate from WordPress to Webflow without losing SEO?
    place: top
    type: diagram
    brief: "A horizontal four-phase flow: map, design, build, launch and audit. Text outside the image."
    alt: "The four phases of a WordPress to Webflow migration: map, design, build, and launch and audit"
---

To migrate from WordPress to Webflow without losing SEO, plan the URLs before you build anything. Map every old URL to its new address, and carry over the content that already earns traffic along with its titles and descriptions. Redirect every URL that changes with a 301, and watch Google Search Console after launch.

We've run 30+ WordPress to Webflow migrations in the last six years, from companies getting started and looking to raise funding, like [Motional Hub](https://www.motionalhub.com/), to large, established companies that have raised more than $100 million, like [JOOR](https://www.joor.com/). On our most recent one, for [Surfe](https://surfe.com/), we cleaned up more than 3,000 pages before anything moved to Webflow.

## How do you migrate from WordPress to Webflow without losing SEO?

In four phases: map every old page to the new site, design a new system in Figma, build and migrate in Webflow, then launch and audit. We run every WordPress to Webflow migration in this order, because each phase settles what the next one needs. The page map decides the redirects and templates, the design system decides how the Webflow build is structured, and the content has to match WordPress before anything goes live. The SEO steps sit inside those phases.

### Phase 1: Map the old site and set the creative direction

Start with a benchmark. Crawl the WordPress site, list every indexable URL, and record current rankings and organic traffic, so the "after" has a "before" to be compared with.

Then we hold a working session with your team and map every old page to its place on the new site. Keep URLs unchanged where you can, and record the old and new address for every URL that changes. [Google calls this map an important step](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) in any move that changes URLs. Before any design work, the map tells us which URLs need 301 redirects, which templates the new site needs, and which pages to merge or remove. On Surfe's site, it meant cleaning up more than 3,000 pages.

In the same session, we agree on the new UI and UX direction, so the design starts from the real page list.

Figure: Surfe's redirect map (left) and its 301 redirects in Webflow (right).
![Spreadsheet of Surfe's old URLs with a 301 redirect action for each, next to Webflow's 301 redirect settings listing old paths and their new destinations](/images/new-pages/guides/wordpress-to-webflow-migration/redirect-map.webp 1558x600)

### Phase 2: Design the system in Figma, then the pages

Next, we design everything in Figma, starting with the system: components, variables, and a completely new design system. Then we design every new page from those components. This is the critical step, because the Webflow build mirrors it one to one.

Figure: Part of Surfe's design system in Figma (30+ components, 100+ variables) and the live homepage built from it.
![Surfe's color variables and button components in Figma, connected to the live Surfe homepage built in Webflow](/images/new-pages/guides/wordpress-to-webflow-migration/design-system.webp 1558x600)

### Phase 3: Build in Webflow and move the content

In Webflow, we build a development system that follows the same logic as the Figma file, so every component and variable stays connected to its design. Then we:

1. **Develop every page** from those components, with a template for each type of page.
2. **Set up the Webflow CMS**, with CMS Collections for repeating content such as posts and case studies, in place of WordPress custom post types and custom fields.
3. **Migrate all the content.** For posts, Webflow documents an export route: export the WordPress content as XML, convert it to CSV, and import it into a Collection with field mapping. Our [guide to importing WordPress posts](/blog/import-wordpress-to-webflow) shows the steps.
4. **Clean up the data**, so every page reads exactly as it did on WordPress.
5. **Carry over the SEO fields and set up redirects.** Titles, meta descriptions, headings, image alt text, canonical tags, and internal links travel with the content. Every URL that changes gets a 301 redirect, a permanent, server-side redirect, the kind Google recommends for a move. Webflow takes redirects one at a time or in bulk from a CSV file, and it supports wildcard rules.
6. **Reconnect every integration.** Webflow has no plugins, so each tool connects through a native feature, an integration, or custom code, which is cleaner than a stack of plugins. For forms, see [connecting Webflow forms to HubSpot or Salesforce](/blog/webflow-salesforce-integration).
7. **Test before the switch.** Keep the staging copy out of the search index, crawl it, and check canonicals, robots rules, and the sitemap. Check the redirect list against the URL map so that no old URL is left without a destination.

Figure: Surfe's CMS Collections in Webflow. Every blog post has its own meta title, meta description, and schema markup fields.
![Webflow CMS panel listing Surfe's Collections, such as Team, Case Studies, FAQs, and Glossary Terms, with the blog's fields for meta title, meta description, and schema markup](/images/new-pages/guides/wordpress-to-webflow-migration/cms-collections.webp 1558x600)

### Phase 4: Launch, then audit

**Launch.** Lower the DNS TTL about a week ahead, remove the staging block, publish the sitemap, and confirm the site is verified in Search Console.

**Audit.** After release, we audit the live site against the page map. We crawl the new site for broken links, check that every old URL reaches its new page in a single redirect, and compare rankings and traffic with the benchmark, so anything that could cost rankings gets fixed early.

**Monitor.** Watch indexing, crawl activity, and 404 errors in Search Console. Keep the redirects for at least a year, and expect rankings to move around for a while. Our [website launch checklist](/blog/website-launch-checklist) covers launch week, and our [redesign SEO checklist](/blog/website-redesign-seo-checklist) covers monitoring to day 90.

Figure: Surfe's live site after launch: 97 for performance and 100 for SEO in PageSpeed Insights, and no internal URLs with errors in the October 5, 2026 site audit.
![PageSpeed Insights report with scores of 97 for performance, 92 for accessibility, and 100 for best practices and SEO, next to a site audit with a health score of 100](/images/new-pages/guides/wordpress-to-webflow-migration/launch-audit.webp 1558x600)

The sequence above follows Google's guidance on [moving a site with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) and [without URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes), and Webflow's article on [migrating from WordPress](https://help.webflow.com/hc/en-us/articles/33961193662739-Migrate-your-site-from-WordPress-to-Webflow).

### Case study: Surfe's WordPress to Webflow migration

- **Starting point:** a WordPress site with more than 3,000 pages and posts, plus plugins for SEO, HubSpot, and analytics.
- **Plugins:** none on Webflow. Every job those plugins did is covered by Webflow's built-in features and integrations.
- **Cleanup:** more than 3,000 pages reviewed: 300 kept, 50 merged, 2,400 redirected, 250 removed.
- **Design system:** 30+ components and 100+ variables in Figma, mirrored one to one in Webflow.
- **Redirects:** 301 redirects for the 2,400 redirected pages, all tested before launch.
- **Timeline:** 8 weeks from the first mapping session to launch on August 20, 2026.
- **QA:** Santiago Lopez, Senior Webflow Developer and QA specialist, with Sergio Gancedo and the Surfe team.
- **After launch:** 50% more traffic and a 3x faster go-to-market, compared with the month before launch.

Quote: "Thank you very much for all your implication, work and help over the last 2 months, it's a pleasure and the results are there!"
Cite: Romain Ginestou, Co-founder and CTO, Surfe

## How long does a WordPress to Webflow migration take?

The timeline depends mostly on five things: the number of templates, the volume of CMS content, the number of redirects to map, the integrations involved, and how many review rounds your team needs. A site of 15 pages with no blog is a smaller job than a site with hundreds of posts, a store, and three integrations.

In our projects, a site of about 20 pages takes 2 to 4 weeks, a mid-size site with a blog takes 4 to 8 weeks, and a large site takes 8 to 10 weeks. Surfe's migration took 8 weeks from the first mapping session to launch: half a week for mapping, 4 weeks for design, 3 for the build and content, and half a week for launch and audits.

To get a real number from any agency, send the page count, the number of posts, and the tools your site depends on, such as forms, a CRM, site search, and consent management.

## Will you lose rankings when you migrate from WordPress to Webflow?

Rankings can move for a while after any migration, and Google tells site owners to expect temporary fluctuation. What costs rankings is an unplanned move, and its causes are known and checkable.

Table: What goes wrong in a migration, why it matters, and how to prevent it

| What goes wrong | Why it matters | How to prevent it |
|---|---|---|
| A staging block is left on after launch | A noindex tag or crawl block tells Google not to index the pages. Google says to remove temporary blocks at the switch. | Remove crawl blocks and noindex from the live site at launch, then check the live page source and robots rules. |
| Old URLs have no redirect | Visitors, bookmarks, and links from other sites reach an error page instead of the new page. | Map every old URL before the build, and give every URL that changes a 301 redirect. |
| Redirect chains, or temporary redirects where permanent ones belong | Google recommends permanent server-side redirects and advises against chaining them. | Send each old URL straight to its final address with a permanent redirect. |
| Titles, descriptions, headings, or content are dropped in the move | These fields tell search engines and readers what each page is about. | Carry them over per URL with Webflow's page SEO settings and CMS template fields. |
| The sitemap is not updated, or Search Console does not cover every site version | Google advises submitting the new sitemap and verifying every variant of the site. | Publish the sitemap, submit it, and verify every version of the domain. |
| Nobody watches after launch | Crawl rates and rankings move after a launch, and problems show up first in Search Console. | Review indexing, crawl activity, and 404 errors on a schedule, and keep the redirects for at least a year. |

Google expects temporary ranking fluctuation during a move, and for a medium-sized site it can take a few weeks or more before the new URLs are shown. Google also suggests timing the move for a period of lower traffic.

## What happens to your WordPress plugins, forms, and integrations?

WordPress plugins do not move to Webflow. Each plugin's job is covered by a Webflow feature, an integration, or custom code, unless that job is dropped. List every active plugin during the audit and decide which of the three applies.

On WordPress, these jobs usually fall to popular plugins: Yoast SEO (10+ million active installations) or Rank Math (4+ million) for titles and meta descriptions, HubSpot's own plugin (200,000+) for forms and tracking, and Site Kit by Google (5+ million) or MonsterInsights (2+ million) for analytics. Surfe's site ran plugins for SEO, HubSpot, and analytics, and on Webflow we covered all of those jobs without a single plugin.

Table: Common WordPress plugin jobs and what covers them in Webflow

| What the plugin did | What covers it in Webflow |
|---|---|
| SEO titles and meta descriptions | Page settings hold the title tag and meta description for each page. On CMS template pages they can be filled from Collection fields. |
| XML sitemap | Webflow generates a sitemap.xml and updates it when you publish. You can switch it off and paste a custom sitemap. |
| Redirect manager | Site settings accept 301 redirects one by one or from a CSV file, including wildcard rules. |
| Contact and lead forms | Webflow's native forms store submissions in Site settings and can email notifications, send data to a webhook, or connect to apps such as HubSpot, Zapier, and Make. A spam inbox collects suspected spam. |
| Schema and structured data | Structured data is added as a script through custom code for the whole site or a single page. |
| Analytics, tag manager, and consent scripts | Custom code in the site or page head, or before the closing body tag, holds these scripts. |
| Site search | Webflow's site search is a component you add in the Designer. It searches pages and CMS items. |

Webflow's plan requirements and limits for forms, redirects, and search change over time. Check the linked [Webflow documentation](https://help.webflow.com/hc/en-us/articles/33961347548563) for the current limits on your plan before you commit to a design.

## What should you prepare before you start a WordPress to Webflow migration?

Before you build anything, gather access to the old site, a benchmark of its search performance, a list of plugins and integrations, and a named owner for each group of pages. Five things save the most time later:

- **Access.** Admin access to WordPress and its hosting, to the domain registrar or DNS host, and to Google Search Console and your analytics account.
- **A benchmark.** A crawl of the live site, plus current rankings and organic traffic for the pages that matter, so the "after" can be compared with a "before".
- **A plugin list.** Every active plugin, the job it does, and who depends on it.
- **Content owners.** A person who approves each group of pages, and a date after which nobody edits the old site.
- **An integration list.** Forms, CRM, analytics, consent management, and anything else that sends or receives data.

## Is moving from WordPress to Webflow the right call for your site?

For most B2B marketing sites, the decision comes down to who edits the site and how much custom functionality depends on plugins. If your team wants to edit pages without a developer, a visual platform such as Webflow is worth testing against that need. A site that depends on heavy custom plugins needs a closer look first. These situations need a check before you commit:

- **Large volumes of CMS content.** Check Webflow's current Collection and item limits for your plan. [Webflow's own migration guide](https://help.webflow.com/hc/en-us/articles/33961193662739-Migrate-your-site-from-WordPress-to-Webflow) tells you to check them before you export.
- **Store logic, such as WooCommerce.** Check whether Webflow's e-commerce features cover your catalog, checkout, and tax needs, because Webflow's migration article does not cover stores.
- **Membership or gated content.** Check how logins, paywalls, and member-only pages will work on the new platform.
- **Heavy custom plugins.** List what each plugin does, and decide whether a Webflow feature, an integration, or custom code replaces it.
- **Multi-language sites with complex rules.** Check how language structure, URLs, and hreflang tags will carry over. Google advises updating hreflang annotations when a move changes URLs.

A migration is a recommendation, not a reflex. If none of these situations applies and the site works for your team, staying on WordPress and fixing the site you have is a legitimate answer.

## What did Surfe's migration teach us?

- **Most of the old site was redirected, not rebuilt.** Of the more than 3,000 pages we reviewed, 2,400 were redirected and only 300 were kept. The other 300 were merged or removed.
- **Design took the longest: 4 of the 8 weeks.** The components and variables built in Figma become the Webflow build, so that's where the time goes.
- **The mapping session is short but decides the rest.** Half a week settled the redirects, the templates, and the merges before any design started.
- **Launch was quick because the map was done.** Launch and audits took half a week, with every old URL already mapped to a destination.

## How do we know this?

This guide comes from the 30+ WordPress to Webflow migrations we've planned and run over the last six years, most recently Surfe's. Where Google or Webflow documents a step, we link to it. Sergio Gancedo, Managing Director, wrote it. Santiago Lopez, our Senior Webflow Developer and QA specialist, ran QA on Surfe's migration with Sergio and the Surfe team. Because we run these migrations for clients, we have an interest in the topic, and the guide says where staying on WordPress is the better answer. To hand the work to us, see our [WordPress to Webflow migration service](page:webflow-migration).
