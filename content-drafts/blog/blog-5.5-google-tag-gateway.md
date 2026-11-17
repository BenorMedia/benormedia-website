---
slug: google-tag-gateway
url: /blog/google-tag-gateway
pageType: guide
draft: false
blockedBy: []
topicId: "5.5"
wave: 3
title: "Google Tag Gateway on Webflow: Setup and Checks | BenorMedia"
description: "What Google tag gateway does, how to turn it on for a Webflow site, how to check it works, and where consent mode and server-side tagging still matter."
h1: "Google tag gateway on Webflow: what it does, how to set it up, and what to check"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-26
updatedAt: 2026-10-26
reviewEvery: 30 days
primaryKeyword: "google tag gateway"
secondaryKeywords: []
takeaways:
  - "Google tag gateway loads your Google tag from your own domain and sends some measurement requests through it."
  - "On Webflow hosting it runs automatically for tags added through the native Google tag integration, once you publish."
  - "Move Google tags out of custom code into the integration, keep your event snippets, and test on the staging domain with Tag Assistant."
  - "The gateway changes how tags are delivered, not whether you need consent; consent mode still decides what Google tags may do."
  - "Server-side Tag Manager goes further, with control over how data is shaped and routed, and Google recommends using both for the most durable setup."
faqHeading: "Questions about Google tag gateway"
faq:
  - q: "What is Google tag gateway?"
    a: "Google tag gateway for advertisers lets you serve a Google tag from your own website's domain instead of Google's, and sends some measurement requests to Google through that domain. Google says this makes measurement more accurate and resilient."
  - q: "Does Google tag gateway work on Webflow?"
    a: "Yes. On Webflow hosting it runs automatically for tags added through the native Google tag integration in Site settings. Exported or self-hosted sites need a manual setup through a CDN, load balancer, or web server."
  - q: "How do I know if Google tag gateway is active?"
    a: "In Google Tag Manager, open Google tags, choose your tag, then go to Admin and Google tag gateway. The status should read Active, and the tag script should load from your own domain in your browser's Network tab."
  - q: "Does Google tag gateway replace consent mode?"
    a: "No. It changes where the tag loads from and how some requests travel, not whether you need consent. Consent mode and your consent banner still decide what Google tags may store and send."
  - q: "What is the difference between Google tag gateway and server-side GTM?"
    a: "The gateway serves Google tags and some requests through your own domain using your CDN or host. Server-side Tag Manager runs a server container you control, which lets you shape and route data before it reaches Google or other vendors."
related:
  - /webflow-seo-agency
  - /growth
  - /ongoing-website-support
sources:
  - label: "Google for Developers: Google tag gateway for advertisers"
    url: https://developers.google.com/tag-platform/tag-manager/gateway
    accessed: 2026-10-26
  - label: "Google for Developers: Set up Google tag gateway for advertisers"
    url: https://developers.google.com/tag-platform/tag-manager/gateway/setup-guide
    accessed: 2026-10-26
  - label: "Google for Developers: Consent mode overview"
    url: https://developers.google.com/tag-platform/security/concepts/consent-mode
    accessed: 2026-10-26
  - label: "Google for Developers: An introduction to server-side tagging"
    url: https://developers.google.com/tag-platform/tag-manager/server-side/intro
    accessed: 2026-10-26
  - label: "Google Ads Help: Introducing Google tag gateway for advertisers"
    url: https://support.google.com/google-ads/answer/16214371?hl=en
    accessed: 2026-10-26
  - label: "Google: Google tag gateway, Accelerate with Google"
    url: https://business.google.com/us/accelerate/announcements/google-tag-gateway/
    accessed: 2026-10-26
  - label: "Webflow: Google tag gateway now on Webflow"
    url: https://webflow.com/blog/google-tag-gateway-now-on-webflow
    accessed: 2026-10-26
volatile:
  - "Google tag gateway runs automatically on Webflow hosting through the native Google tag integration; exported or self-hosted sites not covered; Google Ads for Webflow app support listed as coming soon (source: Webflow, updated September 16, 2026)"
  - "Google figures: 11% uplift in signals (Google internal data, April 2025); 14% average conversion uplift and up to 7% lower CPA (source: Google page modified September 16, 2026)"
  - "In-UI integrations named by Google: Google Cloud (beta), Fastly, Akamai, Webflow, Duda, and Cloudflare (source: Google page modified September 16, 2026)"
  - "Setup guide statements on first-party loading and prerequisites (source: Google for Developers, updated October 13, 2026)"
volatileChecked: 2026-10-26
inbound:
  - page: /blog/webflow-analytics
    anchor: "how to set up and check Google tag gateway on Webflow"
    sentence: "In the section on what the Google tag gateway is, link to the post for setup paths, checks, and consent details."
  - page: /blog/consent-mode-v2-webflow
    anchor: "Google tag gateway and consent mode"
    sentence: "Where the post explains advanced consent mode, link to the post for how the gateway fits."
editorNotes:
  - "First-hand gap #P55-1 asks whether we have switched the gateway on for a client Webflow site and what changed. Default deletes the marker."
  - "Primary keyword changed from none in the topic bank to google tag gateway, which now shows measurable US demand in the keyword check; the topic row's Webflow angle is kept."
  - "The 14% and 7% figures are Google's own claims, cited as such; Webflow's footnotes describe the 14% basis as Google internal data, so keep the attribution if editing."
---

Google tag gateway loads your Google tag from your own domain and sends some measurement requests through it, which Google says makes conversion signals more accurate and resilient. On Webflow hosting it runs automatically through the native Google tag integration. This guide is for B2B SaaS marketing leads who rely on Google Ads or Google Analytics data, as of October 2026.

## What is Google tag gateway?

Google tag gateway (GTG), officially Google tag gateway for advertisers, is a Google feature that lets you "deploy a Google tag using your own first-party infrastructure, hosted on your website's domain." Your Google tag snippet then loads its script from your first-party domain instead of a Google domain, and some measurement requests go to Google through your domain too. Google's own summary: "Serve scripts and send measurement in a first-party context."

You can run it on infrastructure you already have: a content delivery network (CDN), a load balancer, or a web server that can forward requests to Google. Google's announcement page, last modified September 16, 2026, describes it as "upgrading your tags to serve from your site's own server to improve performance and resilience." It lists in-product integrations with Google Cloud (beta), Fastly, Akamai, Webflow, Duda, and Cloudflare, and says the upgrade "requires no changes to the existing tag code."

What it does not do matters as much:

- It covers Google tags, such as Google Analytics 4 (GA4), Google Ads, and a Google Tag Manager (GTM) container, not non-Google tags such as the Meta Pixel or the LinkedIn Insight Tag.
- It is not server-side tagging, and not a full replacement for server-side GTM. There is no server container to configure, and the tags still send their data to Google.
- It does not change whether you need consent. Your consent banner and consent mode settings still apply.

Our [Webflow analytics guide](/blog/webflow-analytics) covers where the gateway fits in a full measurement setup. This post covers turning it on, checking it, and the consent caveats.

## What does Google tag gateway change for your data?

Google tag gateway changes the route your measurement data takes, not what you collect, and Google reports more measured signals as a result. When it launched the feature in May 2025, Google reported an 11% uplift in signals compared with tags not using the gateway, based on Google tag script loads in April 2025. Its current page says advertisers who adopted the gateway "on average observed conversions uplift of 14%" and saw "up to 7% lower Cost per Acquisition." Webflow's footnote describes that comparison as against advertisers using enhanced conversions without the gateway.

Read those as averages reported by the vendor, not a forecast for your site. Results vary, and a B2B SaaS site with low conversion volume may not see a measurable change for weeks. Google's announcement pages talk about performance and resilience, not about ad blockers or browser restrictions, so don't plan around the gateway as a fix for either.

Two other changes are easier to count on:

1. The user's browser makes fewer direct requests to Google's domains, because the script and part of the measurement traffic run through your website's server or CDN.
2. Google and Webflow both say tags deployed with the gateway get confidential computing by default, which they present as added protection for personal data.

For Google Ads, more accurate conversion data feeds automated bidding, especially alongside enhanced conversions. For Google Analytics, the aim is more complete event data and better data accuracy, which matters most when key conversions, like demo requests, are few.

## How do you enable Google tag gateway on a Webflow site?

On Webflow hosting, you don't configure Google tag gateway yourself. Webflow's page, updated September 16, 2026, says it runs behind the scenes for tags added through the native Google tag integration in Site settings, and sites that already use the integration activate it on their next publish.

Path A, a site with no Google tag yet:

1. Copy your Google tag ID.
2. In Webflow, open Site settings, then Apps & Integrations, and find the Google tag section.
3. Click Settings, paste the tag ID, name it, and save changes.
4. Publish the site.
5. In Google Tag Manager, open Google tags, choose your tag, and go to Admin, where you find Google tag gateway. Confirm the status reads Active.

Path B, a site with the tag pasted into custom code:

1. In Site settings, open Custom code, copy your tag ID, and back up the full snippet.
2. Add the tag ID under the Google tag settings in Apps & Integrations. You can add more than one ID, for example a GTM container and a Google Ads tag.
3. Back in Custom code, remove the legacy tag snippets from the head and the body noscript section. Keep event snippets, such as conversion or form submit code, if you still use them.
4. Publish to the webflow.io staging domain and test with Google's Tag Assistant before you publish to production.

Two limits, as of October 2026: the automatic setup only covers Webflow hosting. To implement Google tag gateway on an exported or self-hosted site, follow Google's manual setup through a CDN, load balancer, or web server; for sites behind Cloudflare, Google announced a one-click integration with Cloudflare in May 2025. And Webflow lists support for its Google Ads app in the native integration as "coming soon."

## How do you check that Google tag gateway is working?

To confirm Google tag gateway is working, check three things after you publish: the gateway status in Tag Manager reads Active, the tag script loads from your own domain, and your GA4 events and Google Ads conversions still arrive. Then compare a few weeks of data with the weeks before the change. To see the script source, open the Network tab in your browser's developer tools, filter by your tag ID, and reload the page.

Table: Before and after checks for Google tag gateway

| Check | Before you switch | After you publish |
| --- | --- | --- |
| Gateway status | Not active | Google tags, Admin, Google tag gateway reads Active |
| Script source | Loads from a Google domain | Loads from your first-party domain in the Network tab |
| Tag firing | Record which tags fire on key pages | Tag Assistant shows the same tags, each firing once |
| Google Analytics events | Note daily counts for key events | Events appear in Realtime and DebugView |
| Google Ads conversions | Note weekly conversions per action | Conversion tags still fire on the thank-you step |
| Duplicates | Find tags in both custom code and the integration | Only one copy of each tag ID loads |

The duplicate check matters most during a migration. A tag left in custom code while the same ID also loads through the integration can send duplicate page views and conversions.

## How does Google tag gateway work with consent mode?

Google tag gateway changes where Google tags load from, not what they are allowed to do. Consent mode and your consent banner still govern data collection, meaning what the tags may store and send. Google's documentation is direct: "You are responsible for obtaining users' consent on your website or app."

The two consent mode setups behave differently:

- **Basic consent mode** stops Google tags from loading until the visitor responds to your banner.
- **Advanced consent mode** loads Google tags right away, and while consent is denied, "the Google tags send measurements without cookies."

Webflow recommends one of two setups with the gateway: advanced consent mode with a global default of denied, or a Tag Manager container that fires tags based on consent state, often through your consent platform's templates. Either way, set the defaults before any tag fires, and check that a denied state really stops cookies in your browser's storage panel.

Two caveats to settle with whoever owns privacy at your company:

1. Your privacy notice should describe Google measurement on your site, including that requests pass through your domain.
2. Routing tags through your own domain must not be used to get around a visitor's choice. Treat a denied state the same way with or without the gateway, and get legal review for the regions you sell into.

Our guide to [Consent Mode v2 on a Webflow site](/blog/consent-mode-v2-webflow) walks through the banner and default settings in detail.

## Google tag gateway vs server-side GTM: which do you need?

For most B2B SaaS marketing sites on Webflow, start with Google tag gateway, because Webflow runs it for you. Add server-side GTM, often called server-side tracking, when you need data control over what leaves your site, want to send first-party data to other vendors, or must remove personal data before it reaches anyone. Both are upgrades on a standard client-side setup, where the browser loads tags from Google and sends data straight to Google.

Table: Google tag gateway vs server-side Google Tag Manager

| | Google tag gateway | Server-side Google Tag Manager |
| --- | --- | --- |
| What it does | Serves Google tags and some requests through your domain | Receives events in a server container and forwards them |
| Where it runs | Your CDN, load balancer, web server, or Webflow hosting | A server you control, in Google Cloud or another environment |
| Data control | Requests are forwarded to Google | You decide how data is shaped and where it goes |
| Vendors covered | Google tags | Google and other vendors you send data to |
| Setup on Webflow | Automatic with the native integration | A separate project with its own hosting |

Google treats the two as steps that work together. Its gateway page lists two steps for server-side setups, mapping a custom domain and loading first-party scripts with the gateway, and says: "We recommend you complete both steps for the most durable tagging setup." Google's server-side documentation also says only you have access to the data in the server "until you choose to send it elsewhere."

We build Webflow sites for B2B SaaS companies and offer [Webflow SEO](/webflow-seo-agency), so we have an interest in the topic. Our [growth services](/growth) cover SEO, GEO, and CRO for B2B SaaS sites.
