/**
 * Tabs — WAI-ARIA tabs behavior for `SegmentedControl mode="tabs"`.
 *
 * `initTabs(root)` takes the tablist itself or any element that contains one.
 * Panels are found through each tab's `aria-controls`.
 *
 * - Click / Enter / Space (native button) selects a tab.
 * - Left / Right move to the previous / next tab (wrapping), Home / End to the
 *   first / last. Selection follows focus (automatic activation).
 * - Roving tabindex: only the selected tab is in the tab order.
 * - Keeps `aria-selected`, `is-active` and each panel's `hidden` in sync.
 *
 * No JS: every panel stays visible (callers must not hide panels in markup)
 * and `SegmentedControl` renders the tablist `hidden`, so there are no dead
 * tabs. On init the tablist is revealed, non-selected panels are hidden here,
 * and `data-tabs-ready` is set on the tablist so callers can style the
 * enhanced state if needed. Cleanup restores the no-JS state.
 *
 * Horizontal scroll: when the tablist overflows (e.g. `SegmentedControl
 * scroll` on mobile), a tab selected by click or keyboard is scrolled into
 * view inside the tablist only; the page never scrolls.
 *
 * `options.onSelect(tab, panel, initial)` runs after every selection,
 * including the initial one on init (`initial: true`), e.g. to open the
 * first FAQ of the new panel.
 *
 * Returns a cleanup function that removes the listeners.
 */
export interface InitTabsOptions {
  onSelect?: (tab: HTMLElement, panel: HTMLElement | null, initial: boolean) => void;
}

export function initTabs(root: HTMLElement, options: InitTabsOptions = {}): () => void {
  const tablist = root.matches('[role="tablist"]')
    ? root
    : root.querySelector<HTMLElement>('[role="tablist"]');
  if (!tablist) return () => {};

  const tabs = Array.from(tablist.querySelectorAll<HTMLElement>('[role="tab"]'));
  if (tabs.length === 0) return () => {};

  const panelOf = (tab: HTMLElement): HTMLElement | null => {
    const id = tab.getAttribute("aria-controls");
    return id ? document.getElementById(id) : null;
  };

  // Panel semantics, in case the caller left them out.
  for (const tab of tabs) {
    const panel = panelOf(tab);
    if (!panel) continue;
    if (!panel.hasAttribute("role")) panel.setAttribute("role", "tabpanel");
    if (!panel.hasAttribute("tabindex")) panel.tabIndex = 0;
    if (tab.id && !panel.hasAttribute("aria-labelledby")) {
      panel.setAttribute("aria-labelledby", tab.id);
    }
  }

  // Scrolls `tab` into view inside an overflowing tablist (never the page).
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealTab = (tab: HTMLElement): void => {
    if (tablist.scrollWidth <= tablist.clientWidth) return;
    const listBox = tablist.getBoundingClientRect();
    const tabBox = tab.getBoundingClientRect();
    let left = tablist.scrollLeft;
    if (tabBox.left < listBox.left) left += tabBox.left - listBox.left;
    else if (tabBox.right > listBox.right) left += tabBox.right - listBox.right;
    else return;
    tablist.scrollTo({ left, behavior: reduceMotion.matches ? "auto" : "smooth" });
  };

  // Select one tab: sync ARIA state, roving tabindex, class and panels.
  const select = (next: HTMLElement, moveFocus: boolean, initial = false): void => {
    for (const tab of tabs) {
      const isSelected = tab === next;
      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
      tab.classList.toggle("is-active", isSelected);
      const panel = panelOf(tab);
      if (panel) panel.hidden = !isSelected;
    }
    // `preventScroll`: revealTab moves the tablist; the page stays put.
    if (moveFocus) next.focus({ preventScroll: true });
    if (!initial) revealTab(next);
    options.onSelect?.(next, panelOf(next), initial);
  };

  const initial = tabs.find((tab) => tab.getAttribute("aria-selected") === "true") ?? tabs[0]!;
  select(initial, false, true);

  const onClick = (event: MouseEvent): void => {
    const tab = (event.target as Element | null)?.closest<HTMLElement>('[role="tab"]');
    if (tab && tabs.includes(tab)) select(tab, false);
  };

  const onKeydown = (event: KeyboardEvent): void => {
    const current = (event.target as Element | null)?.closest<HTMLElement>('[role="tab"]');
    if (!current) return;
    const index = tabs.indexOf(current);
    if (index === -1) return;

    let target: HTMLElement | undefined;
    switch (event.key) {
      case "ArrowRight":
        target = tabs[(index + 1) % tabs.length];
        break;
      case "ArrowLeft":
        target = tabs[(index - 1 + tabs.length) % tabs.length];
        break;
      case "Home":
        target = tabs[0];
        break;
      case "End":
        target = tabs[tabs.length - 1];
        break;
      default:
        return;
    }
    event.preventDefault();
    if (target) select(target, true);
  };

  tablist.addEventListener("click", onClick);
  tablist.addEventListener("keydown", onKeydown);
  tablist.dataset.tabsReady = "";
  tablist.hidden = false;

  return () => {
    tablist.removeEventListener("click", onClick);
    tablist.removeEventListener("keydown", onKeydown);
    delete tablist.dataset.tabsReady;
    tablist.hidden = true;
    for (const tab of tabs) {
      const panel = panelOf(tab);
      if (panel) panel.hidden = false;
    }
  };
}
