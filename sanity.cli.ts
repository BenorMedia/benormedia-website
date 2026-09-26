import 'dotenv/config';
import { defineCliConfig } from 'sanity/cli';

// Minimal shim so TS `strictest` doesn't require @types/node just for this
// Node-only file. Runtime is Node, so `process` is always defined.
declare const process: { env: Record<string, string | undefined> };

/**
 * Sanity CLI config — read by commands like `sanity schema deploy`,
 * `sanity dataset export`, etc. Runtime is Node (not Vite), so we load
 * `.env` explicitly via dotenv and reuse the same `PUBLIC_SANITY_*` vars
 * the rest of the app uses (see `sanity.config.ts`, `astro.config.mjs`).
 */
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET;

export default defineCliConfig({
  api: {
    ...(projectId ? { projectId } : {}),
    ...(dataset ? { dataset } : {}),
  },
});
