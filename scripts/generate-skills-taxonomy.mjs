#!/usr/bin/env node
/**
 * Generate a localized-name, read-only Markdown view from typed taxonomy source.
 * Usage: node scripts/generate-skills-taxonomy.mjs --package content/math
 *   [--locale en] [--check | --stdout]
 *
 * Deliberately parses TypeScript source without executing textbook code.
 * Methodological descriptions are always English; Skill frontend text is mandatory in every locale.
 * Domain and Group frontend text remains optional during their migration.
 * Fail closed on absent methodological descriptions: handwritten taxonomy remains the
 * authoritative staging source until every promoted entity is complete.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import ts from 'typescript';
import { checkTaxonomy } from './check-skills-taxonomy-structure.mjs';

function fail(message) {
  throw new Error(message);
}
function options(args) {
  const result = { locale: 'en', check: false, stdout: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--check' || arg === '--stdout') {
      if (result[arg.slice(2)]) fail('Duplicate argument ' + arg);
      result[arg.slice(2)] = true;
      continue;
    }
    if (!['--package', '--locale'].includes(arg) || !args[i + 1] || args[i + 1].startsWith('--')) {
      fail('Usage: --package <textbook-directory> [--locale <language-code>] [--check | --stdout]');
    }
    const key = arg.slice(2);
    if (result[key] !== undefined && (key !== 'locale' || result.locale !== 'en')) fail('Duplicate argument ' + arg);
    result[key] = args[++i];
  }
  if (!result.package || (result.check && result.stdout))
    fail('Provide --package and choose at most one of --check, --stdout');
  return result;
}
const repositoryRoot = path.resolve(import.meta.dirname, '..');
const opts = options(process.argv.slice(2));
const packageRoot = path.resolve(repositoryRoot, opts.package);
if (!packageRoot.startsWith(path.join(repositoryRoot, 'content') + path.sep))
  fail('Package must be within content/');
const taxonomyRoot = path.join(packageRoot, 'data/skills');
if (!fs.existsSync(taxonomyRoot) || !fs.statSync(taxonomyRoot).isDirectory()) {
  fail('No code taxonomy: ' + taxonomyRoot);
}
// The shared FastGate checker is the source of truth for entity/UUID/child-link integrity.
// Reject an invalid graph rather than generating a plausible but misleading Markdown view.
const graphCounts = checkTaxonomy(taxonomyRoot);

function parse(file) {
  return ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
function unwrap(node) {
  while (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node))
    node = node.expression;
  return node;
}
function key(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node)) return node.text;
  fail('Non-static property key: ' + node.getText());
}
function getProperty(object, name) {
  return object.properties.find(p => ts.isPropertyAssignment(p) && key(p.name) === name);
}
function stringValue(node, context) {
  if (!node || !(ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)))
    fail('Expected literal localized text: ' + context);
  const value = node.text.trim();
  if (!value) fail('Blank localized text: ' + context);
  return value;
}
function dictionary(object, field, file) {
  const member = getProperty(object, field);
  if (!member) fail('Missing ' + field + ' (taxonomy not yet migrated): ' + file);
  const value = unwrap(member.initializer);
  if (!ts.isObjectLiteralExpression(value)) fail('Expected object dictionary: ' + file + ':' + field);
  const pairs = Object.create(null);
  for (const p of value.properties) {
    if (!ts.isPropertyAssignment(p)) fail('Unsupported dynamic locale in ' + file);
    const code = key(p.name);
    if (Object.hasOwn(pairs, code)) fail('Duplicate locale ' + code + ': ' + file);
    pairs[code] = stringValue(p.initializer, file + ':' + field + ':' + code);
  }
  return pairs;
}
function supportedLocales() {
  const file = path.join(repositoryRoot, 'shared/contracts/src/types/languages.ts');
  let found;
  for (const node of parse(file).statements) {
    if (!ts.isVariableStatement(node)) continue;
    for (const dec of node.declarationList.declarations) {
      if (dec.name.getText() !== 'DEFAULT_SUPPORTED_LANGUAGES') continue;
      const arr = unwrap(dec.initializer);
      if (!ts.isArrayLiteralExpression(arr)) fail('Cannot read supported language registry');
      found = arr.elements.map(item => {
        const obj = unwrap(item);
        if (!ts.isObjectLiteralExpression(obj)) fail('Nonliteral language registry');
        return stringValue(getProperty(obj, 'language')?.initializer, file);
      });
    }
  }
  if (!found?.length) fail('Supported languages not found');
  return found;
}
const locales = supportedLocales();
if (!locales.includes(opts.locale)) fail('Unsupported locale "' + opts.locale + '". Supported: ' + locales.join(', '));

function readEntity(file, kind) {
  const sf = parse(file);
  let config;
  function visit(n) {
    if (
      ts.isCallExpression(n) &&
      ts.isIdentifier(n.expression) &&
      n.expression.text === 'build' + kind + 'Config' &&
      n.arguments.length === 1 &&
      ts.isObjectLiteralExpression(n.arguments[0])
    ) {
      if (config) fail('Multiple entity configs: ' + file);
      config = n.arguments[0];
    }
    ts.forEachChild(n, visit);
  }
  visit(sf);
  if (!config) fail('Missing build' + kind + 'Config in ' + file);

  const name = dictionary(config, 'name', file);
  const descriptionMember = getProperty(config, 'description');
  if (!descriptionMember) fail('Missing description (taxonomy not yet migrated): ' + file);
  const description = unwrap(descriptionMember.initializer);
  if (!ts.isObjectLiteralExpression(description)) fail('Expected description object: ' + file);

  const keys = description.properties.map(prop => {
    if (!ts.isPropertyAssignment(prop)) fail('Unexpected dynamic description property: ' + file);
    return key(prop.name);
  });
  if (new Set(keys).size !== keys.length || keys.some(k => k !== 'methodological' && k !== 'frontend')) {
    fail('Unexpected or duplicated description keys: ' + file);
  }
  const methodological = stringValue(getProperty(description, 'methodological')?.initializer, file + ':methodological');

  const frontend = getProperty(description, 'frontend') ? dictionary(description, 'frontend', file) : undefined;
  // This source parser does not run tsc: enforce the Skill contract independently
  // instead of silently generating incomplete documentation from untyped files.
  if (kind === 'Skill' && !frontend) fail('Missing required Skill description.frontend: ' + file);
  for (const locale of locales) {
    if (!name[locale]) fail('Missing required name locale ' + locale + ': ' + file);
    if (frontend && !frontend[locale]) fail('Missing required frontend locale ' + locale + ': ' + file);
  }
  for (const map of frontend ? [name, frontend] : [name]) {
    for (const locale of Object.keys(map)) {
      if (!locales.includes(locale)) fail('Unexpected locale ' + locale + ': ' + file);
    }
  }
  return { file, name: name[opts.locale], methodological, frontend: frontend?.[opts.locale] };
}
function subdirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(x => x.isDirectory() && x.name !== '__tests__' && x.name !== 'skills')
    .map(x => x.name)
    .sort();
}
function fileNames(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(x => x.endsWith('.data.ts'))
    .sort();
}

function readSkills(folder) {
  const d = path.join(folder, 'skills');
  const names = fileNames(d);
  return names.map(name => readEntity(path.join(d, name), 'Skill'));
}
function markdownLine(entity, level, output, details = '') {
  const link = path.relative(path.dirname(output), entity.file).split(path.sep).join('/');
  let text = '#'.repeat(level) + ' ' + entity.name + '\n\n';
  if (details) text += details + '\n\n';
  text += '[' + path.basename(entity.file) + '](' + encodeURI(link) + ')\n\n';
  text += '**Methodological description (English):** ' + entity.methodological + '\n\n';
  if (entity.frontend !== undefined) {
    text += '**User-friendly description (' + opts.locale + '):** ' + entity.frontend + '\n\n';
  }
  return text;
}
const domains = [];
for (const folder of subdirs(taxonomyRoot)) {
  const domainFolder = path.join(taxonomyRoot, folder);
  const domainFile = path.join(domainFolder, folder + '.data.ts');
  if (!fs.existsSync(domainFile)) fail('Missing Domain source: ' + domainFile);
  const domain = readEntity(domainFile, 'SkillDomain');
  const groups = subdirs(domainFolder);
  const directSkills = readSkills(domainFolder);
  if (groups.length === 0 && directSkills.length === 0) fail('Domain has no Groups or Skills: ' + domainFile);
  const content = groups.map(group => {
    const groupFolder = path.join(domainFolder, group);
    const groupFile = path.join(groupFolder, group + '.data.ts');
    if (!fs.existsSync(groupFile)) fail('Missing Group source: ' + groupFile);
    const skills = readSkills(groupFolder);
    if (!skills.length) fail('Empty Group: ' + groupFile);
    return { ...readEntity(groupFile, 'SkillGroup'), skills };
  });
  domains.push({ ...domain, groups: content, skills: directSkills });
}
if (!domains.length) fail('No domains found');
if (domains.length !== graphCounts.domains) fail('Domain count disagrees with validated source graph');
const out = path.join(packageRoot, 'docs/generated/skills', 'taxonomy.' + opts.locale + '.md');
const groupCount = domains.reduce((sum, domain) => sum + domain.groups.length, 0);
const skillCount = domains.reduce(
  (sum, domain) => sum + domain.skills.length + domain.groups.reduce((n, group) => n + group.skills.length, 0),
  0,
);
if (groupCount !== graphCounts.groups || skillCount !== graphCounts.skills)
  fail('Entity counts disagree with validated source graph');
let markdown =
  '<!-- GENERATED FROM CODE; DO NOT EDIT. -->\n\n# Skills Taxonomy (' +
  opts.locale +
  ')\n\n' +
  '> Names and available user-friendly descriptions use the requested locale. Methodological descriptions remain canonical English, not translated. This is a generated Code view, not the editorial staging template.\n\n' +
  '## SUMMARY\n\n' +
  'Domains: ' +
  domains.length +
  '\n\nGroups: ' +
  groupCount +
  '\n\nSkills: ' +
  skillCount +
  '\n\n## DOMAINS\n\n';
for (const domain of domains) {
  const count = domain.skills.length + domain.groups.reduce((n, group) => n + group.skills.length, 0);
  markdown += markdownLine(domain, 3, out, 'Groups: ' + domain.groups.length + ' · Skills: ' + count);
  for (const group of domain.groups) {
    markdown += markdownLine(group, 4, out, 'Skills: ' + group.skills.length);
    for (const skill of group.skills) markdown += markdownLine(skill, 5, out);
  }
  for (const skill of domain.skills) markdown += markdownLine(skill, 4, out);
}
if (opts.stdout) {
  process.stdout.write(markdown);
} else if (opts.check) {
  if (!fs.existsSync(out) || fs.readFileSync(out, 'utf8') !== markdown) {
    fail('Generated taxonomy is missing or stale: ' + path.relative(repositoryRoot, out));
  }
  console.log(
    'Verified ' +
      path.relative(repositoryRoot, out) +
      ' (' +
      domains.length +
      '/' +
      groupCount +
      '/' +
      skillCount +
      ')',
  );
} else {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  if (!fs.existsSync(out) || fs.readFileSync(out, 'utf8') !== markdown) fs.writeFileSync(out, markdown);
  console.log(
    'Generated ' +
      path.relative(repositoryRoot, out) +
      ' (' +
      domains.length +
      ' Domains, ' +
      groupCount +
      ' Groups, ' +
      skillCount +
      ' Skills)',
  );
}
