/**
 * Draft-only Lesson Review template. The incomplete identifier and values
 * intentionally fail TypeScript until compiled Props and reviews are verified.
 * Keep the stage keys aligned with Engine's LessonReviewStage; external
 * Lesson Production Issue slugs are mapped separately in review.types.ts.
 */
export const lessonReviewStageSlugs = [
  'methodology',
  'content',
  'experienceReview',
  'methodologyReview',
  'questions',
  'flashcards',
  'generateSources',
  'resourceProduction',
  'localization',
  'validation',
];

export function renderReviewDraft() {
  return [
    "import type { LessonReview } from '@svitlo/engine/build';",
    '',
    '// REVIEW PENDING: replace the missing const identifier with a digest of assembled Lesson Props.',
    '// Complete PR numbers and review languages only after confirming evidence for that revision.',
    'const = {',
    '  ai: {',
    ...lessonReviewStageSlugs.map(stage => '    ' + stage + ': { pr: , language: , },'),
    '    locales: ,',
    '  },',
    '  human: {',
    '    acceptance: ,',
    '    locales: {},',
    '  },',
    '} satisfies LessonReview;',
    '',
  ].join('\n');
}
