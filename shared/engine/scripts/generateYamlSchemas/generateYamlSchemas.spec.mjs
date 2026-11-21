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
  yamlCourseAuthoring_Schema,
  yamlLessonAuthoring_Schema,
  yamlEpisodeAuthoring_Schema,
  yamlContentBlockAuthoring_Schema,
  yamlLessonReferenceAuthoring_Schema,
  yamlProduction_Schemas,
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
  assert.equal(
    yamlCheckpointItem_Schema.safeParse({
      ...item,
      answer: { ...answer, id: undefined },
    }).success,
    false,
  );
  assert.equal(
    yamlCheckpointItem_Schema.safeParse({
      ...item,
      answer: { ...answer, type: 'text' },
    }).success,
    false,
  );
  assert(yamlJsonSchemaDocuments()['lesson.schema.json'].includes('checkpointAnswer'));
});

test('technical YAML excludes filenames while complete Engine Config still requires them', () => {
  const uuid = '550e8400-e29b-41d4-a716-446655440000';
  const cases = [
    {
      yaml: yamlImage_Schema,
      engine: image_Config_Schema,
      type: 'image',
      params: { fill: true, aspectRatio: 1.5 },
      locale: { alt: { uk: 'Зображення' } },
      files: { fileName: uuid + '.webp' },
      wrong: uuid + '.mp4',
    },
    {
      yaml: yamlAudio_Schema,
      engine: audio_Config_Schema,
      type: 'audio',
      params: {},
      locale: { title: { uk: 'Озвучення' } },
      files: { fileName: uuid + '.mp3' },
      wrong: uuid + '.webp',
    },
    {
      yaml: yamlVideo_Schema,
      engine: video_Config_Schema,
      type: 'video',
      params: {},
      locale: { label: { uk: 'Відео' } },
      files: { fileName: uuid + '.mp4', posterFileName: uuid + '.webp' },
      wrong: uuid + '.mp3',
    },
    {
      yaml: yamlSubtitles_Schema,
      engine: subtitles_Config_Schema,
      type: 'subtitles',
      params: {},
      locale: {},
      files: { fileName: uuid + '.vtt' },
      wrong: uuid + '.mp4',
    },
  ];
  for (const entry of cases) {
    const draft = { id, slug: 'sample', type: entry.type, params: entry.params, locale: entry.locale };
    const full = { ...draft, locale: { ...entry.locale, ...entry.files } };
    assert.equal(entry.yaml.safeParse(draft).success, true, entry.type + ': YAML does not require files');
    assert.equal(yamlContentBlock_Schema.safeParse(draft).success, true, entry.type);
    assert.equal(entry.engine.safeParse(draft).success, false, entry.type + ': Engine requires files');
    assert.equal(entry.engine.safeParse(full).success, true, entry.type + ': completed authoring');
    assert.equal(entry.yaml.safeParse(full).success, false, entry.type + ': YAML rejects file references');
    assert.equal(entry.yaml.safeParse({ ...draft, locale: { ...entry.locale, fileName: null } }).success, false);
    assert.equal(entry.engine.safeParse({ ...full, locale: { ...full.locale, fileName: entry.wrong } }).success, false);
    assert.equal(
      entry.engine.safeParse({ ...full, locale: { ...full.locale, fileName: '../escape.webp' } }).success,
      false,
    );
    assert.equal(
      entry.engine.safeParse({
        ...full,
        locale: {
          ...full.locale,
          fileName: '00000000-0000-0000-0000-000000000000.' + entry.files.fileName.split('.').at(-1),
        },
      }).success,
      true,
      entry.type + ': reserved Nil UUID',
    );
  }
});

test('generated JSON Schemas omit media filenames and preserve required learner fields', () => {
  const Ajv2020 = require('ajv/dist/2020.js');
  const Ajv = Ajv2020.default ?? Ajv2020;
  const ajv = new Ajv({ strict: false, validateFormats: false });
  const docs = yamlJsonSchemaDocuments();
  const samples = [
    { type: 'image', params: { fill: true, aspectRatio: 1.5 }, locale: { alt: 'Chart' } },
    { type: 'audio', params: {}, locale: { title: 'Voice' } },
    { type: 'video', params: {}, locale: { label: 'Video' } },
    { type: 'subtitles', params: {}, locale: {} },
  ];
  for (const name of [
    'contentBlock.schema.json',
    'lesson.schema.json',
    'course.schema.json',
    'lesson.scaffold.schema.json',
  ]) {
    assert(!docs[name].includes('"fileName"'), name);
    assert(!docs[name].includes('"posterFileName"'), name);
  }
  const validate = ajv.compile(JSON.parse(docs['contentBlock.schema.json']));
  for (const sample of samples) {
    const draft = { id, slug: 'sample', ...sample };
    assert.equal(validate(draft), true, sample.type + JSON.stringify(validate.errors));
    assert.equal(validate({ ...draft, locale: { ...draft.locale, fileName: null } }), false);
    assert.equal(
      validate({ ...draft, locale: { ...draft.locale, fileName: '550e8400-e29b-41d4-a716-446655440000.webp' } }),
      false,
    );
    if (sample.type === 'video')
      assert.equal(validate({ ...draft, locale: { ...draft.locale, posterFileName: 'poster.webp' } }), false);
  }
});

test('Zod -> JSON Schema exports every root without opaque Configurator nodes', () => {
  const docs = yamlJsonSchemaDocuments();
  assert.deepEqual(Object.keys(docs).sort(), [
    'chapter.scaffold.schema.json',
    'contentBlock.scaffold.schema.json',
    'contentBlock.schema.json',
    'course-flow.schema.json',
    'course.scaffold.schema.json',
    'course.schema.json',
    'courseOverrides.schema.json',
    'episode.scaffold.schema.json',
    'episode.schema.json',
    'flashcard.scaffold.schema.json',
    'flashcard.schema.json',
    'lesson.scaffold.schema.json',
    'lesson.schema.json',
    'module.scaffold.schema.json',
    'production.schema.json',
    'question.scaffold.schema.json',
    'question.schema.json',
    'section.scaffold.schema.json',
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

test('Zod-derived Flashcard YAML Config requires arrays of typed flags', () => {
  const document = JSON.parse(yamlJsonSchemaDocuments()['flashcard.schema.json']);
  const flags = document.properties.parameters.properties.flags;
  assert.equal(flags.type, 'array');
  assert.equal(flags.items.oneOf.length, 4);
  assert(document.properties.parameters.required.includes('flags'));
  assert.equal(Object.hasOwn(flags, 'properties'), false, 'no legacy named items/order collection');
});

test('Lesson YAML envelope and current Course Config/Build patch schemas remain separate', () => {
  const docs = yamlJsonSchemaDocuments();
  const lesson = JSON.parse(docs['lesson.schema.json']);
  const course = JSON.parse(docs['course.schema.json']);
  const overrides = JSON.parse(docs['courseOverrides.schema.json']);
  assert(!lesson.required.includes('documentLanguage'), 'Source language belongs in production, not Config');
  assert(lesson.required.includes('type'));
  assert(!lesson.required.includes('flashcards'), 'A Lesson without Flashcards must remain authorable');
  assert.equal(Object.hasOwn(course.properties, 'documentLanguage'), false);
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
  assert(!Object.hasOwn(overrides.properties, 'operations'));
  assert.equal(Object.hasOwn(docs, 'course.scaffold.schema.json'), true);
});
test('generator write/check is deterministic and rejects stale files', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-yaml-schemas-'));
  try {
    assert.throws(() => generateYamlSchemas('--check', root), /Outdated YAML JSON Schema/);
    const written = generateYamlSchemas('--write', root);
    assert.equal(written.length, 19);
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

test('editor schemas are generated from current Engine Zod source before validation', () => {
  const output = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-current-yaml-schemas-'));
  try {
    const generated = yamlJsonSchemaDocuments();
    const names = generateYamlSchemas('--write', output);
    assert.equal(names.length, 19);
    for (const name of names) {
      assert.deepEqual(
        JSON.parse(fs.readFileSync(path.join(output, name), 'utf8')),
        JSON.parse(generated[name]),
        name + ' is generated from the current Zod contract',
      );
    }
    assert.deepEqual(generateYamlSchemas('--check', output), names);
  } finally {
    fs.rmSync(output, { recursive: true, force: true });
  }
});

test('Lesson and Course source envelopes are generated from one nested Zod authoring contract', () => {
  const docs = yamlJsonSchemaDocuments();
  const lesson = JSON.parse(docs['lesson.scaffold.schema.json']);
  const course = JSON.parse(docs['course.scaffold.schema.json']);
  const flow = JSON.parse(docs['course-flow.schema.json']);
  const production = JSON.parse(docs['production.schema.json']);
  assert.equal(lesson.type, 'object');
  assert(lesson.required.includes('config'));
  assert(lesson.required.includes('production'), 'Lesson requires its source language');
  assert.equal(lesson.additionalProperties, false);
  assert.equal(lesson.properties.config.properties.type.const, 'lesson');
  assert(!Object.hasOwn(lesson.properties.config.properties, 'documentLanguage'));
  assert.equal(course.properties.config.properties.type.const, 'course');
  assert.deepEqual(
    { ...flow, $id: course.$id, title: course.title },
    course,
    'Course Flow is exactly the generated Course authoring schema',
  );
  assert(production.$defs.lesson.required.includes('documentLanguage'));
  assert(production.$defs.scene.required.includes('specification'));
  assert.deepEqual(production.$defs.image.required.slice().sort(), ['prompt', 'purpose']);
  assert(docs['course.scaffold.schema.json'].includes('lessonReference'));
  assert(docs['course.scaffold.schema.json'].includes('scene'));
  assert(!docs['lesson.scaffold.schema.json'].includes('"sceneSpecKey"'));
});

test('full Lesson, reference and nested Scene have distinct consistent authoring shapes', () => {
  const config = (type, slug, suffix, locale = {}, params = {}) => ({
    id: '00000000-0000-4000-8000-' + String(suffix).padStart(12, '0'),
    slug,
    type,
    params,
    locale,
  });
  const scene = { config: config('scene', 'diagram', 11, { value: { instruction: { en: 'Try it' } } }),
    production: { specification: 'Interactive accessible demonstration' } };
  const section = {
    config: {
      ...config('content', 'intro', 12, { title: 'Intro', navigationLabel: 'Intro' }),
      content: { items: { diagram: scene }, order: ['diagram'] },
    },
  };
  const lesson = {
    config: {
      ...config('lesson', 'lesson', 13, { title: 'Lesson' }, {
        languages: ['en'], quizRequiredForCompletion: false,
        sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
      }),
      skills: [],
      section: { items: { intro: section }, order: ['intro'] },
    },
    production: { documentLanguage: 'en', methodology: 'Real lesson methodology' },
  };
  const episode = {
    config: {
      ...config('episode', 'episode', 14, { title: 'Episode' }, { languages: ['en'] }),
      section: { items: { intro: section }, order: ['intro'] },
    },
  };
  const reference = { config: { type: 'lessonReference', lessonId: lesson.config.id, slug: 'linkedLesson' } };
  assert.equal(yamlContentBlockAuthoring_Schema.safeParse(scene).success, true);
  assert.equal(yamlLessonAuthoring_Schema.safeParse(lesson).success, true);
  assert.equal(yamlEpisodeAuthoring_Schema.safeParse(episode).success, true);
  assert.equal(yamlLessonReferenceAuthoring_Schema.safeParse(reference).success, true);
  assert.equal(yamlLessonReferenceAuthoring_Schema.safeParse({ config: {
    ...reference.config, type: 'lesson',
  } }).success, false);
  assert.equal(yamlLessonAuthoring_Schema.safeParse(reference).success, false);
  assert.equal(yamlProduction_Schemas.lesson.safeParse({ documentLanguage: 'en' }).success, true);
  const course = {
    config: {
      ...config('course', 'course', 15, { title: 'Course', description: 'Course description' },
        { languages: ['en'] }),
      content: { items: { lesson: lesson, linkedLesson: reference, episode }, order: [
        'lesson', 'linkedLesson', 'episode',
      ] },
    },
    production: { documentLanguage: 'en' },
  };
  assert.equal(yamlCourseAuthoring_Schema.safeParse(course).success, true);
  assert.equal(yamlCourseAuthoring_Schema.safeParse({
    ...course, config: { ...course.config, content: {
      items: { lesson: { config: { ...reference.config, type: 'lesson' } } },
      order: ['lesson'],
    } },
  }).success, false);
});

test('Quest editor schema projects every named Stage/Task child without physical media filenames', () => {
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
              label: { uk: 'Показ дії' },
            }),
            small: config('video', 'small', 64, {
              label: { uk: 'Показ дії' },
            }),
          },
          audio: {
            dialogue: config('audio', 'dialogue', 65, {
              title: { uk: 'Діалог' },
            }),
            narration: null,
            background: null,
          },
          image: config(
            'image',
            'image',
            66,
            { alt: { uk: 'Діаграма' } },
            {
              fill: true,
              aspectRatio: 1.5,
            },
          ),
          subtitles: config('subtitles', 'subtitles', 67, {}),
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
  for (const kind of ['lesson', 'episode', 'course', 'lesson.scaffold']) {
    const schema = JSON.parse(yamlJsonSchemaDocuments()[kind + '.schema.json']);
    assert(JSON.stringify(schema).includes('"quest"'), kind + ': missing Quest Config tree');
  }
});
