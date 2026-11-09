import assert from 'node:assert/strict';
import test from 'node:test';

import {
  defineText,
  defineMarkdown,
  defineCode,
  defineImage,
  defineVideo,
  defineAudio,
  defineYoutube,
  defineCarousel,
  defineCheckpoint,
  defineScene,
  text_Config_Schema,
  text_Props_Schema,
} from './contentBlocks';
import { defineTheorySection } from './sections';

const id = 'b775647f-203d-481a-a1c7-4d331c779d6a';
const anotherId = 'b775647f-203d-481a-a1c7-4d331c779d6b';
const value = { en: 'Hello', uk: 'Привіт' } as const;

test('Text validates and splits authored localized values into base and locales', () => {
  const text = defineText({ id, slug: 'intro', type: 'text', params: {}, value });
  assert.equal(text.config.base.slug, 'intro');
  assert.equal(text.config.base.value, undefined);
  assert.deepEqual(text.config.locales(), { value });
  assert.equal(text_Config_Schema.safeParse({ id, slug: 'intro', type: 'text', params: {}, value }).success, true);
  assert.equal(text_Props_Schema.safeParse({ id, slug: 'intro', type: 'text', params: {}, value: 'Hello' }).success, true);
  assert.equal(text_Props_Schema.safeParse({ id, slug: 'intro', type: 'text', params: {}, value }).success, false);
  assert.throws(() => defineText({ id: 'bad', slug: 'intro', type: 'text', params: {}, value }), /Invalid UUID/);
});

test('every atomic ContentBlock uses the same config.base/config.locales convention', () => {
  const definitions = [
    defineMarkdown({ id, slug: 'md', type: 'markdown', locales: value }),
    defineCode({ id, slug: 'code', type: 'code', language: 'ts', code: value }),
    defineImage({ id, slug: 'image', type: 'image', src: value, alt: 'An image', width: 100, height: 50 }),
    defineVideo({ id, slug: 'video', type: 'video', fileLocation: value, poster: 'poster.png' }),
    defineAudio({ id, slug: 'audio', type: 'audio', fileLocation: value, title: 'Audio' }),
    defineYoutube({ id, slug: 'youtube', type: 'youtube', href: value, mode: 'link' }),
    defineCarousel({ id, slug: 'carousel', type: 'carousel', slides: [{ src: value, alt: 'Image' }] }),
    defineScene({ id, slug: 'scene', type: 'scene', locales: { en: { greeting: 'Hello' }, uk: { greeting: 'Привіт' } } }),
  ];
  assert.equal(definitions.length, 8);
  for (const definition of definitions) {
    assert.equal(definition.config.base.id, id);
    assert.equal(typeof definition.config.locales, 'function');
    assert.equal(JSON.stringify(definition.config.base).includes('"en"'), false);
    assert.equal(JSON.stringify(definition.config.locales()).includes('"en"'), true);
  }
  assert.throws(
    () => defineCode({ id, slug: 'code', type: 'code', language: 'ts', code: 'x', fileLocation: 'file.ts' }),
    /Provide exactly one of code or fileLocation/,
  );
  assert.throws(
    () => defineImage({ id, slug: 'image', type: 'image', src: 'x', alt: 'y' }),
    /Image requires either fill/,
  );
  assert.throws(
    () => defineCarousel({ id, slug: 'carousel', type: 'carousel', slides: [] }),
  );
});

test('Checkpoint stores nested configurators and a Section can project them to data and localized patches', () => {
  const answer = defineText({ id, slug: 'answer', type: 'text', params: {}, value });
  const checkpoint = defineCheckpoint({
    id: anotherId,
    slug: 'review',
    type: 'checkpoint',
    title: value,
    items: [{ question: value, answer: [answer], check: true }],
  });
  assert.strictEqual(checkpoint.items[0].answer[0], answer);
  const section = defineTheorySection<readonly ['en', 'uk']>({
    id,
    slug: 'theory',
    type: 'theory',
    title: 'Theory',
    navigationLabel: '1',
    content: [checkpoint],
  });
  const base = section.config.base as { content: { items: { answer: unknown[] }[] }[] };
  assert.equal(base.content[0].items[0].answer.length, 1);
  assert.equal(JSON.stringify(base).includes('function'), false);
  const locales = section.config.locales();
  assert.equal(JSON.stringify(locales).includes('Привіт'), true);
  assert.throws(() =>
    defineCheckpoint({
      id, slug: 'bad', type: 'checkpoint', title: 'Review',
      // @ts-expect-error Child must be a configurator.
      items: [{ question: 'Question', answer: [{ id, slug: 'raw', type: 'text' }] }],
    }),
  );
});
