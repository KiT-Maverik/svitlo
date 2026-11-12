import assert from 'node:assert/strict';
import test from 'node:test';

import {
  defineAudio,
  defineCarousel,
  defineCarouselSlide,
  defineCode,
  defineImage,
  defineMarkdown,
  defineScene,
  defineVideo,
  defineYoutube,
} from './index';

const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';
const slide = <const Slug extends string>(
  slug: Slug,
  locale: { src: string | Partial<Record<'en' | 'uk', string>>; alt: string | Partial<Record<'en' | 'uk', string>>; caption?: string | Partial<Record<'en' | 'uk', string>> },
) => defineCarouselSlide({ id, slug, type: 'carouselSlide', locale });

test('Published locale bodies already match Props and require no embedding', () => {
  const block = defineAudio({
    id,
    slug: 'localeShape',
    type: 'audio',
    params: {},
    locale: { title: { en: 'Hello' }, fileLocation: 'https://example.com/audio.mp3' },
  });
  const result = block.build.props();
  assert.deepEqual(result.locale?.en, { locale: { title: 'Hello' } });
  assert.deepEqual(block.build.overrides({ locale: { title: { en: 'Updated' } } }).locale?.en, {
    locale: { title: 'Updated' },
  });
  assert.equal(block.build.props().base.locale?.fileLocation, 'https://example.com/audio.mp3');
});

test('Audio publishes Props-shaped locale bodies and isolated sparse patches', () => {
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
      en: { locale: { fileLocation: 'https://example.com/en.mp3' } },
      uk: { locale: { fileLocation: 'https://example.com/uk.mp3', fallback: { retry: 'Повторити' } } },
    },
  });
  assert.deepEqual(audio.build.props(), {
    base: audio.build.props().base,
    locale: {
      en: { locale: { fileLocation: 'https://example.com/en.mp3' } },
      uk: { locale: { fileLocation: 'https://example.com/uk.mp3', fallback: { retry: 'Повторити' } } },
    },
  });
  const patch = { locale: { title: { uk: 'Оповідь' } }, params: { disabled: true as const } };
  assert.deepEqual(audio.build.overrides(patch), {
    base: { params: { disabled: true } },
    locale: { uk: { locale: { title: 'Оповідь' } } },
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


test('Carousel publishes ordered complete localized arrays and handles sparse child overrides', () => {
  const first = slide('first', {
    src: { en: 'https://example.com/a-en.png', uk: 'https://example.com/a-uk.png' },
    alt: 'First',
  });
  const second = slide('second', {
    src: 'https://example.com/b.png',
    alt: 'Second',
    caption: { en: 'A caption', uk: 'Підпис' },
  });
  const carousel = defineCarousel({
    id,
    type: 'carousel',
    slug: 'gallery',
    params: { loop: true },
    locale: { title: 'Gallery' },
    slides: { items: { first, second }, order: ['first', 'second'] },
  });
  const resource = carousel.build.props();
  assert.equal(resource.base.locale?.title, 'Gallery');
  assert.deepEqual(resource.locale?.en?.locale.slides, [
    { src: 'https://example.com/a-en.png', alt: 'First' },
    { src: 'https://example.com/b.png', alt: 'Second', caption: 'A caption' },
  ]);
  assert.equal(resource.locale?.uk?.locale.slides?.[0]?.src, 'https://example.com/a-uk.png');
  const localized = carousel.build.overrides({
    slides: { items: { first: { locale: { alt: { uk: 'Перший' } } } } },
  });
  assert.deepEqual(localized.locale?.uk?.locale.slides, [
    { src: 'https://example.com/a-uk.png', alt: 'Перший' },
    { src: 'https://example.com/b.png', alt: 'Second', caption: 'Підпис' },
  ]);
  assert.equal(localized.locale?.en?.locale.slides?.[0]?.alt, 'First');
  assert.equal(JSON.stringify(localized).includes('additionalItems'), false);
  assert.equal(carousel.build.props().locale?.en?.locale.slides?.length, 2);
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
    locale: { en: { locale: { variables: { NAME: 'Ada' } } }, uk: { locale: { variables: { NAME: 'Ада' } } } },
  });
  assert.deepEqual(code.build.props().locale?.uk, {
    locale: { variables: { NAME: 'Ада' } },
  });
  assert.deepEqual(code.build.overrides({ locale: { variables: { NAME: { uk: 'Оля' } } } }), {
    base: {},
    locale: { uk: { locale: { variables: { NAME: 'Оля' } } } },
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
  assert.deepEqual(image.build.props().locale?.uk, { locale: { alt: 'Схема' } });
  assert.deepEqual(image.build.overrides({ locale: { alt: { uk: 'Ілюстрація' } } }), {
    base: {},
    locale: { uk: { locale: { alt: 'Ілюстрація' } } },
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
    en: { locale: { value: 'Hello %_%NAME%_%', variables: { NAME: 'Ada' } } },
    uk: { locale: { value: 'Привіт %_%NAME%_%', variables: { NAME: 'Ада' } } },
  });
  assert.deepEqual(markdown.build.props().locale?.en, {
    locale: { value: 'Hello %_%NAME%_%', variables: { NAME: 'Ada' } },
  });
  assert.deepEqual(markdown.build.overrides({ locale: { variables: { NAME: { uk: 'Оля' } } } }), {
    base: {},
    locale: { uk: { locale: { variables: { NAME: 'Оля' } } } },
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
    locale: {
      en: { locale: { value: { heading: 'Hello' } } },
      uk: { locale: { value: { heading: 'Привіт', panel: { info: 'Деталі' } } } },
    },
  });
  assert.deepEqual(scene.build.props().locale?.uk, {
    locale: { value: { heading: 'Привіт', panel: { info: 'Деталі' } } },
  });
  assert.deepEqual(scene.build.overrides({ locale: { value: { panel: { caption: { uk: 'Підпис' } } } } }), {
    base: {},
    locale: { uk: { locale: { value: { panel: { caption: 'Підпис' } } } } },
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
  assert.deepEqual(video.build.props().locale, {
    en: { locale: { label: 'Movie' } },
    uk: { locale: { label: 'Відео' } },
  });
  assert.deepEqual(video.build.props().locale?.uk, { locale: { label: 'Відео' } });
  assert.deepEqual(video.build.overrides({ locale: { label: { uk: 'Фільм' } } }), {
    base: {},
    locale: { uk: { locale: { label: 'Фільм' } } },
  });
  const youtube = defineYoutube({
    id,
    type: 'youtube',
    slug: 'external',
    params: { mode: 'link' },
    locale: { href: 'https://youtube.com/watch?v=example', label: { en: 'Watch', uk: 'Дивитись' } },
  });
  assert.deepEqual(youtube.build.props().base.locale, { href: 'https://youtube.com/watch?v=example' });
  assert.deepEqual(youtube.build.props().locale?.en, { locale: { label: 'Watch' } });
  assert.deepEqual(youtube.build.overrides({ params: { mode: 'embed' }, locale: { label: { uk: 'Переглянути' } } }), {
    base: { params: { mode: 'embed' } },
    locale: { uk: { locale: { label: 'Переглянути' } } },
  });
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
  assert.equal(typeof block.build.props, 'function');
});


test('Carousel rejects a language lacking complete slide fields', () => {
  const mixed = slide('mixed', {
    src: { en: 'https://example.com/en.png' },
    alt: { uk: 'Українською' },
  });
  const carousel = defineCarousel({
    id,
    slug: 'mixedSlides',
    type: 'carousel',
    params: {},
    locale: {},
    slides: { items: { mixed }, order: ['mixed'] },
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
    locale: { uk: { locale: { variables: { NAME: 'Оля' } } } },
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
      locale: {},
      slides: { items: { first: slide('first', { src: 'https://example.com/a.png', alt: 'A' }) }, order: ['first'] },
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
    assert.deepEqual(block.build.props().base, original.base);
    assert.deepEqual(block.build.overrides({ params: { disabled: true } }), {
      base: { params: { disabled: true } },
      locale: undefined,
    });
    assert.deepEqual(block.build.overrides({}), { base: {}, locale: undefined });
    assert.deepEqual(block.build.props(), original);
    assert.throws(() => block.build.overrides({ params: { unknown: true } } as never), /Invalid .* overrides/);
  }
});


test('Carousel slide overrides and published output are mutation-isolated', () => {
  const authored = { src: 'https://example.com/a.png', alt: 'Original' };
  const first = slide('first', authored);
  const carousel = defineCarousel({
    id,
    slug: 'atomicSlides',
    type: 'carousel',
    params: {},
    locale: {},
    slides: { items: { first }, order: ['first'] },
  });
  const patch = { slides: { items: { first: { locale: { alt: 'Updated' } } } } };
  const publication = carousel.build.overrides(patch);
  assert.deepEqual(publication.base.locale?.slides, [{ src: 'https://example.com/a.png', alt: 'Updated' }]);
  patch.slides.items.first.locale.alt = 'Mutated caller';
  assert.equal(publication.base.locale?.slides?.[0]?.alt, 'Updated');
  if (publication.base.locale?.slides?.[0]) publication.base.locale.slides[0].alt = 'Mutated result';
  assert.deepEqual(
    carousel.build.overrides({ slides: { items: { first: { locale: { alt: 'Updated' } } } } }).base.locale?.slides,
    [{ src: 'https://example.com/a.png', alt: 'Updated' }],
  );
  authored.alt = 'Mutated author';
  assert.equal(carousel.build.props().base.locale?.slides?.[0]?.alt, 'Original');
  assert.throws(
    () => carousel.build.overrides({ slides: { items: { first: { locale: { typo: 'invalid' } } } } } as never),
    /Invalid Carousel overrides/,
  );
});
