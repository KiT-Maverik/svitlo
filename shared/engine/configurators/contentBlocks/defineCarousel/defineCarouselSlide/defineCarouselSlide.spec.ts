import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { defineCarouselSlide } from './index';

const id = 'e5235ac2-2c44-4c10-8c48-3c7bad649011';
const scope = { languages: ['uk'] as const };

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('defineCarouselSlide', () => {
      test('publishes only the requested alternate text alongside its invariant image', () => {
        const slide = defineCarouselSlide<'opening', ['en', 'uk']>({
          id,
          slug: 'opening',
          type: 'carouselSlide',
          locale: { src: 'https://example.org/slide.png', alt: { en: 'Opening', uk: 'Початок' } },
        });
        const resource = slide.build.props(scope);
        assert.equal(resource.base.locale?.src, 'https://example.org/slide.png');
        assert.deepEqual(resource.locale, { uk: { locale: { alt: 'Початок' } } });
      });

      test('publishes sparse patches without changing the source', () => {
        const slide = defineCarouselSlide<'opening', ['en', 'uk']>({
          id,
          slug: 'opening',
          type: 'carouselSlide',
          locale: { src: 'https://example.org/slide.png', alt: { en: 'Opening', uk: 'Початок' } },
        });
        const original = slide.build.props(scope);
        assert.deepEqual(slide.build.overrides({ locale: { alt: { uk: 'Старт' } } }, scope), {
          base: {},
          locale: { uk: { locale: { alt: 'Старт' } } },
        });
        assert.throws(
          () => slide.build.overrides({ slug: 'renamed' } as never, scope),
          /Invalid Carousel Slide overrides/,
        );
        assert.deepEqual(slide.build.props(scope), original);
      });
    });
  });
});
