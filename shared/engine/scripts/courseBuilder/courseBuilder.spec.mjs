import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import {
  buildCoursePlan,
  groupUuid,
  renderCourseSource,
  resolveCourseSource,
  verifyOrWriteGenerated,
} from './courseBuilder.mjs';

const root = path.resolve(fileURLToPath(new URL('../../../..', import.meta.url)));
const schema = JSON.parse(
  fs.readFileSync(path.join(root, 'studio/skills/course-workflow/course-toc.schema.json'), 'utf8'),
);
const overridesSchema = JSON.parse(
  fs.readFileSync(path.join(root, 'studio/skills/course-workflow/course-overrides.schema.json'), 'utf8'),
);

const id = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const lessonA = 'd3048d21-8690-5255-b62c-984c69ac272c';
const lessonB = 'f760e7b7-9f77-5027-89ce-4e40d9d031a1';
const skillId = '00b48cb0-13c2-4531-84ac-1b8d44f11055';

const lesson = (key, lessonId = lessonA) => ({
  type: 'lesson',
  key,
  title: key,
  objective: 'Learn the skill',
  skills: [{ id: skillId, name: 'Skill', source: 'content/math/data/skills/arithmetic/test.data.ts' }],
  lessonId,
});
const chapter = (key, children) => ({ type: 'chapter', key, title: key, children });
const module = (key, children) => ({ type: 'module', key, title: key, children });
const method = (langs = ['uk', 'en'], docLang = 'en') =>
  [
    '---',
    'schemaVersion: 1',
    'kind: course-methodology',
    'status: approved',
    'courseId: ' + id,
    'documentLanguage: ' + docLang,
    'supportedLanguages: [' + langs.join(', ') + ']',
    '---',
    '# Approved Course',
  ].join('\n');
const toc = (content, langs = ['uk', 'en'], documentLanguage = 'uk') =>
  JSON.stringify({
    schemaVersion: 1,
    kind: 'course-toc-plan',
    status: 'approved',
    courseId: id,
    documentLanguage,
    supportedLanguages: langs,
    content,
    openIssues: [],
  });
const known = new Set(['uk', 'en', 'fr']);
const resolver = async lessonId => ({
  id: lessonId,
  languages: ['uk', 'en'],
  source: '/repo/content/math/data/lessons/c/' + lessonId + '/lesson.data.ts',
  exportName: 'lesson_Data',
  sections: [
    { slug: 'theory', type: 'theory', blocks: [{ slug: 'intro' }, { slug: 'summary' }] },
    { slug: 'practice', type: 'practice', blocks: [{ slug: 'task' }] },
    { slug: 'quiz', type: 'quiz', blocks: [] },
  ],
});
const generate = (nodes, opts = {}) =>
  buildCoursePlan({
    methodologyText: opts.method ?? method(),
    tocText: opts.toc ?? toc(nodes),
    schema,
    supportedCodes: known,
    resolveLesson: opts.resolver ?? resolver,
    ...(opts.overrides
      ? {
          overridesText: JSON.stringify(opts.overrides),
          overridesSchema,
          resolveOwnedSource: async () => undefined,
        }
      : {}),
  });
const output = '/repo/content/math/data/courses/7/' + id + '/toc.generated.ts';

test('Course with only Lessons: preserves sequence, ID and source-only slot labels', async () => {
  const plan = await generate([lesson('one', lessonB), lesson('two', lessonA)]);
  assert.deepEqual(
    plan.tree.map(x => x.lessonId),
    [lessonB, lessonA],
  );
  const code = renderCourseSource(plan, output);
  assert(code.includes('createCourse<CourseLanguages>'));
  assert(code.includes('courseLessonSlotTitleSources'));
  assert(code.indexOf('lesson0') < code.lastIndexOf('lesson1'));
  assert.equal(code.includes('createEpisode'), false);
  assert.equal(code.includes('createLessonOverrides'), false);
});

test('Modules/Chapters preserve nesting and stable UUIDv5 keys', async () => {
  const nodes = [module('main', [chapter('basics', [lesson('intro')]), lesson('next', lessonB)])];
  const a = await generate(nodes);
  const b = await generate(nodes);
  assert.equal(a.tree[0].id, b.tree[0].id);
  assert.equal(a.tree[0].id, groupUuid(id, 'module', 'main'));
  assert.match(a.tree[0].id, /^[0-9a-f-]{36}$/);
  assert.equal(a.tree[0].children[0].type, 'chapter');
  const code = renderCourseSource(a, output);
  assert(code.includes('createModule<CourseLanguages>'));
  assert(code.includes('createChapter<CourseLanguages>'));
  assert.equal(renderCourseSource(a, output), renderCourseSource(b, output));
});

test('Reuse of one Lesson is resolved once and imports canonical Data once', async () => {
  let calls = 0;
  const plan = await generate([lesson('intro'), lesson('review')], {
    resolver: async id => {
      calls++;
      return resolver(id);
    },
  });
  assert.equal(calls, 1);
  assert.equal(plan.lessons.size, 1);
  assert.equal((renderCourseSource(plan, output).match(/import \{ lesson_Data/g) ?? []).length, 1);
  assert.deepEqual(
    plan.tree.map(x => x.lessonId),
    [lessonA, lessonA],
  );
});

test('Missing matched Lesson UUID reports its slot', async () => {
  await assert.rejects(
    () =>
      generate([
        {
          ...lesson('unfinished'),
          lessonId: undefined,
        },
      ]),
    /SCHEMA|UNMATCHED_LESSON/,
  );
});

test('Unknown implemented Lesson UUID is a hard blocker, no empty Lesson generated', async () => {
  await assert.rejects(
    () =>
      generate([lesson('unknown')], {
        resolver: async () => null,
      }),
    /MISSING_LESSON.*d3048d21/,
  );
});

test('Wrong resolved Lesson UUID fails closed', async () => {
  await assert.rejects(
    () =>
      generate([lesson('wrong')], {
        resolver: async x => ({ ...(await resolver(x)), id: lessonB }),
      }),
    /LESSON_ID/,
  );
});

test('Schema rejects impossible nesting and unsupported explicit order', async () => {
  await assert.rejects(() => generate([chapter('bad', [module('nested', [lesson('inner')])])]), /SCHEMA/);
  await assert.rejects(() => generate([{ ...lesson('ordered'), order: 99 }]), /SCHEMA/);
  await assert.rejects(() => generate([{ ...lesson('empty'), lessonId: 'not-a-uuid' }]), /SCHEMA/);
});

test('Duplicate editorial keys are rejected even for distinct Lesson IDs', async () => {
  await assert.rejects(() => generate([lesson('repeat'), chapter('repeat', [lesson('unique')])]), /DUPLICATE_KEY/);
});

test('Lesson without a Course locale reports exactly what is missing', async () => {
  await assert.rejects(
    () =>
      generate([lesson('locales')], {
        resolver: async x => ({ ...(await resolver(x)), languages: ['en'] }),
      }),
    /LESSON_LOCALES.*uk/,
  );
});

test('Lesson may implement additional languages beyond its Course', async () => {
  const plan = await generate([lesson('superset')], {
    resolver: async x => ({ ...(await resolver(x)), languages: ['uk', 'en', 'fr'] }),
  });
  assert.deepEqual(plan.languages, ['uk', 'en']);
  assert.deepEqual(plan.lessons.get(lessonA).languages, ['uk', 'en', 'fr']);
  const code = renderCourseSource(plan, output);
  assert(code.includes('type LessonCoversCourse<Actual extends readonly string[]>'));
  assert(code.includes('LessonCoversCourse<typeof lesson0.parameters.languages>'));
});

test('Methodology and TOC document languages are independent', async () => {
  const plan = await generate([module('foundation', [lesson('intro')])], {
    method: method(['uk', 'en'], 'en'),
    toc: toc([module('foundation', [lesson('intro')])], ['uk', 'en'], 'uk'),
  });
  const code = renderCourseSource(plan, output);
  assert(code.includes('"module/foundation": { "uk": "foundation" }'));
  assert(!code.includes('"module/foundation": { "en": "foundation" }'));
  assert(code.includes('Record<CourseLanguage, string>'));
  assert(code.includes('Partial<CourseLocalizedGroupTitles[K]>'));
  const sf = ts.createSourceFile('toc.generated.ts', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert.deepEqual(sf.parseDiagnostics, []);
});

test('Invariant titles are passed as scalar, not faked locale dictionaries', async () => {
  const nodes = [{ ...module('common', [lesson('intro')]), title: { value: 'HTML', invariant: true } }];
  const plan = await generate(nodes);
  const code = renderCourseSource(plan, output);
  assert(code.includes('value: "HTML"'));
  assert(!code.includes('"module/common": Record<CourseLanguage, string>'));
});

test('Invalid locale declarations, approval and differing course IDs block generation', async () => {
  const nodes = [lesson('intro')];
  await assert.rejects(() => generate(nodes, { toc: toc(nodes, ['uk', 'fr']) }), /LANGUAGES/);
  await assert.rejects(() => generate(nodes, { toc: toc(nodes, ['xx']) }), /LANGUAGES/);
  await assert.rejects(() => generate(nodes, { toc: toc(nodes, ['en', 'en']) }), /SCHEMA/);
  await assert.rejects(() => generate(nodes, { toc: toc(nodes).replace('"approved"', '"draft"') }), /APPROVAL/);
  await assert.rejects(() => generate(nodes, { method: method().replace(id, lessonB) }), /COURSE_ID/);
});

test('Unknown Episode/Override editorial fields cannot silently enter Course plan', async () => {
  await assert.rejects(() => generate([{ type: 'episode', key: 'act1', title: 'Act 1', children: [] }]), /SCHEMA/);
  await assert.rejects(() => generate([{ ...lesson('intro'), overrides: { title: 'Unapproved' } }]), /SCHEMA/);
});

test('Writing is idempotent; check mode is read-only and rejects drift', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'course-builder-test-'));
  const filename = path.join(directory, 'toc.generated.ts');
  try {
    const code = renderCourseSource(await generate([lesson('first')]), filename);
    assert.throws(() => verifyOrWriteGenerated(filename, code, '--check'), /STALE/);
    assert.equal(verifyOrWriteGenerated(filename, code, '--write'), true);
    const stat = fs.statSync(filename).mtimeMs;
    assert.equal(verifyOrWriteGenerated(filename, code, '--check'), false);
    assert.equal(verifyOrWriteGenerated(filename, code, '--write'), false);
    assert.equal(fs.statSync(filename).mtimeMs, stat);
    assert.throws(() => verifyOrWriteGenerated(filename, code + '\\n', '--check'), /STALE/);
    fs.writeFileSync(filename, '// manual edits must be kept\\n');
    assert.throws(() => verifyOrWriteGenerated(filename, code, '--write'), /OWNERSHIP/);
    assert.equal(fs.readFileSync(filename, 'utf8'), '// manual edits must be kept\\n');
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

const ref = (filename, symbol) => ({ path: filename, export: symbol });
const overrideInput = (slotKey, operations, lessonId = lessonA) => ({
  schemaVersion: 1,
  kind: 'course-lesson-overrides',
  status: 'approved',
  courseId: id,
  overrides: [{ slotKey, lessonId, operations }],
});

test('Approved Course-owned YAML emits typed sparse overrides with slug order and approved imports', async () => {
  const input = overrideInput('intro', [
    { type: 'params', sections: { allowSkipping: false } },
    { type: 'section-set', slug: 'theory', source: ref('patches/theory.ts', 'theory_Patch') },
    { type: 'block-set', sectionSlug: 'theory', slug: 'intro', source: ref('patches/intro.ts', 'intro_Patch') },
    { type: 'block-remove', sectionSlug: 'theory', slug: 'summary' },
    { type: 'block-order', sectionSlug: 'theory', entries: ['intro', { source: ref('blocks/hint.ts', 'hint_Block') }] },
    {
      type: 'section-order',
      entries: ['practice', 'theory', 'quiz', { source: ref('sections/story.ts', 'story_Section') }],
    },
  ]);
  const plan = await generate([lesson('intro')], { overrides: input });
  assert.equal(plan.overrides.size, 1);
  const code = renderCourseSource(plan, output);
  assert(code.includes('createLessonOverrides(lesson0)'));
  assert(code.includes('.setParams({ sections: {"allowSkipping":false} })'));
  assert(code.includes('.sections.bySlug["theory"].set(courseOwned0)'));
  assert(code.includes('.sections.bySlug["theory"].content.bySlug["intro"].set(courseOwned1)'));
  assert(code.includes('.sections.bySlug["theory"].content.remove("summary")'));
  assert(code.includes('.sections.bySlug["theory"].content.setOrder(["intro", courseOwned2])'));
  assert(code.includes('.sections.setOrder(["practice", "theory", "quiz", courseOwned3])'));
  assert(code.includes('import { story_Section as courseOwned3 } from "./sections/story";'));
  assert(code.includes('const override0 = createLessonOverrides(lesson0)'));
  assert(code.includes('    override0'));
  const ast = ts.createSourceFile('generated.ts', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert.deepEqual(ast.parseDiagnostics, []);
  assert(!code.includes('createLesson('));
});

test('Course-only override validates its TOC slot and canonical Lesson identity', async () => {
  await assert.rejects(
    () =>
      generate([lesson('intro')], {
        overrides: overrideInput('unknown', [{ type: 'params', sections: { allowNavigation: false } }]),
      }),
    /OVERRIDE_SLOT/,
  );
  await assert.rejects(
    () =>
      generate([lesson('intro')], {
        overrides: overrideInput('intro', [{ type: 'params', sections: { allowNavigation: false } }], lessonB),
      }),
    /OVERRIDE_SLOT/,
  );
});

test('Course override cannot address missing Section, ContentBlock or Quiz blocks', async () => {
  await assert.rejects(
    () =>
      generate([lesson('intro')], {
        overrides: overrideInput('intro', [{ type: 'section-remove', slug: 'unknown' }]),
      }),
    /OVERRIDE_SECTION/,
  );
  await assert.rejects(
    () =>
      generate([lesson('intro')], {
        overrides: overrideInput('intro', [{ type: 'block-remove', sectionSlug: 'theory', slug: 'missing' }]),
      }),
    /OVERRIDE_BLOCK/,
  );
  await assert.rejects(
    () =>
      generate([lesson('intro')], {
        overrides: overrideInput('intro', [{ type: 'block-order', sectionSlug: 'quiz', entries: ['intro'] }]),
      }),
    /OVERRIDE_QUIZ/,
  );
});

test('Course overrides reject malformed, incomplete or repeated slug orders', async () => {
  await assert.rejects(
    () =>
      generate([lesson('intro')], {
        overrides: overrideInput('intro', [
          { type: 'section-order', entries: ['theory', 'theory', 'practice', 'quiz'] },
        ]),
      }),
    /OVERRIDE_ORDER/,
  );
  await assert.rejects(
    () =>
      generate([lesson('intro')], {
        overrides: overrideInput('intro', [{ type: 'section-order', entries: ['theory'] }]),
      }),
    /OVERRIDE_ORDER/,
  );
  await assert.rejects(
    () =>
      generate([lesson('intro')], {
        overrides: overrideInput('intro', [{ type: 'block-order', sectionSlug: 'theory', entries: ['intro'] }]),
      }),
    /OVERRIDE_ORDER/,
  );
});

test('Course overrides reject per-slot patches for reused Lesson UUID', async () => {
  await assert.rejects(
    () =>
      generate([lesson('intro'), lesson('review')], {
        overrides: overrideInput('intro', [{ type: 'params', sections: { allowSkipping: true } }]),
      }),
    /OVERRIDE_REUSED_LESSON/,
  );
});

test('Course YAML schema forbids inline authored sections, unknown override fields and unsafe imports', async () => {
  await assert.rejects(
    () =>
      generate([lesson('intro')], {
        overrides: overrideInput('intro', [
          {
            type: 'section-order',
            entries: [
              'theory',
              'practice',
              'quiz',
              {
                id: 'new-id',
                slug: 'invented',
                type: 'scenario',
              },
            ],
          },
        ]),
      }),
    /SCHEMA/,
  );
  await assert.rejects(
    () =>
      generate([lesson('intro')], {
        overrides: overrideInput('intro', [
          { type: 'block-set', sectionSlug: 'theory', slug: 'intro', source: ref('../lessons/evil.ts', 'evil_Patch') },
        ]),
      }),
    /SCHEMA/,
  );
  await assert.rejects(
    () =>
      generate([lesson('intro')], {
        overrides: overrideInput('intro', [{ type: 'params', sections: { requireQuiz: false } }]),
      }),
    /SCHEMA/,
  );
  await assert.rejects(
    () =>
      generate([lesson('intro')], {
        overrides: { ...overrideInput('intro', [{ type: 'section-remove', slug: 'theory' }]), status: 'draft' },
      }),
    /APPROVAL/,
  );
});

test('Course-owned TS sources must exist and export their approved symbol inside their Course directory', async () => {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'course-owned-'));
  const external = fs.mkdtempSync(path.join(os.tmpdir(), 'course-external-'));
  try {
    const patches = path.join(folder, 'patches');
    fs.mkdirSync(patches);
    const source = path.join(patches, 'title.ts');
    fs.writeFileSync(source, 'export const title_Patch = { uk: "Назва", en: "Title" };\n');
    assert.deepEqual(await resolveCourseSource(folder, { path: 'patches/title.ts', export: 'title_Patch' }), {
      path: source,
      exportName: 'title_Patch',
    });
    await assert.rejects(
      () => resolveCourseSource(folder, { path: 'patches/title.ts', export: 'notExported' }),
      /COURSE_SOURCE.*notExported/,
    );
    await assert.rejects(
      () => resolveCourseSource(folder, { path: 'patches/missing.ts', export: 'title_Patch' }),
      /COURSE_SOURCE.*missing approved/,
    );
    fs.writeFileSync(path.join(external, 'external.ts'), 'export const external_Patch = {};\n');
    fs.symlinkSync(path.join(external, 'external.ts'), path.join(patches, 'external.ts'));
    await assert.rejects(
      () => resolveCourseSource(folder, { path: 'patches/external.ts', export: 'external_Patch' }),
      /COURSE_SOURCE.*resolves outside/,
    );
  } finally {
    fs.rmSync(folder, { recursive: true, force: true });
    fs.rmSync(external, { recursive: true, force: true });
  }
});
