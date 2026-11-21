#!/usr/bin/env node
/**
 * @fileoverview Derive editor-facing JSON Schemas from Engine's composed YAML
 * authoring Zod schemas. This is build-time tooling, NOT a YAML draft validator.
 *
 * Source of truth: the existing entity *_Config_Schema objects, composed at
 * their nested Configurator boundaries in configurators/yaml/. This command
 * does not run inside the Lesson/Course TypeScript draft scaffolders.
 *
 * Usage after building @svitlo/engine:
 *   node shared/engine/scripts/generateYamlSchemas/generateYamlSchemas.mjs --write
 *   node shared/engine/scripts/generateYamlSchemas/generateYamlSchemas.mjs --check
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const engine = require('../../dist/build.js');
const { z } = require('zod');

const engineRoot = fileURLToPath(new URL('../..', import.meta.url));
export const yamlSchemaOutputRoot = path.join(engineRoot, 'yaml-schemas');

/** These JSON documents are typed Config guides, not the editorial methodology plans. */
const configSchemas = {
  contentBlock: engine.yamlContentBlock_Schema,
  section: engine.yamlSection_Schema,
  question: engine.yamlQuestion_Schema,
  flashcard: engine.yamlFlashcard_Schema,
  lesson: engine.yamlLesson_Schema,
  episode: engine.yamlEpisode_Schema,
  course: engine.yamlCourse_Schema,
};

const studioCourseFlowPath = path.join(engineRoot, '..', '..', 'studio', 'skills', 'course-workflow', 'course-flow.schema.json');

/**
 * An authoring document is one recursively composed Zod node tree. Nested
 * content receives exactly the same schema under Course, Episode and Lesson.
 * The separate Config guides are retained for the Engine Build API only.
 */
export function scaffoldYamlSchema(kind) {
  const schema = engine.yamlAuthoringSchemas?.[kind];
  if (!schema) throw new Error('Missing Engine authoring schema: ' + kind);
  const jsonSchema = z.toJSONSchema(schema, {
    target: 'draft-2020-12',
    unrepresentable: 'throw',
    reused: 'ref',
  });
  return {
    ...jsonSchema,
    $id: 'https://svitlo.dev/engine/yaml-schemas/' + kind + '.scaffold.schema.json',
    title: 'Svitlo ' + kind + ' YAML authoring source',
    description: 'Single Zod-derived {config, production?} source tree; production is authoring metadata only.',
  };
}

/** No hand-maintained JSON counterpart to the typed production metadata. */
export function productionYamlSchema() {
  const source = engine.yamlProduction_Schemas;
  if (!source) throw new Error('Missing typed YAML production metadata');
  return {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: 'https://svitlo.dev/engine/yaml-schemas/production.schema.json',
    title: 'Svitlo authoring-only production metadata',
    $defs: Object.fromEntries(
      Object.entries(source).map(([kind, schema]) => [
        kind,
        z.toJSONSchema(schema, { target: 'draft-2020-12', unrepresentable: 'throw', reused: 'ref' }),
      ]),
    ),
  };
}

/** Derive a guide to the direct Course Build API patch, not legacy operations. */
export function courseOverridesSchema(course) {
  const collection = {
    type: 'object',
    properties: {
      items: { type: 'object', additionalProperties: { anyOf: [{ const: false }, { $ref: '#/$defs/buildPatch' }] } },
      additionalItems: {
        type: 'object',
        additionalProperties: {
          type: 'object',
          properties: { type: { type: 'string', minLength: 1 } },
          required: ['type'],
        },
      },
      order: { type: 'array', items: { type: 'string' } },
    },
    additionalProperties: false,
  };
  const courseContent = structuredClone(collection);
  courseContent.properties.additionalItems.additionalProperties = structuredClone(
    course.properties.content.properties.items.additionalProperties,
  );
  const params = structuredClone(course.properties.params);
  delete params.properties.languages;
  delete params.required;
  const locale = structuredClone(course.properties.locale);
  delete locale.required;
  return {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: 'https://svitlo.dev/engine/yaml-schemas/courseOverrides.schema.json',
    title: 'Svitlo Course Build API override patch',
    description:
      'Stateless Course build.overrides patch. Actual typed configurators and TypeScript compilation validate the authored implementation.',
    type: 'object',
    properties: { params, locale, content: courseContent },
    additionalProperties: false,
    $defs: {
      ...structuredClone(course.$defs ?? {}),
      buildPatch: {
        type: 'object',
        properties: {
          params: { type: 'object' },
          locale: { type: 'object' },
          content: { $ref: '#/$defs/patchCollection' },
          section: { $ref: '#/$defs/patchCollection' },
        },
        additionalProperties: false,
      },
      patchCollection: collection,
    },
  };
}

export function yamlJsonSchemaDocuments() {
  const options = { target: 'draft-2020-12', unrepresentable: 'throw', reused: 'ref' };
  const documents = Object.fromEntries(
    Object.entries(configSchemas).map(([kind, schema]) => {
      if (!schema) throw new Error('Missing Engine YAML Config schema: ' + kind);
      const config = z.toJSONSchema(schema, options);
      const filename = kind + '.schema.json';
      return [filename, JSON.stringify({
        ...config,
        $id: 'https://svitlo.dev/engine/yaml-schemas/' + filename,
        title: 'Svitlo ' + kind + ' authored Engine Config guide',
      }, null, 2) + '\n'];
    }),
  );

  const course = JSON.parse(documents['course.schema.json']);
  documents['courseOverrides.schema.json'] = JSON.stringify(courseOverridesSchema(course), null, 2) + '\n';
  for (const kind of Object.keys(engine.yamlAuthoringSchemas)) {
    documents[kind + '.scaffold.schema.json'] = JSON.stringify(scaffoldYamlSchema(kind), null, 2) + '\n';
  }
  documents['production.schema.json'] = JSON.stringify(productionYamlSchema(), null, 2) + '\n';

  const flow = structuredClone(scaffoldYamlSchema('course'));
  flow.$id = 'https://svitlo.org/studio/schemas/course-flow.schema.json';
  flow.title = 'Svitlo single temporary Course authoring source';
  documents['course-flow.schema.json'] = JSON.stringify(flow, null, 2) + '\n';
  return documents;
}

/** Generated JSON is semantically stable even after Prettier changes whitespace. */
function schemaMatches(target, contents) {
  if (!fs.existsSync(target)) return false;
  try {
    return JSON.stringify(JSON.parse(fs.readFileSync(target, 'utf8'))) === JSON.stringify(JSON.parse(contents));
  } catch {
    return false;
  }
}

export function generateYamlSchemas(
  mode,
  outputRoot = yamlSchemaOutputRoot,
  courseFlowPath = outputRoot === yamlSchemaOutputRoot
    ? studioCourseFlowPath
    : path.join(outputRoot, 'course-flow.schema.json'),
) {
  if (mode !== '--write' && mode !== '--check') throw new Error('Expected --write or --check');
  const documents = yamlJsonSchemaDocuments();
  if (mode === '--write') fs.mkdirSync(outputRoot, { recursive: true });
  for (const [filename, contents] of Object.entries(documents)) {
    const target = filename === 'course-flow.schema.json'
      ? courseFlowPath
      : path.join(outputRoot, filename);
    if (mode === '--check') {
      if (!schemaMatches(target, contents)) {
        throw new Error('Outdated YAML JSON Schema: ' + target + '. Run with --write.');
      }
    } else if (!schemaMatches(target, contents)) {
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, contents);
    }
  }
  return Object.keys(documents);
}

const invokedFile = process.argv[1] && path.resolve(process.argv[1]);
if (invokedFile === fileURLToPath(import.meta.url)) {
  try {
    const [mode] = process.argv.slice(2);
    if (process.argv.length !== 3) throw new Error('Usage: generateYamlSchemas.mjs --write|--check');
    const written = generateYamlSchemas(mode);
    process.stdout.write(
      (mode === '--check' ? 'Checked' : 'Generated') + ' ' + written.length + ' YAML JSON Schemas\n',
    );
  } catch (error) {
    process.stderr.write(String(error?.stack ?? error) + '\n');
    process.exitCode = 1;
  }
}
