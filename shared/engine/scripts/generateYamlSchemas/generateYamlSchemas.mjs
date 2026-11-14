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
  // Keep Zod-derived required fields. Pending local media is represented
  // by literal null in the YAML-only Zod projections, not by omitted fields.
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
  if (kind === 'lesson') schema.required = [...new Set([...(schema.required ?? []), 'documentLanguage'])];
  return schema;
}

/**
 * Compose the checked-in hand-authored production.schema.json with the
 * Engine-derived Config schema. Each entity node receives exactly one
 * config (single identity) and an optional production handoff.
 *
 * The original *.schema.json remains a Config-only editor guide.
 * This separate *.scaffold.schema.json is the actual config.yaml editor guide.
 * No Zod/AJV validation is performed inside either TypeScript scaffolder.
 */
export function scaffoldYamlSchema(kind, authoredConfig) {
  // Production definitions remain manually authored. Embed a snapshot into
  // the composed editor schema so nested $refs work without network access.
  const productionPath = path.join(yamlSchemaOutputRoot, 'production.schema.json');
  const production = JSON.parse(fs.readFileSync(productionPath, 'utf8'));
  if (!production.$defs || typeof production.$defs !== 'object') {
    throw new Error('Missing manual production schema definitions: ' + productionPath);
  }
  const original = structuredClone(authoredConfig);
  const { $schema, $defs = {}, ...raw } = original;
  delete raw.$id;
  delete raw.title;
  // A source-language marker belongs in production, never defineLesson/defineCourse.
  if (raw.properties) delete raw.properties.documentLanguage;
  if (Array.isArray(raw.required)) raw.required = raw.required.filter(key => key !== 'documentLanguage');

  const sectionKinds = new Set(engine.sectionTypes ?? []);
  const questionKinds = new Set(engine.questionTypes ?? []);
  const resolveType = schema => {
    if (typeof schema?.const === 'string') return schema.const;
    if (typeof schema?.$ref === 'string' && schema.$ref.startsWith('#/$defs/')) {
      return $defs[schema.$ref.slice('#/$defs/'.length)]?.const;
    }
    return undefined;
  };
  const productionName = (type, properties) => {
    if (type === 'lesson' && properties.lessonId) return 'lessonReference';
    if (sectionKinds.has(type)) return 'section';
    if (questionKinds.has(type)) return 'question';
    if (['lesson', 'course', 'episode', 'image', 'audio', 'video', 'scene', 'flashcard'].includes(type)) return type;
    return 'default';
  };
  function wrap(node) {
    if (Array.isArray(node)) return node.map(wrap);
    if (!node || typeof node !== 'object') return node;
    const properties = node.properties;
    const type = resolveType(properties?.type);
    const entity = type && (properties?.id || properties?.lessonId);
    const config = Object.fromEntries(Object.entries(node).map(([key, value]) => [key, wrap(value)]));
    if (!entity) return config;
    const identity = properties?.lessonId ? 'lessonId' : 'id';
    config.required = [...new Set([...(config.required ?? []), identity, 'type'])];
    return {
      type: 'object',
      properties: {
        config,
        production: { $ref: '#/$defs/__production/$defs/' + productionName(type, properties) },
      },
      required: ['config'],
      additionalProperties: false,
    };
  }
  const envelope = wrap(raw);
  // The Lesson source language is required for deterministic locale pruning.
  if (kind === 'lesson') envelope.required = ['config', 'production'];
  // Embed the separate Course Build patch guide so the editor never needs
  // another JSON Schema file. Rebase its own $defs, not production pointers.
  let embeddedOverrides;
  if (kind === 'course') {
    const overrides = courseOverridesSchema(original);
    for (const key of ['$schema', '$id', 'title', 'description']) delete overrides[key];
    function scopeOverrideRefs(node) {
      if (Array.isArray(node)) return node.map(scopeOverrideRefs);
      if (!node || typeof node !== 'object') return node;
      return Object.fromEntries(
        Object.entries(node).map(([key, value]) => [
          key,
          key === '$ref' &&
          typeof value === 'string' &&
          value.startsWith('#/$defs/') &&
          !value.startsWith('#/$defs/__production/')
            ? '#/$defs/__overrides/$defs/' + value.slice('#/$defs/'.length)
            : scopeOverrideRefs(value),
        ]),
      );
    }
    embeddedOverrides = scopeOverrideRefs(wrap(overrides));
    envelope.properties.overrides = { $ref: '#/$defs/__overrides' };
  }
  return {
    $schema,
    $id: 'https://svitlo.dev/engine/yaml-schemas/' + kind + '.scaffold.schema.json',
    title: 'Svitlo ' + kind + ' unified config.yaml authoring draft',
    description:
      'Config is derived from Engine Zod; production references manually owned production.schema.json. ' +
      'Complete Config structure may contain literal null for pending local media; ' +
      'TypeScript fails until the actual resources have been produced.',
    ...envelope,
    $defs: {
      ...Object.fromEntries(Object.entries($defs).map(([name, schema]) => [name, wrap(schema)])),
      __production: { $defs: structuredClone(production.$defs) },
      ...(embeddedOverrides ? { __overrides: embeddedOverrides } : {}),
    },
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
  const questions = structuredClone(collection);
  delete questions.properties.order; // Question Bank groups have no ordering API.
  return {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: 'https://svitlo.dev/engine/yaml-schemas/courseOverrides.schema.json',
    title: 'Svitlo Course Build Overrides YAML draft',
    description:
      'Direct stateless build.overrides patch. Legacy ordered operation lists are unsupported. Configurator-level checks still run when TypeScript is completed.',
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
      const jsonSchema = draftYamlSchema(
        kind,
        z.toJSONSchema(schema, {
          target: 'draft-2020-12',
          unrepresentable: 'throw',
          // Reuse identical Zod child schemas via $defs/$ref instead of
          // recursively inlining megabytes of repeated Config tree fragments.
          reused: 'ref',
        }),
      );
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
  for (const kind of ['lesson', 'course']) {
    documents[kind + '.scaffold.schema.json'] =
      JSON.stringify(scaffoldYamlSchema(kind, JSON.parse(documents[kind + '.schema.json'])), null, 2) + '\n';
  }
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
    process.stdout.write(
      (mode === '--check' ? 'Checked' : 'Generated') + ' ' + written.length + ' YAML JSON Schemas\n',
    );
  } catch (error) {
    process.stderr.write(String(error?.stack ?? error) + '\n');
    process.exitCode = 1;
  }
}
