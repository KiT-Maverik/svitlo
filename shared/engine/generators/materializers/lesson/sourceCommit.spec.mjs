import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { commitLessonStage6Plan, preflightLessonStage6Commit } from './sourceCommit.mjs';

const id = '12345678-1234-4234-8234-123456789001';
const folder = 'content/math/data/lessons/1/' + id;
const sourcePath = folder + '/index.ts';
const archivePath = folder + '/workflow.stage2.ts';
const editorSource = 'export const editor = { stage: 2 };\n';
const generatedSource = 'export const completed = { stage: 6 };\n';
function git(root, ...args) {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
  if (result.status !== 0) throw new Error('git ' + args.join(' ') + ': ' + result.stderr);
  return result.stdout.trim();
}
function setup(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lesson-stage6-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  git(root, 'init', '-b', 'source');
  git(root, 'config', 'user.name', 'Stage6 Test');
  git(root, 'config', 'user.email', 'stage6-test@example.test');
  fs.mkdirSync(path.join(root, folder), { recursive: true });
  fs.writeFileSync(path.join(root, sourcePath), editorSource);
  git(root, 'add', '.');
  git(root, 'commit', '-m', 'Reviewed Lesson Stage 2');
  const reviewed = git(root, 'rev-parse', 'HEAD');
  const sourceBlobSha = git(root, 'rev-parse', 'HEAD:' + sourcePath);
  const plan = {
    lessonId: id,
    sourcePath,
    archivePath,
    sourceBlobSha,
    reviewCommitSha: reviewed,
    reviewEvidenceSha: '2'.repeat(40),
    publishable: false,
    files: [
      { path: folder + '/languages.ts', content: 'export const languages = ["en"] as const;\n', kind: 'typescript' },
      { path: sourcePath, content: generatedSource, kind: 'typescript' },
      { path: folder + '/sections/intro/index.ts', content: 'export const intro = true;\n', kind: 'typescript' },
    ],
  };
  return { root, reviewed, plan };
}
test('check is read-only; write atomically archives exact Stage 2 source under an optimistic HEAD lease', t => {
  const { root, reviewed, plan } = setup(t);
  const before = preflightLessonStage6Commit(plan, { repoRoot: root });
  assert.equal(before.head, reviewed);
  assert.equal(before.already, false);
  assert.deepEqual(
    before.pending.slice().sort(),
    [archivePath, folder + '/languages.ts', sourcePath, folder + '/sections/intro/index.ts'].sort(),
  );
  const checked = commitLessonStage6Plan(plan, { repoRoot: root, mode: 'check' });
  assert.equal(checked.already, false);
  assert.equal(git(root, 'rev-parse', 'HEAD'), reviewed);
  git(root, 'checkout', '--detach');
  assert.throws(
    () => commitLessonStage6Plan(plan, { repoRoot: root, mode: 'write', branch: 'source' }),
    /authorization/,
  );
  const result = commitLessonStage6Plan(plan, {
    repoRoot: root,
    mode: 'write',
    branch: 'source',
    authorizeWrite: () => true,
  });
  assert.equal(result.already, false);
  assert.equal(result.changed, 4);
  assert.equal(git(root, 'rev-parse', 'HEAD'), reviewed, 'worktree is never partially rewritten');
  assert.equal(git(root, 'rev-parse', 'source'), result.commitSha);
  assert.equal(git(root, 'show', 'source:' + archivePath), editorSource.trim());
  assert.equal(git(root, 'show', 'source:' + sourcePath), generatedSource.trim());
  assert.equal(git(root, 'show', 'source:' + folder + '/sections/intro/index.ts'), 'export const intro = true;');
  assert.equal(git(root, 'rev-list', '--count', 'source'), '2', 'single new atomic commit');
  git(root, 'checkout', '--detach', 'source');
  const repeated = commitLessonStage6Plan(plan, { repoRoot: root, mode: 'write' });
  assert.equal(repeated.already, true);
  assert.equal(repeated.changed, 0);
});
test('refuses stale review, modified source and untrusted output paths', t => {
  const { root, plan } = setup(t);
  assert.throws(
    () => preflightLessonStage6Commit({ ...plan, reviewCommitSha: 'a'.repeat(40) }, { repoRoot: root }),
    /stale/,
  );
  assert.throws(
    () => preflightLessonStage6Commit({ ...plan, reviewEvidenceSha: 'invalid' }, { repoRoot: root }),
    /Invalid reviewed/,
  );
  assert.throws(
    () => preflightLessonStage6Commit({ ...plan, sourceBlobSha: 'a'.repeat(40) }, { repoRoot: root }),
    /blob differs/,
  );
  for (const pathName of [
    '../other/index.ts',
    '/tmp/index.ts',
    folder + '/sub/../outside.ts',
    'content/math/data/lessons/0/' + id + '/outside.ts',
  ]) {
    assert.throws(
      () =>
        preflightLessonStage6Commit(
          { ...plan, files: [...plan.files, { path: pathName, content: 'export {};', kind: 'typescript' }] },
          { repoRoot: root },
        ),
      /out-of-scope|Invalid|Unsafe/,
    );
  }
  assert.throws(
    () => preflightLessonStage6Commit({ ...plan, files: [...plan.files, plan.files[0]] }, { repoRoot: root }),
    /duplicate/,
  );
});
test('refuses dirty, untracked and human-edited targets before any commit', t => {
  const { root, plan, reviewed } = setup(t);
  fs.writeFileSync(path.join(root, sourcePath), 'locally edited\n');
  assert.throws(() => preflightLessonStage6Commit(plan, { repoRoot: root }), /dirty/);
  assert.equal(git(root, 'rev-parse', 'HEAD'), reviewed);
  git(root, 'checkout', '--', sourcePath);
  fs.writeFileSync(path.join(root, folder, 'languages.ts'), 'mine\n');
  assert.throws(() => preflightLessonStage6Commit(plan, { repoRoot: root }), /Untracked/);
  fs.rmSync(path.join(root, folder, 'languages.ts'));
  fs.writeFileSync(path.join(root, folder, 'specification.md'), 'human notes\n');
  assert.throws(
    () =>
      preflightLessonStage6Commit(
        {
          ...plan,
          files: [...plan.files, { path: folder + '/specification.md', kind: 'specification', content: 'rewritten' }],
        },
        { repoRoot: root },
      ),
    /Untracked/,
  );
});
test('refuses ancestor symlinks and already archived divergent output', t => {
  const { root, plan } = setup(t);
  fs.symlinkSync(os.tmpdir(), path.join(root, folder, 'sections'));
  assert.throws(() => preflightLessonStage6Commit(plan, { repoRoot: root }), /symlink/i);
  fs.rmSync(path.join(root, folder, 'sections'));
  git(root, 'checkout', '--detach');
  commitLessonStage6Plan(plan, { repoRoot: root, mode: 'write', branch: 'source', authorizeWrite: () => true });
  git(root, 'checkout', '--detach', 'source');
  const corrupted = {
    ...plan,
    files: plan.files.map(f => (f.path === sourcePath ? { ...f, content: 'export const changed = 1;\n' } : f)),
  };
  assert.throws(
    () => preflightLessonStage6Commit(corrupted, { repoRoot: root }),
    /changed since the reviewed transition/,
  );
});
test('refuses invalid generated TypeScript and any attempt to publish from this writer', t => {
  const { root, plan } = setup(t);
  assert.throws(
    () => preflightLessonStage6Commit({ ...plan, publishable: true }, { repoRoot: root }),
    /Invalid reviewed/,
  );
  assert.throws(
    () =>
      preflightLessonStage6Commit(
        { ...plan, files: plan.files.map(f => (f.path === sourcePath ? { ...f, content: 'export const = ;' } : f)) },
        { repoRoot: root },
      ),
    /Invalid generated TypeScript/,
  );
});
