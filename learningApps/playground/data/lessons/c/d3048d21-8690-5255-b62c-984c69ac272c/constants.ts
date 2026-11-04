import type { Locale_Languages } from '@svitlo/engine/content';

export const howLightMoves_languages = ['en', 'de'] as const satisfies Locale_Languages;

export type HowLightMoves_Languages = typeof howLightMoves_languages;
export type HowLightMoves_Language = HowLightMoves_Languages[number];
