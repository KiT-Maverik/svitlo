'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Locale } from '@svitlo/engine/localization';

const SceneLocale = createContext<Locale>('uk-UA');

export function SceneLocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <SceneLocale.Provider value={locale}>{children}</SceneLocale.Provider>;
}

export function useSceneLocale() {
  return useContext(SceneLocale);
}
