/**
 * Our Work — pinned client document `_id`s for the shared `OurWork` section
 * (Home, Pricing). Order = render order (`getClientsByIds` preserves it).
 *
 * Moved from `src/pages/index.astro` in Phase 5 so every page that renders
 * `OurWork` shows the same clients. Change them here, not per page.
 */

/** 3×2 card grid. */
export const OUR_WORK_GRID_IDS: readonly string[] = [
  "client-surfe",
  "client-puzzle",
  "client-sprii",
  "client-arrows",
  "client-garaje-de-ideas",
  "client-simpletiger",
];

/** Client list under the grid (`ClientList limit={9}`). */
export const OUR_WORK_LIST_IDS: readonly string[] = [
  "client-unit21",
  "client-darwincx",
  "client-mashgin",
  "client-major-players",
  "client-hireart",
  "client-resourcify",
  "client-userled",
  "client-sublime-security",
  "client-notable-capital",
];
