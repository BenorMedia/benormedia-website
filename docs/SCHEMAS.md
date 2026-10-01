# Sanity ↔ Astro Data Contract (v0.8, approved)

Status: v0.5 approved by the project lead 2026-09-25. v0.6 (`service` document) approved 2026-09-29. v0.7 (`client.orderRank`) requested by the lead 2026-09-29. v0.8 (`client.websiteVideo`) requested by the lead 2026-09-30. v0.9 (`client.sector`) requested by the lead 2026-10-01.

### v0.9 changes vs v0.8 (2026-10-01)
- **`client.sector`** (optional `string`, dropdown, one value): `agency` (Agency), `professional-services` (Professional Services), `saas` (SaaS). Projected in `CLIENT_LIST_FIELDS` (so `CLIENTS_BY_IDS` + `ALL_CLIENTS`). The Work page filters by it (View All · Agency · Professional Services · SaaS); `category` no longer drives any filter. Values are filled in Studio / MCP by the lead.

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
| Website URL | `websiteUrl` | url | optional |
| Order Rank | `orderRank` | string (LexoRank) | hidden, read-only. Set by the Studio drag-and-drop list (`@sanity/orderable-document-list`). Only the Work page listing sorts by it |

All fields are optional so clients can be bulk-created and published without waiting on assets. Enforce presence at query/render time (skip incomplete clients in listings) rather than at Studio level.

Preview: name · category · logo.

### `service` — Service pages (routable at `/<slug>`)
Fields are grouped in Studio tabs, one per page section, in this order.


| Tab | Field | Name | Type | Rules |
|---|---|---|---|---|
| Overview (default) | Service name | `name` | string | required. Studio title, hero breadcrumb, anywhere the service name appears |
| Overview | Slug | `slug` | slug (from name) | required, unique among services, lowercase kebab-case (`a-z`, `0-9`, `-`). Can't be a reserved slug: `work`, `pricing`, `testimonials`, `blog`, `studio`, `dev`, `404` (SITEMAP) |
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
| Features | `features` | array of string (tags input) | optional, no duplicates, order has no meaning |
| Image | `image` | image (hotspot) + `alt` | optional. Alt required when an image is set |

`accentTitle` (named type, array of Portable Text blocks):
- Exactly one block (max 1), style `normal` only, no lists, no annotations, no inline objects.
- One decorator: `accent`, titled "Gradient". Text marked with it renders with the brand gradient (`.c-section-header__accent` in Astro).
- Line breaks are `\n` characters inside span text (Shift+Enter in the editor). The renderer turns them into `<br />`.
- Shape: `[{ _type: "block", _key, style: "normal", markDefs: [], children: [{ _type: "span", _key, text, marks: [] | ["accent"] }] }]`.

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
| `stat` | value (string, e.g. "$700M+"), label |
| `kpi` | value, description |
| `accentTitle` | one-block Portable Text title with the "Gradient" (`accent`) decorator (see `service`) |
| `processStep` | name, description, features[], image + alt (see `service`) |

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

The **SEO** tab holds the `seo` object (metaTitle, metaDescription, ogImage, noIndex, canonicalUrl).

Page singletons (`homePage`, `workPage`, …) hold `seo` only and don't need tabs.

Meta resolution order: page/post/service `seo` field → generated from content (title/excerpt/thumbnail for posts; name/subtitle for services) → `siteSettings` defaults.

## Rules
- Every content image has alt text. Logos, icons and author photos auto-generate alt from the related name (editor can override).
- Routable documents: `post` (`/blog/[slug]`) and `service` (`/<slug>`, from `src/pages/[service].astro`; reserved slugs blocked by validation). Page routes (`/`, `/work`, `/pricing`, `/testimonials`, `/blog`) are static Astro pages that read only their SEO singleton from Sanity.
- Deleting a `category`, `author` or `testimonial` that is referenced is blocked by Sanity by default. Keep it that way.
- Astro queries only fields listed here. Any new field → update this file first.

## Open questions
- Testimonial `quote` max length.
- Category uniqueness: on `title` (current) or on `slug`?
