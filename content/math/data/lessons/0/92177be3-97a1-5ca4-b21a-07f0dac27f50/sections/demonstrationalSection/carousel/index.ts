import { defineCarousel } from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../../constants';
import { lightSlide } from '../carouselSlide/lightSlide';
import { prismSlide } from '../carouselSlide/prismSlide';

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
