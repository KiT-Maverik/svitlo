import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { preflightCourseSourceCommit, commitCourseSourcePlan } from './sourceCommit.mjs';

const reviewed = "import type { CourseWorkflowMaterializerInput } from '@svitlo/engine/build';\n" +
  'export const course = {} satisfies CourseWorkflowMaterializerInput;\n';
const generated = "export const generatedCourse = { type: 'course' };\n";
const id = '663572e7-bd85-4516-86e2-3de07d209e03';
const sourcePath = 'content/playground/data/courses/3/' + id + '/index.ts';
const archivePath = 'content/playground/data/courses/3/' + id + '/workflow.stage3.ts';
const generatedPath = 'content/playground/data/courses/3/' + id + '/methodology.md';
const cmd = (root, ...args) => {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
  if (result.status !== 0) throw new Error(args.join(' ') + ': ' + result.stderr);
  return result.stdout.trim();
};

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-stage5-'));
  t.after(() => fs.rmSync(root, { force: true, recursive: true }));
  cmd(root, 'init', '-q');
  cmd(root, 'config', 'user.email', 'stage5@example.test');
  cmd(root, 'config', 'user.name', 'Course Stage5 Test');
  fs.mkdirSync(path.dirname(path.join(root, sourcePath)), { recursive: true });
  fs.writeFileSync(path.join(root, sourcePath), reviewed);
  cmd(root, 'add', sourcePath);
  cmd(root, 'commit', '-qm', 'Independent reviewed Stage3 input');
  const head = cmd(root, 'rev-parse', 'HEAD');
  const blob = cmd(root, 'rev-parse', 'HEAD:' + sourcePath);
  cmd(root, 'branch', 'agent/course-stage5-test');
  cmd(root, 'checkout', '-q', '--detach', head);
  const plan = {
    courseId: id, sourcePath, sourceArchivePath: archivePath,
    sourceBlobSha: blob, reviewCommitSha: head, publishable: false,
    files: [
      { path: sourcePath, kind: 'typescript', content: generated },
      { path: generatedPath, kind: 'markdown', content: '# Reviewed methodology\n' },
    ],
  };
  const options = { repoRoot: root, branch: 'agent/course-stage5-test' };
  return { root, plan, options, head };
}

test('read-only check does not change HEAD, refs, worktree or Git tree', t => {
  const { root, plan, options, head } = fixture(t);
  const beforeFiles = fs.readdirSync(path.dirname(path.join(root, sourcePath)));
  const status = commitCourseSourcePlan(plan, { ...options, mode: 'check' });
  assert.equal(status.mode, 'check');
  assert.deepEqual(status.pending.sort(), [archivePath, generatedPath, sourcePath].sort());
  assert.equal(cmd(root, 'rev-parse', 'HEAD'), head);
  assert.deepEqual(fs.readdirSync(path.dirname(path.join(root, sourcePath))), beforeFiles);
  assert.equal(fs.readFileSync(path.join(root, sourcePath), 'utf8'), reviewed);
  assert.equal(cmd(root, 'rev-parse', 'refs/heads/agent/course-stage5-test'), head);
});

test('one authorized Git commit archives exact source and changes the root atomically', t => {
  const { root, plan, options, head } = fixture(t);
  assert.throws(() => commitCourseSourcePlan(plan, { ...options, mode: 'write' }),
    /not explicitly authorized/);
  const result = commitCourseSourcePlan(plan,
    { ...options, mode: 'write', authorizeWrite: () => true });
  assert.equal(result.changed, 3);
  assert.notEqual(result.commitSha, head);
  assert.equal(cmd(root, 'rev-list', '--count', head + '..' + result.commitSha), '1');
  assert.equal(cmd(root, 'rev-parse', result.commitSha + '^'), head);
  assert.equal(cmd(root, 'rev-parse', 'refs/heads/agent/course-stage5-test'), result.commitSha);
  assert.equal(cmd(root, 'show', result.commitSha + ':' + archivePath), reviewed.trim());
  assert.equal(cmd(root, 'show', result.commitSha + ':' + sourcePath), generated.trim());
  assert.match(cmd(root, 'show', result.commitSha + ':' + generatedPath), /Reviewed methodology/);
  assert.equal(cmd(root, 'status', '--porcelain'), '');
  cmd(root, 'checkout', '-q', '--detach', result.commitSha);
  const rerun = commitCourseSourcePlan(plan, { ...options, mode: 'write' });
  assert.equal(rerun.already, true);
  assert.equal(rerun.changed, 0);
});

test('stale reviewed SHA and changed committed source fail before creation', t => {
  const { root, plan, options, head } = fixture(t);
  assert.throws(() => preflightCourseSourceCommit({ ...plan,
    sourceBlobSha: '0'.repeat(40) }, options), /SHA differs/);
  assert.throws(() => preflightCourseSourceCommit({ ...plan,
    reviewCommitSha: '0'.repeat(40) }, options), /review commit is stale/);
  assert.equal(cmd(root, 'rev-parse', 'HEAD'), head);
});

test('symlinks, duplicate paths, untracked files and incomplete materialization fail closed', t => {
  const { root, plan, options } = fixture(t);
  const same = { ...plan, files: [...plan.files, plan.files[0]] };
  assert.throws(() => preflightCourseSourceCommit(same, options), /Duplicate/);
  fs.writeFileSync(path.join(root, generatedPath), 'manual text');
  assert.throws(() => preflightCourseSourceCommit(plan, options), /Untracked local file collision|Locally modified/);
  fs.unlinkSync(path.join(root, generatedPath));
  const target = path.join(root, 'content/playground/data/courses/3/' + id, 'other');
  fs.symlinkSync(path.dirname(path.join(root, sourcePath)), target);
  const symlink = { ...plan, files: [...plan.files,
    { path: sourcePath.replace('index.ts', 'other/deeper.ts'), kind: 'typescript', content: 'export {};\n' }] };
  assert.throws(() => preflightCourseSourceCommit(symlink, options), /Symlink in generated path/);
});
