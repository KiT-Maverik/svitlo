#!/usr/bin/env node
/**
 * Read-only geography landing-copy reference from canonical content/geography/data/homeCopy.ts.
 * --allow-missing inserts %%MISSING%% solely in draft Markdown, never authored or published content.
 * Usage: node content/geography/scripts/generateHomeCopyReference/generate-home-copy-reference.mjs --locale it --stdout [--allow-missing]
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { readSupportedLanguageCodes } from '../../../../shared/engine/scripts/readSupportedLanguages/read-supported-languages.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const sourcePath = 'content/geography/data/homeCopy.ts';
const marker = '%%MISSING%%';

function unwrap(node) {
  while (node && (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node))) {
    node = node.expression;
  }
  return node;
}

export function readHomeCopyReference({ root = repoRoot, locale, allowMissing = false }) {
  const supported = readSupportedLanguageCodes(root);
  if (!supported.includes(locale)) throw new Error('Unsupported geography locale: ' + locale);
  const filename = path.join(root, sourcePath);
  const ast = ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true);
  if (ast.parseDiagnostics.length) throw new Error('Invalid TypeScript homeCopy source');
  let dictionary;
  for (const statement of ast.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === 'geographyHomeCopy') {
        dictionary = unwrap(declaration.initializer);
      }
    }
  }
  if (!dictionary || !ts.isObjectLiteralExpression(dictionary)) throw new Error('Missing static geographyHomeCopy dictionary');
  const entries = Object.create(null);
  for (const property of dictionary.properties) {
    if (!ts.isPropertyAssignment(property) ||
        !(ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))) {
      throw new Error('Dynamic geography locale is not reviewable');
    }
    const key = property.name.text;
    if (Object.hasOwn(entries, key)) throw new Error('Duplicate geography language: ' + key);
    const values = unwrap(property.initializer);
    if (!ts.isArrayLiteralExpression(values) || values.elements.length !== 2 ||
        !values.elements.every(v => ts.isStringLiteral(v) || ts.isNoSubstitutionTemplateLiteral(v))) {
      throw new Error('Invalid geography home copy tuple: ' + key);
    }
    entries[key] = values.elements.map(v => v.text);
  }
  const extra = Object.keys(entries).filter(key => !supported.includes(key));
  const absent = supported.filter(key => !Object.hasOwn(entries, key));
  if (extra.length || (!allowMissing && absent.length)) {
    throw new Error('Geography locales: missing [' + absent.join(', ') + ']; unexpected [' + extra.join(', ') + ']');
  }
  const english = entries.en;
  if (!english || english.some(v => !v.trim() || v.includes(marker))) {
    throw new Error('Missing/invalid canonical English geography copy');
  }
  const target = entries[locale] ?? (allowMissing && locale !== 'en' ? ['', ''] : undefined);
  if (!target) throw new Error('Missing geography locale: ' + locale);
  const missing = target.filter(v => !v.trim()).length;
  if ((missing && (!allowMissing || locale === 'en')) || target.some(v => v.includes(marker))) {
    throw new Error('Missing/invalid geography copy: ' + locale);
  }
  return {
    locale, missing, sourcePath,
    fields: [
      { key: 'title', english: english[0], translation: target[0] || marker },
      { key: 'description', english: english[1], translation: target[1] || marker },
    ],
  };
}

function escapeMarkdown(value) {
  return value.replace(/\\/g, '\\\\').replace(/\r/g, '\\r').replace(/\n/g, '\\n')
    .replace(/([*_()[\]<>|])/g, '\\$1');
}

export function renderHomeCopyReference(options) {
  const info = readHomeCopyReference(options);
  const destination = path.join(options.output ?? path.join(options.root ?? repoRoot, 'temp/agent-reference-library'), 'geography-home-copy', info.locale + '.md');
  const source = path.join(options.root ?? repoRoot, sourcePath);
  const link = encodeURI(path.relative(path.dirname(destination), source).split(path.sep).join('/'));
  const lines = [
    '<!-- GENERATED FROM CODE; DO NOT EDIT. -->',
    '# Geography Home Copy (' + info.locale + ')',
    '',
    'Canonical source: [' + sourcePath + '](' + link + ').',
    '',
    'Fields: 2',
    'Missing translations: ' + info.missing,
    '',
    ...(options.allowMissing && info.missing > 0 ? ['> DRAFT REFERENCE: missing localized fields; not approved for independent review.', ''] : []),
  ];
  for (const field of info.fields) {
    lines.push('- **' + field.key + '**',
      '  - English: ' + escapeMarkdown(field.english),
      '  - ' + info.locale + ': ' + escapeMarkdown(field.translation));
  }
  return lines.join('\n') + '\n';
}

export function generateHomeCopyReviewArtifacts({ root, output, languages, manifest, saveManifest, allowMissing = false }) {
  const stats = { generated: 0, failures: 0 };
  for (const locale of languages) {
    try {
      const info = readHomeCopyReference({ root, locale, allowMissing });
      const relative = 'geography-home-copy/' + locale + '.md';
      const dest = path.join(output, relative);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, renderHomeCopyReference({ root, output, locale, allowMissing }), 'utf8');
      manifest.generated.push({
        kind: 'geography-home-copy', locale, path: relative,
        missing: info.missing, reviewReady: info.missing === 0,
      });
      stats.generated++;
    } catch (error) {
      const message = String(error.message || error).slice(0, 1500);
      manifest.failures.push({ kind: 'geography-home-copy', locale, error: message });
      stats.failures++;
      process.stderr.write('::warning::Geography home copy ' + locale + ': ' + message.replace(/\n/g, ' ') + '\n');
    }
    saveManifest();
  }
  return stats;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    const allowMissing = args.includes('--allow-missing');
    const tokens = args.filter(arg => arg !== '--allow-missing');
    if (tokens.length !== 3 || tokens[0] !== '--locale' || tokens[2] !== '--stdout' ||
        args.filter(arg => arg === '--allow-missing').length > 1) {
      throw new Error('Usage: --locale <language-code> --stdout [--allow-missing]');
    }
    process.stdout.write(renderHomeCopyReference({ locale: tokens[1], allowMissing }));
  } catch (error) {
    process.stderr.write('Geography home copy: ' + error.message + '\n');
    process.exitCode = 1;
  }
}
