import { defineQuizSection } from '@svitlo/engine/build';

import type { LessonLanguages } from '#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants';

import { questions } from '../../questions';
import { quizIntro } from './quizIntro';

const content = {
  items: { quizIntro },
  order: ['quizIntro'],
};

export const rotationAndIlluminationQuiz = defineQuizSection<
  'rotationAndIlluminationQuiz',
  typeof content.items,
  LessonLanguages
>({
  id: '622e900a-4f7e-47dc-9c3e-4946444cea9f',
  slug: 'rotationAndIlluminationQuiz',
  type: 'quiz',
  params: {
    isBlocker: true,
    skippable: false,
    selection: {
      mode: 'all',
      questionIds: [
        questions.selectOneAnswer.sameTimeDifferentPlaces.id,
        questions.selectOneAnswer.whyNightArrives.id,
        questions.selectOneAnswer.stoppedGlobeKeepsNight.id,
        questions.selectOneAnswer.newPlaceContinuesRotating.id,
      ],
    },
    layout: { mode: 'stepper', showProgress: true },
    feedbackMode: 'immediate',
    interaction: {
      retries: 1,
      showErrors: true,
      showCorrectAnswers: false,
      allowExplanations: true,
      allowDeferring: false,
      allowQuestionNavigation: true,
      skippable: false,
    },
    questionOptions: {
      selectOneAnswer: { shuffleAnswers: true },
    },
    results: { visibility: 'immediate', showScore: true },
    screen: { starting: { content: ['quizIntro'] } },
  },
  locale: {
    title: {
      uk: 'Чому змінюються день і ніч: перевірка',
      en: 'Why day and night alternate: check your understanding',
      pl: 'Dlaczego zmieniają się dzień i noc? Sprawdź wiedzę',
      qm: 'Kündüz ve gece ne içün deñişe: bilgiñni tekşer',
    },
    navigationLabel: {
      uk: 'Перевір знання',
      en: 'Check your understanding',
      pl: 'Sprawdź wiedzę',
      qm: 'Bilgiñni tekşer',
    },
  },
  content,
});
