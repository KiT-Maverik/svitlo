import type { UiKit_Component } from '@svitlo/engine/content';
export const data = {
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
} satisfies UiKit_Component<'video', 'data', 'en' | 'uk'>;
