#!/usr/bin/env node
/** Migrate actual JS/TS module specifiers from removed Engine subpaths, without editing string fixtures. */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import ts from 'typescript';

// Symbols without canonical Engine exports must be migrated by their owners.
// Never generate a reference to an unavailable package or fabricate an alias.
const unresolvedLegacySymbols = new Map([
  ['taxonomy', new Set(['SkillId'])],
  [
    'localization',
    new Set([
      'AdditionalLanguages',
      'AdditionalLanguage',
      'SupportedLanguage',
      'LanguageFor',
      'LocalizedContent',
      'LanguageConfiguration',
    ]),
  ],
]);
const runtimeSubpaths = new Set(['localization', 'schemas', 'types', 'utils']);
const subpaths = new Set([
  'builders',
  'content',
  'generation',
  'lesson',
  'localization',
  'taxonomy',
  'assessment-methods',
  'definitions',
  'schemas',
  'configurators',
  'types',
  'utils',
]);
const prefix = '@svitlo/engine/';

export function rewriteEngineImports(source, filename = 'source.ts') {
  const file = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
  const edits = [];
  function replace(start, end, content) {
    edits.push({ start, end, content });
  }
  function rewriteSpecifier(module, declaration) {
    if (!module || !ts.isStringLiteralLike(module) || !module.text.startsWith(prefix)) return;
    const subpath = module.text.slice(prefix.length);
    if (subpath === 'build' || subpath === 'runtime') return;
    if (!subpaths.has(subpath)) throw new Error(filename + ': unsupported Engine import ' + module.text);
    // The former content subpath exposed contracts that are not all part of
    // today's Engine API. Their individual consumers need deliberate migration.
    if (subpath === 'content') {
      throw new Error(filename + ': manual migration required for ' + module.text);
    }

    const isImport = declaration && ts.isImportDeclaration(declaration);
    const members = declaration
      ? isImport
        ? declaration.importClause?.namedBindings
        : ts.isExportDeclaration(declaration)
          ? declaration.exportClause
          : null
      : null;
    const named = members && (ts.isNamedImports(members) || ts.isNamedExports(members)) ? members.elements : null;
    const unresolved = unresolvedLegacySymbols.get(subpath);
    if (named && unresolved) {
      for (const element of named) {
        const name = (element.propertyName ?? element.name).text;
        if (unresolved.has(name)) {
          throw new Error(filename + ': manual migration required for ' + name + ' from ' + module.text);
        }
      }
    }
    // Namespace imports/exports can hide unavailable symbols as well.
    if (
      unresolved &&
      ((members && ts.isNamespaceImport(members)) ||
        (declaration &&
          ts.isExportDeclaration(declaration) &&
          (!declaration.exportClause || ts.isNamespaceExport(declaration.exportClause))))
    ) {
      throw new Error(filename + ': manual migration required for wildcard namespace from ' + module.text);
    }
    const target = runtimeSubpaths.has(subpath) ? '@svitlo/engine/runtime' : '@svitlo/engine/build';
    replace(module.getStart(file) + 1, module.end - 1, target);
  }

  for (const statement of file.statements) {
    if (ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) {
      rewriteSpecifier(statement.moduleSpecifier, statement);
    } else if (ts.isImportEqualsDeclaration(statement) && ts.isExternalModuleReference(statement.moduleReference)) {
      rewriteSpecifier(statement.moduleReference.expression, null);
    }
  }
  function walk(node) {
    if (
      ts.isCallExpression(node) &&
      node.arguments.length === 1 &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) && node.expression.text === 'require'))
    ) {
      rewriteSpecifier(node.arguments[0], null);
    }
    ts.forEachChild(node, walk);
  }
  walk(file);

  return edits
    .sort((a, b) => b.start - a.start)
    .reduce((text, edit) => text.slice(0, edit.start) + edit.content + text.slice(edit.end), source);
}

export function rewriteTrackedFiles({ write = false, root = process.cwd() } = {}) {
  const paths = execFileSync('git', ['ls-files', '-z'], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  })
    .split('\0')
    .filter(path => /\.(?:tsx?|mts|cts|jsx?|mjs|cjs)$/.test(path));
  const grouped = {};
  let count = 0;
  for (const path of paths) {
    const filename = root + '/' + path;
    const oldText = readFileSync(filename, 'utf8');
    if (!oldText.includes(prefix)) continue;
    const newText = rewriteEngineImports(oldText, path);
    if (oldText === newText) continue;
    count++;
    const group = path.split('/').slice(0, 2).join('/');
    grouped[group] = (grouped[group] || 0) + 1;
    if (write) writeFileSync(filename, newText);
  }
  return { count, grouped };
}
if (process.argv[1]?.endsWith('/migrate-engine-imports.mjs')) {
  const mode = process.argv[2];
  if (mode !== '--write' && mode !== '--check') {
    console.error('Usage: node scripts/migrateEngineImports/migrate-engine-imports.mjs --check|--write');
    process.exitCode = 2;
  } else {
    try {
      const result = rewriteTrackedFiles({ write: mode === '--write' });
      console.log(JSON.stringify({ mode, ...result }, null, 2));
      if (mode === '--check' && result.count) process.exitCode = 1;
    } catch (error) {
      console.error(error);
      process.exitCode = 1;
    }
  }
}
