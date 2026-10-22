# Sanity ↔ Astro Data Contract (v0.13, v0.11 pending Sergio, v0.13 pending the lead)

Status: v0.5 approved by the project lead 2026-09-25. v0.6 (`service` document) approved 2026-09-29. v0.7 (`client.orderRank`) requested by the lead 2026-09-29. v0.8 (`client.websiteVideo`) requested by the lead 2026-09-30. v0.9 (`client.sector`) requested by the lead 2026-10-01. v0.10 (`caseStudy`) approved by the lead 2026-10-20. v0.11 (`caseStudy.cardStats`, `client.logoOnDark`) requested by Emily 2026-10-22, code only, pending Sergio's OK. v0.12 (case study template Figma 3842:40046: hero facts, body quote and callout, results texts, `kpi.label`) added by the ui agent 2026-10-22, approved by the lead 2026-10-22 (deploy by the orchestrator). v0.13 (`comparison` document, Figma 3790:37245 / 3790:37967) added by the sanity agent 2026-10-22 from the lead's Comparison decisions (DECISIONS → Comparison), code only, not deployed, pending the lead's OK on the field list.

### v0.13 changes vs v0.12 (2026-10-22, code only, NOT deployed, pending the lead's OK)
Figma template 3790:37245 and index 3790:37967. Routes `/comparison` and `/comparison/[slug]` (SITEMAP, DECISIONS → Comparison).
- **New `comparison` document**, routable at `/comparison/<slug>` (see the table below). Index `/comparison` lists every published comparison, `order(publishedAt desc, title asc)`. Drafts never build.
- **New objects:** `accentSectionHeader` (eyebrow + `accentTitle` + description: `sectionHeader` has a plain string title, so it can't render gradient words such as "side by side"), `comparisonChoice`, `comparisonTableGroup`, `comparisonTableRow`, `comparisonReason`.
- **`stat`** gains optional `source` (string) and `sourceUrl` (url), shown in Studio only inside `comparison.reasons[].stats`. `value` stays free text, so a `[FACT NEEDED: …]` marker fits.
- **`processStep`**: `note` and `features` are hidden in Studio inside `comparison.migrationSteps` (not in the design). No shape change.
- **Reserved service slugs** gain `comparison`.
- **New queries:** `ALL_COMPARISONS`, `COMPARISON_SLUGS`, `COMPARISON_BY_SLUG` (see "GROQ: comparison" below).
- Unchanged and not stored on `comparison`: the logo strip and testimonials (global data, as on service pages), the FAQ heading (fixed in code, as on service pages), the CTA banner (`siteSettings`), the index hero copy and index SEO (code, as `/case-studies`), and every Webflow-side asset (pill logo, table header logo, "What to choose" illustration).

### v0.12 changes vs v0.11 (2026-10-22, approved by the lead 2026-10-22; deploy by the orchestrator, not deployed by the ui agent)
Figma template 3842:40046 (case studies v3). All new fields optional; the page renders nothing for an empty one.
- **`caseStudy.solution`** (string, Hero tab, `initialValue: "BenorMedia"`, lead 2026-10-22): "04 / Solution" in the facts row.
- **`caseStudy.timeline`** (string, Hero tab): "05 / Timeline".
- **`caseStudy.stack`** (array of strings, Hero tab): "06 / Stack", joined with " / ".
- **`caseStudy.body`**: new block style **`blockquote`** (Studio "Quote": the highlighted quote with the gradient bar) and new array member **`caseStudyCallout`** (object: `title` string required, `items` array of strings, min 1): the boxed list ("Deliverables — Design Phase"). Bullet lists now render with check-circle icons (no schema change).
- **`caseStudy.resultsIntro`** / **`caseStudy.resultsSummary`** (text, Results tab): paragraphs above and below the results row.
- **`kpi.label`** (string, optional, shown in Studio only inside `caseStudy.results`): the line between the value and the description in a result cell. Testimonial KPIs unchanged.
- **Wiring only, no schema change:** `CASE_STUDY_BY_SLUG` now also reads `client.websiteScreenshot` (the hero browser frame) next to `client.websiteUrl` (URL bar host and "Visit live site").
- **Display changes:** `challenge` is no longer shown on the page (Figma removed it from the facts); it stays the meta description fallback. `services` moves to "03 / Services delivered"; the client name is "01 / Client". The hero no longer shows the date and read time (`publishedAt` stays on cards and in the JSON-LD; `readTime` is unused on the page).

### v0.11 changes vs v0.10 (2026-10-22, code only, NOT deployed, pending Sergio's OK in the PR)
- **`caseStudy.cardStats`** (optional, array of `cardStat`, max 2): the stats row on the case-study card (Figma 3798:19226). `cardStat` object: `value` (string, required, e.g. "+40%") · `label` (string, required, short). Hidden on the card when empty.
- **`client.logoOnDark`** (optional image + `alt`, SVG preferred): the client logo for dark backgrounds (the navy card thumbnail). Empty → the card uses `logo` with a CSS whitening filter (works for one-colour logos only).
- **Queries:** `cardStats[]{ _key, value, label }` in the case-study card fields (`ALL_CASE_STUDIES`, `related`, `latest`); `logoOnDark` next to `logo` in the card's `client->` projection. The index hero tiles reuse `ALL_CLIENTS_WITH_ICON` (client `icon`).

### v0.10 changes vs v0.9 (2026-10-20)
- **New `caseStudy` document**, routable at `/case-studies/<slug>` (see the table below). Index `/case-studies` lists every published case study, `order(publishedAt desc)`. Created as drafts only until the lead says otherwise.
- **Reserved service slugs** gain `case-studies`.
- **New queries:** `ALL_CASE_STUDIES` (cards: `_id`, `title`, `slug`, `publishedAt`, `client->{ name, logo }`), `CASE_STUDY_SLUGS`, `CASE_STUDY_BY_SLUG` (every field plus `_updatedAt` (Article `dateModified`, added 2026-10-21), `client->`, `services[]->{ name, slug }`, the case study's testimonial, else the client's (a "Lorem ipsum" placeholder is skipped), `related[]->` card fields, plus `latest`: the 3 newest other published case studies, card fields, the "Resources" fallback when `related` is empty), `CASE_STUDY_SLUG_BY_CLIENT` (for the "Read the case study" link on `/work` rows).
- `client`, `testimonial` and `service` are unchanged.

### v0.9 changes vs v0.8 (2026-10-01)
- **`client.sector`** (optional `string`, dropdown, one value): `agency` (Agency), `professional-services` (Professional Services), `saas` (SaaS). Projected in `CLIENT_LIST_FIELDS` (so `CLIENTS_BY_IDS` + `ALL_CLIENTS`). The Work page filters by it (View All · SaaS · Professional Services; no Agency tab since 2026-10-05, `agency` clients show under View All); `category` no longer drives any filter. Values are filled in Studio / MCP by the lead.

Approach: **repeatable data lives in Sanity documents; page copy is authored directly in Astro components.** Page singletons exist only to hold per-page SEO metadata. Global chrome (nav, footer) is authored in Astro components too.

### v0.8 changes vs v0.7 (2026-09-30)
- **`client.websiteVideo`** (optional `file`, `accept: video/mp4`): uploaded directly in Studio. Projected as `{ asset->{ _id, url, mimeType } }` in `CLIENTS_BY_IDS`. Home Featured Work cards play it (muted, looping, whole frame, never cropped) while the card is on screen, on every device; `preload="none"`; never under reduced motion or Data Saver. `websiteScreenshot` is the fallback when no video is set (lead 2026-09-30, QA S3/S4).
- **`client.websiteVideoPoster`** (optional image, lead 2026-09-30): the video's native `poster` (cropped 16:9), shown until the first frame and instead of the video under reduced motion / Data Saver. Falls back to the top of `websiteScreenshot`. Projected in `CLIENTS_BY_IDS`.
- **`SERVICE_CARDS`** (query, 2026-09-30): `_id`, `_type`, `name`, `slug`, `subtitle` of the published services in `$slugs`; `getServiceCards(slugs)` restores the given order. Feeds the Home Services cards.
- **`ALL_CLIENTS_WITH_ICON`** (query, 2026-09-30): every published client with an `icon` asset, `order(name asc)`, projecting `_id`, `_type`, `name`, `icon` only. Feeds the Home hero physics pile (`HomeHero` → `ClientIcon`).

### v0.7 changes vs v0.6 (2026-09-29)
- **`client.orderRank`** (hidden, read-only string) from `@sanity/orderable-document-list`: Studio → Clients is now a drag-and-drop list. New clients go to the end. Initial order = the Work page reference (`docs/refs/work/work-list.jpg`), seeded with `pnpm seed:client-order`.
- Only the Work page listing (`ALL_CLIENTS`) sorts by it: `order(orderRank asc, name asc)`. Home, Pricing and service pages keep their own order (`CLIENTS_BY_IDS` = pinned ID order, `ALL_CLIENTS_WITH_LOGO` = name).
- `workPage` singleton: kept in the schema, but there will be no document (lead). `/work` SEO lives in code.

### v0.6 changes vs v0.5 (2026-09-29)
- **`service` document reinstated** (supersedes the v0.5 removal) with the lead-approved field list: one Studio tab per page section (Overview, Hero, Problem, Process, FAQs) + SEO. Routable at `/<slug>` via `src/pages/[service].astro`.
- **New objects:** `accentTitle` (one-line Portable Text title with a "Gradient" decorator) and `processStep`.
- **`link.internalRef`** allows `service` again, so CMS buttons can link to service pages.
- Services seeded: only Custom Websites & Migrations (lead). Growth and Ongoing Website Support documents are not created yet.

### v0.5 changes vs v0.4
- **All page singletons are SEO-only.** Removed all `hero`/section/content fields from `homePage`, `workPage`, `pricingPage`, `testimonialsPage`, `blogPage`. No Content tab — just a single `seo` object.
- **Removed the `service` document type.** Services are handled as static Astro pages.
- **Removed the `technology` document type.** Not needed.
- **Removed `Navigation` and `Footer` tabs from `siteSettings`.** Site chrome is authored in Astro components.
- **`link.internalRef`** no longer allows `service` (only the 5 page singletons + `post`).

---

## Documents

### `client` — Clients (no detail page)
| Field | Name | Type | Rules |
|---|---|---|---|
| Name | `name` | string | optional |
| Logo | `logo` | image (SVG preferred) | optional. Alt auto = client name |
| Icon | `icon` | image (SVG preferred) | optional. Alt auto = client name |
| Badge | `badge` | image (no hotspot) | optional. Alt auto = "<name> badge" (required if image is set and alt blank) |
| Card Thumbnail | `cardThumbnail` | image (hotspot) | optional. Alt required if image is set |
| Website Screenshot | `websiteScreenshot` | image (hotspot) | optional. Alt required if image is set |
| Website Video | `websiteVideo` | file (`video/mp4`) | optional. Featured Work card media, plays while the card is on screen; the screenshot gives its accessible name and is the fallback |
| Website Video Poster | `websiteVideoPoster` | image | optional. Native video poster until the first frame (and under reduced motion); falls back to `websiteScreenshot` |
| Testimonial | `testimonial` | reference → `testimonial` | optional |
| Funds Raised | `fundsRaised` | string | optional. e.g. `$25.0M`. Template appends "Raised" |
| Category | `category` | reference → `category` | optional |
| Sector | `sector` | string, dropdown: `agency` · `professional-services` · `saas` | optional, one value. Work page filters (v0.9) |
| Logo on dark | `logoOnDark` | image (SVG preferred) + alt | optional. Logo for dark backgrounds (navy case-study card). Empty → `logo` with a CSS whitening filter (v0.11) |
| Website URL | `websiteUrl` | url | optional |
| Order Rank | `orderRank` | string (LexoRank) | hidden, read-only. Set by the Studio drag-and-drop list (`@sanity/orderable-document-list`). Only the Work page listing sorts by it |

All fields are optional so clients can be bulk-created and published without waiting on assets. Enforce presence at query/render time (skip incomplete clients in listings) rather than at Studio level.

Preview: name · category · logo.

### `service` — Service pages (routable at `/<slug>`)
Fields are grouped in Studio tabs, one per page section, in this order.


| Tab | Field | Name | Type | Rules |
|---|---|---|---|---|
| Overview (default) | Service name | `name` | string | required. Studio title, hero breadcrumb, anywhere the service name appears |
| Overview | Slug | `slug` | slug (from name) | required, unique among services, lowercase kebab-case (`a-z`, `0-9`, `-`). Can't be a reserved slug: `work`, `case-studies`, `comparison`, `pricing`, `testimonials`, `blog`, `studio`, `dev`, `404` (SITEMAP) |
| Overview | Related clients | `clients` | array of references → `client` | optional, no duplicates. How they render is decided in the Astro template |
| Hero | Headline | `headline` | `accentTitle` | required, exactly one line of text (Shift+Enter for a line break) |
| Hero | Subtitle | `subtitle` | text (3 rows) | optional |
| Problem | Problem title | `problemTitle` | `accentTitle` | optional, max 1 block |
| Problem | Problem description | `problemDescription` | text (3 rows) | optional |
| Process | Process title | `processTitle` | `accentTitle` | optional, max 1 block |
| Process | Process description | `processDescription` | text (3 rows) | optional. A line break typed in the field is kept (`\n`) |
| Process | Process steps | `steps` | array of `processStep` | optional. No position field: the step number (01, 02…) is the item's order in the array (drag to reorder) |
| FAQs | FAQ sections | `faqSections` | array of `faqSection` | optional. Same object as `post` (see "FAQs"): section title = tab label |
| SEO | SEO | `seo` | `seo` object | optional, falls back to name / subtitle / siteSettings |

Preview: name · `/<slug>`. Desk list ordered by name.
Step list items show their number (01, 02…) next to the step preview (name · first features or description · image).

`processStep` object:

| Field | Name | Type | Rules |
|---|---|---|---|
| Step name | `name` | string | required. Tab label and step heading |
| Description | `description` | text (3 rows) | optional |
| Note with a link | `note` | Portable Text, one `normal` block, no lists or decorators, `link` annotation (`href`: url, relative paths allowed) | optional, max 1 block. Rendered as a paragraph under the description (added 2026-10-12 for the /headless-cms-agency link on step 03) |
| Features | `features` | array of string (tags input) | optional, no duplicates, order has no meaning |
| Image | `image` | image (hotspot) + `alt` | optional. Alt required when an image is set |

`accentTitle` (named type, array of Portable Text blocks):
- Exactly one block (max 1), style `normal` only, no lists, no annotations, no inline objects.
- One decorator: `accent`, titled "Gradient". Text marked with it renders with the brand gradient (`.c-section-header__accent` in Astro).
- Line breaks are `\n` characters inside span text (Shift+Enter in the editor). The renderer turns them into `<br />`.
- Shape: `[{ _type: "block", _key, style: "normal", markDefs: [], children: [{ _type: "span", _key, text, marks: [] | ["accent"] }] }]`.

### `caseStudy` — Case studies (routable at `/case-studies/<slug>`, v0.10)
Fields are grouped in Studio tabs, in this order.

| Tab | Field | Name | Type | Rules |
|---|---|---|---|---|
| Overview (default) | Title | `title` | string | required. H1, card title, last breadcrumb item |
| Overview | Slug | `slug` | slug (from title) | required, unique among case studies, lowercase kebab-case |
| Overview | Client | `client` | reference → `client` | required. Card and hero logo, "01 / Client" (client name); the client's `websiteScreenshot` + `websiteUrl` fill the hero browser frame (v0.12) |
| Overview | Published on | `publishedAt` | date | required, default today. Card date, index order (not shown in the hero since v0.12) |
| Overview | Time to read | `readTime` | number (minutes) | optional override. Not shown on the page since v0.12 (Figma 3842:40046 has no read time) |
| Hero | Intro | `intro` | text (3 rows) | optional. Hero paragraph; meta description fallback |
| Hero | Industry | `industry` | string | optional. "02 / Industry" |
| Hero | Services | `services` | array of references → `service` | optional, no duplicates. "03 / Services delivered" (service names joined with " / ", v0.12) |
| Hero | Solution | `solution` | string | optional, initial value "BenorMedia" (lead 2026-10-22). "04 / Solution" (v0.12) |
| Hero | Timeline | `timeline` | string | optional. "05 / Timeline" (v0.12) |
| Hero | Stack | `stack` | array of strings | optional. "06 / Stack", joined with " / " (v0.12) |
| Hero | Challenge | `challenge` | text (3 rows) | optional. Not shown on the page since v0.12; meta description fallback |
| Hero | Testimonial | `testimonial` | reference → `testimonial` | optional. Falls back to the client's testimonial; no quote block when both are empty |
| Article | Body | `body` | Portable Text | H2 (a section; feeds the table of contents), H3 (a phase), normal, bold, italic, links (`href` must be a full `http(s)://` address, a path starting with `/` or an `#anchor`: validated since 2026-10-21; `openInNewTab` optional), bullet (check-circle icons) + numbered lists, `blockquote` style (v0.12), `caseStudyCallout` boxes (v0.12). No images, embeds or tables. Content from an H3 to the next H2 renders in a narrower column (no rule since v0.12) |
| Results | Results intro | `resultsIntro` | text (3 rows) | optional. Paragraph under "The results" (v0.12) |
| Results | Results | `results` | array of `kpi` | optional, max 3. Results row under the body; `kpi.label` optional line above the description (v0.12) |
| Results | Results summary | `resultsSummary` | text (3 rows) | optional. Paragraph under the results row (v0.12) |
| Card | Card stats | `cardStats` | array of `cardStat` | optional, max 2. Stats row on the card (value + short label); hidden when empty (v0.11) |
| Related | Related case studies | `related` | array of references → `caseStudy` | optional, max 3, no duplicates, not itself. Falls back to the latest published ones |
| SEO | SEO | `seo` | `seo` object | optional, falls back to title / intro / siteSettings |

Preview: title · client name · client logo. Desk list ordered by `publishedAt` desc.

### `comparison` — Comparison pages (routable at `/comparison/<slug>`, v0.13)
Figma template 3790:37245, index card 3790:37967. Fields are grouped in Studio tabs, one per page section in page order, then Card and SEO. "Required" blocks publishing only: drafts always save.

| Tab | Field | Name | Type | Rules |
|---|---|---|---|---|
| Overview (default) | Title | `title` | string | required. Studio title, last breadcrumb item, meta title fallback, card title fallback. e.g. "Webflow vs WordPress" |
| Overview | Slug | `slug` | slug (from title) | required, unique among comparisons, lowercase kebab-case. e.g. `webflow-vs-wordpress` |
| Overview | Competitor name | `competitorName` | string | required. e.g. "WordPress": alt fallback for the logos, any place the page names the competitor in code |
| Overview | Competitor logo | `competitorLogo` | image (hotspot, SVG preferred) + `alt` | required. Hero pill ("Webflow VS <logo>") and index card pill. Alt required when set (Astro falls back to `competitorName`) |
| Overview | Competitor logo on dark | `competitorLogoOnDark` | image (hotspot, SVG preferred) + `alt` | optional. Table header row (gradient background). Empty → `competitorLogo` with a CSS whitening filter (same pattern as `client.logoOnDark`) |
| Overview | Published on | `publishedAt` | date | required, default today. Index order (newest first), JSON-LD `datePublished` |
| Hero | Headline | `headline` | `accentTitle` | required, max 1 block. H1; "Webflow was." marked Gradient |
| Hero | Subtitle | `subtitle` | text (3 rows) | optional. Hero paragraph; meta description fallback |
| Hero | Main button text | `primaryButtonLabel` | string | required, warning over 40 chars. Gradient button; action fixed in code: opens the contact popup |
| Hero | Second button text | `secondaryButtonLabel` | string | required, warning over 40 chars. Outline button; action fixed in code: anchor to the table section |
| What to choose | Section header | `chooseHeader` | `accentSectionHeader` | optional (section hidden when header and both cards are empty) |
| What to choose | Webflow card | `webflowChoice` | `comparisonChoice` | optional. `image` hidden in Studio (illustration fixed in code); reasons render with a check |
| What to choose | Competitor card | `competitorChoice` | `comparisonChoice` | optional. Reasons render with a dash |
| Table | Section header | `tableHeader` | `accentSectionHeader` | optional. The section's `id` (anchor of the second hero button) is set in code |
| Table | Table groups | `tableGroups` | array of `comparisonTableGroup` | optional. Header row (both logos) built in code |
| Why switch | Section header | `reasonsHeader` | `accentSectionHeader` | optional |
| Why switch | Reasons | `reasons` | array of `comparisonReason` | optional, warning over 4. Rows alternate image left / right in code, first row image left |
| Migration | Section header | `migrationHeader` | `accentSectionHeader` | optional. Eyebrow e.g. "WordPress → Webflow" |
| Migration | Migration steps | `migrationSteps` | array of `processStep` | optional, max 4. Uses `name`, `description`, `image` (the icon); `note` and `features` hidden in Studio and not rendered. Step number = array order |
| Case studies | Section header | `caseStudiesHeader` | `accentSectionHeader` | optional |
| Case studies | Case studies | `caseStudies` | array of references → `caseStudy` | optional, max 3, no duplicates. Unpublished references filtered out. Empty → the 3 newest published case studies (`latestCaseStudies`) |
| FAQs | FAQ sections | `faqSections` | array of `faqSection` | optional. Same object and rendering as `service` (tab per section, FAQPage JSON-LD). The heading "Frequently asked questions." is fixed in code, as on service pages |
| Card | Card title | `cardTitle` | string | optional. Index card heading; falls back to `title` |
| Card | Card description | `cardDescription` | text (3 rows) | optional, warning over 200 chars. Index card paragraph |
| SEO | SEO | `seo` | `seo` object | optional, falls back to title / subtitle / siteSettings |

Preview: title · `/comparison/<slug>` · competitor logo. Desk list "Comparisons" ordered by `publishedAt` desc.

`comparisonChoice` object ("What to choose" card):

| Field | Name | Type | Rules |
|---|---|---|---|
| Illustration | `image` | image (hotspot, SVG preferred) + `alt` | optional; hidden for `webflowChoice`. Alt required when set |
| Title | `title` | `accentTitle` | required, max 1 block. e.g. "Choose Webflow if…" with "Webflow" marked Gradient |
| Reasons | `reasons` | array of string | required, min 1, warning over 3 |

`comparisonTableGroup` object: `label` (string, required, e.g. "Performance", uppercased in CSS) · `rows` (array of `comparisonTableRow`, required, min 1).
`comparisonTableRow` object: `feature` (string, required) · `webflow` (string, required, rendered with a check) · `competitor` (string, required, rendered with a dash).

`comparisonReason` object ("Why switch" row):

| Field | Name | Type | Rules |
|---|---|---|---|
| Illustration | `image` | image (hotspot, SVG preferred) + `alt` | optional. Alt required when set |
| Title | `title` | string | required |
| Text | `text` | text (3 rows) | optional |
| Stats | `stats` | array of `stat` | optional, max 2. `value` free text (holds `[FACT NEEDED: …]` until confirmed), `label`, optional `source` + `sourceUrl` |

`accentSectionHeader` object: `eyebrow` (string, optional) · `title` (`accentTitle`, required, max 1 block) · `description` (text, optional).

#### GROQ: comparison
Fragments `IMAGE`, `SEO`, `ACCENT_TITLE` and `CASE_STUDY_CARD_FIELDS` are the existing ones in `src/lib/sanity/queries.ts`.

```groq
// Shared filter: published comparisons with a slug.
PUBLISHED_COMPARISON = _type == "comparison" && defined(slug.current) && !(_id in path("drafts.**"))

// Section header fragment.
ACCENT_SECTION_HEADER = { eyebrow, "title": title${ACCENT_TITLE}, description }

// ALL_COMPARISONS — /comparison index cards.
*[${PUBLISHED_COMPARISON}] | order(publishedAt desc, title asc){
  _id, _type, title, "slug": slug.current, publishedAt,
  competitorName,
  "competitorLogo": competitorLogo${IMAGE},
  cardTitle, cardDescription
}

// COMPARISON_SLUGS — getStaticPaths.
*[${PUBLISHED_COMPARISON}].slug.current

// COMPARISON_BY_SLUG — /comparison/[slug] ($slug).
*[${PUBLISHED_COMPARISON} && slug.current == $slug][0]{
  _id, _type, _updatedAt, title, "slug": slug.current, publishedAt,
  competitorName,
  "competitorLogo": competitorLogo${IMAGE},
  "competitorLogoOnDark": competitorLogoOnDark${IMAGE},
  "headline": headline${ACCENT_TITLE},
  subtitle, primaryButtonLabel, secondaryButtonLabel,
  "chooseHeader": chooseHeader${ACCENT_SECTION_HEADER},
  "webflowChoice": webflowChoice{ "title": title${ACCENT_TITLE}, reasons },
  "competitorChoice": competitorChoice{ "image": image${IMAGE}, "title": title${ACCENT_TITLE}, reasons },
  "tableHeader": tableHeader${ACCENT_SECTION_HEADER},
  tableGroups[]{ _key, label, rows[]{ _key, feature, webflow, competitor } },
  "reasonsHeader": reasonsHeader${ACCENT_SECTION_HEADER},
  reasons[]{ _key, "image": image${IMAGE}, title, text,
    stats[]{ _key, value, label, source, sourceUrl } },
  "migrationHeader": migrationHeader${ACCENT_SECTION_HEADER},
  migrationSteps[]{ _key, name, description, "image": image${IMAGE} },
  "caseStudiesHeader": caseStudiesHeader${ACCENT_SECTION_HEADER},
  "caseStudies": caseStudies[defined(@->slug.current) && !(@->_id in path("drafts.**"))]->{
    ${CASE_STUDY_CARD_FIELDS}
  },
  "latestCaseStudies": *[_type == "caseStudy" && defined(slug.current) && !(_id in path("drafts.**"))]
    | order(publishedAt desc, title asc)[0...3]{ ${CASE_STUDY_CARD_FIELDS} },
  faqSections[]{ _key, title, faqs[]{ _key, question, answer } },
  "seo": seo${SEO}
}
```

Rendering notes for Astro: an empty optional field renders nothing (no empty wrappers); a section with no header and no items is skipped. `caseStudies` empty → render `latestCaseStudies`; both empty → no section. Card title = `cardTitle ?? title`. Meta: `seo` → `title` / `subtitle` → siteSettings. JSON-LD (if any) goes through the shared helper; no `offers`.

### `testimonial` — Testimonials
| Field | Name | Type | Rules |
|---|---|---|---|
| Quote | `quote` | text | required, max length TBD by design |
| Author Name | `authorName` | string | required |
| Author Role and Company | `authorRole` | string | e.g. "VP of Digital, Verifone" |
| Author Photo | `authorPhoto` | image (hotspot) | alt auto = author name |
| Company Logo | `companyLogo` | image (SVG preferred) | alt auto from role/company |
| KPIs | `kpis` | array of `kpi` objects | max 2 |

`kpi` object: `value` (string, e.g. "$700M+") · `description` (string).
Preview: author name · role · photo.

### `post` — Blog
| Field | Name | Type | Rules |
|---|---|---|---|
| Headline | `title` | string | required |
| Slug | `slug` | slug (from title) | required, unique (**added**: needed for `/blog/[slug]`) |
| Thumbnail | `thumbnail` | image (hotspot) | required, alt required |
| Short Description | `excerpt` | text | required, max ~200 chars (used in cards + meta description fallback) |
| Time to Read | `readTime` | number (minutes) | optional override. If empty, auto-calculated from article word count at build |
| Date | `publishedAt` | datetime | required, default now |
| Category | `category` | reference → `category` | required, exactly one |
| Article | `body` | Portable Text | see "Article blocks" |
| Author | `author` | reference → `author` | required |
| FAQ Sections | `faqSections` | array of `faqSection` | optional (see "FAQs") |
| SEO | `seo` | `seo` object | optional, falls back to title/excerpt/thumbnail |

Preview: title · category · date · thumbnail.

**Author:** the 5 author fields (name, position, photo, LinkedIn, short bio) move to an `author` document, and each post picks one. Editors fill an author once instead of on every post, and fixing a bio updates every article.

**FAQs:** instead of defining "FAQ types" and then selecting a type on each question, types are sections that contain their questions:
```
faqSections: [
  { title: "Pricing",  faqs: [ {question, answer}, {question, answer} ] },
  { title: "Process",  faqs: [ {question, answer} ] }
]
```
Same result on the page (questions grouped by type), no dynamic dropdown needed, and editors can't pick a type that doesn't exist. Rendered as FAQPage JSON-LD for SEO/AEO.

`faqSection` object: `title` (string, required) · `faqs` (array of `faq`, min 1).
`faq` object: `question` (string, required) · `answer` (Portable Text, simple: paragraphs, bold, italic, links).

**Article blocks** (Portable Text, Sanity's rich text field): H2, H3, H4, paragraph, bold, italic, links (internal/external), bullet + numbered lists, blockquote, image (alt + optional caption), table (`@sanity/table` plugin; Portable Text has no native tables). No embeds, videos, code or CTA blocks.

### `author`
| Field | Name | Type | Rules |
|---|---|---|---|
| Name | `name` | string | required |
| Position | `position` | string | |
| Photo | `photo` | image (hotspot) | alt auto = name |
| LinkedIn | `linkedinUrl` | url | |
| Short Bio | `bio` | text | max ~300 chars |

### `category` (shared by clients + blog)
| Field | Name | Type | Rules |
|---|---|---|---|
| Title | `title` | string | required, unique |
| Slug | `slug` | slug | required (used by blog filter `?category=`) |

Document (not a hardcoded list) so the blog filter dropdown and editors can manage it. Seeded with the 23 values below. Display is uppercased with CSS; stored in the casing below.

Seed: Fintech · SaaS · HR Tech · Cleantech · Venture Capital · E-Commerce · Marketing · Recruiting · Consumer · Design Studio · AI & Technology · SaaS / B2B Tech · Sales Tech · Cybersecurity · Marketing Tech · Professional Services · Agency · Nonprofit · Hospitality · Energy · Media & Entertainment · Education · Healthcare

---

## Shared objects
| Object | Fields |
|---|---|
| `seo` | metaTitle (≤60 chars, warning), metaDescription (≤160 chars, warning), ogImage (1200×630), noIndex (bool), canonicalUrl (optional override). Empty fields fall back to siteSettings defaults |
| `link` | label, type (`internal` / `external` / `contact`), internalRef (page singleton, post or service), externalUrl, openInNewTab. `contact` opens the contact popup |
| `button` | link + variant (`gradient` / `gradient-outline` / `white` / `glass`) |
| `sectionHeader` | eyebrow, title, description |
| `stat` | value (string, e.g. "$700M+"), label, source + sourceUrl (optional, `comparison.reasons[].stats` only, v0.13) |
| `kpi` | value, description, label (optional, case study results only, v0.12) |
| `caseStudyCallout` | title (required), items[] (strings, min 1). `caseStudy.body` only (v0.12) |
| `accentTitle` | one-block Portable Text title with the "Gradient" (`accent`) decorator (see `service`) |
| `processStep` | name, description, note (optional link line), features[], image + alt (see `service`). In `comparison.migrationSteps` only name, description, image (v0.13) |
| `accentSectionHeader` | eyebrow, title (`accentTitle`), description (v0.13, see `comparison`) |
| `comparisonChoice` / `comparisonTableGroup` / `comparisonTableRow` / `comparisonReason` | `comparison` only (v0.13) |

---

## Singletons
| Document | Fields |
|---|---|
| `siteSettings` | see "Site Settings" below |
| `homePage` / `workPage` / `pricingPage` / `testimonialsPage` / `blogPage` | `seo` only — one object, one form. All page copy is authored directly in the corresponding Astro component. |

---

## Site Settings (`siteSettings` singleton)

Tabs (Sanity field groups):

| Tab | Fields |
|---|---|
| **General** | siteName, siteUrl (production URL, used for canonicals/sitemap), logo, contact email |
| **SEO & Meta** | titleTemplate (e.g. `%s | BenorMedia`), defaultMetaTitle (Home fallback), defaultMetaDescription, defaultOgImage (1200×630), twitterHandle, googleSiteVerification |
| **Organization** (JSON-LD) | legalName, description, logo (square), sameAs (social profile URLs), foundingYear, address (optional) |
| **Global sections** | ctaBanner (eyebrow, title, buttons[], socialProofText), contactModal (title, description, successMessage) |

Handled in code, not CMS: favicon + app icons (`/public`), robots.txt, sitemap, noindex on preview/staging deploys (by env var, so a CMS toggle can never de-index production by mistake). Navigation and Footer are also authored in Astro components.

## Tabs on routable documents

Routable documents use field groups:

| Document | Tabs |
|---|---|
| `post` | **Content** (all post fields, default) · **SEO** |
| `service` | **Overview** (default) · **Hero** · **Problem** · **Process** · **FAQs** · **SEO** |
| `caseStudy` | **Overview** (default) · **Hero** · **Article** · **Results** · **Card** · **Related** · **SEO** |
| `comparison` | **Overview** (default) · **Hero** · **What to choose** · **Table** · **Why switch** · **Migration** · **Case studies** · **FAQs** · **Card** · **SEO** |

The **SEO** tab holds the `seo` object (metaTitle, metaDescription, ogImage, noIndex, canonicalUrl).

Page singletons (`homePage`, `workPage`, …) hold `seo` only and don't need tabs.

Meta resolution order: page/post/service `seo` field → generated from content (title/excerpt/thumbnail for posts; name/subtitle for services) → `siteSettings` defaults.

## Rules
- Every content image has alt text. Logos, icons and author photos auto-generate alt from the related name (editor can override).
- Routable documents: `post` (`/blog/[slug]`), `service` (`/<slug>`, from `src/pages/[service].astro`; reserved slugs blocked by validation), `caseStudy` (`/case-studies/[slug]`) and `comparison` (`/comparison/[slug]`). Page routes (`/`, `/work`, `/pricing`, `/testimonials`, `/blog`) are static Astro pages that read only their SEO singleton from Sanity.
- Deleting a `category`, `author` or `testimonial` that is referenced is blocked by Sanity by default. Keep it that way.
- Astro queries only fields listed here. Any new field → update this file first.

## Open questions
- Testimonial `quote` max length.
- Category uniqueness: on `title` (current) or on `slug`?
