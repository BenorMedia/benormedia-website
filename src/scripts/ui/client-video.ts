/**
 * Client website videos (`[data-client-video]`): the Home Featured Work
 * behavior (`ClientCard.astro`, lead 2026-09-30 / 2026-10-01), shared.
 * Muted, looping, inline, `preload="none"` in the markup, so play() is the
 * first request. Plays once 70% of the video is on screen, pauses once it
 * has fully left. Never under reduced motion or Data Saver: the native
 * poster stays. Each video is wired once (safe to call from several
 * components on one page).
 */
const PLAY_RATIO = 0.7;

export function initClientVideos(root: ParentNode = document): void {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const saveData =
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  const videos = Array.from(root.querySelectorAll<HTMLVideoElement>("[data-client-video]")).filter(
    (v) => v.dataset["clientVideoReady"] !== "1",
  );
  videos.forEach((v) => (v.dataset["clientVideoReady"] = "1"));
  if (videos.length === 0 || saveData) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.intersectionRatio >= PLAY_RATIO && !reduced.matches) {
          void video.play().catch(() => {});
        } else if (!entry.isIntersecting && !video.paused) {
          video.pause();
        }
      });
    },
    { threshold: [0, PLAY_RATIO] },
  );
  videos.forEach((video) => observer.observe(video));
}
