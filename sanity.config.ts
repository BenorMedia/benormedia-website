import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { table } from '@sanity/table';

import { schemaTypes, SINGLETON_TYPES } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

// Studio config for the embedded Sanity Studio at /studio.
//
// projectId + dataset are read from environment (never hardcoded) so the
// same config works in local, preview, and production. `basePath` must match
// `studioBasePath` in astro.config.mjs.
//
// Dual-runtime env lookup:
//   - Vite (Studio bundle) exposes PUBLIC_* via `import.meta.env`.
//   - Node (Sanity CLI, e.g. `sanity schema deploy`) exposes them via
//     `process.env` after `sanity.cli.ts` loads `.env` via dotenv.
declare const process: { env: Record<string, string | undefined> } | undefined;

const projectId =
  import.meta.env.PUBLIC_SANITY_PROJECT_ID ??
  (typeof process !== 'undefined' ? process.env.PUBLIC_SANITY_PROJECT_ID : undefined);
const dataset =
  import.meta.env.PUBLIC_SANITY_DATASET ??
  (typeof process !== 'undefined' ? process.env.PUBLIC_SANITY_DATASET : undefined);

export default defineConfig({
  name: 'default',
  title: 'BenorMedia',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [structureTool({ structure }), table()],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Prevent duplicating or deleting singletons (see SINGLETON_TYPES in schemaTypes/index.ts).
    actions: (prev, context) => {
      if (SINGLETON_TYPES.has(context.schemaType)) {
        return prev.filter(
          (action) => !['duplicate', 'delete'].includes(action.action ?? ''),
        );
      }
      return prev;
    },
    // Prevent editors from creating another instance of a singleton from the "+ New" menu.
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (template) => !SINGLETON_TYPES.has(template.templateId),
        );
      }
      return prev;
    },
  },
});
