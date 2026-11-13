import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { allLanguageCodes } from './languages.schemas';
import { createLocaleSubsetSchema, locale_All_Schema } from './locale.schemas';

describe('Engine locale dictionary schemas', () => {
  it('requires complete language dictionaries and rejects unknown keys or empty values', () => {
    const complete = Object.fromEntries(allLanguageCodes.map(code => [code, code]));
    assert.equal(locale_All_Schema.safeParse(complete).success, true);
    assert.equal(locale_All_Schema.safeParse({ ...complete, uk: '' }).success, false);
    assert.equal(locale_All_Schema.safeParse({ ...complete, uk: undefined }).success, false);
    assert.equal(locale_All_Schema.safeParse({ ...complete, unsupported: 'text' }).success, false);
  });

  it('requires selected languages and controls whether other supported languages are accepted', () => {
    const subset = createLocaleSubsetSchema(['en', 'uk'] as const);
    assert.equal(subset.safeParse({ en: 'Hello', uk: 'Привіт' }).success, true);
    assert.equal(subset.safeParse({ en: 'Hello' }).success, false);
    assert.equal(subset.safeParse({ en: 'Hello', uk: '' }).success, false);
    assert.equal(subset.safeParse({ en: 'Hello', uk: 'Привіт', xx: 'Unknown' }).success, false);
    assert.equal(subset.safeParse({ en: 'Hello', uk: 'Привіт', fr: 'Bonjour' }).success, true);
    const restricted = createLocaleSubsetSchema(['en', 'uk'] as const, false);
    assert.equal(restricted.safeParse({ en: 'Hello', uk: 'Привіт' }).success, true);
    assert.equal(restricted.safeParse({ en: 'Hello', uk: 'Привіт', fr: 'Bonjour' }).success, false);
  });
});
