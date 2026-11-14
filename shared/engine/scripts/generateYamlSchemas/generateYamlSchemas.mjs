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

/** Preserve explicit dispatch while allowing intentionally partial TypeScript drafts. */
export function asScaffolderDraft(kind, jsonSchema) {
  if (kind !== 'lesson' && kind !== 'course') return jsonSchema;
  const schema = structuredClone(jsonSchema);
  // Source-language provenance belongs only to the YAML envelope, never to
  // the Engine Config passed to defineLesson/defineCourse.
  schema.properties.documentLanguage = { type: 'string', minLength: 2 };

  function visit(node, root = false) {
    if (Array.isArray(node)) {
      for (const item of node) visit(item);
      return;
    }
    if (!node || typeof node !== 'object') return;
    if (node.properties && Array.isArray(node.required)) {
      const required = [];
      if (node.properties.type?.const !== undefined) required.push('type');
      if (node.properties.type?.const === 'lesson' && node.properties.lessonId) required.push('lessonId');
      if (root && kind === 'lesson') required.push('slug', 'documentLanguage');
      if (required.length) node.required = [...new Set(required)];
      else delete node.required;
    }
    for (const [key, child] of Object.entries(node)) {
      if (key !== 'required') visit(child);
    }
  }

  if (kind === 'course') {
    // A Course Lesson is always a UUID reference. source is optional import
    // metadata, NOT an existence flag or authorization to create Lesson files.
    const source = {
      type: 'object',
      properties: {
        path: { type: 'string', pattern: '\\\\.tsx?
  const documents = Object.fromEntries(
    Object.entries(schemas).map(([kind, schema]) => {
      if (!schema) throw new Error('Missing Engine YAML authoring schema: ' + kind);
      // Do not downgrade z.custom children to {}. All configurator boundaries
      // must be replaced by the concrete schema before JSON Schema conversion.
      const configSchema = z.toJSONSchema(schema, {
        target: 'draft-2020-12',
        unrepresentable: 'throw',
        // Reuse identical Zod child schemas via $defs/$ref instead of
        // recursively inlining megabytes of repeated Config tree fragments.
        reused: 'ref',
      });
      const jsonSchema = asScaffolderDraft(kind, configSchema);
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
  documents['courseOverrides.schema.json'] = JSON.stringify(courseOverridesDocument(course), null, 2) + '\\n';
  return documents;
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
      if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== contents) {
        throw new Error('Outdated YAML JSON Schema: ' + target + '. Run with --write.');
      }
    } else if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== contents) {
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
 },
        export: { type: 'string', pattern: '^[A-Za-z_$][A-Za-z0-9_$]*
  return Object.fromEntries(
    Object.entries(schemas).map(([kind, schema]) => {
      if (!schema) throw new Error('Missing Engine YAML authoring schema: ' + kind);
      // Do not downgrade z.custom children to {}. All configurator boundaries
      // must be replaced by the concrete schema before JSON Schema conversion.
      const jsonSchema = z.toJSONSchema(schema, {
        target: 'draft-2020-12',
        unrepresentable: 'throw',
        // Reuse identical Zod child schemas via $defs/$ref instead of
        // recursively inlining megabytes of repeated Config tree fragments.
        reused: 'ref',
      });
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
      if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== contents) {
        throw new Error('Outdated YAML JSON Schema: ' + target + '. Run with --write.');
      }
    } else if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== contents) {
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
 },
      },
      required: ['path', 'export'],
      additionalProperties: false,
    };
    function addReferenceSource(node) {
      if (Array.isArray(node)) return void node.forEach(addReferenceSource);
      if (!node || typeof node !== 'object') return;
      if (node.properties?.type?.const === 'lesson' && node.properties.lessonId) {
        node.properties.source = structuredClone(source);
      }
      for (const child of Object.values(node)) addReferenceSource(child);
    }
    addReferenceSource(schema);
  }
  visit(schema, true);
  return schema;
}

/** JSON Schema guide for the ONLY supported Course overrides: build.overrides. */
export function courseOverridesDocument(course) {
  const recursiveCollection = {
    type: 'object',
    properties: {
      items: {
        type: 'object',
        propertyNames: { type: 'string' },
        additionalProperties: { anyOf: [{ const: false }, { $ref: '#/$defs/buildPatch' }] },
      },
      additionalItems: {
        type: 'object',
        propertyNames: { type: 'string' },
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
  const content = structuredClone(recursiveCollection);
  content.properties.additionalItems.additionalProperties =
    structuredClone(course.properties.content.properties.items.additionalProperties);
  const metadataParams = structuredClone(course.properties.params);
  delete metadataParams.properties.languages; // Lesson/Course languages are immutable through overrides.
  delete metadataParams.required;
  const metadataLocale = structuredClone(course.properties.locale);
  delete metadataLocale.required;
  return {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: 'https://svitlo.dev/engine/yaml-schemas/courseOverrides.schema.json',
    title: 'Svitlo Course build.overrides YAML draft',
    description: 'Direct stateless Build API patch. The obsolete operation-list DSL is unsupported. Nested patches are editor guidance; actual configurators enforce semantic invariants.',
    type: 'object',
    properties: {
      params: metadataParams,
      locale: metadataLocale,
      content,
    },
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
          questions: { type: 'object', additionalProperties: { $ref: '#/$defs/patchCollection' } },
        },
        additionalProperties: false,
      },
      patchCollection: recursiveCollection,
    },
  };
}

export function yamlJsonSchemaDocuments() {
  return Object.fromEntries(
    Object.entries(schemas).map(([kind, schema]) => {
      if (!schema) throw new Error('Missing Engine YAML authoring schema: ' + kind);
      // Do not downgrade z.custom children to {}. All configurator boundaries
      // must be replaced by the concrete schema before JSON Schema conversion.
      const jsonSchema = z.toJSONSchema(schema, {
        target: 'draft-2020-12',
        unrepresentable: 'throw',
        // Reuse identical Zod child schemas via $defs/$ref instead of
        // recursively inlining megabytes of repeated Config tree fragments.
        reused: 'ref',
      });
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
      if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== contents) {
        throw new Error('Outdated YAML JSON Schema: ' + target + '. Run with --write.');
      }
    } else if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== contents) {
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
