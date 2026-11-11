export const sectionTypes = ['practice', 'codingTask', 'flow', 'flashcards', 'quiz', 'content'] as const;
export type Section_Type = (typeof sectionTypes)[number];
