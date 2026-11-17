---
slug: webflow-devlink
url: /blog/webflow-devlink
pageType: guide
draft: false
blockedBy: []
topicId: "3.5"
wave: 2
title: "Webflow DevLink, Code Components, and Cloud | BenorMedia"
description: "Webflow DevLink in 2026: React code components, DevLink Export, and Webflow Cloud. What each does, plan limits, SEO effects, and when hybrid beats a rebuild."
h1: "Webflow DevLink, code components, and Webflow Cloud: when adding React beats a rebuild"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-24
updatedAt: 2026-10-24
reviewEvery: none
primaryKeyword: "webflow devlink"
secondaryKeywords: []
takeaways:
  - "Webflow DevLink has three parts: React code components you use in the Designer, DevLink Export of Webflow components to React, and apps deployed to Webflow Cloud."
  - "Code components render on the server by default, so their HTML can be crawled. Components that turn server-side rendering off render only in the browser."
  - "Each code component runs in its own Shadow DOM and fetches data in the browser, and the whole library ships as one unit, with no versioning."
  - "Webflow Cloud runs Next.js, Astro, and Vite apps at a path on your site, with request and CPU allowances by plan. Former Business sites drop from 10 million to 2 million requests a month on Premium."
  - "A hybrid build fits when you need one feature, not a new stack. When most new work moves to code, a rebuild is usually the better long-term choice."
faqHeading: "Questions about Webflow DevLink"
faq:
  - q: "What is Webflow DevLink?"
    a: "Webflow calls DevLink the interface between external codebases and Webflow. It covers importing React components into Webflow as code components, exporting Webflow components to React with DevLink Export, and deploying apps to Webflow Cloud."
  - q: "Is Webflow DevLink still in beta?"
    a: "Code components have been generally available since September 17, 2025, and Webflow announced DevLink Export as generally available on May 5, 2026. Some Webflow pages still describe export as a beta, so check the docs for your plan."
  - q: "Can marketers edit Webflow code components?"
    a: "Yes, within limits. Designers and marketers can place code components and edit their props and slots in the Designer, including binding props to CMS fields. Changes to the component itself go through the developer's code, except for AI code components, which Site managers and Designers can change inside Webflow."
  - q: "Are Webflow code components good for SEO?"
    a: "They can be. Server-side rendering is on by default, which gives search engines the component's HTML. Components that turn it off, and React added through custom code embeds, render only in the browser, so keep SEO-critical content in native Webflow elements or the CMS."
  - q: "What's included in Webflow Cloud?"
    a: "Every site plan includes Webflow Cloud with limits: 5 apps, 1 million requests, and 15 CPU minutes a month on Starter and Basic, and 15 apps, 2 million requests, and 30 CPU minutes on Premium. Starter and Basic can't mount an app on a custom domain."
related:
  - /guides/webflow-vs-custom-code
  - /headless-cms-agency
  - /custom-websites-migrations
sources:
  - label: "Webflow Developers: DevLink overview"
    url: https://developers.webflow.com/devlink/reference/overview
    accessed: 2026-10-23
  - label: "Webflow Help Center: DevLink overview"
    url: https://help.webflow.com/hc/en-us/articles/33961378995219-DevLink-overview
    accessed: 2026-10-23
  - label: "Webflow Updates: Build with React components in Webflow"
    url: https://webflow.com/updates/build-with-react-components-in-webflow
    accessed: 2026-10-23
  - label: "Webflow: React integration"
    url: https://webflow.com/integrations/react
    accessed: 2026-10-23
  - label: "Webflow Updates: Updates to DevLink export"
    url: https://webflow.com/updates/updates-to-devlink-export
    accessed: 2026-10-23
  - label: "Webflow Developers: Changelog (DevLink)"
    url: https://developers.webflow.com/home/changelog?filter=DevLink
    accessed: 2026-10-23
  - label: "Webflow: Pricing"
    url: https://webflow.com/pricing
    accessed: 2026-10-23
  - label: "Webflow Help Center: Updated pricing and simplified plans for May 2026"
    url: https://help.webflow.com/hc/en-us/articles/51059955082387
    accessed: 2026-10-23
  - label: "Webflow Help Center: Code components"
    url: https://help.webflow.com/hc/en-us/articles/44650867960595-Code-components
    accessed: 2026-10-23
  - label: "Webflow Developers: Code component architecture"
    url: https://developers.webflow.com/code-components/component-architecture
    accessed: 2026-10-23
  - label: "Webflow Developers: Styling code components"
    url: https://developers.webflow.com/code-components/styling-components
    accessed: 2026-10-23
  - label: "Webflow Developers: Code components FAQs"
    url: https://developers.webflow.com/code-components/faqs
    accessed: 2026-10-23
  - label: "Webflow Developers: Bundling and import"
    url: https://developers.webflow.com/code-components/bundling-and-import
    accessed: 2026-10-23
  - label: "Webflow Updates: Easier setup and better performance for code components"
    url: https://webflow.com/updates/easier-setup-and-better-performance-for-code-components
    accessed: 2026-10-23
  - label: "Webflow Help Center: Library updates"
    url: https://help.webflow.com/hc/en-us/articles/33961343551763
    accessed: 2026-10-23
  - label: "Webflow Help Center: Component export using DevLink"
    url: https://help.webflow.com/hc/en-us/articles/44746282129427-Component-export-using-DevLink
    accessed: 2026-10-23
  - label: "Webflow Developers: DevLink Export quick start"
    url: https://developers.webflow.com/devlink/docs/quick-start/quick-start-component-export
    accessed: 2026-10-23
  - label: "Webflow Developers: DevLink Export usage"
    url: https://developers.webflow.com/devlink/docs/component-export/usage
    accessed: 2026-10-23
  - label: "Webflow Updates: AI code components"
    url: https://webflow.com/updates/ai-code-components
    accessed: 2026-10-23
  - label: "Webflow Help Center: Build AI code components"
    url: https://help.webflow.com/hc/en-us/articles/51168990228499-Build-AI-code-components
    accessed: 2026-10-23
  - label: "Webflow Help Center: Webflow component type overview"
    url: https://help.webflow.com/hc/en-us/articles/44650915153811-Webflow-component-type-overview
    accessed: 2026-10-23
  - label: "Webflow Updates: Webflow Cloud is generally available"
    url: https://webflow.com/updates/webflow-cloud-ga
    accessed: 2026-10-23
  - label: "Webflow Developers: Webflow Cloud introduction"
    url: https://developers.webflow.com/webflow-cloud/intro
    accessed: 2026-10-23
  - label: "Webflow Developers: Webflow Cloud environment"
    url: https://developers.webflow.com/webflow-cloud/environment
    accessed: 2026-10-23
  - label: "Webflow Developers: Bring your own app to Webflow Cloud"
    url: https://developers.webflow.com/webflow-cloud/bring-your-own-app
    accessed: 2026-10-23
  - label: "Webflow Developers: Webflow Cloud environments"
    url: https://developers.webflow.com/webflow-cloud/environments
    accessed: 2026-10-23
  - label: "Webflow Developers: Webflow Cloud limits"
    url: https://developers.webflow.com/webflow-cloud/limits
    accessed: 2026-10-23
  - label: "Webflow Help Center: Webflow Cloud plans and usage"
    url: https://help.webflow.com/hc/en-us/articles/40846212086035
    accessed: 2026-10-23
  - label: "Webflow Community: Webflow Cloud apps now on any domain"
    url: https://community.webflow.com/updates/post/webflow-cloud-apps-now-on-any-domain-oyGo6PtrEWSkTeS
    accessed: 2026-10-23
  - label: "Webflow: Webflow Cloud feature page"
    url: https://webflow.com/feature/cloud
    accessed: 2026-10-23
  - label: "Webflow Updates: Content Delivery APIs"
    url: https://webflow.com/updates/multi-channel-cms-content-delivery-apis
    accessed: 2026-10-23
  - label: "Google Search Central: Understand the JavaScript SEO basics"
    url: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
    accessed: 2026-10-23
  - label: "BenorMedia: Headless CMS Agency"
    url: https://www.benormedia.com/headless-cms-agency
    accessed: 2026-10-23
  - label: "BenorMedia: Webflow vs Custom Code: When to Leave Webflow"
    url: https://www.benormedia.com/guides/webflow-vs-custom-code
    accessed: 2026-10-23
volatile:
  - "Code components GA 2025-09-17; DevLink Export GA 2026-05-05 (Webflow's React page still says beta); AI code components 2026-04-30; Webflow Cloud GA 2025-07-21"
  - "Plan names: CMS and Business site plans merging into Premium from 2026-05-13 (new), 2026-06-29 (most existing), 2026-11-16 (Freelancer, Agency, legacy); docs still use the old names"
  - "Webflow Cloud allowances and runtime limits (pricing page, no date; Cloud plans article updated 2026-05-29; limits page says limits are subject to change)"
  - "CLI: devlink sync removed in v2.9.0 (2026-09-24); CLI login replaces .env tokens from v2.14.0 (2026-10-21)"
volatileChecked: 2026-10-23
inbound:
  - page: /guides/webflow-vs-custom-code
    anchor: "what DevLink, code components, and Webflow Cloud can do"
    sentence: "In the middle-path section: For the details and dated status of each option, see what DevLink, code components, and Webflow Cloud can do."
  - page: /headless-cms-agency
    anchor: "when a code component or a Webflow Cloud app is enough"
    sentence: "Next to 'You need one feature, not a new stack': Here's when a code component or a Webflow Cloud app is enough."
editorNotes:
  - "The topic row asks for 'what was tested'. No test was run, so the post uses Webflow's documentation and Google's guidance and claims no test results."
  - "Webflow's docs disagree on plan names (CMS and Business versus the new Premium plan), on DevLink Export's status, on who can use DevLink Export, and on AI code component plans. The post flags each instead of picking one."
  - "Webflow Cloud overage prices are left out on purpose; the post gives the included allowances."
  - "/blog/webflow-mcp isn't live yet. Once it is, link it from the Webflow Cloud section, since the MCP server can build and troubleshoot Cloud apps."
  - "Published 2026-10-24 (lead)."
---

Webflow DevLink connects a React codebase to Webflow in three ways: code components you use in the Designer, DevLink Export of Webflow components to React, and apps on Webflow Cloud. The right choice can spare you a full rebuild. This guide explains when a hybrid build wins, for B2B SaaS marketing leads, as of October 2026.

## How does Webflow DevLink work in 2026?

Webflow calls DevLink "the interface between external codebases and Webflow." Each part handles a different step between design and development, and each has its own status and plan rules.

Table: Webflow DevLink and Webflow Cloud, as of October 2026

| Part | What it does | Status | Plans named in Webflow's docs |
| --- | --- | --- | --- |
| Code components | Import React components into Webflow, where designers and marketers set their props and slots | Generally available since September 17, 2025 | CMS and Business site plans, or a paid Workspace plan |
| AI code components | The AI Assistant builds a code component from a description | Available to all customers since April 30, 2026 | A CMS or higher site plan and a paid Workspace plan; uses AI credits |
| DevLink Export | Export Webflow components as React components for another project | Generally available since May 5, 2026 | A paid Workspace plan, or a CMS, Business, or Ecommerce site plan |
| Webflow Cloud | Deploy Next.js, Astro, and Vite apps at a path on your site | Generally available since July 21, 2025 | All site plans, with usage limits |

Two caveats. Webflow has been merging its CMS and Business site plans into one Premium plan since May 2026, and its pricing page lists code components under Premium; our post on the [Webflow price increase](/blog/webflow-price-increase) covers the dates. And Webflow's React page still says "The component export feature is currently in beta," despite the May 2026 announcement.

Older tutorials describe DevLink as export-only and tell you to run "webflow devlink sync". Since September 2025, code components bring React into Webflow too, and Webflow replaced the sync command with "webflow devlink export" in May 2026; CLI v2.9.0 removed the old command on September 24, 2026.

## What can React code components do on a marketing website?

Code components let you use React components in Webflow. Developers create a component in React, run "webflow devlink import" from the Webflow CLI, and share the library. Once it's installed from the Libraries panel, designers and marketers place code components like any other component and edit their props and slots, including binding props to CMS fields. Good fits are interactive pieces, for example a pricing calculator, an ROI estimator, or a product tour.

Limitations designers and developers should both know:

- **Rendering.** "Webflow supports server-side rendering (SSR) for code components," and it's on by default. Developers turn it off for components that use browser-only APIs such as window or localStorage, which then render only in the browser. React Server Components aren't supported.
- **Isolation.** Each component is its own React app with its own Shadow DOM, so components "can't share React Context or state directly." Site classes and global CSS don't apply inside a component; developers connect site variables and other styles explicitly.
- **Data.** "All API requests are executed in the browser," against public APIs that allow CORS, and .env files aren't supported. Keep secret keys out of components.
- **Releases.** "the entire library is deployed as one unit," code components "don't support versioning," and the bundle limit is 50 MB. It's React only.
- **Updates.** Only a Workspace admin, owner, or Designer can review and accept library updates.

AI code components work differently. You describe the component, the AI Assistant builds it, and Site managers and Designers can refine it by prompt, in the Style panel, or in code; Marketers and Content editors can only view it. Webflow lists "No CMS data integration," and AI code components can't be exported to a codebase through DevLink.

## When should you export Webflow components to a React project?

When a React application, such as your product or docs site, should reuse the marketing website's design system. DevLink Export turns "native Webflow components" into React components, with global styles, variables, fonts, and component classes. Webflow designers keep the design in Webflow, and development teams get React code, so the product stays on-brand without rebuilding components by hand.

From the root of your React project, a developer runs "webflow devlink export," and the CLI writes "every component into a ./webflow folder." After design changes, they "run the export again to refresh them in your React project," and the rest of the app's code is left untouched. "DevLink exports Components only, not every element on the canvas," so anything else has to become a component first.

Limitations to know:

- Components with bound CMS content "won't export fully," and Collection Lists export as "unsupported element placeholders."
- Component-scoped interactions export; page-level IX3 interactions don't.
- Webflow's Help Center says "Only Site Admins and Designers" can use it, while its developer docs ask for Site Admin or Owner permissions.

Webflow recommends deploying the exported project on Webflow Cloud. DevLink Export isn't Webflow's code export, which downloads a static copy of the site; our post on [Webflow export code](/blog/webflow-export-code) covers that one.

## What is Webflow Cloud for?

For the parts of a site that need a server. Webflow says its hosting "excels at delivering static sites and CMS-driven content," and Cloud is for "experiences that require backend processing, API integrations, and dynamic content generation."

A Webflow Cloud app is a project built with a framework such as Next.js 15, Astro 5, or Vite, deployed from GitHub with one environment per branch. It runs on Cloudflare Workers and mounts at a path on your site, such as /app; if a Cloud route and a Webflow page collide, the Cloud app wins. Since June 2026, an app doesn't need a Webflow site attached. Cloud projects can use SQLite, key-value, and object storage, and they can read published CMS content through Webflow's Content Delivery APIs.

Table: Webflow Cloud allowances by site plan (as of October 2026)

| | Starter (free) and Basic | Premium |
| --- | --- | --- |
| Apps | 5 | 15 |
| Requests | 1 million a month | 2 million a month |
| CPU time | 15 minutes a month | 30 minutes a month |
| SQLite and key-value storage | 100 MB each | 200 MB each |
| Object storage | 1 GB | 2 GB |
| Mount on a custom domain | No | Yes |

Bandwidth is pooled with the site's bandwidth, and usage above the allowance is billed. Watch the plan change: Webflow's own migration notes say former Business sites go from "10M to 2M/month" requests on Premium. Each request also has runtime limits, including 30 seconds of CPU time, 128 MB of memory, and a 20-second timeout, and Cloud only "partially supports Node.js APIs."

## When should you use DevLink instead of a full rebuild?

When you need one feature, not a new stack. That's when a hybrid build beats a rebuild. Our [headless CMS agency](/headless-cms-agency) page says the same: "A Webflow Cloud app or a React code component adds it to the site you already have." We recommend a headless build when two or more of these are true: pages come from product data, many pages need web app features, engineers want ownership, you've hit platform limits, or you want to build with coding agents.

Table: Which path fits which need

| Need | Best fit | Why |
| --- | --- | --- |
| One interactive widget, such as a calculator | A code component, or an AI code component for simple cases | Marketers place it and edit its props |
| A React UI your product team already built | A DevLink code component | Reuse it instead of rebuilding it in Webflow |
| A product app that should stay on-brand | DevLink Export | It reuses the website's components and styles |
| A logged-in tool or server-side logic | A Webflow Cloud app at a mount path | It runs server code next to the marketing website |
| SEO-critical pages | Native Webflow pages and CMS, or a server-rendered app on Webflow Cloud | Both give crawlers HTML |
| Most new work is moving to code | A full rebuild | A hybrid works while code stays a small part of the site |

Our [Webflow vs custom code guide](/guides/webflow-vs-custom-code) covers the full-rebuild decision, and our [custom websites and migrations](/custom-websites-migrations) page covers how a rebuild keeps rankings.

## How do React components affect SEO and page speed?

It depends on where the HTML is made. Webflow says "SSR generates initial HTML for the component on the server, which can improve perceived performance and SEO," so keep SSR on for anything you want indexed. With SSR off, a component renders only in the browser. React added through custom code embeds is worse for search: Webflow says that content "is absent from the initial server-returned HTML," and its built-in SEO tools "have no visibility into React-rendered output."

Google's guidance points the same way. Server-side or pre-rendering "is still a great idea," and "not all bots can run JavaScript." So Webflow's HTML advantage, covered in [is Webflow good for SEO](/blog/is-webflow-good-for-seo), holds for code components with SSR on, not for browser-only ones.

For speed, Webflow says code component bundles got "up to 75% smaller" in December 2025, but we found no Webflow figure for what a component adds to a page. Before a component reaches production, test a page with and without it against the [Core Web Vitals](/blog/core-web-vitals-optimization) thresholds: LCP of 2.5 seconds or less, INP of 200 ms or less, and CLS of 0.1 or less.

We build Webflow and headless sites for B2B SaaS companies, so we have an interest in this topic.
