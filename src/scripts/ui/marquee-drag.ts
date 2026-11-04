/**
 * Marquee drag — lets visitors drag `TestimonialMarquee` rows left and right
 * (lead 2026-11-04).
 *
 * `initMarqueeDrag(root)` takes a `.c-testimonial-marquee` element. Each row's
 * loop is a CSS animation (`translateX` 0 ↔ −50%). While a pointer drags a
 * row, its animation pauses and `currentTime` follows the pointer, so the
 * cards move with it; on release the loop plays on from there, in its usual
 * direction. Wrapping the time keeps the loop seamless in both directions.
 *
 * - Touch: rows use `touch-action: pan-y`, so vertical swipes still scroll
 *   the page and only horizontal drags move the row.
 * - Reduced motion: rows have no animation and scroll natively; nothing here
 *   runs for them.
 * - No JS: the CSS loop runs as before, without drag.
 */
const initialized = new WeakSet<HTMLElement>();

export function initMarqueeDrag(root: HTMLElement): void {
  if (initialized.has(root)) return;
  initialized.add(root);

  root.querySelectorAll<HTMLElement>(".c-testimonial-marquee__track").forEach((track) => {
    const row = track.parentElement;
    if (!row) return;

    const animation = (): Animation | undefined => track.getAnimations()[0];
    // Left rows move left as time runs, right rows move right.
    const sign = track.classList.contains("is-right") ? 1 : -1;

    let pointerId: number | null = null;
    let startX = 0;
    let startTime = 0;

    row.addEventListener("pointerdown", (event) => {
      const anim = animation();
      if (!anim || pointerId !== null || event.button !== 0) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startTime = Number(anim.currentTime ?? 0);
      anim.pause();
      row.setPointerCapture(event.pointerId);
      row.classList.add("is-dragging");
      // Mouse: no text selection or native image drag while dragging.
      if (event.pointerType === "mouse") event.preventDefault();
    });

    row.addEventListener("pointermove", (event) => {
      if (event.pointerId !== pointerId) return;
      const anim = animation();
      if (!anim) return;
      const duration = Number(anim.effect?.getComputedTiming().duration ?? 0);
      // One loop = half the track (the list is doubled).
      const distance = track.offsetWidth / 2;
      if (!duration || !distance) return;
      const time = startTime + (sign * (event.clientX - startX) * duration) / distance;
      anim.currentTime = ((time % duration) + duration) % duration;
    });

    const release = (event: PointerEvent): void => {
      if (event.pointerId !== pointerId) return;
      pointerId = null;
      row.classList.remove("is-dragging");
      if (row.hasPointerCapture(event.pointerId)) row.releasePointerCapture(event.pointerId);
      animation()?.play();
    };

    row.addEventListener("pointerup", release);
    row.addEventListener("pointercancel", release);
  });
}
