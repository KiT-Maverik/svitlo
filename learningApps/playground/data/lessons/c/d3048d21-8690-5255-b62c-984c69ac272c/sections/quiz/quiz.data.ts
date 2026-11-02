import {
  defineContentBlockCatalog,
  type ContentBlock_Quiz,
  type ContentBlock_Catalog_DataFor,
  type Section,
} from '@svitlo/engine/content';
import type { quizDefinition } from './quiz.definition';
import { howLightMovesQuestionsData } from '../../questions/index.data';
import { quiz } from './quiz';

const quizBlock = {
  id: 'd1eb7813-c3f5-5d41-a6e4-42a4d379db9b',
  slug: 'quiz' as const,
  welcome: quiz.welcome,
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
  questions: howLightMovesQuestionsData.selectOneAnswer,
  results: { visibility: 'immediate', showScore: true },
  screen: {
    starting: { showDefaultContent: true },
    ending: {
      success: { showDefaultContent: true },
      fail: { showDefaultContent: true },
      retry: { showDefaultContent: true },
    },
  },
} satisfies ContentBlock_Quiz<'data'>;

export const quizData = {
  id: '2a02b81f-dbd6-58d8-9711-4deb97312a56',
  type: 'quiz' as const,
  slug: 'quiz' as const,
  title: quiz.name,
  navigationLabel: quiz.name,
  skippable: true,
  order: [{ type: 'quiz', key: 'quiz' }],
  content: defineContentBlockCatalog({
    quiz: { quiz: quizBlock },
  } satisfies ContentBlock_Catalog_DataFor<typeof quizDefinition.content>),
} satisfies Section<'data'> & { order: { type: string; key: string }[] };
