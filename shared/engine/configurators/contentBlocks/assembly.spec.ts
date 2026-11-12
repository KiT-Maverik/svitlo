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

const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';

test('Audio publishes direct locale bodies and isolated sparse patches', () => {
  const authored = {
    id, slug: 'audioExample', type: 'audio' as const, params: {},
    locale: { title: 'Narration', fileLocation: { en: 'https://example.com/en.mp3', uk: 'https://example.com/uk.mp3' },
      fallback: { offline: 'Offline', retry: { uk: 'Повторити' } } },
  };
  const audio = defineAudio(authored);
  assert.deepEqual(audio.assemble.resource(), {
    base: { id, slug: 'audioExample', type: 'audio', params: {}, locale: { title: 'Narration', fallback: { offline: 'Offline' } } },
    locale: { en: { fileLocation: 'https://example.com/en.mp3' },
      uk: { fileLocation: 'https://example.com/uk.mp3', fallback: { retry: 'Повторити' } } },
  });
  const patch = { locale: { title: { uk: 'Оповідь' } }, params: { disabled: true as const } };
  assert.deepEqual(audio.assemble.overrides(patch), {
    base: { params: { disabled: true } }, locale: { uk: { title: 'Оповідь' } },
  });
  assert.deepEqual(audio.assemble.overrides({}), { base: {}, locale: undefined });
  assert.throws(() => audio.assemble.overrides({ locale: { fallback: { unknown: 'bad' } } } as never), /Invalid Audio overrides/);
  assert.equal('override' in audio, false);
  assert.equal('disable' in audio, false);
  authored.locale.title = 'Changed';
  assert.equal(audio.assemble.resource().base.locale?.title, 'Narration');
  const first = audio.assemble.resource();
  first.base.params.disabled = true;
  assert.deepEqual(audio.assemble.resource().base.params, {});
});

test('Carousel publishes complete localized arrays and atomically replaces slides', () => {
  const carousel = defineCarousel({
    id, type: 'carousel', slug: 'gallery', params: { loop: true },
    locale: {
      title: 'Gallery',
      slides: [
        { src: { en: 'https://example.com/a-en.png', uk: 'https://example.com/a-uk.png' }, alt: 'First' },
        { src: 'https://example.com/b.png', alt: 'Second', caption: { en: 'A caption', uk: 'Підпис' } },
      ],
    },
  });
  const resource = carousel.assemble.resource();
  assert.deepEqual(resource.base.locale, { title: 'Gallery' });
  assert.deepEqual(resource.locale?.en?.slides, [
    { src: 'https://example.com/a-en.png', alt: 'First' },
    { src: 'https://example.com/b.png', alt: 'Second', caption: 'A caption' },
  ]);
  assert.deepEqual(resource.locale?.uk?.slides?.[0]?.src, 'https://example.com/a-uk.png');
  const replacement = [{ src: 'https://example.com/other.png', alt: 'Other' }];
  assert.deepEqual(carousel.assemble.overrides({ locale: { slides: replacement } }), {
    base: { locale: { slides: replacement } },
    locale: undefined,
  });
  assert.throws(() => carousel.assemble.overrides({ locale: { slides: [{ alt: 'Missing src' }] } }), /Invalid Carousel overrides/);
  assert.throws(() => carousel.assemble.overrides({ locale: { slides: [] } }), /Invalid Carousel overrides/);
  assert.deepEqual(carousel.assemble.resource().locale?.en?.slides?.length, 2);
});

test('Code applies semantic validation after merging sparse replacement dictionaries', () => {
  const code = defineCode({
    id, type: 'code', slug: 'example', params: { language: 'python', codeAsText: 'print(%_%NAME%_%)' },
    locale: { title: 'Code', variables: { NAME: { en: 'Ada', uk: 'Ада' } } },
  });
  assert.deepEqual(code.assemble.resource(), {
    base: { id, type: 'code', slug: 'example', params: { language: 'python', codeAsText: 'print(%_%NAME%_%)' }, locale: { title: 'Code' } },
    locale: { en: { variables: { NAME: 'Ada' } }, uk: { variables: { NAME: 'Ада' } } },
  });
  assert.deepEqual(code.assemble.overrides({ locale: { variables: { NAME: { uk: 'Оля' } } } }), {
    base: {}, locale: { uk: { variables: { NAME: 'Оля' } } },
  });
  assert.throws(() => code.assemble.overrides({ params: { codeAsText: 'print(123)' } }), /Code variables validation failed/);
  assert.throws(() => code.assemble.overrides({ locale: { variables: { UNKNOWN: 'Nope' } } }), /Code variables validation failed/);
});

test('Image validates merged dimensions and nested sparse localized fields', () => {
  const image = defineImage({
    id, type: 'image', slug: 'diagram', params: { width: 600, height: 400 },
    locale: { src: 'https://example.com/image.png', alt: { en: 'Diagram', uk: 'Схема' },
      fallback: { offline: 'Offline' } },
  });
  assert.deepEqual(image.assemble.resource().base.locale, { src: 'https://example.com/image.png', fallback: { offline: 'Offline' } });
  assert.deepEqual(image.assemble.overrides({ locale: { alt: { uk: 'Ілюстрація' } } }), {
    base: {}, locale: { uk: { alt: 'Ілюстрація' } },
  });
  assert.deepEqual(image.assemble.overrides({ params: { height: 200 } }), {
    base: { params: { height: 200 } }, locale: undefined,
  });
  assert.throws(() => image.assemble.overrides({ params: { fill: true } }), /Image requires either fill\/aspectRatio or width\/height/);
  assert.throws(() => image.assemble.overrides({ locale: { fallback: { typo: 'Nope' } } } as never), /Invalid Image overrides/);
});

test('Markdown checks variables on resolved sparse locale overrides', () => {
  const markdown = defineMarkdown({
    id, type: 'markdown', slug: 'lessonNotes', params: {},
    locale: { value: { en: 'Hello %_%NAME%_%', uk: 'Привіт %_%NAME%_%' },
      variables: { NAME: { en: 'Ada', uk: 'Ада' } } },
  });
  assert.deepEqual(markdown.assemble.resource().locale, {
    en: { value: 'Hello %_%NAME%_%', variables: { NAME: 'Ada' } },
    uk: { value: 'Привіт %_%NAME%_%', variables: { NAME: 'Ада' } },
  });
  assert.deepEqual(markdown.assemble.overrides({ locale: { variables: { NAME: { uk: 'Оля' } } } }), {
    base: {}, locale: { uk: { variables: { NAME: 'Оля' } } },
  });
  assert.throws(() => markdown.assemble.overrides({ locale: { value: { uk: 'Без змінної' } } }), /missing configured variable "NAME"/);
  assert.throws(() => markdown.assemble.overrides({ locale: { variables: { OTHER: 'stray' } } }), /missing configured variable "OTHER"/);
});

test('Scene recursively partitions its data-only localized leaves', () => {
  const scene = defineScene({
    id, type: 'scene', slug: 'simulation', params: {},
    locale: { value: { heading: { en: 'Hello', uk: 'Привіт' },
      panel: { caption: 'Invariant', info: { uk: 'Деталі' } } } },
  });
  assert.deepEqual(scene.assemble.resource(), {
    base: { id, type: 'scene', slug: 'simulation', params: {}, locale: { value: { panel: { caption: 'Invariant' } } } },
    locale: { en: { value: { heading: 'Hello' } },
      uk: { value: { heading: 'Привіт', panel: { info: 'Деталі' } } } },
  });
  assert.deepEqual(scene.assemble.overrides({ locale: { value: { panel: { caption: { uk: 'Підпис' } } } } }), {
    base: {}, locale: { uk: { value: { panel: { caption: 'Підпис' } } } },
  });
  assert.throws(() => scene.assemble.overrides({ params: { unknown: true } } as never), /Invalid Scene overrides/);
});

test('Video and YouTube publish media-specific fallback and link fields', () => {
  const video = defineVideo({
    id, type: 'video', slug: 'movie', params: {},
    locale: { fileLocation: 'https://example.com/movie.mp4', poster: 'https://example.com/poster.png',
      label: { en: 'Movie', uk: 'Відео' }, fallback: { offline: 'Offline' } },
  });
  assert.deepEqual(video.assemble.resource().locale, { en: { label: 'Movie' }, uk: { label: 'Відео' } });
  assert.deepEqual(video.assemble.overrides({ locale: { label: { uk: 'Фільм' } } }), {
    base: {}, locale: { uk: { label: 'Фільм' } },
  });
  const youtube = defineYoutube({
    id, type: 'youtube', slug: 'external', params: { mode: 'link' },
    locale: { href: 'https://youtube.com/watch?v=example', label: { en: 'Watch', uk: 'Дивитись' } },
  });
  assert.deepEqual(youtube.assemble.resource().base.locale, { href: 'https://youtube.com/watch?v=example' });
  assert.deepEqual(youtube.assemble.overrides({ params: { mode: 'embed' }, locale: { label: { uk: 'Переглянути' } } }), {
    base: { params: { mode: 'embed' } }, locale: { uk: { label: 'Переглянути' } },
  });
  assert.throws(() => youtube.assemble.overrides({ locale: { nope: 'bad' } } as never), /Invalid Youtube overrides/);
});

test('Every flat ContentBlock has stateless assembly but Checkpoint retains its own lifecycle', () => {
  const block = defineAudio({ id, type: 'audio', slug: 'audio', params: {}, locale: { title: 'Audio', fileLocation: 'https://example.com/audio.mp3' } });
  assert.equal('override' in block, false);
  assert.equal('disable' in block, false);
  assert.equal('overrides' in block.config, false);
  assert.equal(typeof block.config.locales, 'function');
});

test('Carousel rejects incomplete per-language arrays rather than publishing positional fragments', () => {
  const carousel = defineCarousel({
    id, slug: 'mixedSlides', type: 'carousel', params: {},
    locale: { slides: [{ src: { en: 'https://example.com/en.png' }, alt: { uk: 'Українською' } }] },
  });
  assert.throws(() => carousel.assemble.resource(), /Incomplete Carousel slides/);
});

test('Markdown can override one language of an invariant replacement without losing the others', () => {
  const markdown = defineMarkdown({
    id, slug: 'invariantVariable', type: 'markdown', params: {},
    locale: {
      value: { en: 'Hello %_%NAME%_%', uk: 'Привіт %_%NAME%_%' },
      variables: { NAME: 'Ada' },
    },
  });
  assert.deepEqual(markdown.assemble.overrides({ locale: { variables: { NAME: { uk: 'Оля' } } } }), {
    base: {}, locale: { uk: { variables: { NAME: 'Оля' } } },
  });
});
