import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { materializeCourseStage5 } from '../../../shared/engine/generators/materializers/course/materializeStage5.mjs';
import {
  courseStage3,
  independentLessonConfig,
  courseId,
  overriddenLessonId,
} from '../directMaterialization/fixtures/worker-inputs.mjs';

import { buildTypedCourseManifest, verifyCourseDependencies } from './typed-course-direct.mjs';
import { buildCourseCommitMetadata, verifyTypedCourseManifest } from './typed-course-publish.mjs';
import { manifestDigest } from './course-handoff-publish.mjs';
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

/** Author input stays inert; only this trusted test resolver supplies real Lessons. */
function approvedCourseOptions(sourcePath, sourceBlobSha, lessons) {
  return {
    textbookRoot: 'content/math',
    source: { sourcePath, sourceBlobSha },
    verifySource: () => true,
    resolveExistingLesson(request) {
      const configurator = lessons.find(lesson => lesson.id === request.id);
      if (!configurator) throw Error('Unapproved fixture Lesson ' + request.id);
      return { ...request, approved: true, configurator };
    },
  };
}
const plan = {
  sourcePath,
  sourceBlobSha: meta.sourceBlobSha,
  reviewCommitSha: meta.reviewCommitSha,
  courseId: id,
  publishable: false,
  materializedPath: index,
  files: [{ path: index, kind: 'typescript', content: 'export const course = 1;\n' }],
  inventory: { lessons: [], episodes: [], assessments: [] },
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
      inventory: {
        lessons: [{ placementPath: '../escape', kind: 'new', type: 'lesson' }],
        episodes: [],
        assessments: [],
      },
    }),
  );
});

test('Course publisher writes the canonical manifest digest into its commit proof', () => {
  const manifest = buildTypedCourseManifest(meta, plan);
  const { digest, message } = buildCourseCommitMetadata(meta, manifest);
  assert.equal(digest, manifestDigest(manifest));
  assert.equal(
    message,
    'Materialize reviewed typed Course ' +
      meta.courseId +
      '\n\nCourse-PR: #' +
      meta.number +
      '\nSource-Blob: ' +
      meta.sourceBlobSha +
      '\nCourse-Inventory-Manifest: ' +
      digest,
  );
});

test('existing Lesson commit revision preserves trailing source newline and rejects drift', t => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-lesson-revision-'));
  t.after(() => fs.rmSync(temporary, { recursive: true, force: true }));
  const candidate = path.join(temporary, 'candidate');
  const trusted = path.join(temporary, 'trusted');
  fs.mkdirSync(candidate);
  const git = (...args) => execFileSync('git', ['-C', candidate, ...args], { encoding: 'utf8' }).trim();
  git('init', '-q');
  git('config', 'user.email', 'course-fixture@example.test');
  git('config', 'user.name', 'Course Fixture');
  const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
  const filename = 'content/playground/data/lessons/c/' + lessonId + '/index.ts';
  const localFile = path.join(candidate, filename);
  fs.mkdirSync(path.dirname(localFile), { recursive: true });
  fs.writeFileSync(localFile, 'export const fixtureLesson = true;\n');
  git('add', filename);
  git('commit', '-qm', 'Reviewed existing Lesson');
  const lessonCommit = git('rev-parse', 'HEAD');
  const lessonBlob = git('rev-parse', 'HEAD:' + filename);
  execFileSync('git', ['clone', '-q', candidate, trusted], { encoding: 'utf8' });

  const row = {
    type: 'lesson',
    kind: 'reused',
    id: lessonId,
    sourcePath: filename,
    sourceSha: lessonCommit,
    placementPath: 'content/playground/data/courses/3/' + id + '/reused',
  };
  const revisionPlan = {
    courseId: id,
    publishable: false,
    inventory: { lessons: [row], episodes: [], assessments: [] },
  };
  assert.doesNotThrow(() => verifyCourseDependencies(meta, candidate, trusted, revisionPlan));
  assert.doesNotThrow(() =>
    verifyCourseDependencies(meta, candidate, trusted, {
      ...revisionPlan,
      inventory: {
        ...revisionPlan.inventory,
        lessons: [{ ...row, sourceSha: lessonBlob }],
      },
    }),
  );

  fs.writeFileSync(localFile, 'export const fixtureLesson = false;\n');
  git('add', filename);
  git('commit', '-qm', 'Change imported Lesson');
  assert.throws(
    () => verifyCourseDependencies(meta, candidate, trusted, revisionPlan),
    /Existing Lesson is not identical to its reviewed source revision/,
  );
});

test('actual Course source plan binds every generated Lesson seed and Episode handoff to the trusted manifest', () => {
  const build = fileURLToPath(new URL('../../../shared/engine/dist/build.js', import.meta.url));
  const { defineLesson } = createRequire(import.meta.url)(build);
  const firstLesson = defineLesson(independentLessonConfig());
  const overriddenLesson = defineLesson(independentLessonConfig(overriddenLessonId, 'overriddenLesson'));
  const actual = courseStage3();
  const sourcePath = 'content/math/data/courses/3/' + courseId + '/draft.ts';
  const pinned = {
    version: 2,
    operation: 'typed-course-stage5',
    repo: 'fixture/repo',
    number: 823,
    head: 'b'.repeat(40),
    branch: 'test',
    actor: 'tester',
    courseId,
    textbookRoot: 'content/math',
    sourcePath,
    sourceBlobSha: 'a'.repeat(40),
  };
  const plan = materializeCourseStage5(
    actual,
    approvedCourseOptions(sourcePath, pinned.sourceBlobSha, [firstLesson, overriddenLesson]),
  );
  assert.equal(plan.inventory.lessons.length, 3);
  assert.equal(plan.inventory.episodes.length, 1);
  const complete = buildTypedCourseManifest(pinned, plan);
  assert.equal(verifyTypedCourseManifest(complete, pinned), plan.files.length);
  // The existing Ready-PR Prettier may use single quotes in ordinary
  // static re-exports. This does not change the verified Lesson identity.
  const formattedReference = structuredClone(complete);
  const reused = formattedReference.inventory.lessons.find(row => row.kind === 'reused');
  const importedFile = formattedReference.entries.find(entry => entry.path === reused.placementSourcePath);
  const originalReference = Buffer.from(importedFile.data, 'base64').toString('utf8');
  const exactImport = '#lessonsData/' + reused.id.at(-1) + '/' + reused.id + '/index';
  const singleQuoted = originalReference.replace('from "' + exactImport + '";', "from '" + exactImport + "';");
  assert.notEqual(singleQuoted, originalReference);
  importedFile.data = Buffer.from(singleQuoted).toString('base64');
  importedFile.sha256 = createHash('sha256').update(singleQuoted).digest('hex');
  assert.equal(verifyTypedCourseManifest(formattedReference, pinned), plan.files.length);
  const overridden = complete.inventory.lessons.find(row => row.kind === 'overridden');
  assert.equal(overridden.overrideSourcePath, overridden.placementPath + '/index.ts');
  assert.equal(complete.entries.some(entry => entry.path === overridden.overrideSourcePath), true);
  const mutate = edit => {
    const manifest = structuredClone(complete);
    edit(manifest);
    assert.throws(
      () => verifyTypedCourseManifest(manifest, pinned),
      /inventory|handoff|seed|duplicate|Unregistered|missing|invalid|Malformed|Episode|reference|canonical import|Unsafe|placement|parent|stub|alias|syntax|Unexpected/i,
    );
  };
  const seed = complete.inventory.lessons.find(x => x.kind === 'new').sourcePath;
  const episode = complete.inventory.episodes[0].sourcePath;
  mutate(m => {
    m.entries = m.entries.filter(f => f.path !== seed);
  });
  mutate(m => {
    m.entries = m.entries.filter(f => f.path !== episode);
  });
  mutate(m => {
    m.inventory.lessons[0].id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
  });
  mutate(m => {
    m.inventory.episodes[0].orderPath = [0];
  });
  mutate(m => {
    m.inventory.episodes.push(structuredClone(m.inventory.episodes[0]));
  });
  mutate(m => {
    m.pendingPlacements = [];
  });
  // The sealed inventory must prove the stub is in the immediate owning
  // parent, not merely carry the pending Lesson's UUID and draft path.
  mutate(m => {
    const row = m.inventory.lessons.find(item => item.kind === 'new');
    row.placementSourcePath = row.sourcePath;
  });
  mutate(m => {
    const row = m.inventory.lessons.find(item => item.kind === 'new');
    const file = m.entries.find(item => item.path === row.stubSourcePath);
    const content = Buffer.from(file.data, 'base64').toString('utf8');
    const replacement = content.replace(
      'defineLessonStub({ id: "' + row.id + '"',
      'defineLessonStub({ id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa"',
    );
    assert.notEqual(replacement, content);
    file.data = Buffer.from(replacement).toString('base64');
    file.sha256 = createHash('sha256').update(replacement).digest('hex');
  });
  mutate(m => {
    const file = m.entries.find(item => item.path.endsWith('/constants.ts'));
    assert.ok(file);
    file.path = m.sourcePath.replace('/draft.ts', '/content/spurious/constants.ts');
  });

  mutate(m => {
    const row = m.inventory.lessons.find(item => item.kind === 'new');
    m.entries = m.entries.filter(file => file.path !== row.stubSourcePath);
  });
  mutate(m => {
    const row = m.inventory.lessons.find(item => item.kind === 'new');
    m.inventory.lessons.find(item => item.kind === 'new').stubSourcePath = row.sourcePath;
  });
  mutate(m => {
    const row = m.inventory.lessons.find(item => item.kind === 'new');
    const file = m.entries.find(item => item.path === row.stubSourcePath);
    const source = Buffer.from(file.data, 'base64').toString('utf8');
    const altered = source + 'process.exit(1);\n';
    file.data = Buffer.from(altered).toString('base64');
    file.sha256 = createHash('sha256').update(altered).digest('hex');
  });
  mutate(m => {
    const row = m.inventory.lessons.find(item => item.kind === 'new');
    const file = m.entries.find(item => item.path === row.placementSourcePath);
    const source = Buffer.from(file.data, 'base64').toString('utf8');
    const altered = source.replace('stub as child_' + row.slug, 'stub as wrong_' + row.slug);
    assert.notEqual(source, altered);
    file.data = Buffer.from(altered).toString('base64');
    file.sha256 = createHash('sha256').update(altered).digest('hex');
  });
  mutate(m => {
    const row = m.inventory.lessons.find(item => item.kind === 'new');
    const file = structuredClone(m.entries.find(entry => entry.path === row.stubSourcePath));
    file.path = m.sourcePath.replace('/draft.ts', '/content/foreign/stub.ts');
    m.entries.push(file);
  });
  mutate(m => {
    m.pendingEpisodes = [m.pendingEpisodes[0], m.pendingEpisodes[0]];
  });
  mutate(m => {
    const file = m.entries.find(f => f.path === seed);
    const text = Buffer.from(file.data, 'base64')
      .toString('utf8')
      .replace(m.inventory.lessons[0].id, 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa');
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
  mutate(m => {
    m.inventory.lessons[0].type = 'episode';
  });
  mutate(m => {
    const row = m.inventory.lessons.find(item => item.kind === 'overridden');
    row.overrideSourcePath = row.placementSourcePath;
  });
  mutate(m => {
    const row = m.inventory.lessons.find(item => item.kind === 'overridden');
    m.entries = m.entries.filter(file => file.path !== row.overrideSourcePath);
  });
  mutate(m => {
    const row = m.inventory.lessons.find(item => item.kind === 'overridden');
    const file = m.entries.find(item => item.path === row.overrideSourcePath);
    const source = Buffer.from(file.data, 'base64').toString('utf8');
    const altered = source.replace('placeLesson(originalLesson, ', 'placeLesson(wrongLesson, ');
    assert.notEqual(altered, source);
    file.data = Buffer.from(altered).toString('base64');
    file.sha256 = createHash('sha256').update(altered).digest('hex');
  });
    mutate(m => {
    const row = m.inventory.lessons.find(item => item.kind === 'reused');
    const file = m.entries.find(item => item.path === row.placementSourcePath);
    const source = Buffer.from(file.data, 'base64').toString('utf8');
    const expected = '#lessonsData/' + row.id.at(-1) + '/' + row.id + '/index';
    const other = '#lessonsData/' + overriddenLessonId.at(-1) + '/' + overriddenLessonId + '/index';
    assert(source.includes(expected));
    const altered = source.replace(expected, other);
    file.data = Buffer.from(altered).toString('base64');
    file.sha256 = createHash('sha256').update(altered).digest('hex');
  });
  assert.equal(
    verifyTypedCourseManifest(complete, pinned),
    plan.files.length,
    'negative cases must not modify original trusted plan',
  );
});

test('trusted Course manifest seals Assessment seed, imported stub and upstream Lesson inventory', () => {
  const build = fileURLToPath(new URL('../../../shared/engine/dist/build.js', import.meta.url));
  const { defineLesson } = createRequire(import.meta.url)(build);
  const firstLesson = defineLesson(independentLessonConfig());
  const overriddenLesson = defineLesson(independentLessonConfig(overriddenLessonId, 'overriddenLesson'));
  const actual = courseStage3();
  actual.config.content.items.finalReview = {
    config: { type: 'assessment', locale: { title: { uk: 'Перевірка' } } },
    production: {
      purpose: 'Measure transfer after the reviewed Lessons',
      lessonDependencies: ['newLesson', 'reused'],
    },
  };
  actual.config.content.order.push('finalReview');
  const sourcePath = 'content/math/data/courses/3/' + courseId + '/draft.ts';
  const pinned = {
    ...meta,
    repo: 'fixture/repo',
    head: 'b'.repeat(40),
    branch: 'test',
    actor: 'tester',
    courseId,
    textbookRoot: 'content/math',
    sourcePath,
    sourceBlobSha: 'a'.repeat(40),
  };
  const plan = materializeCourseStage5(
    actual,
    approvedCourseOptions(sourcePath, pinned.sourceBlobSha, [firstLesson, overriddenLesson]),
  );
  assert.equal(plan.inventory.assessments.length, 1);
  const [row] = plan.inventory.assessments;
  assert.deepEqual(row.lessonDependencies, ['newLesson', 'reused']);
  assert.match(plan.files.find(f => f.path === row.stubSourcePath).content, /defineAssessmentStub\(\{/);
  const sealed = buildTypedCourseManifest(pinned, plan);
  assert.equal(verifyTypedCourseManifest(sealed, pinned), plan.files.length);
  const mutate = patch => {
    const copy = structuredClone(sealed);
    patch(copy);
    assert.throws(
      () => verifyTypedCourseManifest(copy, pinned),
      /Assessment|inventory|seed|duplicate|handoff|generated|invalid/i,
    );
  };
  mutate(m => {
    m.inventory.assessments[0].id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
  });
  mutate(m => {
    m.inventory.assessments[0].lessonDependencies = ['notReviewed'];
  });
  mutate(m => {
    m.entries = m.entries.filter(f => f.path !== row.sourcePath);
  });
  mutate(m => {
    m.inventory.assessments.push(structuredClone(m.inventory.assessments[0]));
  });
  assert.equal(verifyTypedCourseManifest(sealed, pinned), plan.files.length);
});

test('Course publisher accepts all three generated inert default-export seeds under sealed SHA256', () => {
  const build = fileURLToPath(new URL('../../../shared/engine/dist/build.js', import.meta.url));
  const { defineLesson } = createRequire(import.meta.url)(build);
  const firstLesson = defineLesson(independentLessonConfig());
  const overriddenLesson = defineLesson(independentLessonConfig(overriddenLessonId, 'overriddenLesson'));
  const course = courseStage3();
  course.config.content.items.finalReview = {
    config: { type: 'assessment', locale: { title: { uk: 'Перевірка' } } },
    production: {
      purpose: 'Measure transfer',
      lessonDependencies: ['newLesson', 'reused'],
    },
  };
  course.config.content.order.push('finalReview');
  const sourcePath = 'content/math/data/courses/3/' + courseId + '/draft.ts';
  const pinned = {
    ...meta,
    sourcePath,
    sourceBlobSha: 'a'.repeat(40),
    head: 'b'.repeat(40),
    courseId,
    textbookRoot: 'content/math',
  };
  const plan = materializeCourseStage5(
    course,
    approvedCourseOptions(sourcePath, pinned.sourceBlobSha, [firstLesson, overriddenLesson]),
  );
  const sealed = buildTypedCourseManifest(pinned, plan);
  assert.equal(verifyTypedCourseManifest(sealed, pinned), plan.files.length);
  const found = new Set();
  for (const entry of sealed.entries) {
    const emitted = Buffer.from(entry.data, 'base64').toString('utf8');
    const contract = emitted.match(
      /export default [\s\S]* satisfies (CourseWorkflowLessonSeed|EpisodeWorkflowStage1Handoff|AssessmentWorkflowSeed);/,
    );
    if (!contract) continue;
    found.add(contract[1]);
    assert.doesNotMatch(emitted, /export const (?:lessonSeed|episodeStage1|assessmentSeed) = /);
    assert.doesNotMatch(emitted, /materialize(?:Lesson|Episode|Assessment)\(/);
  }
  assert.deepEqual([...found].sort(), [
    'AssessmentWorkflowSeed',
    'CourseWorkflowLessonSeed',
    'EpisodeWorkflowStage1Handoff',
  ]);
  assert.equal(verifyTypedCourseManifest(sealed, pinned), plan.files.length);
});

test('trusted publisher accepts all pending stub kinds in a direct Course Chapter', () => {
  const build = fileURLToPath(new URL('../../../shared/engine/dist/build.js', import.meta.url));
  const { defineLesson } = createRequire(import.meta.url)(build);
  const course = courseStage3();
  const { newLesson, episodeOne, reused, overridden } = course.config.content.items;
  course.config.content = {
    items: {
      directChapter: {
        config: {
          type: 'chapter',
          slug: 'directChapter',
          locale: { title: { uk: 'Розділ' } },
          content: {
            items: {
              newLesson,
              episodeOne,
              chapterReview: {
                config: { type: 'assessment', locale: { title: { uk: 'Перевірка' } } },
                production: {
                  purpose: 'Measure transfer',
                  lessonDependencies: ['directChapter/newLesson'],
                },
              },
            },
            order: ['newLesson', 'episodeOne', 'chapterReview'],
          },
        },
        production: {
          methodology: 'Observe and reflect',
          outcomes: { skills: [] },
          prerequisites: { skills: [] },
          depth: 'Introductory',
          sequenceReason: 'Prepare later practice',
        },
      },
      reused,
      overridden,
    },
    order: ['directChapter', 'reused', 'overridden'],
  };
  const sourcePath = 'content/math/data/courses/3/' + courseId + '/draft.ts';
  const pinned = {
    ...meta,
    courseId,
    textbookRoot: 'content/math',
    sourcePath,
    sourceBlobSha: 'a'.repeat(40),
  };
  const plan = materializeCourseStage5(
    course,
    approvedCourseOptions(sourcePath, pinned.sourceBlobSha, [
      defineLesson(independentLessonConfig()),
      defineLesson(independentLessonConfig(overriddenLessonId, 'overriddenLesson')),
    ]),
  );
  const rows = [...plan.inventory.lessons, ...plan.inventory.episodes, ...plan.inventory.assessments].filter(
    row => row.stubSourcePath,
  );
  assert.equal(rows.length, 3);
  assert.ok(rows.every(row => row.placementSourcePath.endsWith('/directChapter/index.ts')));
  assert.equal(verifyTypedCourseManifest(buildTypedCourseManifest(pinned, plan), pinned), plan.files.length);
});
