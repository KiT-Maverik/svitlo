import assert from 'node:assert/strict';
import test, { describe } from 'node:test';

import { defineAudio, defineCode, defineImage, defineMarkdown, defineScene, defineVideo, defineYoutube } from './index';

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('assembly', () => {
      const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';

      test('Published locale bodies already match Props and require no embedding', () => {
        const block = defineAudio<'localeShape', ['en']>({
          id,
          slug: 'localeShape',
          type: 'audio',
          params: {},
          locale: { title: { en: 'Hello' }, fileName: 'https://example.com/audio.mp3' },
        });
        const result = block.build.data({ languages: ['en'] });
        assert.deepEqual(result.locale?.en, { locale: { title: 'Hello' } });
        assert.deepEqual(
          block.build.overrides({ locale: { title: { en: 'Updated' } } }, { languages: ['en'] }).locale?.en,
          {
            locale: { title: 'Updated' },
          },
        );
        assert.equal(
          block.build.data({ languages: ['en'] }).base.locale?.fileLocation,
          'https://example.com/audio.mp3',
        );
      });

      test('Audio publishes Props-shaped locale bodies and isolated sparse patches', () => {
        const authored = {
          id,
          slug: 'audioExample',
          type: 'audio' as const,
          params: {},
          locale: {
            title: 'Narration',
            fileName: { en: 'https://example.com/en.mp3', uk: 'https://example.com/uk.mp3' },
            fallback: { offline: 'Offline', retry: { en: 'Retry', uk: 'Повторити' } },
          },
        };
        const audio = defineAudio<string, ['en', 'uk']>(authored);
        assert.deepEqual(audio.build.data({ languages: ['en', 'uk'] }), {
          base: {
            id,
            slug: 'audioExample',
            type: 'audio',
            params: {},
            locale: { title: 'Narration', fallback: { offline: 'Offline' } },
          },
          locale: {
            en: { locale: { fileLocation: 'https://example.com/en.mp3', fallback: { retry: 'Retry' } } },
            uk: { locale: { fileLocation: 'https://example.com/uk.mp3', fallback: { retry: 'Повторити' } } },
          },
        });
        assert.deepEqual(audio.build.data({ languages: ['en', 'uk'] }), {
          base: audio.build.data({ languages: ['en', 'uk'] }).base,
          locale: {
            en: { locale: { fileLocation: 'https://example.com/en.mp3', fallback: { retry: 'Retry' } } },
            uk: { locale: { fileLocation: 'https://example.com/uk.mp3', fallback: { retry: 'Повторити' } } },
          },
        });
        const patch = { locale: { title: { uk: 'Оповідь' } }, params: { disabled: true as const } };
        assert.deepEqual(audio.build.overrides(patch, { languages: ['en', 'uk'] }), {
          base: { params: { disabled: true } },
          locale: { uk: { locale: { title: 'Оповідь' } } },
        });
        assert.deepEqual(audio.build.overrides({}, { languages: ['en', 'uk'] }), { base: {}, locale: undefined });
        assert.throws(
          () =>
            audio.build.overrides({ locale: { fallback: { unknown: 'bad' } } } as never, { languages: ['en', 'uk'] }),
          /Invalid Audio overrides/,
        );
        assert.equal('override' in audio, false);
        assert.equal('disable' in audio, false);
        authored.locale.title = 'Changed';
        assert.equal(audio.build.data({ languages: ['en', 'uk'] }).base.locale?.title, 'Narration');
        const first = audio.build.data({ languages: ['en', 'uk'] });
        first.base.params.disabled = true;
        assert.deepEqual(audio.build.data({ languages: ['en', 'uk'] }).base.params, {});
      });

      test('Code applies semantic validation after merging sparse replacement dictionaries', () => {
        const code = defineCode<'example', ['en', 'uk']>({
          id,
          type: 'code',
          slug: 'example',
          params: { language: 'python', codeAsText: 'print(%_%NAME%_%)' },
          locale: { title: 'Code', variables: { NAME: { en: 'Ada', uk: 'Ада' } } },
        });
        assert.deepEqual(code.build.data({ languages: ['en', 'uk'] }), {
          base: {
            id,
            type: 'code',
            slug: 'example',
            params: { language: 'python', codeAsText: 'print(%_%NAME%_%)' },
            locale: { title: 'Code' },
          },
          locale: { en: { locale: { variables: { NAME: 'Ada' } } }, uk: { locale: { variables: { NAME: 'Ада' } } } },
        });
        assert.deepEqual(code.build.data({ languages: ['en', 'uk'] }).locale?.uk, {
          locale: { variables: { NAME: 'Ада' } },
        });
        assert.deepEqual(
          code.build.overrides({ locale: { variables: { NAME: { uk: 'Оля' } } } }, { languages: ['en', 'uk'] }),
          {
            base: {},
            locale: { uk: { locale: { variables: { NAME: 'Оля' } } } },
          },
        );
        assert.throws(
          () => code.build.overrides({ params: { codeAsText: 'print(123)' } }, { languages: ['en', 'uk'] }),
          /Code variables validation failed/,
        );
        assert.throws(
          () => code.build.overrides({ locale: { variables: { UNKNOWN: 'Nope' } } }, { languages: ['en', 'uk'] }),
          /Code variables validation failed/,
        );
      });

      test('Image validates merged dimensions and nested sparse localized fields', () => {
        const image = defineImage<'diagram', ['en', 'uk']>({
          id,
          type: 'image',
          slug: 'diagram',
          params: { width: 600, height: 400 },
          locale: {
            fileName: 'https://example.com/image.png',
            alt: { en: 'Diagram', uk: 'Схема' },
            fallback: { offline: 'Offline' },
          },
        });
        assert.deepEqual(image.build.data({ languages: ['en', 'uk'] }).base.locale, {
          src: 'https://example.com/image.png',
          fallback: { offline: 'Offline' },
        });
        assert.deepEqual(image.build.data({ languages: ['en', 'uk'] }).locale?.uk, { locale: { alt: 'Схема' } });
        assert.deepEqual(
          image.build.overrides({ locale: { alt: { uk: 'Ілюстрація' } } }, { languages: ['en', 'uk'] }),
          {
            base: {},
            locale: { uk: { locale: { alt: 'Ілюстрація' } } },
          },
        );
        assert.deepEqual(image.build.overrides({ params: { height: 200 } }, { languages: ['en', 'uk'] }), {
          base: { params: { height: 200 } },
          locale: undefined,
        });
        assert.throws(
          () => image.build.overrides({ params: { fill: true } }, { languages: ['en', 'uk'] }),
          /Image requires either fill\/aspectRatio or width\/height/,
        );
        assert.throws(
          () => image.build.overrides({ locale: { fallback: { typo: 'Nope' } } } as never, { languages: ['en', 'uk'] }),
          /Invalid Image overrides/,
        );
      });

      test('Markdown checks variables on resolved sparse locale overrides', () => {
        const markdown = defineMarkdown<'lessonNotes', ['en', 'uk']>({
          id,
          type: 'markdown',
          slug: 'lessonNotes',
          params: {},
          locale: {
            value: { en: 'Hello %_%NAME%_%', uk: 'Привіт %_%NAME%_%' },
            variables: { NAME: { en: 'Ada', uk: 'Ада' } },
          },
        });
        assert.deepEqual(markdown.build.data({ languages: ['en', 'uk'] }).locale, {
          en: { locale: { value: 'Hello %_%NAME%_%', variables: { NAME: 'Ada' } } },
          uk: { locale: { value: 'Привіт %_%NAME%_%', variables: { NAME: 'Ада' } } },
        });
        assert.deepEqual(markdown.build.data({ languages: ['en', 'uk'] }).locale?.en, {
          locale: { value: 'Hello %_%NAME%_%', variables: { NAME: 'Ada' } },
        });
        assert.deepEqual(
          markdown.build.overrides({ locale: { variables: { NAME: { uk: 'Оля' } } } }, { languages: ['en', 'uk'] }),
          {
            base: {},
            locale: { uk: { locale: { variables: { NAME: 'Оля' } } } },
          },
        );
        assert.throws(
          () => markdown.build.overrides({ locale: { value: { uk: 'Без змінної' } } }, { languages: ['en', 'uk'] }),
          /missing configured variable "NAME"/,
        );
        assert.throws(
          () => markdown.build.overrides({ locale: { variables: { OTHER: 'stray' } } }, { languages: ['en', 'uk'] }),
          /missing configured variable "OTHER"/,
        );
      });

      test('Scene recursively partitions its data-only localized leaves', () => {
        const scene = defineScene({
          id,
          type: 'scene',
          slug: 'simulation',
          params: {},
          locale: {
            value: { heading: { en: 'Hello', uk: 'Привіт' }, panel: { caption: 'Invariant', info: { uk: 'Деталі' } } },
          },
        });
        assert.deepEqual(scene.build.data({ languages: ['en', 'uk'] }), {
          base: {
            id,
            type: 'scene',
            slug: 'simulation',
            params: {},
            locale: { value: { panel: { caption: 'Invariant' } } },
          },
          locale: {
            en: { locale: { value: { heading: 'Hello' } } },
            uk: { locale: { value: { heading: 'Привіт', panel: { info: 'Деталі' } } } },
          },
        });
        assert.deepEqual(scene.build.data({ languages: ['en', 'uk'] }).locale?.uk, {
          locale: { value: { heading: 'Привіт', panel: { info: 'Деталі' } } },
        });
        assert.deepEqual(
          scene.build.overrides(
            { locale: { value: { panel: { caption: { uk: 'Підпис' } } } } },
            { languages: ['en', 'uk'] },
          ),
          {
            base: {},
            locale: { uk: { locale: { value: { panel: { caption: 'Підпис' } } } } },
          },
        );
        assert.throws(
          () => scene.build.overrides({ params: { unknown: true } } as never, { languages: ['en', 'uk'] }),
          /Invalid Scene overrides/,
        );
      });

      test('Video and YouTube publish media-specific fallback and link fields', () => {
        const video = defineVideo<'movie', ['en', 'uk']>({
          id,
          type: 'video',
          slug: 'movie',
          params: {},
          locale: {
            fileName: 'https://example.com/movie.mp4',
            posterFileName: 'https://example.com/poster.png',
            label: { en: 'Movie', uk: 'Відео' },
            fallback: { offline: 'Offline' },
          },
        });
        assert.deepEqual(video.build.data({ languages: ['en', 'uk'] }).locale, {
          en: { locale: { label: 'Movie' } },
          uk: { locale: { label: 'Відео' } },
        });
        assert.deepEqual(video.build.data({ languages: ['en', 'uk'] }).locale?.uk, { locale: { label: 'Відео' } });
        assert.deepEqual(video.build.overrides({ locale: { label: { uk: 'Фільм' } } }, { languages: ['en', 'uk'] }), {
          base: {},
          locale: { uk: { locale: { label: 'Фільм' } } },
        });
        const youtube = defineYoutube<'external', ['en', 'uk']>({
          id,
          type: 'youtube',
          slug: 'external',
          params: { mode: 'link' },
          locale: { href: 'https://youtube.com/watch?v=example', label: { en: 'Watch', uk: 'Дивитись' } },
        });
        assert.deepEqual(youtube.build.data({ languages: ['en', 'uk'] }).base.locale, {
          href: 'https://youtube.com/watch?v=example',
        });
        assert.deepEqual(youtube.build.data({ languages: ['en', 'uk'] }).locale?.en, { locale: { label: 'Watch' } });
        assert.deepEqual(
          youtube.build.overrides(
            { params: { mode: 'embed' }, locale: { label: { uk: 'Переглянути' } } },
            { languages: ['en', 'uk'] },
          ),
          {
            base: { params: { mode: 'embed' } },
            locale: { uk: { locale: { label: 'Переглянути' } } },
          },
        );
        assert.throws(
          () => youtube.build.overrides({ locale: { nope: 'bad' } } as never, { languages: ['en', 'uk'] }),
          /Invalid Youtube overrides/,
        );
      });

      test('Every flat ContentBlock exposes the stateless Build API', () => {
        const block = defineAudio({
          id,
          type: 'audio',
          slug: 'audio',
          params: {},
          locale: { title: 'Audio', fileName: 'https://example.com/audio.mp3' },
        });
        assert.equal('override' in block, false);
        assert.equal('disable' in block, false);
        assert.equal('overrides' in block.config, false);
        assert.equal('assemble' in block, false);
        assert.equal(typeof block.build.data, 'function');
        assert.equal(typeof block.build.overrides, 'function');
        assert.equal(typeof block.config.locales, 'function');
        assert.equal(typeof block.build.data, 'function');
      });

      test('Markdown can override one language of an invariant replacement without losing the others', () => {
        const markdown = defineMarkdown<'invariantVariable', ['en', 'uk']>({
          id,
          slug: 'invariantVariable',
          type: 'markdown',
          params: {},
          locale: {
            value: { en: 'Hello %_%NAME%_%', uk: 'Привіт %_%NAME%_%' },
            variables: { NAME: 'Ada' },
          },
        });
        assert.deepEqual(
          markdown.build.overrides({ locale: { variables: { NAME: { uk: 'Оля' } } } }, { languages: ['en', 'uk'] }),
          {
            base: {},
            locale: { uk: { locale: { variables: { NAME: 'Оля' } } } },
          },
        );
      });

      test('Flat ContentBlocks publish stateless Props without the legacy assemble surface', () => {
        const blocks = [
          defineAudio({
            id,
            slug: 'a',
            type: 'audio',
            params: {},
            locale: { title: 'Audio', fileName: 'https://example.com/a.mp3' },
          }),
          defineCode({
            id,
            slug: 'c',
            type: 'code',
            params: { language: 'ts', codeAsText: 'const a = 1;' },
            locale: {},
          }),
          defineImage({
            id,
            slug: 'd',
            type: 'image',
            params: { width: 200, height: 100 },
            locale: { fileName: 'https://example.com/a.png', alt: 'A' },
          }),
          defineMarkdown({
            id,
            slug: 'e',
            type: 'markdown',
            params: {},
            locale: { value: 'Hello' },
          }),
          defineScene({
            id,
            slug: 'f',
            type: 'scene',
            params: {},
            locale: { value: { title: 'Demo' } },
          }),
          defineVideo({
            id,
            slug: 'g',
            type: 'video',
            params: {},
            locale: {
              fileName: 'https://example.com/a.mp4',
              posterFileName: 'https://example.com/a.png',
              label: 'Video',
            },
          }),
          defineYoutube({
            id,
            slug: 'h',
            type: 'youtube',
            params: { mode: 'link' },
            locale: { href: 'https://youtube.com/watch?v=example', label: 'Watch' },
          }),
        ];

        for (const block of blocks) {
          assert.equal('assemble' in block, false);
          assert.equal(typeof block.build.data, 'function');
          assert.equal(typeof block.build.overrides, 'function');
          const original = block.build.data({ languages: ['en', 'uk'] });
          assert.deepEqual(block.build.data({ languages: ['en', 'uk'] }).base, original.base);
          assert.deepEqual(block.build.overrides({ params: { disabled: true } }, { languages: ['en', 'uk'] }), {
            base: { params: { disabled: true } },
            locale: undefined,
          });
          assert.deepEqual(block.build.overrides({}, { languages: ['en', 'uk'] }), { base: {}, locale: undefined });
          assert.deepEqual(block.build.data({ languages: ['en', 'uk'] }), original);
          assert.throws(
            () => block.build.overrides({ params: { unknown: true } } as never, { languages: ['en', 'uk'] }),
            /Invalid .* overrides/,
          );
        }
      });
    });
  });
});
