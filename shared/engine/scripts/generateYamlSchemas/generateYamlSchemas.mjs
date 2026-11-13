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

export function yamlJsonSchemaDocuments() {
  return Object.fromEntries(
    Object.entries(schemas).map(([kind, schema]) => {
      if (!schema) throw new Error('Missing Engine YAML authoring schema: ' + kind);
      // Do not downgrade z.custom children to {}. All configurator boundaries
      // must be replaced by the concrete schema before JSON Schema conversion.
      const jsonSchema = z.toJSONSchema(schema, {
        target: 'draft-2020-12',
        unrepresentable: 'throw',
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
