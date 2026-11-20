import type { SupportedLanguages } from '@svitlo/engine/build';

// Crimean Tatar text has independent best-effort AI review; native-language review remains recommended.
export const languages = ["uk","en","pl","qm"] as const satisfies SupportedLanguages;
export type LessonLanguages = typeof languages;
