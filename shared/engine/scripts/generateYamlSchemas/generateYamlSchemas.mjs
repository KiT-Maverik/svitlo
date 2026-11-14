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
const schemas = {
  contentBlock: engine.yamlContentBlock_Schema,
  section: engine.yamlSection_Schema,
  question: engine.yamlQuestion_Schema,
  flashcard: engine.yamlFlashcard_Schema,
  lesson: engine.yamlLesson_Schema,
  episode: engine.yamlEpisode_Schema,
  course: engine.yamlCourse_Schema,
};

/* Draft source envelopes are distinct from the complete Engine Config. */
export function draftYamlSchema(kind, configSchema) {
  if (kind !== 'lesson' && kind !== 'course') return configSchema;
  const schema = structuredClone(configSchema);
  // Factory dispatch is mandatory; the rest can be deliberately incomplete.
  function relax(node) {
    if (Array.isArray(node)) return void node.forEach(relax);
    if (!node || typeof node !== 'object') return;
    if (node.properties && Array.isArray(node.required)) {
      const must = node.required.filter(name => name === 'type' || name === 'lessonId');
      if (must.length) node.required = must;
      else delete node.required;
    }
    for (const value of Object.values(node)) relax(value);
  }
  schema.properties.documentLanguage = { type: 'string', minLength: 2 };
  if (kind === 'course') {
    const importSource = {
      type: 'object',
      properties: {
        path: { type: 'string', minLength: 1 },
        export: { type: 'string', minLength: 1 },
      },
      required: ['path', 'export'],
      additionalProperties: false,
    };
    function addImportSource(node) {
      if (Array.isArray(node)) return void node.forEach(addImportSource);
      if (!node || typeof node !== 'object') return;
      if (node.properties?.type?.const === 'lesson' && node.properties.lessonId) {
        node.properties.source = structuredClone(importSource);
      }
      for (const value of Object.values(node)) addImportSource(value);
    }
    addImportSource(schema);
  }
  relax(schema);
  if (kind === 'lesson') schema.required = ['type', 'slug', 'documentLanguage'];
  return schema;
}

/** Derive a guide to the direct Course Build API patch, not legacy operations. */
export function courseOverridesSchema(course) {
  const collection = {
    type: 'object',
    properties: {
      items: { type: 'object', additionalProperties: { anyOf: [{ const: false }, { $ref: '#/$defs/buildPatch' }] } },
      additionalItems: { type: 'object', additionalProperties: {
        type: 'object', properties: { type: { type: 'string', minLength: 1 } }, required: ['type'],
      } },
      order: { type: 'array', items: { type: 'string' } },
    },
    additionalProperties: false,
  };
  const courseContent = structuredClone(collection);
  courseContent.properties.additionalItems.additionalProperties =
    structuredClone(course.properties.content.properties.items.additionalProperties);
  const params = structuredClone(course.properties.params);
  delete params.properties.languages;
  delete params.required;
  const locale = structuredClone(course.properties.locale);
  delete locale.required;
  const questions = structuredClone(collection);
  delete questions.properties.order; // Question Bank groups have no ordering API.
  return {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: 'https://svitlo.dev/engine/yaml-schemas/courseOverrides.schema.json',
    title: 'Svitlo Course Build Overrides YAML draft',
    description: 'Direct stateless build.overrides patch. Legacy ordered operation lists are unsupported. Configurator-level checks still run when TypeScript is completed.',
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
          flashcards: { $ref: '#/$defs/patchCollection' },
          questions: { type: 'object', additionalProperties: questions },
        },
        additionalProperties: false,
      },
      patchCollection: collection,
    },
  };
}

export function yamlJsonSchemaDocuments() {
  const documents = Object.fromEntries(
    Object.entries(schemas).map(([kind, schema]) => {
      if (!schema) throw new Error('Missing Engine YAML authoring schema: ' + kind);
      // Do not downgrade z.custom children to {}. All configurator boundaries
      // must be replaced by the concrete schema before JSON Schema conversion.
      const jsonSchema = draftYamlSchema(kind, z.toJSONSchema(schema, {
        target: 'draft-2020-12',
        unrepresentable: 'throw',
        // Reuse identical Zod child schemas via $defs/$ref instead of
        // recursively inlining megabytes of repeated Config tree fragments.
        reused: 'ref',
      }));
      return [
        kind + '.schema.json',
        JSON.stringify(
          {
            ...jsonSchema,
            $id: 'https://svitlo.dev/engine/yaml-schemas/' + kind + '.schema.json',
            title: 'Svitlo ' + kind + ' authored YAML Config draft',
          },
          null,
          2,
        ) + '\n',
      ];
    }),
  );
  const course = JSON.parse(documents['course.schema.json']);
  documents['courseOverrides.schema.json'] = JSON.stringify(courseOverridesSchema(course), null, 2) + '\n';
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

export function generateYamlSchemas(mode, outputRoot = yamlSchemaOutputRoot) {
  if (mode !== '--write' && mode !== '--check') {
    throw new Error('Expected --write or --check');
  }
  const documents = yamlJsonSchemaDocuments();
  if (mode === '--write') fs.mkdirSync(outputRoot, { recursive: true });
  for (const [filename, contents] of Object.entries(documents)) {
    const target = path.join(outputRoot, filename);
    if (mode === '--check') {
      if (!schemaMatches(target, contents)) {
        throw new Error('Outdated YAML JSON Schema: ' + target + '. Run with --write.');
      }
    } else if (!schemaMatches(target, contents)) {
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
    process.stdout.write((mode === '--check' ? 'Checked' : 'Generated') + ' ' + written.length + ' YAML JSON Schemas\n');
  } catch (error) {
    process.stderr.write(String(error?.stack ?? error) + '\n');
    process.exitCode = 1;
  }
}
