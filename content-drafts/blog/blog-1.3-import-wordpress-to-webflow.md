---
slug: import-wordpress-to-webflow
url: /blog/import-wordpress-to-webflow
pageType: guide
draft: false
blockedBy: []
topicId: "1.3"
wave: 1
title: "How to Import WordPress Posts into Webflow CMS | BenorMedia"
description: "How to import WordPress blog posts into the Webflow CMS: export the XML, convert it to CSV, map fields, and fix rich text, images, and internal links."
h1: "How to import WordPress blog posts into the Webflow CMS, step by step"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-17
updatedAt: 2026-10-17
reviewEvery: none
primaryKeyword: "import wordpress to webflow"
secondaryKeywords: []
takeaways:
  - "Webflow has no automatic WordPress converter for content; you export a WXR XML file, convert it to CSV, and import it into a CMS Collection."
  - "Build the Collection and its reference Collections (authors, categories) before importing posts, because references match by slug."
  - "Image fields import from URLs but don't get responsive variants, and images inside rich text stay tied to the source until you move them."
  - "Rewrite internal links in the CSV before the import, and redirect every old post URL that changes."
  - "Import into a test Collection first and check a sample of posts before you publish anything."
faqHeading: "Questions about importing WordPress into Webflow"
faq:
  - q: "Can Webflow import a WordPress XML file directly?"
    a: "No. Webflow's CMS imports CSV files. Its help center says to export the WordPress XML file and convert it to CSV with an XML-to-CSV converter before importing."
  - q: "Is there an app that imports WordPress posts into Webflow?"
    a: "Yes. WP to Webflow is a free third-party app in Webflow's marketplace that imports posts, images, tags, and categories. Webflow says it doesn't endorse or certify marketplace apps, so test it on a copy first."
  - q: "How large can a Webflow CSV import be?"
    a: "A CSV file can be up to 4 MB, and the number of items you can import depends on your site plan. Split larger blogs into several files."
  - q: "Do WordPress categories and tags import into Webflow?"
    a: "They can, as Reference or Multi-reference fields that point to separate Collections. Webflow matches each value to an existing item's slug, and multiple values are separated by semicolons."
  - q: "Will my WordPress post URLs stay the same in Webflow?"
    a: "Only if you keep the same slugs and the same folder. Webflow serves Collection items under the Collection's path, such as /blog/post-slug, so date-based or root-level WordPress URLs need 301 redirects."
related:
  - /guides/wordpress-to-webflow-migration
  - /webflow-migration
  - /website-redesign
sources:
  - label: "Webflow Help Center: Migrate your site to Webflow overview"
    url: https://help.webflow.com/hc/en-us/articles/51622865825171-Migrate-your-site-to-Webflow-overview
    accessed: 2026-10-17
  - label: "Webflow Help Center: Migrate your site from WordPress to Webflow"
    url: https://help.webflow.com/hc/en-us/articles/33961193662739-Migrate-your-site-from-WordPress-to-Webflow
    accessed: 2026-10-17
  - label: "Webflow Help Center: How do I import content into the Webflow CMS?"
    url: https://help.webflow.com/hc/en-us/articles/33961290794771
    accessed: 2026-10-17
  - label: "Webflow Marketplace: WP to Webflow"
    url: https://webflow.com/apps/detail/wp-to-webflow
    accessed: 2026-10-17
  - label: "WordPress.org Documentation: Tools Export Screen"
    url: https://wordpress.org/documentation/article/tools-export-screen/
    accessed: 2026-10-17
  - label: "WordPress Developer Resources: Data Flow and Data Format"
    url: https://developer.wordpress.org/block-editor/explanations/architecture/data-flow/
    accessed: 2026-10-17
  - label: "Webflow Help Center: How do I set up redirects in Webflow?"
    url: https://help.webflow.com/hc/en-us/articles/33961294898835-How-do-I-set-up-redirects-in-Webflow
    accessed: 2026-10-15
  - label: "Google Search Central: Site moves with URL changes"
    url: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
    accessed: 2026-10-15
  - label: "BenorMedia: How to Migrate WordPress to Webflow"
    url: https://www.benormedia.com/guides/wordpress-to-webflow-migration
    accessed: 2026-10-15
volatile:
  - "Webflow CSV import: CMS panel, Import; 4 MB file; item count by plan; rich text cleanup; image URLs without responsive variants; semicolon-separated multi values; references matched by slug; file fields not importable; empty required reference imports as Draft (source: How do I import content into the Webflow CMS?, updated 2026-08-18)"
  - "Webflow WordPress migration steps: export XML, convert to CSV, create Collection, map fields (source: updated 2026-05-12)"
  - "No automated way to convert a site from another platform; migration is a rebuild (source: Migrate your site to Webflow overview, checked 2026-10-17)"
  - "WP to Webflow app: Eclipse SRL, free, posts, images, tags, categories; Webflow doesn't endorse marketplace apps (source: app listing, checked 2026-10-17)"
volatileChecked: 2026-10-17
inbound:
  - page: /guides/wordpress-to-webflow-migration
    anchor: "import WordPress blog posts into the Webflow CMS"
    sentence: "In the content migration step: For the blog itself, see how to import WordPress blog posts into the Webflow CMS."
  - page: /webflow-migration
    anchor: "how the blog import works"
    sentence: "Where the page describes moving CMS content: Here's how the blog import works, step by step."
editorNotes:
  - "The topic row asks for a test import on a test site. The steps come from Webflow's and WordPress's documentation; the post makes no claim of a specific test run."
  - "Little search demand (10 a month); the post is written to answer AI assistant and sales questions in full."
  - "No 30-day recheck and no AI note, per Sergio's answers of 2026-10-15."
---

To import WordPress to Webflow, export your posts as an XML file, convert it to a CSV file, build a matching Collection in the Webflow CMS, and import it. This guide is for marketing teams moving a blog to a new Webflow site. The import takes minutes; the mapping decides whether the posts keep their search rankings.

## Can you import WordPress to Webflow automatically?

Not completely. Webflow's help center says there's no automated way to convert a site from another platform into Webflow, and describes a migration as a rebuild, not a transfer. WordPress themes don't convert, so the design, templates, and static pages of your existing WordPress site are rebuilt by hand in the Webflow Designer. Blog content is the exception: posts are structured data, so they can move in bulk through the CMS CSV import.

You have two routes:

- **CSV import.** Export a WXR file from WordPress, convert it to CSV, and import it into a Webflow CMS Collection. This is the route Webflow documents, and it gives you full control over every field.
- **A marketplace app.** WP to Webflow, a free app built by Eclipse SRL, imports posts, images, tags, and categories into a Webflow CMS plan site. Webflow lists it as approved but says it doesn't endorse or certify marketplace apps, so test it on a copy of the site first.

This guide follows the CSV route, because it's the one you can check line by line before anything reaches the live site. It covers the blog and its WordPress content, not the entire WordPress site.

## How do you export your blog posts from WordPress?

Before you export anything, back up the WordPress site and make a content inventory: every post, its URL, its SEO metadata, and its organic traffic over the last 12 months. The inventory tells you which high-traffic posts to check first after the import, and it becomes the source list for redirects.

In the WordPress dashboard, go to Tools, then Export. WordPress creates an XML file in the WordPress eXtended RSS format, usually called a WXR file. It contains posts, pages, custom post types, comments, custom fields, categories, tags, custom taxonomies, and users.

Choose **Posts** rather than All content. That option lets you filter by category, author, date range, and status, so you can export only published posts and leave drafts behind. The export process doesn't package your media files; the file in XML format refers to images by their URLs on the WordPress website, which is why the old site has to stay online until the images are moved.

Two details of the export matter later:

- **Post content keeps the block editor's markup.** The block editor stores each post as HTML with HTML comments as block delimiters, such as `<!-- wp:image -->` around an image. The HTML still renders, but the comments are noise in a Webflow rich text field, so strip them during conversion.
- **Featured images are stored as IDs.** A post's featured image is saved as the ID of a media attachment, not as a URL. Your converter has to look up the attachment's URL before the image can import into a Webflow Image field.

## How do you convert the WordPress XML file to a CSV for Webflow?

Webflow's WordPress migration article says to convert the XML file to CSV with an XML-to-CSV converter. A spreadsheet or a short script works too, and an export plugin such as WP All Export can write a CSV file straight from WordPress, skipping the XML step. Whatever you use, aim for one row per post and one column per Webflow field.

Table: Mapping WordPress post data to Webflow CMS fields

| WordPress data | Webflow field type | Notes |
| --- | --- | --- |
| Title | Name (Plain text) | Required on every item |
| Slug (post name) | Slug | Keep the WordPress slug so URLs stay as close as possible |
| Content | Rich text | Strip block comments; Webflow may remove unsupported elements, classes, and attributes |
| Excerpt | Plain text | Useful for listing cards and a default meta description |
| Publish date | Date/Time | Use one consistent date and time format in the column |
| Featured image | Image | A full URL; look it up from the attachment ID |
| Author | Reference | Value must match the slug of an item in an Authors Collection |
| Categories | Multi-reference | Separate several values with semicolons |
| Tags | Multi-reference | Same rule as categories |
| SEO title and meta description from a plugin | Plain text | Stored as custom fields; map them to fields used in the template's SEO settings |

Keep the file under 4 MB. If the blog is bigger, split the export by date range and import it in batches. The number of items you can import also depends on your Webflow site plan, so check the plan's CMS item limit before you start.

## How do you set up the Webflow CMS Collection before importing?

Build the reference Collections first, then the posts Collection.

1. **Create an Authors Collection and a Categories Collection.** Import or add their items with the same slugs WordPress uses. Webflow matches Reference values by converting the text to a slug and looking for an item with that slug, so "Product Updates" in the CSV finds the item with the slug product-updates.
2. **Create the posts Collection** with every field from the mapping table. Set the field types before importing; a Plain text field can't take rich text later without rework.
3. **Start the import** from the CMS panel: open the Collection, choose Import, upload the CSV, and map each column to a field.
4. **Check the status of new items.** Imported items arrive as Staged. If a required Reference field is empty, Webflow imports that item as a Draft, so a missing author shows up as a draft you can find and fix.

If you need to re-run the import after fixing the CSV, Webflow can link and update matching items instead of creating duplicates. Matching uses the Item ID from a Webflow export, so export the Collection once after the first import and keep the IDs.

## What happens to rich text, images, and internal links during the import?

These three need the most care in any WordPress to Webflow migration.

**Rich text.** Webflow accepts HTML in a Rich text field, but it may clean up embeds and remove elements, classes, and attributes it doesn't support. Shortcodes from WordPress plugins arrive as plain text in square brackets. Search the CSV for "[" and replace each shortcode with plain HTML or remove it before importing. Tables, embedded forms, and custom blocks usually need to be rebuilt by hand in the Webflow Designer.

**Images.** Image fields take a URL, but Webflow says images imported this way don't get responsive image variants, and it recommends uploading images directly where that matters. Images inside rich text stay linked to their original location, and Webflow warns that rich text images break if the source site is deleted. Before you shut down WordPress, move those images to Webflow and update their URLs, or the posts will lose their images.

**Internal links.** Links inside post content still point at WordPress URLs. If your permalinks were /2023/05/post-name/ and the Webflow blog serves /blog/post-name, every internal link becomes a redirect at best. Run a find-and-replace on the content column before the import so internal links point straight at the new URLs.

File fields, such as downloadable PDFs, can't be imported through CSV. Upload those files to Webflow and add them to the items by hand.

## What happens to plugin functionality and custom code from your existing WordPress site?

It doesn't come across. A typical WordPress site depends on plugins for SEO metadata, forms, related posts, comments, and caching, and none of that plugin functionality travels with a CSV file. Plan a replacement for each one in the Webflow project:

- **SEO plugin.** Export the meta title and meta description from the plugin's custom fields and map them to Plain text fields, then use them in the Collection template's SEO settings.
- **Forms.** Rebuild them with Webflow forms or embed your marketing platform's form, and test where submissions go.
- **Comments.** They're in the WordPress export, but the Webflow CMS doesn't display them on its own. Decide whether to drop them or add a third-party tool.
- **Custom post types.** Each one becomes its own CMS Collection with its own CSV import.
- **Custom code.** Tracking scripts and embeds from the theme go into Webflow's custom code settings once, not into every post.

Caching and security plugins have no Webflow equivalent to install, because Webflow hosts the site. Check site performance on the new templates with Google PageSpeed Insights instead.

## How do you check the import and protect SEO before you publish?

Import into a test Collection on a duplicate of the site first, then repeat on the real Collection once the test is clean. Check a sample of posts against the WordPress originals:

- headings, lists, links, and images render as expected in the rich text;
- featured images, authors, and categories are attached to the right posts;
- dates, slugs, and SEO metadata came through without changes;
- no shortcodes, block comments, or empty paragraphs remain;
- internal links point at the new URLs, not at WordPress or at redirects.

Then plan the redirects. If the URL structure changes, every old WordPress URL needs a 301 redirect to its new address, or search engines and readers hit broken links. In Webflow, a capture group can redirect a whole folder in one rule, which keeps the list short; Webflow recommends staying around 1,000 redirects. After launch, submit the new sitemap in Google Search Console and watch its indexing report for 404 errors, alongside organic traffic and keyword rankings for your top posts. Google says rankings can fluctuate while it recrawls a site whose URLs changed, so compare against the inventory over weeks, not days. Our [WordPress to Webflow migration guide](/guides/wordpress-to-webflow-migration) covers the redirects, the launch checks, and the SEO steps for the whole site.

We run WordPress to Webflow migrations for B2B and SaaS companies, so we have an interest in this topic. For how we handle the full move, see our [Webflow migration](/webflow-migration) page.
