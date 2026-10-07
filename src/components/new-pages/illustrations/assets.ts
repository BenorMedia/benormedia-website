/**
 * Illustration assets (lead 2026-10-07, Figma BenorMedia 3702:9167): the
 * soft 3D icons (the Home services diagram's WebPs, plus the fit-card set
 * cropped as in Figma) and the tool logos from the Figma "Aside" panel.
 * `w` / `h` are the files' pixel sizes (for width / height attributes).
 */
const HOME = "/images/home/services-diagram";
const NP = "/images/new-pages";

export interface IlAsset {
  src: string;
  w: number;
  h: number;
}

export const ICON = {
  ux: { src: `${HOME}/ux-research-and-strategy.webp`, w: 109, h: 112 },
  systems: { src: `${HOME}/scalable-systems.webp`, w: 147, h: 112 },
  graphics: { src: `${HOME}/custom-graphics-and-videos.webp`, w: 117, h: 112 },
  cms: { src: `${HOME}/crm-setup-and-integrations.webp`, w: 117, h: 109 },
  techSeo: { src: `${HOME}/technical-seo-and-aeo-optimization.webp`, w: 117, h: 132 },
  research: { src: `${HOME}/seo-geo-research.webp`, w: 83, h: 112 },
  ai: { src: `${HOME}/ai-visibility.webp`, w: 119, h: 112 },
  docPencil: { src: `${HOME}/content-production.webp`, w: 96, h: 112 },
  funnel: { src: `${HOME}/cro-strategy.webp`, w: 110, h: 112 },
  analytics: { src: `${HOME}/analytics.webp`, w: 74, h: 112 },
  reporting: { src: `${HOME}/reporting-and-planning.webp`, w: 95, h: 112 },
  doc: { src: `${HOME}/content.webp`, w: 98, h: 112 },
  calendar: { src: `${HOME}/daily-updates.webp`, w: 99, h: 112 },
  flask: { src: `${HOME}/cro-insights-and-experiments.webp`, w: 97, h: 112 },
  code: { src: `${NP}/il-icons/code.webp`, w: 122, h: 112 },
  api: { src: `${NP}/il-icons/api.webp`, w: 124, h: 112 },
  person: { src: `${NP}/il-icons/crm.webp`, w: 112, h: 112 },
  shield: { src: `${NP}/il-icons/gdpr.webp`, w: 104, h: 112 },
  devices: { src: `${NP}/il-icons/devices.webp`, w: 110, h: 112 },
  puzzle: { src: `${NP}/il-icons/puzzle.webp`, w: 110, h: 112 },
  chartSearch: { src: `${NP}/il-icons/seo.webp`, w: 107, h: 112 },
  speed: { src: `${NP}/il-icons/speed.webp`, w: 112, h: 112 },
} satisfies Record<string, IlAsset>;

export const LOGO = {
  webflow: { src: `${NP}/il-logos/webflow.webp`, w: 96, h: 60 },
  hubspot: { src: `${NP}/il-logos/hubspot.webp`, w: 92, h: 96 },
  salesforce: { src: `${NP}/il-logos/salesforce.webp`, w: 96, h: 67 },
  pipedrive: { src: `${NP}/il-logos/pipedrive.webp`, w: 96, h: 96 },
  ga: { src: `${NP}/il-logos/ga.webp`, w: 96, h: 96 },
  figma: { src: `${NP}/il-logos/figma.webp`, w: 64, h: 96 },
} satisfies Record<string, IlAsset>;

export type IconName = keyof typeof ICON;
export type LogoName = keyof typeof LOGO;
