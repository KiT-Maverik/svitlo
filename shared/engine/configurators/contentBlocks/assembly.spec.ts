import assert from 'node:assert/strict';
import test from 'node:test';

import {
  defineAudio,
  defineCarousel,
  defineCode,
  defineImage,
  defineMarkdown,
  defineScene,
  defineVideo,
  defineYoutube,
} from './index';

import { wrapLocale } from '../_shared__configurators';

const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';

test('wrapLocale converts language file bodies into nested Props fragments', () => {
  assert.equal(wrapLocale(undefined), undefined);
  assert.equal(wrapLocale({}), undefined);
  const input = { en: { title: 'Welcome' }, uk: { title: 'Привіт' } };
  assert.deepEqual(wrapLocale(input), {
    en: { locale: { title: 'Welcome' } },
    uk: { locale: { title: 'Привіт' } },
  });
  assert.deepEqual(input, { en: { title: 'Welcome' }, uk: { title: 'Привіт' } });
});

test('Audio publishes direct locale bodies and isolated sparse patches', () => {
  const authored = {
    id,
    slug: 'audioExample',
    type: 'audio' as const,
    params: {},
    locale: {
      title: 'Narration',
      fileLocation: { en: 'https://example.com/en.mp3', uk: 'https://example.com/uk.mp3' },
      fallback: { offline: 'Offline', retry: { uk: 'Повторити' } },
    },
  };
  const audio = defineAudio(authored);
  assert.deepEqual(audio.build.props(), {
    base: {
      id,
      slug: 'audioExample',
      type: 'audio',
      params: {},
      locale: { title: 'Narration', fallback: { offline: 'Offline' } },
    },
    locale: {
      en: { fileLocation: 'https://example.com/en.mp3' },
      uk: { fileLocation: 'https://example.com/uk.mp3', fallback: { retry: 'Повторити' } },
    },
  });
  assert.deepEqual(audio.build.props({ embed: true }), {
    base: audio.build.props().base,
    locale: {
      en: { locale: { fileLocation: 'https://example.com/en.mp3' } },
      uk: { locale: { fileLocation: 'https://example.com/uk.mp3', fallback: { retry: 'Повторити' } } },
    },
  });
  const patch = { locale: { title: { uk: 'Оповідь' } }, params: { disabled: true as const } };
  assert.deepEqual(audio.build.overrides(patch), {
    base: { params: { disabled: true } },
    locale: { uk: { title: 'Оповідь' } },
  });
  assert.deepEqual(audio.build.overrides({}), { base: {}, locale: undefined });
  assert.throws(
    () => audio.build.overrides({ locale: { fallback: { unknown: 'bad' } } } as never),
    /Invalid Audio overrides/,
  );
  assert.equal('override' in audio, false);
  assert.equal('disable' in audio, false);
  authored.locale.title = 'Changed';
  assert.equal(audio.build.props().base.locale?.title, 'Narration');
  const first = audio.build.props();
  first.base.params.disabled = true;
  assert.deepEqual(audio.build.props().base.params, {});
});

test('Carousel publishes complete localized arrays and atomically replaces slides', () => {
  const carousel = defineCarousel({
    id,
    type: 'carousel',
    slug: 'gallery',
    params: { loop: true },
    locale: {
      title: 'Gallery',
      slides: [
        { src: { en: 'https://example.com/a-en.png', uk: 'https://example.com/a-uk.png' }, alt: 'First' },
        { src: 'https://example.com/b.png', alt: 'Second', caption: { en: 'A caption', uk: 'Підпис' } },
      ],
    },
  });
  const resource = carousel.build.props();
  assert.deepEqual(resource.base.locale, { title: 'Gallery' });
  assert.deepEqual(resource.locale?.en?.slides, [
    { src: 'https://example.com/a-en.png', alt: 'First' },
    { src: 'https://example.com/b.png', alt: 'Second', caption: 'A caption' },
  ]);
  assert.deepEqual(resource.locale?.uk?.slides?.[0]?.src, 'https://example.com/a-uk.png');
  assert.deepEqual(carousel.build.props({ embed: true }).locale?.en, {
    locale: { slides: resource.locale?.en?.slides },
  });
  const replacement = [{ src: 'https://example.com/other.png', alt: 'Other' }];
  assert.deepEqual(carousel.build.overrides({ locale: { slides: replacement } }), {
    base: { locale: { slides: replacement } },
    locale: undefined,
  });
  assert.throws(
    () => carousel.build.overrides({ locale: { slides: [{ alt: 'Missing src' }] } }),
    /Invalid Carousel overrides/,
  );
  assert.throws(() => carousel.build.overrides({ locale: { slides: [] } }), /Invalid Carousel overrides/);
  assert.deepEqual(carousel.build.props().locale?.en?.slides?.length, 2);
});

test('Code applies semantic validation after merging sparse replacement dictionaries', () => {
  const code = defineCode({
    id,
    type: 'code',
    slug: 'example',
    params: { language: 'python', codeAsText: 'print(%_%NAME%_%)' },
    locale: { title: 'Code', variables: { NAME: { en: 'Ada', uk: 'Ада' } } },
  });
  assert.deepEqual(code.build.props(), {
    base: {
      id,
      type: 'code',
      slug: 'example',
      params: { language: 'python', codeAsText: 'print(%_%NAME%_%)' },
      locale: { title: 'Code' },
    },
    locale: { en: { variables: { NAME: 'Ada' } }, uk: { variables: { NAME: 'Ада' } } },
  });
  assert.deepEqual(code.build.props({ embed: true }).locale?.uk, {
    locale: { variables: { NAME: 'Ада' } },
  });
  assert.deepEqual(code.build.overrides({ locale: { variables: { NAME: { uk: 'Оля' } } } }), {
    base: {},
    locale: { uk: { variables: { NAME: 'Оля' } } },
  });
  assert.throws(
    () => code.build.overrides({ params: { codeAsText: 'print(123)' } }),
    /Code variables validation failed/,
  );
  assert.throws(
    () => code.build.overrides({ locale: { variables: { UNKNOWN: 'Nope' } } }),
    /Code variables validation failed/,
  );
});

test('Image validates merged dimensions and nested sparse localized fields', () => {
  const image = defineImage({
    id,
    type: 'image',
    slug: 'diagram',
    params: { width: 600, height: 400 },
    locale: {
      src: 'https://example.com/image.png',
      alt: { en: 'Diagram', uk: 'Схема' },
      fallback: { offline: 'Offline' },
    },
  });
  assert.deepEqual(image.build.props().base.locale, {
    src: 'https://example.com/image.png',
    fallback: { offline: 'Offline' },
  });
  assert.deepEqual(image.build.props({ embed: true }).locale?.uk, { locale: { alt: 'Схема' } });
  assert.deepEqual(image.build.overrides({ locale: { alt: { uk: 'Ілюстрація' } } }), {
    base: {},
    locale: { uk: { alt: 'Ілюстрація' } },
  });
  assert.deepEqual(image.build.overrides({ params: { height: 200 } }), {
    base: { params: { height: 200 } },
    locale: undefined,
  });
  assert.throws(
    () => image.build.overrides({ params: { fill: true } }),
    /Image requires either fill\/aspectRatio or width\/height/,
  );
  assert.throws(
    () => image.build.overrides({ locale: { fallback: { typo: 'Nope' } } } as never),
    /Invalid Image overrides/,
  );
});

test('Markdown checks variables on resolved sparse locale overrides', () => {
  const markdown = defineMarkdown({
    id,
    type: 'markdown',
    slug: 'lessonNotes',
    params: {},
    locale: {
      value: { en: 'Hello %_%NAME%_%', uk: 'Привіт %_%NAME%_%' },
      variables: { NAME: { en: 'Ada', uk: 'Ада' } },
    },
  });
  assert.deepEqual(markdown.build.props().locale, {
    en: { value: 'Hello %_%NAME%_%', variables: { NAME: 'Ada' } },
    uk: { value: 'Привіт %_%NAME%_%', variables: { NAME: 'Ада' } },
  });
  assert.deepEqual(markdown.build.props({ embed: true }).locale?.en, {
    locale: { value: 'Hello %_%NAME%_%', variables: { NAME: 'Ada' } },
  });
  assert.deepEqual(markdown.build.overrides({ locale: { variables: { NAME: { uk: 'Оля' } } } }), {
    base: {},
    locale: { uk: { variables: { NAME: 'Оля' } } },
  });
  assert.throws(
    () => markdown.build.overrides({ locale: { value: { uk: 'Без змінної' } } }),
    /missing configured variable "NAME"/,
  );
  assert.throws(
    () => markdown.build.overrides({ locale: { variables: { OTHER: 'stray' } } }),
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
  assert.deepEqual(scene.build.props(), {
    base: { id, type: 'scene', slug: 'simulation', params: {}, locale: { value: { panel: { caption: 'Invariant' } } } },
    locale: { en: { value: { heading: 'Hello' } }, uk: { value: { heading: 'Привіт', panel: { info: 'Деталі' } } } },
  });
  assert.deepEqual(scene.build.props({ embed: true }).locale?.uk, {
    locale: { value: { heading: 'Привіт', panel: { info: 'Деталі' } } },
  });
  assert.deepEqual(scene.build.overrides({ locale: { value: { panel: { caption: { uk: 'Підпис' } } } } }), {
    base: {},
    locale: { uk: { value: { panel: { caption: 'Підпис' } } } },
  });
  assert.throws(() => scene.build.overrides({ params: { unknown: true } } as never), /Invalid Scene overrides/);
});

test('Video and YouTube publish media-specific fallback and link fields', () => {
  const video = defineVideo({
    id,
    type: 'video',
    slug: 'movie',
    params: {},
    locale: {
      fileLocation: 'https://example.com/movie.mp4',
      poster: 'https://example.com/poster.png',
      label: { en: 'Movie', uk: 'Відео' },
      fallback: { offline: 'Offline' },
    },
  });
  assert.deepEqual(video.build.props().locale, { en: { label: 'Movie' }, uk: { label: 'Відео' } });
  assert.deepEqual(video.build.props({ embed: true }).locale?.uk, { locale: { label: 'Відео' } });
  assert.deepEqual(video.build.overrides({ locale: { label: { uk: 'Фільм' } } }), {
    base: {},
    locale: { uk: { label: 'Фільм' } },
  });
  const youtube = defineYoutube({
    id,
    type: 'youtube',
    slug: 'external',
    params: { mode: 'link' },
    locale: { href: 'https://youtube.com/watch?v=example', label: { en: 'Watch', uk: 'Дивитись' } },
  });
  assert.deepEqual(youtube.build.props().base.locale, { href: 'https://youtube.com/watch?v=example' });
  assert.deepEqual(youtube.build.props({ embed: true }).locale?.en, { locale: { label: 'Watch' } });
  assert.deepEqual(
    youtube.build.overrides({ params: { mode: 'embed' }, locale: { label: { uk: 'Переглянути' } } }),
    {
      base: { params: { mode: 'embed' } },
      locale: { uk: { label: 'Переглянути' } },
    },
  );
  assert.throws(() => youtube.build.overrides({ locale: { nope: 'bad' } } as never), /Invalid Youtube overrides/);
});

test('Every flat ContentBlock exposes the stateless Build API', () => {
  const block = defineAudio({
    id,
    type: 'audio',
    slug: 'audio',
    params: {},
    locale: { title: 'Audio', fileLocation: 'https://example.com/audio.mp3' },
  });
  assert.equal('override' in block, false);
  assert.equal('disable' in block, false);
  assert.equal('overrides' in block.config, false);
  assert.equal('assemble' in block, false);
  assert.equal(typeof block.build.props, 'function');
  assert.equal(typeof block.build.overrides, 'function');
  assert.equal(typeof block.config.locales, 'function');
  assert.deepEqual(block.build.props({ embed: true }), block.build.props());
});

test('Carousel rejects incomplete per-language arrays rather than publishing positional fragments', () => {
  const carousel = defineCarousel({
    id,
    slug: 'mixedSlides',
    type: 'carousel',
    params: {},
    locale: { slides: [{ src: { en: 'https://example.com/en.png' }, alt: { uk: 'Українською' } }] },
  });
  assert.throws(() => carousel.build.props(), /Incomplete Carousel slides/);
});

test('Markdown can override one language of an invariant replacement without losing the others', () => {
  const markdown = defineMarkdown({
    id,
    slug: 'invariantVariable',
    type: 'markdown',
    params: {},
    locale: {
      value: { en: 'Hello %_%NAME%_%', uk: 'Привіт %_%NAME%_%' },
      variables: { NAME: 'Ada' },
    },
  });
  assert.deepEqual(markdown.build.overrides({ locale: { variables: { NAME: { uk: 'Оля' } } } }), {
    base: {},
    locale: { uk: { variables: { NAME: 'Оля' } } },
  });
});

test('Flat ContentBlocks publish stateless Props without the legacy assemble surface', () => {
  const blocks = [
    defineAudio({
      id,
      slug: 'a',
      type: 'audio',
      params: {},
      locale: { title: 'Audio', fileLocation: 'https://example.com/a.mp3' },
    }),
    defineCarousel({
      id,
      slug: 'b',
      type: 'carousel',
      params: {},
      locale: { slides: [{ src: 'https://example.com/a.png', alt: 'A' }] },
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
      locale: { src: 'https://example.com/a.png', alt: 'A' },
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
        fileLocation: 'https://example.com/a.mp4',
        poster: 'https://example.com/a.png',
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
    assert.equal(typeof block.build.props, 'function');
    assert.equal(typeof block.build.overrides, 'function');
    const original = block.build.props();
    assert.deepEqual(block.build.props({ embed: true }).base, original.base);
    assert.deepEqual(block.build.overrides({ params: { disabled: true } }), {
      base: { params: { disabled: true } },
      locale: undefined,
    });
    assert.deepEqual(block.build.overrides({}), { base: {}, locale: undefined });
    assert.deepEqual(block.build.props(), original);
    assert.throws(() => block.build.overrides({ params: { unknown: true } } as never), /Invalid .* overrides/);
  }
});

test('Carousel array replacement and published output are mutation-isolated', () => {
  const authored = {
    id,
    slug: 'atomicSlides',
    type: 'carousel' as const,
    params: {},
    locale: { slides: [{ src: 'https://example.com/a.png', alt: 'Original' }] },
  };
  const carousel = defineCarousel(authored);
  const replacement = [{ src: 'https://example.com/b.png', alt: 'Updated' }];
  const patch = { locale: { slides: replacement } };
  const publication = carousel.build.overrides(patch);

  assert.deepEqual(publication.base.locale?.slides, replacement);
  replacement[0].alt = 'Mutated caller';
  assert.equal(publication.base.locale?.slides?.[0]?.alt, 'Updated');

  if (publication.base.locale?.slides?.[0]) publication.base.locale.slides[0].alt = 'Mutated result';
  assert.deepEqual(carousel.build.overrides({
    locale: { slides: [{ src: 'https://example.com/b.png', alt: 'Updated' }] },
  }).base.locale?.slides, [{ src: 'https://example.com/b.png', alt: 'Updated' }]);

  authored.locale.slides[0].alt = 'Mutated author';
  assert.equal(carousel.build.props().base.locale?.slides?.[0]?.alt, 'Original');
  assert.throws(
    () =>
      carousel.build.overrides({
        locale: { slides: [{ src: 'https://example.com/a.png', alt: 'A', typo: 'invalid' }] },
      } as never),
    /Invalid Carousel overrides/,
  );
});
