import { DEFAULT_SUPPORTED_LANGUAGES, type LanguageCode, type Locale } from '@svitlo/contracts/localization';

/** Convert a validated BCP 47 locale tag to the language key used by content dictionaries. */
export function getLanguageCode(locale: Locale): LanguageCode {
  return (DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.locale === locale)?.language ??
    locale.split('-')[0]) as LanguageCode;
}
