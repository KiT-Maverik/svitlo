import type { UiKit_Component } from '@svitlo/engine/content';
export const data = {
  en: {
    loading: 'Loading video…',
    offline: 'This video needs an internet connection.',
    unavailable: 'This video is unavailable.',
    retry: 'Try again',
  },
  uk: {
    loading: 'Завантаження відео…',
    offline: 'Для перегляду відео потрібен інтернет.',
    unavailable: 'Це відео недоступне.',
    retry: 'Спробувати ще раз',
  },
} satisfies UiKit_Component<'youtube', 'data', 'en' | 'uk'>;
