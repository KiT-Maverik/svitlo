#!/usr/bin/env node
/** Read-only Skill classification graph validation; never executes authored TS. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
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
function same(actual, expected, label) {
  const a = [...actual].sort(),
    b = [...expected].sort();
  check(
    JSON.stringify(a) === JSON.stringify(b),
    label + ': expected [' + b.join(', ') + '], actual [' + a.join(', ') + ']',
  );
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
  return obj.properties.find(
    p => ts.isPropertyAssignment(p) && (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) && p.name.text === name,
  );
}
function imported(source, file) {
  const result = new Map();
  for (const stmt of source.statements.filter(ts.isImportDeclaration)) {
    const named = stmt.importClause?.namedBindings;
    if (!named || !ts.isNamedImports(named)) continue;
    for (const spec of named.elements) {
      const symbol = spec.name.text;
      check(!result.has(symbol), 'Duplicate import ' + symbol + ': ' + file);
      result.set(symbol, { module: stmt.moduleSpecifier.text, name: spec.propertyName?.text ?? symbol });
    }
  }
  return result;
}
function childRefs(config, name, file, optional = false) {
  const p = field(config, name);
  if (!p && optional) return new Map();
  check(p, 'Missing child map ' + name + ': ' + file);
  const map = p.initializer;
  check(ts.isObjectLiteralExpression(map), 'Expected slug-keyed child map ' + name + ': ' + file);
  const result = new Map();
  for (const item of map.properties) {
    let slug, symbol;
    if (ts.isShorthandPropertyAssignment(item)) {
      slug = item.name.text;
      symbol = slug;
    } else if (
      ts.isPropertyAssignment(item) &&
      (ts.isIdentifier(item.name) || ts.isStringLiteral(item.name)) &&
      ts.isIdentifier(item.initializer)
    ) {
      slug = item.name.text;
      symbol = item.initializer.text;
    } else {
      throw new Error('Invalid child configurator entry: ' + file);
    }
    check(identifier.test(slug), 'Invalid child slug ' + slug + ': ' + file);
    check(symbol === slug, 'Child slug/symbol mismatch ' + slug + ': ' + file);
    check(!result.has(slug), 'Duplicate child slug ' + slug + ': ' + file);
    result.set(slug, symbol);
  }
  return result;
}
export function checkTaxonomy(root = defaultRoot) {
  check(fs.existsSync(root), 'Missing Skills root: ' + root);
  const ids = new Map();
  const count = { domains: 0, groups: 0, skills: 0 };
  function entity(file, type, slug) {
    check(identifier.test(slug), 'Invalid slug: ' + slug);
    const source = parse(file);
    const expectedBuilder =
      type === 'SkillDomain' ? 'defineSkillDomain' : type === 'SkillGroup' ? 'defineSkillGroup' : 'defineSkill';
    const matches = source.statements
      .filter(ts.isVariableStatement)
      .flatMap(statement => statement.declarationList.declarations)
      .filter(
        dec =>
          dec.name.getText(source) === slug &&
          dec.initializer &&
          ts.isCallExpression(dec.initializer) &&
          ts.isIdentifier(dec.initializer.expression) &&
          dec.initializer.expression.text === expectedBuilder &&
          dec.initializer.arguments.length === 1 &&
          ts.isObjectLiteralExpression(dec.initializer.arguments[0]),
      );
    check(matches.length === 1, 'Missing ' + slug + ' builder: ' + file);
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
    return { config, source, imports: imported(source, file) };
  }
  function checkSkills(dir, parent, skills) {
    const filenames = entries(dir, 'file').filter(name => name !== 'index.ts');
    same(
      filenames,
      [...skills.keys()].map(slug => slug + '.ts'),
      'Skill files: ' + dir,
    );
    check(skills.size > 0, 'Empty Skills collection: ' + dir);
    for (const slug of skills.keys()) {
      const symbol = skills.get(slug);
      const imp = parent.imports.get(symbol);
      check(imp?.module === './' + slug && imp.name === symbol, 'Missing direct Skill import: ' + dir + '/' + slug);
      entity(path.join(dir, slug + '.ts'), 'Skill', slug);
      count.skills++;
    }
  }
  const domains = entries(root, 'directory');
  check(domains.length > 0, 'No Domains: ' + root);
  same(
    entries(root, 'file').filter(name => name !== 'review.ts' && name !== '_review.ts'),
    ['index.ts'],
    'Root index surface: ' + root,
  );
  const rootExports = new Map();
  for (const stmt of parse(path.join(root, 'index.ts')).statements) {
    check(
      ts.isExportDeclaration(stmt) &&
        stmt.exportClause &&
        ts.isNamedExports(stmt.exportClause) &&
        stmt.exportClause.elements.length === 1 &&
        ts.isStringLiteral(stmt.moduleSpecifier),
      'Invalid root Domain export',
    );
    const exp = stmt.exportClause.elements[0];
    check(!exp.propertyName && !rootExports.has(exp.name.text), 'Renamed or duplicate Domain export');
    rootExports.set(exp.name.text, stmt.moduleSpecifier.text);
  }
  same(rootExports.keys(), domains, 'Root Domain exports');
  for (const slug of domains) {
    check(rootExports.get(slug) === './' + slug, 'Broken root Domain export: ' + slug);
    const dir = path.join(root, slug);
    const domain = entity(path.join(dir, 'index.ts'), 'SkillDomain', slug);
    const groupDirs = entries(dir, 'directory');
    const groupRefs = childRefs(domain.config, 'groups', domain.source.fileName, true);
    const skillRefs = childRefs(domain.config, 'skills', domain.source.fileName, true);
    same(groupRefs.keys(), groupDirs, 'Group membership: ' + dir);
    same(
      entries(dir, 'file'),
      ['index.ts', ...skillRefs.keys()].map((v, i) => (i === 0 ? v : v + '.ts')),
      'Domain files: ' + dir,
    );
    check(groupRefs.size || skillRefs.size, 'Empty Domain: ' + dir);
    check(
      !field(domain.config, 'groupIds') && !field(domain.config, 'skillIds'),
      'Obsolete ID-only Domain children: ' + dir,
    );
    if (skillRefs.size) checkSkills(dir, domain, skillRefs);
    for (const groupSlug of groupDirs) {
      check(!skillRefs.has(groupSlug), 'Duplicate Domain child slug: ' + groupSlug);
      const symbol = groupRefs.get(groupSlug);
      const imp = domain.imports.get(symbol);
      check(
        imp?.module === './' + groupSlug && imp.name === symbol,
        'Missing direct Group reference: ' + dir + '/' + groupSlug,
      );
      const groupDir = path.join(dir, groupSlug);
      same(entries(groupDir, 'directory'), [], 'Group children: ' + groupDir);
      const group = entity(path.join(groupDir, 'index.ts'), 'SkillGroup', groupSlug);
      check(!field(group.config, 'skillIds'), 'Obsolete ID-only Group children: ' + groupDir);
      const children = childRefs(group.config, 'skills', group.source.fileName);
      same(
        entries(groupDir, 'file'),
        ['index.ts', ...[...children.keys()].map(key => key + '.ts')],
        'Group files: ' + groupDir,
      );
      checkSkills(groupDir, group, children);
      count.groups++;
    }
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
