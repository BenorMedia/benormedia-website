---
slug: headless-cms-visual-editor
url: /blog/headless-cms-visual-editor
pageType: guide
draft: false
blockedBy: []
topicId: "3.4"
wave: 2
title: "Headless CMS Visual Editor: What Marketers Can Edit"
description: "What a headless CMS visual editor does, which CMSs offer one, what marketers can change without a developer, and what a developer must set up first."
h1: "Headless CMS visual editor: what marketers can edit without a developer, and what still needs one"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-26
updatedAt: 2026-10-26
reviewEvery: 90 days
primaryKeyword: "headless cms visual editor"
secondaryKeywords: ["headless cms for marketers"]
takeaways:
  - "A visual editor in a headless CMS puts the live page next to the content fields: click an element, edit its field, see the change."
  - "Copy, images, and section order are the marketer's job. New sections, page types, and schema changes are still a developer's."
  - "Setup comes first: preview routes, draft content, and permission to load the site in a frame. On Astro, Sanity's and TinaCMS's visual editing both need server rendering."
  - "Check the plan. Strapi's free plan shows a full-screen preview; side-by-side Live Preview is on Growth and Enterprise."
  - "Before you pick a CMS, build one real landing page in your top two options."
faqHeading: "Questions about headless CMS visual editors"
faq:
  - q: "Do headless CMSs have a visual editor?"
    a: "Most major ones do, under their own names: Presentation in Sanity, the Visual Editor in Storyblok, live preview in Contentful and Payload, Preview in Strapi, and the Page Builder in Prismic. Each one needs a developer to connect it to your front end before marketers can use it."
  - q: "Is a visual editor the same as a page builder?"
    a: "Not always. Contentful's live preview, for example, shows the page and jumps to the field you click. Prismic's Page Builder, or Sanity with drag and drop switched on, goes further: editors add, reorder, and remove sections that developers built in advance."
  - q: "Does visual editing need server-side rendering?"
    a: "Usually, for the preview routes. Sanity's Astro integration says its Visual Editing only works on server-side rendered pages, and TinaCMS's Astro guide requires a server adapter. The public pages can still be static."
  - q: "Is visual editing included in every plan?"
    a: "Not always. On Strapi's free plan you get a full-screen preview; the side-by-side Live Preview is on Growth and Enterprise. Contentful keeps locale switching inside live preview for its Premium plan. Plans change, so check the vendor's pricing page before you commit."
  - q: "Can marketers break the design with a visual editor?"
    a: "It's harder than in a free-form page builder, because editors work with sections a developer built and tested. A weak page can still go live, though, so use roles, drafts, and a review step for pricing, legal, and home page changes."
related:
  - /headless-cms-agency
  - /custom-websites-migrations
  - /guides/webflow-vs-custom-code
sources:
  - label: "Sanity Docs: Preview and page building"
    url: https://www.sanity.io/docs/user-guides/preview-and-page-building
    accessed: 2026-10-26
  - label: "Sanity: @sanity/astro, the official Sanity integration for Astro"
    url: https://www.sanity.io/plugins/sanity-astro
    accessed: 2026-10-26
  - label: "Storyblok Docs: Manage the Visual Editor"
    url: https://www.storyblok.com/docs/concepts/visual-editor
    accessed: 2026-10-26
  - label: "Contentful Help Center: Live preview"
    url: https://www.contentful.com/help/content-preview/live-preview/
    accessed: 2026-10-26
  - label: "Payload Docs: Live Preview"
    url: https://payloadcms.com/docs/live-preview/overview
    accessed: 2026-10-26
  - label: "Strapi Docs: Preview"
    url: https://docs.strapi.io/cms/features/preview
    accessed: 2026-10-26
  - label: "Prismic Docs: Create pages"
    url: https://prismic.io/docs/create-pages
    accessed: 2026-10-26
  - label: "TinaCMS Docs: Visual Editing Setup for Astro"
    url: https://tina.io/docs/contextual-editing/astro
    accessed: 2026-10-26
volatile:
  - "Strapi Preview: full screen on the Free plan; Live Preview with side-by-side view and double-click editing on Growth and Enterprise; Live Preview experimental, dynamic zone fields not handled (source: Strapi Docs)"
  - "Contentful live preview: custom editors not supported; locale switching in live preview on the Premium plan only (source: Contentful Help Center)"
  - "Sanity Presentation: drag and drop reordering must be enabled by a developer; shared previews by link or QR code (source: Sanity Docs)"
  - "Storyblok Visual Editor requires the preview to be served over HTTPS (source: Storyblok Docs)"
  - "TinaCMS visual editing on Astro requires an SSR adapter (source: TinaCMS Docs)"
volatileChecked: 2026-10-26
inbound:
  - page: /headless-cms-agency
    anchor: "what marketers can edit in a headless CMS"
    sentence: "Where the page addresses editing after launch, link to the post."
  - page: /blog/headless-cms-comparison
    anchor: "headless CMS visual editors"
    sentence: "In the editor experience criterion, link to the post for how visual editing works in each CMS."
  - page: /blog/headless-cms-seo
    anchor: "preview routes for visual editing"
    sentence: "In the section on previews and staging sites, link to the post."
  - page: /blog/webflow-editor
    anchor: "visual editing in a headless CMS"
    sentence: "Where the post compares editing options for marketing teams, link to the post as the headless alternative."
editorNotes:
  - "Topic 3.4 re-scoped on 2026-10-26 to the query headless cms visual editor (150 US, KD 2), per rule changes 1 and 2. The original question, can marketers edit a headless site without developers, is the second H2."
  - "No CMS is ranked; the table is alphabetical and every cell comes from the vendor's own documentation, opened on 2026-10-26. No prices; plan names only where the docs tie a feature to a plan."
  - "'Our own site runs on Astro and Sanity' is published on /blog/headless-cms-seo, so it carries no marker. #P34-1 asks what our editors change on their own in Sanity; default deletes it."
  - "Link to /blog/astro-cms (3.2) from the setup section once it is live."
  - "No content score this time: the scoring subscription is paused until Sergio confirms it."
---

A headless CMS visual editor lets marketers see and edit the real page, not only form fields: click a heading in the preview, change it, and watch the page update. Most major headless CMSs now offer one, but a developer has to connect it to your site first. This guide is for B2B SaaS marketing teams, as of October 2026.

## What is a visual editor in a headless CMS?

A headless CMS visual editor shows your live front end next to, or inside, the content editing screen. Editors see changes on the real design as they type, and clicking an element jumps to the field that holds it. Some editors also let marketers assemble pages by adding, removing, and reordering sections that developers built in advance.

Don't confuse it with Webflow's Designer or a drag-and-drop site builder, where an editor can move a column or change a font. On a headless site, the design is code: a developer builds the hero, the logo bar, and the pricing table as components, and the CMS stores the words and images they show. The visual editor makes those easy to change where they appear. The layout stays with the developer.

Most vendors wire it up the same way. The CMS opens your site in a frame, your site switches to draft content, and the two send messages back and forth so an edit shows up without a reload. Payload's docs describe it as rendering "your front-end application directly within the Admin Panel," where "your changes take effect in real-time."

## Can marketers edit a headless site without developers?

Yes, for content and for assembling pages from approved sections. Once the visual editor is set up, a marketer can change copy, swap images, reorder sections, and publish or schedule pages alone. No, for anything that needs new code: a new type of section, a new page template, a change to the content model, or a new integration.

Table: Who does what on a headless site with a visual editor

| Task | Marketer alone? | Why |
| --- | --- | --- |
| Edit headings, body copy, and calls to action | Yes | Text fields, edited in place |
| Swap images and update alt text | Yes | Asset fields |
| Reorder or remove sections on a page | Usually | Needs a page builder or drag and drop turned on |
| Build a new landing page from existing sections | Usually | Works when the page type and sections already exist |
| Add a new kind of section, such as a pricing table | No | A developer builds the component and its fields |
| Change a layout, spacing, or brand styles | No | Design lives in code |
| Add a new page type or field | No | Content model changes are code changes |
| Connect a form to a CRM | No | Integration work |

Prismic's docs draw the line clearly: writers get the slices and page types a developer has exposed, and nothing else. Every headless CMS works this way. So plan the section library around the pages marketers build most, such as campaign landing pages, comparison pages, and customer stories.

## Which headless CMSs have a visual editor, and how do they compare?

Most of them do, with different depth. Some show a live preview and jump from an element to its field. Others add page building, letting editors add, reorder, and duplicate sections. All of them need a developer to connect the preview to your front end, and some tie the best features to higher plans.

Table: Visual editing in seven headless CMSs, listed alphabetically (from each vendor's docs, October 2026)

| CMS | Feature | What editors get | Setup and limits |
| --- | --- | --- | --- |
| Contentful | Live preview | Side-by-side preview, live updates, and an inspector mode that jumps from content to its field | Live updates and inspector mode need Contentful's live preview SDK; custom editors aren't supported; switching locales in live preview needs the Premium plan |
| Payload | Live Preview | The front end rendered inside the Admin Panel, updating in real time before saving | The front end listens for window.postMessage events and re-renders with the data it receives |
| Prismic | Page Builder | Pages built from slices: add, reorder, duplicate, and pick variations, with previews | Developers build every slice in code and set up preview URLs |
| Sanity | Presentation | Side-by-side preview, click-to-edit overlays, drag and drop reordering, desktop and mobile views, preview sharing by link or QR code | Drag and drop must be enabled per field; on Astro, Visual Editing only works on server-rendered pages |
| Storyblok | Visual Editor | Real-time preview, with clicks that move between a block and its element on the page | Preview must be served over HTTPS; blocks need storyblokEditable attributes and the preview bridge |
| Strapi | Preview and Live Preview | Full-screen preview on the Free plan; side-by-side Live Preview with double-click editing on Growth and Enterprise | Live Preview is experimental; fields in dynamic zones aren't handled; double-click editing doesn't work with GraphQL |
| TinaCMS | Visual editing | Live editing with click-to-edit on content stored in Git | On Astro, needs a server adapter, because each edit re-renders the component on the server |

The setup column decides more than the features column. If live preview sits on a plan you won't buy, or skips the field types your pages are built from, marketers end up editing blind on the pages where they need a preview most. Our [headless CMS comparison](/blog/headless-cms-comparison) covers the other criteria, such as localization and workflow, without a ranking.

## What does a developer have to set up first?

A preview route that shows draft content, a way for the CMS to load your site in a frame, the click-to-edit wiring, and the section library editors will assemble pages from. Expect most of the effort in the components and content model, not the preview itself. On Astro, plan for server rendering on preview routes.

A typical setup checklist:

1. A preview route that fetches drafts instead of published content. Storyblok requests the draft version of each story, for example, and Strapi points the CMS at a preview handler that builds each URL.
2. Permission for the CMS to show your site in an iframe. Storyblok and Strapi both point to the frame-ancestors security header, and Contentful's help center says a "Refused to connect" error means the site's security setup is blocking the frame.
3. Server rendering where the CMS needs it. [Sanity's Astro integration](/blog/astro-cms) says "Visual Editing only works for server-side rendered pages," and TinaCMS's Astro setup requires a server adapter. Public pages can stay static.
4. Preview tokens kept on the server. They read draft content, and Storyblok's docs say to validate requests server-side and keep the token out of client bundles.
5. The click-to-edit wiring: overlays in Sanity, storyblokEditable attributes in Storyblok, field helpers in TinaCMS, the live preview SDK for Contentful's inspector mode, or content source maps in Strapi.
6. The section library itself, with each section built as a component with fields, tested on mobile, and given a one-line note on when to use it.
7. A noindex rule for preview and draft routes. Our post on [headless CMS SEO](/blog/headless-cms-seo) covers previews, redirects, and sitemaps before launch.

## How do you choose a headless CMS for visual editing?

Test it on your own pages. Build one real landing page, with your own sections, in your top two candidates, and ask the marketer who will use it to make five ordinary edits. Then work through five questions:

1. Does the preview show your real components with draft content, on desktop and mobile? Sanity's preview, for one, switches between the two viewports.
2. Can editors add, reorder, and duplicate sections, or only jump from an element to its field?
3. Does it handle your field types? Strapi's Live Preview skips fields in dynamic zones, and Contentful's live preview doesn't work with custom editors.
4. Which plan is it on? Strapi ties side-by-side Live Preview to Growth and Enterprise. On Astro, also confirm the visual editing path fits your rendering setup.
5. How does it handle drafts, scheduled publishing, and releases? Sanity's preview can switch between draft, content release, and published views of a page.

## What still needs a developer after launch?

New sections, design changes, changes to the content model, and integrations. A visual editor takes the developer out of routine publishing, not out of the site. Keep a small, regular block of developer time for new sections, and ask marketers to request them with an example page.

Marketers stay independent longer when the section library runs ahead of the campaign calendar. Build for the next six months, not only for launch; comparison tables, customer quotes, integration grids, and FAQ blocks are the usual gaps. Give each section a few options instead of open styling, such as an image on the left or right and a light or dark background. And decide who can publish what: blog posts can go live without review, while pricing, legal, and home page changes go through a reviewer.

Our own site runs on Astro and Sanity, and we build headless sites on Astro and Next.js with Sanity, so we have an interest in the topic. See our [headless CMS agency](/headless-cms-agency) page for how we run those projects, or our guide to [Webflow vs custom code](/guides/webflow-vs-custom-code) if you are still choosing between a visual builder and a headless stack.
