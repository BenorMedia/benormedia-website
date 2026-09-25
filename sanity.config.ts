import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { schemaTypes } from './sanity/schemaTypes';

// Studio config for the embedded Sanity Studio at /studio.
//
// Phase 0 scope: minimal stub so `/studio` boots and `pnpm build` succeeds.
// Real desk structure, vision tool, and schemas land in Phase 2 per
// docs/SCHEMAS.md.
//
// projectId + dataset are read from environment (never hardcoded) so the
// same config works in local, preview, and production. `basePath` must match
// `studioBasePath` in astro.config.mjs.
export default defineConfig({
  name: 'default',
  title: 'BenorMedia',
  basePath: '/studio',
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
