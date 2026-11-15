import { defineImage } from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../../constants';

export const lightShapesImage = defineImage<'lightShapesImage', EqualsMeansSameValue_Lesson_Languages>({
  id: 'bffead1a-c265-449a-87a8-7f1241794050',
  slug: 'lightShapesImage',
  type: 'image',
  params: { width: 960, height: 540, objectFit: 'contain' },
  locale: {
    src: '/textbooks/math/demonstrationalSection/carousel-light.svg',
    alt: { en: 'Abstract light shapes used to demonstrate the image block' },
  },
});
