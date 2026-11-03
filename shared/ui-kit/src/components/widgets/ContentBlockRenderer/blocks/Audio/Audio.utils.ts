export type AudioFailureKind = 'offline' | 'unavailable' | 'playbackError';

/** Try a cached file first; classify the failure only when loading or playback fails. */
export function classifyAudioError(error: MediaError | null, online: boolean): AudioFailureKind | null {
  if (!error || error.code === 1) return null;
  if (error.code === 3) return 'playbackError';
  if (!online) return 'offline';
  if (error.code === 4) return 'unavailable';
  return 'playbackError';
}

const fallbackText = {
  en: {
    offline: 'This audio is not available offline.',
    unavailable: 'This audio is unavailable.',
    playbackError: 'The audio could not be played.',
    retry: 'Try again',
  },
  uk: {
    offline: 'Це аудіо недоступне без інтернету.',
    unavailable: 'Це аудіо недоступне.',
    playbackError: 'Не вдалося відтворити аудіо.',
    retry: 'Спробувати ще раз',
  },
} as const;

export function audioFallbackText(locale: string, kind: AudioFailureKind | 'retry'): string {
  return (locale === 'uk' ? fallbackText.uk : fallbackText.en)[kind];
}
