import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { localizeLessonValue } from './localizeLessonData.utils';

describe('localizeLessonValue', () => {
  it('selects each nested field independently and records actual fallback languages', () => {
    const input = {
      title: { en: 'Light', uk: 'Світло' },
      sections: [{ title: { fallback: 'en', en: 'Theory' }, description: { language: 'qm', value: 'Nazariye' } }],
      statistics: { languages: { en: 143, uk: 144 } },
    };

    assert.deepEqual(localizeLessonValue(input, 'uk', ['en', 'uk', 'qm']), {
      value: {
        title: 'Світло',
        sections: [{ title: 'Theory', description: 'Nazariye' }],
        statistics: { languages: { en: 143, uk: 144 } },
      },
      sources: {
        '/title': { code: 'uk' },
        '/sections/0/title': { code: 'en', isFallback: true },
        '/sections/0/description': { code: 'qm', isFallback: true },
      },
    });
  });

  it('rejects a missing requested language without a declared fallback', () => {
    assert.throws(
      () => localizeLessonValue({ title: { en: 'Light' } }, 'uk', ['en', 'uk']),
      /Missing uk locale at \/title/,
    );
  });

  it('rejects an invalid fallback target', () => {
    assert.throws(
      () => localizeLessonValue({ title: { fallback: 'en', uk: 'Світло' } }, 'uk', ['en', 'uk']),
      /Invalid fallback at \/title/,
    );
  });

  it('rejects an unsupported requested language', () => {
    assert.throws(() => localizeLessonValue({}, 'qm', ['en', 'uk']), /Unsupported requested language: qm/);
  });
});
