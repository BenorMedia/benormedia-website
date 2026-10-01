# QA 2026-09-30 — Questions and fixes to review

Source: qa agent full-project review, 2026-09-30. Full report: `docs/handoffs/2026-09-30_qa_phase5-6-refinements.md`.
Verdict: **FAIL**, because of one blocker left over from Phase 4 (B1). The work from this session on its own is PASS WITH NOTES. Build, check and lint pass.

Answer inline (write under each question) and the orchestrator applies it.

**Status 2026-09-30:** the lead answered in chat; everything below is applied on `feat/phase5-6-second-qa` (see `docs/handoffs/2026-09-30_orchestrator_phase5-6-second-qa.md`). Answers are noted under each item.

---

## Blocker (fix pending your go)

- **B1. Hero line images are 8.8 MB.** `public/images/home/hero-lines-left.png` (4.3 MB) and `hero-lines-right.png` (4.5 MB) are 2640×2644 and load eagerly on Home, but display at about 490px. Fix: re-export as WebP at display size (roughly 100 KB each or less), with no visual change. Added in Phase 4 (2026-09-26).
  - **Lead:** go, no quality loss. **Done:** 1000w (≈215 KB) + 1600w (≈490 KB) WebP with `srcset`, ≈50 dB PSNR over the hero blue (the alpha gradient layer keeps them above 100 KB).

## Should fix — no decision needed (orchestrator can do these)

- **S3.** The featured card video restarts in a loop if the pointer rests near the card body's bottom edge: the body lifts 3% out from under the pointer, so hover-out and hover-in fire over and over. Fix: detect hover on a part that doesn't move, as `ClientList` does.
  - **Lead:** new behavior — no hover-to-play, no poster overlay; the video starts when each featured card enters the viewport and shows whole (not cropped) on both mirrored cards. Body hover state stays; native `poster` kept as fallback. **Done.**
- **S4 (part).** Touch devices still request the video file, which can never play there. Fix: `preload="none"`, and start loading on the first hover.
  - **Done** with the new behavior: `preload="none"`, first request when the card is on screen; no autoplay under reduced motion / Data Saver.
- **S5.** `technologies-mobile.png` is 914 KB. Fix: WebP at about 1125px wide.
  - **Done:** 1125w (84 KB) + 1536w (125 KB).
- **S7.** The 59 hero icons load at full priority (including on mobile, where only 30 show). Fix: `fetchpriority="low"`. — **Done.**
- **N11.** The nav dropdown icons are PNGs (about 75 KB, loaded on every page). Fix: WebP (about 5 KB each). — **Done** (2–3 KB each).
- **Nits:**
  - the physics keeps redrawing after the squares have settled;
  - the nav entry can replay after its 3s fallback;
  - the nav can hide while the Services menu is open by hover;
  - stale code comments and doc notes;
  - a duplicate `assetSize()` helper in `ClientList`.
  - **Lead:** all approved. **Done.**

---

## Questions — project lead

1. **Hero squares on phones.** A swipe that starts on the pile drags a square instead of scrolling the page. Options:
   - (a) keep it as is;
   - (b) scroll normally, and only drag after a short press-and-hold;
   - (c) turn dragging off on touch devices.
   - **Lead: (b).** Done: 250ms hold.

2. **Tablet (768–991px).** All 59 squares may pile up high enough to reach the stacked hero buttons. Not confirmed without a browser: check at 768 and 850px. If it happens, cap the count there like on mobile (30)?
   - **Lead:** known, also on short desktop screens; don't cap — keep `c-hero__block` above the squares. **Done.**

3. **Approve the two Proposed items:**
   - Hero physics: bounds = the whole blue hero card, 30 squares on mobile, the physical feel (bounce, friction, drag springiness).
   - Footer wordmark move-in: rises 35% + fade, 1.2s, plays once.
   - **Lead:** both approved.

4. **WebP conversion.** OK to convert B1 (hero lines), S5 (mobile Technologies diagram) and the nav dropdown icons to WebP? There's no visual change.
   - **Lead:** OK. **Done**; the PNGs are removed from `public/` (sources stay in `docs/refs/`).

5. **Delete `src/components/ui/Stat.astro`?** It's unused since the hero stats were removed. Rule 4 needs your explicit OK.
   - **Lead:** delete. **Done.**

6. **Section descriptions at 768–991px.** The Services (40%) and Testimonials (28%) description widths come out at only about 190–300px on tablet. Keep them, or go wider there?
   - **Lead:** wider on tablet. **Done:** 100% up to 991.

## Questions — CEO

7. **Nav readability over blue sections.** Once scrolled, the glass nav's grey link text (#5B6170) over the blue hero and the CTA banner has about 1.7:1 contrast (the accessibility minimum is 4.5:1). Options:
   - (a) accept it;
   - (b) white links while the bar is over a blue section;
   - (c) make the glass bar more solid.
   - **Answer: (c)**, navbar only, no token. **Done:** white 80% once scrolled (≈5:1).

8. **Featured videos are heavy.** Surfe is 30.4 MB and Puzzle is 17.9 MB, so every hover streams the full file. Who re-encodes them, and to what target? Suggested: 720p, H.264, no audio, 2–5 MB each.
   - **Lead:** will re-encode and upload lighter videos to Sanity.

9. **Growth label** (still open from the navbar round). The dropdown reference reads "GROWTH (AEO / SEO / CRO)"; the nav says "Growth (AEO/GEO + CRO)". Which one?
   - **Decided:** "Growth (SEO/GEO + CRO)", as in Sanity. **Done** in nav + footer.

---

## Still blocking launch (already known)

- **Forms:** no endpoint; the Make webhook is waiting on the CEO. Submit is a stub.
- **Production domain:** not set, so there's no `PUBLIC_SITE_URL`, and therefore no canonical or sitemap URLs on Vercel.
- ~~**`robots.txt`**~~ — lead: handled on Vercel (works per earlier tries).
- **Redirects:** the Webflow redirect map is empty (`docs/SITEMAP.md`, `vercel.json`).
- **Sanity:** no `siteSettings` or page singleton documents, so there's no Home meta description, no `og:image` and no Organization JSON-LD. The singleton is wired (Seo, Organization JSON-LD, Nav logo, CTA banner, ContactModal); it only needs filling in Studio.
- ~~**Fonts**~~ — lead: no Adobe Fonts kit needed; flag dropped.
- **Dead links:** none left in nav / footer. `/growth` + `/ongoing-website-support` build, the footer socials are set, placeholder legal pages exist, and the footer "Blog" link is hidden until the blog exists.
- **`/dev/styleguide`:** noindex but still public; block it before launch.
- **Content:** placeholder copy and testimonials; the FAQ JSON-LD has placeholder copy (P-3); legal pages are placeholder (`noindex`). Lead working on it.
