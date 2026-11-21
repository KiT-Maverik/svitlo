import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  discoverCourseSource, parseTrigger, validateArtifactPath, gitBlob, safeBranch,
} from './course-gate.mjs';
import {
  verifyManifest, identicalSnapshot, validateLessonAssignments,
  renderLessonHandoff, publicationTreeEntries,
} from './course-materialization.mjs';

const id = '1e79d8fc-2223-4fa7-bc64-70d8172d3e8b';
const lesson = 'd3048d21-8690-5255-b62c-984c69ac272c';
const pkg = 'content/astronomy';
const yaml = pkg + '/data/courses/b/' + id + '/course.yaml';
const identity = { id, pkg, yaml };
const sha = 'a'.repeat(40), head = 'b'.repeat(40);
const blob = gitBlob('id: ' + id + '\n');
const assignment = {
  id: lesson, slug: 'dayNightBasics', title: 'День | ніч <safe>',
  path: pkg + '/data/lessons/' + lesson.at(-1) + '/' + lesson + '/lesson.yaml',
};

test('exactly one Course source comes from the pinned PR changed-file inventory, not PR body', () => {
  const changed = [{ filename: yaml, status: 'added' }];
  assert.deepEqual(discoverCourseSource(changed), identity);
  assert.deepEqual(discoverCourseSource([{ filename: yaml, status: 'modified' }]), identity);
  for (const files of [
    [], [{ filename: yaml, status: 'removed' }],
    [...changed, { filename: yaml, status: 'added' }],
    [...changed, { filename: pkg + '/data/courses/4/12345678-1234-4123-8123-123456789ab4/course.yaml', status: 'added' }],
    [{ filename: yaml.replace('/courses/b/', '/courses/a/'), status: 'added' }],
    [{ filename: pkg + '/data/courses/b/not-a-uuid/course.yaml', status: 'added' }],
  ]) assert.throws(() => discoverCourseSource(files));
  assert.throws(() => discoverCourseSource([{ filename: yaml, status: 'unknown' }]));
});

test('only the exact materialize PR comment or a PR-number dispatch is permitted', () => {
  const event = {
    issue: { number: 678, pull_request: {} },
    comment: { user: { login: 'owner' }, body: '/course materialize' },
  };
  assert.deepEqual(parseTrigger(event, 'issue_comment', 'owner'), {
    number: 678, operation: 'materialize', actor: 'owner',
  });
  for (const body of ['/course materialize\nhi', '/course finalize', ' /course materialize', '/course status'])
    assert.throws(() => parseTrigger({ ...event, comment: { ...event.comment, body } }, 'issue_comment', 'owner'));
  assert.throws(() => parseTrigger(event, 'issue_comment', 'stranger'));
  assert.throws(() => parseTrigger({ ...event, issue: { number: 678 } }, 'issue_comment', 'owner'));
  assert.deepEqual(parseTrigger({ inputs: { pr_number: '42' } }, 'workflow_dispatch', 'owner'), {
    number: 42, operation: 'materialize', actor: 'owner',
  });
  assert.throws(() => parseTrigger({ inputs: { pr_number: 'nope' } }, 'workflow_dispatch', 'owner'));
});

test('allowlist permits only generated files and exact deleted input', () => {
  const base = pkg + '/data/courses/b/' + id + '/';
  for (const file of [
    yaml, base + 'index.ts', base + 'constants.ts', base + 'review.ts', base + 'methodology.md',
    base + 'content/safeObservation/index.ts',
    base + 'content/skyCycles/dayAndNight/index.ts',
    base + 'content/skyCycles/dayAndNight/nightSkyEpisode/methodology.md',
    assignment.path,
  ]) assert.equal(validateArtifactPath(file, identity, 'materialize'), true, file);
  for (const file of [
    '.github/workflows/evil.yml', base + '../secrets',
    pkg + '/data/lessons/b/' + lesson + '/lesson.yaml',
    base + 'config.yaml', base + 'README.md', base + 'content/index.ts',
    base + 'content/sky_cycles/index.ts', base + 'content/skyCycles//index.ts',
    base + 'content/skyCycles/dayAndNight/nightSkyEpisode/deeper/index.ts',
  ]) assert.equal(validateArtifactPath(file, identity, 'materialize'), false, file);
  assert.equal(validateArtifactPath(yaml, identity, 'finalize'), false);
  assert.equal(safeBranch('course/my-draft', 'develop'), true);
  assert.equal(safeBranch('course/../develop', 'develop'), false);
});

test('authorization snapshot rejects source, branch and HEAD races', () => {
  const first = { head, branch: 'course/test', sourceBlob: blob, identity };
  assert.equal(identicalSnapshot(first, { ...first }), true);
  assert.equal(identicalSnapshot(first, { ...first, head: sha }), false);
  assert.equal(identicalSnapshot(first, { ...first, sourceBlob: sha }), false);
  assert.equal(identicalSnapshot(first, { ...first, branch: 'develop' }), false);
});

test('one bounded manifest combines verified source creation and exact YAML deletion', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-stage5-'));
  try {
    execFileSync('git', ['init', '-q', root]);
    const source = path.join(root, yaml);
    fs.mkdirSync(path.dirname(source), { recursive: true });
    fs.writeFileSync(source, 'id: ' + id + '\n');
    execFileSync('git', ['add', '--', yaml], { cwd: root });
    const meta = { number: 678, repo: 'KiT-Maverik/svitlo', operation: 'materialize',
      head, identity, sourceBlob: blob };
    const filename = pkg + '/data/courses/b/' + id + '/index.ts';
    const bytes = Buffer.from('export const course = true;\n');
    const create = { path: filename, action: 'create', data: bytes.toString('base64'),
      sha256: createHash('sha256').update(bytes).digest('hex') };
    const deletion = { path: yaml, action: 'delete' };
    const manifest = { version: 1, pr: meta.number, repo: meta.repo, operation: 'materialize',
      head, identity, sourceBlob: blob, lessonAssignments: [], entries: [create, deletion] };
    assert.equal(verifyManifest(manifest, meta, root), 2);
    const tree = publicationTreeEntries(manifest.entries);
    assert.equal(tree.length, 2);
    assert.deepEqual(tree[1], { path: yaml, mode: '100644', type: 'blob', sha: null });
    assert.equal(tree[0].content, bytes.toString('utf8'));
    const rejects = [
      { ...manifest, entries: [create] },
      { ...manifest, entries: [deletion] },
      { ...manifest, entries: [create, deletion, deletion] },
      { ...manifest, entries: [{ ...create, sha256: 'e'.repeat(64) }, deletion] },
      { ...manifest, entries: [{ ...create, path: '.github/workflows/evil.yml' }, deletion] },
      { ...manifest, entries: [create, { path: assignment.path, action: 'delete' }] },
      { ...manifest, head: sha },
      { ...manifest, sourceBlob: sha },
    ];
    for (const invalid of rejects) assert.throws(() => verifyManifest(invalid, meta, root));
    fs.writeFileSync(path.join(root, filename), bytes);
    execFileSync('git', ['add', '--', filename], { cwd: root });
    assert.throws(() => verifyManifest(manifest, meta, root), /create a new allowlisted/);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});

test('Lesson assignment must match an actual new YAML and is shown in SHA-pinned summary', () => {
  const manifest = {
    pr: 678, repo: 'KiT-Maverik/svitlo', identity,
    head, sourceBlob: blob,
    entries: [{ action: 'create', path: assignment.path }],
    lessonAssignments: [assignment],
  };
  const meta = { identity, operation: 'materialize' };
  assert.deepEqual(validateLessonAssignments(manifest, meta), [assignment]);
  assert.throws(() => validateLessonAssignments({ ...manifest, entries: [] }, meta));
  assert.throws(() => validateLessonAssignments({ ...manifest, lessonAssignments: [] }, meta));
  assert.throws(() => validateLessonAssignments({ ...manifest, lessonAssignments: [assignment, assignment] }, meta));
  assert.throws(() => validateLessonAssignments({ ...manifest, lessonAssignments: [{ ...assignment, title: 'bad\nline' }] }, meta));
  const handoff = renderLessonHandoff(manifest, sha);
  assert(handoff.includes('День &#124; ніч &lt;safe&gt;'));
  assert(handoff.includes(assignment.id));
  assert(handoff.includes(assignment.slug));
  assert(handoff.includes(assignment.path));
  assert(handoff.includes(blob));
  assert(handoff.includes(head));
  assert(handoff.includes(sha));
  assert(handoff.includes('No Lesson PRs') === false);
});

test('the trusted workflow runs one write, one publish and no finalize or PR-body registration', () => {
  const workflowPath = fileURLToPath(new URL('../../../.github/workflows/course-materialization.yml', import.meta.url));
  const workflowText = fs.readFileSync(workflowPath, 'utf8');
  const workflow = YAML.parse(workflowText);
  assert.deepEqual(workflow.permissions, {});
  assert.equal(workflow.jobs.analyze.permissions.contents, 'read');
  assert.equal(workflow.jobs.publish.permissions.contents, 'write');
  assert.equal(workflow.jobs.publish.permissions['pull-requests'], 'read');
  assert.equal(workflow.jobs['register-lessons'], undefined);
  assert(!workflowText.includes('/course finalize'));
  assert(!workflowText.includes('--check'));
  assert(!workflowText.includes('register-lessons:'));
  const orchestrator = fs.readFileSync(fileURLToPath(new URL('./course-materialization.mjs', import.meta.url)), 'utf8');
  const gate = fs.readFileSync(fileURLToPath(new URL('./course-gate.mjs', import.meta.url)), 'utf8');
  assert.equal((orchestrator.match(/materialize\(\[/g) ?? []).length, 1);
  assert(!orchestrator.includes("'--check'"));
  assert(!gate.includes('parseIdentity('));
  assert(!gate.includes('requireCompletedStageFour('));
  assert(!orchestrator.includes('registerLessonRegistry('));
  assert(!orchestrator.includes("github('pulls/' + meta.number, 'PATCH'"));
});
