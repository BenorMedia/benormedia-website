/**
 * Service layout — per-service text widths for the `/[service]` template
 * (lead 2026-10-01). Keyed by the service slug; a service without an entry
 * (or a missing value) keeps the template defaults:
 *   - hero description: 30rem (ServiceHero)
 *   - problem paragraphs: 24.5rem each (ServiceProblem, with carousels)
 *
 * `problemParagraphs` = one width per description paragraph, in order; when
 * the description has more paragraphs than widths, the last width repeats.
 * Phones always use the full width.
 */

export interface ServiceLayout {
  heroDescription?: string;
  problemParagraphs?: readonly string[];
}

export const SERVICE_LAYOUT: Readonly<Record<string, ServiceLayout>> = {
  // Custom Websites & Migrations: template defaults (lead: "good as is").
  growth: {
    problemParagraphs: ["27.5rem"],
  },
  "ongoing-website-support": {
    heroDescription: "42rem",
    problemParagraphs: ["35.5rem", "27.5rem", "18.5rem"],
  },
};
