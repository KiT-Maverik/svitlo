import type { SupportedLanguages } from '@svitlo/engine/build';

// TODO (BLOCKER): Restore the complete language set when translations are ready:
// export const languages = ["uk","en","pl","qm"] as const satisfies SupportedLanguages;

export const languages = ["uk"] as const satisfies SupportedLanguages;
export type CourseLanguages = typeof languages;
