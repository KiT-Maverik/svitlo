#!/usr/bin/env node
/**
 * PR-scoped Assessment Methods reference, statically assembled from canonical
 * UI Kit authored Assessment Method definitions.
 *
 * node shared/ui-kit/scripts/generateAssessmentMethodsReference/generate-assessment-methods-reference.mjs --locale uk --stdout
 * node shared/ui-kit/scripts/generateAssessmentMethodsReference/generate-assessment-methods-reference.mjs --locale uk \
 *   --output temp/agent-reference-library/assessment-methods
 *
 * This script does not execute authored TypeScript and never falls back to en.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const sourcePaths = Object.freeze({
  languages: 'shared/engine/schemas/languages.schemas.ts',
  descriptions: 'shared/ui-kit/data/definitions/assessmentMethods',
});
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const tick = String.fromCharCode(96);

function unwrap(node) {
  while (node && (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node))) {
    node = node.expression;
  }
  return node;
}

function sourceDeclarations(root, relative) {
  const filename = path.join(root, relative);
  if (!fs.existsSync(filename) || !fs.statSync(filename).isFile()) {
    throw new Error('Missing canonical Assessment Methods source: ' + relative);
  }
  const ast = ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true);
  if (ast.parseDiagnostics.length) throw new Error('Invalid TypeScript source: ' + relative);
  const declarations = new Map();
  for (const statement of ast.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name)) continue;
      if (declarations.has(declaration.name.text)) throw new Error('Duplicate declaration: ' + declaration.name.text);
      declarations.set(declaration.name.text, declaration.initializer);
    }
  }
  return declarations;
}

/** Resolve only static literals, arrays and records; do not import/execute TS. */
function staticValue(node, declarations, visiting = new Set()) {
  node = unwrap(node);
  if (!node) throw new Error('Missing static declaration value');
  if (ts.isIdentifier(node)) {
    if (!declarations.has(node.text)) throw new Error('Unresolved static reference: ' + node.text);
    if (visiting.has(node.text)) throw new Error('Cyclic static reference: ' + node.text);
    const next = new Set(visiting);
    next.add(node.text);
    return staticValue(declarations.get(node.text), declarations, next);
  }
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(item => staticValue(item, declarations, visiting));
  if (ts.isObjectLiteralExpression(node)) {
    const record = Object.create(null);
    for (const prop of node.properties) {
      let key;
      let value;
      if (ts.isPropertyAssignment(prop)) {
        key = ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name) ? prop.name.text : null;
        value = prop.initializer;
      } else if (ts.isShorthandPropertyAssignment(prop)) {
        key = prop.name.text;
        value = prop.name;
      } else {
        throw new Error('Unsupported dynamic property in canonical Assessment Methods source');
      }
      if (!key) throw new Error('Unsupported computed Assessment Methods key');
      if (Object.hasOwn(record, key)) throw new Error('Duplicate Assessment Methods key: ' + key);
      record[key] = staticValue(value, declarations, visiting);
    }
    return record;
  }
  throw new Error('Non-static Assessment Methods source expression: ' + ts.SyntaxKind[node.kind]);
}

function declaration(root, relative, name) {
  const vars = sourceDeclarations(root, relative);
  if (!vars.has(name)) throw new Error('Missing canonical declaration ' + name + ' in ' + relative);
  return staticValue(vars.get(name), vars);
}

function assertExactKeys(value, keys, context) {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new Error('Invalid ' + context + ' dictionary');
  const extras = Object.keys(value).filter(key => !keys.includes(key));
  const missing = keys.filter(key => !Object.hasOwn(value, key));
  if (extras.length || missing.length) {
    throw new Error(context + ': missing [' + missing.join(', ') + ']; unexpected [' + extras.join(', ') + ']');
  }
}

/**
 * Extract English methodology directly from literal defineAssessmentMethod()
 * arguments. The reference generator deliberately never executes TypeScript.
 */
function readAssessmentMethodDefinitions(root, languages, allowMissing = false) {
  const directory = path.join(root, sourcePaths.descriptions);
  if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) {
    throw new Error('Missing canonical Assessment Methods directory: ' + sourcePaths.descriptions);
  }
  const files = fs
    .readdirSync(directory)
    .filter(name => /^[a-z][A-Za-z0-9]*\.ts$/.test(name) && name !== 'index.ts')
    .sort();
  if (files.length !== 16) throw new Error('Expected exactly 16 canonical Assessment Methods; found ' + files.length);

  const definitions = Object.create(null);
  const knownIds = new Set();
  for (const filename of files) {
    const key = filename.slice(0, -3);
    const relative = path.posix.join(sourcePaths.descriptions, filename);
    const fullPath = path.join(root, relative);
    const ast = ts.createSourceFile(fullPath, fs.readFileSync(fullPath, 'utf8'), ts.ScriptTarget.Latest, true);
    if (ast.parseDiagnostics.length) throw new Error('Invalid TypeScript source: ' + relative);
    let config;
    for (const statement of ast.statements) {
      if (!ts.isVariableStatement(statement)) continue;
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name) || declaration.name.text !== key) continue;
        if (config) throw new Error('Duplicate definition: ' + key);
        const call = unwrap(declaration.initializer);
        if (
          !ts.isCallExpression(call) ||
          !ts.isIdentifier(call.expression) ||
          call.expression.text !== 'defineAssessmentMethod' ||
          call.arguments.length !== 1
        ) {
          throw new Error('Expected defineAssessmentMethod() for ' + key);
        }
        config = staticValue(call.arguments[0], new Map());
      }
    }
    if (!config || config.slug !== key) {
      throw new Error('Incorrect canonical Assessment Method definition: ' + key);
    }
    if (typeof config.id !== 'string' || !UUID.test(config.id)) {
      throw new Error('Invalid canonical Assessment Method UUID: ' + key);
    }
    if (knownIds.has(config.id.toLowerCase())) {
      throw new Error('Duplicate canonical Assessment Method UUID: ' + config.id);
    }
    knownIds.add(config.id.toLowerCase());
    const description = config.description?.en;
    if (typeof description !== 'string' || !description.trim()) {
      throw new Error('Missing English methodological description for ' + key);
    }
    if (allowMissing) {
      const unexpected = Object.keys(config.title).filter(code => !languages.includes(code));
      if (unexpected.length) throw new Error('Unexpected Assessment Method language(s): ' + unexpected.join(', '));
      if (typeof config.title.en !== 'string' || !config.title.en.trim())
        throw new Error('Missing English title for ' + key);
    } else {
      assertExactKeys(config.title, languages, 'Assessment Method titles for ' + key);
    }
    if (allowMissing) {
      const unexpectedDescriptions = Object.keys(config.description).filter(code => !languages.includes(code));
      if (unexpectedDescriptions.length) {
        throw new Error('Unexpected Assessment Method description language(s): ' + unexpectedDescriptions.join(', '));
      }
    } else {
      assertExactKeys(config.description, languages, 'Assessment Method descriptions for ' + key);
    }
    definitions[key] = { id: config.id, description, descriptions: config.description, title: config.title };
  }
  return definitions;
}

export function supportedAssessmentMethodLocales(root = repoRoot) {
  const definitions = declaration(root, sourcePaths.languages, 'DEFAULT_SUPPORTED_LANGUAGES');
  if (!Array.isArray(definitions) || !definitions.length) throw new Error('Empty DEFAULT_SUPPORTED_LANGUAGES');
  const codes = definitions.map(item => item?.language);
  if (codes.some(code => typeof code !== 'string' || !/^[a-z]{2,3}$/.test(code))) {
    throw new Error('Invalid language key in DEFAULT_SUPPORTED_LANGUAGES');
  }
  if (new Set(codes).size !== codes.length) throw new Error('Duplicate language in DEFAULT_SUPPORTED_LANGUAGES');
  return codes;
}

export function readAssessmentMethodsReference({ root = repoRoot, locale, allowMissing = false }) {
  const languages = supportedAssessmentMethodLocales(root);
  if (!locale || !languages.includes(locale)) throw new Error('Unsupported Assessment Methods locale: ' + locale);
  const definitions = readAssessmentMethodDefinitions(root, languages, allowMissing);
  const keys = Object.keys(definitions);
  const methods = keys.map(key => {
    const definition = definitions[key];
    const title = definition.title[locale];
    const localizedDescription = definition.descriptions[locale];
    const missingTitle = typeof title !== 'string' || !title.trim();
    const missingDescription = typeof localizedDescription !== 'string' || !localizedDescription.trim();
    if (missingTitle && (!allowMissing || locale === 'en')) {
      throw new Error('Missing Assessment Method title for ' + key + ' (' + locale + ')');
    }
    if (missingDescription && (!allowMissing || locale === 'en')) {
      throw new Error('Missing Assessment Method description for ' + key + ' (' + locale + ')');
    }
    if (!missingTitle && title === '%%MISSING%%') throw new Error('Reserved marker in Assessment Method title: ' + key);
    if (!missingDescription && localizedDescription === '%%MISSING%%') {
      throw new Error('Reserved marker in Assessment Method description: ' + key);
    }
    if (!missingTitle && /[\r\n]/.test(title))
      throw new Error('Multiline Assessment Method title for ' + key + ' (' + locale + ')');
    if (!missingDescription && /[\r\n]/.test(localizedDescription)) {
      throw new Error('Multiline Assessment Method description for ' + key + ' (' + locale + ')');
    }
    return {
      key,
      id: definition.id,
      title: missingTitle ? '%%MISSING%%' : title,
      localizedDescription: missingDescription ? '%%MISSING%%' : localizedDescription,
      description: definition.description.trim(),
    };
  });
  return {
    locale,
    methods,
    missing: methods.reduce(
      (count, method) =>
        count + Number(method.title === '%%MISSING%%') + Number(method.localizedDescription === '%%MISSING%%'),
      0,
    ),
  };
}

function escapeMarkdown(text) {
  return text.replace(/\\/g, '\\\\').replace(/([*_()[\]<>])/g, '\\$1');
}

export function renderAssessmentMethodsReference(options) {
  const { locale, methods, missing } = readAssessmentMethodsReference(options);
  const directory = path.join(options.output ?? path.join(options.root ?? repoRoot, 'temp/agent-reference-library'), 'assessment-methods');
  const links = {
    descriptions: path.relative(directory, path.join(options.root ?? repoRoot, sourcePaths.descriptions)).split(path.sep).join('/'),
  };
  const lines = [
    '<!-- GENERATED FROM CODE; DO NOT EDIT. -->',
    '# Assessment Methods — ' + locale,
    '',
    'Localized titles and descriptions: ' +
      tick +
      locale +
      tick +
      '. English methodological source is shown for review.',
    '',
    'An **Assessment Method** specifies the cognitive operation a learner must demonstrate and the evidence a task should elicit. ' +
      'A **Question type** specifies how the learner supplies a response (such as selecting, matching or entering text). ' +
      'The same Assessment Method can be evaluated using different Question types; the same Question type can evaluate different methods.',
    '',
    'Use the exact ' +
      tick +
      'AssessmentMethodKey' +
      tick +
      ' in machine-readable configurations. ' +
      'This temporary reference is not a new taxonomy or a replacement for canonical definitions.',
    '',
    'Canonical sources: [Assessment Method definitions, UUIDs, titles and English methodological descriptions](' +
      links.descriptions +
      ').',
    '',
    'Methods: ' + methods.length,
    ...(options.allowMissing
      ? [
          'Missing translations: ' + missing,
          ...(missing > 0
            ? ['', '> DRAFT REFERENCE: missing localized fields; not approved for independent review.']
            : []),
        ]
      : []),
    '',
  ];
  for (const method of methods) {
    lines.push(
      '## ' + tick + method.key + tick,
      '',
      '- **UUID:** ' + tick + method.id + tick,
      '- **Frontend title (' + locale + '):** ' + escapeMarkdown(method.title),
      '- **Localized description (' + locale + '):** ' + escapeMarkdown(method.localizedDescription),
      '- **Methodological description (English):** ' + escapeMarkdown(method.description),
      '- **Canonical definitions:** [definition and methodology](' + links.descriptions + '/' + method.key + '.ts)',
      '',
    );
  }
  return lines.join('\n');
}

/** Generates run-scoped Assessment Method references and manifest entries. */
export function generateAssessmentMethodsReviewArtifacts({
  root,
  output,
  languages,
  manifest,
  saveManifest,
  allowMissing = false,
}) {
  const destinationRoot = path.join(output, 'assessment-methods');
  fs.mkdirSync(destinationRoot, { recursive: true });
  const stats = { generated: 0, failures: 0 };
  for (const locale of languages) {
    try {
      const markdown = renderAssessmentMethodsReference({ root, output, locale, allowMissing });
      const missing = Number(markdown.match(/^Missing translations: (\d+)$/m)?.[1] ?? 0);
      const relative = 'assessment-methods/' + locale + '.md';
      fs.writeFileSync(path.join(output, relative), markdown, 'utf8');
      manifest.generated.push({
        kind: 'assessment-method',
        locale,
        path: relative,
        missing,
        reviewReady: missing === 0,
      });
      stats.generated++;
      process.stdout.write('Generated ' + relative + '\n');
    } catch (error) {
      const message = String(error.message || error).slice(0, 1500);
      manifest.failures.push({ kind: 'assessment-method', locale, error: message });
      stats.failures++;
      process.stderr.write('::warning::Assessment Methods ' + locale + ': ' + message.replace(/\n/g, ' ') + '\n');
    }
    saveManifest();
  }
  return stats;
}

function parseArguments(args) {
  const options = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--stdout') options.stdout = true;
    else if (arg === '--locale' || arg === '--output') {
      if (!args[i + 1] || args[i + 1].startsWith('--')) throw new Error('Missing value for ' + arg);
      if (options[arg.slice(2)]) throw new Error('Duplicate option: ' + arg);
      options[arg.slice(2)] = args[++i];
    } else throw new Error('Unknown option: ' + arg);
  }
  if (!options.locale || Boolean(options.stdout) === Boolean(options.output)) {
    throw new Error('Usage: --locale <code> with exactly one of --stdout or --output <directory>');
  }
  return options;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const options = parseArguments(process.argv.slice(2));
    const markdown = renderAssessmentMethodsReference({ locale: options.locale });
    if (options.stdout) process.stdout.write(markdown);
    else {
      const output = path.resolve(repoRoot, options.output);
      if (!output.startsWith(path.join(repoRoot, 'temp') + path.sep)) {
        throw new Error('Output must remain under ignored temp/');
      }
      fs.mkdirSync(output, { recursive: true });
      fs.writeFileSync(path.join(output, options.locale + '.md'), markdown, 'utf8');
    }
  } catch (error) {
    process.stderr.write('Assessment Methods reference: ' + error.message + '\n');
    process.exitCode = 1;
  }
}
