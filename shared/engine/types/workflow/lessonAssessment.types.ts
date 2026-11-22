/** Editorial assessment planning shared by Course-originated and standalone
 * Lessons. These are required production decisions, never new Lesson Config
 * or runtime Props fields. Bank ownership and Section presence are independent.
 */
export type LessonProductionAssessmentRequirements = {
  /** Is an independently authored Question Bank required? */
  questionBankRequired: boolean;
  /** Is an independently authored Flashcard Bank required? */
  flashcardBankRequired: boolean;
  /** Must the completed Lesson contain a Quiz Section? */
  quizSectionRequired: boolean;
  /** Must the completed Lesson contain a Flashcards Section? */
  flashcardsSectionRequired: boolean;
};
