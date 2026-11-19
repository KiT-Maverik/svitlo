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
import {
  github,
  inspect,
  parseIdentity,
  requireCompletedStageFour,
  requireActor,
  report,
  gitBlob,
  validateArtifactPath,
} from './course-gate.mjs';

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function metadata() {
  const input = process.env.COURSE_META_B64 ?? '';
  if (!/^[A-Za-z0-9+/=]+$/.test(input) || input.length > 8192) throw Error('Missing or invalid pinned Course metadata');
  const meta = JSON.parse(Buffer.from(input, 'base64').toString('utf8'));
  if (
    !Number.isSafeInteger(meta.number) ||
    !['materialize', 'finalize'].includes(meta.operation) ||
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

const LESSONS_START = '<!-- svitlo-course-lessons:start -->';
const LESSONS_END = '<!-- svitlo-course-lessons:end -->';
const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const SLUG = /^[a-z][A-Za-z0-9]*$/;

/** Metadata emitted by the materializer when it writes each standalone Lesson YAML. */
function validateLessonAssignments(manifest, meta) {
  const assignments = manifest.lessonAssignments;
  if (!Array.isArray(assignments) || assignments.length > 500) throw Error('Invalid generated Lesson assignment list');
  if (meta.operation === 'finalize' && assignments.length)
    throw Error('Finalization may not register Lesson identities');
  const ids = new Set();
  const filenames = new Set();
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
  }
  for (const entry of manifest.entries) {
    if (
      entry.path.startsWith(meta.identity.pkg + '/data/lessons/') &&
      entry.path.endsWith('/lesson.yaml') &&
      !filenames.has(entry.path)
    )
      throw Error('Generated Lesson YAML lacks a registered identity');
  }
  return assignments;
}

function safeLessonTitle(title) {
  return title.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('|', '&#124;');
}

/** A one-time handoff; agents may later fill in the PR column by editing the description. */
export function renderLessonRegistry(assignments) {
  const rows = assignments.map(
    lesson => '| ' + safeLessonTitle(lesson.title) + ' | `' + lesson.slug + '` | `' + lesson.id + '` | Not started |',
  );
  return [
    LESSONS_START,
    '## Lessons',
    '',
    '| Lesson | Slug | UUID | Lesson PR |',
    '| --- | --- | --- | --- |',
    ...rows,
    ...(rows.length ? [] : ['| No new Lessons | — | — | Not started |']),
    '',
    LESSONS_END,
  ].join('\n');
}

/** Replace only the generated placeholder; never overwrite a table edited by Lesson agents. */
export function registerLessonRegistry(body, assignments) {
  if (typeof body !== 'string') throw Error('Missing Course PR description');
  if (body.split(LESSONS_START).length !== 2 || body.split(LESSONS_END).length !== 2)
    throw Error('Exactly one balanced Course Lessons region required');
  const start = body.indexOf(LESSONS_START);
  const end = body.indexOf(LESSONS_END, start);
  if (end < start) throw Error('Misordered Course Lessons markers');
  const existing = body.slice(start, end + LESSONS_END.length);
  if (existing.includes('| Lesson | Slug | UUID | Lesson PR |')) {
    if (assignments.some(lesson => !existing.includes('`' + lesson.id + '`')))
      throw Error('Registered Lesson UUIDs differ; refusing to overwrite Lesson PR links');
    return body;
  }
  if (
    !existing.includes('Lesson inventory not allocated yet.') &&
    existing.replace(LESSONS_START, '').replace(LESSONS_END, '').trim() !== ''
  )
    throw Error('Unknown Lesson table content; refusing to overwrite agent edits');
  const next = renderLessonRegistry(assignments);
  return body.slice(0, start) + next + body.slice(end + LESSONS_END.length);
}

function publishOutputs(sha, manifest) {
  const filename = process.env.GITHUB_OUTPUT;
  if (!filename) return;
  const shouldRegister =
    manifest.operation === 'materialize' &&
    manifest.entries.some(entry => manifest.lessonAssignments.some(lesson => lesson.path === entry.path));
  fs.appendFileSync(filename, 'head=' + sha + '\nregister=' + shouldRegister + '\n');
}

function verifyManifest(manifest, meta, root) {
  if (
    !manifest ||
    manifest.version !== 1 ||
    manifest.pr !== meta.number ||
    manifest.operation !== meta.operation ||
    manifest.head !== meta.head ||
    manifest.repo !== meta.repo ||
    manifest.sourceBlob !== meta.sourceBlob ||
    JSON.stringify(manifest.identity) !== JSON.stringify(meta.identity) ||
    !Array.isArray(manifest.entries) ||
    manifest.entries.length > 2500
  )
    throw Error('Artifact metadata differs from authorized PR and source');
  const tracked = trackedFiles(root, meta.identity.pkg);
  let total = 0;
  const seen = new Set();
  for (const entry of manifest.entries) {
    if (!entry || !validateArtifactPath(entry.path, meta.identity, meta.operation) || seen.has(entry.path))
      throw Error('Unallowlisted or duplicated artifact path');
    seen.add(entry.path);
    if (meta.operation === 'finalize') {
      if (entry.action !== 'delete' || entry.path !== meta.identity.yaml || !tracked.has(entry.path))
        throw Error('Finalize must delete only the tracked Course YAML');
    } else {
      if (
        entry.action !== 'create' ||
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
    }
  }
  if (total > 32 * 1024 * 1024) throw Error('Generated artifact exceeds 32MiB safe handoff limit');
  if (meta.operation === 'finalize' && (seen.size !== 1 || !seen.has(meta.identity.yaml)))
    throw Error('Finalize manifest must contain exactly one Course YAML deletion');
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
  if (!identicalSnapshot(live, meta)) throw Error('Source identity or Stage 4 completion changed');
  assertSource(root, meta);
  const tracked = trackedFiles(root, meta.identity.pkg);
  const argumentsBase = ['--package', meta.identity.pkg, '--course', meta.identity.id];
  const { materialize } =
    await import('../../../shared/engine/scripts/materializeCourseFlow/materialize-course-flow.mjs');
  let entries = [];
  let artifactsForRegistry = [];
  if (meta.operation === 'materialize') {
    const { artifacts } = materialize([...argumentsBase, '--write'], root);
    materialize([...argumentsBase, '--check'], root);
    artifactsForRegistry = artifacts.lessonAssignments;
    for (const [relative, content] of artifacts.files) {
      const filename = path.join(artifacts.folder, relative);
      const local = relativeSafe(root, filename);
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
  } else {
    // Source and generated bytes must already exist in the committed PR head.
    const { artifacts } = materialize([...argumentsBase, '--check'], root);
    for (const [relative] of artifacts.files) {
      const local = relativeSafe(root, path.join(artifacts.folder, relative));
      if (!tracked.has(local)) throw Error('Finalize requires all generated files committed first');
    }
    for (const [filename] of artifacts.lessonFiles) {
      if (!tracked.has(relativeSafe(root, filename)))
        throw Error('Finalize requires committed standalone Lesson YAMLs');
    }
    materialize([...argumentsBase, '--finalize'], root);
    entries = [{ path: meta.identity.yaml, action: 'delete' }];
  }
  const manifest = {
    version: 1,
    repo: meta.repo,
    pr: meta.number,
    operation: meta.operation,
    head: meta.head,
    identity: meta.identity,
    sourceBlob: meta.sourceBlob,
    lessonAssignments: meta.operation === 'materialize' ? artifactsForRegistry : [],
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
    'Analyzed ' +
      meta.operation +
      ' at PR #' +
      meta.number +
      ' / ' +
      meta.head +
      ': ' +
      entries.length +
      ' allowlisted files; source blob ' +
      meta.sourceBlob,
  );
}

async function publish(root, meta) {
  await requireActor(meta.actor);
  const live = await inspect(meta.number, meta.head);
  if (!identicalSnapshot(live, meta)) throw Error('HEAD/source/Stage 4 completion changed since read-only generation');
  assertSource(root, meta);
  const manifest = readReport();
  const count = verifyManifest(manifest, meta, root);
  if (!count) {
    publishOutputs(meta.head, manifest);
    report('Course already materialized exactly; no commit needed for PR #' + meta.number);
    return;
  }
  const original = await github('git/commits/' + meta.head);
  if (!original?.tree?.sha) throw Error('Cannot resolve exact parent Git tree');
  const tree = await github('git/trees', 'POST', {
    base_tree: original.tree.sha,
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
  if (!/^[a-f0-9]{40}$/.test(tree?.sha ?? '')) throw Error('Git tree creation failed');
  const next = await github('git/commits', 'POST', {
    message:
      (meta.operation === 'materialize' ? 'Materialize' : 'Finalize') +
      ' Course ' +
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
  // A concurrent push makes this non-fast-forward; GitHub rejects the update.
  const beforeWrite = await github('pulls/' + meta.number);
  if (beforeWrite?.head?.sha !== meta.head || beforeWrite.head.ref !== meta.branch || beforeWrite.state !== 'open')
    throw Error('PR HEAD advanced before write; no branch ref updated');
  const freshReview = await inspect(meta.number, meta.head);
  if (!identicalSnapshot(freshReview, meta))
    throw Error('Course identity or Stage 4 completion changed before ref update');
  const updated = await github('git/refs/heads/' + meta.branch, 'PATCH', { sha: next.sha, force: false });
  if (updated?.object?.sha !== next.sha) throw Error('GitHub did not confirm the exact new branch ref');
  publishOutputs(next.sha, manifest);
  report(
    'Committed ' +
      count +
      ' verified Stage 5 ' +
      meta.operation +
      ' changes to PR #' +
      meta.number +
      ': ' +
      next.sha +
      ' (pinned source blob ' +
      meta.sourceBlob +
      ')',
  );
}

/** Use only the verified Stage 5 handoff; never reconstruct Course identities from TypeScript. */
async function registerLessons(meta) {
  if (meta.operation !== 'materialize') throw Error('Lesson registration requires materialize operation');
  const manifest = readReport();
  if (
    manifest.version !== 1 ||
    manifest.pr !== meta.number ||
    manifest.operation !== meta.operation ||
    manifest.head !== meta.head ||
    manifest.repo !== meta.repo ||
    manifest.sourceBlob !== meta.sourceBlob ||
    JSON.stringify(manifest.identity) !== JSON.stringify(meta.identity) ||
    !Array.isArray(manifest.entries)
  )
    throw Error('Lesson registration source differs from authorized materialization');
  const assignments = validateLessonAssignments(manifest, meta);
  if (!assignments.length || !manifest.entries.some(entry => assignments.some(lesson => lesson.path === entry.path)))
    throw Error('Lesson registration requires a verified newly generated Lesson YAML');
  const committedHead = process.env.COURSE_PUBLISHED_HEAD;
  if (!/^[a-f0-9]{40}$/.test(committedHead ?? '')) throw Error('Missing verified publication HEAD');
  if (committedHead !== meta.head) {
    const commit = await github('git/commits/' + committedHead);
    if (
      commit?.parents?.length !== 1 ||
      commit.parents[0].sha !== meta.head ||
      !commit.message?.startsWith('Materialize Course ' + meta.identity.id + '\n')
    )
      throw Error('Lesson registration requires the exact Stage 5 materialization commit');
  }
  const current = await github('pulls/' + meta.number);
  const matches = pr =>
    pr?.state === 'open' &&
    pr.draft &&
    pr.head?.sha === committedHead &&
    pr.head.ref === meta.branch &&
    pr.base?.ref === (process.env.COURSE_DEFAULT_BRANCH || 'main');
  if (!matches(current)) throw Error('Course PR changed after materialization');
  if (JSON.stringify(parseIdentity(current.body)) !== JSON.stringify(meta.identity))
    throw Error('Course PR identity changed after materialization');
  requireCompletedStageFour(current.body);
  const body = registerLessonRegistry(current.body, assignments);
  if (body === current.body) {
    report('Lesson IDs already registered for Course PR #' + meta.number);
    return;
  }
  // GitHub PR-body updates do not provide CAS. Check again immediately before PATCH.
  const beforeWrite = await github('pulls/' + meta.number);
  if (!matches(beforeWrite) || beforeWrite.body !== current.body)
    throw Error('Course PR changed while preparing Lesson registration');
  await github('pulls/' + meta.number, 'PATCH', { body });
  report('Registered ' + assignments.length + ' generated Lesson IDs in Course PR #' + meta.number);
}

async function main() {
  const mode = process.argv[2];
  if (!['analyze', 'publish', 'register'].includes(mode) || process.argv.length !== 3)
    throw Error('Usage: course-materialization.mjs analyze|publish|register');
  const meta = metadata();
  if (mode === 'register') await registerLessons(meta);
  else {
    const root = checkedRoot();
    if (mode === 'analyze') await analyze(root, meta);
    else await publish(root, meta);
  }
}

if (process.argv[1] && process.argv[1].endsWith('/course-materialization.mjs')) {
  main().catch(error => {
    report('Course Stage 5 rejected: ' + String(error.message ?? error));
    process.exitCode = 1;
  });
}

export { verifyManifest, metadata, trackedFiles, changedFiles, identicalSnapshot, validateLessonAssignments };
