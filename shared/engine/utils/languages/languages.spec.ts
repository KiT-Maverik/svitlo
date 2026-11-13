import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DEFAULT_SUPPORTED_LANGUAGES } from '#schemas';
import { getLanguageCode, getLocaleDirection, getSupportedLanguages, isLocale } from './index';

// Exercise custom catalog views without introducing an unsupported Czech locale.
const customLanguage = DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.language === 'uk')!;

describe('Engine language utilities', () => {
  describe('getLanguageCode', () => {
    it('maps canonical tags, including the Crimean Tatar external locale, to content language keys', () => {
      assert.equal(getLanguageCode('en-US'), 'en');
      assert.equal(getLanguageCode('be-tarask'), 'be');
      assert.equal(getLanguageCode('crh-Latn-UA'), 'qm');
      assert.equal(getLanguageCode('uk-UA'), 'uk');
    });
  });

  describe('getLocaleDirection', () => {
    it('returns RTL only for the canonical RTL locales', () => {
      for (const locale of ['ar-SA', 'he-IL', 'ur-PK'] as const) {
        assert.equal(getLocaleDirection(locale), 'rtl');
      }
      for (const locale of ['en-US', 'uk-UA', 'crh-Latn-UA'] as const) {
        assert.equal(getLocaleDirection(locale), 'ltr');
      }
    });
  });

  describe('getSupportedLanguages', () => {
    it('does not mutate the defaults when extending or replacing the catalog', () => {
      const snapshot = [...DEFAULT_SUPPORTED_LANGUAGES];
      const extended = getSupportedLanguages({ additionalLanguages: [customLanguage] });
      assert.deepEqual(extended.slice(0, snapshot.length), snapshot);
      assert.deepEqual(extended.slice(snapshot.length), [customLanguage]);
      assert.deepEqual(getSupportedLanguages({ replaceDefaults: true, additionalLanguages: [customLanguage] }), [
        customLanguage,
      ]);
      assert.deepEqual(getSupportedLanguages({ replaceDefaults: true }), []);
      assert.deepEqual(DEFAULT_SUPPORTED_LANGUAGES, snapshot);
      assert.notEqual(getSupportedLanguages(), DEFAULT_SUPPORTED_LANGUAGES);
    });
  });

  describe('isLocale', () => {
    it('accepts exact canonical locale tags but not unsupported aliases or language keys', () => {
      assert.equal(isLocale('uk-UA'), true);
      assert.equal(isLocale('crh-Latn-UA'), true);
      assert.equal(isLocale('uk'), false);
      assert.equal(isLocale('ru-RU'), false);
      assert.equal(isLocale('en-us'), false);
    });

    it('uses the provided catalog rather than silently falling back to defaults', () => {
      assert.equal(isLocale('uk-UA', [customLanguage]), true);
      assert.equal(isLocale('en-US', [customLanguage]), false);
      assert.equal(isLocale('en-US'), true);
    });
  });
});
