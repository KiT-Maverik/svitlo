import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import ts from 'typescript';
import {
  normalizeCourseSource,
  parseArguments,
  parseCourseYaml,
  renderCourseSource,
  verifyOrWriteGenerated,
} from './courseBuilder.mjs';

const courseId = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
const source = {
  type: 'course',
  id: courseId,
  slug: 'spaceCourse',
  params: { languages: ['uk', 'en'] },
  locale: { title: { uk: 'Космос' }, description: { uk: 'Про Всесвіт' } },
  content: {
    order: ['opening', 'basics'],
    items: {
      opening: { type: 'lesson', lessonId },
      basics: {
        type: 'module',
        id: 'module-id',
        slug: 'basics',
        locale: { title: { uk: 'Основи' } },
        content: {
          order: ['first'],
          items: {
            first: {
              type: 'chapter',
              slug: 'first',
              locale: { title: { uk: 'Перший розділ' } },
              content: {
                items: {
                  episode: {
                    type: 'episode',
                    slug: 'episode',
                    params: { languages: ['uk'] },
                    locale: { title: { uk: 'Подорож' } },
                    section: {
                      order: ['intro'],
                      items: {
                        intro: {
                          type: 'content',
                          slug: 'intro',
                          content: {
                            order: ['welcome'],
                            items: {
                              welcome: {
                                type: 'markdown',
                                slug: 'welcome',
                                locales: { uk: 'Привіт, світ!' },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                  followUp: {
                    type: 'lesson',
                    lessonId: 'f760e7b7-9f77-5027-89ce-4e40d9d031a1',
                    source: { path: 'lessons/followUp.data.ts', export: 'followUp_Lesson' },
                  },
                },
                order: ['episode', 'followUp'],
              },
            },
          },
        },
      },
    },
  },
};

const studioPlan = {
  kind: 'course-toc-plan',
  status: 'draft',
  schemaVersion: 1,
  courseId,
  documentLanguage: 'uk',
  supportedLanguages: ['uk', 'en'],
  content: [
    {
      type: 'module',
      key: 'first',
      title: 'Початок',
      children: [
        {
          type: 'chapter',
          key: 'intro',
          title: { value: 'HTML', invariant: true },
          children: [{
            type: 'lesson',
            key: 'lesson-one',
            title: 'Редакційна назва',
            objective: 'Навчитись',
            skills: [{ id: 'skill-1', name: 'Skill' }],
            lessonId,
          }],
        },
      ],
    },
  ],
};

test('parses only YAML data, without methodology or approval requirements', () => {
  const parsed = parseCourseYaml(
    'type: course\nslug: spaceCourse\nparams:\n  languages: [uk, en]\n',
    'course.yaml',
  );
  assert.equal(parsed.type, 'course');
  assert.deepEqual(parsed.params.languages, ['uk', 'en']);
  assert.throws(() => parseCourseYaml('type: course\ntype: module\n'), /Course Scaffolder \[YAML\]/);
  assert.throws(() => parseCourseYaml('- array\n'), /expected a root YAML mapping/);
});

test('modern Config tree dispatches Course, Module, Chapter, Episode, Section, Block', () => {
  const rendered = renderCourseSource(source);
  assert.match(rendered, /export const spaceCourse_Course = defineCourse\(/);
  for (const name of ['defineCourse', 'defineModule', 'defineChapter', 'defineEpisode',
    'defineContentSection', 'defineMarkdown']) {
    assert(rendered.includes(name + '('), 'missing nested factory ' + name);
  }
  assert.match(rendered, /from "@svitlo\/engine\/build"/);
  assert(rendered.indexOf('"opening"') < rendered.indexOf('"basics"'));
  assert(rendered.includes('import { followUp_Lesson as standaloneLesson0 } from "./lessons/followUp.data";'));
  assert(rendered.includes('standaloneLesson0'));
  assert(!rendered.includes('defineLesson('));
  assert(!rendered.includes('createLessonOverrides'));
  assert(!rendered.includes('Ajv'));
  const tree = ts.createSourceFile('spaceCourse.data.ts', rendered, ts.ScriptTarget.Latest, true);
  assert.deepEqual(tree.parseDiagnostics, []); // Parsing is NOT typechecking the incomplete draft.
});

test('recurses into Carousel slides and CheckpointItem question/answer factories', () => {
  const nested = structuredClone(source);
  const items = nested.content.items.basics.content.items.first.content.items.episode
    .section.items.intro.content.items;
  items.gallery = {
    type: 'carousel',
    slug: 'gallery',
    slides: {
      order: ['one'],
      items: { one: { type: 'carouselSlide', slug: 'one', locale: { alt: { uk: 'Слайд' } } } },
    },
  };
  items.check = {
    type: 'checkpoint',
    slug: 'check',
    content: {
      order: ['task'],
      items: {
        task: {
          type: 'checkpointItem',
          slug: 'task',
          question: { type: 'text', slug: 'question', locale: { value: { uk: 'Запитання' } } },
          answer: {
            items: { yes: { type: 'text', slug: 'yes', locale: { value: { uk: 'Так' } } } },
            order: ['yes'],
          },
        },
      },
    },
  };
  const output = renderCourseSource(nested, { language: 'uk' });
  for (const factory of [
    'defineCarousel', 'defineCarouselSlide', 'defineCheckpoint',
    'defineCheckpointItem', 'defineText',
  ]) assert(output.includes(factory + '('), 'missing nested ' + factory);
  assert.match(output, /defineCheckpointItem\(\{[\s\S]*?"question": defineText\(/);
  assert.deepEqual(ts.createSourceFile('nested.ts', output, ts.ScriptTarget.Latest, true).parseDiagnostics, []);
});

test('direct Course config uses explicit source language and omits provenance from emitted factory', () => {
  const draft = structuredClone(source);
  draft.documentLanguage = 'uk';
  draft.locale.title.en = 'Universe';
  draft.content.items.basics.locale.title.en = 'Basics';
  draft.content.items.basics.content.items.first.content.items.episode.locale.title.en = 'Trip';
  const code = renderCourseSource(draft);
  assert.match(code, /"languages": \[\s*"uk",\s*"en",?\s*\]/);
  assert.doesNotMatch(code, /"documentLanguage"/);
  assert.doesNotMatch(code, /"Universe"/);
  assert.doesNotMatch(code, /"Basics"/);
  assert.doesNotMatch(code, /"Trip"/);
  assert.match(code, /"uk": "Космос"/);
});

test('canonical sibling Lesson imports are safe and do not fabricate a new Lesson', () => {
  const p = '../../../lessons/' + lessonId.slice(-1) + '/' + lessonId + '/lightLesson.data.ts';
  const yaml = {
    ...source,
    content: {
      items: { intro: { type: 'lesson', lessonId, source: { path: p, export: 'lightLesson_Lesson' } } },
      order: ['intro'],
    },
  };
  const generated = renderCourseSource(yaml);
  assert.match(generated, /import \{ lightLesson_Lesson as standaloneLesson0 \}/);
  assert(generated.includes(p.replace(/\.ts$/, '')));
  assert(!generated.includes('UNRESOLVED_LESSON_'));
  assert(!generated.includes('defineLesson('));
  assert(renderCourseSource({
    ...yaml, content: { items: { intro: { type: 'lesson', lessonId, source: { path: '../../../apps/web/payload.ts', export: 'injected' } } }, order: ['intro'] },
  }).includes('UNRESOLVED_LESSON_0'));
});

test('source-language Course text stays source-only with no invented locales', () => {
  const rendered = renderCourseSource(source);
  assert(rendered.includes('"languages": ['));
  assert(rendered.includes('"en"')); // Declared intended languages are preserved.
  assert(rendered.includes('"uk": "Космос"'));
  assert(rendered.includes('"uk": "Про Всесвіт"'));
  assert(!rendered.includes('"en": "Космос"'));
  assert(!rendered.includes('"en": "Про Всесвіт"'));
  assert(!rendered.includes('"en": "Основи"'));
  assert(!rendered.includes('as any'));
  assert.equal(rendered, renderCourseSource(source));
});

test('Studio toc.yaml is converted mechanically without inventing group IDs or Lesson bodies', () => {
  const config = normalizeCourseSource(studioPlan, 'spaceCourse');
  assert.deepEqual(config.params.languages, ['uk', 'en']);
  assert.equal(config.content.order[0], 'first');
  assert.deepEqual(config.content.items.first.locale.title, { uk: 'Початок' });
  assert.equal(config.content.items.first.content.items.intro.locale.title, 'HTML');
  assert.equal(config.content.items.first.id, undefined);
  assert.equal(config.locale, undefined); // TOC does not supply frontend metadata.
  const rendered = renderCourseSource(studioPlan, { slug: 'spaceCourse' });
  assert.match(rendered, /defineModule\(/);
  assert.match(rendered, /defineChapter\(/);
  assert.match(rendered, /UNRESOLVED_LESSON_0/);
  assert.match(rendered, new RegExp(lessonId));
  assert.match(rendered, /TODO: Import standalone Lesson/);
  assert(!rendered.includes('defineLesson('));
  assert(!rendered.includes('"en": "Початок"'));
  assert(!rendered.includes('schemaVersion'));
  assert(!rendered.includes('"skills"')); // Editorial methodology is retained in the YAML source.
});

test('missing or unknown node type is an explicit location-specific dispatch error', () => {
  assert.throws(() => renderCourseSource({ ...source, content: { items: { x: { slug: 'x' } }, order: ['x'] } }),
    /TYPE.*content\.items\.x: missing required type/);
  assert.throws(() => renderCourseSource({
    ...source, content: { items: { x: { type: 'unknown', slug: 'x' } }, order: ['x'] },
  }), /TYPE.*content\.items\.x: unknown type/);
  assert.throws(() => renderCourseSource({ content: [] }), /missing or unknown Course type/);
  assert.throws(() => renderCourseSource({
    ...studioPlan, content: [{ key: 'lost-type' }],
  }, { slug: 'spaceCourse' }), /TYPE.*content\[0\].*missing/);
});

test('referenced standalone Lessons are reused and missing import coordinates remain explicit handoffs', () => {
  const data = {
    ...source,
    content: {
      items: {
        again: { type: 'lesson', lessonId },
        again2: { type: 'lesson', lessonId },
      },
      order: ['again', 'again2'],
    },
  };
  const rendered = renderCourseSource(data);
  assert(rendered.includes('UNRESOLVED_LESSON_0'));
  assert(rendered.includes('UNRESOLVED_LESSON_1'));
  assert(!rendered.includes('defineLesson('));
  assert(rendered.includes('Never define a new Lesson here'));
  const input = { ...data, content: {
    items: {
      again: { type: 'lesson', lessonId, source: { path: '../elsewhere.ts', export: 'Bad' } },
    }, order: ['again'],
  } };
  assert(renderCourseSource(input).includes('UNRESOLVED_LESSON_0'));
  assert(!renderCourseSource(input).includes('from "../elsewhere"'));
});

test('Course-owned legacy override operations are preserved without claiming sparse conversion', () => {
  const overrides = {
    kind: 'course-lesson-overrides',
    courseId,
    status: 'draft',
    overrides: [{
      slotKey: 'lesson-one',
      lessonId,
      operations: [
        { type: 'params', sections: { allowSkipping: false } },
        { type: 'block-set', sectionSlug: 'intro', slug: 'note',
          source: { path: 'patches/note.ts', export: 'note_Patch' } },
      ],
    }],
  };
  const code = renderCourseSource(source, { overrides });
  assert(code.includes('spaceCourse_OverrideEditorial'));
  assert(code.includes('build.overrides('));
  assert(code.includes('course-lesson-overrides'));
  assert(code.includes(lessonId));
  assert(code.includes('patches/note.ts'));
  assert(code.includes('note_Patch'));
  assert(code.includes('block-set'));
  assert(code.includes('"allowSkipping": false'));
  assert(!code.includes('createLessonOverrides('));
  assert(!renderCourseSource(source).includes('OverrideEditorial'));
  assert.equal(code, renderCourseSource(source, { overrides }));
});

test('safe, idempotent write and --check never overwrite edited drafts', () => {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'course-draft-'));
  const filename = path.join(folder, 'spaceCourse.data.ts');
  const code = renderCourseSource(source);
  try {
    assert.throws(() => verifyOrWriteGenerated(filename, code, '--check'), /STALE/);
    assert.equal(verifyOrWriteGenerated(filename, code, '--write'), true);
    const before = fs.statSync(filename).mtimeMs;
    assert.equal(verifyOrWriteGenerated(filename, code, '--write'), false);
    assert.equal(verifyOrWriteGenerated(filename, code, '--check'), false);
    assert.equal(fs.statSync(filename).mtimeMs, before);
    fs.appendFileSync(filename, '// AI editorial changes\n');
    assert.throws(() => verifyOrWriteGenerated(filename, code, '--write'), /OWNERSHIP/);
    assert.throws(() => verifyOrWriteGenerated(filename, code, '--check'), /STALE/);
    assert(fs.readFileSync(filename, 'utf8').includes('AI editorial changes'));
    const symlink = path.join(folder, 'symlink.ts');
    fs.symlinkSync(filename, symlink);
    assert.throws(() => verifyOrWriteGenerated(symlink, code, '--check'), /PATH/);
  } finally {
    fs.rmSync(folder, { recursive: true, force: true });
  }
});

test('CLI confines input and output path selection', () => {
  assert.deepEqual(parseArguments([
    '--package', 'content/math', '--course', courseId, '--slug', 'spaceCourse',
    '--source', 'toc.yaml', '--write',
  ]), {
    packagePath: 'content/math',
    courseId,
    slug: 'spaceCourse',
    sourceFilename: 'toc.yaml',
    action: '--write',
  });
  assert.throws(() => parseArguments([
    '--package', '../content/math', '--course', courseId, '--write',
  ]), /ARGS/);
  assert.throws(() => parseArguments([
    '--package', 'content/math', '--course', courseId, '--source', '../bad.yaml', '--write',
  ]), /ARGS/);
});

test('ID-derived export filename does not fabricate an absent authored Course slug', () => {
  const code = renderCourseSource({
    type: 'course',
    id: courseId,
    content: { items: {}, order: [] },
  }, { outputSlug: 'course_30ecbde1' });
  assert(code.includes('course_30ecbde1_Course = defineCourse('));
  assert(!code.includes('"slug":'));
});

test('YAML-derived unresolved Lesson comments cannot inject TypeScript lines', () => {
  const code = renderCourseSource({
    ...source,
    content: {
      items: { injected: { type: 'lesson', lessonId: lessonId + '\nexport const injected = true;' } },
      order: ['injected'],
    },
  });
  assert(!code.includes('\nexport const injected = true;'));
  assert(code.includes('\\nexport const injected = true;'));
  const ast = ts.createSourceFile('draft.ts', code, ts.ScriptTarget.Latest, true);
  assert.deepEqual(ast.parseDiagnostics, []);
});
