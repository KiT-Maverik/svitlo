import type { UiKit_Component } from '@svitlo/engine/content';
export const data = {
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
} satisfies UiKit_Component<'image', 'data', 'en' | 'uk'>;
