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
  for (const type of [
    'lesson',
    'course',
    'module',
    'chapter',
    'episode',
    'flashcard',
    'checkpointItem',
    'carouselSlide',
  ]) {
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
    'course.scaffold.schema.json',
    'course.schema.json',
    'courseOverrides.schema.json',
    'episode.schema.json',
    'flashcard.schema.json',
    'lesson.scaffold.schema.json',
    'lesson.schema.json',
    'question.schema.json',
    'section.schema.json',
  ]);
  for (const source of Object.values(docs)) {
    const document = JSON.parse(source);
    assert.equal(document.$schema, 'https://json-schema.org/draft/2020-12/schema');
    assert.equal(typeof document.$id, 'string');
    assert.match(source, /"type"/);
    assert.match(source, /"required"/);
  }
});

test('Lesson/Course draft envelopes document source language, import coordinates and direct overrides', () => {
  const docs = yamlJsonSchemaDocuments();
  const lesson = JSON.parse(docs['lesson.schema.json']);
  const course = JSON.parse(docs['course.schema.json']);
  const overrides = JSON.parse(docs['courseOverrides.schema.json']);
  assert(lesson.required.includes('documentLanguage'));
  assert(lesson.required.includes('type'));
  assert(!lesson.required.includes('flashcards')); // Drafts may be incomplete.
  assert.equal(course.properties.documentLanguage.type, 'string');
  assert(!course.required.includes('content'));
  assert.equal(overrides.additionalProperties, false);
  assert.deepEqual(Object.keys(overrides.properties).sort(), ['content', 'locale', 'params']);
  assert.equal(overrides.properties.content.properties.items.type, 'object');
  assert.equal(overrides.$defs.buildPatch.properties.questions.type, 'object');
  assert(!Object.hasOwn(overrides.properties, 'operations'));
  assert(JSON.stringify(course).includes('"source"'));
});
test('generator write/check is deterministic and rejects stale files', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-yaml-schemas-'));
  try {
    assert.throws(() => generateYamlSchemas('--check', root), /Outdated YAML JSON Schema/);
    const written = generateYamlSchemas('--write', root);
    assert.equal(written.length, 10);
    assert.deepEqual(generateYamlSchemas('--write', root), written);
    assert.deepEqual(generateYamlSchemas('--check', root), written);
    // Formatting is not semantic schema drift: Prettier may compact arrays.
    const courseFile = path.join(root, 'course.schema.json');
    const formattedDifferently = JSON.stringify(JSON.parse(fs.readFileSync(courseFile, 'utf8'))) + '\n';
    fs.writeFileSync(courseFile, formattedDifferently);
    assert.deepEqual(generateYamlSchemas('--check', root), written);
    assert.deepEqual(generateYamlSchemas('--write', root), written);
    assert.equal(fs.readFileSync(courseFile, 'utf8'), formattedDifferently);
    fs.writeFileSync(path.join(root, 'lesson.schema.json'), '{}');
    assert.throws(() => generateYamlSchemas('--check', root), /Outdated YAML JSON Schema/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('reused nested Config schemas are shared by reference instead of expanded copies', () => {
  const docs = yamlJsonSchemaDocuments();
  for (const kind of ['lesson', 'course', 'question']) {
    const schema = JSON.parse(docs[kind + '.schema.json']);
    assert(Object.keys(schema.$defs ?? {}).length > 0, kind + ' should reuse nested definitions');
    assert(docs[kind + '.schema.json'].includes('"$ref"'), kind + ' should reference shared schemas');
  }
});

test('checked-in editor schemas match the current Engine Zod source', () => {
  assert.equal(generateYamlSchemas('--check').length, 10);
});

test('unified scaffold composes manual production schema beside Engine Config at every node', () => {
  const docs = yamlJsonSchemaDocuments();
  for (const kind of ['lesson', 'course']) {
    const scaffold = JSON.parse(docs[kind + '.scaffold.schema.json']);
    assert.equal(scaffold.type, 'object');
    assert.deepEqual(scaffold.required, kind === 'lesson' ? ['config', 'production'] : ['config']);
    if (kind === 'course') {
      assert.equal(scaffold.properties.overrides.$ref, '#/$defs/__overrides');
      assert.equal(scaffold.$defs.__overrides.type, 'object');
      assert.equal(scaffold.$defs.__overrides.properties.content.type, 'object');
    }
    const refs = [];
    function collectRefs(value) {
      if (!value || typeof value !== 'object') return;
      if (typeof value.$ref === 'string') refs.push(value.$ref);
      for (const child of Object.values(value)) collectRefs(child);
    }
    collectRefs(scaffold);
    for (const ref of refs) {
      assert(ref.startsWith('#/'), 'external editor schema reference: ' + ref);
      let resolved = scaffold;
      for (const key of ref.slice(2).split('/')) {
        resolved = resolved?.[key.replace(/~1/g, '/').replace(/~0/g, '~')];
      }
      assert.notEqual(resolved, undefined, 'unresolved editor schema reference: ' + ref);
    }
    assert.equal(scaffold.additionalProperties, false);
    assert.equal(scaffold.properties.config.properties.type.const, kind);
    assert(scaffold.properties.config.required.includes('id'));
    assert.equal(scaffold.properties.production.$ref, '#/$defs/__production/$defs/' + kind);
    assert(!Object.hasOwn(scaffold.properties.config.properties, 'documentLanguage'));
    const text = JSON.stringify(scaffold);
    assert(text.includes('#/$defs/__production/$defs/scene'));
    assert(text.includes('#/$defs/__production/$defs/image'));
    assert(text.includes('#/$defs/__production/$defs/section'));
  }
  const manuallyOwned = JSON.parse(
    fs.readFileSync(new URL('../../yaml-schemas/production.schema.json', import.meta.url), 'utf8'),
  );
  assert.deepEqual(JSON.parse(docs['lesson.scaffold.schema.json']).$defs.__production.$defs, manuallyOwned.$defs);
  assert.deepEqual(manuallyOwned.$defs.scene.required, ['specification']);
  assert.deepEqual(manuallyOwned.$defs.image.required, ['prompt', 'purpose']);
  assert(!docs['lesson.scaffold.schema.json'].includes('"sceneSpecKey"'));
});
