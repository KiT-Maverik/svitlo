/**
 * Trusted, local-Git transaction for Lesson-owned assessment bank source.
 * Builds a complete commit in a separate index, then updates one branch ref
 * with an expected-HEAD lease. No per-file Git commits, shell interpolation,
 * worktree clobbering, Section edits, or Props publishing.
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, lstatSync, mkdtempSync, realpathSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import {
  assertBankPath, assertBankSha, assertBankUuid, assertReviewedBankInput,
  gitBlobSha, preflightBankSource,
  type BankReviewedSource, type BankSourceResult, type BankSourceSnapshot,
} from './bankSourceSafety';

export type BankGitKind = 'questions' | 'flashcards';
export type BankGitContext = {
  /** Clean local checkout of the exact child PR branch, never a shared worktree. */
  repositoryRoot: string;
  branch: string;
  expectedHeadSha: string;
  ownerLessonId: string;
  /** Repo-relative, canonical UUID Lesson directory; never supplied by a generated plan. */
  lessonDirectory: string;
};
export type BankGitReviewedEvidence = {
  reviewed: BankReviewedSource;
  /** Exact Stage 3 value evaluated by the trusted caller from the reviewed source revision. */
  evaluatedInput: unknown;
};
export type BankGitCheck = {
  noop: boolean;
  headSha: string;
  changedPaths: string[];
};
export type BankGitCommit = BankGitCheck & {
  commitSha: string;
  /** Git ref is authoritative; caller must refresh its clean checkout before reuse. */
  worktreeRefreshRequired: boolean;
};

function git(
  context: BankGitContext,
  args: string[],
  options: { input?: string; index?: string } = {},
): string {
  return execFileSync('git', ['-C', context.repositoryRoot, ...args], {
    encoding: 'utf8',
    input: options.input,
    maxBuffer: 64 * 1024 * 1024,
    env: options.index ? { ...process.env, GIT_INDEX_FILE: options.index } : process.env,
    stdio: ['pipe', 'pipe', 'pipe'],
  });
}

function assertContext(context: BankGitContext): void {
  assertBankUuid(context.ownerLessonId, 'Bank owning Lesson');
  assertBankSha(context.expectedHeadSha, 'expected branch HEAD');
  if (!/^[A-Za-z0-9][A-Za-z0-9/_-]*$/.test(context.branch) ||
      context.branch.includes('//') || context.branch.endsWith('/')) {
    throw new Error('Unsafe bank source branch');
  }
  assertBankPath(context.lessonDirectory);
  const match = /^content\/[a-z][a-z0-9-]*\/data\/lessons\/([a-f0-9])\/([a-f0-9-]{36})$/.exec(context.lessonDirectory);
  if (!match || match[2] !== context.ownerLessonId.toLowerCase() ||
      match[2][match[2].length - 1] !== match[1]) {
    throw new Error('Bank source must belong to the exact UUID-addressed Lesson root');
  }
  const root = path.resolve(context.repositoryRoot);
  if (realpathSync(root) !== root || !lstatSync(root).isDirectory() ||
      realpathSync(git(context, ['rev-parse', '--show-toplevel']).trim()) !== root) {
    throw new Error('Bank source requires the exact local repository root');
  }
  if (git(context, ['symbolic-ref', '--quiet', '--short', 'HEAD']).trim() !== context.branch ||
      git(context, ['rev-parse', 'HEAD']).trim() !== context.expectedHeadSha ||
      git(context, ['rev-parse', 'refs/heads/' + context.branch]).trim() !== context.expectedHeadSha) {
    throw new Error('Stale PR HEAD or incorrect checked-out branch');
  }
  if (git(context, ['status', '--porcelain=v1', '--untracked-files=all', '-z'])) {
    throw new Error('Dirty local Git checkout; refusing bank source transaction');
  }
  // Check every parent in the physical worktree, including the Lesson root.
  const segments = context.lessonDirectory.split('/');
  let current = root;
  for (const segment of segments) {
    current = path.join(current, segment);
    if (existsSync(current) && lstatSync(current).isSymbolicLink()) {
      throw new Error('Symlink in owning Lesson directory');
    }
  }
  const kind = git(context, ['cat-file', '-t', context.expectedHeadSha + ':' + context.lessonDirectory]).trim();
  if (kind !== 'tree') throw new Error('Owning Lesson Git tree does not exist');
}

function treeEntries(context: BankGitContext): BankSourceSnapshot['entries'] {
  const output = git(context, [
    'ls-tree', '-r', '-t', '-z', context.expectedHeadSha, '--', context.lessonDirectory,
  ]);
  const prefix = context.lessonDirectory + '/';
  const entries: Record<string, { kind: 'file' | 'symlink' | 'directory'; content?: string }> = {};
  const names = new Set<string>();
  for (const record of output.split('\0')) {
    if (!record) continue;
    const separator = record.indexOf('\t');
    if (separator < 0) throw new Error('Unparseable bank Git tree entry');
    const header = record.slice(0, separator).split(' ');
    const fullPath = record.slice(separator + 1);
    if (!fullPath.startsWith(prefix)) continue;
    const relative = fullPath.slice(prefix.length);
    assertBankPath(relative);
    const lower = relative.toLowerCase();
    if (names.has(lower)) throw new Error('Case-insensitive bank source path collision');
    names.add(lower);
    const mode = header[0];
    if (mode === '040000') entries[relative] = { kind: 'directory' };
    else if (mode === '120000') entries[relative] = { kind: 'symlink' };
    else if (mode === '100644' || mode === '100755') {
      entries[relative] = {
        kind: 'file',
        content: git(context, ['cat-file', 'blob', header[2]]),
      };
    } else throw new Error('Unsupported Git entry mode in bank-owned Lesson tree');
  }
  // Git may have a symlink or differently-cased component above the scoped tree.
  const pieces = context.lessonDirectory.split('/');
  for (let i = 1; i <= pieces.length; i++) {
    const ancestor = pieces.slice(0, i).join('/');
    const record = git(context, ['ls-tree', context.expectedHeadSha, '--', ancestor]).trim();
    if (!record.startsWith('040000 tree ') || !record.endsWith('\t' + ancestor)) {
      throw new Error('Non-directory or symlink Git ancestor: ' + ancestor);
    }
    const parent = pieces.slice(0, i - 1).join('/');
    const parentTree = context.expectedHeadSha + (parent ? ':' + parent : '');
    const siblings = git(context, ['ls-tree', '-z', parentTree]).split('\0');
    for (const sibling of siblings) {
      if (!sibling) continue;
      const name = sibling.slice(sibling.indexOf('\t') + 1);
      if (name.toLowerCase() === pieces[i - 1].toLowerCase() &&
          name !== pieces[i - 1]) {
        throw new Error('Case-insensitive Git Lesson path collision: ' + parent + '/' + name);
      }
    }
  }
  return entries;
}

/** Reload the actual complete Lesson-scoped Git tree; never trust caller snapshots. */
export function readBankGitSnapshot(context: BankGitContext): BankSourceSnapshot {
  assertContext(context);
  return {
    complete: true,
    expectedHeadSha: context.expectedHeadSha,
    observedHeadSha: context.expectedHeadSha,
    entries: treeEntries(context),
  };
}

function checkPhysicalPaths(context: BankGitContext, paths: readonly string[]): void {
  const root = path.resolve(context.repositoryRoot);
  for (const relative of paths) {
    assertBankPath(relative);
    let current = root;
    for (const part of (context.lessonDirectory + '/' + relative).split('/')) {
      current = path.join(current, part);
      if (!existsSync(current)) continue;
      if (lstatSync(current).isSymbolicLink()) {
        throw new Error('Symlink in bank source path: ' + relative);
      }
    }
  }
}

function checkOwnedPaths(kind: BankGitKind, plan: BankSourceResult): void {
  if (!Array.isArray(plan.files) || !plan.files.length || plan.publishable !== false) {
    throw new Error('Missing complete non-publishable bank source plan');
  }
  const names = new Set<string>();
  for (const file of plan.files) {
    assertBankPath(file.path);
    const lower = file.path.toLowerCase();
    if (names.has(lower)) throw new Error('Case-insensitive generated bank source collision');
    names.add(lower);
    if (!file.path.startsWith(kind + '/') &&
        file.path !== kind + 'Languages.ts' &&
        file.path !== kind + '.reviewed-stage3.ts.txt') {
      throw new Error('Plan attempts to modify non-bank-owned source: ' + file.path);
    }
  }
  const index = kind + '/index.ts';
  if (!names.has(index)) throw new Error('Missing bank index in source plan');
  if (plan.transition) {
    if (plan.transition.reviewedIndexPath !== index ||
        plan.transition.archivePath !== kind + '.reviewed-stage3.ts.txt' ||
        !names.has(kind + '.reviewed-stage3.ts.txt') ||
        !names.has(kind + 'Languages.ts') ||
        plan.files.filter(file => file.path.startsWith(kind + '/') && file.path !== index).length === 0) {
      throw new Error('Partial reviewed bank source transition');
    }
  } else if (plan.files.length !== 1 || plan.files[0].path !== index) {
    throw new Error('Draft Bank handoff must create only its index.ts');
  }
}

function assertNoExternalEntityCollisions(context: BankGitContext, plan: BankSourceResult): void {
  const ids = new Set<string>();
  const declaration = /["']?id["']?\s*:\s*["']([a-fA-F0-9]{8}-(?:[a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12})["']/g;
  for (const file of plan.files) {
    if (file.kind !== 'typescript') continue;
    for (const match of file.content.matchAll(declaration)) ids.add(match[1].toLowerCase());
  }
  if (!ids.size) return;
  let output = '';
  try {
    output = git(context, [
      'grep', '-n', '-I', '-E',
      '["\x27]?id["\x27]?[[:space:]]*:[[:space:]]*["\x27][a-fA-F0-9]{8}-',
      context.expectedHeadSha, '--', 'content',
    ]);
  } catch (error) {
    if ((error as { status?: number }).status !== 1) throw error;
  }
  for (const line of output.split('\n')) {
    const found = /^[a-fA-F0-9]{40}:([^:]+):\d+:(.*)$/.exec(line);
    if (!found || found[1].startsWith(context.lessonDirectory + '/' + (plan.transition?.reviewedIndexPath ?? ''))) continue;
    // Reviewed temporary index contains the same authored identities by design.
    const relative = found[1].startsWith(context.lessonDirectory + '/') ?
      found[1].slice(context.lessonDirectory.length + 1) : '';
    if (relative && plan.files.some(file => file.path === relative)) continue;
    for (const match of found[2].matchAll(declaration)) {
      if (ids.has(match[1].toLowerCase())) {
        throw new Error('Existing authored source owns duplicate immutable bank UUID ' + match[1]);
      }
    }
  }
}

function validateReview(
  context: BankGitContext,
  kind: BankGitKind,
  plan: BankSourceResult,
  evidence?: BankGitReviewedEvidence,
): void {
  if (!plan.transition) {
    if (evidence) throw new Error('Draft plan cannot consume reviewed final evidence');
    return;
  }
  if (!evidence) throw new Error('Independently reviewed source evidence is required');
  const { reviewed, evaluatedInput } = evidence;
  if (!reviewed || reviewed.approved !== true || !reviewed.reviewer?.trim()) {
    throw new Error('Independent Bank reviewer approval is required');
  }
  assertBankSha(reviewed.reviewCommitSha, 'bank review commit');
  assertBankSha(reviewed.reviewedSourceBlobSha, 'reviewed source blob');
  assertReviewedBankInput(evaluatedInput, reviewed);
  if (reviewed.blobSha !== reviewed.reviewedSourceBlobSha ||
      reviewed.blobSha !== plan.transition.reviewedIndexBlobSha ||
      gitBlobSha(reviewed.content) !== reviewed.blobSha ||
      plan.transition.expectedHeadSha !== context.expectedHeadSha) {
    throw new Error('Bank source transition does not match approved revision');
  }
  git(context, ['merge-base', '--is-ancestor', reviewed.reviewCommitSha, context.expectedHeadSha]);
  const sourcePath = context.lessonDirectory + '/' + kind + '/index.ts';
  const original = git(context, ['show', reviewed.reviewCommitSha + ':' + sourcePath]);
  if (original !== reviewed.content || gitBlobSha(original) !== reviewed.blobSha) {
    throw new Error('Review commit does not contain approved original Stage 3 bytes');
  }
}

export function checkBankGitPlan(
  kind: BankGitKind,
  context: BankGitContext,
  plan: BankSourceResult,
  evidence?: BankGitReviewedEvidence,
): BankGitCheck {
  const snapshot = readBankGitSnapshot(context);
  checkOwnedPaths(kind, plan);
  checkPhysicalPaths(context, plan.files.map(file => file.path));
  validateReview(context, kind, plan, evidence);
  const reviewed = evidence?.reviewed;
  preflightBankSource(plan.files, snapshot,
    reviewed && plan.transition ? {
      indexPath: plan.transition.reviewedIndexPath,
      archivePath: plan.transition.archivePath,
      reviewed,
    } : undefined);
  const current = snapshot.entries;
  const plannedNames = new Set(plan.files.map(file => file.path));
  const presentNames = new Map<string, string>();
  for (const name of Object.keys(current)) {
    presentNames.set(name.toLowerCase(), name);
    if (name.startsWith(kind + '/') && current[name].kind !== 'directory' &&
        !plannedNames.has(name)) {
      throw new Error('Unexpected bank-owned source outside complete reviewed plan: ' + name);
    }
  }
  for (const file of plan.files) {
    const conflicting = presentNames.get(file.path.toLowerCase());
    if (conflicting && conflicting !== file.path) {
      throw new Error('Case-variant existing bank path: ' + conflicting);
    }
  }
  if (plan.transition) assertNoExternalEntityCollisions(context, plan);
  const changedPaths = plan.files
    .filter(file => current[file.path]?.content !== file.content)
    .map(file => context.lessonDirectory + '/' + file.path);
  if (plan.transition) {
    const indexPath = plan.transition.reviewedIndexPath;
    const finalIndex = plan.files.find(file => file.path === indexPath)!;
    const finalIndexAlreadyPresent = current[indexPath]?.content === finalIndex.content;
    if (finalIndexAlreadyPresent) {
      // Identical reruns are safe only after every member, archive and language
      // module has landed. A lone replaced index is never a completed bank.
      if (changedPaths.length) throw new Error('Partially applied final bank transition');
    } else {
      // A reviewed transition can replace only the original staged index.
      // Pre-existing fragments cannot be silently adopted even if their bytes
      // happen to match a member generated by the reviewed plan.
      for (const file of plan.files) {
        if (file.path !== indexPath && current[file.path]) {
          throw new Error('Partial reviewed bank source already exists: ' + file.path);
        }
      }
    }
  }
  return { noop: changedPaths.length === 0, headSha: context.expectedHeadSha, changedPaths };
}

/**
 * One Git tree + commit, one compare-and-swap branch update. Existing checkout
 * is deliberately not reset/overwritten; caller refreshes it after a commit.
 */
export function commitBankGitPlan(
  kind: BankGitKind,
  context: BankGitContext,
  plan: BankSourceResult,
  evidence?: BankGitReviewedEvidence,
): BankGitCommit {
  const check = checkBankGitPlan(kind, context, plan, evidence);
  if (check.noop) return { ...check, commitSha: check.headSha, worktreeRefreshRequired: false };
  const directory = mkdtempSync(path.join(tmpdir(), 'svitlo-bank-git-'));
  const index = path.join(directory, 'index');
  try {
    git(context, ['read-tree', context.expectedHeadSha], { index });
    for (const file of plan.files) {
      const blob = git(context, ['hash-object', '-w', '--stdin'], { input: file.content }).trim();
      assertBankSha(blob, 'generated source blob');
      git(context, ['update-index', '--add', '--cacheinfo', '100644', blob,
        context.lessonDirectory + '/' + file.path], { index });
    }
    const tree = git(context, ['write-tree'], { index }).trim();
    assertBankSha(tree, 'planned atomic tree');
    const commit = git(context, [
      '-c', 'user.name=Svitlo Source Materializer',
      '-c', 'user.email=materializer@svitlo.invalid',
      'commit-tree', tree, '-p', context.expectedHeadSha,
      '-m', 'Commit reviewed ' + kind + ' bank source as one transaction',
    ]).trim();
    assertBankSha(commit, 'bank source commit');
    // Revalidate checkout and HEAD before the only ref mutation.
    assertContext(context);
    git(context, ['update-ref', 'refs/heads/' + context.branch, commit, context.expectedHeadSha]);
    return { ...check, commitSha: commit, worktreeRefreshRequired: true };
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}
