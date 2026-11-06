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

/** The first code is the UI language; the code after /lesson/ is the lesson language. */
function lessonRoute(pathname: string) {
  const match = /^\/([a-z]{2})\/lesson\/(?:([a-z]{2})\/)?([^/]+)\/?$/.exec(pathname);
  if (!match) throw new Error('Unsupported lesson path: ' + pathname);
  const interfaceLanguage = languageForCode(match[1]);
  const lessonLanguage = languageForCode(match[2] ?? match[1]);
  return { interfaceLanguage, lessonLanguage, lessonId: match[3] };
}

export function useLessonLanguage() {
  return lessonRoute(usePathname()).interfaceLanguage;
}

export function useLessonLocale() {
  const pathname = usePathname();
  const router = useRouter();
  const { interfaceLanguage, lessonLanguage, lessonId } = lessonRoute(pathname);

  const navigate = useCallback(
    (interfaceCode: string, lessonCode: string) => {
      const params = new URLSearchParams(window.location.search);
      params.delete('lang');
      const query = params.toString();
      const nextPath = `/${interfaceCode}/lesson/${lessonCode}/${lessonId}`;
      router.replace(nextPath + (query ? `?${query}` : ''), { scroll: false });
    },
    [lessonId, router],
  );

  const setLocale = useCallback(
    (nextLocale: Locale) => navigate(languageForLocale(nextLocale).language, lessonLanguage.language),
    [navigate, lessonLanguage.language],
  );

  const setLessonLocale = useCallback(
    (nextLocale: Locale) => navigate(interfaceLanguage.language, languageForLocale(nextLocale).language),
    [navigate, interfaceLanguage.language],
  );

  return { locale: interfaceLanguage.locale, setLocale, lessonLocale: lessonLanguage.locale, setLessonLocale };
}
