import type { SupportedLanguages } from '@svitlo/engine/build';
// TODO (BLOCKER): Complete and independently review translations for ["en","uk"], restore the reviewed languages tuple, and remove this marker.
export const languages = ["en"] as const satisfies SupportedLanguages;
export type Languages = typeof languages;
