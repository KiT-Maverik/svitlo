import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { allLanguageCodes, languageCode_Schema } from './languages.schemas';
import {
  createLocaleSubsetSchema,
  locale_All_Schema,
  localeText_Schema,
  localizationSwitch,
  nonTranslatableText_Schema,
} from './locale.schemas';
import { allDisabilities, disability_Schema } from './disabilities.schemas';

describe('Engine localization and accessibility schemas', () => {
  it('accepts every canonical content language, including qm, and rejects unregistered codes', () => {
    for (const code of allLanguageCodes) {
      assert.equal(languageCode_Schema.safeParse(code).success, true, code);
    }
    for (const code of ['ru', 'crh', 'en-US', 'UK', '']) {
      assert.equal(languageCode_Schema.safeParse(code).success, false, code);
    }
    assert.equal(new Set(allLanguageCodes).size, allLanguageCodes.length);
  });

  it('requires complete language dictionaries and nonempty strings', () => {
    const complete = Object.fromEntries(allLanguageCodes.map(code => [code, code]));
    assert.equal(locale_All_Schema.safeParse(complete).success, true);
    assert.equal(locale_All_Schema.safeParse({ ...complete, uk: '' }).success, false);
    assert.equal(locale_All_Schema.safeParse({ ...complete, uk: undefined }).success, false);
    assert.equal(locale_All_Schema.safeParse({ ...complete, unsupported: 'text' }).success, false);
    assert.equal(localeText_Schema.safeParse('').success, false);
    assert.equal(nonTranslatableText_Schema.safeParse('valid').success, true);
  });

  it('requires specified subset languages, rejects invalid values and keeps optional language keys typed', () => {
    const subset = createLocaleSubsetSchema(['en', 'uk'] as const);
    assert.equal(subset.safeParse({ en: 'Hello', uk: 'Привіт' }).success, true);
    assert.equal(subset.safeParse({ en: 'Hello' }).success, false);
    assert.equal(subset.safeParse({ en: 'Hello', uk: '' }).success, false);
    assert.equal(subset.safeParse({ en: 'Hello', uk: 'Привіт', xx: 'Unknown' }).success, false);
    const restricted = createLocaleSubsetSchema(['en', 'uk'] as const, false);
    assert.equal(restricted.safeParse({ en: 'Hello', uk: 'Привіт' }).success, true);
    assert.equal(restricted.safeParse({ en: 'Hello', uk: 'Привіт', fr: 'Bonjour' }).success, false);
  });

  it('distinguishes authored locale dictionaries from resolved single-language Props', () => {
    const complete = Object.fromEntries(allLanguageCodes.map(code => [code, 'text']));
    assert.equal(localizationSwitch.config.safeParse(complete).success, true);
    assert.equal(localizationSwitch.config.safeParse('text').success, false);
    assert.equal(localizationSwitch.props.safeParse('text').success, true);
    assert.equal(localizationSwitch.props.safeParse(complete).success, false);
  });

  it('accepts precisely declared assessment restriction values', () => {
    for (const value of allDisabilities) {
      assert.equal(disability_Schema.safeParse(value).success, true, value);
    }
    assert.equal(disability_Schema.safeParse('not-a-restriction').success, false);
    assert.equal(disability_Schema.safeParse('Dyslexia').success, false);
    assert.equal(new Set(allDisabilities).size, allDisabilities.length);
  });
});
