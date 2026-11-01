import type { Section } from '@svitlo/engine/content';

export const quizDefinition = {
  type: 'quiz',
  content: { quiz: { quiz: { type: 'quiz' } } },
} satisfies Section<'definition'>;
