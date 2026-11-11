import assert from 'node:assert/strict';
import test from 'node:test';

import { onlyLocales, onlyStrings } from './_shared__configurators';

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
    slides: [{ src: enUk }, { src: { uk: 'Другий' }, caption: { en: 'Second' } }],
  });
  assert.deepEqual(onlyLocales({ title: 'Plain', fallback: null, items: [] }), {});
  assert.deepEqual(onlyStrings({ title: enUk, fallback: null, items: [] }), {});
});

test('locale recognition excludes unsupported language codes and invalid localized text', () => {
  assert.deepEqual(onlyLocales({ text: { xx: 'Not supported' } }), {});
  assert.deepEqual(onlyLocales({ text: { en: 42 } }), {});
  // ContentBlock schemas validate nonempty text; the projector only checks
  // locale dictionary structure, leaving value validation to the schemas.
  assert.deepEqual(onlyLocales({ text: { en: '' } }), { text: { en: '' } });
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

test('localized-only arrays keep their base skeleton and precise locale positions', () => {
  const source = {
    slides: [
      { src: { en: 'first.png' }, alt: { uk: 'Перший' } },
      { src: { en: 'second.png' }, alt: { uk: 'Другий' } },
    ],
  };
  assert.deepEqual(onlyStrings(source), { slides: [{}, {}] });
  assert.deepEqual(onlyLocales(source), source);
});

test('Scene uses ordinary field-level localized dictionaries at any nesting depth', () => {
  const source = {
    value: {
      character: 'hero',
      greeting: { en: 'Hello', uk: 'Привіт' },
      state: {
        emotion: 'happy',
        message: { en: 'Ready', uk: 'Готово' },
      },
    },
  };
  assert.deepEqual(onlyStrings(source), {
    value: { character: 'hero', state: { emotion: 'happy' } },
  });
  assert.deepEqual(onlyLocales(source), {
    value: {
      greeting: { en: 'Hello', uk: 'Привіт' },
      state: { message: { en: 'Ready', uk: 'Готово' } },
    },
  });
  // Structural records are not themselves locale dictionaries.
  assert.deepEqual(onlyLocales({ value: { greeting: 'Hello' } }), {});
});
