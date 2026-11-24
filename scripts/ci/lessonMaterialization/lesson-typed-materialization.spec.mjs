import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { gitBlob } from '../courseMaterialization/course-gate.mjs';
import { lessonSourceIdentity, parseTypedTrigger, typedPath, inspectTyped } from './lesson-typed-gate.mjs';
import {
  typedMeta,
  checkedTypedRoot,
  safeTarget,
  matchingSnapshot,
  typedManifest,
  verifyTypedManifest,
  readTypedReport,
  indexed,
} from './lesson-typed-materialization.mjs';

const id = '12345678-1234-4234-8234-123456789001';
const folder = 'content/math/data/lessons/1/' + id;
const source = folder + '/draft.ts';
const pkg = 'content/math';
const original = Buffer.from('export const stage2 = { config: {}, production: {} };\n');
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const sha = value => value.repeat(40);
const commit = sha('a');
const baseHead = sha('b');

test('canonical Lesson path and exact command are enforced', () => {
  assert.deepEqual(lessonSourceIdentity(source), { id, pkg, folder, source });
  for (const bad of [
    source.replace('/lessons/1/', '/lessons/2/'),
    source.replace('draft.ts', 'index.ts'),
    source.replace(id, '../escape'),
    source.replace(id, 'a'.repeat(36)),
  ])
    assert.throws(() => lessonSourceIdentity(bad), /canonical/);
  const event = {
    action: 'created',
    issue: { number: 794, pull_request: {} },
    comment: { body: '/lesson materialize', user: { login: 'owner' } },
  };
  assert.deepEqual(parseTypedTrigger(event, 'issue_comment', 'owner'), { number: 794, actor: 'owner' });
  for (const body of [
    '/lesson materialize typed',
    '/lesson materialize\n',
    '/lesson finalize',
    '/lesson materialize typed #794',
  ]) {
    assert.throws(() => parseTypedTrigger({ ...event, comment: { ...event.comment, body } }, 'issue_comment', 'owner'));
  }
  assert.throws(() => parseTypedTrigger(event, 'issue_comment', 'attacker'));
  assert.throws(() => parseTypedTrigger({ ...event, action: 'edited' }, 'issue_comment', 'owner'));
  assert.throws(() => parseTypedTrigger({ ...event, issue: { number: 794 } }, 'issue_comment', 'owner'));
  assert.deepEqual(parseTypedTrigger({ inputs: { pr_number: '794' } }, 'workflow_dispatch', 'owner'), {
    number: 794,
    actor: 'owner',
  });
  assert.throws(() =>
    parseTypedTrigger({ inputs: { operation: 'finalize', pr_number: '794' } }, 'workflow_dispatch', 'owner'),
  );
});

test('only the canonical Lesson-owned Stage 6 output tree is writable', () => {
  const identity = lessonSourceIdentity(source);
  for (const relative of [
    'index.ts',
    'draft.ts',
    'languages.ts',
    'constants.ts',
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

test('source discovery ignores PR prose and Course ancestry; rejects missing, ambiguous and stale inputs', async () => {
  const previous = {
    GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY,
    GH_TOKEN: process.env.GH_TOKEN,
  };
  const originalFetch = globalThis.fetch;
  try {
    process.env.GITHUB_REPOSITORY = 'KiT-Maverik/svitlo';
    process.env.GH_TOKEN = 'fixture-token';
    const remote = {
      number: 710,
      state: 'open',
      draft: true,
      body: '',
      head: { sha: commit, ref: 'agent/lesson', repo: { full_name: 'KiT-Maverik/svitlo' } },
      base: { sha: baseHead, ref: 'course/integration', repo: { full_name: 'KiT-Maverik/svitlo' } },
    };
    const entry = { filename: source, status: 'modified', sha: gitBlob(original) };
    let files = [entry];
    let stale = false;
    globalThis.fetch = async url => {
      const route = url.split('/repos/KiT-Maverik/svitlo/')[1];
      let payload;
      if (route === 'pulls/710') payload = structuredClone(remote);
      else if (route === 'compare/' + baseHead + '...' + commit) payload = { files };
      else if (route.includes('contents/') && route.endsWith('?ref=' + commit))
        payload = { type: 'file', sha: stale ? sha('0') : gitBlob(original), size: original.length };
      else throw Error('Unexpected GitHub API: ' + route);
      return { ok: true, status: 200, json: async () => payload };
    };
    const first = await inspectTyped(710);
    assert.equal(first.identity.id, id);
    assert.equal(first.sourceBlob, gitBlob(original));
    remote.body = 'Unrelated text, no checklist or provenance.';
    assert.deepEqual(await inspectTyped(710), first);
    remote.base.ref = 'develop';
    assert.equal((await inspectTyped(710)).sourceBlob, first.sourceBlob);
    files = [];
    await assert.rejects(() => inspectTyped(710), /exactly one changed Lesson draft/);
    files = [entry, { ...entry, filename: source.replace('/1/', '/2/') }];
    await assert.rejects(() => inspectTyped(710), /exactly one changed Lesson draft/);
    files = [{ ...entry, filename: source.replace('/1/', '/2/') }];
    await assert.rejects(() => inspectTyped(710), /canonical/);
    files = Array.from({ length: 300 }, () => entry);
    await assert.rejects(() => inspectTyped(710), /complete bounded Git comparison/);
    files = [entry];
    stale = true;
    await assert.rejects(() => inspectTyped(710), /changed blob/);
    stale = false;
    await assert.rejects(() => inspectTyped(710, sha('0')), /HEAD advanced/);
    remote.head.ref = 'main';
    await assert.rejects(() => inspectTyped(710), /Draft typed Lesson PR required/);
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
      identity: lessonSourceIdentity(source),
      baseHead,
      actor: 'maintainer',
      operation: 'lesson-stage6',
    };
    const plan = {
      lessonId: id,
      sourcePath: source,
      materializedPath: folder + '/index.ts',
      sourceBlobSha: info.sourceBlob,
      sourceCommitSha: head,
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

test('candidate checkout must have the pinned HEAD, clean files and no symlink source', () =>
  fixture(({ root, info }) => {
    const previous = process.env.LESSON_TYPED_CANDIDATE;
    try {
      process.env.LESSON_TYPED_CANDIDATE = root;
      assert.equal(checkedTypedRoot(info), fs.realpathSync(root));
      assert.throws(() => checkedTypedRoot({ ...info, head: sha('0') }), /pinned Lesson HEAD/);
      fs.writeFileSync(path.join(root, source), 'changed');
      assert.throws(() => checkedTypedRoot(info), /must be clean/);
      fs.unlinkSync(path.join(root, source));
      fs.symlinkSync(path.join(root, '.git', 'HEAD'), path.join(root, source));
      assert.throws(() => safeTarget(root, source, true), /Symlink/);
    } finally {
      if (previous === undefined) delete process.env.LESSON_TYPED_CANDIDATE;
      else process.env.LESSON_TYPED_CANDIDATE = previous;
    }
  }));

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
    fs.writeFileSync(process.env.LESSON_TYPED_REPORT, '{"version":3}');
    process.env.LESSON_TYPED_REPORT_SHA256 = digest(Buffer.from('{"version":3}'));
    assert.deepEqual(readTypedReport(), { version: 3 });
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
  assert.doesNotMatch(workflow, /operation:|materialize-typed/);
  assert.match(workflow, /github\.event\.issue\.number \|\| inputs\.pr_number/);
  assert.match(workflow, /github\.event\.comment\.body == '\/lesson materialize'/);
  assert.doesNotMatch(workflow, /^  (?:resolve|analyze|publish):/m);
  assert.doesNotMatch(workflow, /options: \[[^\]]*\bfinalize\b/);
  assert.doesNotMatch(workflow, /lesson-materialization\.mjs|lesson-gate\.mjs/);

  const typedGate = fs.readFileSync(path.join(root, 'scripts/ci/lessonMaterialization/lesson-typed-gate.mjs'), 'utf8');
  assert.match(typedGate, /export async function discoverLessonSource/);
  assert.doesNotMatch(
    typedGate,
    /requireStageSixPending|parseTypedIdentity|reviewsFor|courseProvenance|verifyReviewEvidence|pr\.body/,
  );
  assert.doesNotMatch(typedGate, /from '\.\/lesson-gate\.mjs'/);
});
