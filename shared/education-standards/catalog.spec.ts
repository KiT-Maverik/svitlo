import assert from 'node:assert/strict';
import test from 'node:test';

import { allLanguageCodes, educationStandard_Props_Schema } from '@svitlo/engine/runtime';

import { educationStandards } from './index';

/** Structural checks do not replace legal-source or independent linguistic review. */
test('catalog records have stable distinct identities and complete validated locale scopes', () => {
  assert.ok(educationStandards.length >= 3);
  assert.equal(new Set(educationStandards.map(item => item.id)).size, educationStandards.length);
  assert.equal(new Set(educationStandards.map(item => item.slug)).size, educationStandards.length);
  for (const standard of educationStandards) {
    assert.equal(standard.type, 'educationStandard');
    const published = standard.build.props({ languages: [...allLanguageCodes] });
    assert.deepEqual(Object.keys(published.locale).sort(), [...allLanguageCodes].sort());
    assert.equal(published.base.name.trim().length > 0, true);
    assert.equal(published.base.description.methodological.trim().length > 100, true);
    assert.ok(published.base.params?.nameLanguage);
    assert.match(published.base.params?.sourceUrl ?? '', /^https:\/\//);
    assert.ok(published.base.params?.countries?.length);
    for (const lang of allLanguageCodes) {
      assert.ok(published.locale[lang]?.description.frontend.trim());
      educationStandard_Props_Schema.parse({
        ...published.base,
        description: { ...published.base.description, ...published.locale[lang]!.description },
      });
    }
    const one = standard.build.props({ languages: ['uk'] });
    assert.deepEqual(Object.keys(one.locale), ['uk']);
    assert.deepEqual(one.base, standard.build.props({ languages: ['en'] }).base);
  }
});
