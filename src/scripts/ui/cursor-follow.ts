/**
 * Cursor follow — the "Visit live site" button of `CaseStudyBrowser`
 * follows the mouse over the browser window (lead 2026-10-22).
 *
 * `initCursorFollow(area, target)` moves `target` (absolutely positioned,
 * centred on its `left` / `top` with `translate: -50% -50%`) to the pointer
 * while a mouse is over `area`, kept fully inside it. Positions are set as
 * percentages of `area`, so a resize never leaves it off place. On leave the
 * inline position is removed and the CSS position applies again.
 *
 * Mouse pointers only, and only without `prefers-reduced-motion: reduce`:
 * both are checked at event time. Without JS the button keeps its CSS
 * position. Returns a cleanup function that removes the listeners.
 */
export function initCursorFollow(area: HTMLElement, target: HTMLElement): () => void {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;

  const reset = (): void => {
    cancelAnimationFrame(frame);
    target.style.removeProperty('left');
    target.style.removeProperty('top');
  };

  const onPointerMove = (event: PointerEvent): void => {
    if (event.pointerType !== 'mouse' || reduceMotion.matches) return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const box = area.getBoundingClientRect();
      if (box.width === 0 || box.height === 0) return;
      const halfW = target.offsetWidth / 2;
      const halfH = target.offsetHeight / 2;
      const x = Math.min(Math.max(clientX - box.left, halfW), box.width - halfW);
      const y = Math.min(Math.max(clientY - box.top, halfH), box.height - halfH);
      target.style.left = `${(x / box.width) * 100}%`;
      target.style.top = `${(y / box.height) * 100}%`;
    });
  };

  area.addEventListener('pointermove', onPointerMove);
  area.addEventListener('pointerleave', reset);

  return () => {
    area.removeEventListener('pointermove', onPointerMove);
    area.removeEventListener('pointerleave', reset);
    reset();
  };
}
