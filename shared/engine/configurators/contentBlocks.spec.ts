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
  checkpoint_Config_Schema,
  checkpoint_Props_Schema,
  code_Config_Schema,
  code_Props_Schema,
  youtube_Config_Schema,
  youtube_Props_Schema,
  video_Config_Schema,
  video_Props_Schema,
} from './contentBlocks';

const id = 'b775647f-203d-481a-a1c7-4d331c779d6a';
const otherId = 'b775647f-203d-481a-a1c7-4d331c779d6b';
const value = { en: 'Hello', uk: 'Привіт' } as const;

test('Text validates metadata, nested params and nested locale independently', () => {
  const config = { id, slug: 'intro', type: 'text' as const, params: {}, locale: { value } };
  const text = defineText(config);

  assert.equal(text.config.base.id, id);
  assert.equal(text.config.base.slug, 'intro');
  assert.equal(text.config.base.type, 'text');
  assert.deepEqual(text.config.base.locale, {});
  assert.deepEqual(text.config.locales(), { locale: { value } });
  assert.equal(text_Config_Schema.safeParse(config).success, true);
  assert.equal(text_Props_Schema.safeParse({ ...config, locale: { value: 'Hello' } }).success, true);
  assert.equal(text_Props_Schema.safeParse(config).success, false);
  assert.equal(text_Config_Schema.safeParse({ ...config, params: { disabled: false } }).success, false);
  assert.throws(() => defineText({ ...config, id: 'bad' }), /Invalid UUID/);

  text.override.params({ wrap: { enabled: true } });
  assert.deepEqual(text.config.overrides.params, { wrap: { enabled: true } });
  text.disable();
  assert.deepEqual(text.config.overrides.params, { disabled: true });
});

test('all non-composite ContentBlocks follow the defineText API and keep params separate', () => {
  const definitions = [
    defineMarkdown({ id, slug: 'md', type: 'markdown', params: {}, locale: { value } }),
    defineCode({ id, slug: 'code', type: 'code', params: { language: 'typescript', fileLocation: 'samples/demo.ts' }, locale: { variables: [{ id: 'greeting', value }] } }),
    defineImage({ id, slug: 'image', type: 'image', params: { width: 100, height: 50 }, locale: { src: value, alt: 'An image' } }),
    defineVideo({ id, slug: 'video', type: 'video', params: {}, locale: { fileLocation: value, poster: 'poster.png', label: 'Local video' } }),
    defineAudio({ id, slug: 'audio', type: 'audio', params: {}, locale: { fileLocation: value, title: 'Narration' } }),
    defineYoutube({ id, slug: 'youtube', type: 'youtube', params: { mode: 'link' }, locale: { href: value, label: 'Watch video' } }),
    defineCarousel({ id, slug: 'carousel', type: 'carousel', params: {}, locale: { slides: [{ src: value, alt: 'Image' }] } }),
    defineScene({ id, slug: 'scene', type: 'scene', params: {}, locale: { value: { en: { greeting: 'Hello' }, uk: { greeting: 'Привіт' } } } }),
  ];

  assert.equal(definitions.length, 8);
  for (const block of definitions) {
    assert.equal(block.config.base.id, id);
    assert.equal(typeof block.config.locales, 'function');
    assert.equal(typeof block.override.params, 'function');
    assert.equal(typeof block.override.locale, 'function');
    assert.equal(typeof block.disable, 'function');
    assert.equal(JSON.stringify(block.config.base).includes('"en"'), false);
    assert.equal(JSON.stringify(block.config.locales()).includes('"en"'), true);
    block.disable();
    assert.deepEqual(block.config.overrides.params, { disabled: true });
  }
});

test('Code requires a template source, Image retains cross-field validation, and media labels are required', () => {
  const source = {
    id, slug: 'codeTemplate', type: 'code' as const,
    params: { language: 'typescript' },
    locale: { variables: [{ id: 'greeting', value: 'Hello' }] },
  };
  assert.equal(code_Config_Schema.safeParse(source).success, false);
  assert.equal(code_Props_Schema.safeParse(source).success, false);
  assert.equal(code_Config_Schema.safeParse({
    ...source, params: { ...source.params, fileLocation: 'templates/greeting.ts' },
  }).success, true);
  assert.equal(code_Props_Schema.safeParse({
    ...source, params: { ...source.params, fileLocation: 'templates/greeting.ts' },
  }).success, true);
  assert.equal(code_Config_Schema.safeParse({
    ...source, params: { ...source.params, fileLocation: '' },
  }).success, false);
  assert.throws(
    () => defineImage({
      id, slug: 'badImage', type: 'image',
      params: {}, locale: { src: 'x', alt: 'y' },
    }),
    /Image requires either fill/,
  );
  for (const mode of ['embed', 'link'] as const) {
    const source = {
      id, slug: 'exampleYoutube', type: 'youtube' as const,
      params: { mode }, locale: { href: 'https://youtube.com/watch?v=M7lc1UVf-VE' },
    };
    assert.equal(youtube_Config_Schema.safeParse(source).success, false);
    assert.equal(youtube_Props_Schema.safeParse(source).success, false);
    assert.equal(youtube_Config_Schema.safeParse({
      ...source, locale: { ...source.locale, label: 'Watch this video' },
    }).success, true);
    assert.equal(youtube_Props_Schema.safeParse({
      ...source, locale: { ...source.locale, label: 'Watch this video' },
    }).success, true);
  }
  const source = { id, slug: 'sampleVideo', type: 'video' as const, params: {},
    locale: { fileLocation: '/video.mp4', poster: '/poster.jpg' } };
  assert.equal(video_Config_Schema.safeParse(source).success, false);
  assert.equal(video_Props_Schema.safeParse(source).success, false);
  assert.equal(video_Config_Schema.safeParse({
    ...source, locale: { ...source.locale, label: 'Sample video' },
  }).success, true);
  assert.equal(video_Props_Schema.safeParse({
    ...source, locale: { ...source.locale, label: 'Sample video' },
  }).success, true);
});

test('localized fallback and indexed media fields remain in locale projections', () => {
  const audio = defineAudio({
    id, slug: 'narration', type: 'audio', params: {},
    locale: {
      fileLocation: { en: '/voice/en.mp3', uk: '/voice/uk.mp3' },
      title: 'Narration',
      fallback: { offline: { en: 'Offline', uk: 'Немає мережі' }, retry: 'Retry' },
    },
  });
  assert.deepEqual(audio.config.base.locale, { title: 'Narration', fallback: { retry: 'Retry' } });
  assert.deepEqual(audio.config.locales(), {
    locale: {
      fileLocation: { en: '/voice/en.mp3', uk: '/voice/uk.mp3' },
      fallback: { offline: { en: 'Offline', uk: 'Немає мережі' } },
    },
  });

  const code = defineCode({
    id, slug: 'example', type: 'code',
    params: { language: 'typescript', fileLocation: 'templates/greeting.ts' },
    locale: {
      variables: [
        { id: 'translated', value: { uk: 'Локальна змінна' } },
        { id: 'fixed', value: 'invariant' },
      ],
    },
  });
  assert.deepEqual(code.config.base.params, { language: 'typescript', fileLocation: 'templates/greeting.ts' });
  assert.deepEqual(code.config.base.locale, {
    variables: [{ id: 'translated' }, { id: 'fixed', value: 'invariant' }],
  });
  assert.deepEqual(code.config.locales(), {
    locale: { variables: [{ value: { uk: 'Локальна змінна' } }, {}] },
  });

  const carousel = defineCarousel({
    id, slug: 'slides', type: 'carousel', params: { loop: true },
    locale: {
      slides: [
        { src: value, alt: { en: 'First' } },
        { src: 'second.png', alt: value, caption: 'Fixed caption' },
      ],
    },
  });
  assert.deepEqual(carousel.config.base.params, { loop: true });
  assert.deepEqual(carousel.config.base.locale, {
    slides: [{}, { src: 'second.png', caption: 'Fixed caption' }],
  });
  assert.deepEqual(carousel.config.locales(), {
    locale: { slides: [{ src: value, alt: { en: 'First' } }, { alt: value }] },
  });
});

test('Checkpoint has stable item slugs, explicit order and no index-based coupling', () => {
  const answer = defineText({
    id, slug: 'answer', type: 'text', params: {}, locale: { value },
  });
  const config = {
    id: otherId, slug: 'review', type: 'checkpoint' as const,
    params: { enableChecks: true },
    locale: { title: value },
    content: {
      items: {
        whatIsLight: { question: value, answer: [answer] as [typeof answer], check: true as const },
        howLightTravels: { question: 'How does light travel?', answer: [answer] as [typeof answer] },
      },
      // Intentionally different from object declaration order.
      order: ['howLightTravels', 'whatIsLight'] as const,
    },
  };
  const checkpoint = defineCheckpoint(config);
  assert.strictEqual(checkpoint.content, config.content);
  assert.strictEqual(checkpoint.content.items.whatIsLight.answer[0], answer);
  assert.equal(checkpoint.content.items.howLightTravels.question, 'How does light travel?');
  assert.deepEqual(checkpoint.content.order, ['howLightTravels', 'whatIsLight']);
  assert.deepEqual(checkpoint.config.base.params, { enableChecks: true });
  assert.deepEqual(checkpoint.config.base.locale, {});
  assert.deepEqual(checkpoint.config.locales(), { locale: { title: value } });
  assert.equal('content' in checkpoint.config.base, false);
  assert.equal(JSON.stringify(checkpoint.config.base).includes('function'), false);
  assert.equal(checkpoint_Config_Schema.safeParse(config).success, true);

  // Published props use the same stable keys but resolved, non-configurator children.
  assert.equal(checkpoint_Props_Schema.safeParse({
    id: otherId, slug: 'review', type: 'checkpoint',
    params: { enableChecks: true }, locale: { title: 'Review' },
    content: {
      items: { whatIsLight: {
        question: 'What is light?', answer: [{ id, slug: 'answer', type: 'text' }],
      } },
      order: ['whatIsLight'],
    },
  }).success, true);

  checkpoint.override.params({ showIndices: true });
  assert.deepEqual(checkpoint.config.overrides.params, { showIndices: true });
  checkpoint.disable();
  assert.deepEqual(checkpoint.config.overrides.params, { disabled: true });
});

test('Checkpoint validates camelCase keys and an exact, duplicate-free order', () => {
  const answer = defineText({
    id, slug: 'answer', type: 'text', params: {}, locale: { value },
  });
  const base = {
    id: otherId, slug: 'review', type: 'checkpoint' as const,
    params: {}, locale: { title: 'Review' },
  };
  const item = { question: value, answer: [answer] };
  const valid = { items: { firstItem: item, secondItem: item }, order: ['secondItem', 'firstItem'] };

  const cases: { name: string; content: unknown; error?: string }[] = [
    { name: 'missing order', content: { items: valid.items } },
    { name: 'missing referenced item', content: { items: valid.items, order: ['firstItem'] },
      error: 'Checkpoint item missing from order' },
    { name: 'duplicate reference', content: { items: valid.items, order: ['firstItem', 'firstItem', 'secondItem'] },
      error: 'Duplicate Checkpoint item slug' },
    { name: 'unknown reference', content: { items: valid.items, order: ['firstItem', 'unknownItem', 'secondItem'] },
      error: 'Unknown Checkpoint item slug' },
    { name: 'non-camelCase key', content: { items: { first_item: item }, order: ['first_item'] } },
    { name: 'missing question', content: { items: { firstItem: { answer: [answer] } }, order: ['firstItem'] } },
    { name: 'empty answer', content: { items: { firstItem: { question: value, answer: [] } }, order: ['firstItem'] } },
    { name: 'raw child instead of configurator', content: {
      items: { firstItem: { question: value, answer: [{ id, slug: 'answer', type: 'text' }] } },
      order: ['firstItem'],
    } },
  ];

  assert.equal(checkpoint_Config_Schema.safeParse({ ...base, content: valid }).success, true);

  for (const { name, content, error } of cases) {
    const result = checkpoint_Config_Schema.safeParse({ ...base, content });
    assert.equal(result.success, false, name);
    if (!result.success && error) {
      assert.ok(result.error.issues.some(issue => issue.message.includes(error)), name);
    }
  }
});

test('Scene keeps nested language dictionaries in locales only', () => {
  const localized = {
    en: { greeting: 'Hello', state: { message: 'Ready' } },
    uk: { greeting: 'Привіт', state: { message: 'Готово' } },
  };
  const scene = defineScene({
    id, slug: 'introduction', type: 'scene', params: {}, locale: { value: localized },
  });
  assert.deepEqual(scene.config.base.locale, {});
  assert.deepEqual(scene.config.locales(), { locale: { value: localized } });
});
