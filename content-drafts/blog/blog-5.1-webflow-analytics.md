---
slug: webflow-analytics
url: /blog/webflow-analytics
pageType: guide
draft: true
blockedBy: []
topicId: "5.1"
wave: 1
title: "Webflow Analytics: What to Set Up First | BenorMedia"
description: "What Webflow Analyze, GA4, and Google Tag Manager each measure on a B2B SaaS site, the order to set them up, a starter event list, and the Google tag gateway."
h1: "Webflow analytics for B2B SaaS: Analyze, GA4, Tag Manager, and what to set up first"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2027-01-05
updatedAt: 2027-01-05
reviewEvery: none
primaryKeyword: "webflow analytics"
secondaryKeywords: []
takeaways:
  - "Webflow Analyze is a paid add-on for page-level behavior, such as visitors, clicks, scroll depth, and traffic sources, with no tagging."
  - "GA4 is the tool for leads: mark generate_lead and sign_up as key events, which can also feed Google Ads."
  - "Webflow's Google Analytics integration accepts G-, GT-, AW-, and GTM- IDs and loads Google's tags through the Google tag gateway on Webflow hosting."
  - "Add the GA4 tag in one place only, and move to Tag Manager when you manage several Google and third-party tags."
faqHeading: "Questions about analytics on Webflow"
faq:
  - q: "Does Webflow have built-in analytics?"
    a: "Yes. Webflow Analyze is built-in analytics sold as a paid add-on. It shows sessions, visitors, page views, clicks, bounce rate, and traffic sources, and Analyze mode adds clickmaps and scroll depth for each page."
  - q: "Do I still need GA4 if I have Webflow Analyze?"
    a: "If you need to measure leads by channel, yes. Analyze goals track clicks on buttons and links, while GA4 records lead events as key events, reports them by channel, and can share them with Google Ads."
  - q: "How do I add Google Analytics to Webflow?"
    a: "Go to Site settings, open the Integrations tab, find Google Analytics, paste your measurement ID, save, and publish. Add the tag in only one place to avoid duplicate tracking."
  - q: "Does Webflow Analyze use cookies?"
    a: "Webflow says Analyze doesn't use cookies; it uses browser local storage and anonymous identifiers. You choose whether tracking is always on, opt-in, or opt-out, and the last two need a consent management solution."
  - q: "Why don't Webflow Analyze and GA4 show the same numbers?"
    a: "The tools count differently, and Webflow says discrepancies with third-party tools are expected. Compare trends within each tool, not totals across them."
related:
  - /webflow-seo-agency
  - /growth
  - /ongoing-website-support
sources:
  - label: "Webflow Help Center: Intro to Webflow Analyze"
    url: https://help.webflow.com/hc/en-us/articles/34200153798163
    accessed: 2026-10-15
  - label: "Webflow Help Center: Get page level insights with Analyze mode"
    url: https://help.webflow.com/hc/en-us/articles/40217030018835
    accessed: 2026-10-15
  - label: "Webflow: Webflow Analyze is now available"
    url: https://webflow.com/updates/webflow-analyze-is-now-available
    accessed: 2026-10-15
  - label: "Webflow Help Center: How do I connect my Webflow site to Google Analytics?"
    url: https://help.webflow.com/hc/en-us/articles/33961293143059
    accessed: 2026-10-15
  - label: "Webflow: Google tag gateway: Now on Webflow"
    url: https://webflow.com/blog/google-tag-gateway-now-on-webflow
    accessed: 2026-10-15
  - label: "Google for Developers: Google tag gateway for advertisers"
    url: https://developers.google.com/tag-platform/tag-manager/gateway
    accessed: 2026-10-15
  - label: "Tag Manager Help: Google Tag Manager vs. gtag.js"
    url: https://support.google.com/tagmanager/answer/7582054?hl=en
    accessed: 2026-10-15
  - label: "Analytics Help: Default channel group"
    url: https://support.google.com/analytics/answer/9756891?hl=en
    accessed: 2026-10-15
  - label: "Analytics Help: Enhanced measurement events"
    url: https://support.google.com/analytics/answer/9216061?hl=en
    accessed: 2026-10-15
  - label: "Analytics Help: Recommended events"
    url: https://support.google.com/analytics/answer/9267735?hl=en
    accessed: 2026-10-15
  - label: "Analytics Help: Mark events as key events"
    url: https://support.google.com/analytics/answer/13128484
    accessed: 2026-10-15
  - label: "BenorMedia: Webflow SEO Agency: SEO & AEO for B2B"
    url: https://www.benormedia.com/webflow-seo-agency
    accessed: 2026-10-15
volatile:
  - "Analyze: paid add-on, what it tracks, goals as clicks on buttons and links, tracking methods and consent, no cookies, 90 days at a time, history lost if disabled, AEO analytics need a Team or Enterprise plan (source: Intro to Webflow Analyze, updated 2026-08-02)"
  - "Analyze mode: per-page metrics, clickmaps, scroll depth, no setup (source: Analyze mode, updated 2026-03-09); launched 2024-10-31 for Basic, CMS, Business, and Enterprise Site plans (source: Webflow update)"
  - "Google Analytics integration: menu path, accepted ID prefixes, one place only, Google tag gateway, re-save and republish, paid plan for custom code (source: updated 2026-08-31)"
  - "Gateway only on Webflow hosting, republish to activate (source: Webflow blog, updated 2026-09-17)"
  - "GA4's default channel group includes an AI Assistant channel (source: Default channel group, checked 2026-10-15)"
  - "Enhanced measurement scroll and form events; recommended events generate_lead and sign_up; up to 30 key events, not retroactive, up to 24 hours (sources: Analytics Help, checked 2026-10-15)"
volatileChecked: 2026-10-15
inbound:
  - page: /webflow-seo-agency
    anchor: "Webflow analytics setup"
    sentence: "Where the page describes monthly reports and pipeline: See the Webflow analytics setup we start from."
  - page: /growth
    anchor: "what to set up first in Webflow analytics"
    sentence: "In step 06, tracking and reporting: Read what to set up first in Webflow analytics."
editorNotes:
  - "Sergio's standard measurement setup and event list are a marker (P51-1). The event table uses Google's recommended event names, not a BenorMedia list."
  - "Webflow's help article gives the menu path as Site settings, Integrations tab; its September 2026 blog post may describe a newer path. Check the live Webflow UI before publishing."
  - "Google's own gateway page doesn't mention consent, so the post makes no consent claim for the gateway beyond the logic that it changes where tags load from."
  - "No 30-day recheck and no AI note, per Sergio's answers of 2026-10-15."
---

On a B2B SaaS site built in Webflow, set up Google Analytics 4 (GA4) first, because it's where leads get measured, then add Tag Manager when you run several tags and Webflow Analyze if your team wants page-level clickmaps inside Webflow. This guide for marketing leads and founders covers each tool and a starter event list, as of October 2026.

## What analytics does Webflow have built in?

Webflow Analyze, Webflow's native website analytics tool, a paid add-on launched on October 31, 2024, for Webflow users on Basic, CMS, Business, and Enterprise Site plans. It shows top pages, sessions, unique visitors, page views, clicks on buttons, links, and forms, bounce rate, time on page, and top traffic sources, regions, and devices. Analyze mode adds page-level insights, such as clickmaps and scroll depth, for each page you view in Webflow.

It's built into the Webflow platform and needs no setup: Webflow says there's no tagging or extra tools required. A few details to know before you rely on it:

- You can view up to 90 days of data at once, and if you turn Analyze off, you lose access to its historical data.
- Goal tracking covers clicks on buttons and links.
- Analyze doesn't use cookies; it uses browser local storage and anonymous identifiers. You choose whether tracking is always on, opt-in, or opt-out, and the last two need a consent management solution. Webflow says privacy compliance, such as GDPR and CCPA, depends on that choice and your consent tools.
- Webflow's AEO analytics need a Team or Enterprise plan as well as the Analyze add-on.

Table: Webflow Analyze, GA4, and Google Tag Manager compared

| | Webflow Analyze | GA4 | Google Tag Manager |
| --- | --- | --- | --- |
| What it is | Built-in analytics, a paid add-on | Google's analytics product | A tool that loads and manages tags |
| Setup on Webflow | None | Measurement ID in Site settings | Container ID in Site settings, or custom code |
| Best for | Page-level visitor behavior: clicks, scroll depth, top pages | Leads, key events, and channels | Several Google and third-party tags without code changes |
| Watch out for | 90 days of data at a time | Up to 30 key events on a standard property | Someone has to own the container |

## Which analytics tools should you set up first on a Webflow site?

Google Analytics 4, because a B2B SaaS site is measured by leads, and GA4 lets you mark lead events as key events, report them by channel, and share them with Google Ads. Then add the others when you need them:

1. **Google Analytics 4 through Webflow's integration.** It takes a measurement ID and, on Webflow hosting, loads Google's tags through the Google tag gateway.
2. **Lead events.** Send generate_lead and sign_up, and mark them as key events.
3. **Tag Manager.** Move to it when you manage several tags. Google says Tag Manager is best for marketers who are in charge of tagging and need to manage Google and third-party tags, and that it lets you manage tags without changing your website's code.
4. **Webflow Analyze.** Add it if designers and content editors want to see user behavior next to the pages they edit.

Whatever you choose, add the GA4 tag in one place only. Webflow recommends putting it either in the integration field or in custom code, not both, to avoid duplicate tracking. If GA4 runs inside Tag Manager, put only the GTM- container ID in Webflow.

## How do you add GA4 and Tag Manager to a Webflow site?

Through Site settings, with the ID from Google.

1. In Webflow, open Site settings, then the Integrations tab, and find Google Analytics.
2. Paste the ID. The field accepts IDs that start with G-, GT-, AW-, or GTM-, so the same field works for a GA4 measurement ID or a Tag Manager container.
3. Save and publish the site.
4. Open a page on the live site and check that the visit shows up in the Realtime report in Google Analytics.

Custom code, such as a second tool's script, needs a paid Site plan or Workspace plan. If you already used the integration before Webflow added the Google tag gateway, Webflow says to re-save your measurement ID and republish to prevent gaps in your data.

## What is the Google tag gateway, and should you use it?

It loads Google's tags from your own domain instead of from Google's. Google describes it as a way to deploy a Google tag using your own first-party infrastructure, hosted on your website's domain. Webflow's integration uses it to reduce the impact of ad blockers.

On Webflow, you don't build anything: the automated gateway works only on Webflow hosting, and a site that already uses the integration turns it on by republishing. A site exported from Webflow or hosted elsewhere needs its own setup through a CDN, load balancer, or web server.

The gateway changes where tags load from, not whether you need consent. Your cookie or consent banner and settings still govern data collection by those tags, so check them before you compare data from before and after the switch.

## Which events should a B2B SaaS site track?

Start with a short list that maps to the funnel, using Google's recommended event names where one fits. Google says recommended events help you measure more features and get more useful reports, and they aren't sent automatically.

Table: A starter event list for a B2B SaaS site on Webflow

| Event | When it should fire | Mark as key event? |
| --- | --- | --- |
| generate_lead | A demo or contact form is submitted successfully | Yes |
| sign_up | Someone creates a trial or free account | Yes |
| page_view | Every page load, collected automatically | No |
| scroll | A visitor first reaches 90% depth on a page | No |
| form_start and form_submit | A visitor starts or submits a form | No |

For actions without a recommended name, such as a pricing calculator or a docs download, send custom events with clear names.

Two cautions about form submissions. GA4's form_submit fires when someone submits a form, and Google doesn't say it confirms the submission succeeded, so fire generate_lead on the form's success state or a thank-you page and test it. And key events aren't retroactive: marking an event affects reports from that point on, and it can take up to 24 hours to show in standard reports. You can mark an event as a key event before GA4 has collected it, so set them up before launch.

## What should a monthly analytics report show?

Leads first, then where they came from and which pages produced them. We lead monthly reports with pipeline: demo requests and sign-ups from organic search and AI referrals.

A one-page monthly view for a B2B SaaS site on Webflow can cover:

- key events, such as demo requests and sign-ups, by channel, from GA4's Traffic acquisition report;
- the landing pages that produced those key events;
- visits from AI assistants, which GA4's default channel group now groups in an AI Assistant channel;
- clicks and scroll depth on your top pages, from Webflow Analyze, if you use it;
- the search queries that brought visitors, from Google Search Console;
- anything that changed on the site that month, such as a new page or a pricing update.

Read these key metrics as trends over months. A B2B site gets few leads a month, so a handful can swing the percentages. Compare each month with the same tool's earlier months, not one tool's numbers with another's: Webflow says discrepancies between Analyze and third-party tools are expected. For how this fits into SEO work on Webflow, see our [Webflow SEO and AEO](/webflow-seo-agency) page.

We set up analytics and reporting on Webflow sites for B2B SaaS companies, so we have an interest in the topic.

## How was this post written and checked?

This post draws on Webflow's help center and announcements and on Google's Analytics, Tag Manager, and tag gateway documentation, all opened on October 15, 2026, and listed in the sources.
