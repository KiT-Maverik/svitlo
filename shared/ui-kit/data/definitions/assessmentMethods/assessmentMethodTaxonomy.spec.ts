import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/contracts/localization';
import { ASSESSMENT_METHOD_KEYS, type AssessmentMethodKey } from '@svitlo/contracts/content';
import { assessmentMethod_Props_Schema } from '@svitlo/engine';
import * as methods from './index';
vbvkhbv
const directory = fileURLToPath(new URL('./', import.meta.url));
const names = Object.keys(methods).sort();
const typedMethods: Record<AssessmentMethodKey, (typeof methods)[keyof typeof methods]> = methods;
void typedMethods;
const languages = DEFAULT_SUPPORTED_LANGUAGES.map(({ language }) => language);

describe('Assessment Method authored definitions', () => {
  it('defines exactly the 16 canonical methods with unique, unchanged IDs and slugs', () => {
    assert.equal(names.length, 16);
    assert.deepEqual(names, [...ASSESSMENT_METHOD_KEYS].sort());
    const ids = names.map(name => methods[name as keyof typeof methods].config.base.id);
    assert.equal(new Set(ids).size, 16);
    for (const name of names) {
      const { base } = methods[name as keyof typeof methods].config;
      assert.deepEqual(Object.keys(base).sort(), ['id', 'slug']);
      assert.equal(base.slug, name);
      assert.match(base.id, /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    }
  });

  it('has complete non-empty titles and descriptions in every canonical language', () => {
    for (const name of names) {
      const definition = methods[name as keyof typeof methods];
      const locales = definition.config.locales();
      for (const field of ['title', 'description'] as const) {
        assert.deepEqual(Object.keys(locales[field]).sort(), [...languages].sort(), name + '/' + field);
        for (const language of languages) {
          assert.ok(
            locales[field][language as keyof (typeof locales)[typeof field]]?.trim(),
            name + '/' + field + '/' + language,
          );
        }
      }
      for (const language of languages) {
        const props = assessmentMethod_Props_Schema.parse({
          ...definition.config.base,
          title: locales.title[language as keyof typeof locales.title],
          description: locales.description[language as keyof typeof locales.description],
        });
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
      assert.ok(source.includes("id: '" + methods[name as keyof typeof methods].config.base.id + "'"));
      assert.doesNotMatch(
        source,
        /assessmentMethodTranslations|_AssessmentMethod_Data|assessmentMethods_AssessmentMethod_Ids|from ['"]\.\/locales/,
      );
    }
  });
});
