import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { Lesson, Section } from '@svitlo/contracts/content';
import { createLessonOverrides } from './createLessonOverrides';

const languages = ['en', 'uk'] as const;

const lesson = {
  id: 'lesson-id',
  slug: 'light',
  title: { en: 'Light', uk: 'Світло' },
  flashcards: [],
  parameters: {
    requireQuiz: false,
    languages,
    sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
  },
  questions: {},
  sections: [
    {
      id: 'theory-id',
      slug: 'theory',
      type: 'theory',
      title: 'Theory',
      navigationLabel: 'Theory',
      content: [{ id: 'intro-id', slug: 'intro', type: 'markdown', locales: { en: 'Original', uk: 'Оригінал' } }],
    },
    {
      id: 'practice-id',
      slug: 'practice',
      type: 'practice',
      title: 'Practice',
      navigationLabel: 'Practice',
      content: [],
    },
  ],
} as const satisfies Lesson<'data', typeof languages>;

const courseScenario = {
  id: 'story-id',
  slug: 'story',
  type: 'scenario',
  title: { en: 'A lion appears', uk: "З'являється лев" },
  navigationLabel: 'Story',
  content: [{ id: 'lion-id', slug: 'lion', type: 'scene', locales: { name: { en: 'Lion', uk: 'Лев' } } }],
} as const satisfies Section<'data', typeof languages>;

describe('createLessonOverrides', () => {
  it('composes ordered, owned sections and blocks without mutating Lesson Data', () => {
    const original = createLessonOverrides(lesson);
    const courseBlock = {
      id: 'hint-id',
      slug: 'hint',
      type: 'markdown',
      locales: { en: 'New hint', uk: 'Нова підказка' },
    } as const;

    const customized = original
      .setTitle({ en: 'Adventure', uk: 'Пригода' })
      .setParams({ sections: { allowSkipping: false } })
      .setEvents({ lessonCompleted: false })
      .sections.bySlug.theory.content.bySlug.intro.set({
        locales: { en: 'Changed', uk: 'Змінено' },
      })
      .sections.bySlug.theory.content.setOrder(['intro', courseBlock])
      .sections.setOrder(['theory', courseScenario, 'practice'])
      .sections.bySlug.story.set({ skippable: true });

    const result = customized.build();
    assert.equal(result.type, 'lessonOverride');
    assert.equal(result.lessonId, lesson.id);
    assert.deepEqual(result.overrides.title, { en: 'Adventure', uk: 'Пригода' });
    assert.deepEqual(result.overrides.parameters, { sections: { allowSkipping: false } });
    assert.deepEqual(result.overrides.events, { lessonCompleted: false });
    assert.deepEqual(result.overrides.sections?.map(entry => entry.section.slug), ['theory', 'story', 'practice']);
    assert.deepEqual(result.overrides.sections?.map(entry => entry.source.type), ['lesson', 'course', 'lesson']);
    assert.deepEqual(result.overrides.sections?.[0].blocks.map(block => block.source.type), ['lesson', 'course']);
    assert.equal(result.overrides.sections?.[1].section.skippable, true);
    assert.equal(lesson.sections[0].content[0].locales.en, 'Original');
    assert.equal(lesson.sections.length, 2);
    assert.deepEqual(original.build().overrides, {});
    assert.doesNotThrow(() => JSON.stringify(result));
  });

  it('updates the active collection after removal and allows reinsertion via setOrder', () => {
    const customized = createLessonOverrides(lesson)
      .sections.remove('practice')
      .sections.setOrder(['theory', courseScenario])
      .sections.bySlug.theory.content.remove('intro');
    const sections = customized.build().overrides.sections;
    assert.deepEqual(sections?.map(entry => entry.section.slug), ['theory', 'story']);
    assert.deepEqual(sections?.[0].blocks, []);
    assert.deepEqual(sections?.[0].section.content, []);
    assert.deepEqual(sections?.[1].blocks.map(block => block.source.type), ['course']);
  });

  it('rejects missing, duplicate or unknown order entries, including duplicate IDs', () => {
    const builder = createLessonOverrides(lesson);
    const dynamicOrder = builder.sections.setOrder as (items: readonly (string | Section<'data', typeof languages>)[]) => unknown;
    assert.throws(() => dynamicOrder(['theory']), /Missing Section: practice/);
    assert.throws(() => dynamicOrder(['theory', 'theory', 'practice']), /Duplicate/);
    assert.throws(() => dynamicOrder(['missing', 'theory', 'practice']), /Unknown Section/);
    assert.throws(
      () => dynamicOrder(['theory', 'practice', { ...courseScenario, id: 'theory-id' }]),
      /Duplicate/,
    );
    const contentOrder = builder.sections.bySlug.theory.content.setOrder as (items: readonly string[]) => unknown;
    assert.throws(() => contentOrder(['intro', 'intro']), /Duplicate/);
    assert.throws(() => contentOrder(['unknown', 'intro']), /Unknown ContentBlock/);
    assert.throws(() => builder.sections.bySlug.theory.content.remove('missing' as 'intro'), /Unknown ContentBlock/);
  });

  it('rejects deletion of the mandatory quiz or its quiz block', () => {
    const quiz = {
      id: 'quiz-section',
      slug: 'quiz',
      type: 'quiz',
      title: 'Quiz',
      navigationLabel: 'Quiz',
      content: [{ id: 'quiz-block', slug: 'questions', type: 'quiz', questionSlugs: ['one'] }],
    };
    const requiredLesson = {
      ...lesson,
      parameters: { ...lesson.parameters, requireQuiz: true },
      sections: [...lesson.sections, quiz],
    } as unknown as Lesson<'data', typeof languages>;
    const builder = createLessonOverrides(requiredLesson);
    assert.throws(() => builder.sections.remove('quiz').build(), /Invalid quiz Section count/);
    assert.throws(() => builder.sections.bySlug.quiz.content.remove('questions').build(), /Invalid quiz ContentBlock count/);
  });
});
