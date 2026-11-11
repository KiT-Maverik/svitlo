import assert from 'node:assert/strict';
import test from 'node:test';

import { defineText } from '../../contentBlocks/defineText/defineText';
import { defineContentSection } from '../../sections/defineContentSection/defineContentSection';
import { defineLesson } from './defineLesson';
import { lesson_Config_Schema } from './defineLesson.schemas';

const id = (suffix: string) => '663572e7-bd85-4516-86e2-3de07d209e' + suffix;
const text = defineText({
  type: 'text',
  id: id('01'),
  slug: 'paragraph',
  params: {},
  locale: { value: { en: 'Hello', uk: 'Привіт' } },
});
const section = defineContentSection({
  type: 'content',
  id: id('02'),
  slug: 'intro',
  params: {},
  locale: { title: 'Introduction', navigationLabel: '1' },
  content: { items: { paragraph: text }, order: ['paragraph'] },
});
const makeLesson = () =>
  defineLesson({
    id: id('03'),
    slug: 'exampleLesson',
    type: 'lesson',
    skills: [],
    params: {
      requireQuiz: false,
      languages: ['en', 'uk'],
      sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
    },
    locale: { title: { en: 'Example', uk: 'Приклад' } },
    section: { items: { intro: section }, order: ['intro'] },
    flashcards: [],
  });

test('Lesson projects its own base/locale and keeps child Section configurators', () => {
  const lesson = makeLesson();
  assert.equal('programId' in lesson.config.base, false);
  assert.deepEqual(lesson.config.locales(), { locale: { title: { en: 'Example', uk: 'Приклад' } } });
  assert.equal(lesson.section.items.intro, section);
  assert.equal('section' in lesson.config.base, false);
  assert.equal(
    lesson_Config_Schema.safeParse(lesson.config.base).success,
    false,
    'locale projection is sparse, not the complete authored config',
  );
});

test('Lesson override changes only sparse Section composition and never mutates original', () => {
  const lesson = makeLesson();
  const second = defineContentSection({
    type: 'content',
    id: id('05'),
    slug: 'extra',
    params: {},
    locale: { title: 'Extra', navigationLabel: '2' },
    content: { items: {}, order: [] },
  });

  lesson.override.section.add('extra', second);
  assert.equal(lesson.config.overrides.section?.items?.extra, second);
  assert.deepEqual(lesson.config.overrides.section?.order, ['intro', 'extra']);
  lesson.override.section.order(['extra', 'intro']);
  assert.deepEqual(lesson.config.overrides.section?.order, ['extra', 'intro']);
  lesson.override.section.disable(['intro']);
  assert.equal(lesson.config.overrides.section?.items?.intro, false);
  assert.deepEqual(lesson.config.overrides.section?.order, ['extra']);
  assert.deepEqual(lesson.section.order, ['intro']);
  assert.deepEqual(Object.keys(lesson.section.items), ['intro']);

  lesson.override.params({ sections: { allowSkipping: true } });
  assert.deepEqual(lesson.config.overrides.params, { sections: { allowSkipping: true } });
  lesson.disable();
  assert.deepEqual(lesson.config.overrides.params, { disabled: true });
  assert.throws(() => lesson.override.section.add('extra', second), /duplicate/);
});

test('Lesson rejects mismatched collection keys and raw child configs', () => {
  assert.throws(
    () =>
      defineLesson({
        id: id('03'),
        slug: 'wrong',
        type: 'lesson',
        skills: [],
        params: {
          requireQuiz: false,
          languages: ['en'],
          sections: {
            allowNavigation: true,
            allowSkipping: true,
            showIndexes: false,
          },
        },
        locale: { title: 'Wrong' },
        section: { items: { wrongKey: section }, order: ['wrongKey'] },
        flashcards: [],
      }),
    /matching child configurator/,
  );
});

test('Lesson Question Bank validates keyed child identity without invoking question validation', () => {
  const lesson = makeLesson();
  const question = {
    slug: 'question',
    type: 'selectOneAnswer',
    config: {
      locales: () => ({}),
      validate: () => {
        throw new Error('Child must validate itself');
      },
    },
  };
  const withQuestions = (slug: string) =>
    ({
      ...lesson.config.base,
      locale: { title: 'Example' },
      section: lesson.section,
      flashcards: [],
      questions: { selectOneAnswer: { [slug]: question } },
    }) as unknown as Parameters<typeof lesson.config.validate>[0];

  assert.doesNotThrow(() => lesson.config.validate(withQuestions('question')));
  assert.throws(() => lesson.config.validate(withQuestions('wrongSlug')), /matching Lesson Question configurator/);
});
