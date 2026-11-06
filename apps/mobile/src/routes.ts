import { DEFAULT_SUPPORTED_LANGUAGES, type LanguageCode, type Locale } from '@svitlo/engine/localization';
import { resolveEntityPath } from '@svitlo/engine';

export const defaultLanguage: LanguageCode = 'uk';

export function localeForLanguage(code: string): Locale | undefined {
  return DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === code)?.locale;
}

export function languageForLocale(locale: Locale): LanguageCode {
  const descriptor = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.locale === locale);
  if (!descriptor) throw new Error('Unsupported locale: ' + locale);
  return descriptor.language;
}

export type MobileRoute =
  | { type: 'home' }
  | { type: 'lesson'; id: string; language: LanguageCode; lessonLanguage: LanguageCode }
  | { type: 'not-found' };

export function parseRoute(pathname: string): MobileRoute {
  if (pathname === '/' || pathname === '/index.html') return { type: 'home' };
  const match = /^\/([a-z]{2})\/lesson\/(?:([a-z]{2})\/)?([0-9a-f-]+)\/?$/.exec(pathname);
  if (!match || !localeForLanguage(match[1]) || !localeForLanguage(match[2] ?? match[1]))
    return { type: 'not-found' };
  try {
    resolveEntityPath(match[3]);
  } catch {
    return { type: 'not-found' };
  }
  return {
    type: 'lesson',
    language: match[1] as LanguageCode,
    lessonLanguage: (match[2] ?? match[1]) as LanguageCode,
    id: match[3],
  };
}

export function lessonHref(language: LanguageCode, id: string, lessonLanguage: LanguageCode = language): string {
  return '/' + language + '/lesson/' + lessonLanguage + '/' + resolveEntityPath(id).split('/')[1];
}
