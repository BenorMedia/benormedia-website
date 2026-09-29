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
 * Returns a cleanup function that removes the listeners.
 */
export function initTabs(root: HTMLElement): () => void {
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

  // Select one tab: sync ARIA state, roving tabindex, class and panels.
  const select = (next: HTMLElement, moveFocus: boolean): void => {
    for (const tab of tabs) {
      const isSelected = tab === next;
      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
      tab.classList.toggle("is-active", isSelected);
      const panel = panelOf(tab);
      if (panel) panel.hidden = !isSelected;
    }
    if (moveFocus) next.focus();
  };

  const initial = tabs.find((tab) => tab.getAttribute("aria-selected") === "true") ?? tabs[0]!;
  select(initial, false);

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
