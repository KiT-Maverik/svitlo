import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { mergeLessonResources } from './mergeLessonResources';
import { splitLessonValue } from '../utils/generators/lessons/localizeLessonData.utils';

describe('mergeLessonResources', () => {
  it('reconstructs nested arrays, object patches and invariant strings without mutation', () => {
    const authored = {
      id: 'lesson',
      sections: [
        { id: 'a', content: [{ type: 'text', label: 'H₂O', text: { en: 'Water', uk: 'Вода' } }] },
        { id: 'b', title: { en: 'Practice', uk: 'Практика' } },
      ],
      labels: [{ en: 'one', uk: 'один' }, 'constant'],
    };
    const { base, locales } = splitLessonValue(authored, ['en', 'uk']);
    const published = mergeLessonResources({ data: base }, { data: locales.uk });
    assert.deepEqual(published, {
      data: {
        id: 'lesson',
        sections: [
          { id: 'a', content: [{ type: 'text', label: 'H₂O', text: 'Вода' }] },
          { id: 'b', title: 'Практика' },
        ],
        labels: ['один', 'constant'],
      },
    });
    assert.equal((base as { sections: { content: unknown[] }[] }).sections[0].content.length, 1);
    assert.equal((base as { labels: unknown[] }).labels[0], null);
  });

  it('rejects index shifts, mutation of invariant scalars, and malformed patches', () => {
    assert.throws(() => mergeLessonResources({ data: [1] }, { data: { '1': 2 } }), /Invalid sparse array index/);
    assert.throws(() => mergeLessonResources({ data: { id: 'fixed' } }, { data: { id: 'changed' } }),
      /replace invariant value/);
    assert.throws(() => mergeLessonResources({ data: [] }, { data: [1] }), /Expected sparse array patch/);
    assert.throws(() => mergeLessonResources({ data: {} }, { data: { __proto__: { polluted: true } } }), /./);
  });
});
