// @vitest-environment node
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterAll, beforeAll, describe, it } from 'vitest';
import { z } from 'zod';

import { allLanguageCodes, assessmentMethod_Data_Schema, educationStandard_Data_Schema } from '@svitlo/engine/build';

import * as assessmentMethods from '../../data/definitions/assessmentMethods';
import { educationStandards } from '../../data/definitions/educationStandards';

const root = fileURLToPath(new URL('../../../../', import.meta.url));
// Use the generator's supported isolated output, never mutate Playground's published assets.
let output = '';
const methods = z.enum(Object.keys(assessmentMethods));
const baseSchema = z.record(methods, assessmentMethod_Data_Schema.pick({ id: true, slug: true }).strict());
const localeSchema = z.record(methods, assessmentMethod_Data_Schema.pick({ title: true, description: true }).strict());
const readJson = (filename: string): unknown => JSON.parse(readFileSync(filename, 'utf8'));

beforeAll(() => {
  output = mkdtempSync(path.join(root, 'shared/ui-kit/scripts/generateLocales/.test-output-'));
  const result = spawnSync(
    process.execPath,
    [
      path.join(root, 'shared/ui-kit/scripts/generateLocales/generateLocales.mjs'),
      '--package',
      'content/playground',
      '--output',
      output,
    ],
    { cwd: root, encoding: 'utf8' },
  );
  assert.equal(result.status, 0, result.stderr);
});

afterAll(() => {
  if (output) rmSync(output, { recursive: true, force: true });
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

    describe('Education Standards', () => {
      const directory = path.join(output, 'educationStandards');
      const slugs = educationStandards.map(standard => standard.slug).sort();

      it('publishes the 14 source identities and all canonical language files', () => {
        const base = readJson(path.join(directory, 'base.json')) as Record<string, { id: string; slug: string }>;
        assert.deepEqual(Object.keys(base).sort(), slugs);
        assert.deepEqual(
          readdirSync(directory).sort(),
          ['base.json', ...allLanguageCodes.map(code => code + '.json')].sort(),
        );
        for (const definition of educationStandards) {
          assert.equal(base[definition.slug].id, definition.id);
          assert.equal(base[definition.slug].slug, definition.slug);
        }
      });

      for (const language of allLanguageCodes) {
        it(language, () => {
          const base = readJson(path.join(directory, 'base.json')) as Record<
            string,
            {
              id: string;
              slug: string;
              name: string;
              description: { methodological: string };
            }
          >;
          const locale = readJson(path.join(directory, language + '.json')) as Record<
            string,
            {
              description: { frontend: string };
            }
          >;
          assert.deepEqual(Object.keys(locale).sort(), slugs);
          for (const slug of slugs) {
            educationStandard_Data_Schema.parse({
              ...base[slug],
              description: { ...base[slug].description, ...locale[slug].description },
            });
          }
        });
      }
    });

    describe('Components', () => {
      const directory = path.join(output, 'components');

      it('publishes one file per language', () => {
        assert.deepEqual(readdirSync(output).sort(), ['assessmentMethods', 'components', 'educationStandards']);
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
