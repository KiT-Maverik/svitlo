import assert from 'node:assert/strict';
import { test } from 'vitest';

import { allLanguageCodes, educationStandard_Props_Schema } from '@svitlo/engine/runtime';

import { educationStandards } from './index';

/** Structural validation cannot establish legal-source correctness or independent linguistic review. */
test('catalog has 14 complete, distinct, source-addressable standards', () => {
  assert.equal(educationStandards.length, 14);
  assert.equal(new Set(educationStandards.map(item => item.id)).size, educationStandards.length);
  assert.equal(new Set(educationStandards.map(item => item.slug)).size, educationStandards.length);
  for (const standard of educationStandards) {
    assert.equal(standard.type, 'educationStandard');
    assert.match(standard.id, /^[0-9a-f]{8}-[0-9a-f-]{27,}$/);
    const published = standard.build.props({ languages: [...allLanguageCodes] });
    assert.deepEqual(Object.keys(published.locale).sort(), [...allLanguageCodes].sort());
    assert.ok(published.base.name.trim());
    assert.ok(published.base.description.methodological.trim().length > 100);
    assert.ok(published.base.params?.nameLanguage);
    assert.match(published.base.params?.sourceUrl ?? '', /^https:\/\//);
    assert.ok(published.base.params?.countries?.length);
    assert.ok(published.base.params?.version);
    for (const language of allLanguageCodes) {
      const description = published.locale[language]!.description.frontend;
      assert.ok(description.trim(), standard.slug + ' / ' + language);
      const merged = {
        ...published.base,
        description: { ...published.base.description, ...published.locale[language]!.description },
      };
      assert.deepEqual(educationStandard_Props_Schema.parse(merged), merged);
    }
    const one = standard.build.props({ languages: ['uk'] });
    assert.deepEqual(Object.keys(one.locale), ['uk']);
    assert.deepEqual(one.base, standard.build.props({ languages: ['en'] }).base);
    const again = standard.build.props({ languages: ['uk'] });
    assert.deepEqual(again, one, 'Repeated publication must be deterministic');
    assert.equal('build' in one.base, false);
  }
});
