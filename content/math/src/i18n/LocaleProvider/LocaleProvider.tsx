'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { getLocaleDirection } from '@svitlo/engine/localization';
import type { Locale } from '@svitlo/engine/localization';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const theme = useTheme();
  const direction = getLocaleDirection(locale);
  const directionalTheme = useMemo(() => ({ ...theme, direction }), [theme, direction]);
  useEffect(() => {
    const previousDirection = document.documentElement.dir;
    const previousLanguage = document.documentElement.lang;
    document.documentElement.dir = direction;
    document.documentElement.lang = locale;
    return () => {
      document.documentElement.dir = previousDirection;
      document.documentElement.lang = previousLanguage;
    };
  }, [direction, locale]);
  const pathname = usePathname();
  const router = useRouter();
  const setLocale = useCallback(
    (nextLocale: Locale) => {
      const params = new URLSearchParams(window.location.search);
      params.set('lang', nextLocale);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router],
  );
  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return (
    <LocaleContext.Provider value={value}>
      <ThemeProvider theme={directionalTheme}>{children}</ThemeProvider>
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale requires LocaleProvider');
  return context;
}
