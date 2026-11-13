import { z } from 'zod';

export const allLanguageCodes = [
  'ar',
  'be',
  'bn',
  'de',
  'en',
  'es',
  'et',
  'fr',
  'he',
  'hi',
  'id',
  'ja',
  'ka',
  'kk',
  'ko',
  'lt',
  'lv',
  'mr',
  'ms',
  'pl',
  'pt',
  'qm',
  'ta',
  'te',
  'tr',
  'uk',
  'ur',
  'vi',
  'zh',
] as const;

/** Canonical nonempty tuple used when authored configurators omit a language subset. */
export type AllLanguageCodes = typeof allLanguageCodes;
export type LanguageCodes = AllLanguageCodes[number];

export const languageCode_Schema = z.enum(allLanguageCodes);
