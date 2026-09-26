# Sanity ↔ Astro Data Contract (v0.5, approved)

Status: approved by the project lead 2026-09-25.

Approach: **repeatable data lives in Sanity documents; page copy is authored directly in Astro components.** Page singletons exist only to hold per-page SEO metadata. Global chrome (nav, footer) is authored in Astro components too.

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
| Name | `name` | string | required |
| Logo | `logo` | image (SVG preferred) | required. Alt auto = client name |
| Icon | `icon` | image (SVG preferred) | used in Home work list rows. Alt auto = client name |
| Card Thumbnail | `cardThumbnail` | image (hotspot) | used in Home work cards. Alt required |
| Website Screenshot | `websiteScreenshot` | image (hotspot) | alt required. Used in multiple components across the site |
| Testimonial | `testimonial` | reference → `testimonial` | optional |
| Funds Raised | `fundsRaised` | string | e.g. `$25.0M`. Template appends "Raised" |
| Category | `category` | reference → `category` | required, exactly one |
| Website URL | `websiteUrl` | url | optional |

Preview: name · category · logo.

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
| `link` | label, type (`internal` / `external` / `contact`), internalRef (page singleton or post), externalUrl, openInNewTab. `contact` opens the contact popup |
| `button` | link + variant (`gradient` / `gradient-outline` / `white` / `glass`) |
| `sectionHeader` | eyebrow, title, description |
| `stat` | value (string, e.g. "$700M+"), label |
| `kpi` | value, description |

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

Only `post` (the sole routable document type) uses field groups:

| Tab | Content |
|---|---|
| **Content** | all post fields (default tab) |
| **SEO** | `seo` object (metaTitle, metaDescription, ogImage, noIndex, canonicalUrl) |

Page singletons (`homePage`, `workPage`, …) hold `seo` only and don't need tabs.

Meta resolution order: page/post `seo` field → generated from content (title/excerpt/thumbnail for posts) → `siteSettings` defaults.

## Rules
- Every content image has alt text. Logos, icons and author photos auto-generate alt from the related name (editor can override).
- The only routable document is `post` (`/blog/[slug]`). Page routes (`/`, `/work`, `/pricing`, `/testimonials`, `/blog`) are static Astro pages that read only their SEO singleton from Sanity.
- Deleting a `category`, `author` or `testimonial` that is referenced is blocked by Sanity by default. Keep it that way.
- Astro queries only fields listed here. Any new field → update this file first.

## Open questions
- Testimonial `quote` max length.
- Category uniqueness: on `title` (current) or on `slug`?
