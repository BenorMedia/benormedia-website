---
slug: webflow-cms-api
url: /blog/webflow-cms-api
pageType: guide
draft: false
blockedBy: []
topicId: "3.7"
wave: 3
title: "Webflow CMS API: Using Webflow as a Headless CMS"
description: "Serve Webflow CMS content to Next.js, Astro, or an app with the Data API and the cached Content Delivery API: limits, previews, webhooks, and trade-offs."
h1: "Webflow CMS API: when Webflow works as a headless CMS, and where it stops"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-27
updatedAt: 2026-10-27
reviewEvery: 90 days
primaryKeyword: "webflow cms api"
secondaryKeywords: ["webflow api", "webflow headless cms", "webflow data api"]
takeaways:
  - "Two APIs matter: the Data API reads and writes CMS items, and the Content Delivery API serves published items from a cache at api-cdn.webflow.com."
  - "Cached responses live for 300 seconds, 120 on Enterprise, and don't use up the Data API's 60 or 120 requests a minute."
  - "Drafts come from the staged endpoints, so previews are a route you build; signed webhooks tell your front end what changed."
  - "Layouts, forms, interactions, SEO fields, and the sitemap become your front end's job."
  - "Best fit: Webflow stays the marketing site, and an app, a docs site, or one coded section reuses its content."
faqHeading: "Questions about the Webflow CMS API"
faq:
  - q: "Is Webflow a headless CMS?"
    a: "Not by design. Webflow is a visual site builder with a built-in CMS, but its Data API lets other front ends read and write the same Collections, and its Content Delivery API serves published items from a cache. That makes Webflow usable as a headless content source for a coded site or an app."
  - q: "What is the Webflow CMS API rate limit?"
    a: "Webflow's developer docs list 60 requests a minute for Starter and Basic sites, 120 for CMS, eCommerce, and Business, and custom limits on Enterprise, counted per API key. The newer Premium plan wasn't listed yet in October 2026. Requests served from the Content Delivery API's cache don't count."
  - q: "Can you use the Webflow CMS with Next.js or Astro?"
    a: "Yes. A Next.js or Astro site can fetch published items at build time or on the server, read staged items for preview routes, and rebuild or revalidate pages when a Webflow webhook reports a change. Keep the API token on the server, with read-only CMS permissions where possible."
  - q: "How fresh is content from Webflow's Content Delivery API?"
    a: "Up to five minutes old on most plans. Webflow caches responses for 300 seconds, or 120 seconds on Enterprise, so an item edited or deleted just after a request can still show its old version until the cache expires. Read from the Data API when you need the latest version right away."
  - q: "How many CMS items can a headless Webflow site hold?"
    a: "The same as any Webflow site on that plan. As of October 2026, the Premium Site plan allows 20,000 CMS items and 40 Collections, with up to 60 fields per Collection, and Enterprise sites on Webflow's next-gen CMS can go past one million items."
related:
  - /headless-cms-agency
  - /webflow-enterprise-agency
  - /custom-websites-migrations
sources:
  - label: "Webflow Developers: Working with the CMS"
    url: https://developers.webflow.com/data/docs/working-with-the-cms
    accessed: 2026-10-27
  - label: "Webflow Developers: Multi-channel content delivery"
    url: https://developers.webflow.com/data/docs/working-with-the-cms/content-delivery
    accessed: 2026-10-27
  - label: "Webflow Developers: Rate limits"
    url: https://developers.webflow.com/data/reference/rate-limits
    accessed: 2026-10-27
  - label: "Webflow Developers: Working with webhooks"
    url: https://developers.webflow.com/data/docs/working-with-webhooks
    accessed: 2026-10-27
  - label: "Webflow Developers: Field types and item values"
    url: https://developers.webflow.com/data/reference/field-types-item-values
    accessed: 2026-10-27
  - label: "Webflow Help: Updated pricing and simplified plans for May 2026"
    url: https://help.webflow.com/hc/en-us/articles/51059955082387-Updated-pricing-and-simplified-plans-for-May-2026
    accessed: 2026-10-26
  - label: "Webflow: Next-gen CMS: Now available for Enterprise"
    url: https://webflow.com/updates/next-gen-cms-now-available-for-enterprise
    accessed: 2026-10-26
volatile:
  - "Data API rate limits: 60 a minute (Starter, Basic), 120 (CMS, eCommerce, Business), custom (Enterprise), per API key; Premium not listed; one site publish a minute (source: Webflow Developers, checked 2026-10-27)"
  - "Content Delivery API: api-cdn.webflow.com, two read-only endpoints for live items, cache 300 seconds (120 on Enterprise), cache hits not rate limited (source: Webflow Developers, checked 2026-10-27)"
  - "Webhooks: five collection item events, 75 per trigger type, 3 retries at 10-minute intervals, then deactivation (source: Webflow Developers, checked 2026-10-27)"
  - "Premium Site plan: 20,000 CMS items, 40 Collections; Enterprise next-gen CMS over one million items; 60 fields per Collection; list responses up to 100 items (sources: Webflow Help and Webflow Developers, checked 2026-10-26)"
volatileChecked: 2026-10-27
inbound:
  - page: /headless-cms-agency
    anchor: "Webflow's CMS API"
    sentence: "In the FAQ answer to \"Can we keep Webflow as our CMS and build the front end in code?\", link to the post."
  - page: /blog/headless-cms-comparison
    anchor: "using Webflow as a headless CMS"
    sentence: "Where the post covers keeping an existing CMS, link to the post."
  - page: /blog/webflow-devlink
    anchor: "Webflow CMS API"
    sentence: "Where the post compares hybrid options, link to the post as the content-only option."
  - page: /blog/headless-cms-seo
    anchor: "Webflow as a headless source"
    sentence: "Where the post lists CMS options, link to the post."
editorNotes:
  - "Topic 3.7 re-targeted from webflow headless cms (30 US, KD 1) to webflow cms api (150, KD 0), the closest variant with more demand and the same intent. Secondaries: webflow api 400 (KD 2, but Webflow's own docs hold the top results), webflow headless cms 30, webflow data api 20. Google's People Also Ask for the primary includes \"Is Webflow a headless CMS?\", answered in the first H2."
  - "Overlap: draft 5.6 (not live) also lists webflow cms api as a secondary keyword. Suggest dropping it from 5.6 so this post owns the query; 5.6 keeps its limits table for programmatic SEO."
  - "Plan figures (Premium items and Collections, Enterprise next-gen CMS, 60 fields, 100 items per list request) come from the 5.6 research of 2026-10-26; API, cache, and webhook figures were checked 2026-10-27."
  - "Webflow's docs don't say which plans include the Content Delivery API or when it launched; the post doesn't claim either."
  - "#P37-1 asks whether we have used Webflow's API as a headless source; default deletes it."
  - "No content score this time: the scoring subscription is paused until Sergio confirms it."
---

Your marketing team edits Webflow Collections. With the Webflow CMS API, a Next.js or Astro app, a mobile app, or a docs site on another domain can read those same items, so Webflow doubles as a headless CMS. It works within limits on caching, previews, and request rates, which this guide covers for B2B SaaS teams as of October 2026.

## Is Webflow a headless CMS?

Not by design, though it can act as one. Webflow started as a visual site builder, and its CMS was built to fill Webflow pages. The Data API opened those Collections to other front ends, and a read-only Content Delivery API now serves published items from a cache, which takes most of the load off the main API.

Picture a SaaS company whose marketing site runs on Webflow and whose docs run on Next.js. Customer stories live in a Webflow Collection. With the API, the docs site can pull the same stories, render them in its own templates, and stay current when marketing edits a quote, without anyone copying text between two systems.

That's a narrower move than a full headless CMS project. As our [headless CMS agency page](/headless-cms-agency) puts it, a platform like Webflow "keeps content and design in one system." Reading its content from elsewhere splits the two again for those pages only, and whatever Webflow normally handles on them, from forms to sitemaps, becomes the other front end's job.

## What can the Webflow CMS API do?

Almost everything an editor can do to an item. The API lists, reads, creates, updates, publishes, and unpublishes items, and it can write several locales in one request. A headless build leans on three parts in particular: reading published items, reading drafts for previews, and webhooks that fire when an item changes.

Table: Webflow CMS API features a headless build uses

| Job | Endpoint or feature | What to know |
| --- | --- | --- |
| Read published items | `GET /v2/collections/{collection_id}/items/live` on api.webflow.com | Always current; counts against the rate limit |
| Read published items from a cache | Same path on api-cdn.webflow.com | Read-only; cached 300 seconds, or 120 on Enterprise |
| Read drafts for a preview | `GET /v2/collections/{collection_id}/items` | Staged items, not visible on the live site |
| Publish or unpublish | `POST .../items/publish`, `DELETE .../items/live` | Works item by item |
| Hear about changes | Webhooks for item created, changed, deleted, published, unpublished | Signed requests; 75 webhooks per event type |
| Write across locales | `cmsLocaleIds` on create | One request can create an item in several locales |

Field values arrive in predictable shapes. Rich text is a string that "stores long-form text with HTML formatting," so your front end styles Webflow's HTML rather than structured blocks. Images come back as objects with a file ID, a URL, and optional alt text, and reference fields return item IDs that you resolve with a second lookup.

## How do caching and rate limits work?

Webflow counts Data API requests per API key: 60 a minute on Starter and Basic sites, 120 on CMS, eCommerce, and Business, custom on Enterprise. Request number 61 in a minute on a Basic site gets an HTTP 429 and a Retry-After header, usually 60 seconds. Reads served from the Content Delivery API's cache aren't counted at all.

Table: Webflow limits that shape a headless build, October 2026

| Limit | Value | Note |
| --- | --- | --- |
| Data API requests | 60 a minute on Starter and Basic; 120 on CMS, eCommerce, and Business | Counted per API key; Enterprise limits are negotiated |
| Content Delivery API cache | 300 seconds; 120 on Enterprise | A cache hit costs no requests |
| Items per list request | 100 | A 2,000-item Collection takes 20 calls with offset |
| Site publishes | One successful publish a minute | |
| CMS items per site | 20,000 on Premium | Enterprise's next-gen CMS goes past one million |
| Collections and fields | 40 Collections on Premium, 60 fields each | |
| Image uploads through the API | 4 MB per image | The file has to sit at a public URL first |

Two details catch teams out. Premium, the plan that replaced CMS and Business for new purchases on May 13, 2026, wasn't listed on Webflow's rate-limit page in October 2026, so confirm your limit with Webflow before you size a build; our post on the [Webflow price increase](/blog/webflow-price-increase) covers when existing sites move. And the cache cuts both ways: Webflow warns that after you update or delete a published item, the old version can persist until the cache refreshes.

A blog post that shows up four minutes late hurts nobody. A price change or a corrected legal clause is different: read those from the Data API, or refetch them from it when a webhook fires, so the cache never serves the old version.

## How do you preview drafts on a headless front end?

With a preview route you build yourself. Webflow keeps two versions of each item: the staged draft editors are working on and the live version visitors see. Point a password-protected route on your front end at the staged endpoint, render it with your production templates, and editors can check a draft before it goes live.

Two rules from Webflow's docs shape how this behaves. "Updating a live item automatically updates its staged version," so a quick fix to a live item shows up in previews too. And creating items through the staged endpoints "always creates a draft," which surprises teams running imports: load 300 integration pages by script and you get 300 drafts, invisible on the front end until someone publishes them in Webflow or through the publish endpoint.

Editors notice the difference most. In Webflow, they edit a page and see it. On a headless front end, they edit fields in the CMS and open a preview link your team has to provide, which is a step back for teams used to editing on the canvas. If visual editing on the coded site is a must, a headless CMS built around it is a better fit; our [headless CMS comparison](/blog/headless-cms-comparison) covers the criteria.

## How do you keep the front end in sync with Webflow?

Webflow's webhooks are the usual answer. You register a URL, and Webflow calls it whenever an item is created, edited, deleted, published, or unpublished, and after every full site publish. When an editor fixes a typo in a case study and publishes it, your server hears about it, checks that the request came from Webflow, and rebuilds that one page.

Verification is worth the few lines of code. Each request carries an `x-webflow-timestamp` header and an `x-webflow-signature` header, a SHA-256 HMAC, and Webflow suggests treating anything older than five minutes as a possible replay. Create the webhooks through the API, though: ones set up in the Webflow dashboard arrive without the headers you need to check.

Answer each delivery with an HTTP 200 straight away and do the rebuild in the background. Redirects, SSL errors, and timeouts all count as failures, and after three more attempts 10 minutes apart, Webflow switches the webhook off and sends an email. Only Webflow's support team can turn it back on, so route that email to a person, not a shared inbox nobody reads.

Watch the cache here too. If a publish webhook triggers a refetch through the Content Delivery API, the response may still be the cached version from a few minutes earlier. For webhook-driven refreshes, read the changed item from the Data API, which always returns the latest data.

## What do you give up when Webflow runs headless?

Everything Webflow does for the pages it hosts. On the coded front end, there's no Designer layout, no Webflow interactions or forms, no page-level SEO settings, and no automatic sitemap. Titles, meta descriptions, canonical tags, and structured data have to come from CMS fields that your templates render, and your team owns hosting, uptime, and performance.

Rich text is a common source of surprises. It arrives as Webflow's HTML, which your front end must style, and when you write rich text through the API, code blocks are dropped: Webflow's field reference says passing them "will result in an empty string." Images uploaded through the API must be 4 MB or smaller and sit at a public URL. Our post on [headless CMS SEO](/blog/headless-cms-seo) lists what to check before such a front end goes live.

You also run two systems instead of one. Webflow keeps its plan costs and seat management, while the front end adds a framework, a host, a deploy pipeline, and someone to maintain them. That's worth it when the second front end does something Webflow pages can't. It's a hard sell when the goal is only a faster or more custom version of the same marketing site.

## When does Webflow as a headless CMS make sense?

When Webflow stays the main marketing site and the same content also has to appear somewhere else: a product's in-app help, a docs site, a partner portal, a mobile app, or one coded section of the domain. Marketing keeps one place to edit, and engineering gets clean JSON instead of scraping pages.

It makes less sense when the whole site is moving to code, when editors need visual editing on the coded pages, or when content changes many times a minute. A busy Collection with frequent writes runs into the 60 or 120 request limit quickly, while a dedicated headless CMS is built for that pattern. For hybrids that keep the front end in Webflow and add React components or a Webflow-hosted app instead, see our post on [Webflow DevLink, code components, and Webflow Cloud](/blog/webflow-devlink).

We build Webflow sites and headless front ends for B2B SaaS companies, so we have an interest in the topic.
