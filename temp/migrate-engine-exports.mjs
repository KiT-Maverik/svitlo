#!/usr/bin/env node
// One-time Engine package import migration. Delete this script after writing the source diff.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const rootSpecifier = '@svitlo/engine';
const buildSymbol = /^(?:define[A-Z]|create(?:Lesson|Section|ContentBlock|Course|Module|Chapter|Episode|Flashcard|Question|Skill|Assessment)|configuratorArrayToSlugMap|onlyLocales|onlyStrings|splitLocalizedFields|resolvePublicationLanguages|validateRequestedPublication|build[A-Z])/;
const isCode = path => /\.(?:tsx?|mts|cts|jsx?|mjs|cjs)$/.test(path);
const isBuildPath = path =>
  /^scripts\//.test(path) ||
  /^content\/.*\/data\//.test(path) ||
  /^content\/.*\/scripts\//.test(path) ||
  /\.data\.[cm]?[jt]sx?$/.test(path);

function targetFor(path, named) {
  if (path.startsWith('apps/') || path.startsWith('shared/ui-kit/') || path.startsWith('shared/adapters/')) {
    return rootSpecifier + '/runtime';
  }
  if (isBuildPath(path)) return rootSpecifier + '/build';
  if (named.some(name => buildSymbol.test(name))) return rootSpecifier + '/build';
  return rootSpecifier + '/runtime';
}

function namedImports(node) {
  if (ts.isImportDeclaration(node)) {
    const clause = node.importClause;
    if (!clause) return [];
    const names = [];
    if (clause.name) names.push(clause.name.text);
    const bindings = clause.namedBindings;
    if (bindings && ts.isNamedImports(bindings)) {
      names.push(...bindings.elements.map(item => (item.propertyName ?? item.name).text));
    }
    return names;
  }
  if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)) {
    return node.exportClause.elements.map(item => (item.propertyName ?? item.name).text);
  }
  return [];
}

function rewrite(source, path) {
  if (!source.includes(rootSpecifier)) return source;
  const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true,
    /\.tsx$/.test(path) ? ts.ScriptKind.TSX : /\.[cm]?jsx?$/.test(path) ? ts.ScriptKind.JS : ts.ScriptKind.TS);
  const edits = [];
  function replace(module, parent) {
    if (!module || !ts.isStringLiteralLike(module) || module.text !== rootSpecifier) return;
    const names = namedImports(parent);
    const target = targetFor(path, names);
    edits.push({ start: module.getStart(ast) + 1, end: module.getEnd() - 1, target });
  }
  for (const node of ast.statements) {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) replace(node.moduleSpecifier, node);
  }
  function walk(node) {
    if (ts.isCallExpression(node) && node.arguments.length === 1 &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) && node.expression.text === 'require'))) {
      replace(node.arguments[0], node);
    }
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) {
      replace(node.argument.literal, node);
    }
    ts.forEachChild(node, walk);
  }
  walk(ast);
  return edits.sort((a, b) => b.start - a.start)
    .reduce((text, item) => text.slice(0, item.start) + item.target + text.slice(item.end), source);
}

const mode = process.argv[2];
if (!['--write', '--check'].includes(mode)) {
  console.error('Usage: node temp/migrate-engine-exports.mjs --write|--check');
  process.exit(2);
}
const tracked = execFileSync('git', ['ls-files', '-z'], {
  cwd: root, encoding: 'utf8', maxBuffer: 48 * 1024 * 1024,
}).split('\0').filter(isCode);
let count = 0;
const grouped = {};
for (const path of tracked) {
  if (path.startsWith('shared/engine/') || path.startsWith('temp/')) continue;
  const filename = resolve(root, path);
  const before = readFileSync(filename, 'utf8');
  const after = rewrite(before, path);
  if (after === before) continue;
  count++;
  const group = path.split('/').slice(0, 2).join('/');
  grouped[group] = (grouped[group] ?? 0) + 1;
  if (mode === '--write') writeFileSync(filename, after);
}
console.log(JSON.stringify({ mode, count, grouped }, null, 2));
if (mode === '--check' && count) process.exitCode = 1;
