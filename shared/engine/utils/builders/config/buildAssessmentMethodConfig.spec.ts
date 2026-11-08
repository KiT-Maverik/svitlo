import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DEFAULT_SUPPORTED_LANGUAGES } from '../../../types/languages';
import { assessmentMethods_AssessmentMethod_Ids } from '@svitlo/contracts/content';
import type { AssessmentMethod_Config } from '../../../content';
import { buildAssessmentMethodConfig } from './buildAssessmentMethodConfig.utils';

const translations = () =>
  Object.fromEntries(
    DEFAULT_SUPPORTED_LANGUAGES.map(({ language }) => [language, 'Assessment']),
  ) as AssessmentMethod_Config['title'];
const config = (): AssessmentMethod_Config => ({
  id: assessmentMethods_AssessmentMethod_Ids.application,
  title: translations(),
  description: translations(),
});

describe('Framework-independent Assessment Method config builder', () => {
  it('returns a valid descriptor without changing it', () => {
    const value = config();
    assert.strictEqual(buildAssessmentMethodConfig(value), value);
  });
  it('rejects missing and extra localized values', () => {
    const value = config();
    assert.throws(() => buildAssessmentMethodConfig({ ...value, title: { ...value.title, uk: '' } }), /non-empty uk/);
    assert.throws(
      () =>
        buildAssessmentMethodConfig({
          ...value,
          description: { ...value.description, unsupported: 'Extra' },
        }),
      /unsupported languages/,
    );
  });
  it('rejects malformed UUIDs', () => {
    assert.throws(
      () => buildAssessmentMethodConfig({ ...config(), id: 'invalid' as AssessmentMethod_Config['id'] }),
      /UUID/,
    );
  });
});
