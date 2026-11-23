import type { SupportedLanguages } from '@svitlo/engine/build';

// Stage 9: source-language and three authored translations are present.
// Real Scene/media resources and independent translation reviews remain pending.
export const languages = ["uk", "en", "pl", "qm"] as const satisfies SupportedLanguages;
export type LessonLanguages = typeof languages;
