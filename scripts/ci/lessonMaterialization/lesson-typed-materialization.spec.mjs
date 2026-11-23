import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { gitBlob } from '../courseMaterialization/course-gate.mjs';
import {
  parseTypedIdentity, parseTypedTrigger, parseReviewEvidence, typedPath,
  inspectTyped,
} from './lesson-typed-gate.mjs';
import {
  typedMeta, checkedTypedRoot, matchingSnapshot, typedManifest,
  verifyTypedManifest, readTypedReport, indexed,
} from './lesson-typed-materialization.mjs';

const id = '12345678-1234-4234-8234-123456789001';
const courseId = '22345678-1234-4234-8234-123456789002';
const folder = 'content/math/data/lessons/1/' + id;
const source = folder + '/index.ts';
const pkg = 'content/math';
const original = Buffer.from('export const stage2 = { config: {}, production: {} };\n');
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const sha = value => value.repeat(40);
const stamp = String.fromCharCode(96);
const stages = ['Methodology','Content Creation','Content Review','Experience Review',
  'Methodology Compliance','Resource Production','Questions','Flashcards',
  'Translation','Translation Review'];
const ticks = [
  '  - [ ] 6.1 Materialize Lesson sources',
  '  - [ ] 6.2 Complete generated Lesson resources',
  '  - [ ] 6.3 Implement and integrate Scenes',
];
function tracker({ course = false, approved = true } = {}) {
  return [
    '<!-- svitlo-create-lesson-flow:v1 -->',
    ...(course ? ['<!-- svitlo-course-lesson:v1 -->', 'Course: ' + courseId,
      'Lesson: ' + id, 'Parent PR: #770'] : []),
    '## Lesson identity',
    '- Lesson UUID / textbook / slug: ' + stamp + id + stamp +
      ' / ' + stamp + pkg + stamp + ' / ' + stamp + 'intro' + stamp,
    '- Source path: ' + source + ' (single reviewed Lesson Stage 2 object)',
    '## Lesson stages',
    ...stages.flatMap((name, i) => [
      '- [' + (approved && i < 5 ? 'x' : ' ') + '] ' + (i + 1) + '. ' + name,
      ...(i === 5 ? ticks : []),
    ]),
    '## Evidence',
  ].join('\n');
}
const commit = sha('a');
const comments = [3,4,5].map((stage, i) => ({
  user: { login: 'reviewer' }, id: 100 + stage, body: [
    '<!-- svitlo-lesson-review:v1 -->',
    'Stage: ' + stage,
    'Source commit: ' + (stage === 5 ? commit : sha(stage === 3 ? 'b' : 'c')),
    'Source blob: ' + (stage === 5 ? gitBlob(original) : sha(stage === 3 ? 'd' : 'e')),
    'Verdict: accepted', 'Reviewer context: review-' + stage,
    ...(stage === 3 ? ['Author context: author-2'] : []),
  ].join('\n'),
}));

test('canonical typed Lesson identity, Course linkage and exact command are enforced', () => {
  const expected = { id, pkg, slug: 'intro', folder, source, parent: null };
  assert.deepEqual(parseTypedIdentity(tracker()), expected);
  assert.deepEqual(parseTypedIdentity(tracker({ course: true })).parent,
    { courseId, parentPr: 770 });
  for (const body of [
    tracker().replace('/lessons/1/', '/lessons/2/'),
    tracker().replace('intro' + stamp, '../escape' + stamp),
    tracker() + '\n<!-- svitlo-create-lesson-flow:v1 -->',
    tracker({ course: true }).replace('Lesson: ' + id, 'Lesson: ' + courseId),
  ]) assert.throws(() => parseTypedIdentity(body));
  const event = { issue: { number: 794, pull_request: {} },
    comment: { body: '/lesson materialize typed', user: { login: 'owner' } } };
  assert.deepEqual(parseTypedTrigger(event, 'issue_comment', 'owner'),
    { number: 794, actor: 'owner' });
  for (const body of ['/lesson materialize', '/lesson materialize typed\n',
    '/lesson finalize', '/lesson materialize typed #794']) {
    assert.throws(() => parseTypedTrigger({ ...event,
      comment: { ...event.comment, body } }, 'issue_comment', 'owner'));
  }
  assert.throws(() => parseTypedTrigger(event, 'issue_comment', 'attacker'));
  assert.throws(() => parseTypedTrigger({ ...event, issue: { number: 794 } },
    'issue_comment', 'owner'));
  assert.deepEqual(parseTypedTrigger({ inputs: { operation: 'materialize-typed',
    pr_number: '794' } }, 'workflow_dispatch', 'owner'), { number: 794, actor: 'owner' });
  assert.throws(() => parseTypedTrigger({ inputs: { operation: 'finalize',
    pr_number: '794' } }, 'workflow_dispatch', 'owner'));
});

test('independent review attestations require distinct context, SHA and uniqueness', () => {
  const result = parseReviewEvidence(comments);
  assert.deepEqual(result.map(item => item.stage), [3,4,5]);
  assert.equal(result[2].commit, commit);
  assert.throws(() => parseReviewEvidence(comments.slice(1)), /Three unique/);
  assert.throws(() => parseReviewEvidence([...comments, comments[0]]), /Three unique/);
  assert.throws(() => parseReviewEvidence(comments.map(item =>
    item.id === 103 ? { ...item, body: item.body.replace('author-2', 'review-3') } : item)),
    /independence/);
  assert.throws(() => parseReviewEvidence(comments.map(item =>
    item.id === 105 ? { ...item, body: item.body.replace('accepted', 'pending') } : item)),
    /review verdict/);
});

test('only the canonical Lesson-owned Stage 6 output tree is writable', () => {
  const identity = parseTypedIdentity(tracker());
  for (const relative of [
    'index.ts','workflow.stage2.ts','languages.ts','methodology.md','specification.md',
    'sections/intro/index.ts','sections/intro/content/items/prompt/index.ts',
    'sections/intro/content/items/prompt/specification.md','sections/quiz/index.ts',
  ]) assert.equal(typedPath(folder + '/' + relative, identity), true, relative);
  for (const relative of [
    'questions/index.ts','flashcards/index.ts','lesson.yaml','assets/asset.jpg',
    'sections/../index.ts','sections/intro//index.ts','sections/intro/.hidden.ts',
    'review.ts','sections/intro/scene.ts',
  ]) assert.equal(typedPath(folder + '/' + relative, identity), false, relative);
  assert.equal(typedPath('content/history/data/lessons/1/' + id + '/index.ts', identity), false);
});

test('typed gate re-checks review blobs, genealogy, parent and source SHA', async () => {
  const previous = { GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY,
    LESSON_DEFAULT_BRANCH: process.env.LESSON_DEFAULT_BRANCH,
    GH_TOKEN: process.env.GH_TOKEN };
  const originalFetch = globalThis.fetch;
  try {
    process.env.GITHUB_REPOSITORY = 'KiT-Maverik/svitlo';
    process.env.LESSON_DEFAULT_BRANCH = 'develop';
    process.env.GH_TOKEN = 'fixture-token';
    let stale = false, badParent = false, unauthorized = false;
    const remote = {
      number: 710, state: 'open', draft: true,
      body: tracker({ course: true }),
      head: { sha: commit, ref: 'agent/lesson', repo: { full_name: 'KiT-Maverik/svitlo' } },
      base: { ref: 'course/integration', repo: { full_name: 'KiT-Maverik/svitlo' } },
    };
    const parent = {
      state: 'open',
      body: '<!-- svitlo-course-flow:v1 -->\n- Course UUID: ' +
        courseId + '\n- Textbook: ' + pkg + '\n',
      head: { sha: sha('f'), ref: 'course/integration', repo: { full_name: 'KiT-Maverik/svitlo' } },
      base: { ref: 'develop', repo: { full_name: 'KiT-Maverik/svitlo' } },
    };
    globalThis.fetch = async (url, options = {}) => {
      const route = url.split('/repos/KiT-Maverik/svitlo/')[1];
      let payload;
      if (route === 'pulls/710') payload = remote;
      else if (route === 'pulls/770') payload = parent;
      else if (route === 'issues/710/comments?per_page=100&page=1') payload = comments;
      else if (route === 'collaborators/reviewer/permission')
        payload = { permission: unauthorized ? 'read' : 'write' };
      else if (route === 'compare/' + sha('b') + '...' + sha('c') ||
          route === 'compare/' + sha('c') + '...' + commit) payload = { status: 'ahead' };
      else if (route.includes('contents/') && route.endsWith('?ref=' + sha('f'))) {
        payload = { type: 'file', size: 400, sha: sha('1'),
          content: Buffer.from('LessonWorkflowStage1 ' + id + ' intro').toString('base64') };
      } else if (route.includes('contents/') && route.endsWith('?ref=' + sha('b')))
        payload = { type: 'file', sha: sha('d') };
      else if (route.includes('contents/') && route.endsWith('?ref=' + sha('c')))
        payload = { type: 'file', sha: sha('e') };
      else if (route.includes('contents/') && route.endsWith('?ref=' + commit))
        payload = { type: 'file', sha: stale ? sha('0') : gitBlob(original), size: original.length };
      else throw Error('Unexpected GitHub API: ' + route);
      return { ok: true, status: 200, json: async () => payload };
    };
    const snapshot = await inspectTyped(710);
    assert.equal(snapshot.identity.id, id);
    assert.equal(snapshot.parent.parentPr, 770);
    assert.equal(snapshot.sourceBlob, gitBlob(original));
    assert.equal(snapshot.reviews.length, 3);
    stale = true;
    await assert.rejects(() => inspectTyped(710), /source|review/i);
    stale = false;
    badParent = true;
    parent.head.ref = 'course/other';
    await assert.rejects(() => inspectTyped(710), /parent branch/);
    parent.head.ref = 'course/integration';
    badParent = false;
    unauthorized = true;
    await assert.rejects(() => inspectTyped(710), /permission/i);
    unauthorized = false;
    remote.body = tracker({ approved: false });
    await assert.rejects(() => inspectTyped(710), /Stage 1 is not completed/);
    remote.body = tracker();
    remote.base.ref = 'develop';
    const standalone = await inspectTyped(710);
    assert.equal(standalone.parent, null);
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
});

function fixture(callback) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-typed-lesson-ci-'));
  try {
    const filename = path.join(root, source);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, original);
    execFileSync('git', ['init','-q'], { cwd: root });
    execFileSync('git', ['add', '.'], { cwd: root });
    execFileSync('git', ['-c','user.name=Fixture','-c','user.email=f@example.invalid',
      'commit','-qm','reviewed typed source'], { cwd: root });
    const head = execFileSync('git', ['rev-parse','HEAD'],
      { cwd: root, encoding: 'utf8' }).trim();
    const info = {
      number: 710, repo: 'KiT-Maverik/svitlo', head, branch: 'agent/lesson',
      base: 'develop', sourceBlob: gitBlob(original),
      identity: parseTypedIdentity(tracker()), parent: null,
      actor: 'maintainer', operation: 'materialize-typed',
      reviews: [{stage:3,commit:head,blob:gitBlob(original)},
        {stage:4,commit:head,blob:gitBlob(original)},
        {stage:5,commit:head,blob:gitBlob(original)}],
    };
    const plan = {
      lessonId: id, sourcePath: source,
      archivePath: folder + '/workflow.stage2.ts',
      sourceBlobSha: info.sourceBlob, reviewCommitSha: head,
      reviewEvidenceSha: gitBlob(Buffer.from(JSON.stringify(info.reviews))),
      publishable: false, diagnostics: [{code:'pending-scene',severity:'warning'}],
      files: [
        {path:source,kind:'typescript',content:'export const lesson = 1;\n'},
        {path:folder + '/languages.ts',kind:'typescript',content:'export const languages = ["en"];\n'},
      ],
    };
    return callback({ root, info, plan, tracked: indexed(root, pkg) });
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
}

test('source/archive are atomic, immutable, hashed and confined to one Lesson', () =>
  fixture(({ root, info, plan, tracked }) => {
    const manifest = typedManifest(plan, info, original, tracked, root);
    assert.equal(verifyTypedManifest(manifest, info, root, tracked, original), 3);
    assert.equal(manifest.entries.find(item => item.path === source).action, 'replace');
    assert.equal(manifest.entries.find(item => item.path.endsWith('workflow.stage2.ts')).action, 'create');
    assert.equal(manifest.entries.find(item => item.path.endsWith('workflow.stage2.ts')).data,
      original.toString('base64'));
    assert.throws(() => verifyTypedManifest({
      ...manifest, sourceSha256: sha('0'),
    }, info, root, tracked, original), /attestation/);
    assert.throws(() => verifyTypedManifest({
      ...manifest, entries: [...manifest.entries, manifest.entries[0]],
    }, info, root, tracked, original), /duplicate/);
    assert.throws(() => verifyTypedManifest({
      ...manifest, entries: manifest.entries.map(item => item.path === source
        ? {...item, sha256: '0'.repeat(64)} : item),
    }, info, root, tracked, original), /hash/);
    assert.throws(() => typedManifest({
      ...plan, files: [{path: folder + '/questions/index.ts',kind:'typescript',content:'bad'}],
    }, info, original, tracked, root), /out-of-scope/);
    assert.equal(matchingSnapshot(info, {...info, head: sha('a')}), false);
    fs.writeFileSync(path.join(root, folder, 'workflow.stage2.ts'), 'already created');
    assert.throws(() => typedManifest(plan, info, original, tracked, root), /already exists/);
  }));

test('SHA256 attestation rejects missing or tampered analysis report', () => {
  const previous = { LESSON_TYPED_REPORT: process.env.LESSON_TYPED_REPORT,
    LESSON_TYPED_REPORT_SHA256: process.env.LESSON_TYPED_REPORT_SHA256 };
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-typed-artifact-'));
  try {
    process.env.LESSON_TYPED_REPORT = path.join(dir, 'report.json');
    fs.writeFileSync(process.env.LESSON_TYPED_REPORT, '{"version":2}');
    process.env.LESSON_TYPED_REPORT_SHA256 = digest(Buffer.from('{"version":2}'));
    assert.deepEqual(readTypedReport(), {version:2});
    fs.appendFileSync(process.env.LESSON_TYPED_REPORT, ' ');
    assert.throws(() => readTypedReport(), /SHA256 attestation/);
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('typed publisher is importable without node_modules or any Engine source', () => {
  const isolated = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-typed-publisher-'));
  try {
    const root = fileURLToPath(new URL('../../..', import.meta.url));
    const files = [
      'scripts/ci/lessonMaterialization/lesson-typed-materialization.mjs',
      'scripts/ci/lessonMaterialization/lesson-typed-gate.mjs',
      'scripts/ci/courseMaterialization/course-gate.mjs',
    ];
    for (const filename of files) {
      const target = path.join(isolated, filename);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(path.join(root, filename), target);
    }
    assert.equal(fs.existsSync(path.join(isolated, 'node_modules')), false);
    const entry = path.join(isolated, files[0]);
    const env = { PATH: process.env.PATH || '', GITHUB_REPOSITORY: 'KiT-Maverik/svitlo' };
    const imported = spawnSync(process.execPath,
      ['--input-type=module','-e','await import(' + JSON.stringify(pathToFileURL(entry).href) + ')'],
      { cwd: isolated, env, encoding: 'utf8' });
    assert.equal(imported.status, 0, imported.stderr);
    const result = spawnSync(process.execPath, [entry, 'publish'],
      { cwd: isolated, env, encoding: 'utf8' });
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.match(result.stdout + result.stderr, /Missing or invalid typed Lesson authorization/);
    assert.doesNotMatch(result.stdout + result.stderr, /ERR_MODULE_NOT_FOUND|typescript|zod/);
  } finally { fs.rmSync(isolated, { recursive: true, force: true }); }
});
