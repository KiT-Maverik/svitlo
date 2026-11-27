import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeWorkflowLocalized } from '../normalizeWorkflowLocalized.mjs';

test('reviewed source-language scalar is language keyed, never invariant', () => {
  assert.deepEqual(normalizeWorkflowLocalized('Sky', 'en', 'course.locale.title', ['en', 'uk']), { en: 'Sky' });
  assert.equal(Object.hasOwn(normalizeWorkflowLocalized('Sky', 'en', 'title', ['en', 'uk']), 'uk'), false);
});

test('reviewed bilingual dictionaries remain sparse and unchanged', () => {
  const source = { en: 'Sky', uk: 'Небо' };
  const result = normalizeWorkflowLocalized(source, 'en', 'course.locale.title', ['en', 'uk']);
  assert.deepEqual(result, source);
  assert.notEqual(result, source);
  assert.deepEqual(source, { en: 'Sky', uk: 'Небо' });
});

test('invalid or unreviewed locale data fails closed rather than fabricating a translation', () => {
  for (const value of [
    { uk: 'Небо' },
    { en: '' },
    { en: 'Sky', uk: '' },
    { en: 'Sky', uk: 'Небо', fr: 'Ciel' },
    {},
    null,
    [],
  ]) {
    assert.throws(() => normalizeWorkflowLocalized(value, 'en', 'title', ['en', 'uk']), /locale/);
  }
  assert.throws(() => normalizeWorkflowLocalized('Sky', 'en', 'title', ['uk']), /scope/);
  assert.throws(() => normalizeWorkflowLocalized('Sky', 'en', 'title', ['en', 'en']), /scope/);
});

test('only explicitly selected workflow fields are normalized; invariant Configurator text stays scalar', () => {
  const authored = { title: 'Learning', nonTranslatableText: 'H₂O' };
  const normalized = { ...authored, title: normalizeWorkflowLocalized(authored.title, 'en', 'title', ['en', 'uk']) };
  assert.deepEqual(normalized, { title: { en: 'Learning' }, nonTranslatableText: 'H₂O' });
});
