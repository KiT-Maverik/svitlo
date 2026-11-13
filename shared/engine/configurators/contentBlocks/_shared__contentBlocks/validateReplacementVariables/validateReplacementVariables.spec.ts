import { describe } from 'node:test';
import assert from 'node:assert/strict';
import test from 'node:test';
import { validateReplacementVariables } from './validateReplacementVariables.utils';

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('validateReplacementVariables', () => {
      test('checks Code markers even when the replacement map is empty', () => {
        assert.deepEqual(validateReplacementVariables('const x = 1;', undefined, 'Code template'), []);
        assert.ok(
          validateReplacementVariables('%_%MISSING%_%', {}, 'Code template').some(error =>
            error.includes('not declared'),
          ),
        );
        assert.ok(
          validateReplacementVariables('%_%MISSING', {}, 'Code template').some(error => error.includes('unmatched')),
        );
      });

      test('validates Markdown source and replacements in every provided language', () => {
        const source = { en: '# %_%NAME%_%', uk: '# %_%NAME%_%' };
        const good = { NAME: { en: 'Ada', uk: 'Ада' } };
        assert.deepEqual(validateReplacementVariables(source, good, 'locale.value'), []);
        assert.ok(
          validateReplacementVariables({ ...source, uk: '# Welcome' }, good, 'locale.value').some(error =>
            error.includes('locale.value.uk: missing configured variable'),
          ),
        );
        assert.ok(
          validateReplacementVariables(source, { NAME: { en: 'Ada' } }, 'locale.value').some(error =>
            error.includes('missing replacement for "uk"'),
          ),
        );
      });

      test('rejects unknown replacement markers with no declarations in Markdown', () => {
        assert.ok(
          validateReplacementVariables({ en: '%_%UNKNOWN%_%' }, undefined, 'locale.value').some(error =>
            error.includes('not declared'),
          ),
        );
      });
    });
  });
});
