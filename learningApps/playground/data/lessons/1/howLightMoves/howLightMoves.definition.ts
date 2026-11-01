import type { Lesson } from '@svitlo/engine/content';
import { practiceDefinition } from './sections/practice/practice.definition';
import { quizDefinition } from './sections/quiz/quiz.definition';
import { theoryDefinition } from './sections/theory/theory.definition';

export const howLightMovesDefinition = {
  type: 'lesson',
  sectionOrder: ['theory', 'practice', 'quiz'],
  sections: {
    theory: theoryDefinition,
    practice: practiceDefinition,
    quiz: quizDefinition,
  },
} satisfies Lesson<'definition'> & { sectionOrder: string[] };
