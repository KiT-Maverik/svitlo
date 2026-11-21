#!/usr/bin/env node
/**
 * @fileoverview Stage 5 orchestration. Analyze executes only the default-branch
 * Engine materializer against an immutable PR data checkout with a read token.
 * Publish runs trusted code only, verifies its bounded artifact, and uses the
 * GitHub Git Data API to commit exactly allowlisted bytes with a non-force CAS.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { github, inspect, requireActor, report, gitBlob, validateArtifactPath } from './course-gate.mjs';

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function metadata() {
  const input = process.env.COURSE_META_B64 ?? '';
  if (!/^[A-Za-z0-9+/=]+$/.test(input) || input.length > 8192) throw Error('Missing or invalid pinned Course metadata');
  const meta = JSON.parse(Buffer.from(input, 'base64').toString('utf8'));
  if (
    !Number.isSafeInteger(meta.number) ||
    meta.operation !== 'materialize' ||
    !/^[a-f0-9]{40}$/.test(meta.head) ||
    !/^[a-f0-9]{40}$/.test(meta.sourceBlob) ||
    !meta.identity?.yaml ||
    !meta.identity?.pkg ||
    !meta.identity?.id ||
    meta.repo !== process.env.GITHUB_REPOSITORY
  )
    throw Error('Invalid Course metadata fields');
  return meta;
}

function checkedRoot() {
  const root = fs.realpathSync(process.env.COURSE_HEAD_ROOT ?? '');
  if (!fs.statSync(root).isDirectory() || !fs.existsSync(path.join(root, '.git')))
    throw Error('Expected a real, immutable Git checkout');
  const head = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
  if (head !== metadata().head) throw Error('Data checkout is not the pinned PR head');
  const status = execFileSync('git', ['status', '--porcelain=v1', '--untracked-files=all'], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  });
  if (status.trim()) throw Error('PR data checkout was dirty before operation');
  return root;
}

function relativeSafe(root, filename) {
  const relative = path.relative(root, filename).split(path.sep).join('/');
  if (!relative || relative.startsWith('../') || path.isAbsolute(relative) || relative.includes('\\'))
    throw Error('Generated path escapes pinned Course checkout');
  let cursor = root;
  for (const part of relative.split('/')) {
    cursor = path.join(cursor, part);
    if (fs.existsSync(cursor) && fs.lstatSync(cursor).isSymbolicLink())
      throw Error('Symlink in materialization path: ' + relative);
  }
  return relative;
}

function trackedFiles(root, pkg) {
  const output = execFileSync('git', ['ls-files', '-s', '-z', '--', pkg], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });
  const files = new Set();
  for (const item of output.split('\0').filter(Boolean)) {
    const separator = item.indexOf('\t');
    if (separator < 0) throw Error('Malformed Git index entry');
    const mode = item.slice(0, separator).split(' ')[0];
    if (mode === '120000' || mode === '160000') throw Error('Untrusted symlink/submodule in Course package');
    files.add(item.slice(separator + 1));
  }
  return files;
}

function changedFiles(root) {
  const status = execFileSync('git', ['status', '--porcelain=v1', '--untracked-files=all', '-z'], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });
  const changes = new Map();
  for (const item of status.split('\0').filter(Boolean)) {
    const state = item.slice(0, 2);
    const filename = item.slice(3);
    if (!['??', ' D'].includes(state) || !filename)
      throw Error('Unexpected modified/renamed/staged PR data: ' + state + ' ' + filename);
    if (changes.has(filename)) throw Error('Duplicate changed path');
    changes.set(filename, state);
  }
  return changes;
}

const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const SLUG = /^[a-z][A-Za-z0-9]*$/;

/** Verify each newly allocated Lesson against an actual new YAML source. */
function validateLessonAssignments(manifest, meta) {
  const assignments = manifest.lessonAssignments;
  if (!Array.isArray(assignments) || assignments.length > 500) throw Error('Invalid generated Lesson assignment list');
  const ids = new Set(),
    filenames = new Set();
  for (const lesson of assignments) {
    if (
      !lesson ||
      typeof lesson.id !== 'string' ||
      !UUID.test(lesson.id) ||
      typeof lesson.slug !== 'string' ||
      !SLUG.test(lesson.slug) ||
      typeof lesson.title !== 'string' ||
      !lesson.title.trim() ||
      lesson.title.length > 300 ||
      /[\r\n\x00-\x1f]/.test(lesson.title) ||
      lesson.path !== meta.identity.pkg + '/data/lessons/' + lesson.id.at(-1) + '/' + lesson.id + '/lesson.yaml' ||
      ids.has(lesson.id) ||
      filenames.has(lesson.path)
    )
      throw Error('Invalid or duplicated generated Lesson identity');
    ids.add(lesson.id);
    filenames.add(lesson.path);
    if (!manifest.entries.some(entry => entry.action === 'create' && entry.path === lesson.path))
      throw Error('Generated Lesson identity has no newly written source');
  }
  for (const entry of manifest.entries)
    if (
      entry.action === 'create' &&
      entry.path.startsWith(meta.identity.pkg + '/data/lessons/') &&
      entry.path.endsWith('/lesson.yaml') &&
      !filenames.has(entry.path)
    )
      throw Error('Generated Lesson YAML lacks a registered identity');
  return assignments;
}

/** Append-only Actions summary; never read or rewrite the Course PR description. */
export function renderLessonHandoff(manifest, commitSha) {
  const safe = value =>
    value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('|', '&#124;');
  const rows = manifest.lessonAssignments.map(
    lesson =>
      '| ' +
      safe(lesson.title) +
      ' | ' +
      lesson.slug +
      ' | ' +
      lesson.id +
      ' | [lesson.yaml](https://github.com/' +
      manifest.repo +
      '/blob/' +
      commitSha +
      '/' +
      lesson.path +
      ') |',
  );
  return [
    '### Course Stage 5 — source-pinned Lesson handoff',
    '',
    'Course PR: #' + manifest.pr + '; Course UUID: ' + manifest.identity.id,
    '',
    'Original PR HEAD: ' + manifest.head,
    '',
    'Original course.yaml Git blob SHA: ' + manifest.sourceBlob,
    '',
    'One atomic materialization commit: ' + commitSha,
    '',
    '| Source title | Slug | UUID | Committed Lesson YAML |',
    '| --- | --- | --- | --- |',
    ...(rows.length ? rows : ['| No new Lessons | — | — | — |']),
    '',
    'Stage 5 does not start Lesson PRs or certify Lessons, Scenes, translations or publication.',
  ].join('\n');
}

/** All create and delete entries form a single Git Data API tree and commit. */
export function publicationTreeEntries(entries) {
  return entries.map(entry =>
    entry.action === 'delete'
      ? { path: entry.path, mode: '100644', type: 'blob', sha: null }
      : { path: entry.path, mode: '100644', type: 'blob', content: Buffer.from(entry.data, 'base64').toString('utf8') },
  );
}

function verifyManifest(manifest, meta, root) {
  if (
    !manifest ||
    manifest.version !== 1 ||
    manifest.pr !== meta.number ||
    manifest.operation !== 'materialize' ||
    meta.operation !== 'materialize' ||
    manifest.head !== meta.head ||
    manifest.repo !== meta.repo ||
    manifest.sourceBlob !== meta.sourceBlob ||
    JSON.stringify(manifest.identity) !== JSON.stringify(meta.identity) ||
    !Array.isArray(manifest.entries) ||
    manifest.entries.length > 2500
  )
    throw Error('Artifact metadata differs from authorized PR and source');
  const tracked = trackedFiles(root, meta.identity.pkg);
  if (!tracked.has(meta.identity.yaml)) throw Error('Pinned Course YAML is not tracked');
  let total = 0,
    creates = 0,
    deletes = 0;
  const seen = new Set();
  for (const entry of manifest.entries) {
    if (!entry || !validateArtifactPath(entry.path, meta.identity, meta.operation) || seen.has(entry.path))
      throw Error('Unallowlisted or duplicated artifact path');
    seen.add(entry.path);
    if (entry.action === 'delete') {
      if (
        entry.path !== meta.identity.yaml ||
        !tracked.has(entry.path) ||
        Object.hasOwn(entry, 'data') ||
        Object.hasOwn(entry, 'sha256')
      )
        throw Error('Only the tracked Course YAML may be deleted');
      deletes++;
    } else if (entry.action === 'create') {
      if (
        entry.path === meta.identity.yaml ||
        tracked.has(entry.path) ||
        typeof entry.data !== 'string' ||
        entry.data.length > 12 * 1024 * 1024 ||
        !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(entry.data)
      )
        throw Error('Artifact must create a new allowlisted source file');
      const bytes = Buffer.from(entry.data, 'base64');
      if (
        bytes.toString('base64') !== entry.data ||
        !bytes.length ||
        sha256(bytes) !== entry.sha256 ||
        !Buffer.from(bytes.toString('utf8'), 'utf8').equals(bytes)
      )
        throw Error('Invalid artifact bytes/hash');
      total += bytes.length;
      creates++;
    } else throw Error('Unsupported Course file operation');
  }
  if (total > 32 * 1024 * 1024) throw Error('Generated artifact exceeds 32MiB safe handoff limit');
  if (deletes !== 1 || creates < 1)
    throw Error('Materialization requires source creation and exactly one YAML deletion in one commit');
  validateLessonAssignments(manifest, meta);
  return manifest.entries.length;
}
function readReport() {
  const filename = process.env.COURSE_REPORT;
  if (
    !filename ||
    !fs.existsSync(filename) ||
    fs.lstatSync(filename).isSymbolicLink() ||
    fs.statSync(filename).size > 48 * 1024 * 1024
  )
    throw Error('Missing, symlinked, or oversized Stage 5 artifact');
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

function assertSource(root, meta) {
  const source = path.join(root, meta.identity.yaml);
  relativeSafe(root, source);
  if (!fs.existsSync(source) || !fs.statSync(source).isFile() || gitBlob(fs.readFileSync(source)) !== meta.sourceBlob)
    throw Error('Canonical Course source differs from pinned Git blob');
}

function identicalSnapshot(a, b) {
  return (
    a.head === b.head &&
    a.branch === b.branch &&
    a.sourceBlob === b.sourceBlob &&
    JSON.stringify(a.identity) === JSON.stringify(b.identity)
  );
}

async function analyze(root, meta) {
  await requireActor(meta.actor);
  const live = await inspect(meta.number, meta.head);
  if (!identicalSnapshot(live, meta)) throw Error('Pinned Course source identity changed');
  assertSource(root, meta);
  const tracked = trackedFiles(root, meta.identity.pkg);
  const { materialize } =
    await import('../../../shared/engine/scripts/materializeCourseFlow/materialize-course-flow.mjs');
  // Exactly one Engine --write invocation. Preflight, output verification,
  // source-fidelity checking, and YAML deletion are internal to that call.
  const { artifacts } = materialize(['--package', meta.identity.pkg, '--course', meta.identity.id, '--write'], root);
  const entries = [];
  for (const [relative, content] of artifacts.files) {
    const local = relativeSafe(root, path.join(artifacts.folder, relative));
    if (tracked.has(local)) continue;
    entries.push({
      path: local,
      action: 'create',
      data: Buffer.from(content).toString('base64'),
      sha256: sha256(Buffer.from(content)),
    });
  }
  for (const [filename, content] of artifacts.lessonFiles) {
    const local = relativeSafe(root, filename);
    if (tracked.has(local)) continue;
    entries.push({
      path: local,
      action: 'create',
      data: Buffer.from(content).toString('base64'),
      sha256: sha256(Buffer.from(content)),
    });
  }
  entries.push({ path: meta.identity.yaml, action: 'delete' });
  const manifest = {
    version: 1,
    repo: meta.repo,
    pr: meta.number,
    operation: 'materialize',
    head: meta.head,
    identity: meta.identity,
    sourceBlob: meta.sourceBlob,
    lessonAssignments: artifacts.lessonAssignments,
    entries: entries.sort((a, b) => a.path.localeCompare(b.path)),
  };
  verifyManifest(manifest, meta, root);
  const changed = changedFiles(root);
  if (
    changed.size !== entries.length ||
    entries.some(entry => changed.get(entry.path) !== (entry.action === 'create' ? '??' : ' D'))
  )
    throw Error('Unapproved generated or modified files detected');
  const output = process.env.COURSE_REPORT;
  if (!output) throw Error('COURSE_REPORT is required');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, JSON.stringify(manifest));
  report(
    'Analyzed atomic Course materialization at PR #' +
      meta.number +
      ' / ' +
      meta.head +
      ': ' +
      entries.length +
      ' allowlisted changes; source blob ' +
      meta.sourceBlob,
  );
}

async function publish(root, meta) {
  await requireActor(meta.actor);
  const live = await inspect(meta.number, meta.head);
  if (!identicalSnapshot(live, meta)) throw Error('Course HEAD/source changed after analyze');
  assertSource(root, meta);
  const manifest = readReport();
  const count = verifyManifest(manifest, meta, root);
  const original = await github('git/commits/' + meta.head);
  if (!original?.tree?.sha) throw Error('Cannot resolve exact parent Git tree');
  const tree = await github('git/trees', 'POST', {
    base_tree: original.tree.sha,
    tree: publicationTreeEntries(manifest.entries),
  });
  if (!/^[a-f0-9]{40}$/.test(tree?.sha ?? '')) throw Error('Git tree creation failed');
  const next = await github('git/commits', 'POST', {
    message:
      'Materialize Course ' +
      meta.identity.id +
      '\n\nCourse-PR: #' +
      meta.number +
      '\nCourse-Source-Commit: ' +
      meta.head +
      '\nCourse-Source-Blob: ' +
      meta.sourceBlob,
    tree: tree.sha,
    parents: [meta.head],
  });
  if (!/^[a-f0-9]{40}$/.test(next?.sha ?? '')) throw Error('Git commit creation failed');
  const beforeWrite = await github('pulls/' + meta.number);
  if (beforeWrite?.head?.sha !== meta.head || beforeWrite.head.ref !== meta.branch || beforeWrite.state !== 'open')
    throw Error('PR HEAD advanced before write; no branch ref updated');
  const fresh = await inspect(meta.number, meta.head);
  if (!identicalSnapshot(fresh, meta)) throw Error('Course identity/source changed before ref update');
  const updated = await github('git/refs/heads/' + meta.branch, 'PATCH', { sha: next.sha, force: false });
  if (updated?.object?.sha !== next.sha) throw Error('GitHub did not confirm the exact new branch ref');
  report(
    'Committed ' +
      count +
      ' verified Course Stage 5 changes to PR #' +
      meta.number +
      ': ' +
      next.sha +
      ' (pinned source blob ' +
      meta.sourceBlob +
      ')',
  );
  report(renderLessonHandoff(manifest, next.sha));
}

async function main() {
  const mode = process.argv[2];
  if (!['analyze', 'publish'].includes(mode) || process.argv.length !== 3)
    throw Error('Usage: course-materialization.mjs analyze|publish');
  const meta = metadata();
  const root = checkedRoot();
  if (mode === 'analyze') await analyze(root, meta);
  else await publish(root, meta);
}

if (process.argv[1] && process.argv[1].endsWith('/course-materialization.mjs')) {
  main().catch(error => {
    report('Course Stage 5 rejected: ' + String(error.message ?? error));
    process.exitCode = 1;
  });
}

export { verifyManifest, metadata, trackedFiles, changedFiles, identicalSnapshot, validateLessonAssignments };
