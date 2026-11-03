import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine';
import { defineLessonData, type Lesson } from '@svitlo/engine/content';
import type { howLightMovesDefinition } from './howLightMoves.definition';
import { howLightMovesFlashcards } from './flashcards/index.data';
import { howLightMoves_Locale } from './howLightMoves';
import { howLightMovesQuestionsData } from './questions/index.data';
import { practiceData } from './sections/practice/practice.data';
import { quizData } from './sections/quiz/quiz.data';
import { theoryData } from './sections/theory/theory.data';

export const howLightMovesData = defineLessonData({
  id: 'd3048d21-8690-5255-b62c-984c69ac272c',
  slug: 'howLightMoves',
  title: howLightMoves_Locale.name,
  flashcards: howLightMovesFlashcards,
  parameters: {
    requireQuiz: true,
    languages: [
      DEFAULT_SUPPORTED_LANGUAGES[0].language,
      ...DEFAULT_SUPPORTED_LANGUAGES.slice(1).map(({ language }) => language),
    ],
    sections: {
      allowNavigation: true,
      allowSkipping: true,
      showIndexes: true,
      order: [],
    },
  },
  questions: howLightMovesQuestionsData,
  sectionOrder: ['theory', 'practice', 'quiz'],
  sections: {
    theory: theoryData,
    practice: practiceData,
    quiz: quizData,
  } satisfies Record<keyof typeof howLightMovesDefinition.sections, Lesson<'data'>['sections'][string]>,
} satisfies Lesson<'data'>);

const scenes = [
  theoryData.content.scene.lightPropagationSimulation.id,
  theoryData.content.scene.lightRayDiagram.id,
  practiceData.content.scene.showcase.id,
] as const;
