/**
 * About page (/about) — copy and placeholder photo manifest, Figma 3790:37097
 * (DECISIONS → About, 2026-10-21). No Sanity: copy lives in code like
 * `/work` and `/case-studies`.
 *
 * TODO: COPY — every text below is the Figma text word for word, including
 * the lorem ipsum, the "dolot" typo and the "+XXX%" values. The values texts
 * and the team block ("A team that builds with AI") look final but are not
 * confirmed. Replace before the page goes to `main`.
 *
 * TODO: ASSET (replace before release) — every photo in `PHOTOS` is a
 * third-party placeholder (another agency's site). The files live in
 * `src/assets/about/_placeholder/` and are NEVER imported into the Vite
 * graph: `src/pages/about/photos/[file].ts` reads them from disk and emits
 * them only in non-production builds (see that file). Alt text is generic on
 * purpose (never the names in the Figma layers).
 */

export interface AboutPhoto {
  /** File name in `src/assets/about/_placeholder/`. */
  file: string;
  /** Intrinsic size of the WebP (2x of the Figma box at 1440, capped at the
   *  source size; each file is pre-cropped to its Figma box). */
  w: number;
  h: number;
  alt: "Team photo" | "Office photo" | "City photo";
}

/** Public URL of a placeholder photo (served by the photos endpoint). */
export const PHOTO_BASE = "/about/photos";
export const photoSrc = (p: AboutPhoto): string => `${PHOTO_BASE}/${p.file}`;

// TODO: ASSET (replace before release)
export const PHOTOS = {
  "strip-01": { file: "strip-01.webp", w: 840, h: 1068, alt: "City photo" },
  "strip-02": { file: "strip-02.webp", w: 840, h: 718, alt: "City photo" },
  "strip-03": { file: "strip-03.webp", w: 669, h: 851, alt: "Office photo" },
  "strip-04": { file: "strip-04.webp", w: 687, h: 523, alt: "Team photo" },
  "strip-05": { file: "strip-05.webp", w: 588, h: 748, alt: "Team photo" },
  "strip-06": { file: "strip-06.webp", w: 840, h: 840, alt: "City photo" },
  "office-01": { file: "office-01.webp", w: 1024, h: 509, alt: "Office photo" },
  "office-02": { file: "office-02.webp", w: 452, h: 534, alt: "Office photo" },
  "office-03": { file: "office-03.webp", w: 627, h: 741, alt: "Office photo" },
  "office-04": { file: "office-04.webp", w: 522, h: 617, alt: "Office photo" },
  "team-01": { file: "team-01.webp", w: 160, h: 168, alt: "Team photo" },
  "team-02": { file: "team-02.webp", w: 160, h: 168, alt: "Team photo" },
  "team-03": { file: "team-03.webp", w: 288, h: 302, alt: "Team photo" },
  "team-04": { file: "team-04.webp", w: 153, h: 160, alt: "Team photo" },
  "team-05": { file: "team-05.webp", w: 153, h: 160, alt: "Team photo" },
  "team-06": { file: "team-06.webp", w: 288, h: 302, alt: "Team photo" },
  "team-07": { file: "team-07.webp", w: 153, h: 160, alt: "Team photo" },
  "team-08": { file: "team-08.webp", w: 288, h: 302, alt: "Team photo" },
  "team-09": { file: "team-09.webp", w: 153, h: 160, alt: "Team photo" },
  "team-10": { file: "team-10.webp", w: 288, h: 302, alt: "Team photo" },
  "team-11": { file: "team-11.webp", w: 153, h: 160, alt: "Team photo" },
} as const satisfies Record<string, AboutPhoto>;

type PhotoKey = keyof typeof PHOTOS;

// --- Hero ------------------------------------------------------------------
// TODO: COPY (description is Figma lorem ipsum)
export const ABOUT_HERO = {
  eyebrow: "About us",
  title: "About us",
  description:
    "Lorem ipsum dolor sit amet consectetur. Libero non nisl dictum morbi sed eu condimentum. Sit eget amet ac sagittis nam in pharetra nec.",
};

/** Hero photo strip (Figma 3815:27358): six 420px cards, each photo
 *  bottom-aligned at its Figma height (px). TODO: ASSET */
export const ABOUT_GALLERY: readonly { photo: AboutPhoto; height: number }[] = [
  { photo: PHOTOS["strip-01"], height: 534 },
  { photo: PHOTOS["strip-02"], height: 359 },
  { photo: PHOTOS["strip-03"], height: 534 },
  { photo: PHOTOS["strip-04"], height: 320 },
  { photo: PHOTOS["strip-05"], height: 534 },
  { photo: PHOTOS["strip-06"], height: 420 },
];

// --- Core values -------------------------------------------------------------
// TODO: COPY (confirm: Figma text, looks final but unconfirmed)
export const ABOUT_VALUES = {
  title: "Our core values",
  description:
    "Our values are essential to who we are. They reflect what we expect from each other and inform every decision we make.",
  items: [
    {
      name: "Execution",
      icon: "/images/about/value-execution.webp",
      text: "Making the wrong decision and learning from it is more valuable than making no decision at all. We make mistakes but we fall forward so we are always actively progressing as a team.",
    },
    {
      name: "Curiosity",
      icon: "/images/about/value-curiosity.webp",
      text: "We're always looking for ways to learn and push past our comfort zones. We believe that openly sharing our perspectives will help us reach outcomes others can’t.",
    },
    {
      name: "Humility",
      icon: "/images/about/value-humility.webp",
      text: "We're honest about the limits of our strengths, which lets us fill each other's gaps. Removing ego from the equation means we work better together and improve our odds of success.",
    },
    {
      name: "Empathy",
      icon: "/images/about/value-empathy.webp",
      text: "Understanding every stakeholder's perspective helps us see the real challenge underneath. That extra effort to find alignment builds trust within the team and with our partners.",
    },
  ],
} as const;

// --- Stats -------------------------------------------------------------------
// TODO: COPY (Figma lorem ipsum and "+XXX%" placeholders; stats are claims
// about BenorMedia a person must confirm)
export const ABOUT_STATS = {
  title: "Lorem ipsum dolot sit amet",
  description:
    "Lorem ipsum dolor sit amet consectetur. Maecenas blandit consequat maecenas vel malesuada. Id facilisis etiam urna fermentum quisque porttitor.",
  items: [
    { value: "+XXX%", text: "Lorem ipsum dolor sit amet consectetur. At risus nulla in vel. Nisl duis cursus consectetur nisl etiam." },
    { value: "+XX%", text: "Lorem ipsum dolor sit amet consectetur. At viverra nisi purus mauris. Ornare consequat magna urna." },
    { value: "+XXX%", text: "Lorem ipsum dolor sit amet consectetur. At viverra nisi purus mauris. Ornare consequat magna urna." },
    { value: "+X%", text: "Lorem ipsum dolor sit amet consectetur. Odio pellentesque semper tincidunt lacinia malesuada purus sed nisi in." },
  ],
} as const;

// --- Office ------------------------------------------------------------------
// TODO: COPY (Figma lorem ipsum)
export const ABOUT_OFFICE = {
  stampLabel: "Barcelona, Spain.",
  title: "Lorem ipsum dolot sit amet",
  description:
    "Lorem ipsum dolor sit amet consectetur. Maecenas blandit consequat maecenas vel malesuada. Id facilisis etiam urna fermentum quisque porttitor.",
  // TODO: ASSET (replace before release)
  wide: PHOTOS["office-01"],
  row: [PHOTOS["office-02"], PHOTOS["office-03"], PHOTOS["office-04"]],
};

// --- Team wall ---------------------------------------------------------------
// TODO: COPY (confirm: Figma text, looks final but unconfirmed)
export const ABOUT_TEAM = {
  title: "A team that builds with AI",
  description:
    "AI is part of everyday work here, from research to code and QA. We test new tools before being told to, and the final call still comes from people.",
  label: "What stays human",
  traits: ["Curiosity", "Taste", "Judgement"],
};

/** A wall tile: a photo key, `null` for an empty light tile. `plain` = the
 *  Figma tile has no visible border (its border is the tile color). */
export type TeamTile = { photo: PhotoKey; plain?: boolean } | null;

/** Nine staggered columns (Figma 3796:42118): `offset` = Figma padding-top
 *  in px, tiles top to bottom. TODO: ASSET (replace before release) */
export const ABOUT_TEAM_WALL: readonly { offset: number; tiles: readonly TeamTile[] }[] = [
  { offset: 130.312, tiles: [{ photo: "team-01" }, null, { photo: "team-02", plain: true }, null] },
  { offset: 38.328, tiles: [null, { photo: "team-03", plain: true }, null, { photo: "team-04" }] },
  { offset: 84.313, tiles: [{ photo: "team-05" }, null] },
  { offset: 0, tiles: [null, { photo: "team-06" }] },
  { offset: 53.656, tiles: [{ photo: "team-07" }, null] },
  { offset: 15.328, tiles: [null, { photo: "team-08" }] },
  { offset: 92, tiles: [{ photo: "team-09" }, null] },
  { offset: 30.656, tiles: [{ photo: "team-10" }, null, null, null] },
  { offset: 114.984, tiles: [null, { photo: "team-11" }, null, null] },
];

// --- Leadership --------------------------------------------------------------
// TODO: COPY (Figma lorem ipsum). The grid shows Sergio six times, as in
// Figma, for Sergio's review (DECISIONS → About 2026-10-21).
export const ABOUT_LEADERS = {
  title: "Lorem ipsum dolot sit amet",
  description:
    "Lorem ipsum dolor sit amet consectetur. Maecenas blandit consequat maecenas vel malesuada. Id facilisis etiam urna fermentum quisque porttitor.",
  /** Author slugs (`AUTHORS`, src/lib/new-pages/authors.ts), in grid order. */
  slugs: ["sergio-gancedo", "sergio-gancedo", "sergio-gancedo", "sergio-gancedo", "sergio-gancedo", "sergio-gancedo"],
};

/** Every placeholder photo file, for the photos endpoint. */
export const ALL_PHOTOS: readonly AboutPhoto[] = Object.values(PHOTOS);

/** Px from the Figma 1920 frame → rem (14px base, DESIGN_SYSTEM §1). */
export const figmaRem = (px: number): string => `${+(px / 14).toFixed(3)}rem`;
