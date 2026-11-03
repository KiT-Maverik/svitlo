export type VideoFailureKind = 'offline' | 'unavailable' | 'playbackError';

/** A video can be cached while offline, so connection state matters only after loading fails. */
export function classifyVideoError(error: MediaError | null, online: boolean): VideoFailureKind | null {
  if (error?.code === 1) return null;
  if (error?.code === 3) return 'playbackError';
  if (!online) return 'offline';
  if (error?.code === 4) return 'unavailable';
  return 'playbackError';
}

const fallbackText = {
  en: {
    offline: 'This video is not available offline.',
    unavailable: 'This video is unavailable.',
    playbackError: 'The video could not be played.',
    retry: 'Try again',
  },
  uk: {
    offline: 'Це відео недоступне без інтернету.',
    unavailable: 'Це відео недоступне.',
    playbackError: 'Не вдалося відтворити відео.',
    retry: 'Спробувати ще раз',
  },
} as const;

export function videoFallbackText(locale: string, kind: VideoFailureKind | 'retry'): string {
  return (locale === 'uk' ? fallbackText.uk : fallbackText.en)[kind];
}
