import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { materializeCourseStage5 } from '../../../shared/engine/generators/materializers/course/materializeStage5.mjs';
import { courseStage3, independentLessonConfig, courseId } from '../directMaterialization/fixtures/worker-inputs.mjs';

import { buildTypedCourseManifest, verifyCourseDependencies } from './typed-course-direct.mjs';
import { verifyTypedCourseManifest } from './typed-course-publish.mjs';
const id = '663572e7-bd85-4516-86e2-3de07d209e03';
const sourcePath = 'content/playground/data/courses/3/' + id + '/draft.ts';
const meta = {
  operation: 'typed-course-stage5',
  version: 2,
  repo: 'KiT-Maverik/svitlo',
  number: 823,
  head: 'a'.repeat(40),
  branch: 'course/test',
  actor: 'maintainer',
  courseId: id,
  textbookRoot: 'content/playground',
  sourcePath,
  sourceBlobSha: 'b'.repeat(40),
  reviewCommitSha: 'a'.repeat(40),
  reviewVerdict: 'accepted',
};
const index = sourcePath.replace('/draft.ts', '/index.ts');
const plan = {
  sourcePath,
  sourceBlobSha: meta.sourceBlobSha,
  reviewCommitSha: meta.reviewCommitSha,
  courseId: id,
  publishable: false,
  materializedPath: index,
  files: [{ path: index, kind: 'typescript', content: 'export const course = 1;\n' }],
  inventory: { lessons: [], episodes: [] },
  diagnostics: [],
  pendingEpisodes: [],
  pendingPlacements: [],
};
test('direct Course manifest binds reviewed source to deterministic authored output and inventories', () => {
  const manifest = buildTypedCourseManifest(meta, plan);
  assert.deepEqual(verifyCourseDependencies(meta, '', '', plan), undefined);
  assert.equal(manifest.entries[0].path, index);
  assert.equal(manifest.entries[0].sha256, createHash('sha256').update(plan.files[0].content).digest('hex'));
  assert.doesNotThrow(() => verifyTypedCourseManifest(manifest, meta));
  assert.throws(() => buildTypedCourseManifest(meta, { ...plan, files: [...plan.files, ...plan.files] }), /duplicate/);
  assert.throws(() => buildTypedCourseManifest(meta, { ...plan, files: [{ ...plan.files[0], path: sourcePath }] }));
  assert.throws(() => buildTypedCourseManifest(meta, { ...plan, publishable: true }));
  assert.throws(() =>
    verifyCourseDependencies(meta, '', '', {
      ...plan,
      inventory: { lessons: [{ placementPath: '../escape', kind: 'new', type: 'lesson' }], episodes: [] },
    }),
  );
});

test('actual Course source plan binds every generated Lesson seed and Episode handoff to the trusted manifest', () => {
  const build = fileURLToPath(new URL('../../../shared/engine/dist/build.js', import.meta.url));
  const { defineLesson } = createRequire(import.meta.url)(build);
  const actual = courseStage3(defineLesson(independentLessonConfig()));
  const sourcePath = 'content/math/data/courses/3/' + courseId + '/draft.ts';
  const pinned = {
    version: 2, operation: 'typed-course-stage5',
    repo: 'fixture/repo', number: 823, head: 'b'.repeat(40),
    branch: 'test', actor: 'tester', courseId,
    textbookRoot: 'content/math', sourcePath, sourceBlobSha: 'a'.repeat(40),
  };
  const plan = materializeCourseStage5(actual, {
    textbookRoot: 'content/math',
    source: { sourcePath, sourceBlobSha: pinned.sourceBlobSha },
    verifySource: () => true,
  });
  assert.equal(plan.inventory.lessons.length, 3);
  assert.equal(plan.inventory.episodes.length, 1);
  const complete = buildTypedCourseManifest(pinned, plan);
  assert.equal(verifyTypedCourseManifest(complete, pinned), plan.files.length);
  const mutate = edit => {
    const manifest = structuredClone(complete);
    edit(manifest);
    assert.throws(() => verifyTypedCourseManifest(manifest, pinned),
      /inventory|handoff|seed|duplicate|Unregistered|missing|invalid|Malformed|Episode/i);
  };
  const seed = complete.inventory.lessons.find(x => x.kind === 'new').sourcePath;
  const episode = complete.inventory.episodes[0].sourcePath;
  mutate(m => { m.entries = m.entries.filter(f => f.path !== seed); });
  mutate(m => { m.entries = m.entries.filter(f => f.path !== episode); });
  mutate(m => { m.inventory.lessons[0].id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'; });
  mutate(m => { m.inventory.episodes[0].orderPath = [0]; });
  mutate(m => { m.inventory.episodes.push(structuredClone(m.inventory.episodes[0])); });
  mutate(m => { m.pendingPlacements = []; });
  mutate(m => { m.pendingEpisodes = [m.pendingEpisodes[0], m.pendingEpisodes[0]]; });
  mutate(m => {
    const file = m.entries.find(f => f.path === seed);
    const text = Buffer.from(file.data, 'base64').toString('utf8').replace(
      m.inventory.lessons[0].id, 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    );
    file.data = Buffer.from(text).toString('base64');
    file.sha256 = createHash('sha256').update(text).digest('hex');
  });
  mutate(m => {
    const file = structuredClone(m.entries.find(f => f.path === seed));
    file.path = 'content/math/data/lessons/a/aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa/draft.ts';
    m.entries.push(file);
  });
  mutate(m => {
    const file = structuredClone(m.entries.find(f => f.path === episode));
    file.path = m.sourcePath.replace('/draft.ts', '/content/unlisted/draft.ts');
    m.entries.push(file);
  });
  assert.equal(verifyTypedCourseManifest(complete, pinned), plan.files.length,
    'negative cases must not modify original trusted plan');
});
