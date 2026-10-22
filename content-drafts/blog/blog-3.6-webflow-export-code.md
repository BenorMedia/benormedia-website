---
slug: webflow-export-code
url: /blog/webflow-export-code
pageType: guide
draft: false
blockedBy: []
topicId: "3.6"
wave: 3
title: "Webflow Code Export: What Breaks When You Leave | BenorMedia"
description: "What Webflow's code export includes, what stops working when a site leaves Webflow, and how to replace forms, site search, and CMS content before launch."
h1: "Webflow export code: what happens to forms, search, and CMS content when a site leaves Webflow"
lang: en-US
author: "David Garay, Webflow Developer and UX/UI Designer"
publishedAt: 2026-10-22
updatedAt: 2026-10-22
reviewEvery: 90 days
primaryKeyword: "webflow export code"
secondaryKeywords: []
takeaways:
  - "Webflow's code export gives you static HTML, CSS, JavaScript, and images, not a working copy of your site."
  - "CMS content, forms, site search, password protection, user accounts, ecommerce, code components, and non-primary locales stay behind and need a replacement."
  - "Export each CMS Collection as a CSV and download every image and file first, because file fields point to files hosted on the Webflow project."
  - "Password-protected pages become public in an export, so remove or rebuild them before the exported site goes live."
  - "Export your 301 redirects and old form submissions before you cancel anything, and keep the Webflow project until the new site has settled."
faqHeading: "Questions about exporting a Webflow site"
faq:
  - q: "Which Webflow plan do I need to export code?"
    a: "Code export is available on Webflow Workspace plans. Site plans alone cannot export code, as of October 2026."
  - q: "Does Webflow's code export include CMS content?"
    a: "No. Collection lists show their empty state and Collection template pages export without content. You export each Collection separately as a CSV file."
  - q: "Do Webflow forms work after export?"
    a: "No. Form processing, file upload, and reCAPTCHA do not work outside Webflow hosting. You need a form backend, a serverless function that posts to your CRM, or your CRM's own embedded forms."
  - q: "Do Webflow interactions work after export?"
    a: "Yes, in most cases. The export includes the JavaScript files that run interactions, navbars, sliders, and tabs. Deleting or editing those files can break them."
  - q: "Can I host an exported Webflow site anywhere?"
    a: "Yes. Webflow says an exported site needs no Webflow plan and no attribution to run on your own server or static host."
related:
  - /guides/webflow-vs-custom-code
  - /headless-cms-agency
  - /custom-websites-migrations
sources:
  - label: "Webflow Help Center: How do I export my Webflow site code?"
    url: https://help.webflow.com/hc/en-us/articles/33961386739347
    accessed: 2026-10-22
  - label: "Webflow: Export CMS content as a CSV"
    url: https://webflow.com/feature/export-content-as-a-csv
    accessed: 2026-10-22
  - label: "Webflow Help Center: Import/export 301 redirects"
    url: https://help.webflow.com/hc/en-us/articles/33961211526291
    accessed: 2026-10-22
volatile:
  - "Code export is limited to Workspace plans (source: Webflow Help Center, code export article)"
  - "The list of features excluded from code export (source: Webflow Help Center, code export article)"
volatileChecked: 2026-10-22
inbound:
  - page: /guides/webflow-vs-custom-code
    anchor: "what breaks when a site leaves Webflow"
    sentence: "In the section on what you give up, link to the post for the full exit checklist."
  - page: /headless-cms-agency
    anchor: "moving a site off Webflow"
    sentence: "Link from the migration paragraph to the post as a practical checklist."
editorNotes:
  - "The live guide /guides/webflow-vs-custom-code already lists the exclusions in two lines. This post goes deeper on replacements and the exit order; it does not repeat the decision to leave."
  - "Target query intent is mostly 'how do I export'. The post answers that in the first section, then covers what the SERP pages treat briefly."
  - "Published 2026-10-22 (lead), author David Garay: #P36-1 removed at its default; #P36-2 and #P36-3 replaced by their default sentences."
---

Webflow's code export gives you the static HTML, CSS, JavaScript, and images of your site, but not a working copy of it: CMS content, forms, site search, and several other features stay behind. This guide is for marketing leads and founders planning to move a B2B site off Webflow hosting, and it reflects Webflow's documentation as of October 2026.

We build sites both on Webflow and on headless stacks such as Astro, so we have an interest in this topic either way.

## What do you get when you export Webflow code?

Code export produces a ZIP file of the static front end of your Webflow site. It is a static export of your site files: a snapshot of the design and layout, not the platform behind it.

To export your Webflow code, open the site, go to Main menu > Code export (or press Shift + E), click Prepare ZIP, and download the file. Code export is only available on paid Workspace plans; site plans cannot export code. You cannot export a single page: every export package includes everything that can be exported.

Table: What is inside a Webflow code export ZIP file

| Folder or file | What it holds |
| --- | --- |
| CSS folder | Three CSS files: your custom styles, webflow.css (base layout and components), and normalize.css |
| JS folder | JavaScript files for forms, navbars, sliders, tabs, and Webflow interactions |
| Images folder | Images from the Assets panel |
| HTML files | One per static page, plus empty Collection template pages |

You can also minify the site's HTML in the export window, which strips whitespace and comments to help pages load faster. The exported files run on any static host or your own servers, and Webflow says there is no attribution required and no Webflow plan needed once the code is exported.

## What does the export leave out?

The export leaves out the dynamic features that depend on Webflow hosting or the Webflow database, such as CMS functionality, ecommerce functionality, and user accounts. That is most of what a B2B marketing site uses every week.

Table: Features missing from an exported Webflow site and what replaces them

| Feature | In the export? | What happens | Typical replacement |
| --- | --- | --- | --- |
| CMS content | No | Collection lists show empty states; Collection pages show no content | A headless CMS or Markdown files, rendered at build time |
| Forms | Markup only | Submissions are not processed; file upload and reCAPTCHA stop working | A form backend, a serverless function, or CRM embedded forms |
| Site search | No | The search page stops working | A hosted search service or a static search index |
| Password protection | No | Protected pages become publicly accessible | Host-level access control, or remove the pages |
| User accounts | No | Users and access groups are gone | A separate authentication service |
| Ecommerce | No | Products, checkout, and other ecommerce content are gone | A commerce platform |
| Localized pages | Primary locale only | Localized content in other locales is missing | Rebuild locales in the new CMS |
| Code components | No | Components built with code do not export | Rebuild them in your framework |
| 301 redirects | No | Old URLs stop redirecting | Recreate the rules on the new host |

Two of these catch teams out. First, password protected pages become public after export, so a gated pricing sheet or a client preview page is suddenly open. Second, redirects live in Webflow's site settings, not in the exported files. Plan to regenerate your sitemap and robots.txt on the new host.

## How do you get CMS content out of Webflow?

You export each CMS Collection as a CSV file from the Designer, one Collection at a time. The code export and the CSV export are separate steps, and you need both.

The CSV export has a trap. Image and file fields export as links to files hosted on the original Webflow project, and Webflow says those links will permanently break if the project is deleted. Images inside rich text fields export as HTML with the same kind of links. So the order matters:

1. Export every Collection as CSV, including localized collection content if you use it. Webflow can also export Ecommerce Collections and User Accounts as CSV files.
2. Download every image and file the CSVs link to, and every image inside rich text.
3. Rewrite the links to point at the new location before import.
4. Keep the Webflow project until the new site is live and checked.

Reference and multi-reference fields need a mapping step too. Check how reference fields appear in your CSV before you map them to the new CMS. If you have many Collections or want to automate the move, the Webflow Data API can read Collection items in code instead of through CSV files.

Some teams crawl the published site instead, saving every CMS page as static HTML. That keeps the pages but freezes them: there is no CMS behind them, so every later edit means editing HTML by hand.

Your Collection template pages also need rebuilding. In the exported code they are empty shells, so the new site has to generate one page per item from the CMS data, usually at build time with a static site generator or a headless CMS.

## What replaces Webflow forms after export?

Exported forms keep their markup but stop sending submissions, because form processing is not part of the export. Webflow says forms, file upload, reCAPTCHA, and site search are disabled on exported sites to comply with GDPR. You need a new form service before the exported site goes live.

There are three common patterns:

- **CRM embedded forms.** HubSpot, Salesforce, and most marketing automation tools offer their own form embeds. They write straight to the CRM, but you give up some design control.
- **A form backend service.** You keep your Webflow form element and point its action at a third-party endpoint. This is the fastest swap for simple contact forms.
- **A serverless function.** An API route on your new host receives the form and posts it to your CRM. It gives the most control over fields, spam filtering, and routing.

Before you switch, export your existing form submissions from Webflow, since they do not travel with the code. Then test every form on staging: a normal submission, a missing required field, a file upload if you use one, and a spam attempt. Check that each test lands in the CRM with its source fields intact. Webflow's reCAPTCHA no longer works in the exported site, so the new form service needs its own spam protection.

## What replaces Webflow site search?

Site search does not work on an exported site. If your blog or resource library depends on it, choose a replacement before launch.

For a marketing site with a few hundred pages, a static search index generated at build time is usually enough: it ships with the site and needs no server. Larger sites, or sites that need typo tolerance and filters, usually use a hosted search service. Either way, the search results page and the search field in the navigation need rebuilding, not just the search logic.

## What else changes when you leave Webflow hosting?

The rest of the move is hosting work that Webflow did quietly for you. Most of it is small, but each item can break SEO or analytics if it is missed.

- **Interactions.** Webflow interactions work after export, because their scripts are in the JS folder. Keep those files; deleting or editing them can break navbars, sliders, and tabs.
- **URLs.** Exported pages end in .html. To keep your existing URLs without the extension, configure the new host to serve clean URLs, for example with an .htaccess file on Apache.
- **Lottie animations.** Lottie JSON files need a web server and will not load from local files, so test them on staging, not on your laptop.
- **Custom code.** Check that scripts added in Webflow's custom code settings made it into the exported HTML, and test tag managers, consent banners, and analytics on every template.
- **SSL, headers, and caching.** These were Webflow's job. On the new host they are yours, along with security updates.

## What order should you run the exit in?

Run the exit in an order that never leaves you without a copy of something. The checklist below is the order we would use.

1. Inventory the site: pages, Collections, forms, search, gated pages, locales, and custom code.
2. Export your 301 redirects as CSV from Site settings > Publishing > 301 redirects.
3. Export every CMS Collection as CSV and download all linked images and files.
4. Export past form submissions.
5. Run the code export and set up the new host.
6. Rebuild CMS templates, forms, search, and any gated pages.
7. Keep every URL the same where you can, and add redirects where you cannot.
8. Test on staging: forms, search, redirects, analytics, consent, and page speed.
9. Switch DNS, then watch Search Console for crawl errors in the following weeks.
10. Keep the Webflow project, unpublished, until the new site has settled.

## Should you export at all, or take a middle path?

Export makes sense when you have a developer or a team to own hosting, forms, search, and the CMS from now on. If nobody will own that work, keeping the Webflow website on Webflow hosting is usually cheaper.

There are middle paths. You can keep Webflow as the CMS and build the front end elsewhere through the Data API, or add code components and keep Webflow hosting. Our guide on [Webflow vs custom code](/guides/webflow-vs-custom-code) covers when each option fits. If you are moving to a headless stack, our [headless CMS agency](/headless-cms-agency) page explains how we plan those builds, and [custom websites and migrations](/custom-websites-migrations) covers the migration work itself.
