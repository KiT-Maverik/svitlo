/**
 * Type-valid but unreviewed Lesson Review template. The stage identifiers must
 * match Engine's LessonReviewStage union; numeric zero is not approval.
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

/** Source-language provenance is not proof that a review was conducted. */
export function renderReviewDraft(language) {
  if (typeof language !== 'string' || !language.trim())
    throw new Error('Lesson Review requires the source document language');
  return [
    '// TODO (BLOCKER): Conduct review. Zero is unreviewed; verify PR, Props revision and language evidence before Ready/merge.',
    "import type { LessonReview } from '@svitlo/engine/build';",
    '',
    'const lessonReview = {',
    '  ai: {',
    ...lessonReviewStageSlugs.map(stage => '    ' + stage + ': { pr: 0, language: ' + JSON.stringify(language) + ' },'),
    '    locales: 0,',
    '  },',
    '  human: {',
    '    acceptance: 0,',
    '    locales: {},',
    '  },',
    '} satisfies LessonReview;',
    '',
  ].join('\n');
}
