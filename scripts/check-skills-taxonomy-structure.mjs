#!/usr/bin/env node
/** Read-only Math Skill Taxonomy graph validation; never executes source Data. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const defaultRoot = path.join(repoRoot, 'content/math/data/skills');
const identifier = /^[a-z][a-zA-Z0-9]*$/;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function check(ok, message) {
  if (!ok) throw new Error(message);
}
function entries(dir, type) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(entry => (type === 'directory' ? entry.isDirectory() : entry.isFile()))
    .map(entry => entry.name)
    .sort();
}
function parse(file) {
  check(fs.existsSync(file), 'Missing source: ' + file);
  const source = ts.createSourceFile(
    file,
    fs.readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  check(!source.parseDiagnostics.length, 'Invalid TypeScript syntax: ' + file);
  return source;
}
function field(obj, name) {
  return obj.properties.find(p => ts.isPropertyAssignment(p) && p.name.getText() === name);
}
function imported(source, file) {
  const result = new Map();
  for (const s of source.statements.filter(ts.isImportDeclaration)) {
    const named = s.importClause?.namedBindings;
    if (!named || !ts.isNamedImports(named)) continue;
    for (const spec of named.elements) {
      const symbol = spec.name.text;
      check(!result.has(symbol), 'Duplicate import ' + symbol + ': ' + file);
      result.set(symbol, { module: s.moduleSpecifier.text, name: spec.propertyName?.text ?? symbol });
    }
  }
  return result;
}
function childRefs(config, name, file, optional = false) {
  const p = field(config, name);
  if (!p && optional) return new Map();
  check(p && ts.isObjectLiteralExpression(p.initializer), 'Missing literal ' + name + ': ' + file);
  const result = new Map();
  for (const child of p.initializer.properties) {
    check(
      ts.isPropertyAssignment(child) &&
        ts.isIdentifier(child.name) &&
        identifier.test(child.name.text) &&
        ts.isIdentifier(child.initializer),
      'Invalid child entity reference: ' + file,
    );
    check(!result.has(child.name.text), 'Duplicate child slug ' + child.name.text + ': ' + file);
    result.set(child.name.text, child.initializer.text);
  }
  return result;
}
function same(actual, expected, label) {
  const a = [...actual].sort(),
    b = [...expected].sort();
  check(
    JSON.stringify(a) === JSON.stringify(b),
    label + ': expected [' + b.join(', ') + '], actual [' + a.join(', ') + ']',
  );
}
export function checkTaxonomy(root = defaultRoot) {
  check(fs.existsSync(root), 'Missing skills root: ' + root);
  const ids = new Map();
  const count = { domains: 0, groups: 0, skills: 0 };
  function entity(file, type, slug) {
    check(identifier.test(slug), 'Invalid slug: ' + slug);
    const symbol = slug + '_' + type + '_Data';
    const source = parse(file);
    const matches = source.statements
      .filter(ts.isVariableStatement)
      .flatMap(s => s.declarationList.declarations)
      .filter(
        d =>
          d.name.getText(source) === symbol &&
          d.initializer &&
          ts.isCallExpression(d.initializer) &&
          ts.isIdentifier(d.initializer.expression) &&
          d.initializer.expression.text === 'build' + type + 'Config' &&
          d.initializer.arguments.length === 1 &&
          ts.isObjectLiteralExpression(d.initializer.arguments[0]),
      );
    check(matches.length === 1, 'Missing ' + symbol + ' builder: ' + file);
    const config = matches[0].initializer.arguments[0];
    const authoredSlug = field(config, 'slug')?.initializer;
    check(
      authoredSlug && ts.isStringLiteral(authoredSlug) && authoredSlug.text === slug,
      'Missing/mismatched slug: ' + file,
    );
    const id = field(config, 'id')?.initializer;
    check(id && ts.isStringLiteral(id) && uuid.test(id.text), 'Invalid literal UUID: ' + file);
    check(!ids.has(id.text), 'Duplicate UUID ' + id.text + ': ' + file + ' and ' + ids.get(id.text));
    ids.set(id.text, file);
    return { source, config, imports: imported(source, file) };
  }
  function barrel(dir, slugs) {
    const file = path.join(dir, 'index.ts'),
      source = parse(file),
      exports = new Map();
    for (const s of source.statements) {
      check(
        ts.isExportDeclaration(s) &&
          ts.isStringLiteral(s.moduleSpecifier) &&
          s.exportClause &&
          ts.isNamedExports(s.exportClause),
        'Invalid Skill barrel: ' + file,
      );
      for (const e of s.exportClause.elements) {
        check(!e.propertyName && !exports.has(e.name.text), 'Renamed or duplicate export: ' + file);
        exports.set(e.name.text, s.moduleSpecifier.text);
      }
    }
    same(
      exports.keys(),
      slugs.map(s => s + '_Skill_Data'),
      'Skill barrel ' + file,
    );
    for (const slug of slugs)
      check(
        exports.get(slug + '_Skill_Data') === './' + slug + '.data',
        'Broken Skill barrel path: ' + file + ' / ' + slug,
      );
  }
  function skills(dir, parent) {
    check(fs.existsSync(dir), 'Missing Skills directory: ' + dir);
    const slugs = entries(dir, 'file')
      .filter(f => f.endsWith('.data.ts'))
      .map(f => f.slice(0, -'.data.ts'.length));
    check(slugs.length > 0, 'Empty Skills collection: ' + dir);
    same(entries(dir, 'file'), ['index.ts', ...slugs.map(s => s + '.data.ts')], 'Skill files: ' + dir);
    barrel(dir, slugs);
    const refs = childRefs(parent.config, 'skills', parent.source.fileName);
    same(refs.keys(), slugs, 'Skill membership: ' + parent.source.fileName);
    for (const slug of slugs) {
      const symbol = slug + '_Skill_Data';
      check(refs.get(slug) === symbol, 'Wrong child symbol: ' + parent.source.fileName + ' / ' + slug);
      const imp = parent.imports.get(symbol);
      check(
        imp?.module === './skills' && imp.name === symbol,
        'Missing immediate Skill import: ' + parent.source.fileName + ' / ' + slug,
      );
      entity(path.join(dir, slug + '.data.ts'), 'Skill', slug);
      count.skills++;
    }
    same(
      [...parent.imports.keys()].filter(n => n.endsWith('_Skill_Data')),
      slugs.map(s => s + '_Skill_Data'),
      'Imported Skills: ' + parent.source.fileName,
    );
  }
  const domains = entries(root, 'directory');
  check(domains.length > 0, 'No Domains: ' + root);
  same(
    entries(root, 'file').filter(name => name !== 'review.ts' && name !== '_review.ts'),
    ['index.ts'],
    'Root index surface: ' + root,
  );
  const rootExports = new Map();
  for (const s of parse(path.join(root, 'index.ts')).statements) {
    check(
      ts.isExportDeclaration(s) &&
        s.exportClause &&
        ts.isNamedExports(s.exportClause) &&
        s.exportClause.elements.length === 1 &&
        ts.isStringLiteral(s.moduleSpecifier),
      'Invalid root Domain export',
    );
    const name = s.exportClause.elements[0].name.text;
    check(!rootExports.has(name), 'Duplicate Domain export: ' + name);
    rootExports.set(name, s.moduleSpecifier.text);
  }
  same(
    rootExports.keys(),
    domains.map(s => s + '_SkillDomain_Data'),
    'Root Domain exports',
  );
  for (const domain of domains) {
    const dir = path.join(root, domain);
    same(entries(dir, 'file'), [domain + '.data.ts'], 'Domain directory indexes not allowed: ' + dir);
    check(
      rootExports.get(domain + '_SkillDomain_Data') === './' + domain + '/' + domain + '.data',
      'Broken root Domain export: ' + domain,
    );
    const parent = entity(path.join(dir, domain + '.data.ts'), 'SkillDomain', domain);
    const childDirs = entries(dir, 'directory');
    const groups = childDirs.filter(x => x !== 'skills');
    const directSkills = childDirs.includes('skills');
    check(groups.length > 0 || directSkills, 'Empty Domain: ' + dir);
    check(
      !field(parent.config, 'groupIds') && !field(parent.config, 'skillIds'),
      'Obsolete ID-only Domain children: ' + dir,
    );
    const groupRefs = childRefs(parent.config, 'groups', parent.source.fileName);
    same(groupRefs.keys(), groups, 'Group membership: ' + dir);
    const directRefs = childRefs(parent.config, 'skills', parent.source.fileName, !directSkills);
    if (!directSkills) check(directRefs.size === 0, 'Direct Skills without directory: ' + dir);
    if (directSkills) skills(path.join(dir, 'skills'), parent);
    for (const group of groups) {
      const symbol = group + '_SkillGroup_Data',
        imp = parent.imports.get(symbol);
      check(
        groupRefs.get(group) === symbol && imp?.module === './' + group + '/' + group + '.data' && imp.name === symbol,
        'Missing direct Group reference: ' + dir + '/' + group,
      );
      const groupDir = path.join(dir, group);
      same(entries(groupDir, 'file'), [group + '.data.ts'], 'Group directory indexes not allowed: ' + groupDir);
      same(entries(groupDir, 'directory'), ['skills'], 'Group children: ' + groupDir);
      const g = entity(path.join(groupDir, group + '.data.ts'), 'SkillGroup', group);
      check(!field(g.config, 'skillIds'), 'Obsolete ID-only Group children: ' + groupDir);
      skills(path.join(groupDir, 'skills'), g);
      count.groups++;
    }
    same(
      [...parent.imports.keys()].filter(x => x.endsWith('_SkillGroup_Data')),
      groups.map(g => g + '_SkillGroup_Data'),
      'Imported Groups: ' + dir,
    );
    count.domains++;
  }
  return count;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const counts = checkTaxonomy(process.argv[2] ? path.resolve(process.argv[2]) : defaultRoot);
    console.log(
      'Skills structure verified: ' +
        counts.domains +
        ' Domains, ' +
        counts.groups +
        ' Groups, ' +
        counts.skills +
        ' Skills',
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
