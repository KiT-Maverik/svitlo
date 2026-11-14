import { defineCarouselSlide } from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../../constants';

export const prismSlide = defineCarouselSlide<'prismSlide', EqualsMeansSameValue_Lesson_Languages>({
  id: '7b3d4859-b3d8-4742-b261-5bfce58e2836',
  slug: 'prismSlide',
  type: 'carouselSlide',
  locale: {
    src: '/textbooks/math/demonstrationalSection/carousel-prism.svg',
    alt: { en: 'Abstract prism shapes' },
  },
});
