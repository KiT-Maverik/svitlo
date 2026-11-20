#!/usr/bin/env node
/**
 * @fileoverview Create-only, deterministic Flashcard bank YAML -> typed TS scaffolder.
 *
 * Input is the single Lesson-owned flashcards.yaml, containing a source-language
 * Engine-shaped Config bank plus a canonical relationship edge map. The card
 * schema is imported from Engine; this is NOT a competing editorial schema.
 *
 * The program does not approve educational content, translate, infer Questions
 * or media, generate Props, or publish assessment resources. Existing authored
 * TypeScript is NEVER overwritten. YAML stays intact until independent review
 * and faithful production have been confirmed outside this draft scaffolder.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import yaml from 'yaml';
import { verifyFlashcardsSelections } from './verifyFlashcardsSections.mjs';

const require = createRequire(import.meta.url);
const {
  yamlFlashcard_Schema,
  languageCode_Schema,
  flashcardRelationshipTypes,
  yamlFactoryByType,
} = require('../../dist/build.js');
const root = path.resolve(fileURLToPath(new URL('../../../..', import.meta.url)));
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const slug = /^[a-z][A-Za-z0-9]*$/;
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
// Media-shaped YAML is a source-only draft: the regular Lesson/YAML Config
// projection intentionally omits physical filenames. Never guess assets.
const mediaBlocks = new Set(['audio', 'image', 'video', 'subtitles']);
const supportedBlocks = new Set(['text', 'markdown', 'code', ...mediaBlocks]);

function ensure(value, message) {
  if (!value) throw new Error('flashcards.yaml: ' + message);
}
function ordered(value, label, min = 0) {
  ensure(isRecord(value) && isRecord(value.items) && Array.isArray(value.order), label + ' must be items/order');
  const keys = Object.keys(value.items);
  ensure(keys.length >= min, label + ' needs at least ' + min + ' item(s)');
  ensure(new Set(value.order).size === value.order.length, label + ' contains duplicate order keys');
  ensure(
    keys.length === value.order.length && value.order.every(key => keys.includes(key)),
    label + '.order must contain every item exactly once',
  );
  for (const key of keys) ensure(slug.test(key), label + ' has an unsafe slug ' + key);
}

/** Check only actually authored locale dictionaries, not the Lesson's planned language tuple. */
function validateSourceLocales(value, sourceLanguage, context) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => validateSourceLocales(entry, sourceLanguage, context + '[' + index + ']'));
    return;
  }
  if (!isRecord(value)) return;
  const keys = Object.keys(value);
  if (keys.length > 0 && keys.every(key => languageCode_Schema.safeParse(key).success)) {
    ensure(
      keys.length === 1 && keys[0] === sourceLanguage,
      context + ' must author only documentLanguage ' + sourceLanguage + '; other locales belong to translation',
    );
    return;
  }
  for (const [key, item] of Object.entries(value)) {
    validateSourceLocales(item, sourceLanguage, context + '.' + key);
  }
}

function safeFilesystemPath(location) {
  let current = path.parse(path.resolve(location)).root;
  for (const part of path.resolve(location).slice(current.length).split(path.sep).filter(Boolean)) {
    current = path.join(current, part);
    if (fs.existsSync(current) && fs.lstatSync(current).isSymbolicLink())
      throw new Error('Refusing symlink: ' + current);
  }
}
function sourceDocument(source) {
  safeFilesystemPath(source);
  const parsed = yaml.parseDocument(fs.readFileSync(source, 'utf8'), {
    strict: true,
    uniqueKeys: true,
    version: '1.2',
  });
  ensure(parsed.errors.length === 0, parsed.errors.map(error => error.message).join('; '));
  const value = parsed.toJS({ maxAliasCount: 0 });
  ensure(isRecord(value), 'expected a mapping');
  return value;
}

/** Canonical edge authored once; each card receives one mirrored, typed relation. */
function materializeRelationships(cards, graph) {
  ordered(graph, 'relationships');
  const keys = new Set();
  const relationshipIds = new Set();
  const symmetric = new Set(['reverse', 'equivalent', 'contrast', 'complementary']);
  const result = new Map(Object.keys(cards).map(name => [name, { items: {}, order: [] }]));
  const append = (cardName, linkName, type, relatedId, position, id) => {
    const collection = result.get(cardName);
    ensure(!Object.hasOwn(collection.items, linkName), 'duplicate relationship for ' + cardName);
    collection.items[linkName] = { relationshipId: id, type, relatedFlashcardId: relatedId, position };
    collection.order.push(linkName);
  };
  for (const linkName of graph.order) {
    const link = graph.items[linkName];
    ensure(
      isRecord(link) && Object.keys(link).every(key => ['relationshipId', 'type', 'source', 'target'].includes(key)),
      'invalid canonical relationship ' + linkName,
    );
    ensure(
      typeof link.relationshipId === 'string' && link.relationshipId.length > 0,
      'missing relationshipId at ' + linkName,
    );
    ensure(!relationshipIds.has(link.relationshipId), 'duplicate Flashcard relationship ID: ' + link.relationshipId);
    relationshipIds.add(link.relationshipId);
    ensure(flashcardRelationshipTypes.includes(link.type), 'invalid relation type at ' + linkName);
    ensure(
      Object.hasOwn(cards, link.source) && Object.hasOwn(cards, link.target),
      'relation references a missing card: ' + linkName,
    );
    ensure(link.source !== link.target, 'self-linked Flashcard ' + linkName);
    const pair = symmetric.has(link.type)
      ? [link.source, link.target].sort().join(':')
      : link.source + ':' + link.target;
    const key = link.type + ':' + pair;
    ensure(!keys.has(key), 'duplicate Flashcard relationship: ' + key);
    keys.add(key);
    const position = symmetric.has(link.type) ? 'peer' : 'source';
    append(link.source, linkName, link.type, cards[link.target].id, position, link.relationshipId);
    append(
      link.target,
      linkName,
      link.type,
      cards[link.source].id,
      symmetric.has(link.type) ? 'peer' : 'target',
      link.relationshipId,
    );
  }
  return result;
}

/**
 * Rendering is pure: no directory traversal or runtime Props publication.
 * A deliberately unsupported external Question-field/media reference is a
 * visible blocker, never a substitute literal or a fabricated UUID.
 */
export function renderFlashcardBank(bank) {
  ensure(isRecord(bank), 'bank is not a mapping');
  ensure(
    Object.keys(bank).every(key =>
      ['lessonId', 'documentLanguage', 'supportedLanguages', 'flashcards', 'relationships', 'sectionDrafts'].includes(
        key,
      ),
    ),
    'unknown top-level field',
  );
  ensure(uuid.test(bank.lessonId), 'invalid existing Lesson UUID');
  const sourceLanguage = languageCode_Schema.parse(bank.documentLanguage);
  ensure(
    Array.isArray(bank.supportedLanguages) && bank.supportedLanguages.length > 0,
    'supportedLanguages must not be empty',
  );
  bank.supportedLanguages.forEach(language => languageCode_Schema.parse(language));
  ensure(new Set(bank.supportedLanguages).size === bank.supportedLanguages.length, 'duplicate supported language');
  ensure(bank.supportedLanguages.includes(sourceLanguage), 'documentLanguage must be a Lesson-supported language');
  ordered(bank.flashcards, 'flashcards', 1);
  const cards = {};
  const ids = new Set();
  const nestedIds = new Set();
  const factories = new Set(['defineFlashcard', 'defineFlashcardSide']);

  for (const name of bank.flashcards.order) {
    const parsed = yamlFlashcard_Schema.parse(bank.flashcards.items[name]);
    ensure(parsed.slug === name, 'Flashcard slug/map mismatch: ' + name);
    const builtInFlags = new Set();
    for (const [index, flag] of parsed.parameters.flags.entries()) {
      if ('value' in flag) validateSourceLocales(flag.value, sourceLanguage, name + '.flags.' + index);
      if (flag.type !== 'custom') {
        ensure(!builtInFlags.has(flag.type), 'Duplicate built-in Flashcard flag: ' + flag.type);
        builtInFlags.add(flag.type);
      }
    }
    ensure(!ids.has(parsed.id), 'duplicate Flashcard UUID: ' + parsed.id);
    ids.add(parsed.id);
    ensure(
      !parsed.parameters.relationships || parsed.parameters.relationships.order.length === 0,
      'author relations once in the canonical bank relationships collection',
    );
    for (const sideName of ['front', 'back', 'hint']) {
      const side = parsed.content[sideName];
      if (!side) continue;
      ordered(side, name + '.' + sideName, sideName === 'hint' ? 0 : 1);
      for (const key of side.order) {
        const block = side.items[key];
        ensure(block.slug === key, name + '.' + sideName + ' slug/map mismatch');
        validateSourceLocales(block.locale, sourceLanguage, name + '.' + sideName + '.' + key + '.locale');
        if (block.params?.variables) {
          validateSourceLocales(
            block.params.variables,
            sourceLanguage,
            name + '.' + sideName + '.' + key + '.variables',
          );
        }
        ensure(!nestedIds.has(block.id) && !ids.has(block.id), 'duplicate ContentBlock UUID ' + block.id);
        nestedIds.add(block.id);
        ensure(
          supportedBlocks.has(block.type),
          'block type ' + block.type + ' needs a separately verified Configurator handoff; no fabricated fallback',
        );
        factories.add(yamlFactoryByType[block.type]);
      }
    }
    cards[name] = structuredClone(parsed);
  }
  ensure(Object.keys(bank.flashcards.items).length === bank.flashcards.order.length, 'unexpected cards');
  for (const id of ids) ensure(!nestedIds.has(id), 'Flashcard UUID reused as ContentBlock UUID: ' + id);

  const edges = materializeRelationships(cards, bank.relationships ?? { items: {}, order: [] });
  const literal = value => JSON.stringify(value, null, 2);
  const blockExpression = block => {
    const call = yamlFactoryByType[block.type] + '(' + literal(block) + ')';
    if (!mediaBlocks.has(block.type)) return call;
    // Existing Engine YAML projections deliberately omit these fields; leaving
    // the typed Config incomplete is safer than inventing a filename or UUID.
    const fields = block.type === 'video' ? 'fileName and posterFileName' : 'fileName';
    return (
      '/* TODO (BLOCKER): ' +
      block.type +
      ' media resource(s) unresolved. Verify physical assets and complete filename fields before merge. */\n' +
      '/* TODO(asset): Verify an existing ' +
      block.type +
      ' resource at the pinned Lesson SHA; populate locale.' +
      fields +
      ' in this new Flashcard-owned block. This draft is NOT publishable. */\n' +
      call
    );
  };
  const sideExpression = side =>
    'defineFlashcardSide({ items: {' +
    side.order.map(name => JSON.stringify(name) + ': ' + blockExpression(side.items[name])).join(', ') +
    '}, order: ' +
    literal(side.order) +
    ' })';

  const declarations = bank.flashcards.order.map((name, index) => {
    const card = cards[name];
    const { content, ...metadata } = card;
    metadata.parameters.disabilities ??= [];
    const relations = edges.get(name);
    if (relations.order.length) metadata.parameters.relationships = relations;
    const sides = ['front', 'back', 'hint']
      .filter(key => content[key])
      .map(key => key + ': ' + sideExpression(content[key]))
      .join(',\n    ');
    return (
      'const flashcard_' +
      index +
      ' = defineFlashcard({\n' +
      '  ...' +
      literal(metadata) +
      ',\n' +
      '  content: {\n    ' +
      sides +
      '\n  },\n});'
    );
  });
  return [
    '// Generated source-language scaffold. Do not mistake this for editorial approval or final translation.',
    '// Lesson UUID: ' + bank.lessonId + '; documentLanguage: ' + sourceLanguage,
    '// Planned Lesson languages: ' + bank.supportedLanguages.join(', '),
    'import { ' + [...factories].sort().join(', ') + " } from '@svitlo/engine/build';",
    '',
    ...declarations,
    '',
    'export const flashcards = { items: { ' +
      bank.flashcards.order.map((name, index) => JSON.stringify(name) + ': flashcard_' + index).join(', ') +
      ' } };',
    '',
  ].join('\n');
}

export function runOne(packageRoot, lessonId, mode, repositoryRoot = root) {
  ensure(['--preflight', '--write', '--check', '--verify-sections'].includes(mode), 'unknown execution mode');
  ensure(uuid.test(lessonId), 'invalid Lesson UUID');
  const textbook = path.resolve(packageRoot);
  const contentRoot = path.resolve(repositoryRoot, 'content') + path.sep;
  ensure(
    textbook.startsWith(contentRoot) && fs.existsSync(path.join(textbook, 'package.json')),
    'not a textbook workspace',
  );
  const lesson = path.join(textbook, 'data', 'lessons', lessonId.at(-1), lessonId);
  const source = path.join(lesson, 'flashcards.yaml');
  const target = path.join(lesson, 'flashcards', 'index.ts');
  safeFilesystemPath(source);
  safeFilesystemPath(target);
  // Existing refined TypeScript is authoritative; skip before parsing stale YAML.
  if (mode === '--write' && fs.existsSync(target))
    return { created: false, skipped: true, reason: 'existing authored Flashcard entrypoint' };
  if (mode === '--write' && fs.existsSync(path.dirname(target)) && fs.readdirSync(path.dirname(target)).length)
    throw new Error('Partial Flashcard Bank tree exists; refusing to mix drafts: ' + path.dirname(target));
  ensure(fs.existsSync(source), 'missing ' + source);
  const bank = sourceDocument(source);
  ensure(bank.lessonId === lessonId, 'YAML Lesson UUID disagrees with canonical path');
  const code = renderFlashcardBank(bank);
  if (mode === '--verify-sections') {
    ensure(fs.existsSync(target), 'missing authored Flashcard TS entrypoint: ' + target);
    return verifyFlashcardsSelections(
      lesson,
      bank.flashcards.order.map(name => bank.flashcards.items[name].id),
    );
  }
  if (mode === '--preflight') return { created: false, bytes: code.length };
  if (fs.existsSync(target)) {
    ensure(
      fs.readFileSync(target, 'utf8') === code,
      'stale or manually edited Flashcard TypeScript; --check is only for untouched scaffolds',
    );
    return { created: false, bytes: code.length };
  }
  if (mode === '--check') throw new Error('missing Flashcard TS scaffold: ' + target);
  // Create-only; do not delete YAML even when source TS was materialized successfully.
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, code, { flag: 'wx' });
  return { created: true, bytes: code.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    let packageName, lessonId, mode;
    const args = process.argv.slice(2);
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '--package' && !packageName) packageName = args[++i];
      else if (args[i] === '--lesson' && !lessonId) lessonId = args[++i];
      else if (['--preflight', '--write', '--check', '--verify-sections'].includes(args[i]) && !mode) mode = args[i];
      else
        throw new Error(
          'Usage: --package content/<book> --lesson <uuid> --preflight|--write|--check|--verify-sections',
        );
    }
    if (!packageName || !lessonId || !mode) throw new Error('Missing --package, --lesson or mode');
    const result = runOne(path.join(root, packageName), lessonId, mode);
    console.log(JSON.stringify(result));
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
