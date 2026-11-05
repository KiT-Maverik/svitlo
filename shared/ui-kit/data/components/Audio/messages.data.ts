import type { UiKit_Component } from '@svitlo/engine/content';
export const data = {
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
} satisfies UiKit_Component<'audio', 'data', 'en' | 'uk'>;
