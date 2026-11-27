import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { materializeCourse } from './materialize.mjs';
import { materializeModule } from '../module/materialize.mjs';
import { materializeChapter } from '../chapter/materialize.mjs';
import { materializeEpisode } from '../episode/materialize.mjs';
const ts = createRequire(import.meta.url)('typescript');
const IDs = {
  course: '50d8cd6f-41f1-4cb4-a156-d6f898d552a7',
  module: 'f1ac35c6-19e3-49ab-af76-4105b02412b2',
  chapter: 'b2d91c34-5847-48cb-bc88-1721ef7055ea',
  episode: 'fe1042c9-9b4a-4b8d-af84-a1b7b036bc89',
  lesson: '778597bc-a34a-472d-a317-69c97ff452e6',
};
const skillId = '00000000-0000-4000-8000-000000000015';
const methodology = {
  purpose: 'Teaching',
  audience: 'Learners',
  approach: 'Explore',
  depth: 'Introductory',
  accessibility: 'Accessible delivery',
  scope: 'Core',
  entryConditions: 'None',
  sourceNotes: 'Verified sources',
};
const matching = {
  methodologySourcePath: 'content/book/data/lessons/6/lesson-id/methodology.md',
  sourceSha: 'verified-source-sha',
  matchingRationale: 'Same Skills and intended depth',
  languageEvidence: 'uk reviewed',
};
const section = (slug, id) => ({
  type: 'content',
  id,
  slug,
  params: {},
  locale: { title: { uk: 'Розділ' } },
  content: { items: {}, order: [] },
});
const ep = (slug = 'episodeOne', id = IDs.episode) => ({
  config: {
    type: 'episode',
    id,
    slug,
    params: { languages: ['uk', 'en'] },
    locale: { title: { uk: 'Пригода', en: 'Journey' } },
    section: { items: { opening: section('opening', '1e2e9488-6304-4d87-b597-f13ac724c3b5') }, order: ['opening'] },
  },
  production: { focus: 'Narrative situation', purpose: 'Contextual transition' },
});
const assessment = {
  questionBankRequired: true,
  flashcardBankRequired: false,
  quizSectionRequired: true,
  flashcardsSectionRequired: false,
};
const lesson = (slug, tag, lessonId = IDs.lesson) => ({
  config: { type: 'lesson', slug, skills: [skillId] },
  production: {
    kind: 'existing',
    existing: { id: lessonId },
    matching,
    assessment,
    sourcePatch: { locale: { title: { uk: tag } } },
    overrideRationale: 'Adapt title to Course sequence',
  },
});
const newLesson = slug => ({
  config: { type: 'lesson', slug, skills: [skillId], locale: { title: { uk: 'Новий урок' } } },
  production: {
    kind: 'new',
    methodology: 'Reviewed comprehensive independent methodology',
    objective: 'Describe observations',
    depth: 'Introductory',
    sequenceReason: 'Introduce facts before applying',
    assessmentEvidence: 'Practical checkpoint',
    assessment,
  },
});
const unitProduction = {
  methodology: 'Methodologically reviewed unit',
  outcomes: { skills: [skillId] },
  prerequisites: { skills: [] },
  depth: 'Introductory',
  sequenceReason: 'Prerequisite order',
};
const ch = (slug = 'chapterOne') => ({
  config: {
    type: 'chapter',
    slug,
    locale: { title: { uk: 'Глава' } },
    content: { items: { episodeOne: ep() }, order: ['episodeOne'] },
  },
  production: { ...unitProduction },
});
const mod = (slug = 'moduleOne') => ({
  config: {
    type: 'module',
    slug,
    locale: { title: { uk: 'Модуль' } },
    content: { items: { chapterOne: ch() }, order: ['chapterOne'] },
  },
  production: { ...unitProduction },
});
const course = () => ({
  config: {
    type: 'course',
    id: IDs.course,
    slug: 'rootCourse',
    params: { age: { min: 6, max: 10 } },
    locale: { title: { uk: 'Курс', en: 'Course' }, description: { uk: 'Про курс', en: 'Description' } },
    content: {
      items: {
        moduleOne: mod(),
        directEpisode: ep('directEpisode', 'ec4a2e1f-5f42-40ef-a879-e668b59b8d04'),
        directLesson: lesson('directLesson', 'Зміна'),
      },
      order: ['moduleOne', 'directEpisode', 'directLesson'],
    },
  },
  production: {
    languages: { document: 'uk', planned: ['uk', 'en'] },
    methodology,
    outcomes: { explanation: 'Recognize observable patterns' },
    prerequisites: { explanation: 'None' },
    standardsAlignment: [],
    openDecisions: {},
  },
});
const sectionRenderer = (node, ctx) => ({
  id: node.config?.id ?? node.id,
  exportName: node.config?.slug ?? node.slug,
  files: [{ path: ctx.directory + '/index.ts', kind: 'typescript', content: 'export const opening = {};\n' }],
});
const reused = [];
// Test double for Course-owned Lesson seed emitter: its placeholder body is deliberately NOT a valid authored Lesson.
// These scenarios cover only the UUID path/metadata handoff; they do NOT establish seed type compatibility.
const lessonBridge = (node, ctx) => {
  reused.push({
    location: ctx.directory,
    lessonId: ctx.lessonId,
    kind: ctx.kind,
    existing: ctx.existing,
    sourcePatch: ctx.production.sourcePatch,
    assessment: ctx.production.assessment,
    reviewedMethodology: ctx.production.methodology,
    language: ctx.sourceLanguage,
  });
  const lessonId = ctx.lessonId ?? '80d31f41-75ac-4210-9a6d-7b4c75ad698e';
  if (ctx.kind === 'new')
    return {
      lessonId,
      files: [
        {
          path: 'content/book/data/lessons/' + lessonId.slice(-1) + '/' + lessonId + '/draft.ts',
          kind: 'typescript',
          content:
            '// Future CourseWorkflowLessonSeed authored source; no runtime Configurator\\nexport default {} satisfies CourseWorkflowLessonSeed;\\n',
        },
      ],
    };
  return {
    lessonId,
    exportName: node.config.slug,
    importPath: '#lessonsData/' + lessonId.at(-1) + '/' + lessonId + '/index',
    sourceExportName: 'independentLesson',
    files: [],
  };
};
const deriveId = (kind, placement) => {
  if (kind === 'module' && placement.endsWith('moduleOne')) return IDs.module;
  if (kind === 'chapter' && placement.endsWith('chapterOne')) return IDs.chapter;
  let hash = 2166136261;
  for (const c of kind + ':' + placement) hash = Math.imul(hash ^ c.charCodeAt(0), 16777619) >>> 0;
  return '00000000-0000-4000-8000-' + hash.toString(16).padStart(12, '0');
};
const ctx = () => ({
  sourceLanguage: 'uk',
  textbookRoot: 'content/playground',
  courseId: IDs.course,
  resolveSkill: ({ id }) => ({
    approved: true,
    id,
    slug: 'testExplainLightTravel',
    exportName: 'testExplainLightTravel',
    importPath: '#skillsData/testLight/testLightPropagation/testExplainLightTravel',
    sourcePath: 'content/playground/data/skills/testLight/testLightPropagation/testExplainLightTravel.ts',
    sourceSha: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    configurator: {
      id,
      slug: 'testExplainLightTravel',
      type: 'skill',
      config: { base: { id, slug: 'testExplainLightTravel' } },
      build: { data() {} },
    },
  }),
  deriveId,
  materializeCourse,
  materializeModule,
  materializeChapter,
  materializeEpisode,
  materializeSection: sectionRenderer,
  materializeLessonPlacement: lessonBridge,
});
const syntax = files => {
  for (const file of files.filter(file => file.kind === 'typescript'))
    assert.equal(
      ts.createSourceFile(file.path, file.content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS).parseDiagnostics
        .length,
      0,
      file.path,
    );
};

test('full Course > Module > Chapter > Episode, direct placements and Stage 1 language metadata', () => {
  const first = materializeCourse(course(), ctx());
  const paths = first.files.map(f => f.path);
  assert.ok(paths.includes('moduleOne/chapterOne/episodeOne/index.ts'));
  assert.ok(paths.includes('directEpisode/index.ts'));
  assert.ok(!paths.includes('directLesson/index.ts'));
  assert.match(
    first.files.find(f => f.path === 'index.ts').content,
    /import \{ independentLesson \} from "#lessonsData\//,
  );
  const method = first.files.find(f => f.path === 'methodology.md');
  assert.match(method.content, /## Entry conditions/);
  const main = first.files.find(f => f.path === 'index.ts').content;
  assert.match(main, /defineCourse<"rootCourse", typeof content.items, Languages>/);
  assert.match(
    main,
    /import \{ languages, type Languages \} from "#coursesData\/7\/50d8cd6f-41f1-4cb4-a156-d6f898d552a7\/constants"/,
  );
  const unit = first.files.find(f => f.path === 'moduleOne/index.ts').content;
  const chapter = first.files.find(f => f.path === 'moduleOne/chapterOne/index.ts').content;
  assert.match(unit, /import type \{ Languages \} from "#coursesData\//);
  assert.match(chapter, /import type \{ Languages \} from "#coursesData\//);
  assert.doesNotMatch(unit, /import \{ languages \}/);
  assert.doesNotMatch(unit, /testExplainLightTravel|skillsData|outcomes|prerequisites/);
  assert.doesNotMatch(chapter, /testExplainLightTravel|skillsData|outcomes|prerequisites/);
  assert.doesNotMatch(main, /testExplainLightTravel|skillsData/);
  assert.doesNotMatch(main, /const languages =|Restore reviewed languages/);
  assert.equal(first.placements.length, 1);
  syntax(first.files);
  assert.deepEqual(materializeCourse(course(), ctx()).files, first.files);
});
test('fully typed Stage 3 tree reuses one Lesson twice with independent sparse Build outputs', () => {
  reused.length = 0;
  const src = course();
  const first = ch('chapterOne');
  first.config.content = { items: { first: lesson('first', 'One') }, order: ['first'] };
  const second = ch('chapterTwo');
  second.config.content = { items: { second: lesson('second', 'Two') }, order: ['second'] };
  src.config.content = {
    items: {
      moduleOne: {
        ...mod(),
        config: {
          ...mod().config,
          content: { items: { chapterOne: first, chapterTwo: second }, order: ['chapterOne', 'chapterTwo'] },
        },
      },
      newLesson: newLesson('newLesson'),
    },
    order: ['moduleOne', 'newLesson'],
  };
  const result = materializeCourse(src, ctx());
  assert.equal(reused.filter(c => c.kind === 'existing').length, 2);
  assert.equal(reused[0].existing.id, reused[1].existing.id);
  assert.deepEqual(reused[0].existing, reused[1].existing);
  assert.notDeepEqual(reused[0].sourcePatch, reused[1].sourcePatch);
  assert.notEqual(reused[0].location, reused[1].location);
  assert.equal(result.placements.length, 3);
  assert.equal(result.placements.find(p => p.kind === 'new').lessonId, '80d31f41-75ac-4210-9a6d-7b4c75ad698e');
  assert.equal(result.pendingPlacements.length, 1);
  const handoff = result.files.find(f => f.path === result.pendingPlacements[0].handoffPath);
  assert.ok(handoff);
  assert.match(handoff.path, /\/data\/lessons\/e\/80d31f41-75ac-4210-9a6d-7b4c75ad698e\/draft\.ts$/);
  assert.equal(result.files.filter(f => f.path.includes('/data/lessons/')).length, 1);
  assert.match(result.files.find(f => f.path === 'index.ts').content, /newLesson/);
  assert.match(
    result.files.find(f => f.path === 'newLesson/stub.ts').content,
    /export const newLesson = defineLessonStub/,
  );
  // Pending work is represented by the typed seed and actual stub, not a stale parent TODO.
  assert.doesNotMatch(
    result.files.find(f => f.path === 'index.ts').content,
    /TODO \(BLOCKER\): Finish and independently materialize pending Lesson/,
  );
  assert.equal(reused[2].assessment.quizSectionRequired, true);
  assert.equal(reused[2].reviewedMethodology, 'Reviewed comprehensive independent methodology');
  assert.equal(reused[2].language, 'uk');
  syntax(result.files);
});
test('Stage 3 provisional Episode becomes a deterministic, explicitly blocked authoring draft', () => {
  const draft = course();
  draft.config.content.items.directEpisode = {
    config: { type: 'episode' },
    production: { focus: 'Situation', purpose: 'Transition' },
  };
  const context = { ...ctx(), courseId: IDs.course, reviewedCourseSourceBlobSha: '1'.repeat(40) };
  const result = materializeCourse(draft, context);
  assert.ok(result.diagnostics.some(d => d.code === 'pending-episode-scenario' && d.severity === 'blocker'));
  const handoff = result.files.find(f => f.path === 'directEpisode/draft.ts').content;
  assert.match(handoff, /TODO \(BLOCKER\)/);
  assert.match(handoff, /Situation/);
  assert.match(handoff, /Transition/);
  assert.doesNotMatch(handoff, /defineEpisode/);
  assert.ok(!result.files.some(f => f.path === 'directEpisode/index.ts'));
  assert.equal(result.pendingEpisodes.length, 1);
  assert.match(result.files.find(f => f.path === 'index.ts').content, /directEpisode/);
  assert.match(result.files.find(f => f.path === 'directEpisode/stub.ts').content, /defineEpisodeStub/);
  syntax(result.files);
  assert.deepEqual(result.files, materializeCourse(draft, context).files);
  const old = course();
  old.config.content.items.directLesson.config.lessonId = IDs.lesson;
  assert.throws(() => materializeCourse(old, ctx()), /belong to production/);
  const invalid = course();
  invalid.config.content.order = ['moduleOne'];
  assert.throws(() => materializeCourse(invalid, ctx()), /content.order/);
  const unsafe = course();
  unsafe.config.content.items['../bad'] = unsafe.config.content.items.directLesson;
  unsafe.config.content.order.push('../bad');
  assert.throws(() => materializeCourse(unsafe, ctx()), /unsafe slug/);
  const missing = course();
  delete missing.production.languages;
  assert.throws(() => materializeCourse(missing, ctx()), /production.languages/);
});
test('the same imported Lesson must keep a verified ID, not an unvalidated raw patch', () => {
  const bad = course();
  bad.config.content.items.directLesson.production.existing = { base: { params: {} } };
  assert.throws(() => materializeCourse(bad, ctx()), /existing.id/);
  const patch = course();
  patch.config.content.items.directLesson.production.existing = {
    id: IDs.lesson,
    params: { sections: { allowSkipping: false } },
  };
  assert.throws(() => materializeCourse(patch, ctx()), /expected only/);
});
test('refuses traversal in requested source directory', () => {
  assert.throws(
    () => materializeCourse(course(), { sourceLanguage: 'uk', directory: '../unsafe' }),
    /unsafe generated directory/,
  );
});

test('Methodology Markdown is ordered, preserves evidence and never JSON dumps Course planning', () => {
  const input = course();
  input.production.standardsAlignment = [
    {
      standardId: '00000000-0000-4000-8000-000000000022',
      status: 'intended',
      evidence: 'Reviewed scientific alignment',
      version: '2026',
      sourceUrl: 'https://example.edu/standards',
      jurisdiction: 'UA',
    },
  ];
  input.production.openDecisions = { translation: 'Await expert review' };
  const result = materializeCourse(input, ctx());
  const courseMarkdown = result.files.find(f => f.path === 'methodology.md').content;
  const moduleMarkdown = result.files.find(f => f.path === 'moduleOne/methodology.md').content;
  const chapterMarkdown = result.files.find(f => f.path === 'moduleOne/chapterOne/methodology.md').content;
  assert.match(courseMarkdown, /## Standards alignment[\s\S]*Reviewed scientific alignment/);
  assert.match(courseMarkdown, /## Open decisions[\s\S]*Await expert review/);
  assert.ok(courseMarkdown.indexOf('## Purpose') < courseMarkdown.indexOf('## Intended learning outcomes'));
  assert.match(
    moduleMarkdown,
    /## Intended learning outcomes[\s\S]*## Entry prerequisites[\s\S]*## Depth[\s\S]*## Sequence rationale/,
  );
  assert.match(chapterMarkdown, /## Sequence rationale[\s\S]*Prerequisite order/);
  assert.ok(!moduleMarkdown.includes('"skills"'));
  assert.ok(!result.files.some(f => f.path === 'specification.md'));
});
test('new Lesson handoff cannot be mistaken for a finished Configurator or generate unrelated sections', () => {
  const c = course();
  c.config.content.items.pending = newLesson('pending');
  c.config.content.order.push('pending');
  const bad = ctx();
  bad.materializeLessonPlacement = (node, context) =>
    context.kind === 'existing'
      ? lessonBridge(node, context)
      : {
          lessonId: '80d31f41-75ac-4210-9a6d-7b4c75ad698e',
          exportName: 'pending',
          files: [
            {
              path: 'course/pending/index.ts',
              kind: 'typescript',
              content: 'export const pending = {};',
            },
          ],
        };
  assert.throws(() => materializeCourse(c, bad), /UUID-addressed Stage 1 draft.ts/);
  const noAssessment = course();
  delete noAssessment.config.content.items.directLesson.production.assessment;
  assert.throws(() => materializeCourse(noAssessment, ctx()), /four explicit assessment decisions/);
});

test('Course fails closed when a child import shadows generated content', () => {
  const node = course();
  node.config.content.items.content = lesson('content', 'Текст');
  node.config.content.order.push('content');
  assert.throws(() => materializeCourse(node, ctx()), /generated identifier collision.*content/);
});

test('Course-level Skill targets remain genuine Config fields with trusted Skill.id imports', () => {
  const node = course();
  node.config.params.outcomes = { skills: [skillId] };
  node.config.params.prerequisites = { skills: [skillId] };
  const source = materializeCourse(node, ctx()).files.find(file => file.path === 'index.ts').content;
  assert.match(source, /import \{ testExplainLightTravel \} from "#skillsData\//);
  assert.match(source, /testExplainLightTravel\.id/);
  assert.match(source, /outcomes|prerequisites/);
});
