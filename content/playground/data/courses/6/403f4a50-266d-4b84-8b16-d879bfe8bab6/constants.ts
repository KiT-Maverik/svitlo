import type { SupportedLanguages } from '@svitlo/engine/build';

// TODO (BLOCKER): Uncomment when translations completed.
// export const languages = ["en", "uk"] as const satisfies SupportedLanguages;

// TODO (BLOCKER): Remove when translations completed.
export const languages = ["en"] as const satisfies SupportedLanguages;

export type Languages = typeof languages;
