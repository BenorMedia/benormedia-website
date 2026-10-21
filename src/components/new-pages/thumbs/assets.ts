/**
 * Card thumbnail assets (Figma BenorMedia 3736:7123, lead 2026-10-18):
 * the 3D icons (the Home services set plus the new ones from the file),
 * the tool logos and the large 3D objects. Files in
 * `public/images/new-pages/thumbs/` (WebP, resized from the Figma export).
 */
import { ICON } from "../illustrations/assets";

const TH = "/images/new-pages/thumbs";

/** New 3D icons from the thumbnails file. */
const NEW_ICON = {
  accessibility: { src: `${TH}/icons/accessibility.webp`, w: 160, h: 158 },
  codeBlocks: { src: `${TH}/icons/code.webp`, w: 160, h: 103 },
  contentStack: { src: `${TH}/icons/content-stack.webp`, w: 150, h: 160 },
  crmCard: { src: `${TH}/icons/crm-card.webp`, w: 159, h: 160 },
  designGrid: { src: `${TH}/icons/design-grid.webp`, w: 160, h: 160 },
  devices3d: { src: `${TH}/icons/devices.webp`, w: 158, h: 160 },
  funnelTarget: { src: `${TH}/icons/funnel-target.webp`, w: 123, h: 160 },
  geoPin: { src: `${TH}/icons/geo-pin.webp`, w: 135, h: 160 },
  palette: { src: `${TH}/icons/palette.webp`, w: 142, h: 160 },
  pencilDoc: { src: `${TH}/icons/pencil-doc.webp`, w: 149, h: 160 },
  plugs: { src: `${TH}/icons/plugs.webp`, w: 160, h: 109 },
  puzzle3d: { src: `${TH}/icons/puzzle.webp`, w: 156, h: 160 },
  seoChart: { src: `${TH}/icons/seo-chart.webp`, w: 157, h: 160 },
  shieldLock: { src: `${TH}/icons/shield.webp`, w: 147, h: 160 },
  speedGauge: { src: `${TH}/icons/speed.webp`, w: 160, h: 158 },
} as const;

export interface ThAsset {
  src: string;
  w: number;
  h: number;
}

/** Every icon a thumbnail can use: the illustration set and the new one. */
export const TH_ICON: Record<keyof typeof ICON | keyof typeof NEW_ICON, ThAsset> = { ...ICON, ...NEW_ICON };
export type ThIcon = keyof typeof TH_ICON;

/** Tool logos (only products an article names). */
export const TH_LOGO = {
  webflow: { src: `${TH}/logos/webflow.webp`, w: 96, h: 60 },
  figma: { src: `${TH}/logos/figma.webp`, w: 64, h: 96 },
  claude: { src: `${TH}/logos/claude.webp`, w: 96, h: 96 },
  hubspot: { src: `${TH}/logos/hubspot.webp`, w: 92, h: 96 },
  salesforce: { src: `${TH}/logos/salesforce.webp`, w: 96, h: 67 },
  pipedrive: { src: `${TH}/logos/pipedrive.webp`, w: 96, h: 96 },
  googleAnalytics: { src: `${TH}/logos/google-analytics.webp`, w: 96, h: 96 },
  hotjar: { src: `${TH}/logos/hotjar.webp`, w: 86, h: 96 },
  sanity: { src: `${TH}/logos/sanity.webp`, w: 73, h: 96 },
  contentful: { src: `${TH}/logos/contentful.webp`, w: 85, h: 96 },
  storyblok: { src: `${TH}/logos/storyblok.webp`, w: 82, h: 96 },
} as const;
export type ThLogo = keyof typeof TH_LOGO;

/** Logo cards cut from a lead-supplied thumbnail (logo on white, no border). */
export const TH_CARD = {
  php: { src: `${TH}/logos/php-card.webp`, w: 354, h: 211 },
  webflow: { src: `${TH}/logos/webflow-card.webp`, w: 527, h: 126 },
} as const satisfies Record<string, ThAsset>;
export type ThCardName = keyof typeof TH_CARD;

/** Large 3D objects (cut from the file's object sheet). */
export const TH_OBJECT = {
  seoChart: { src: `${TH}/art/object-seo-chart.webp`, w: 241, h: 254 },
  globePeople: { src: `${TH}/art/object-globe-people.webp`, w: 286, h: 251 },
  lightbulb: { src: `${TH}/art/object-lightbulb.webp`, w: 230, h: 253 },
  cubes: { src: `${TH}/art/object-cubes.webp`, w: 292, h: 284 },
  linkedRings: { src: `${TH}/art/object-linked-rings.webp`, w: 305, h: 259 },
  shield: { src: `${TH}/art/object-shield.webp`, w: 242, h: 281 },
  rocket: { src: `${TH}/art/object-rocket.webp`, w: 250, h: 270 },
  deviceStack: { src: `${TH}/art/object-device-stack.webp`, w: 262, h: 264 },
  padlockHeart: { src: `${TH}/art/object-padlock-heart.webp`, w: 261, h: 224 },
} as const;
export type ThObjectName = keyof typeof TH_OBJECT;

/** Decorative SVGs from the file, with their own sizes. */
export const TH_SVG = {
  domeOuter: { src: `${TH}/art/dome-ellipse-outer.svg`, w: 685, h: 685 },
  domeMid: { src: `${TH}/art/dome-ellipse-mid.svg`, w: 567, h: 567 },
  domeLines: { src: `${TH}/art/dome-lines.svg`, w: 414, h: 171 },
  domeInner: { src: `${TH}/art/dome-ellipse-inner.svg`, w: 359, h: 359 },
  domeGlow: { src: `${TH}/art/dome-glow.svg`, w: 213, h: 213 },
  logosGlow: { src: `${TH}/art/logos-glow.svg`, w: 682, h: 771 },
  orbitGlow: { src: `${TH}/art/orbit-glow.svg`, w: 682, h: 682 },
  orbitRings: { src: `${TH}/art/orbit-rings.svg`, w: 545, h: 545 },
  objectGrid: { src: `${TH}/art/object-grid.svg`, w: 1272, h: 197 },
} as const satisfies Record<string, ThAsset>;

export interface ThItem {
  icon: ThIcon;
  label: string;
}
