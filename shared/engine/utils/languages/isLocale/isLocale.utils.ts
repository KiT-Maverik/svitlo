import { DEFAULT_SUPPORTED_LANGUAGES, type LanguageDefinition, type Locale } from '@svitlo/contracts/localization';

export function isLocale(
  value: string,
  languages: readonly LanguageDefinition[] = DEFAULT_SUPPORTED_LANGUAGES,
): value is Locale {
  return languages.some(language => language.locale === value);
}
