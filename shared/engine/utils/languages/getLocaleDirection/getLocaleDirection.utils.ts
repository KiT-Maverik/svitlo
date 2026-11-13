import { DEFAULT_SUPPORTED_LANGUAGES, type Locale, type TextDirection } from '#schemas';

export function getLocaleDirection(locale: Locale): TextDirection {
  return DEFAULT_SUPPORTED_LANGUAGES.find(language => language.locale === locale)?.direction ?? 'ltr';
}
