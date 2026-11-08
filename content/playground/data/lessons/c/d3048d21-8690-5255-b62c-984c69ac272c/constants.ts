import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine';
import type { Locale_Languages } from '@svitlo/contracts/content';

export const howLightMoves_languages = [
  DEFAULT_SUPPORTED_LANGUAGES[0].language,
  ...DEFAULT_SUPPORTED_LANGUAGES.slice(1).map(({ language }) => language),
] as const satisfies Locale_Languages;

export type HowLightMoves_Languages = typeof howLightMoves_languages;
export type HowLightMoves_Language = HowLightMoves_Languages[number];
