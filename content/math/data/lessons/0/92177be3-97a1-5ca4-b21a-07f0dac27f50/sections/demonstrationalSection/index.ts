import { defineContentSection } from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../constants';
import { compareAmountsSnippet } from './compareAmountsSnippet';
import { lightShapesImage } from './lightShapesImage';
import { demonstrationClip } from './demonstrationClip';
import { equalityVideos } from './equalityVideos';
import { shapeGallery } from './shapeGallery';
import { equalityCheckpoint } from './equalityCheckpoint';
import { demonstrationTone } from './demonstrationTone';
import { toneCaptions } from './toneCaptions';

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
