import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { materializeCourse } from '../course/materialize.mjs';
import { materializeModule } from '../module/materialize.mjs';
import { materializeChapter } from './materialize.mjs';
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
    existing: { id: lessonId, base: { locale: { title: tag } }, locale: { uk: { locale: { title: tag } } } },
    matching,
    assessment,
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
const lessonBridge = (node, ctx) => {
  reused.push({
    location: ctx.directory,
    lessonId: ctx.lessonId,
    kind: ctx.kind,
    existing: ctx.existing,
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
          path: 'content/book/data/lessons/' + lessonId.slice(-1) + '/' + lessonId + '/index.ts',
          kind: 'typescript',
          content:
            '// Future LessonWorkflowStage1 authored source; no runtime Configurator\\nexport const lessonStage1 = {};\\n',
        },
      ],
    };
  return {
    lessonId,
    exportName: node.config.slug,
    files: [
      {
        path: ctx.directory + '/index.ts',
        kind: 'typescript',
        content: 'export const ' + node.config.slug + ' = {};\n',
      },
    ],
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

test('Chapter preserves one direct Episode and an existing Lesson placement', () => {
  const value = ch();
  value.config.content.items.extraLesson = lesson('extraLesson', 'Урок');
  value.config.content.order.push('extraLesson');
  const result = materializeChapter(value, ctx());
  assert.ok(result.files.some(file => file.path === 'episodeOne/sections/opening/index.ts'));
  assert.ok(result.files.some(file => file.path === 'extraLesson/index.ts'));
  assert.match(result.files.find(file => file.path === 'index.ts').content, /defineChapter</);
  assert.equal(result.id, IDs.chapter);
  syntax(result.files);
});
test('Chapter rejects a module at a forbidden nesting level', () => {
  const value = ch();
  value.config.content.items.invalid = mod('invalid');
  value.config.content.order.push('invalid');
  assert.throws(() => materializeChapter(value, ctx()), /disallowed child type module/);
});
test('Chapter refuses unsafe source directory', () => {
  assert.throws(
    () => materializeChapter(ch(), { sourceLanguage: 'uk', directory: '../unsafe' }),
    /unsafe generated directory/,
  );
});
