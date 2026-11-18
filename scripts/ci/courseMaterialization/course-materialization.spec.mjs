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
  parseIdentity,
  parseTrigger,
  requireCompletedStageFour,
  validateArtifactPath,
  gitBlob,
  safeBranch,
} from './course-gate.mjs';
import { verifyManifest, identicalSnapshot } from './course-materialization.mjs';

const id = '1e79d8fc-2223-4fa7-bc64-70d8172d3e8b';
const lesson = 'd3048d21-8690-5255-b62c-984c69ac272c';
const pkg = 'content/astronomy';
const yaml = pkg + '/data/courses/b/' + id + '/course.yaml';
const identity = { id, pkg, yaml };
const sha = 'a'.repeat(40);
const head = 'b'.repeat(40);
const blob = gitBlob('id: ' + id + '\n');
const courseWorkflow = (s1 = 'x', s2 = 'x', s3 = 'x', s4 = 'x') =>
  [
    '<!-- svitlo-course-flow:v1 -->',
    '## Course identity',
    '- Course UUID: ' + id,
    '- Textbook: ' + pkg,
    '- Single temporary source plan: ' + yaml,
    '## Workflow',
    '- [' + s1 + '] 1. Create Course Methodology — approved scope',
    '- [' + s2 + '] 2. Design Course Structure',
    '- [' + s3 + '] 3. Design & Match Lessons',
    '  - [x] Module skyCycles',
    '- [' + s4 + '] 4. Review Course Plan — separate-chat review completed',
    '- [ ] 5. Materialize Course',
    '## Handoffs / blockers',
    '- Stage 4 findings resolved in the PR; no separate account required',
  ].join('\n');

test('exact marker, UUID, package and canonical Course YAML are mandatory', () => {
  const body =
    '<!-- svitlo-course-flow:v1 -->\n' +
    '- Course UUID: ' +
    String.fromCharCode(96) +
    id +
    String.fromCharCode(96) +
    '\n' +
    '- Textbook: ' +
    String.fromCharCode(96) +
    pkg +
    String.fromCharCode(96) +
    '\n' +
    '- Single temporary source plan: ' +
    String.fromCharCode(96) +
    yaml +
    String.fromCharCode(96);
  assert.deepEqual(parseIdentity(body), identity);
  assert.throws(() => parseIdentity(body + '\n<!-- svitlo-course-flow:v1 -->'));
  assert.throws(() => parseIdentity(body.replace('/courses/b/', '/courses/a/')));
  assert.throws(() => parseIdentity(body.replace(id, 'malformed')));
});

test('only exact top-level same-actor PR comments or enumerated dispatch can authorize', () => {
  const event = {
    issue: { number: 678, pull_request: {} },
    comment: { user: { login: 'owner' }, body: '/course materialize' },
  };
  assert.deepEqual(parseTrigger(event, 'issue_comment', 'owner'), {
    number: 678,
    operation: 'materialize',
    actor: 'owner',
  });
  for (const body of ['/course materialize\nhi', '/course finalize extra', ' /course materialize', '/course status']) {
    assert.throws(() => parseTrigger({ ...event, comment: { ...event.comment, body } }, 'issue_comment', 'owner'));
  }
  assert.throws(() => parseTrigger(event, 'issue_comment', 'stranger'));
  assert.throws(() => parseTrigger({ ...event, issue: { number: 678 } }, 'issue_comment', 'owner'));
  assert.deepEqual(parseTrigger({ inputs: { pr_number: '42', operation: 'finalize' } }, 'workflow_dispatch', 'owner'), {
    number: 42,
    operation: 'finalize',
    actor: 'owner',
  });
  assert.throws(() => parseTrigger({ inputs: { pr_number: '42', operation: 'rm -rf' } }, 'workflow_dispatch', 'owner'));
});

test('Stage 4 authorizes same-account separate-chat review using the parent Course PR checklist', () => {
  assert.equal(requireCompletedStageFour(courseWorkflow()), true);
  // The reviewing agent may commit through the Course PR author's own account.
  // No GitHub reviews, review-specific comments, approval roles or blob signatures are needed.
  assert.equal(requireCompletedStageFour(courseWorkflow().replace('separate-chat review completed', 'review completed')), true);
});

test('Stage 4 checklist fails closed on incomplete, absent, duplicate or ambiguous stages', () => {
  for (const body of [
    courseWorkflow(' ', 'x', 'x', 'x'),
    courseWorkflow('x', ' ', 'x', 'x'),
    courseWorkflow('x', 'x', ' ', 'x'),
    courseWorkflow('x', 'x', 'x', ' '),
    courseWorkflow().replace('## Workflow', '## Progress'),
    courseWorkflow() + '\n## Workflow',
    courseWorkflow().replace('- [x] 4. Review Course Plan', '- [x] 4. Review Course Planner'),
    courseWorkflow().replace('- [x] 3. Design & Match Lessons', '- [x] 3. Review Course Plan'),
    courseWorkflow().replace('## Handoffs / blockers', '- [ ] 4. Review Course Plan\n## Handoffs / blockers'),
    courseWorkflow().replace('## Handoffs / blockers', '- [x] 4. Review Course Plan\n## Handoffs / blockers'),
  ]) assert.throws(() => requireCompletedStageFour(body));
  // A lookalike checklist outside the canonical Workflow section is not a gate.
  assert.throws(() => requireCompletedStageFour('## Notes\n- [x] 4. Review Course Plan\n## Workflow\n'));
  assert.equal(requireCompletedStageFour(courseWorkflow() + '\n## Notes\n- [ ] 4. Review Course Plan'), true);
});

test('allowlist blocks arbitrary files, traversal and incorrect UUID buckets', () => {
  for (const filename of [
    pkg + '/data/courses/b/' + id + '/index.ts',
    pkg + '/data/courses/b/' + id + '/episodes/example.ts',
    pkg + '/data/lessons/c/' + lesson + '/lesson.yaml',
  ])
    assert.equal(validateArtifactPath(filename, identity, 'materialize'), true);
  for (const filename of [
    '.github/workflows/evil.yml',
    pkg + '/data/courses/b/' + id + '/../secrets',
    pkg + '/data/lessons/b/' + lesson + '/lesson.yaml',
    pkg + '/data/courses/b/' + id + '/config.yaml',
    pkg + '/data/courses/b/' + id + '/README.md',
    pkg + '/data/courses/b/' + id + '/episodes/../../evil.ts',
  ])
    assert.equal(validateArtifactPath(filename, identity, 'materialize'), false);
  assert.equal(validateArtifactPath(yaml, identity, 'finalize'), true);
  assert.equal(validateArtifactPath(yaml, identity, 'materialize'), false);
  assert.equal(validateArtifactPath('.github/workflows/evil.yml', identity, 'finalize'), false);
  assert.equal(safeBranch('course/my-draft', 'main'), true);
  assert.equal(safeBranch('main', 'main'), false);
  assert.equal(safeBranch('course/../main', 'main'), false);
});

test('publish fails closed on mismatched HEAD/source/branch', () => {
  const a = { head, branch: 'course/test', sourceBlob: blob, identity };
  assert.equal(identicalSnapshot(a, { ...a }), true);
  assert.equal(identicalSnapshot(a, { ...a, head: sha }), false);
  assert.equal(identicalSnapshot(a, { ...a, sourceBlob: sha }), false);
  assert.equal(identicalSnapshot(a, { ...a, branch: 'main' }), false);
});

test('artifact verification enforces exact path/hash, create-only and one-file finalize', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-stage5-'));
  try {
    execFileSync('git', ['init', '-q', root]);
    const source = path.join(root, yaml);
    fs.mkdirSync(path.dirname(source), { recursive: true });
    fs.writeFileSync(source, 'id: ' + id + '\n');
    execFileSync('git', ['add', '--', yaml], { cwd: root });
    const meta = {
      number: 678,
      repo: 'KiT-Maverik/svitlo',
      operation: 'materialize',
      head,
      identity,
      sourceBlob: blob,
    };
    const output = pkg + '/data/courses/b/' + id + '/index.ts';
    const bytes = Buffer.from('export const course = true;\n');
    const validEntry = {
      path: output,
      action: 'create',
      data: bytes.toString('base64'),
      sha256: createHash('sha256').update(bytes).digest('hex'),
    };
    const manifest = {
      version: 1,
      pr: meta.number,
      repo: meta.repo,
      operation: meta.operation,
      head,
      identity,
      sourceBlob: blob,
      entries: [validEntry],
    };
    assert.equal(verifyManifest(manifest, meta, root), 1);
    assert.throws(() =>
      verifyManifest({ ...manifest, entries: [{ ...validEntry, sha256: 'e'.repeat(64) }] }, meta, root),
    );
    assert.throws(() =>
      verifyManifest({ ...manifest, entries: [{ ...validEntry, path: '.github/workflows/evil.yml' }] }, meta, root),
    );
    assert.throws(() => verifyManifest({ ...manifest, entries: [validEntry, validEntry] }, meta, root));
    assert.throws(() => verifyManifest({ ...manifest, head: sha }, meta, root));
    fs.mkdirSync(path.dirname(path.join(root, output)), { recursive: true });
    fs.writeFileSync(path.join(root, output), bytes);
    execFileSync('git', ['add', '--', output], { cwd: root });
    assert.throws(() => verifyManifest(manifest, meta, root), 'Cannot overwrite committed files');
    const finalizeMeta = { ...meta, operation: 'finalize' };
    const finalized = { ...manifest, operation: 'finalize', entries: [{ path: yaml, action: 'delete' }] };
    assert.equal(verifyManifest(finalized, finalizeMeta, root), 1);
    assert.throws(() => verifyManifest({ ...finalized, entries: [] }, finalizeMeta, root));
    assert.throws(() =>
      verifyManifest(
        { ...finalized, entries: [{ path: yaml, action: 'create', data: validEntry.data }] },
        finalizeMeta,
        root,
      ),
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('Stage 5 workflow refreshes the managed Lessons block using isolated GitHub permissions', () => {
  const workflowPath = fileURLToPath(new URL('../../../.github/workflows/course-materialization.yml', import.meta.url));
  const workflow = YAML.parse(fs.readFileSync(workflowPath, 'utf8'));
  assert.deepEqual(workflow.permissions, {});
  assert.equal(workflow.jobs.analyze.permissions['contents'], 'read');
  assert.match(workflow.jobs.resolve.steps.find(s => s.id === 'gate').name, /Stage 4 checklist/);
  assert.equal(workflow.jobs.publish.permissions['contents'], 'write');
  assert.equal(workflow.jobs['refresh-analyze'].permissions['pull-requests'], 'read');
  assert.equal(workflow.jobs['refresh-update'].permissions['pull-requests'], 'write');
  assert.equal(workflow.jobs['refresh-update'].permissions.contents, 'read');
  assert.ok(workflow.jobs['refresh-analyze'].needs.includes('publish'));
  assert.ok(workflow.jobs['refresh-update'].needs.includes('refresh-analyze'));
  assert.equal(workflow.jobs['refresh-update'].concurrency['cancel-in-progress'], false);
  assert.ok(workflow.jobs['refresh-update'].concurrency.group.includes('course-lessons-description-'));
  for (const job of ['analyze', 'refresh-analyze']) {
    const checkouts = workflow.jobs[job].steps.filter(s => s.uses === 'actions/checkout@v4');
    assert.ok(checkouts.length >= 2);
    assert.ok(checkouts.every(s => s.with['persist-credentials'] === false));
  }
  const trustedUpdater = workflow.jobs['refresh-update'].steps;
  assert.equal(trustedUpdater.filter(s => s.uses === 'actions/checkout@v4').length, 1);
  assert.ok(trustedUpdater.some(s => s.run?.includes('sync-course-lessons.mjs update')));
  assert.ok(workflow.jobs['refresh-analyze'].steps.some(s => s.run?.includes('sync-course-lessons.mjs analyze')));
});
