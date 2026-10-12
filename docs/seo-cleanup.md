# benormedia.com: cleanup after the quick changes

Task brief for Claude Code. Prepared 2026-10-06 from the [Benor Media SEO & AEO Plan](https://claude.ai/code/artifact/150ca2c2-121a-4cb8-839e-de8d64b828da) and from checks run on the live site, in Google Search Console and in Bing Webmaster Tools on 2026-10-06. It finishes what `docs/seo-quick-changes.md` left open. Verify every claim against the repo before relying on it.

## How to run this (Sergio)

1. Save this file in the site repo as `docs/seo-cleanup.md`.
2. Check the "Inputs from Sergio" block below. The partner tier is already filled in; the only blank is the base branch, and only if `seo/quick-changes` is not merged yet.
3. Open Claude Code in the repo root and paste:

   > Read docs/seo-cleanup.md. Do the Discovery section first and show me what you found before you edit anything. Then work through the tasks on a new branch `seo/cleanup`, one commit per task, and stop at any "STOP and ask" line. Do not merge, push to main or deploy. Finish with the report described at the end of the file.

4. What stays with you, because Claude Code cannot or should not do it:
   - the Vercel Firewall checks in task 3 and any redirect that lives in the Vercel dashboard or at the registrar (task 4);
   - the privacy decision in task 7;
   - deploying, then the post-deploy checks.

### Inputs from Sergio (fill in before running)

- Webflow partner tier shown on the Webflow partner profile: **Professional Partner** (confirmed by Sergio on 2026-10-06; BenorMedia is not an Enterprise Partner). The one wording to use everywhere is "Webflow Professional Partner". Today the home meta description already says that, and the footer badge alt text said "Official Webflow Partner", which is the mismatch. Never write "Enterprise Partner".
- Base branch: `main` once `seo/quick-changes` is merged. If it is not merged, write which branch to start from: `________`.

## Context

- Site: Astro, canonical host `https://www.benormedia.com`, served by Vercel (the response header says so). Google Tag Manager `GTM-M4MHRTDM` loads in the head.
- Live after the first brief (checked 2026-10-06): tasks 1 to 4, 7 and 8, plus the new titles and meta descriptions from task 5. Google's Rich Results Test shows no errors on `/`, `/pricing` and the three service pages, and the Schema Markup Validator shows 0 errors on `/`, `/pricing` and `/growth`.
- The H1s are the original taglines on purpose. Sergio reverted the H1 and subhead changes from task 5 because he does not want BenorMedia to read as only a Webflow agency: custom-coded builds and growth work (SEO, GEO, CRO) are offered too. Do not re-apply those changes and do not touch positioning copy. The titles, meta descriptions, markup and `llms.txt` keep leading with Webflow, and that stays.
- Bing Webmaster Tools (URL Inspection, 2026-10-06) lists the home page as indexed and reports **27 images without an alt attribute**.
- Search Console shows "Couldn't fetch" for `sitemap-index.xml` right after submission. Google's own live URL test fetches the file fine, so this is report lag and needs no site change.
- Not verified from the first brief: task 6 (crawler access), task 9 (redirects) and task 10 (entity facts). Task 11 was "no action" and stays that way.

## Ground rules

1. No redesign. Do not change CSS or layout. Alt text, the partner-tier wording in task 5, a script change, config and redirects are the only edits in this brief.
2. The only new visitor-facing text you write is alt text and the partner-tier wording in task 5. Do not change titles, meta descriptions, headings or body copy beyond that wording.
3. Do not invent facts. Alt text describes what the image shows, nothing the page does not already say.
4. No new runtime dependencies.
5. One commit per task with a conventional message (`fix(seo): ...`, `chore(seo): ...`), so any task can be undone with `git revert`. Do not merge, force-push or deploy.
6. Never touch DNS or registrar settings, and never touch mail records (MX, SPF, DKIM, DMARC), tokens or credentials. If a task needs access you do not have, write the steps for Sergio into the report and continue with the next task.
7. After every task: run the repo's build, then `node scripts/check-seo.mjs dist`. A failing alt check before task 2 is expected; fix only regressions.

## Discovery (before editing anything)

Report:

- the state of the repo: current branch, `git log --oneline -20`, and whether `seo/quick-changes` is merged into the base branch;
- that `scripts/check-seo.mjs`, `scripts/check-crawlers.sh` and `scripts/indexnow.mjs` exist, plus the output of a baseline `npm run build` and `node scripts/check-seo.mjs dist`;
- every component that renders an image on `/`, `/custom-websites-migrations`, `/growth`, `/ongoing-website-support`, `/pricing` and `/work` (`<img>`, `<Image>`, `<picture>`, CSS backgrounds are out of scope), and how each gets its alt text today;
- the footer and head components, the `LASTMOD` map in `astro.config.*`, and any hosting config: `vercel.json`, `middleware.*`, `public/_headers`, `public/_redirects`, CI workflows;
- where the consent defaults and the Tag Manager loader (`bmLoadGtm`) live (task 7).

Suggested order: 1, 2, 5, 6, then 3 and 4, then 7.

## Tasks

### 1. Align `check-seo.mjs` with the reverted H1s and add an alt check

Why: the script's keyword check reads title plus H1, and its "h1 differs from title" check assumes the new H1s from the first brief. The H1s are taglines again, so those checks can fail or mislead. An alt check stops the missing-alt problem from coming back.

Do:

1. Paste the output of `node scripts/check-seo.mjs dist` on the current branch.
2. In the per-page loop, make the keyword check read title plus meta description: ``const hay = `${title} ${meta}`.toLowerCase();``, and rename its label to `title+meta cover "..."`. Delete the "h1 differs from title" check. Keep "exactly one h1".
3. Add this to the per-page loop (an empty `alt=""` is valid for decorative images and counts as present):

   ```js
   const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
   const noAlt = imgs.filter((t) => !/\salt\s*=/i.test(t));
   check(noAlt.length === 0, `all ${imgs.length} img tags have alt`, `${noAlt.length} of ${imgs.length} img tags have no alt attribute, for example: ${noAlt.slice(0, 2).map((t) => t.slice(0, 90)).join(' | ')}`);
   ```

Acceptance: no check depends on the H1 wording, and the alt check prints the real count per page. Expect it to fail on `/` (27 images) until task 2 is done.

### 2. Alt text on every image

Why: Bing flags 27 images on the home page with no alt attribute. Missing alt is an accessibility defect, and crawlers that cannot see images have only the alt text to go on.

Do:

1. List every image on each indexable page and the component that renders it. Put the list in the report as a table: page, component, what the image shows, alt text you set.
2. Apply these rules:
   - Informative image (screenshot, work sample, chart): one plain sentence that says what it shows, 125 characters at most, no "image of" or "picture of".
   - Client or partner logo: the company name plus "logo" ("Surfe logo"). If the logo is the only content of a link, name where the link goes.
   - Photo or avatar beside a printed name: `alt=""`, because the name is already text. If no name is printed, use "Name, role at company".
   - Purely decorative image (background shapes, dividers, an icon next to a text label): `alt=""`.
   - A scrolling strip that renders its list twice: the first set carries the alt text, and the duplicate set gets `alt=""` and `aria-hidden="true"` on its wrapper.
   - No keyword stuffing, and no claim about a client that the page does not already make.
3. Images that come from Sanity: use the image's own alt field if the schema has one, and fall back to a value built from fields already in the document (company or person name). Do not change the Sanity schema or content in this branch. If the schema has no alt field, say so in the report and propose one.
4. If you cannot tell what an image shows from the code and the rendered page, do not guess. Leave it out of the commit and list it in the report as "needs Sergio".

Acceptance: `check-seo.mjs` shows `all N img tags have alt` on every page, or lists the images that need Sergio. Look at the home page at 1440 px and 390 px and confirm nothing moved.

### 3. Confirm AI crawlers can reach the site (task 6 of the first brief)

Why: nothing in the repo shows whether the host's firewall blocks AI crawlers. On Vercel two Firewall settings can: the **AI Bots Ruleset** (**Deny** blocks every known AI crawler, including OAI-SearchBot, PerplexityBot and ClaudeBot) and **Bot Protection** (**Challenge** serves a JavaScript challenge to traffic that does not behave like a browser). Source: Vercel's [Bot Management](https://vercel.com/docs/bot-management) and [WAF Managed Rulesets](https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets) docs.

Do:

1. Run `bash scripts/check-crawlers.sh` against production and paste the table.
2. Read it correctly. Vercel treats the real crawlers as verified bots (checked by IP range, reverse DNS or signature) and skips Bot Protection for them. A request from your machine that only claims their user-agent is not verified, so a challenge for those rows with Bot Protection on is expected and does not prove the real crawlers are blocked. A block on the "Browser (baseline)" row, or the same block on every row, points at a firewall rule. A clean table means "not blocked by user-agent", not "proven reachable".
3. Search the repo for anything that could block bots: `middleware.*`, `vercel.json` (`headers`, `routes`, conditions on `user-agent`), `public/_headers`. `robots.txt` should disallow only `/studio`, `/dev/` and `/api/`. Do not edit it in this task.
4. Write these dashboard checks for Sergio in the report, because Claude Code cannot see them. In the Vercel project, open **Firewall**, then **Rules**, then the **Bot Management** section:
   - **AI Bots Ruleset** should read **Allow** (the default, inactive) or **Log**. **Deny** blocks every AI crawler and would undo the AEO work.
   - **Bot Protection** should read **Off** or **Log**. If it reads **Challenge**, open the Firewall overview and confirm that no OAI-SearchBot, PerplexityBot, ClaudeBot or Bingbot requests were challenged or denied.
   - Custom rules run before managed rulesets: look for any rule that matches a user-agent or "bot" condition.
   - Bot Protection does not work reliably behind a reverse proxy such as Cloudflare. Say in the report if one sits in front of Vercel.

Acceptance: the table, a one-line reading per row, the likely layer for anything blocked, and the dashboard checklist are in the report.

### 4. Redirects (task 9 of the first brief)

Why: `http://benormedia.com` took two hops (https, then www) and the email domain `benor.media` redirected with a temporary 302. One permanent hop per variant keeps every signal on `www.benormedia.com`.

Do:

1. Measure the current state and paste it as "before":

   ```bash
   for u in http://benormedia.com/ https://benormedia.com/ http://www.benormedia.com/ https://www.benormedia.com/ http://benor.media/ https://benor.media/ http://www.benor.media/ https://www.benor.media/; do
     echo "== $u"
     curl -sIL -o /dev/null -w 'hops=%{num_redirects} final=%{url_effective} code=%{http_code}\n' "$u"
     curl -sI "$u" | grep -iE '^(HTTP|location)'
   done
   ```
2. Find where each redirect is set: the repo (`vercel.json` redirects, Astro `redirects`, middleware), the Vercel dashboard or the registrar.
3. Target: every variant ends at `https://www.benormedia.com/` with a 301 or 308. Hosts upgrade HTTP to HTTPS before applying a domain redirect, so `http://benormedia.com` may stay at two permanent hops, and that is acceptable. A 302 or 307 anywhere is a defect.
4. Change only what is in the repo. For anything in a dashboard, write the click path for Sergio:
   - Vercel: **Project Settings**, then **Domains**, then **Edit** on the domain to redirect from, then the **Redirect to** dropdown (choose the permanent status if the dialog offers one). Source: [Deploying & Redirecting Domains](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting).
   - `benor.media`: find out whether Vercel serves it or the registrar forwards it. Registrar "URL forwarding" often defaults to a temporary 302; switch it to permanent (301) there, or attach `benor.media` and `www.benor.media` to the Vercel project and redirect them to `www.benormedia.com`. Say which, and what DNS change each option needs, without making it.
5. Never change MX, SPF, DKIM or DMARC. `benor.media` is the email domain; only its web redirect changes.

Acceptance: before and after pasted, no 302 or 307 left, and each remaining extra hop explained.

### 5. Entity facts (task 10 of the first brief)

Why: models merge what they find across the site, the markup, LinkedIn and directories, and contradictions weaken the entity.

Do:

1. Report the partner-tier wording in every place it appears: the home meta description and its `og:` and `twitter:` copies, the first line of `llms.txt`, the footer badge alt text, the Organization markup (`description`, `knowsAbout`), and any other hit from `grep -rniE "partner" src public`.
2. Use exactly "Webflow Professional Partner" in every place from step 1. Replace "Official Webflow Partner" and any other variant, and never write "Enterprise Partner", in copy, markup or alt text. If `public/images/webflow-partner.png` shows a different tier from the one in "Inputs from Sergio", **STOP and ask**.
3. Run `grep -rnE "Benor Media|Benor media|benor media" src public` and list each hit as fixed or left, with the reason. Legal entity names stay as written ("Benor Media LLC", "Benor Media SLU"), and "Benor Media" may remain as `alternateName`.
4. Confirm the Organization markup reads the same address constant as the footer.

Acceptance: a table of every place the tier appears, all reading "Webflow Professional Partner" or listed with the reason they were left (for example text inside the badge image), and the entity fact sheet from the first brief refreshed at the end of the report.

### 6. Sitemap lastmod

Why: Google ignores `lastmod` when it is not accurate. These pages changed after the dates in the map: `/` (alt text, task 2) and `/pricing` (FAQPage markup and the new title and meta description).

Do:

1. In the `LASTMOD` map, set each page to the day its content last really changed (`git log -1 --format=%cs -- <source file>`; shallow CI clones give wrong dates). `/pricing` is 2026-10-06 if the map shows an earlier date.
2. Set `/` to the day this branch's changes ship. Use today's date at commit time and tell Sergio to update it if he deploys on a later day.
3. Do not stamp every URL with the build date. Keep `/testimonials` and `/cookie-policy` out of the sitemap.

Acceptance: `check-seo.mjs` shows "every URL has lastmod" and different dates across pages, and the report gives one line of evidence per date.

### 7. Flag only: consent mode and Tag Manager (change nothing)

Why: the inline head script sets Google Consent Mode defaults to `granted` for ad storage, ad user data, ad personalization and analytics storage, then calls `window.bmLoadGtm()` unconditionally, so Tag Manager loads on every page view. No consent banner that gates it was visible in the HTML. The plan's target markets include the UK, Germany, Denmark and Spain, so this needs a privacy review.

Do, without changing any code or config:

1. Quote the exact lines (file and line numbers) that set the defaults and load Tag Manager, and say whether anything reads a consent cookie or consent-platform state.
2. List the third-party requests the home page makes on first load in a clean browser profile (Tag Manager, GA4, ad pixels, anything else).
3. Write half a page for Sergio: what happens today, and two options with the code location of each. (A) Default to denied for the EEA, UK and Switzerland using the `region` parameter of the consent default, plus a consent banner that updates consent. (B) Keep the current behavior and document the legal basis. Say what each does to measurement. Do not choose: this is Sergio's decision, and it is not legal advice.

Acceptance: the note is in the report and the diff for this task is empty.

## Verification

Before Sergio deploys:

```bash
npm run build
node scripts/check-seo.mjs dist
bash scripts/check-crawlers.sh        # production, not changed by this branch
```

After Sergio deploys (not you):

- run `node scripts/check-seo.mjs https://www.benormedia.com` and the redirect loop from task 4 again;
- run `npm run indexnow -- https://www.benormedia.com/`, because the home page changed;
- in Bing Webmaster Tools, run URL Inspection on the home page again. The "images without alt" notice should clear once Bing recrawls the page, which can take a few days;
- in Search Console, open Sitemaps on 2026-10-07. If `sitemap-index.xml` still says "Couldn't fetch", submit `https://www.benormedia.com/sitemap-0.xml` as well.

## Report (end of your last message)

For each task: status (done, blocked, needs Sergio), files changed, the verification output, and anything you chose that this brief did not decide. Then three lists: what Sergio must do, what you could not verify, and what you noticed but left alone.

## Noticed, out of scope (do not change in this branch)

- The new pages in the plan (`/b2b-saas-web-design`, `/webflow-migration`, `/aeo-agency` and others) are a separate brief.
- `/testimonials` is `noindex` and its nav link is hidden, yet the branded prompt "Is BenorMedia a good Webflow agency for SaaS?" in the plan's prompt set points to it. That is a decision for the plan, not this branch.
