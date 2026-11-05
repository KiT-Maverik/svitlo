import { DEFAULT_SUPPORTED_LANGUAGES, type LanguageCode, type Locale } from '@svitlo/engine/localization';
import { textbook } from '@svitlo/playground';

export type LessonRoute = { language: LanguageCode; locale: Locale; lessonId: string };

export function parseLessonRoute(pathname: string): LessonRoute | null {
  const match = /^\/([a-z]{2})\/lesson\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/?$/i.exec(
    pathname,
  );
  if (!match) return null;
  const definition = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.language === match[1]);
  if (!definition) return null;
  return { language: definition.language, locale: definition.locale, lessonId: match[2].toLowerCase() };
}

export function initialLessonRoute(pathname: string): LessonRoute | null {
  const existing = parseLessonRoute(pathname);
  if (existing) return existing;
  if (pathname !== '/' && pathname !== '/uk' && pathname !== '/uk/') return null;
  const defaultLanguage = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.language === 'uk');
  if (!defaultLanguage || !textbook.featuredLessonId) return null;
  return { language: defaultLanguage.language, locale: defaultLanguage.locale, lessonId: textbook.featuredLessonId };
}

export function lessonHref(route: LessonRoute): string {
  return '/' + route.language + '/lesson/' + route.lessonId;
}

export function changeLessonLocale(route: LessonRoute, locale: Locale): LessonRoute {
  const definition = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.locale === locale);
  if (!definition) throw new Error('Unsupported lesson locale: ' + locale);
  return { ...route, locale: definition.locale, language: definition.language };
}
