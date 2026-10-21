# Sitemap (v0.2)

English only. No locale prefix.

| Page | Route | Type | Sanity source | Notes |
|---|---|---|---|---|
| Home | `/` | Singleton | `homePage` | Home.png received |
| Work | `/work` | Singleton + list | `workPage` (SEO) + `client[]` | Client listing, no client detail pages. Rows link to the client's case study when one is published |
| Case studies | `/case-studies` | Static + list | `caseStudy[]` (SEO in code) | Every published case study, newest first, no pagination or filters. Noindex and out of the sitemap until the first case study is published (2026-10-20) |
| Case study | `/case-studies/[slug]` | Dynamic | `caseStudy` | Figma template 3764:16012 |
| About | `/about` | Static | none (copy and SEO in code; leaders from `src/lib/new-pages/authors.ts`) | Figma 3790:37097, desktop only. Placeholder copy (`TODO: COPY`) and third-party placeholder photos (`TODO: ASSET`) to replace before it goes to `main`. Linked from the footer ABOUT column (2026-10-21) |
| Pricing | `/pricing` | Singleton | `pricingPage` | |
| Testimonials | `/testimonials` | Singleton + list | `testimonialsPage` + `testimonial[]` | |
| Custom Websites & Migrations | `/custom-websites-migrations` | Service template | `service` | |
| Growth (AEO / SEO / CRO) | `/growth` | Service template | `service` | |
| Ongoing Website Support | `/ongoing-website-support` | Service template | `service` | |
| Blog | `/blog` | Singleton + list | `blogPage` + `post[]` | Search input + category filter dropdown. Optional for launch (DECISIONS 2026-09-29) |
| Blog article | `/blog/[slug]` | Dynamic | `post` | |
| 404 | `/404` | Static | `siteSettings` | |

Global UI (not pages):
- **Services**: header dropdown only. No services index page and no `/services/` prefix: each service lives at the root (`/<service-slug>`), built from `src/pages/[service].astro`.
- **Reserved slugs**: a service slug can never be `work`, `case-studies`, `about`, `pricing`, `testimonials`, `blog`, `studio`, `dev`, `404` (enforced by Sanity validation).
- **Contact**: popup (`c-contact-modal`), opened by every "Get in Touch" link. No `/contact` page.
- **Legal**: no pages for now. Footer legal links hidden until they exist.

Not public:
- `/studio`: Sanity Studio (noindex)
- `/dev/styleguide`: design system check page (noindex, blocked before launch)
- `/dev/case-study`: case-study template with placeholder content (noindex), for reviewing the template while case studies are drafts

## Blog listing behavior
- All posts rendered at build time; search (title + excerpt) and category dropdown filter client-side with vanilla JS. No page reload.
- Filter state reflected in URL (`?q=&category=`) so filtered views are shareable.
- Empty state when nothing matches.
- If the blog grows past ~100 posts, revisit (pagination or Pagefind).

## Redirects (old Webflow → new)
TODO: export the live Webflow `/sitemap.xml` and map every URL here.

| Old URL | New URL | Status |
|---|---|---|
| | | 301 |
