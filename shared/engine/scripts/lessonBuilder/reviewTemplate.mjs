/**
 * Draft-only Lesson Review template. The incomplete identifier and values
 * intentionally fail TypeScript until compiled Props and reviews are verified.
 * Keep these stages in sync with Engine's LessonReviewStage.
 */
export const lessonReviewStageSlugs = [
  'methodology',
  'content',
  'experience-review',
  'methodology-review',
  'questions',
  'flashcards',
  'generate-sources',
  'resource-production',
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
    '    stages: {',
    ...lessonReviewStageSlugs.map(stage => '      ' + JSON.stringify(stage) + ': { pr: , language: , },'),
    '    },',
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
