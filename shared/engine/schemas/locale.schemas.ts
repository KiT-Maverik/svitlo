import { z } from 'zod';

import { languageCode_Schema, type LanguageCodes } from './languages.schemas';

export const nonTranslatableText_Schema = z.string().min(1);

export const localeText_Schema = z.string().min(1);

export const locale_All_Schema = z.record(languageCode_Schema, localeText_Schema);

export const createLocaleSubsetSchema = <const Languages extends readonly [LanguageCodes, ...LanguageCodes[]]>(
  languages: Languages,
  allowOtherLanguages = true,
) => {
  const base = z.record(z.enum(languages), localeText_Schema);

  if (allowOtherLanguages) {
    return base.and(z.partialRecord(languageCode_Schema, localeText_Schema));
  }

  return base;
};

export const localizationSwitch = {
  config: locale_All_Schema,
  props: localeText_Schema,
} as const;
