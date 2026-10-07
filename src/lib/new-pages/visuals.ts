/**
 * Visuals (brief 5.9): a real asset, else a registered diagram, else a
 * preview-only placeholder, else nothing.
 *
 * Assets: `src/assets/new-pages/<slug>/<n>.<webp|png|jpg|svg>`, `n` counted
 * from 1 in `visuals` order.
 *
 * Diagrams: `DIAGRAMS['<slug>:<n>']`, filled in T7. Each entry names the
 * section text its labels came from.
 */
import type { ImageMetadata } from "astro";
import FlowDiagram from "../../components/new-pages/diagrams/FlowDiagram.astro";
import HubDiagram from "../../components/new-pages/diagrams/HubDiagram.astro";
import MappingDiagram from "../../components/new-pages/diagrams/MappingDiagram.astro";
import OutlineDiagram from "../../components/new-pages/diagrams/OutlineDiagram.astro";
import SiteMapDiagram from "../../components/new-pages/diagrams/SiteMapDiagram.astro";
import TimelineDiagram from "../../components/new-pages/diagrams/TimelineDiagram.astro";

type AstroComponent = (...args: any[]) => any;

export interface DiagramEntry {
  component: AstroComponent;
  props: Record<string, unknown>;
}

const ASSETS = import.meta.glob<{ default: ImageMetadata }>("/src/assets/new-pages/**/*.{webp,png,jpg,svg}", {
  eager: true,
});

export function findAsset(slug: string, n: number): ImageMetadata | undefined {
  for (const ext of ["webp", "png", "jpg", "svg"]) {
    const mod = ASSETS[`/src/assets/new-pages/${slug}/${n}.${ext}`];
    if (mod) return mod.default;
  }
  return undefined;
}

export const DIAGRAMS: Record<string, DiagramEntry> = {
  // Labels: brief ("old WordPress URLs", "new Webflow addresses", "redirect type") and the FAQ's "301 redirect"; URLs are generic examples.
  "webflow-migration:1": {
    component: MappingDiagram,
    props: {
      headers: ["Old WordPress URL", "New Webflow address"],
      rows: [
        { from: "/old-page", to: "/new-page", tag: "301" },
        { from: "/old-post", to: "/blog/new-post", tag: "301" },
        { from: "/old-category", to: "/blog", tag: "301" },
      ],
    },
  },
  // Labels: brief headers; rows from "Plugins, forms, and integrations": native settings, Webflow forms, "an integration".
  "webflow-migration:4": {
    component: MappingDiagram,
    props: {
      headers: ["What the WordPress plugin did", "What covers that job in Webflow"],
      rows: [
        { from: "SEO fields, sitemaps, and redirects", to: "A built-in Webflow setting" },
        { from: "Forms", to: "Webflow forms" },
        { from: "CRM, analytics, and marketing automation", to: "An integration" },
      ],
    },
  },
  // Labels: brief ("heading structure", "schema markup", "answer-ready sections").
  "webflow-migration:5": {
    component: OutlineDiagram,
    props: {
      rows: [
        { kind: "heading", label: "Heading structure" },
        { kind: "text" },
        { kind: "answer", label: "Answer-ready sections" },
        { kind: "text" },
        { kind: "schema", label: "Schema markup" },
      ],
    },
  },
  // Labels: brief groups (learning, evaluating, deciding, acting); pages from "The pages a SaaS buyer expects" and "resources".
  "b2b-saas-web-design:1": {
    component: SiteMapDiagram,
    props: {
      root: "Home",
      groups: [
        { label: "Learning", items: ["Resources"] },
        { label: "Evaluating", items: ["Product pages", "Integrations"] },
        { label: "Deciding", items: ["Pricing", "Customers and proof", "Security and trust"] },
        { label: "Acting", items: ["Demo or contact"] },
      ],
    },
  },
  // Labels: brief ("heading structure", "schema markup", "question-and-answer blocks").
  "b2b-saas-web-design:3": {
    component: OutlineDiagram,
    props: {
      rows: [
        { kind: "heading", label: "Heading structure" },
        { kind: "text" },
        { kind: "answer", label: "Question-and-answer blocks" },
        { kind: "text" },
        { kind: "schema", label: "Schema markup" },
      ],
    },
  },
  // Labels: brief and "CRM, analytics, and forms wired in during the build".
  "b2b-saas-web-design:4": {
    component: HubDiagram,
    props: {
      center: "Website",
      satellites: [{ label: "CRM" }, { label: "Analytics" }, { label: "Marketing automation" }, { label: "Custom API" }],
    },
  },
  // Labels: brief ("who edits, who reviews, and who publishes, with the approval step between them").
  "webflow-enterprise-agency:1": {
    component: FlowDiagram,
    props: {
      steps: [{ label: "Who edits" }, { label: "Who reviews" }, { label: "Approval step", gate: true }, { label: "Who publishes" }],
    },
  },
  // Labels: brief ("one site", "language versions", "a regional team beside each"); A–C are generic.
  "webflow-enterprise-agency:2": {
    component: HubDiagram,
    props: {
      center: "One site",
      ring: true,
      satellites: [
        { label: "Language version A", note: "Regional team" },
        { label: "Language version B", note: "Regional team" },
        { label: "Language version C", note: "Regional team" },
        { label: "Language version D", note: "Regional team" },
      ],
    },
  },
  // Labels: brief ("the audit, the stakeholder sign-offs, the component library build, and the launch").
  "webflow-enterprise-agency:3": {
    component: TimelineDiagram,
    props: { milestones: ["Audit", "Stakeholder sign-offs", "Component library build", "Launch"] },
  },
  // Labels: brief and "Integrations and analytics wired in during the build".
  "webflow-enterprise-agency:4": {
    component: HubDiagram,
    props: {
      center: "Website",
      satellites: [{ label: "CRM" }, { label: "Analytics" }, { label: "Marketing automation" }, { label: "Custom API integrations" }],
    },
  },
  // Labels: "A dedicated team and response times after launch" (team lead, project manager, designers, developers) and the brief.
  "webflow-enterprise-agency:5": {
    component: HubDiagram,
    props: {
      center: "Marketing team",
      ring: true,
      satellites: [{ label: "Team lead" }, { label: "Project manager" }, { label: "Designers" }, { label: "Developers" }],
    },
  },
  // Labels: brief ("benchmark, map URLs, rebuild, move content, redirect, test, launch, monitor"), the guide's eight numbered steps.
  "wordpress-to-webflow-migration:1": {
    component: FlowDiagram,
    props: {
      numbered: true,
      columns: 4,
      steps: [
        { label: "Benchmark" },
        { label: "Map URLs" },
        { label: "Rebuild" },
        { label: "Move content" },
        { label: "Redirect" },
        { label: "Test" },
        { label: "Launch" },
        { label: "Monitor" },
      ],
    },
  },
  // Labels: brief groups and pages; page names as in the "Pages a B2B SaaS website needs" table.
  "b2b-saas-website-pages:1": {
    component: SiteMapDiagram,
    props: {
      root: "Home",
      groups: [
        { label: "Learning", items: ["Resources"] },
        { label: "Evaluating", items: ["Product and use-case pages", "Integrations", "Comparison and alternatives"] },
        { label: "Deciding", items: ["Pricing", "Customers and proof", "Security and trust"] },
        { label: "Acting", items: ["Demo or contact"] },
      ],
    },
  },
  // Labels: brief steps; roles only where the page names them ("A designer or editor ... submits it for review, and an
  // approver must approve it"). The page does not say who merges or publishes ("Permissions set who ... publishes").
  "webflow-enterprise:1": {
    component: FlowDiagram,
    props: {
      columns: 3,
      steps: [
        { label: "Branch a page", note: "Designer or editor" },
        { label: "Submit for review", note: "Designer or editor" },
        { label: "Approve", note: "Approver", gate: true },
        { label: "Merge" },
        { label: "Publish to staging" },
        { label: "Publish to production" },
      ],
    },
  },
};

export type ResolvedVisual =
  | { kind: "asset"; asset: ImageMetadata }
  | { kind: "diagram"; diagram: DiagramEntry }
  | { kind: "placeholder" };

/**
 * What renders for a visual, in brief 5.9 order. `undefined` = nothing
 * (production without an asset or a diagram: the section is one column).
 */
export function resolveVisual(
  visual: { slug: string; n: number; key: string } | undefined,
  includeDrafts: boolean,
): ResolvedVisual | undefined {
  if (!visual) return undefined;
  const asset = findAsset(visual.slug, visual.n);
  if (asset) return { kind: "asset", asset };
  const diagram = DIAGRAMS[visual.key];
  if (diagram) return { kind: "diagram", diagram };
  return includeDrafts ? { kind: "placeholder" } : undefined;
}
