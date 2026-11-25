export const sectionTypes = ['content', 'practice', 'codingTask', 'learningFlow', 'flashcards', 'quiz'] as const;
export type Section_Type = (typeof sectionTypes)[number];
