# Rework brief: three blog posts (2026-11-23)

Three posts published in October have been indexed for weeks with zero impressions. The research (Ahrefs and Search Console, Nov 23) says the problem is targeting, so each post gets a retarget: new title tag, meta description, H1, and lead, plus new sections that carry the target query. URLs stay the same.

| Post | New target (US/mo, KD) | Surfer before → after (SEO / AI / total) | AI detector, new copy |
| --- | --- | --- | --- |
| /blog/website-launch-checklist | website launch checklist 600 (KD 7), template 150, go live checklist 80, webflow launch checklist 70 | 69 / 66 / 68 → 71 / 65 / 68 | 1% |
| /blog/saas-pricing-page | saas pricing page examples 150 (KD 2), pricing page examples 150 | 53 / n/a / n/a → 59 / 67 / 63 | 14% (28% before a rewrite) |
| /blog/consent-mode-v2-webflow | webflow cookie consent 200 (KD 3), webflow cookie banner 150 | 58 / n/a / n/a → 72 / 72 / 72 | 0% |

Facts were checked against primary sources on November 23, 2026: the Webflow Build & launch checklist, ten public pricing pages, Webflow's Help Center and Browser API docs, Webflow app listings, and Google's CMP Partner Program page.

## 0. Ground rules

1. **Copy is exact.** Every new string here is final. Don't reword, shorten, or add to it, including alt text and schema text. House style: US English, no em dashes, serial comma, sentence-case headings.
2. **Only what's listed changes.** Everything a block doesn't name stays word for word.
3. **One commit per post:** `content(blog): retarget website-launch-checklist`, `content(blog): retarget saas-pricing-page`, `content(blog): retarget consent-mode-v2-webflow`.
4. **Dates.** Set `updatedAt` (and `dateModified` in the Article JSON-LD) to the ship date. Leave `publishedAt` alone. If the front matter has `volatileChecked`, set it to 2026-11-23.
5. **Slugs and URLs don't change.** No redirects.
6. **Tables, FAQs, and sources** go in whatever format each post already uses (body Markdown or front matter arrays). Sources keep the existing "Title, URL, Accessed date" pattern.
7. **STOP and ask** if a post lives in Sanity, a quoted "Where" text isn't found exactly once, or a change needs copy that isn't here.

### 0.1 Discovery (do first, change nothing)

Post these before the first commit:

1. The source file of each post (`rg -l "slug: website-launch-checklist"` and so on).
2. Which fields hold the title tag, meta description, H1, lead, FAQ items, and sources.
3. For each block below, whether every quoted "Where" text is found exactly once.
4. The current title tag and meta description of each post, with character counts.

---

## 1. /blog/website-launch-checklist

### 1.1 Head

- **Title tag:** `Website Launch Checklist: Free B2B Template | BenorMedia` (56 characters)
- **Meta description:** `A website launch checklist for B2B teams, with a free go-live template: redirects, forms, analytics, consent, Webflow settings, and first-week checks.` (150)
- **H1:** `Website launch checklist: a free go-live template for B2B websites.`

### 1.2 Lead

Where: the paragraph under the H1 that begins `A website launch checklist for a B2B site should cover more than design QA.` Replace the whole paragraph with:

```markdown
A website launch checklist for a B2B site should cover more than design QA. The problems that cost leads in launch week tend to sit in redirects, forms, analytics, consent, and indexing. This checklist covers the week before launch, launch day, and the first week after, and ends with a go-live template you can copy.
```

### 1.3 "What should a website launch checklist cover?"

Where: the section's first paragraph, `Webflow's own pre-launch checklist is a good base. It covers design and content review, forms and links, headings and alt text, page titles and meta descriptions, a final accessibility and SEO check, Google Search Console, analytics, custom domain, SSL, and indexing preferences.` Replace it with:

```markdown
A website launch checklist should cover content, functionality, forms and tracking, consent, SEO and indexing, and the first week of monitoring. Webflow's Build & launch checklist is a good base: it lists 139 items in six stages, from workspace setup to launch day, and you can download it as a CSV or Markdown file.
```

Link `Webflow's Build & launch checklist` to https://university.webflow.com/resources/checklists/build-and-launch-checklist (the same URL as the updated source in 1.7). The list and the sentence after it stay as they are.

### 1.4 New H2: Webflow launch

Where: after the paragraph that begins `If the launch includes URL changes, Google treats it as a site move.` and before the H2 `Which post-launch tasks matter most in the first week?` Insert:

```markdown
## What's different when you launch a Webflow site?

Fewer server tasks, more settings. Webflow hosts the site and issues the SSL certificate, so launch day comes down to the seven launch items in Webflow's checklist: review reverse proxy needs if you use one, add your custom domains, verify domain ownership, set the default domain, update DNS records, publish to production, and verify the live site.

Most of the risk sits in earlier stages of the same checklist. These items matter most in launch week:

- Disable staging domain indexing, so search engines don't index the webflow.io subdomain as a copy of your live site.
- Create a named pre-launch backup, so you can restore the site quickly if something breaks at launch.
- Clean up the Designer: remove unused styles, components, and assets, and keep unfinished pages unpublished.
- Verify form configuration and notifications, then test forms and submissions on staging.
- Check for broken links and configure 301 redirects as part of SEO and AEO QA.
- Verify site ownership in Google Search Console and connect Google Analytics in the integrations step, which is also where Webflow's checklist tells you to set up consent management.
```

Link `configure 301 redirects` to /blog/webflow-redirects. If that post isn't live, leave the text unlinked and say so in the report.

### 1.5 New H2: template

Where: after the paragraph that ends `After the first week, move to a weekly review until rankings and leads settle.` and before the paragraph that begins `We design, build, and launch websites for B2B and SaaS companies`. Insert:

```markdown
## Is there a website launch checklist template you can copy?

Yes. This go-live checklist puts every check from this article in one table, with when it happens, who owns it, and what done looks like. Copy it into a spreadsheet or your project tool, swap in your team's names, and add rows for integrations your site has that this list doesn't cover.

| Task | When | Owner | Done when |
| --- | --- | --- | --- |
| Content freeze and proofread | Week before | Marketing | Final copy approved; no edits on the old site |
| Redirect map | Week before | SEO | Every changed URL maps to one new URL with a 301 |
| Staging indexing | Week before | Development | Staging subdomain stays out of search until launch |
| Pre-launch backup | Week before | Development | A named backup or snapshot exists |
| Browsers and devices | Week before | Design and development | Key pages work in major browsers, on an iPhone, and on an Android phone |
| Calls to action and links | Week before | Marketing | Every button goes where its label says; a crawl finds no broken links |
| Images | Week before | Design | Compressed, sized for placement, with alt text on meaningful images |
| Forms | Week before | Marketing ops | Each form reaches inbox, CRM, and analytics, and shows a confirmation |
| Key events | Week before | Marketing ops | Demo requests, sign-ups, and contact forms marked as key events |
| Tag installs | Week before | Marketing ops | Each tag loads from one place only |
| Consent | Week before | Marketing ops and legal | With everything rejected, analytics and ad tags set no cookies |
| Legal pages | Week before | Legal | Privacy policy, cookie policy, and terms live and linked in the footer |
| Accessibility | Week before | Design and development | Keyboard-only pass through main pages and forms, with visible focus and labels |
| SEO and structured data | Week before | SEO | Titles, meta descriptions, and canonicals set; Rich Results Test clean |
| DNS TTL | One TTL period before | Development | TTL lowered at least one full TTL period ahead |
| Publish and https | Launch day | Development | Home page and sample pages load over https, with and without www |
| Robots and noindex | Launch day | SEO | No leftover development blocks or noindex tags |
| Redirects on production | Launch day | SEO | Each old URL returns a single 301 to its new URL |
| Search Console and sitemap | Launch day | SEO | Domain verified and XML sitemap submitted |
| Live form test | Launch day | Marketing ops | One real submission per main form, seen in CRM and analytics |
| Daily checks | Days 1 to 7 | SEO and marketing ops | Indexing, 404s, redirects, leads, key events, speed, and feedback reviewed |
| Weekly review | From week 2 | SEO and marketing | Rankings and leads have settled |
```

### 1.6 FAQ

Add as the last item, after `What should you check in the first week after a website launch?`:

- **Q:** `Does Webflow have its own launch checklist?`
- **A:** `Yes. Webflow University's Build & launch checklist has 139 items in six stages, from workspace setup to launch, and downloads as a CSV or Markdown file. Its last stage covers domains, DNS, publishing, and checking the live site.`

### 1.7 Sources

Replace `Webflow University: Pre-launch checklist` (https://university.webflow.com/resources/checklists/pre-launch-checklist, accessed October 17, 2026) with:

- Webflow University: Build & launch checklist | https://university.webflow.com/resources/checklists/build-and-launch-checklist | Accessed November 23, 2026

All other sources stay as they are.

---

## 2. /blog/saas-pricing-page

### 2.1 Head

- **Title tag:** `SaaS Pricing Page Examples: 10 B2B Pages | BenorMedia` (53 characters)
- **Meta description:** `Ten SaaS pricing page examples from B2B companies, checked in November 2026, and how to choose published prices, a starting price, or cost drivers.` (147). This also removes the checklist the old meta promised.
- **H1:** `SaaS pricing page examples: 10 B2B pages, and how to decide what yours shows.`

### 2.2 Lead

Where: the paragraph under the H1 that begins `Publish prices when most deals land on a standard plan, show a starting price when deals vary but have a floor`. Replace the whole paragraph with:

```markdown
These ten SaaS pricing page examples, checked on November 23, 2026, show how B2B SaaS companies handle published tiers, starting prices, usage-based rates, and quote-only plans. The short rule for your own page: publish prices when most deals land on a standard plan, show a starting price when deals vary, and explain cost drivers when every deal is custom.
```

### 2.3 "What are the main ways to handle a B2B SaaS pricing page?"

1. In `The table shows each with a public pricing page that used it on October 18, 2026.` change `October 18, 2026` to `November 23, 2026`.
2. In the table row `Published tiers`, replace the Public example cell (`Slack: Free, Pro, and Business+ with prices; Enterprise+ says "Contact sales for pricing"`) with: `Linear: Free, Basic, Business, and Enterprise; Basic priced per user per month, billed yearly; Enterprise is "Custom" with annual billing only`
3. Replace the paragraph after the table, which begins `Two details from those pages are worth copying whatever model you choose.`, with:

```markdown
Below, ten real pages show what each model looks like in practice.
```

### 2.4 New H2: the examples

Where: directly after the bridge sentence from 2.3, before the H2 `How do you decide whether to publish prices?` Insert:

```markdown
## Which SaaS pricing page examples are worth studying?

Start with the pages that sell the way you do. We checked these ten on November 23, 2026, and they cover published tiers, starting prices, usage-based pricing, a hybrid, and quote-only pricing. Prices are left out on purpose. They change often, while the structure, the units, and the explanations are what you can reuse.

### Linear: published tiers that build on each other

Four plans sit side by side: Free, Basic, Business, and Enterprise. The useful detail is in the lists. Basic starts with "All Free features +" and Enterprise with "All Business features +," so each column shows only what's new. The free plan gives hard numbers for teams and issues. Enterprise says "Annual billing only" and lists invoice or PO billing, SAML, and SCIM, which answers procurement before anyone asks.

### Webflow: plan families with the unit spelled out

Webflow sells several kinds of plans, and the page keeps them apart: site plans, platform plans, ecommerce plans, and workspace plans, with add-ons like Analyze and Localize in a section of their own. One small line does a lot of work. Prices are in USD, "per site, plus applicable taxes," which settles the unit question for teams running several sites. There's a free Starter plan, comparison links, and an FAQ.

### HubSpot: starting prices with every fee disclosed

Marketing Hub shows "Starts at" prices and names what pushes the bill up, such as contacts and seats. Then it does something many pages skip. It states that the cost shown "does not include the required, one-time Professional Onboarding." If your product has a required fee, put it next to the price, where finance will look for it.

### Salesforce Sales Cloud: editions, add-ons, and changes explained

Sales Cloud is priced per user per month, from the Starter and Pro suites up to the Core, Advanced, and Max editions, and most of them are billed annually. You get a comparison table by edition, a currency converter, and separate sections for add-ons and support plans. The FAQ goes further than most: it tells current customers what's changing with the editions and how the new ones compare. A 30-day trial needs no credit card.

### Datadog: usage rates with a choice of commitment

Datadog's page is closer to a rate card. Each product shows its unit, such as per host or per GB, and there are separate rates for annual and on-demand billing. An engineer can price their own setup without a call, which is the point.

### Vercel: a base fee, included usage, and spend limits

Usage pricing worries finance teams, and Vercel answers the worry directly. Its paid plan combines a base fee with included usage credit, and the FAQ explains spend controls, so a buyer knows the bill can be capped. If you bill on usage, that one answer may matter more than your whole feature list.

### PostHog: a free tier per product and a calculator

The headline reads "97% of companies use PostHog for free." Behind it is a monthly free allowance for each product, no credit card, and pay-as-you-go pricing after that, with volume discounts for heavy users. Two features make the model safe to try: a calculator that totals every product, and billing limits that most products can have on their own. The FAQ runs to dozens of questions, from data retention to purchase orders.

### Intercom: seats plus a price per AI outcome

Intercom charges per seat for its helpdesk plans and per outcome for Fin, its AI agent. "Outcome" isn't a unit buyers know, so the page explains it in plain terms: you never pay if Fin can't answer, and a conversation counts as one outcome at most. Spending limits, alerts, and a quick cost estimate sit nearby, and the FAQ explains Full and Lite seats.

### Gong: no prices, but a clear price structure

No numbers here, but no mystery either. Gong says "Licenses are priced per user" and adds a platform fee "based on the number of users supported." A buyer still can't see a total. They can, though, count their users before the first call, and the conversation starts further along.

### CrowdStrike: published bundles next to a sales-led tier

Security software is often quote-only. CrowdStrike publishes per-device prices for its small-business bundles anyway, and saves "Contact sales" for the managed tier. Small teams can buy without a meeting, and large deals still get a rep.
```

The H3 sections carry no links; the ten pages are linked in the source list (2.7).

### 2.5 "What makes a SaaS pricing page design easy to compare?"

Where: after the last list item, `Answer objections in an FAQ. Billing, refunds, data privacy, cancellation, and what happens when a team outgrows its plan.` Add two list items to the same list:

```markdown
- Add a calculator when usage drives the bill, as Intercom and PostHog do.
- Show the cap. Intercom, PostHog, and Vercel all explain how to limit spend, which makes a usage bill easier to approve.
```

Then, after the list and before the H2 `What should a pricing page include if you don't publish prices?`, add this paragraph:

```markdown
How many pricing tiers should you show? There's no right number. PostHog gets by with two plans, Intercom shows three plus its AI agent, and Linear shows four. One plan per distinct type of buyer is a sensible limit, with the usual starting plan highlighted.
```

### 2.6 FAQ

Add as the first item under `Questions about SaaS pricing pages`:

- **Q:** `What are good SaaS pricing page examples?`
- **A:** `Linear and Webflow for published tiers; HubSpot and Salesforce for starting prices; Datadog, Vercel, and PostHog for usage-based pricing; Intercom for a seat and usage hybrid; and Gong for a quote-only page that still explains pricing. Pick the ones that match how you sell.`

### 2.7 Sources

1. Replace `Slack: Pricing` (https://slack.com/pricing) with: Linear: Pricing | https://linear.app/pricing | Accessed November 23, 2026
2. Change the accessed date to November 23, 2026 for: HubSpot: Marketing Hub pricing, Datadog: Pricing, Vercel: Pricing, Gong: Pricing, CrowdStrike: Pricing.
3. Add, after CrowdStrike:
   - Webflow: Plans and pricing | https://webflow.com/pricing | Accessed November 23, 2026
   - Intercom: Pricing | https://www.intercom.com/pricing | Accessed November 23, 2026
   - PostHog: Pricing | https://posthog.com/pricing | Accessed November 23, 2026
   - Salesforce: Sales Cloud pricing | https://www.salesforce.com/sales/pricing/ | Accessed November 23, 2026

All other sources stay as they are.

### 2.8 Leave unchanged

The click-to-cancel section keeps "as of October 18, 2026". The legal status wasn't re-checked for this round.

### 2.9 Optional, only if Sergio says yes: screenshots

One screenshot per example (desktop, 1440 px wide, top of the pricing page), placed under its H3, saved as `src/assets/blog/saas-pricing-page/<company>.webp`. Alt text, exact: `<Company> pricing page, checked November 23, 2026.` (for example `Linear pricing page, checked November 23, 2026.`). Screenshots show prices that will go stale, so skip this unless Sergio asks for it.

---

## 3. /blog/consent-mode-v2-webflow

### 3.1 Head

- **Title tag:** `Webflow Cookie Consent: Banner Setup and Consent Mode v2` (56 characters; " | BenorMedia" doesn't fit)
- **Meta description:** `How to set up cookie consent on a Webflow site: cookie banner options, Google Consent Mode v2, Webflow Analyze settings, testing, and common mistakes.` (150)
- **H1:** `Webflow cookie consent: how to add a cookie banner and set up Consent Mode v2.`

### 3.2 Lead

Where: the paragraph under the H1 that begins `Google Consent Mode v2 tells Google tags what each visitor agreed to`. Replace the whole paragraph with:

```markdown
Webflow has no built-in cookie banner, so cookie consent on a Webflow site comes from a consent app, a consent management platform, or your own code. Google Consent Mode v2 then tells Google tags what each visitor chose. This guide, for marketing leads running a B2B site on Webflow, covers the options, setup, and testing. It isn't legal advice.
```

### 3.3 New first H2: banner options

Where: after the lead, before the H2 `What is Consent Mode v2, and what are its consent parameters?` Insert:

```markdown
## How do you add cookie consent to a Webflow site?

Pick one of three routes: install a consent app from the Webflow Apps marketplace, load a consent management platform's script in the site's head code, or build your own banner and consent code. Whichever you choose, it needs to control which tags load and pass each visitor's choice to Google tags and to Webflow's own tracking.

| Route | How it works on Webflow | What to check |
| --- | --- | --- |
| Consent app from the Webflow marketplace | Install it from the Apps panel; the app adds the banner and blocks scripts until the visitor chooses | Google Consent Mode v2 support and what the free plan covers. Consent Pro by Finsweet is free on the webflow.io staging domain but needs a Finsweet plan on a custom domain. Cookie Consent by FlowAppz has a free plan, lists Google Consent Mode v2 signals, and needs a license key for full features. |
| A consent management platform's script | Add the platform's script to the head code in Site settings, above any Google tag. Webflow's docs name OneTrust and TrustArc as examples of platforms connected through its APIs. | Whether it's a Google-certified CMP partner. Google awards its partner badge to platforms integrated with Consent Mode and Google Tag Manager, in Bronze, Silver, and Gold tiers. |
| Your own banner and code | Design the banner in Webflow, then write the consent default, update, and storage yourself, as in Route 2 below | Who maintains it. You take on what an app or platform handles for you, such as recording consent and updating the banner when your tags change. |

Webflow reviews the apps in its marketplace but says it doesn't "endorse or certify these apps," so confirm consent mode support in each app's own documentation.

Connect the banner to Webflow's own tracking as well. Webflow Analyze and Optimize follow a separate site tracking consent setting, with the options "Let visitors opt out" and "Don't track by default." Webflow's Browser API gives your banner wf.allowUserTracking() and wf.denyUserTracking() to call when a visitor chooses. Those calls apply only to Analyze and Optimize, not to Google tags.
```

Render `wf.allowUserTracking()` and `wf.denyUserTracking()` as inline code if the post's Markdown supports it; otherwise plain text.

### 3.4 Route 1

Where: the paragraph `Route 1: a consent management app. Several consent tools in Webflow's marketplace support Google consent mode. The tool shows the banner, sets the default, and sends the update when the visitor chooses. Check in its documentation that it sets all four parameters, records each visitor's consent preferences, and loads before your Google tag.` Replace it with (keep the existing bold or label styling on "Route 1:"):

```markdown
Route 1: a consent app or platform. If you chose one of the first two options above, the tool shows the banner, sets the default, and sends the update when the visitor chooses. Check in its documentation that it sets all four parameters, records each visitor's consent preferences, and loads before your Google tag.
```

### 3.5 Webflow Analyze paragraph

Where: `If you use Webflow Analyze, set its own consent option too. Analyze can run always on, opt-in, or opt-out, and the last two need a consent solution connected to it.` Replace it with:

```markdown
If you use Webflow Analyze or Optimize, set the site tracking consent option and connect your banner to it, as described at the top of this guide.
```

### 3.6 FAQ

1. Rename the FAQ heading `Questions about Consent Mode v2` to `Questions about Webflow cookie consent`.
2. Add as the first item:
   - **Q:** `Does Webflow have a built-in cookie banner?`
   - **A:** `No. Webflow doesn't include a cookie banner or consent management platform. You add one with a marketplace app, a consent platform's script, or your own code, then connect it to Google tags through consent mode and to Webflow Analyze and Optimize through Webflow's tracking consent settings.`

### 3.7 Sources

1. Remove `Webflow Help Center: Webflow Analyze overview` (no sentence relies on it after 3.5).
2. Add:
   - Webflow Help Center: Manage site tracking consent | https://help.webflow.com/hc/en-us/articles/34272466616083-Manage-site-tracking-consent | Accessed November 23, 2026
   - Webflow Developers: Site tracking and consent management | https://developers.webflow.com/browser/reference/consent-management | Accessed November 23, 2026
   - Webflow Help Center: Integrate Consent Pro for consent management | https://help.webflow.com/hc/en-us/articles/34394790067859-Integrate-Consent-Pro-for-consent-management | Accessed November 23, 2026
   - Webflow Apps: Cookie Consent by FlowAppz | https://webflow.com/apps/detail/cookie-consent | Accessed November 23, 2026
   - Webflow: Cookie Consent integration | https://webflow.com/integrations/cookie-consent | Accessed November 23, 2026
   - Google: CMP Partner Program | https://cmppartnerprogram.withgoogle.com/ | Accessed November 23, 2026

All other sources stay as they are.

---

## 4. Checks before you report

1. Build, then `node scripts/check-seo.mjs dist`. Each post: one H1 equal to the new H1, title tag and meta description equal to this brief, FAQPage JSON-LD matching the visible FAQ (6 items on each post), Article `dateModified` equal to the ship date.
2. Each new heading id is unique and the heading levels don't skip (H2, then H3 for the pricing examples).
3. No em dashes in the changed files: `rg -n "—" <the three files>`.
4. Every internal link resolves; the three URLs are still in the sitemap.

## 5. Report

Branch and commits, the discovery answers from 0.1, check results, anything you couldn't place exactly (with the reason), and whether /blog/webflow-redirects was live for the link in 1.4. Don't merge, push to main, or deploy.

## 6. After the deploy (Sergio)

1. Search Console: Request indexing for the three URLs, and confirm each is still in sitemap-0.
2. 28-day check on December 21: impressions for the new target queries (above) against zero before.
