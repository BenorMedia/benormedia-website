---
slug: webflow-accessibility-checklist
url: /blog/webflow-accessibility-checklist
pageType: guide
draft: false
blockedBy: []
topicId: "7.2"
wave: 2
title: "Webflow Accessibility Checklist for WCAG 2.2 AA | BenorMedia"
description: "A Webflow accessibility checklist for WCAG 2.2 AA: what designers, developers, and content editors each fix, and how to test with Webflow's own tools."
h1: "Webflow accessibility checklist for WCAG 2.2 AA: what designers and developers each fix"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-18
updatedAt: 2026-10-18
reviewEvery: none
primaryKeyword: "webflow accessibility checklist"
secondaryKeywords: []
takeaways:
  - "WCAG 2.2 level AA includes every level A and AA success criterion; WCAG 2.2 added nine criteria to 2.1, six of them at level A or AA."
  - "Webflow's built-in elements are accessible, but tabs, dropdowns, sliders, and the navbar need a visible keyboard focus style that you add."
  - "Webflow's Audit panel checks alt text, link text, heading order, and duplicate IDs, but not color contrast, components, or CMS-bound images."
  - "Designers own contrast, focus styles, target sizes, and motion; developers own semantics, labels, and keyboard behavior; editors own alt text and link text."
  - "Test with a keyboard, a screen reader, and 200% zoom before launch; automated checks catch only part of the problems."
faqHeading: "Questions about Webflow accessibility"
faq:
  - q: "Is Webflow accessible?"
    a: "Webflow's built-in elements, including forms, buttons, links, and navigation, support screen readers and keyboards. Whether a site is accessible depends on how it's designed and built, so contrast, focus styles, labels, and alt text are still up to your team."
  - q: "Does Webflow have an accessibility checker?"
    a: "Yes. The Audit panel in the Designer flags missing alt text, non-descriptive link text, skipped heading levels, and duplicate element IDs. The color picker has a contrast checker, and the Vision preview tool simulates different types of vision."
  - q: "What's new in WCAG 2.2?"
    a: "WCAG 2.2 became a W3C Recommendation on October 5, 2023. It added nine success criteria, including Focus Not Obscured, Target Size (Minimum), Dragging Movements, Consistent Help, Redundant Entry, and Accessible Authentication, and removed 4.1.1 Parsing."
  - q: "What is the minimum target size in WCAG 2.2?"
    a: "Success criterion 2.5.8, Target Size (Minimum), asks for pointer targets of at least 24 by 24 CSS pixels, with exceptions such as enough spacing between smaller targets or links inside a sentence."
  - q: "Can an accessibility checklist make a site legally compliant?"
    a: "No checklist can confirm legal compliance. It helps a team meet WCAG success criteria; whether a specific law applies to your site, and what it requires, is a question for legal counsel."
related:
  - /website-redesign
  - /b2b-saas-web-design
  - /ongoing-website-support
sources:
  - label: "W3C: Web Content Accessibility Guidelines (WCAG) 2.2"
    url: https://www.w3.org/TR/WCAG22/
    accessed: 2026-10-18
  - label: "W3C WAI: What's New in WCAG 2.2"
    url: https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
    accessed: 2026-10-18
  - label: "W3C WAI: WCAG 2.2 is a W3C Recommendation"
    url: https://www.w3.org/WAI/news/2023-10-05/wcag22rec
    accessed: 2026-10-17
  - label: "Webflow Help Center: Accessible elements in Webflow"
    url: https://help.webflow.com/hc/en-us/articles/33961346219923-Accessible-elements-in-Webflow
    accessed: 2026-10-18
  - label: "Webflow Help Center: Intro to the Audit panel"
    url: https://help.webflow.com/hc/en-us/articles/33961313088531-Intro-to-the-Audit-panel
    accessed: 2026-10-18
  - label: "Webflow Help Center: States"
    url: https://help.webflow.com/hc/en-us/articles/33961301727251-States
    accessed: 2026-10-18
  - label: "Webflow Help Center: Use accessible color contrast ratios"
    url: https://help.webflow.com/hc/en-us/articles/42465890163219-Use-accessible-color-contrast-ratios
    accessed: 2026-10-18
  - label: "Webflow Help Center: Make your site more accessible"
    url: https://help.webflow.com/hc/en-us/articles/33961407521939-Make-your-site-more-accessible
    accessed: 2026-10-18
  - label: "Webflow Help Center: Set your site's language code"
    url: https://help.webflow.com/hc/en-us/articles/33961361019411-Set-your-site-s-language-code
    accessed: 2026-10-18
  - label: "Webflow Help Center: Troubleshoot smooth scroll and reduced motion"
    url: https://help.webflow.com/hc/en-us/articles/33961403269907-Check-system-motion-settings
    accessed: 2026-10-18
  - label: "Webflow Help Center: Custom attributes"
    url: https://help.webflow.com/hc/en-us/articles/33961389460115-Custom-attributes
    accessed: 2026-10-18
  - label: "BenorMedia: Website Redesign Services for B2B & SaaS"
    url: https://www.benormedia.com/website-redesign
    accessed: 2026-10-15
volatile:
  - "WCAG 2.2 new criteria and removal of 4.1.1 (source: What's New in WCAG 2.2, checked 2026-10-18)"
  - "Webflow accessible elements and focus-style requirements for Tabs, Dropdown, Slider, Navbar (source: updated 2026-03-26)"
  - "Audit panel: four accessibility checks; no contrast, components, Lightbox, or CMS-bound images (source: updated 2026-03-26)"
  - "Focused and Focused (keyboard) states (source: updated 2026-07-02)"
  - "Contrast checker in the color picker; 4.5:1 and 3:1 (source: updated 2025-06-25)"
  - "Language code set in the Localize panel (source: updated 2026-07-02); smooth scroll respects reduced motion on published sites (source: updated 2026-07-17)"
volatileChecked: 2026-10-18
inbound:
  - page: /website-redesign
    anchor: "Webflow accessibility checklist"
    sentence: "Where the page lists accessibility tests before launch: Use our Webflow accessibility checklist for WCAG 2.2 AA."
  - page: /b2b-saas-web-design
    anchor: "what designers and developers each fix"
    sentence: "Where the page describes design and build: See what designers and developers each fix for accessibility."
editorNotes:
  - "The topic row asks for 'the failures seen most'. Without audit records, the post lists the criteria and Webflow behaviors that commonly need work according to Webflow's and W3C's documentation; it claims no audit findings."
  - "No legal claims, per the topic row. The European Accessibility Act is topic 7.5 and isn't covered here."
  - "Once post 1.4 (launch checklist) is live, link it from the testing section."
---

This Webflow accessibility checklist maps WCAG 2.2 level AA to the people who build the site: designers, developers, and content editors. Accessibility issues can stop people who use screen readers or keyboards from reading your pages or sending a demo request, so each fix has an owner. It isn't legal advice.

## What does WCAG 2.2 AA mean for an accessible Webflow website?

WCAG 2.2 is the W3C's current version of the Web Content Accessibility Guidelines, a widely used set of accessibility standards, and a W3C Recommendation since October 5, 2023. Each requirement is a success criterion at level A, AA, or AAA, and conforming at level AA means meeting every level A and level AA criterion. Level AA is the target this checklist uses. Whether a legal requirement applies to your site is a separate question for counsel; WCAG compliance is a technical measure of website accessibility.

WCAG 2.2 added nine success criteria to WCAG 2.1. Six of them are at level A or AA, and several touch common patterns on marketing sites:

- **2.4.11 Focus Not Obscured (Minimum), AA:** a focused element can't be completely hidden by content such as a sticky header or a cookie banner.
- **2.5.7 Dragging Movements, AA:** anything you can drag, such as a slider handle, needs a single-pointer alternative.
- **2.5.8 Target Size (Minimum), AA:** pointer targets are at least 24 by 24 CSS pixels, with exceptions such as enough spacing around smaller targets.
- **3.2.6 Consistent Help, A:** help options repeated across pages, such as a contact link or chat, appear in the same relative order.
- **3.3.7 Redundant Entry, A:** information already entered in a process is filled in or selectable, not typed again.
- **3.3.8 Accessible Authentication (Minimum), AA:** logging in can't depend on memorizing, solving a puzzle, or transcribing, without an alternative.

WCAG 2.2 also removed 4.1.1 Parsing, which the W3C now treats as obsolete.

## Which built-in accessibility features does Webflow have, and what's missing?

Webflow lists most of its built-in elements as accessible to screen readers and keyboards without custom code, including forms, buttons, link blocks, images, videos, sections, lists, and Collection lists. Four interactive elements need extra work: Tabs, Dropdown, Slider, and Navbar need a visible focus style that you set, and the slider dots need their focus style set in CSS.

Webflow also gives you three accessibility tools in the Webflow Designer:

- **The Audit panel** flags missing alt text, non-descriptive link text, skipped heading levels, and duplicate element IDs. It doesn't check color contrast, and it can't check issues inside components, images in Lightbox elements, or images bound to CMS fields.
- **The contrast checker** in the color picker rates each text color as AA, AAA, or Fail, using 4.5:1 for regular text and 3:1 for large text at level AA.
- **Vision preview and Text zoom preview** let you see the design as people with different types of vision see it, and with text resizing.

Everything else, from proper heading structure to form labels, depends on how the site is designed and built. Webflow gives you accessible building blocks; it doesn't make a site accessible on its own.

## What should designers fix, from color contrast to target size?

Designers decide most of what users see, so these checks, from sufficient color contrast to focus states, belong in the design files before anything is built.

Table: Designer checklist for WCAG 2.2 AA on Webflow

| Check | WCAG criterion | How to check in Webflow |
| --- | --- | --- |
| Text contrast of 4.5:1, or 3:1 for large text | 1.4.3 Contrast (Minimum), AA | Contrast checker in the color picker |
| Contrast of 3:1 for icons, input borders, and focus outlines | 1.4.11 Non-text Contrast, AA | Manual check of the color pair |
| Color isn't the only way to show meaning | 1.4.1 Use of Color, A | Vision preview |
| A visible keyboard focus style on every interactive element | 2.4.7 Focus Visible, AA | Focused (keyboard) state |
| Sticky headers and banners don't cover the focused element | 2.4.11 Focus Not Obscured (Minimum), AA | Keyboard test on the published site |
| Buttons and links at least 24 by 24 CSS pixels, or spaced apart | 2.5.8 Target Size (Minimum), AA | Measure in the Designer |
| Text still readable at 200% zoom | 1.4.4 Resize Text, AA | Text zoom preview and browser zoom |
| Moving content, like carousels and background videos, can be paused | 2.2.2 Pause, Stop, Hide, A | Play and pause controls |

Plan for motion as well. Webflow's smooth scroll already respects a visitor's reduced motion setting on published sites, and Webflow advises against overriding that preference. Large parallax and scroll animations should follow the same rule.

## What should developers fix in the Webflow Designer?

Developers turn the design into structure, so their checks are about semantics, labels, and keyboard behavior.

1. **Use semantic HTML elements.** Set the right HTML tag on layout elements (header, nav, main, footer, section, article) and use real Button and Link elements for anything clickable. A div with a click interaction isn't reachable by keyboard navigation, and semantic structure is what screen readers use to move around a page.
2. **Set heading levels by structure, not size.** One H1 per page, and no skipped levels. Style headings with classes, so a small H2 doesn't become a bold paragraph.
3. **Style the Focused (keyboard) state.** Webflow's Focused (keyboard) state maps to focus-visible, and Webflow suggests an outline, which shows focus without shifting the layout. Set it on Tabs, Dropdown, Slider, and Navbar too.
4. **Label every form field.** Each input needs a visible label, not just placeholder text, and clear error messages (WCAG 3.3.2 Labels or Instructions). Inaccessible forms cost leads directly, so test every form.
5. **Add ARIA attributes only where needed.** Webflow's custom attributes let you add an aria-label to an icon-only button or link. Native elements with visible text don't need one.
6. **Add a skip link.** A "Skip to main content" link as the first focusable element lets keyboard users bypass the navigation (2.4.1 Bypass Blocks).
7. **Set the site's language code.** Webflow sets it in the Localize panel, under Locales. It helps screen readers choose the right pronunciation (3.1.1 Language of Page).
8. **Give sliders a non-drag control.** Arrows and dots satisfy 2.5.7 Dragging Movements; check they work by keyboard.
9. **Keep IDs unique.** Duplicate IDs break form labels and anchor links, and the Audit panel flags them.

## What should content editors check, from alt text to link text?

After launch, every new page and CMS item can add problems, and the Audit panel can't see images bound to CMS fields. Give editors a short list:

- every meaningful image has alt text (alternative text) that describes it in context, and decorative images have empty alt text;
- link text says where the link goes ("Read the pricing guide", not "Click here");
- headings in rich text follow the page's order, with no skipped levels;
- PDFs and downloads have an accessible alternative, or the same content on a page;
- contact and help links stay in the same place across pages.

## How do you run accessibility audits on a Webflow site before launch?

Combine Webflow's checks with manual tests, because automated checks catch only part of the problems. Lighthouse in Chrome's developer tools adds another automated pass if you want one.

1. **Run the Audit panel** on every static page and template, and fix every item.
2. **Use only the keyboard.** Tab through the home page, a CMS template, and every form. Every interactive element should be reachable, the focus should always be visible, and nothing should trap the focus or hide behind a sticky header.
3. **Run a screen reader test** on the main templates: VoiceOver on macOS or NVDA on Windows. Listen for missing labels, unclear link text, and images announced by file name.
4. **Zoom to 200%** in the browser and check that text reflows without overlapping or cutting off, then check the main screen sizes from phone to desktop.
5. **Check contrast** for text with the color picker and for buttons, icons, and focus outlines by hand.
6. **Repeat after big changes,** such as a new template, a new interaction, or a new cookie banner.

Record what you tested, when, and on which pages. When an accessibility question comes up later, that record shows what the site met at launch. For the other launch-week checks, see our [website launch checklist](/blog/website-launch-checklist).

We design and build B2B and SaaS websites on Webflow and test accessibility before launch, so we have an interest in this topic. For how testing fits into a project, see our [website redesign](/website-redesign) page.
