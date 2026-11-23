import { describe, expect, it } from 'vitest';
import type { ContentBlock_Carousel_Props } from '@svitlo/engine/runtime';
import { questionBlockLabel } from './QuestionContent';

const image: ContentBlock_Carousel_Props['locale']['slides'][number] = {
  id: 'image-one',
  slug: 'imageOne',
  type: 'image',
  params: { fill: true, aspectRatio: 1.5 },
  locale: { src: '/example.svg', alt: 'Accessible comparison of counters' },
};
const scene: ContentBlock_Carousel_Props['locale']['slides'][number] = {
  id: 'scene-one',
  slug: 'sceneOne',
  type: 'scene',
  params: {},
  locale: { value: { title: 'Arrange the counters' } },
};

const carousel: ContentBlock_Carousel_Props = {
  id: 'carousel-one',
  slug: 'gallery',
  type: 'carousel',
  params: {},
  locale: { slides: [image] },
};

describe('Carousel accessible question labels', () => {
  it('uses the nested Image alt when no Carousel title is authored', () => {
    expect(questionBlockLabel(carousel)).toBe('Accessible comparison of counters');
  });

  it('uses the nested Scene title when the first slide is interactive', () => {
    expect(questionBlockLabel({ ...carousel, locale: { slides: [scene] } })).toBe('Arrange the counters');
  });

  it('prioritizes an explicit Carousel title over the child slide label', () => {
    expect(questionBlockLabel({ ...carousel, locale: { title: 'Compare values', slides: [scene] } })).toBe(
      'Compare values',
    );
  });
});
