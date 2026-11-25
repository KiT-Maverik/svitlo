'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type MediaSettings = {
  /** Shared lesson media volume, expressed as a percentage from 0 to 100. */
  volume: number;
  /** Muting never erases the remembered volume. */
  muted: boolean;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  toggleMuted: () => void;
};

const MediaSettingsContext = createContext<MediaSettings | null>(null);

/** Owns media preferences independently of the Lesson Controller navigation reducer. */
export function MediaSettingsProvider({ children }: { children: ReactNode }) {
  const [volume, setVolumeState] = useState(100);
  const [muted, setMuted] = useState(false);
  const setVolume = useCallback((next: number) => {
    if (!Number.isFinite(next)) return;
    setVolumeState(Math.max(0, Math.min(100, Math.round(next))));
  }, []);
  const toggleMuted = useCallback(() => setMuted(current => !current), []);
  const value = useMemo(
    () => ({ volume, muted, setVolume, setMuted, toggleMuted }),
    [volume, muted, setVolume, toggleMuted],
  );

  return <MediaSettingsContext.Provider value={value}>{children}</MediaSettingsContext.Provider>;
}

/** Media content blocks also work in Storybook or pages outside a Lesson. */
export function useOptionalMediaSettings() {
  return useContext(MediaSettingsContext);
}

export function useMediaSettings(): MediaSettings {
  const settings = useOptionalMediaSettings();
  if (!settings) throw new Error('useMediaSettings must be used inside MediaSettingsProvider');
  return settings;
}
