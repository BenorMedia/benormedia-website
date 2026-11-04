/**
 * Cursor follow (`[data-cursor-follow]` area + one
 * `[data-cursor-follow-target]` inside it; case study hero, lead
 * 2026-11-04). On hover-capable fine pointers the area gets
 * `is-cursor-follow`: CSS hides the target until the pointer is inside
 * (`is-cursor-inside`) and places it at `--cf-x` / `--cf-y` (px from the
 * area's top-left), eased with a rAF lerp; reduced motion follows with no
 * easing. A click anywhere in the area clicks the target (one link, no
 * nested anchors). Touch, `(hover: none)` and no JS: no class, the target
 * stays where the CSS puts it. Keyboard focus is styled in CSS.
 */
const EASE = 0.2;

export function initCursorFollow(root: ParentNode = document): void {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  root.querySelectorAll<HTMLElement>("[data-cursor-follow]").forEach((area) => {
    if (area.dataset["cursorFollowReady"] === "1") return;
    area.dataset["cursorFollowReady"] = "1";
    const target = area.querySelector<HTMLElement>("[data-cursor-follow-target]");
    if (!target) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    const apply = (): void => {
      area.style.setProperty("--cf-x", `${x.toFixed(1)}px`);
      area.style.setProperty("--cf-y", `${y.toFixed(1)}px`);
    };
    const tick = (): void => {
      const k = reduced.matches ? 1 : EASE;
      x += (tx - x) * k;
      y += (ty - y) * k;
      if (Math.abs(tx - x) < 0.5 && Math.abs(ty - y) < 0.5) {
        x = tx;
        y = ty;
        raf = 0;
      } else {
        raf = requestAnimationFrame(tick);
      }
      apply();
    };
    const setFrom = (e: PointerEvent): void => {
      const r = area.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    const sync = (): void => {
      area.classList.toggle("is-cursor-follow", canHover.matches);
      if (!canHover.matches) area.classList.remove("is-cursor-inside");
    };
    sync();
    canHover.addEventListener("change", sync);

    area.addEventListener("pointerenter", (e) => {
      if (!canHover.matches || e.pointerType !== "mouse") return;
      setFrom(e);
      x = tx;
      y = ty;
      apply();
      area.classList.add("is-cursor-inside");
    });
    area.addEventListener("pointermove", (e) => {
      if (!canHover.matches || e.pointerType !== "mouse") return;
      setFrom(e);
      area.classList.add("is-cursor-inside");
      if (!raf) raf = requestAnimationFrame(tick);
    });
    area.addEventListener("pointerleave", () => area.classList.remove("is-cursor-inside"));
    area.addEventListener("click", (e) => {
      if (!area.classList.contains("is-cursor-follow")) return;
      if (target.contains(e.target as Node)) return;
      target.click();
    });
  });
}
