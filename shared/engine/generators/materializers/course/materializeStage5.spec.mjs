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
  resolveSkill: ({ id }) => ({
    approved: true,
    id,
    slug: 'sampleSkill',
    exportName: 'sampleSkill',
    importPath: '#skillsData/sampleSkill',
    sourcePath: 'content/playground/data/skills/sampleSkill.ts',
    sourceSha: sha,
    configurator: {
      id,
      slug: 'sampleSkill',
      type: 'skill',
      config: { base: { id, slug: 'sampleSkill' } },
      build: { props() {} },
    },
  }),
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
  assert.match(result.files[0].content, /export default \{/);
  assert.match(result.files[0].content, /"quizSectionRequired": true/);
  assert.match(result.files[0].content, /"quizRequiredForCompletion": true/);
  const emitted = JSON.parse(
    result.files[0].content.split('export default ')[1].split(' satisfies CourseWorkflowLessonSeed')[0],
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
  assert.ok(paths.includes(root + '/moduleOne/chapterOne/index.ts'));
  assert.ok(paths.includes(root + '/moduleOne/chapterOne/episodeOne/draft.ts'));
  assert.ok(paths.includes(root + '/methodology.md'));
  assert.ok(paths.includes(root + '/constants.ts'));
  assert.ok(!paths.includes(root + '/languages.ts'));
  assert.ok(!paths.includes(root + '/authoredCourseOverrides.ts'));
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
  const rootContent = first.files.find(f => f.path === root + '/index.ts').content;
  const chapterContent = first.files.find(f => f.path === root + '/moduleOne/chapterOne/index.ts').content;
  assert.match(rootContent, /"directLesson": child_directLesson/);
  assert.match(rootContent, /order: \["moduleOne","directLesson"\]/);
  assert.match(rootContent, /#coursesData\/3\/663572e7-bd85-4516-86e2-3de07d209e03\/constants/);
  assert.match(chapterContent, /#skillsData\/sampleSkill/);
  assert.match(chapterContent, /import \{ sampleSkill \} from/);
  assert.match(chapterContent, /sampleSkill\.id/);
  assert.match(chapterContent, /"lessonOne": child_lessonOne/);
  assert.match(chapterContent, /"episodeOne": child_episodeOne/);
  assert.match(chapterContent, /order: \["lessonOne","episodeOne"\]/);
  assert.doesNotMatch(rootContent, /Reviewed original content order|Pending handoffs|const languages =/);
  const constants = first.files.find(f => f.path === root + '/constants.ts').content;
  assert.match(constants, /export type Languages = typeof languages/);
});

test('parent indices preserve literal content slugs without a structural content folder', () => {
  const input = source();
  const module = input.config.content.items.moduleOne;
  module.config.slug = 'content';
  input.config.content.items.content = module;
  delete input.config.content.items.moduleOne;
  input.config.content.order = ['content', 'directLesson'];
  const chapter = module.config.content.items.chapterOne;
  chapter.config.slug = 'content';
  module.config.content.items.content = chapter;
  delete module.config.content.items.chapterOne;
  module.config.content.order = ['content'];

  const plan = materializeCourseStage5(input, options());
  const [nested] = plan.inventory.lessons.filter(row => row.slug === 'lessonOne');
  assert.equal(nested.placementSourcePath, root + '/content/content/index.ts');
  const direct = plan.inventory.lessons.find(row => row.slug === 'directLesson');
  assert.equal(direct.placementSourcePath, root + '/index.ts');
  assert.ok(plan.files.find(file => file.path === nested.placementSourcePath)?.content.includes('child_lessonOne'));
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
      existing: { id: reusedLessonId },
      matching,
      assessment,
      sourceExportName: 'actualLesson',
      sourcePatch: { params: { sections: { allowSkipping: false } } },
      overrideRationale: 'Reviewed course-local title and exercise',
    },
  };
  return course;
}
function reuseOptions(configurator = fakeLesson()) {
  return {
    ...options(),
    resolveExistingLesson(request) {
      assert.equal(request.id, reusedLessonId);
      assert.equal(request.sourceSha, matching.sourceSha);
      assert.equal(request.importPath, '#lessonsData/1/' + reusedLessonId + '/index');
      return {
        approved: true,
        id: request.id,
        sourceSha: request.sourceSha,
        importPath: request.importPath,
        exportName: request.exportName,
        configurator,
      };
    },
  };
}
test('existing Lesson preserves source-authored plain Config patch and placement', () => {
  const result = materializeCourseStage5(patchedSource(), reuseOptions());
  assert.equal(
    result.files.some(file => file.path.endsWith('authoredCourseOverrides.ts')),
    false,
  );
  const wrapper = result.files.find(file => file.path === root + '/directLesson/index.ts');
  assert.ok(wrapper, 'overridden Lesson must own its Course-local module');
  assert.match(wrapper.content, /import \{ actualLesson as originalLesson \} from "#lessonsData\//);
  assert.match(wrapper.content, /export const placedLesson = placeLesson\(originalLesson, \{/);
  assert.match(wrapper.content, /"allowSkipping": false/);
  const main = result.files.find(file => file.path === root + '/index.ts');
  assert.match(main.content, /import \{ placedLesson as child_directLesson \} from "\.\/directLesson"/);
  assert.match(main.content, /"directLesson": child_directLesson/);
  assert.doesNotMatch(main.content, /placeLesson\(/);
  assert.doesNotMatch(main.content, /authoredCourseOverrides/);
  assert.equal(
    result.inventory.lessons.find(row => row.slug === 'directLesson').placementSourcePath,
    root + '/index.ts',
  );
  assert.equal(result.inventory.lessons.find(row => row.slug === 'directLesson').overrideSourcePath, root + '/directLesson/index.ts');
  assert.equal(result.placements.find(p => p.slug === 'directLesson').lessonId, reusedLessonId);
});
test('reused Lesson UUID may occupy two direct Course placements with independent patches', () => {
  const input = patchedSource();
  const original = input.config.content.items.directLesson;
  input.config.content.items.secondLesson = {
    config: { ...original.config, slug: 'secondLesson' },
    production: {
      ...original.production,
      existing: { id: reusedLessonId },
      sourcePatch: undefined,
      overrideRationale: undefined,
    },
  };
  input.config.content.order.push('secondLesson');
  const result = materializeCourseStage5(input, reuseOptions());
  const references = result.inventory.lessons.filter(row => row.id === reusedLessonId);
  assert.deepEqual(
    references.map(row => row.kind),
    ['overridden', 'reused'],
  );
  assert.deepEqual(
    references.map(row => row.placementSourcePath),
    [root + '/index.ts', root + '/index.ts'],
  );
  assert.equal(references[0].sourcePath, references[1].sourcePath);
  assert.equal(
    result.files.some(file => file.path === root + '/secondLesson/index.ts'),
    false,
  );
  const index = result.files.find(file => file.path === root + '/index.ts').content;
  assert.match(index, /"directLesson": child_directLesson/);
  assert.match(index, /import \{ placedLesson as child_directLesson \} from "\.\/directLesson"/);
  assert.match(index, /"secondLesson": child_secondLesson/);
  assert.match(index, /order: \["moduleOne","directLesson","secondLesson"\]/);
  assert.deepEqual(result.files, materializeCourseStage5(input, reuseOptions()).files);
});

test('Course Lesson reuse requires an approved pinned dependency, never built author Props', () => {
  assert.throws(() => materializeCourseStage5(patchedSource(), options()), /trusted dependency resolver/);
  const noPatch = patchedSource();
  delete noPatch.config.content.items.directLesson.production.sourcePatch;
  assert.throws(() => materializeCourseStage5(noPatch, reuseOptions()), /rationale without/);
  const prebuilt = patchedSource();
  prebuilt.config.content.items.directLesson.production.existing.base = { locale: { title: 'Injected' } };
  assert.throws(() => materializeCourseStage5(prebuilt, reuseOptions()), /expected only \{id\}/);
  const stale = reuseOptions();
  const resolve = stale.resolveExistingLesson;
  stale.resolveExistingLesson = request => ({ ...resolve(request), sourceSha: '0'.repeat(40) });
  assert.throws(() => materializeCourseStage5(patchedSource(), stale), /unapproved|stale/);
  const denied = reuseOptions();
  const resolveDenied = denied.resolveExistingLesson;
  denied.resolveExistingLesson = request => ({ ...resolveDenied(request), approved: false });
  assert.throws(() => materializeCourseStage5(patchedSource(), denied), /unapproved/);
});

test('verified built sparse Lesson override round-trips through real Lesson and Course Build APIs', () => {
  const engineRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
  const { defineLesson, defineCourse, placeLesson } = createRequire(import.meta.url)(
    path.join(engineRoot, 'dist/build.js'),
  );
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
        existing: { id: realLesson.id },
        matching,
        assessment,
        sourceExportName: 'independentLesson',
        sourcePatch: raw,
        overrideRationale: 'Verified Course-local navigation accommodation',
      },
    },
  };
  reviewed.config.content.order = ['reused'];
  const opts = reuseOptions(realLesson);
  const plan = materializeCourseStage5(reviewed, opts);
  assert.equal(
    plan.files.some(file => file.path.endsWith('/authoredCourseOverrides.ts')),
    false,
  );
  assert.match(plan.files.find(file => file.path === root + '/index.ts').content, /"reused": child_reused/);
  assert.match(plan.files.find(file => file.path === root + '/reused/index.ts').content, /placeLesson\(originalLesson, \{/);
  const actualCourse = defineCourse({
    id: rootId,
    type: 'course',
    slug: 'skyBasics',
    params: { languages: ['uk'] },
    locale: { title: { uk: 'Небо' }, description: { uk: 'Основи' } },
    content: { items: { reused: placeLesson(realLesson, raw) }, order: ['reused'] },
  });
  const actualCourseBuild = actualCourse.build.props({ languages: ['uk'] });
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
    production: {
      ...top.items.directLesson.production,
      existing: { id: reusedLessonId },
      sourcePatch: undefined,
      overrideRationale: undefined,
    },
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

test('reviewed Course preview with four Episodes, three Assessments and two new Lessons has nine owned stubs', () => {
  const input = patchedSource();
  const top = input.config.content;
  const module = top.items.moduleOne.config.content;
  const chapterContent = module.items.chapterOne.config.content;
  top.items.directEpisode = episode();
  top.items.directChapter = chapter();
  top.items.directChapter.config.slug = 'directChapter';
  top.order = ['directEpisode', 'moduleOne', 'directChapter', 'directLesson'];
  module.items.moduleEpisode = episode();
  module.order = ['moduleEpisode', 'chapterOne'];
  chapterContent.items.reused = {
    ...top.items.directLesson,
    config: { ...top.items.directLesson.config, slug: 'reused' },
    production: {
      ...top.items.directLesson.production,
      existing: { id: reusedLessonId },
      sourcePatch: undefined,
      overrideRationale: undefined,
    },
  };
  chapterContent.order.push('reused');
  chapterContent.items.chapterReview = assessmentSlot('moduleOne/chapterOne/lessonOne');
  chapterContent.order.push('chapterReview');
  module.items.moduleReview = assessmentSlot('moduleOne/chapterOne/lessonOne');
  module.order.push('moduleReview');
  top.items.finalReview = assessmentSlot('moduleOne/chapterOne/lessonOne', 'directLesson');
  top.order.push('finalReview');
  const plan = materializeCourseStage5(input, reuseOptions());
  assert.equal(plan.inventory.episodes.length, 4);
  assert.equal(plan.inventory.assessments.length, 3);
  assert.equal(plan.inventory.lessons.filter(row => row.kind === 'new').length, 2);
  const rows = [...plan.inventory.episodes, ...plan.inventory.assessments, ...plan.inventory.lessons].filter(row =>
    row.status.startsWith('pending'),
  );
  assert.equal(rows.length, 9);
  const stubFiles = plan.files.filter(file => file.path.endsWith('/stub.ts'));
  assert.equal(stubFiles.length, 9);
  assert.equal(new Set(stubFiles.map(file => file.path)).size, 9);
  const apis = { lesson: 'defineLessonStub', episode: 'defineEpisodeStub', assessment: 'defineAssessmentStub' };
  for (const row of rows) {
    const stub = stubFiles.find(file => file.path === row.stubSourcePath);
    assert.ok(stub, row.placementPath);
    assert.match(stub.content, /TODO \(BLOCKER\):.*delete this stub\.ts/);
    assert.ok(stub.content.includes(apis[row.type] + '({ id: ' + JSON.stringify(row.id)));
    const parent = plan.files.find(file => file.path === row.placementSourcePath);
    assert.ok(parent?.content.includes(JSON.stringify(row.slug) + ': child_' + row.slug));
    assert.ok(parent.content.includes('/' + row.slug + '/stub'));
    const lines = parent.content.split('\n');
    const imported = lines.findIndex(
      line =>
        line.includes('import { stub as child_' + row.slug + ' } from ') && line.includes('/' + row.slug + '/stub'),
    );
    assert.ok(imported > 0, row.placementPath);
    assert.match(lines[imported - 1], /^\/\/ TODO \(BLOCKER\): Keep this pending /);
    assert.match(lines[imported - 1], /Coding Agent replaces this import/);
    assert.match(lines[imported - 1], /TypeScript\/preview checks/);
    assert.doesNotMatch(parent.content, new RegExp(apis[row.type] + '\\('));
    assert.ok(row.sourcePath.endsWith('/draft.ts'));
    assert.notEqual(row.sourcePath, row.stubSourcePath);
  }
  assert.deepEqual(plan.files, materializeCourseStage5(input, reuseOptions()).files);
});

test('Course Stage 5 reserves Assessments at Course, Module and Chapter owners with verified upstream Lessons', () => {
  const input = source();
  const rootContent = input.config.content;
  const moduleContent = rootContent.items.moduleOne.config.content;
  const chapterContent = moduleContent.items.chapterOne.config.content;

  chapterContent.items.chapterReview = assessmentSlot('moduleOne/chapterOne/lessonOne');
  chapterContent.order.push('chapterReview');
  moduleContent.items.moduleReview = assessmentSlot('moduleOne/chapterOne/lessonOne');
  moduleContent.order.push('moduleReview');
  rootContent.items.finalReview = assessmentSlot('moduleOne/chapterOne/lessonOne', 'directLesson');
  rootContent.order.push('finalReview');

  const result = materializeCourseStage5(input, options());
  assert.equal(result.inventory.assessments.length, 3);
  assert.deepEqual(
    result.inventory.assessments.map(row => row.orderPath),
    [[0, 0, 2], [0, 1], [2]],
  );
  const paths = result.inventory.assessments.map(row => row.sourcePath);
  assert.deepEqual(paths, [
    root + '/moduleOne/chapterOne/chapterReview/draft.ts',
    root + '/moduleOne/moduleReview/draft.ts',
    root + '/finalReview/draft.ts',
  ]);
  for (const row of result.inventory.assessments) {
    assert.equal(
      row.id,
      deriveCourseEntityId(
        rootId,
        'assessment',
        row.placementPath === root + '/' + row.slug
          ? row.slug
          : row.placementPath
              .slice((root + '/').length)
              .split('/')
              .slice(0, -1)
              .join('/') +
              '/content/' +
              row.slug,
      ),
    );
    assert.equal(row.status, 'pending-assessment-design');
    const seed = result.files.find(file => file.path === row.sourcePath);
    const parent = result.files.find(file => file.path === row.placementSourcePath);
    assert.ok(seed?.content.includes('satisfies AssessmentWorkflowSeed'));
    assert.match(seed?.content ?? '', /export default \{/);
    assert.doesNotMatch(seed?.content ?? '', /export const assessmentSeed|materializeAssessment\(/);
    assert.doesNotMatch(seed.content, /"placement"|"courseId"|"orderPath"/);
    assert.match(seed.content, /"reviewedCourseSourceBlobSha": "0123456789abcdef0123456789abcdef01234567"/);
    const stub = result.files.find(file => file.path === row.stubSourcePath);
    assert.ok(stub?.content.includes('defineAssessmentStub({ id: ' + JSON.stringify(row.id)));
    assert.ok(stub?.content.includes('TODO (BLOCKER): Complete and validate the Assessment Configurator'));
    assert.ok(parent?.content.includes(JSON.stringify(row.slug) + ': child_' + row.slug));
    assert.ok(parent?.content.includes('order: '));
    assert.doesNotMatch(parent.content, /TODO \\(BLOCKER\\): Complete and review the Assessment/);
    // The reserved Configurator and seed retain pending state without a stale status comment.
    assert.doesNotMatch(seed.content, /questionIds|defineQuizSection/);
    assert.ok(row.lessonDependencies.every(path => !path.startsWith('content/')));
  }
  assert.deepEqual(result.inventory, materializeCourseStage5(input, options()).inventory);
});

test('legacy Course draft dependencies normalize to flat published Lesson placements', () => {
  const input = source();
  input.config.content.items.finalReview = assessmentSlot('content/directLesson');
  input.config.content.order.push('finalReview');
  const result = materializeCourseStage5(input, options());
  assert.deepEqual(result.inventory.assessments[0].lessonDependencies, ['directLesson']);
  assert.equal(result.inventory.assessments[0].sourcePath, root + '/finalReview/draft.ts');
});

test('Course Assessment placement rejects missing, forward, repeated and ambiguous Lesson dependencies', () => {
  const base = source();
  const content = base.config.content;
  content.items.finalReview = assessmentSlot('missingLesson');
  content.order.push('finalReview');
  assert.throws(() => materializeCourseStage5(base, options()), /unresolved|forward/);

  content.items.finalReview = assessmentSlot('directLesson', 'directLesson');
  assert.throws(() => materializeCourseStage5(base, options()), /duplicat/i);

  content.items.finalReview = assessmentSlot('directLesson');
  content.order.unshift(content.order.pop());
  assert.throws(() => materializeCourseStage5(base, options()), /unresolved|forward/);

  const another = source();
  another.config.content.items.finalReview = assessmentSlot('directLesson');
  another.config.content.order.push('finalReview');
  another.config.content.items.moduleOne.config.content.items.chapterOne.config.content.items.chapterReview =
    assessmentSlot('directLesson');
  const chapter = another.config.content.items.moduleOne.config.content.items.chapterOne.config.content;
  chapter.order.push('chapterReview');
  assert.throws(() => materializeCourseStage5(another, options()), /unresolved|forward/);
});

test('new Course-owned Section and Text block materialize below an overridden Lesson', () => {
  const engineRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
  const { defineLesson, materializeCourse } = createRequire(import.meta.url)(
    path.join(engineRoot, 'dist/build.js'),
  );
  const original = defineLesson({
    id: reusedLessonId,
    type: 'lesson',
    slug: 'independentLesson',
    skills: [skill],
    params: {
      languages: ['uk'],
      quizRequiredForCompletion: false,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title: { uk: 'Оригінальний урок' } },
    section: { items: {}, order: [] },
  });
  const authoredSection = {
    config: {
      id: '663572e7-bd85-4516-86e2-3de07d209e31',
      type: 'content',
      slug: 'practice',
      params: {},
      locale: { title: { uk: 'Власна практика' }, navigationLabel: '1' },
      content: {
        items: {
          message: {
            config: {
              id: '663572e7-bd85-4516-86e2-3de07d209e30',
              type: 'text',
              slug: 'message',
              params: {},
              locale: { value: { uk: 'Тільки для цього курсу' } },
            },
          },
        },
        order: ['message'],
      },
    },
  };
  const reviewed = source();
  reviewed.config.content.items = {
    reused: {
      config: { type: 'lesson', slug: 'reused', skills: [skill] },
      production: {
        kind: 'existing',
        existing: { id: original.id },
        matching,
        assessment,
        sourceExportName: 'independentLesson',
        sourcePatch: {
          section: {
            additionalItems: { practice: { $create: 'course-section', source: authoredSection } },
            order: ['practice'],
          },
        },
        overrideRationale: 'Course-specific extra practice is required',
      },
    },
  };
  reviewed.config.content.order = ['reused'];
  const opts = reuseOptions(original);
  const plan = materializeCourse(reviewed, opts);
  const wrapper = plan.files.find(file => file.path === root + '/reused/index.ts')?.content;
  const section = plan.files.find(file => file.path === root + '/reused/sections/practice/index.ts')?.content;
  const block = plan.files.find(file => file.path === root + '/reused/sections/practice/message/index.ts')?.content;
  assert.match(wrapper ?? '', /import \{ practice as added_section_reused_practice \} from "\.\/sections\/practice"/);
  assert.match(wrapper ?? '', /"additionalItems": \{"practice": added_section_reused_practice\}/);
  assert.match(section ?? '', /defineContentSection/);
  assert.match(block ?? '', /defineText/);
  assert.match(block ?? '', /Тільки для цього курсу/);
  assert.ok(plan.files.every(file =>
    !file.path.startsWith('content/playground/data/lessons/')), 'new Section cannot mutate standalone Lesson');
  assert.equal(plan.inventory.lessons[0].overrideSourcePath, root + '/reused/index.ts');
  assert.deepEqual(plan.files, materializeCourse(reviewed, opts).files);
  const invalid = structuredClone(reviewed);
  invalid.config.content.items.reused.production.sourcePatch.section.additionalItems.practice.source.config.slug = 'other';
  assert.throws(() => materializeCourse(invalid, opts), /invalid or untrusted Course-owned Section/);
  const collision = structuredClone(reviewed);
  collision.config.content.items.reused.production.sourcePatch.section.additionalItems.practice.source.config.id = original.id;
  assert.throws(() => materializeCourse(collision, opts), /duplicate\/invalid Course-owned Section or Block UUID/);
});

test('Course additionalItems binds only verified Sections and retains real nested Lesson Build semantics', () => {
  const engineRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
  const { defineLesson, defineCourse, defineContentSection, defineText, placeLesson } = createRequire(import.meta.url)(
    path.join(engineRoot, 'dist/build.js'),
  );
  const extraBlock = defineText({
    id: '663572e7-bd85-4516-86e2-3de07d209e30',
    type: 'text',
    slug: 'message',
    params: {},
    locale: { value: { uk: 'Перевірений текст' } },
  });
  const extraSection = defineContentSection({
    id: '663572e7-bd85-4516-86e2-3de07d209e31',
    type: 'content',
    slug: 'practice',
    params: {},
    locale: { title: { uk: 'Практика' }, navigationLabel: '1' },
    content: { items: { message: extraBlock }, order: ['message'] },
  });
  const original = defineLesson({
    id: reusedLessonId,
    type: 'lesson',
    slug: 'independentLesson',
    skills: [skill],
    params: {
      languages: ['uk'],
      quizRequiredForCompletion: false,
      sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
    },
    locale: { title: { uk: 'Самостійний урок' } },
    section: { items: {}, order: [] },
  });
  const raw = {
    section: {
      additionalItems: {
        practice: {
          $ref: 'lesson-section',
          lessonId: original.id,
          sectionId: extraSection.id,
          sourceSha: 'c'.repeat(40),
          exportName: 'practice',
        },
      },
      order: ['practice'],
    },
  };
  const reviewed = source();
  reviewed.config.content.items = {
    reused: {
      config: { type: 'lesson', slug: 'reused', skills: [skill] },
      production: {
        kind: 'existing',
        existing: { id: original.id },
        matching,
        assessment,
        sourceExportName: 'independentLesson',
        sourcePatch: raw,
        overrideRationale: 'Reviewed added practice Section',
      },
    },
  };
  reviewed.config.content.order = ['reused'];
  const opts = {
    ...reuseOptions(original),
    resolveAddedSection(request) {
      assert.equal(request.id, extraSection.id);
      assert.equal(request.ownerLessonId, original.id);
      assert.equal(request.sourceSha, 'c'.repeat(40));
      return { ...request, approved: true, configurator: extraSection };
    },
  };
  const plan = materializeCourseStage5(reviewed, opts);
  const index = plan.files.find(file => file.path === root + '/index.ts').content;
  const wrapper = plan.files.find(file => file.path === root + '/reused/index.ts').content;
  const section = plan.files.find(file => file.path === root + '/reused/sections/practice/index.ts').content;
  assert.match(index, /import \{ placedLesson as child_reused \} from "\.\/reused"/);
  assert.match(wrapper, /import \{ sectionAddition as added_section_reused_practice \} from "\.\/sections\/practice"/);
  assert.match(section, /import \{ practice as added_section_reused_practice \} from "#lessonsData\/1\//);
  assert.match(wrapper, /"additionalItems": added_section_reused_practice/);
  assert.doesNotMatch(wrapper, /"\$ref":/);
  assert.deepEqual(plan.files, materializeCourseStage5(reviewed, opts).files);
  const bound = { section: { additionalItems: { practice: extraSection }, order: ['practice'] } };
  const built = original.build.overrides(bound, { languages: ['uk'] });
  assert.equal(built.id, original.id);
  assert.equal(built.base.section[0].type, 'content');
  assert.deepEqual(original.build.props({ languages: ['uk'] }).base.section, []);
  const course = defineCourse({
    id: rootId,
    type: 'course',
    slug: 'skyBasics',
    params: { languages: ['uk'] },
    locale: { title: { uk: 'Небо' }, description: { uk: 'Спостереження' } },
    content: { items: { reused: placeLesson(original, bound) }, order: ['reused'] },
  });
  assert.equal(course.build.props({ languages: ['uk'] }).base.content[0].section[0].type, 'content');

  const denied = {
    ...opts,
    resolveAddedSection: request => ({ ...opts.resolveAddedSection(request), approved: false }),
  };
  assert.throws(() => materializeCourseStage5(reviewed, denied), /unapproved/);
});

test('Course Stage 5 normalizes reviewed English workflow fields and preserves only authored translations', () => {
  const input = source();
  input.production.languages = { document: 'en', planned: ['en', 'uk'] };
  input.config.locale = {
    title: { en: 'Sky', uk: 'Небо' },
    description: 'Observe our world',
    prerequisitesText: 'Start here',
    outcomesText: 'Learn to observe',
  };
  const module = input.config.content.items.moduleOne;
  module.config.locale.title = 'Module';
  const chapter = module.config.content.items.chapterOne;
  chapter.config.locale.title = { en: 'Chapter', uk: 'Розділ' };
  chapter.config.content.items.lessonOne.config.locale.title = 'First Lesson';
  input.config.content.items.directLesson.config.locale.title = { en: 'Lesson', uk: 'Урок' };
  chapter.config.content.items.chapterReview = {
    config: { type: 'assessment', locale: { title: 'Check knowledge' } },
    production: {
      purpose: 'Check understanding of the first Lesson',
      lessonDependencies: ['moduleOne/chapterOne/lessonOne'],
    },
  };
  chapter.config.content.order.push('chapterReview');
  const result = materializeCourseStage5(input, options());
  const file = suffix => {
    const found = result.files.find(item => item.path === suffix);
    assert.ok(found, suffix);
    return found.content;
  };
  const index = file(root + '/index.ts');
  assert.match(index, /"en": "Sky"/);
  assert.match(index, /"uk": "Небо"/);
  for (const phrase of ['Observe our world', 'Start here', 'Learn to observe'])
    assert.ok(index.includes('"en": "' + phrase + '"'));
  assert.ok(!index.includes('"uk": "Observe our world"'));
  assert.match(file(root + '/moduleOne/index.ts'), /"en": "Module"/);
  const child = file(root + '/moduleOne/chapterOne/index.ts');
  assert.match(child, /"en": "Chapter"/);
  assert.match(child, /"uk": "Розділ"/);
  const seeds = result.files.filter(item => item.path.includes('/data/lessons/'));
  assert.equal(seeds.length, 2);
  assert.ok(seeds.some(seed => seed.content.includes('"en": "First Lesson"')));
  assert.ok(seeds.some(seed => seed.content.includes('"uk": "Урок"')));
  const assessmentSeed = result.files.find(item => item.path.endsWith('/chapterReview/draft.ts'));
  assert.ok(assessmentSeed);
  assert.match(assessmentSeed.content, /"en": "Check knowledge"/);
  assert.doesNotMatch(assessmentSeed.content, /"uk": "Check knowledge"/);
  const episodeHandoff = file(root + '/moduleOne/chapterOne/episodeOne/draft.ts');
  assert.match(episodeHandoff, /"document": "en"/);
  assert.doesNotMatch(episodeHandoff, /"locale": \{/);
  const constants = file(root + '/constants.ts');
  assert.equal((constants.match(/export const languages =/g) ?? []).length, 1);
  assert.match(constants, /Planned languages \(INACTIVE/);
  assert.match(constants, /REPLACE the tuple in the single existing export const languages/);
  assert.match(constants, /\["en","uk"\]/);
  assert.match(constants, /export const languages = \["en"\]/);
  assert.ok(result.diagnostics.some(d => d.code === 'pending-locales'));
});

test('Course Build rejects a missing requested translation without changing intentionally invariant Configurator text', () => {
  const engineRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
  const { defineCourse } = createRequire(import.meta.url)(path.join(engineRoot, 'dist/build.js'));
  const create = locale =>
    defineCourse({
      id: rootId,
      type: 'course',
      slug: 'localizationTest',
      params: { languages: ['en', 'uk'] },
      locale,
      content: { items: {}, order: [] },
    });
  const incomplete = create({ title: { en: 'Sky' }, description: { en: 'Learn astronomy' } });
  const english = incomplete.build.props({ languages: ['en'] });
  assert.equal(english.locale.en.locale.title, 'Sky');
  assert.equal(english.locale.uk, undefined);
  assert.throws(() => incomplete.build.props({ languages: ['en', 'uk'] }));
  const invariant = create({ title: 'H₂O', description: 'Non-translatable label' });
  const both = invariant.build.props({ languages: ['en', 'uk'] });
  assert.equal(both.base.locale.title, 'H₂O');
  assert.equal(both.base.locale.description, 'Non-translatable label');
  assert.equal(both.locale, undefined);
});

test('Course root scalar English title and description materialize as sparse localized fields', () => {
  const input = source();
  input.production.languages = { document: 'en', planned: ['en', 'uk'] };
  input.config.locale = { title: 'Sky', description: 'Explore the sky' };
  input.config.content = { items: {}, order: [] };
  const plan = materializeCourseStage5(input, options());
  const rootSource = plan.files.find(file => file.path === root + '/index.ts')?.content ?? '';
  assert.match(rootSource, /"title": \{\s*"en": "Sky"/);
  assert.match(rootSource, /"description": \{\s*"en": "Explore the sky"/);
  assert.doesNotMatch(rootSource, /"uk": "Sky"/);
  assert.doesNotMatch(rootSource, /"uk": "Explore the sky"/);
  assert.ok(plan.diagnostics.some(d => d.code === 'pending-locales'));
});
