# Handoff — sanity — service schema

Date: 2026-09-29 · Author: sanity agent · Branch: `feat/phase5-secondary-pages` (not committed) · Status: DONE

## What I did
- Updated `docs/SCHEMAS.md` to v0.6 first: `service` section (tab / field / name / type / rules + preview), `accentTitle` and `processStep` objects, `link.internalRef` accepts `service`, `service` listed as a routable document with its tabs.
- Added 5 Lead rows to `docs/DECISIONS.md` → Service pages (field list, FAQs reuse `faqSections`, gradient via `accentTitle`, step number = array order, seed only Custom Websites & Migrations), plus 2 Content open questions and 1 Engineering follow-up.
- Built the lead-approved `service` document, the `accentTitle` and `processStep` objects, a "Services" desk list, and added `service` to `link.internalRef`.
- Deployed the schema (`pnpm schema:deploy`: "Deployed 1/1 schemas"). MCP `get_schema` shows `service` with every field and validation rule.
- Seeded and published ONE document: `service-custom-websites-migrations`. No draft left (checked with a `drafts.service-*` query).
- Appended `## Service pages` (S-1 … S-10) to `docs/PHASE5_OPEN_ITEMS.md`.

## Files changed
- `docs/SCHEMAS.md` (v0.6)
- `docs/DECISIONS.md` (Service pages: Decisions + Open questions)
- `docs/PHASE5_OPEN_ITEMS.md` (new Service pages section)
- `sanity/schemaTypes/documents/service.ts` (new)
- `sanity/schemaTypes/objects/accentTitle.ts` (new)
- `sanity/schemaTypes/objects/processStep.ts` (new)
- `sanity/schemaTypes/objects/link.ts` (`internalRef` → adds `service`)
- `sanity/schemaTypes/index.ts` (registers `accentTitle`, `processStep`, `service`)
- `sanity/structure.ts` ("Services" list after the singletons, ordered by name, then a divider before the other collections)

No change to `sanity.config.ts` (`service` isn't a singleton). No `src/` files touched.

## Final field table (`service`)
| Tab | Field | Name | Type | Rules |
|---|---|---|---|---|
| Overview (default) | Service name | `name` | string | required |
| Overview | Slug | `slug` | slug (source `name`, custom slugify: `&` and punctuation dropped) | required · kebab-case `^[a-z0-9]+(?:-[a-z0-9]+)*$` · not `work`/`pricing`/`testimonials`/`blog`/`studio`/`dev`/`404` · unique among services |
| Overview | Related clients | `clients` | array of reference → `client` | optional, unique |
| Hero | Headline | `headline` | `accentTitle` | required, max 1 block |
| Hero | Subtitle | `subtitle` | text (3 rows) | optional |
| Problem | Problem title | `problemTitle` | `accentTitle` | max 1 block |
| Problem | Problem description | `problemDescription` | text (3 rows) | optional |
| Process | Process title | `processTitle` | `accentTitle` | max 1 block |
| Process | Process description | `processDescription` | text (3 rows) | optional, may contain `\n` |
| Process | Process steps | `steps` | array of `processStep` | optional. Number = position |
| FAQs | FAQ sections | `faqSections` | array of `faqSection` (existing) | optional |
| SEO | SEO | `seo` | `seo` (existing) | optional |

`processStep`: `name` (string, required) · `description` (text) · `features` (string[], tags layout, unique) · `image` (hotspot, `alt` required when an asset is set).
`accentTitle`: array with one `block` type: style `normal` only, `lists: []`, `annotations: []`, no inline objects, one decorator `accent` ("Gradient", gradient "G" icon, rendered with the brand gradient in the editor using a hardcoded copy of `--gradient-primary`). Type-level `max(1)`; each field repeats it because field validation replaces type validation.

Previews: document = name · `/<slug>`. Step item = its number from the array order ("01", "02"… in a small custom item component, since `prepare` can't know the index) + name · first 3 features (or the description) · image.
Desk: Site Settings … Blog Page → divider → **Services** (ordered by name) → divider → Clients, Testimonials, Blog, Authors, Categories.

## Seeded document
`_id`: `service-custom-websites-migrations` (published), slug `custom-websites-migrations`.
- `headline`: `Where ` + **accent** `marketing\nambition` + ` meets creative.`
- `problemTitle`: `Your website should\nmatch your ` + **accent** `ambition.`
- `processTitle`: `Full-service web\ntransformation.` (no accent)
- `processDescription`: `From strategy through launch and beyond.\nNo vendor coordination. No broken handoffs.` (the ref breaks after "beyond."; the second line is longer than the first, so it's a forced break). `problemDescription` and `subtitle` have no `\n` (natural wrap in the ref).
- `steps`: 01 "Website strategy plan" + description + 6 features, no image. 02–09: name `TODO: COPY — Step 0N`, description `TODO: COPY`.
- `clients` (a guess, see open questions): `client-kreios-space`, `client-arrows`, `client-12th-street-catering`, `client-rec-philly`, `client-resourcify`.
- `faqSections`: "Web Design And Development" (5) + "Answer Engine Optimization (AEO)" (5), copied from `src/lib/content/faqs.ts` as one `normal` block per answer. Placeholder copy (same as Pricing P-22).
- `seo`: empty.

## Checks
- [x] `pnpm run build` passes (7 pages; no warnings from `sanity/`)
- [x] `pnpm run check` passes (0 errors / 0 warnings / 0 hints); `tsc --noEmit -p .` also clean
- [x] `pnpm run lint` passes
- [ ] Studio not opened in a browser in this session. Please click through `/studio` → Services → the document once (tabs, Gradient button, step numbers)
- [ ] Checked at 1440 / 991 / 767 / 375: n/a (no visual change)

## Requests for other agents
- @astro: build `src/pages/[service].astro` against this contract. Ready-to-paste fragments for `src/lib/sanity/queries.ts` (reuse the existing `IMAGE`, `SEO`, `CLIENT_LIST_FIELDS`):

```ts
/** A one-block `accentTitle` (spans may carry `marks: ["accent"]`; `\n` = line break). */
const ACCENT_TITLE = /* groq */ `[]{
  _key,
  _type,
  style,
  children[]{ _key, _type, text, marks }
}`;

export const SERVICE_SLUGS = /* groq */ `
*[_type == "service" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current
`;

export const SERVICE_BY_SLUG = /* groq */ `
*[_type == "service" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  _id,
  _type,
  name,
  "slug": slug.current,
  "clients": clients[]->{
    ${CLIENT_LIST_FIELDS}
  },
  "headline": headline${ACCENT_TITLE},
  subtitle,
  "problemTitle": problemTitle${ACCENT_TITLE},
  problemDescription,
  "processTitle": processTitle${ACCENT_TITLE},
  processDescription,
  steps[]{
    _key,
    name,
    description,
    features,
    "image": image${IMAGE}
  },
  faqSections[]{
    _key,
    title,
    faqs[]{ _key, question, answer }
  },
  "seo": seo${SEO}
}
`;
```

  Suggested types for `src/lib/sanity/types.ts`:

```ts
export interface AccentTitleSpan { _key: string; _type: 'span'; text: string; marks?: 'accent'[] }
export interface AccentTitleBlock { _key: string; _type: 'block'; style?: 'normal'; children: AccentTitleSpan[] }
export type AccentTitle = AccentTitleBlock[];

export interface ProcessStep {
  _key: string;
  name: string;
  description?: string | null;
  features?: string[] | null;
  image?: SanityImage | null;
}

export interface Service {
  _id: string;
  _type: 'service';
  name: string;
  slug: string;
  clients?: (Client | null)[] | null;   // null = dangling ref: filter out
  headline: AccentTitle;
  subtitle?: string | null;
  problemTitle?: AccentTitle | null;
  problemDescription?: string | null;
  processTitle?: AccentTitle | null;
  processDescription?: string | null;   // may contain "\n"
  steps?: ProcessStep[] | null;         // step number = index + 1, zero-padded
  faqSections?: (FaqSection & { _key: string })[] | null;
  seo?: Seo | null;
}
```

  Notes for the template:
  - `accentTitle`: join `children[].text` for the plain title; spans with `marks` containing `accent` get `.c-section-header__accent`; split text on `\n` for `<br />`. `SectionHeader` takes one `accent` substring only (see DECISIONS Service pages → Engineering follow-ups).
  - `processDescription` may contain `\n` (render as `<br />`).
  - `getStaticPaths` from `SERVICE_SLUGS`. Only `custom-websites-migrations` exists today: `/growth` and `/ongoing-website-support` won't be generated until their documents exist (Nav links to them will 404 on staging).
  - Meta fallback: `seo` → `name` / `subtitle` → siteSettings.
  - `link.internalRef` can now be a `service`: add `'service'` to `LinkInternalRef._type`, map it to `/${slug.current}`, and project `"title": coalesce(title, name)` in `LINK_INTERNAL_REF` (service has `name`, not `title`).
  - FAQ answers are the same Portable Text shape as `post` FAQs (paragraphs + strong/em + `link` annotation).

## Open questions for the project lead
1. **Related clients**: I linked Kreios Space, Arrows, 12th Street Catering, REC Philly and Resourcify (the sites I could identify in the Problem side columns). Two cropped sites aren't identified (an orange "A creative partner to the world's most ambitious people" site, a "…motional" site). Is this the right list and order? (S-1)
2. **Steps 02–09**: they are `TODO: COPY` placeholders in Sanity so the 9-tab bar can be built. Who supplies names, copy, features and illustrations? (S-2, S-3)
3. **Growth / Ongoing Website Support**: their documents are not created, so those routes won't build. OK for now? Growth also needs its final name first (S-4, S-5)
4. **Slug field**: not in your list, added because routing needs it. OK? (S-8)

## TODO markers added
- `TODO: COPY`: Sanity content only: `steps[1..8].name` ("TODO: COPY — Step 02" … "Step 09") and `.description`. The FAQ answers are placeholder copy mirroring Pricing but carry no marker (as asked).
- `TODO: DS`: none.

---

## Update — 2026-09-29 (lead answers applied)

Content-only changes to the published `service-custom-websites-migrations`. No schema change, no schema deploy, no code change.

### What changed in Sanity
- **Slug (S-8):** lead OK, kept. Nothing to change.
- **Related clients (S-1):** appended 2 references (`_key`s `emotionalhub`, `garajedeideas`). The list now has 7 clients, in this order. All 7 have `websiteScreenshot.asset` set:

  | # | `_id` | Name | `websiteScreenshot` |
  |---|---|---|---|
  | 1 | `client-kreios-space` | Kreios Space | yes |
  | 2 | `client-arrows` | Arrows | yes |
  | 3 | `client-12th-street-catering` | 12th Street Catering | yes |
  | 4 | `client-rec-philly` | REC Philly | yes |
  | 5 | `client-resourcify` | Resourcify | yes |
  | 6 | `client-emotional-hub` | Emotional Hub (new) | yes |
  | 7 | `client-garaje-de-ideas` | Garaje de Ideas (new) | yes |

  Emotional Hub is probably the cropped "…motional" site in the ref. This is still a placeholder selection. For reference: `client-pagonxt` is the only client in the dataset with no screenshot.
- **Steps 02–09 (S-2):** placeholder names, descriptions (1–3 sentences) and features (4–5 tags) replace "TODO: COPY — Step 0N". Step 01 is unchanged. `_key`s `step01`…`step09` are unchanged. The copy has no inline marker. It is logged as `TODO: COPY` here, in PHASE5 S-2 and in DECISIONS.
  02 Content and UX structure · 03 Visual design · 04 Custom development · 05 CMS setup · 06 Content migration · 07 Quality assurance · 08 Launch · 09 Post-launch support.
- **Step illustration (S-3):** uploaded `docs/refs/services-template/service-step.svg` once with `npx @sanity/cli@latest assets upload`, using the existing CLI login. No token was read or printed and no throwaway script was made. The asset is `image-7147726e41fbec265037424241c552edfdfbc63d-464x417-svg` (SVG, 464×417). It is set as `image` on all 9 steps, with alt "<Step name> illustration" (for example "Website strategy plan illustration"). There is no crop or hotspot. `TODO: assets`: each step still needs its real illustration.
- **Growth / Ongoing Support (S-4):** deferred by the lead. No documents were created.
- Published. `count(*[_id in path("drafts.service-*")])` = 0.

### Verification (MCP query, published perspective)
- `count(clients)` = 7, and all resolve with `websiteScreenshot` set.
- `count(steps)` = 9. Every step has `image.asset` = the asset above, a non-empty `alt`, and a placeholder name. The feature counts are 6/5/5/5/4/5/5/5/4.

### Notes for @astro
- The query and types in this handoff still apply. `SERVICE_BY_SLUG` already projects `steps[].image`.
- The step image is an **SVG**. `urlFor(...).format('webp')` / `.width()` would rasterize it. Use the plain asset URL for SVG assets (logged in DECISIONS → Service pages → Engineering follow-ups).

### Docs updated
- `docs/PHASE5_OPEN_ITEMS.md`: S-1 is Resolved (placeholder), S-2 and S-3 are Updated (placeholder), S-4 is Open (deferred) and S-8 is Resolved. The status line is updated.
- `docs/DECISIONS.md` → Service pages: 4 new Lead rows. The open questions for steps 02–09, Growth + Ongoing Support and related clients are struck through and resolved. There is 1 new engineering follow-up (SVG step image).
