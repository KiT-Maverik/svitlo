import { z } from 'zod';

/** Editorial assessment planning shared by Course-originated and standalone
 * Lessons. These are required production decisions, never new Lesson Config
 * or runtime Props fields. Bank ownership and Section presence are independent.
 */
export const lessonProductionAssessmentRequirements_Schema = z.object({
  /** Is an independently authored Question Bank required? */
  questionBankRequired: z.boolean(),
  /** Is an independently authored Flashcard Bank required? */
  flashcardBankRequired: z.boolean(),
  /** Must the completed Lesson contain a Quiz Section? */
  quizSectionRequired: z.boolean(),
  /** Must the completed Lesson contain a Flashcards Section? */
  flashcardsSectionRequired: z.boolean(),
});

export type LessonProductionAssessmentRequirements = z.infer<typeof lessonProductionAssessmentRequirements_Schema>;
