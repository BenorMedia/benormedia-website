#!/usr/bin/env node
/**
 * Seed the 22 canonical categories into Sanity.
 *
 * Idempotent — safe to re-run. Uses createOrReplace with deterministic IDs
 * derived from the slug (`category-<slug>`), so titles/slug tweaks in this
 * file get pushed to the existing docs instead of creating duplicates.
 *
 * Requires:
 *   PUBLIC_SANITY_PROJECT_ID
 *   PUBLIC_SANITY_DATASET
 *   SANITY_WRITE_TOKEN   (Editor-or-higher token; NEVER commit this)
 *
 * Run:
 *   pnpm run seed:categories
 */
import 'dotenv/config';
import { createClient } from '@sanity/client';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error('Missing PUBLIC_SANITY_PROJECT_ID or PUBLIC_SANITY_DATASET in env.');
  process.exit(1);
}
if (!token) {
  console.error(
    'Missing SANITY_WRITE_TOKEN in env. Create a token in sanity.io/manage (Editor or higher) and add it to .env before running this script.',
  );
  process.exit(1);
}

// Canonical 22 titles from docs/SCHEMAS.md v0.4 — do not reorder, do not
// re-case. Slugs are generated deterministically below.
const TITLES = [
  'Fintech',
  'SaaS',
  'HR Tech',
  'Cleantech',
  'Venture Capital',
  'E-Commerce',
  'Marketing',
  'Recruiting',
  'Consumer',
  'Design Studio',
  'AI & Technology',
  'SaaS / B2B Tech',
  'Sales Tech',
  'Cybersecurity',
  'Marketing Tech',
  'Professional Services',
  'Agency',
  'Nonprofit',
  'Hospitality',
  'Energy',
  'Media & Entertainment',
  'Education',
];

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace(/^-|-$/g, '');
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-09-25',
  token,
  useCdn: false,
});

async function main() {
  console.log(`Seeding ${TITLES.length} categories into "${projectId}"/${dataset}...`);
  let created = 0;
  let updated = 0;

  for (const title of TITLES) {
    const slug = slugify(title);
    const _id = `category-${slug}`;
    const existing = await client.getDocument(_id);
    const doc = {
      _id,
      _type: 'category',
      title,
      slug: { _type: 'slug', current: slug },
    };
    await client.createOrReplace(doc);
    if (existing) {
      updated += 1;
      console.log(`  updated  ${title} (${slug})`);
    } else {
      created += 1;
      console.log(`  created  ${title} (${slug})`);
    }
  }

  console.log('\nDone.');
  console.log(`  Created: ${created}`);
  console.log(`  Updated: ${updated}`);
  console.log(`  Total:   ${TITLES.length}`);
}

main().catch((error) => {
  console.error('\nSeed failed:', error?.message ?? error);
  process.exit(1);
});
