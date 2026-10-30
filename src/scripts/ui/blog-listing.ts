/**
 * Blog listing — keyword search and pagination for the /blog card grid
 * (`NpBlogResources` with `searchable`).
 *
 * - Search (docs/SITEMAP.md, "Blog listing behavior"): matches every word
 *   typed against each card's `data-search` (title, description, category,
 *   author), case- and accent-insensitive. No page reload.
 * - Pagination: `data-per-page` cards per page (12) over the matching cards.
 *   Numbered buttons in a window of four, the current page third
 *   where it can be (Figma: 1 2 [3] 4 …), "…" where
 *   pages are left out, previous / next arrows (disabled at the ends). A new
 *   search goes back to page 1. Changing page scrolls back to the search bar.
 * - URL state: `?q=` and `?page=` (page 1 and an empty search have no
 *   parameter), `replaceState`, so a filtered view or a page is shareable.
 * - Empty state when nothing matches; a polite live region reports counts.
 * - No JS: every card shows, the search bar and the pagination stay `hidden`.
 */
const WINDOW = 4;

const normalize = (value: string): string =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function initBlogListing(root: HTMLElement): void {
  const search = root.querySelector<HTMLElement>("[data-blog-search]");
  const input = root.querySelector<HTMLInputElement>("[data-blog-search-input]");
  const pager = root.querySelector<HTMLElement>("[data-blog-pager]");
  const pages = root.querySelector<HTMLElement>("[data-blog-pages]");
  const prev = root.querySelector<HTMLButtonElement>("[data-blog-prev]");
  const next = root.querySelector<HTMLButtonElement>("[data-blog-next]");
  const empty = root.querySelector<HTMLElement>("[data-blog-empty]");
  const status = root.querySelector<HTMLElement>("[data-blog-status]");
  const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-search]"));
  if (!search || !input || !pager || !pages || !prev || !next || cards.length === 0) return;

  const perPage = Number(root.dataset["perPage"]) || 12;
  const haystacks = cards.map((card) => normalize(card.dataset["search"] ?? ""));
  let query = "";
  let page = 1;

  const matching = (): HTMLElement[] => {
    const words = normalize(query).split(/\s+/).filter(Boolean);
    return cards.filter((_, i) => words.every((word) => haystacks[i]?.includes(word)));
  };

  const syncUrl = (): void => {
    const url = new URL(window.location.href);
    const before = url.search;
    if (query.trim()) url.searchParams.set("q", query.trim());
    else url.searchParams.delete("q");
    if (page > 1) url.searchParams.set("page", String(page));
    else url.searchParams.delete("page");
    if (url.search !== before) window.history.replaceState(window.history.state, "", url);
  };

  const pageButton = (n: number): HTMLButtonElement => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "c-blog-pager__page c-paragraph";
    button.dataset["page"] = String(n);
    button.textContent = String(n);
    button.setAttribute("aria-label", `Page ${n}`);
    if (n === page) {
      button.classList.add("is-active");
      button.setAttribute("aria-current", "page");
    }
    return button;
  };

  const gap = (): HTMLSpanElement => {
    const span = document.createElement("span");
    span.className = "c-blog-pager__gap c-paragraph";
    span.setAttribute("aria-hidden", "true");
    span.textContent = "…";
    return span;
  };

  const render = (): void => {
    const shown = matching();
    const total = Math.max(1, Math.ceil(shown.length / perPage));
    page = Math.min(Math.max(page, 1), total);
    const start = (page - 1) * perPage;
    const visible = new Set(shown.slice(start, start + perPage));
    for (const card of cards) card.hidden = !visible.has(card);

    const first = Math.max(1, Math.min(page - 2, total - WINDOW + 1));
    const last = Math.min(total, first + WINDOW - 1);
    const items: HTMLElement[] = [];
    if (first > 1) items.push(gap());
    for (let n = first; n <= last; n += 1) items.push(pageButton(n));
    if (last < total) items.push(gap());
    pages.replaceChildren(...items);
    prev.disabled = page === 1;
    next.disabled = page === total;
    pager.hidden = total < 2;

    if (empty) empty.hidden = shown.length > 0;
    if (status) {
      status.textContent = shown.length === 0
        ? ""
        : `${shown.length} articles. Page ${page} of ${total}.`;
    }
    syncUrl();
  };

  const goTo = (n: number): void => {
    page = n;
    render();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    search.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  input.addEventListener("input", () => {
    query = input.value;
    page = 1;
    render();
  });
  // Enter in the field does nothing more than typing: no submit, no reload.
  input.form?.addEventListener("submit", (event) => event.preventDefault());

  pages.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const n = Number(target?.closest<HTMLButtonElement>("button[data-page]")?.dataset["page"]);
    if (n && n !== page) goTo(n);
  });
  prev.addEventListener("click", () => goTo(page - 1));
  next.addEventListener("click", () => goTo(page + 1));

  const params = new URL(window.location.href).searchParams;
  query = params.get("q") ?? "";
  input.value = query;
  page = Number(params.get("page")) || 1;
  render();
  search.hidden = false;
}
