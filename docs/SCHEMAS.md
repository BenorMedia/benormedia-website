# Sanity ↔ Astro Data Contract (v0.2 DRAFT)

Status: DRAFT from Home.png + sitemap. The sanity agent refines this in Phase 2; the project lead approves before implementation. Fields for pages without Figma yet are placeholders.

Approach: fixed fields per page (no free page builder). Repeatable data = documents; page copy = singletons.

## Shared objects
| Object | Fields |
|---|---|
| `seo` | metaTitle, metaDescription, ogImage, noIndex (bool) |
| `link` | label, type (`internal` / `external` / `contact`), internalRef (page/service/post), externalUrl, openInNewTab. `contact` opens the contact popup |
| `button` | link + variant (`gradient` / `gradient-outline` / `white` / `glass`) |
| `sectionHeader` | eyebrow, title, description |
| `stat` | value (string, e.g. "$700M+"), label |
| `imageWithAlt` | image (hotspot) + alt (required) |

## Singletons
| Document | Fields |
|---|---|
| `siteSettings` | siteName, logo, nav (items with optional dropdown children), navCta (button), footer (image, link columns, partner badges[], socials[], legal links[] hidden for now), ctaBanner (eyebrow, title, buttons[], socialProofText), contactModal (title, description, successMessage), defaultSeo |
| `homePage` | hero (eyebrow, title, description, buttons[2], socialProof {avatars[], text}, stats[2]), logoStrip {title, clients[] → client}, featuredWork {header, projects[] → project}, services {header, services[] → service, buttons[]}, work {header, cardProjects[6] → project, listProjects[] → project, button}, technologies {header, categories[] {title, technologies[] → technology}, capabilities[] (string)}, testimonials {header, items[] → testimonial}, seo |
| `workPage` | hero, seo (TODO Figma) |
| `pricingPage` | hero, plans[] (TODO Figma), seo |
| `testimonialsPage` | hero, seo (TODO Figma) |
| `blogPage` | hero, seo (TODO Figma) |

## Documents
| Document | Fields |
|---|---|
| `client` | name, logo (svg preferred), website |
| `project` | title, client → client, coverImage, amountRaised (string), industry → tag, isCaseStudy (bool), caseStudy {quote, author → person, stats[2]}, order |
| `service` | title, slug (root-level URL; validation blocks reserved slugs: work, pricing, testimonials, blog, studio, dev, 404), shortDescription (Home accordion), hero, sections (TODO Figma), seo |
| `testimonial` | quote, author → person, client → client |
| `person` | name, role, company, photo |
| `technology` | name, icon, category |
| `tag` | name, slug (project industries: SaaS, Fintech, Sales Tech) |
| `post` | title, slug, excerpt, coverImage, body (Portable Text), author → person, publishedAt, category → blogCategory, seo |
| `blogCategory` | title, slug (used by blog filter dropdown) |

## Rules
- Every image has required alt.
- Every routable document has slug + seo. `project` is not routable (no detail pages).
- Reference arrays on singletons control order and selection shown on the page.
- Astro queries only fields listed here. Any new field → update this file first.
