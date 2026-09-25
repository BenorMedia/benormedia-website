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

If code and docs disagree, docs win. If docs are missing a value: STOP, log it in `DECISIONS.md` under "Open questions", and use the closest existing token as a placeholder marked `/* TODO: DS */`.

## Hard rules
1. Never deploy to production. Never push or merge to `main`. Production is released by the project lead only.
2. Work on a feature branch from `dev`: `feat/<phase>-<short-name>`. Open a PR into `dev`. Vercel preview = staging.
3. Never invent design tokens, colors, sizes or copy. Placeholder copy is marked `TODO: COPY`.
4. Never delete content, files, schemas or Sanity documents unless the project lead asks explicitly.
5. Never edit `docs/DESIGN_SYSTEM.md` or `src/styles/tokens.css` without the project lead's confirmation.
6. Never commit secrets. Env vars live in `.env` (gitignored) and in Vercel.
7. Check for an existing component, class or token before creating a new one.
8. No shadows on any element (design rule).
9. `pnpm run build`, `pnpm run check` and `pnpm run lint` must pass before any handoff.

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
