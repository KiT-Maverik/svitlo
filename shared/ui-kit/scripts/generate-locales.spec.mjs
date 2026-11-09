import { before, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';
import { z } from 'zod';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const require = createRequire(import.meta.url);
const { DEFAULT_SUPPORTED_LANGUAGES } = require('@svitlo/contracts/localization');
const { assessmentMethods_AssessmentMethod_Ids } = require('@svitlo/contracts/content');
const { assessmentMethod_Props_Schema } = require('@svitlo/engine');
const output = path.join(root, 'content/playground/public/data/uiKit');
const languages = DEFAULT_SUPPORTED_LANGUAGES.map(({ language }) => language);
const methods = z.enum(Object.keys(assessmentMethods_AssessmentMethod_Ids));
const baseSchema = z.record(methods, assessmentMethod_Props_Schema.pick({ id: true, slug: true }).strict());
const localeSchema = z.record(methods, assessmentMethod_Props_Schema.pick({ title: true, description: true }).strict());
const readJson = filename => JSON.parse(readFileSync(filename, 'utf8'));

before(() => {
  const result = spawnSync(
    process.execPath,
    [path.join(root, 'shared/ui-kit/scripts/generate-locales.mjs'), '--package', 'content/playground'],
    { cwd: root, encoding: 'utf8' },
  );
  assert.equal(result.status, 0, result.stderr);
});

describe('Assessment Methods', () => {
  const directory = path.join(output, 'assessmentMethods');

  it('base', () => {
    baseSchema.parse(readJson(path.join(directory, 'base.json')));
    assert.deepEqual(
      readdirSync(directory).sort(),
      ['base.json', ...languages.map(language => language + '.json')].sort(),
    );
  });

  for (const language of languages) {
    it(language, () => {
      localeSchema.parse(readJson(path.join(directory, language + '.json')));
    });
  }
});

describe('Components', () => {
  const directory = path.join(output, 'components');

  it('publishes one file per language', () => {
    assert.deepEqual(readdirSync(output).sort(), ['assessmentMethods', 'components']);
    assert.deepEqual(readdirSync(directory).sort(), languages.map(language => language + '.json').sort());
  });

  for (const language of languages) {
    it(language, () => {
      const messages = readJson(path.join(directory, language + '.json'));
      assert.deepEqual(Object.keys(messages).sort(), Object.keys(readJson(path.join(directory, 'uk.json'))).sort());
      assert.equal(Object.hasOwn(messages, 'assessmentMethods'), false);
    });
  }
});
