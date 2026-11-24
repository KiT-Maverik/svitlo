import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import {
  readBankGitSnapshot,
  checkBankGitPlan,
  commitBankGitPlan,
  type BankGitContext,
  type BankGitKind,
} from './bankSourceGitTransaction';
import { authoredBankLiteral, gitBlobSha, type BankSourceResult } from './bankSourceSafety';

const ownerLessonId = 'e89a723d-8e17-428a-abd3-55f1bcdefab0';
const entityId = 'f89a723d-8e17-428a-abd3-55f1bcdefab1';
const lessonDirectory = 'content/math/data/lessons/0/' + ownerLessonId;
const rootFile = 'lesson.ts';

function git(root: string, ...args: string[]): string {
  return execFileSync('git', ['-C', root, ...args], { encoding: 'utf8' }).trim();
}
function setup(kind: BankGitKind): { root: string; context: BankGitContext } {
  const root = mkdtempSync(path.join(tmpdir(), 'svitlo-bank-transaction-spec-'));
  git(root, 'init', '-q', '-b', 'bank-test');
  git(root, 'config', 'user.name', 'Svitlo Test');
  git(root, 'config', 'user.email', 'test@example.invalid');
  const lesson = path.join(root, lessonDirectory);
  mkdirSync(lesson, { recursive: true });
  writeFileSync(path.join(lesson, rootFile), 'export const lesson = true;\n');
  git(root, 'add', '.');
  git(root, 'commit', '-qm', 'Lesson source');
  return {
    root,
    context: {
      repositoryRoot: root,
      branch: 'bank-test',
      expectedHeadSha: git(root, 'rev-parse', 'HEAD'),
      ownerLessonId,
      lessonDirectory,
    },
  };
}
function file(name: string, content: string, kind: 'typescript' = 'typescript') {
  return { path: name, content, kind } as const;
}
function draft(kind: BankGitKind, content = '// Stage 1 authored bank\n'): BankSourceResult {
  return { files: [file(kind + '/draft.ts', content)], diagnostics: [], publishable: false };
}
function stage3(kind: BankGitKind, original: string) {
  const created = setup(kind);
  const initial = commitBankGitPlan(kind, created.context, draft(kind, original));
  assert.equal(initial.worktreeRefreshRequired, true);
  // Commit advances the branch atomically without touching or resetting a caller worktree.
  assert.equal(
    readFileSync(path.join(created.root, lessonDirectory, rootFile), 'utf8'),
    'export const lesson = true;\n',
  );
  git(created.root, 'reset', '--hard', initial.commitSha);
  return {
    ...created,
    context: {
      ...created.context,
      expectedHeadSha: initial.commitSha,
    },
  };
}
function reviewed(kind: BankGitKind, original: string, context: BankGitContext) {
  const input = { config: { bank: kind }, production: { source: 'independently reviewed' } };
  return {
    reviewed: {
      approved: true as const,
      content: original,
      blobSha: gitBlobSha(original),
      reviewedSourceBlobSha: gitBlobSha(original),
      reviewCommitSha: context.expectedHeadSha,
      reviewedInputSha256: createHash('sha256').update(authoredBankLiteral(input)).digest('hex'),
    },
    evaluatedInput: input,
  };
}
function final(kind: BankGitKind, original: string, context: BankGitContext): BankSourceResult {
  const member = kind === 'questions' ? kind + '/selectOneAnswer/answer.ts' : kind + '/firstCard.ts';
  const barrel =
    kind === 'questions' ? [file(kind + '/selectOneAnswer/index.ts', 'export { answer } from "./answer";\n')] : [];
  return {
    files: [
      file(kind + '/index.ts', 'export const ' + kind + ' = { first: true };\n'),
      file(member, 'export const answer = { id: "' + entityId + '" };\n'),
      ...barrel,
      file(kind + 'Languages.ts', 'export const languages = ["uk"] as const;\n'),
    ],
    diagnostics: [],
    publishable: false,
    transition: {
      expectedHeadSha: context.expectedHeadSha,
      reviewedDraftPath: kind + '/draft.ts',
      reviewedDraftBlobSha: gitBlobSha(original),
      materializedPath: kind + '/index.ts',
    },
  };
}

for (const kind of ['questions', 'flashcards'] as const) {
  test(kind + ': Stage 1 check/create, reviewed atomic creation and consumed draft', () => {
    const initial = setup(kind);
    try {
      const first = draft(kind);
      assert.equal(checkBankGitPlan(kind, initial.context, first).noop, false);
      const draftWrite = commitBankGitPlan(kind, initial.context, first);
      assert.equal(git(initial.root, 'rev-list', '--count', 'HEAD'), '2');
      assert.equal(
        git(initial.root, 'show', 'HEAD:' + lessonDirectory + '/' + kind + '/draft.ts'),
        first.files[0].content.trim(),
      );
      git(initial.root, 'reset', '--hard', draftWrite.commitSha);
      const current = { ...initial.context, expectedHeadSha: draftWrite.commitSha };
      assert.equal(checkBankGitPlan(kind, current, first).noop, true);
      assert.equal(commitBankGitPlan(kind, current, first).commitSha, draftWrite.commitSha);

      const stage = reviewed(kind, first.files[0].content, current);
      const plan = final(kind, first.files[0].content, current);
      const checked = checkBankGitPlan(kind, current, plan, stage);
      assert.equal(checked.noop, false);
      const committed = commitBankGitPlan(kind, current, plan, stage);
      assert.equal(checked.changedPaths.length, plan.files.length + 1);
      assert.equal(git(initial.root, 'rev-list', '--count', 'HEAD'), '3');
      const tree = git(initial.root, 'diff-tree', '--no-commit-id', '--name-only', '-r', 'HEAD').split('\n').sort();
      assert.deepEqual(
        tree,
        [...plan.files.map(f => lessonDirectory + '/' + f.path), lessonDirectory + '/' + kind + '/draft.ts'].sort(),
      );
      assert.equal(
        git(initial.root, 'show', draftWrite.commitSha + ':' + lessonDirectory + '/' + kind + '/draft.ts'),
        first.files[0].content.trim(),
      );
      git(initial.root, 'reset', '--hard', committed.commitSha);
      const latest = { ...current, expectedHeadSha: committed.commitSha };
      assert.deepEqual(
        readBankGitSnapshot(latest).entries[kind + '/index.ts']?.content,
        plan.files.find(f => f.path === kind + '/index.ts')?.content,
      );
      assert.equal(readBankGitSnapshot(latest).entries[kind + '/draft.ts'], undefined);
      assert.throws(() => commitBankGitPlan(kind, latest, plan, stage), /approved revision/);
    } finally {
      rmSync(initial.root, { recursive: true, force: true });
    }
  });

  test(kind + ': stale review revision, evaluated digest and branch lease fail closed', () => {
    const original = '// Reviewed Stage 3\n';
    const { root, context } = stage3(kind, original);
    try {
      const plan = final(kind, original, context);
      const evidence = reviewed(kind, original, context);
      assert.throws(
        () =>
          checkBankGitPlan(kind, context, plan, {
            ...evidence,
            evaluatedInput: { bad: 'not reviewed' },
          }),
        /Structured bank input differs/,
      );
      assert.throws(
        () =>
          checkBankGitPlan(kind, context, plan, {
            ...evidence,
            reviewed: { ...evidence.reviewed, reviewedSourceBlobSha: '0'.repeat(40) },
          }),
        /approved revision|independently approved/,
      );
      assert.throws(
        () =>
          checkBankGitPlan(
            kind,
            {
              ...context,
              expectedHeadSha: '1'.repeat(40),
            },
            plan,
            evidence,
          ),
        /Stale PR HEAD/,
      );
      writeFileSync(path.join(root, 'unexpected-untracked'), 'not safe');
      assert.throws(() => commitBankGitPlan(kind, context, plan, evidence), /Dirty local Git/);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test(kind + ': extra files, invalid paths, path/case collision and partial migrations fail closed', () => {
    const original = '// Reviewed Stage 3\n';
    const { root, context } = stage3(kind, original);
    try {
      const evidence = reviewed(kind, original, context);
      const plan = final(kind, original, context);
      assert.throws(
        () =>
          checkBankGitPlan(
            kind,
            context,
            {
              ...plan,
              files: [...plan.files, file('../escape.ts', 'unsafe')],
            },
            evidence,
          ),
        /Unsafe bank source path/,
      );
      assert.throws(
        () =>
          checkBankGitPlan(
            kind,
            context,
            {
              ...plan,
              files: plan.files.filter(f => f.path !== kind + '/index.ts'),
            },
            evidence,
          ),
        /Partial reviewed bank source transition/,
      );

      const extra = path.join(root, lessonDirectory, kind, 'unexpected.ts');
      writeFileSync(extra, '// not in approved bank\n');
      git(root, 'add', '.');
      git(root, 'commit', '-qm', 'Existing authored member');
      git(root, 'reset', '--hard');
      const next = { ...context, expectedHeadSha: git(root, 'rev-parse', 'HEAD') };
      assert.throws(
        () =>
          checkBankGitPlan(
            kind,
            next,
            {
              ...plan,
              transition: { ...plan.transition!, expectedHeadSha: next.expectedHeadSha },
            },
            reviewed(kind, original, next),
          ),
        /Unexpected bank-owned source/,
      );
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test(kind + ': refuse existing identical fragments of an uncommitted final bank', () => {
    const original = '// Reviewed Stage 3\n';
    const { root, context } = stage3(kind, original);
    try {
      const partial = final(kind, original, context);
      const fragment = partial.files.find(
        f => f.path !== kind + '/index.ts' && f.path.startsWith(kind + '/') && f.kind === 'typescript',
      )!;
      const target = path.join(root, lessonDirectory, fragment.path);
      mkdirSync(path.dirname(target), { recursive: true });
      writeFileSync(target, fragment.content);
      git(root, 'add', '.');
      git(root, 'commit', '-qm', 'Partially authored output fragment');
      git(root, 'reset', '--hard');
      const current = { ...context, expectedHeadSha: git(root, 'rev-parse', 'HEAD') };
      const plan = final(kind, original, current);
      assert.throws(
        () => checkBankGitPlan(kind, current, plan, reviewed(kind, original, current)),
        /Partial reviewed bank source already exists/,
      );
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
}

test('Symlink ancestry, case aliases and ownership path are not authorized', () => {
  const { root, context } = setup('questions');
  try {
    const outside = mkdtempSync(path.join(tmpdir(), 'svitlo-bank-outside-'));
    const link = path.join(root, lessonDirectory, 'questions');
    symlinkSync(outside, link, 'dir');
    git(root, 'add', '.');
    git(root, 'commit', '-qm', 'Suspicious symlink');
    git(root, 'reset', '--hard');
    const latest = { ...context, expectedHeadSha: git(root, 'rev-parse', 'HEAD') };
    assert.throws(() => checkBankGitPlan('questions', latest, draft('questions')), /Symlink|symlink/);
    assert.throws(
      () =>
        readBankGitSnapshot({
          ...latest,
          ownerLessonId: 'e89a723d-8e17-428a-abd3-55f1bcdefab1',
        }),
      /exact UUID-addressed Lesson root/,
    );
    rmSync(outside, { recursive: true, force: true });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('Existing global UUID declaration collision is rejected before the commit', () => {
  const original = '// Reviewed Stage 3\n';
  const { root, context } = stage3('questions', original);
  try {
    const another = path.join(root, 'content/math/data/lessons/1', entityId);
    mkdirSync(another, { recursive: true });
    writeFileSync(path.join(another, 'other.ts'), 'export const other = { id: "' + entityId + '" };\n');
    git(root, 'add', '.');
    git(root, 'commit', '-qm', 'Other authored entity');
    git(root, 'reset', '--hard');
    const latest = { ...context, expectedHeadSha: git(root, 'rev-parse', 'HEAD') };
    assert.throws(
      () =>
        checkBankGitPlan(
          'questions',
          latest,
          final('questions', original, latest),
          reviewed('questions', original, latest),
        ),
      /duplicate immutable bank UUID/,
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
