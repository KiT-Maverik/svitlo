import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { splitLessonValue } from './localizeLessonData.utils';

describe('splitLessonValue', () => {
  it('puts invariant strings in base and translated text in sparse patches', () => {
    const input = {
      id: 'entity-uuid',
      slug: 'light',
      title: { en: 'Light', uk: 'Світло' },
      sections: [
        {
          id: 'one',
          title: { en: 'Theory', uk: 'Теорія' },
          content: [{ type: 'text', label: 'H₂O', text: { en: 'Water', uk: 'Вода' } }],
        },
      ],
      statistics: { languages: { en: 143, uk: 144 } },
    };
    const { base, locales, pointers } = splitLessonValue(input, ['en', 'uk']);
    assert.deepEqual(base, {
      id: 'entity-uuid',
      slug: 'light',
      sections: [{ id: 'one', content: [{ type: 'text', label: 'H₂O' }] }],
      statistics: { languages: { en: 143, uk: 144 } },
    });
    assert.deepEqual(locales.uk, {
      title: 'Світло',
      sections: { '0': { title: 'Теорія', content: { '0': { text: 'Вода' } } } },
    });
    assert.deepEqual(pointers, ['/title', '/sections/0/title', '/sections/0/content/0/text']);
  });

  it('supports localized array elements without copying the arrays into each patch', () => {
    const result = splitLessonValue([{ en: 'One', uk: 'Один' }, 'shared'], ['en', 'uk']);
    assert.deepEqual(result.base, [null, 'shared']);
    assert.deepEqual(result.locales.uk, { '0': 'Один' });
  });

  it('rejects missing translations, extra languages, legacy fallback and single-language values', () => {
    assert.throws(
      () => splitLessonValue({ title: { en: 'Light' } }, ['en', 'uk']),
      /Incomplete locale dictionary at \/title/,
    );
    assert.throws(
      () => splitLessonValue({ title: { en: 'Light', uk: 'Світло', de: 'Licht' } }, ['en', 'uk']),
      /unexpected: de/,
    );
    assert.throws(
      () => splitLessonValue({ title: { fallback: 'en', en: 'Light' } }, ['en', 'uk']),
      /Field-level fallback is not allowed/,
    );
    assert.throws(
      () => splitLessonValue({ title: { language: 'en', value: 'Light' } }, ['en', 'uk']),
      /Single-language fallback is not allowed/,
    );
    assert.throws(() => splitLessonValue({}, ['en', 'en']), /Invalid declared lesson languages/);
  });
});
