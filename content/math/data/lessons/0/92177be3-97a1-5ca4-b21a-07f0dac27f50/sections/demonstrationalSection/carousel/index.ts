import { defineCarousel, defineCarouselSlide } from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../../constants';

const lightSlide = defineCarouselSlide<'lightSlide', EqualsMeansSameValue_Lesson_Languages>({
  id: '8b909d8a-fe9d-4eea-9167-44b8969ece3f',
  slug: 'lightSlide',
  type: 'carouselSlide',
  locale: {
    alt: { en: 'Abstract light shapes' },
  },
});

const prismSlide = defineCarouselSlide<'prismSlide', EqualsMeansSameValue_Lesson_Languages>({
  id: '7b3d4859-b3d8-4742-b261-5bfce58e2836',
  slug: 'prismSlide',
  type: 'carouselSlide',
  locale: {
    alt: { en: 'Abstract prism shapes' },
  },
});

type Slides = { lightSlide: typeof lightSlide; prismSlide: typeof prismSlide };

export const shapeGallery = defineCarousel<'shapeGallery', Slides, EqualsMeansSameValue_Lesson_Languages>({
  id: '9c3f2ac6-e9fb-48cd-ae4d-b8825263a64f',
  slug: 'shapeGallery',
  type: 'carousel',
  params: { showArrows: true, showIndicators: true },
  locale: { title: { en: 'Image gallery' } },
  slides: {
    items: { lightSlide, prismSlide },
    order: ['lightSlide', 'prismSlide'],
  },
});
