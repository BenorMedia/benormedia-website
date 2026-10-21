---
slug: core-web-vitals-optimization
url: /blog/core-web-vitals-optimization
pageType: guide
draft: false
blockedBy: []
topicId: "7.3"
wave: 2
title: "Core Web Vitals Optimization: Webflow and Astro | BenorMedia"
description: "Core Web Vitals optimization for Webflow and Astro: how third-party scripts hurt LCP, INP, and CLS, how to find them, and the rules that keep them in check."
h1: "Core Web Vitals optimization on Webflow and Astro: the third-party script problem"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-20
updatedAt: 2026-10-20
reviewEvery: 30 days
primaryKeyword: "core web vitals optimization"
secondaryKeywords: ["core web vitals", "third-party scripts", "largest contentful paint", "interaction to next paint"]
takeaways:
  - "Good Core Web Vitals means LCP of 2.5 seconds or less, INP of 200 milliseconds or less, and CLS of 0.1 or less, judged at the 75th percentile of page loads, separately for mobile and desktop."
  - "INP replaced First Input Delay on March 12, 2024 and covers every interaction in a visit, so a lab test that only loads the page can miss a failing INP. Check field data first."
  - "Third-party scripts hurt each metric differently: synchronous scripts in the head delay LCP, long tasks from tag managers and widgets slow INP, and late banners and embeds shift the layout."
  - "Webflow and Astro let you control where and when code loads, not what a vendor's script does once it runs: use footer code, async or defer, an eager hero image, late hydration, and Partytown."
  - "Keep a script register with an owner for every line, fire non-essential tags after Window Loaded, use facades for chat and video, and let no new script ship if it pushes a key page past the good thresholds."
faqHeading: "Questions about Core Web Vitals optimization"
faq:
  - q: "What are the three Core Web Vitals?"
    a: "Largest Contentful Paint (LCP) measures loading, Interaction to Next Paint (INP) measures responsiveness, and Cumulative Layout Shift (CLS) measures visual stability. Good scores are 2.5 seconds or less, 200 milliseconds or less, and 0.1 or less, at the 75th percentile of page loads, separately for mobile and desktop."
  - q: "What is a good LCP score?"
    a: "A good LCP is 2.5 seconds or less at the 75th percentile of page loads. Over 4 seconds is poor, and anything in between needs improvement. Google assesses mobile and desktop separately, so check both."
  - q: "Do Core Web Vitals affect Google rankings?"
    a: "Google's Search documentation says it highly recommends good Core Web Vitals for success with Search and that they align with what its core ranking systems seek to reward. Treat them as one signal among many, and as a measure of user experience first."
  - q: "How do third-party scripts affect Core Web Vitals?"
    a: "Synchronous scripts in the head delay LCP, long tasks from tag managers, embeds, and consent scripts slow INP, and late banners, embeds, and widgets shift the layout and raise CLS. The platform matters less than what the vendor's code does once it runs."
  - q: "How do you check Core Web Vitals on a Webflow or Astro site?"
    a: "Start with field data in PageSpeed Insights or the Search Console Core Web Vitals report, both built on the Chrome User Experience Report's 28-day data. Then record a load in Chrome DevTools and run Lighthouse to find the scripts behind a failing metric."
  - q: "Is Webflow or Astro better for Core Web Vitals?"
    a: "Neither guarantees good Core Web Vital scores. Webflow hosting includes a global CDN and Astro ships no client-side JavaScript unless a component needs it, but a heavy tag manager, chat widget, or consent banner behaves the same on both."
related:
  - /headless-cms-agency
  - /ongoing-website-support
  - /blog/saas-technical-seo
  - /blog/website-launch-checklist
  - /guides/webflow-vs-custom-code
sources:
  - label: "web.dev: Web Vitals (updated October 31, 2024)"
    url: https://web.dev/articles/vitals
    accessed: 2026-10-19
  - label: "web.dev: Largest Contentful Paint (updated September 4, 2025)"
    url: https://web.dev/articles/lcp
    accessed: 2026-10-19
  - label: "web.dev: Interaction to Next Paint (updated September 2, 2025)"
    url: https://web.dev/articles/inp
    accessed: 2026-10-19
  - label: "web.dev: Cumulative Layout Shift (updated April 12, 2023)"
    url: https://web.dev/articles/cls
    accessed: 2026-10-19
  - label: "web.dev: Interaction to Next Paint becomes a Core Web Vital on March 12 (updated January 31, 2024)"
    url: https://web.dev/blog/inp-cwv-march-12
    accessed: 2026-10-19
  - label: "web.dev: First Input Delay (updated October 6, 2024)"
    url: https://web.dev/articles/fid
    accessed: 2026-10-19
  - label: "Google Search Central: Understanding Core Web Vitals and Google search results (updated December 10, 2025)"
    url: https://developers.google.com/search/docs/appearance/core-web-vitals
    accessed: 2026-10-19
  - label: "web.dev: Optimize Largest Contentful Paint (updated March 31, 2025)"
    url: https://web.dev/articles/optimize-lcp
    accessed: 2026-10-19
  - label: "web.dev: Optimize Interaction to Next Paint (updated September 2, 2025)"
    url: https://web.dev/articles/optimize-inp
    accessed: 2026-10-19
  - label: "web.dev: Optimize long tasks (updated December 19, 2024)"
    url: https://web.dev/articles/optimize-long-tasks
    accessed: 2026-10-19
  - label: "web.dev: Optimize Cumulative Layout Shift (updated February 7, 2025)"
    url: https://web.dev/articles/optimize-cls
    accessed: 2026-10-19
  - label: "web.dev: Best practices for tags and tag managers (updated August 24, 2022)"
    url: https://web.dev/articles/tag-best-practices
    accessed: 2026-10-19
  - label: "web.dev: Keeping third-party scripts under control (updated April 22, 2021)"
    url: https://web.dev/articles/controlling-third-party-scripts
    accessed: 2026-10-19
  - label: "web.dev: Best practices for cookie notices (updated June 13, 2024)"
    url: https://web.dev/articles/cookie-notice-best-practices
    accessed: 2026-10-19
  - label: "web.dev: Best practices for using third-party embeds (updated October 5, 2021)"
    url: https://web.dev/articles/embed-best-practices
    accessed: 2026-10-19
  - label: "Chrome for Developers: What's new in Lighthouse 13 (October 10, 2025)"
    url: https://developer.chrome.com/blog/lighthouse-13-0
    accessed: 2026-10-19
  - label: "Chrome for Developers: Reduce the impact of third-party code (Lighthouse audit page)"
    url: https://developer.chrome.com/docs/lighthouse/performance/third-party-summary
    accessed: 2026-10-19
  - label: "Chrome for Developers: Lazy load third-party resources with facades (Lighthouse audit page)"
    url: https://developer.chrome.com/docs/lighthouse/performance/third-party-facades
    accessed: 2026-10-19
  - label: "Chrome for Developers: Performance features reference, Chrome DevTools (updated April 3, 2025)"
    url: https://developer.chrome.com/docs/devtools/performance/reference
    accessed: 2026-10-19
  - label: "Google for Developers: About PageSpeed Insights (updated October 21, 2024)"
    url: https://developers.google.com/speed/docs/insights/v5/about
    accessed: 2026-10-19
  - label: "Search Console Help: Core Web Vitals report"
    url: https://support.google.com/webmasters/answer/9205520?hl=en
    accessed: 2026-10-19
  - label: "GitHub: GoogleChrome/web-vitals-extension (README)"
    url: https://github.com/GoogleChrome/web-vitals-extension
    accessed: 2026-10-19
  - label: "Webflow Help: Custom code in head and body tags (updated September 2, 2026)"
    url: https://help.webflow.com/hc/en-us/articles/33961357265299-Custom-code-in-head-and-body-tags
    accessed: 2026-10-19
  - label: "Webflow Help: Image (updated May 19, 2025)"
    url: https://help.webflow.com/hc/en-us/articles/33961290329235-Image
    accessed: 2026-10-19
  - label: "Webflow updates: New images set to lazy load by default (August 27, 2020)"
    url: https://webflow.com/updates/new-images-set-to-lazy-load-by-default
    accessed: 2026-10-19
  - label: "Webflow Help: Image conversion tool (updated September 7, 2026)"
    url: https://help.webflow.com/hc/en-us/articles/33961311761939-Image-conversion-tool
    accessed: 2026-10-19
  - label: "Webflow Help: How do I optimize site speed in Webflow? (updated October 31, 2025)"
    url: https://help.webflow.com/hc/en-us/articles/33961401004819-How-do-I-optimize-site-speed-in-Webflow
    accessed: 2026-10-19
  - label: "Webflow blog: Google tag gateway, now on Webflow (updated September 17, 2026)"
    url: https://webflow.com/blog/integrating-google-tag-manager-with-google-analytics-in-webflow
    accessed: 2026-10-19
  - label: "Webflow: Website hosting"
    url: https://webflow.com/feature/hosting
    accessed: 2026-10-19
  - label: "Astro Docs: Islands architecture"
    url: https://docs.astro.build/en/concepts/islands/
    accessed: 2026-10-19
  - label: "Astro Docs: @astrojs/partytown"
    url: https://docs.astro.build/en/guides/integrations-guide/partytown/
    accessed: 2026-10-19
  - label: "Astro Docs: Images"
    url: https://docs.astro.build/en/guides/images/
    accessed: 2026-10-19
volatile:
  - "Core Web Vitals thresholds (good and poor), the 75th percentile rule, and the INP and FID dates (source: web.dev Web Vitals, LCP, INP, CLS and FID pages, and the March 12 blog post, read 2026-10-19); recheck for any new metric or threshold change"
  - "Google's statement on Core Web Vitals and Search (source: Search Central page, updated 2025-12-10); re-read on publish day"
  - "Lighthouse 13 (released 2025-10-10): the third-parties insight replaces the third-party summary audit, and the facades audit is removed; the Chrome DevTools labels 1st / 3rd party and Dim 3rd parties (reference updated 2025-04-03)"
  - "PageSpeed Insights and Search Console: the 28-day CrUX window, origin-level fallback, and how Search Console groups URLs (PageSpeed Insights page updated 2024-10-21; Search Console help read 2026-10-19)"
  - "The Web Vitals Chrome extension is end of life according to its README (read 2026-10-19); check whether Google revives or removes it"
  - "Webflow custom code: 50,000 characters per section and the plan requirements (source: Webflow Help, updated 2026-09-02)"
  - "Webflow images: Lazy, Eager, and Auto settings (help updated 2025-05-19), lazy loading by default for new images (update of 2020-08-27), and the image conversion tool limits of 100 assets per request and 10 requests per minute (help updated 2026-09-07)"
  - "Webflow Google tag gateway: the conditions for custom-code tags and the Webflow hosting requirement (blog post updated 2026-09-17), and Webflow's hosting description (AWS with Cloudflare CDN)"
  - "Astro: islands, client directives, @astrojs/partytown setup, and the Image component's behavior (Astro Docs, read 2026-10-19); check the current docs version"
  - "Google Tag Manager container limit of 300 KB, the 70% warning, and the roughly 50 KB median container (source: web.dev tag guide, updated 2022-08-24, so confirm the numbers are still current), plus the cookie notice guide (2024-06-13)"
  - "Live paths linked from this post: the headless CMS agency page, the website support page, the consent mode, launch checklist, and technical SEO posts, and the Webflow versus custom code guide (all live on 2026-10-19)"
volatileChecked: 2026-10-19
inbound:
  - "/ongoing-website-support: anchor 'Core Web Vitals monitoring'. One sentence where the page lists performance checks in the support plan."
  - "/blog/website-launch-checklist: anchor 'Core Web Vitals optimization'. One sentence in the performance checks before launch."
  - "/blog/is-webflow-good-for-seo: anchor 'Core Web Vitals on Webflow'. One sentence where the post covers speed and technical SEO on Webflow."
  - "/blog/saas-technical-seo: anchor 'third-party scripts and Core Web Vitals'. One sentence in the speed and crawl section."
  - "/blog/headless-cms-seo: anchor 'Core Web Vitals on Astro'. One sentence where the post covers page speed on a headless build."
editorNotes:
  - "The other account's draft was the starting point (H1, thresholds table, three per-metric causes, Webflow and Astro fixes, script register, seven rules). Every claim was reopened against the primary page on 2026-10-19. Corrected: the 50 millisecond long-task definition now comes from web.dev's long-tasks article, because the INP guide does not give it; 'lab tools can't measure INP' became Google's wording (some lab tools don't report INP, and Total Blocking Time may be a reasonable proxy but not a substitute); the 250 millisecond third-party line belongs to Lighthouse's older audit, which Lighthouse 13 replaced with an insight, so the post uses 250 ms only as our own ceiling and says so."
  - "Also corrected: the Webflow Google tag gateway line (Webflow's post covers measurement and cost per acquisition, not speed, and covers custom-code Google tags only after the tag ID moves to the native settings); the Webflow lazy-load advice (Webflow's help describes Lazy as loading above-the-fold images on page load, so the post says to test the hero image instead of claiming Webflow's default hurts LCP); and 'pages without enough traffic don't appear' (PageSpeed Insights falls back to origin data, and Search Console leaves such URLs out). Dropped: the claim that A/B tests hide the page, because no primary source was found. web.dev's advice to limit an A/B tag to the pages that run tests is kept."
  - "The Web Vitals Chrome extension's README says it has reached end of life, so the post says that instead of recommending it. Facades: Lighthouse removed its facades audit in version 13, but Google's embed guide still recommends the technique, and the post says both."
  - "Body runs above the 1,800-word guide spec, because the thresholds, the per-platform fixes, the script register, and the measurement record carry the terms and facts the content tool recommends for this keyword. It has eight body H2s, inside the five to eight spec. Every claim comes from Google, Chrome, Webflow, or Astro documentation, not from a vendor-published study, so decision 6 on citing outside research is not triggered."
  - "The topic bank asks for before and after measurements from the site itself, and none were available for this draft, so the measurement section teaches the method with an empty record and marker #P73-1 asks for one real record. The post stands without it (default: omit), but the angle is stronger with it. Google's tag guide is dated 2022-08-24 and the governance article 2021-04-22, so recheck the 300 KB container figures before relying on them."
  - "Markers resolved to their defaults on publish (lead 2026-10-19): #P73-3 kept as written; #P73-1 and #P73-2 removed."
---

Core Web Vitals optimization on a Webflow or Astro marketing site is mostly a third-party script problem: tag managers, chat widgets, and embeds add code the platform can't control. For B2B SaaS marketing leads, this guide covers how scripts hurt each metric, how to find them, how to fix them, and which rules keep them in check, because Google recommends good scores for Search.

## What are good Core Web Vitals scores?

Understanding Core Web Vitals starts with three metrics, each measuring a different part of what a visitor experiences. Largest Contentful Paint (LCP) measures loading performance: how quickly the largest piece of content in view appears. Interaction to Next Paint (INP) measures page responsiveness to user interactions, meaning user input such as clicks, taps, and key presses. Cumulative Layout Shift (CLS) measures visual stability: how much content moves unexpectedly. Google assesses each metric at the 75th percentile of page loads, segmented across mobile and desktop, so a page passes on a device type only when at least three in four visits meet the good threshold. Together, these Core Web Vitals metrics are the key metrics Google uses to describe the page experience of a web page.

Table: Core Web Vitals thresholds and the third-party scripts that most often affect them

| Metric | What it measures | Good | Poor | Third-party scripts that most often affect it |
| --- | --- | --- | --- | --- |
| Largest Contentful Paint (LCP) | Loading performance: how fast the main content appears | 2.5 s or less | Over 4 s | Synchronous scripts in the head, and tags that compete for bandwidth during the critical load |
| Interaction to Next Paint (INP) | Responsiveness to clicks, taps, and key presses | 200 ms or less | Over 500 ms | Long tasks from tag managers, embeds, and the scripts a consent button loads |
| Cumulative Layout Shift (CLS) | Visual stability: how much content jumps unexpectedly | 0.1 or less | Over 0.25 | Cookie banners, embeds, ads, and widgets injected late |

Anything between good and poor needs improvement. These are the Google Core Web Vitals thresholds as of October 2026, taken from web.dev and the Search Console help center. People often call all of this page speed, but page load speed is only the LCP part. INP and CLS cover the rest of the visit, and they are the two a lab test is most likely to miss.

INP replaced First Input Delay (FID) as a Core Web Vital on March 12, 2024. FID measured only the input delay of a visitor's first interaction, and 100 milliseconds or less counted as good. INP is a more comprehensive measure: it observes every interaction in the visit and covers the input delay, the time the event handlers take to run, and the time until the next frame is painted. Other performance metrics, such as time to first byte and Total Blocking Time, help you diagnose a problem, but they are not Core Web Vitals.

Why it matters: Google's Search documentation, updated December 10, 2025, says it highly recommends that site owners achieve good Core Web Vitals for success with Search, and that they align with what its core ranking systems seek to reward. For buyers the effect is more direct. A slow page, a laggy button, or a form that jumps while it loads is user frustration that rarely shows up in an analytics report, and it lands on the pages that sell. Core Web Vitals are the part of website user experience that Google measures from real visits, so treat a speed fix as a user experience project that may also help search engine rankings, not as a ranking tactic.

Two kinds of data are involved in web performance work, and they disagree more often than people expect. Field data is what real visitors experienced: PageSpeed Insights draws it from the Chrome User Experience Report (CrUX) over the previous 28 days, and that real-user data is what determines whether Core Web Vital scores pass or fail. Lab data is a Lighthouse run on one simulated device and network, which PageSpeed Insights says may not capture real-world bottlenecks. Some lab tools don't report INP at all, because they only watch the page load. Google says Total Blocking Time may be a reasonable proxy for INP but is not a substitute, so a page can look fine in a lab test and still fail INP in the field.

## How do third-party scripts hurt website performance and Core Web Vitals?

Optimizing Core Web Vitals on a marketing site starts with knowing how each metric breaks, because one script can break more than one.

- **LCP.** Synchronous scripts in the head are render-blocking resources: the browser can't finish drawing the page until they download and run. Google's LCP guide says it is almost never necessary to add synchronous scripts, and that putting them in the head will almost always hurt performance. Tags also compete for bandwidth while the page fetches its most important files. Google's tag guide says LCP is vulnerable to that contention during the critical page load, and that blocking the main thread can delay the LCP render.

- **INP.** JavaScript execution happens on the main thread, one task at a time, and the browser can't respond to a tap or a click while a task runs. Google's long-tasks guide defines any task over 50 milliseconds as a long task. Third-party code adds to the queue: Google reports seeing a correlation between the size of tag managers and poorer INP scores, and its cookie notice guide says clicking Accept often causes a high INP because it adds many third-party scripts at once. That is JavaScript execution time your own code has to wait behind.

- **CLS.** Ads, embeds, iframes, and other dynamic content push what sits below them down the web page. Google's cookie notice guide calls cookie notices a very common source of layout shifts, and its tag guide says tags can affect CLS by injecting content or by delaying critical resources before the first render. Unexpected layout shifts make visitors lose their place or tap the wrong thing, and the fix is to reserve space for late content with a fixed-size placeholder, so the page layout doesn't move when it arrives and the page stays visually stable.

None of this depends much on the platform. Webflow describes its hosting as AWS infrastructure with Cloudflare's global CDN, and Astro builds static pages that any content delivery network can serve. A heavy script added later behaves the same on either, and WordPress sites hit the same wall, often through plugins that add their own scripts. For the wider technical picture, see our post on [technical SEO for SaaS sites](/blog/saas-technical-seo).

## How do you find which scripts are the problem?

Start with field data, then use lab tools to identify performance issues and their cause. The steps run from broad to narrow, and page performance varies by template, so begin with the pages that carry demo requests and forms.

1. **Check the field data.** Look up your site's Core Web Vitals in PageSpeed Insights first. It shows real-user data from CrUX for the previous 28-day collection period, at the 75th percentile. When a page lacks enough samples it falls back to origin-level data, and when the origin lacks them too it shows none. The Core Web Vitals report in Google Search Console also uses CrUX data from the last 28 days. It groups URLs with a similar experience, gives each group the status of its worst metric, and keeps mobile and desktop apart; URLs without enough LCP and CLS data are left out. On a B2B site with modest traffic, some key pages will have no field data at all. web.dev recommends real user monitoring where possible, because CrUX lacks the per-pageview detail a monitoring tool captures.

2. **Look at the page locally.** The Web Vitals Chrome extension used to be the quick local check. Its README now says it has reached end of life, and it points to the DevTools Performance panel instead.

3. **Profile a key page.** In Chrome DevTools, record a page load in the Performance panel. For a selected time range, the Summary tab shows a 1st / 3rd party table with the transfer size and main-thread time of your own code, each detected third party, and extensions, which is a good stand-in for JavaScript execution time by vendor. The Dim 3rd parties checkbox grays out third-party events so yours stand out.

4. **Run Lighthouse.** PageSpeed Insights runs it for you and lists diagnostics with suggested fixes. Lighthouse 13, released October 10, 2025, replaced the older third-party summary audit with a third-parties insight, and it removed the third-party facades audit without a replacement. The older audit failed a page when third-party code blocked the main thread for 250 milliseconds or more. We borrow that number for the ceiling rule below. It is our own governance number, not a Google threshold for Core Web Vitals.

5. **Test one change at a time.** Remove or defer one script, then compare. Lab results show up at once, while field data needs up to 28 days to fully reflect the change, because CrUX covers that window.

A tag manager container usually loads on multiple pages, so one change can move many templates at once. That is a reason to record each change before it ships, which the next section covers.

## How do you prove a script change worked?

A fix you can't measure is a guess, and field data moves slowly. Keep one record per change, fill in the baseline before the change ships, and complete the last rows 28 days later, once the CrUX window has rolled over. Pair the field numbers with a lab number you can read the same day, such as third-party main-thread time from the Performance panel, and add a business check, because user engagement is the reason to care about speed at all. A chat widget replaced by a facade is only a win if the conversations and demo requests it produced hold steady.

Table: A before-and-after record for one script change

| Field | What to write down |
| --- | --- |
| Page and template | One page, such as the pricing page, with desktop and mobile recorded separately |
| Script changed | For example, a chat widget replaced with a facade |
| Baseline, field | LCP, INP, and CLS at the 75th percentile for the last 28 days |
| Baseline, lab | Third-party transfer size and main-thread time from the Performance panel |
| Date of change | The day it shipped, so the 28 days can be counted from it |
| Result after 28 days | The same field metrics, read from the same tool |
| Business check | Demo requests, chats started, or form completions on the same pages |

If a page has too little traffic for field data, record the lab numbers and the origin-level field data, and say so in the record. The same record works as proof for a stakeholder: it shows what changed, when, and what moved, so the next script request starts from evidence instead of opinion. Add a speed check to your pre-launch list too, as in our [website launch checklist](/blog/website-launch-checklist).

## How do you fix third-party scripts on Webflow?

Webflow gives you control over where code loads and how images behave, but not over what a vendor's script does once it runs.

- **Load scripts at the end of the page.** In Site settings, Custom code, Head code goes before the closing head tag and Footer code goes before the closing body tag, and page-level code lives in Page settings. Webflow says code before the closing body tag lets content load before the JavaScript is processed, and it recommends async or defer for external scripts that must sit in the head. Each section holds up to 50,000 characters, so host longer code elsewhere and reference it. Custom code needs a Core, Growth, Agency, or Freelancer Workspace, or a site with an active Site plan.

- **Check the hero image's loading setting.** The Image settings offer Lazy, Eager, and Auto. Webflow has set all new images to lazy load by default since August 27, 2020, and you can override that per image. Google's guidance is to never lazy-load the LCP image. Webflow's help text describes Lazy as loading above-the-fold images when the page loads, so test instead of assuming: set the hero image to Eager, then confirm in PageSpeed Insights that the LCP element loads early.

- **Convert images.** Webflow's image conversion tool turns existing JPEG and PNG assets into WebP or AVIF. It replaces the originals and can't convert back, so download them or keep a site backup first. Webflow lists limits of 100 assets per request and 10 requests per minute, and it says AVIF isn't widely supported for Open Graph images, so use WebP for those.

- **Audit integrations.** Webflow's site speed guide says to update, replace, or remove third-party integrations that slow the site, and to use interactions sparingly, reusing one interaction across elements where the structure allows.

- **Treat the Google tag gateway as measurement, not speed.** Webflow's blog post describes it as routing conversion data through first-party infrastructure, and it lists benefits for measurement and acquisition cost, not for page speed. A Google tag added through custom code is covered only after you move its tag ID into Webflow's native Google tag settings, and the automated gateway runs only on Webflow hosting.

## How do you fix third-party scripts on Astro?

Astro starts from a better place. It renders every UI component to HTML and CSS and strips out client-side JavaScript automatically, and a component becomes interactive only when you add a client directive. Its docs describe JavaScript as one of the slowest assets you can load per byte, so by default Astro avoids unnecessary JavaScript. Scripts added on top are where the budget goes.

- **Hydrate late.** The client:idle directive loads a component when the browser is idle, and client:visible loads it once it enters the viewport. Use them for interactive islands such as a pricing calculator or a chat launcher, instead of loading everything at once with client:load.

- **Move heavy scripts off the main thread.** The @astrojs/partytown integration relocates resource-intensive scripts, such as third-party analytics or ads, into web workers. Mark a script with type="text/partytown", and forward the calls it needs through the config, for example dataLayer.push, as Astro's docs show. Install it with npx astro add partytown. Astro's page lists no compatibility warnings, so test that every event still arrives after the move.

- **Use the Image component.** For local images it infers the dimensions and sets the correct width and height, which Astro's docs say optimizes for CLS. For remote images, supply the width and height yourself. The component's output in Astro's examples includes loading="lazy" and decoding="async", so check what your hero image renders and set loading="eager" on it.

- **Serve from a CDN.** Astro builds static pages that any CDN can serve, and whether yours does depends on where the site is hosted. If you are weighing the two platforms, see our guide to [Webflow vs custom code](/guides/webflow-vs-custom-code).

Table: The same problems and where to fix them on Webflow and on Astro

| Problem | On Webflow | On Astro |
| --- | --- | --- |
| A script blocks rendering | Move it to Footer code, or add async or defer if it must stay in the head | Load it behind a late client directive, or run it in a web worker with Partytown |
| A heavy analytics or ad script keeps the main thread busy | Remove or replace the integration, and keep tags in one managed container | Move it into a web worker with Partytown and forward the calls it needs |
| The hero image is lazy-loaded | Set the image to Eager and check the LCP element in PageSpeed Insights | Check the rendered loading attribute and set it to eager |
| An interactive widget loads too early | Load its script from footer code, or behind a facade | Use client:idle or client:visible |
| Pages reach visitors slowly | Hosting includes a global CDN | Pick a host or CDN, and check its cache settings |

## What else affects Core Web Vitals performance besides scripts?

Images, fonts, and how pages are served. Unlike vendor scripts, these are fully in the site team's hands, and they decide a lot of your site's performance before any tag loads. To improve Core Web Vitals without touching a vendor, start here.

- **Images and video.** Always include width and height attributes to let the browser allocate space before the file loads, or use the CSS aspect-ratio property. Serve web friendly formats such as AVIF or WebP, resize large images to the size they're displayed at, and never lazy-load the LCP image. Webflow's guide calls large images the most common reason for slow loading times. The LCP element can also be a video poster, a block of text, or an element with a background image loaded through the CSS url() function, so check what your LCP element actually is.

- **Fonts.** Both a flash of unstyled text and a flash of invisible text can shift the layout when the web font arrives. Google suggests font-display: optional, a fallback font adjusted with size-adjust so it matches the web font's size, and a preload for the critical fonts.

- **Preloading and priority.** Preload critical resources, above all the hero image when only CSS or JavaScript references it, and set fetchpriority="high" on the image most likely to be the LCP element. Google warns that setting it on more than one or two images makes the hint unhelpful.

- **Serving.** Slow server response times delay everything after them, including LCP. Google says a high time to first byte can make a 2.5-second LCP challenging or even impossible, and that a content delivery network is the best way to cut the distance resources travel. Its LCP guide gives a rough split for a good result: about 40% time to first byte, under 10% resource load delay, about 40% resource load duration, and under 10% element render delay. Turn on browser caching with long cache lifetimes for static files too, so returning visitors skip the download. On Astro that is a host or CDN setting.

- **Motion.** Animate with transform instead of properties such as top, left, or box-shadow, which trigger layout. If you build Webflow interactions or Astro animations, check how the movement is done.

## What rules keep marketing scripts in check?

A script register with an owner for every line, and a few loading rules that apply to every tag. Digital marketing teams add tags faster than anyone removes them, so the optimization efforts in this guide decay unless someone owns the list. web.dev's article on third-party scripts asks five questions of each tag: is it compliant, is it required, who owns it, what is its purpose, and when is it reviewed. The register turns those questions into columns.

Table: An example third-party script register

| Script | Owner | Purpose | Pages | Loads | Review |
| --- | --- | --- | --- | --- | --- |
| Tag manager container | Marketing ops | Analytics and ad tags | All | Head, async | Quarterly |
| Chat widget | Sales | Live chat on high-intent pages | Pricing, demo | Facade, on click | Quarterly |
| A/B testing | Growth | One test at a time | Test pages only | During tests only | After each test |
| Video embed | Content | Product demos | Product pages | Facade, on click | Quarterly |

The rows are an example, not a recommendation of any vendor. web.dev suggests limiting an A/B testing tag to the page types that run tests, and loading it only while a test is live, which is what the register's A/B row encodes. The loading rules below come mostly from Google's own guidance.

1. **Fire non-essential tags after Window Loaded.** Google's tag guide says this avoids affecting page load, so these tags stay out of the initial load.

2. **Pause or remove unused tags.** Google says pausing or removing a tag takes its code out of the container, while blocking it does not. A paused tag still adds to the container's size, though less than an active one.

3. **Prefer custom templates to Custom HTML.** Templates run in a sandboxed version of JavaScript with restricted APIs, and Google says these tags are much less likely to cause performance or security issues.

4. **Watch the container size.** Google Tag Manager limits containers to 300 KB, and Google says it warns once a container reaches 70% of that limit. The same guide puts the median container at about 50 KB.

5. **Load the cookie banner directly in the page.** Google's tag guide and its cookie notice guide both advise against loading cookie notices through a tag manager, because it delays resources with an immediate visual effect and hides the script from the browser's lookahead parser. Your consent platform's own setup guide may require the tag manager. If it does, measure what that costs instead of assuming. Our post on [consent mode v2 in Webflow](/blog/consent-mode-v2-webflow) covers how the banner and the tags fit together.

6. **Use facades for chat and video.** A facade is a static element that looks like the embed and loads the real one on click. Google's Lighthouse example replaces a YouTube player of about 540 KB with a facade of about 3 KB. Lighthouse removed its facades audit in version 13, but Google's embed guide still recommends facades and lazy loading, and the same pattern works for a chat widget: show a static launcher, and load the chat code when someone clicks it. Check whether your chat vendor documents a way to load late.

7. **Set a ceiling.** No new script ships if it pushes a key page past the good thresholds, or adds 250 milliseconds or more of main-thread blocking.

Run the register review as part of a monthly or quarterly routine, such as the one in our [website support service](/ongoing-website-support).

We build Webflow and Astro sites for B2B SaaS companies, so we have an interest in this topic. For how speed budgets fit into a headless build, see our [headless CMS agency](/headless-cms-agency) page.
