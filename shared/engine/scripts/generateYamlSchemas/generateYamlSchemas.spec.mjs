import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

import { generateYamlSchemas, yamlJsonSchemaDocuments } from './generateYamlSchemas.mjs';

const require = createRequire(import.meta.url);
const {
  contentBlockTypes,
  sectionTypes,
  questionTypes,
  yamlFactoryByType,
  yamlContentBlock_Schema,
  yamlSection_Schema,
} = require('../../dist/build.js');

const id = '00000000-0000-4000-8000-000000000001';
const textBlock = {
  id,
  slug: 'greeting',
  type: 'text',
  params: {},
  locale: { value: { uk: 'Привіт!' } },
};

test('all current polymorphic types have a concrete exported define* factory', () => {
  for (const type of [...contentBlockTypes, ...sectionTypes, ...questionTypes]) {
    assert.equal(typeof yamlFactoryByType[type], 'string', 'no factory for ' + type);
    assert.equal(typeof require('../../dist/build.js')[yamlFactoryByType[type]], 'function', type);
  }
  for (const type of ['lesson', 'course', 'module', 'chapter', 'episode', 'flashcard', 'checkpointItem', 'carouselSlide']) {
    assert.equal(typeof require('../../dist/build.js')[yamlFactoryByType[type]], 'function', type);
  }
});

test('nested discriminator is required even in source-language-only YAML', () => {
  assert.equal(yamlContentBlock_Schema.safeParse(textBlock).success, true);
  const { type: _missingType, ...withoutType } = textBlock;
  assert.equal(yamlContentBlock_Schema.safeParse(withoutType).success, false);

  const section = {
    id,
    slug: 'intro',
    type: 'content',
    params: {},
    locale: { title: { uk: 'Вступ' }, navigationLabel: { uk: 'Вступ' } },
    content: { items: { greeting: textBlock }, order: ['greeting'] },
  };
  assert.equal(yamlSection_Schema.safeParse(section).success, true);
  assert.equal(
    yamlSection_Schema.safeParse({
      ...section,
      content: { items: { greeting: withoutType }, order: ['greeting'] },
    }).success,
    false,
  );
});

test('Zod -> JSON Schema exports every root without opaque Configurator nodes', () => {
  const docs = yamlJsonSchemaDocuments();
  assert.deepEqual(Object.keys(docs).sort(), [
    'contentBlock.schema.json',
    'course.schema.json',
    'episode.schema.json',
    'flashcard.schema.json',
    'lesson.schema.json',
    'question.schema.json',
    'section.schema.json',
  ]);
  // Shared schema instances should be reused through $defs/$ref, not
  // expanded into dozens of megabytes of duplicated nested Config trees.
  for (const name of ['lesson.schema.json', 'course.schema.json', 'question.schema.json']) {
    const json = JSON.parse(docs[name]);
    assert.ok(Object.keys(json.$defs ?? {}).length > 0, name + ' should have shared definitions');
    assert.match(docs[name], /"\\$ref"/);
  }
  const lesson = JSON.parse(docs['lesson.schema.json']);
  assert.equal(lesson.properties.type.const, 'lesson');
  assert(lesson.required.includes('type'));

  for (const source of Object.values(docs)) {
    const document = JSON.parse(source);
    assert.equal(document.$schema, 'https://json-schema.org/draft/2020-12/schema');
    assert.equal(typeof document.$id, 'string');
    assert.match(source, /"type"/);
    assert.match(source, /"required"/);
  }
});

test('generator write/check is deterministic and rejects stale files', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-yaml-schemas-'));
  try {
    assert.throws(() => generateYamlSchemas('--check', root), /Outdated YAML JSON Schema/);
    const written = generateYamlSchemas('--write', root);
    assert.equal(written.length, 7);
    assert.deepEqual(generateYamlSchemas('--write', root), written);
    assert.deepEqual(generateYamlSchemas('--check', root), written);
    fs.writeFileSync(path.join(root, 'lesson.schema.json'), '{}');
    assert.throws(() => generateYamlSchemas('--check', root), /Outdated YAML JSON Schema/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
