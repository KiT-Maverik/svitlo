import type {
  Lesson_Config,
  LessonContentCatalog,
  LessonSection_Config,
  Quiz_Config,
  TextContentBlock_Config,
} from '@svitlo/engine/content';
import { assessmentMethods_AssessmentMethod_Ids } from '@svitlo/engine/content';

/**
 * Intentionally subject-neutral fixture.
 * All identifiers are static: persistence and quiz results survive page reloads.
 * This is demonstration content, never a textbook curriculum.
 */
export const demoIds = {
  lesson: 'd9e71f5b-902b-5e2c-a790-0fc5cbabf17c',
  title: 'd9e71f5b-902b-5e2c-a790-0fc5cbabf17d',
  theory: 'd9e71f5b-902b-5e2c-a790-0fc5cbabf17e',
  theoryName: 'd9e71f5b-902b-5e2c-a790-0fc5cbabf17f',
  theoryText: 'd9e71f5b-902b-5e2c-a790-0fc5cbabf180',
  practice: 'd9e71f5b-902b-5e2c-a790-0fc5cbabf181',
  practiceName: 'd9e71f5b-902b-5e2c-a790-0fc5cbabf182',
  practiceText: 'd9e71f5b-902b-5e2c-a790-0fc5cbabf183',
  quiz: 'd9e71f5b-902b-5e2c-a790-0fc5cbabf184',
  quizSection: 'd9e71f5b-902b-5e2c-a790-0fc5cbabf185',
  quizName: 'd9e71f5b-902b-5e2c-a790-0fc5cbabf186',
  question: 'd9e71f5b-902b-5e2c-a790-0fc5cbabf187',
  prompt: 'd9e71f5b-902b-5e2c-a790-0fc5cbabf188',
  correct: 'd9e71f5b-902b-5e2c-a790-0fc5cbabf189',
  incorrect: 'd9e71f5b-902b-5e2c-a790-0fc5cbabf18a',
  distractor: 'd9e71f5b-902b-5e2c-a790-0fc5cbabf18b',
  explanation: 'd9e71f5b-902b-5e2c-a790-0fc5cbabf18c',
} as const;

function text(id: string, en: string, uk: string): TextContentBlock_Config {
  return { id, blockType: 'text', allLocales: false, value: { en, uk } };
}

const title = text(demoIds.title, 'Interactive lesson demo', 'Демонстраційний інтерактивний урок');
const theory: LessonSection_Config = {
  collection: 'lessonSection',
  id: demoIds.theory,
  lessonId: demoIds.lesson,
  name: text(demoIds.theoryName, 'Overview', 'Огляд'),
  skippable: false,
  content: [
    text(
      demoIds.theoryText,
      'This is a generic content section for exercising the lesson renderer.',
      'Це нейтральний приклад секції для перевірки відображення уроку.',
    ),
  ],
};
const practice: LessonSection_Config = {
  collection: 'lessonSection',
  id: demoIds.practice,
  lessonId: demoIds.lesson,
  name: text(demoIds.practiceName, 'Interaction', 'Взаємодія'),
  skippable: true,
  content: [
    text(
      demoIds.practiceText,
      'Use the navigation controls to reach the sample quiz.',
      'Скористайтеся навігацією, щоб перейти до демонстраційного тесту.',
    ),
  ],
};

export const demoQuizConfig: Quiz_Config = {
  id: demoIds.quiz,
  sectionId: demoIds.quizSection,
  lessonId: demoIds.lesson,
  name: text(demoIds.quizName, 'Quiz', 'Тест'),
  feedbackMode: 'immediate',
  grading: { mode: 'percentage', successThreshold: 70 },
  interaction: {
    retries: -1,
    showErrors: true,
    showCorrectAnswers: true,
    allowExplanations: true,
    allowDeferring: true,
    allowQuestionNavigation: true,
    skippable: true,
  },
  questionBank: [
    {
      id: demoIds.question,
      assessmentMethodId: assessmentMethods_AssessmentMethod_Ids.retrieval,
      type: 'select-one-answer',
      restrictions: [],
      number: 1,
      weight: 1,
      content: [
        text(
          demoIds.prompt,
          'Which control is used to check an answer?',
          'Який елемент дозволяє перевірити відповідь?',
        ),
      ],
      explanation: text(
        demoIds.explanation,
        'The Check button validates a selected answer.',
        'Кнопка «Перевірити» перевіряє обрану відповідь.',
      ),
      answers: {
        correct: text(demoIds.correct, 'Check button', 'Кнопка перевірки'),
        incorrect: [text(demoIds.incorrect, 'Close', 'Закрити')],
        distractors: [text(demoIds.distractor, 'Reset', 'Скинути')],
      },
    },
  ],
  results: { visibility: 'immediate', showScore: true },
  screen: {},
};

export const demoLessonConfig: Lesson_Config = {
  collection: 'lesson',
  id: demoIds.lesson,
  slug: 'demo',
  title: demoIds.title,
  requireQuiz: true,
  sections: {
    allowNavigation: true,
    allowSkipping: true,
    showIndexes: true,
    content: [demoIds.theory, demoIds.practice, demoIds.quizSection],
  },
};

export const demoLessonCatalog: LessonContentCatalog = {
  text: { [title.id]: title },
  sections: { [theory.id]: theory, [practice.id]: practice, [demoQuizConfig.sectionId]: demoQuizConfig },
};
