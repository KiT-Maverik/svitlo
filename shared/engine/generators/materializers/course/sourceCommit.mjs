import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import ts from 'typescript';
import { assertSafeDirectoryPath } from '../../safeGeneratedPath/assertSafeDirectoryPath.mjs';

const sha = /^[0-9a-f]{40}$/i;
const branchPattern = /^[a-z][a-z0-9/-]*$/;
const permitted = new Set(['typescript', 'markdown', 'specification', 'code']);
const valid = value => typeof value === 'string' && value.length > 0 &&
  !path.isAbsolute(value) && !value.includes('\\') &&
  !value.split('/').some(part => !part || part === '.' || part === '..' ||
    ['constructor', 'prototype', '__proto__'].includes(part));

function git(root, args, options = {}) {
  const result = spawnSync('git', args, {
    cwd: root, encoding: 'utf8', input: options.input,
    env: { ...process.env, ...(options.index ? { GIT_INDEX_FILE: options.index } : {}) },
    maxBuffer: 24 * 1024 * 1024,
  });
  if (result.error || result.status !== 0)
    throw new Error('git ' + args[0] + ' failed: ' +
      (result.stderr || result.error?.message || 'status ' + result.status));
  return result.stdout.trimEnd();
}
const blobAt = (root, rev, destination) => {
  const object = spawnSync('git', ['show', rev + ':' + destination], {
    cwd: root, encoding: 'utf8', maxBuffer: 24 * 1024 * 1024,
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
  if (fs.existsSync(absolute) && (!fs.lstatSync(absolute).isFile() ||
      fs.lstatSync(absolute).isSymbolicLink()))
    throw new Error('Generated target is not an ordinary file: ' + relative);
  return absolute;
};
const assertTypescript = file => {
  if (!file.path.endsWith('.ts') && !file.path.endsWith('.tsx')) return;
  const tree = ts.createSourceFile(file.path, file.content, ts.ScriptTarget.Latest, true,
    file.path.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  if (tree.parseDiagnostics.length)
    throw new Error('Generated TypeScript contains syntax errors in ' + file.path +
      ': ' + ts.flattenDiagnosticMessageText(tree.parseDiagnostics[0].messageText, '\n'));
};

/**
 * Read-only preflight for one reviewed Course Stage 5 manifest. No file writes,
 * Git-object creation or staging; entire file set and original source are checked
 * before an authorized write. All paths are relative to a verified repository.
 */
export function preflightCourseSourceCommit(plan, { repoRoot } = {}) {
  if (!valid(plan?.sourcePath) || !valid(plan?.sourceArchivePath) ||
      plan.sourcePath === plan.sourceArchivePath ||
      !sha.test(plan.sourceBlobSha ?? '') || !sha.test(plan.reviewCommitSha ?? '') ||
      !Array.isArray(plan.files) || !plan.files.length ||
      plan.publishable !== false)
    throw new Error('Invalid Course Stage 5 source-preserving manifest');
  const root = path.resolve(repoRoot ?? '');
  assertSafeDirectoryPath(root);
  if (!fs.existsSync(path.join(root, '.git')))
    throw new Error('Stage 5 writer requires a real Git checkout');
  const head = git(root, ['rev-parse', 'HEAD']);
  const all = new Map();
  for (const file of plan.files) {
    if (!permitted.has(file?.kind) || typeof file.content !== 'string' ||
        all.has(file.path) || file.path === plan.sourceArchivePath)
      throw new Error('Duplicate, invalid or colliding source target: ' + file?.path);
    assertSafeTarget(root, file.path);
    assertTypescript(file);
    all.set(file.path, file.content);
  }
  if (!all.has(plan.sourcePath))
    throw new Error('Course must replace the original root index.ts in the atomic commit');
  assertSafeTarget(root, plan.sourcePath);
  assertSafeTarget(root, plan.sourceArchivePath);
  const archive = blobAt(root, head, plan.sourceArchivePath);
  const source = archive ?? blobAt(root, head, plan.sourcePath);
  if (source === undefined)
    throw new Error('Reviewed Course TypeScript source has disappeared');
  const verifiedBlob = git(root, ['hash-object', '--stdin'], { input: source });
  if (verifiedBlob !== plan.sourceBlobSha)
    throw new Error('Course source blob SHA differs from the reviewed source');
  const already = archive !== undefined;
  if (!already && head !== plan.reviewCommitSha)
    throw new Error('Course review commit is stale; re-review current HEAD before Stage 5');
  if (already && blobAt(root, head, plan.sourcePath) !== all.get(plan.sourcePath))
    throw new Error('Materialized Course index.ts was edited or replaced since Stage 5');
  if (trackedMode(root, head, plan.sourceArchivePath) === '120000')
    throw new Error('Symlinked reviewed source archive');
  const files = new Map(all);
  files.set(plan.sourceArchivePath, source);
  const pending = [];
  for (const [file, contents] of files) {
    const existingMode = trackedMode(root, head, file);
    if (existingMode && existingMode !== '100644')
      throw new Error('Git target is a symlink/non-file: ' + file);
    const disk = path.resolve(root, file);
    if (fs.existsSync(disk) && !existingMode)
      throw new Error('Untracked local file collision: ' + file);
    const status = git(root, ['status', '--porcelain', '--', file]);
    if (status) throw new Error('Locally modified or untracked Course file: ' + file);
    const before = blobAt(root, head, file);
    if (before !== undefined && before !== contents && (file !== plan.sourcePath || already))
      throw new Error('Refusing divergent authored target: ' + file);
    if (before !== contents) pending.push(file);
  }
  if (already && pending.length)
    throw new Error('Incomplete previously committed Course source transition; refusing partial rerun');
  if (!already && !pending.includes(plan.sourcePath))
    throw new Error('Course Stage 3 input is already materialized without source archive');
  return { head, files, pending, already, archivePath: plan.sourceArchivePath };
}

/**
 * One authorized, source-SHA-pinned Git tree commit. The original reviewed
 * index.ts is copied byte-for-byte to workflow.stage3.ts in the SAME commit
 * that replaces index.ts. The worktree is never partially written.
 *
 * Requires an explicit checked-out branch ref already at HEAD, while the
 * checkout itself is DETACHED (CI convention); refuses writing the active
 * worktree's branch ref. Pushes, review approval and publication are separate.
 */
export function commitCourseSourcePlan(plan, options = {}) {
  const preview = preflightCourseSourceCommit(plan, options);
  if (options.mode === 'check')
    return { mode: 'check', head: preview.head, pending: preview.pending, already: preview.already };
  if (options.mode !== 'write')
    throw new Error('Specify mode check or explicit authorized write');
  if (preview.already)
    return { mode: 'write', head: preview.head, commitSha: preview.head, already: true, changed: 0 };
  if (typeof options.authorizeWrite !== 'function' ||
      options.authorizeWrite({ sourcePath: plan.sourcePath, reviewCommitSha: plan.reviewCommitSha,
        sourceBlobSha: plan.sourceBlobSha, head: preview.head }) !== true)
    throw new Error('Course Stage 5 Git commit was not explicitly authorized');
  const root = path.resolve(options.repoRoot ?? '');
  const branch = options.branch;
  if (typeof branch !== 'string' || !branchPattern.test(branch) ||
      branch.includes('//') || branch.endsWith('/') || branch.includes('/.') ||
      !branch.startsWith('agent/') && !branch.startsWith('course/'))
    throw new Error('Stage 5 requires a verified, explicit source branch');
  const attached = spawnSync('git', ['symbolic-ref', '--quiet', 'HEAD'],
    { cwd: root, encoding: 'utf8' });
  if (attached.status === 0) throw new Error('Refusing to advance the active checkout branch');
  const target = 'refs/heads/' + branch;
  const branchSha = git(root, ['rev-parse', target]);
  if (branchSha !== preview.head)
    throw new Error('Authorized source branch moved after review');
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-index-'));
  const index = path.join(directory, 'index');
  try {
    git(root, ['read-tree', preview.head], { index });
    for (const file of preview.pending.slice().sort()) {
      const blob = git(root, ['hash-object', '-w', '--stdin'],
        { input: preview.files.get(file) });
      git(root, ['update-index', '--add', '--cacheinfo', '100644,' + blob + ',' + file], { index });
    }
    const tree = git(root, ['write-tree'], { index });
    if (!sha.test(tree)) throw new Error('Invalid staged Course source Git tree');
    const message = 'Materialize reviewed Course source ' + plan.courseId;
    const commitSha = git(root, ['commit-tree', tree, '-p', preview.head, '-m', message]);
    git(root, ['update-ref', target, commitSha, preview.head]);
    return { mode: 'write', head: preview.head, commitSha, changed: preview.pending.length,
      archivePath: preview.archivePath, already: false };
  } finally {
    fs.rmSync(directory, { force: true, recursive: true });
  }
}
