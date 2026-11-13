import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { defineImage } from './index';

const id = 'e5235ac2-2c44-4c10-8c48-3c7bad649011';
const scope = { languages: ['uk'] as const };

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('defineImage', () => {
      const config = () => ({
        id,
        slug: 'diagram' as const,
        type: 'image' as const,
        params: { width: 640, height: 480 },
        locale: { src: { en: 'https://example.org/en.png', uk: 'https://example.org/uk.png' }, alt: 'Diagram' },
      });

      test('publishes translated source and invariant alternative text', () => {
        const image = defineImage<'diagram', ['en', 'uk']>(config());
        const resource = image.build.props(scope);
        assert.deepEqual(resource.base.params, { width: 640, height: 480 });
        assert.equal(resource.base.locale?.alt, 'Diagram');
        assert.deepEqual(resource.locale, { uk: { locale: { src: 'https://example.org/uk.png' } } });
      });

      test('checks dimension constraints after sparse overrides', () => {
        const image = defineImage<'diagram', ['en', 'uk']>(config());
        assert.throws(() => image.build.overrides({ params: { fill: true } }, scope), /Invalid Image overrides/);
        const original = image.build.props(scope);
        const patch = image.build.overrides({ params: { fill: true, aspectRatio: 1.5 } }, scope);
        assert.deepEqual(patch, { base: { params: { fill: true, aspectRatio: 1.5 } }, locale: undefined });
        assert.deepEqual(image.build.props(scope), original);
        assert.throws(() => image.build.overrides({ id: 'invalid' } as never, scope), /Invalid Image overrides/);
      });
    });
  });
});
