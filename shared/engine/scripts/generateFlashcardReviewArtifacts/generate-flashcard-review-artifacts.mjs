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
const supportedFactories = new Set([
  'defineFlashcard',
  'defineFlashcardSide',
  'defineText',
  'defineMarkdown',
  'defineCode',
  'defineImage',
  'defineAudio',
  'defineVideo',
  'defineSubtitles',
]);

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
/**
 * Evaluate only literal, named TypeScript Configurator sources. Relative imports
 * are restricted to this Lesson's files; no authored code, getters or module
 * initializers are ever executed. The same resolver works with flat and modular
 * Question source paths without granting legacy layouts special treatment.
 */
const questionFactories = [
  'defineSelectOneAnswer', 'defineSelectMultipleAnswers', 'defineMatchBlocks',
  'defineAnswerWithText', 'defineAnswerWithNumber', 'defineOrderSequence',
  'defineBuildAnswerWithBlocks', 'defineFillBlanksWithBlocks', 'defineFillBlanksWithText',
];
const allowedFactories = new Set([...supportedFactories, ...questionFactories]);
const MAX_DEPENDENCIES = 48;
const MAX_SOURCE_BYTES = 8 * MAX_FILE;
const unsafeKeys = new Set(['__proto__', 'constructor', 'prototype']);

function literalProperty(node, location) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node)) {
    if (unsafeKeys.has(node.text)) throw new Error('Unsafe authored property: ' + location);
    return node.text;
  }
  throw new Error('Computed authored property: ' + location);
}

function staticModules(lessonRoot) {
  const modules = new Map();
  const referenced = new Set();
  let totalBytes = 0;

  const resolveImport = (from, specifier) => {
    if (!/^\.{1,2}\//.test(specifier) || specifier.endsWith('.ts') || specifier.includes('\\')) {
      throw new Error('Unsupported non-relative or extended Flashcard import: ' + specifier);
    }
    const target = path.resolve(path.dirname(from), specifier);
    const direct = target + '.ts';
    const indexed = path.join(target, 'index.ts');
    const candidates = [direct, indexed].filter(candidate => fs.existsSync(candidate));
    if (candidates.length !== 1) throw new Error('Missing or ambiguous Flashcard import: ' + specifier);
    safeFile(candidates[0], lessonRoot);
    return candidates[0];
  };

  const moduleFor = filename => {
    safeFile(filename, lessonRoot);
    if (!filename.endsWith('.ts')) throw new Error('Expected authored TypeScript source: ' + filename);
    if (modules.has(filename)) return modules.get(filename);
    if (modules.size >= MAX_DEPENDENCIES) throw new Error('Flashcard source dependency limit exceeded');
    const source = fs.readFileSync(filename, 'utf8');
    totalBytes += Buffer.byteLength(source);
    if (totalBytes > MAX_SOURCE_BYTES) throw new Error('Flashcard source dependency bytes exceeded');
    const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    if (ast.parseDiagnostics.length) throw new Error('Invalid authored Flashcard TypeScript: ' + filename);
    const module = { filename, imports: new Map(), factories: new Map(), definitions: new Map(), exports: new Map() };
    modules.set(filename, module);
    for (const statement of ast.statements) {
      if (ts.isImportDeclaration(statement)) {
        if (!ts.isStringLiteral(statement.moduleSpecifier) ||
          !statement.importClause || !statement.importClause.namedBindings ||
          !ts.isNamedImports(statement.importClause.namedBindings) || statement.importClause.name) {
          throw new Error('Unverifiable Flashcard import: ' + filename);
        }
        const specifier = statement.moduleSpecifier.text;
        if (specifier !== '@svitlo/engine/build' && !/^\.{1,2}\//.test(specifier)) {
          throw new Error('Noncanonical Flashcard import: ' + specifier);
        }
        const target = specifier === '@svitlo/engine/build' ? null : resolveImport(filename, specifier);
        for (const binding of statement.importClause.namedBindings.elements) {
          if (binding.isTypeOnly || statement.importClause.isTypeOnly) continue;
          const symbol = binding.name.text;
          const sourceName = binding.propertyName?.text ?? binding.name.text;
          if (module.imports.has(symbol) || module.factories.has(symbol) || module.definitions.has(symbol)) {
            throw new Error('Duplicate Flashcard symbol: ' + filename + '#' + symbol);
          }
          if (target) module.imports.set(symbol, { target, sourceName });
          else {
            if (!allowedFactories.has(sourceName)) throw new Error('Unknown Engine factory: ' + sourceName);
            module.factories.set(symbol, sourceName);
          }
        }
        continue;
      }
      if (ts.isVariableStatement(statement)) {
        const exported = statement.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword);
        for (const item of statement.declarationList.declarations) {
          if (!ts.isIdentifier(item.name) || !item.initializer ||
            module.definitions.has(item.name.text) || module.imports.has(item.name.text) ||
            module.factories.has(item.name.text)) {
            throw new Error('Invalid Flashcard source declaration: ' + filename);
          }
          module.definitions.set(item.name.text, item.initializer);
          if (exported) module.exports.set(item.name.text, { local: item.name.text });
        }
        continue;
      }
      if (ts.isExportDeclaration(statement)) {
        if (!statement.exportClause || !ts.isNamedExports(statement.exportClause)) {
          throw new Error('Unverifiable Flashcard re-export: ' + filename);
        }
        const target = statement.moduleSpecifier &&
          (ts.isStringLiteral(statement.moduleSpecifier)
            ? resolveImport(filename, statement.moduleSpecifier.text)
            : null);
        if (statement.moduleSpecifier && !target) throw new Error('Non-static Flashcard re-export');
        for (const item of statement.exportClause.elements) {
          const name = item.name.text;
          if (module.exports.has(name)) throw new Error('Duplicate Flashcard export: ' + name);
          module.exports.set(name, target
            ? { target, sourceName: item.propertyName?.text ?? name }
            : { local: item.propertyName?.text ?? name });
        }
      }
    }
    return module;
  };

  const resolveSymbol = (module, name, active) => {
    const key = module.filename + '#' + name;
    if (active.has(key)) throw new Error('Cyclic Flashcard source reference: ' + key);
    const next = new Set(active);
    next.add(key);
    if (module.imports.has(name)) {
      const ref = module.imports.get(name);
      const imported = moduleFor(ref.target);
      if (!imported.exports.has(ref.sourceName)) throw new Error('Non-exported Flashcard import: ' + key);
      const exposed = imported.exports.get(ref.sourceName);
      return resolveExport(imported, exposed, next);
    }
    if (!module.definitions.has(name)) throw new Error('Unknown Flashcard source reference: ' + key);
    return staticValue(module.definitions.get(name), module, key, next);
  };

  const resolveExport = (module, exported, active) => {
    if (exported.target) {
      const source = moduleFor(exported.target);
      const entry = source.exports.get(exported.sourceName);
      if (!entry) throw new Error('Unknown re-exported Flashcard symbol: ' + exported.sourceName);
      return resolveExport(source, entry, active);
    }
    return resolveSymbol(module, exported.local, active);
  };

  const staticValue = (input, module, location, active = new Set()) => {
    let node = input;
    while (node && (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) ||
        ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node))) node = node.expression;
    if (!node) throw new Error('Missing static Flashcard value: ' + location);
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (node.kind === ts.SyntaxKind.NullKeyword) return null;
    if (ts.isIdentifier(node)) return resolveSymbol(module, node.text, active);
    if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
      const name = ts.isPropertyAccessExpression(node)
        ? node.name.text
        : (ts.isStringLiteral(node.argumentExpression) ? node.argumentExpression.text : null);
      if (!name || unsafeKeys.has(name)) throw new Error('Non-static Flashcard member: ' + location);
      const value = staticValue(node.expression, module, location + '/object', active);
      if (!record(value) || !Object.hasOwn(value, name)) {
        throw new Error('Missing Flashcard source field: ' + location + '/' + name);
      }
      return value[name];
    }
    if (ts.isArrayLiteralExpression(node)) {
      return node.elements.map((child, i) => staticValue(child, module, location + '[' + i + ']', active));
    }
    if (ts.isObjectLiteralExpression(node)) {
      const result = Object.create(null);
      for (const property of node.properties) {
        if (ts.isSpreadAssignment(property)) {
          const spread = staticValue(property.expression, module, location + '/spread', active);
          if (!record(spread)) throw new Error('Non-static Flashcard spread: ' + location);
          for (const [key, value] of Object.entries(spread)) {
            if (unsafeKeys.has(key) || Object.hasOwn(result, key)) throw new Error('Duplicate Flashcard field: ' + key);
            result[key] = value;
          }
        } else if (ts.isPropertyAssignment(property) || ts.isShorthandPropertyAssignment(property)) {
          const key = literalProperty(property.name, location);
          if (Object.hasOwn(result, key)) throw new Error('Duplicate Flashcard field: ' + location + '/' + key);
          result[key] = staticValue(
            ts.isShorthandPropertyAssignment(property) ? property.name : property.initializer,
            module, location + '/' + key, active,
          );
        } else throw new Error('Non-static Flashcard property: ' + location);
      }
      return result;
    }
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.arguments.length === 1 &&
      module.factories.has(node.expression.text)) {
      return staticValue(node.arguments[0], module, location, active);
    }
    throw new Error('Non-static Flashcard expression: ' + location + ' (' + ts.SyntaxKind[node.kind] + ')');
  };

  const bank = filename => {
    const module = moduleFor(filename);
    const candidates = [];
    for (const [name, entry] of module.exports) {
      const value = resolveExport(module, entry, new Set());
      if (record(value) && record(value.items) &&
        Object.keys(value).every(key => key === 'items')) candidates.push({ name, value });
    }
    if (candidates.length !== 1) throw new Error('Expected exactly one exported Flashcard bank registry');
    // A declared card left out of the bank would otherwise yield a deceptively complete review.
    const declared = [...module.definitions.entries()].filter(([, node]) =>
      ts.isCallExpression(node) && ts.isIdentifier(node.expression) &&
      module.factories.get(node.expression.text) === 'defineFlashcard',
    );
    const registry = candidates[0].value;
    const cardIds = new Set(Object.values(registry.items).map(card => card?.id));
    if (declared.some(([name]) => !cardIds.has(resolveSymbol(module, name, new Set()).id))) {
      throw new Error('Unregistered Flashcard declaration: review cannot prove complete bank coverage');
    }
    return { registry, dependencies: [...modules.keys()].filter(file => file !== filename) };
  };
  return { bank };
}

function loadBank(filename, lessonRoot, lessonId) {
  safeFile(filename, lessonRoot);
  const source = fs.readFileSync(filename, 'utf8');
  const meta = /^\/\/ Lesson UUID: ([0-9a-f-]{36}); documentLanguage: ([a-z]{2,4})\s*$/m.exec(source);
  if (!meta || meta[1] !== lessonId) throw new Error('Flashcard source missing matching Lesson UUID/language header');
  const { registry, dependencies } = staticModules(lessonRoot).bank(filename);
  if (!record(registry.items) || !Object.keys(registry.items).length) {
    throw new Error('Invalid Flashcard bank registry');
  }
  const cards = Object.entries(registry.items).map(([name, card]) => {
    if (!SLUG.test(name) || !record(card) || card.slug !== name || !UUID.test(card.id ?? '')) {
      throw new Error('Flashcard slug or UUID mismatch at ' + name);
    }
    if (!record(card.content) || !record(card.parameters) || !record(card.content.front) ||
        !record(card.content.back)) throw new Error('Flashcard missing front/back/parameters: ' + name);
    for (const side of ['front', 'back', 'hint']) {
      const group = card.content[side];
      if (!group) continue;
      if (!record(group.items) || !Array.isArray(group.order) || (side !== 'hint' && !group.order.length) ||
          new Set(group.order).size !== group.order.length ||
          group.order.length !== Object.keys(group.items).length ||
          group.order.some(key => !Object.hasOwn(group.items, key))) {
        throw new Error('Invalid ordered Flashcard ' + name + '/' + side);
      }
      for (const slug of group.order) {
        const block = group.items[slug];
        if (!record(block) || block.slug !== slug || !UUID.test(block.id ?? '') ||
            typeof block.type !== 'string') {
          throw new Error('Invalid Flashcard block: ' + name + '/' + side + '/' + slug);
        }
      }
    }
    return card;
  });
  if (new Set(cards.map(card => card.id.toLowerCase())).size !== cards.length) {
    throw new Error('Duplicate Flashcard UUID in bank');
  }
  return { cards, sourceLanguage: meta[2], dependencies };
}
function safeText(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('|', '\\|')
    .replaceAll('\r', '')
    .replaceAll('\n', ' ⏎ ');
}
function localizedValues(value, place, sourceLanguage, locale, lines, result) {
  if (!record(value)) {
    if (Array.isArray(value)) {
      value.forEach((child, i) => localizedValues(child, place + '[' + i + ']', sourceLanguage, locale, lines, result));
    } else if (
      typeof value === 'string' &&
      (/\/locale\/(?:value|alt|title|navigationLabel|instruction|description)$/.test(place) ||
        /(?:^|\/)parameters\/flags\[\d+\]\/value$/.test(place))
    ) {
      // Engine permits invariant learner-facing copy. Surface it to independent
      // reviewers instead of silently omitting it from "complete bank" coverage.
      lines.push(
        '#### ' + safeText(place),
        '',
        '- Invariant authored copy (verify intent across requested locales): ' + safeText(value),
        '',
      );
      result.strings++;
    }
    return;
  }
  const keys = Object.keys(value);
  if (keys.length && keys.every(key => LANGUAGE.test(key))) {
    const source = value[sourceLanguage];
    if (typeof source !== 'string' || !source.trim())
      throw new Error('Missing source-language Flashcard text at ' + place + '/' + sourceLanguage);
    const translated = value[locale];
    const valid = typeof translated === 'string' && Boolean(translated.trim());
    lines.push(
      '#### ' + safeText(place),
      '',
      '- ' + sourceLanguage + ': ' + safeText(source),
      '- ' + locale + ': ' + (valid ? safeText(translated) : '%%MISSING%%'),
      '',
    );
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
    const bucketDirectory = path.join(source, bucket);
    if (fs.lstatSync(bucketDirectory).isSymbolicLink() || !fs.statSync(bucketDirectory).isDirectory())
      throw new Error('Symlinked or non-directory Flashcard bucket: ' + bucketDirectory);
    for (const id of fs.readdirSync(bucketDirectory).sort()) {
      if (!UUID.test(id) || id.at(-1) !== bucket || (requested && id !== requested)) continue;
      const lessonDirectory = path.join(bucketDirectory, id);
      if (fs.lstatSync(lessonDirectory).isSymbolicLink() || !fs.statSync(lessonDirectory).isDirectory())
        throw new Error('Symlinked or non-directory Flashcard Lesson: ' + lessonDirectory);
      const file = path.join(lessonDirectory, 'flashcards', 'index.ts');
      if (fs.existsSync(file)) output.push({ bucket, id, file });
    }
  }
  if (!output.length) throw new Error('No authored Flashcard bank in selected Lesson scope');
  return output;
}
export function generateFlashcardReviewArtifacts({
  root,
  output,
  manifest,
  saveManifest,
  packageName,
  lessonId = null,
  languages,
}) {
  if (
    typeof packageName !== 'string' ||
    !/^content\/[a-z][a-z0-9-]*$/.test(packageName) ||
    !Array.isArray(languages) ||
    !languages.length ||
    languages.some(code => !LANGUAGE.test(code))
  )
    throw new Error('Invalid scoped Flashcard request');
  const book = packageName.slice('content/'.length);
  for (const { bucket, id, file } of discover(root, book, lessonId)) {
    for (const locale of languages) {
      try {
        const lessonRoot = path.dirname(path.dirname(file));
        const { cards, sourceLanguage, dependencies } = loadBank(file, lessonRoot, id);
        const result = { missing: 0, strings: 0 };
        const rel = path.posix.join('content', book, 'data/lessons', bucket, id, 'flashcards/index.ts');
        const link = 'https://github.com/KiT-Maverik/svitlo/blob/' + manifest.sourceCommit + '/' + rel;
        const lines = [
          '<!-- GENERATED FROM CODE; DO NOT EDIT. -->',
          '# Flashcard Bank translation reference — ' + book + ' / ' + id + ' / ' + locale,
          '',
          'Lesson UUID: ' + id,
          'Source language: ' + sourceLanguage,
          'Source SHA: ' + manifest.sourceCommit,
          'All Flashcards: ' + cards.length,
          'Canonical Code: [' + rel + '](' + link + ')',
          '',
          ...dependencies.flatMap(dependency => {
            const sourcePath = path.relative(root, dependency).split(path.sep).join('/');
            return ['- Referenced authoring source: [' + sourcePath + '](' +
              'https://github.com/KiT-Maverik/svitlo/blob/' + manifest.sourceCommit + '/' + sourcePath + ')'];
          }),
          '',
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
        lines.splice(8, 0, 'Localized fields: ' + result.strings, 'Missing locale fields: ' + result.missing, '');
        if (!result.strings) throw new Error('Flashcard bank has no statically reviewable localized text');
        const relative = path.posix.join('flashcards', book, bucket, id, locale + '.md');
        const target = path.join(output, relative);
        fs.mkdirSync(path.dirname(target), { recursive: true });
        const markdown = lines.join('\n').trimEnd() + '\n';
        if (Buffer.byteLength(markdown, 'utf8') > MAX_FILE) throw new Error('Oversized Flashcard review reference');
        fs.writeFileSync(target, markdown, 'utf8');
        manifest.generated.push({
          kind: 'flashcard',
          textbook: packageName,
          lesson: bucket + '/' + id,
          locale,
          path: '.agent-ci-artifacts/' + relative,
          flashcards: cards.length,
          strings: result.strings,
          missing: result.missing,
          reviewReady: result.missing === 0,
        });
        saveManifest();
      } catch (error) {
        manifest.failures.push({
          kind: 'flashcard',
          textbook: packageName,
          lesson: bucket + '/' + id,
          locale,
          error: String(error?.message ?? error).slice(0, 1500),
        });
        saveManifest();
      }
    }
  }
}
