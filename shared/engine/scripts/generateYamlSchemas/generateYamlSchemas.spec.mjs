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
  yamlSubtitles_Schema,
  yamlQuestSection_Schema,
  yamlCheckpointItem_Schema,
  yamlCheckpointAnswerConfigurator_Schema,
  audio_Config_Schema,
  image_Config_Schema,
  video_Config_Schema,
  subtitles_Config_Schema,
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
    'checkpointAnswer',
    'quest',
    'questStage',
    'questTask',
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

test('Checkpoint Item YAML requires an authored Answer Configurator with its own identity', () => {
  const answer = {
    id: '00000000-0000-4000-8000-000000000002',
    slug: 'answer',
    type: 'checkpointAnswer',
    content: { items: { greeting: textBlock }, order: ['greeting'] },
  };
  const item = {
    id: '00000000-0000-4000-8000-000000000003',
    slug: 'item',
    type: 'checkpointItem',
    question: textBlock,
    answer,
  };
  assert.equal(yamlCheckpointAnswerConfigurator_Schema.safeParse(answer).success, true);
  assert.equal(yamlCheckpointItem_Schema.safeParse(item).success, true);
  assert.equal(yamlCheckpointItem_Schema.safeParse({ ...item, answer: answer.content }).success, false);
  assert.equal(yamlCheckpointItem_Schema.safeParse({
    ...item, answer: { ...answer, id: undefined },
  }).success, false);
  assert.equal(yamlCheckpointItem_Schema.safeParse({
    ...item, answer: { ...answer, type: 'text' },
  }).success, false);
  assert(yamlJsonSchemaDocuments()['lesson.schema.json'].includes('checkpointAnswer'));
});

test('YAML and Engine Configs require the same stable UUID filename contract', () => {
  const filename = '550e8400-e29b-41d4-a716-446655440000';
  const variants = [
    { yaml: yamlImage_Schema, engine: image_Config_Schema, kind: 'image',
      params: { fill: true, aspectRatio: 1.5 },
      locale: { fileName: filename + '.webp', alt: { uk: 'Зображення' } } },
    { yaml: yamlAudio_Schema, engine: audio_Config_Schema, kind: 'audio',
      params: {}, locale: { fileName: filename + '.mp3', title: { uk: 'Озвучення' } } },
    { yaml: yamlVideo_Schema, engine: video_Config_Schema, kind: 'video',
      params: {}, locale: { fileName: filename + '.mp4', posterFileName: filename + '.png', label: { uk: 'Відео' } } },
    { yaml: yamlSubtitles_Schema, engine: subtitles_Config_Schema, kind: 'subtitles',
      params: {}, locale: { fileName: { uk: filename + '.vtt' } } },
  ];
  const corrupt = [null, undefined, 'imaginary.webp', '../escape.webp', filename + '.png.extra',
    filename.toUpperCase() + '.webp', filename + '.mp4'];
  for (const { yaml, engine, kind, params, locale } of variants) {
    const config = { id, slug: 'sample', type: kind, params, locale };
    assert.equal(yaml.safeParse(config).success, true, kind);
    assert.equal(engine.safeParse(config).success, true, kind);
    assert.equal(yamlContentBlock_Schema.safeParse(config).success, true, kind);
    for (const value of corrupt) {
      if (kind === 'video' && value === filename + '.mp4') continue;
      const changed = { ...config, locale: { ...locale, fileName: value } };
      assert.equal(yaml.safeParse(changed).success, false, kind + ' rejects ' + String(value));
      assert.equal(engine.safeParse(changed).success, false, kind + ' rejects ' + String(value));
    }
  }
});

test('generated editor JSON Schema preserves media filename and category constraints', () => {
  const Ajv2020 = require('ajv/dist/2020.js');
  const Ajv = Ajv2020.default ?? Ajv2020;
  const ajv = new Ajv({ strict: false, validateFormats: false });
  const docs = yamlJsonSchemaDocuments();
  const filename = '550e8400-e29b-41d4-a716-446655440000';
  const tests = [
    { type: 'image', locale: { fileName: filename + '.webp', alt: 'Chart' },
      params: { fill: true, aspectRatio: 1.5 }, invalid: filename + '.mp4' },
    { type: 'audio', locale: { fileName: filename + '.mp3', title: 'Voice' },
      params: {}, invalid: filename + '.png' },
    { type: 'video', locale: { fileName: filename + '.mp4', posterFileName: filename + '.webp', label: 'Video' },
      params: {}, invalid: filename + '.vtt' },
    { type: 'subtitles', locale: { fileName: filename + '.vtt' }, params: {}, invalid: filename + '.mp3' },
  ];
  for (const document of ['contentBlock.schema.json', 'lesson.schema.json', 'course.schema.json']) {
    assert(docs[document].includes('fileName'), document);
    assert(!docs[document].includes('"fileLocation": { "type": "null"'), document);
  }
  const validate = ajv.compile(JSON.parse(docs['contentBlock.schema.json']));
  for (const sample of tests) {
    const config = { id, slug: 'sample', type: sample.type, params: sample.params, locale: sample.locale };
    assert.equal(validate(config), true, sample.type + ': valid filename: ' + JSON.stringify(validate.errors));
    for (const invalid of [sample.invalid, 'imaginary.webp', '../escape.webp', filename + '.webp.extra']) {
      assert.equal(validate({ ...config, locale: { ...config.locale, fileName: invalid } }), false,
        sample.type + ': invalid ' + invalid);
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
  assert(!lesson.required.includes('flashcards'), 'A Lesson without Flashcards must remain authorable');
  assert.equal(course.properties.documentLanguage.type, 'string');
  for (const field of ['id', 'slug', 'type', 'skills', 'params', 'locale', 'section']) {
    assert(lesson.required.includes(field), 'Missing Lesson required field: ' + field);
  }
  for (const field of ['id', 'slug', 'type', 'params', 'locale', 'content']) {
    assert(course.required.includes(field), 'Missing Course required field: ' + field);
  }
  assert(course.required.includes('content'));
  assert.equal(overrides.additionalProperties, false);
  assert.deepEqual(Object.keys(overrides.properties).sort(), ['content', 'locale', 'params']);
  assert.equal(overrides.properties.content.properties.items.type, 'object');
  assert.equal(Object.hasOwn(overrides.$defs.buildPatch.properties, 'questions'), false);
  assert.equal(Object.hasOwn(overrides.$defs.buildPatch.properties, 'flashcards'), false);
  const courseScaffold = JSON.parse(docs['course.scaffold.schema.json']);
  const nested = courseScaffold.$defs.__overrides.$defs.buildPatch.properties;
  assert.equal(Object.hasOwn(nested, 'questions'), false);
  assert.equal(Object.hasOwn(nested, 'flashcards'), false);
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

test('Quest editor schema projects every named Stage/Task child while retaining mandatory media fields', () => {
  const config = (type, slug, suffix, locale = {}, params = {}) => ({
    id: '00000000-0000-4000-8000-' + String(suffix).padStart(12, '0'),
    slug,
    type,
    params,
    locale,
  });
  const quest = {
    ...config('quest', 'guidedPractice', 61, {
      title: { uk: 'Тренування' },
      navigationLabel: { uk: 'Практика' },
    }),
    stages: {
      start: {
        id: config('questStage', 'start', 62).id,
        slug: 'start',
        type: 'questStage',
        content: {
          video: {
            medium: config('video', 'medium', 63, {
              fileName: '550e8400-e29b-41d4-a716-446655440000.mp4',
              posterFileName: '550e8400-e29b-41d4-a716-446655440000.webp',
              label: { uk: 'Показ дії' },
            }),
            small: config('video', 'small', 64, {
              fileName: '550e8400-e29b-41d4-a716-446655440000.mp4',
              posterFileName: '550e8400-e29b-41d4-a716-446655440000.webp',
              label: { uk: 'Показ дії' },
            }),
          },
          audio: {
            dialogue: config('audio', 'dialogue', 65, {
              fileName: '550e8400-e29b-41d4-a716-446655440000.mp3',
              title: { uk: 'Діалог' },
            }),
            narration: null,
            background: null,
          },
          image: config(
            'image',
            'image',
            66,
            { fileName: '550e8400-e29b-41d4-a716-446655440000.webp', alt: { uk: 'Діаграма' } },
            {
              fill: true,
              aspectRatio: 1.5,
            },
          ),
          subtitles: config('subtitles', 'subtitles', 67, { fileName: '550e8400-e29b-41d4-a716-446655440000.vtt' }),
        },
      },
    },
    tasks: {
      start: {
        id: config('questTask', 'start', 68).id,
        slug: 'start',
        type: 'questTask',
        scene: config('scene', 'scene', 69, { value: { instruction: { uk: 'Спробуй' } } }),
      },
    },
  };
  assert.equal(yamlQuestSection_Schema.safeParse(quest).success, true);
  assert.equal(yamlSection_Schema.safeParse(quest).success, true);
  assert.equal(sectionTypes.includes('quest'), false, 'authoring-only must not imply runtime support');

  for (const collection of ['stages', 'tasks']) {
    const missingStart = structuredClone(quest);
    delete missingStart[collection].start;
    assert.equal(yamlQuestSection_Schema.safeParse(missingStart).success, false, collection + '.start required');
  }

  const missingMedium = structuredClone(quest);
  delete missingMedium.stages.start.content.video.medium;
  assert.equal(yamlQuestSection_Schema.safeParse(missingMedium).success, false);

  const wrongScene = structuredClone(quest);
  wrongScene.tasks.start.scene.type = 'text';
  assert.equal(yamlQuestSection_Schema.safeParse(wrongScene).success, false);

  const wrongSubtitles = structuredClone(quest);
  wrongSubtitles.stages.start.content.subtitles.locale.fileLocation = '/captions/ready.vtt';
  assert.equal(yamlQuestSection_Schema.safeParse(wrongSubtitles).success, false);

  const json = JSON.parse(yamlJsonSchemaDocuments()['section.schema.json']);
  const questType = json.oneOf.find(branch => branch.properties?.type?.const === 'quest');
  assert(questType, 'JSON Schema must advertise Quest Section');
  assert(questType.required.includes('stages') && questType.required.includes('tasks'));
  for (const kind of ['lesson', 'episode', 'course', 'lesson.scaffold', 'course.scaffold']) {
    const schema = JSON.parse(yamlJsonSchemaDocuments()[kind + '.schema.json']);
    assert(JSON.stringify(schema).includes('"quest"'), kind + ': missing Quest Config tree');
  }
});
