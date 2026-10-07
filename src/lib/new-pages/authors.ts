/**
 * Article authors: the photo shown in the blog template's author card,
 * matched on the name in the front matter `author` (the text before the
 * first comma). No match → the BenorMedia mark.
 */
export const AUTHOR_PHOTOS: Record<string, { src: string; w: number; h: number }> = {
  "Sergio Gancedo": { src: "/images/new-pages/authors/sergio-gancedo.webp", w: 216, h: 216 },
};

export const authorPhoto = (author: string) => AUTHOR_PHOTOS[author.split(",")[0]?.trim() ?? ""];
