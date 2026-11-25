import assert from 'node:assert/strict';
import test from 'node:test';
import {
  courseLessonReferences,
  courseAddedSectionReferences,
  runIsolatedCourseDependencies,
} from './course-dependency-isolation.mjs';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const id = '11111111-1111-4111-8111-111111111111';
const sha = 'a'.repeat(40);
const sectionId = '22222222-2222-4222-8222-222222222222';
const addedSection = (sourceSha = sha, ownerLessonId = id) => ({
  $ref: 'lesson-section',
  lessonId: ownerLessonId,
  sectionId,
  sourceSha,
  exportName: 'practice',
});
const withSection = (sourceSha = sha, ownerLessonId = id, lessonSourceSha = sha) => ({
  config: { type: 'lesson', slug: 'first' },
  production: {
    ...reuse(lessonSourceSha).production,
    sourcePatch: {
      section: { additionalItems: { practice: addedSection(sourceSha, ownerLessonId) }, order: ['practice'] },
    },
  },
});
const reuse = (sourceSha = sha) => ({
  config: { type: 'lesson', slug: 'first' },
  production: { kind: 'existing', existing: { id }, matching: { sourceSha }, sourceExportName: 'realLesson' },
});
test('Course default-branch Lesson dependency inventory is deterministic, de-duplicated and bounded', () => {
  const input = { config: { content: { items: { first: reuse(), second: reuse() }, order: ['first', 'second'] } } };
  assert.deepEqual(courseLessonReferences(input), [{ id, sourceSha: sha, exportName: 'realLesson' }]);
  assert.deepEqual(courseLessonReferences({ config: { content: { items: {}, order: [] } } }), []);
});
test('Course declarative added Section references are deduplicated and fail closed', () => {
  const value = { config: { content: { items: { first: withSection(), second: withSection() } } } };
  assert.deepEqual(courseAddedSectionReferences(value), [
    {
      id: sectionId,
      ownerLessonId: id,
      sourceSha: sha,
      slug: 'practice',
      exportName: 'practice',
    },
  ]);
  const forged = withSection();
  forged.production.sourcePatch.section.additionalItems.practice.exportName = '../unsafe';
  assert.throws(
    () => courseAddedSectionReferences({ config: { content: { items: { forged } } } }),
    /Invalid Course additional Section reference/,
  );
  const unowned = withSection();
  unowned.production.sourcePatch.section.additionalItems.practice.lessonId = '../../../owner';
  assert.throws(
    () => courseAddedSectionReferences({ config: { content: { items: { unowned } } } }),
    /Invalid Course additional Section reference/,
  );
});

test('Course dependencies reject executable-path and source-SHA ambiguity before Docker', () => {
  for (const invalid of [
    reuse('x'.repeat(40)),
    { ...reuse(), production: { ...reuse().production, sourceExportName: '../evil' } },
    { ...reuse(), production: { ...reuse().production, existing: { id: '__proto__' } } },
  ])
    assert.throws(() => courseLessonReferences(invalid), /Unsafe Course Lesson dependency/);
});

test('Course isolated loader mounts only trusted default-branch dependency code', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-trust-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const trustedRoot = path.join(root, 'trusted');
  const candidateRoot = path.join(root, 'candidate');
  fs.mkdirSync(trustedRoot);
  const git = (directory, ...args) => execFileSync('git', ['-C', directory, ...args], { encoding: 'utf8' }).trim();
  git(trustedRoot, 'init', '-q');
  git(trustedRoot, 'config', 'user.name', 'Svitlo Fixture');
  git(trustedRoot, 'config', 'user.email', 'svitlo@example.invalid');
  const relative = 'content/math/data/lessons/1/' + id + '/index.ts';
  const file = path.join(trustedRoot, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, 'export const realLesson = { id: "' + id + '" };\n');
  const sectionRelative = 'content/math/data/lessons/1/' + id + '/sections/practice/index.ts';
  const sectionFile = path.join(trustedRoot, sectionRelative);
  fs.mkdirSync(path.dirname(sectionFile), { recursive: true });
  fs.writeFileSync(sectionFile, 'export const practice = { id: "' + sectionId + '" };\n');
  const support = ['node_modules', 'shared/engine/dist'];
  for (const directory of support) fs.mkdirSync(path.join(trustedRoot, directory), { recursive: true });
  fs.writeFileSync(path.join(trustedRoot, 'shared/engine/package.json'), '{"name":"@svitlo/engine"}\n');
  git(trustedRoot, 'add', '.');
  git(trustedRoot, 'commit', '-qm', 'Trusted Lesson');
  git(root, 'clone', '-q', trustedRoot, candidateRoot);
  const expectedBlob = git(trustedRoot, 'rev-parse', 'HEAD:' + relative);
  const sectionBlob = git(trustedRoot, 'rev-parse', 'HEAD:' + sectionRelative);
  const input = {
    config: {
      content: {
        items: {
          reused: reuse(expectedBlob),
        },
        order: ['reused'],
      },
    },
  };
  const source = {
    sourcePath: 'content/math/data/courses/1/' + id + '/draft.ts',
    sourceBlobSha: 'b'.repeat(40),
    sourceCommitSha: git(candidateRoot, 'rev-parse', 'HEAD'),
  };
  const calls = [];
  const fakeSpawn = (binary, args, options) => {
    calls.push({ binary, args, options });
    return binary === 'docker' && args[0] === 'run'
      ? { status: 0, stdout: '{"publishable":false,"files":[]}' }
      : { status: 0 };
  };
  const request = { input, source, textbookRoot: 'content/math', candidateRoot, trustedRoot };
  const result = runIsolatedCourseDependencies(request, fakeSpawn);
  assert.equal(result.publishable, false);
  assert.equal(calls[0].binary, 'docker');
  assert(calls[0].args.includes('--network=none'));
  assert(calls[0].args.includes('--read-only'));
  assert(calls[0].args.includes('--cap-drop=ALL'));
  assert(calls[0].args.includes('--security-opt=no-new-privileges'));
  assert(calls[0].args.includes('--user=65534:65534'));
  const mounts = calls[0].args.filter(value => value.startsWith('type=bind,'));
  assert(mounts.length >= 4);
  assert(mounts.every(value => !value.includes(candidateRoot)));
  assert(mounts.some(value => value.includes('source=' + path.join(trustedRoot, 'content/math'))));
  assert(!calls[0].args.some(value => /GH_TOKEN|GITHUB_TOKEN/.test(value)));
  assert.equal(calls[1].args[0], 'rm');

  calls.length = 0;
  const withAdded = {
    config: { content: { items: { reused: withSection(sectionBlob, id, expectedBlob) }, order: ['reused'] } },
  };
  const withAddedResult = runIsolatedCourseDependencies({ ...request, input: withAdded }, fakeSpawn);
  assert.equal(withAddedResult.publishable, false);
  assert.deepEqual(JSON.parse(calls[0].options.input).sections, [
    {
      id: sectionId,
      ownerLessonId: id,
      sourceSha: sectionBlob,
      slug: 'practice',
      exportName: 'practice',
    },
  ]);

  calls.length = 0;
  assert.throws(
    () =>
      runIsolatedCourseDependencies(
        {
          ...request,
          input: {
            config: { content: { items: { reused: withSection('c'.repeat(40), id, expectedBlob) } } },
          },
        },
        fakeSpawn,
      ),
    /Section|fatal|git/i,
  );
  assert.equal(calls.length, 0, 'untrusted Section revision never launches Docker');

  calls.length = 0;
  assert.throws(
    () =>
      runIsolatedCourseDependencies(
        {
          ...request,
          input: {
            config: {
              content: { items: { reused: withSection(sectionBlob, '33333333-3333-4333-8333-333333333333', expectedBlob) } },
            },
          },
        },
        fakeSpawn,
      ),
    /Section|fatal|git/i,
  );
  assert.equal(calls.length, 0, 'wrong Section owner never launches Docker');

  calls.length = 0;
  assert.throws(
    () =>
      runIsolatedCourseDependencies(
        {
          ...request,
          input: { config: { content: { items: { reused: reuse('c'.repeat(40)) }, order: ['reused'] } } },
        },
        fakeSpawn,
      ),
    /git|fatal|Lesson|SHA|revision/i,
  );
  assert.equal(calls.length, 0, 'untrusted revision never launches Docker');

  fs.writeFileSync(file, 'export const altered = true;\n');
  git(trustedRoot, 'add', '.');
  git(trustedRoot, 'commit', '-qm', 'Changed trusted Lesson');
  assert.throws(
    () => runIsolatedCourseDependencies(request, fakeSpawn),
    /Reused Lesson differs from trusted default branch/,
  );
  assert.equal(calls.length, 0);
});
