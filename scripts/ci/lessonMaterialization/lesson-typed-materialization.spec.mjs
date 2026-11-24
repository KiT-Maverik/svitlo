import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { gitBlob } from '../courseMaterialization/course-gate.mjs';
import { parseTypedIdentity, parseTypedTrigger, typedPath, inspectTyped } from './lesson-typed-gate.mjs';
import {
  typedMeta,
  checkedTypedRoot,
  matchingSnapshot,
  typedManifest,
  verifyTypedManifest,
  readTypedReport,
  indexed,
} from './lesson-typed-materialization.mjs';

const id = '12345678-1234-4234-8234-123456789001';
const courseId = '22345678-1234-4234-8234-123456789002';
const folder = 'content/math/data/lessons/1/' + id;
const source = folder + '/draft.ts';
const pkg = 'content/math';
const original = Buffer.from('export const stage2 = { config: {}, production: {} };\n');
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const sha = value => value.repeat(40);
const stamp = String.fromCharCode(96);
const stages = [
  'Methodology',
  'Content Creation',
  'Content Review',
  'Experience Review',
  'Methodology Compliance',
  'Resource Production',
  'Questions',
  'Flashcards',
  'Translation',
  'Translation Review',
];
const ticks = [
  '  - [ ] 6.1 Materialize Lesson sources',
  '  - [ ] 6.2 Complete generated Lesson resources',
  '  - [ ] 6.3 Implement and integrate Scenes',
];
function tracker({ course = false, approved = true } = {}) {
  return [
    '<!-- svitlo-create-lesson-flow:v1 -->',
    ...(course ? ['<!-- svitlo-course-lesson:v1 -->', 'Course: ' + courseId, 'Lesson: ' + id, 'Parent PR: #770'] : []),
    '## Lesson identity',
    '- Lesson UUID / textbook / slug: ' +
      stamp +
      id +
      stamp +
      ' / ' +
      stamp +
      pkg +
      stamp +
      ' / ' +
      stamp +
      'intro' +
      stamp,
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
const reviewRows = [3, 4, 5].map(
  stage =>
    '- Review evidence (v1): ' +
    stage +
    ' | accepted | ' +
    (stage === 5 ? commit : sha(stage === 3 ? 'b' : 'c')) +
    ' | ' +
    (stage === 5 ? gitBlob(original) : sha(stage === 3 ? 'd' : 'e')),
);
const reviewedTracker = options => tracker(options) + '\n' + reviewRows.join('\n');

test('canonical typed Lesson identity, Course linkage and exact command are enforced', () => {
  const expected = { id, pkg, slug: 'intro', folder, source, parent: null };
  assert.deepEqual(parseTypedIdentity(tracker()), expected);
  assert.deepEqual(parseTypedIdentity(tracker({ course: true })).parent, { courseId, parentPr: 770 });
  for (const body of [
    tracker().replace('/lessons/1/', '/lessons/2/'),
    tracker().replace('intro' + stamp, '../escape' + stamp),
    tracker() + '\n<!-- svitlo-create-lesson-flow:v1 -->',
    tracker({ course: true }).replace('Lesson: ' + id, 'Lesson: ' + courseId),
  ])
    assert.throws(() => parseTypedIdentity(body));
  const event = {
    issue: { number: 794, pull_request: {} },
    comment: { body: '/lesson materialize typed', user: { login: 'owner' } },
  };
  assert.deepEqual(parseTypedTrigger(event, 'issue_comment', 'owner'), { number: 794, actor: 'owner' });
  for (const body of [
    '/lesson materialize',
    '/lesson materialize typed\n',
    '/lesson finalize',
    '/lesson materialize typed #794',
  ]) {
    assert.throws(() => parseTypedTrigger({ ...event, comment: { ...event.comment, body } }, 'issue_comment', 'owner'));
  }
  assert.throws(() => parseTypedTrigger(event, 'issue_comment', 'attacker'));
  assert.throws(() => parseTypedTrigger({ ...event, issue: { number: 794 } }, 'issue_comment', 'owner'));
  assert.deepEqual(
    parseTypedTrigger({ inputs: { operation: 'materialize-typed', pr_number: '794' } }, 'workflow_dispatch', 'owner'),
    { number: 794, actor: 'owner' },
  );
  assert.throws(() =>
    parseTypedTrigger({ inputs: { operation: 'finalize', pr_number: '794' } }, 'workflow_dispatch', 'owner'),
  );
});

test('only the canonical Lesson-owned Stage 6 output tree is writable', () => {
  const identity = parseTypedIdentity(tracker());
  for (const relative of [
    'index.ts',
    'draft.ts',
    'languages.ts',
    'methodology.md',
    'specification.md',
    'sections/intro/index.ts',
    'sections/intro/content/items/prompt/index.ts',
    'sections/intro/content/items/prompt/specification.md',
    'sections/quiz/index.ts',
  ])
    assert.equal(typedPath(folder + '/' + relative, identity), true, relative);
  for (const relative of [
    'questions/index.ts',
    'flashcards/index.ts',
    'lesson.yaml',
    'assets/asset.jpg',
    'sections/../index.ts',
    'sections/intro//index.ts',
    'sections/intro/.hidden.ts',
    'review.ts',
    'sections/intro/scene.ts',
  ])
    assert.equal(typedPath(folder + '/' + relative, identity), false, relative);
  assert.equal(typedPath('content/history/data/lessons/1/' + id + '/index.ts', identity), false);
});

test('typed gate re-checks review blobs, genealogy, parent and source SHA', async () => {
  const previous = {
    GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY,
    LESSON_DEFAULT_BRANCH: process.env.LESSON_DEFAULT_BRANCH,
    GH_TOKEN: process.env.GH_TOKEN,
  };
  const originalFetch = globalThis.fetch;
  try {
    process.env.GITHUB_REPOSITORY = 'KiT-Maverik/svitlo';
    process.env.LESSON_DEFAULT_BRANCH = 'develop';
    process.env.GH_TOKEN = 'fixture-token';
    let stale = false;
    const remote = {
      number: 710,
      state: 'open',
      draft: true,
      body: reviewedTracker({ course: true }),
      head: { sha: commit, ref: 'agent/lesson', repo: { full_name: 'KiT-Maverik/svitlo' } },
      base: { ref: 'course/integration', repo: { full_name: 'KiT-Maverik/svitlo' } },
    };
    const parent = {
      state: 'open',
      body: '<!-- svitlo-course-flow:v1 -->\n- Course UUID: ' + courseId + '\n- Textbook: ' + pkg + '\n',
      head: { sha: sha('f'), ref: 'course/integration', repo: { full_name: 'KiT-Maverik/svitlo' } },
      base: { ref: 'develop', repo: { full_name: 'KiT-Maverik/svitlo' } },
    };
    globalThis.fetch = async (url, options = {}) => {
      const route = url.split('/repos/KiT-Maverik/svitlo/')[1];
      let payload;
      if (route === 'pulls/710') payload = remote;
      else if (route === 'pulls/770') payload = parent;
      else if (route === 'compare/' + sha('b') + '...' + sha('c') || route === 'compare/' + sha('c') + '...' + commit)
        payload = { status: 'ahead' };
      else if (route.includes('contents/') && route.endsWith('?ref=' + sha('f'))) {
        payload = {
          type: 'file',
          size: 400,
          sha: sha('1'),
          content: Buffer.from('LessonWorkflowStage1 ' + id + ' intro').toString('base64'),
        };
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
    parent.head.ref = 'course/other';
    await assert.rejects(() => inspectTyped(710), /parent branch/);
    parent.head.ref = 'course/integration';
    remote.body = tracker({ course: true });
    await assert.rejects(() => inspectTyped(710), /Missing accepted review evidence/);
    remote.body = reviewedTracker({ course: true }) + '\n' + reviewRows[0];
    await assert.rejects(() => inspectTyped(710), /duplicate review evidence/);
    remote.body = tracker({ approved: false });
    await assert.rejects(() => inspectTyped(710), /Stage 1 is not completed/);
    remote.body = reviewedTracker();
    remote.base.ref = 'develop';
    const standalone = await inspectTyped(710);
    assert.equal(standalone.parent, null);
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

function fixture(callback) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-typed-lesson-ci-'));
  try {
    const filename = path.join(root, source);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, original);
    execFileSync('git', ['init', '-q'], { cwd: root });
    execFileSync('git', ['add', '.'], { cwd: root });
    execFileSync(
      'git',
      ['-c', 'user.name=Fixture', '-c', 'user.email=f@example.invalid', 'commit', '-qm', 'reviewed typed source'],
      { cwd: root },
    );
    const head = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
    const info = {
      number: 710,
      repo: 'KiT-Maverik/svitlo',
      head,
      branch: 'agent/lesson',
      base: 'develop',
      sourceBlob: gitBlob(original),
      identity: parseTypedIdentity(tracker()),
      parent: null,
      actor: 'maintainer',
      operation: 'materialize-typed',
      reviews: [
        { stage: 3, verdict: 'accepted', commit: head, blob: gitBlob(original) },
        { stage: 4, verdict: 'accepted', commit: head, blob: gitBlob(original) },
        { stage: 5, verdict: 'accepted', commit: head, blob: gitBlob(original) },
      ],
    };
    const plan = {
      lessonId: id,
      sourcePath: source,
      materializedPath: folder + '/index.ts',
      sourceBlobSha: info.sourceBlob,
      reviewCommitSha: head,
      reviewEvidenceSha: gitBlob(Buffer.from(JSON.stringify(info.reviews))),
      publishable: false,
      diagnostics: [{ code: 'pending-scene', severity: 'warning' }],
      files: [
        { path: folder + '/index.ts', kind: 'typescript', content: 'export const lesson = 1;\n' },
        { path: folder + '/languages.ts', kind: 'typescript', content: 'export const languages = ["en"];\n' },
      ],
    };
    return callback({ root, info, plan, tracked: indexed(root, pkg) });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('draft deletion/index creation are atomic, immutable, hashed and confined to one Lesson', () =>
  fixture(({ root, info, plan, tracked }) => {
    const manifest = typedManifest(plan, info, original, tracked, root);
    assert.equal(verifyTypedManifest(manifest, info, root, tracked, original), 3);
    assert.equal(manifest.entries.find(item => item.path === source).action, 'delete');
    assert.equal(manifest.entries.find(item => item.path === folder + '/index.ts').action, 'create');
    assert.equal(manifest.entries.find(item => item.path === source).data, original.toString('base64'));
    assert.throws(
      () =>
        verifyTypedManifest(
          {
            ...manifest,
            sourceSha256: sha('0'),
          },
          info,
          root,
          tracked,
          original,
        ),
      /attestation/,
    );
    assert.throws(
      () =>
        verifyTypedManifest(
          {
            ...manifest,
            entries: [...manifest.entries, manifest.entries[0]],
          },
          info,
          root,
          tracked,
          original,
        ),
      /duplicate/,
    );
    assert.throws(
      () =>
        verifyTypedManifest(
          {
            ...manifest,
            entries: manifest.entries.map(item => (item.path === source ? { ...item, sha256: '0'.repeat(64) } : item)),
          },
          info,
          root,
          tracked,
          original,
        ),
      /hash/,
    );
    assert.throws(
      () =>
        typedManifest(
          {
            ...plan,
            files: [{ path: folder + '/questions/index.ts', kind: 'typescript', content: 'bad' }],
          },
          info,
          original,
          tracked,
          root,
        ),
      /out-of-scope/,
    );
    assert.equal(matchingSnapshot(info, { ...info, head: sha('a') }), false);
    fs.writeFileSync(path.join(root, folder, 'index.ts'), 'already created');
    assert.throws(() => typedManifest(plan, info, original, tracked, root), /collision/);
  }));

test('SHA256 attestation rejects missing or tampered analysis report', () => {
  const previous = {
    LESSON_TYPED_REPORT: process.env.LESSON_TYPED_REPORT,
    LESSON_TYPED_REPORT_SHA256: process.env.LESSON_TYPED_REPORT_SHA256,
  };
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-typed-artifact-'));
  try {
    process.env.LESSON_TYPED_REPORT = path.join(dir, 'report.json');
    fs.writeFileSync(process.env.LESSON_TYPED_REPORT, '{"version":2}');
    process.env.LESSON_TYPED_REPORT_SHA256 = digest(Buffer.from('{"version":2}'));
    assert.deepEqual(readTypedReport(), { version: 2 });
    fs.appendFileSync(process.env.LESSON_TYPED_REPORT, ' ');
    assert.throws(() => readTypedReport(), /SHA256 attestation/);
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
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
      'scripts/ci/reviewEvidence/review-evidence.mjs',
    ];
    for (const filename of files) {
      const target = path.join(isolated, filename);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(path.join(root, filename), target);
    }
    assert.equal(fs.existsSync(path.join(isolated, 'node_modules')), false);
    const entry = path.join(isolated, files[0]);
    const env = { PATH: process.env.PATH || '', GITHUB_REPOSITORY: 'KiT-Maverik/svitlo' };
    const imported = spawnSync(
      process.execPath,
      ['--input-type=module', '-e', 'await import(' + JSON.stringify(pathToFileURL(entry).href) + ')'],
      { cwd: isolated, env, encoding: 'utf8' },
    );
    assert.equal(imported.status, 0, imported.stderr);
    const result = spawnSync(process.execPath, [entry, 'publish'], { cwd: isolated, env, encoding: 'utf8' });
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.match(result.stdout + result.stderr, /Missing or invalid typed Lesson authorization/);
    assert.doesNotMatch(result.stdout + result.stderr, /ERR_MODULE_NOT_FOUND|typescript|zod/);
  } finally {
    fs.rmSync(isolated, { recursive: true, force: true });
  }
});

test('Lesson workflow has one typed-only entrypoint after YAML retirement', () => {
  const root = fileURLToPath(new URL('../../..', import.meta.url));
  const workflow = fs.readFileSync(path.join(root, '.github/workflows/lesson-materialization.yml'), 'utf8');
  assert.match(workflow, /^  typed-resolve:/m);
  assert.match(workflow, /^  typed-analyze:/m);
  assert.match(workflow, /^  typed-publish:/m);
  assert.match(workflow, /options: \[materialize-typed\]/);
  assert.match(workflow, /github\.event\.comment\.body == '\/lesson materialize typed'/);
  assert.doesNotMatch(workflow, /^  (?:resolve|analyze|publish):/m);
  assert.doesNotMatch(workflow, /options: \[[^\]]*\bfinalize\b/);
  assert.doesNotMatch(workflow, /lesson-materialization\.mjs|lesson-gate\.mjs/);

  const typedGate = fs.readFileSync(path.join(root, 'scripts/ci/lessonMaterialization/lesson-typed-gate.mjs'), 'utf8');
  assert.match(typedGate, /export function requireStageSixPending/);
  assert.doesNotMatch(typedGate, /from '\.\/lesson-gate\.mjs'/);
});
