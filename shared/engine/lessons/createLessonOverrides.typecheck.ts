import { defineLessonData, type Course_Content, type Section } from '+@svitlo/contracts/content';
import { createLessonOverrides } from './createLessonOverrides';

const languages = ['en', 'uk'] as const;
const lesson = defineLessonData<typeof languages>()({
  id: 'lesson-id',
  slug: 'lesson',
  title: { en: 'Light', uk: 'Світло' },
  flashcards: [],
  skills: [],
  questions: {},
  parameters: {
    requireQuiz: false,
    languages,
    sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
  },
  sections: [
    {
      id: 'theory-id',
      slug: 'theory',
      type: 'theory',
      title: 'Theory',
      navigationLabel: 'Theory',
      content: [{ id: 'block-id', slug: 'intro', type: 'markdown', locales: { en: 'First', uk: 'Перший' } }],
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

const inserted = {
  id: 'scenario-id',
  slug: 'scenario',
  type: 'scenario',
  title: 'Story',
  navigationLabel: 'Story',
  content: [],
} as const satisfies Section<'data', typeof languages>;

const customized = createLessonOverrides(lesson)
  .sections.bySlug.theory.content.bySlug.intro.set({ locales: { en: 'New', uk: 'Новий' } })
  .sections.setOrder(['theory', inserted, 'practice']);
const courseEntry: Course_Content<'data', typeof languages> = customized.build();

const customOnly = defineLessonData<typeof languages, 'lionAppeared'>()({
  ...lesson,
  events: {
    lionAppeared: {
      type: 'scene',
      id: 'lion-scene',
      slug: 'lion',
      locales: { en: { message: 'Hello' }, uk: { message: 'Вітаю' } },
    },
  },
});
const disabledCustom = createLessonOverrides(customOnly).setEvents({ lionAppeared: false }).build();
// @ts-expect-error Undeclared custom events cannot be introduced by a course.
createLessonOverrides(lesson).setEvents({ lionAppeared: false });
void disabledCustom;

// @ts-expect-error Missing a known Section in a complete order.
customized.sections.setOrder(['theory', 'scenario']);
// @ts-expect-error No duplicate Section slug.
customized.sections.setOrder(['theory', 'theory', 'scenario', 'practice']);
// @ts-expect-error Unknown Section slug.
customized.sections.bySlug.unknown;
// @ts-expect-error Immutable Block identity.
customized.sections.bySlug.theory.content.bySlug.intro.set({ id: 'changed' });
// @ts-expect-error Removing a Section removes its typed accessor.
customized.sections.remove('practice').sections.bySlug.practice;
// @ts-expect-error Removing a Block removes its typed accessor.
customized.sections.bySlug.theory.content.remove('intro').sections.bySlug.theory.content.bySlug.intro;
// @ts-expect-error Lesson language tuple cannot be overridden through params.
customized.setParams({ languages });
const quizBuilder = createLessonOverrides(
  defineLessonData<typeof languages>()({
    ...lesson,
    sections: [
      {
        id: 'quiz',
        slug: 'quiz',
        type: 'quiz',
        title: 'Quiz',
        navigationLabel: 'Quiz',
        parameters: {
          selection: { mode: 'all' },
          layout: { mode: 'stack' },
          feedbackMode: 'immediate',
          interaction: {
            retries: 0,
            showErrors: true,
            showCorrectAnswers: true,
            allowExplanations: true,
            allowDeferring: false,
            allowQuestionNavigation: true,
            skippable: false,
          },
          results: { visibility: 'immediate', showScore: true },
          screen: {},
        },
      },
    ],
  }),
);
// @ts-expect-error Quiz Sections have parameters, not ContentBlocks.
quizBuilder.sections.bySlug.quiz.content;

void courseEntry;
