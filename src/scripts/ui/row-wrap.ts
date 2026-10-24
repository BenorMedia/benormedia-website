/**
 * Row wrap — tells a wrapping flex row whether it currently fits on one
 * line, so CSS can lay out the two cases differently (`CaseStudyFacts`:
 * space-between on one line, centred rows once items wrap).
 *
 * `initRowWrap(row)` sets `is-wrapped` on `row` while its children sit on
 * more than one line, and re-checks on every resize of the row (fonts
 * loading, viewport, fluid root size). Reads offsetTop only (no writes in
 * the same pass besides the class toggle).
 *
 * No JS: the class is never set and the CSS one-line layout applies, which
 * still wraps whole items without overflow. Returns a cleanup function.
 */
export function initRowWrap(row: HTMLElement): () => void {
  const check = (): void => {
    const items = [...row.children] as HTMLElement[];
    if (items.length < 2) return void row.classList.remove('is-wrapped');
    const first = items[0]!.offsetTop;
    row.classList.toggle('is-wrapped', items.some((item) => item.offsetTop !== first));
  };

  const observer = new ResizeObserver(check);
  observer.observe(row);
  check();

  return () => {
    observer.disconnect();
    row.classList.remove('is-wrapped');
  };
}
