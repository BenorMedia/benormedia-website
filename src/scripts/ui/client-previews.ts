/**
 * Client previews — on-demand hover screenshots for `ClientList`.
 *
 * `initClientPreviews(list)` takes a `.c-client-list`. Each preview `<img>`
 * ships with `data-src` only, so nothing downloads with the page. The first
 * pointer entry or focus inside the list sets `src` on every preview in it
 * (preloading the whole list, so the row under the pointer is not the only
 * one ready). Only on hover-capable devices: `(hover: hover)` is checked at
 * event time and touch pointers are ignored, so touch devices never load them.
 *
 * Each preview gets `is-loaded` once its image has loaded; the CSS only opens
 * a loaded preview, so a slow image never shows as a blank box. A failed image
 * stays closed.
 *
 * Returns a cleanup function that removes the listeners.
 */
export function initClientPreviews(list: HTMLElement): () => void {
  const images = Array.from(list.querySelectorAll<HTMLImageElement>('.c-client-list__preview img[data-src]'));
  if (images.length === 0) return () => {};

  const canHover = window.matchMedia('(hover: hover)');

  const markLoaded = (img: HTMLImageElement): void => {
    img.parentElement?.classList.add('is-loaded');
  };

  const load = (): void => {
    cleanup();
    images.forEach((img) => {
      const src = img.dataset['src'];
      if (!src) return;
      img.addEventListener('load', () => markLoaded(img), { once: true });
      img.src = src;
      img.removeAttribute('data-src');
      // Already in the HTTP cache: `load` may have fired before the listener ran.
      if (img.complete && img.naturalWidth > 0) markLoaded(img);
    });
  };

  const onPointerEnter = (event: PointerEvent): void => {
    if (event.pointerType === 'touch' || !canHover.matches) return;
    load();
  };

  const onFocusIn = (): void => {
    if (!canHover.matches) return;
    load();
  };

  list.addEventListener('pointerenter', onPointerEnter);
  list.addEventListener('focusin', onFocusIn);

  function cleanup(): void {
    list.removeEventListener('pointerenter', onPointerEnter);
    list.removeEventListener('focusin', onFocusIn);
  }

  return cleanup;
}
