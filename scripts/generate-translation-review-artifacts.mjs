#!/usr/bin/env node
/**
 * Build one complete, PR-scoped agent reference library from canonical Code.
 * On-demand only. No CLI modes: generate Skills and Lesson Markdown in every supported language.
 * Output: .agent-ci-artifacts/{taxonomies,lessons}/... + manifest.json
 * The CI workflow owns committing and cleaning this directory on the PR branch.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import ts from 'typescript';
import { discoverLessons, generateLessonReviewArtifacts } from './generate-lesson-review-artifacts.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, '.agent-ci-artifacts');
const generator = path.join(root, 'scripts/generate-skills-taxonomy.mjs');

if (process.argv.length !== 2) {
  throw new Error('No modes or arguments: run "node scripts/generate-translation-review-artifacts.mjs"');
}
function unwrap(node) {
  while (node && (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node))) {
    node = node.expression;
  }
  return node;
}
function localesFromCode() {
  const file = path.join(root, 'shared/contracts/src/types/languages.ts');
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  let locales;
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== 'DEFAULT_SUPPORTED_LANGUAGES') continue;
      const array = unwrap(declaration.initializer);
      if (!ts.isArrayLiteralExpression(array)) throw new Error('Unexpected language registry shape');
      locales = array.elements.map(node => {
        const obj = unwrap(node);
        if (!ts.isObjectLiteralExpression(obj)) throw new Error('Unexpected language definition');
        const property = obj.properties.find(p => ts.isPropertyAssignment(p) && p.name.getText(source) === 'language');
        if (!property || !ts.isStringLiteral(property.initializer)) throw new Error('Missing language code');
        return property.initializer.text;
      });
    }
  }
  if (!locales?.length || new Set(locales).size !== locales.length) throw new Error('Invalid language roster');
  return locales;
}
function packagesFromCode() {
  const apps = path.join(root, 'learningApps');
  return fs.readdirSync(apps, { withFileTypes: true })
    .filter(x => x.isDirectory() && fs.existsSync(path.join(apps, x.name, 'data/skills')))
    .map(x => ({ name: x.name, package: 'learningApps/' + x.name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
function commitSha() {
  // Ignore artifact-only commits to keep the manifest stable across regeneration.
  const r = spawnSync('git', ['log', '-1', '--format=%H', '--', '.', ':(exclude).agent-ci-artifacts/**'], { cwd: root, encoding: 'utf8' });
  return r.status === 0 ? r.stdout.trim() : null;
}
function canonicalLinks(markdown, appName, destination) {
  // Original generated links are relative to <textbook>/docs/generated/skills/.
  // Relocate links to the committed artifact's own directory.
  const originalDir = path.join(root, 'learningApps', appName, 'docs/generated/skills');
  return markdown.replace(/\[([^\]]+\.data\.ts)\]\(([^)]+)\)/g, (_, label, url) => {
    const target = path.resolve(originalDir, decodeURI(url));
    const prefix = path.join(root, 'learningApps', appName, 'data/skills') + path.sep;
    if (!target.startsWith(prefix) || !target.endsWith('.data.ts')) {
      throw new Error('Invalid generated canonical link: ' + url);
    }
    return '[' + label + '](' + encodeURI(path.relative(path.dirname(destination), target).split(path.sep).join('/')) + ')';
  });
}

const languages = localesFromCode();
const textbooks = packagesFromCode();
const lessonPackages = [...new Set(discoverLessons(root).map(lesson => lesson.package))];
if (!textbooks.length) throw new Error('No canonical Code Skills taxonomies available');
const manifest = {
  schemaVersion: 2,
  kind: 'pr-scoped-agent-ci-artifacts',
  sourceCommit: commitSha(),
  packages: [...new Set([...textbooks.map(t => t.package), ...lessonPackages])].sort(),
  locales: languages,
  generated: [],
  failures: [],
};
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(path.join(output, 'taxonomies'), { recursive: true });
function saveManifest() {
  fs.writeFileSync(path.join(output, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
}
saveManifest();
for (const textbook of textbooks) {
  for (const locale of languages) {
    const result = spawnSync(process.execPath, [
      generator, '--package', textbook.package, '--locale', locale, '--stdout',
    ], {
      cwd: root, encoding: 'utf8', timeout: 180_000, maxBuffer: 32 * 1024 * 1024,
    });
    const raw = result.stdout || '';
    if (result.error || result.status !== 0 || !raw.startsWith('<!-- GENERATED FROM CODE; DO NOT EDIT. -->')) {
      const error = String(result.error?.message || result.stderr || 'No valid Markdown generated').trim().slice(0, 1500);
      manifest.failures.push({ kind: 'taxonomy', textbook: textbook.package, locale, error });
      process.stderr.write('::warning::Could not generate ' + textbook.name + '/' + locale + ': ' + error.replace(/\n/g, ' ') + '\n');
      saveManifest();
      continue;
    }
    const relative = 'taxonomies/' + textbook.name + '/' + locale + '.md';
    const destination = path.join(output, relative);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    const markdown = canonicalLinks(raw, textbook.name, destination);
    fs.writeFileSync(destination, markdown, 'utf8');
    const count = label => Number(markdown.match(new RegExp('^' + label + ': (\\d+)$', 'm'))?.[1]);
    manifest.generated.push({
      kind: 'taxonomy',
      textbook: textbook.package,
      locale,
      path: '.agent-ci-artifacts/' + relative,
      domains: count('Domains'),
      groups: count('Groups'),
      skills: count('Skills'),
    });
    saveManifest();
    process.stdout.write('Generated ' + relative + '\n');
  }
}
const lessonStats = generateLessonReviewArtifacts({ root, output, languages, manifest, saveManifest });
manifest.summary = {
  taxonomyDocuments: manifest.generated.filter(item => item.kind === 'taxonomy').length,
  discoveredLessons: lessonStats.discoveredLessons,
  lessonDocuments: lessonStats.generated,
  failures: manifest.failures.length,
};
saveManifest();
process.stdout.write(
  'Lesson reference library: ' + lessonStats.generated + ' documents from ' +
  lessonStats.discoveredLessons + ' lessons; ' + lessonStats.failures + ' failed\n',
);
process.stdout.write(
  'Agent review library: ' + manifest.generated.length + ' documents (Skills + Lessons), ' +
  manifest.failures.length + ' failed, ' + textbooks.length + ' textbooks, ' +
  languages.length + ' locales; source ' + manifest.sourceCommit + '\n',
);
if (!manifest.generated.length) {
  throw new Error('No review Markdown generated; inspect .agent-ci-artifacts/manifest.json');
}
