# benormedia.com: build the six drafted pages

Task brief for Claude Code. Prepared 2026-10-07 for Sergio (BenorMedia). It replaces the single-page pilot brief (`benormedia-page-webflow-migration.md`). Use this one only.

The content is already written. Six pages sit in `content-pack/content/` as Markdown files with front matter: three commercial pages and three long guides. Your job is the site side. Build the templates and routes that turn those files into pages on the existing Astro site, reuse the site's own components wherever they exist, and create new on-brand components only where the site has nothing to reuse. The pages must say exactly what the Markdown says.

Nothing is published by this task. Every page is a draft: it appears on Vercel previews and the local dev server, and it does not exist in a production build until a person signs it off (section 5.3). Merging your branch is therefore safe at any time.

## 0. How to run this (Sergio)

1. Unzip `benormedia-claude-code-handoff.zip` into the **root of the website repo**. You should now have `content-pack/BUILD-BRIEF.md` (this file) next to `src/` and `package.json`. Do not move or rename anything inside `content-pack/`.
2. Open Claude Code in the repo root. `git status` should show nothing except the new, untracked `content-pack/` folder.
3. Fill in the three inputs below, then paste this:

   > Read content-pack/BUILD-BRIEF.md in full. Do section 4 (discovery) first and show me the component map before you write any code. Then build on a new branch `feat/new-pages-wave-1`, one commit per task, and stop at every STOP line. Do not merge, push to the base branch or deploy. Finish with the report in section 12.

4. What happens next:

   | Step | Who | What |
   |---|---|---|
   | 1 | Claude Code | Reads the repo, posts a component map (what it will reuse, extend or create) and any STOP questions |
   | 2 | You | Reply "go", or correct the map |
   | 3 | Claude Code | Builds the loader, shared blocks and the commercial template, then posts a preview of `/webflow-migration` at desktop and phone width (the Vercel link, or screenshots only if you said no to pushing). This is a soft checkpoint: it keeps going, and applies your comments to the shared components first |
   | 4 | Claude Code | Builds the article template, the other pages, the diagrams and the checks, then posts the report |
   | 5 | You | Open the branch's Vercel preview and read each page at desktop and phone width |
   | 6 | Content owner | Answers the open gaps in the Markdown files (or accepts their defaults) and sets `draft: false` page by page (section 11) |
   | 7 | Claude Code, then you | Release checks for that page, then you merge and deploy |

### Inputs from Sergio

- Base branch to start from. It must already contain the SEO work from the earlier briefs (the shared entity constants and `scripts/check-seo.mjs`): `main` unless you write another here: `________`
- May Claude Code push the feature branch so Vercel builds a preview? Default yes. It never pushes the base branch: `yes / no`
- Is the repository private? If it is public, `content-pack/` (internal notes and a facts register) must not be committed to it. Claude Code stops and asks if it sees a public remote: `private / public`

## 1. What you are building

| Slug | URL | Family | File | Companion |
|---|---|---|---|---|
| `webflow-migration` | `/webflow-migration` | commercial | `content/webflow-migration.md` | `wordpress-to-webflow-migration` |
| `b2b-saas-web-design` | `/b2b-saas-web-design` | commercial | `content/b2b-saas-web-design.md` | `b2b-saas-website-pages` |
| `webflow-enterprise-agency` | `/webflow-enterprise-agency` | commercial | `content/webflow-enterprise-agency.md` | `webflow-enterprise` |
| `wordpress-to-webflow-migration` | `/guides/wordpress-to-webflow-migration` | article | `content/wordpress-to-webflow-migration.md` | `webflow-migration` |
| `b2b-saas-website-pages` | `/guides/b2b-saas-website-pages` | article | `content/b2b-saas-website-pages.md` | `b2b-saas-web-design` |
| `webflow-enterprise` | `/guides/webflow-enterprise` | article | `content/webflow-enterprise.md` | `webflow-enterprise-agency` |

A path that starts with `src/`, `scripts/`, `docs/` or `public/` is the repo's own. A bare name such as `content/`, `outlines/`, `examples/`, `data/plan.json`, `RULES.md` or `CLAIMS-REGISTER.md` is inside `content-pack/`. The pack's own scripts are always written in full, as `content-pack/scripts/...`.

Two families, decided by Sergio on 2026-10-07 (RULES.md section 1):

- **Commercial pages** are short and scannable: an eyebrow, a benefit-led H1, a short intro, two CTA buttons, a proof strip, five to seven sections (one framing line, a few bullets, an image beside them), a testimonial, an FAQ and a closing call to action. They **never show a byline, an author, dates or a recheck line**. Those values are hidden metadata in the front matter and the template must not print them. The model for the layout is `examples/hvac-invoicing-software-commercial-page-outline.md`, a page outline Sergio wrote for another company. Take the structure from it, never its words.
- **Articles** are long, sourced guides at `/guides/<slug>`. They **do show** a byline, the published and updated dates and a recheck line, plus key takeaways, tables, an FAQ and a source list.

What done looks like:

1. A loader reads `content-pack/content/*.md`, and two templates (commercial, article) render any page of those families. The next 20 or so pages in the plan must drop in as new Markdown files with no code change, so key everything on `pageType` family, never on a slug.
2. A Vercel preview of your branch shows all six pages. A production build of the same branch contains no new URL.
3. Every visible word on each page comes from its Markdown file or from the template-copy table in section 8. A script proves it (section 10).
4. Every existing page is unchanged byte for byte.

## 2. Ground rules

1. **The Markdown is the page.** Do not edit, reword, shorten, reorder or "improve" any content file. If a sentence is wrong, breaks a rule in `RULES.md`, or will not fit a component, record it in the report with file and line. The person who owns the page changes content, not you.
2. **Nothing publishes by itself.** Never set `draft: false`, never remove or answer a gap marker, never add a page to the sitemap, `llms.txt` or the nav by hand. Drafts exist in previews and local dev only.
3. **Live pages, header, footer, nav, global CSS, `vercel.json`, robots, Sanity schema and content are off limits.** The only allowed edits to existing files are: `package.json` scripts; one `.gitignore` line for the `pages:verify` output folders; the wiring in `astro.config.*` that section 5.7 names; and optional-prop extensions of a reused component under rung 2 of rule 4 (the before and after diff in section 10 must show the live pages unchanged). If a change to anything else looks necessary, STOP and ask.
4. **Reuse before you create.** Go down this ladder and stop at the first rung that works:
   1. Reuse the live component as it is.
   2. Extend it with an *optional* prop whose default reproduces today's output exactly (the before and after diff in section 10 proves it).
   3. If the live section is inline markup in a page, or is coupled to that page's data, build a sibling component that reproduces its look from the same tokens and classes. Do not refactor the live page to extract it.
   4. Create a new component only for the blocks that section 6 marks as rung 4, or when rungs 1 to 3 are impossible and you have said why in the component map.
5. **On brand.** Minimal, modern, premium, enterprise: strong typography, large spacing, clear hierarchy, white backgrounds, a limited palette, one accent colour used sparingly. Avoid heavy gradients, glassmorphism, drop shadows, decorative animation, emoji and icon clutter. Never hard-code a colour, size, space or radius: use the site's tokens (CSS variables or the Tailwind theme, whichever the repo uses). If a token you need does not exist, define a local custom property in the new component that copies the value from an existing live element, and list it in the report.
6. **No invented evidence.** No fake screenshots of Webflow, Slack, dashboards or reports, no invented client data, logos, quotes or numbers. A `screenshot` visual is a labelled placeholder until a real capture arrives. Diagrams use generic labels taken from the page's own text.
7. **Light, fast, accessible.** Native HTML and CSS first, vanilla JS second, a library only with a stated reason and Sergio's yes. No new runtime dependency without asking. The templates add almost no JavaScript: the live accordion and button scripts are reused, and the table of contents is plain links. Budgets are in section 10.
8. **No new facts about BenorMedia.** Every string the templates add is listed in section 8. Do not write others, in markup, `alt` text, `aria-label`s, schema or comments. Describe-the-diagram text for `aria-label` comes from the `alt` field of the visual.
9. **Git and deploys.** Work on `feat/new-pages-wave-1`. One conventional commit per task (`feat(pages): ...`), no force-push, no rewriting history, no push to the base branch, no deploy, no tokens or secrets in commits, logs or the report. Never promote a preview deployment and never change Vercel settings or environment variables: Sergio does that. Follow the repo's commit conventions if they differ.
10. **When unsure, STOP and ask.** A short question beats a wrong guess in a shared component.

## 3. What is in `content-pack/`

| Path | What it is | How you use it |
|---|---|---|
| `BUILD-BRIEF.md` | This file | Your instructions |
| `content/*.md` | The six pages: front matter plus Markdown body | **The source of truth.** The loader reads these in place |
| `outlines/*.outline.md` | A readable version of each page (header table, sections in order, image directions, FAQ, schema block, editor notes) in the format Sergio asked for (his HVAC outline) | Check order and structure against it. If an outline and a content file differ, the content file wins |
| `examples/` | Sergio's commercial page outline for another company | Layout model for the commercial family only |
| `RULES.md` | The content rulebook | Read sections 1 (families), 3 (gap markers), 7 (front matter), 8 (body syntax) and 12 (schema). They are your build spec. The rest is for content authors, and it mentions `briefs/` and `research/` folders that are not in this bundle |
| `CLAIMS-REGISTER.md` | What the live site already says | A1 (company facts, button labels, the 24-hour contact promise) and A8 (the two live testimonials, word for word) feed templates. X items list live-site discrepancies that are not yours to fix |
| `FACTS-REGISTRY.md` | The open questions behind the global gap ids (G1, G2, ...) | Context only |
| `data/plan.json` | Every planned page: slug, URL, type, pillar, companion, label | Resolves `page:slug` links to URLs, and gives the link text of `related` entries (section 8) |
| `data/*.csv` | Keyword lists | Read by the checker. Nothing for you to do |
| `content-pack/scripts/`: `check-content.mjs`, `apply-defaults.mjs`, `build-outline.mjs`, `lib/` | Dependency-free Node (18 or newer) tools | Run in place. `lib/frontmatter.mjs` and `lib/check.mjs` are also the parser and the marker finder your loader reuses |

## 4. Discovery (read first, change nothing)

Do these in order and keep the answers. They feed the component map and the report. Use `rg`, `ls` and reading; run only builds and the pack's own checks.

1. **Safety.** `git status` shows nothing except the untracked `content-pack/` folder. Note the current branch and the base branch from the inputs. Check the remote (`git remote -v`, and `gh repo view --json visibility` if `gh` works). The base branch must contain the earlier SEO work: `rg -n "ORG_ID|ENTITY" src` finds the shared entity constants, and `scripts/check-seo.mjs` exists.
2. **Stack.** Astro version and the integrations in `astro.config.*` (sitemap, Markdown or MDX, Tailwind, image), `site`, `trailingSlash`, `build.format`, static or server output, adapter, package manager (lockfile), Node version, the build, dev and preview commands.
3. **Baseline build.** Run a production build the way Vercel does (`VERCEL_ENV=production` plus the repo's build command). Copy the output folder (`dist` in this brief means whichever folder the build writes its static site to) to `/tmp/dist-before`, outside the repo. Run `node scripts/check-seo.mjs dist` and `bash scripts/check-crawlers.sh` if it exists. Keep a two-line summary of each.
4. **Routing hazards.** Read `vercel.json`, any `middleware.*`, `public/_redirects` and `public/_headers`. List every redirect or rewrite that could capture `/webflow-migration`, `/b2b-saas-web-design`, `/webflow-enterprise-agency` or anything under `/guides/`. List root-level dynamic routes (`[...slug].astro`, `[slug].astro`) and any existing `/guides` route.
5. **Layout and head.** Read `BaseLayout`: its props (title, description, canonical, Open Graph and Twitter, robots or noindex, extra head content, JSON-LD), what it includes (header, footer, contact modal, cookie consent, Google Tag Manager), and where the shared JSON-LD helper and the entity constants (`SITE`, `ORG_ID`, `ENTITY`) live.
6. **Components.** Read the source of `/`, `/custom-websites-migrations` and `/growth` and list each block you could reuse: the header "Get in Touch" button (a link, or a trigger for the contact modal? which attributes and tracking hooks?), hero (props, and any script that targets the hero heading, such as `hero-physics.ts` or `nav-motion.ts`), button variants, stats and logo strip, container and section wrappers, numbered process steps, work cards, testimonial (Sanity fields, GROQ query, whether result tiles exist), FAQ accordion (markup, script, and how its data array also feeds the FAQPage JSON-LD), closing call-to-action band, footer contact form, icon set, image component. For each: path, props, whether it works outside its page, and what it loads.
7. **Tokens.** Where colours, fonts, the type scale, spacing, section padding, container widths, radii, borders and breakpoints are defined (CSS variables or Tailwind theme). Record the live computed styles of the H1, H2, lead paragraph, body text, button and section padding at 1440 and 390 px.
8. **Lists of pages.** The `LASTMOD` map and sitemap integration options in `astro.config.*`, `public/llms.txt`, and the PAGES map in `scripts/check-seo.mjs`.
9. **Pack sanity.** From the repo root run `node content-pack/scripts/check-content.mjs content-pack/content`. Expected: `summary: 6 file(s), 0 fail, 1 warn, 17 open marker(s) [preview mode: markers and draft are expected until sign-off]` and `result: ok`, exit code 0. The one warning is a keyword note on `webflow-enterprise`.

**Post the component map, then stop and wait for Sergio's reply** ("go", or corrections). Write no code before it. One row per block in section 6: the live source you found, the decision (reuse, extend, sibling, create), and the file you will touch or add. Add the questions you could not answer from the code. Waiting here is mandatory. The preview checkpoint in T3 is the opposite: you post it and keep going.

**STOP and ask** if any of these is true:

- the remote is public;
- the base branch lacks the entity constants or `scripts/check-seo.mjs`;
- the baseline build in step 3 fails, needs environment variables you do not have, or cannot reach Sanity. Do not invent values, stub data or commit a secret: ask Sergio to supply them locally;
- step 9 prints anything other than the expected summary;
- a redirect, rewrite or existing route would capture a new URL;
- the site renders on the server in a way that makes the production and preview behaviour in section 5.3 impossible;
- reusing a block would force an edit to a live page, and rung 3 of the ladder cannot reproduce it;
- the repo has no spacing or type scale to build on.

**Hints from a read of the live pages on 2026-10-07.** A page-text reader saw the blocks below. They tell you what to look for, not what the code contains.

- `/custom-websites-migrations`: a hero with two buttons (Get in Touch, See Pricing), a logo strip, a problem statement, a nine-step numbered process with icon illustrations, a work showcase of project cards, an FAQ accordion in two groups, a closing call-to-action band, a testimonial card with a headshot and a company logo, and a contact form.
- `/growth`: the same hero, logo strip and closing band, a seven-step process and work tiles.
- `/`: a stats strip ("$700M+ raised by our clients", years of experience) followed by a logo carousel, a case-study video carousel, a circular services diagram with 12 nodes, a three-column service card grid, a work grid, and a second diagram ("We deal with everything, so you don't have to").
- No visible breadcrumbs, no tables, no code blocks and no long-form article layout anywhere. The article template is new.
- Style as read: light neutral background, sans-serif type, one restrained deep blue or teal accent, generous whitespace, illustration and icons.

## 5. Architecture

Names and paths are suggestions. Follow the repo's conventions, and keep the behaviour.

### 5.1 Where things live

```
content-pack/                  the bundle, committed unchanged. content/*.md is the source of truth
src/lib/new-pages/             loader, modes, links, markers, JSON-LD builder, and copy.json (section 8)
src/components/new-pages/      new components, and diagrams/ for section 7.3
src/pages/...                  routes (5.5)
scripts/check-new-pages.mjs    fidelity and output checks (section 10.2)
scripts/verify-new-pages.mjs   builds the three views and runs the checks on each
docs/new-pages.md              how it works, the two views, the release procedure, how to add a page
```

`content-pack/.gitignore` already ignores `defaulted/*`. Add the output folders of `pages:verify` (`dist-np-*`) to the repo's `.gitignore`. Use TypeScript if the repo does.

Add these three scripts to `package.json` (the only `package.json` change). Arguments typed after a script name are appended to its command.

| Script | Command | Use |
|---|---|---|
| `pages:check` | `node content-pack/scripts/check-content.mjs content-pack/content` | After every task. Open markers and `draft: true` are expected and do not fail it |
| `pages:release-check` | `node content-pack/scripts/check-content.mjs --release` | At release (section 11), with the page file after it: `pages:release-check content-pack/content/<slug>.md`. The strict form: it also fails on a stale `volatileChecked` |
| `pages:verify` | `node scripts/verify-new-pages.mjs` | From T4. Builds the three views of 10.2, each into its own folder (`dist-np-defaults`, `dist-np-review`, `dist-np-production`, using the build's `--outDir` option or by moving `dist` after each build), runs `check-new-pages.mjs` on each folder, prints one summary per view and exits non-zero if any fails |

### 5.2 The loader

- Read `content-pack/content/*.md`. Import `readContentFile(text)` from `content-pack/scripts/lib/frontmatter.mjs`, the parser the checker uses, so the site and the checker cannot disagree. It takes the file's text and returns `data` (the front matter), `body` (the Markdown), and `errors`. Import `findMarkers(text)` from `content-pack/scripts/lib/check.mjs`: for each marker it returns `raw`, `index`, `valid`, `kind`, `id`, `question` and `action` (the default action).
- Family comes from `pageType`: `service`, `industry`, `regional` are commercial. `guide`, `comparison`, `data-study` are articles. Any other type (`hub`, `tool`, `section`, `case-study-template`) is skipped with a build warning, and is a build error if its `draft` is `false`.
- Convert Markdown with the processor the repo already has (Astro ships `createMarkdownProcessor` in `@astrojs/markdown-remark`). Needs: GFM tables, ordered and unordered lists, bold, links. The content has no raw HTML, no images, no code blocks and no blockquotes. Only the body is Markdown. Front matter strings (FAQ questions and answers, takeaways, `closing.text`, `author`) are plain text: print them as text, never through the Markdown processor.
- Headings get stable ids: lower-case ASCII slug of the text, hyphens, de-duplicated with a numeric suffix. The table of contents and the anchors use the same function.
- A line that starts with `Table: ` directly above a table is that table's caption. It becomes the `<caption>` and does not appear as a paragraph.
- The pack's checker runs at build time through its own CLI, so the site and the checker cannot disagree. The gate is per page, not per environment:
  - a page with `draft: true` gets the normal check: `node content-pack/scripts/check-content.mjs <files>`;
  - a page with `draft: false` gets the release gate: `node content-pack/scripts/check-content.mjs --release --ignore-draft <files>`. It fails on open markers, a non-empty `blockedBy`, an author that is still a `[PERSON` marker, and any rule failure. The `--ignore-draft` flag is there only to turn a stale `volatileChecked` from a failure into a warning, because an old date must never break an unrelated deploy. The strict form is run by a person at release (section 11);
  - skip a call when its file list is empty. The CLI exits with code 2 when it gets no files.

  A `FAIL` stops the build and prints the checker's lines. Warnings print and do not stop it. A production build contains only released pages, so it only runs the release gate. A preview runs both, so a pull request that sets `draft: false` too early fails its own preview.

### 5.3 Modes: what exists where

| Situation | How to detect it | `draft: true` pages | `draft: false` pages |
|---|---|---|---|
| Production build | `VERCEL_ENV=production`, or any build outside Vercel where `PAGES_INCLUDE_DRAFTS` is not `1` | **Not built.** The URL returns 404 | Built, indexable, in the sitemap |
| Vercel preview | `VERCEL_ENV=preview` | Built, `noindex, nofollow`, draft banner, not in the sitemap | As production |
| Local dev | `astro dev` | As preview | As production |
| Forced | `PAGES_INCLUDE_DRAFTS=1`, never honoured when `VERCEL_ENV=production` | As preview | As production |

Two views of a draft page, chosen with `PAGES_VIEW`:

- `review` (default): gap markers are visible (5.8). This is the version people edit against.
- `defaults`: each gap's default action is applied first (the pack's `apply-defaults.mjs`, run by the loader into `content-pack/defaulted/`, which is git-ignored). The page is then exactly what would ship if nobody answered a gap. Sergio can set `PAGES_VIEW=defaults` in the Vercel preview environment to see it.

`PAGES_VIEW` has no effect in production: a released page has no markers, and a draft is not built.

**Light release gate.** This is the `draft: false` call in 5.2. A build must fail, naming the file and the gap ids, when a page with `draft: false` still has an open marker, a non-empty `blockedBy`, or an author that is still a `[PERSON` marker. It must not fail on a stale `volatileChecked`: that check belongs to the release step (section 11), because an old date must never break an unrelated deploy.

### 5.4 Links

Links to other pages live in three places: the Markdown body (`page:slug`), the `related` list (a bare slug such as `webflow-pricing`, or a live path such as `/custom-websites-migrations`) and the `breadcrumb` list (paths). One resolver handles all of them. First decide what each target is:

- **Released**: a page in the pack (`content/<slug>.md` exists) with `draft: false`.
- **Draft**: a page in the pack with `draft: true`.
- **Planned**: a slug or path that is in `data/plan.json` but has no content file (for example `webflow-vs-wordpress`, or `/guides`, the hub).
- **Live**: a path in `LIVE_PATHS` (exported by `content-pack/scripts/lib/check.mjs`: `/`, `/custom-websites-migrations`, `/growth`, `/ongoing-website-support`, `/pricing`, `/work`, `/privacy-policy`, `/terms-conditions`). Import the set rather than copying it. The checker already fails any other path.

A bare slug and `page:slug` mean the same thing. A path equal to the `url` of a page in the pack or in `plan.json` is that page. The page being rendered always counts as released.

| Target | Body link | `related` entry and visible breadcrumb item | BreadcrumbList JSON-LD |
|---|---|---|---|
| Released | Normal link to its `url` | Normal link. The current page's own breadcrumb item is plain text with `aria-current="page"` | Kept |
| Draft | Production: the link text as plain text, no anchor. Preview: normal link with `data-draft-target` | Production: omitted. Preview: normal link with `data-draft-target` | Omitted |
| Planned | Production: plain text. Preview: plain text with `data-planned="slug"`, shown with a dotted underline | Production: omitted. Preview: plain text followed by the planned suffix (section 8) | Omitted |
| Live | Normal link | Normal link | Kept |

When JSON-LD items are omitted, the remaining positions are renumbered from 1, so no markup ever points at a 404. This matters today for the guides, whose breadcrumb lists `/guides`, a hub that does not exist yet: a preview shows `Guides (planned)` as plain text, a production build omits it, and the JSON-LD omits it in both. The visible breadcrumb is on articles only.

An `https://` link is a normal link with `rel="noopener"` that opens the way external links open elsewhere on the live site. An unknown slug (in neither the pack nor `plan.json`) is treated as planned and prints a build warning with the file name. The link text of a `related` entry is set by section 8.

### 5.5 Routes

One route per family, driven by `getStaticPaths` over the loader's list:

- commercial pages: `/<slug>` at the site root. Assert that each file's `url` equals the route's URL, and fail the build on a mismatch (the front matter `url` is canonical).
- articles: `/guides/<slug>`, same assertion.

Static routes win over dynamic ones in Astro, so existing pages are not affected. Output must follow the repo's `trailingSlash` and `build.format` so that the canonical is `https://www.benormedia.com` plus the `url` value, with no trailing slash (as on the live sub-pages). Do not special-case a slug anywhere.

### 5.6 Head and JSON-LD

- `<title>` is the front matter `title` verbatim (it already ends in `| BenorMedia`; do not append the site name again). The meta description is `description` verbatim. Open Graph and Twitter values follow BaseLayout's own rule. If BaseLayout has an `og:type` prop, use `article` for articles.
- Drafts add `<meta name="robots" content="noindex, nofollow">`.
- Build the JSON-LD in one module, `src/lib/new-pages/jsonld.ts`, on top of the shared entity constants and the repo's JSON-LD helper, in the pattern already live on the service pages. The `Schema Markup` block at the bottom of each `outlines/*.outline.md` is the expected output. If the live pages emit separate `<script>` tags instead of one `@graph`, do the same.

| Family | Objects | Rules |
|---|---|---|
| Commercial | `Service`, `FAQPage`, `BreadcrumbList` | `Service`: `@id` is the canonical URL plus `#service`; `name` and `serviceType` from `service`; `url` is the canonical URL; `description` is the meta description; `provider` is the inline Organization (`@id`, `name`, `url` with trailing slash); `areaServed` is the six `Country` objects; `audience` is a `BusinessAudience` with `audienceType` "B2B SaaS and tech companies". No `offers`, prices, ratings or reviews. No `Article` and no author |
| Article | `Article`, `FAQPage`, `BreadcrumbList` | `Article`: `@id` is the URL plus `#article`; `headline` is `h1`; `description`; `url`; `mainEntityOfPage`; `inLanguage` is `lang`; `datePublished` is `publishedAt`; `dateModified` is `updatedAt`; `publisher` is the inline Organization. `author`: if the text is `BenorMedia team`, an `Organization` (`@id`, name BenorMedia). Otherwise a `Person` whose `name` is the text before the first comma and whose `jobTitle` is the rest, with `worksFor` the Organization. Invent no URL or `sameAs` for a person. In the review view, while the author is still a `[PERSON` marker, emit the Organization, which is the marker's default |

`FAQPage` comes from the same array as the visible FAQ (one source, so the two cannot drift): one `Question` per visible item, the answer as plain text equal to the visible answer. In the review view, omit FAQ items that contain a gap marker from the JSON-LD.

**Where the outlines differ.** The `Schema Markup` block of each outline is the expected output, with one intended exception: a BreadcrumbList item whose page is not built is dropped and the positions renumbered (5.4). A guide's list is therefore Home, then the guide, until the `/guides` hub exists. The outline still shows `/guides`, which is how the list will look once the hub is built.

### 5.7 Sitemap, lastmod and nothing else

- Released pages enter the sitemap by the usual mechanism. Set `lastmod` from `updatedAt` through the loader, so nobody hand-edits the `LASTMOD` map. This is the one allowed change in `astro.config.*`, together with a sitemap `filter` that keeps draft pages out of the preview sitemap.
- Do not touch `robots.txt`, `public/llms.txt`, `scripts/check-seo.mjs`, the nav, the footer or any live page. Section 11 lists what a person adds at release.

### 5.8 Gap markers

A gap is `[FACT NEEDED #ID: question | default: ACTION]` (also `VERIFY` and `PERSON`). Details in RULES.md section 3. Markers can sit in a sentence, a list item, a table row or a front matter string (`author`, an FAQ answer).

- **Review view.** Parse the front matter first (`readContentFile`). Then handle the markers in each string that renders: the Markdown body, and every front matter string a template prints (`author`, the FAQ answers, any other). Never run the replacement over the raw file. A marker contains `|`, `:` and quotes, and in four of the six files a marker sits inside a quoted YAML string, so replacing it in the whole file breaks the front matter.
  - In each string, swap every valid marker for a private token that has no pipe and no markup characters (for example `§np3§`) and keep a table of the markers (id, kind, question, default). In the body this happens before the Markdown is converted, so a marker inside a table row (it contains a pipe) cannot split the cell.
  - After conversion, or when a front matter string is printed, swap each token for `<mark class="np-gap" tabindex="0" data-gap-id="..." data-kind="..." data-default="...">` that shows the id and the question.
  - Show the draft banner (section 8) with the number of open gaps, and an expandable list of all gaps at the end of the page (id, kind, question, default).
- **Defaults view:** no marker remains, and no `np-gap` markup is emitted.
- **Production:** a marker in a `draft: false` page fails the build (5.2). A `draft: true` page is not built, so its markers never reach production.

### 5.9 Visuals

`visuals` entries are numbered from 1 in file order (key `<slug>:<n>`, list in Appendix C). For each, in this order:

1. a real asset at `src/assets/new-pages/<slug>/<n>.<ext>` (`webp`, `png`, `jpg`, `svg`) renders with the repo's image component, with `alt` from the front matter;
2. a registered diagram for `<slug>:<n>` (section 7.3) renders;
3. otherwise, in previews only, a labelled placeholder (section 8) shows the visual's `type` and `brief`;
4. otherwise, in production, nothing renders and that section falls back to a single column.

A visual is placed after the section whose H2 equals `after` (exact match, otherwise "starts with"). If no section matches (for example because a gap's default deleted the section), drop the visual and print a warning. Commercial pages use `side` (`right` or `left`). Articles use a full-width figure.

### 5.10 Next pages

The templates must accept the later pages in `data/plan.json` unchanged: an `industry` page uses the commercial template (second button "See Our Work", section 8), and `comparison` and `data-study` use the article template. New pages arrive as new files in `content-pack/content/`.

## 6. Page anatomy: block by block

The rung column refers to the ladder in rule 4 of section 2. Exact component names are in section 7.

### 6.1 Commercial pages (`service`, `industry`, `regional`)

Order on the page, top to bottom:

| # | Block | Fed by | Component | Rung |
|---|---|---|---|---|
| 1 | Eyebrow, H1, lead, two CTA buttons | `eyebrow`, `h1`, the body before the first `##`, section 8 button labels | The live hero of the service pages, with an optional `eyebrow` | 2 or 3 |
| 2 | Proof strip, directly under the hero | The four items in section 8 | The live stats strip | 2 or 3 |
| 3 | Five to seven sections | Each `##` block: H2, the first paragraph (the framing line), the list (bullets, `**Bold lead-in.**` allowed), plus the `visuals` entry that follows it | `SplitSection` and `Visual` | 4 |
| 4 | Testimonial | `testimonial` (`surfe`, `puzzle` or `both`), placed after the section named in `testimonialAfter`, otherwise directly before the FAQ | The live testimonial component | 1 or 2 |
| 5 | FAQ | `faqHeading` as the H2, then `faq[].q` and `.a` | The live accordion. Same array feeds the JSON-LD | 1 or 2 |
| 6 | Closing call to action | `closing.heading`, `closing.text`, both buttons again | The live CTA band | 1 or 2 |
| 7 | Related links, under the closing band | `related`, pillar first | `RelatedLinks` | 4 |
| 8 | Head and JSON-LD | Front matter | `BaseLayout` and `jsonld.ts` | 1 and 4 |

Not rendered on commercial pages, ever: `publishedAt`, `updatedAt`, `reviewEvery` (they drive `lastmod` only), `author`, `sources`, `volatile`, `editorNotes`, `inbound`, `primaryKeyword`, `secondaryKeywords`, `blockedBy`, `wave`. No byline, no dates, no recheck line, no visible breadcrumb.

### 6.2 Articles (`guide`, `comparison`, `data-study`)

| # | Block | Fed by | Component | Rung |
|---|---|---|---|---|
| 1 | Breadcrumb, eyebrow, H1, byline row, lead | `breadcrumb`, section 8 eyebrow, `h1`, `author`, `publishedAt`, `updatedAt`, `reviewEvery`, the body before the first `##` | `ArticleHeader` with `Breadcrumbs` and `Eyebrow` | 4 |
| 2 | Key takeaways | `takeaways` | `KeyTakeaways` | 4 |
| 3 | On this page | The body H2s and the FAQ heading | `TableOfContents` | 4 |
| 4 | Body | H2 and H3, paragraphs, lists, bold, links, tables (with captions) | `Prose` and `DataTable` | 4 |
| 5 | Visuals, full width, after the named H2 | `visuals` | `Visual` | 4 |
| 6 | FAQ | `faqHeading`, `faq` | The live accordion | 1 or 2 |
| 7 | Closing block | Section 8 article closing text, and `related` | The live CTA band, with `RelatedLinks` | 2 or 3 |
| 8 | Sources, at the foot of the page | `sources` | `SourcesList` | 4 |
| 9 | Head and JSON-LD | Front matter | `BaseLayout` and `jsonld.ts` | 1 and 4 |

Not rendered on articles: `volatile`, `editorNotes`, `inbound`, `primaryKeyword`, `secondaryKeywords`, `blockedBy`, `wave`, `testimonial`.

## 7. Components

Specs below describe behaviour and the visual language. The live site decides the exact values: read them from its tokens (section 4, step 7), never from this file.

### 7.1 Reused blocks, and what to feed them

| Block | Feed it | Notes |
|---|---|---|
| Hero | eyebrow, H1, lead paragraphs, two buttons | Add an optional `eyebrow` slot if the live hero has none. A long H1 (up to 90 characters) must wrap to at most three lines at 390 px. If a script animates or measures the hero heading, use a variant without it, or add an off switch, and confirm the console is clean on the new pages |
| Proof strip | the four items in section 8 | Same look as the live stats strip. The logo carousel is optional: leave it out unless it costs nothing |
| Testimonial | `surfe`, `puzzle` or both | If the live component reads Sanity, read the same documents (match on the company name). `both` renders two |
| FAQ accordion | `faqHeading`, `faq` | Keep the live markup, script and keyboard behaviour. Every answer must be in the HTML, collapsed or not |
| CTA band | heading, text, buttons | Commercial pages take heading and text from `closing`. Articles take the template text in section 8 |

### 7.2 New components

| Component | Behaviour | Visual language |
|---|---|---|
| `Eyebrow` | One short line above the H1 | The live small-label style if one exists (the home page has section labels). Muted or accent colour, no icon |
| `SplitSection` | Props: `heading`, rendered section HTML (framing paragraph, then list), optional `visual`, `side`, `id`. Two columns from the desktop breakpoint, the visual on the side `visuals[].side` says, stacked below it in this order: H2, framing line, bullets, visual. Without a visual, the text keeps a readable measure and sits left-aligned in the page container | H2 in the live section-title style. The framing line in the live section-intro style. Bullets with a small marker drawn in CSS in the accent colour (no icon font), 12 px between items, line-height about 1.55, bold lead-ins in the strong text colour. Section padding equals the live sections'. No dividers, no card chrome, no entrance animation (reuse the live reveal utility only if it respects `prefers-reduced-motion`) |
| `Visual` | A `<figure>` for an asset, a diagram or a preview placeholder (5.9). Reserves its space with `aspect-ratio` to prevent layout shift. `alt` is required whenever it renders an asset | Corner radius of the live cards, a 1 px hairline border in the border token, no shadow |
| `Breadcrumbs` | `<nav aria-label="Breadcrumb">` with an ordered list. The last item is plain text with `aria-current="page"`. Items follow the resolver in 5.4 | Small, muted. Separators drawn with CSS |
| `ArticleHeader` | Breadcrumb, eyebrow, H1, byline row, lead paragraphs. The byline row holds the author, the two dates in `<time datetime>` and the recheck text. Items wrap on small screens | Byline in the small muted style, items separated by CSS (a thin rule or a dot). Lead in the live lead style, measure up to about 68 characters |
| `KeyTakeaways` | An `<aside>` with a label and 3 to 5 sentences as a list | Very light surface tint token, 1 px border, card radius, 24 to 32 px padding, list markers as in `SplitSection` |
| `TableOfContents` | `<nav aria-label="On this page">` with links to the body H2s and the FAQ heading. Always visible, no JavaScript, no sticky behaviour | Small text, single column |
| `Prose` | The article body wrapper. Sets the measure (about 68 to 72 characters), heading rhythm, paragraphs (line-height 1.65 to 1.7), lists (ordered lists with counters), links (accent colour, underline with offset), bold, `scroll-margin-top` on headings so anchors land below the sticky header | Uses the live type tokens. H2 top margin at least 64 px, H3 at least 40 px |
| `DataTable` | `<table>` with a visible `<caption>` (from the `Table:` line), `<th scope="col">` headers, inside a scroll region (`role="region"`, `aria-labelledby` the caption, `tabindex="0"`). A table with three or more columns keeps a minimum width (about 640 px) and scrolls sideways on small screens instead of squeezing | Header row in bold with a stronger bottom border, hairline row borders, 12 to 16 px cell padding, top-aligned, no zebra stripes, no heavy borders |
| `SourcesList` | An `<h2>` "Sources" and a list. Each item: the label as an external link, then the access date | Small text, measure as `Prose` |
| `RelatedLinks` | A label and a wrapping row of text links (a column on mobile) | The live link style, no bullets, no cards |

### 7.3 Diagrams

14 of the 19 visuals are diagrams (Appendix C). Draw them as components so their text is real DOM text (readable by people, search engines and AI crawlers) and so they inherit the tokens.

- Start from the site's own diagrams: the home page's circular services diagram and its "We deal with everything" diagram. Match their line weight, node shape, label size and use of colour. If they are raster images or animations, match the look in SVG. Do not embed them.
- Inline SVG, or HTML and CSS, in an Astro component. No client JavaScript, no external files, no animation.
- Wrap as `<figure role="img" aria-label="{alt}">` using the visual's `alt`. Keep the diagram's own text as real text inside.
- One accent token plus neutrals, 1 px strokes, card radius, no gradient, no shadow.
- Text stays at 14 px or more at 390 px wide. Do not shrink it: reflow to a vertical layout under about 560 px (container query or a second layout).
- **Labels come from the page.** Use words that appear in that section's text, in the visual's `brief` or in its `alt`. Example data (URLs, role names) is generic and visibly an example (`/old-page`, `/new-page`). Add no number, duration, tool name or claim the page does not make. If a brief cannot be drawn without inventing something, render the placeholder and list the visual in the report.
- Register each diagram in `src/lib/new-pages/visuals.ts` as `'<slug>:<n>'` with its component and props, and put a one-line comment on it naming the section text the labels came from.
- Suggested templates (Appendix C assigns one per visual, merge where it is clean): `FlowDiagram` (steps in a row that wraps or stacks), `MappingDiagram` (two columns with a connector per row), `SiteMapDiagram` (a root and grouped children), `OutlineDiagram` (a page skeleton with callout labels), `HubDiagram` (a centre and satellites, with a ring variant), `RoleMapDiagram` (lanes with an approval step), `TimelineDiagram` (a line with milestones).
- The 5 `screenshot` visuals stay placeholders. Never draw a fake Webflow Designer, Slack channel, report or dashboard.

### 7.4 Preview-only chrome

`DraftBanner`, `GapsPanel`, the `.np-gap` highlight, the visual placeholders, and the `data-draft-target` and `data-planned` link markers (5.4) exist only when drafts are included (5.3). The highlight is a readable marker-pen yellow, focusable, and shows the full gap text. None of this may appear in production HTML, and the check script proves it.

### 7.5 Rules for every component

WCAG 2.2 AA. Landmarks and labelled `nav`s. Heading levels never skip. Focus-visible styles from the live site. Accordion keyboard behaviour as on the live pages. Links distinguishable without colour alone. Contrast of 4.5:1 for text (3:1 for large text). Tap targets of 44 px or more for buttons. `prefers-reduced-motion` respected. Dates in `<time datetime>`. Labels such as Key takeaways, On this page, Related pages and Open gaps are not headings: use a `<p>` (with an id and `aria-labelledby` where a landmark needs a name). Section 10.2 check 5 lists the only headings the templates add. No hover-only content, no autoplay, no hidden text for crawlers. Native HTML and CSS first, no icon library, no new font, no new runtime dependency. Every element that prints text taken from a content file carries `data-np-src` (10.2). A reused live component whose text comes from outside the pack, such as the Sanity testimonial, is wrapped in an element with `data-np-live="<component>"` (give it `display: contents` so the layout does not change). New CSS stays scoped to the new components or lives in one stylesheet that only the new templates import. Do not edit global stylesheets.

## 8. Template copy: every string the templates add

Anything not in this table must come from a content file. Do not write other text, including `alt`, `aria-label` and `title` attributes. Keep every string of this table in one JSON file, `src/lib/new-pages/copy.json`, that both the templates and the check script (10.2) read, so the two cannot drift. In a string, `{name}` stands for any value, and the script treats each brace as a wildcard.

| Where | Text or rule |
|---|---|
| First hero button, all commercial pages | `Get in Touch`. It does exactly what the header button does: same link or modal trigger, same tracking attributes |
| Second hero button, `service` pages | `See Pricing`, links to `/pricing` |
| Second hero button, `industry` and `regional` pages | `See Our Work`, links to `/work` |
| Buttons in the closing band (commercial) | The same two buttons again |
| Proof strip, four items in this order | `100+ launches`, `6+ years of experience`, `$700M+ raised by our clients`, `Webflow Professional Partner`. Not "6+ years as a Webflow Professional Partner" (CLAIMS-REGISTER X2) |
| Testimonials | The live testimonial's own text. CLAIMS-REGISTER A8 is a transcription of it. If the two differ by more than punctuation or spacing, use the live text and report the difference. Show result tiles only if the live component has them |
| Related block label | `Related pages` |
| Related link text | A slug: the `label` of that page in `data/plan.json`, or the page's `h1` if it has no label. A live path: its live navigation name. `/custom-websites-migrations` is `Custom Websites & Migrations`, `/growth` is `Growth (SEO/GEO + CRO)`, `/ongoing-website-support` is `Ongoing Website Support`, `/pricing` is `Pricing`, `/work` is `Work` and `/` is `Home` (CLAIMS-REGISTER A1). For any other live path, use that page's H1 from the baseline build and list it in the report |
| Accessible names | `Breadcrumb` (the breadcrumb nav), `On this page` (the table of contents nav), the visible `Related pages` label (the related block, through `aria-labelledby`), the table caption (the name of a table's scroll region), and the visual's `alt` (a diagram's `aria-label`, an image's `alt`) |
| Eyebrow on articles | `Guides` for guides and comparisons, `Original data` for data studies |
| Byline row, articles | `By {author}`, `Published {date}`, `Updated {date}`, `Rechecked every {n} days`. Dates read `October 6, 2026` inside `<time datetime="2026-10-06">`. Separators are drawn with CSS, not typed |
| Key takeaways label | `Key takeaways` |
| Table of contents label | `On this page` |
| Sources heading | `Sources`. Each item: the label as a link, then `Accessed {date}` |
| Article closing block | Heading `Talk to BenorMedia about your own site`. Text `Questions about applying this to your own site? One of our team members will be in touch within 24 hours.` One button, `Get in Touch`, as above |
| Breadcrumb names | `breadcrumb[].name` as written |
| Draft banner (preview only) | `Draft preview. This page is not published.` then the view name (`review` or `defaults`) and, in the review view only, `{n} open gaps` |
| Gaps panel heading (preview only) | `Open gaps on this page` |
| Visual placeholder (preview only) | `{Diagram or Screenshot} to come`, then the visual's `brief` |
| Planned-page suffix (preview only) | `(planned)` |

## 9. Tasks

One commit per task. Run `pages:check` and the build after each. STOP lines are binding.

| Task | Commit | Do | Acceptance |
|---|---|---|---|
| **T1. Pack and loader** | `feat(pages): add the content pack and its loader` | Confirm `content-pack/` is committed as delivered. Add the three `package.json` scripts and the `.gitignore` line (5.1). Build `src/lib/new-pages/`: loader (5.2) with the gate, modes (5.3), link resolver (5.4), gap markers (5.8), Markdown conversion with heading ids and table captions, and `copy.json` with the strings of section 8 | A throwaway script (not committed) shows: production lists 0 pages and preview lists 6; the defaults view of all six contains no `[FACT NEEDED`, `[VERIFY` or `[PERSON`; a `page:` link to a slug outside the pack is plain text; on a scratch copy, a gap marker inside a table row leaves the table intact, and a marker inside a quoted front matter string (`author`) does not break the front matter; the gate fails a scratch page with `draft: false` and one open marker, naming its id |
| **T2. Shared blocks** | `feat(pages): add prose, table, visual, breadcrumb and review blocks` | `Prose`, `DataTable`, `Visual`, `Eyebrow`, `Breadcrumbs`, `RelatedLinks`, `DraftBanner`, `GapsPanel`, `.np-gap`. Optional and recommended: a preview-only kit page that shows every new component with sample content (it returns no paths in production) | Each block renders at 1440 and 390 px with no console error, keyboard-reachable where interactive |
| **T3. Commercial template and three pages** | `feat(pages): commercial page template and the three service pages` | Section 6.1 in full, both views, head and JSON-LD (5.6) | Three URLs render in the preview. Order matches `outlines/`. One H1. No byline, dates or recheck text. Hero fits at 390 px with no sideways scroll. Testimonials sit where `testimonialAfter` says. The FAQ opens by keyboard. **Soft checkpoint:** post the preview URL and 1440 and 390 px screenshots of `/webflow-migration`, then continue |
| **T4. The check script** | `feat(pages): add check-new-pages` | `scripts/check-new-pages.mjs` as specified in 10.2, plus the `pages:verify` script | Passes on the three commercial pages in the defaults view. Fails when you delete one sentence from a copy of a built page. Run it after every later task |
| **T5. Article template and three guides** | `feat(pages): article template and the three guides` | Section 6.2 in full | Three URLs render. Byline values match the front matter. Tables have captions and scroll on a phone. The preview breadcrumb shows `Guides (planned)` as plain text, the production build omits it, and the JSON-LD omits it in both. Article JSON-LD follows the author rule in 5.6. `pages:verify` passes for all six pages |
| **T6. Draft gating, sitemap, release rehearsal** | `feat(pages): keep drafts out of production and wire the sitemap` | 5.3 and 5.7. Then a rehearsal in a throwaway worktree (`git worktree add /tmp/np-rehearsal`). First, copy one page with `draft: false` and its markers left in: the production build must fail, naming the file and the gap ids. Then run `apply-defaults.mjs --write` on that copy, set `draft: false`, pass the strict `pages:release-check` (in the scratch copy, set `volatileChecked` to today if it calls it stale), build for production, and confirm the page exists, is in the sitemap with `lastmod` equal to `updatedAt`, is indexable, and has valid JSON-LD. Remove the worktree. Never commit the rehearsal | The production build matches `/tmp/dist-before` for every existing path (10.1). No new URL in the sitemap. The preview build has six new pages, all `noindex`, none in the sitemap. Both rehearsal results go in the report |
| **T7. Diagrams** | `feat(pages): diagram components` | Section 7.3 and Appendix C | 14 diagrams drawn, or listed with the reason they stayed placeholders. 5 screenshots remain placeholders. Each diagram is legible at 390 px. Every label traces to the page text |
| **T8. Docs and final verification** | `docs(pages): how the new pages work` | `docs/new-pages.md` (short): modes, the two views, how to add a page, the release steps in section 11, the component map as built. Then run all of section 10 and fix what fails | Section 10 is green, or each exception is in the report |

## 10. Verification

Run this at the end of T8, and the parts that apply after each earlier task. Use the repo's package manager and build command. `<build>` below means that command.

### 10.1 Nothing else changed

```bash
VERCEL_ENV=production <build>      # after your last commit
diff -r /tmp/dist-before dist      # /tmp/dist-before is the baseline from section 4, step 3
```

Expected: no difference in the HTML of any existing page, in `sitemap-*.xml`, `robots.txt` or `llms.txt`, and no new URL anywhere. Hashed asset file names may change only if you can name the shared file that changed and why. Run `node scripts/check-seo.mjs dist` as well, and compare with the baseline summary.

### 10.2 `scripts/check-new-pages.mjs` (you write it in T4)

Dependency-free Node. Usage: `node scripts/check-new-pages.mjs <dist> --view defaults|review|production`. `pages:verify` (5.1) builds each view into its own folder and runs the script on it. The three builds are:

```bash
VERCEL_ENV=preview PAGES_VIEW=defaults <build>    # then --view defaults
VERCEL_ENV=preview PAGES_VIEW=review <build>      # then --view review
VERCEL_ENV=production <build>                     # then --view production
```

**Sources.** The script reads the same files the build read, with the pack's own parser (`readContentFile`): `content-pack/content/<slug>.md`, or `content-pack/defaulted/<slug>.md` in the defaults view. It checks every page built in that view. In the production view that means the pages with `draft: false` (none today).

**How text is compared (checks 3 and 4).** Every element that prints text taken from a content file carries a `data-np-src` attribute naming where the text came from (for example `h2`, `p`, `li`, `td`, `faq.q`, `faq.a`, `takeaway`, `closing.heading`). The attribute is inert and stays in production HTML. Both sides are normalized before they are compared: decode HTML entities, collapse whitespace, trim, fold curly and straight quotes and apostrophes, and in the source Markdown drop link syntax (keep the link text), bold markers, list markers and the leading `Table: ` of a caption. RULES.md section 8 limits the body syntax, so a line-based splitter is enough: add no Markdown dependency. A **unit** is the whole normalized text of one `data-np-src` element, or any other text node inside `<main>`, or an attribute value (`alt`, `aria-label`, `title`, `placeholder`) inside `<main>`.

Checks, per built page:

1. Exactly one `<h1>`, and its text equals the front matter `h1`.
2. The `<title>`, meta description and canonical equal `title`, `description` and `https://www.benormedia.com` plus `url`. The robots meta says `noindex` if and only if the page is a draft.
3. **Fidelity, forward** (defaults and production views only). Each of these source blocks equals one `data-np-src` unit: the `eyebrow` (commercial pages), the lead paragraphs, every body heading and paragraph, every list item, every table caption and cell, `faqHeading`, every FAQ question and answer, every takeaway, and `closing.heading` and `closing.text`. The body blocks appear in the source's order.
4. **Fidelity, backward** (defaults and production views only). Every unit inside `<main>` is one of: a source block that check 3 expects; a section 8 string; a visual's `alt` or `brief` from the front matter; or live text (below). Anything else is stray copy and fails. Live text has two forms. Fixed chrome of a reused live component (button labels it prints itself, the accordion's own labels) is an entry in `LIVE_ALLOW`, one array at the top of the script, each entry commented with the component that prints it. Text that a reused component fetches from outside the pack, which today means the Sanity testimonial, sits inside an element with `data-np-live="<component>"` and is skipped as a whole. Repeat both lists in the report so Sergio can see exactly what is exempt. Diagram figures (`role="img"`) are skipped too, and T7 audits their text by hand.
5. Heading levels never skip. The H2s are exactly the body H2s, the FAQ heading, the closing heading and, on articles, `Sources`. Heading ids are unique and every same-page anchor resolves to an id.
6. JSON-LD: every `<script type="application/ld+json">` parses. The objects match section 5.6 for the family. The FAQPage has one question per visible FAQ item, with the answer equal to the visible text. In the review view it has one per visible item that has no gap marker. Article dates equal the front matter. No `offers`, `aggregateRating` or `review` anywhere. Every `item` in the BreadcrumbList resolves to a built page or a live path.
7. Links inside `<main>`: every internal `href` resolves to a built file or a live path. No `href="#"`, except the reused contact trigger if the live component uses one. External links use `https`. In the production view, no link points at a draft page.
8. Images inside `<main>`: every `<img>` has an `alt` (empty only for a decorative image) and `width` and `height`.
9. Residue: no `[FACT NEEDED`, `[VERIFY` or `[PERSON`; in the defaults and production views no `np-gap`; in the production view none of the preview chrome (draft banner, gaps panel, placeholders, `(planned)`, `data-draft-target`, `data-planned`).
10. Banned strings in `<main>`: `Benor Media` with a space, `Enterprise Partner`, `Official Webflow Partner`, any currency amount (millions and billions as on `/work` are fine).
11. Family rules: a commercial page has no byline row, no `<time>`, no "Rechecked" text. An article has the byline row with the expected values.

In the review view, markers replace part of the text, so checks 3 and 4 do not run there. The defaults view proves fidelity for the same files. Exit non-zero on any failure and print `file`, `check number` and the offending text. The production view also asserts that no `draft: true` page exists in `dist` and that every `draft: false` page does.

### 10.3 Look at it

For each of the six pages, screenshot the full page at 1440, 1024, 768 and 390 px (Playwright or whatever the repo has), then actually look at the images. Check: the hero at 390 px (no sideways scroll, H1 wraps in three lines or fewer); sections alternate sides at desktop and stack at phone width; the proof strip; the testimonial position; the accordion open and closed; tables scroll sideways on a phone; the table of contents; diagrams legible; focus rings visible; nothing overlaps the sticky header when you follow an anchor. Fix what you find. List what you could not fix in the report.

### 10.4 Budgets (preview, mobile profile)

- Lighthouse: Performance 90 or more, Accessibility 95 or more (aim for 100), Best Practices 95 or more, SEO 100 apart from the audit that flags `noindex` on previews.
- axe through `npx` (do not add it to `package.json`): no serious or critical findings. If the network blocks it, say so.
- Cumulative layout shift of 0.02 or less. No console warnings from new code.
- New client JavaScript across all new pages: 5 KB gzipped or less, no new font file, no new dependency.
- The full tab path works: hero buttons, accordion, links, table scroll regions.

## 11. Release procedure (a later task, not part of this one)

This is what happens to each page after Sergio and the content owner have read the preview. Release a companion pair on the same day: until both pages are released, the body link between them is plain text and the related item is left out (5.4).

1. **Gaps.** The content owner answers them in the Markdown file, or accepts the defaults with `node content-pack/scripts/apply-defaults.mjs content-pack/content/<slug>.md --write`. Use `--skip ID,ID` for gaps resolved by hand.
2. **Front matter.** `draft: false`. `publishedAt` and `updatedAt` set to the sign-off date. Volatile facts re-verified on that day and `volatileChecked` updated (the release check fails if it is older than 14 days). For guides, `author` set.
3. **Gate.** `pages:release-check content-pack/content/<slug>.md` passes. This is the strict form: it also fails when `volatileChecked` is older than 14 days, which the light gate inside the build (5.2) only warns about.
4. **Visuals.** Each `screenshot` has a real file in `src/assets/new-pages/<slug>/<n>.<ext>`, or the content owner deletes that entry from `visuals`.
5. **Lists of pages.** One line for the page in `public/llms.txt` (existing format, title and description from the front matter). One entry in the PAGES map of `scripts/check-seo.mjs`: schema types `Service`, `FAQPage`, `BreadcrumbList` for commercial pages and `Article`, `FAQPage`, `BreadcrumbList` for articles, and the `primaryKeyword`.
6. **Inbound links, in a separate pull request.** Add the links in the page's `inbound` front matter to the existing pages named there: one sentence and one link each, with the anchor text given. This edits live pages, so it goes through Sergio.
7. **Build and verify.** `pages:verify`: its production view now includes the released page. Then Sergio merges and deploys.
8. **After the deploy.** `node scripts/check-seo.mjs https://www.benormedia.com`, `node scripts/indexnow.mjs <url>`, Search Console URL Inspection and Request indexing, and the Rich Results Test on the live URL.

## 12. Report

Finish with this, in the chat and saved as `docs/new-pages-build-report.md` (commit it with T8). About a page and a half.

1. **What exists.** Branch, commits, the preview URL, the six routes, how to run locally and how to switch views.
2. **Component map as built.** For each block: reused, extended, sibling or created, with file paths. The new CSS variables you defined, with where each value came from.
3. **Checks.** The 10.1 diff result, `check-seo.mjs` before and after, `pages:verify` counts for the three views, the `LIVE_ALLOW` entries and `data-np-live` wrappers (10.2), the Lighthouse table, the axe result, and both T6 rehearsal results.
4. **Decisions you made** that this brief did not settle.
5. **Assets needed.** One line per placeholder: `slug:n`, what must be captured (from the `brief`), and the file path where it goes.
6. **Content issues.** Anything in the content files that is wrong, breaks `RULES.md` or does not fit a component, with file and line. You fixed none of them.
7. **Noticed, out of scope.** One line each.

## 13. Out of scope

- The live-site discrepancies listed in `CLAIMS-REGISTER.md` (the X items). Sergio knows.
- Navigation. The Services menu is Sergio's decision after launch. Until the inbound links go in at release, each new page is reachable only from the others.
- The `/guides` hub, the other pages in `data/plan.json`, and the German, UK and Spanish pages (deferred).
- Changing, adding or answering content, partner wording, claims, prices or tool names.
- Merging, pushing the base branch, deploying, or touching Sanity, Search Console, Bing, Vercel settings or DNS.

## Appendix A. Front matter: where each key goes

| Key | Output |
|---|---|
| `slug`, `url` | The route, and the canonical URL (`https://www.benormedia.com` plus `url`) |
| `pageType` | Selects the family (5.2) |
| `draft`, `blockedBy` | Gate (5.2 and 5.3). Never rendered |
| `title`, `description` | `<title>` and the meta description, verbatim |
| `h1` | The page H1 |
| `eyebrow` | The eyebrow on commercial pages. Articles use the section 8 label |
| `lang` | `inLanguage` in the Article JSON-LD. The `<html lang>` follows BaseLayout |
| `author` | Byline and Article JSON-LD (articles only) |
| `publishedAt`, `updatedAt` | Articles: the byline and JSON-LD. Commercial: `lastmod` only, never shown |
| `reviewEvery` | Articles: the recheck text. Commercial: never shown |
| `breadcrumb` | BreadcrumbList on every page, visible breadcrumb on articles (5.4) |
| `schema`, `service` | `service` feeds the Service object. The family decides which objects exist, and `schema` is checked against it |
| `testimonial`, `testimonialAfter` | The testimonial block (commercial only) |
| `closing` | The closing band heading and text (commercial only) |
| `faqHeading`, `faq` | The FAQ and the FAQPage JSON-LD |
| `takeaways` | Key takeaways (articles only) |
| `related` | Related links in the closing block (5.4) |
| `sources` | The source list (articles only) |
| `visuals` | Figures (5.9) |
| `inbound` | Never rendered. Input to the release step (section 11) |
| `volatile`, `volatileChecked`, `editorNotes` | Never rendered. Release gate and reviewer notes |
| `wave`, `primaryKeyword`, `secondaryKeywords`, `targetCountry`, `thirdPartyPrices`, `strictTools`, `hreflang` | Never rendered. Used by the checker or the plan |

## Appendix B. The six pages

As of 2026-10-07. The Markdown files win if this table and a file disagree. "Defaults applied" is the word count after every gap's default action runs.

| Slug | URL | Family | Words (as written / defaults applied) | H2s | Visuals (diagram / screenshot) | FAQ items | Testimonial | Open gaps |
|---|---|---|---|---|---|---|---|---|
| `webflow-migration` | `/webflow-migration` | commercial | 979 / 979 | 7 | 3 / 3 | 8 | surfe, after "SEO and AI search readiness are part of the build" | MIG-1, G6, MIG-7, MIG-3 |
| `b2b-saas-web-design` | `/b2b-saas-web-design` | commercial | 928 / 928 | 7 | 3 / 2 | 7 | both, after "B2B teams on our work page" | B2B-1, G8 |
| `webflow-enterprise-agency` | `/webflow-enterprise-agency` | commercial | 923 / 879 | 7 | 5 / 0 | 7 | puzzle, after "Strategy first, then a component system" | ENT-4, ENT-3, ENT-1, ENT-2, ENT-5, ENT-6, G2 |
| `wordpress-to-webflow-migration` | `/guides/wordpress-to-webflow-migration` | article | 1989 / 1989 | 7 | 1 / 0 | 6 | none | G1 |
| `b2b-saas-website-pages` | `/guides/b2b-saas-website-pages` | article | 2338 / 2338 | 9 | 1 / 0 | 6 | none | G1 |
| `webflow-enterprise` | `/guides/webflow-enterprise` | article | 2127 / 2127 | 7 | 1 / 0 | 6 | none | G1, G2 |

## Appendix C. The 19 visuals

The key is `<slug>:<n>`, numbered in file order. `Side` and `placed` come from the front matter. The suggested component is a starting point for T7. Every screenshot stays a placeholder.

| Key | Type | Side | Placed | Suggested component | Brief (verbatim from `visuals`) |
|---|---|---|---|---|---|
| `webflow-migration:1` | diagram | right | after "Start with a map of every URL" | MappingDiagram | Redirect map: a two-column list of old WordPress URLs and their new Webflow addresses, with the redirect type on each row. |
| `webflow-migration:2` | screenshot | left | after "Rebuild in Webflow with a component library" | (screenshot) | The Webflow Designer with a component library open: hero, feature, and pricing blocks. |
| `webflow-migration:3` | screenshot | right | after "Every page moved by hand, every redirect tested" | (screenshot) | Redirect test report: old URL, response code, destination URL, and a pass mark on each row. |
| `webflow-migration:4` | diagram | left | after "Plugins, forms, and integrations: what moves and what is replaced" | MappingDiagram | Two columns: what each WordPress plugin did, and what covers that job in Webflow. |
| `webflow-migration:5` | diagram | right | after "SEO and AI search readiness are part of the build" | OutlineDiagram | A page outline with labels on the heading structure, the schema markup, and the answer-ready sections. |
| `webflow-migration:6` | screenshot | left | after "Training, handoff, and support after launch" | (screenshot) | A marketer editing a page in Webflow during a live training session. |
| `b2b-saas-web-design:1` | diagram | right | after "The pages a SaaS buyer expects" | SiteMapDiagram | A site map with the home page on top and the other page types grouped by what the buyer is doing: learning, evaluating, deciding, and acting. |
| `b2b-saas-web-design:2` | screenshot | left | after "A component library your marketers can build from" | (screenshot) | A Webflow component library with hero, feature, integration, and pricing blocks. |
| `b2b-saas-web-design:3` | diagram | right | after "SEO and AI search built into the site" | OutlineDiagram | A page outline with labels on the heading structure, the schema markup, and the question-and-answer blocks. |
| `b2b-saas-web-design:4` | diagram | left | after "CRM, analytics, and forms wired in during the build" | HubDiagram | The website in the middle, connected to a CRM, analytics, marketing automation, and a custom API. |
| `b2b-saas-web-design:5` | screenshot | right | after "A team behind the site after launch" | (screenshot) | A shared Slack channel with a weekly update and a bug fix reported to a marketing lead. |
| `webflow-enterprise-agency:1` | diagram | right | after "Security and access questions answered up front" | RoleMapDiagram | A role map: who edits, who reviews, and who publishes, with the approval step between them. |
| `webflow-enterprise-agency:2` | diagram | left | after "Global sites in more than one language" | HubDiagram (language versions) | One site with several language versions, each pointing to the others, and a regional team beside each version. |
| `webflow-enterprise-agency:3` | diagram | right | after "Strategy first, then a component system" | TimelineDiagram | A timeline with the audit, the stakeholder sign-offs, the component library build, and the launch as separate steps. |
| `webflow-enterprise-agency:4` | diagram | left | after "Integrations and analytics wired in during the build" | HubDiagram | The website connected to a CRM, analytics, marketing automation, and custom API integrations. |
| `webflow-enterprise-agency:5` | diagram | right | after "A dedicated team and response times after launch" | HubDiagram (ring) | The support pod: team lead, project manager, designers, and developers around the client's marketing team. |
| `wordpress-to-webflow-migration:1` | diagram | full width | after "How do you migrate from WordPress to Webflow without losing SEO?" | FlowDiagram | A horizontal eight-step flow: benchmark, map URLs, rebuild, move content, redirect, test, launch, monitor. Text outside the image. |
| `b2b-saas-website-pages:1` | diagram | full width | after "Which pages does a B2B SaaS website need?" | SiteMapDiagram | A site map with the home page on top and the other page types grouped by what the buyer is doing: learning (resources), evaluating (product and use-case pages, integrations, comparison, and alternatives), deciding (pricing, customers and proof, security and trust), and acting (demo or contact). Text outside the image. |
| `webflow-enterprise:1` | diagram | full width | after "What does Webflow Enterprise offer?" | FlowDiagram | A left-to-right release path: branch a page, submit for review, approve, merge, publish to staging, publish to production, with the role that acts at each step written under it. Text outside the image. |
