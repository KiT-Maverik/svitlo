export type ImageFailureKind = 'offline' | 'unavailable';

/** Remote URLs need an allowlisted host for Next optimization; preserve them by default. */
export function imageUnoptimized(src: string, configured?: boolean): boolean {
  return configured ?? /^https?:\/\//i.test(src);
}

const fallbackText = {
  en: {
    offline: 'This image is not available offline.',
    unavailable: 'This image is unavailable.',
    retry: 'Try again',
  },
  uk: {
    offline: 'Це зображення недоступне без інтернету.',
    unavailable: 'Це зображення недоступне.',
    retry: 'Спробувати ще раз',
  },
} as const;

export function imageFallbackText(locale: string, kind: ImageFailureKind | 'retry'): string {
  return (locale === 'uk' ? fallbackText.uk : fallbackText.en)[kind];
}
