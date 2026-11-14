import { defineContentSection } from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../constants';
import { compareAmountsSnippet } from './code';
import { lightShapesImage } from './image';
import { demonstrationClip } from './video';
import { equalityVideos } from './youtube';
import { shapeGallery } from './carousel';
import { equalityCheckpoint } from './checkpoint';
import { demonstrationTone } from './audio';
import { toneCaptions } from './subtitles';

type SectionItems = {
  compareAmountsSnippet: typeof compareAmountsSnippet;
  lightShapesImage: typeof lightShapesImage;
  demonstrationClip: typeof demonstrationClip;
  equalityVideos: typeof equalityVideos;
  shapeGallery: typeof shapeGallery;
  equalityCheckpoint: typeof equalityCheckpoint;
  demonstrationTone: typeof demonstrationTone;
  toneCaptions: typeof toneCaptions;
};

export const demonstrationalSection = defineContentSection<'demonstrationalSection', SectionItems, EqualsMeansSameValue_Lesson_Languages>({
  id: '0e9f12e6-ea37-4add-98a8-108ced141fb5',
  slug: 'demonstrationalSection',
  type: 'content',
  params: {},
  locale: {
    title: { en: 'Demonstrational section' },
    navigationLabel: { en: 'Demonstrational section' },
  },
  content: {
    items: {
      compareAmountsSnippet,
      lightShapesImage,
      demonstrationClip,
      equalityVideos,
      shapeGallery,
      equalityCheckpoint,
      demonstrationTone,
      toneCaptions,
    },
    order: [
      'compareAmountsSnippet',
      'lightShapesImage',
      'demonstrationClip',
      'equalityVideos',
      'shapeGallery',
      'equalityCheckpoint',
      'demonstrationTone',
      'toneCaptions',
    ],
  },
});
