import type { LanguageCode } from '@svitlo/engine/build';

export const languages = ['en', 'pl', 'uk', 'qm'] as const satisfies readonly [
  LanguageCode,
  ...LanguageCode[],
];

export type EqualsMeansSameValue_Lesson_Languages = typeof languages;
