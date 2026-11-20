/**
 * Static, read-only canonical Flashcard-bank -> bounded locale Markdown references.
 * Never execute unreviewed authored TS or invent translations; fail closed for
 * dynamic/external expressions, unsafe paths and incomplete scoped documents.
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const LANGUAGE = /^[a-z]{2,4}$/;
const BOOK = /^[a-z][a-z0-9-]*$/;
const SLUG = /^[a-z][A-Za-z0-9]*$/;
const MAX_FILE = 2 * 1024 * 1024;

function record(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function safeFile(filename, root) {
  let current = path.resolve(root);
  const relative = path.relative(current, path.resolve(filename));
  if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Unsafe Flashcard source path');
  for (const piece of relative.split(path.sep).filter(Boolean)) {
    current = path.join(current, piece);
    if (!fs.existsSync(current)) throw new Error('Missing Flashcard source: ' + current);
    if (fs.lstatSync(current).isSymbolicLink()) throw new Error('Symlinked Flashcard source: ' + current);
  }
  const stat = fs.statSync(filename);
  if (!stat.isFile() || stat.size > MAX_FILE) throw new Error('Unsafe Flashcard source size/type: ' + filename);
}
function staticValue(node, definitions, location, active = new Set()) {
  while (node && (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node))) {
    node = node.expression;
  }
  if (!node) throw new Error('Missing static Flashcard value: ' + location);
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isIdentifier(node)) {
    if (!definitions.has(node.text) || active.has(node.text)) {
      throw new Error('Unknown or cyclic Flashcard reference: ' + location + '/' + node.text);
    }
    const visited = new Set(active);
    visited.add(node.text);
    return staticValue(definitions.get(node.text), definitions, location + '/' + node.text, visited);
  }
  if (ts.isArrayLiteralExpression(node))
    return node.elements.map((child, i) => staticValue(child, definitions, location + '[' + i + ']', active));
  if (ts.isObjectLiteralExpression(node)) {
    const output = Object.create(null);
    for (const prop of node.properties) {
      if (ts.isSpreadAssignment(prop)) {
        const spread = staticValue(prop.expression, definitions, location + '/spread', active);
        if (!record(spread)) throw new Error('Flashcard spread is not a static object: ' + location);
        for (const [key, value] of Object.entries(spread)) {
          if (Object.hasOwn(output, key)) throw new Error('Repeated Flashcard field: ' + location + '/' + key);
          output[key] = value;
        }
        continue;
      }
      if (!ts.isPropertyAssignment(prop) && !ts.isShorthandPropertyAssignment(prop))
        throw new Error('Non-static Flashcard property: ' + location);
      const key = ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name) ? prop.name.text : null;
      if (!key || ['__proto__', 'constructor', 'prototype'].includes(key) || Object.hasOwn(output, key))
        throw new Error('Unsafe/duplicate Flashcard property: ' + location + '/' + String(key));
      output[key] = staticValue(
        ts.isShorthandPropertyAssignment(prop) ? prop.name : prop.initializer,
        definitions,
        location + '/' + key,
        active,
      );
    }
    return output;
  }
  if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.arguments.length === 1 &&
      /^define[A-Z][A-Za-z0-9]*$/.test(node.expression.text)) {
    return staticValue(node.arguments[0], definitions, location, active);
  }
  throw new Error('Non-static Flashcard expression: ' + location + ' (' + ts.SyntaxKind[node.kind] + ')');
}
function loadBank(filename, root, lessonId) {
  safeFile(filename, root);
  const source = fs.readFileSync(filename, 'utf8');
  const meta = /^\/\/ Lesson UUID: ([0-9a-f-]{36}); documentLanguage: ([a-z]{2,4})\s*$/m.exec(source);
  if (!meta || meta[1] !== lessonId) throw new Error('Flashcard source missing matching Lesson UUID/language header');
  const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (ast.parseDiagnostics.length) throw new Error('Invalid authored Flashcard TypeScript syntax');
  const definitions = new Map();
  for (const statement of ast.statements) {
    if (ts.isImportDeclaration(statement)) {
      if (!ts.isStringLiteral(statement.moduleSpecifier) ||
          statement.moduleSpecifier.text !== '@svitlo/engine/build') {
        throw new Error('Noncanonical import in Flashcard bank: ' + filename);
      }
    }
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !declaration.initializer ||
          definitions.has(declaration.name.text)) throw new Error('Invalid Flashcard declaration');
      definitions.set(declaration.name.text, declaration.initializer);
    }
  }
  if (!definitions.has('flashcards')) throw new Error('Missing canonical flashcards export');
  const registry = staticValue(definitions.get('flashcards'), definitions, 'flashcards');
  if (!record(registry) || !record(registry.items) || !Object.keys(registry.items).length ||
      Object.keys(registry).some(key => key !== 'items')) throw new Error('Invalid Flashcard bank registry');
  const cards = Object.entries(registry.items).map(([name, card]) => {
    if (!SLUG.test(name) || !record(card) || card.slug !== name || !UUID.test(card.id ?? ''))
      throw new Error('Flashcard slug or UUID mismatch at ' + name);
    if (!record(card.content) || !record(card.parameters) || !record(card.content.front) ||
        !record(card.content.back)) throw new Error('Flashcard missing front/back/parameters: ' + name);
    for (const side of ['front', 'back', 'hint']) {
      const group = card.content[side];
      if (!group) continue;
      if (!record(group.items) || !Array.isArray(group.order) || (side !== 'hint' && !group.order.length) ||
          new Set(group.order).size !== group.order.length || group.order.length !== Object.keys(group.items).length ||
          group.order.some(slug => !Object.hasOwn(group.items, slug))) {
        throw new Error('Invalid ordered Flashcard ' + name + '/' + side);
      }
      for (const slug of group.order) {
        const block = group.items[slug];
        if (!record(block) || block.slug !== slug || !UUID.test(block.id ?? '') || typeof block.type !== 'string')
          throw new Error('Invalid Flashcard block: ' + name + '/' + side + '/' + slug);
      }
    }
    return card;
  });
  if (new Set(cards.map(card => card.id.toLowerCase())).size !== cards.length)
    throw new Error('Duplicate Flashcard UUID in bank');
  return { cards, sourceLanguage: meta[2] };
}
function safeText(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('|', '\\|').replaceAll('\r', '').replaceAll('\n', ' ⏎ ');
}
function localizedValues(value, place, sourceLanguage, locale, lines, result) {
  if (!record(value)) {
    if (Array.isArray(value)) value.forEach((child, i) =>
      localizedValues(child, place + '[' + i + ']', sourceLanguage, locale, lines, result));
    return;
  }
  const keys = Object.keys(value);
  if (keys.length && keys.every(key => LANGUAGE.test(key))) {
    const source = value[sourceLanguage];
    if (typeof source !== 'string' || !source.trim())
      throw new Error('Missing source-language Flashcard text at ' + place + '/' + sourceLanguage);
    const translated = value[locale];
    const valid = typeof translated === 'string' && Boolean(translated.trim());
    lines.push('#### ' + safeText(place), '',
      '- ' + sourceLanguage + ': ' + safeText(source),
      '- ' + locale + ': ' + (valid ? safeText(translated) : '%%MISSING%%'), '');
    result.strings++;
    if (!valid) result.missing++;
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    if (['id', 'slug', 'type', 'relationshipId', 'relatedFlashcardId', 'position'].includes(key)) continue;
    localizedValues(child, place + '/' + key, sourceLanguage, locale, lines, result);
  }
}
function discover(root, book, requested) {
  const source = path.join(root, 'content', book, 'data/lessons');
  if (!fs.existsSync(source)) throw new Error('No Lesson sources for Flashcards');
  const output = [];
  for (const bucket of fs.readdirSync(source).sort()) {
    if (!/^[0-9a-f]$/.test(bucket)) continue;
    for (const id of fs.readdirSync(path.join(source, bucket)).sort()) {
      if (!UUID.test(id) || id.at(-1) !== bucket || (requested && id !== requested)) continue;
      const file = path.join(source, bucket, id, 'flashcards', 'index.ts');
      if (fs.existsSync(file)) output.push({ bucket, id, file });
    }
  }
  if (!output.length) throw new Error('No authored Flashcard bank in selected Lesson scope');
  return output;
}
export function generateFlashcardReviewArtifacts({
  root, output, manifest, saveManifest, packageName, lessonId = null, languages,
}) {
  if (typeof packageName !== 'string' || !/^content\/[a-z][a-z0-9-]*$/.test(packageName) ||
      !Array.isArray(languages) || !languages.length ||
      languages.some(code => !LANGUAGE.test(code))) throw new Error('Invalid scoped Flashcard request');
  const book = packageName.slice('content/'.length);
  for (const { bucket, id, file } of discover(root, book, lessonId)) {
    for (const locale of languages) {
      try {
        const { cards, sourceLanguage } = loadBank(file, root, id);
        const result = { missing: 0, strings: 0 };
        const rel = path.posix.join('content', book, 'data/lessons', bucket, id, 'flashcards/index.ts');
        const link = 'https://github.com/KiT-Maverik/svitlo/blob/' + manifest.sourceCommit + '/' + rel;
        const lines = [
          '<!-- GENERATED FROM CODE; DO NOT EDIT. -->',
          '# Flashcard Bank translation reference — ' + book + ' / ' + id + ' / ' + locale,
          '', 'Lesson UUID: ' + id,
          'Source language: ' + sourceLanguage,
          'Source SHA: ' + manifest.sourceCommit,
          'All Flashcards: ' + cards.length,
          'Canonical Code: [' + rel + '](' + link + ')', '',
        ];
        for (const card of cards) {
          lines.push('## ' + safeText(card.slug) + ' (' + card.id + ')', '');
          for (const side of ['front', 'back', 'hint']) {
            const group = card.content[side];
            if (!group) continue;
            lines.push('### ' + side + ' (' + group.order.length + ' blocks)', '');
            for (const name of group.order) {
              const block = group.items[name];
              lines.push('#### ' + safeText(name) + ' — ' + safeText(block.type) + ' (' + block.id + ')', '');
              localizedValues(block, 'content/' + side + '/' + name, sourceLanguage, locale, lines, result);
            }
          }
          localizedValues(card.parameters.flags ?? [], 'parameters/flags', sourceLanguage, locale, lines, result);
        }
        lines.splice(8, 0, 'Localized fields: ' + result.strings,
          'Missing locale fields: ' + result.missing, '');
        if (!result.strings) throw new Error('Flashcard bank has no statically reviewable localized text');
        const relative = path.posix.join('flashcards', book, bucket, id, locale + '.md');
        const target = path.join(output, relative);
        fs.mkdirSync(path.dirname(target), { recursive: true });
        const markdown = lines.join('\n').trimEnd() + '\n';
        if (Buffer.byteLength(markdown, 'utf8') > MAX_FILE) throw new Error('Oversized Flashcard review reference');
        fs.writeFileSync(target, markdown, 'utf8');
        manifest.generated.push({
          kind: 'flashcard', textbook: packageName, lesson: bucket + '/' + id, locale,
          path: '.agent-ci-artifacts/' + relative, flashcards: cards.length,
          strings: result.strings, missing: result.missing, reviewReady: result.missing === 0,
        });
        saveManifest();
      } catch (error) {
        manifest.failures.push({
          kind: 'flashcard', textbook: packageName, lesson: bucket + '/' + id, locale,
          error: String(error?.message ?? error).slice(0, 1500),
        });
        saveManifest();
      }
    }
  }
}
