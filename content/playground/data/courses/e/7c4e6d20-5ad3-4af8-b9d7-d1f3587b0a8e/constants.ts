import type { SupportedLanguages } from '@svitlo/engine/build';

// TODO (BLOCKER): Restore the complete language set when translations are ready:
// export const languages = ["en","uk"] as const satisfies SupportedLanguages;

export const languages = ["en"] as const satisfies SupportedLanguages;
export type CourseLanguages = typeof languages;
