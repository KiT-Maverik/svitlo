import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import ts from 'typescript';

const root = path.resolve(import.meta.dirname, '..');
const packageRoot = path.join(root, 'content/math');
const taxonomyRoot = path.join(packageRoot, 'data/skills');
const outputPath = path.join(packageRoot, 'docs/generated/skills/taxonomy.en.md');
const source = fs.readFileSync(path.join(root, 'shared/contracts/src/types/languages.ts'), 'utf8');
const registry = source.slice(
  source.indexOf('export const DEFAULT_SUPPORTED_LANGUAGES'),
  source.indexOf('] as const satisfies readonly LanguageDefinition[];'),
);
const locales = [...registry.matchAll(/language:\s*'([^']+)'/g)].map(match => match[1]);
assert.ok(
  locales.length > 1 && new Set(locales).size === locales.length,
  'Supported language registry must be readable',
);

function sourceFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === '__tests__' ? [] : sourceFiles(file);
    return entry.isFile() && entry.name.endsWith('.data.ts') ? [file] : [];
  });
}

function prop(object, name) {
  assert.ok(ts.isObjectLiteralExpression(object));
  const entries = object.properties.filter(
    p => ts.isPropertyAssignment(p) && (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) && p.name.text === name,
  );
  assert.equal(entries.length, 1, 'Expected unique property ' + name);
  return entries[0].initializer;
}
function dictionary(object) {
  assert.ok(ts.isObjectLiteralExpression(object));
  const data = new Map();
  for (const p of object.properties) {
    assert.ok(ts.isPropertyAssignment(p));
    const name = p.name.text;
    assert.ok(!data.has(name), 'Repeated language ' + name);
    assert.ok(ts.isStringLiteral(p.initializer) || ts.isNoSubstitutionTemplateLiteral(p.initializer));
    data.set(name, p.initializer.text);
  }
  return data;
}
function propsKind(config) {
  return config.properties.some(p => ts.isPropertyAssignment(p) && p.name.text === 'title') ? 'SkillDomain' : 'other';
}
function readEntity(file) {
  const ast = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert.equal(ast.parseDiagnostics.length, 0, 'Invalid TypeScript in ' + file);
  let config;
  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      /^defineSkill(Domain|Group)?$/.test(node.expression.text) &&
      node.arguments.length === 1 &&
      ts.isObjectLiteralExpression(node.arguments[0])
    ) {
      assert.ok(!config, 'Multiple entity configs in ' + file);
      config = node.arguments[0];
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  assert.ok(config, 'No taxonomy config in ' + file);
  const name = dictionary(prop(config, propsKind(config) === 'SkillDomain' ? 'title' : 'name'));

  const desc = prop(config, 'description');
  const methodological = prop(desc, 'methodological');
  assert.ok(ts.isStringLiteral(methodological) || ts.isNoSubstitutionTemplateLiteral(methodological));
  const feProp = desc.properties.find(p => ts.isPropertyAssignment(p) && p.name.text === 'frontend');
  const frontend = feProp ? dictionary(feProp.initializer) : null;
  return { file, name, methodological: methodological.text, frontend };
}
function expectedLevel(file) {
  const parts = path.relative(taxonomyRoot, file).split(path.sep);
  if (parts.length === 2) return 3; // Domain
  if (parts.length === 3 && parts[1] === 'skills') return 4; // direct Skill
  if (parts.length === 3 && parts[2].endsWith('.data.ts')) return 4; // Group
  if (parts.length === 4 && parts[2] === 'skills') return 5; // grouped Skill
  throw new Error('Unsupported entity source path: ' + file);
}
function generate(locale) {
  const run = spawnSync(
    process.execPath,
    [
      path.join(root, 'scripts/generate-skills-taxonomy.mjs'),
      '--package',
      'content/math',
      '--locale',
      locale,
      '--stdout',
    ],
    { cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 },
  );
  assert.equal(run.status, 0, 'Generation ' + locale + ' failed: ' + run.stderr);
  assert.equal(run.stderr, '');
  return run.stdout;
}

const entities = sourceFiles(taxonomyRoot).map(readEntity);
const expectedFiles = new Set(entities.map(e => e.file));
const expectedCounts = {
  domains: entities.filter(e => expectedLevel(e.file) === 3).length,
  groups: entities.filter(e => {
    const x = path.relative(taxonomyRoot, e.file).split(path.sep);
    return x.length === 3 && x[1] !== 'skills';
  }).length,
  skills: entities.filter(e => path.relative(taxonomyRoot, e.file).split(path.sep).includes('skills')).length,
};
assert.equal(expectedCounts.domains + expectedCounts.groups + expectedCounts.skills, entities.length);

function parseMarkdown(view, locale) {
  assert.match(view, /^<!-- GENERATED FROM CODE; DO NOT EDIT\. -->/);
  assert.match(view, /^## SUMMARY$/m);
  assert.match(view, /^## DOMAINS$/m);
  for (const [key, label] of [
    ['domains', 'Domains'],
    ['groups', 'Groups'],
    ['skills', 'Skills'],
  ]) {
    assert.match(view, new RegExp('^' + label + ': ' + expectedCounts[key] + '$', 'm'));
  }
  const headings = [...view.matchAll(/^(#{3,5}) ([^\r\n]+)$/gm)];
  assert.equal(headings.length, entities.length, 'Wrong generated entity count for ' + locale);
  const found = new Set();
  const byFile = new Map(entities.map(e => [e.file, e]));
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    const block = view.slice(heading.index + heading[0].length, headings[i + 1]?.index ?? view.length);
    const match = block.match(/^\[([^\]]+\.data\.ts)\]\(([^)]+)\)$/m);
    assert.ok(match, 'Missing Code link in generated block ' + heading[2]);
    const file = path.resolve(path.dirname(outputPath), decodeURI(match[2]));
    assert.equal(path.basename(file), match[1]);
    assert.ok(expectedFiles.has(file), 'Unexpected link ' + file);
    assert.ok(!found.has(file), 'Duplicate output entity ' + file);
    found.add(file);
    const original = byFile.get(file);
    assert.equal(heading[1].length, expectedLevel(file), 'Hierarchy position changed for ' + file);
    assert.equal(heading[2], original.name.get(locale), 'Name changed for ' + file + ':' + locale);
    const text = block.match(/^\*\*Methodological description \(English\):\*\* (.+)$/m);
    assert.ok(text, 'Missing methodological description ' + file);
    assert.equal(text[1], original.methodological, 'Meaning changed for ' + file);
    const frontend = block.match(/^\*\*User-friendly description \(([^)]+)\):\*\* (.+)$/m);
    if (original.frontend) {
      assert.ok(frontend, 'Missing frontend description ' + file);
      assert.equal(frontend[1], locale);
      assert.equal(frontend[2], original.frontend.get(locale), 'Frontend text changed ' + file);
    } else assert.equal(frontend, null, 'Invented frontend description ' + file);
  }
  assert.equal(found.size, expectedFiles.size, 'Not every Code entity was reproduced');
}

test('Mathematics: new data/skills Code-to-Markdown round-trip preserves every entity and supported locale strings', () => {
  const before = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : undefined;
  for (const locale of locales) {
    const first = generate(locale);
    assert.equal(generate(locale), first, 'Non-deterministic output for ' + locale);
    parseMarkdown(first, locale);
  }
  const after = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : undefined;
  assert.equal(after, before, '--stdout must not modify generated files');
  assert.equal(entities.length, expectedFiles.size, 'Duplicate Code source files');
});
