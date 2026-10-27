---
slug: saas-website-redesign
url: /blog/saas-website-redesign
pageType: guide
draft: false
blockedBy: []
topicId: "1.6"
wave: 3
title: "SaaS Website Redesign in Phases: When It Beats a Relaunch"
description: "When to redesign a SaaS website section by section instead of in one launch, how to sequence phases, share one domain, and protect SEO between releases."
h1: "SaaS website redesign in phases: when a section-by-section rollout beats one big launch, and how to run it"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-27
updatedAt: 2026-10-27
reviewEvery: 90 days
primaryKeyword: "saas website redesign"
secondaryKeywords: ["website redesign strategy", "website relaunch", "website redesign phases", "website redesign plan"]
takeaways:
  - "Google's site-move guidance favors one move for small and medium sites. Phases earn their extra work on large sites, platform migrations, and blogs that can't pause."
  - "A reverse proxy or CDN rule lets /pricing come from the new site while /blog still comes from the old one, on the same domain."
  - "Homepage, product, and pricing pages usually go first, and the blog goes last. Moving platforms? Pilot with legal pages or a partner directory."
  - "The blog keeps publishing until its own phase, then pauses for a few days while it moves."
  - "If phase three renames a URL that phase one already redirected, rewrite the phase one rule so old links still take one hop. Keep redirects for at least a year."
faqHeading: "Questions about redesigning a SaaS website in phases"
faq:
  - q: "Is it better to relaunch a website all at once or in phases?"
    a: "For most small and medium B2B SaaS sites, all at once. Google recommends moving all URLs simultaneously for sites that size, and one launch avoids running two systems. Phases make sense for large sites, platform migrations, and teams whose blog, docs, or campaigns can't pause while the project runs."
  - q: "How long should the old and new site run side by side?"
    a: "As briefly as you can manage, ideally a quarter or two in total. Every week with two systems means updating the navigation, consent banner, and tracking twice, on a site that looks like two companies. Set the date for the last phase before the first one ships, and make anyone who wants to move it explain why."
  - q: "Does a phased redesign hurt SEO?"
    a: "It doesn't have to. Pages that keep their URLs carry little risk, and each phase that changes URLs is a small site move: redirects straight to the final address, updated internal links, and a month of monitoring. Google says new URLs can take a few weeks or more to show for a medium-sized site."
  - q: "Can you move to Webflow in phases?"
    a: "Yes. Webflow's self-managed reverse proxy can serve Webflow pages under paths of a domain hosted elsewhere, such as /blog, while the rest of the site stays on the old platform. It needs a paid Site plan and a dedicated origin subdomain, and your team configures and supports the proxy, since Webflow's support doesn't."
  - q: "What goes in a website redesign plan for a phased project?"
    a: "The usual goals, scope, owners, and dates, plus four things a single launch doesn't need: the order of sections, the routing change for each phase, a redirect map per phase, and the checks that must pass before the next phase starts. Our post on redesign timelines covers how long each project phase takes."
related:
  - /website-redesign
  - /webflow-migration
  - /guides/wordpress-to-webflow-migration
sources:
  - label: "Google Search Central: Site moves with URL changes"
    url: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
    accessed: 2026-10-27
  - label: "Webflow Help Center: Set up a self-managed reverse proxy in Webflow"
    url: https://help.webflow.com/hc/en-us/articles/49835650986259-Set-up-a-self-managed-reverse-proxy-in-Webflow
    accessed: 2026-10-27
  - label: "Martin Fowler: Strangler Fig"
    url: https://www.martinfowler.com/bliki/StranglerFigApplication.html
    accessed: 2026-10-27
volatile:
  - "Google site-move guidance: all URLs at once for small and medium sites; large sites may move a section at a time; redirects kept generally at least 1 year; a few weeks or more for medium sites (source: Google Search Central, updated August 20, 2026)"
  - "Webflow self-managed reverse proxy: paid Site plan, dedicated origin subdomain, Href prefix for subdirectories, 2 MB origin response limit, no Webflow support for third-party proxies (source: Webflow Help Center, updated October 5, 2026)"
volatileChecked: 2026-10-27
inbound:
  - page: /blog/how-long-does-a-website-redesign-take
    anchor: "redesigning in phases"
    sentence: "In the section on redesigning faster, link to the post as the option for large sites that can't pause."
  - page: /blog/website-redesign-seo-checklist
    anchor: "phased redesign"
    sentence: "Where the post covers the URL map and redirects, link to the post for redirects across phases."
  - page: /blog/website-rfp-template
    anchor: "a phased rollout"
    sentence: "Where the post covers scope, link to the post as an option to state in the RFP."
  - page: /website-redesign
    anchor: "redesign in phases"
    sentence: "In the process section or FAQ, link to the post."
editorNotes:
  - "Topic 1.6 keeps saas website redesign as primary (100 US, KD 0, traffic potential 1,400). Secondaries: website redesign strategy 150 (KD 1), website relaunch 350 (KD 1), website redesign phases 40, website redesign plan 30. website redesign process is left to /website-redesign and the live timeline post."
  - "The top 10 for saas website redesign is mostly design galleries and example roundups, with one guide at position 2. This post takes the decision and rollout angle, which none of the top results covers."
  - "Overlap check: /blog/how-long-does-a-website-redesign-take covers project phases and a single go-live, and /blog/website-redesign-seo-checklist covers the URL map and 90-day monitoring. This post links to both and covers only the phased rollout."
  - "#P16-1 asks Sergio whether we have shipped a redesign in phases. Default deletes it."
  - "No content score this time: the scoring subscription is paused until Sergio confirms it."
---

In a phased redesign, a SaaS website changes one section at a time. The new homepage might go live in March while the blog stays on the old system until May, both under the same domain. The extra work pays off on large sites, platform moves, and teams that publish weekly; most smaller sites should launch in one go.

## What is a phased website redesign?

It's a redesign that ships in stages instead of on one launch day. Typically the homepage and product pages go first, while the blog, docs, and resource library keep the old design on the old platform until a later release. Visitors never leave the domain; routing decides, path by path, which system answers.

Developers call this the strangler fig pattern, a name Martin Fowler took from a vine that seeds high in a tree and slowly takes over its host. His version builds new code "on top of, yet separate to" the old system and moves behavior across bit by bit. Fowler's reason is blunt: he has seen the plan to replace a serious system in one go "go down in flames most of the time," not least because a full replacement takes a long time and users won't wait that long for new features.

A marketing site is far smaller than the systems Fowler writes about, and plenty of them should simply relaunch. The trade-off still holds at this size, though. One launch day puts every risk on the same morning: redirects, forms, tracking, and the new messaging all go live together. Phases let the new pricing page start converting months before the blog moves, at the price of keeping two systems running in the meantime.

## When does a phased redesign beat a single launch?

When the site is large, the platform is changing, or the team can't pause publishing for months. Google's own guidance on site moves points the same way: it recommends moving all URLs at once for small and medium sites, and says large sites can move one section at a time so problems are easier to spot and fix.

Table: Phased redesign or single launch: what decides it

| Factor | Points to a phased redesign | Points to a single launch |
| --- | --- | --- |
| Site size | Hundreds of URLs across a blog, docs, and integration pages | A few dozen pages |
| Brand | Same name, refreshed look | A rename or a new logo |
| Platform | Leaving a CMS or host you'd rather not bet launch day on | Staying put, or moving a small site |
| Publishing | Weekly posts, docs releases, or live campaigns | A week's content freeze is fine |
| Navigation | The top menu stays roughly the same | Menu and page structure both change |
| Team | Engineers who can run routing and two stacks for months | A small team with no developer time |

The brand question gets less attention than it deserves. After a rename, a phased site sends some visitors from a new product page to an old blog post that still carries the previous name and logo, and they have to work out whether it's the same company. A refresh that keeps the name and colors close to today's can live with mixed pages for a few months; a rename usually can't.

Size alone doesn't force phases, though. A single launch can carry thousands of URLs when the redirects are planned and tested: on Surfe's move from WordPress to Webflow, we redirected 2,400 pages and tested every one before launch, as our [WordPress to Webflow migration guide](/guides/wordpress-to-webflow-migration) describes.

## How do you sequence the phases?

Lead with the pages that sell: homepage, product, pricing, and the demo request flow, since they carry the new positioning and most demo traffic. Supporting pages follow in order of value. The blog and other big libraries usually move last, as they hold the most URLs and rankings, and a platform change deserves a small pilot before anything else.

The pilot idea comes from Google's site-move guidance for large sites, which suggests testing with a section that doesn't change often or swing with news and events, and warns that one section won't surface every problem a full move would. On a SaaS site, the legal pages, a partner directory, or the careers section fit that description. If routing, analytics, or redirects break there, nobody's demo request gets lost.

Table: An example phase plan for a B2B SaaS site

| Phase | Scope | Check before the next phase |
| --- | --- | --- |
| Pilot | One low-risk section, such as legal pages or a partner directory | Routing, analytics, consent banner, redirects, indexing |
| Core pages | Homepage, product, pricing, demo request | Conversion rate, form routing, page speed |
| Solutions | Use case, industry, and comparison pages | Rankings for money queries, internal links |
| Content library | Blog, guides, case studies | Redirects, structured data, Search Console indexing |
| Cleanup | Careers, campaign landing pages, leftovers | Old system retired, redirects kept |

Whatever the order, each phase needs a gate. We'd hold the next release until the previous one has had about two weeks of real traffic, which is long enough to spot a broken form or a tracking gap. Rankings move more slowly, so keep watching them while the next phase is built rather than waiting for them to settle.

## How do the old and new sites share one domain?

Through path-based routing in front of both systems. A reverse proxy or CDN rule sends each URL path to the system that currently owns it, so /pricing can come from the new site while /blog still comes from the old one. Visitors and search engines see one domain, and each phase becomes a routing change plus its redirects.

When the new site is on Webflow and the old domain is hosted elsewhere, Webflow documents a self-managed reverse proxy for exactly this. It needs a paid Site plan, a dedicated origin subdomain such as wf.example.com, a proxy that preserves the Host header and forwards query strings, and Webflow's Href prefix setting to keep internal links working under a subdirectory like /blog. Two caveats from the same article, updated October 5, 2026: Webflow's support team won't help set up or troubleshoot third-party proxies, and origin responses can't exceed 2 MB. Plan how your CDN's cache gets cleared after each publish, too.

The shared pieces are where phased projects leak. Header and footer, the consent banner, the analytics tag and its event names, fonts, and the demo request form all need to behave the same on both systems, or the site looks and measures like two sites. Our post on [Consent Mode v2 on Webflow](/blog/consent-mode-v2-webflow) covers the consent side. Because both systems sit on one domain, first-party cookies and analytics sessions carry across, as long as both load the same tag with the same settings.

## How do you keep publishing during a phased redesign?

Only the section that's moving gets frozen, and only for a few days. The rest of the site keeps publishing on the old system as usual. For the moving section, the team picks a cutoff date, migrates, checks old against new page by page, and publishes only on the new system from launch day.

On single launches, we pause content changes on the old site for the last few days before go-live, as our [website redesign timeline](/blog/how-long-does-a-website-redesign-take) explains. A phased project applies the same short freeze to one section at a time, which is the main reason marketing teams with a busy blog choose it. The blog keeps shipping while the product pages change, and it gets its own freeze when its turn comes.

The risk is double entry. A campaign page that needs a link from the new navigation and a banner on old blog posts touches both systems, and someone has to own each change. Keep a simple rule per phase: new pages go on the new system once their section has moved, and nothing new gets built on the old one. If the blog is moving from WordPress, our guide to [importing WordPress posts into the Webflow CMS](/blog/import-wordpress-to-webflow) covers field mapping and what breaks.

## What happens to navigation, internal links, and SEO between phases?

This is where phased projects lose rankings, if they lose them anywhere. Navigation has to match on both systems, old pages need their links updated when a section moves, and changed URLs need redirects. Google advises redirecting to the final URL directly and keeping redirects for as long as possible, generally at least a year.

Chains creep in because phases revisit the same URLs. Say phase one redirects /features to /platform, and phase three renames /platform to /product. Unless someone goes back and edits the first rule, an old link to /features now hops twice before it lands. One redirect map for the whole project, with earlier rules rewritten whenever a URL changes again, keeps every old address pointing straight at its current home. Our [redesign SEO checklist](/blog/website-redesign-seo-checklist) covers building the URL map and the 90-day monitoring plan.

Pages that keep their URL and content usually ride out a new design with little SEO change; it's the URL changes that need planning. For those, watch each moved section on its own in Search Console, filtered by path, for at least a month. Google says it can take a few weeks or more for new URLs to show for a medium-sized site, so a dip in the first days after a phase is normal; a dip that's still there a month later usually traces back to a missed redirect or an internal link that still points at the old address.

We redesign and migrate websites for B2B SaaS companies, so we have an interest in the topic. Our [website redesign service](/website-redesign) covers both single launches and phased ones.
