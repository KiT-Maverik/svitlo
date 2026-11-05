'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Locale } from '@svitlo/engine/localization';

/** One host-provided locale shared by all textbook Scenes. */
const SceneLocaleContext = createContext<Locale>('uk-UA');

export function SceneLocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <SceneLocaleContext.Provider value={locale}>{children}</SceneLocaleContext.Provider>;
}

export function useSceneLocale() {
  return useContext(SceneLocaleContext);
}
