/**
 * Sanity `faqSection[]` → `FaqSection` groups (tab label, stable value,
 * plain-text answers). Shared by the service template and the comparison
 * template (same object and rendering, SCHEMAS v0.13). Sections without a
 * title and questions without text are dropped; duplicate tab values get
 * the section's position appended.
 */
import type { FaqGroup } from '../content/faqs';
import { portableTextToPlain } from './portable-text';
import type { ServiceFaqSection } from './types';

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export function faqGroupsFromSections(sections: readonly ServiceFaqSection[] | null | undefined): FaqGroup[] {
  const usedValues = new Set<string>();
  return (sections ?? []).flatMap((section, i) => {
    const label = section.title?.trim();
    if (!label) return [];
    let value = slugify(label) || `section-${i + 1}`;
    if (usedValues.has(value)) value = `${value}-${i + 1}`;
    usedValues.add(value);
    const items = (section.faqs ?? [])
      .map((faq) => ({ question: faq.question?.trim() ?? '', answer: portableTextToPlain(faq.answer) }))
      .filter((item) => item.question.length > 0);
    return [{ label, value, items }];
  });
}
