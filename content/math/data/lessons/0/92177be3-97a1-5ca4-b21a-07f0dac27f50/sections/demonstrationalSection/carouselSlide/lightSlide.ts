import { defineCarouselSlide } from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../../constants';

export const lightSlide = defineCarouselSlide<'lightSlide', EqualsMeansSameValue_Lesson_Languages>({
  id: '8b909d8a-fe9d-4eea-9167-44b8969ece3f',
  slug: 'lightSlide',
  type: 'carouselSlide',
  locale: {
    src: '/textbooks/math/demonstrationalSection/carousel-light.svg',
    alt: { en: 'Abstract light shapes' },
  },
});
