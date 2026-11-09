import assert from 'node:assert/strict';
import test from 'node:test';

import { onlyLocales, onlyStrings } from './_utils';

const enUk = { en: 'Hello', uk: 'Привіт' } as const;

test('onlyStrings preserves invariant text but never copies localized dictionaries into base', () => {
  const authored = {
    title: 'Invariant title',
    translated: enUk,
    nested: {
      caption: { en: 'Caption' },
      retry: 'Try again',
      missing: undefined,
      disabled: false,
      count: 2,
      empty: null,
    },
    slides: [
      { id: 'first', src: enUk, caption: 'Fixed caption' },
      { src: { uk: 'Другий' }, caption: { en: 'Second' } },
    ],
  };

  const result = onlyStrings(authored);
  assert.deepEqual(result, {
    title: 'Invariant title',
    nested: { retry: 'Try again' },
    slides: [{ id: 'first', caption: 'Fixed caption' }, {}],
  });
  assert.equal(JSON.stringify(result).includes('Привіт'), false);
  assert.deepEqual(authored.translated, enUk);
  assert.equal(authored.slides[0].id, 'first');
});

test('onlyLocales keeps valid sparse locale dictionaries at their original nested paths', () => {
  const authored = {
    title: 'Invariant title',
    translated: enUk,
    nested: {
      caption: { en: 'Caption' },
      retry: 'Try again',
      missing: undefined,
      disabled: false,
      empty: null,
    },
    slides: [
      { id: 'first', src: enUk, caption: 'Fixed caption' },
      { src: { uk: 'Другий' }, caption: { en: 'Second' } },
    ],
  };
  assert.deepEqual(onlyLocales(authored), {
    translated: enUk,
    nested: { caption: { en: 'Caption' } },
    slides: [
      { src: enUk },
      { src: { uk: 'Другий' }, caption: { en: 'Second' } },
    ],
  });
  assert.deepEqual(onlyLocales({ title: 'Plain', fallback: null, items: [] }), {});
  assert.deepEqual(onlyStrings({ title: enUk, fallback: null, items: [] }), {});
});

test('locale recognition excludes unsupported language codes and invalid localized text', () => {
  assert.deepEqual(onlyLocales({ text: { xx: 'Not supported' } }), {});
  assert.deepEqual(onlyLocales({ text: { en: 42 } }), {});
  assert.deepEqual(onlyLocales({ text: { en: '' } }), {});
  assert.deepEqual(onlyLocales({ text: {} }), {});
  assert.deepEqual(onlyLocales({ text: { en: 'Text', label: 'Not a locale key' } }), {});
});

test('partial array patches retain source indexes without mutating their elements', () => {
  const authored = {
    parts: [
      { label: 'Fixed' },
      { label: { uk: 'Переклад' } },
      { label: 'Another fixed', description: { en: 'Translation' } },
    ],
  };
  assert.deepEqual(onlyLocales(authored), {
    parts: [{}, { label: { uk: 'Переклад' } }, { description: { en: 'Translation' } }],
  });
  assert.deepEqual(onlyStrings(authored), {
    parts: [{ label: 'Fixed' }, {}, { label: 'Another fixed' }],
  });
});
