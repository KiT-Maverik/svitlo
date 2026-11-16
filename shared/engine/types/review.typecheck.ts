import type { LessonReview, LessonReviewStage } from './review.types';

type Assert<T extends true> = T;
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

type LessonReviewChecks = [
  Assert<
    Equal<
      LessonReviewStage,
      | 'methodology'
      | 'content'
      | 'experienceReview'
      | 'methodologyReview'
      | 'questions'
      | 'flashcards'
      | 'generateSources'
      | 'resourceProduction'
      | 'localization'
      | 'validation'
    >
  >,
  Assert<Equal<keyof LessonReview['ai'], LessonReviewStage | 'locales'>>,
  Assert<Equal<'stages' extends keyof LessonReview['ai'] ? true : false, false>>,
];

const completeReview: LessonReview = {
  ai: {
    locales: 20,
    methodology: { pr: 1, language: 'en' },
    content: { pr: 2, language: 'en' },
    experienceReview: { pr: 3, language: 'en' },
    methodologyReview: { pr: 4, language: 'en' },
    questions: { pr: 5, language: 'en' },
    flashcards: { pr: 6, language: 'en' },
    generateSources: { pr: 7, language: 'en' },
    resourceProduction: { pr: 8, language: 'en' },
    localization: { pr: 9, language: 'en' },
    validation: { pr: 10, language: 'en' },
  },
  human: {
    acceptance: 21,
    locales: { en: 22 },
    scientific: { pr: 23, language: 'en' },
  },
};

// @ts-expect-error Stage evidence is mandatory even when the localization PR is present.
const incompleteAi: LessonReview['ai'] = { locales: 20 };
// @ts-expect-error Legacy kebab-case is not part of the Lesson review stage vocabulary.
const legacyStage: LessonReviewStage = 'experience-review';
const canonicalStage: LessonReviewStage = 'experienceReview';

void completeReview;
void incompleteAi;
void legacyStage;
void canonicalStage;
export type { LessonReviewChecks };
