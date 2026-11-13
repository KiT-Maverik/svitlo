#!/usr/bin/env node
/**
 * @fileoverview Deterministic Course YAML -> TypeScript DRAFT scaffolder.
 *
 * This is a token-saving mechanical authoring aid, not a validator, approval
 * gate, translator, Lesson resolver, TypeScript checker or Props publisher.
 * The resulting Course Config may deliberately be incomplete. An AI editor
 * finishes missing fields, translations, Lesson imports and sparse overrides.
 *
 * Studio's older skill-based toc.yaml is accepted as a partial editorial
 * source. The Engine Config format (type: course, content.items/order) is also
 * accepted directly. Editorial data not mapped to Config remains in YAML.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import { loadFactoryRegistry } from '../yamlDraft/loadFactoryRegistry.mjs';

const repoRoot = path.resolve(fileURLToPath(new URL('../../../..', import.meta.url)));
const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const PACKAGE = /^content\/[a-z][a-z0-9-]*$/;
const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const marker = '// SCAFFOLDED BY shared/engine/scripts/courseBuilder/courseBuilder.mjs; AI DRAFT.\n';
const factories = loadFactoryRegistry();

function fail(code, description) {
  throw new Error('Course Scaffolder [' + code + ']: ' + description);
}
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const literal = value => JSON.stringify(value);

export function parseCourseYaml(text, filename = 'course.yaml') {
  const document = YAML.parseDocument(text, { strict: true, uniqueKeys: true, version: '1.2' });
  if (document.errors.length) fail('YAML', filename + ': ' + document.errors.map(x => x.message).join('; '));
  const value = document.toJS({ maxAliasCount: 0 });
  if (!record(value)) fail('YAML', filename + ': expected a root YAML mapping');
  return value;
}

function selectedFactory(node, location) {
  if (!record(node) || typeof node.type !== 'string' || !node.type) {
    fail('TYPE', location + ': missing required type discriminator');
  }
  if (node.type !== 'lesson' && !Object.hasOwn(factories, node.type)) {
    fail('TYPE', location + ': unknown type discriminator ' + literal(node.type));
  }
  return node.type === 'lesson' ? null : factories[node.type];
}

function localeTitle(value, documentLanguage) {
  if (record(value) && value.invariant === true) return value.value;
  if (typeof value === 'string' && typeof documentLanguage === 'string') return { [documentLanguage]: value };
  return value;
}

/** Map only editorial fields that are directly representable as Engine Config. */
function fromEditorialNode(node, language, location) {
  selectedFactory(node, location);
  if (node.type === 'lesson') {
    return {
      type: 'lesson',
      ...(node.lessonId !== undefined ? { lessonId: node.lessonId } : {}),
      ...(node.slug !== undefined || node.key !== undefined ? { slug: node.slug ?? node.key } : {}),
      ...(node.source !== undefined ? { source: node.source } : {}),
    };
  }
  if (node.type === 'module' || node.type === 'chapter') {
    const result = {
      type: node.type,
      ...(node.id !== undefined ? { id: node.id } : {}),
      ...(node.slug !== undefined || node.key !== undefined ? { slug: node.slug ?? node.key } : {}),
      ...(node.params !== undefined ? { params: node.params } : {}),
      ...(node.title !== undefined ? { locale: { title: localeTitle(node.title, language) } } : {}),
    };
    if (node.content !== undefined) result.content = node.content;
    else if (Array.isArray(node.children)) result.content = editorialContent(node.children, language, location + '.children');
    return result;
  }
  return node; // An explicitly authored Episode is already Config-shaped.
}

function editorialContent(nodes, language, location) {
  const items = {};
  const order = [];
  nodes.forEach((node, index) => {
    const address = location + '[' + index + ']';
    selectedFactory(node, address);
    const key = node.slug ?? node.key;
    if (typeof key !== 'string' || !key || ['__proto__', 'constructor', 'prototype'].includes(key)) {
      fail('KEY', address + ': a safe editorial key/slug is required to form content.items');
    }
    if (Object.hasOwn(items, key)) fail('KEY', address + ': duplicate editorial key ' + key);
    items[key] = fromEditorialNode(node, language, address);
    order.push(key);
  });
  return { items, order };
}

export function normalizeCourseSource(source, slug) {
  if (source.type === 'course') return source;
  if (source.kind !== 'course-toc-plan' || !Array.isArray(source.content)) {
    fail('TYPE', 'course.yaml: missing or unknown Course type discriminator');
  }
  return {
    type: 'course',
    ...(source.courseId !== undefined ? { id: source.courseId } : {}),
    ...(source.slug !== undefined || slug !== undefined ? { slug: source.slug ?? slug } : {}),
    ...(source.supportedLanguages !== undefined ? { params: { languages: source.supportedLanguages } } : {}),
    ...(source.title !== undefined || source.description !== undefined
      ? {
          locale: {
            ...(source.title !== undefined ? { title: localeTitle(source.title, source.documentLanguage) } : {}),
            ...(source.description !== undefined
              ? { description: localeTitle(source.description, source.documentLanguage) }
              : {}),
          },
        }
      : {}),
    content: editorialContent(source.content, source.documentLanguage, 'content'),
  };
}

function safeImport(reference) {
  if (!record(reference) || typeof reference.path !== 'string' || !IDENTIFIER.test(reference.export ?? '')) {
    return null;
  }
  const p = reference.path;
  if (
    p.startsWith('/') ||
    p.includes('\\') ||
    p.includes(':') ||
    p.split('/').some(part => !part || part === '.' || part === '..') ||
    !/\.tsx?$/.test(p)
  ) return null;
  return { path: './' + p.replace(/\.tsx?$/, ''), symbol: reference.export };
}

function lessonExpression(node, state, location) {
  const lessonId = typeof node.lessonId === 'string' ? node.lessonId : '(missing lessonId)';
  const reference = safeImport(node.source);
  if (reference) {
    const key = reference.path + '#' + reference.symbol;
    if (!state.lessonImports.has(key)) {
      state.lessonImports.set(key, { ...reference, alias: 'standaloneLesson' + state.lessonImports.size });
    }
    return state.lessonImports.get(key).alias;
  }
  const alias = 'UNRESOLVED_LESSON_' + state.unresolved.length;
  state.unresolved.push({ alias, lessonId, location });
  return alias;
}

/**
 * Only Config collections contain factory children. Other nested objects,
 * including events/metadata, are copied verbatim with no guessed semantics.
 */
const typedCollections = {
  course: ['content'],
  module: ['content'],
  chapter: ['content'],
  episode: ['section'],
  content: ['content'],
  practice: ['content'],
  codingTask: ['content'],
  learningFlow: ['content'],
  flashcards: ['content'],
  quiz: ['content'],
  carousel: ['slides'],
  checkpoint: ['content'],
  checkpointItem: ['answer'],
  flashcard: ['content'],
};

function renderValue(value, state, indent, location, typedItems = false) {
  const space = '  '.repeat(indent);
  const inner = '  '.repeat(indent + 1);
  if (Array.isArray(value)) {
    if (!value.length) return '[]';
    return '[\n' + value.map((entry, index) =>
      inner + renderValue(entry, state, indent + 1, location + '[' + index + ']') + ','
    ).join('\n') + '\n' + space + ']';
  }
  if (!record(value)) return literal(value);
  const entries = Object.entries(value);
  if (!entries.length) return '{}';
  return '{\n' + entries.map(([key, child]) => {
    const nextLocation = location + '.' + key;
    const expression = typedItems
      ? renderEntity(child, state, indent + 1, nextLocation)
      : renderValue(child, state, indent + 1, nextLocation);
    return inner + literal(key) + ': ' + expression + ',';
  }).join('\n') + '\n' + space + '}';
}

function renderConfigFields(node, state, indent, location) {
  const space = '  '.repeat(indent);
  const inner = '  '.repeat(indent + 1);
  const fields = Object.entries(node);
  return '{\n' + fields.map(([key, value]) => {
    const collection = (typedCollections[node.type] ?? []).includes(key);
    let expression;
    if (node.type === 'checkpointItem' && key === 'question') {
      expression = renderEntity(value, state, indent + 1, location + '.question');
    } else if (collection && record(value) && record(value.items)) {
      const properties = Object.entries(value).map(([field, child]) => {
        const rendered = field === 'items'
          ? renderValue(child, state, indent + 2, location + '.' + key + '.items', true)
          : renderValue(child, state, indent + 2, location + '.' + key + '.' + field);
        return '  '.repeat(indent + 2) + literal(field) + ': ' + rendered + ',';
      });
      expression = '{\n' + properties.join('\n') + '\n' + inner + '}';
    } else {
      expression = renderValue(value, state, indent + 1, location + '.' + key);
    }
    return inner + literal(key) + ': ' + expression + ',';
  }).join('\n') + '\n' + space + '}';
}

function renderEntity(node, state, indent, location) {
  const factory = selectedFactory(node, location);
  if (node.type === 'lesson') return lessonExpression(node, state, location);
  state.imports.add(factory);
  return factory + '(' + renderConfigFields(node, state, indent, location) + ')';
}

function exportIdentifier(slug) {
  const value = slug.replace(/[^A-Za-z0-9_$]/g, '_');
  return IDENTIFIER.test(value) ? value : 'course_' + value;
}

export function renderCourseSource(source, { slug, outputSlug, overrides } = {}) {
  const course = normalizeCourseSource(source, slug);
  const fileSlug = outputSlug ?? slug ?? course.slug ?? (typeof course.id === 'string' ? 'course_' + course.id.slice(0, 8) : 'course_draft');
  const symbol = exportIdentifier(fileSlug) + '_Course';
  const state = { imports: new Set(), lessonImports: new Map(), unresolved: [] };
  const expression = renderEntity(course, state, 0, 'course');
  const imports = [...state.imports].sort();
  const lines = [
    marker.trimEnd(),
    '// Incomplete source-language authoring draft; NOT validated, localized or publishable.',
    'import { ' + imports.join(', ') + ' } from "@svitlo/engine/build";',
    ...[...state.lessonImports.values()].map(ref =>
      'import { ' + ref.symbol + ' as ' + ref.alias + ' } from ' + literal(ref.path) + ';'
    ),
    '',
    ...state.unresolved.map(ref =>
      '// TODO: Import standalone Lesson ' + literal(ref.lessonId) + ' for ' + literal(ref.location) +
      ' and replace ' + ref.alias + '. Never define a new Lesson here.'
    ),
    ...(state.unresolved.length ? [''] : []),
    'export const ' + symbol + ' = ' + expression + ';',
  ];
  if (overrides !== undefined) {
    // Old operation lists have no proven 1:1 mapping to the current sparse API.
    // Preserve source references/slot identities intact, without inventing a patch.
    lines.push(
      '',
      '// Course-owned sparse override handoff. Preserve Lesson identities and source refs.',
      '// TODO: Map editorial operations into ' + symbol +
        '.build.overrides({ content: { items: { /* keyed patches */ } } }, { languages: ... }).',
      '// The old createLessonOverrides operation DSL is NOT a supported Engine API.',
      'export const ' + exportIdentifier(fileSlug) + '_OverrideEditorial = ' +
        renderValue(overrides, state, 0, 'overrides') + ' as const;',
    );
  }
  return lines.join('\n') + '\n';
}

function noSymlinkComponents(target) {
  const absolute = path.resolve(target);
  let current = path.parse(absolute).root;
  for (const piece of absolute.slice(current.length).split(path.sep).filter(Boolean)) {
    current = path.join(current, piece);
    if (fs.existsSync(current) && fs.lstatSync(current).isSymbolicLink()) {
      fail('PATH', 'refusing symlink component: ' + current);
    }
  }
}

export function verifyOrWriteGenerated(filename, rendered, action) {
  if (action !== '--write' && action !== '--check') fail('ARGS', 'choose --write or --check');
  noSymlinkComponents(filename);
  const existing = fs.existsSync(filename) ? fs.readFileSync(filename, 'utf8') : undefined;
  if (existing === rendered) return false;
  if (action === '--check') fail('STALE', 'missing or changed Course draft: ' + filename);
  if (existing !== undefined) {
    // Even scaffolded files may subsequently contain human/AI edits: never clobber.
    fail('OWNERSHIP', 'existing draft differs; refusing to overwrite: ' + filename);
  }
  fs.writeFileSync(filename, rendered, { encoding: 'utf8', flag: 'wx' });
  return true;
}

export function parseArguments(args) {
  let packagePath, courseId, slug, sourceFilename, action;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--package') packagePath = args[++i];
    else if (arg === '--course') courseId = args[++i];
    else if (arg === '--slug') slug = args[++i];
    else if (arg === '--source') sourceFilename = args[++i];
    else if (arg === '--write' || arg === '--check') {
      if (action) fail('ARGS', 'choose exactly one action');
      action = arg;
    } else fail('ARGS', 'unknown option: ' + arg);
  }
  if (
    !PACKAGE.test(packagePath ?? '') || !UUID.test(courseId ?? '') ||
    (slug !== undefined && !/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(slug)) ||
    (sourceFilename !== undefined && !['toc.yaml', 'course.yaml'].includes(sourceFilename)) ||
    !action
  ) {
    fail('ARGS', 'usage: --package content/<book> --course <uuid> [--slug <slug>] ' +
      '[--source toc.yaml|course.yaml] --write|--check');
  }
  return { packagePath, courseId, slug, sourceFilename, action };
}

export async function main(args) {
  const options = parseArguments(args);
  const courseFolder = path.join(repoRoot, options.packagePath, 'data/courses',
    options.courseId.at(-1), options.courseId);
  noSymlinkComponents(courseFolder);
  const sourceFilename = options.sourceFilename ??
    (fs.existsSync(path.join(courseFolder, 'course.yaml')) ? 'course.yaml' : 'toc.yaml');
  const input = path.join(courseFolder, sourceFilename);
  noSymlinkComponents(input);
  if (!fs.existsSync(input)) fail('INPUT', 'missing Course YAML: ' + input);
  const source = parseCourseYaml(fs.readFileSync(input, 'utf8'), sourceFilename);
  const overridesFilename = path.join(courseFolder, 'overrides.yaml');
  noSymlinkComponents(overridesFilename);
  const overrides = fs.existsSync(overridesFilename)
    ? parseCourseYaml(fs.readFileSync(overridesFilename, 'utf8'), 'overrides.yaml')
    : undefined;
  const normalized = normalizeCourseSource(source, options.slug);
  const fileSlug = options.slug ?? normalized.slug ??
    (typeof normalized.id === 'string' ? 'course_' + normalized.id.slice(0, 8) : 'course_draft');
  if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(fileSlug)) fail('SLUG', 'unsafe output slug: ' + fileSlug);
  const filename = path.join(courseFolder, fileSlug + '.data.ts');
  const content = renderCourseSource(source, { slug: options.slug, outputSlug: fileSlug, overrides });
  const changed = verifyOrWriteGenerated(filename, content, options.action);
  console.log((changed ? 'Scaffolded ' : 'Checked ') + filename +
    '; draft requires AI completion (no schema/TS/publication checks)');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
