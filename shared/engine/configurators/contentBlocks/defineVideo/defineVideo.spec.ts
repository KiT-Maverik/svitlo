import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { defineVideo } from './index';

const id = 'e5235ac2-2c44-4c10-8c48-3c7bad649011';
const scope = { languages: ['uk'] as const };

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('defineVideo', () => {
      const config = () => ({
        id,
        slug: 'clip',
        type: 'video' as const,
        params: {},
        locale: {
          fileLocation: 'https://example.org/clip.mp4',
          poster: 'https://example.org/preview.png',
          label: { en: 'Demonstration', uk: 'Демонстрація' },
        },
      });

      test('keeps accessible labels localized and media paths invariant', () => {
        const video = defineVideo<'clip', ['en', 'uk']>(config());
        const resource = video.build.props(scope);
        assert.equal(resource.base.locale?.fileLocation, 'https://example.org/clip.mp4');
        assert.equal(resource.base.locale?.poster, 'https://example.org/preview.png');
        assert.deepEqual(resource.locale, { uk: { locale: { label: 'Демонстрація' } } });
      });

      test('keeps a localized label override sparse and identity immutable', () => {
        const video = defineVideo<'clip', ['en', 'uk']>(config());
        const before = video.build.props(scope);
        const patch = video.build.overrides({ locale: { label: { uk: 'Відеоурок' } } }, scope);
        assert.deepEqual(patch, { base: {}, locale: { uk: { locale: { label: 'Відеоурок' } } } });
        assert.deepEqual(video.build.props(scope), before);
        assert.throws(() => video.build.overrides({ type: 'audio' } as never, scope), /Invalid Video overrides/);
      });
    });
  });
});
