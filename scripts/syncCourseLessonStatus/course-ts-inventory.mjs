/**
 * @fileoverview Static, bounded inventory of materialized Course TypeScript.
 * Never imports/evaluates authored modules; recognizes the Engine Stage 5
 * defineCourse/Module/Chapter graph, generated unresolved Lesson references
 * and canonical standalone defineLesson imports. Unsupported edits fail closed.
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import YAML from 'yaml';
import { canonicalUUID, UUID, TEXTBOOK } from './synchronizer.mjs';

const IDENTIFIER = /^[a-zA-Z][a-zA-Z0-9_]{0,99}$/;
const SOURCE_LIMIT = 2 * 1024 * 1024;

function fail(message) {
  throw Error('Course TS inventory: ' + message);
}

function safeSource(root, filename) {
  const base = fs.realpathSync(root);
  const target = path.resolve(base, filename);
  if (!target.startsWith(base + path.sep)) fail('path escapes Course checkout');
  let cursor = base;
  for (const part of path.relative(base, target).split(path.sep)) {
    cursor = path.join(cursor, part);
    if (fs.existsSync(cursor) && fs.lstatSync(cursor).isSymbolicLink()) fail('symlink path refused: ' + filename);
  }
  if (!fs.existsSync(target)) fail('missing required TypeScript or Lesson source: ' + filename);
  const stat = fs.statSync(target);
  if (!stat.isFile() || stat.size > SOURCE_LIMIT) fail('source is not a bounded regular file: ' + filename);
  return fs.readFileSync(target, 'utf8');
}

function unwrap(node) {
  while (node && (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) ||
    ts.isParenthesizedExpression(node) || ts.isNonNullExpression(node))) node = node.expression;
  return node;
}
function object(node, context) {
  node = unwrap(node);
  if (!ts.isObjectLiteralExpression(node)) fail(context + ' must be a static object');
  return node;
}
function property(node, key) {
  const matches = object(node, 'Config').properties.filter(
    p => (ts.isPropertyAssignment(p) || ts.isShorthandPropertyAssignment(p)) &&
      (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) && p.name.text === key,
  );
  if (matches.length !== 1) fail('expected one static ' + key + ' property');
  return ts.isShorthandPropertyAssignment(matches[0]) ? matches[0].name : matches[0].initializer;
}
function string(node, context) {
  node = unwrap(node);
  if (!ts.isStringLiteral(node) && !ts.isNoSubstitutionTemplateLiteral(node))
    fail(context + ' must be a string literal');
  return node.text;
}
function stringArray(node, context) {
  node = unwrap(node);
  if (!ts.isArrayLiteralExpression(node) || node.elements.length > 10000)
    fail(context + ' must be an ordered string array');
  return node.elements.map(x => string(x, context));
}
function entries(node, context) {
  const map = new Map();
  for (const entry of object(node, context).properties) {
    if (!(ts.isPropertyAssignment(entry) || ts.isShorthandPropertyAssignment(entry)) ||
        (!ts.isStringLiteral(entry.name) && !ts.isIdentifier(entry.name)))
      fail(context + ' must have static property assignments');
    const key = entry.name.text;
    if (!IDENTIFIER.test(key) || map.has(key)) fail('duplicate/unsafe Course child key ' + key);
    map.set(key, ts.isShorthandPropertyAssignment(entry) ? entry.name : entry.initializer);
  }
  return map;
}
function staticFile(root, file) {
  const text = safeSource(root, file);
  const ast = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  if (ast.parseDiagnostics.length) fail('TypeScript parse error: ' + file);
  const imports = new Map();
  for (const node of ast.statements) {
    if (!ts.isImportDeclaration(node)) continue;
    if (!ts.isStringLiteral(node.moduleSpecifier)) fail('dynamic Course import in ' + file);
    const target = node.moduleSpecifier.text;
    const named = node.importClause?.namedBindings;
    if (!named || !ts.isNamedImports(named)) continue;
    for (const member of named.elements) {
      const local = member.name.text;
      if (imports.has(local)) fail('duplicate import local name ' + local);
      imports.set(local, { target, exported: member.propertyName?.text ?? local });
    }
  }
  return { ast, imports };
}
function staticDeclaration(ast, symbol, exported = false) {
  const found = [];
  for (const statement of ast.statements) {
    if (!ts.isVariableStatement(statement) || !(statement.declarationList.flags & ts.NodeFlags.Const) ||
        (exported && !statement.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword))) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === symbol && declaration.initializer)
        found.push(declaration.initializer);
    }
  }
  if (found.length !== 1) fail('Missing or ambiguous static ' + symbol + ' declaration');
  return found[0];
}

function exportedLanguages(root, courseDirectory, name) {
  const constants = staticFile(root, courseDirectory + '/constants.ts').ast;
  const values = stringArray(staticDeclaration(constants, name, true), name);
  if (!values.length || new Set(values).size !== values.length ||
      values.some(x => !/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})?$/.test(x)))
    fail('Invalid ' + name + ' locale tuple');
  return values;
}

function exportedDefinition(ast, factory, symbol) {
  const found = [];
  for (const stmt of ast.statements) {
    if (!ts.isVariableStatement(stmt) || !stmt.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) continue;
    for (const declaration of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || (symbol && declaration.name.text !== symbol)) continue;
      const call = declaration.initializer;
      if (!call || !ts.isCallExpression(call) || !ts.isIdentifier(call.expression) || call.expression.text !== factory)
        continue;
      if (call.arguments.length !== 1) fail('dynamic ' + factory + ' argument');
      found.push({ config: object(call.arguments[0], factory), name: declaration.name.text });
    }
  }
  if (found.length !== 1) fail('expected one exported ' + factory + (symbol ? ' named ' + symbol : ''));
  return found[0].config;
}
function resolveImport(from, specifier) {
  if (
    typeof specifier !== 'string' ||
    !specifier.startsWith('.') ||
    specifier.includes('\\') ||
    /[?&#\0]/.test(specifier) ||
    specifier.endsWith('.tsx')
  )
    fail('non-static or non-relative Course import');
  const target = path.posix.normalize(path.posix.join(path.posix.dirname(from), specifier));
  const result = target.endsWith('.ts') ? target : target + '.ts';
  if (result.startsWith('../') || result.startsWith('/') || result.includes('/../'))
    fail('Course import escapes repository');
  return result;
}
/** Read canonical #lessonsData imports without importing the Lesson module. */
function lessonAlias(specifier, book) {
  if (!specifier.startsWith('#lessonsData/')) return null;
  const found = specifier.match(
    /^#lessonsData\/([a-f0-9])\/([a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12})\/(index|[a-z][A-Za-z0-9]*\.data)$/,
  );
  if (!found || found[1] !== found[2].at(-1)) fail('Invalid Lesson data alias: ' + specifier);
  return {
    lessonId: canonicalUUID(found[2]),
    target: book + '/data/lessons/' + found[1] + '/' + found[2] + '/' + found[3] + '.ts',
  };
}

/** Resolve only the explicit, static named exports generated by Course family barrels. */
function barrelSource(root, barrel, exported) {
  const ast = staticFile(root, barrel).ast;
  const results = [];
  for (const node of ast.statements) {
    if (!ts.isExportDeclaration(node) || !ts.isNamedExports(node.exportClause) ||
        !ts.isStringLiteral(node.moduleSpecifier)) fail('Unexpected Course barrel statement');
    for (const element of node.exportClause.elements) {
      if (element.name.text === exported) {
        const target = resolveImport(barrel, node.moduleSpecifier.text);
        results.push({ target, symbol: element.propertyName?.text ?? exported });
      }
    }
  }
  if (results.length !== 1) fail('Ambiguous or missing Course barrel export: ' + exported);
  return results[0];
}

/**
 * The materializer persists Lesson identities in the generated methodology.md,
 * derived from the actual YAML Config IDs. The Course AST supplies placements.
 * TODO comments are intentionally ignored: they are authoring hints, not data.
 */
function readMethodologyReferences(root, courseDirectory) {
  const body = safeSource(root, courseDirectory + '/methodology.md');
  const lines = body.split(/\r?\n/);
  const references = [];
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^### Lesson ([a-z][A-Za-z0-9]*) — (.{1,180})$/);
    if (!match) continue;
    // The maintained generator always writes the UUID immediately after a
    // blank line. New outputs additionally include the exact Course placement.
    const idMatch = lines[i + 2]?.match(/^Lesson UUID: ([a-f0-9-]{36})$/);
    if (!idMatch) fail('Lesson methodology UUID missing for ' + match[1]);
    const lessonId = canonicalUUID(idMatch[1]);
    const placementMatch = lines[i + 4]?.match(/^Placement: ([a-zA-Z0-9_ /-]{1,500})$/);
    const placement = placementMatch ? placementMatch[1] : null;
    references.push({ slug: match[1], lessonId, title: match[2], placement });
  }
  if (!references.length || references.length > 1000)
    fail('No bounded, statically verifiable Lesson references in methodology.md');
  const explicit = new Set();
  for (const entry of references) {
    if (entry.placement) {
      if (explicit.has(entry.placement)) fail('Duplicate explicit Lesson placement ' + entry.placement);
      explicit.add(entry.placement);
    }
  }
  return references;
}

function titleFromYaml(root, book, id, fallback) {
  const filename = book + '/data/lessons/' + id.at(-1) + '/' + id + '/lesson.yaml';
  // A reused Lesson can have no YAML; Stage 5 does not create it.
  if (!fs.existsSync(path.join(root, filename))) return fallback;
  const text = safeSource(root, filename);
  const doc = YAML.parseDocument(text, { strict: true, uniqueKeys: true, version: '1.2' });
  if (doc.errors.length) fail('malformed Lesson YAML for ' + id);
  const lesson = doc.toJS({ maxAliasCount: 0 });
  if (canonicalUUID(lesson?.config?.id) !== id) fail('Lesson YAML ID disagrees with Course reference: ' + id);
  const titles = lesson.config?.locale?.title;
  const language = lesson.production?.documentLanguage;
  const localized = titles?.[language] ?? (titles && Object.values(titles)[0]);
  return typeof localized === 'string' && localized.length <= 180 && localized.trim() ? localized : fallback;
}

/**
 * @param {string} root An immutable PR data checkout.
 * @param {string} courseDirectory Canonical content/<book>/data/courses/<bucket>/<uuid>.
 * @param {string} courseId The exact Course UUID from the parent PR.
 */
export function readCourseTsInventory(root, courseDirectory, courseId) {
  const id = canonicalUUID(courseId);
  const expectedEnd = '/data/courses/' + id.at(-1) + '/' + id;
  if (typeof courseDirectory !== 'string' || !courseDirectory.endsWith(expectedEnd))
    fail('Course directory does not match UUID bucket');
  const book = courseDirectory.slice(0, -expectedEnd.length);
  if (!TEXTBOOK.test(book)) fail('Invalid textbook in Course directory');
  const lessons = new Map();
  const references = readMethodologyReferences(root, courseDirectory);
  let nextReference = 0;
  const visited = new Set();
  let visits = 0;
  let languages;
  function readNode(file, factory, symbol, location) {
    if (++visits > 1500 || location.length > 12) fail('Course graph exceeds limits');
    if (visited.has(file)) fail('duplicate or cyclic Course component: ' + file);
    visited.add(file);
    const parsed = staticFile(root, file);
    const config = exportedDefinition(parsed.ast, factory, symbol);
    const type = string(property(config, 'type'), 'Course node type');
    if (type !== factory.slice('define'.length).toLowerCase())
      fail('Course node discriminator does not match ' + factory);
    if (factory === 'defineCourse') {
      if (canonicalUUID(string(property(config, 'id'), 'Course id')) !== id) fail('Course TS root identity mismatch');
      const params = property(config, 'params');
      const languageRef = property(object(params, 'Course params'), 'languages');
      if (ts.isIdentifier(languageRef)) {
        if (languageRef.text !== 'languages') fail('Unexpected Course locale variable');
        const authored = exportedLanguages(root, courseDirectory, 'languages');
        languages = exportedLanguages(root, courseDirectory, 'plannedLanguages');
        if (authored.some(locale => !languages.includes(locale)))
          fail('Course authored locales exceed approved planned languages');
      } else {
        languages = stringArray(languageRef, 'Course languages');
      }
      if (
        !languages.length ||
        languages.some(x => !/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})?$/.test(x)) ||
        new Set(languages).size !== languages.length
      )
        fail('Invalid Course languages');
    } else {
      canonicalUUID(string(property(config, 'id'), 'nested entity id'));
    }
    const content = object(property(config, 'content'), 'Course content');
    const itemsRef = property(content, 'items');
    const itemSource = ts.isIdentifier(itemsRef)
      ? itemsRef.text === 'items'
        ? staticDeclaration(parsed.ast, 'items')
        : fail('Unexpected Course items variable')
      : itemsRef;
    const items = entries(itemSource, 'Course content.items');
    const order = stringArray(property(content, 'order'), 'Course content.order');
    if (order.length !== items.size || new Set(order).size !== order.length || order.some(x => !items.has(x)))
      fail('Course content.items/order mismatch');
    for (const key of order) {
      if (!IDENTIFIER.test(key)) fail('Invalid Course child slug ' + key);
      const expression = items.get(key);
      if (!ts.isIdentifier(expression)) fail('Course child must be a static identifier');
      const symbolName = expression.text;
      const placement = [...location, key];
      const imported = parsed.imports.get(symbolName);
      const aliasedLesson = imported ? lessonAlias(imported.target, book) : null;
      let target = aliasedLesson?.target;
      if (imported && !aliasedLesson) {
        target = resolveImport(file, imported.target);
        const prefix = courseDirectory + '/';
        let component = target.startsWith(prefix) ? target.slice(prefix.length) : null;
        let group = component?.match(/^(modules|chapters|episodes)\/([a-zA-Z][a-zA-Z0-9_]*)\.ts$/);
        let exportName = imported.exported;
        if (!group) {
          // The newer materializer imports through static family barrel files,
          // e.g. ./modules -> modules/index.ts -> ./skyCycles.
          const family = component?.match(/^(modules|chapters|episodes)\.ts$/)?.[1];
          if (family) {
            const linked = barrelSource(root, courseDirectory + '/' + family + '/index.ts', exportName);
            target = linked.target;
            exportName = linked.symbol;
            component = target.startsWith(prefix) ? target.slice(prefix.length) : null;
            group = component?.match(/^(modules|chapters|episodes)\/([a-zA-Z][a-zA-Z0-9_]*)\.ts$/);
            if (!group || group[1] !== family) fail('Course barrel escapes its entity family');
          }
        }
        if (group) {
          if (group[2] !== key) fail('Nested Course slug/import mismatch at ' + key);
          if (group[1] !== 'episodes') {
            readNode(target, group[1] === 'modules' ? 'defineModule' : 'defineChapter', exportName, placement);
          } else {
            const episode = staticFile(root, target);
            exportedDefinition(episode.ast, 'defineEpisode', exportName);
          }
          continue;
        }
      } else if (!imported && !/^UNRESOLVED_LESSON_[0-9]+$/.test(symbolName)) {
        fail('Unresolved Course child identifier: ' + symbolName);
      }
      // The materializer emits Lesson references in Course preorder. The
      // reviewed methodology and actual Lesson Config (not TODO comments)
      // bind the UUID to each ordered child slot.
      const reference = references[nextReference++];
      if (!reference || reference.slug !== key ||
          (reference.placement && reference.placement !== placement.join(' / ')))
        fail('Course Lesson sequence/placement differs from materialized methodology: ' +
          placement.join(' / '));
      const lessonId = reference.lessonId;
      if (aliasedLesson && aliasedLesson.lessonId !== lessonId)
        fail('Lesson data alias UUID differs from materialized methodology');
      const authoredFile = target ? path.join(root, target) : null;
      const hasTypedSource = authoredFile && fs.existsSync(authoredFile);
      if (!imported || (aliasedLesson && !hasTypedSource)) {
        const lessonYaml = book + '/data/lessons/' + lessonId.at(-1) + '/' + lessonId + '/lesson.yaml';
        // A future Lesson's alias can exist before its TS implementation;
        // the actual initial Config identity must already be materialized.
        safeSource(root, lessonYaml);
      }
      if (imported && (!aliasedLesson || hasTypedSource)) {
        const prefix = book + '/data/lessons/';
        const relative = target.startsWith(prefix) ? target.slice(prefix.length) : null;
        const lessonMatch = relative?.match(
          /^([a-f0-9])\/([a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12})\/([A-Za-z0-9_.-]+)\.ts$/,
        );
        if (!lessonMatch || lessonMatch[1] !== lessonMatch[2].at(-1))
          fail('Unexpected Course import; only canonical Lessons and Course components are allowed');
        if (canonicalUUID(lessonMatch[2]) !== lessonId)
          fail('Referenced Lesson source path does not match approved methodology UUID');
        const lesson = staticFile(root, target);
        const lessonConfig = exportedDefinition(lesson.ast, 'defineLesson', imported.exported);
        if (canonicalUUID(string(property(lessonConfig, 'id'), 'Lesson id')) !== lessonId)
          fail('Referenced Lesson source does not match its UUID directory');
      }
      const title = titleFromYaml(root, book, lessonId, reference.title);
      const place = placement.join(' / ');
      const previous = lessons.get(lessonId);
      if (previous) {
        previous.placements.push(place);
      } else {
        lessons.set(lessonId, { lessonId, title, placements: [place] });
      }
      if (lessons.size > 1000) fail('Course inventory exceeds 1000 unique Lessons');
    }
  }
  readNode(courseDirectory + '/index.ts', 'defineCourse', null, []);
  if (nextReference !== references.length) fail('Orphaned Lesson UUID mapping in materialized methodology');
  return {
    lessons: [...lessons.values()]
      .map(x => ({ ...x, placements: x.placements.sort() }))
      .sort((a, b) => a.lessonId.localeCompare(b.lessonId)),
    unresolved: [],
    allocated: true,
    languages,
  };
}
