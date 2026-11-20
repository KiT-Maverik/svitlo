// TODO (BLOCKER): Conduct review. Zero is unreviewed; verify PR, Props revision and language evidence before Ready/merge.
import type { LessonReview } from '@svitlo/engine/build';

const lessonReview = {
  ai: {
    methodology: { pr: 0, language: "uk" },
    content: { pr: 0, language: "uk" },
    experienceReview: { pr: 0, language: "uk" },
    methodologyReview: { pr: 0, language: "uk" },
    questions: { pr: 0, language: "uk" },
    flashcards: { pr: 0, language: "uk" },
    generateSources: { pr: 0, language: "uk" },
    resourceProduction: { pr: 0, language: "uk" },
    localization: { pr: 0, language: "uk" },
    validation: { pr: 0, language: "uk" },
    locales: 0,
  },
  human: {
    acceptance: 0,
    locales: {},
  },
} satisfies LessonReview;
