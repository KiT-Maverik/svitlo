import type { LanguageCode } from '@svitlo/engine/build';

// Restore the complete language set when translations are ready:
// export const languages = ["en"] as const satisfies readonly [LanguageCode, ...LanguageCode[]];

export const languages = ["en"] as const satisfies readonly [LanguageCode, ...LanguageCode[]];
export type LessonLanguages = typeof languages;
