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
  yamlAudio_Schema,
  yamlImage_Schema,
  yamlVideo_Schema,
  yamlCarouselSlide_Schema,
  audio_Config_Schema,
  image_Config_Schema,
  video_Config_Schema,
  carouselSlide_Config_Schema,
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


test('YAML media projections require null while Engine Config schemas require real paths', () => {
  const variants = [
    { yaml: yamlImage_Schema, engine: image_Config_Schema, fields: ['src'],
      config: { id, slug: 'picture', type: 'image', params: { fill: true, aspectRatio: 1.5 },
        locale: { src: null, alt: { uk: 'Зображення' } } } },
    { yaml: yamlAudio_Schema, engine: audio_Config_Schema, fields: ['fileLocation'],
      config: { id, slug: 'voice', type: 'audio', params: {},
        locale: { fileLocation: null, title: { uk: 'Озвучення' } } } },
    { yaml: yamlVideo_Schema, engine: video_Config_Schema, fields: ['fileLocation', 'poster'],
      config: { id, slug: 'film', type: 'video', params: {},
        locale: { fileLocation: null, poster: null, label: { uk: 'Відео' } } } },
    { yaml: yamlCarouselSlide_Schema, engine: carouselSlide_Config_Schema, fields: ['src'],
      config: { id, slug: 'slide', type: 'carouselSlide',
        locale: { src: null, alt: { uk: 'Слайд' } } } },
  ];
  for (const { yaml, engine, fields, config } of variants) {
    assert.equal(yaml.safeParse(config).success, true, config.type);
    assert.equal(engine.safeParse(config).success, false, config.type + ': Engine must reject null');
    for (const field of fields) {
      const absent = structuredClone(config);
      delete absent.locale[field];
      assert.equal(yaml.safeParse(absent).success, false, config.type + '.' + field + ' must exist');
      const filled = structuredClone(config);
      filled.locale[field] = '/assets/real.png';
      assert.equal(yaml.safeParse(filled).success, false, config.type + '.' + field + ' must be null');
    }
    if (config.type !== 'carouselSlide') {
      assert.equal(yamlContentBlock_Schema.safeParse(config).success, true, config.type + ': nested union');
    }
  }
  const slide = variants[3].config;
  const carousel = { id, slug: 'gallery', type: 'carousel', params: {}, locale: {},
    slides: { items: { slide }, order: ['slide'] } };
  assert.equal(yamlContentBlock_Schema.safeParse(carousel).success, true);
  assert.equal(yamlContentBlock_Schema.safeParse({
    ...carousel, slides: { items: { slide: { ...slide, locale: { ...slide.locale, src: 'ready.png' } } },
      order: ['slide'] },
  }).success, false);
});

test('JSON Schema retains required fields and literal null media even in nested Lessons/Courses', () => {
  const docs = yamlJsonSchemaDocuments();
  for (const kind of ['contentBlock', 'lesson', 'course']) {
    const schema = JSON.parse(docs[kind + '.schema.json']);
    const media = new Map();
    const visit = node => {
      if (!node || typeof node !== 'object') return;
      const type = node.properties?.type?.const;
      if (typeof type === 'string' && node.properties?.locale) media.set(type, node);
      for (const value of Object.values(node)) visit(value);
    };
    visit(schema);
    for (const [kindOfMedia, fields] of Object.entries({
      image: ['src'], audio: ['fileLocation'], video: ['fileLocation', 'poster'],
      carouselSlide: ['src'],
    })) {
      if (kind === 'contentBlock' && kindOfMedia === 'carouselSlide') continue;
      const block = media.get(kindOfMedia);
      assert(block, kind + ': missing ' + kindOfMedia);
      assert(block.required.includes('locale'), kind + ': required locale for ' + kindOfMedia);
      for (const field of fields) {
        assert(block.properties.locale.required.includes(field), kind + ': required ' + field);
        const value = block.properties.locale.properties[field];
        assert.equal(value.type, 'null');
        assert.equal(value.const, null);
      }
    }
  }
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
  assert(lesson.required.includes('flashcards')); // Required structure is never silently relaxed.
  assert.equal(course.properties.documentLanguage.type, 'string');
  for (const field of ['id', 'slug', 'type', 'skills', 'params', 'locale', 'section', 'flashcards']) {
    assert(lesson.required.includes(field), 'Missing Lesson required field: ' + field);
  }
  for (const field of ['id', 'slug', 'type', 'params', 'locale', 'content']) {
    assert(course.required.includes(field), 'Missing Course required field: ' + field);
  }
  assert(course.required.includes('content'));
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
