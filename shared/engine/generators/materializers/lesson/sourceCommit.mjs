/**
 * Lesson-only, SHA-pinned Stage 6 source transition. The reviewed editable
 * workflow.stage2.ts is archived byte-for-byte in the same UUID directory in
 * the same Git tree commit that replaces index.ts. No working-tree files are
 * rewritten. This is not a generic source-materializer framework.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import ts from 'typescript';
import { assertSafeDirectoryPath } from '../../safeGeneratedPath/assertSafeDirectoryPath.mjs';

const shaPattern = /^[0-9a-f]{40}$/i;
const uuidPattern = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const kinds = new Set(['typescript', 'markdown', 'specification', 'code']);
const validPath = value => typeof value === 'string' && value.length > 0 &&
  !path.isAbsolute(value) && !value.includes('\\') &&
  value.split('/').every(part => !!part && part !== '.' && part !== '..' &&
    part !== 'constructor' && part !== 'prototype' && part !== '__proto__');

function git(root, args, options = {}) {
  const run = spawnSync('git', args, {
    cwd: root, encoding: 'utf8', input: options.input,
    env: { ...process.env, ...(options.index ? { GIT_INDEX_FILE: options.index } : {}) },
    maxBuffer: 24 * 1024 * 1024,
  });
  if (run.error || run.status !== 0)
    throw new Error('git ' + args[0] + ' failed: ' + (run.stderr || run.error?.message || run.status));
  return run.stdout.trimEnd();
}

function fileAt(root, revision, filename) {
  const run = spawnSync('git', ['show', revision + ':' + filename], {
    cwd: root, encoding: 'utf8', maxBuffer: 24 * 1024 * 1024,
  });
  if (run.error) throw run.error;
  if (run.status === 0) return run.stdout;
  if (/does not exist in|exists on disk, but not in|Path .* does not exist/.test(run.stderr ?? ''))
    return undefined;
  throw new Error('Cannot inspect Git source ' + filename + ': ' + run.stderr);
}
function treeMode(root, head, filename) {
  const lines = git(root, ['ls-tree', head, '--', filename]).split('\n');
  return lines.find(line => line.endsWith('\t' + filename))?.split(' ')[0];
}
function safeTarget(root, filename) {
  if (!validPath(filename)) throw new Error('Unsafe Lesson Stage 6 destination: ' + filename);
  const absolute = path.resolve(root, filename);
  if (!absolute.startsWith(root + path.sep)) throw new Error('Lesson path escaped repository');
  assertSafeDirectoryPath(path.dirname(absolute));
  try {
    const stat = fs.lstatSync(absolute);
    if (!stat.isFile() || stat.isSymbolicLink())
      throw new Error('Lesson destination is a symlink/non-file: ' + filename);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}
function validTypescript(file) {
  if (!/\.tsx?$/.test(file.path)) return;
  const source = ts.createSourceFile(file.path, file.content, ts.ScriptTarget.Latest, true,
    file.path.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  if (source.parseDiagnostics.length)
    throw new Error('Invalid generated TypeScript ' + file.path + ': ' +
      ts.flattenDiagnosticMessageText(source.parseDiagnostics[0].messageText, '\n'));
}

/**
 * Checks every output and its ancestors before creating any Git object.
 * Existing files may only be byte-identical, except for the reviewed index.ts
 * replaced in the first authorized source transition.
 */
export function preflightLessonStage6Commit(plan, { repoRoot } = {}) {
  const match = plan?.sourcePath?.match(
    /^content\/([a-z][a-z0-9-]*)\/data\/lessons\/([0-9a-f])\/([0-9a-f-]{36})\/index\.ts$/,
  );
  if (!match || !uuidPattern.test(match[3]) ||
      match[2] !== match[3].at(-1).toLowerCase() ||
      match[3] !== plan.lessonId ||
      plan.archivePath !== path.posix.dirname(plan.sourcePath) + '/workflow.stage2.ts' ||
      !shaPattern.test(plan.sourceBlobSha ?? '') ||
      !shaPattern.test(plan.reviewCommitSha ?? '') ||
      !shaPattern.test(plan.reviewEvidenceSha ?? '') ||
      !Array.isArray(plan.files) || !plan.files.length ||
      plan.publishable !== false) {
    throw new Error('Invalid reviewed Lesson Stage 6 manifest or canonical UUID path');
  }
  const root = path.resolve(repoRoot ?? '');
  assertSafeDirectoryPath(root);
  if (git(root, ['rev-parse', '--show-toplevel']) !== root)
    throw new Error('Lesson Stage 6 requires the exact Git checkout root');
  const head = git(root, ['rev-parse', 'HEAD']);
  const ownPrefix = path.posix.dirname(plan.sourcePath) + '/';
  const output = new Map();
  for (const file of plan.files) {
    if (!file || !kinds.has(file.kind) || typeof file.content !== 'string' ||
        !validPath(file.path) || !file.path.startsWith(ownPrefix) ||
        file.path === plan.archivePath || output.has(file.path))
      throw new Error('Invalid, duplicate or out-of-scope Lesson source: ' + file?.path);
    safeTarget(root, file.path);
    validTypescript(file);
    output.set(file.path, file.content);
  }
  if (!output.has(plan.sourcePath))
    throw new Error('Stage 6 must replace the reviewed Lesson root index.ts');
  safeTarget(root, plan.archivePath);
  const archived = fileAt(root, head, plan.archivePath);
  const before = archived ?? fileAt(root, head, plan.sourcePath);
  if (before === undefined)
    throw new Error('Reviewed Lesson Stage 2 source is missing');
  if (git(root, ['hash-object', '--stdin'], { input: before }) !== plan.sourceBlobSha)
    throw new Error('Lesson Stage 2 source blob differs from independently reviewed SHA');
  if (archived === undefined && head !== plan.reviewCommitSha)
    throw new Error('Lesson review commit is stale; verify current Stage 2 source and reviews again');
  if (archived !== undefined && fileAt(root, head, plan.sourcePath) !== output.get(plan.sourcePath))
    throw new Error('Materialized Lesson index.ts changed since the reviewed transition');
  output.set(plan.archivePath, before);
  const pending = [];
  for (const [filename, contents] of output) {
    const parts = filename.split('/');
    for (let i = 1; i < parts.length; i++) {
      const ancestor = parts.slice(0, i).join('/');
      const mode = treeMode(root, head, ancestor);
      if (mode === '120000' || mode && mode !== '040000')
        throw new Error('Git symlink or non-directory ancestor: ' + ancestor);
    }
    const mode = treeMode(root, head, filename);
    if (mode && mode !== '100644')
      throw new Error('Git symlink or non-regular file: ' + filename);
    if (fs.existsSync(path.resolve(root, filename)) && !mode)
      throw new Error('Untracked local Lesson source collision: ' + filename);
    if (git(root, ['status', '--porcelain', '--', filename]))
      throw new Error('Locally dirty Lesson source: ' + filename);
    const prior = fileAt(root, head, filename);
    if (prior !== undefined && prior !== contents &&
        (filename !== plan.sourcePath || archived !== undefined))
      throw new Error('Refusing to clobber existing authored Lesson source: ' + filename);
    if (prior !== contents) pending.push(filename);
  }
  if (archived !== undefined && pending.length)
    throw new Error('Previously materialized Lesson tree is incomplete or divergent');
  if (archived === undefined && !pending.includes(plan.sourcePath))
    throw new Error('Missing Stage 2 to final index transition');
  return { head, output, pending, already: archived !== undefined,
    archivePath: plan.archivePath };
}

/**
 * Write one Git tree commit only after caller authorization and HEAD lease.
 * The caller must verify reviewer identity, review SHA, PR ownership, Stage 6
 * approval and branch permissions independently at its trusted boundary.
 * This function never publishes Props, pushes or changes the worktree.
 */
export function commitLessonStage6Plan(plan, options = {}) {
  const preflight = preflightLessonStage6Commit(plan, options);
  if (options.mode === 'check')
    return { mode: 'check', head: preflight.head, pending: preflight.pending,
      already: preflight.already, archivePath: preflight.archivePath };
  if (options.mode !== 'write')
    throw new Error('Explicit mode check or write is required');
  if (preflight.already)
    return { mode: 'write', head: preflight.head, commitSha: preflight.head,
      already: true, changed: 0 };
  if (typeof options.authorizeWrite !== 'function' ||
      options.authorizeWrite({ lessonId: plan.lessonId, sourcePath: plan.sourcePath,
        sourceBlobSha: plan.sourceBlobSha, reviewCommitSha: plan.reviewCommitSha,
        reviewEvidenceSha: plan.reviewEvidenceSha, head: preflight.head }) !== true)
    throw new Error('Trusted Lesson Stage 6 authorization was not verified');
  const branch = options.branch;
  if (typeof branch !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(branch))
    throw new Error('Lesson Stage 6 requires a verified source branch');
  const root = path.resolve(options.repoRoot ?? '');
  git(root, ['check-ref-format', '--branch', branch]);
  const active = spawnSync('git', ['symbolic-ref', '--quiet', 'HEAD'], {
    cwd: root, encoding: 'utf8',
  });
  if (active.status === 0)
    throw new Error('Refusing to advance the active worktree branch');
  const target = 'refs/heads/' + branch;
  if (git(root, ['rev-parse', target]) !== preflight.head)
    throw new Error('Lesson Stage 6 branch advanced beyond verified HEAD');
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lesson-stage6-'));
  try {
    const index = path.join(temporary, 'index');
    git(root, ['read-tree', preflight.head], { index });
    for (const filename of preflight.pending.slice().sort()) {
      const blob = git(root, ['hash-object', '-w', '--stdin'], {
        input: preflight.output.get(filename),
      });
      git(root, ['update-index', '--add', '--cacheinfo',
        '100644,' + blob + ',' + filename], { index });
    }
    const tree = git(root, ['write-tree'], { index });
    if (!shaPattern.test(tree)) throw new Error('Invalid Lesson source Git tree SHA');
    const commitSha = git(root, ['commit-tree', tree, '-p', preflight.head,
      '-m', 'Materialize reviewed Lesson source ' + plan.lessonId]);
    git(root, ['update-ref', target, commitSha, preflight.head]);
    return { mode: 'write', head: preflight.head, commitSha,
      changed: preflight.pending.length, already: false,
      archivePath: preflight.archivePath };
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
}
