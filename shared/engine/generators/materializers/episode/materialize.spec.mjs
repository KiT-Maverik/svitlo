import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { materializeCourse } from '../course/materialize.mjs';
import { materializeModule } from '../module/materialize.mjs';
import { materializeChapter } from '../chapter/materialize.mjs';
import { materializeEpisode } from './materialize.mjs';
const ts = createRequire(import.meta.url)('typescript');
const IDs = {
  course: '50d8cd6f-41f1-4cb4-a156-d6f898d552a7',
  module: 'f1ac35c6-19e3-49ab-af76-4105b02412b2',
  chapter: 'b2d91c34-5847-48cb-bc88-1721ef7055ea',
  episode: 'fe1042c9-9b4a-4b8d-af84-a1b7b036bc89',
  lesson: '778597bc-a34a-472d-a317-69c97ff452e6',
};
const section = (slug, id) => ({
  type: 'content',
  id,
  slug,
  params: {},
  locale: { title: { uk: 'Розділ' } },
  content: { items: {}, order: [] },
});
const ep = (slug = 'episodeOne') => ({
  type: 'episode',
  id: IDs.episode,
  slug,
  params: { languages: ['uk', 'en'] },
  locale: { title: { uk: 'Пригода', en: 'Journey' } },
  section: { items: { opening: section('opening', '1e2e9488-6304-4d87-b597-f13ac724c3b5') }, order: ['opening'] },
});
const ch = (slug = 'chapterOne') => ({
  type: 'chapter',
  id: IDs.chapter,
  slug,
  params: {},
  locale: { title: { uk: 'Глава' } },
  content: { items: { episodeOne: ep() }, order: ['episodeOne'] },
});
const mod = (slug = 'moduleOne') => ({
  type: 'module',
  id: IDs.module,
  slug,
  params: {},
  locale: { title: { uk: 'Модуль' } },
  content: { items: { chapterOne: ch() }, order: ['chapterOne'] },
});
const lesson = (slug, tag) => ({
  type: 'lesson',
  slug,
  lessonId: IDs.lesson,
  overrides: { base: { locale: { title: tag } }, locale: { uk: { locale: { title: tag } } } },
});
const course = () => ({
  type: 'course',
  id: IDs.course,
  slug: 'rootCourse',
  params: { languages: ['uk', 'en'], scenarioMode: 'story' },
  locale: { title: { uk: 'Курс', en: 'Course' }, description: { uk: 'Про курс', en: 'Description' } },
  content: {
    items: {
      moduleOne: mod(),
      directEpisode: { ...ep('directEpisode'), id: 'ec4a2e1f-5f42-40ef-a879-e668b59b8d04' },
      directLesson: lesson('directLesson', 'А'),
    },
    order: ['moduleOne', 'directEpisode', 'directLesson'],
  },
});
const sectionRenderer = (node, ctx) => ({
  id: node.id,
  exportName: node.slug,
  files: [{ path: ctx.directory + '/index.ts', kind: 'typescript', content: 'export const ' + node.slug + ' = {};\n' }],
});
const reused = [];
const lessonBridge = (node, ctx) => {
  reused.push({ location: ctx.directory, lessonId: node.lessonId, overrides: ctx.overrides });
  return {
    lessonId: node.lessonId,
    exportName: node.slug,
    files: [
      { path: ctx.directory + '/index.ts', kind: 'typescript', content: 'export const ' + node.slug + ' = {};\n' },
    ],
  };
};

const ctx = () => ({
  sourceLanguage: 'uk',
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
test('Episode imports shared concrete Section renderer; no Section implementation duplicated', () => {
  const value = ep();
  const r = materializeEpisode({ config: value, production: { specification: 'Narrative script' } }, ctx());
  assert.ok(r.files.some(file => file.path === 'sections/opening/index.ts'));
  assert.ok(r.files.some(file => file.path === 'specification.md'));
  const source = r.files.find(file => file.path === 'index.ts').content;
  assert.match(source, /from "\.\/sections\/opening"/);
  assert.match(source, /defineEpisode<"episodeOne", typeof languages, typeof section.items>/);
  syntax(r.files);
  assert.deepEqual(r, materializeEpisode({ config: value, production: { specification: 'Narrative script' } }, ctx()));
});
test('Episode preserves reviewed Section notes in its narrative specification before Section handoff', () => {
  const input = ep();
  const production = { purpose: 'Introduce the scene', specification: 'Keep a nonvisual narrative path.' };
  input.section.items.opening = { config: section('opening', input.section.items.opening.id), production };
  const seen = [];
  const result = materializeEpisode(
    { config: input, production: { specification: 'Narrative script' } },
    {
      ...ctx(),
      materializeSection: (node, context) => {
        seen.push(node.production);
        return sectionRenderer(node.config, context);
      },
    },
  );
  const doc = result.files.find(file => file.path === 'specification.md')?.content ?? '';
  assert.match(doc, /Narrative script/);
  assert.match(doc, /Section: opening/);
  assert.match(doc, /Introduce the scene/);
  assert.match(doc, /Keep a nonvisual narrative path/);
  assert.equal(seen[0].methodologyIntegrated, true);
  assert.deepEqual(production, { purpose: 'Introduce the scene', specification: 'Keep a nonvisual narrative path.' });
  assert(!result.files.some(file => file.path === 'sections/opening/specification.md'));
});

test('Episode refuses unsupported child order and missing Section renderer', () => {
  const v = ep();
  v.section.order = [];
  assert.throws(() => materializeEpisode(v, ctx()), /section.order/);
  assert.throws(() => materializeEpisode(ep(), { sourceLanguage: 'uk' }), /concrete Section renderer required/);
});

test('refuses directory traversal before source emission', () => {
  assert.throws(
    () => materializeEpisode(ep(), { sourceLanguage: 'uk', directory: '../unsafe' }),
    /unsafe generated directory/,
  );
});

test('provisional Episode emits only an allocated typed draft with reviewed Course context', () => {
  const planned = {
    config: { type: 'episode', slug: 'transition' },
    production: { focus: 'Learning context', purpose: 'Narrative transition' },
  };
  const context = {
    ...ctx(),
    courseId: IDs.course,
    directory: 'content/transition',
    orderPath: [2],
    plannedLanguages: ['uk'],
    reviewedCourseSourceBlobSha: '1'.repeat(40),
    deriveId: () => 'f0000000-0000-4000-8000-000000000001',
  };
  const result = materializeEpisode(planned, context);
  assert.equal(result.id, 'f0000000-0000-4000-8000-000000000001');
  assert.equal(result.pendingEpisode, true);
  assert.deepEqual(
    result.files.map(f => f.path),
    ['content/transition/draft.ts'],
  );
  const draft = result.files[0].content;
  assert.match(draft, /TODO \(BLOCKER\)/);
  assert.match(draft, /satisfies EpisodeWorkflowStage1Handoff/);
  assert.match(draft, /export default \{/);
  assert.doesNotMatch(draft, /export const episodeStage1|materializeEpisodeStage5\(/);
  assert.match(draft, /Learning context/);
  assert.match(draft, /Narrative transition/);
  assert.doesNotMatch(draft, /defineEpisode|Not implemented/);
  syntax(result.files);
  assert.deepEqual(result, materializeEpisode(planned, context));
  assert.throws(
    () => materializeEpisode(planned, { ...context, deriveId: undefined }),
    /parent deterministic deriveId/,
  );
  assert.throws(() => materializeEpisode(planned, { ...context, courseId: undefined }), /verified owning Course/);
  assert.throws(
    () => materializeEpisode({ ...planned, production: { focus: '', purpose: 'Transition' } }, context),
    /nonempty reviewed focus/,
  );
});

test('Episode title is source-language keyed without inventing a planned translation', () => {
  const input = ep();
  input.params.languages = ['en', 'uk'];
  input.locale.title = 'Story';
  const result = materializeEpisode({ config: input, production: { specification: 'Reviewed narrative' } },
    { ...ctx(), sourceLanguage: 'en' });
  const source = result.files.find(file => file.path === 'index.ts').content;
  assert.match(source, /"en": "Story"/);
  assert.doesNotMatch(source, /"uk": "Story"/);
});
