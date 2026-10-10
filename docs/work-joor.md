# Page content: /work/joor (case study)

Status: DRAFT v1, written 9 Oct 2026 for BenorMedia. Template: a new case-study template that follows the section order of Flow Ninja's case study pages (for example `flowninja.com/case-studies/judi-health-tm`): narrative hero with three stats, gallery, testimonial, summary, team credits, services, client background, challenge, solution, results, achievements, more work, CTA. Only the structure is borrowed. All copy is ours, and the visual design uses BenorMedia's own components and styles.

What this draft rests on:
- **From Sergio (9 Oct 2026):** we rebuilt JOOR's entire website, 100+ pages, 8+ languages, new design and development systems, and we've worked with JOOR for more than 3 years.
- **Already on benormedia.com:** "JOOR, a direct client for more than 3 years" (`/webflow-enterprise-agency`); JOOR listed on `/work` (Fashion, $107.5M raised).
- **JOOR's own website (read 9 Oct 2026):** the public facts in "About JOOR".
- **Not invented:** results, the client quote, team names and the language list. They are marked slots, and the page can't be released until a person fills or removes them. A case study with a real client's name on it has to carry real numbers and real words: JOOR will read it, AI answers will repeat any figure in it as fact, and US rules treat a made-up testimonial as a fake review.

## SEO fields

| Field | Value |
|---|---|
| URL | `/work/joor` |
| Canonical | `https://www.benormedia.com/work/joor` |
| Title tag | `JOOR Case Study: 100+ Pages in 8+ Languages \| BenorMedia` (56 characters) |
| Meta description | `How BenorMedia rebuilt JOOR's website: 100+ pages in 8+ languages on a new design system and development system, and 3+ years of work together.` (143 characters) |
| H1 | `How we rebuilt JOOR's website: 100+ pages, 8+ languages, one system.` |
| Primary keyword | JOOR case study |
| Secondary keywords | webflow case study, multilingual website redesign, enterprise website rebuild, b2b marketplace website design |
| Breadcrumb | Home › Work › JOOR |
| JSON-LD | `Article` + `BreadcrumbList`. `Article`: `headline` = H1, `description` = meta description, `author` and `publisher` = shared Organization `@id`, `datePublished` and `dateModified` = release date, `image` = hero screenshot, `about`: `{"@type": "Organization", "name": "JOOR", "url": "https://www.joor.com", "sameAs": ["https://www.linkedin.com/company/joor/"]}` [VERIFY: JOOR LinkedIn URL] |
| Open Graph | Title = H1; image = hero screenshot of joor.com |

## Visible copy

### 1. Hero
> New component: case-study hero. Tag chips, H1, three stats, one button. Reuse the existing stats styling from the home page block "Our impact in action." if it fits.

- Tags: Fashion · B2B wholesale platform · Localization · Webflow [VERIFY: confirm joor.com runs on Webflow; its assets load from Webflow's CDN]
- H1: How we rebuilt JOOR's website: 100+ pages, 8+ languages, one system.
- Stats:
  - **100+** pages rebuilt
  - **8+** languages
  - **3+ years** working together
- Button: "See live website" → `https://www.joor.com` (new tab)

### 2. Gallery
> New component: image gallery, 4 images, alt text written out below.

- Image 1: joor.com homepage, desktop. Alt: "JOOR homepage: The Leading Wholesale Platform for Global Fashion"
- Image 2: a Selling Wholesale page, desktop. Alt: "JOOR page for brands selling wholesale"
- Image 3: an industry page (e.g. Footwear) on mobile. Alt: "JOOR footwear industry page on mobile"
- Image 4: the same page in a second language. Alt: "JOOR footwear industry page in [FACT NEEDED: which second language to show; it goes into this alt text too]"

### 3. Testimonial
> Existing testimonial component (the one used for Surfe), with photo.

- Quote: [QUOTE: draft for JOOR to edit and approve; publish only the words the named person approves. Draft: "BenorMedia rebuilt our entire website and gave us a system our team can keep building on. Launching pages in 8+ languages no longer means starting from scratch, and three years in, they still work like part of our team."]
- Name and title: [PERSON: name and title of the JOOR contact who approves the quote, plus a photo]

### 4. Stats band with CTA
> Repeat the three hero stats in the stats band, then the button below.
- Button: "Talk to us about your website" (same target as "Get in Touch")

### 5. Summary
> Rich text, no heading on the page (or a small label "Summary").

JOOR runs a B2B wholesale platform for global fashion, connecting more than 14,000 brands with 700,000+ retail buyers in 150 countries. Its website has to explain two products to two audiences, in the languages they buy in. We rebuilt all of it: more than 100 pages in 8+ languages, on a new design system and a matching development system, so every page shares the same building blocks. Launch wasn't the end of the project. More than three years later, we're still shipping with JOOR's team.

### 5b. Project at a glance
> New component: a compact fact table or definition list, placed beside or under the summary. It gives readers, search engines and AI answers the key facts in one place.

- Client: JOOR (joor.com)
- Industry: Fashion wholesale, B2B platform
- Scope: Full website rebuild, design system, development system, localization
- Pages: 100+
- Languages: 8+ [FACT NEEDED: list the languages]
- Platform: Webflow [VERIFY]
- Engagement: 3+ years, ongoing
- Services: [Custom Websites & Migrations](/custom-websites-migrations), [Ongoing Website Support](/ongoing-website-support) [VERIFY: services used]

### 6. Team credits
> New component: up to three people with photo, name and role.

- Sergio Gancedo, Managing Director [VERIFY: role on this project]
- [PERSON: name, role, photo]
- [PERSON: name, role, photo]

### 7. What we did
> Chips or a short list, plus a "Talk to us" button.

Website strategy · Design system · Component library · Webflow development [VERIFY] · Localization in 8+ languages · CMS architecture · SEO and AEO readiness · Ongoing website support

### 8. About JOOR
- H2: About JOOR
- Body: JOOR calls itself the leading wholesale platform for global fashion. Founded in 2010, it gives brands and retailers one B2B platform to connect, sell, buy and manage wholesale. It connects more than 14,000 brands across 53 categories with 700,000+ retail buyers in 150 countries, and reports more than 120 billion dollars in wholesale transactions. Its customers sit on both sides of every order. Brands use JOOR to sell wholesale, manage orders and get paid. Retail buyers use it to discover brands, plan assortments and place orders. The company is remote-first, with a team spread across nine countries, from Spain and Italy to Japan and the US.

### 9. The challenge
- H2: The challenge
- Body: JOOR's website has a harder job than most B2B sites. It has to sell a platform to brands while giving retail buyers a reason to open an account. The two audiences arrive with different questions, from order management and payments to sourcing and assortment planning. It has to cover eight industries, from apparel and footwear to bridal and home, in the languages JOOR's customers do business in. And it has to keep pace with a company that launches features, events and campaigns all year. A site that grows page by page can't do that for long: every new page drifts a little further from the last, and every translation turns into a separate project. JOOR needed one system that could carry 100+ pages in 8+ languages without slowing its marketing team down. [VERIFY: optional, add one or two sentences on the state of the previous site]

### 10. Image row
> 3 images: design system overview (type, color, components), component library in the builder, a page in two languages side by side.

### 11. What we built
- H2: What we built
- Body intro: We rebuilt the site from the system up, then page by page.
- Items:
  - **A design system first.** We defined type, color, spacing, imagery and components once, then designed every page from that set. On a site with 100+ pages, consistency can't depend on someone remembering how the last page looked.
  - **A development system that mirrors it.** Every design component has a built counterpart with the same name and the same variants, so a new page is assembled from parts that already exist instead of being built from scratch.
  - **Two journeys from the first click.** The navigation splits early into Selling Wholesale for brands and Buying Wholesale for retailers. Each path has its own product pages, proof and next step: Request a Demo for brands, Open a Buyer Account for retailers. Industry pages cover the eight industries in JOOR's navigation, from apparel to home and design.
  - **8+ languages on the same templates.** Localized pages run on the same components and templates as the English site, so a page can launch in every market without a separate build. [FACT NEEDED: list the languages]
  - **Content the team can run.** Case studies, blog posts, webinars and guides sit in CMS Collections with their own templates and SEO fields. [VERIFY]
  - **Three years of shipping together.** Since launch we've kept working with JOOR's team on new pages, product launches and improvements to the system itself.

### 12. Image gallery
> 2 images: a Selling Wholesale page and a Buying Wholesale page side by side; the resources hub.

### 13. Results
- H2: Results
- Body intro: JOOR now has a website that grows with the business instead of needing a rebuild every few years.
- Items:
  - **One system for the whole site.** 100+ pages in 8+ languages run on one design system and one development system.
  - **A path for each audience.** Brands and retailers each land on pages written for them, with a clear next step.
  - **Consistency across markets.** New pages start from tested components, so quality holds in every language. [VERIFY]
  - **[RESULT NEEDED: one measured outcome. For example: time to launch a new page or locale before and after; organic traffic, demo requests or buyer sign-ups after launch; Core Web Vitals. A number JOOR is comfortable publishing.]**
  - **Still working together.** The work didn't end at launch. We've worked with JOOR for more than three years.

### 14. Achievements
- H2: Achievements
- Items:
  - Rebuilt the entire website: 100+ pages
  - 8+ languages on shared templates
  - A new design system
  - A matching development system and component library
  - Separate journeys for brands and retail buyers
  - 3+ years of ongoing work together

### 15. More work
> Two cards. Until the Surfe and Puzzle case studies exist, show one card for the work page and one for the enterprise page.

- Card 1: "100+ launches for B2B companies" → `/work`
- Card 2: "Webflow for enterprise teams: security, governance, and scale" → `/webflow-enterprise-agency`

### 16. CTA band
- H2: Planning a website that has to work in every market?
- Body: Tell us how many pages, languages and teams your site has to serve. We'll show you how we'd structure it.
- Buttons: "Get in Touch" · "See Pricing" → `/pricing`

### 17. Contact form
> Shared component, same as the service pages.

## Internal links

- Out: `https://www.joor.com` (external, new tab), `/work`, `/webflow-enterprise-agency`, `/pricing`.
- Into this page (add in the release commit for this page, not before, so no live page links to an unfinished case study):
  - `/work`: give the JOOR card a second link, "Read the case study" → `/work/joor`, and keep the external link to joor.com.
  - `/webflow-enterprise-agency`: in the hero proof line "JOOR, a direct client for more than 3 years, is listed on our work page.", link "JOOR" to `/work/joor`.
  - `/guides/webflow-enterprise`: link the first mention of multi-language sites to `/work/joor` with the anchor "JOOR's site in 8+ languages".
  - `/website-redesign`: the "JOOR" link in the close of section 5 points to `/work` until this page is released; switch it to `/work/joor`.

## Sources

| Fact on the page | Source | Checked |
|---|---|---|
| "The Leading Wholesale Platform for Global Fashion"; connects, sells, buys and manages wholesale in one B2B platform; 14,000+ brands in 53 categories; 700,000+ retail buyers; $120B+ wholesale transactions | https://www.joor.com/ | 9 Oct 2026 |
| Founded in 2010; 150 countries; remote-first team across Spain, Italy, the UK, France, Germany, Canada, Japan, Australia and the US | https://www.joor.com/about | 9 Oct 2026 |
| Navigation: Selling Wholesale and Buying Wholesale; eight industries (Apparel, Footwear, Accessories, Swimwear & Resort, Childrenswear, Sport & Outdoor, Bridal, Home & Design); Request a Demo; Open a Buyer Account; resources (case studies, blog, whitepapers and webinars, guide to wholesale fashion) | https://www.joor.com/ | 9 Oct 2026 |
| Rebuilt the entire website; 100+ pages; 8+ languages; new design and development systems; 3+ years working together | Sergio Gancedo, 9 Oct 2026 | Confirmed by Sergio |

## Slots a person must fill before release

1. [QUOTE] JOOR's approved testimonial, with name, title and photo. The draft sits inside the marker on purpose: deleting the marker deletes the draft, and only JOOR's approved words replace it.
2. [RESULT NEEDED] At least one measured outcome JOOR is happy to publish.
3. [FACT NEEDED] The list of languages, and which second language to show in the gallery.
4. [PERSON] Two more team members, with roles and photos; Sergio's role on the project.
5. [VERIFY] Platform (Webflow), the CMS statement in "What we built", the consistency statement in "Results", the services used ("Project at a glance"), and JOOR's LinkedIn URL for the structured data.
6. JOOR's OK to publish the case study and the screenshots (the site already names JOOR; a full case study is a step further).
7. Screenshots: nine images (four in the gallery, three in the image row, two in the second gallery), from the project files or captured from the live site once JOOR has said yes. Until then each image source in the data is a `[FACT NEEDED: image, ...]` marker.
