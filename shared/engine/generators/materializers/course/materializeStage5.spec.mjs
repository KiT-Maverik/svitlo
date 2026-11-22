import assert from 'node:assert/strict';
import test from 'node:test';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { deriveCourseEntityId } from './deriveCourseEntityId.mjs';
import { materializeLessonDraft } from './lessonDraft.mjs';
import { materializeCourseStage5 } from './materializeStage5.mjs';

const rootId = '663572e7-bd85-4516-86e2-3de07d209e03';
const skill = '663572e7-bd85-4516-86e2-3de07d209e04';
const sha = '0123456789abcdef0123456789abcdef01234567';
const assessment = {
  questionBankRequired: true, flashcardBankRequired: false,
  quizSectionRequired: true, flashcardsSectionRequired: false,
};
const lesson = slug => ({
  config: { type: 'lesson', slug, skills: [skill], locale: { title: { uk: 'Урок' } },
    params: { quizRequiredForCompletion: true } },
  production: { kind: 'new', methodology: 'Reviewed full factual and pedagogical specification',
    objective: 'Demonstrate the intended skill', depth: 'Introductory',
    sequenceReason: 'First observations before synthesis',
    assessmentEvidence: 'Describe observations', assessment },
});
const episode = () => ({
  config: { type: 'episode' },
  production: { focus: 'Real reviewed focus', purpose: 'Actual narrative rationale' },
});
const unitMeta = {
  methodology: 'Unit pedagogical decisions', outcomes: { skills: [skill] },
  prerequisites: { skills: [] }, depth: 'Early exploration', sequenceReason: 'Prepares the next unit',
};
const chapter = () => ({
  config: { type: 'chapter', slug: 'chapterOne', locale: { title: { uk: 'Розділ' } },
    content: { items: { lessonOne: lesson('lessonOne'), episodeOne: episode() },
      order: ['lessonOne', 'episodeOne'] } },
  production: unitMeta,
});
const moduleNode = () => ({
  config: { type: 'module', slug: 'moduleOne', locale: { title: { uk: 'Модуль' } },
    content: { items: { chapterOne: chapter() }, order: ['chapterOne'] } },
  production: unitMeta,
});
const source = () => ({
  config: { type: 'course', id: rootId, slug: 'skyBasics', params: { age: { min: 6, max: 10 } },
    locale: { title: { uk: 'Небо' }, description: { uk: 'Спостереження' } },
    content: { items: { moduleOne: moduleNode(), directLesson: lesson('directLesson') },
      order: ['moduleOne', 'directLesson'] } },
  production: { languages: { document: 'uk', planned: ['uk'] },
    methodology: {
      purpose: 'Real educational need', audience: 'Learners aged 6-10',
      approach: 'Observe then reflect', depth: 'Introduction',
      accessibility: 'Keyboard and screen reader alternatives',
      scope: 'Daytime observations', entryConditions: 'No assumed astronomy knowledge',
      sourceNotes: 'Checked primary educational references',
    },
    outcomes: { explanation: 'Recognize patterns' },
    prerequisites: { explanation: 'None' }, standardsAlignment: [], openDecisions: {} },
});
const root = 'content/playground/data/courses/3/' + rootId;
const options = () => ({
  textbookRoot: 'content/playground',
  review: { sourcePath: root + '/index.ts', sourceBlobSha: sha, reviewCommitSha: sha,
    reviewer: 'independent-methodologist', evidenceUrl: 'https://github.com/KiT-Maverik/svitlo/pull/123' },
  verifyReviewedSource: () => true,
});

test('historical UUID namespace uses full placement and remains deterministic on retry', () => {
  const top = deriveCourseEntityId(rootId, 'lesson', 'directLesson');
  const nested = deriveCourseEntityId(rootId, 'lesson', 'moduleOne/chapterOne/lessonOne');
  assert.match(top, /^[0-9a-f-]{36}$/);
  assert.equal(top, deriveCourseEntityId(rootId, 'lesson', 'directLesson'));
  assert.notEqual(top, nested);
  assert.notEqual(deriveCourseEntityId(rootId, 'chapter', 'moduleOne/chapterOne'), nested);
  assert.throws(() => deriveCourseEntityId(rootId, 'lesson', '../escape'), /invalid deterministic/);
});

test('Lesson Draft emits exactly the independent typed Stage 1 source and no Configurator', () => {
  const lessonId = deriveCourseEntityId(rootId, 'lesson', 'directLesson');
  const result = materializeLessonDraft(lesson('directLesson'), {
    lessonId, sourceLanguage: 'uk', plannedLanguages: ['uk', 'en'],
    reviewedSourceSha: sha, textbookRoot: 'content/playground',
  });
  assert.equal(result.files.length, 1);
  assert.equal(result.files[0].path, 'content/playground/data/lessons/' +
    lessonId.at(-1) + '/' + lessonId + '/index.ts');
  assert.match(result.files[0].content, /satisfies LessonWorkflowStage1/);
  assert.match(result.files[0].content, /"quizSectionRequired": true/);
  assert.match(result.files[0].content, /"quizRequiredForCompletion": true/);
  assert.match(result.files[0].content, /"sourceEvidence":/);
  assert.doesNotMatch(result.files[0].content, /defineLesson\(|defineQuizSection|feedc0de-/);
  assert.equal(result.diagnostics[0].severity, 'blocker');
});

test('Course Stage 5 composes nested modules, chapters, episode intents and new-Lesson handoffs', () => {
  const first = materializeCourseStage5(source(), options());
  const second = materializeCourseStage5(source(), options());
  assert.deepEqual(first.files, second.files);
  const paths = first.files.map(file => file.path);
  assert.ok(paths.includes(root + '/index.ts'));
  assert.ok(paths.includes(root + '/content/moduleOne/chapterOne/index.ts'));
  assert.ok(paths.includes(root + '/content/moduleOne/chapterOne/episodeOne/index.ts'));
  assert.ok(paths.includes(root + '/methodology.md'));
  assert.ok(paths.includes(root + '/languages.ts'));
  const lessonFiles = paths.filter(file => file.includes('/data/lessons/'));
  assert.equal(lessonFiles.length, 2);
  assert.deepEqual(first.pendingPlacements.map(p => p.slug).sort(), ['directLesson', 'lessonOne']);
  assert.ok(first.diagnostics.some(d => d.code === 'pending-lesson-stage1'));
  assert.ok(first.diagnostics.some(d => d.code === 'pending-episode-scenario'));
  assert.equal(first.sourcePath, root + '/index.ts');
  assert.equal(first.sourceArchivePath, root + '/workflow.stage3.ts');
  assert.equal(first.publishable, false);
  assert.doesNotMatch(first.files.find(f => f.path === root + '/index.ts').content,
    /import \{ directLesson /);
});

test('Course Stage 5 fails closed on unauthorized review, duplicate order and partial Lesson intent', () => {
  const noReview = options();
  noReview.verifyReviewedSource = () => false;
  assert.throws(() => materializeCourseStage5(source(), noReview), /not independently authorized/);
  const unordered = source();
  unordered.config.content.order = ['moduleOne', 'moduleOne'];
  assert.throws(() => materializeCourseStage5(unordered, options()), /order/);
  const incomplete = source();
  delete incomplete.config.content.items.directLesson.production.assessment;
  assert.throws(() => materializeCourseStage5(incomplete, options()), /four explicit assessment/);
  const unreviewedSource = options();
  delete unreviewedSource.review.sourceBlobSha;
  assert.throws(() => materializeCourseStage5(source(), unreviewedSource), /requires verified source/);
});

const reusedLessonId = '1368c1c9-2fd8-4007-b2c8-6bbfd98d5111';
const matching = {
  sourceSha: 'abcdef0123456789abcdef0123456789abcdef01',
  methodologySourcePath: 'content/playground/data/lessons/1/' + reusedLessonId + '/methodology.md',
  matchingRationale: 'Verified complete Skill and learner match',
  languageEvidence: 'Verified uk Lesson source',
};
function patchedSource() {
  const course = source();
  course.config.content.items.directLesson = {
    config: { type: 'lesson', slug: 'directLesson', skills: [skill] },
    production: {
      kind: 'existing',
      existing: {
        id: reusedLessonId,
        base: { locale: { title: 'Adapted' } },
        locale: { uk: { locale: { title: 'Adapted' } } },
      },
      matching, assessment, overrideRationale: 'Reviewed course-local title and exercise',
    },
  };
  return course;
}
function reuseOptions() {
  const params = options();
  params.resolveExistingLesson = () => ({
    id: reusedLessonId, sourceSha: matching.sourceSha,
    languages: ['uk'],
    exportName: 'actualLesson',
    importPath: '#lessonsData/1/' + reusedLessonId + '/index',
    configurator: {
      id: reusedLessonId, type: 'lesson',
      config: { base: { id: reusedLessonId, type: 'lesson',
        skills: [skill], params: { languages: ['uk'] } } },
      build: {
        props: () => ({ base: {}, locale: undefined }),
        overrides: (raw, selection) => {
          assert.deepEqual(selection.languages, ['uk']);
          assert.ok(raw.section.additionalItems.bridge);
          return { id: reusedLessonId,
            base: { locale: { title: 'Adapted' } },
            locale: { uk: { locale: { title: 'Adapted' } } } };
        },
      },
    },
    rawPatch: { section: { additionalItems: {
      bridge: { type: 'content', build: { props: () => ({}) } },
    } } },
    rawPatchSource: '{ section: { additionalItems: { bridge: sharedSection } } }',
    rawPatchSourceSha: sha,
    rawPatchImports: ['import { sharedSection } from "#lessonsData/sharedSections";'],
  });
  return params;
}
test('existing Lesson preserves verified TypeScript Configurator patch expressions and placement', () => {
  const result = materializeCourseStage5(patchedSource(), reuseOptions());
  const patchSource = result.files.find(file => file.path === root + '/authoredCourseOverrides.ts');
  assert.ok(patchSource);
  assert.match(patchSource.content, /sharedSection/);
  assert.match(patchSource.content, /additionalItems/);
  assert.match(patchSource.content, /"directLesson"/);
  assert.match(patchSource.content, /import \{ sharedSection \}/);
  const main = result.files.find(file => file.path === root + '/index.ts');
  assert.match(main.content, /export \{ authoredCourseOverrides \}/);
  const wrapper = result.files.find(file => file.path === root + '/content/directLesson/index.ts');
  assert.match(wrapper.content, /export \{ actualLesson as directLesson \}/);
  assert.equal(result.placements.find(p => p.slug === 'directLesson').lessonId, reusedLessonId);
});
test('existing Lesson refuses stale, absent or non-equivalent raw Build provenance', () => {
  const stale = reuseOptions();
  const resolver = stale.resolveExistingLesson;
  stale.resolveExistingLesson = (...args) => ({
    ...resolver(...args), rawPatchSourceSha: '0'.repeat(40),
  });
  assert.throws(() => materializeCourseStage5(patchedSource(), stale), /not pinned/);
  const incompatible = patchedSource();
  incompatible.config.content.items.directLesson.production.existing.base.locale.title = 'Different';
  assert.throws(() => materializeCourseStage5(incompatible, reuseOptions()), /does not reproduce/);
});

test('verified built sparse Lesson override round-trips through real Lesson and Course Build APIs', () => {
  const engineRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
  const { defineLesson, defineCourse } = createRequire(import.meta.url)(
    path.join(engineRoot, 'dist/build.js'));
  const realLesson = defineLesson({
    id: reusedLessonId, slug: 'independentLesson', type: 'lesson', skills: [skill],
    params: { languages: ['uk'], quizRequiredForCompletion: false,
      sections: { allowNavigation: true, allowSkipping: false, showIndexes: true } },
    locale: { title: { uk: 'Самостійний урок' } },
    section: { items: {}, order: [] },
  });
  const raw = { params: { sections: { allowSkipping: true } } };
  const built = realLesson.build.overrides(raw, { languages: ['uk'] });
  assert.equal(built.base.params.sections.allowSkipping, true);
  const reviewed = source();
  reviewed.config.content.items = {
    reused: {
      config: { type: 'lesson', slug: 'reused', skills: [skill] },
      production: {
        kind: 'existing', existing: built, matching, assessment,
        overrideRationale: 'Verified Course-local navigation accommodation',
      },
    },
  };
  reviewed.config.content.order = ['reused'];
  const opts = options();
  opts.resolveExistingLesson = () => ({
    id: reusedLessonId, sourceSha: matching.sourceSha,
    languages: ['uk'], exportName: 'independentLesson',
    importPath: '#lessonsData/1/' + reusedLessonId + '/index',
    configurator: realLesson, rawPatch: raw,
  });
  const plan = materializeCourseStage5(reviewed, opts);
  const authoredPatchFile = plan.files.find(file => file.path === root + '/authoredCourseOverrides.ts');
  assert.match(authoredPatchFile.content, /allowSkipping/);
  const actualCourse = defineCourse({
    id: rootId, type: 'course', slug: 'skyBasics',
    params: { languages: ['uk'] },
    locale: { title: { uk: 'Небо' }, description: { uk: 'Основи' } },
    content: { items: { reused: realLesson }, order: ['reused'] },
  });
  const actualPatch = { content: { items: { reused: raw } } };
  const actualCourseBuild = actualCourse.build.overrides(actualPatch, { languages: ['uk'] });
  assert.equal(actualCourseBuild.base.content[0].params.sections.allowSkipping, true);
  assert.equal(realLesson.build.props({ languages: ['uk'] }).base.params.sections.allowSkipping, false);
});

test('existing Lesson fails closed for a mismatched Course Skill even if resolver claims same SHA', () => {
  const input = patchedSource();
  input.config.content.items.directLesson.config.skills =
    ['663572e7-bd85-4516-86e2-3de07d209e05'];
  assert.throws(() => materializeCourseStage5(input, reuseOptions()), /identity, SHA, Build API or source locale not verified/);
});
test('reviewed patch expression rejects executable side-effect imports', () => {
  const input = patchedSource();
  const opts = reuseOptions();
  const resolver = opts.resolveExistingLesson;
  opts.resolveExistingLesson = (...args) => ({
    ...resolver(...args),
    rawPatchImports: ['import "unsafe-side-effect";'],
  });
  assert.throws(() => materializeCourseStage5(input, opts), /side-effect-only patch import/);
});
