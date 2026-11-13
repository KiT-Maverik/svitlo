#!/usr/bin/env node
/** Migrate actual JS/TS module specifiers from removed Engine subpaths, without editing string fixtures. */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import ts from 'typescript';

const taxonomyTypes = new Set(['SkillId']);
const localizationContracts = new Set([
  'DEFAULT_SUPPORTED_LANGUAGES',
  'FALLBACK_LANGUAGE',
  'FALLBACK_LOCALE',
  'TextDirection',
  'LanguageDefinition',
  'AdditionalLanguages',
  'AdditionalLanguage',
  'DefaultSupportedLanguage',
  'SupportedLanguage',
  'Locale',
  'LanguageCode',
  'LanguageFor',
  'LocalizedContent',
  'LanguageConfiguration',
]);
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
    const contract =
      subpath === 'content'
        ? '@svitlo/contracts/content'
        : subpath === 'taxonomy'
          ? '@svitlo/contracts/taxonomy'
          : subpath === 'localization'
            ? '@svitlo/contracts/localization'
            : null;
    const ownedTypes =
      subpath === 'taxonomy' ? taxonomyTypes : subpath === 'localization' ? localizationContracts : null;
    let target = subpath === 'content' ? contract : '@svitlo/engine/build';

    if (ownedTypes && declaration) {
      const isImport = ts.isImportDeclaration(declaration);
      const members = isImport ? declaration.importClause?.namedBindings : declaration.exportClause;
      const named = members && (ts.isNamedImports(members) || ts.isNamedExports(members)) ? members.elements : null;
      if (named) {
        const contracts = [];
        const engine = [];
        for (const element of named) {
          const name = (element.propertyName ?? element.name).text;
          (ownedTypes.has(name) ? contracts : engine).push(element);
        }
        if (contracts.length && engine.length) {
          if (isImport && declaration.importClause?.name) {
            throw new Error(filename + ': unsupported mixed default import from ' + module.text);
          }
          const allType = isImport ? declaration.importClause?.isTypeOnly : declaration.isTypeOnly;
          const verb = isImport ? 'import' : 'export';
          const render = (members, path) =>
            verb +
            ' ' +
            (allType ? 'type ' : '') +
            '{ ' +
            members
              .map(item => (allType ? item.getText(file).replace(/^type\s+/, '') : item.getText(file)))
              .join(', ') +
            ' } from ' +
            source[module.getStart(file)] +
            path +
            source[module.end - 1] +
            ';';
          replace(
            declaration.getStart(file),
            declaration.end,
            render(contracts, contract) + '\n' + render(engine, '@svitlo/engine/build'),
          );
          return;
        }
        if (contracts.length && !engine.length) target = contract;
      }
    }
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
    console.error('Usage: node scripts/migrate-engine-imports.mjs --check|--write');
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
