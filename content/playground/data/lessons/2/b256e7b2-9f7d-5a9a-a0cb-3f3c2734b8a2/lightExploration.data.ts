import { defineLesson } from '@svitlo/engine';
import { howLightMoves } from '../../c/d3048d21-8690-5255-b62c-984c69ac272c';

/** Demo Lesson that reuses the canonical lesson's Sections, Questions and Flashcards. */
export const lightExploration = defineLesson({
  id: 'b256e7b2-9f7d-5a9a-a0cb-3f3c2734b8a2',
  slug: 'lightExploration',
  type: 'lesson',
  skills: howLightMoves.config.base.skills,
  params: { ...howLightMoves.config.base.params },
  locale: { title: 'Light Lab · Exploration (demo)' },
  questions: howLightMoves.questions,
  flashcards: howLightMoves.flashcards,
  section: {
    items: { ...howLightMoves.section.items },
    order: [...howLightMoves.section.order],
  },
});
