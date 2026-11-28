import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { defineAudio, defineCarousel, defineImage, defineVideo } from './contentBlocks';

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('media filename validation', () => {
      const id = '72d22bea-d787-4c6d-9a83-144830c6d325';
      const uuid = '550e8400-e29b-41d4-a716-446655440000';
      test('valid local UUID filenames validate before physical media production', () => {
        const picture = defineImage({
          id,
          slug: 'picture',
          type: 'image',
          params: { width: 10, height: 10 },
          locale: { fileName: uuid + '.png', alt: 'Picture' },
        });
        const recording = defineAudio<'recording', ['en', 'uk']>({
          id,
          slug: 'recording',
          type: 'audio',
          params: {},
          locale: { fileName: { en: uuid + '.wav', uk: uuid + '.wav' }, title: 'Audio' },
        });
        const movie = defineVideo({
          id,
          slug: 'movie',
          type: 'video',
          params: {},
          locale: { fileName: uuid + '.mp4', posterFileName: uuid + '.jpg', label: 'Movie' },
        });
        const carousel = defineCarousel<'carousel', { picture: typeof picture }>({
          id,
          slug: 'carousel',
          type: 'carousel',
          params: {},
          locale: {},
          children: ['picture'],
          picture,
        });
        assert.doesNotThrow(() => picture.build.data({ languages: ['en'] }));
        assert.doesNotThrow(() => recording.build.data({ languages: ['en', 'uk'] }));
        assert.doesNotThrow(() => movie.build.data({ languages: ['en'] }));
        assert.doesNotThrow(() => carousel.build.data({ languages: ['en'] }));
        assert.equal(picture.build.data({ languages: ['en'] }).base.locale?.src, uuid + '.png');
        assert.equal(movie.build.data({ languages: ['en'] }).base.locale?.poster, uuid + '.jpg');
      });

      test('rejects incorrect media categories and paths, not missing physical files', () => {
        const picture = defineImage({
          id,
          slug: 'picture',
          type: 'image',
          params: { width: 10, height: 10 },
          locale: { fileName: uuid + '.png', alt: 'Picture' },
        });
        assert.throws(() =>
          picture.config.validate({
            id,
            slug: 'picture',
            type: 'image',
            params: { width: 10, height: 10 },
            locale: { fileName: uuid + '.mp4', alt: 'Picture' },
          }),
        );
        assert.throws(() =>
          picture.config.validate({
            id,
            slug: 'picture',
            type: 'image',
            params: { width: 10, height: 10 },
            locale: { fileName: '../escape.png', alt: 'Picture' },
          }),
        );
        assert.doesNotThrow(() =>
          picture.config.validate({
            id,
            slug: 'picture',
            type: 'image',
            params: { width: 10, height: 10 },
            locale: { fileName: '00000000-0000-0000-0000-000000000000.webp', alt: 'Pending' },
          }),
        );
      });

      test('keeps valid external HTTP(S) sources separate from local filenames', () => {
        const picture = defineImage({
          id,
          slug: 'remote',
          type: 'image',
          params: { width: 10, height: 10 },
          locale: { fileName: 'https://example.com/media/image.png', alt: 'Remote' },
        });
        assert.equal(picture.build.data({ languages: ['en'] }).base.locale?.src, 'https://example.com/media/image.png');
      });
    });
  });
});
