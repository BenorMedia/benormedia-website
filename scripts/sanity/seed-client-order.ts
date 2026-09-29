/**
 * Seed the initial drag-and-drop order of `client` documents (`orderRank`,
 * @sanity/orderable-document-list) from the Work page reference
 * (`docs/refs/work/work-list.jpg`, lead 2026-09-29, W-5).
 *
 * - Ranks are generated like the plugin's own "Reset order": LexoRank.min(),
 *   then `genNext().genNext()` per document, in the order below.
 * - Patches the published document directly (and its draft, if one exists)
 *   so the order goes live without leaving pending drafts.
 * - Clients not in the list are left untouched and reported; after seeding,
 *   editors reorder in Studio → Clients (drag and drop).
 * - Re-running resets the order to this list.
 *
 * Flags:
 *   --dry-run   Plan only, no writes. Log lines prefixed with `[DRY]`.
 *
 * Env (fail-fast, never printed):
 *   PUBLIC_SANITY_PROJECT_ID
 *   PUBLIC_SANITY_DATASET
 *   SANITY_WRITE_TOKEN   (Editor-or-higher token)
 *
 * Run:
 *   pnpm seed:client-order --dry-run
 *   pnpm seed:client-order
 */
import 'dotenv/config';
import { createClient } from '@sanity/client';
import { LexoRank } from 'lexorank';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_WRITE_TOKEN;

const missing: string[] = [];
if (!projectId) missing.push('PUBLIC_SANITY_PROJECT_ID');
if (!dataset) missing.push('PUBLIC_SANITY_DATASET');
if (!token) missing.push('SANITY_WRITE_TOKEN');
if (missing.length) {
  console.error(`Missing required env var(s): ${missing.join(', ')}`);
  console.error('Set them in .env before running this script.');
  process.exit(1);
}

const DRY_RUN = process.argv.slice(2).includes('--dry-run');
const PREFIX = DRY_RUN ? '[DRY] ' : '';

/** Client names in the reference order (top → bottom of `work-list.jpg`). */
const ORDER = [
  'Surfe', 'Puzzle', 'HireArt', 'SimpleTiger', 'Sprii', 'Garaje de Ideas',
  'Garaje Central', 'Resourcify', 'Unit21', 'DarwinCX', 'Poplin', 'Arrows',
  'Base Operations', 'Candybox', 'Clerk', 'Flexxible', 'JOOR', 'Kordis',
  'Orchestra', 'Pinnacle', 'Releventful', 'Subject', 'Userled', 'PagoNxt',
  'Canals', 'Kreios Space', 'Mashgin', 'Reverve', 'Sama', 'SBOW', 'DeepSeas',
  'Sublime Security', 'Triplekey', 'Emotional Hub', 'Major Players', 'TalkPush',
  'Fospha', 'Laudable', 'Matchday', 'Dimensions', 'Founders Law', 'GTD',
  'Tetra Engineering', 'Wüthrich Architekten', 'OJAI', 'Founders Makers',
  'MyBlancSpace', 'The Practice Lab', 'VolunteerMatters', 'Hi Ball',
  '12th Street Catering', 'Energy Domain', 'Notable Capital', 'REC Philly',
  'You Get an A+', 'Novo',
];

const client = createClient({
  projectId: projectId!,
  dataset: dataset!,
  apiVersion: '2026-09-25',
  token: token!,
  useCdn: false,
});

interface ClientRow {
  _id: string;
  name?: string;
}

async function main(): Promise<void> {
  const docs = await client.fetch<ClientRow[]>(
    `*[_type == "client"]{ _id, name }`,
  );
  const published = new Map<string, string>();
  const drafts = new Set<string>();
  for (const doc of docs) {
    if (doc._id.startsWith('drafts.')) drafts.add(doc._id);
    else if (doc.name) published.set(doc.name, doc._id);
  }

  const notFound = ORDER.filter((name) => !published.has(name));
  if (notFound.length) {
    console.error(`Not found in Sanity (fix the list first): ${notFound.join(', ')}`);
    process.exit(1);
  }

  let rank = LexoRank.min();
  let tx = client.transaction();
  for (const name of ORDER) {
    rank = rank.genNext().genNext();
    const id = published.get(name)!;
    const value = rank.toString();
    tx = tx.patch(id, { set: { orderRank: value } });
    const draftId = `drafts.${id}`;
    if (drafts.has(draftId)) tx = tx.patch(draftId, { set: { orderRank: value } });
    console.log(`${PREFIX}${value}  ${name}${drafts.has(draftId) ? ' (+ draft)' : ''}`);
  }

  const unlisted = [...published.keys()].filter((name) => !ORDER.includes(name));
  if (unlisted.length) {
    console.log(`${PREFIX}Not in the list (left untouched): ${unlisted.join(', ')}`);
  }

  if (DRY_RUN) {
    console.log(`${PREFIX}${ORDER.length} clients would be ranked.`);
    return;
  }
  await tx.commit({ visibility: 'sync' });
  console.log(`Ranked ${ORDER.length} clients.`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
