import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/contracts/localization';

export const howLightMoves_languages = [
  DEFAULT_SUPPORTED_LANGUAGES[0].language,
  ...DEFAULT_SUPPORTED_LANGUAGES.slice(1).map(({ language }) => language),
] as const;
