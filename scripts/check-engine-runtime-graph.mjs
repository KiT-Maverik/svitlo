#!/usr/bin/env node
/**
 * Fail closed when the public Engine runtime reaches a Node or authoring dependency.
 * Static TypeScript module graph traversal catches barrels, reexports and aliases.
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const engineRoot = join(repositoryRoot, 'shared/engine');
const aliases = {
  '#configurators': 'configurators/index.ts',
  '#lessons': 'lessons/index.ts',
  '#schemas': 'schemas/index.ts',
  '#utils': 'utils/index.ts',
  '#types': 'types/index.ts',
};

function localModule(from, specifier) {
  let target;
  if (specifier.startsWith('.')) target = resolve(dirname(from), specifier);
  else if (Object.hasOwn(aliases, specifier)) target = join(engineRoot, aliases[specifier]);
  else return null;
  const candidates = /\.[cm]?[jt]sx?$/.test(target) ? [target] : [target + '.ts', target + '.tsx', join(target, 'index.ts')];
  const file = candidates.find(existsSync);
  if (!file) throw new Error('Unresolved internal module ' + specifier + ' from ' + from);
  return file;
}

function runtimeModuleSpecifiers(source, file) {
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  const specifiers = [];
  const add = (node, value) => {
    if (!node || !ts.isStringLiteralLike(node)) return;
    specifiers.push(value ?? node.text);
  };
  for (const node of ast.statements) {
    if (ts.isImportDeclaration(node)) {
      const clause = node.importClause;
      const allType = clause?.isTypeOnly ||
        (clause?.namedBindings && ts.isNamedImports(clause.namedBindings) &&
          !clause.name && clause.namedBindings.elements.length > 0 &&
          clause.namedBindings.elements.every(item => item.isTypeOnly));
      if (!allType) add(node.moduleSpecifier);
    } else if (ts.isExportDeclaration(node)) {
      const onlyTypes = node.isTypeOnly ||
        (node.exportClause && ts.isNamedExports(node.exportClause) &&
          node.exportClause.elements.length > 0 && node.exportClause.elements.every(item => item.isTypeOnly));
      if (!onlyTypes) add(node.moduleSpecifier);
    }
  }
  const visit = node => {
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword &&
        node.arguments.length === 1) add(node.arguments[0]);
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(ast, visit);
  return specifiers;
}

const forbiddenFile = path =>
  /(?:^|\/)generators\//.test(path) ||
  /(?:^|\/)configurators_old\//.test(path) ||
  /\.data\.[cm]?[jt]sx?$/.test(path) ||
  /\/configurators\/(?:.*\/)?define[A-Z][A-Za-z0-9]*\.(?:ts|tsx)$/.test(path) ||
  /\/lessons\/(?:createLesson|createSection|createContentBlock|createLessonOverrides)\.ts$/.test(path);

export function checkRuntimeImports(entry = join(engineRoot, 'runtime.ts')) {
  const visited = new Set();
  const errors = [];
  function visit(file, chain) {
    if (visited.has(file)) return;
    visited.add(file);
    const relative = file.startsWith(engineRoot) ? file.slice(engineRoot.length + 1) : file;
    if (forbiddenFile(file)) errors.push('Authoring module reached: ' + [...chain, relative].join(' -> '));
    const source = readFileSync(file, 'utf8');
    for (const specifier of runtimeModuleSpecifiers(source, file)) {
      if (/^(?:node:|fs(?:\/promises)?$|path$|url$|child_process$|module$)/.test(specifier)) {
        errors.push('Node builtin ' + specifier + ' reached via ' + [...chain, relative].join(' -> '));
        continue;
      }
      if (specifier.startsWith('@svitlo/engine/build') || specifier === '@svitlo/engine') {
        errors.push('Build/root Engine import reached via ' + [...chain, relative].join(' -> '));
        continue;
      }
      const next = localModule(file, specifier);
      if (next) visit(next, [...chain, relative]);
    }
  }
  visit(resolve(entry), []);
  return { checked: visited.size, errors };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const { checked, errors } = checkRuntimeImports();
    if (errors.length) {
      console.error(errors.join('\n'));
      process.exitCode = 1;
    } else {
      console.log('Engine runtime import graph safe (' + checked + ' source modules)');
    }
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
