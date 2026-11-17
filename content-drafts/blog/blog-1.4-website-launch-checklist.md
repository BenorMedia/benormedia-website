---
slug: website-launch-checklist
url: /blog/website-launch-checklist
pageType: guide
draft: false
blockedBy: []
topicId: "1.4"
wave: 2
title: "Website Launch Checklist for B2B Sites | BenorMedia"
description: "A website launch checklist for B2B teams: redirects, forms, analytics, consent, accessibility, and indexing checks for the week before and after launch."
h1: "Website launch checklist: the launch-week checks for a B2B website"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-17
updatedAt: 2026-10-17
reviewEvery: none
primaryKeyword: "website launch checklist"
secondaryKeywords: []
takeaways:
  - "Most pre-launch checklists cover design and QA; launch-week problems on B2B sites usually come from redirects, forms, analytics, consent, and indexing."
  - "Submit every form on the staging site and confirm the lead reaches the inbox, the CRM, and analytics as a key event."
  - "Mark demo requests and sign-ups as key events before launch, because key events aren't retroactive."
  - "On launch day, check robots.txt and noindex tags on the live domain, run the redirect map against production, and submit the sitemap."
  - "Watch Search Console, form submissions, and key events daily for the first week."
faqHeading: "Questions about launching a website"
faq:
  - q: "What should be on a website launch checklist?"
    a: "Content and design QA, a tested redirect map, working forms and CRM sync, analytics key events, consent settings, accessibility checks, structured data, and indexing settings, plus launch-day and first-week checks."
  - q: "How long before launch should you lower the DNS TTL?"
    a: "At least one full TTL period before the change. With a 24-hour TTL, lower it at least 24 hours ahead, as Webflow recommends."
  - q: "Is Google consent mode the same as a cookie banner?"
    a: "No. Consent mode adjusts how Google tags behave based on the consent choices a visitor makes. You still need a banner or consent management platform to collect those choices."
  - q: "Which accessibility standard should a new website meet?"
    a: "Most teams aim for WCAG 2.2 level AA. WCAG 2.2 became a W3C Recommendation on October 5, 2023, and added nine success criteria to WCAG 2.1."
  - q: "What should you check in the first week after a website launch?"
    a: "Search Console indexing and 404 errors, redirects, form submissions against the old site's average, key events in analytics, and any errors reported by sales or support."
related:
  - /website-redesign
  - /webflow-migration
  - /guides/wordpress-to-webflow-migration
sources:
  - label: "Webflow University: Pre-launch checklist"
    url: https://university.webflow.com/resources/checklists/pre-launch-checklist
    accessed: 2026-10-17
  - label: "Google Tag Platform: Consent mode overview"
    url: https://developers.google.com/tag-platform/security/concepts/consent-mode
    accessed: 2026-10-17
  - label: "Google Analytics Help: Key events"
    url: https://support.google.com/analytics/answer/13128484
    accessed: 2026-10-15
  - label: "Search Console Help: Rich Results Test"
    url: https://support.google.com/webmasters/answer/7445569
    accessed: 2026-10-17
  - label: "W3C WAI: WCAG 2.2 is a W3C Recommendation"
    url: https://www.w3.org/WAI/news/2023-10-05/wcag22rec
    accessed: 2026-10-17
  - label: "Google Search Central: Site moves with URL changes"
    url: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
    accessed: 2026-10-15
  - label: "Webflow Help Center: How to update DNS records when migrating a live site to Webflow"
    url: https://help.webflow.com/hc/en-us/articles/44474625240211-How-to-update-DNS-records-when-migrating-a-live-site-to-Webflow
    accessed: 2026-10-15
  - label: "Webflow Help Center: Webflow staging subdomain"
    url: https://help.webflow.com/hc/en-us/articles/33961419650067-Webflow-staging-subdomain
    accessed: 2026-10-15
  - label: "BenorMedia: Website Redesign Services for B2B & SaaS"
    url: https://www.benormedia.com/website-redesign
    accessed: 2026-10-15
volatile:
  - "Webflow pre-launch checklist sections and items (source: Webflow University, checked 2026-10-17)"
  - "Consent mode: four consent types, basic and advanced implementation, not a banner (source: Consent mode overview, updated 2026-07-30)"
  - "GA4 key events: up to 30, not retroactive, up to 24 hours (source: Key events, checked 2026-10-15)"
  - "Rich Results Test: URL or code, smartphone default, no guarantee of appearance (source: Rich Results Test, checked 2026-10-17)"
  - "Webflow DNS: lower TTL at least one TTL period ahead; SSL usually within minutes (source: updated 2026-02-02)"
volatileChecked: 2026-10-17
inbound:
  - page: /website-redesign
    anchor: "website launch checklist"
    sentence: "In the launch step of the process: Use our website launch checklist for the week before and after go-live."
  - page: /webflow-migration
    anchor: "launch-week checks"
    sentence: "Where the page describes launch and support: See the launch-week checks we run on every site."
editorNotes:
  - "The topic row asks for 'the checks that caught real problems on past launches'. Without project records, the post uses Google's, Webflow's, and W3C's documentation and the launch steps on /website-redesign; it states no past incidents."
  - "The topic row says to check overlap with the planned launch-data guide. That guide isn't live; when it is, link this post to it and keep this one focused on launch week."
  - "Consent section includes a one-line note that it isn't legal advice."
  - "No 30-day recheck and no AI note, per Sergio's answers of 2026-10-15."
---

A website launch checklist for a B2B site should cover more than design QA. The problems that cost leads in launch week tend to sit in redirects, forms, analytics, consent, and indexing. This checklist covers the week before launch, launch day, and the first week after, in the order you'd run the checks.

## What should a website launch checklist cover?

Webflow's own pre-launch checklist is a good base. It covers design and content review, forms and links, headings and alt text, page titles and meta descriptions, a final accessibility and SEO check, Google Search Console, analytics, custom domain, SSL, and indexing preferences.

For a B2B website, add the checks that protect pipeline and search traffic:

- a tested redirect map for every URL that changes;
- forms that reach the CRM, not only the inbox;
- key events for demo requests and sign-ups, set before launch day;
- a consent banner and consent settings that match how your tags load;
- legal pages (privacy policy, cookie policy, terms) linked from the footer;
- structured data tested on the templates that use it;
- a plan for the first week of monitoring.

The checklist below groups these by when they happen, so the right person can own each one.

## What should you double-check in the week before launch?

Freeze the website content, then test the entire site on staging while search engines can't index it. On Webflow, keep indexing disabled for the webflow.io staging subdomain until launch.

Table: Pre-launch checks for a B2B website

| Area | Check | Owner |
| --- | --- | --- |
| Content | Content freeze on the old site; final copy proofread | Marketing |
| Redirects | Every changed URL mapped to one new URL with a 301 | SEO |
| Forms | Every form submitted, and the lead reaches inbox, CRM, and analytics | Marketing ops |
| Analytics | Tags installed once; key events created for each conversion | Marketing ops |
| Consent | Banner live; tags respect each choice | Marketing ops and legal |
| Accessibility | Keyboard navigation, visible focus, alt text, color contrast, form labels | Design and development |
| SEO | Titles, meta descriptions, canonicals, and heading structure on every template | SEO |
| Structured data | Rich Results Test run on each template that has markup | SEO |
| Performance | Page speed and mobile layout checked on key templates | Development |

For accessibility, most teams aim at WCAG 2.2 level AA. WCAG 2.2 became a W3C Recommendation on October 5, 2023, and added nine success criteria to WCAG 2.1. A pre-launch pass won't replace a full audit, but keyboard-only navigation through the main pages and the forms catches many of the problems that block real users.

For structured data, the Rich Results Test accepts a URL or a code snippet and uses a smartphone crawler by default. Google says it doesn't guarantee a page will appear as the preview shows, so treat a clean result as valid markup, not a promise of rich results in search results.

## How do you run functionality testing on design elements, calls to action, and broken links?

Click through the new site the way a buyer would, on physical devices as well as in a desktop browser. Emulators miss touch targets and slow mobile connections.

- **Browsers and devices.** Test the key pages in the major browsers and on at least one iPhone and one Android phone. Check navigation menus, pop-ups, and sticky headers on mobile devices.
- **Calls to action.** Every button goes where its label says, and every demo request or sign-up call to action leads to a working form.
- **Check for broken links.** Crawl the staging site for broken links, including links in the footer, the navigation, and CMS content. Fix internal links that point at old URLs, even if a redirect would catch them.
- **Design consistency.** Spacing, fonts, and design elements match across templates, and nothing overflows at common screen widths.
- **Image optimization.** Compress images before upload, size them for where they appear, and give each meaningful image alt text. Decorative images get an empty alt attribute so screen readers skip them.
- **Mixed content errors.** Every image, script, and font loads over https, so browsers don't flag the page as insecure.

## How do you test forms and Google Analytics before go-live?

Submit every form yourself, on desktop and on a phone, and follow each lead to the end of its path.

1. **Inbox.** The notification email arrives at the right address and isn't caught by spam filters.
2. **CRM.** The lead is created with the right fields, owner, and source. Hidden fields such as UTM values arrive filled in.
3. **Confirmation.** The visitor sees a thank-you message or page that says what happens next.
4. **Analytics.** The conversion event fires once per submission, not once per click.

Then set up key events. In Google Analytics, mark demo requests, sign-ups, and contact forms as key events before launch. Google says marking an event as a key event isn't retroactive and new key events can take up to 24 hours to appear, so a key event created after launch day misses the first day's leads. A property can have up to 30 key events.

Check that each tag is installed in one place only. A tag added both in the site's settings and in a tag manager counts every page view twice.

## What needs to be in place for consent, privacy, and legal pages?

Legal pages, a way to collect consent, and tags that respect it. The privacy policy, cookie policy, and terms should be live, linked from the footer, and up to date with the tools the new site uses, since a new analytics tool or chat widget changes what the privacy policy has to say.

Google's consent mode doesn't collect consent itself. It adjusts how Google tags behave based on the choices a visitor makes in your banner or consent management platform, across four consent types: ad_storage, analytics_storage, ad_user_data, and ad_personalization.

Google describes two implementations:

- **Basic.** Google tags don't load until the visitor interacts with the banner, and no data goes to Google before that.
- **Advanced.** Google tags load when the page opens, with consent set to denied by default, and adjust once the visitor chooses.

Which one fits depends on where your visitors are and what your legal team decides; this isn't legal advice. Before launch, test the banner in a private browser window: reject everything, then confirm that analytics and ad tags don't set cookies.

## What should you check on launch day, from DNS to Google Search Console?

Work through the launch steps in order, and test on the live site, not on staging.

1. **DNS records.** If DNS changes, lower the TTL at least one full TTL period ahead (24 hours ahead for a 24-hour TTL), as Webflow recommends. On Webflow, the SSL certificate is usually issued within a few minutes of the domain connecting; with another hosting provider, check its own timing.
2. **Publish**, then load the home page and a sample of other pages over https with and without www.
3. **Robots and noindex.** Check robots.txt and the page source of key templates for leftover development blocks or noindex tags.
4. **Redirects.** Run the whole redirect map against production and confirm each old URL returns a 301 to its new URL in one hop.
5. **Sitemap.** Verify the domain in Google Search Console if it isn't already, and submit the XML sitemap so search engines find the new pages.
6. **Forms and key events.** Submit one real test of each main form on the live site and check the CRM and analytics again.

If the launch includes URL changes, Google treats it as a site move. Google advises keeping redirects in place generally for at least 1 year and making changes one after the other, not all at the same time.

## Which post-launch tasks matter most in the first week?

Check a short list every day, so a broken form or a stray noindex tag costs a day of leads, not a month. These post-launch tasks also show how website traffic and user behavior on the new site compare with the old site.

Table: First-week monitoring after a website launch

| Check | Where | What a problem looks like |
| --- | --- | --- |
| Indexing and crawl errors | Search Console | New 404 errors, blocked pages, pages excluded by noindex |
| Redirects | A crawl of old URLs | Chains, loops, or 404s |
| Form submissions | CRM | Fewer leads than the old site's daily average |
| Key events | Google Analytics | Events missing or firing twice |
| Site's performance | Key pages on mobile, in a speed test | Slow pages after real content and tags went live |
| Feedback | Sales and support | Prospects reporting errors or missing pages |

We check Search Console coverage, 404 errors, and the main pages daily for the first weeks after a launch, and we agree before launch on how much search fluctuation counts as normal. After the first week, move to a weekly review until rankings and leads settle.

We design, build, and launch websites for B2B and SaaS companies, so we have an interest in this topic. For how a launch fits into a full project, see our [website redesign](/website-redesign) page.
