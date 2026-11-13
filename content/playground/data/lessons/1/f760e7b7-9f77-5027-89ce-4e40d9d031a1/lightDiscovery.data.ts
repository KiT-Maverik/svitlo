import { defineLesson } from '@svitlo/engine/build';
import { howLightMoves } from '../../c/d3048d21-8690-5255-b62c-984c69ac272c';
import { howLightMoves_languages } from '../../c/d3048d21-8690-5255-b62c-984c69ac272c/constants';

/** Demo Lesson that reuses the canonical lesson's Sections, Questions and Flashcards. */
export const lightDiscovery = defineLesson({
  id: 'f760e7b7-9f77-5027-89ce-4e40d9d031a1',
  slug: 'lightDiscovery',
  type: 'lesson',
  skills: howLightMoves.config.base.skills,
  params: { ...howLightMoves.config.base.params, languages: howLightMoves_languages },
  locale: { title: 'Light Lab · Discovery (demo)' },
  questions: howLightMoves.questions,
  flashcards: howLightMoves.flashcards,
  section: {
    items: { ...howLightMoves.section.items },
    order: [...howLightMoves.section.order],
  },
});
