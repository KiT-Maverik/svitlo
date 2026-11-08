// Shared language definitions and static locale catalog live in Contracts.
export * from '@svitlo/contracts/localization';
import {
  DEFAULT_SUPPORTED_LANGUAGES,
  type LanguageCode,
  type LanguageConfiguration,
  type LanguageDefinition,
  type Locale,
  type TextDirection,
} from '@svitlo/contracts/localization';

/** Convert a validated BCP 47 locale tag to the language key used by content dictionaries. */
export function getLanguageCode(locale: Locale): LanguageCode {
  return (DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.locale === locale)?.language ??
    locale.split('-')[0]) as LanguageCode;
}

export function getSupportedLanguages(configuration: LanguageConfiguration = {}): readonly LanguageDefinition[] {
  const additionalLanguages = configuration.additionalLanguages ?? [];
  return configuration.replaceDefaults
    ? [...additionalLanguages]
    : [...DEFAULT_SUPPORTED_LANGUAGES, ...additionalLanguages];
}

export function isLocale(
  value: string,
  languages: readonly LanguageDefinition[] = DEFAULT_SUPPORTED_LANGUAGES,
): value is Locale {
  return languages.some(language => language.locale === value);
}

export function getLocaleDirection(locale: Locale): TextDirection {
  return DEFAULT_SUPPORTED_LANGUAGES.find(language => language.locale === locale)?.direction ?? 'ltr';
}
