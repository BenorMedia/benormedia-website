/**
 * Details menu — a `<details>` / `<summary>` disclosure that behaves like the
 * nav "Services" dropdown once JS runs (comparison hero pill, lead
 * 2026-10-22).
 *
 * Markup: `<details data-details-menu>` with a `<summary aria-controls>` and
 * the panel (`id` = that `aria-controls`). Without JS the browser toggles it
 * natively, so the links are always reachable.
 *
 * With JS (`initDetailsMenu`):
 *   - the `<details>` stays `open`, and the panel is shown or hidden with
 *     `is-open` on the `<details>`, so CSS can fade it like the nav panel
 *     (opacity / visibility) instead of the native instant toggle;
 *   - the summary keeps `aria-expanded` in sync (it overrides the native
 *     state of an always-open `<details>`);
 *   - click toggles; Esc closes and returns focus to the summary; a click
 *     outside or focus leaving the menu closes it;
 *   - ArrowDown on the summary opens and focuses the first link;
 *     ArrowUp / ArrowDown move between links, Home / End jump.
 *
 * Returns a cleanup function that removes the listeners.
 */
export function initDetailsMenu(details: HTMLDetailsElement): () => void {
  const summary = details.querySelector<HTMLElement>(':scope > summary');
  const panelId = summary?.getAttribute('aria-controls');
  const panel = panelId ? document.getElementById(panelId) : null;
  if (!summary || !panel) return () => {};

  const links = (): HTMLElement[] => Array.from(panel.querySelectorAll<HTMLElement>('a[href]'));
  const isOpen = (): boolean => details.classList.contains('is-open');
  const setOpen = (open: boolean): void => {
    details.classList.toggle('is-open', open);
    summary.setAttribute('aria-expanded', String(open));
  };

  details.open = true;
  setOpen(false);
  details.classList.add('is-enhanced');

  const onSummaryClick = (e: MouseEvent): void => {
    e.preventDefault(); // keep the <details> open; visibility follows `is-open`
    setOpen(!isOpen());
  };
  const onSummaryKey = (e: KeyboardEvent): void => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      links()[0]?.focus();
    }
  };
  const onPanelKey = (e: KeyboardEvent): void => {
    const items = links();
    const i = items.indexOf(document.activeElement as HTMLElement);
    if (i < 0) return;
    let next: HTMLElement | undefined;
    if (e.key === 'ArrowDown') next = items[(i + 1) % items.length];
    else if (e.key === 'ArrowUp') next = items[(i - 1 + items.length) % items.length];
    else if (e.key === 'Home') next = items[0];
    else if (e.key === 'End') next = items[items.length - 1];
    if (next) {
      e.preventDefault();
      next.focus();
    }
  };
  const onDocKey = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && isOpen()) {
      setOpen(false);
      summary.focus();
    }
  };
  const onDocClick = (e: MouseEvent): void => {
    if (isOpen() && !details.contains(e.target as Node)) setOpen(false);
  };
  const onFocusOut = (e: FocusEvent): void => {
    const next = e.relatedTarget as Node | null;
    if (isOpen() && (!next || !details.contains(next))) setOpen(false);
  };

  summary.addEventListener('click', onSummaryClick);
  summary.addEventListener('keydown', onSummaryKey);
  panel.addEventListener('keydown', onPanelKey);
  document.addEventListener('keydown', onDocKey);
  document.addEventListener('click', onDocClick);
  details.addEventListener('focusout', onFocusOut);

  return () => {
    summary.removeEventListener('click', onSummaryClick);
    summary.removeEventListener('keydown', onSummaryKey);
    panel.removeEventListener('keydown', onPanelKey);
    document.removeEventListener('keydown', onDocKey);
    document.removeEventListener('click', onDocClick);
    details.removeEventListener('focusout', onFocusOut);
    details.classList.remove('is-enhanced', 'is-open');
    summary.removeAttribute('aria-expanded');
  };
}
