/**
 * @fileoverview Read-only, literal TypeScript Stage 2 extraction. No candidate
 * module is imported, required, transpiled for execution or evaluated. Static
 * bank .id references are resolved from verified sibling source bytes only.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const trustedRoot = fileURLToPath(new URL('../../..', import.meta.url));
const require = createRequire(import.meta.url);
const ts = require(path.join(trustedRoot, 'node_modules/typescript'));
const uuid = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i;
const identifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

function unwrap(node) {
  while (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) ||
         ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node))
    node = node.expression;
  return node;
}
function key(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name))
    return name.text;
  throw Error('Computed, spread or dynamic TypeScript keys are forbidden');
}
function property(object, name) {
  const root = unwrap(object);
  if (!ts.isObjectLiteralExpression(root)) throw Error('Expected plain object at ' + name);
  const properties = root.properties.filter(prop =>
    ts.isPropertyAssignment(prop) && key(prop.name) === name);
  if (properties.length !== 1) throw Error('Missing or duplicate object field ' + name);
  return properties[0].initializer;
}
function trackedRegular(root, filename) {
  const absolute = path.resolve(root, filename);
  if (!absolute.startsWith(root + path.sep))
    throw Error('Typed Lesson import escapes pinned checkout');
  let cursor = root;
  for (const component of filename.split('/')) {
    if (!component || component === '.' || component === '..')
      throw Error('Unsafe typed Lesson source path');
    cursor = path.join(cursor, component);
    if (fs.lstatSync(cursor).isSymbolicLink()) throw Error('Symlink in source/import path');
  }
  const stat = fs.statSync(absolute);
  if (!stat.isFile() || stat.size > 4 * 1024 * 1024)
    throw Error('Nonregular or oversized source/import');
  return fs.readFileSync(absolute, 'utf8');
}

function parseSource(filename, text) {
  const file = ts.createSourceFile(filename, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (file.parseDiagnostics.length)
    throw Error('Invalid Stage 2 source TypeScript: ' +
      ts.flattenDiagnosticMessageText(file.parseDiagnostics[0].messageText, '\n'));
  return file;
}
function importsOf(file, folder) {
  const bindings = new Map();
  let engineType = false;
  for (const statement of file.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    if (!ts.isStringLiteral(statement.moduleSpecifier) || !statement.importClause)
      throw Error('Side-effect/dynamic imports are not supported by the typed parser');
    const module = statement.moduleSpecifier.text;
    if (module === '@svitlo/engine/build' && statement.importClause.isTypeOnly) {
      engineType = true;
      continue;
    }
    if (statement.importClause.isTypeOnly) continue;
    if (!module.startsWith('./') || !/^\.\//.test(module))
      throw Error('Only literal Lesson-owned relative bank imports are supported');
    const target = path.posix.normalize(path.posix.join(path.posix.dirname(file.fileName), module));
    if (!target.startsWith(folder + '/questions/') &&
        !target.startsWith(folder + '/flashcards/') &&
        ![folder + '/questions', folder + '/flashcards'].includes(target))
      throw Error('Stage 2 value import must target an owned Question/Flashcard Bank');
    const clause = statement.importClause;
    if (clause.name || !clause.namedBindings || !ts.isNamedImports(clause.namedBindings))
      throw Error('Typed bank references must use explicit named imports');
    for (const item of clause.namedBindings.elements) {
      if (item.isTypeOnly) continue;
      if (bindings.has(item.name.text)) throw Error('Duplicate bank import binding');
      bindings.set(item.name.text, { module: target, exportName: item.propertyName?.text || item.name.text });
    }
  }
  return { bindings, engineType };
}

/** Recognize an authored bank Configurator's static id without invoking its factory. */
function resolveBankId(root, binding, cache) {
  const base = binding.module;
  const paths = [base + '.ts', base + '/index.ts'];
  const filename = paths.find(candidate => fs.existsSync(path.resolve(root, candidate)));
  if (!filename) throw Error('Imported bank Configurator file is missing');
  if (cache.has(filename + ':' + binding.exportName))
    return cache.get(filename + ':' + binding.exportName);
  const source = parseSource(filename, trackedRegular(root, filename));
  let found = null;
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    if (!statement.modifiers?.some(item => item.kind === ts.SyntaxKind.ExportKeyword)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== binding.exportName ||
          !declaration.initializer) continue;
      const init = unwrap(declaration.initializer);
      let value;
      if (ts.isCallExpression(init) && init.arguments.length >= 1 &&
          ts.isIdentifier(init.expression) && /^define[A-Z]/.test(init.expression.text))
        value = property(init.arguments[0], 'id');
      else if (ts.isObjectLiteralExpression(init))
        value = property(init, 'id');
      else throw Error('Imported bank member has no static Configurator id');
      const literal = unwrap(value);
      if (!ts.isStringLiteral(literal) || !uuid.test(literal.text))
        throw Error('Imported bank member lacks a real static UUID');
      if (found !== null) throw Error('Duplicate exported bank member');
      found = literal.text;
    }
  }
  if (!found) throw Error('Could not verify imported bank Configurator UUID');
  cache.set(filename + ':' + binding.exportName, found);
  return found;
}

function evaluate(node, context, location = 'lesson') {
  const value = unwrap(node);
  if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value))
    return value.text;
  if (ts.isNumericLiteral(value)) return Number(value.text);
  if (value.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (value.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (value.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isPrefixUnaryExpression(value) && value.operator === ts.SyntaxKind.MinusToken &&
      ts.isNumericLiteral(value.operand)) return -Number(value.operand.text);
  if (ts.isArrayLiteralExpression(value)) {
    if (value.elements.length > 10000) throw Error('Oversized typed Lesson array');
    return value.elements.map((item, index) => evaluate(item, context, location + '[' + index + ']'));
  }
  if (ts.isObjectLiteralExpression(value)) {
    if (value.properties.length > 10000) throw Error('Oversized typed Lesson object');
    const result = Object.create(null);
    for (const prop of value.properties) {
      if (!ts.isPropertyAssignment(prop))
        throw Error('Only explicit plain object property assignments supported at ' + location);
      const name = key(prop.name);
      if (['__proto__', 'prototype', 'constructor'].includes(name) ||
          Object.hasOwn(result, name))
        throw Error('Prototype/duplicate key in typed Lesson source: ' + name);
      result[name] = evaluate(prop.initializer, context, location + '.' + name);
    }
    return result;
  }
  if (ts.isPropertyAccessExpression(value) && value.name.text === 'id' &&
      ts.isIdentifier(value.expression) &&
      /(?:^|\.)(?:questionIds|flashcardIds)\[\d+\]$/.test(location)) {
    const binding = context.bindings.get(value.expression.text);
    if (!binding) throw Error('Bank selection must reference an imported Configurator .id');
    return resolveBankId(context.root, binding, context.cache);
  }
  throw Error('Untrusted or unsupported expression at ' + location +
    '; only literal Stage 2 objects and static imported bank .id references are allowed');
}

function reviewedExport(file) {
  const declarations = [];
  for (const statement of file.statements) {
    if (!ts.isVariableStatement(statement)) {
      if (!ts.isImportDeclaration(statement) && !ts.isEmptyStatement(statement))
        throw Error('Only imports and one exported typed Lesson object are permitted');
      continue;
    }
    if (!statement.modifiers?.some(item => item.kind === ts.SyntaxKind.ExportKeyword) ||
        !(statement.declarationList.flags & ts.NodeFlags.Const))
      throw Error('Lesson Stage 2 must be one exported const');
    declarations.push(...statement.declarationList.declarations);
  }
  if (declarations.length !== 1 || !declarations[0].initializer)
    throw Error('Expected one exported Lesson Stage 2 object');
  const typed = declarations[0].initializer;
  if (!ts.isSatisfiesExpression(typed)) throw Error('Lesson object must use satisfies');
  const type = typed.type;
  if (!ts.isTypeReferenceNode(type) || !ts.isIdentifier(type.typeName) ||
      !['LessonWorkflowStage2', 'LessonWorkflowMaterializerInput'].includes(type.typeName.text))
    throw Error('Lesson source does not satisfy the Engine Stage 2 materializer input');
  return typed.expression;
}

export function parseTypedLesson(root, sourcePath, sourceText) {
  const file = parseSource(sourcePath, sourceText);
  const folder = path.posix.dirname(sourcePath);
  const { bindings, engineType } = importsOf(file, folder);
  if (!engineType) throw Error('Stage 2 must import its actual Engine workflow type');
  const input = evaluate(reviewedExport(file), { root, bindings, cache: new Map() });
  if (input?.config?.id !== folder.split('/').at(-1) ||
      input.config.type !== 'lesson' || !input.production)
    throw Error('Parsed Lesson does not match its canonical authored identity');
  return input;
}

/** This is a semantic compiler, never node import/require of candidate TS. */
export function typecheckTypedLesson(root, sourcePath) {
  const file = path.resolve(root, sourcePath);
  const trustedDeclaration = path.join(trustedRoot, 'shared/engine/dist/build.d.ts');
  if (!fs.existsSync(trustedDeclaration))
    throw Error('Trusted Engine must be built before typed Lesson semantic validation');
  const options = {
    strict: true, noEmit: true, skipLibCheck: true, target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler,
    baseUrl: trustedRoot, paths: { '@svitlo/engine/build': [trustedDeclaration] },
  };
  const program = ts.createProgram([file], options);
  const failures = ts.getPreEmitDiagnostics(program).filter(item =>
    item.category === ts.DiagnosticCategory.Error);
  if (failures.length) throw Error('Stage 2 failed real TypeScript semantic check: ' +
    failures.slice(0, 8).map(issue =>
      (issue.file?.fileName || 'global') + ': ' +
      ts.flattenDiagnosticMessageText(issue.messageText, ' ')).join(' | '));
  return true;
}

export { trackedRegular };
