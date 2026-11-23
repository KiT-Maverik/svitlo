#!/usr/bin/env node
/**
 * Generate static, read-only UI Kit localization Markdown with English reference copy.
 * --allow-missing is a preview-only mode: absent target strings become %%MISSING%%.
 * Never executes authored TypeScript or writes published localized resources.
 * Usage: node shared/ui-kit/scripts/generateUiKitLocaleReference/generate-ui-kit-locale-reference.mjs --component audio --locale it --stdout [--allow-missing]
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { supportedAssessmentMethodLocales } from '../generateAssessmentMethodsReference/generate-assessment-methods-reference.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const sourceDirectory = 'shared/ui-kit/data/locale';
const marker = '%%MISSING%%';

function unwrap(node) {
  while (node && (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node))) {
    node = node.expression;
  }
  return node;
}

export function uiKitComponents(root = repoRoot) {
  const directory = path.join(root, sourceDirectory);
  const index = fs.readFileSync(path.join(directory, 'index.ts'), 'utf8');
  const entries = [...index.matchAll(/^export \* from '\.\/([a-zA-Z][a-zA-Z0-9]*)';$/gm)].map(match => match[1]);
  const files = fs
    .readdirSync(directory)
    .filter(name => name.endsWith('.ts') && !['index.ts', 'locale.types.ts'].includes(name))
    .map(name => name.slice(0, -3));
  if (
    !entries.length ||
    new Set(entries).size !== entries.length ||
    entries.some(name => !files.includes(name)) ||
    files.some(name => !entries.includes(name))
  ) {
    throw new Error('UI Kit component locale index and source files disagree');
  }
  return entries.sort();
}

function declarations(root, relative) {
  const filename = path.join(root, relative);
  const source = ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true);
  if (source.parseDiagnostics.length) throw new Error('Invalid TypeScript: ' + relative);
  const vars = new Map();
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name)) {
        if (vars.has(declaration.name.text)) throw new Error('Duplicate declaration: ' + declaration.name.text);
        vars.set(declaration.name.text, declaration.initializer);
      }
    }
  }
  return vars;
}

function literal(node, vars, visited = new Set()) {
  node = unwrap(node);
  if (!node) throw new Error('Missing locale value');
  if (ts.isIdentifier(node)) {
    if (!vars.has(node.text) || visited.has(node.text)) throw new Error('Unresolved/cyclic locale: ' + node.text);
    return literal(vars.get(node.text), vars, new Set([...visited, node.text]));
  }
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isObjectLiteralExpression(node)) {
    const result = Object.create(null);
    for (const property of node.properties) {
      let name;
      let value;
      if (ts.isShorthandPropertyAssignment(property)) {
        name = property.name.text;
        value = property.name;
      } else if (
        ts.isPropertyAssignment(property) &&
        (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))
      ) {
        name = property.name.text;
        value = property.initializer;
      } else {
        throw new Error('Dynamic locale property is not reviewable');
      }
      if (Object.hasOwn(result, name)) throw new Error('Duplicate locale property: ' + name);
      result[name] = literal(value, vars, visited);
    }
    return result;
  }
  throw new Error('Non-static locale value: ' + ts.SyntaxKind[node.kind]);
}

function flatten(value, prefix = '', output = Object.create(null), allowMissing = false) {
  if (typeof value === 'string') {
    if (value.includes(marker)) throw new Error('Reserved marker in authored translation: ' + prefix);
    if (!value.trim()) {
      if (allowMissing) return output;
      throw new Error('Empty translation: ' + prefix);
    }
    output[prefix] = value;
  } else if (value && typeof value === 'object' && !Array.isArray(value)) {
    const keys = Object.keys(value);
    if (!keys.length && !allowMissing) throw new Error('Empty locale object: ' + prefix);
    for (const key of keys) flatten(value[key], prefix ? prefix + '.' + key : key, output, allowMissing);
  } else {
    throw new Error('Non-string locale field: ' + prefix);
  }
  return output;
}

export function readUiKitComponentReference({ root = repoRoot, component, locale, allowMissing = false }) {
  const languages = supportedAssessmentMethodLocales(root);
  if (!languages.includes(locale)) throw new Error('Unsupported UI Kit locale: ' + locale);
  if (!uiKitComponents(root).includes(component)) throw new Error('Unknown UI Kit component: ' + component);
  const relative = sourceDirectory + '/' + component + '.ts';
  const vars = declarations(root, relative);
  if (!vars.has(component)) throw new Error('Missing exported UI Kit dictionary: ' + relative);
  const dictionary = literal(vars.get(component), vars);
  const extra = Object.keys(dictionary).filter(code => !languages.includes(code));
  const absent = languages.filter(code => !Object.hasOwn(dictionary, code));
  if (extra.length || (!allowMissing && absent.length)) {
    throw new Error(component + ' locales: missing [' + absent.join(', ') + ']; unexpected [' + extra.join(', ') + ']');
  }
  if (!Object.hasOwn(dictionary, 'en')) throw new Error('Missing canonical English dictionary: ' + component);
  const english = flatten(dictionary.en);
  const localized =
    dictionary[locale] === undefined && allowMissing && locale !== 'en'
      ? Object.create(null)
      : flatten(dictionary[locale], '', Object.create(null), allowMissing && locale !== 'en');
  const keys = Object.keys(english);
  const extraKeys = Object.keys(localized).filter(key => !Object.hasOwn(english, key));
  if (extraKeys.length) throw new Error(component + '/' + locale + ' unexpected fields: ' + extraKeys.join(', '));
  const missingKeys = keys.filter(key => !Object.hasOwn(localized, key));
  if (missingKeys.length && (!allowMissing || locale === 'en')) {
    throw new Error(component + '/' + locale + ' missing fields: ' + missingKeys.join(', '));
  }
  return {
    component,
    locale,
    relative,
    missing: missingKeys.length,
    fields: keys.map(key => ({ key, english: english[key], translation: localized[key] ?? marker })),
  };
}

function escapeMarkdown(value) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')
    .replace(/([*_()[\]<>|])/g, '\\$1');
}

export function renderUiKitComponentReference(options) {
  const info = readUiKitComponentReference(options);
  const destination = path.join(
    options.output ?? path.join(options.root ?? repoRoot, 'temp/agent-reference-library'),
    'ui-kit',
    info.component,
    info.locale + '.md',
  );
  const source = path.join(options.root ?? repoRoot, info.relative);
  const link = encodeURI(path.relative(path.dirname(destination), source).split(path.sep).join('/'));
  const lines = [
    '<!-- GENERATED FROM CODE; DO NOT EDIT. -->',
    '# UI Kit — ' + info.component + ' (' + info.locale + ')',
    '',
    'Canonical source: [' + info.relative + '](' + link + ').',
    '',
    'Fields: ' + info.fields.length,
    'Missing translations: ' + info.missing,
    '',
    ...(options.allowMissing && info.missing > 0
      ? ['> DRAFT REFERENCE: missing localized fields; not approved for independent review.', '']
      : []),
    'Compare every localized UI and accessibility message against the English source. No fallback is applied.',
    '',
  ];
  for (const field of info.fields) {
    lines.push(
      '- **' + escapeMarkdown(field.key) + '**',
      '  - English: ' + escapeMarkdown(field.english),
      '  - ' + info.locale + ': ' + escapeMarkdown(field.translation),
    );
  }
  return lines.join('\n') + '\n';
}

export function generateUiKitLocaleReviewArtifacts({
  root,
  output,
  languages,
  manifest,
  saveManifest,
  allowMissing = false,
  components = uiKitComponents(root),
}) {
  const stats = { generated: 0, failures: 0 };
  for (const component of components) {
    for (const locale of languages) {
      try {
        const relative = 'ui-kit/' + component + '/' + locale + '.md';
        const destination = path.join(output, relative);
        const info = readUiKitComponentReference({ root, component, locale, allowMissing });
        const markdown = renderUiKitComponentReference({ root, output, component, locale, allowMissing });
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.writeFileSync(destination, markdown, 'utf8');
        manifest.generated.push({
          kind: 'ui-kit-locale',
          component,
          locale,
          path: relative,
          missing: info.missing,
          reviewReady: info.missing === 0,
        });
        stats.generated++;
      } catch (error) {
        const message = String(error.message || error).slice(0, 1500);
        manifest.failures.push({ kind: 'ui-kit-locale', component, locale, error: message });
        stats.failures++;
        process.stderr.write(
          '::warning::UI Kit ' + component + '/' + locale + ': ' + message.replace(/\n/g, ' ') + '\n',
        );
      }
      saveManifest();
    }
  }
  return stats;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    const allowMissing = args.includes('--allow-missing');
    const positional = args.filter(value => value !== '--allow-missing');
    if (
      positional.length !== 5 ||
      positional[0] !== '--component' ||
      positional[2] !== '--locale' ||
      positional[4] !== '--stdout' ||
      args.filter(value => value === '--allow-missing').length > 1
    ) {
      throw new Error('Usage: --component <name> --locale <language-code> --stdout [--allow-missing]');
    }
    process.stdout.write(
      renderUiKitComponentReference({
        component: positional[1],
        locale: positional[3],
        allowMissing,
      }),
    );
  } catch (error) {
    process.stderr.write('UI Kit reference: ' + error.message + '\n');
    process.exitCode = 1;
  }
}
