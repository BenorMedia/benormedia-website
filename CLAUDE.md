# BenorMedia Website — Project Brain

Read this file fully before any task. It overrides default behavior.

## Project
New marketing site for BenorMedia (web agency). English only.
Design is approved in Figma. Build it faithfully. Never redesign, never prototype.

## Stack
- Astro (static output) + TypeScript (strict)
- Sanity (Studio embedded in this repo at `/studio`)
- Vanilla CSS (native nesting + custom properties). No Tailwind, no SASS.
- GSAP + ScrollTrigger via pnpm
- Vercel hosting. Sanity publish webhook → Vercel rebuild.
- Forms: Vercel serverless endpoint → Make webhook (PENDING CEO confirmation)

## Team
- **Project lead (human):** approves every phase, every merge to `dev`, and every production release.
- **Orchestrator (main Claude Code session):** plans, delegates to subagents, reviews their handoffs, keeps docs current. Never skips a checkpoint.
- **Subagents** (`.claude/agents/`): `astro`, `sanity`, `ui`, `qa`. They do not talk to each other directly. They communicate only through files in `/docs` and their handoff notes, routed by the orchestrator.

## Source of truth (read before working)
| Topic | File |
|---|---|
| Tokens, typography, buttons, layout | `docs/DESIGN_SYSTEM.md` |
| Pages and routes | `docs/SITEMAP.md` |
| Sanity ↔ Astro data contract | `docs/SCHEMAS.md` |
| Plan, current phase, Figma sync (Phase F) | `docs/BUILD_PLAN.md` |
| Decisions and open questions | `docs/DECISIONS.md` |
| Task reports | `docs/handoffs/` |

If code and docs disagree, docs win. If docs are missing a value: STOP, log it in `DECISIONS.md` (Global or the page section → Open questions → category, following "How this file works" at the top of that file), and use the closest existing token as a placeholder marked `/* TODO: DS */`.

The project lead does not read `DECISIONS.md`: the orchestrator relays open questions to the lead in chat, numbered and grouped by who answers.

## Hard rules
1. Never deploy to production. Never push or merge to `main`. Production is released by the project lead only.
2. Work on a feature branch from `dev`: `feat/<phase>-<short-name>`. Open a PR into `dev`. Vercel preview = staging.
3. Never invent design tokens, colors, sizes or copy. Placeholder copy is marked `TODO: COPY`.
4. Never delete content, files, schemas or Sanity documents unless the project lead asks explicitly.
5. Never edit `docs/DESIGN_SYSTEM.md` or `src/styles/tokens.css` without the project lead's confirmation.
6. Never commit secrets. Env vars live in `.env` (gitignored) and in Vercel.
7. Check for an existing component, class or token before creating a new one.
8. `pnpm run build`, `pnpm run check` and `pnpm run lint` must pass before any handoff.

## Class naming convention
- `c-` component: `c-hero`, `c-nav`
- `c-x__child` child element: `c-hero__title`
- `is-` state or variant modifier: `is-active`, `is-open`, `is-gradient`
- `cc-` utility, underscore after prefix: `cc-mt_32`, `cc-hidden`
- Typography classes keep their Figma names: `c-text_xxl`, `c-paragraph_s`, etc.
- kebab-case otherwise. No camelCase. No BEM `--` modifiers.

## Units
- `rem` for everything (root font-size is fluid, see DESIGN_SYSTEM §1).
- `em` only for padding that must follow a component's own font-size (buttons, tags).
- `px` only for borders, radius, blur, media queries.
- Breakpoints `767 / 991 / 1440`. Desktop-first (`max-width` queries).

## Folder structure
```
/
├─ CLAUDE.md
├─ .claude/agents/          subagent definitions
├─ .claude/settings.json    permissions (deny prod deploys, force push, .env reads)
├─ docs/                    source of truth + handoffs
├─ public/fonts/            brulia-display.woff2
├─ sanity/
│  ├─ schemaTypes/          documents/, objects/, singletons/, index.ts
│  └─ structure.ts          Studio desk structure
├─ sanity.config.ts
├─ astro.config.mjs
└─ src/
   ├─ components/
   │  ├─ ui/                Button, Tag, Eyebrow, Icon...
   │  ├─ layout/            Nav, Footer, Seo
   │  └─ sections/          HomeHero, FeaturedWork, ...
   ├─ layouts/BaseLayout.astro
   ├─ pages/
   ├─ styles/               tokens.css, base.css, typography.css, buttons.css, utilities.css
   ├─ scripts/animations/   one file per animation, initialized from BaseLayout
   ├─ scripts/ui/           shared UI behaviors (tabs.ts, client-previews.ts), imported by components
   └─ lib/sanity/           client.ts, queries.ts, types.ts, image.ts
```

## CSS rules
- Global CSS (`src/styles/`) holds only: tokens, reset/base, typography classes, buttons, utilities.
- Component styles live in the component's `<style>` block using convention class names.
- Use `var(--token)` only. Hardcoded colors or font sizes are rejected in review.

## Animation rules
- GSAP + ScrollTrigger only for animations marked GSAP in the spec. Simple hovers are CSS transitions.
- Every animation respects `prefers-reduced-motion`.
- Content must stay visible if JS fails (no hidden-by-default without a fallback).

## Handoff protocol
When a subagent finishes a task, it writes `docs/handoffs/YYYY-MM-DD_<agent>_<task>.md` from `docs/handoffs/_TEMPLATE.md`. The orchestrator reads it, sends it to `qa` if needed, updates `BUILD_PLAN.md`, and reports to the project lead.

## Commands
`pnpm run dev` · `pnpm run build` · `pnpm run check` (astro check) · `pnpm run lint`

---

# SEO content work (Claude Code kit, 2026-10-10)

Everything below comes from the benormedia.com Claude Code kit. It governs the SEO briefs in `docs/brief-*.md`, the copy in `docs/content/`, the review sheets `docs/review-*.md` and the slash commands in `.claude/skills/`. Two adaptations for this repo:

- **The base branch is `dev`** wherever the kit says `main`: facts sheet G1 in both briefs says so. `main` is production, and only the project lead releases to it (Hard rule 1).
- **Use `pnpm`**, not `npm`: `pnpm run build`, `pnpm run indexnow -- ...`. Hard rule 8 still applies before any handoff.

## benormedia.com (from the kit)

The marketing site of BenorMedia, a Webflow Professional Partner agency in Barcelona. The site itself is built with Astro, keeps its content in Sanity and deploys on Vercel; Discovery in each brief confirms the details. Owner: Sergio Gancedo.

### The rule for content work

Claude drafts, a person owns the facts and the final edit, and nothing publishes without that person's sign-off. This applies to every page on benormedia.com.

### Where the work is described

- **Briefs** in `docs/`: `docs/brief-next-pages.md`, `docs/brief-headless-guide.md`, and the pilot brief `docs/page-webflow-migration.md` if present. Each has a Discovery section, numbered tasks, a facts sheet, a release gate and a report format.
- **Copy** in `docs/content/*.md`, one file per page. It's the source of truth for every visible word.
- **Review sheets** in `docs/review-*.md`: one numbered row per factual sentence, with columns for the person's answer and the date, and the statuses `ok`, `open`, `confirmed` and `removed`.
- **Pilot log** in `docs/pilot-log.md` (from the pilot; create it if it's missing): the person-minutes spent per page.

Start every new branch by reading the brief the user names and doing its Discovery section. Show the findings, then stop until the person replies. When you continue an existing branch, read the brief and show where the branch stands before editing. If this file and a brief disagree, the brief wins for that task; if you're unsure, ask.

Current workstreams (check `git branch -a` for their real state):

| Branch | Brief | Pages |
|---|---|---|
| `seo/next-pages` | `docs/brief-next-pages.md`, Part 1 | `/website-redesign`, `/webflow-seo-agency`, `/cybersecurity-web-design`, `/aeo-agency` |
| `seo/work-joor` | `docs/brief-next-pages.md`, Part 2 | case study template, `/work/joor` |
| `seo/headless-guide` | `docs/brief-headless-guide.md` | `/guides/webflow-vs-custom-code`, `/headless-cms-agency` |

The slash commands in `.claude/skills/` start or continue each one: `/seo-headless-guide`, `/seo-next-pages`, `/seo-work-joor`, then `/seo-revise <brief>` and `/seo-release <brief>` (add `hold <page URL>` to hold one page back).

### Content files

- Use the visible copy word for word: headings, body, list items, table captions and cells, FAQ questions and answers, sources, link targets and anchors. Don't rewrite, add or cut.
- Lines starting with `>` are builder notes and never appear on a page. Labels such as `- Eyebrow:`, `- Tags:`, `- Button:`, `- Table caption:`, `- Callout:` and `- Byline:` are visible copy.
- You may write alt text the file doesn't give, `aria-label`s and file names. Keep them plain and free of claims.
- Markers: `[FACT NEEDED: ...]`, `[VERIFY: ...]`, `[PERSON: ...]`, `[QUOTE: ...]` and `[RESULT NEEDED: ...]`. They stay visible in the data file and the preview, never in comments. Never resolve a marker with a guess, an estimate or a "typical" figure.
- Claims come in tiers: A is already on benormedia.com, B is an outside fact with a primary source, C is anything else about BenorMedia, which only a person can confirm. Reuse a tier A claim only if it's still on the live site.
- If a sentence doesn't fit its component, or contradicts the repo or the live site, stop and ask, or list it in the report.

### House style for visible copy

- "Webflow Professional Partner" is the only partner wording. Never "Enterprise Partner", "Official Webflow Partner" or "certified partner".
- The brand is "BenorMedia", one word.
- No BenorMedia prices, ranges, tiers or discounts. Name plans and link to `/pricing`. Third-party amounts are written in words, such as "30,000 dollars", so the price check doesn't trip.
- No promises or guarantees, except in sentences that deny them.
- Don't name BenorMedia's own tools (Ahrefs, Surfer, Trakkr, Screaming Frog). One exception: Ahrefs as the publisher of a cited study on `/webflow-seo-agency` and `/aeo-agency`.
- Don't name other agencies or copy competitor wording. CMS vendors, frameworks and hosts are fine.
- No em dashes, and no spaced en dashes.
- Write in US English.
- Service pages end their H2s with a full stop. Guides use question H2s, as on the live guides.

### Building pages

- Follow the pattern of `/webflow-migration`. Put all visitor-facing copy in a data file with `export const DRAFT = true;`, `publishedAt` and `updatedAt`, and pass `noindex` while `DRAFT` is true.
- Reuse existing components. Build a new one only when a brief allows it, from the site's existing CSS variables.
- Emit JSON-LD through the shared helper, with `provider` or `publisher` pointing to the shared Organization `@id`. Never add `offers`.
- Feed the visible FAQ and the `FAQPage` markup from one array. Links in answers become plain anchor text in `acceptedAnswer.text`. Google retired FAQ rich results on 2026-05-07: keep `FAQPage`, and validate it with validator.schema.org instead of the Rich Results Test.
- Use real tables with `<caption>` and `<th scope="col">`. At 390 px a table may scroll inside its wrapper; the page itself must never overflow.
- Never bake text into images.
- Add each new page to the `PAGES` map in `scripts/check-seo.mjs`. Set `LASTMOD` in `astro.config.*` for every new or changed page. Add a `public/llms.txt` line only in the release commit.
- Leave navigation, positioning copy, existing JSON-LD and other pages alone, except where a brief's link task says otherwise.

### Git and safety

- Use one branch per brief or part, from the base branch the brief names, with one commit per task. Messages are conventional: `feat(seo): ...`, `chore(seo): ...`, `docs(seo): ...`.
- Never merge into the base branch, force-push, push the base branch or deploy. A person merges and deploys.
- Merging the base branch into a feature branch is fine when a brief or the person asks for it. Use a normal merge, never a rebase. Then rerun the build and the checks before you push, including `check-draft.mjs --release` and the review gate if the release commit is already in.
- Push the feature branch when a brief asks for a preview, and again after a revision or release commit, so the preview and the pull request stay current. Always name the branch: `git push -u origin <feature branch>`. `.claude/settings.json` asks for approval on every push and blocks a bare `git push` or `git push origin HEAD`.
- Get preview URLs from the pull request or GitHub's deployment status (`gh`), or ask the person. The Vercel CLI is blocked.
- Before you check out an existing feature branch, run `git ls-tree <branch> -- CLAUDE.md .claude/settings.json`. If either file is missing, the branch predates these rules: stop and ask. Once the person agrees, switch and merge in one command, `git switch <branch> && git merge --no-edit <base branch>`, so the settings never leave the working tree.
- Never touch DNS, registrar settings, mail records, tokens, credentials or `.env` files.
- Add no runtime dependencies.

### Checks

```bash
npm run build
node scripts/check-seo.mjs dist
node scripts/check-draft.mjs <page file> <data file>             # preview: lists markers
node scripts/check-draft.mjs --release <page file> <data file>   # release: fails on any marker or DRAFT = true
for f in docs/review-<page>.md; do grep -qE '^\| *[0-9]+ *\|' "$f" 2>/dev/null || echo "MISSING OR EMPTY: $f"; grep -nHE '^\| *[0-9]+ *\|' "$f" 2>/dev/null | grep -viE '\| *`?(ok|confirmed|removed)`? *\| *$' || true; done   # review gate: list every sheet being released; must print nothing
```

- Look at every page at 1440 px and 390 px.
- **Release gate:** the release commit happens only when the person has approved those pages ("approved" in the conversation, or "Approved to publish (yes or no): yes" in each review sheet's sign-off block), every review-sheet row is `ok`, `confirmed` or `removed` (the review gate, run on the feature branch where the sheets live, prints nothing), and, after the release edits, `check-draft.mjs --release`, the build and `check-seo.mjs` pass. If any of these fails, don't commit; undo the release edits and ask.

### Reports

End each run with the report format in the brief:

- each task's status and the files changed;
- the output of the checks and the preview URLs;
- word counts against the brief;
- open markers, grouped by facts sheet item;
- visuals still to make;
- choices you made that the brief didn't decide.

Then give three lists: what the person must do, what you couldn't verify, and what you noticed but left alone.

### Lessons from earlier briefs

- Never rephrase a claim to keep it alive without its fact; delete it instead.
- A draft testimonial stays inside its `[QUOTE: ...]` marker until the client approves the words.
- Don't pad a page to reach a word count from Surfer or anywhere else.
- Don't link to pages that don't exist yet. If one page is held back, turn the links to it into plain text and list them in the report.
- A held page moves to a `seo/hold-...` branch before the release, as the brief describes. When it's ready, copy its files onto a new branch from the base branch. Never merge the base branch into the hold branch: Git would delete the page.
- Keep related pages from repeating each other word for word. The guide and the service page answer similar questions in different words on purpose.
- Webflow Collection pages can sit inside a folder (`/folder/collection/item`), so don't write that CMS URLs are always `/collection/item`.
