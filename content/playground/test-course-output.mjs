import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { assembleCourseLesson, assembleCourseToc } from '@svitlo/engine/runtime';

const root = process.cwd();
const courseId = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const lessonId = 'f760e7b7-9f77-5027-89ce-4e40d9d031a1';
const files = JSON.parse(readFileSync(join(root, 'dist/manifest.json'), 'utf8')).files;
const read = (...segments) => JSON.parse(readFileSync(join(root, 'dist/static', ...segments), 'utf8'));
const optional = (...segments) => {
  try {
    return read(...segments);
  } catch (error) {
    if (error.code === 'ENOENT') return undefined;
    throw error;
  }
};
const course = language => ({
  base: read('data', 'courses', courseId, 'base.json'),
  locale: { [language]: optional('data', 'courses', courseId, language + '.json') },
});
const lesson = language => ({
  base: read('data', 'lessons', lessonId.slice(-1), lessonId, 'base.json'),
  locale: { [language]: optional('data', 'lessons', lessonId.slice(-1), lessonId, language + '.json') },
});

test('new Course publication is a compact slug-keyed hierarchy, not full nested Lessons', () => {
  const base = course('uk').base;
  assert.equal(base.type, 'course');
  assert.equal(base.id, courseId);
  assert.deepEqual(base.content.order, ['lightLaboratory']);
  const module = base.content.items.lightLaboratory;
  assert.deepEqual(module.content.order, ['lightFoundations', 'lightExploration']);
  const chapter = module.content.items.lightFoundations;
  const child = chapter.content.items.lightDiscovery;
  assert.deepEqual(child, { type: 'lesson', id: lessonId });
  assert.equal(Object.hasOwn(child, 'section'), false);
  assert(files.includes('data/courses/' + courseId + '/base.json'));
});

test('localized Course files are sparse and do not repeat unchanged siblings', () => {
  const localized = course('uk').locale.uk;
  if (localized !== undefined) {
    assert.equal(Object.hasOwn(localized, 'id'), false);
    assert.equal(Object.hasOwn(localized, 'type'), false);
    assert.equal(Object.hasOwn(localized.content ?? {}, 'order'), false);
  } else {
    assert.equal(files.includes('data/courses/' + courseId + '/uk.json'), false);
  }
});

test('Course-context Lesson assembler consumes actual published Course and Lesson JSON', () => {
  const language = 'uk';
  const props = assembleCourseLesson({
    courseId,
    lessonId,
    language,
    course: course(language),
    lesson: lesson(language),
  });
  assert.equal(props.id, lessonId);
  assert.equal(props.type, 'lesson');
  assert(Array.isArray(props.section));
  assert.equal(typeof props.locale.title, 'string');
});

test('Course demonstration Lessons never expose a Quiz without their own published Question bank', () => {
  for (const id of [
    'f760e7b7-9f77-5027-89ce-4e40d9d031a1',
    'b256e7b2-9f7d-5a9a-a0cb-3f3c2734b8a2',
    'fb3b328a-0dd6-55f1-9bb9-7c80ea1ac91b',
  ]) {
    const base = read('data', 'lessons', id.slice(-1), id, 'base.json');
    assert.equal(
      base.params.quizRequiredForCompletion,
      false,
      'demo Lesson ' + id + ' must not claim a required unowned Quiz',
    );
    assert(
      !base.section.some(section => section.type === 'quiz' || section.type === 'flashcards'),
      'demo Lesson ' + id + ' must not refer to independently owned assessment banks',
    );
  }
});

test('new Lesson and Course files are in the package manifest', () => {
  assert(files.includes('data/lessons/' + lessonId.slice(-1) + '/' + lessonId + '/base.json'));
  assert(files.some(name => name.startsWith('data/courses/' + courseId + '/') && name.endsWith('.json')));
  assert(files.some(name => name.startsWith('data/skills/') && name.endsWith('.json')));
});

test('compiled manifest carries sparse localized Course TOC for portable hosts', () => {
  const path = 'data/courses/' + courseId + '/toc/';
  assert(files.includes(path + 'base.json'));
  const base = read('data', 'courses', courseId, 'toc', 'base.json');
  const localized = optional('data', 'courses', courseId, 'toc', 'uk.json');
  assert.equal(files.includes(path + 'uk.json'), localized !== undefined);
  const resolved = assembleCourseToc(base, localized, courseId, 'uk');
  assert.equal(resolved.id, courseId);
  assert.equal(resolved.content.items.lightLaboratory.type, 'module');
  assert.equal(resolved.content.items.lightLaboratory.content.items.lightFoundations.type, 'chapter');
  const lessonNode = resolved.content.items.lightLaboratory.content.items.lightFoundations.content.items.lightDiscovery;
  assert.equal(lessonNode.id, lessonId);
  assert.equal(typeof lessonNode.label, 'string');
  assert(!JSON.stringify(base).includes('"section"'));
});
