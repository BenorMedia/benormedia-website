# Handoff — ui — Comparison assets

Date: 2026-10-22 · Author: ui agent · Branch: `feat/comparison` · Status: DONE

## What I did
- Exported the static visuals for `/comparison` and `/comparison/[slug]` from Figma `ipKvlka3lQ7tSWAtq3wSGa` (template 3790:37245, index 3790:37967) into `src/assets/comparison/` (`mockups/`, `logos/`, `icons/`). No components, no CSS, no tokens touched.
- **Mockups (SVG):** the 4 "Why SaaS teams switch" visuals are vector in Figma, exported as SVG with text outlined, no embedded rasters. Figma adds the canvas background rect and the parent page outline to node exports, so a cleanup script kept only the target node's group, removed unused ids/defs, rounded coordinates to 2 decimals and stripped whitespace. svgo is not a devDependency, so it was not run.
- **Light blue panel:** the panel behind each mockup is `#F5F9FE` with an 8px radius. No token matches, so it **stays inside the SVG**. The SVG's outer box is the panel, so no CSS background is needed. Logged in DECISIONS → Comparison (Proposed).
- **"What to choose" images (raster):** both are raster screenshots in Figma ("image 1571 / 1572"). Exported each image frame (3790:37378 / 3790:37395) at 2x with the Figma crop baked in, as JPEG q85 (PNG was 444 / 736 KB). Astro's image pipeline turns them into WebP at build.
- **Logos (raster):** all logos in Figma are raster image fills. The node exports had backgrounds baked in (a slice of the header gradient and the pill tints), so I rebuilt each one from its transparent Figma source fill with the exact Figma crop, at 2x, as transparent PNG. The white table-header logos are the same sources turned white with the alpha kept. This matches the Figma result: the "W" in the WordPress logo stays see-through.
- **Step icons (raster):** the 4 migration step icons are Firefly 3D rasters (48×48 in Figma), exported at 2x as PNG.
- **Chevron:** the small chevron in the hero WordPress pill (3790:37357) is a filled, rounded shape. The existing `CHEVRON` (blog-icons) and nav caret are stroked, so neither matches, and I exported it with Figma's exact path and `fill="currentColor"` (`#5B6170` in Figma = `--color-text`).
- **Reused, not exported:**
  - Hero line art (3790:37261 "Frame 178", 1920×747): it's the same art as `public/images/services/service-mid-hero-bg.webp` (+ `@2x.webp`), also 1920×747, used in `src/pages/[service].astro` (background-image, see the comment at about line 186). A side-by-side check matched. The Home `hero-lines-*.webp` are white-on-blue and don't match.
  - Index card glow (3790:37996): the same blurred circle as the `CaseStudyCard` orbit (`c-cs-card__orbit`: 545 box, r ≈ 98.3, blur 75.36, `--color-blue-500`), plus 3 rings. Rebuild it inline from that pattern rather than as a file, so the colors stay tokens. Exact Figma values:
    - Frame 544.82 square, centered on the 543×243 thumbnail (it overflows and gets clipped).
    - Glow: circle r 98.27, fill Blue 500, **opacity 0.1** (the case-study card uses 0.4), Gaussian blur stdDeviation 75.36.
    - Rings: stroke `#E4E6EA` (= `--color-border`), width 0.675, opacity 0.3, radii 97.92, 180.09 and 272.07, all centered.

## Manifest
Intrinsic size is the file's pixel size; "Figma size" is the display size at 1920. Use the alt texts when the image carries meaning. Use `alt=""` where marked decorative.

| File (`src/assets/comparison/…`) | Figma node | Intrinsic W×H | Figma size | Suggested alt | Reused existing? |
|---|---|---|---|---|---|
| `mockups/choose-webflow.jpg` | 3790:37378 (image 1571) | 1532×858 | 766×429, radius 8 | "Webflow Designer interface with the Webflow logo, style selectors and layout panels" | No |
| `mockups/choose-wordpress.jpg` | 3790:37395 (image 1572) | 1532×858 | 766×429, radius 8 | "WordPress admin dashboard showing the Themes screen on a laptop" | No |
| `mockups/reason-webflow-designer.svg` | 3791:39956 | 936×582 | 935.79×582 | "Mock Webflow Designer editing a page heading that reads Launch pages that actually convert" | No |
| `mockups/reason-plugins-vs-updates.svg` | 3791:40898 | 936×582 | 935.79×582 | "Mock WordPress plugins list with pending updates, next to a mock Webflow site panel reading Everything's up to date" | No |
| `mockups/reason-performance-ai.svg` | 3791:41146 | 934×582 | 934.02×582 | "Mock performance audit report next to a mock AI search answer that cites a website" | No |
| `mockups/reason-cms-localization.svg` | 3791:41453 | 936×582 | 935.79×582 | "Mock CMS collection of case studies with English, Spanish, German and French localized pages" | No |
| `logos/webflow.png` | 3790:38003 / 3790:37353 (image 1573) | 307×53 | 153.6×26.39 | "Webflow" | No |
| `logos/wordpress.png` | 3790:38006 / 3790:37356 (image 1574) | 324×75 | 161.92×37.43 | "WordPress" | No |
| `logos/framer.png` | 3790:38027 (image 1575) | 190×52 | 95.05×26 | "Framer" | No |
| `logos/wix.png` | 3790:38048 (image 1576) | 92×52 | 46.22×26 | "Wix" | No |
| `logos/webflow-white.png` | 3790:37423 (image 1569) | 334×60 | 167.24×30 | "Webflow" | No |
| `logos/wordpress-white.png` | 3790:37422 (image 1570) | 352×80 | box 160.8×40: fit to the 160.8 width, about 36.5 tall | "WordPress" | No |
| `icons/step-audit.png` | 3790:37754 | 96×96 | 48×48 | decorative, `alt=""` (step title next to it) | No |
| `icons/step-design-build.png` | 3790:37759 | 96×96 | 48×48 | decorative, `alt=""` | No |
| `icons/step-cms-seo.png` | 3792:41718 | 96×96 | 48×48 | decorative, `alt=""` | No |
| `icons/step-launch.png` | 3790:37769 | 96×96 | 48×48 | decorative, `alt=""` | No |
| `icons/chevron-down.svg` | 3790:37357 | 15×9 (viewBox 14.28×8.34) | 15.27×8.84 | decorative, `aria-hidden` | No (existing chevrons are stroked) |
| `public/images/services/service-mid-hero-bg.webp` (+ `@2x`) | 3790:37261 | 1920×747 | 1920×747 | decorative, `alt=""` | **Yes** |
| — (inline SVG, `CaseStudyCard` orbit pattern + 3 rings) | 3790:37996 | — | 544.82 square | decorative | **Yes** (pattern) |

Sizes on disk: mockup SVGs 106 / 220 / 154 / 183 KB (gzip 35 / 73 / 51 / 59 KB), choose JPEGs 216 / 245 KB, logos 2.5–17 KB, icons 5.6–7.9 KB.

## Files changed
- `src/assets/comparison/mockups/` (6 files), `src/assets/comparison/logos/` (6), `src/assets/comparison/icons/` (5): new
- `docs/DECISIONS.md`: Comparison → one Decisions row (Proposed) + one "Needs lead OK" line
- `docs/handoffs/2026-10-22_ui_comparison-assets.md`: this file

## Checks
- [x] `pnpm run build` passes
- [x] `pnpm run check` passes (0 errors / 0 warnings / 0 hints)
- [x] `pnpm run lint` passes
- [x] Every file is non-empty and has no Figma URL and no base64. Each was rendered in headless Chrome and compared with the Figma screenshots.
- [ ] Checked at 1440 / 991 / 767 / 375: not applicable (assets only, no page yet)

## Requests for other agents
- @astro:
  - Import the files from `src/assets/comparison/`. Use Astro `<Image>` / `<Picture>` for the JPEGs, PNGs and logos.
  - Render the 4 mockup SVGs as `<img src={x.src}>`, not inline. They are 100–220 KB, and inlining would bloat every page's HTML and skip caching. Give them width/height and `loading="lazy"`.
  - Logos sit inside the pills at the Figma sizes in the table above.
  - The white logos go on the table-header gradient bar. For competitor logos coming from Sanity, the "optional competitor white logo" field covers the white version. Otherwise use the existing `CaseStudyLogo` whiten approach (`filter: brightness(0) invert(1)`), which gives the same result on these transparent logos.
  - The chevron takes `color: var(--color-text)`.
  - For the hero line art, reuse `service-mid-hero-bg.webp` the way `[service].astro` does. For the index card glow, follow the geometry above.
- @sanity: none. The repo copies of the Framer and Wix logos are for the `/dev/comparison` fixture only.

## Open questions for the project lead
- OK to keep the mockup panel color `#F5F9FE` inside the SVGs (no token for it)? Also listed in DECISIONS → Comparison → Needs lead OK.

## Notes and limits
- `choose-wordpress.jpg`: the Figma source raster is only 800×570, so the 2x export is upscaled. It looks sharp at 1x and soft on 2x screens. A higher-resolution source would need to come from design.
- The Webflow mark is clipped at its left edge in the Figma source image, in both the pill and the header bar. The export keeps it as designed; the design team may want to fix the source.
- The hero WordPress pill has a chevron, which suggests a comparison switcher, but there is no interaction spec. It was exported as a static icon only.
- The WordPress screenshot shows third-party theme names and stock photos (Kadence, OceanWP, Neve) as they are in Figma. I left them as is.

## TODO markers added
- `TODO: DS`: none (no CSS written)
- `TODO: COPY`: none
