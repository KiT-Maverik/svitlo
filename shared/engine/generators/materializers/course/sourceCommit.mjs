import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import ts from 'typescript';
import { assertSafeDirectoryPath } from '../../safeGeneratedPath/assertSafeDirectoryPath.mjs';

const sha = /^[0-9a-f]{40}$/i;
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const branchPattern = /^[A-Za-z0-9][A-Za-z0-9._/-]*$/;
const permitted = new Set(['typescript', 'markdown', 'specification', 'code']);
const valid = value =>
  typeof value === 'string' &&
  value.length > 0 &&
  !path.isAbsolute(value) &&
  !value.includes('\\') &&
  !value
    .split('/')
    .some(part => !part || part === '.' || part === '..' || ['constructor', 'prototype', '__proto__'].includes(part));

function git(root, args, options = {}) {
  const result = spawnSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    input: options.input,
    env: { ...process.env, ...(options.index ? { GIT_INDEX_FILE: options.index } : {}) },
    maxBuffer: 24 * 1024 * 1024,
  });
  if (result.error || result.status !== 0)
    throw new Error(
      'git ' + args[0] + ' failed: ' + (result.stderr || result.error?.message || 'status ' + result.status),
    );
  return result.stdout.trimEnd();
}
const blobAt = (root, rev, destination) => {
  const object = spawnSync('git', ['show', rev + ':' + destination], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 24 * 1024 * 1024,
  });
  if (object.error) throw object.error;
  if (object.status !== 0) {
    if (/does not exist in|exists on disk, but not in|Path .* does not exist/.test(object.stderr ?? ''))
      return undefined;
    throw new Error('Cannot read Git source ' + destination + ': ' + object.stderr);
  }
  return object.stdout;
};
const trackedMode = (root, rev, destination) => {
  const output = git(root, ['ls-tree', rev, '--', destination]);
  if (!output) return undefined;
  const line = output.split('\n').find(entry => entry.endsWith('\t' + destination));
  return line?.split(' ')[0];
};
const assertSafeTarget = (root, relative) => {
  if (!valid(relative)) throw new Error('Unsafe generated source path: ' + relative);
  const absolute = path.resolve(root, relative);
  if (!absolute.startsWith(root + path.sep)) throw new Error('Path escape: ' + relative);
  assertSafeDirectoryPath(path.dirname(absolute));
  try {
    const stat = fs.lstatSync(absolute);
    if (!stat.isFile() || stat.isSymbolicLink())
      throw new Error('Generated target is not an ordinary file: ' + relative);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  return absolute;
};
const assertTypescript = file => {
  if (!file.path.endsWith('.ts') && !file.path.endsWith('.tsx')) return;
  const tree = ts.createSourceFile(
    file.path,
    file.content,
    ts.ScriptTarget.Latest,
    true,
    file.path.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  if (tree.parseDiagnostics.length)
    throw new Error(
      'Generated TypeScript contains syntax errors in ' +
        file.path +
        ': ' +
        ts.flattenDiagnosticMessageText(tree.parseDiagnostics[0].messageText, '\n'),
    );
};

/**
 * Read-only preflight for one reviewed Course Stage 5 manifest. No file writes,
 * Git-object creation or staging; entire file set and original source are checked
 * before an authorized write. All paths are relative to a verified repository.
 */
export function preflightCourseSourceCommit(plan, { repoRoot } = {}) {
  if (
    !valid(plan?.sourcePath) ||
    !valid(plan?.materializedPath) ||
    plan.sourcePath === plan.materializedPath ||
    !sha.test(plan.sourceBlobSha ?? '') ||
    !sha.test(plan.reviewCommitSha ?? '') ||
    !Array.isArray(plan.files) ||
    !plan.files.length ||
    plan.publishable !== false
  )
    throw new Error('Invalid Course Stage 5 source-preserving manifest');
  const courseMatch = plan.sourcePath.match(
    /^content\/([a-z][a-z0-9-]*)\/data\/courses\/([0-9a-f])\/([0-9a-f-]{36})\/draft\.ts$/,
  );
  if (
    !courseMatch ||
    !sha.test(plan.sourceBlobSha) ||
    courseMatch[3] !== plan.courseId ||
    courseMatch[2] !== plan.courseId.at(-1).toLowerCase() ||
    plan.materializedPath !== path.posix.dirname(plan.sourcePath) + '/index.ts'
  )
    throw new Error('Stage 5 draft/output are not the same canonical Course UUID root');
  const book = courseMatch[1];
  const lessonFile = new RegExp('^content/' + book + '/data/lessons/([0-9a-f])/([0-9a-f-]{36})/draft\\.ts$');
  const rootPrefix = path.posix.dirname(plan.sourcePath) + '/';
  const permittedPath = file =>
    file.startsWith(rootPrefix) ||
    (() => {
      const match = file.match(lessonFile);
      return !!match && match[2].at(-1).toLowerCase() === match[1];
    })();
  // An untrusted artifact cannot add an orphan stub under the otherwise
  // course-owned root. The emitted inventory is the sole reviewed placement
  // map; its exact one-to-one pending stub paths must match the sealed files.
  if (
    !plan.inventory ||
    !['lessons', 'episodes', 'assessments'].every(key => Array.isArray(plan.inventory[key])) ||
    Object.keys(plan.inventory).some(key => !['lessons', 'episodes', 'assessments'].includes(key))
  ) throw new Error('Course Stage 5 requires an exact ordered placement inventory');
  const pendingStubs = new Map();
  const seenPlacements = new Set();
  for (const type of ['lessons', 'episodes', 'assessments']) {
    for (const row of plan.inventory[type]) {
      if (
        !row || typeof row !== 'object' ||
        !uuid.test(row.id ?? '') ||
        typeof row.status !== 'string' ||
        !valid(row.placementPath) ||
        !row.placementPath.startsWith(rootPrefix) ||
        seenPlacements.has(row.placementPath) ||
        typeof row.placementSourcePath !== 'string' ||
        !row.placementSourcePath.startsWith(rootPrefix) ||
        !row.placementSourcePath.endsWith('/index.ts')
      ) throw new Error('Unsafe or duplicate Course placement inventory row');
      seenPlacements.add(row.placementPath);
      if (row.status.startsWith('pending')) {
        const stub = row.placementPath + '/stub.ts';
        if (row.stubSourcePath !== stub || pendingStubs.has(stub))
          throw new Error('Course pending placement has missing/duplicate owned stub');
        pendingStubs.set(stub, row);
      } else if (row.stubSourcePath !== undefined) {
        throw new Error('Completed Course placement cannot declare a draft stub');
      }
    }
  }
  const actualStubs = plan.files.filter(file => file?.path?.endsWith('/stub.ts'));
  if (
    actualStubs.length !== pendingStubs.size ||
    actualStubs.some(file => !pendingStubs.has(file.path)) ||
    [...pendingStubs.values()].some(row =>
      !plan.files.some(file => file.path === row.placementSourcePath && file.kind === 'typescript'))
  ) throw new Error('Course Stage 5 manifest contains missing, unexpected or foreign stub.ts');

  const root = path.resolve(repoRoot ?? '');
  assertSafeDirectoryPath(root);
  if (git(root, ['rev-parse', '--show-toplevel']) !== root)
    throw new Error('Stage 5 writer requires the exact Git checkout root');
  const head = git(root, ['rev-parse', 'HEAD']);
  const all = new Map();
  for (const file of plan.files) {
    if (
      !permitted.has(file?.kind) ||
      typeof file.content !== 'string' ||
      all.has(file.path) ||
      file.path === plan.sourcePath
    )
      throw new Error('Duplicate, invalid or colliding source target: ' + file?.path);
    if (!permittedPath(file.path))
      throw new Error('Generated source is outside Course or UUID-owned Lesson root: ' + file.path);
    assertSafeTarget(root, file.path);
    if (file.path.endsWith('/draft.ts')) {
      const sibling = path.posix.join(path.posix.dirname(file.path), 'index.ts');
      const absolute = assertSafeTarget(root, sibling);
      if (trackedMode(root, head, sibling) || fs.existsSync(absolute))
        throw new Error('New Lesson draft conflicts with an existing materialized Lesson: ' + sibling);
    }
    assertTypescript(file);
    all.set(file.path, file.content);
  }
  if (!all.has(plan.materializedPath))
    throw new Error('Course must create the canonical root index.ts in the atomic commit');
  assertSafeTarget(root, plan.sourcePath);
  const source = blobAt(root, head, plan.sourcePath);
  if (source === undefined || trackedMode(root, head, plan.sourcePath) !== '100644')
    throw new Error('Reviewed Course draft has disappeared or is not an ordinary file');
  if (git(root, ['hash-object', '--stdin'], { input: source }) !== plan.sourceBlobSha)
    throw new Error('Course source blob SHA differs from the reviewed source');
  if (head !== plan.reviewCommitSha)
    throw new Error('Course review commit is stale; re-review current HEAD before Stage 5');
  if (git(root, ['status', '--porcelain', '--', plan.sourcePath])) throw new Error('Locally modified Course draft');
  const files = all;
  const pending = [];
  for (const [file] of files) {
    const parts = file.split('/');
    for (let depth = 1; depth < parts.length; depth++) {
      const ancestor = parts.slice(0, depth).join('/');
      const mode = trackedMode(root, head, ancestor);
      if (mode === '120000' || (mode && mode !== '040000'))
        throw new Error('Git-tracked symlink/non-directory ancestor: ' + ancestor);
    }
    const existingMode = trackedMode(root, head, file);
    if (existingMode && existingMode !== '100644') throw new Error('Git target is a symlink/non-file: ' + file);
    const disk = path.resolve(root, file);
    if (fs.existsSync(disk) && !existingMode) throw new Error('Untracked local file collision: ' + file);
    const status = git(root, ['status', '--porcelain', '--', file]);
    if (status) throw new Error('Locally modified or untracked Course file: ' + file);
    const before = blobAt(root, head, file);
    if (before !== undefined) throw new Error('Refusing divergent authored target: ' + file);
    pending.push(file);
  }
  pending.push(plan.sourcePath);
  return { head, files, pending, already: false };
}

/**
 * One authorized, source-SHA-pinned Git tree commit. The original reviewed
 * draft.ts is deleted in the SAME commit that creates index.ts. Reviewed
 * bytes remain at the pinned parent commit and blob. The worktree is never partially written.
 *
 * Requires an explicit checked-out branch ref already at HEAD, while the
 * checkout itself is DETACHED (CI convention); refuses writing the active
 * worktree's branch ref. Pushes, review approval and publication are separate.
 */
export function commitCourseSourcePlan(plan, options = {}) {
  const preview = preflightCourseSourceCommit(plan, options);
  if (options.mode === 'check')
    return { mode: 'check', head: preview.head, pending: preview.pending, already: preview.already };
  if (options.mode !== 'write') throw new Error('Specify mode check or explicit authorized write');
  if (preview.already) return { mode: 'write', head: preview.head, commitSha: preview.head, already: true, changed: 0 };
  if (
    typeof options.authorizeWrite !== 'function' ||
    options.authorizeWrite({
      sourcePath: plan.sourcePath,
      reviewCommitSha: plan.reviewCommitSha,
      sourceBlobSha: plan.sourceBlobSha,
      head: preview.head,
    }) !== true
  )
    throw new Error('Course Stage 5 Git commit was not explicitly authorized');
  const root = path.resolve(options.repoRoot ?? '');
  const branch = options.branch;
  if (typeof branch !== 'string' || !branchPattern.test(branch))
    throw new Error('Stage 5 requires a verified, explicit source branch');
  git(root, ['check-ref-format', '--branch', branch]);
  const attached = spawnSync('git', ['symbolic-ref', '--quiet', 'HEAD'], { cwd: root, encoding: 'utf8' });
  if (attached.status === 0) throw new Error('Refusing to advance the active checkout branch');
  const target = 'refs/heads/' + branch;
  const branchSha = git(root, ['rev-parse', target]);
  if (branchSha !== preview.head) throw new Error('Authorized source branch moved after review');
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-index-'));
  const index = path.join(directory, 'index');
  try {
    git(root, ['read-tree', preview.head], { index });
    for (const file of preview.pending.slice().sort()) {
      if (file === plan.sourcePath) {
        git(root, ['update-index', '--force-remove', '--', file], { index });
        continue;
      }
      const blob = git(root, ['hash-object', '-w', '--stdin'], { input: preview.files.get(file) });
      git(root, ['update-index', '--add', '--cacheinfo', '100644,' + blob + ',' + file], { index });
    }
    const tree = git(root, ['write-tree'], { index });
    if (!sha.test(tree)) throw new Error('Invalid staged Course source Git tree');
    const message =
      'Materialize reviewed Course source ' +
      plan.courseId +
      '\n\nSource-Blob: ' +
      plan.sourceBlobSha +
      '\nReview-Commit: ' +
      plan.reviewCommitSha;
    const commitSha = git(root, ['commit-tree', tree, '-p', preview.head, '-m', message]);
    git(root, ['update-ref', target, commitSha, preview.head]);
    return {
      mode: 'write',
      head: preview.head,
      commitSha,
      changed: preview.pending.length,
      already: false,
    };
  } finally {
    fs.rmSync(directory, { force: true, recursive: true });
  }
}
