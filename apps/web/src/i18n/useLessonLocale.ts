'use client';

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { DEFAULT_SUPPORTED_LANGUAGES, type Locale } from '@svitlo/engine/localization';

function languageForCode(code: string) {
  const language = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.language === code);
  if (!language) throw new Error('Unsupported language in lesson path: ' + code);
  return language;
}

function languageForLocale(locale: Locale) {
  const language = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.locale === locale);
  if (!language) throw new Error('Unsupported lesson locale: ' + locale);
  return language;
}

/** Lessons may select a separate content language; episodes use the UI language. */
function lessonRoute(pathname: string) {
  const lesson = /^\/([a-z]{2})(\/course\/[^/]+)?\/lesson\/(?:([a-z]{2})\/)?([^/]+)\/?$/.exec(pathname);
  if (lesson) {
    return {
      kind: 'lesson' as const,
      interfaceLanguage: languageForCode(lesson[1]),
      lessonLanguage: languageForCode(lesson[3] ?? lesson[1]),
      entryId: lesson[4],
      routePrefix: lesson[2] ?? '',
    };
  }
  const episode = /^\/([a-z]{2})(\/course\/[^/]+)\/episode\/([^/]+)\/?$/.exec(pathname);
  if (episode) {
    const interfaceLanguage = languageForCode(episode[1]);
    return {
      kind: 'episode' as const,
      interfaceLanguage,
      lessonLanguage: interfaceLanguage,
      entryId: episode[3],
      routePrefix: episode[2],
    };
  }
  throw new Error('Unsupported lesson path: ' + pathname);
}

export function useLessonLanguage() {
  return lessonRoute(usePathname()).interfaceLanguage;
}

export function useLessonLocale() {
  const pathname = usePathname();
  const router = useRouter();
  const { kind, interfaceLanguage, lessonLanguage, entryId, routePrefix } = lessonRoute(pathname);

  const navigate = useCallback(
    (interfaceCode: string, lessonCode: string) => {
      const params = new URLSearchParams(window.location.search);
      params.delete('lang');
      const query = params.toString();
      const nextPath =
        kind === 'episode'
          ? `/${interfaceCode}${routePrefix}/episode/${entryId}`
          : `/${interfaceCode}${routePrefix}/lesson/${lessonCode}/${entryId}`;
      router.replace(nextPath + (query ? `?${query}` : ''), { scroll: false });
    },
    [entryId, kind, routePrefix, router],
  );

  const setLocale = useCallback(
    (nextLocale: Locale) => navigate(languageForLocale(nextLocale).language, lessonLanguage.language),
    [navigate, lessonLanguage.language],
  );

  const setLessonLocale = useCallback(
    (nextLocale: Locale) => navigate(interfaceLanguage.language, languageForLocale(nextLocale).language),
    [navigate, interfaceLanguage.language],
  );

  return {
    locale: interfaceLanguage.locale,
    setLocale,
    lessonLocale: kind === 'episode' ? undefined : lessonLanguage.locale,
    setLessonLocale: kind === 'episode' ? undefined : setLessonLocale,
  };
}
