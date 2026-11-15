import type { LanguageCode } from '../schemas/languages.schemas';

/** Verified review evidence; PR number is a reference, not approval by itself. */
export type ReviewEvidence = {
  pr: number;
  language: LanguageCode;
};

/** Common review register. All actual approvals require external evidence. */
export type Review = {
  ai: {
    /** One completed AI localization-review integration PR for the full scope. */
    locales: number;
  };
  human: {
    /** Owner-authorized acceptance PR. */
    acceptance: number;
    /** Independent human checks; individual languages are optional. */
    locales: Partial<Record<LanguageCode, number>>;
    /** Optional subject-matter/scientific review and its working language. */
    scientific?: ReviewEvidence;
  };
};

/**
 * Lesson-production operations that require recorded AI review evidence.
 * These are Studio Lesson Production stage slugs, never Quest/Section stages.
 * 'completed' is a terminal status, not an independent review operation.
 */
export type LessonReviewStage =
  | 'methodology'
  | 'content'
  | 'experience-review'
  | 'methodology-review'
  | 'questions'
  | 'flashcards'
  | 'generate-sources'
  | 'resource-production'
  | 'localization'
  | 'validation';

/** Strict Lesson-specific extension of the general Review record. */
export type LessonReview = Omit<Review, 'ai'> & {
  ai: Review['ai'] & {
    stages: Record<LessonReviewStage, ReviewEvidence>;
  };
};
