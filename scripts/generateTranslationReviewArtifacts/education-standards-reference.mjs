/**
 * Produce Code-derived, review-only EducationStandard Markdown.
 * Static source inspection preserves %%MISSING%% previews without weakening
 * Engine's strict full-locale Build validation or introducing a runtime import.
 */
import fs from 'node:fs';
import path from 'node:path';
import { loadEducationStandards } from '../../shared/ui-kit/scripts/generateLocales/loadEducationStandards.mjs';
import ts from 'typescript';

const dataDirectory = 'shared/ui-kit/data/definitions/educationStandards/data';
const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const MISSING = '%%MISSING%%';
const tick = String.fromCharCode(96);

function readLiteral(node, context) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((child, i) => readLiteral(child, context + '[' + i + ']'));
  }
  if (ts.isObjectLiteralExpression(node)) {
    const result = Object.create(null);
    for (const property of node.properties) {
      if (
        !ts.isPropertyAssignment(property) ||
        !(ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))
      ) {
        throw Error('Non-static EducationStandard property: ' + context);
      }
      const key = property.name.text;
      if (Object.hasOwn(result, key)) throw Error('Duplicate property: ' + context + '.' + key);
      result[key] = readLiteral(property.initializer, context + '.' + key);
    }
    return result;
  }
  throw Error('Unsupported EducationStandard expression: ' + context + ' ' + ts.SyntaxKind[node.kind]);
}

function parseFile(file, exportName) {
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  if (source.parseDiagnostics.length) throw Error('Invalid authored TypeScript: ' + file);
  let config;
  for (const statement of source.statements) {
    if (
      !ts.isVariableStatement(statement) ||
      !statement.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword)
    )
      continue;
    for (const variable of statement.declarationList.declarations) {
      if (!ts.isIdentifier(variable.name) || variable.name.text !== exportName) continue;
      if (config) throw Error('Duplicate authored export ' + exportName);
      const node = variable.initializer;
      if (
        !node ||
        !ts.isCallExpression(node) ||
        !ts.isIdentifier(node.expression) ||
        node.expression.text !== 'defineEducationStandard' ||
        node.arguments.length !== 1
      ) {
        throw Error('Expected defineEducationStandard() in ' + file);
      }
      config = readLiteral(node.arguments[0], exportName);
    }
  }
  if (!config) throw Error('Missing EducationStandard export: ' + exportName);
  return config;
}

function sourceIndex(root) {
  const filename = path.join(root, dataDirectory, 'index.ts');
  const source = ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true);
  if (source.parseDiagnostics.length) throw Error('Invalid EducationStandard source index');
  const map = new Map();
  for (const statement of source.statements) {
    if (
      !ts.isExportDeclaration(statement) ||
      !ts.isNamedExports(statement.exportClause) ||
      !statement.moduleSpecifier ||
      !ts.isStringLiteral(statement.moduleSpecifier) ||
      statement.exportClause.elements.length !== 1
    ) {
      throw Error('Unsupported source index export');
    }
    const target = statement.moduleSpecifier.text;
    const exported = statement.exportClause.elements[0];
    const slug = exported.name.text;
    if (
      exported.propertyName ||
      !/^\.\/[a-z][A-Za-z0-9]*\/[a-z][A-Za-z0-9]*\.data$/.test(target) ||
      path.posix.basename(target, '.data') !== slug ||
      map.has(slug)
    ) {
      throw Error('Unsafe or duplicated source index entry: ' + target);
    }
    const relative = dataDirectory + '/' + target.slice(2) + '.ts';
    const full = path.join(root, relative);
    if (!fs.existsSync(full) || fs.lstatSync(full).isSymbolicLink() || !fs.statSync(full).isFile()) {
      throw Error('Missing or unsafe EducationStandard source: ' + relative);
    }
    map.set(slug, relative);
  }
  if (!map.size) throw Error('Empty EducationStandard source index');
  const actual = [];
  for (const entry of fs.readdirSync(path.join(root, dataDirectory), { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const folder = path.join(root, dataDirectory, entry.name);
    if (fs.lstatSync(folder).isSymbolicLink()) throw Error('Unsafe standards directory');
    for (const file of fs.readdirSync(folder, { withFileTypes: true })) {
      if (!file.name.endsWith('.data.ts')) continue;
      if (!file.isFile() || file.isSymbolicLink()) throw Error('Unsafe standards source file');
      actual.push(path.posix.join(dataDirectory, entry.name, file.name));
    }
  }
  if (actual.length !== map.size || actual.some(filename => ![...map.values()].includes(filename))) {
    throw Error('EducationStandard index omits authored data files');
  }
  return map;
}

const required = (value, label) => {
  if (typeof value !== 'string' || !value.trim()) throw Error('Missing ' + label);
  return value;
};

export function readEducationStandardSources(root, registered) {
  const entries = [];
  const seen = new Set();
  for (const [slug, sourcePath] of sourceIndex(root)) {
    const config = parseFile(path.join(root, sourcePath), slug);
    if (config.slug !== slug || !UUID.test(config.id)) throw Error('Invalid standard identity: ' + slug);
    if (seen.has(config.id.toLowerCase())) throw Error('Duplicate EducationStandard UUID: ' + config.id);
    seen.add(config.id.toLowerCase());
    required(config.name, slug + '.name');
    required(config.description?.methodological, slug + '.description.methodological');
    const params = config.params;
    if (
      !params ||
      !Array.isArray(params.countries) ||
      !params.countries.length ||
      params.countries.some(country => !/^[A-Z]{2}$/.test(country))
    ) {
      throw Error('Invalid jurisdiction metadata: ' + slug);
    }
    if (new Set(params.countries).size !== params.countries.length) {
      throw Error('Duplicated jurisdiction: ' + slug);
    }
    if (typeof params.nameLanguage !== 'string' || !/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/.test(params.nameLanguage)) {
      throw Error('Invalid original name language: ' + slug);
    }
    for (const [field, maximum] of [
      ['age', 125],
      ['grade', 40],
    ]) {
      const range = params[field];
      if (range === undefined) continue;
      if (
        !range ||
        !Number.isInteger(range.min) ||
        !Number.isInteger(range.max) ||
        range.min < 0 ||
        range.min > range.max ||
        range.max > maximum
      ) {
        throw Error('Invalid ' + field + ' range: ' + slug);
      }
    }
    required(params.version, slug + '.version');
    const sourceUrl = required(params.sourceUrl, slug + '.sourceUrl');
    if (!/^https?:\/\//.test(sourceUrl)) {
      throw Error('Invalid official source URL: ' + slug);
    }
    const url = new URL(sourceUrl);
    if (!url.hostname || url.username || url.password) {
      throw Error('Invalid official source URL: ' + slug);
    }
    const frontend = config.description.frontend;
    if (!frontend || typeof frontend !== 'object' || Array.isArray(frontend)) {
      throw Error('Missing frontend dictionary: ' + slug);
    }
    const unexpected = Object.keys(frontend).filter(language => !registered.includes(language));
    if (unexpected.length) throw Error('Unknown language in ' + slug + ': ' + unexpected.join(', '));
    entries.push({ config, sourcePath });
  }
  return entries;
}

function sameParams(actual, expected) {
  // Zod orders parsed keys by its schema, not by the authoring source.
  const entries = value => Object.entries(value ?? {}).sort(([left], [right]) => left.localeCompare(right));
  return JSON.stringify(entries(actual)) === JSON.stringify(entries(expected));
}

export function hasCompleteEducationStandardLocales(entries, registered) {
  return entries.every(({ config }) =>
    registered.every(language => {
      const value = config.description.frontend[language];
      return typeof value === 'string' && value.trim() && value.trim() !== MISSING;
    }),
  );
}

export function verifyBuiltStandards(entries, built, registered) {
  if (!Array.isArray(built) || built.length !== entries.length) throw Error('Build/source catalog size mismatch');
  const byId = new Map();
  for (const item of built) {
    if (
      item?.type !== 'educationStandard' ||
      !UUID.test(item.id) ||
      byId.has(item.id.toLowerCase()) ||
      typeof item.build?.props !== 'function'
    ) {
      throw Error('Invalid or duplicated EducationStandard build record');
    }
    byId.set(item.id.toLowerCase(), item);
  }
  for (const { config } of entries) {
    const item = byId.get(config.id.toLowerCase());
    if (!item || item.slug !== config.slug) throw Error('Build/source identity mismatch: ' + config.slug);
    const frontend = config.description.frontend;
    const complete = registered.every(
      language =>
        typeof frontend[language] === 'string' && frontend[language].trim() && frontend[language].trim() !== MISSING,
    );
    if (!complete) continue; // Partial Code is previewed statically, never published.
    const props = item.build.props({ languages: [...registered] });
    if (
      props.base.id !== config.id ||
      props.base.slug !== config.slug ||
      props.base.name !== config.name ||
      props.base.description.methodological !== config.description.methodological ||
      !sameParams(props.base.params, config.params)
    ) {
      throw Error('Build/source invariant mismatch: ' + config.slug);
    }
    for (const language of registered) {
      if (props.locale[language]?.description?.frontend !== frontend[language]) {
        throw Error('Build/source localization mismatch: ' + config.slug + '/' + language);
      }
    }
  }
}

function escapeMarkdown(value) {
  return String(value)
    .replaceAll('\r', '')
    .replace(/[\x60\\*_{}[\]<>|]/g, '\\$&');
}

export function renderEducationStandardMarkdown(entries, locale, sourceCommit) {
  let missing = 0;
  const lines = [
    '<!-- GENERATED FROM CODE; DO NOT EDIT. -->',
    '# EducationStandard review reference — ' + locale,
    '',
    'Source commit: ' + sourceCommit,
    'Standards: ' + entries.length,
    'Missing translations: placeholder',
  ];
  for (const { config, sourcePath } of entries) {
    const translation = config.description.frontend[locale];
    const hasTranslation = typeof translation === 'string' && translation.trim() && translation.trim() !== MISSING;
    if (!hasTranslation) missing++;
    lines.push(
      '',
      '## ' + escapeMarkdown(config.name),
      '',
      '- UUID: ' + tick + config.id + tick,
      '- Slug: ' + tick + config.slug + tick,
      '- Original name language: ' + tick + config.params.nameLanguage + tick,
      '- Countries: ' + config.params.countries.map(country => tick + country + tick).join(', '),
      '- Version: ' + escapeMarkdown(config.params.version),
      ...(config.params.grade
        ? ['- Grades (jurisdiction-specific): ' + config.params.grade.min + '–' + config.params.grade.max]
        : []),
      ...(config.params.age ? ['- Ages: ' + config.params.age.min + '–' + config.params.age.max] : []),
      '- Official source: ' + config.params.sourceUrl,
      '- Canonical Code: [' + path.posix.basename(sourcePath) + '](../../' + sourcePath + ')',
      '',
      '**English methodological description (not translated)**',
      '',
      escapeMarkdown(config.description.methodological),
      '',
      '**Frontend description (' + locale + ')**',
      '',
      hasTranslation ? escapeMarkdown(translation) : MISSING,
    );
  }
  lines[5] = 'Missing translations: ' + missing;
  lines.push('');
  return { markdown: lines.join('\n'), missing, reviewReady: missing === 0, standards: entries.length };
}

/** Only the build-only published entrypoint may supply the executable catalog. */
export function loadBuildCatalog() {
  return loadEducationStandards();
}

export function generateEducationStandardReviewArtifacts({
  root,
  output,
  languages,
  registered,
  manifest,
  saveManifest,
  loadCatalog = loadBuildCatalog,
}) {
  for (const locale of languages) {
    try {
      const entries = readEducationStandardSources(root, registered);
      // Build verification is only possible for a fully typed locale matrix.
      // Partial drafts remain source-derived references, never publication.
      if (hasCompleteEducationStandardLocales(entries, registered)) {
        verifyBuiltStandards(entries, loadCatalog(), registered);
      }
      const result = renderEducationStandardMarkdown(entries, locale, manifest.sourceCommit);
      const relative = 'education-standards/' + locale + '.md';
      fs.mkdirSync(path.join(output, 'education-standards'), { recursive: true });
      fs.writeFileSync(path.join(output, relative), result.markdown);
      manifest.generated.push({
        kind: 'education-standard',
        locale,
        path: '.agent-ci-artifacts/' + relative,
        standards: result.standards,
        missing: result.missing,
        reviewReady: result.reviewReady,
      });
      process.stdout.write('Generated ' + relative + '\n');
    } catch (error) {
      const message = String(error.message || error).slice(0, 1500);
      manifest.failures.push({ kind: 'education-standard', locale, error: message });
      process.stderr.write('::warning::EducationStandard ' + locale + ': ' + message.replaceAll('\n', ' ') + '\n');
    }
    saveManifest();
  }
}
