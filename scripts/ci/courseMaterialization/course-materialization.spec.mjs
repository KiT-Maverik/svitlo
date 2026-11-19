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
import {
  verifyManifest,
  identicalSnapshot,
  validateLessonAssignments,
  renderLessonRegistry,
  registerLessonRegistry,
} from './course-materialization.mjs';

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
  assert.equal(
    requireCompletedStageFour(courseWorkflow().replace('separate-chat review completed', 'review completed')),
    true,
  );
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
  ])
    assert.throws(() => requireCompletedStageFour(body));
  // A lookalike checklist outside the canonical Workflow section is not a gate.
  assert.throws(() => requireCompletedStageFour('## Notes\n- [x] 4. Review Course Plan\n## Workflow\n'));
  assert.equal(requireCompletedStageFour(courseWorkflow() + '\n## Notes\n- [ ] 4. Review Course Plan'), true);
});

test('allowlist blocks arbitrary files, traversal and incorrect UUID buckets', () => {
  const root = pkg + '/data/courses/b/' + id + '/';
  for (const filename of [
    root + 'index.ts',
    root + 'constants.ts',
    root + 'review.ts',
    root + 'methodology.md',
    root + 'content/safeObservation/index.ts',
    root + 'content/safeObservation/methodology.md',
    root + 'content/skyCycles/dayAndNight/index.ts',
    root + 'content/skyCycles/dayAndNight/methodology.md',
    root + 'content/skyCycles/dayAndNight/nightSkyEpisode/index.ts',
    root + 'content/skyCycles/dayAndNight/nightSkyEpisode/methodology.md',
    pkg + '/data/lessons/c/' + lesson + '/lesson.yaml',
  ])
    assert.equal(validateArtifactPath(filename, identity, 'materialize'), true, filename);
  for (const filename of [
    '.github/workflows/evil.yml',
    root + '../secrets',
    pkg + '/data/lessons/b/' + lesson + '/lesson.yaml',
    root + 'config.yaml',
    root + 'README.md',
    root + 'modules/skyCycles.ts',
    root + 'chapters/dayAndNight.ts',
    root + 'episodes/nightSkyEpisode.ts',
    root + 'content/index.ts',
    root + 'content/safeObservation/config.yaml',
    root + 'content/skyCycles/other.ts',
    root + 'content/sky_cycles/index.ts',
    root + 'content/skyCycles/dayAndNight/nightSkyEpisode/deeper/index.ts',
    root + 'content/skyCycles/../../evil.ts',
    root + 'content/skyCycles//index.ts',
  ])
    assert.equal(validateArtifactPath(filename, identity, 'materialize'), false, filename);
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
      lessonAssignments: [],
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

test('Stage 5 directly registers each generated Lesson UUID, slug and title', () => {
  const assignment = {
    id: lesson,
    slug: 'dayNightBasics',
    title: 'Чому змінюються день і ніч',
    path: pkg + '/data/lessons/' + lesson.at(-1) + '/' + lesson + '/lesson.yaml',
  };
  const meta = { identity, operation: 'materialize' };
  const entry = { path: assignment.path, action: 'create' };
  const manifest = { entries: [entry], lessonAssignments: [assignment] };
  assert.deepEqual(validateLessonAssignments(manifest, meta), [assignment]);
  assert.throws(() => validateLessonAssignments({ ...manifest, lessonAssignments: [] }, meta));
  assert.throws(() =>
    validateLessonAssignments({ ...manifest, lessonAssignments: [{ ...assignment, id: 'f'.repeat(36) }] }, meta),
  );
  assert.throws(() =>
    validateLessonAssignments({ ...manifest, lessonAssignments: [{ ...assignment, title: 'Bad\nTitle' }] }, meta),
  );
  assert.throws(() => validateLessonAssignments({ ...manifest, lessonAssignments: [assignment, assignment] }, meta));
  assert.throws(() => validateLessonAssignments(manifest, { ...meta, operation: 'finalize' }));
});

test('one-time Lesson table uses Not started and preserves agent-added PR links', () => {
  const assignment = {
    id: lesson,
    slug: 'dayNightBasics',
    title: 'День | ніч <safe>',
    path: pkg + '/data/lessons/' + lesson.at(-1) + '/' + lesson + '/lesson.yaml',
  };
  const body = [
    '<!-- svitlo-course-flow:v1 -->',
    '## Workflow',
    '- [x] 4. Review Course Plan',
    '<!-- svitlo-course-lessons:start -->',
    '## Lessons',
    'Lesson inventory not allocated yet.',
    '<!-- svitlo-course-lessons:end -->',
    'Preserve other PR content',
  ].join('\n');
  const registered = registerLessonRegistry(body, [assignment]);
  const tick = String.fromCharCode(96);
  assert(registered.includes('| Not started |'));
  assert(registered.includes('День &#124; ніч &lt;safe&gt;'));
  assert(registered.includes(tick + 'dayNightBasics' + tick));
  assert(registered.includes(tick + lesson + tick));
  assert(registered.endsWith('Preserve other PR content'));
  const linked = registered.replace('| Not started |', '| [PR #700](https://github.com/KiT-Maverik/svitlo/pull/700) |');
  assert.equal(registerLessonRegistry(linked, [assignment]), linked);
  assert.throws(() => registerLessonRegistry(linked, [{ ...assignment, id: '0'.repeat(36) }]));
  assert.throws(() => registerLessonRegistry(body.replace('<!-- svitlo-course-lessons:end -->', ''), [assignment]));
  assert.throws(() =>
    registerLessonRegistry(body.replace('Lesson inventory not allocated yet.', 'Agent link: #700'), [assignment]),
  );
  assert(renderLessonRegistry([assignment]).includes('Not started'));
});

test('Stage 5 uses a separate trusted, one-time Lesson registration job', () => {
  const workflowPath = fileURLToPath(new URL('../../../.github/workflows/course-materialization.yml', import.meta.url));
  const workflow = YAML.parse(fs.readFileSync(workflowPath, 'utf8'));
  assert.deepEqual(workflow.permissions, {});
  assert.equal(workflow.jobs.analyze.permissions.contents, 'read');
  assert.equal(workflow.jobs.publish.permissions.contents, 'write');
  assert.equal(workflow.jobs.publish.permissions['pull-requests'], 'read');
  assert.equal(workflow.jobs['register-lessons'].permissions.contents, 'read');
  assert.equal(workflow.jobs['register-lessons'].permissions['pull-requests'], 'write');
  assert.equal(workflow.jobs.publish.outputs.register, '$' + '{{ steps.publish.outputs.register }}');
  assert.ok(workflow.jobs['register-lessons'].needs.includes('publish'));
  assert.ok(workflow.jobs['register-lessons'].steps.some(s => s.run?.includes('course-materialization.mjs register')));
  assert.ok(!workflow.jobs['refresh-analyze'] && !workflow.jobs['refresh-update']);
  assert.ok(
    !fs.existsSync(fileURLToPath(new URL('../../../.github/workflows/sync-course-lessons.yml', import.meta.url))),
  );
});
