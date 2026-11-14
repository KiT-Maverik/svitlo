import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  allLanguageCodes,
  allLanguageEnglishNames,
  allLanguagesNativeNames,
  allLocales,
  DEFAULT_SUPPORTED_LANGUAGES,
  languageCode_Schema,
  languageDefinition_Schema,
  locale_Schema,
} from './languages.schemas';
import { createLocaleSubsetSchema } from './locale.schemas';

describe('Engine Italian locale registration', () => {
  it('registers Italian consistently across codes, locale, names and default definitions', () => {
    assert.equal(languageCode_Schema.parse('it'), 'it');
    assert.equal(locale_Schema.parse('it-IT'), 'it-IT');

    const definition = {
      locale: 'it-IT',
      language: 'it',
      name: 'Italian',
      nativeName: 'Italiano',
      direction: 'ltr',
    } as const;

    assert.deepEqual(languageDefinition_Schema.parse(definition), definition);
    assert.deepEqual(DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === 'it'), definition);
    assert.equal(allLocales.filter(locale => locale === 'it-IT').length, 1);
    assert.equal(allLanguageCodes.filter(code => code === 'it').length, 1);

    const index = allLanguageEnglishNames.indexOf('Italian');
    assert.ok(index >= 0);
    assert.equal(allLanguagesNativeNames[index], 'Italiano');
    assert.equal(allLocales[index], 'it-IT');
  });

  it('accepts Italian subset dictionaries without allowing unknown language keys', () => {
    const italian = createLocaleSubsetSchema(['it'] as const, false);
    assert.equal(italian.safeParse({ it: 'Ciao' }).success, true);
    assert.equal(italian.safeParse({ it: '' }).success, false);
    assert.equal(italian.safeParse({ en: 'Hello' }).success, false);
  });
});
