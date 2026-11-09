'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { DEFAULT_SUPPORTED_LANGUAGES, type Locale } from '@svitlo/contracts/localization';
import { getLocaleDirection } from '@svitlo/engine';

export interface SkillsPageSettings {
  readonly showMastery: boolean;
  readonly colorMastery: boolean;
  readonly showPump: boolean;
}

export const DEFAULT_SKILLS_PAGE_SETTINGS: SkillsPageSettings = {
  showMastery: true,
  colorMastery: true,
  showPump: true,
};

export interface SkillsMapActions {
  collapseAll: () => void;
  expandAll: () => void;
  fitToScreen: () => void;
}

interface SkillsPageContextValue {
  readonly settings: SkillsPageSettings;
  readonly locale: Locale;
  readonly ready: boolean;
  readonly localeError: string | null;
  readonly mapReady: boolean;
  readonly registerMapActions: (actions: SkillsMapActions | null) => void;
  readonly runMapAction: (action: keyof SkillsMapActions) => void;
  readonly updateSetting: <K extends keyof SkillsPageSettings>(key: K, value: SkillsPageSettings[K]) => void;
  readonly setLocale: (locale: Locale) => void;
  readonly setLanguageCode: (code: string) => void;
}

const SkillsPageContext = createContext<SkillsPageContextValue | null>(null);

function supportedLocale(value: string): Locale | null {
  const match = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.locale === value || item.language === value);
  return match?.locale ?? null;
}

/** Page instance owns these switches: no global app defaults or authoring Data changes. */
export function SkillsPageSettingsProvider({
  children,
  initialLanguage = 'uk',
  onLanguageChange,
}: {
  children: ReactNode;
  initialLanguage?: string;
  onLanguageChange?: (language: string) => void;
}) {
  const [settings, setSettings] = useState<SkillsPageSettings>(DEFAULT_SKILLS_PAGE_SETTINGS);
  const locale = supportedLocale(initialLanguage) ?? 'uk-UA';
  const localeError = supportedLocale(initialLanguage) ? null : 'Мова сторінки відсутня в реєстрі: ' + initialLanguage;
  const ready = true;
  const actionsRef = useRef<SkillsMapActions | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const registerMapActions = useCallback((actions: SkillsMapActions | null) => {
    actionsRef.current = actions;
    setMapReady(actions !== null);
  }, []);
  const runMapAction = useCallback((action: keyof SkillsMapActions) => {
    actionsRef.current?.[action]();
  }, []);

  useEffect(() => {
    if (!ready || localeError) return;
    const beforeLang = document.documentElement.lang;
    const beforeDirection = document.documentElement.dir;
    document.documentElement.lang = locale;
    document.documentElement.dir = getLocaleDirection(locale);
    return () => {
      document.documentElement.lang = beforeLang;
      document.documentElement.dir = beforeDirection;
    };
  }, [locale, ready, localeError]);

  const updateSetting = useCallback(<K extends keyof SkillsPageSettings>(key: K, value: SkillsPageSettings[K]) => {
    setSettings(current => ({ ...current, [key]: value }));
  }, []);

  const setLocale = useCallback(
    (next: Locale) => {
      const parsed = supportedLocale(next);
      if (!parsed) throw new Error('Непідтримувана мова Skills: ' + next);
      const language = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.locale === parsed)?.language;
      if (!language) throw new Error('Немає мовного коду для ' + parsed);
      // Request new Next.js Server Component props; do not fetch resources on the client.
      onLanguageChange?.(language);
    },
    [onLanguageChange],
  );

  const setLanguageCode = useCallback(
    (code: string) => {
      const parsed = supportedLocale(code);
      if (!parsed) throw new Error('Непідтримувана мова Skills: ' + code);
      setLocale(parsed);
    },
    [setLocale],
  );

  const value = useMemo<SkillsPageContextValue>(
    () => ({
      settings,
      locale,
      localeError,
      ready,
      mapReady,
      registerMapActions,
      runMapAction,
      updateSetting,
      setLocale,
      setLanguageCode,
    }),
    [
      settings,
      locale,
      localeError,
      ready,
      mapReady,
      registerMapActions,
      runMapAction,
      updateSetting,
      setLocale,
      setLanguageCode,
    ],
  );
  return <SkillsPageContext.Provider value={value}>{children}</SkillsPageContext.Provider>;
}

export function useSkillsPageSettings(): SkillsPageContextValue {
  const context = useContext(SkillsPageContext);
  if (!context) throw new Error('SkillsPageSettingsProvider is required');
  return context;
}
