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
 * External Lesson Production Issue stages use durable kebab-case slugs.
 * Map them explicitly to the camelCase review keys; never rewrite existing
 * Issue trackers or confuse them with Quest/Section stages.
 * 'completed' is a terminal status, not a review operation.
 */
export const lessonProductionStageToReviewStage = {
  methodology: 'methodology',
  content: 'content',
  'experience-review': 'experienceReview',
  'methodology-review': 'methodologyReview',
  questions: 'questions',
  flashcards: 'flashcards',
  'generate-sources': 'generateSources',
  'resource-production': 'resourceProduction',
  localization: 'localization',
  validation: 'validation',
} as const;

/** Existing Lesson Production tracker vocabulary (not review.ts keys). */
export type LessonProductionStageSlug = keyof typeof lessonProductionStageToReviewStage;

/** Canonical direct AI review field names in Lesson review.ts. */
export type LessonReviewStage = (typeof lessonProductionStageToReviewStage)[LessonProductionStageSlug];

/** Strict Lesson-specific extension: per-stage evidence is directly under ai. */
export type LessonReview = Omit<Review, 'ai'> & {
  ai: Review['ai'] & Record<LessonReviewStage, ReviewEvidence>;
};
