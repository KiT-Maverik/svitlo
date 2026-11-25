import type { SupportedLanguages } from '@svitlo/engine/build';
// Planned languages (INACTIVE until complete and reviewed): ["en","uk"]
// TODO (BLOCKER): Complete and independently review every planned Course translation for ["en","uk"]; REPLACE the tuple in the single existing export const languages below with the verified active languages, then remove this marker.
export const languages = ["en"] as const satisfies SupportedLanguages;
export type Languages = typeof languages;
