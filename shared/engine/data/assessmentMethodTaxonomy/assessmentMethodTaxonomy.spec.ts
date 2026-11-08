import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DEFAULT_SUPPORTED_LANGUAGES } from '../../types/languages';
import { assessmentMethods_AssessmentMethod_Ids } from '@svitlo/contracts/content';
import * as methods from './index.data';
import { buildAssessmentMethodConfig } from '../../utils/builders/config/buildAssessmentMethodConfig.utils';

const directory = join(process.cwd(), 'src', 'data', 'assessmentMethodTaxonomy');
const ids = Object.values(assessmentMethods_AssessmentMethod_Ids);
const configs = Object.values(methods);

describe('Assessment Method Taxonomy', () => {
  it('has exactly 16 distinct UUIDs', () => {
    assert.equal(ids.length, 16);
    assert.equal(new Set(ids).size, 16);
    for (const id of ids)
      assert.match(id, /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it('registers one object per ID with every required localized title and description', () => {
    assert.equal(configs.length, 16);
    assert.deepEqual(new Set(configs.map(config => config.id)), new Set(ids));
    const languages = DEFAULT_SUPPORTED_LANGUAGES.map(language => language.language);
    for (const config of configs) {
      assert.equal(buildAssessmentMethodConfig(config), config);
      for (const field of ['title', 'description'] as const) {
        assert.deepEqual(Object.keys(config[field]).sort(), [...languages].sort());
        for (const lang of languages) {
          assert.ok(config[field][lang]?.trim(), `${config.id} has empty ${field} for ${lang}`);
        }
      }
    }
  });

  it('rejects incomplete localized dictionaries', () => {
    const config = configs[0];
    assert.throws(() => buildAssessmentMethodConfig({ ...config, title: { ...config.title, uk: '' } }), /non-empty uk/);
  });

  it('keeps data and ID exports isolated to their own collection', () => {
    const source = readFileSync(join(directory, 'index.data.ts'), 'utf8').trim().split('\n');
    const names = Object.keys(assessmentMethods_AssessmentMethod_Ids).sort();
    assert.deepEqual(
      source,
      names.map(name => `export { ${name}_AssessmentMethod_Data } from './${name}.data';`),
    );
  });
});
