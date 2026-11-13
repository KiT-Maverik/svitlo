#!/usr/bin/env node
/**
 * Publish one full Skill taxonomy tree and one sparse localized tree per language.
 *
 * Usage:
 *   node scripts/generators/data/publish-skills-data.mjs --package content/playground --write
 *   node scripts/generators/data/publish-skills-data.mjs --package content/playground --check
 *
 * Transitional adapter for the existing source taxonomy. It prepares a complete
 * tree from legacy authored .data.ts files without evaluating them; the Engine
 * generator owns publication of already-prepared { base, locale } results.
 * Once textbooks migrate their authored Skill collections to the Build API,
 * replace this adapter with a build.props({ languages }) preparation step.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { checkTaxonomy } from '../../check-skills-taxonomy-structure.mjs';
import {
  renderSkillTree,
  writeSkillFiles,
  checkSkillFiles,
} from '../../../shared/engine/generators/skills/publishSkillTree.mjs';

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

/** Preserve authored child order without evaluating any authoring module. */
function orderedChildren(props, field, kind, file) {
  const value = props.get(field);
  if (value === undefined) return [];
  const array = unwrap(value);
  assert(array && ts.isArrayLiteralExpression(array), 'Expected ' + field + ' configurator array: ' + file);

  const suffix = '_' + kind + '_Data';
  const seen = new Set();
  return array.elements.map(node => {
    const child = unwrap(node);
    assert(
      child && ts.isIdentifier(child) && child.text.endsWith(suffix),
      'Invalid ' + field + ' child configurator: ' + file,
    );
    const slug = child.text.slice(0, -suffix.length);
    assert(slugPattern.test(slug) && !seen.has(slug), 'Duplicate or invalid child slug: ' + file + ':' + slug);
    seen.add(slug);
    return slug;
  });
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
  const newName =
    kind === 'SkillDomain' ? 'defineSkillDomain' : kind === 'SkillGroup' ? 'defineSkillGroup' : 'defineSkill';
  assert(
    call &&
      ts.isCallExpression(call) &&
      ts.isIdentifier(call.expression) &&
      call.expression.text === newName &&
      call.arguments.length === 1,
    'Invalid configurator for ' + symbol + ': ' + file,
  );
  const props = fields(call.arguments[0], file);
  const allowed = new Set([
    'slug',
    'id',
    'description',
    kind === 'SkillDomain' ? 'title' : 'name',
    ...(kind === 'SkillDomain' ? ['groups', 'skills'] : kind === 'SkillGroup' ? ['skills'] : []),
  ]);
  for (const name of props.keys()) assert(allowed.has(name), 'Unexpected config field: ' + file + '.' + name);
  const authoredSlug = literal(props.get('slug'), file + '.slug');
  assert(authoredSlug === slug && slugPattern.test(authoredSlug), 'Missing/mismatched Skill slug: ' + file);
  const id = literal(props.get('id'), file + '.id');
  assert(uuidPattern.test(id), 'Invalid UUID: ' + file);
  const label = kind === 'SkillDomain' ? 'title' : 'name';
  const name = localizedStrings(props.get(label), codes, file + '.' + label);
  let description, methodological;
  if (props.has('description')) {
    const detail = fields(props.get('description'), file + '.description');
    methodological = literal(detail.get('methodological'), file + '.description.methodological');
    assert(methodological.trim(), 'Empty methodological description: ' + file);
    for (const key of detail.keys()) {
      assert(key === 'methodological' || key === 'frontend', 'Unexpected description field: ' + file + '.' + key);
    }
    if (detail.has('frontend'))
      description = localizedStrings(detail.get('frontend'), codes, file + '.description.frontend');
  }
  assert(!!methodological, 'Configurator requires methodological description: ' + file);
  assert(kind !== 'Skill' || description, 'Skill requires complete frontend descriptions: ' + file);
  return {
    id,
    slug,
    kind,
    name,
    description,
    methodological,
    ...(kind === 'SkillDomain'
      ? {
          groupSlugs: orderedChildren(props, 'groups', 'SkillGroup', file),
          skillSlugs: orderedChildren(props, 'skills', 'Skill', file),
        }
      : kind === 'SkillGroup'
        ? { skillSlugs: orderedChildren(props, 'skills', 'Skill', file) }
        : {}),
  };
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
  // Root barrel order defines Domain order. Nested authoring arrays define child order.
  const domainSlugs = parse(path.join(root, 'index.ts')).statements.flatMap(statement => {
    if (!ts.isExportDeclaration(statement) || !statement.exportClause || !ts.isNamedExports(statement.exportClause)) {
      return [];
    }
    const suffix = '_SkillDomain_Data';
    return statement.exportClause.elements.map(item => {
      assert(item.name.text.endsWith(suffix), 'Unexpected Domain export: ' + item.name.text);
      return item.name.text.slice(0, -suffix.length);
    });
  });

  for (const domainSlug of domainSlugs) {
    const domainDir = path.join(root, domainSlug);
    const domain = entity(path.join(domainDir, domainSlug + '.data.ts'), domainSlug, 'SkillDomain');

    if (domain.skillSlugs.length) {
      domain.skills = domain.skillSlugs.map(skillSlug =>
        entity(path.join(domainDir, 'skills', skillSlug + '.data.ts'), skillSlug, 'Skill'),
      );
    }
    if (domain.groupSlugs.length) {
      domain.groups = domain.groupSlugs.map(groupSlug => {
        const groupDir = path.join(domainDir, groupSlug);
        const group = entity(path.join(groupDir, groupSlug + '.data.ts'), groupSlug, 'SkillGroup');
        group.skills = group.skillSlugs.map(skillSlug =>
          entity(path.join(groupDir, 'skills', skillSlug + '.data.ts'), skillSlug, 'Skill'),
        );
        return group;
      });
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

/**
 * One sparse tree per textbook: root and every nested collection are keyed by slug.
 * The source's ordered configurator arrays determine JSON object insertion order.
 * Common metadata is emitted once in base.json; per-language trees contain only
 * localized copy. Keys also identify entities, so slug is not duplicated in values.
 */
export function renderSkillFiles(graph, codes) {
  const supported = taxonomyCollections();
  for (const collection of Object.values(collectionByKind)) {
    assert(supported.has(collection), 'Unknown shared Collection discriminator: ' + collection);
  }

  function baseEntity(entity) {
    const collection = collectionByKind[entity.kind];
    assert(collection, 'Unsupported Skill collection: ' + entity.kind);
    assert(
      typeof entity.methodological === 'string' && entity.methodological.trim(),
      'Missing methodological description: ' + entity.slug,
    );
    return {
      id: entity.id,
      collection,
      description: { methodological: entity.methodological },
      ...(entity.groups?.length
        ? { groups: Object.fromEntries(entity.groups.map(child => [child.slug, baseEntity(child)])) }
        : {}),
      ...(entity.skills?.length
        ? { skills: Object.fromEntries(entity.skills.map(child => [child.slug, baseEntity(child)])) }
        : {}),
    };
  }

  function localizedEntity(entity, code) {
    const label = entity.name[code];
    assert(typeof label === 'string' && label.trim(), 'Missing ' + code + ' name: ' + entity.slug);
    const frontend = entity.description?.[code];
    assert(
      entity.kind !== 'Skill' || (typeof frontend === 'string' && frontend.trim()),
      'Missing ' + code + ' frontend description: ' + entity.slug,
    );
    return {
      [entity.kind === 'SkillDomain' ? 'title' : 'name']: label,
      ...(frontend ? { description: { frontend } } : {}),
      ...(entity.groups?.length
        ? { groups: Object.fromEntries(entity.groups.map(child => [child.slug, localizedEntity(child, code)])) }
        : {}),
      ...(entity.skills?.length
        ? { skills: Object.fromEntries(entity.skills.map(child => [child.slug, localizedEntity(child, code)])) }
        : {}),
    };
  }

  assert(graph.length > 0, 'Skill taxonomy must include at least one Domain');
  const base = Object.fromEntries(graph.map(domain => [domain.slug, baseEntity(domain)]));
  const locale = Object.fromEntries(
    codes.map(code => [
      code,
      Object.fromEntries(graph.map(domain => [domain.slug, localizedEntity(domain, code)])),
    ]),
  );
  return renderSkillTree({ base, locale });
}

// Compatibility exports used by the existing taxonomy fixtures and CLI.
// File serialization and filesystem ownership now live in the Engine generator.
export const writePublishedFiles = writeSkillFiles;
export const checkPublishedFiles = checkSkillFiles;

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
  const output = outputOverride ? path.resolve(repositoryRoot, outputOverride) : path.join(pkg, 'generated/skills');
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
