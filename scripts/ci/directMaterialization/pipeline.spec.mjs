/** End-to-end direct materialization through the same credential-free Docker
 * worker used by CI. Inputs are synthetic repo-owned Stage fixtures; generated
 * plans come only from the real build-time Engine invoked by candidate TS.
 */
import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { runIsolatedMaterialization, workerImage } from './run-isolated.mjs';
import { deriveCourseEntityId } from '../../../shared/engine/generators/materializers/course/deriveCourseEntityId.mjs';
import { materializeCourseStage5 } from '../../../shared/engine/generators/materializers/course/materializeStage5.mjs';
import { buildTypedCourseManifest } from '../courseMaterialization/typed-course-direct.mjs';
import { verifyTypedCourseManifest } from '../courseMaterialization/typed-course-publish.mjs';
import {
  courseId,
  lessonId,
  reusedLessonId,
  overriddenLessonId,
  bankOwnerId,
  independentLessonConfig,
  lessonStage2,
  courseStage3,
  episodeStage2,
  questionStage3,
  flashcardStage3,
} from './fixtures/worker-inputs.mjs';

const require = createRequire(import.meta.url);
const { defineLesson } = require('../../../shared/engine/dist/build.js');
const { courseWorkflowStage3_Schema } = require('../../../shared/engine/dist/types/workflow/courseWorkflowFinal.schemas.js');
const trustedRoot = fileURLToPath(new URL('../../..', import.meta.url));
const textbook = 'content/math';
const courseRoot = textbook + '/data/courses/3/' + courseId;
const bankRoot = textbook + '/data/lessons/0/' + bankOwnerId;
const lessonRoot = textbook + '/data/lessons/1/' + lessonId;
const independentRoot = textbook + '/data/lessons/1/' + reusedLessonId;
const overriddenRoot = textbook + '/data/lessons/2/' + overriddenLessonId;
const paths = {
  course: courseRoot + '/draft.ts',
  episode: courseRoot + '/content/episodeOne/draft.ts',
  lesson: lessonRoot + '/draft.ts',
  questions: bankRoot + '/questions/draft.ts',
  flashcards: bankRoot + '/flashcards/draft.ts',
};
const git = (root, ...args) => execFileSync('git', ['-C', root, ...args], { encoding: 'utf8' }).trim();
const write = (root, relative, content) => {
  const filename = path.join(root, relative);
  fs.mkdirSync(path.dirname(filename), { recursive: true, mode: 0o755 });
  fs.writeFileSync(filename, content, { mode: 0o644 });
};
const typedCall = (fn, input) =>
  'import { ' + fn + " } from '@svitlo/engine/build';\n" + fn + '(' + JSON.stringify(input, null, 2) + ');\n';

test('all five entrypoints execute once from a separate clean Git candidate against ordinary trusted Engine build', () => {
  assert(
    fs.statSync(path.join(trustedRoot, 'shared/engine/dist/build.js')).isFile(),
    'CI must use the normal trusted npm Engine package build',
  );
  assert(
    fs.statSync(path.join(trustedRoot, 'node_modules')).isDirectory(),
    'CI must install only trusted dependencies',
  );
  const candidateRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-e2e-candidate-'));
  fs.chmodSync(candidateRoot, 0o755);
  try {
    write(
      candidateRoot,
      textbook + '/package.json',
      JSON.stringify({
        name: '@svitlo/math-fixture',
        type: 'module',
        private: true,
        imports: {
          '#lessonsData/*': './data/lessons/*.ts',
          '#coursesData/*': './data/courses/*.ts',
        },
      }),
    );
    write(
      candidateRoot,
      independentRoot + '/index.ts',
      "import { defineLesson } from '@svitlo/engine/build';\n" +
        'export const independentLesson = defineLesson(' +
        JSON.stringify(independentLessonConfig(), null, 2) +
        ');\n',
    );
    write(
      candidateRoot,
      overriddenRoot + '/index.ts',
      "import { defineLesson } from '@svitlo/engine/build';\n" +
        'export const overriddenLesson = defineLesson(' +
        JSON.stringify(independentLessonConfig(overriddenLessonId, 'overriddenLesson'), null, 2) +
        ');\n',
    );
    write(candidateRoot, paths.lesson, typedCall('materializeLessonStage6', lessonStage2()));
    const placeholder = {
      id: reusedLessonId,
      build: { overrides: () => ({ id: reusedLessonId }) },
    };
    const overriddenPlaceholder = {
      id: overriddenLessonId,
      build: { overrides: () => ({ id: overriddenLessonId }) },
    };
    const course = courseStage3(placeholder, overriddenPlaceholder);
    for (const slug of ['reused', 'overridden']) delete course.config.content.items[slug].production.source;
    delete course.config.content.items.overridden.production.existing;
    write(
      candidateRoot,
      paths.course,
      "import { materializeCourse } from '@svitlo/engine/build';\n" +
        "import { independentLesson } from '#lessonsData/1/" +
        reusedLessonId +
        "/index';\n" +
        "import { overriddenLesson } from '#lessonsData/2/" +
        overriddenLessonId +
        "/index';\n" +
        'const reviewed = ' +
        JSON.stringify(course, null, 2) +
        ';\n' +
        'reviewed.config.content.items.reused.production.source = independentLesson;\n' +
        'reviewed.config.content.items.overridden.production.source = overriddenLesson;\n' +
        'reviewed.config.content.items.overridden.production.existing = ' +
        'overriddenLesson.build.overrides(reviewed.config.content.items.overridden.production.sourcePatch, ' +
        "{ languages: ['uk'] });\n" +
        'materializeCourse(reviewed);\n',
    );
    const episodeId = deriveCourseEntityId(courseId, 'episode', 'content/episodeOne');
    write(candidateRoot, paths.episode, typedCall('materializeEpisodeStage5', episodeStage2(episodeId)));
    write(
      candidateRoot,
      bankRoot + '/constants.ts',
      "import type { SupportedLanguages } from '@svitlo/engine/build';\n" +
        "export const languages = ['uk'] as const satisfies SupportedLanguages;\n" +
        'export type Languages = typeof languages;\n',
    );
    write(candidateRoot, paths.questions, typedCall('materializeQuestionBank', questionStage3()));
    write(candidateRoot, paths.flashcards, typedCall('materializeFlashcardBank', flashcardStage3()));

    git(candidateRoot, 'init', '-q');
    git(candidateRoot, 'add', '.');
    execFileSync('git', [
      '-C',
      candidateRoot,
      '-c',
      'user.name=Svitlo CI',
      '-c',
      'user.email=ci@example.invalid',
      'commit',
      '-qm',
      'Synthetic source fixtures',
    ]);
    const head = git(candidateRoot, 'rev-parse', 'HEAD');
    assert.equal(git(candidateRoot, 'status', '--porcelain'), '');
    assert.notEqual(fs.realpathSync(candidateRoot), fs.realpathSync(trustedRoot));
    execFileSync('docker', ['pull', workerImage], { stdio: 'ignore' });
    const invoke = (operation, filename) => {
      const blob = git(candidateRoot, 'rev-parse', 'HEAD:' + filename);
      const actual = fs.readFileSync(path.join(candidateRoot, filename), 'utf8');
      assert.equal(
        git(candidateRoot, 'show', 'HEAD:' + filename),
        actual.trimEnd(),
        'one pinned source blob must be read from the real candidate Git tree',
      );
      return runIsolatedMaterialization({
        trustedRoot,
        candidateRoot,
        textbook,
        operation,
        source: {
          sourcePath: filename,
          sourceBlobSha: blob,
          sourceCommitSha: head,
          ...(['questions-stage5', 'flashcards-stage5'].includes(operation)
            ? { lessonConstantsBlobSha: git(candidateRoot, 'rev-parse', 'HEAD:' + bankRoot + '/constants.ts') }
            : {}),
        },
      });
    };
    // The fixtures are repository-owned, not candidate-controlled code. Validate
    // their real Build objects before testing the untrusted-source worker so a
    // schema/materializer regression is actionable without leaking sandbox logs.
    const trustedCourseFixture = courseStage3(
      defineLesson(independentLessonConfig()),
      defineLesson(independentLessonConfig(overriddenLessonId, 'overriddenLesson')),
    );
    const checkedCourse = courseWorkflowStage3_Schema.safeParse(trustedCourseFixture);
    assert.equal(checkedCourse.success, true, checkedCourse.error?.message);
    assert.equal(
      materializeCourseStage5(trustedCourseFixture, {
        textbookRoot: textbook,
        source: {
          sourcePath: paths.course,
          sourceBlobSha: git(candidateRoot, 'rev-parse', 'HEAD:' + paths.course),
        },
        verifySource: () => true,
      }).publishable,
      false,
    );

    const coursePlan = invoke('course-stage5', paths.course);
    assert.equal(coursePlan.publishable, false);
    assert.equal(coursePlan.inventory.lessons.length, 3);
    assert.equal(coursePlan.inventory.episodes.length, 1);
    assert.deepEqual(
      coursePlan.inventory.lessons.map(row => row.kind),
      ['new', 'reused', 'overridden'],
    );
    assert(coursePlan.files.some(f => f.path.startsWith(textbook + '/data/lessons/') && f.path.endsWith('/draft.ts')));
    assert(coursePlan.files.some(f => f.path === courseRoot + '/content/episodeOne/draft.ts'));
    // Course placements import independent Lessons directly; a sparse patch
    // belongs to its own placement, never to a Course-wide overrides sidecar.
    assert(!coursePlan.files.some(f => f.path.endsWith('/authoredCourseOverrides.ts')));
    const courseIndex = coursePlan.files.find(f => f.path === courseRoot + '/index.ts')?.content;
    assert(courseIndex, 'Course Stage 5 must emit its canonical index.ts');
    assert(courseIndex.includes('import { independentLesson as child_reused }'));
    assert(courseIndex.includes('import { overriddenLesson as child_overridden }'));
    assert(courseIndex.includes('"reused": child_reused'));
    assert(courseIndex.includes('"overridden": placeLesson(child_overridden, {'));
    assert(courseIndex.includes('"allowSkipping": false'));
    assert.equal(courseIndex.split('placeLesson(').length - 1, 1);
    const meta = {
      version: 2,
      operation: 'typed-course-stage5',
      repo: 'local/synthetic',
      number: 823,
      head,
      branch: 'fixture',
      actor: 'ci',
      courseId,
      textbookRoot: textbook,
      sourcePath: paths.course,
      sourceBlobSha: git(candidateRoot, 'rev-parse', 'HEAD:' + paths.course),
    };
    const manifest = buildTypedCourseManifest(meta, coursePlan);
    assert.doesNotThrow(() => verifyTypedCourseManifest(manifest, meta));

    const lesson = invoke('lesson-stage6', paths.lesson);
    assert.equal(lesson.publishable, false);
    assert(lesson.files.some(f => f.path === lessonRoot + '/index.ts'));
    assert(lesson.files.some(f => f.path.includes('/sections/intro/')));

    const episode = invoke('episode-stage5', paths.episode);
    assert.equal(episode.plan.publishable, false);
    assert.equal(episode.plan.episodeId, episodeId);
    assert(episode.plan.files.some(f => f.path === 'content/episodeOne/index.ts'));
    assert(episode.plan.files.some(f => f.path.includes('/sections/intro/')));

    const questions = invoke('questions-stage5', paths.questions);
    assert.equal(questions.plan.publishable, false);
    assert(questions.plan.files.some(f => f.path === 'questions/index.ts'));
    assert(questions.plan.files.some(f => f.path.includes('/selectOneAnswer/promptOne.ts')));

    const flashcards = invoke('flashcards-stage5', paths.flashcards);
    assert.equal(flashcards.plan.publishable, false);
    assert(flashcards.plan.files.some(f => f.path === 'flashcards/index.ts'));
    assert(flashcards.plan.files.some(f => f.path.includes('/alpha/content/front/index.ts')));
    assert.equal(
      git(candidateRoot, 'status', '--porcelain'),
      '',
      'all entrypoints run in a read-only worker without changing candidate source',
    );
  } finally {
    fs.rmSync(candidateRoot, { recursive: true, force: true });
  }
});
