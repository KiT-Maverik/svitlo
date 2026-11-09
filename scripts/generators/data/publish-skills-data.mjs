#!/usr/bin/env node
/**
 * Publish one-language-at-a-time Skill Data JSON from canonical TypeScript configs.
 *
 * Usage:
 *   node scripts/generators/data/publish-skills-data.mjs --package content/playground --write
 *   node scripts/generators/data/publish-skills-data.mjs --package content/playground --check
 *
 * This deliberately parses authoring data without importing/evaluating textbook code.
 * Only the dedicated skills output directory is replaced during --write.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { checkTaxonomy } from '../../check-skills-taxonomy-structure.mjs';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const slugPattern = /^[a-z][a-zA-Z0-9]*$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function parse(file) {
  const ast = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert(ast.parseDiagnostics.length === 0, 'Invalid TypeScript: ' + file);
  return ast;
}

function unwrap(node) {
  while (node && (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node))) {
    node = node.expression;
  }
  return node;
}

function fields(node, label) {
  const obj = unwrap(node);
  assert(obj && ts.isObjectLiteralExpression(obj), 'Expected literal object: ' + label);
  const result = new Map();
  for (const entry of obj.properties) {
    assert(
      ts.isPropertyAssignment(entry) && (ts.isIdentifier(entry.name) || ts.isStringLiteral(entry.name)),
      'Nonliteral property: ' + label,
    );
    const key = entry.name.text;
    assert(!result.has(key), 'Duplicate property ' + key + ': ' + label);
    result.set(key, entry.initializer);
  }
  return result;
}

function literal(node, label) {
  assert(
    node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)),
    'Expected string literal: ' + label,
  );
  return node.text;
}

function languageCodes() {
  const file = path.join(repositoryRoot, 'shared/contracts/src/types/languages.ts');
  const ast = parse(file);
  const declaration = ast.statements
    .filter(ts.isVariableStatement)
    .flatMap(statement => [...statement.declarationList.declarations])
    .find(item => item.name.getText(ast) === 'DEFAULT_SUPPORTED_LANGUAGES');
  assert(declaration, 'Missing DEFAULT_SUPPORTED_LANGUAGES');
  const values = unwrap(declaration.initializer);
  assert(values && ts.isArrayLiteralExpression(values), 'Expected literal language registry');
  const codes = values.elements.map((item, index) => {
    const props = fields(item, 'language registry entry ' + index);
    return literal(props.get('language'), 'language registry entry ' + index);
  });
  assert(
    codes.length > 0 && codes.includes('en') && codes.every(code => /^[a-z]{2,8}$/.test(code)),
    'Invalid language codes',
  );
  assert(new Set(codes).size === codes.length, 'Duplicate language code in registry');
  return codes;
}

function localizedStrings(node, codes, label) {
  const props = fields(node, label);
  const unexpected = [...props.keys()].filter(key => !codes.includes(key));
  const missing = codes.filter(code => !props.has(code));
  assert(
    !unexpected.length && !missing.length,
    label + ': missing [' + missing.join(', ') + '], unexpected [' + unexpected.join(', ') + ']',
  );
  const result = {};
  for (const code of codes) {
    const value = literal(props.get(code), label + '.' + code);
    assert(value.trim().length > 0, 'Empty translation: ' + label + '.' + code);
    result[code] = value;
  }
  return result;
}

function readEntity(file, slug, kind, codes) {
  const ast = parse(file);
  const symbol = slug + '_' + kind + '_Data';
  const declarations = ast.statements
    .filter(ts.isVariableStatement)
    .flatMap(statement => [...statement.declarationList.declarations])
    .filter(item => item.name.getText(ast) === symbol);
  assert(declarations.length === 1, 'Expected one ' + symbol + ': ' + file);
  const call = declarations[0].initializer;
  const newName = kind === 'SkillDomain' ? 'defineSkillDomain' : kind === 'SkillGroup' ? 'defineSkillGroup' : 'defineSkill';
  assert(
    call && ts.isCallExpression(call) && ts.isIdentifier(call.expression) &&
    [newName, 'build' + kind + 'Config'].includes(call.expression.text) && call.arguments.length === 1,
    'Invalid configurator for ' + symbol + ': ' + file,
  );
  const modern = call.expression.text === newName;
  const props = fields(call.arguments[0], file);
  const allowed = new Set(['slug', 'id', 'description', modern && kind === 'SkillDomain' ? 'title' : 'name',
    ...(kind === 'SkillDomain' ? ['groups', 'skills'] : kind === 'SkillGroup' ? ['skills'] : [])]);
  for (const name of props.keys()) assert(allowed.has(name), 'Unexpected config field: ' + file + '.' + name);
  const authoredSlug = literal(props.get('slug'), file + '.slug');
  assert(authoredSlug === slug && slugPattern.test(authoredSlug), 'Missing/mismatched Skill slug: ' + file);
  const id = literal(props.get('id'), file + '.id');
  assert(uuidPattern.test(id), 'Invalid UUID: ' + file);
  const label = modern && kind === 'SkillDomain' ? 'title' : 'name';
  const name = localizedStrings(props.get(label), codes, file + '.' + label);
  let description, methodological;
  if (props.has('description')) {
    const detail = fields(props.get('description'), file + '.description');
    methodological = literal(detail.get('methodological'), file + '.description.methodological');
    assert(methodological.trim(), 'Empty methodological description: ' + file);
    for (const key of detail.keys()) {
      assert(key === 'methodological' || key === 'frontend', 'Unexpected description field: ' + file + '.' + key);
    }
    if (detail.has('frontend')) description = localizedStrings(detail.get('frontend'), codes, file + '.description.frontend');
  }
  assert(!modern || !!methodological, 'Configurator requires methodological description: ' + file);
  assert(kind !== 'Skill' || description, 'Skill requires complete frontend descriptions: ' + file);
  assert(!modern || !!description, 'Configurator requires complete frontend descriptions: ' + file);
  return { id, slug, kind, name, description, methodological };
}

function directories(root) {
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(item => item.name)
    .sort();
}

function skillSlugs(root) {
  return fs
    .readdirSync(root)
    .filter(name => name.endsWith('.data.ts'))
    .map(name => name.slice(0, -'.data.ts'.length))
    .sort();
}

/** Read a fully validated canonical graph, without executing config imports. */
export function loadSkillGraph(root, codes = languageCodes()) {
  checkTaxonomy(root);
  const graph = [];
  const allPaths = new Set();
  const allIds = new Set();
  function entity(file, slug, kind) {
    const relativeFile = path.relative(root, file).split(path.sep).join('/');
    assert(
      slugPattern.test(slug) && !allPaths.has(relativeFile),
      'Duplicate or invalid Skill source location: ' + relativeFile,
    );
    allPaths.add(relativeFile);
    const result = readEntity(file, slug, kind, codes);
    assert(!allIds.has(result.id), 'Duplicate UUID: ' + result.id);
    allIds.add(result.id);
    return result;
  }
  for (const domainSlug of directories(root)) {
    const domainDir = path.join(root, domainSlug);
    const domain = entity(path.join(domainDir, domainSlug + '.data.ts'), domainSlug, 'SkillDomain');
    const directSkills = path.join(domainDir, 'skills');
    if (fs.existsSync(directSkills)) {
      domain.skills = skillSlugs(directSkills).map(skillSlug =>
        entity(path.join(directSkills, skillSlug + '.data.ts'), skillSlug, 'Skill'),
      );
    }
    const groupSlugs = directories(domainDir).filter(slug => slug !== 'skills');
    if (groupSlugs.length) {
      domain.groups = [];
      for (const groupSlug of groupSlugs) {
        const groupDir = path.join(domainDir, groupSlug);
        const group = entity(path.join(groupDir, groupSlug + '.data.ts'), groupSlug, 'SkillGroup');
        group.skills = [];
        for (const skillSlug of skillSlugs(path.join(groupDir, 'skills'))) {
          group.skills.push(entity(path.join(groupDir, 'skills', skillSlug + '.data.ts'), skillSlug, 'Skill'));
        }
        domain.groups.push(group);
      }
    }
    assert(
      (domain.groups?.length ?? 0) + (domain.skills?.length ?? 0) > 0,
      'Domain must include Groups or direct Skills: ' + domainSlug,
    );
    graph.push(domain);
  }
  return graph;
}

/** Collection is a shared discriminated union, not an author-defined config field.
 * Ensure each Skill kind belongs to @svitlo/contracts/content's Collection type.
 */
export function taxonomyCollections() {
  const file = path.join(repositoryRoot, 'shared/contracts/src/types/misc.types.ts');
  const source = parse(file);
  const declaration = source.statements.find(
    item => ts.isTypeAliasDeclaration(item) && item.name.text === 'Collection',
  );
  assert(declaration && ts.isUnionTypeNode(declaration.type), 'Missing shared Collection union');
  const values = declaration.type.types.map(member => {
    assert(
      ts.isLiteralTypeNode(member) && ts.isStringLiteral(member.literal),
      'Collection union must consist of literal string discriminators',
    );
    return member.literal.text;
  });
  return new Set(values);
}

const collectionByKind = Object.freeze({
  Skill: 'skill',
  SkillGroup: 'skillGroup',
  SkillDomain: 'skillDomain',
});

/** Publish immutable metadata once per entity, and only localized copy per language.
 * Parent references are child slugs, not duplicate entity objects; the full graph
 * is reassembled by the consumer using these immutable relationships.
 */
/** Sparse Skill payloads: common config in base.json, only translated text per locale.
 * No duplicate immutable IDs, parents or methodological text in localized files.
 */
export function renderSkillFiles(graph, codes) {
  const supported = taxonomyCollections();
  for (const collection of Object.values(collectionByKind)) {
    assert(supported.has(collection), 'Unknown shared Collection discriminator: ' + collection);
  }
  const files = new Map();
  function publish(entity, parentPath = '') {
    const entityPath = parentPath ? parentPath + '/' + entity.slug : entity.slug;
    const groups = entity.groups?.map(child => child.slug);
    const skills = entity.skills?.map(child => child.slug);
    const base = {
      id: entity.id,
      slug: entity.slug,
      collection: collectionByKind[entity.kind],
      ...(entity.methodological ? { description: { methodological: entity.methodological } } : {}),
      ...(groups ? { groups } : {}),
      ...(skills ? { skills } : {}),
    };
    assert(base.collection, 'Unsupported Skill collection: ' + entity.kind);
    files.set(entityPath + '/base.json', JSON.stringify(base, null, 2) + '\n');
    for (const code of codes) {
      const label = entity.name[code];
      assert(typeof label === 'string' && label.trim(), 'Missing ' + code + ' name: ' + entityPath);
      const frontend = entity.description?.[code];
      assert(entity.kind !== 'Skill' && entity.methodological === undefined || (typeof frontend === 'string' && frontend.trim()),
        'Missing ' + code + ' frontend description: ' + entityPath);
      const copy = {
        [entity.kind === 'SkillDomain' ? 'title' : 'name']: label,
        ...(frontend ? { description: { frontend } } : {}),
      };
      files.set(entityPath + '/' + code + '.json', JSON.stringify(copy, null, 2) + '\n');
    }
    for (const group of entity.groups ?? []) publish(group, entityPath);
    for (const skill of entity.skills ?? []) publish(skill, entityPath);
  }
  for (const domain of graph) publish(domain);
  return files;
}

function currentFiles(root) {
  const files = new Map();
  if (!fs.existsSync(root)) return files;
  assert(
    fs.statSync(root).isDirectory() && !fs.lstatSync(root).isSymbolicLink(),
    'Published Skills output must be a real directory: ' + root,
  );
  function visit(dir, relative) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      assert(!entry.isSymbolicLink(), 'Symlinks are not permitted in generated output');
      const name = relative ? relative + '/' + entry.name : entry.name;
      if (entry.isDirectory()) visit(path.join(dir, entry.name), name);
      else {
        assert(entry.isFile(), 'Non-file in generated output: ' + name);
        files.set(name, fs.readFileSync(path.join(dir, entry.name), 'utf8'));
      }
    }
  }
  visit(root, '');
  return files;
}

export function checkPublishedFiles(root, expected) {
  const actual = currentFiles(root);
  const missing = [...expected.keys()].filter(name => !actual.has(name));
  const changed = [...expected.keys()].filter(name => actual.has(name) && actual.get(name) !== expected.get(name));
  const stale = [...actual.keys()].filter(name => !expected.has(name));
  return { missing, changed, stale };
}

/** Validate everything before writing, then replace only the dedicated output tree. */
export function writePublishedFiles(root, files) {
  const parent = path.dirname(root);
  fs.mkdirSync(parent, { recursive: true });
  assert(
    !fs.existsSync(root) || (fs.statSync(root).isDirectory() && !fs.lstatSync(root).isSymbolicLink()),
    'Refusing to replace a non-directory or symlink: ' + root,
  );
  const staging = fs.mkdtempSync(path.join(parent, '.Skills-staging-'));
  const backup = path.join(parent, '.Skills-backup-' + crypto.randomUUID());
  let backedUp = false;
  try {
    for (const [name, content] of files) {
      const target = path.join(staging, ...name.split('/'));
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, content, 'utf8');
    }
    if (fs.existsSync(root)) {
      fs.renameSync(root, backup);
      backedUp = true;
    }
    try {
      fs.renameSync(staging, root);
    } catch (error) {
      if (backedUp) fs.renameSync(backup, root);
      backedUp = false;
      throw error;
    }
    if (backedUp) fs.rmSync(backup, { recursive: true, force: true });
  } finally {
    if (fs.existsSync(staging)) fs.rmSync(staging, { recursive: true, force: true });
  }
}

function options(args) {
  let packageName;
  let action;
  let outputOverride;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--output') {
      assert(!outputOverride && args[i + 1] && !args[i + 1].startsWith('--'), 'Missing or repeated --output');
      outputOverride = args[++i];
    } else if (arg === '--package') {
      assert(!packageName && args[i + 1] && !args[i + 1].startsWith('--'), 'Missing or repeated --package');
      packageName = args[++i];
    } else if (arg === '--write' || arg === '--check') {
      assert(!action, 'Specify exactly one of --write or --check');
      action = arg;
    } else throw new Error('Unknown argument: ' + arg);
  }
  assert(packageName && action, 'Usage: --package content/<textbook> (--write | --check)');
  const pkg = path.resolve(repositoryRoot, packageName);
  assert(
    pkg.startsWith(path.join(repositoryRoot, 'content') + path.sep) && fs.existsSync(path.join(pkg, 'package.json')),
    'Expected a textbook package under content/',
  );
  const output = outputOverride
    ? path.resolve(repositoryRoot, outputOverride)
    : path.join(pkg, 'public/data/skills');
  assert(output.startsWith(repositoryRoot + path.sep), 'Output must stay inside the repository');
  return { pkg, action, output };
}

function main() {
  const { pkg, action, output } = options(process.argv.slice(2));
  const root = path.join(pkg, 'data/skills');
  const codes = languageCodes();
  const graph = loadSkillGraph(root, codes);
  const files = renderSkillFiles(graph, codes);
  if (action === '--write') {
    writePublishedFiles(output, files);
    console.log('Published ' + files.size + ' JSON files for ' + codes.length + ' languages in ' + output);
  } else {
    const diff = checkPublishedFiles(output, files);
    if (diff.missing.length || diff.changed.length || diff.stale.length) {
      console.error(
        'Published Skills differ: missing ' +
          diff.missing.length +
          ', changed ' +
          diff.changed.length +
          ', stale ' +
          diff.stale.length,
      );
      for (const item of [...diff.missing, ...diff.changed, ...diff.stale].slice(0, 15)) {
        console.error('  ' + item);
      }
      process.exitCode = 1;
    } else console.log('Published Skills verified: ' + files.size + ' JSON files');
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

export { languageCodes };
