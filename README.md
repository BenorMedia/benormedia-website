# benormedia-website

Marketing site for BenorMedia. Astro (static output) + TypeScript strict + embedded Sanity Studio at `/studio`, deployed to Vercel.

Read `CLAUDE.md` and `docs/BUILD_PLAN.md` before making changes.

## Requirements

- Node `>=22.12.0` (see `.nvmrc`)
- pnpm (see `packageManager` in `package.json`)

## Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                           |
| :---------------- | :----------------------------------------------- |
| `pnpm install`    | Installs dependencies                            |
| `pnpm dev`        | Starts local dev server at `localhost:4321`      |
| `pnpm build`      | Build the production site to `./dist/`           |
| `pnpm preview`    | Preview the build locally                        |
| `pnpm check`      | Run `astro check` (TypeScript diagnostics)       |
| `pnpm lint`       | Run ESLint                                       |
| `pnpm format`     | Format files with Prettier                       |
| `pnpm astro ...`  | Run CLI commands like `astro add`, `astro check` |

## Structure

See `CLAUDE.md` for the canonical folder layout.
