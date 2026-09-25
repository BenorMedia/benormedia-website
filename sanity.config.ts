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
export default defineConfig({
  name: 'default',
  title: 'BenorMedia',
  basePath: '/studio',
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
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
