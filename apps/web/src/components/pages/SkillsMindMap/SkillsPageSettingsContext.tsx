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
export function SkillsPageSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SkillsPageSettings>(DEFAULT_SKILLS_PAGE_SETTINGS);
  const [locale, updateLocale] = useState<Locale>('uk-UA');
  const [localeError, setLocaleError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const actionsRef = useRef<SkillsMapActions | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const registerMapActions = useCallback((actions: SkillsMapActions | null) => {
    actionsRef.current = actions;
    setMapReady(actions !== null);
  }, []);
  const runMapAction = useCallback((action: keyof SkillsMapActions) => {
    actionsRef.current?.[action]();
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect -- The initial language is URL/document state available only after hydration. */
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('lang');
    const parsed = requested ? supportedLocale(requested) : supportedLocale(document.documentElement.lang);
    if (!parsed) {
      setLocaleError('Мова сторінки відсутня в реєстрі: ' + (requested ?? document.documentElement.lang));
    } else {
      updateLocale(parsed);
      setLocaleError(null);
    }
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

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

  const setLocale = useCallback((next: Locale) => {
    const parsed = supportedLocale(next);
    if (!parsed) throw new Error('Непідтримувана мова Skills: ' + next);
    const language = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.locale === parsed)?.language;
    if (!language) throw new Error('Немає мовного коду для ' + parsed);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    window.history.replaceState(null, '', url);
    updateLocale(parsed);
    setLocaleError(null);
  }, []);

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
