// @vitest-environment node
import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {beforeAll, describe, it} from 'vitest';
import {z} from 'zod';

import {allLanguageCodes, assessmentMethod_Props_Schema} from '@svitlo/engine';

import * as assessmentMethods from '../data/definitions/assessmentMethods';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const output = path.join(root, 'content/playground/public/data/uiKit');
const methods = z.enum(Object.keys(assessmentMethods));
const baseSchema = z.record(methods, assessmentMethod_Props_Schema.pick({id: true, slug: true}).strict());
const localeSchema = z.record(methods, assessmentMethod_Props_Schema.pick({title: true, description: true}).strict());
const readJson = (filename: string): unknown => JSON.parse(readFileSync(filename, 'utf8'));

beforeAll(() => {
  const result = spawnSync(
    process.execPath,
    [path.join(root, 'shared/ui-kit/scripts/generate-locales.mjs'), '--package', 'content/playground'],
    {cwd: root, encoding: 'utf8'},
  );
  assert.equal(result.status, 0, result.stderr);
});

describe('Scripts', () => {
  describe('generateLocales', () => {
    describe('Assessment Methods', () => {
      const directory = path.join(output, 'assessmentMethods');

      it('base', () => {
        baseSchema.parse(readJson(path.join(directory, 'base.json')));
        assert.deepEqual(
          readdirSync(directory).sort(),
          ['base.json', ...allLanguageCodes.map(language => language + '.json')].sort(),
        );
      });

      for (const language of allLanguageCodes) {
        it(language, () => {
          localeSchema.parse(readJson(path.join(directory, language + '.json')));
        });
      }
    });

    describe('Components', () => {
      const directory = path.join(output, 'components');

      it('publishes one file per language', () => {
        assert.deepEqual(readdirSync(output).sort(), ['assessmentMethods', 'components']);
        assert.deepEqual(readdirSync(directory).sort(), allLanguageCodes.map(language => language + '.json').sort());
      });

      for (const language of allLanguageCodes) {
        it(language, () => {
          const messages = readJson(path.join(directory, language + '.json')) as Record<string, unknown>;
          const uk = readJson(path.join(directory, 'uk.json')) as Record<string, unknown>;
          assert.deepEqual(Object.keys(messages).sort(), Object.keys(uk).sort());
          assert.equal(Object.hasOwn(messages, 'assessmentMethods'), false);
        });
      }
    });
  });
});
