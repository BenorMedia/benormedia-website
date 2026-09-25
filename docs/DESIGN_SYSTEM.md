# BenorMedia — Design System (v0.3 DRAFT)

> Source: manual export from Figma + Home.png + follow-up specs from project lead.
> Status: DRAFT. Pending Figma MCP QA (Dev seat). Values marked `TODO` must not be treated as final.
> Rule for all agents: never invent a token. If a value is missing, use the closest existing token and log it in `docs/DECISIONS.md` as an open question.

---

## 1. Sizing model

All sizes use `rem`, driven by a fluid root font-size. Values are identical to Figma's `em` values (Figma/Webflow set this on `body`; we set it on `html` to avoid em compounding).

| Viewport | Root font-size | Text scale |
|---|---|---|
| ≥ 1440px | 14px (fixed) | Desktop |
| 992–1439px | 1vw | Desktop |
| 768–991px | 12px (fixed) | Desktop |
| ≤ 767px | 9px (fixed) | Mobile (§3.2) |

```css
html { font-size: 1vw; }
@media (min-width: 1440px) { html { font-size: 14px; } }
@media (min-width: 768px) and (max-width: 991px) { html { font-size: 12px; } }
@media (max-width: 767px) { html { font-size: 9px; } }
```

**Known behavior:** at 991→992px the root drops from 12px to 9.92px (≈17% smaller). Accepted unless design says otherwise.

### Unit rules
- `rem` for everything: type, spacing, sizing, gaps.
- Exception: internal padding of components whose padding must follow their own text size (buttons, tags) uses `em` on purpose.
- `px` only for: border widths, border-radius, blur, and fixed media-query values.

---

## 2. Fonts

| Role | Family | Source | Weights |
|---|---|---|---|
| Headline | Brulia Display | Self-hosted `/public/fonts/brulia-display.woff2` | 400 only |
| Body | Acumin Pro (`"acumin-pro"`) | Adobe Fonts kit | 400 (all text), 400 italic, 700, 700 italic |

Brulia file check (done): family "Brulia Display", Regular, weight 400, © Harbor Bickmore 2022. Full Spanish coverage (á é í ó ú ñ ü ¿ ¡). WOFF2 = 12 KB.

```css
@font-face {
  font-family: "Brulia Display";
  src: url("/fonts/brulia-display.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```
- Preload the Brulia woff2 in `<head>` (used above the fold in H1).
- Adobe Fonts kit must whitelist `localhost`, Vercel preview domains, and the production domain.
- Confirm Brulia license covers web self-hosting.

---

## 3. Typography

Global classes, same names as Figma. Heading mapping (`xxl`→H1, `xl`→H2, `l`→H3) is a default pattern, not a rule: any element can use any class. Semantic tag is chosen for SEO/a11y; class is chosen for look.

All styles: `font-weight: 400; letter-spacing: 0;`

Font assignment assumption: `c-text_*` = Brulia Display, `c-paragraph_*` + `c-button` = Acumin Pro. **TODO confirm.**

### 3.1 Scale

| Class | Desktop | Mobile (≤767) | Line-height |
|---|---|---|---|
| `c-text_xxl` | 5.5rem | 4rem | 1.2 |
| `c-text_xl` | 3.91rem | 3.9rem | 1.2 |
| `c-text_l` | 2.34rem | 2.7rem | 1.4 |
| `c-text_m` | 1.85rem | 2.5rem | 1.4 |
| `c-text` | 1.3rem | 1.8rem | 1.2 |
| `c-text_s` | 1.04rem | 1.7rem | 1.2 |
| `c-text_xs` | 0.78rem | 1.352rem | 1.2 |
| `c-paragraph_xl` | 3rem | 3rem | 1.6 |
| `c-paragraph_l` | 1.67rem | 2rem | 1.6 |
| `c-paragraph_m` | 1.3rem | 1.8rem | 1.6 |
| `c-paragraph` | 1.04rem | 1.352rem | 1.5 |
| `c-paragraph_s` | 0.9rem | 1.2rem | 1.5 |
| `c-button` | 1.3rem | 1.6rem | 1.5 |

### 3.2 Implementation

```css
:root {
  --fs-text-xxl: 5.5rem;   --fs-text-xl: 3.91rem;  --fs-text-l: 2.34rem;
  --fs-text-m: 1.85rem;    --fs-text: 1.3rem;      --fs-text-s: 1.04rem;
  --fs-text-xs: 0.78rem;
  --fs-p-xl: 3rem;         --fs-p-l: 1.67rem;      --fs-p-m: 1.3rem;
  --fs-p: 1.04rem;         --fs-p-s: 0.9rem;       --fs-button: 1.3rem;
}
@media (max-width: 767px) {
  :root {
    --fs-text-xxl: 4rem;   --fs-text-xl: 3.9rem;   --fs-text-l: 2.7rem;
    --fs-text-m: 2.5rem;   --fs-text: 1.8rem;      --fs-text-s: 1.7rem;
    --fs-text-xs: 1.352rem;
    --fs-p-xl: 3rem;       --fs-p-l: 2rem;         --fs-p-m: 1.8rem;
    --fs-p: 1.352rem;      --fs-p-s: 1.2rem;       --fs-button: 1.6rem;
  }
}

.c-text_xxl { font-family: var(--font-heading); font-size: var(--fs-text-xxl); line-height: 1.2; }
.c-text_xl  { font-family: var(--font-heading); font-size: var(--fs-text-xl);  line-height: 1.2; }
.c-text_l   { font-family: var(--font-heading); font-size: var(--fs-text-l);   line-height: 1.4; }
.c-text_m   { font-family: var(--font-heading); font-size: var(--fs-text-m);   line-height: 1.4; }
.c-text     { font-family: var(--font-heading); font-size: var(--fs-text);     line-height: 1.2; }
.c-text_s   { font-family: var(--font-heading); font-size: var(--fs-text-s);   line-height: 1.2; }
.c-text_xs  { font-family: var(--font-heading); font-size: var(--fs-text-xs);  line-height: 1.2; }
.c-paragraph_xl { font-family: var(--font-body); font-size: var(--fs-p-xl); line-height: 1.6; }
.c-paragraph_l  { font-family: var(--font-body); font-size: var(--fs-p-l);  line-height: 1.6; }
.c-paragraph_m  { font-family: var(--font-body); font-size: var(--fs-p-m);  line-height: 1.6; }
.c-paragraph    { font-family: var(--font-body); font-size: var(--fs-p);    line-height: 1.5; }
.c-paragraph_s  { font-family: var(--font-body); font-size: var(--fs-p-s);  line-height: 1.5; }
```
Global defaults: `body` uses `c-paragraph` values + `--color-text`; `h1–h6` use `--font-heading`, weight 400, `--color-heading`, margin 0.

### 3.3 Eyebrow / label pattern
Small uppercase label with border ("CASE STUDIES", "SERVICES"). Two variants: `is-default` and `is-accent`. Locked 2026-09-25.

Shared box: `padding: 0.5em 1.05em` (project-lead adjustment 2026-09-25 from Figma 10/16/8/16 px), `border-radius: 3px`, `border: 0.5px solid`, `font-family: var(--font-body)`, `font-size: 0.9375rem` (15 px), `line-height: normal`, `letter-spacing: 0.064em` (0.96 px), `text-transform: uppercase`, `display: inline-flex; align-items: center`.

| Variant | Border | Background | Text | Weight | Squares |
|---|---|---|---|---|---|
| `is-default` | `var(--color-gray)` | none | `var(--color-text)` | 400 | Yes, both sides |
| `is-accent` | `var(--color-accent)` | `color-mix(in srgb, var(--color-accent) 8%, transparent)` | `var(--color-accent)` | 600 | No |

Default squares (`::before` left, `::after` right): 0.625rem × 0.625rem, `background: var(--color-white)`, `border: 0.5px solid var(--color-gray)`, `border-radius: 1.5px`, `position: absolute`, vertically centered via `top: 50%; transform: translateY(-50%)`, `left: -0.344rem` / `right: -0.281rem`.

---

## 4. Colors

```css
:root {
  --font-heading: "Brulia Display", sans-serif;
  --font-body: "acumin-pro", sans-serif;

  /* Base */
  --color-white: #FFFFFF;           /* primary bg */

  /* Text (light bg) */
  --color-text: #5B6170;            /* primary text */
  --color-heading: #12142B;         /* all headings on white bg */
  --color-black-secondary: #212427; /* secondary black */
  --color-text-secondary: #4F4F4F;  /* secondary body text */

  /* Brand */
  --color-accent: #3467E5;          /* specific elements only, defined per component */
  --color-blue: #6275F6;
  --color-blue-light: #6BB0F7;
  --gradient-primary: linear-gradient(106deg, #6275F6 2.88%, #6BB0F7 96.84%);

  /* Neutrals */
  --color-gray: #C9CEDA;
  --color-gray-light: #F0F0F0;

  /* Borders */
  --color-border: #E4E6EA;
  --border-default: 1px solid var(--color-border);
}
```
- `--color-accent`: only where the lead specifies during build.
- TODO: text color on dark/gradient bg (hero, CTA). Assumed `--color-white`.

---

## 5. Surfaces

- **Borders:** default `var(--border-default)`. Some elements differ; defined per component.
- **Border radius:** varies per element; defined per component at build time (no global scale).
- **Shadows:** none. Do not add shadows to any element.

---

## 6. Motion (global)

```css
:root {
  --duration-hover: 800ms;
  --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1); /* PROPOSED "smooth" easing */
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
```
Section animations (marquees, counters, etc.): TODO, pending animation spec.

---

## 7. Buttons

One component, four variants. Variant = `is-` combo class on the link.

### 7.1 Structure
Link block (`<a>`) handles layout, background, border and hover. Inner text element handles **only color** (needed so the gradient can be clipped to text).

```html
<a href="#" class="c-button is-gradient">
  <span class="c-button__text">Get in Touch</span>
</a>
```
Astro: `<Button variant="gradient" href="...">Label</Button>` renders exactly this markup. Use `<button>` with the same classes only for form submits / non-navigation actions.

### 7.2 Variants

| Variant | Class | Background | Border | Text |
|---|---|---|---|---|
| Gradient Solid | `is-gradient` | `--gradient-primary` | none | white |
| Gradient Transparent | `is-gradient-outline` | transparent | 1px gradient | gradient (clip text) |
| White Solid | `is-white` | #FFF | 1px gradient | gradient (clip text) |
| White Transparent | `is-glass` | rgba(255,255,255,0.10) + blur(10px) | 1px solid #FFF | white |

Gradient border assumed (Figma `var(--Gradient, #6275F6)`, #6275F6 = fallback). Verify in Figma QA.

### 7.3 CSS

```css
/* Base: link block */
.c-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8em 1.5em;          /* em on purpose: follows button font-size */
  border-radius: 3px;
  font-family: var(--font-body);
  font-size: var(--fs-button);
  font-weight: 400;
  line-height: 1.5;
  text-decoration: none;
  transition: transform var(--duration-hover) var(--ease-smooth);
}
.c-button:hover { transform: translateY(-7%); }
.c-button:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }

/* Text: color only */
.c-button__text { color: var(--color-white); }

/* 1. Gradient Solid */
.c-button.is-gradient { background: var(--gradient-primary); }

/* 2 + 3. Gradient 1px border via masked pseudo-element */
.c-button.is-gradient-outline::before,
.c-button.is-white::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: var(--gradient-primary);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  pointer-events: none;
}
.c-button.is-gradient-outline { background: transparent; }
.c-button.is-white { background: var(--color-white); }

/* 2 + 3. Gradient text */
.c-button.is-gradient-outline .c-button__text,
.c-button.is-white .c-button__text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
          background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* 4. White Transparent (glass) */
.c-button.is-glass {
  background: rgba(255, 255, 255, 0.10);
  border: 1px solid var(--color-white);
  -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
}
```

Notes:
- Gradient on text spans the text width only (not the full button). Matches Figma if the gradient is applied to the text layer.
- Rendered check at 1440 (root 14px): font 18.2px, padding ≈ 14.6px / 27.3px. TODO verify against Figma px.

---

## 8. Layout

### 8.1 Container
```css
.c-container {
  max-width: 1440px;
  margin-inline: auto;
  padding: 5rem 3rem;
}
```
TODO: is 5rem vertical the section spacing, or is there a separate section token?

### 8.2 Breakpoints
`767 / 991 / 1440` (see §1).

### 8.3 Grid / gaps
TODO: columns, gutters, standard gaps.

---

## 9. Still missing (Figma QA)

- Button gradient-vs-solid border (variants 2, 3)
- Button padding verification in px
- Eyebrow/label and tag/pill specs ("SALES TECH", "SAAS", "FINTECH")
- Spacing scale / gaps / grid
- Section vertical spacing
- Icon sizes
- Decorative assets as SVG: hero line pattern, center tech mark, footer wordmark
- Animation spec per section

---

## 10. Home — section inventory

| # | Section | Component | Dynamic (Sanity) | Motion (TBD) |
|---|---|---|---|---|
| 1 | Nav (Services dropdown, Work, Pricing, Testimonials, CTA) | `c-nav` | siteSettings | Dropdown |
| 2 | Hero: eyebrow, H1, lead, 2 CTAs, social proof, 2 stats | `c-hero` | homePage | Counter? bg pattern? |
| 3 | Logo strip "Trusted by 100+ B2B teams" | `c-logos` | client | Marquee |
| 4 | Featured Work: 2 case cards (quote, author, 2 stats) | `c-featured` | caseStudy | — |
| 5 | Services: 3 accordion items + diagram, 2 CTAs | `c-services` | service | Accordion |
| 6 | Our Work: 6 image cards + 9 list rows + "View all" | `c-work` | project | Hover |
| 7 | Technologies: categories w/ icons, center mark, capability marquee | `c-tech` | technology | Marquee |
| 8 | Testimonials: 2-row marquee | `c-testimonials` | testimonial | Marquee |
| 9 | CTA banner | `c-cta` | siteSettings | bg pattern? |
| 10 | Footer: image, link columns, partner badges, socials, wordmark, legal | `c-footer` | siteSettings | — |

Content notes:
- Footer reads "Built with Webflow" → update for the Astro build.
- Hero eyebrow mentions Webflow partnership → confirm copy with new positioning.
- Placeholders (Lorem ipsum, XXX+) → final copy needed before content entry.
