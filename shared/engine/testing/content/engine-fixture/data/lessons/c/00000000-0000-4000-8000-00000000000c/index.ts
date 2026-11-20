import { defineLesson, defineText, defineContentSection, defineQuizSection } from '@svitlo/engine/build';
import { sampleQuestion } from './questions';

const introText = defineText({
  id: '00000000-0000-4000-8000-000000000010',
  slug: 'introText',
  type: 'text',
  params: {},
  locale: { value: { en: 'Engine fixture paragraph.', uk: 'Тестовий абзац Engine.' } },
});

const intro = defineContentSection({
  id: '00000000-0000-4000-8000-000000000020',
  slug: 'intro',
  type: 'content',
  params: {},
  locale: {
    title: { en: 'Introduction', uk: 'Вступ' },
    navigationLabel: { en: 'Introduction', uk: 'Вступ' },
  },
  content: { items: { introText }, order: ['introText'] },
});

const quiz = defineQuizSection({
  id: '00000000-0000-4000-8000-000000000021',
  slug: 'quiz',
  type: 'quiz',
  params: {
    selection: { mode: 'all', questionIds: [sampleQuestion.id] },
    layout: { mode: 'stepper' },
    feedbackMode: 'after-completion',
    interaction: {
      retries: 0,
      showErrors: true,
      showCorrectAnswers: false,
      allowExplanations: false,
      allowDeferring: false,
      allowQuestionNavigation: false,
      skippable: false,
    },
    results: { visibility: 'after-review', showScore: true },
  },
  locale: {
    title: { en: 'Quiz', uk: 'Перевірка' },
    navigationLabel: { en: 'Quiz', uk: 'Перевірка' },
  },
  content: { items: {}, order: [] },
});

export const fixtureLesson = defineLesson({
  id: '00000000-0000-4000-8000-00000000000c',
  slug: 'fixtureLesson',
  type: 'lesson',
  skills: [],
  params: {
    quizRequiredForCompletion: true,
    languages: ['en', 'uk'] as const,
    sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
  },
  locale: { title: { en: 'Engine Test Lesson', uk: 'Тестовий урок Engine' } },
  section: { items: { intro, quiz }, order: ['intro', 'quiz'] },
});
