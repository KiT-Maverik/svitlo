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
 * Canonical Lesson Production review-stage identifiers, also used by Studio
 * Issue trackers. These are not Quest/Section stages. 'completed' is a terminal
 * production status and does not require a separate AI review entry.
 */
export type LessonReviewStage =
  | 'methodology'
  | 'content'
  | 'experienceReview'
  | 'methodologyReview'
  | 'questions'
  | 'flashcards'
  | 'generateSources'
  | 'resourceProduction'
  | 'localization'
  | 'validation';

/** Strict Lesson-specific extension: per-stage evidence is directly under ai. */
export type LessonReview = Omit<Review, 'ai'> & {
  ai: Review['ai'] & Record<LessonReviewStage, ReviewEvidence>;
};
