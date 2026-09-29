# Handoff — orchestrator — Home Testimonials + shared marquee

Date: 2026-09-28 · Branch: `feat/phase4-home-part2` · Status: DONE (awaiting lead review)

Ref: `docs/refs/home/testimonials-component.jpg`.

## What I did
- `src/lib/sanity/queries.ts`: `TESTIMONIALS` + `getTestimonials()` — every published testimonial, oldest first, plus the client that references it (`client{ _id, name, logo }`). `Testimonial` type gained optional `client`.
- `src/components/ui/TestimonialCard.astro` (shared): lead's card spec in rem; quote `c-paragraph` / `--color-text`; author row (photo or initial, name 700, role) + client logo right (fallback `companyLogo`).
- `src/components/ui/TestimonialMarquee.astro` (shared): 2 rows, top → left, bottom → right; pure CSS; seamless −50% loop; repeats `aria-hidden`; pause on hover/focus; reduced motion → static, horizontally scrollable rows.
- `src/components/sections/Testimonials.astro` (`c-testimonials`): SectionHeader + full-bleed marquee. Added to Home after Technologies.

## Usage elsewhere
```astro
const testimonials = await getTestimonials();
<div class="my-wrapper"><TestimonialMarquee testimonials={testimonials} /></div>
```
Full-bleed is the wrapper's job (`margin-inline: calc(50% - 50vw)` + `overflow-x: clip` on the section).

## Checks
- [x] build / check / lint pass
- [x] Chrome (DevTools protocol) at 1440 + 390: top row x decreases, bottom row x increases; card 476×322 at 1440 (= 34 × 23.03rem @14px); no horizontal page scroll; half-track ≈ 4,000px > viewport.

## Open questions
Logged in `DECISIONS.md` (Global + Home). Relayed to the lead in chat.

## TODO markers added
- `TODO: DS` — photo size, photo → name gap, logo size (`TestimonialCard.astro`); marquee speed, row gap, card gap (`TestimonialMarquee.astro`); header → content spacing (`Testimonials.astro`).
- `TODO: COPY` — none (section description provided by lead).

## CTA banner (2026-09-28)
- Subtitle set: "What marketing leaders say after launch day, and months into working together."
- `CtaBanner.astro`: wrapper is now `<section class="c-cta-section">` → `<Container>` → `.c-cta`. BaseLayout keeps rendering it on every page (Home: directly after Testimonials; 404 keeps `showCtaBanner={false}`).
- Root cause of the banner never showing: there is no `siteSettings` document in Sanity, and the component hid itself without `ctaBanner.title`. Added the approved design copy as a fallback (title + Get in Touch `is-white` → contact modal + See Pricing `is-glass` → `/pricing`); Sanity overrides it once filled.
- Verified at 1440 + 390: renders after `<main>`, buttons wired (`.js-open-contact`, `/pricing`).
- Not built: the "★ Trusted by +100 companies" pill with client icons (empty placeholder, pre-existing).
- Lead QA: Testimonials background = `/images/home/testimonials-bg.svg` (copy of `docs/refs/testimonials-section-bg.svg`), `center bottom / cover`. CTA section container `padding-top: 0` (bottom unchanged: 84px at 1440, 45px at 390). Verified at 1440 + 390.
- Lead QA (2026-09-29): hover/focus pause removed; `SECONDS_PER_CARD` 12 → 13.2 (10% slower, loop 96s → 105.6s). Verified with a real mouse hover at 1440: play state `running`, top row still moving (~38 px/s).
