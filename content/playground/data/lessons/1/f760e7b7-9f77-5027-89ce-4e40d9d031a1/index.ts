import { defineLesson } from '@svitlo/engine/build';

import { testExplainLightTravel } from '../../../skills/testLight/testLightPropagation/testExplainLightTravel';
import { howLightMoves } from '../../c/d3048d21-8690-5255-b62c-984c69ac272c';
import { howLightMoves_languages } from '../../c/d3048d21-8690-5255-b62c-984c69ac272c/constants';

/** Demo Lesson that reuses the canonical lesson's Sections; the canonical Lesson owns the Quiz bank, so no unresolved Quiz Section is imported. */
export const lightDiscovery = defineLesson({
  id: 'f760e7b7-9f77-5027-89ce-4e40d9d031a1',
  slug: 'lightDiscovery',
  type: 'lesson',
  skills: [testExplainLightTravel.id],
  params: { ...howLightMoves.config.base.params, quizRequiredForCompletion: false, languages: howLightMoves_languages },
  locale: { title: 'Light Lab · Discovery (demo)' },
  section: {
    items: { content: howLightMoves.section.items.content, practice: howLightMoves.section.items.practice },
    order: ['content', 'practice'],
  },
});
