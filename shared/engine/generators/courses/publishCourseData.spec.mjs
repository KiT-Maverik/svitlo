import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  defineChapter,
  defineCourse,
  defineLesson,
  defineModule,
  defineEpisode,
  defineContentSection,
  defineText,
  placeLesson,
  defineLessonStub,
} from '@svitlo/engine/build';
import { assembleCourseTree, assembleCourseLesson, courseActivities, findCourseEpisode } from '@svitlo/engine/runtime';
import { mergeCourseData, renderCourseFiles, publishCourse } from './publishCourseData.mjs';

const id = n => '11111111-1111-4111-8111-' + n.toString(16).padStart(12, '0');
const languages = ['en', 'uk'];

function fixture() {
  const lesson = { id: id(4), slug: 'originalLesson', type: 'lesson' };
  const chapter = { id: id(3), slug: 'chapter', type: 'chapter', children: ['practice'], practice: lesson };
  const module = { id: id(2), slug: 'module', type: 'module', children: ['chapter'], chapter };
  const fullLesson = {
    ...lesson,
    skills: ['private skill'],
    children: [],
    params: { languages, quizRequiredForCompletion: false },
    locale: { title: 'Lesson' },
  };
  const base = {
    id: id(1),
    slug: 'course',
    type: 'course',
    params: { languages },
    locale: { title: 'Course', description: 'Example' },
    children: ['module'],
    module: {
      id: id(2),
      slug: 'module',
      type: 'module',
      params: {},
      locale: { title: 'Module' },
      children: ['chapter'],
      chapter: {
        id: id(3),
        slug: 'chapter',
        type: 'chapter',
        params: {},
        locale: { title: 'Chapter' },
        children: ['practice'],
        practice: fullLesson,
      },
    },
  };
  const course = {
    id: id(1),
    slug: 'course',
    type: 'course',
    children: ['module'],
    module,
    config: { base: { params: { languages } } },
    build: {
      data: () => ({
        base: structuredClone(base),
        locale: {
          uk: {
            locale: { title: 'Курс' },
            module: {
              locale: { title: 'Модуль' },
              chapter: { locale: { title: 'Розділ' }, practice: { locale: { title: 'Урок' } } },
            },
          },
        },
      }),
    },
  };
  return course;
}

test('compact Course publication retains direct placement keys without full Lesson payload', () => {
  const files = renderCourseFiles(fixture());
  assert.deepEqual([...files.keys()], ['base.json', 'uk.json', 'toc/base.json', 'toc/uk.json']);
  const base = JSON.parse(files.get('base.json'));
  assert.deepEqual(base.children, ['module']);
  assert.deepEqual(base.module.children, ['chapter']);
  assert.deepEqual(base.module.chapter.children, ['practice']);
  assert.deepEqual(base.module.chapter.practice, { id: id(4), type: 'lesson' });
  assert.equal('content' in base, false);
  assert.equal(files.get('base.json').includes('private skill'), false);
  const uk = JSON.parse(files.get('uk.json'));
  assert.deepEqual(Object.keys(uk), ['locale', 'module']);
  assert.deepEqual(Object.keys(uk.module), ['locale', 'chapter']);
  assert.equal(uk.module.chapter.locale.title, 'Розділ');
  assert.equal('children' in uk.module, false);
  assert.equal(mergeCourseData(base, uk).module.locale.title, 'Модуль');
  const toc = mergeCourseData(JSON.parse(files.get('toc/base.json')), JSON.parse(files.get('toc/uk.json')));
  assert.deepEqual(toc.module.chapter.children, ['practice']);
  assert.equal(toc.module.chapter.practice.label, 'Урок');
});

test('publisher preserves source, rejects unsupported overrides and malformed JSON', () => {
  const course = fixture();
  const original = structuredClone(course.build.data());
  assert.throws(() => renderCourseFiles(course, { overrides: {} }), /Unsupported Course publication options/);
  const files = renderCourseFiles(course);
  assert(files.has('base.json'));
  assert.deepEqual(course.build.data(), original, 'authoring Build results remain untouched');
  const build = course.build.data;
  course.build.data = () => {
    const broken = build();
    broken.base.module.extra = undefined;
    return broken;
  };
  assert.throws(() => renderCourseFiles(course), /Non-JSON/);
  course.build.data = () => {
    const broken = build();
    broken.base.module.children = ['missing'];
    return broken;
  };
  assert.throws(() => renderCourseFiles(course));
  assert.throws(() => renderCourseFiles(fixture(), { languages: [] }), /nonempty/);
});

test('publishes atomically, checks bytes, removes stale own files and preserves unrelated files', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-'));
  try {
    const course = fixture();
    const result = publishCourse(course, { packageRoot: home });
    const root = path.join(home, 'generated', 'courses', id(1));
    assert.equal(result.directory, root);
    publishCourse(course, { packageRoot: home, check: true });
    fs.writeFileSync(path.join(root, 'stale.json'), '{}');
    assert.throws(() => publishCourse(course, { packageRoot: home, check: true }), /file mismatch/);
    fs.writeFileSync(path.join(home, 'other.txt'), 'preserve');
    publishCourse(course, { packageRoot: home });
    assert.equal(fs.existsSync(path.join(root, 'stale.json')), false);
    assert.equal(fs.readFileSync(path.join(home, 'other.txt'), 'utf8'), 'preserve');
    fs.writeFileSync(path.join(root, 'base.json'), '{}');
    assert.throws(() => publishCourse(course, { packageRoot: home, check: true }), /Stale Course/);
    assert.throws(() => publishCourse(course, { outputRoot: path.join(home, 'missing'), check: true }));
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('symlinked output directories cannot be used as a publication target', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-path-'));
  try {
    fs.mkdirSync(path.join(home, 'real'));
    fs.symlinkSync(path.join(home, 'real'), path.join(home, 'alias'), 'dir');
    assert.throws(() => publishCourse(fixture(), { outputRoot: path.join(home, 'alias', 'courses') }), /Symlink/);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

function realLesson(n = 10) {
  return defineLesson({
    id: id(n),
    slug: 'originalLesson',
    type: 'lesson',
    skills: [],
    params: {
      languages,
      quizRequiredForCompletion: false,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title: { en: 'Original', uk: 'Оригінал' } },
    children: [],
  });
}

test('real configurators retain contextual Lesson alias and independent sparse placement patches', () => {
  const lesson = realLesson();
  const chapter = defineChapter({
    id: id(11),
    slug: 'chapter',
    type: 'chapter',
    params: {},
    locale: { title: 'Chapter' },
    children: ['adapted'],
    adapted: placeLesson(lesson, {
      params: { sections: { allowSkipping: false } },
      locale: { title: { uk: 'Тіньова практика' } },
    }),
  });
  const module = defineModule({
    id: id(12),
    slug: 'module',
    type: 'module',
    params: {},
    locale: { title: 'Module' },
    children: ['chapter'],
    chapter,
  });
  const course = defineCourse({
    id: id(13),
    slug: 'course',
    type: 'course',
    params: { languages },
    locale: { title: 'Course', description: 'Two placements' },
    children: ['module', 'direct'],
    module,
    direct: placeLesson(lesson, { locale: { title: 'Direct title' } }),
  });
  const files = renderCourseFiles(course);
  const base = JSON.parse(files.get('base.json'));
  const localized = mergeCourseData(base, JSON.parse(files.get('uk.json')));
  assert.deepEqual(base.module.chapter.adapted, {
    id: lesson.id,
    type: 'lesson',
    overrides: { params: { sections: { allowSkipping: false } } },
  });
  assert.equal(base.direct.overrides.locale.title, 'Direct title');
  assert.equal(localized.module.chapter.adapted.overrides.locale.title, 'Тіньова практика');
  const resource = lesson.build.data({ languages });
  const publication = { base, locale: { uk: JSON.parse(files.get('uk.json')) } };
  assert.equal(
    assembleCourseLesson({
      courseId: course.id,
      lessonId: lesson.id,
      language: 'uk',
      placement: 'module/chapter/adapted',
      lesson: resource,
      course: publication,
    }).locale.title,
    'Тіньова практика',
  );
  assert.equal(
    assembleCourseLesson({
      courseId: course.id,
      lessonId: lesson.id,
      language: 'uk',
      placement: 'direct',
      lesson: resource,
      course: publication,
    }).locale.title,
    'Direct title',
  );
  assert.throws(
    () =>
      assembleCourseLesson({
        courseId: course.id,
        lessonId: lesson.id,
        language: 'uk',
        lesson: resource,
        course: publication,
      }),
    /Ambiguous Lesson ID/,
  );
  assert.equal(lesson.build.data({ languages }).base.params.sections.allowSkipping, true);
  assert(!files.get('base.json').includes('"skills"'));
});

test('real completed Course-owned Episode keeps ordered Sections and localized Data', () => {
  const text = defineText({
    id: id(21),
    slug: 'line',
    type: 'text',
    params: {},
    locale: { value: { en: 'Hello', uk: 'Привіт' } },
  });
  const section = defineContentSection({
    id: id(22),
    slug: 'intro',
    type: 'content',
    params: {},
    locale: { title: 'Introduction', navigationLabel: '1' },
    children: ['line'],
    line: text,
  });
  const episode = defineEpisode({
    id: id(23),
    slug: 'story',
    type: 'episode',
    params: { languages },
    locale: { title: { en: 'Story', uk: 'Історія' } },
    children: ['intro'],
    intro: section,
  });
  const course = defineCourse({
    id: id(24),
    slug: 'course',
    type: 'course',
    params: { languages },
    locale: { title: 'Course', description: 'Story' },
    children: ['story'],
    story: episode,
  });
  const files = renderCourseFiles(course);
  const localized = assembleCourseTree(
    JSON.parse(files.get('base.json')),
    JSON.parse(files.get('uk.json')),
    course.id,
    'uk',
  );
  assert.deepEqual(
    courseActivities(localized).map(entry => entry.placement),
    ['story'],
  );
  const selected = findCourseEpisode(localized, episode.id);
  assert.equal(selected?.locale.title, 'Історія');
  assert.deepEqual(selected?.children, ['intro']);
  assert.equal(selected?.intro.line.locale.value, 'Привіт');
});

test('Draft child can be previewed but cannot be published to production', () => {
  const pending = defineLessonStub({ id: id(44), slug: 'pending' });
  const course = defineCourse({
    id: id(45),
    slug: 'course',
    type: 'course',
    params: { languages: ['en'] },
    locale: { title: 'Work in progress', description: 'Draft only' },
    children: ['pending'],
    pending,
  });
  assert.throws(() => renderCourseFiles(course), /draft stub/i);
  const files = renderCourseFiles(course, { languages: ['en'], mode: 'draft' });
  const base = JSON.parse(files.get('base.json'));
  assert.equal(base.pending.draft, true);
  assert.equal(base.pending.children.length > 0, true);
  assert.throws(() => assembleCourseTree(base, undefined, course.id, 'en'), /draft/i);
  assert.equal(assembleCourseTree(base, undefined, course.id, 'en', 'draft').pending.draft, true);
});
