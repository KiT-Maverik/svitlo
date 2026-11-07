import type { HowLightMoves_Languages } from '../../constants';
import type { Quiz_Parameters } from '@svitlo/engine/content';
import { createSection } from '@svitlo/engine/builders';
import { howLightMoves_Questions } from '../../questions';

const title = {
  ar: 'اختبار',
  be: 'Тэст',
  bn: 'কুইজ',
  de: 'Quiz',
  en: 'Quiz',
  es: 'Cuestionario',
  et: 'Test',
  fr: 'Quiz',
  he: 'בוחן',
  hi: 'प्रश्नोत्तरी',
  id: 'Kuis',
  ja: 'クイズ',
  ka: 'ტესტი',
  kk: 'Тест',
  ko: '퀴즈',
  lt: 'Testas',
  lv: 'Tests',
  mr: 'प्रश्नमंजुषा',
  ms: 'Kuiz',
  pl: 'Quiz',
  pt: 'Questionário',
  qm: 'Sınav',
  ta: 'வினாடி வினா',
  te: 'క్విజ్',
  tr: 'Kısa sınav',
  uk: 'Тест',
  ur: 'آزمائش',
  vi: 'Bài kiểm tra',
  zh: '测验',
};

const parameters = {
  isBlocker: true,
  timeLimitSeconds: 300,
  selection: { mode: 'all', questionSlugs: Object.keys(howLightMoves_Questions.selectOneAnswer) },
  layout: { mode: 'stepper', showProgress: true },
  feedbackMode: 'immediate',
  interaction: {
    retries: 0,
    showErrors: true,
    showCorrectAnswers: true,
    allowExplanations: true,
    allowDeferring: false,
    allowQuestionNavigation: true,
    skippable: true,
  },
  results: { visibility: 'after-review', showScore: true },
  screen: {},
  questionOptions: {
    selectOneAnswer: {
      incorrectCount: 1,
      includeDistractors: true,
      shuffleAnswers: true,
      correctVariant: 'random',
    },
  },
} satisfies Quiz_Parameters<'data', HowLightMoves_Languages>;

export const quiz_Section_Configurator = createSection<HowLightMoves_Languages>()({
  id: '2a02b81f-dbd6-58d8-9711-4deb97312a56',
  type: 'quiz',
  slug: 'quiz',
  title,
  navigationLabel: title,
  skippable: true,
  parameters,
});

export const quiz_Section = quiz_Section_Configurator.getData();
