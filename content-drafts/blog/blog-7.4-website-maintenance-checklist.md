---
slug: website-maintenance-checklist
url: /blog/website-maintenance-checklist
pageType: guide
draft: false
blockedBy: []
topicId: "7.4"
wave: 2
title: "Website Maintenance Checklist for B2B SaaS | BenorMedia"
description: "Website maintenance checklist for B2B SaaS: what to check monthly, quarterly, and yearly, who owns each task, and what changes on headless and WordPress sites."
h1: "Website maintenance checklist for a B2B SaaS site: monthly, quarterly, and yearly"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-19
updatedAt: 2026-10-19
reviewEvery: 30 days
primaryKeyword: "website maintenance checklist"
secondaryKeywords: []
takeaways:
  - "Run website maintenance in three rhythms: monthly checks for breakage, quarterly reviews of scripts, access, and redirects, and a yearly audit of renewals, accessibility, and content."
  - "Test forms by submitting them and finding the record in the CRM, because Search Console can't tell you that a form stopped reaching sales."
  - "Google suggests checking Search Console about once a month, or when your content changes, and says indexed URLs that start returning a 4xx status are removed from the index."
  - "Give every row of the checklist one named owner, and keep a release log so a dip in the data has an explanation a year later."
  - "A headless Astro and Sanity site adds software upkeep: Node.js on a supported LTS release, dependency audits, an explicit Sanity API version, and content backups you schedule yourself."
faqHeading: "Questions about website maintenance"
faq:
  - q: "What is a website maintenance checklist?"
    a: "A repeatable list of the checks that keep a site working, grouped by how often you run them. For a B2B SaaS marketing site, that means monthly checks for breakage, quarterly reviews of scripts, access, and redirects, and a yearly audit of renewals, accessibility, and content."
  - q: "How often should you do website maintenance?"
    a: "Run the core checks monthly, review scripts, access, and redirects each quarter, and audit renewals, accessibility, and content every year. Google suggests checking Search Console about once a month, or when you change the site's content, and a launch or a migration should trigger a check of its own."
  - q: "What are the essential tasks in website maintenance?"
    a: "Test forms and key events, watch indexing and page speed, fix broken links and 4xx errors, review who has access, keep software, domains, and certificates current, and keep backups you have tested by restoring one."
  - q: "Who should be responsible for website maintenance?"
    a: "One named person per task, with a backup. Marketing operations typically owns forms, CRM routing, and tags, an SEO lead or developer owns Search Console, redirects, and sitemaps, IT or security owns access, domains, and certificates, and a content lead owns accessibility and content."
  - q: "Does a Webflow site still need maintenance?"
    a: "Yes. Webflow renews its hosted certificates while your DNS points at Webflow, but forms, scripts, user access, redirects, content, plan limits, and any custom certificate remain your job."
  - q: "How do you test a website backup?"
    a: "Restore a recent backup to a test environment, then open the key pages and submit each main form. CISA recommends scheduled recovery tests to verify backup integrity, and a backup you have never restored is unproven."
related:
  - /ongoing-website-support
  - /blog/website-launch-checklist
  - /blog/consent-mode-v2-webflow
  - /blog/webflow-accessibility-checklist
  - /blog/ai-crawlers-robots-txt
sources:
  - label: "Google Search Central: Get started with Search Console"
    url: https://developers.google.com/search/docs/beginner/search-console
    accessed: 2026-10-19
  - label: "Search Console Help: Annotations"
    url: https://support.google.com/webmasters/answer/16530728
    accessed: 2026-10-19
  - label: "Search Console Help: HTTPS report"
    url: https://support.google.com/webmasters/answer/11396518
    accessed: 2026-10-19
  - label: "Search Console Help: Core Web Vitals report"
    url: https://support.google.com/webmasters/answer/9205520
    accessed: 2026-10-19
  - label: "Search Console Help: robots.txt report"
    url: https://support.google.com/webmasters/answer/6062598
    accessed: 2026-10-19
  - label: "web.dev: Web Vitals"
    url: https://web.dev/articles/vitals
    accessed: 2026-10-19
  - label: "Google PageSpeed Insights: About"
    url: https://developers.google.com/speed/docs/insights/v5/about
    accessed: 2026-10-19
  - label: "Google Search Central: HTTP status codes, network, and DNS errors"
    url: https://developers.google.com/search/docs/crawling-indexing/http-network-errors
    accessed: 2026-10-19
  - label: "Google Search Central: Site moves with URL changes"
    url: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
    accessed: 2026-10-19
  - label: "Google Search Central: Build and submit a sitemap"
    url: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
    accessed: 2026-10-19
  - label: "Google Search Central: Google's common crawlers"
    url: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
    accessed: 2026-10-19
  - label: "Analytics Help: Data retention"
    url: https://support.google.com/analytics/answer/7667196
    accessed: 2026-10-19
  - label: "Analytics Help: Annotations"
    url: https://support.google.com/analytics/answer/15884203
    accessed: 2026-10-19
  - label: "Webflow Help Center: Save and restore backups"
    url: https://help.webflow.com/hc/en-us/articles/33961244069395
    accessed: 2026-10-19
  - label: "Webflow Help Center: SSL hosting"
    url: https://help.webflow.com/hc/en-us/articles/33961362849811-SSL-hosting
    accessed: 2026-10-19
  - label: "Webflow Help Center: Keep your Webflow account secure"
    url: https://help.webflow.com/hc/en-us/articles/33961231453587
    accessed: 2026-10-19
  - label: "Webflow: Pricing"
    url: https://webflow.com/pricing
    accessed: 2026-10-19
  - label: "OWASP Cheat Sheet Series: Third Party JavaScript Management"
    url: https://cheatsheetseries.owasp.org/cheatsheets/Third_Party_Javascript_Management_Cheat_Sheet.html
    accessed: 2026-10-19
  - label: "CISA: More than a password (multifactor authentication)"
    url: https://www.cisa.gov/MFA
    accessed: 2026-10-19
  - label: "CISA: Back Up Business Data"
    url: https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/back-up-business-data
    accessed: 2026-10-19
  - label: "UK ICO: How do we comply with the PECR rules? (storage and access technologies)"
    url: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/how-do-we-comply-with-the-pecr-rules/
    accessed: 2026-10-19
  - label: "ICANN: Expired Registration Recovery Policy (February 21, 2024)"
    url: https://www.icann.org/en/contracted-parties/consensus-policies/expired-registration-recovery-policy/expired-registration-recovery-policy-21-02-2024-en
    accessed: 2026-10-19
  - label: "W3C WAI: Selecting Web Accessibility Evaluation Tools"
    url: https://www.w3.org/WAI/test-evaluate/tools/selecting/
    accessed: 2026-10-19
  - label: "Node.js: Releases"
    url: https://nodejs.org/about/releases/
    accessed: 2026-10-19
  - label: "Astro Docs: Upgrade Astro"
    url: https://docs.astro.build/en/upgrade-astro/
    accessed: 2026-10-19
  - label: "npm Docs: npm audit"
    url: https://docs.npmjs.com/cli/v10/commands/npm-audit
    accessed: 2026-10-19
  - label: "Sanity Docs: API versioning"
    url: https://www.sanity.io/docs/content-lake/api-versioning
    accessed: 2026-10-19
  - label: "Sanity Docs: Backups"
    url: https://www.sanity.io/docs/content-lake/backups
    accessed: 2026-10-19
  - label: "Vercel Docs: Environments"
    url: https://vercel.com/docs/deployments/environments
    accessed: 2026-10-19
  - label: "WordPress Developer Resources: Upgrading WordPress"
    url: https://developer.wordpress.org/advanced-administration/upgrade/upgrading/
    accessed: 2026-10-19
  - label: "WordPress Developer Resources: Hardening WordPress"
    url: https://developer.wordpress.org/advanced-administration/security/hardening/
    accessed: 2026-10-19
  - label: "WordPress.org: UpdraftPlus plugin page"
    url: https://wordpress.org/plugins/updraftplus/
    accessed: 2026-10-19
volatile:
  - "Webflow plan names and limits: Starter 50 form submissions per site and 50 CMS items, Premium 20,000 CMS items (source: Webflow pricing page, where the plan cards say Premium and the feature table says Premier)"
  - "Webflow backups, hosted certificate renewal, custom certificates, and CAA requirements (source: Webflow Help Center articles)"
  - "Webflow two-factor authentication on all Workspace plans and single sign-on on Enterprise Workspace plans (source: Webflow Help Center)"
  - "Search Console guidance on check frequency, the annotations limits, and the HTTPS, Core Web Vitals, and robots.txt reports (source: Search Console Help and Google Search Central)"
  - "Google guidance on 4xx handling, redirects for site moves, sitemap lastmod, and Google-Extended (source: Google Search Central)"
  - "GA4 data retention options and annotation limits (source: Analytics Help)"
  - "Core Web Vitals thresholds, the 75th percentile rule, and the 28-day field data window (source: web.dev and PageSpeed Insights documentation)"
  - "Node.js LTS policy and the annual release cycle from Node.js 27 (source: nodejs.org releases page)"
  - "Astro's support policy for security fixes, and Sanity's API versioning and backup availability (source: Astro and Sanity documentation)"
  - "WordPress default update behavior for core, plugins, and themes (source: WordPress Developer Resources)"
  - "ICANN reminder-notice timing (source: Expired Registration Recovery Policy, February 21, 2024 version)"
volatileChecked: 2026-10-19
inbound:
  - "/ongoing-website-support: anchor 'website maintenance checklist'. One sentence in the section that lists what a support plan covers."
  - "/blog/website-launch-checklist: anchor 'website maintenance checklist'. One sentence in the post-launch section that says what to check after day one."
  - "/blog/consent-mode-v2-webflow: anchor 'quarterly consent and cookie review'. One sentence after the testing steps."
  - "/blog/webflow-accessibility-checklist: anchor 'yearly accessibility re-test'. One sentence where the post says to retest after changes."
editorNotes:
  - "The other account's draft was the starting point. Every figure and claim was reopened against the original page on 2026-10-19, and four items changed: the Bing quote was dropped because the sentence could not be found in the Bing post we could open, the ICANN reminder goes to the registered name holder (the policy names no email address), the 100 GB form-upload storage figure was dropped because it could not be verified, and the Webflow plan figures now come from the pricing page, which labels the top plan Premium in the cards and Premier in the feature table."
  - "Markers #P74-1 and #P74-2 ask for one real example from your own team. #P74-3 asks for a last look at Webflow's plan limits on the day you publish, because plan names and limits changed recently. The post reads fine without the first two."
  - "No vendor-published study is cited. Sources are official documentation from Google, Webflow, Sanity, Astro, Node.js, WordPress, Vercel, npm, CISA, ICANN, the UK ICO, OWASP, and the W3C, so there is no decision-6 dependency."
  - "The WordPress and backup sections were added to cover what searchers expect from a maintenance checklist. Both stay neutral about platforms and link to the WordPress migration guide once."
  - "Body runs well above the 1,800-word guide spec because of five tables and the extra sections needed to cover the terms and facts that the content tool recommends for this keyword. The hand-off explains."
  - "Markers resolved to their defaults on publish (lead 2026-10-19): #P74-3 kept as written; #P74-1 and #P74-2 removed."
---

A website maintenance checklist for a B2B SaaS site works in three rhythms: monthly checks that catch breakage, quarterly reviews of what drifts, such as scripts, access, and redirects, and a yearly audit of renewals, accessibility, and content. This guide lists each check and where to find it, for marketing leads, as of October 2026.

## Why do B2B SaaS teams need a website maintenance checklist?

Website maintenance is the routine work that keeps a site fast, secure, and reliable for visitors: confirming that pages are indexed, that forms deliver leads, that domains and certificates stay valid, that software stays patched, and that content stays true. Maintenance covers four layers: what the site does, such as forms and tracking, what it runs on, how it performs, and what it says. Generic checklists often split these website maintenance tasks into daily, weekly, monthly, and quarterly groups. On a B2B SaaS marketing site, alerts can cover the daily and weekly layer, so people need three rhythms: monthly, quarterly, and yearly.

The reason to write the plan down is that most website problems are quiet. A form stops reaching the CRM, a tag stops firing after a release, a redirect is deleted, a certificate lapses, outdated software goes unpatched, or an old script slows every page, and nobody notices until pipeline drops. Skipping maintenance leaves security vulnerabilities open and lets technical issues pile up until visitors find them before you do. Most websites need some attention every month, because content, tags, and team members change even when the design doesn't, so regular website maintenance has to be scheduled, not remembered. For a B2B SaaS company the website is the center of its digital presence, so a quiet failure there reaches pipeline directly.

Google Search Console emails you when Google finds new issues, but it can't test your forms or tell you which scripts marketing added last quarter. Google also says you don't need to sign in every day; it suggests checking around once every month, or when you make changes to the site's content. That sets a sensible base rhythm for the whole list, and a way to keep your site healthy without daily checks: monthly for breakage, quarterly for drift, yearly for renewals and standards.

This website maintenance checklist assumes one marketing site. If you run multiple websites, such as a marketing site, a documentation site, and a help center, run it once for each. On small sites one person can run the whole list; on complex sites with several languages or domains, add a column that says which domain each check covers.

## What should your monthly website maintenance checklist include?

Monthly checks catch breakage before it costs leads. Run the monthly maintenance on the same day each month so the numbers are comparable, and keep the owner's name next to each check. Monthly maintenance should be a short, fixed routine, not a project, and the monthly tasks below are the website maintenance tasks that identify issues before visitors do.

Table: Monthly website maintenance checklist for a B2B SaaS site

| Check | Where | What to look for |
| --- | --- | --- |
| Page indexing | Google Search Console, Page indexing report | A steady rise in indexed pages as the site grows; sudden drops or new crawl errors |
| Security issues and manual actions | Google Search Console | Anything other than a clean report |
| HTTPS | Search Console, HTTPS report | Reasons such as "HTTPS has invalid certificate" or "Sitemap points to HTTP" |
| Core Web Vitals and page speed | Search Console, Core Web Vitals report, and PageSpeed Insights on key pages | URLs moving out of "good" and slower load times on those pages, or a drop in site performance |
| Key forms | Your live site and the CRM | Each demo, contact, and sign-up form reaches the CRM with its source fields |
| Key events | Google Analytics 4 (GA4) | Demo requests and sign-ups still recorded at normal volumes, and no unusual traffic patterns |
| Broken links and 404s | Search Console and a crawl of your site | Important URLs returning errors, and broken links in the navigation, the footer, and landing pages |
| Uptime | Your uptime monitoring tool | Alerts reach a named person, and every outage has an explanation |
| Core SEO elements | A crawl or the CMS | Title tags and meta descriptions present and accurate on new or changed pages |
| Devices and browsers | A phone, a tablet, and a second browser | Key pages and forms render, work, and stay user friendly |
| Release notes | GA4 and Search Console annotations, plus your release log | A note for every launch or fix, so changes in the data have an explanation |

Five details make these checks useful:

1. **Test forms by submitting them.** Fill in each high-intent form with a test record, then find that record in the CRM with its source fields. A form can look fine on the page and still send nothing downstream, and no report will tell you.
2. **Treat 4xx errors seriously.** Google says URLs that are already indexed and return a 4xx status code are removed from the index, so a deleted page or a broken redirect can take a ranking page off search engine results pages and cost you search rankings. Fix broken links on your own site first, because you control them, and because a broken internal link is a poor user experience before it is an SEO problem.
3. **Read site speed data in the right window.** Google sets "good" at a Largest Contentful Paint (LCP) of 2.5 seconds or less, an Interaction to Next Paint (INP) of 200 milliseconds or less, and a Cumulative Layout Shift (CLS) of 0.1 or less, measured at the 75th percentile of page loads. PageSpeed Insights reports real-user data over the previous 28-day collection period, and the Core Web Vitals report in Search Console covers the last 28 days too, so a fix takes about four weeks to validate. Use the monthly check to spot trends in website performance, and use lab tests to confirm a fix sooner.
4. **Annotate changes.** Search Console allows up to 200 annotations per property and deletes ones older than 500 days, and GA4 allows 1,000 per property. Keep a release log outside both tools, with the date, the change, and who made it, so a dip in Google Analytics has an explanation a year later.
5. **Test big changes before they go live.** Before any large change, try it on a staging or preview version, save a restore point or backup, and note both in the release log. A staging copy shows layout and form problems that a code review can miss.

Set up uptime monitoring so an outage alerts a person instead of waiting for the monthly review. The monitoring tool matters less than who gets the alert.

Monthly security scans mean different things on different platforms. On a hosted platform such as Webflow, the vendor runs the servers, so your scan covers what you control: user accounts, third-party scripts, and forms. On a WordPress site, a scanner compares core, plugin, and theme versions against known security vulnerabilities. On a headless site, npm audit checks the dependencies, as the headless section below explains. In every case, read the Search Console security issues and manual actions reports as well, and give the results to an owner, because security scans only help if someone reads them.

## What should you check every quarter to keep your site secure and fast?

Quarterly reviews are the part of regular maintenance that catches what drifts as people add scripts, change tools, and come and go. This quarterly website maintenance checklist has eight items, and each of these maintenance activities belongs in the release log:

1. **Third-party scripts and tags.** List every script and tag, with an owner and a purpose, and remove what nobody can justify; that can improve performance and cut load time, and it shrinks the list of code you have to trust. OWASP's guidance on third-party JavaScript says to restrict who can publish in the tag manager and to review tag changes as you would application code.
2. **User access.** Review user accounts for the content management system, analytics, Search Console, the tag manager, and the CRM, and remove people who have left or changed roles. Two-factor authentication is one of the strong security practices to switch on everywhere: Webflow offers it to every customer, regardless of Workspace plan, and offers single sign-on on Enterprise Workspace plans only. CISA describes multifactor authentication as a layered approach to protecting online accounts and the data in them.
3. **Consent and cookies.** Compare the cookie banner and the cookie list with the tags that actually fire. The UK ICO says you should carry out regular reviews of your online service and the storage and access technologies it includes, and more often if you make regular changes. Our post on [Consent Mode v2 on Webflow](/blog/consent-mode-v2-webflow) covers how to test the setup.
4. **Redirects.** Look for redirect chains and missing rules after any launch or URL change. For site moves, Google says to keep redirects for as long as possible, generally at least one year, and a redirect that points to a deleted page sends visitors and search engines to an error, which can cost search rankings. Our [website redesign SEO checklist](/blog/website-redesign-seo-checklist) covers the rules for a larger change.
5. **robots.txt and crawler access.** Search Console's robots.txt report shows which robots.txt files Google found for the top 20 hosts on your site, when it last checked them, and whether the fetch worked. Confirm that file is the one you published, so search engines crawl the pages you want them to. If you block AI training crawlers, note that Google says Google-Extended doesn't affect a site's inclusion in Google Search and isn't a ranking signal. Our post on [AI crawlers and robots.txt](/blog/ai-crawlers-robots-txt) covers the options.
6. **Sitemaps.** Google uses the lastmod value only if it's consistently and verifiably accurate, and it ignores priority and changefreq. Make sure lastmod changes when a page changes in a significant way, not on every deploy.
7. **Speed and performance audit.** Compare PageSpeed Insights field and lab results for your key pages with last quarter, because page load speed, load time, and website performance drift as scripts and images are added. Check the field data first, then use lab tests to find the cause.
8. **Conversion review.** Look at the pages with the most traffic and the fewest demo requests, and pick one test for the next quarter. Our [CRO audit guide](/blog/cro-audit) shows how to choose it.

## What should you check every year to keep your site current and accessible?

Yearly maintenance tasks cover renewals, standards, and the content that ages, and they keep your site current and accessible. This yearly website maintenance checklist has six items:

1. **Domains.** ICANN's Expired Registration Recovery Policy requires registrars to send at least two reminders, about one month and about one week before a domain expires, to the registered name holder. Make sure that contact is a monitored team inbox on a different domain, not one that stops working if the domain lapses, and renew well before the date.
2. **Certificates.** An expired SSL certificate makes browsers warn visitors before they reach the page, which costs user trust. Webflow renews its hosted SSL certificates automatically as long as your DNS records stay continuously pointed at Webflow. It doesn't renew a custom SSL certificate, which only Enterprise customers can upload, and if your domain uses CAA records they must allow Webflow's certificate providers, Let's Encrypt and Google Trust Services, or issuing and renewal can fail.
3. **Plan limits.** Compare usage with the plan you pay for. Webflow's pricing page lists 50 form submissions per site and 50 CMS items on the free Starter plan, and 20,000 CMS items on Premium.
4. **Accessibility.** Re-test key templates against WCAG 2.2 level AA, with a keyboard and a screen reader as well as an automated tool, because the W3C says evaluation tools can't determine accessibility, only assist in doing so. Our [Webflow accessibility checklist](/blog/webflow-accessibility-checklist) lists what designers and developers each fix.
5. **Analytics settings.** Confirm the data retention setting in Google Analytics 4. Standard properties can keep event data for 2 or 14 months, and the setting affects explorations and funnel reports, not standard reports, so a 2-month setting limits how far back you can analyze.
6. **Content and legal pages.** Run a content audit: update prices, product names, screenshots, statistics, titles, and meta descriptions, and remove or merge outdated content. Check the privacy policy and cookie notice against what the site collects now, and ask counsel what applies if you serve visitors in the EU, the UK, or California, where rules such as GDPR and CCPA can matter. Out-of-date facts mislead buyers, and anyone quoting your page, human or machine, will repeat them.

## What changes on a headless Astro and Sanity site?

You take on the software upkeep that a hosted builder handles for you. The rows below sit on top of the monthly, quarterly, and yearly lists.

Table: Extra maintenance for a headless site

| Area | What to check | How often |
| --- | --- | --- |
| Node.js | Production runs on an Active or Maintenance LTS release | Yearly, and when a version nears end of life |
| Astro | Upgrade with npx @astrojs/upgrade; the core team gives security fixes only to one previous major version | Each major release |
| Dependencies | Run npm audit; some issues need manual review, and the force option can install breaking major versions | Monthly |
| Sanity API version | Clients use an explicit, static API version; removed versions return 410 errors | Quarterly |
| Content backups | Sanity's daily backups exist only on certain Enterprise plans and are off by default; otherwise schedule your own dataset exports | Monthly |
| Preview deployments | Your host's preview environment; Vercel, for example, creates a preview deployment for each push to a non-production branch and each pull request | Every change |

Node.js says LTS releases typically get critical bug fixes for a total of 30 months, that production applications should only use Active LTS or Maintenance LTS releases, and that from Node.js 27 the release cycle becomes annual. Outdated software is the usual way a headless site falls behind: a framework two majors back gets no security updates, and an old Node.js version stops receiving fixes.

On the content side, Sanity says clients should be configured with an explicit, static API version, and that once Sanity removes a version, calls to it return errors with code 410. Pin the version in your code, and read the deprecation notices before they become outages. Our post on [headless CMS SEO](/blog/headless-cms-seo) covers what else changes for search.

## What changes if the site runs on WordPress?

A WordPress site adds routine work of its own, because the content management system and its plugins and themes each have their own updates. WordPress's developer documentation says existing installations receive minor core updates by default, that fresh installations created on WordPress 5.6 or later receive major core updates too, and that plugins and themes update automatically only in special cases by default. Plugin updates and theme updates therefore need a person, or an automatic updates setting you have chosen on purpose. Check for security patches at least monthly, and sooner when a fix is announced for something you run, because updating promptly helps close security gaps.

Review your plugins and themes each quarter, because sites accumulate plugins over time, and run plugin updates on a fixed day each month. WordPress's hardening guide says to keep plugins updated and to delete a plugin you are not using, so remove inactive plugins and unused plugins rather than leaving them installed. Unused plugins add code that still needs updates, and outdated software is the first thing a security scan should flag. The same guide warns that older versions of WordPress are not maintained with security updates, so the core software needs to stay on a maintained release. Updates and tight user access are two of the practical defenses against website hacks.

If plugin upkeep takes more time than the site is worth, our [WordPress to Webflow migration guide](/guides/wordpress-to-webflow-migration) covers what a move involves.

## How do you back up a B2B SaaS website, and how do you test a restore?

Every platform backs up differently, and none of them replaces a restore you have tried. The table shows what each setup gives you and what to add.

Table: Website backups by platform, and what to add

| Platform | What you get | What to add |
| --- | --- | --- |
| Webflow | Backups created as you work, restore points on every 50th auto-save and when you restore, and manual restore points; paid Site plans have unlimited backups, and on the free Starter plan you can restore only the two most recent unless you have a paid Workspace plan. Webflow has no scheduled backups | A manual restore point before any large change, noted in the release log |
| Astro and Sanity | Site code in Git; Sanity's daily dataset backups on certain Enterprise plans only, and off by default | Scheduled dataset exports with the Sanity CLI, stored outside Sanity |
| WordPress | Whatever your host or a backup plugin provides as automatic backups; UpdraftPlus, for example, runs scheduled backups and sends them to remote storage | Regular backups of the files and the database, as WordPress's hardening guide advises, kept in a trusted location |

CISA's backup guidance for businesses describes a trusted rule of thumb: three copies of important files, on two types of storage media, with one copy off site. It also says to choose a backup solution that runs automatically and regularly, and to run scheduled recovery tests to verify backup integrity. For a website, verify backups every month by restoring a recent one to a test environment, opening the key pages, and submitting each main form. Automatic backups can stop without warning after a plan, host, or credentials change, and the monthly restore test is how you find out.

## Who should own each task in a website maintenance plan?

One named person per row, or the checklist won't run. Many maintenance tasks fail because nobody owns them, so decide which tasks belong to marketing, which belong to developers, and which belong to IT before the first review.

Table: Website maintenance owners

| Area | Typical owner |
| --- | --- |
| Search Console, Core Web Vitals, redirects, sitemaps | SEO lead or web developer |
| Forms, CRM routing, key events | Marketing operations |
| Scripts, tags, consent | Marketing operations with the web developer |
| Access, two-factor authentication, domains, certificates | IT or security, with a marketing backup |
| Backups and restore tests | Web developer or agency |
| Accessibility and content | Content lead with design |

In a small business or an early-stage SaaS team, one person may own every row, and on larger sites you can split the table by team. Either way, a website maintenance plan is ongoing technical care with names attached: it assigns the maintenance tasks to owners, and each of these maintenance activities gets a date and a line in the release log. On Webflow, save a restore point by hand before any large change, and note it in the log.

We run ongoing Webflow support for B2B SaaS companies, so we have an interest in this topic. For how a support plan covers these checks, see our [ongoing website support](/ongoing-website-support) page.
