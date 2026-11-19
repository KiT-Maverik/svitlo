#!/usr/bin/env node
/**
 * @fileoverview One-time complete Lesson YAML preflight and safe Stage 6 handoff.
 *
 * The existing lessonBuilder remains a draft-only, create-only scaffolder:
 * it must NOT validate complete YAML or delete sources on its own.
 * This separate coordinator validates full Engine-derived scaffold shape,
 * verifies actual builder output and preserves every production instruction
 * before deleting only an unchanged canonical lesson.yaml.
 *
 * Preflight is read-only. Finalize never overwrites a source module or handoff.
 * Failure/partial scaffold leaves lesson.yaml untouched for manual recovery.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import yaml from 'yaml';
import { runOne, repoRoot } from '../lessonBuilder/lessonBuilder.mjs';
import { sourceAuthoringCopy } from '../yamlScaffolding/yamlScaffolding.mjs';

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);

export class LessonHandoffError extends Error {
  constructor(field, message) {
    super('lesson.yaml:' + field + ': ' + message);
    this.name = 'LessonHandoffError';
    this.field = field;
  }
}

function fail(field, message) {
  throw new LessonHandoffError(field, message);
}

function noSymlinks(location) {
  let current = path.parse(path.resolve(location)).root;
  for (const part of path.resolve(location).slice(current.length).split(path.sep).filter(Boolean)) {
    current = path.join(current, part);
    try {
      if (fs.lstatSync(current).isSymbolicLink()) throw new Error('Refusing symlink: ' + current);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
}

function sourceLocation(source, repo) {
  const filename = path.resolve(source);
  noSymlinks(filename);
  const relative = path.relative(path.resolve(repo), filename).split(path.sep).join('/');
  const match =
    /^content\/((?:languages\/)?[a-z][a-z-]*)\/data\/lessons\/([0-9a-f])\/([0-9a-f-]{36})\/lesson\.yaml$/.exec(
      relative,
    );
  if (!match) fail('$', 'finalization requires canonical content/<book>/data/lessons/<bucket>/<uuid>/lesson.yaml');
  if (!uuid.test(match[3]) || match[3].at(-1) !== match[2])
    fail('config.id', 'canonical source path must use the full immutable Lesson UUID and its last-hex bucket');
  const bookRoot = path.join(repo, 'content', match[1]);
  if (!fs.existsSync(path.join(bookRoot, 'package.json'))) fail('$', 'not a textbook workspace: ' + match[1]);
  return { filename, directory: path.dirname(filename), lessonId: match[3], bookRoot };
}

function parseSource(filename) {
  let doc;
  try {
    doc = yaml.parseDocument(fs.readFileSync(filename, 'utf8'), {
      version: '1.2',
      uniqueKeys: true,
      strict: true,
    });
    if (doc.errors.length) throw new Error(doc.errors.map(e => e.message).join('; '));
    const value = doc.toJS({ maxAliasCount: 0 });
    if (!record(value)) fail('$', 'root must be a YAML mapping');
    return value;
  } catch (error) {
    if (error instanceof LessonHandoffError) throw error;
    fail('$', 'invalid YAML 1.2: ' + error.message);
  }
}

function validateSchema(
  document,
  repo,
  filename = path.join(repo, 'shared/engine/yaml-schemas/lesson.scaffold.schema.json'),
) {
  const schema = JSON.parse(fs.readFileSync(filename, 'utf8'));
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  ajv.addFormat('uuid', {
    type: 'string',
    validate: v =>
      uuid.test(v) || v === '00000000-0000-0000-0000-000000000000' || v === 'ffffffff-ffff-ffff-ffff-ffffffffffff',
  });
  const valid = ajv.compile(schema);
  if (!valid(document)) {
    const errors = valid.errors.map(error => {
      const at = error.instancePath || '$';
      const missing = error.params?.missingProperty ? '/' + error.params.missingProperty : '';
      return at + missing + ' ' + error.message;
    });
    fail(
      'schema',
      errors.slice(0, 30).join('; ') + (errors.length > 30 ? '; ... ' + errors.length + ' errors total' : ''),
    );
  }
}

function verifyCollections(value, location = '$') {
  if (Array.isArray(value)) return value.forEach((item, i) => verifyCollections(item, location + '[' + i + ']'));
  if (!record(value)) return;
  if (record(value.items) && Array.isArray(value.order)) {
    const entries = Object.keys(value.items);
    const ordered = value.order;
    if (ordered.length !== new Set(ordered).size) fail(location + '.order', 'duplicate collection keys');
    for (const name of ordered)
      if (!Object.hasOwn(value.items, name))
        fail(location + '.order', 'unknown collection key ' + JSON.stringify(name));
    for (const name of entries) {
      if (value.items[name]?.config?.params?.disabled === true) continue;
      if (!ordered.includes(name)) fail(location + '.order', 'missing enabled item ' + JSON.stringify(name));
    }
  }
  for (const [key, child] of Object.entries(value)) verifyCollections(child, location + '.' + key);
}

function verifyEntities(value, seen = new Set(), location = '$') {
  if (Array.isArray(value)) return value.forEach((item, i) => verifyEntities(item, seen, location + '[' + i + ']'));
  if (!record(value)) return;
  if (record(value.config) && typeof value.config.type === 'string') {
    const id = value.config.id;
    if (!uuid.test(id || '')) fail(location + '.config.id', 'real immutable entity UUID required');
    if (seen.has(id)) fail(location + '.config.id', 'duplicate entity UUID ' + id);
    seen.add(id);
  }
  for (const [name, child] of Object.entries(value)) verifyEntities(child, seen, location + '.' + name);
}

/**
 * An empty language dictionary can satisfy a permissive editor schema while
 * producing no source-language content at all. Reject it before deleting YAML.
 * Entirely omitted optional locale fields remain legitimate draft inputs.
 */
function verifyNonemptyLocaleFields(value, location = '$') {
  if (Array.isArray(value))
    return value.forEach((child, index) => verifyNonemptyLocaleFields(child, location + '[' + index + ']'));
  if (!record(value)) return;
  if (record(value.config) && record(value.config.locale)) {
    for (const [field, localized] of Object.entries(value.config.locale)) {
      if (record(localized) && Object.keys(localized).length === 0)
        fail(location + '.config.locale.' + field, 'empty locale dictionary would emit no authored content');
    }
  }
  for (const [key, child] of Object.entries(value)) verifyNonemptyLocaleFields(child, location + '.' + key);
}

/** All authored production fields survive in a deterministic persistent handoff. */
export function productionHandoff(document) {
  const nodes = [];
  function visit(value, location) {
    if (Array.isArray(value)) return value.forEach((item, i) => visit(item, location + '[' + i + ']'));
    if (!record(value)) return;
    if (record(value.config) && typeof value.config.type === 'string') {
      if (record(value.production))
        nodes.push({
          path: location,
          id: value.config.id,
          type: value.config.type,
          production: value.production,
        });
    }
    for (const [key, child] of Object.entries(value)) if (key !== 'production') visit(child, location + '.' + key);
  }
  visit(document, '$');
  return (
    JSON.stringify(
      { kind: 'svitlo-lesson-production-handoff', version: 1, lessonId: document.config.id, nodes },
      null,
      2,
    ) + '\n'
  );
}

/** Read-only, complete validation at the Resource Production boundary only. */
export function preflightLesson(source, repo = repoRoot) {
  const location = sourceLocation(source, repo);
  const document = parseSource(location.filename);
  validateSchema(document, repo);
  if (document.config.id !== location.lessonId) fail('config.id', 'YAML UUID differs from canonical directory');
  if (typeof document.production?.methodology !== 'string' || !document.production.methodology.trim())
    fail('production.methodology', 'complete Methodology must be authored before Resource Production');
  const language = document.production?.documentLanguage;
  if (!Array.isArray(document.config.params?.languages) || !document.config.params.languages.includes(language))
    fail('production.documentLanguage', 'source language must be included in declared Lesson languages');
  verifyCollections(document);
  verifyEntities(document);
  verifyNonemptyLocaleFields(document);
  if (JSON.stringify(sourceAuthoringCopy(document.config, language)) !== JSON.stringify(document.config))
    fail(
      'config.locale',
      'non-source localized data would be dropped by Lesson Builder; reconcile those translations before finalization',
    );
  return { ...location, document, handoff: productionHandoff(document) };
}

/**
 * Safe transaction-like sequence. A generated source may remain after an
 * interrupted write; in that case recovery is manual and YAML is retained.
 * Injecting validate/generate is for deterministic failure-path regression tests.
 */
export function finalizeLesson(
  source,
  { repo = repoRoot, validate = preflightLesson, generate = runOne, afterGenerate } = {},
) {
  const original = fs.readFileSync(source);
  const item = validate(source, repo);
  if (!item || !item.directory || !item.lessonId || typeof item.handoff !== 'string')
    fail('$', 'preflight did not produce an immutable Lesson destination and production handoff');
  const index = path.join(item.directory, 'index.ts');
  const handoffFile = path.join(item.directory, 'production-handoff.json');
  noSymlinks(index);
  noSymlinks(handoffFile);
  if (fs.existsSync(index))
    fail('index.ts', 'Lesson already scaffolded; create-only skip cannot authorize deleting YAML');
  if (fs.existsSync(handoffFile) && fs.readFileSync(handoffFile, 'utf8') !== item.handoff)
    fail('production', 'existing handoff differs; manual recovery required');
  if (!fs.readFileSync(source).equals(original)) fail('$', 'source changed during preflight');
  const generated = generate(source, 'generate', repo);
  if (
    generated?.skipped ||
    generated?.lessonId !== item.lessonId ||
    !Array.isArray(generated.files) ||
    !generated.files.length
  )
    fail('$', 'builder skipped or returned an incomplete Lesson inventory; preserving YAML');
  if (afterGenerate) afterGenerate(item);
  const checked = generate(source, 'check', repo);
  if (checked?.skipped || checked?.lessonId !== item.lessonId)
    fail('$', 'generated Lesson source did not pass read-only builder check');
  for (const name of generated.files) {
    const destination = path.isAbsolute(name) ? name : path.join(item.directory, name);
    noSymlinks(destination);
    if (!fs.existsSync(destination) || !fs.statSync(destination).isFile())
      fail('$', 'missing generated file: ' + destination);
  }
  const methodFile = path.join(item.directory, 'methodology.md');
  if (!fs.existsSync(methodFile) || !fs.statSync(methodFile).isFile())
    fail('production.methodology', 'Methodology not transferred into persistent methodology.md');
  if (!fs.readFileSync(source).equals(original)) fail('$', 'source changed during scaffold/check; preserving YAML');
  if (!fs.existsSync(handoffFile)) {
    fs.writeFileSync(handoffFile, item.handoff, { flag: 'wx' });
  }
  if (fs.readFileSync(handoffFile, 'utf8') !== item.handoff)
    fail('production', 'persistent production handoff verification failed; preserving YAML');
  if (!fs.readFileSync(source).equals(original)) fail('$', 'source changed before final deletion; preserving YAML');
  fs.unlinkSync(source);
  return { lessonId: item.lessonId, files: [...generated.files, 'production-handoff.json'], removed: source };
}

export function main(args = process.argv.slice(2), repo = repoRoot) {
  const [mode, flag, source] = args;
  if (!['preflight', 'finalize'].includes(mode) || flag !== '--source' || !source || args.length !== 3)
    throw new Error(
      'Usage: node shared/engine/scripts/finalizeLesson/finalizeLesson.mjs preflight|finalize --source content/<book>/data/lessons/<bucket>/<uuid>/lesson.yaml',
    );
  const filename = path.resolve(repo, source);
  const result = mode === 'preflight' ? preflightLesson(filename, repo) : finalizeLesson(filename, { repo });
  console.log(
    mode === 'preflight'
      ? 'Lesson ' + result.lessonId + ': complete YAML preflight valid (read-only)'
      : 'Lesson ' + result.lessonId + ': ' + result.files.length + ' persistent outputs verified; lesson.yaml removed',
  );
  return result;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
