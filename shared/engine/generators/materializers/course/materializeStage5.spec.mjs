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
  questionBankRequired: true,
  flashcardBankRequired: false,
  quizSectionRequired: true,
  flashcardsSectionRequired: false,
};
const lesson = slug => ({
  config: {
    type: 'lesson',
    slug,
    skills: [skill],
    locale: { title: { uk: 'Урок' } },
    params: { quizRequiredForCompletion: true },
  },
  production: {
    kind: 'new',
    methodology: 'Reviewed full factual and pedagogical specification',
    objective: 'Demonstrate the intended skill',
    depth: 'Introductory',
    sequenceReason: 'First observations before synthesis',
    assessmentEvidence: 'Describe observations',
    assessment,
  },
});
const episode = () => ({
  config: { type: 'episode' },
  production: { focus: 'Real reviewed focus', purpose: 'Actual narrative rationale' },
});
const unitMeta = {
  methodology: 'Unit pedagogical decisions',
  outcomes: { skills: [skill] },
  prerequisites: { skills: [] },
  depth: 'Early exploration',
  sequenceReason: 'Prepares the next unit',
};
const chapter = () => ({
  config: {
    type: 'chapter',
    slug: 'chapterOne',
    locale: { title: { uk: 'Розділ' } },
    content: { items: { lessonOne: lesson('lessonOne'), episodeOne: episode() }, order: ['lessonOne', 'episodeOne'] },
  },
  production: unitMeta,
});
const moduleNode = () => ({
  config: {
    type: 'module',
    slug: 'moduleOne',
    locale: { title: { uk: 'Модуль' } },
    content: { items: { chapterOne: chapter() }, order: ['chapterOne'] },
  },
  production: unitMeta,
});
const source = () => ({
  config: {
    type: 'course',
    id: rootId,
    slug: 'skyBasics',
    params: { age: { min: 6, max: 10 } },
    locale: { title: { uk: 'Небо' }, description: { uk: 'Спостереження' } },
    content: {
      items: { moduleOne: moduleNode(), directLesson: lesson('directLesson') },
      order: ['moduleOne', 'directLesson'],
    },
  },
  production: {
    languages: { document: 'uk', planned: ['uk'] },
    methodology: {
      purpose: 'Real educational need',
      audience: 'Learners aged 6-10',
      approach: 'Observe then reflect',
      depth: 'Introduction',
      accessibility: 'Keyboard and screen reader alternatives',
      scope: 'Daytime observations',
      entryConditions: 'No assumed astronomy knowledge',
      sourceNotes: 'Checked primary educational references',
    },
    outcomes: { explanation: 'Recognize patterns' },
    prerequisites: { explanation: 'None' },
    standardsAlignment: [],
    openDecisions: {},
  },
});
const root = 'content/playground/data/courses/3/' + rootId;
const options = () => ({
  textbookRoot: 'content/playground',
  source: {
    sourcePath: root + '/draft.ts',
    sourceBlobSha: sha,
  },
  verifySource: () => true,
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

test('Course emits its own allocated Lesson seed, not Stage 1 or a Configurator', () => {
  const lessonId = deriveCourseEntityId(rootId, 'lesson', 'directLesson');
  const result = materializeLessonDraft(lesson('directLesson'), {
    lessonId,
    languageContext: { document: 'uk', planned: ['uk', 'en'] },
    reviewedSourceSha: sha,
    textbookRoot: 'content/playground',
  });
  assert.equal(result.files.length, 1);
  assert.equal(
    result.files[0].path,
    'content/playground/data/lessons/' + lessonId.at(-1) + '/' + lessonId + '/draft.ts',
  );
  assert.match(result.files[0].content, /satisfies CourseWorkflowLessonSeed/);
  assert.match(result.files[0].content, /"quizSectionRequired": true/);
  assert.match(result.files[0].content, /"quizRequiredForCompletion": true/);
  const emitted = JSON.parse(
    result.files[0].content.split('export const lessonSeed = ')[1].split(' as const satisfies')[0],
  );
  const expected = lesson('directLesson');
  const { kind, ...proposal } = expected.production;
  assert.deepEqual(emitted, {
    config: { ...expected.config, id: lessonId },
    proposal,
    languageContext: { document: 'uk', planned: ['uk', 'en'] },
  });
  assert.equal(emitted.production, undefined);
  assert.doesNotMatch(result.files[0].content, /LessonWorkflowStage1/);
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
  assert.ok(paths.includes(root + '/content/moduleOne/chapterOne/episodeOne/draft.ts'));
  assert.ok(paths.includes(root + '/methodology.md'));
  assert.ok(paths.includes(root + '/languages.ts'));
  const lessonFiles = paths.filter(file => file.includes('/data/lessons/'));
  assert.equal(lessonFiles.length, 2);
  assert.deepEqual(first.pendingPlacements.map(p => p.slug).sort(), ['directLesson', 'lessonOne']);
  assert.ok(first.diagnostics.some(d => d.code === 'pending-lesson-stage1'));
  assert.ok(first.diagnostics.some(d => d.code === 'pending-episode-scenario'));
  assert.equal(first.sourcePath, root + '/draft.ts');
  assert.equal(first.materializedPath, root + '/index.ts');
  assert.equal(first.publishable, false);
  assert.match(
    first.files.find(f => f.path === root + '/index.ts').content,
    /TODO \(BLOCKER\): Course Stage 5 source is not publication approval/,
  );
  assert.doesNotMatch(first.files.find(f => f.path === root + '/index.ts').content, /import \{ directLesson /);
});

test('Course Stage 5 fails closed on unverified source, duplicate order and partial Lesson intent', () => {
  const unverified = options();
  unverified.verifySource = () => false;
  assert.throws(() => materializeCourseStage5(source(), unverified), /not independently verified/);
  const unordered = source();
  unordered.config.content.order = ['moduleOne', 'moduleOne'];
  assert.throws(() => materializeCourseStage5(unordered, options()), /order/);
  const incomplete = source();
  delete incomplete.config.content.items.directLesson.production.assessment;
  assert.throws(() => materializeCourseStage5(incomplete, options()), /four explicit assessment/);
  const unreviewedSource = options();
  delete unreviewedSource.source.sourceBlobSha;
  assert.throws(() => materializeCourseStage5(source(), unreviewedSource), /requires verified source/);
});

const reusedLessonId = '1368c1c9-2fd8-4007-b2c8-6bbfd98d5111';
const matching = {
  sourceSha: 'abcdef0123456789abcdef0123456789abcdef01',
  methodologySourcePath: 'content/playground/data/lessons/1/' + reusedLessonId + '/methodology.md',
  matchingRationale: 'Verified complete Skill and learner match',
  languageEvidence: 'Verified uk Lesson source',
};
function fakeLesson() {
  return {
    id: reusedLessonId,
    type: 'lesson',
    config: { base: { id: reusedLessonId, type: 'lesson', skills: [skill], params: { languages: ['uk'] } } },
    build: {
      props: () => ({ base: {}, locale: undefined }),
      overrides: (raw, selection) => {
        assert.deepEqual(selection.languages, ['uk']);
        assert.deepEqual(raw.params.sections, { allowSkipping: false });
        return {
          id: reusedLessonId,
          base: { locale: { title: 'Adapted' } },
          locale: { uk: { locale: { title: 'Adapted' } } },
        };
      },
    },
  };
}
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
      matching,
      assessment,
      source: fakeLesson(),
      sourceExportName: 'actualLesson',
      sourcePatch: { params: { sections: { allowSkipping: false } } },
      overrideRationale: 'Reviewed course-local title and exercise',
    },
  };
  return course;
}
function reuseOptions() {
  return options();
}
test('existing Lesson preserves source-authored plain Config patch and placement', () => {
  const result = materializeCourseStage5(patchedSource(), reuseOptions());
  const patchSource = result.files.find(file => file.path === root + '/authoredCourseOverrides.ts');
  assert.ok(patchSource);
  assert.match(patchSource.content, /allowSkipping/);
  assert.match(patchSource.content, /sections/);
  assert.match(patchSource.content, /"directLesson"/);
  assert.doesNotMatch(patchSource.content, /import \{ sharedSection \}/);
  const main = result.files.find(file => file.path === root + '/index.ts');
  assert.match(main.content, /export \{ authoredCourseOverrides \}/);
  const wrapper = result.files.find(file => file.path === root + '/content/directLesson/index.ts');
  assert.match(wrapper.content, /export \{ actualLesson as directLesson \}/);
  assert.equal(result.placements.find(p => p.slug === 'directLesson').lessonId, reusedLessonId);
});
test('existing Lesson refuses stale, absent or non-equivalent raw Build provenance', () => {
  const stale = patchedSource();
  delete stale.config.content.items.directLesson.production.sourcePatch;
  assert.throws(() => materializeCourseStage5(stale, reuseOptions()), /raw|patch/i);
  const incompatible = patchedSource();
  incompatible.config.content.items.directLesson.production.existing.base.locale.title = 'Different';
  assert.throws(() => materializeCourseStage5(incompatible, reuseOptions()), /does not reproduce/);
});

test('verified built sparse Lesson override round-trips through real Lesson and Course Build APIs', () => {
  const engineRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
  const { defineLesson, defineCourse } = createRequire(import.meta.url)(path.join(engineRoot, 'dist/build.js'));
  const realLesson = defineLesson({
    id: reusedLessonId,
    slug: 'independentLesson',
    type: 'lesson',
    skills: [skill],
    params: {
      languages: ['uk'],
      quizRequiredForCompletion: false,
      sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
    },
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
        kind: 'existing',
        existing: built,
        matching,
        assessment,
        overrideRationale: 'Verified Course-local navigation accommodation',
      },
    },
  };
  reviewed.config.content.order = ['reused'];
  reviewed.config.content.items.reused.production.source = realLesson;
  reviewed.config.content.items.reused.production.sourceExportName = 'independentLesson';
  reviewed.config.content.items.reused.production.sourcePatch = raw;
  const opts = options();
  const plan = materializeCourseStage5(reviewed, opts);
  const authoredPatchFile = plan.files.find(file => file.path === root + '/authoredCourseOverrides.ts');
  assert.match(authoredPatchFile.content, /allowSkipping/);
  const actualCourse = defineCourse({
    id: rootId,
    type: 'course',
    slug: 'skyBasics',
    params: { languages: ['uk'] },
    locale: { title: { uk: 'Небо' }, description: { uk: 'Основи' } },
    content: { items: { reused: realLesson }, order: ['reused'] },
  });
  const actualPatch = { content: { items: { reused: raw } } };
  const actualCourseBuild = actualCourse.build.overrides(actualPatch, { languages: ['uk'] });
  assert.equal(actualCourseBuild.base.content[0].params.sections.allowSkipping, true);
  assert.equal(realLesson.build.props({ languages: ['uk'] }).base.params.sections.allowSkipping, false);
});

test('existing Lesson fails closed for a mismatched Course Skill even if author supplied matching SHA', () => {
  const input = patchedSource();
  input.config.content.items.directLesson.config.skills = ['663572e7-bd85-4516-86e2-3de07d209e05'];
  assert.throws(
    () => materializeCourseStage5(input, reuseOptions()),
    /identity, SHA, Build API or source locale not verified/,
  );
});
test('non-plain Course patch Configurator cannot be serialized into TypeScript', () => {
  const input = patchedSource();
  input.config.content.items.directLesson.production.sourcePatch = {
    content: { items: { unsafe: { build: { props() {} } } } },
  };
  const opts = reuseOptions();
  assert.throws(() => materializeCourseStage5(input, opts), /JSON-safe/);
});

test('Course Lesson seed refuses an authored title without the reviewed document locale', () => {
  const source = lesson('notLocalized');
  source.config.locale.title = { en: 'Unreviewed English only' };
  assert.throws(
    () =>
      materializeLessonDraft(source, {
        lessonId: deriveCourseEntityId(rootId, 'lesson', 'notLocalized'),
        languageContext: { document: 'uk', planned: ['uk'] },
        reviewedSourceSha: sha,
        textbookRoot: 'content/playground',
      }),
    /reviewed source-language Lesson title/,
  );
});

test('inventory follows all four Episode nesting levels and retains repeated Lesson placements', () => {
  const input = patchedSource();
  const top = input.config.content;
  const module = top.items.moduleOne.config.content;
  const nested = module.items.chapterOne.config.content;
  top.items.directEpisode = episode();
  top.items.directChapter = chapter();
  top.items.directChapter.config.slug = 'directChapter';
  top.order = ['directEpisode', 'moduleOne', 'directChapter', 'directLesson'];
  module.items.moduleEpisode = episode();
  module.order = ['moduleEpisode', 'chapterOne'];
  nested.items.reused = {
    ...top.items.directLesson,
    config: { ...top.items.directLesson.config, slug: 'reused' },
    production: { ...top.items.directLesson.production, existing: { id: reusedLessonId } },
  };
  nested.order.push('reused');
  const result = materializeCourseStage5(input, reuseOptions());
  const { lessons, episodes } = result.inventory;
  assert.deepEqual(
    episodes.map(row => row.orderPath),
    [[0], [1, 0], [1, 1, 1], [2, 1]],
  );
  assert.deepEqual(
    episodes.map(row => row.slug),
    ['directEpisode', 'moduleEpisode', 'episodeOne', 'episodeOne'],
  );
  assert.equal(new Set(episodes.map(row => row.id)).size, 4);
  assert.ok(episodes.every(row => row.status === 'pending-episode-scenario' && row.sourcePath.endsWith('/draft.ts')));
  assert.equal(result.pendingEpisodes.length, 4);
  assert.ok(episodes.every(row => !result.files.some(file => file.path === row.placementPath + '/index.ts')));
  const repeated = lessons.filter(row => row.id === reusedLessonId);
  assert.deepEqual(
    repeated.map(row => row.kind),
    ['reused', 'overridden'],
  );
  assert.notEqual(repeated[0].placementPath, repeated[1].placementPath);
  assert.equal(repeated[0].sourcePath, repeated[1].sourcePath);
  assert.equal(lessons.filter(row => row.kind === 'new').length, 2);
  assert.deepEqual(result.inventory, materializeCourseStage5(input, reuseOptions()).inventory);
});


const assessmentSlot = (...dependencies) => ({
  config: {
    type: 'assessment',
    locale: { title: { uk: 'Підсумкове оцінювання' } },
  },
  production: { purpose: 'Check understanding after upstream Lessons', lessonDependencies: dependencies },
});

test('Course Stage 5 reserves Assessments at Course, Module and Chapter owners with verified upstream Lessons', () => {
  const input = source();
  const rootContent = input.config.content;
  const moduleContent = rootContent.items.moduleOne.config.content;
  const chapterContent = moduleContent.items.chapterOne.config.content;

  chapterContent.items.chapterReview = assessmentSlot('content/moduleOne/chapterOne/lessonOne');
  chapterContent.order.push('chapterReview');
  moduleContent.items.moduleReview = assessmentSlot('content/moduleOne/chapterOne/lessonOne');
  moduleContent.order.push('moduleReview');
  rootContent.items.finalReview = assessmentSlot(
    'content/moduleOne/chapterOne/lessonOne', 'content/directLesson',
  );
  rootContent.order.push('finalReview');

  const result = materializeCourseStage5(input, options());
  assert.equal(result.inventory.assessments.length, 3);
  assert.deepEqual(
    result.inventory.assessments.map(row => row.orderPath),
    [[0, 0, 2], [0, 1], [2]],
  );
  const paths = result.inventory.assessments.map(row => row.sourcePath);
  assert.deepEqual(paths, [
    root + '/content/moduleOne/chapterOne/content/chapterReview/draft.ts',
    root + '/content/moduleOne/content/moduleReview/draft.ts',
    root + '/content/finalReview/draft.ts',
  ]);
  for (const row of result.inventory.assessments) {
    assert.equal(row.id, deriveCourseEntityId(rootId, 'assessment',
      row.placementPath.slice((root + '/content/').length)));
    assert.equal(row.status, 'pending-assessment-design');
    const seed = result.files.find(file => file.path === row.sourcePath);
    const parent = result.files.find(file => file.path === row.placementSourcePath);
    assert.ok(seed?.content.includes('satisfies AssessmentWorkflowSeed'));
    assert.ok(parent?.content.includes('defineAssessment({ id: ' + JSON.stringify(row.id)));
    assert.ok(parent?.content.includes('TODO (BLOCKER): Not implemented'));
    assert.ok(parent?.content.includes('Not implemented'));
    assert.doesNotMatch(seed.content, /questionIds|defineQuizSection/);
    assert.ok(row.lessonDependencies.every(path => path.startsWith('content/')));
  }
  assert.deepEqual(result.inventory, materializeCourseStage5(input, options()).inventory);
});

test('Course Assessment placement rejects missing, forward, repeated and ambiguous Lesson dependencies', () => {
  const base = source();
  const content = base.config.content;
  content.items.finalReview = assessmentSlot('content/missingLesson');
  content.order.push('finalReview');
  assert.throws(() => materializeCourseStage5(base, options()), /unresolved|forward/);

  content.items.finalReview = assessmentSlot('content/directLesson', 'content/directLesson');
  assert.throws(() => materializeCourseStage5(base, options()), /duplicat/i);

  content.items.finalReview = assessmentSlot('content/directLesson');
  content.order.unshift(content.order.pop());
  assert.throws(() => materializeCourseStage5(base, options()), /unresolved|forward/);

  const another = source();
  another.config.content.items.finalReview = assessmentSlot('content/directLesson');
  another.config.content.order.push('finalReview');
  another.config.content.items.moduleOne.config.content.items.chapterOne.config.content.items.chapterReview =
    assessmentSlot('content/directLesson');
  const chapter = another.config.content.items.moduleOne.config.content.items.chapterOne.config.content;
  chapter.order.push('chapterReview');
  assert.throws(() => materializeCourseStage5(another, options()), /unresolved|forward/);
});
