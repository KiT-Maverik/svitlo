import assert from 'node:assert/strict';
import test from 'node:test';

import { defineLesson } from '../../lessons/defineLesson';
import { defineChapter } from '../defineChapter';
import { defineModule } from '../defineModule';
import { defineCourse } from './defineCourse';
import { course_Config_Schema, type Course_Config } from './defineCourse.schemas';

const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
const languages = ['en', 'uk'] as const;

const createLesson = (slug: string, suffix: string) =>
  defineLesson({
    id: id(suffix),
    slug,
    type: 'lesson',
    skills: [],
    params: {
      languages,
      requireQuiz: false,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title: { en: 'Lesson', uk: 'Урок' } },
    section: { items: {}, order: [] },
    flashcards: [],
  });

const lesson = createLesson('lesson', 'c1');
const chapterInput = {
  id: id('c2'),
  type: 'chapter' as const,
  slug: 'chapter',
  params: { iconKey: 'book' },
  locale: { title: { en: 'Chapter', uk: 'Розділ' } },
  content: { items: { lesson }, order: ['lesson'] },
};
const chapter = defineChapter(chapterInput);
const moduleInput = {
  id: id('c3'),
  type: 'module' as const,
  slug: 'module',
  params: {},
  locale: { title: 'Module' },
  content: { items: { chapter }, order: ['chapter'] },
};
const module = defineModule(moduleInput);
const courseInput = {
  id: id('c4'),
  type: 'course' as const,
  slug: 'course',
  params: { languages, scenarioMode: 'story' as const },
  locale: { title: { en: 'Course', uk: 'Курс' }, description: 'Course introduction' },
  content: { items: { module }, order: ['module'] },
};

test('Course hierarchy retains slugged configurators and projects only own metadata', () => {
  const course = defineCourse(courseInput);

  assert.equal(course.slug, 'course');
  assert.equal(course.content.items.module, module);
  assert.equal(module.content.items.chapter, chapter);
  assert.equal(chapter.content.items.lesson, lesson);
  assert.equal(course.config.base.params.scenarioMode, 'story');
  assert.deepEqual(course.config.locales(), { locale: { title: { en: 'Course', uk: 'Курс' } } });
  assert.deepEqual(course.config.base.locale, { description: 'Course introduction' });
  assert.equal('content' in course.config.base, false);
  assert.equal('content' in module.config.base, false);
  assert.equal('content' in chapter.config.base, false);
  assert.equal(course_Config_Schema.safeParse(courseInput).success, true);
});

test('Course hierarchy permits direct content editing and explicit revalidation', () => {
  const course = defineCourse(courseInput);
  const extraLesson = createLesson('extraLesson', 'c5');

  Object.assign(course.content.items, { extraLesson });
  course.content.order.push('extraLesson');
  assert.doesNotThrow(() =>
    course.config.validate({ ...courseInput, content: course.content } as unknown as Course_Config),
  );

  course.content.order.push('module');
  assert.throws(
    () => course.config.validate({ ...courseInput, content: course.content } as unknown as Course_Config),
    /Duplicate slug/,
  );
  assert.deepEqual(courseInput.content.order, ['module'], 'authored content was not mutated');
});

test('Course, Module and Chapter enforce their allowed child types and key order', () => {
  assert.throws(
    () => defineCourse({ ...courseInput, content: { items: { wrongKey: module }, order: ['wrongKey'] } }),
    /does not match configurator slug/,
  );
  assert.throws(
    () => defineModule({ ...moduleInput, content: { items: { module }, order: ['module'] } as never }),
    /Unsupported Module child type/,
  );
  assert.throws(
    () => defineChapter({ ...chapterInput, content: { items: { chapter }, order: ['chapter'] } as never }),
    /Unsupported Chapter child type/,
  );
  assert.throws(
    () => defineCourse({ ...courseInput, params: { languages: ['en', 'en'] as unknown as typeof languages } }),
    /unique/,
  );
});

test('Parent validators never call nested child validators', () => {
  const course = defineCourse(courseInput);
  const brokenChild = {
    ...module,
    config: {
      ...module.config,
      validate: () => {
        throw new Error('Child validator was called');
      },
    },
  };
  assert.doesNotThrow(() =>
    course.config.validate({
      ...courseInput,
      content: { items: { module: brokenChild }, order: ['module'] },
    } as unknown as Course_Config),
  );

  course.override.params({ scenarioMode: 'none' });
  assert.deepEqual(course.config.overrides.params, { scenarioMode: 'none' });
  course.override.locale({ title: 'Alternative title' });
  assert.deepEqual(course.config.overrides.locale, { title: 'Alternative title' });
  course.disable();
  assert.deepEqual(course.config.overrides.params, { disabled: true });
});
