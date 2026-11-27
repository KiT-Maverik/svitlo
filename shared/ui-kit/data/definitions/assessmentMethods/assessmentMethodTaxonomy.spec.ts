// @vitest-environment node
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';

import { assessmentMethod_Data_Schema, assessmentMethodSlugs, type AssessmentMethodSlug } from '@svitlo/engine/build';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/runtime';

import * as methods from './index';

const directory = fileURLToPath(new URL('./', import.meta.url));
const names = Object.keys(methods).sort();
// The Engine tuple is the only canonical slug list. This also enforces
// compile-time exhaustive coverage of authored UI Kit definitions.
const definitions = methods satisfies Record<AssessmentMethodSlug, (typeof methods)[keyof typeof methods]>;
const languages = DEFAULT_SUPPORTED_LANGUAGES.map(({ language }) => language);

describe('Assessment Method authored definitions', () => {
  it('defines exactly the 16 canonical methods with unique, unchanged IDs and slugs', () => {
    assert.equal(names.length, 16);
    assert.deepEqual(names, [...assessmentMethodSlugs].sort());
    const ids = names.map(name => definitions[name as AssessmentMethodSlug].build.data({ languages }).base.id);
    assert.equal(new Set(ids).size, 16);
    for (const name of names) {
      const { base } = definitions[name as AssessmentMethodSlug].build.data({ languages });
      assert.deepEqual(Object.keys(base).sort(), ['id', 'slug']);
      assert.equal(base.slug, name);
      assert.match(base.id, /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    }
  });

  it('has complete non-empty titles and descriptions in every canonical language', () => {
    for (const name of names) {
      const definition = definitions[name as AssessmentMethodSlug];
      const publication = definition.build.data({ languages });
      assert.deepEqual(Object.keys(publication.locale ?? {}).sort(), [...languages].sort(), name + '/locales');
      for (const language of languages) {
        const record = publication.locale?.[language];
        assert.ok(record && typeof record.title === 'string' && record.title.trim(), name + '/title/' + language);
        assert.ok(
          record && typeof record.description === 'string' && record.description.trim(),
          name + '/description/' + language,
        );
        const props = assessmentMethod_Data_Schema.parse({ ...publication.base, ...record });
        assert.equal(props.slug, name);
      }
    }
  });

  it('keeps each method in a single defineAssessmentMethod() file with a literal UUID', () => {
    const files = readdirSync(directory).filter(name => /^[a-z][A-Za-z0-9]*\.ts$/.test(name) && name !== 'index.ts');
    assert.deepEqual(files.sort(), names.map(name => name + '.ts').sort());
    for (const name of names) {
      const source = readFileSync(fileURLToPath(new URL('./' + name + '.ts', import.meta.url)), 'utf8');
      assert.match(source, /defineAssessmentMethod\(/);
      assert.ok(
        source.includes("id: '" + definitions[name as AssessmentMethodSlug].build.data({ languages }).base.id + "'"),
      );
      assert.doesNotMatch(
        source,
        /assessmentMethodTranslations|_AssessmentMethod_Data|assessmentMethods_AssessmentMethod_Ids|from ['"]\.\/locales/,
      );
    }
  });
});
