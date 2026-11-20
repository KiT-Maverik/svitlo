import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';

import type { LessonLanguages } from '#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants';

export const quizIntro = defineMarkdown<'quizIntro', LessonLanguages>({
  id: 'c96a7b8f-dce5-4b59-97f5-dd7ed2720464',
  slug: 'quizIntro',
  type: 'markdown',
  params: {},
  locale: {
    value: readMarkdown(import.meta.url, ['uk']),
  },
});
