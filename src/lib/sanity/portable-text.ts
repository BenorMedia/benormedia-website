/**
 * Small Portable Text helpers for the service template.
 *
 * - `accentTitle` (SCHEMAS v0.6): one block of spans; spans marked `accent`
 *   get the brand gradient; `\n` inside span text = forced line break.
 *   `accentTitleSegments` returns the `{ text, accent }` runs that
 *   `SectionHeader`'s `titleSegments` prop renders; `accentTitleText` the
 *   plain title (meta, aria, fallbacks).
 * - `portableTextToPlain`: FAQ answers → plain text, one paragraph per block
 *   separated by a blank line (the format `FaqAccordion` and the FAQPage
 *   JSON-LD take). Inline marks and link annotations are dropped.
 */
import type { AccentTitle, PortableTextBlock } from './types';

export interface TitleSegment {
  text: string;
  accent?: boolean;
}

/** Adjacent spans with the same accent state are merged into one run. */
export function accentTitleSegments(title: AccentTitle | null | undefined): TitleSegment[] {
  const segments: TitleSegment[] = [];
  const blocks = (title ?? []).filter((block) => block._type === 'block');
  blocks.forEach((block, blockIndex) => {
    // Schema allows one block; if a second ever slips in, start it on a new line.
    if (blockIndex > 0 && segments.length > 0) segments.push({ text: '\n' });
    for (const span of block.children ?? []) {
      if (span._type !== 'span' || !span.text) continue;
      const accent = span.marks?.includes('accent') ?? false;
      const last = segments[segments.length - 1];
      if (last && (last.accent ?? false) === accent) {
        last.text += span.text;
      } else {
        segments.push(accent ? { text: span.text, accent: true } : { text: span.text });
      }
    }
  });
  return segments;
}

/** Plain title with `\n` kept (SectionHeader `title` format). Empty string = no title. */
export function accentTitleText(title: AccentTitle | null | undefined): string {
  return accentTitleSegments(title)
    .map((segment) => segment.text)
    .join('')
    .trim();
}

/** Blocks → plain paragraphs joined by `\n\n`. Non-text blocks are skipped. */
export function portableTextToPlain(blocks: PortableTextBlock[] | null | undefined): string {
  return (blocks ?? [])
    .filter((block) => block._type === 'block')
    .map((block) =>
      (block.children ?? [])
        .map((child) => child.text ?? '')
        .join('')
        .trim(),
    )
    .filter(Boolean)
    .join('\n\n');
}
