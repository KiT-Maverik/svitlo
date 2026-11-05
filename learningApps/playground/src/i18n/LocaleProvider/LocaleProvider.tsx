'use client';

import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import type { Locale } from '@svitlo/engine/localization';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const setLocale = useCallback(
    (nextLocale: Locale) => {
      const language = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.locale === nextLocale);
      if (!language) throw new Error('Unsupported lesson locale: ' + nextLocale);
      const params = new URLSearchParams(window.location.search);
      params.delete('lang');
      const query = params.toString();
      const nextPathname = pathname.replace(/^\/[^/]+(?=\/|$)/, `/${language.language}`);
      router.replace(nextPathname + (query ? `?${query}` : ''), { scroll: false });
    },
    [pathname, router],
  );
  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale requires LocaleProvider');
  return context;
}
