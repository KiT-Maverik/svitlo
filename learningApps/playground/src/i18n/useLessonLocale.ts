'use client';

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { DEFAULT_SUPPORTED_LANGUAGES, type Locale } from '@svitlo/engine/localization';

function lessonLanguage(pathname: string) {
  const code = pathname.split('/')[1];
  const language = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.language === code);
  if (!language) throw new Error('Unsupported lesson language in path: ' + code);
  return language;
}

export function useLessonLanguage() {
  return lessonLanguage(usePathname());
}

export function useLessonLocale() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = lessonLanguage(pathname);
  const setLocale = useCallback((nextLocale: Locale) => {
    const language = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.locale === nextLocale);
    if (!language) throw new Error('Unsupported lesson locale: ' + nextLocale);
    const params = new URLSearchParams(window.location.search);
    params.delete('lang');
    const query = params.toString();
    const nextPathname = pathname.replace(/^\/[^/]+(?=\/|$)/, `/${language.language}`);
    router.replace(nextPathname + (query ? `?${query}` : ''), { scroll: false });
  }, [pathname, router]);

  return { locale, setLocale };
}
