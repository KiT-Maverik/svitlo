#!/usr/bin/env node
/**
 * @fileoverview Trusted Lesson Stage 6 source handoff.
 * Analyze runs trusted Engine code on pinned PR data with a read token.
 * Publish checks the same immutable source and bounded artifact, then commits
 * only new allowlisted Lesson-owned files via Git Data API non-force CAS.
 * Independent Question/Flashcard banks, media, translation and Lesson completion
 * are NEVER produced by this workflow.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { inspect, requireActor, report, github, gitBlob, validateArtifactPath } from './lesson-gate.mjs';

const SHA = /^[a-f0-9]{40}$/;
const HASH = /^[a-f0-9]{64}$/;
const ROOT = fileURLToPath(new URL('../../..', import.meta.url));
const MAX_FILES = 400;
const MAX_FILE = 4 * 1024 * 1024;
const MAX_BYTES = 24 * 1024 * 1024;
const MAX_REPORT = 36 * 1024 * 1024;
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');

export function metadata(input = process.env.LESSON_META_B64) {
  if (typeof input !== 'string' || input.length > 8192 || !/^[A-Za-z0-9+/=]+$/.test(input))
    throw Error('Missing or invalid pinned Lesson authorization metadata');
  const meta = JSON.parse(Buffer.from(input, 'base64').toString('utf8'));
  if (
    !Number.isSafeInteger(meta.number) ||
    meta.number < 1 ||
    !['materialize', 'finalize'].includes(meta.operation) ||
    !SHA.test(meta.head ?? '') ||
    !SHA.test(meta.sourceBlob ?? '') ||
    !/^[A-Za-z0-9-]+$/.test(meta.actor ?? '') ||
    !meta.identity?.id ||
    !meta.identity?.pkg ||
    !meta.identity?.yaml ||
    meta.repo !== process.env.GITHUB_REPOSITORY ||
    typeof meta.branch !== 'string' ||
    typeof meta.base !== 'string'
  )
    throw Error('Malformed Lesson authorization metadata');
  return meta;
}

function git(root, args, maxBuffer = 32 * 1024 * 1024) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer }).trim();
}

/** The candidate may supply YAML/data only; no code in it is executed. */
export function checkedRoot(meta) {
  const specified = process.env.LESSON_HEAD_ROOT;
  if (!specified) throw Error('LESSON_HEAD_ROOT is required');
  const root = fs.realpathSync(specified);
  if (
    !fs.statSync(root).isDirectory() ||
    !fs.existsSync(path.join(root, '.git')) ||
    git(root, ['rev-parse', 'HEAD']) !== meta.head
  )
    throw Error('Candidate checkout is not the exact pinned Lesson PR commit');
  if (git(root, ['status', '--porcelain=v1', '--untracked-files=all']))
    throw Error('Candidate checkout must be clean before materialization');
  return root;
}

function safeRelative(root, filename) {
  const relative = path.relative(root, filename).split(path.sep).join('/');
  if (!relative || relative.startsWith('../') || path.isAbsolute(relative) || relative.includes('\\'))
    throw Error('Lesson output path escapes candidate checkout');
  let cursor = root;
  for (const part of relative.split('/')) {
    cursor = path.join(cursor, part);
    if (fs.existsSync(cursor) && fs.lstatSync(cursor).isSymbolicLink())
      throw Error('Symlink in candidate source/output path: ' + relative);
  }
  return relative;
}

export function trackedFiles(root, pkg) {
  const entries = execFileSync('git', ['ls-files', '-s', '-z', '--', pkg], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  })
    .split('\0')
    .filter(Boolean);
  const tracked = new Set();
  for (const entry of entries) {
    const separator = entry.indexOf('\t');
    if (separator < 0) throw Error('Invalid Git index entry');
    const mode = entry.slice(0, separator).split(' ')[0];
    if (!['100644', '100755'].includes(mode)) throw Error('Symlink/submodule/special path in Lesson package');
    const name = entry.slice(separator + 1);
    if (tracked.has(name)) throw Error('Duplicate indexed path');
    tracked.add(name);
  }
  return tracked;
}

export function changedFiles(root) {
  const status = execFileSync('git', ['status', '--porcelain=v1', '--untracked-files=all', '-z'], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });
  const result = new Map();
  for (const item of status.split('\0').filter(Boolean)) {
    const state = item.slice(0, 2);
    const filename = item.slice(3);
    if (state !== '??' || !filename || result.has(filename))
      throw Error('Unapproved tracked/edited/deleted/generated candidate path: ' + item);
    result.set(filename, state);
  }
  return result;
}

function verifySource(root, meta) {
  const location = path.join(root, meta.identity.yaml);
  safeRelative(root, location);
  if (
    !fs.existsSync(location) ||
    !fs.statSync(location).isFile() ||
    gitBlob(fs.readFileSync(location)) !== meta.sourceBlob
  )
    throw Error('Canonical Lesson YAML changed from its pinned Git blob');
  return location;
}

export function identicalSnapshot(a, b) {
  return (
    a.head === b.head &&
    a.branch === b.branch &&
    a.base === b.base &&
    a.sourceBlob === b.sourceBlob &&
    JSON.stringify(a.identity) === JSON.stringify(b.identity)
  );
}

async function fresh(meta) {
  await requireActor(meta.actor);
  const live = await inspect(meta.number, meta.head);
  if (!identicalSnapshot(live, meta)) throw Error('Lesson PR identity, source or branch changed');
}

/** Schema and Builder code load only in the read-only analyze job, never at publish startup. */
export async function chooseMode(source, root, trustedRoot = ROOT) {
  const { preflightLesson, preflightLessonDraft } =
    await import('../../../shared/engine/scripts/finalizeLesson/finalizeLesson.mjs');
  try {
    const strict = preflightLesson(source, root, {
      schemaRepo: trustedRoot,
    });
    if (strict.assessment.pending.length) throw Error('Strict preflight produced pending bank integration');
    return { kind: 'strict', item: strict };
  } catch (strictError) {
    try {
      const draft = preflightLessonDraft(source, root, { schemaRepo: trustedRoot });
      if (!draft.assessment.pending.length) throw Error('No explicit bank-pending Sections');
      return { kind: 'bank-pending', item: draft };
    } catch (draftError) {
      throw Error(
        'Strict Lesson preflight: ' + strictError.message + '; bank-pending preflight: ' + draftError.message,
      );
    }
  }
}

/** Analyzer-only fidelity check. Return hashes of the exact committed source inventory. */
export async function verifyMaterializedForFinalize(root, meta, source, item) {
  const { runOne } = await import('../../../shared/engine/scripts/lessonBuilder/lessonBuilder.mjs');
  const folder = path.dirname(source);
  const tracked = trackedFiles(root, meta.identity.pkg);
  const verified = new Set();
  for (const filename of ['index.ts', 'constants.ts', 'review.ts', 'methodology.md', 'production-handoff.json']) {
    const absolute = path.join(folder, filename);
    const relative = safeRelative(root, absolute);
    if (!tracked.has(relative) || !fs.existsSync(absolute) || !fs.lstatSync(absolute).isFile())
      throw Error('Finalize requires a committed materialized Lesson file: ' + relative);
    verified.add(relative);
  }
  if (fs.readFileSync(path.join(folder, 'production-handoff.json'), 'utf8') !== item.handoff)
    throw Error('Production handoff differs from the pinned Lesson YAML');
  const checked = runOne(source, 'check', root);
  for (const filename of checked.files) {
    const relative = safeRelative(root, path.join(folder, filename));
    if (!tracked.has(relative) || !fs.lstatSync(path.join(root, relative)).isFile())
      throw Error('Finalize requires a committed generated source: ' + relative);
    verified.add(relative);
  }
  if (changedFiles(root).size) throw Error('Finalize verification must be read-only');
  return [...verified]
    .sort()
    .map(filename => ({ path: filename, sha256: sha256(fs.readFileSync(path.join(root, filename))) }));
}

export function verifyManifest(manifest, meta, root) {
  if (
    !manifest ||
    manifest.version !== 1 ||
    manifest.repo !== meta.repo ||
    manifest.pr !== meta.number ||
    manifest.head !== meta.head ||
    manifest.operation !== meta.operation ||
    manifest.sourceBlob !== meta.sourceBlob ||
    manifest.base !== meta.base ||
    manifest.branch !== meta.branch ||
    JSON.stringify(manifest.identity) !== JSON.stringify(meta.identity) ||
    !['strict', 'bank-pending'].includes(manifest.mode) ||
    !Array.isArray(manifest.pending) ||
    manifest.pending.length > MAX_FILES ||
    (manifest.mode === 'strict' && manifest.pending.length !== 0) ||
    (manifest.mode === 'bank-pending' && manifest.pending.length === 0) ||
    !Array.isArray(manifest.verifiedFiles) ||
    manifest.verifiedFiles.length > MAX_FILES ||
    !Array.isArray(manifest.entries) ||
    manifest.entries.length > MAX_FILES
  )
    throw Error('Artifact identity or authorizing Lesson snapshot differs');
  if (!['materialize', 'finalize'].includes(meta.operation)) throw Error('Unrecognized Lesson operation');
  const tracked = trackedFiles(root, meta.identity.pkg);
  let total = 0;
  const paths = new Set();
  for (const entry of manifest.entries) {
    if (!entry || !validateArtifactPath(entry.path, meta.identity, meta.operation) || paths.has(entry.path))
      throw Error('Unallowlisted or duplicate Lesson file in manifest');
    paths.add(entry.path);
    if (meta.operation === 'finalize') {
      if (
        entry.action !== 'delete' ||
        entry.path !== meta.identity.yaml ||
        !tracked.has(entry.path) ||
        entry.data !== undefined
      )
        throw Error('Finalize may delete only the tracked canonical lesson.yaml');
      continue;
    }
    if (
      entry.action !== 'create' ||
      tracked.has(entry.path) ||
      typeof entry.data !== 'string' ||
      entry.data.length > MAX_FILE * 1.4 + 16 ||
      !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(entry.data)
    )
      throw Error('Unallowlisted or overwritten Lesson output');
    const bytes = Buffer.from(entry.data, 'base64');
    if (
      !bytes.length ||
      bytes.length > MAX_FILE ||
      bytes.toString('base64') !== entry.data ||
      !HASH.test(entry.sha256 ?? '') ||
      sha256(bytes) !== entry.sha256 ||
      !Buffer.from(bytes.toString('utf8'), 'utf8').equals(bytes)
    )
      throw Error('Invalid Lesson output bytes, UTF-8 or SHA256');
    total += bytes.length;
  }
  if (total > MAX_BYTES) throw Error('Lesson output inventory exceeds 24MiB');
  const rootFiles = ['index.ts', 'constants.ts', 'review.ts', 'methodology.md', 'production-handoff.json'].map(
    name => meta.identity.yaml.slice(0, -'lesson.yaml'.length) + name,
  );
  if (meta.operation === 'finalize') {
    if (paths.size !== 1 || !paths.has(meta.identity.yaml))
      throw Error('Finalize manifest must contain exactly one YAML deletion');
    const verified = new Set();
    for (const item of manifest.verifiedFiles) {
      if (
        !item ||
        !validateArtifactPath(item.path, meta.identity, 'materialize') ||
        !HASH.test(item.sha256 ?? '') ||
        !tracked.has(item.path) ||
        verified.has(item.path)
      )
        throw Error('Invalid or uncommitted Lesson finalization evidence');
      verified.add(item.path);
      const absolute = path.join(root, item.path);
      safeRelative(root, absolute);
      if (
        !fs.existsSync(absolute) ||
        !fs.lstatSync(absolute).isFile() ||
        sha256(fs.readFileSync(absolute)) !== item.sha256
      )
        throw Error('Committed Lesson source differs from analyzed finalization evidence: ' + item.path);
    }
    if (rootFiles.some(filename => !verified.has(filename)))
      throw Error('Incomplete committed Lesson finalization evidence');
  } else {
    if (manifest.verifiedFiles.length) throw Error('Materialize must not contain finalization evidence');
    if (rootFiles.some(filename => !paths.has(filename))) throw Error('Incomplete Lesson root source handoff');
  }
  return manifest.entries.length;
}

export function readReport() {
  const location = process.env.LESSON_REPORT;
  if (
    !location ||
    !fs.existsSync(location) ||
    fs.lstatSync(location).isSymbolicLink() ||
    fs.statSync(location).size > MAX_REPORT
  )
    throw Error('Missing/oversized/symlinked Lesson handoff report');
  const bytes = fs.readFileSync(location);
  const expected = process.env.LESSON_REPORT_SHA256;
  if (!HASH.test(expected ?? '') || sha256(bytes) !== expected)
    throw Error('Lesson analysis artifact changed or lacks trusted SHA256 attestation');
  return JSON.parse(bytes.toString('utf8'));
}

async function analyze(root, meta) {
  await fresh(meta);
  const source = verifySource(root, meta);
  trackedFiles(root, meta.identity.pkg);
  const { preflightLesson, preflightLessonDraft, finalizeLesson, handoffLesson } =
    await import('../../../shared/engine/scripts/finalizeLesson/finalizeLesson.mjs');
  const mode = await chooseMode(source, root);
  const entries = [];
  const verifiedFiles =
    meta.operation === 'finalize' ? await verifyMaterializedForFinalize(root, meta, source, mode.item) : [];
  if (meta.operation === 'finalize') {
    entries.push({ path: meta.identity.yaml, action: 'delete' });
  } else {
    if (fs.existsSync(path.join(path.dirname(source), 'index.ts')))
      throw Error('Lesson was already materialized. Remove confirmed generated outputs explicitly before retrying.');
    const schemaRepo = ROOT;
    const validate =
      mode.kind === 'bank-pending'
        ? (location, repo) => preflightLessonDraft(location, repo, { schemaRepo })
        : (location, repo) => preflightLesson(location, repo, { schemaRepo });
    const result =
      mode.kind === 'bank-pending'
        ? handoffLesson(source, { repo: root, validate })
        : finalizeLesson(source, { repo: root, validate, retainSource: true });
    if (result.removed || !fs.existsSync(source) || gitBlob(fs.readFileSync(source)) !== meta.sourceBlob)
      throw Error('Source-preserving generation unexpectedly modified lesson.yaml');
    const changes = changedFiles(root);
    const expected = new Set(
      result.files.map(filename =>
        safeRelative(root, path.isAbsolute(filename) ? filename : path.join(path.dirname(source), filename)),
      ),
    );
    if (changes.size !== expected.size || [...changes.keys()].some(filename => !expected.has(filename)))
      throw Error('Builder output differs from its declared complete inventory');
    for (const filename of expected) {
      if (!validateArtifactPath(filename, meta.identity) || trackedFiles(root, meta.identity.pkg).has(filename))
        throw Error('Lesson Builder attempted to overwrite or write forbidden path: ' + filename);
      const absolute = path.join(root, filename);
      safeRelative(root, absolute);
      if (!fs.statSync(absolute).isFile()) throw Error('Generated path is not a regular file');
      const bytes = fs.readFileSync(absolute);
      entries.push({ path: filename, action: 'create', data: bytes.toString('base64'), sha256: sha256(bytes) });
    }
  }
  const manifest = {
    version: 1,
    repo: meta.repo,
    pr: meta.number,
    head: meta.head,
    branch: meta.branch,
    base: meta.base,
    operation: meta.operation,
    sourceBlob: meta.sourceBlob,
    identity: meta.identity,
    mode: mode.kind,
    pending: mode.item.assessment.pending,
    verifiedFiles,
    entries: entries.sort((a, b) => a.path.localeCompare(b.path)),
  };
  verifyManifest(manifest, meta, root);
  if (changedFiles(root).size !== (meta.operation === 'materialize' ? entries.length : 0))
    throw Error('Unexpected checkout modifications after analysis');
  const output = process.env.LESSON_REPORT;
  if (!output) throw Error('LESSON_REPORT is required');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const bytes = Buffer.from(JSON.stringify(manifest));
  fs.writeFileSync(output, bytes, { flag: 'wx' });
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, 'report_sha256=' + sha256(bytes) + '\n');
  report(
    'Lesson Stage 6 ' +
      meta.operation +
      ' verified for PR #' +
      meta.number +
      ' at ' +
      meta.head +
      ', source blob ' +
      meta.sourceBlob,
  );
}

export async function publish(root, meta) {
  await fresh(meta);
  verifySource(root, meta);
  const manifest = readReport();
  const count = verifyManifest(manifest, meta, root);
  // All Engine-backed schema/source-fidelity checks ran in trusted analyze.
  // The SHA-attested report and rehashed committed evidence bind them to this exact HEAD.
  if (changedFiles(root).size) throw Error('Publisher checkout must remain clean');
  const commit = await github('git/commits/' + meta.head);
  if (!SHA.test(commit?.tree?.sha ?? '')) throw Error('Missing pinned Git parent tree');
  const tree = await github('git/trees', 'POST', {
    base_tree: commit.tree.sha,
    tree: manifest.entries.map(entry =>
      entry.action === 'delete'
        ? { path: entry.path, mode: '100644', type: 'blob', sha: null }
        : {
            path: entry.path,
            mode: '100644',
            type: 'blob',
            content: Buffer.from(entry.data, 'base64').toString('utf8'),
          },
    ),
  });
  if (!SHA.test(tree?.sha ?? '')) throw Error('Unable to create verified Lesson tree');
  const next = await github('git/commits', 'POST', {
    message:
      (meta.operation === 'finalize' ? 'Finalize Lesson ' : 'Materialize Lesson ') +
      meta.identity.id +
      '\n\n' +
      'Lesson-PR: #' +
      meta.number +
      '\n' +
      'Lesson-Source-Commit: ' +
      meta.head +
      '\n' +
      'Lesson-Source-Blob: ' +
      meta.sourceBlob +
      '\n' +
      'Lesson-Preflight: ' +
      manifest.mode,
    tree: tree.sha,
    parents: [meta.head],
  });
  if (!SHA.test(next?.sha ?? '')) throw Error('GitHub did not create the commit');
  const current = await github('pulls/' + meta.number);
  if (
    current?.head?.sha !== meta.head ||
    current.head.ref !== meta.branch ||
    current.base?.ref !== meta.base ||
    !current.draft ||
    current.state !== 'open'
  )
    throw Error('Lesson branch advanced before publish; refusing concurrent update');
  await fresh(meta);
  const updated = await github('git/refs/heads/' + meta.branch, 'PATCH', {
    sha: next.sha,
    force: false,
  });
  if (updated?.object?.sha !== next.sha) throw Error('GitHub did not verify new Lesson HEAD');
  report(
    'Published Lesson ' +
      meta.operation +
      ' (' +
      count +
      ' file operations) to PR #' +
      meta.number +
      ', commit ' +
      next.sha +
      ', pinned source ' +
      meta.sourceBlob +
      '; Stage 6 remains in progress',
  );
}

async function main() {
  const operation = process.argv[2];
  if (process.argv.length !== 3 || !['analyze', 'publish'].includes(operation))
    throw Error('Usage: lesson-materialization.mjs analyze|publish');
  const meta = metadata();
  const root = checkedRoot(meta);
  if (operation === 'analyze') await analyze(root, meta);
  else await publish(root, meta);
}

if (process.argv[1] && process.argv[1].endsWith('/lesson-materialization.mjs')) {
  main().catch(error => {
    report('Lesson Stage 6 materialization rejected: ' + String(error.message ?? error));
    process.exitCode = 1;
  });
}
