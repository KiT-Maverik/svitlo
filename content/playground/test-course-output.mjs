import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { assembleCourseLesson } from '@svitlo/engine';

const root = process.cwd();
const courseId = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const lessonId = 'f760e7b7-9f77-5027-89ce-4e40d9d031a1';
const files = JSON.parse(readFileSync(join(root, 'dist/manifest.json'), 'utf8')).files;
const read = (...path) => JSON.parse(readFileSync(join(root, 'dist/static', ...path), 'utf8'));
const course = language => ({
  base: read('data', 'courses', courseId, 'base.json'),
  locale: { [language]: read('data', 'courses', courseId, language + '.json') },
});
const lesson = language => ({
  base: read('data', 'lessons', lessonId.slice(-1), lessonId, 'base.json'),
  locale: { [language]: read('data', 'lessons', lessonId.slice(-1), lessonId, language + '.json') },
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
  assert.equal(Object.hasOwn(localized, 'id'), false);
  assert.equal(Object.hasOwn(localized, 'type'), false);
  assert.equal(Object.hasOwn(localized.content ?? {}, 'order'), false);
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

test('new Lesson and Course files are in the package manifest', () => {
  assert(files.includes('data/lessons/' + lessonId.slice(-1) + '/' + lessonId + '/base.json'));
  assert(files.some(name => name.startsWith('data/courses/' + courseId + '/') && name.endsWith('.json')));
  assert(files.some(name => name.startsWith('data/skills/') && name.endsWith('.json')));
});
