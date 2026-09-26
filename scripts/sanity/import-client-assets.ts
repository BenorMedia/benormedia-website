/**
 * Import client image assets from `docs/content-import/clients/*` into Sanity.
 *
 * - Reads renamed files from disk (see plan: pre-Phase-4 content import).
 * - Uploads assets and patches the published `client-<slug>` document directly
 *   so images go live without leaving pending drafts.
 * - Idempotent: default behavior skips fields that are already set; Sanity
 *   dedupes uploaded assets by SHA1 hash.
 *
 * Flags:
 *   --dry-run   Read/plan only. No uploads, no patches. All log lines
 *               prefixed with `[DRY]`.
 *   --force     Overwrite fields that already have an image.
 *
 * Env (fail-fast, never printed):
 *   PUBLIC_SANITY_PROJECT_ID
 *   PUBLIC_SANITY_DATASET
 *   SANITY_WRITE_TOKEN   (Editor-or-higher token)
 *
 * Run:
 *   pnpm import:clients --dry-run
 *   pnpm import:clients            (project lead only)
 */
import 'dotenv/config';
import { createClient, type SanityDocument } from '@sanity/client';
import { createReadStream } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import { basename, extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// ---------- env ----------
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

// ---------- flags ----------
const argv = new Set(process.argv.slice(2));
const DRY_RUN = argv.has('--dry-run');
const FORCE = argv.has('--force');
const PREFIX = DRY_RUN ? '[DRY] ' : '';

// ---------- constants ----------
type ClientField = 'logo' | 'icon' | 'badge' | 'cardThumbnail' | 'websiteScreenshot';

interface FolderSpec {
  folder: string;
  expectedPrefix: string;
  field: ClientField;
}

const FOLDERS: FolderSpec[] = [
  { folder: 'logos', expectedPrefix: 'logo', field: 'logo' },
  { folder: 'icons', expectedPrefix: 'icon', field: 'icon' },
  { folder: 'ss', expectedPrefix: 'ss', field: 'websiteScreenshot' },
  { folder: 'card', expectedPrefix: 'card', field: 'cardThumbnail' },
  { folder: 'badge', expectedPrefix: 'badge', field: 'badge' },
];

const ACCEPTED_EXTS = new Set(['.png', '.jpg', '.jpeg', '.svg']);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, '..', '..');
const CONTENT_ROOT = resolve(REPO_ROOT, 'docs', 'content-import', 'clients');

// ---------- client ----------
const client = createClient({
  projectId: projectId!,
  dataset: dataset!,
  apiVersion: '2026-09-25',
  token: token!,
  useCdn: false,
});

// ---------- helpers ----------
function contentTypeFor(ext: string): string {
  switch (ext.toLowerCase()) {
    case '.svg':
      return 'image/svg+xml';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    default:
      return 'application/octet-stream';
  }
}

interface ParsedFile {
  filename: string;
  fullPath: string;
  slug: string;
  ext: string;
  field: ClientField;
  folder: string;
}

interface UnmatchedFile {
  path: string;
  reason: string;
}

async function listTopLevelFiles(dir: string): Promise<string[]> {
  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    let s;
    try {
      s = await stat(full);
    } catch {
      continue;
    }
    if (s.isFile()) files.push(entry);
    // Skip subfolders (e.g. `ss/missing clients/`).
  }
  return files;
}

/**
 * Parse `<prefix>-<slug>.<ext>`. Splits on FIRST hyphen, so multi-word
 * slugs like `hi-ball` stay intact.
 */
function parseFilename(
  filename: string,
  expectedPrefix: string,
): { slug: string; ext: string } | { error: string } {
  const ext = extname(filename);
  const stem = filename.slice(0, filename.length - ext.length);
  const idx = stem.indexOf('-');
  if (idx <= 0) return { error: `bad filename "${filename}" (expected "${expectedPrefix}-<slug>${ext}")` };
  const prefix = stem.slice(0, idx);
  const slug = stem.slice(idx + 1);
  if (prefix !== expectedPrefix) {
    return { error: `bad prefix "${prefix}" (expected "${expectedPrefix}") in "${filename}"` };
  }
  if (!slug) return { error: `empty slug in "${filename}"` };
  return { slug, ext };
}

interface ClientMeta {
  id: string;
  name: string;
}

type ClientDoc = SanityDocument & {
  [K in ClientField]?: { asset?: { _ref?: string } };
};

// Per-client, per-field outcome for the report.
type FieldOutcome =
  | { kind: 'uploaded' }
  | { kind: 'skipped'; reason: string }
  | { kind: 'failed'; message: string }
  | { kind: 'no-file' };

interface ClientReport {
  slug: string;
  name: string;
  outcomes: Partial<Record<ClientField, FieldOutcome>>;
}

// ---------- main ----------
async function main(): Promise<void> {
  console.log(`${PREFIX}Import client assets — project "${projectId}" / dataset "${dataset}"`);
  console.log(`${PREFIX}Source: ${CONTENT_ROOT}`);
  console.log(`${PREFIX}Flags: dry-run=${DRY_RUN}, force=${FORCE}`);
  console.log('');

  // 1. Discover files from disk.
  const parsed: ParsedFile[] = [];
  const unmatched: UnmatchedFile[] = [];

  for (const spec of FOLDERS) {
    const dir = join(CONTENT_ROOT, spec.folder);
    const files = await listTopLevelFiles(dir);
    // Deterministic order.
    files.sort((a, b) => a.localeCompare(b));
    for (const filename of files) {
      const ext = extname(filename).toLowerCase();
      const relPath = `${spec.folder}/${filename}`;
      if (!ACCEPTED_EXTS.has(ext)) {
        unmatched.push({ path: relPath, reason: `unsupported extension "${ext}"` });
        continue;
      }
      const parsedName = parseFilename(filename, spec.expectedPrefix);
      if ('error' in parsedName) {
        unmatched.push({ path: relPath, reason: parsedName.error });
        continue;
      }
      parsed.push({
        filename,
        fullPath: join(dir, filename),
        slug: parsedName.slug,
        ext,
        field: spec.field,
        folder: spec.folder,
      });
    }
  }

  // 2. Fetch clients from Sanity.
  const clientsFromSanity: Array<{ _id: string; name: string }> = await client.fetch(
    '*[_type=="client" && !(_id in path("drafts.**"))]{_id, name}',
  );
  const bySlug = new Map<string, ClientMeta>();
  for (const c of clientsFromSanity) {
    if (!c._id.startsWith('client-')) continue;
    const slug = c._id.slice('client-'.length);
    bySlug.set(slug, { id: c._id, name: c.name });
  }

  // 3. Bucket parsed files by slug, mark files whose slug doesn't exist.
  const fileBySlugField = new Map<string, Partial<Record<ClientField, ParsedFile>>>();
  for (const f of parsed) {
    if (!bySlug.has(f.slug)) {
      unmatched.push({
        path: `${f.folder}/${f.filename}`,
        reason: `no client-${f.slug} doc in Sanity`,
      });
      continue;
    }
    let bucket = fileBySlugField.get(f.slug);
    if (!bucket) {
      bucket = {};
      fileBySlugField.set(f.slug, bucket);
    }
    // If somehow two files map to the same field, keep first, unmatched the rest.
    if (bucket[f.field]) {
      unmatched.push({
        path: `${f.folder}/${f.filename}`,
        reason: `duplicate ${f.field} for slug "${f.slug}"`,
      });
      continue;
    }
    bucket[f.field] = f;
  }

  // 4. Process each matched client in slug order.
  const slugsWithFiles = Array.from(fileBySlugField.keys()).sort((a, b) => a.localeCompare(b));

  const reports: ClientReport[] = [];
  let uploadedTotal = 0;
  let skippedTotal = 0;
  let failedTotal = 0;

  for (const slug of slugsWithFiles) {
    const meta = bySlug.get(slug)!;
    const files = fileBySlugField.get(slug)!;
    const report: ClientReport = { slug, name: meta.name, outcomes: {} };
    reports.push(report);

    // Fetch published doc. We patch it directly.
    let published: ClientDoc | null = null;
    try {
      published = (await client.getDocument(meta.id)) as ClientDoc | null;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`${PREFIX}CLIENT: ${slug} — fetch failed: ${msg}`);
      for (const field of Object.keys(files) as ClientField[]) {
        report.outcomes[field] = { kind: 'failed', message: `fetch failed: ${msg}` };
        failedTotal += 1;
      }
      continue;
    }
    if (!published) {
      // Shouldn't happen — unmatched check above uses the same "no drafts" query.
      for (const field of Object.keys(files) as ClientField[]) {
        report.outcomes[field] = { kind: 'failed', message: 'published doc disappeared between fetch and patch' };
        failedTotal += 1;
      }
      continue;
    }

    for (const spec of FOLDERS) {
      const file = files[spec.field];
      if (!file) {
        report.outcomes[spec.field] = { kind: 'no-file' };
        continue;
      }
      try {
        const existingAsset = published[spec.field]?.asset?._ref;
        if (existingAsset && !FORCE) {
          report.outcomes[spec.field] = { kind: 'skipped', reason: 'already set' };
          skippedTotal += 1;
          continue;
        }

        // Upload asset (skipped in dry-run).
        let assetId = 'DRY-image-asset-id';
        if (!DRY_RUN) {
          const uploaded = await client.assets.upload(
            'image',
            createReadStream(file.fullPath),
            {
              filename: basename(file.filename),
              contentType: contentTypeFor(file.ext),
            },
          );
          assetId = uploaded._id;
        }

        const alt = spec.field === 'badge' ? `${meta.name} badge` : meta.name;

        if (!DRY_RUN) {
          await client
            .patch(meta.id)
            .set({
              [spec.field]: {
                _type: 'image',
                asset: { _type: 'reference', _ref: assetId },
                alt,
              },
            })
            .commit();
        }

        // Reflect the change in our local snapshot so `--force` on multiple
        // fields of the same client sees the update on the next iteration.
        published[spec.field] = { asset: { _ref: assetId } };

        report.outcomes[spec.field] = { kind: 'uploaded' };
        uploadedTotal += 1;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        report.outcomes[spec.field] = { kind: 'failed', message: msg };
        failedTotal += 1;
      }
    }
  }

  // 5. Also report on clients that have zero files (so we can see who's still missing everything).
  //    We include them in the report too, marked all "no file".
  for (const [slug, meta] of Array.from(bySlug.entries()).sort((a, b) =>
    a[0].localeCompare(b[0]),
  )) {
    if (fileBySlugField.has(slug)) continue;
    const report: ClientReport = { slug, name: meta.name, outcomes: {} };
    for (const spec of FOLDERS) report.outcomes[spec.field] = { kind: 'no-file' };
    reports.push(report);
  }
  reports.sort((a, b) => a.slug.localeCompare(b.slug));

  // 6. Print report.
  console.log('=== Import report ===');
  const labelFor: Record<ClientField, string> = {
    logo: 'logo',
    icon: 'icon',
    badge: 'badge',
    cardThumbnail: 'cardThumbnail',
    websiteScreenshot: 'websiteScreenshot',
  };
  const orderInReport: ClientField[] = ['logo', 'icon', 'websiteScreenshot', 'cardThumbnail', 'badge'];
  const labelWidth = Math.max(...orderInReport.map((f) => labelFor[f].length)) + 1;

  for (const r of reports) {
    console.log(`${PREFIX}CLIENT: ${r.slug}`);
    for (const field of orderInReport) {
      const out = r.outcomes[field];
      const label = `  ${labelFor[field]}:`.padEnd(labelWidth + 4, ' ');
      if (!out || out.kind === 'no-file') {
        console.log(`${PREFIX}${label} no file`);
      } else if (out.kind === 'uploaded') {
        console.log(`${PREFIX}${label} uploaded`);
      } else if (out.kind === 'skipped') {
        console.log(`${PREFIX}${label} skipped (${out.reason})`);
      } else {
        console.log(`${PREFIX}${label} failed (${out.message})`);
      }
    }
    console.log('');
  }

  console.log(`${PREFIX}Totals: uploaded=${uploadedTotal}, skipped=${skippedTotal}, failed=${failedTotal}`);
  console.log('');

  // Unmatched.
  unmatched.sort((a, b) => a.path.localeCompare(b.path));
  console.log(`${PREFIX}Unmatched files (${unmatched.length}):`);
  for (const u of unmatched) {
    console.log(`${PREFIX}  - ${u.path} (${u.reason})`);
  }
  console.log('');

  // Which published clients already have logo / icon?
  const withImages: Array<{
    _id: string;
    logoRef?: string;
    iconRef?: string;
  }> = await client.fetch(
    `*[_type=="client" && !(_id in path("drafts.**"))]{
      _id,
      "logoRef": logo.asset._ref,
      "iconRef": icon.asset._ref
    }`,
  );
  const hasLogo = new Set<string>();
  const hasIcon = new Set<string>();
  for (const doc of withImages) {
    if (!doc._id.startsWith('client-')) continue;
    const slug = doc._id.slice('client-'.length);
    if (doc.logoRef) hasLogo.add(slug);
    if (doc.iconRef) hasIcon.add(slug);
  }
  // Fold in planned uploads (dry-run pretends they succeed).
  for (const r of reports) {
    if (r.outcomes.logo?.kind === 'uploaded') hasLogo.add(r.slug);
    if (r.outcomes.icon?.kind === 'uploaded') hasIcon.add(r.slug);
  }

  const missingLogo = Array.from(bySlug.keys())
    .filter((s) => !hasLogo.has(s))
    .sort((a, b) => a.localeCompare(b));
  const missingIcon = Array.from(bySlug.keys())
    .filter((s) => !hasIcon.has(s))
    .sort((a, b) => a.localeCompare(b));

  console.log(`${PREFIX}Clients still missing a logo (${missingLogo.length}): [${missingLogo.join(', ')}]`);
  console.log(`${PREFIX}Clients still missing an icon (${missingIcon.length}): [${missingIcon.join(', ')}]`);
}

main().catch((err) => {
  console.error('\nImport failed:', err instanceof Error ? err.message : err);
  process.exit(1);
});
