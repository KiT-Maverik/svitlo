import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { defineLessonData, type Section } from '@svitlo/contracts/content';
import { createLessonOverrides } from './createLessonOverrides';

const languages = ['en', 'uk'] as const;

const lesson = defineLessonData<typeof languages>()({
  id: 'lesson-id',
  slug: 'light',
  title: { en: 'Light', uk: 'Світло' },
  flashcards: [],
  skills: [],
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
});

const courseScenario = {
  id: 'story-id',
  slug: 'story',
  type: 'scenario',
  title: { en: 'A lion appears', uk: "З'являється лев" },
  navigationLabel: 'Story',
  content: [{ id: 'lion-id', slug: 'lion', type: 'scene', locales: { en: { name: 'Lion' }, uk: { name: 'Лев' } } }],
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
    assert.equal(result.lesson, lesson);
    assert.deepEqual(result.overrides.title, { en: 'Adventure', uk: 'Пригода' });
    assert.deepEqual(result.overrides.parameters, { sections: { allowSkipping: false } });
    assert.deepEqual(result.overrides.events, { lessonCompleted: false });
    assert.deepEqual(result.overrides.sections?.order, ['theory', 'story', 'practice']);
    assert.deepEqual(
      result.overrides.sections?.added?.map(entry => entry.section.slug),
      ['story'],
    );
    assert.deepEqual(
      result.overrides.sections?.added?.map(entry => entry.source.type),
      ['course'],
    );
    assert.deepEqual(
      result.overrides.sections?.bySlug?.theory?.content?.added?.map(entry => entry.source.type),
      ['course'],
    );
    assert.deepEqual(result.overrides.sections?.bySlug?.theory?.content?.bySlug?.intro, {
      locales: { en: 'Changed', uk: 'Змінено' },
    });
    assert.deepEqual(result.overrides.sections?.bySlug?.theory?.content?.order, ['intro', 'hint']);
    assert.deepEqual(result.overrides.sections?.bySlug?.story, undefined);
    assert.equal(lesson.sections[0].type === 'theory' && lesson.sections[0].content[0].locales.en, 'Original');
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
    assert.deepEqual(sections?.order, ['theory', 'story']);
    assert.deepEqual(sections?.removed, ['practice']);
    assert.deepEqual(
      sections?.added?.map(entry => entry.section.slug),
      ['story'],
    );
    assert.deepEqual(sections?.bySlug?.theory?.content?.removed, ['intro']);
  });

  it('emits only modified fields and exposes authoring entries without TOC/file operations', () => {
    const original = createLessonOverrides(lesson);
    const unchanged = original
      .setParams({ sections: { allowNavigation: true } })
      .setTitle(lesson.title)
      .sections.bySlug.theory.set({ title: 'Theory' })
      .build();
    assert.deepEqual(unchanged.overrides, {});

    const customized = original.sections.bySlug.theory.set({ navigationLabel: 'Introduction' });
    assert.deepEqual(customized.getData().overrides, {
      sections: { bySlug: { theory: { navigationLabel: 'Introduction' } } },
    });
    assert.deepEqual(customized.getContentEntries().lessons, [lesson]);
    assert.deepEqual(customized.getContentEntries().overrides, [customized.build()]);
  });

  it('rejects missing, duplicate or unknown order entries, including duplicate IDs', () => {
    const builder = createLessonOverrides(lesson);
    const dynamicOrder = builder.sections.setOrder as unknown as (
      items: readonly (string | Section<'data', typeof languages>)[],
    ) => unknown;
    assert.throws(() => dynamicOrder(['theory']), /Missing Section: practice/);
    assert.throws(() => dynamicOrder(['theory', 'theory', 'practice']), /Duplicate/);
    assert.throws(() => dynamicOrder(['missing', 'theory', 'practice']), /Unknown Section/);
    assert.throws(() => dynamicOrder(['theory', 'practice', { ...courseScenario, id: 'theory-id' }]), /Duplicate/);
    const contentOrder = builder.sections.bySlug.theory.content.setOrder as unknown as (
      items: readonly string[],
    ) => unknown;
    assert.throws(() => contentOrder(['intro', 'intro']), /Duplicate/);
    assert.throws(() => contentOrder(['unknown', 'intro']), /Unknown ContentBlock/);
    assert.throws(() => builder.sections.bySlug.theory.content.remove('missing' as 'intro'), /Unknown ContentBlock/);
  });

  it('supports a quiz Section without content and rejects removal of a mandatory quiz', () => {
    const quiz = {
      id: 'quiz-section',
      slug: 'quiz',
      type: 'quiz' as const,
      title: 'Quiz',
      navigationLabel: 'Quiz',
      parameters: {
        selection: { mode: 'all' as const },
        layout: { mode: 'stack' as const },
        feedbackMode: 'immediate' as const,
        interaction: {
          retries: 0,
          showErrors: true,
          showCorrectAnswers: true,
          allowExplanations: true,
          allowDeferring: false,
          allowQuestionNavigation: true,
          skippable: false,
        },
        results: { visibility: 'immediate' as const, showScore: true },
        screen: {},
      },
    } satisfies Section<'data', typeof languages>;
    const requiredLesson = defineLessonData<typeof languages>()({
      ...lesson,
      parameters: { ...lesson.parameters, requireQuiz: true },
      sections: [...lesson.sections, quiz],
    });
    const builder = createLessonOverrides(requiredLesson);
    assert.deepEqual(Object.keys(builder.sections.bySlug.quiz), ['set']);
    assert.deepEqual(
      builder.sections.setOrder(['practice', 'theory', 'quiz'] as never).build().overrides.sections?.order,
      ['practice', 'theory', 'quiz'],
    );
    assert.throws(() => builder.sections.remove('quiz').build(), /Invalid quiz Section count/);
  });
});
