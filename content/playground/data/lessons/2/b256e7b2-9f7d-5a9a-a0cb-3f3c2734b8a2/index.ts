import { defineLesson } from '@svitlo/engine/build';

import { testExplainLightTravel } from '../../../skills/testLight/testLightPropagation/testExplainLightTravel';
import { howLightMoves } from '../../c/d3048d21-8690-5255-b62c-984c69ac272c';
import { howLightMoves_languages } from '../../c/d3048d21-8690-5255-b62c-984c69ac272c/constants';

/** Demo Lesson that reuses the canonical lesson's Sections; the canonical Lesson owns the Quiz bank, so no unresolved Quiz Section is imported. */
export const lightExploration = defineLesson({
  id: 'b256e7b2-9f7d-5a9a-a0cb-3f3c2734b8a2',
  slug: 'lightExploration',
  type: 'lesson',
  skills: [testExplainLightTravel.id],
  params: { ...howLightMoves.config.base.params, quizRequiredForCompletion: false, languages: howLightMoves_languages },
  locale: { title: 'Light Lab · Exploration (demo)' },
  children: ['theory', 'practice'],
 theory: howLightMoves.theory, practice: howLightMoves.practice,
});
