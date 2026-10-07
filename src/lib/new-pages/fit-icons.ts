/**
 * Fit card icons (lead 2026-10-07): the 3D icon set in Figma BenorMedia
 * node 3142:1619461 ("Outcomes"), each with the window and crop the Figma
 * gives it (1920 frame: px ÷ 14 = rem). A card gets the first icon whose
 * keywords match its title (then its text); none → the speedometer, as in
 * Figma 3696:7378. Keywords describe the message, never a page, so new
 * pages pick icons without code changes.
 */
import type { ImageMetadata } from "astro";
import speed from "../../assets/new-pages/icons/speed.png";
import cms from "../../assets/new-pages/icons/cms.png";
import design from "../../assets/new-pages/icons/design.png";
import code from "../../assets/new-pages/icons/code.png";
import puzzle from "../../assets/new-pages/icons/puzzle.png";
import api from "../../assets/new-pages/icons/api.png";
import crm from "../../assets/new-pages/icons/crm.png";
import ada from "../../assets/new-pages/icons/ada.png";
import palette from "../../assets/new-pages/icons/palette.png";
import geo from "../../assets/new-pages/icons/geo.png";
import seo from "../../assets/new-pages/icons/seo.png";
import cro from "../../assets/new-pages/icons/cro.png";
import content from "../../assets/new-pages/icons/content.png";
import gdpr from "../../assets/new-pages/icons/gdpr.png";
import devices from "../../assets/new-pages/icons/devices.png";

export interface FitIcon {
  src: ImageMetadata;
  /** Figma window, px at the 1920 frame. */
  width: number;
  height: number;
  /** Image box inside the window, % of it; `undefined` = fills it. */
  crop?: { w: number; h: number; left: number; top: number };
}

export const FIT_ICONS = {
  speed: { src: speed, width: 40.05, height: 40, crop: { w: 169.72, h: 169.93, left: -34.86, top: -28.84 } },
  cms: { src: cms, width: 37.922, height: 40, crop: { w: 161.71, h: 153.31, left: -30.86, top: -22.49 } },
  design: { src: design, width: 30.973, height: 30, crop: { w: 145.37, h: 150.08, left: -22.68, top: -25.04 } },
  code: { src: code, width: 43.574, height: 40, crop: { w: 145.71, h: 158.73, left: -22.85, top: -29.36 } },
  puzzle: { src: puzzle, width: 39.262, height: 40 },
  api: { src: api, width: 44.276, height: 40, crop: { w: 151.96, h: 168.21, left: -25.98, top: -34.1 } },
  crm: { src: crm, width: 40.156, height: 40 },
  ada: { src: ada, width: 39.938, height: 40 },
  palette: { src: palette, width: 35.497, height: 40, crop: { w: 162.04, h: 143.8, left: -31.02, top: -27.05 } },
  geo: { src: geo, width: 34.123, height: 40, crop: { w: 175.93, h: 150.08, left: -39.29, top: -25.04 } },
  seo: { src: seo, width: 38.238, height: 40 },
  cro: { src: cro, width: 31.126, height: 40, crop: { w: 159.71, h: 124.28, left: -29.86, top: -16.11 } },
  content: { src: content, width: 35.099, height: 30 },
  gdpr: { src: gdpr, width: 37.004, height: 40 },
  devices: { src: devices, width: 39.156, height: 40, crop: { w: 139.29, h: 136.35, left: -12.71, top: -18.18 } },
} satisfies Record<string, FitIcon>;

type IconName = keyof typeof FIT_ICONS;

/** Message → icon, first match wins (title is tested before the text). */
const RULES: [RegExp, IconName][] = [
  [/health|hipaa|privacy|gdpr|ccpa|member|login|gated|password|secur/i, "gdpr"],
  [/certif|audit|document|contract|paperwork/i, "content"],
  [/partner status|shortlist|check that|compare|review/i, "seo"],
  [/language|locale|region|office|country|global|location/i, "geo"],
  [/content library|cms|collection|item count/i, "cms"],
  [/plugin|extension|add-on/i, "puzzle"],
  [/codebase|engineering|developer|custom code/i, "code"],
  [/integration|api|connect/i, "api"],
  [/product (interface|application)|app\b|logged-in|dashboard|in-app|device|browser/i, "devices"],
  [/store|commerce|checkout|catalog|positioning|conversion|funnel|audience/i, "cro"],
  [/team|owner|own the site|nobody|person|people|crm/i, "crm"],
  [/one page|template|page builder|design system|layout/i, "design"],
  [/brand|illustrat|creative/i, "palette"],
  [/accessib|ada\b/i, "ada"],
  [/speed|performance|fast/i, "speed"],
];

export function fitIconFor(title: string, text: string): FitIcon {
  for (const source of [title, text]) {
    for (const [re, name] of RULES) if (re.test(source)) return FIT_ICONS[name];
  }
  return FIT_ICONS.speed;
}
