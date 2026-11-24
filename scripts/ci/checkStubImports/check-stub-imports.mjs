#!/usr/bin/env node
/**
 * @fileoverview Required develop PR guard for newly introduced Course stub references.
 *
 * Resolve TypeScript/JavaScript symbols through aliases, namespace imports,
 * local assignments and indirect ESM re-exports. Only newly added source lines
 * are prohibited: historical untouched authorship is not rewritten.
 *
 * This guard is supplementary to independent strict publisher rejection.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';

const names = new Set(['defineLessonStub', 'defineEpisodeStub', 'defineAssessmentStub']);
const sha = /^[0-9a-f]{40}$/i;
const extensions = /\.(?:[cm]?[jt]sx?)$/;
const stubModule = /\/configurators\/courses\/defineCourseChildStubs\/defineCourseChildStubs\.(?:[cm]?[jt]s)$/;

function git(root, ...args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
}
const normalize = value => value.replaceAll('\\', '/');
function isAuthoredSource(file) {
  return extensions.test(file) &&
    !/\.((?:spec|test|typecheck|stories))\.[cm]?[jt]sx?$/.test(file) &&
    !file.startsWith('shared/engine/configurators/courses/defineCourseChildStubs/') &&
    !file.startsWith('scripts/ci/checkStubImports/') &&
    !file.includes('/node_modules/') &&
    !file.includes('/dist/');
}

/** Git's zero-context unified diff locates every newly introduced source line. */
export function addedLines(root, base, head) {
  if (!sha.test(base) || !sha.test(head)) throw new Error('Require exact base/head commit SHA');
  const patch = git(root, 'diff', '--no-ext-diff', '--no-color', '--find-renames', '--unified=0',
    '--diff-filter=ACMR', base + '...' + head, '--');
  const result = new Map();
  let file = null;
  let line = 0;
  for (const text of patch.split('\n')) {
    if (text.startsWith('diff --git ')) { file = null; continue; }
    if (text.startsWith('+++ ')) {
      const match = /^\+\+\+ (?:b\/|"b\/)(.*?)(?:"|)$/.exec(text);
      file = match && isAuthoredSource(match[1]) ? match[1] : null;
      continue;
    }
    const hunk = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(text);
    if (hunk) { line = Number(hunk[1]); continue; }
    if (text.startsWith('+') && !text.startsWith('+++ ')) {
      if (file) {
        if (!result.has(file)) result.set(file, new Set());
        result.get(file).add(line);
      }
      line++;
    } else if (text.startsWith(' ')) {
      line++;
    }
  }
  return result;
}

function options(root) {
  return {
    noEmit: true,
    skipLibCheck: true,
    allowJs: true,
    checkJs: false,
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    baseUrl: root,
    paths: {
      '@svitlo/engine/build': ['shared/engine/build.ts'],
      '@svitlo/engine/runtime': ['shared/engine/runtime.ts'],
      '#schemas': ['shared/engine/schemas/index.ts'],
      '#types': ['shared/engine/types/index.ts'],
      '#utils': ['shared/engine/utils/index.ts'],
      '#configurators': ['shared/engine/configurators/index.ts'],
    },
  };
}

/**
 * The only identity recognized as a stub factory is its declaration inside
 * Engine's source module. A same-named local helper is not prohibited.
 */
export function scanReferences(root, lines) {
  const files = [...lines.keys()].filter(file => fs.existsSync(path.join(root, file)));
  if (files.length === 0) return [];
  const program = ts.createProgram(files.map(file => path.join(root, file)), options(root));
  const checker = program.getTypeChecker();
  const findings = [];
  for (const file of files) {
    const source = program.getSourceFile(path.join(root, file));
    if (!source) throw new Error('Cannot analyze changed source: ' + file);
    const visited = new Set();
    const pointsToStub = symbol => {
      if (!symbol || visited.has(symbol)) return false;
      visited.add(symbol);
      if (symbol.flags & ts.SymbolFlags.Alias) {
        const target = checker.getAliasedSymbol(symbol);
        if (target !== symbol && pointsToStub(target)) return true;
      }
      for (const decl of symbol.declarations ?? []) {
        const name = decl.name && ts.isIdentifier(decl.name) ? decl.name.text : undefined;
        if (name && names.has(name) && stubModule.test(normalize(decl.getSourceFile().fileName))) return true;
        if (ts.isVariableDeclaration(decl) && decl.initializer && expressionIsStub(decl.initializer)) return true;
        if (ts.isBindingElement(decl) && ts.isObjectBindingPattern(decl.parent)) {
          const initializer = decl.parent.parent.initializer;
          const name = decl.propertyName?.getText() ?? decl.name.getText();
          if (initializer && names.has(name)) {
            const type = checker.getTypeAtLocation(initializer);
            if (pointsToStub(type.getProperty(name))) return true;
          }
        }
      }
      return false;
    };
    const expressionIsStub = node => {
      if (pointsToStub(checker.getSymbolAtLocation(node))) return true;
      if (ts.isPropertyAccessExpression(node) && pointsToStub(checker.getSymbolAtLocation(node.name))) return true;
      if (ts.isParenthesizedExpression(node)) return expressionIsStub(node.expression);
      return false;
    };
    const scan = node => {
      if (ts.isIdentifier(node)) {
        // Each symbol check has its own cycle guard: distinct references must
        // not incorrectly inherit the visited nodes of an earlier identifier.
        visited.clear();
        if (pointsToStub(checker.getSymbolAtLocation(node))) {
          const pos = source.getLineAndCharacterOfPosition(node.getStart(source));
          if (lines.get(file).has(pos.line + 1)) {
            findings.push({ file, line: pos.line + 1, text: 'New Course stub reference: ' + node.text });
          }
        }
      }
      ts.forEachChild(node, scan);
    };
    scan(source);
  }
  return [...new Map(findings.map(item => [item.file + ':' + item.line, item])).values()];
}

function annotation(text) {
  return text.replaceAll('%', '%25').replaceAll('\r', '%0D').replaceAll('\n', '%0A').replaceAll(',', '%2C');
}

export function main(args, root = path.resolve(fileURLToPath(new URL('../../..', import.meta.url)))) {
  if (args.length !== 2) throw new Error('Usage: check-stub-imports.mjs <base-sha> <head-sha>');
  const lines = addedLines(root, args[0], args[1]);
  const findings = scanReferences(root, lines);
  for (const entry of findings) {
    console.error('::error file=' + annotation(entry.file) + ',line=' + entry.line + '::' + annotation(entry.text));
  }
  if (findings.length) throw new Error(findings.length + ' new Course stub import(s) or use(s) are forbidden on protected branches');
  console.log('Course stub source guard: no newly added stub imports or uses (' + lines.size + ' changed source files).');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(process.argv.slice(2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
