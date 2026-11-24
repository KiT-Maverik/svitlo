/** Metadata-only postcondition for an already committed Course Stage 5 run.
 * Invoked by a separate least-privilege job; never writes a Git ref.
 */
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { github, gitBlob, requireActor, report } from './course-gate.mjs';
import { reconcileCourseHandoffTables } from './course-handoff-tables.mjs';

const SHA = /^[a-f0-9]{40}$/;
export const manifestDigest = manifest => createHash('sha256').update(JSON.stringify(manifest)).digest('hex');

export async function verifyCommittedInventory(manifest, proof, api = github) {
  if (!manifest || !proof || manifestDigest(manifest) !== proof.digest ||
      manifest.repo !== proof.repo || manifest.number !== proof.number ||
      manifest.head !== proof.reviewedHead || manifest.branch !== proof.branch ||
      manifest.courseId !== proof.courseId || !SHA.test(proof.commit ?? '') ||
      !SHA.test(proof.reviewedHead ?? '') || !Array.isArray(manifest.entries) ||
      !Array.isArray(manifest.inventory?.lessons) || !Array.isArray(manifest.inventory?.episodes))
    throw Error('Course metadata proof does not match verified materialization manifest');
  // Final typed-source boundary: the reviewed draft must be consumed, not archived.
  if (manifest.version !== 2 || manifest.operation !== 'typed-course-stage5' ||
      !manifest.sourcePath?.endsWith('/draft.ts') || !SHA.test(manifest.sourceBlobSha ?? '') ||
      manifest.materializedPath !== manifest.sourcePath.replace(/draft\.ts$/, 'index.ts') ||
      Object.hasOwn(manifest, 'sourceArchivePath'))
    throw Error('Course metadata requires the atomic draft.ts consumption contract');
  const commit = await api('git/commits/' + proof.commit);
  if (commit?.sha !== proof.commit || commit.parents?.length !== 1 ||
      commit.parents[0].sha !== proof.reviewedHead ||
      !commit.message?.includes('Course-PR: #' + proof.number + '\n') ||
      !commit.message?.includes('Course-Inventory-Manifest: ' + proof.digest))
    throw Error('Course metadata requires the exact committed materialization transaction');
  const tree = await api('git/trees/' + commit.tree.sha + '?recursive=1');
  if (!tree || tree.truncated || !Array.isArray(tree.tree)) throw Error('Incomplete committed Course tree inventory');
  const parent = await api('git/commits/' + proof.reviewedHead);
  if (parent?.sha !== proof.reviewedHead || !SHA.test(parent.tree?.sha ?? ''))
    throw Error('Missing exact reviewed Course commit');
  const reviewedTree = await api('git/trees/' + parent.tree.sha + '?recursive=1');
  if (!reviewedTree || reviewedTree.truncated || !Array.isArray(reviewedTree.tree) ||
      !reviewedTree.tree.some(entry => entry.path === manifest.sourcePath && entry.type === 'blob' &&
        entry.mode === '100644' && entry.sha === manifest.sourceBlobSha))
    throw Error('Reviewed draft blob does not match exact parent commit');
  if (tree.tree.some(entry => entry.path === manifest.sourcePath))
    throw Error('Consumed Course draft still exists in committed tree');
  const blobs = new Map(tree.tree.filter(entry => entry.type === 'blob' && entry.mode === '100644').map(entry => [entry.path, entry.sha]));
  const generated = new Set();
  for (const file of manifest.entries) {
    if (generated.has(file.path) || blobs.get(file.path) !== gitBlob(Buffer.from(file.data, 'base64')))
      throw Error('Committed Course output differs from verified manifest: ' + file.path);
    generated.add(file.path);
  }
  if (!generated.has(manifest.materializedPath)) throw Error('Missing committed Course index');
  for (const row of [...manifest.inventory.lessons, ...manifest.inventory.episodes]) {
    if (!generated.has(row.placementSourcePath) || !blobs.has(row.placementSourcePath) ||
        (row.status.startsWith('pending') && !generated.has(row.sourcePath)))
      throw Error('Course inventory row has no committed generated source');
  }
  return true;
}

function requirePR(pr, proof) {
  if (pr?.number !== proof.number || pr.state !== 'open' || !pr.draft ||
      pr.head?.repo?.full_name !== proof.repo || pr.head.ref !== proof.branch ||
      pr.head.sha !== proof.commit || typeof (pr.body ?? '') !== 'string')
    throw Error('Course PR identity, Draft state or committed HEAD changed; metadata reconciliation refused');
}

async function getPR(route, method = 'GET', body, etag) {
  const response = await fetch('https://api.github.com/repos/' + process.env.GITHUB_REPOSITORY + '/' + route, {
    method,
    headers: {
      Authorization: 'Bearer ' + process.env.GH_TOKEN,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(etag ? { 'If-Match': etag } : {}),
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw Error('Course PR metadata HTTP ' + response.status);
  return { pr: await response.json(), etag: response.headers.get('etag') };
}

/** Optimistic edit: compare two current reads, send the version precondition,
 * and verify postcondition. GitHub PR REST does not document atomic body CAS;
 * this detects observed races, not an absolute lock against human edits.
 */
export async function reconcileCommittedPR(manifest, proof, request = getPR) {
  const route = 'pulls/' + proof.number;
  const before = await request(route);
  requirePR(before.pr, proof);
  const body = before.pr.body ?? '';
  const next = reconcileCourseHandoffTables(body, manifest.inventory);
  if (next === body) return false;
  const latest = await request(route);
  requirePR(latest.pr, proof);
  if (!before.etag || !latest.etag || before.etag !== latest.etag ||
      (latest.pr.body ?? '') !== body || latest.pr.updated_at !== before.pr.updated_at)
    throw Error('Concurrent Course PR description edit; retry metadata only');
  const written = await request(route, 'PATCH', { body: next }, latest.etag);
  requirePR(written.pr, proof);
  if (written.pr.body !== next) throw Error('Course PR description update did not preserve exact intended content');
  const after = await request(route);
  requirePR(after.pr, proof);
  if (after.pr.body !== next) throw Error('Concurrent Course PR edit after metadata write; inspect before retrying');
  return true;
}

async function main() {
  const filename = process.env.COURSE_TYPED_REPORT;
  if (!filename || fs.lstatSync(filename).isSymbolicLink() || fs.statSync(filename).size > 48 * 1024 * 1024)
    throw Error('Invalid Course metadata artifact');
  const manifest = JSON.parse(fs.readFileSync(filename, 'utf8'));
  const proof = JSON.parse(process.env.COURSE_COMMIT_PROOF ?? '{}');
  if (proof.repo !== process.env.GITHUB_REPOSITORY || !Number.isSafeInteger(proof.number) ||
      proof.number < 1 || !process.env.GH_TOKEN) throw Error('Invalid trusted Course metadata invocation');
  await requireActor(process.env.GITHUB_ACTOR);
  await verifyCommittedInventory(manifest, proof);
  const changed = await reconcileCommittedPR(manifest, proof);
  report('Course Stage 5 committed ' + proof.commit + '; Lessons/Episodes tables ' + (changed ? 'updated' : 'already current'));
}

if (process.argv[1]?.endsWith('/course-handoff-publish.mjs')) {
  main().catch(error => {
    report('Course source commit already succeeded; metadata-only reconciliation failed: ' + error.message +
      '. Inspect the PR and rerun only the failed metadata job using the same run artifact.');
    process.exitCode = 1;
  });
}
