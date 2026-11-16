#!/usr/bin/env node
/**
 * ONE-TIME SVITLO SKILLS TAXONOMY CODEMOD — NOT PRODUCTION TOOLING.
 *
 * Place at <repo>/temp/migrate-skills.mjs (temp/ is ignored), then run:
 *   node temp/migrate-skills.mjs --all                  # dry-run
 *   node temp/migrate-skills.mjs --package content/art # dry-run
 *   node temp/migrate-skills.mjs --all --write         # only after Engine upgrade
 *
 * Rewrites only authored content/<book>/data/skills trees. Engine, Studio and source
 * path parsing scripts MUST be updated separately in the same migration PR.
 * Preserves UUID, slugs, parent relationships, names/descriptions and locales.
 * Fails closed on ambiguous AST, duplicate identities, paths or references.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const args = process.argv.slice(2);
function option(flag) {
  const index = args.indexOf(flag);
  if (index < 0) return undefined;
  if (!args[index + 1] || args[index + 1].startsWith('--')) throw Error(`Missing ${flag} value`);
  return args[index + 1];
}
const repoRoot = path.resolve(option('--repo') ?? process.cwd());
const write = args.includes('--write');
const all = args.includes('--all');
const packageArg = option('--package');
const supported = new Set(['--repo', '--package', '--all', '--write', '--help']);
for (let i = 0; i < args.length; i++) {
  if (!supported.has(args[i])) throw Error(`Unknown option: ${args[i]}`);
  if (args[i] === '--package' || args[i] === '--repo') i++;
}
if (args.includes('--help') || (all === false && !packageArg) || (all && packageArg)) {
  console.log('Usage: node temp/migrate-skills.mjs --all | --package content/<book> [--write] [--repo <path>]');
  process.exit(args.includes('--help') ? 0 : 2);
}
const require = createRequire(import.meta.url);
let ts;
try { ts = require(require.resolve('typescript', { paths: [repoRoot] })); }
catch { try { ts = require('typescript'); } catch { throw Error('Install workspace TypeScript dependency first'); } }

function parse(filename, source) {
  const sf = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (sf.parseDiagnostics.length) {
    throw Error(`${filename}: TS parse error: ${sf.parseDiagnostics.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n')).join('; ')}`);
  }
  return sf;
}
function assert(ok, message) { if (!ok) throw Error(message); }
function own(obj, name, required = true) {
  assert(obj && ts.isObjectLiteralExpression(obj), `Expected object for ${name}`);
  const props = obj.properties.filter(p => p.name && (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) && p.name.text === name);
  assert(props.length < 2, `Duplicate field ${name}`);
  if (!props.length) { assert(!required, `Missing ${name}`); return undefined; }
  return props[0];
}
function val(obj, field, required = true) {
  const p = own(obj, field, required);
  assert(!p || ts.isPropertyAssignment(p), `Expected property assignment for ${field}`);
  return p?.initializer;
}
function literal(node, where) {
  assert(node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)), `Expected literal string ${where}`);
  return node.text;
}
function recEntries(obj, where) {
  assert(obj && ts.isObjectLiteralExpression(obj), `Expected dictionary ${where}`);
  const seen = new Set();
  return obj.properties.map(p => {
    assert(ts.isPropertyAssignment(p) || ts.isShorthandPropertyAssignment(p), `Only static properties allowed in ${where}`);
    const key = p.name?.text;
    assert(key && !seen.has(key), `Duplicate/computed key in ${where}: ${key ?? '?'}`);
    seen.add(key);
    return { key, prop: p, value: ts.isShorthandPropertyAssignment(p) ? p.name : p.initializer };
  });
}
function literalDict(obj, where) {
  if (!obj) return undefined;
  const entries = recEntries(obj, where);
  const out = {};
  for (const { key, value } of entries) {
    assert(/^[a-z]{2,3}$/.test(key), `Invalid locale key ${key} in ${where}`);
    out[key] = literal(value, `${where}.${key}`);
  }
  return Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b, 'en')));
}
const isdir = p => fs.existsSync(p) && fs.statSync(p).isDirectory();
const isfile = p => fs.existsSync(p) && fs.statSync(p).isFile();
const children = d => isdir(d) ? fs.readdirSync(d, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name).sort() : [];
const files = d => isdir(d) ? fs.readdirSync(d, { withFileTypes: true }).filter(e => e.isFile()).map(e => e.name).sort() : [];
const rel = p => path.relative(repoRoot, p).split(path.sep).join('/');
function identify(file, kind, slug) {
  const source = fs.readFileSync(file, 'utf8');
  const sf = parse(file, source);
  const candidates = [];
  for (const s of sf.statements) {
    if (!ts.isVariableStatement(s) || !s.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) continue;
    for (const d of s.declarationList.declarations) {
      if (!ts.isIdentifier(d.name) || !d.initializer || !ts.isCallExpression(d.initializer)) continue;
      if (!ts.isIdentifier(d.initializer.expression) || d.initializer.expression.text !== 'define' + kind) continue;
      candidates.push(d);
    }
  }
  assert(candidates.length === 1, `${rel(file)}: expected one exported define${kind} configurator; got ${candidates.length}`);
  const decl = candidates[0], call = decl.initializer;
  assert(call.arguments.length === 1 && ts.isObjectLiteralExpression(call.arguments[0]), `${rel(file)}: static config required`);
  const config = call.arguments[0];
  const actualSlug = literal(val(config, 'slug'), `${rel(file)}.slug`);
  const id = literal(val(config, 'id'), `${rel(file)}.id`);
  assert(actualSlug === slug, `${rel(file)}: slug mismatch ${actualSlug} vs ${slug}`);
  assert(/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id), `${rel(file)}: invalid UUID ${id}`);
  const names = literalDict(val(config, kind === 'SkillDomain' ? 'title' : 'name', false), `${rel(file)}.name`);
  const desc = val(config, 'description', false);
  const method = desc ? literal(val(desc, 'methodological', false), `${rel(file)}.description.methodological`) : undefined;
  const frontend = desc ? literalDict(val(desc, 'frontend', false), `${rel(file)}.description.frontend`) : undefined;
  return { file, sf, source, decl, config, kind, slug, id, symbol: decl.name.text, names, frontend, method, parent: null };
}
function identifyFile(base, oldName, kind, slug) {
  const old = path.join(base, oldName), nu = path.join(base, 'index.ts');
  assert(!(isfile(old) && isfile(nu)), `Collision: ${rel(old)} and ${rel(nu)}`);
  const file = isfile(old) ? old : nu;
  assert(isfile(file), `Missing ${kind} source for ${slug} (${rel(base)})`);
  return identify(file, kind, slug);
}
function findSkillFiles(base) {
  const legacy = path.join(base, 'skills');
  const old = isdir(legacy) ? files(legacy).filter(f => f.endsWith('.data.ts')).map(f => path.join(legacy, f)) : [];
  const newFiles = files(base).filter(f => f.endsWith('.ts') && f !== 'index.ts' && !f.endsWith('.data.ts')).map(f => path.join(base, f));
  return [...old, ...newFiles].sort();
}
function collectCollection(node, kind, where) {
  if (!node) return [];
  let entries;
  if (own(node, 'items', false) || own(node, 'order', false)) {
    const items = val(node, 'items');
    entries = recEntries(items, `${where}.items`);
    const order = val(node, 'order');
    assert(ts.isArrayLiteralExpression(order), `${where}: expected explicit old order array`);
    const keys = order.elements.map(n => literal(n, `${where}.order`));
    assert(keys.length === new Set(keys).size && keys.length === entries.length && keys.every(k => entries.some(e => e.key === k)), `${where}: invalid original items/order; stop migration`);
  } else entries = recEntries(node, where);
  return entries.map(e => {
    assert(ts.isIdentifier(e.value), `${where}.${e.key}: direct identifier reference required`);
    return { slug: e.key, ref: e.value.text };
  });
}
function discover(root) {
  assert(isfile(path.join(root, 'index.ts')), `Missing Skills root index: ${rel(root)}`);
  const entities = [], domains = [];
  for (const domainSlug of children(root)) {
    const dd = path.join(root, domainSlug);
    const domain = identifyFile(dd, `${domainSlug}.data.ts`, 'SkillDomain', domainSlug);
    domain.target = path.join(dd, 'index.ts'); domain.parent = null;
    const groups = [], direct = [];
    for (const groupSlug of children(dd).filter(d => d !== 'skills')) {
      const gd = path.join(dd, groupSlug);
      const group = identifyFile(gd, `${groupSlug}.data.ts`, 'SkillGroup', groupSlug);
      group.target = path.join(gd, 'index.ts'); group.parent = domainSlug;
      const skills = findSkillFiles(gd).map(f => {
        const s = path.basename(f).replace(/\.data\.ts$|\.ts$/g, '');
        const skill = identify(f, 'Skill', s);
        skill.target = path.join(gd, s + '.ts'); skill.parent = domainSlug + '/' + groupSlug;
        return skill;
      });
      group.children = { skills }; groups.push(group, ...skills);
    }
    for (const f of findSkillFiles(dd)) {
      const slug = path.basename(f).replace(/\.data\.ts$|\.ts$/g, '');
      const skill = identify(f, 'Skill', slug);
      skill.target = path.join(dd, slug + '.ts'); skill.parent = domainSlug;
      direct.push(skill);
    }
    domain.children = { groups: groups.filter(e => e.kind === 'SkillGroup'), skills: direct };
    domains.push(domain);entities.push(domain, ...groups, ...direct);
  }
  assert(domains.length > 0, `${rel(root)}: no Domains`);
  // UUIDs are global identities, while slugs are keys within their owning collection.
  // Existing curricula intentionally reuse e.g. by2 under multiply and divide.
  const ids = new Set(), scopedSlugs = new Set();
  for (const e of entities) {
    assert(!ids.has(e.id), `${rel(root)}: duplicate UUID ${e.id}`);
    ids.add(e.id);
    const scopedKey = `${e.parent ?? '<root>'}/${e.slug}`;
    assert(!scopedSlugs.has(scopedKey), `${rel(root)}: duplicate sibling slug ${scopedKey}`);
    scopedSlugs.add(scopedKey);
  }
  for (const e of entities.filter(x => x.kind !== 'Skill')) {
    for (const [field, expected] of Object.entries(e.children)) {
      const v = val(e.config, field, expected.length > 0);
      const found = collectCollection(v, field, `${rel(e.file)}.${field}`);
      const expect = new Map(expected.map(ch => [ch.slug, ch]));
      assert(found.length === expect.size && found.every(f => expect.has(f.slug) && expect.get(f.slug).symbol === f.ref), `${rel(e.file)}.${field}: children differ from disk or original export symbols`);
    }
    assert(Object.values(e.children).flat().length > 0, `${rel(e.file)}: empty taxonomy group/domain`);
  }
  return { root, entities, domains };
}
function editsApply(source, edits, where) {
  const normalized = [...edits].sort((a, b) => b.start - a.start);
  for (let i = 0; i < normalized.length - 1; i++) assert(normalized[i].start >= normalized[i + 1].end, `Overlapping AST edits in ${where}`);
  let result = source;
  for (const { start, end, text } of normalized) result = result.slice(0, start) + text + result.slice(end);
  parse(where, result);
  return result;
}
function patch(edits, node, text, sf) { edits.push({ start: node.getStart(sf), end: node.getEnd(), text }); }
function sortLocales(e, edits) {
  const sort = (obj, where) => {
    if (!obj) return;
    const entries = recEntries(obj, where);
    if (!entries.length) return;
    assert(entries.every(x => /^[a-z]{2,3}$/.test(x.key) && ts.isPropertyAssignment(x.prop) && (ts.isStringLiteral(x.value) || ts.isNoSubstitutionTemplateLiteral(x.value))), `${where}: dynamic translations, needs manual review`);
    // Reject comments within a locale map; otherwise a text move could detach them.
    const inside = e.source.slice(obj.getStart(e.sf) + 1, obj.getEnd() - 1);
    assert(!/(^|\n)\s*\/\/|\/\*/.test(inside), `${where}: inline comments need manual review`);
    const sorted = [...entries].sort((a, b) => a.key.localeCompare(b.key, 'en'));
    if (entries.every((x, i) => x.key === sorted[i].key)) return;
    const objIndent = /(?:^|\n)(\s*)[^\n]*$/.exec(e.source.slice(0, obj.getStart(e.sf)))?.[1] ?? '';
    const fieldIndent = objIndent + '  ';
    const next = `{\n${sorted.map(x => fieldIndent + x.prop.getText(e.sf) + ',').join('\n')}\n${objIndent}}`;
    patch(edits, obj, next, e.sf);
  };
  sort(val(e.config, e.kind === 'SkillDomain' ? 'title' : 'name', false), `${rel(e.file)}.name/title`);
  const desc = val(e.config, 'description', false);
  if (desc) sort(val(desc, 'frontend', false), `${rel(e.file)}.description.frontend`);
}
function newMap(e, field, members, edits) {
  const node = own(e.config, field, members.length > 0);
  if (!node) return;
  const spaces = /^\s*/.exec(e.source.slice(e.source.lastIndexOf('\n', node.getStart(e.sf) - 1) + 1, node.getStart(e.sf)))?.[0] ?? '  ';
  const keyed = [...members].sort((a, b) => a.slug.localeCompare(b.slug, 'en'));
  patch(edits, node, `${field}: {\n${keyed.map(x => spaces + '  ' + x.slug + ',').join('\n')}\n${spaces}}`, e.sf);
}
function rebuildImports(e, edits) {
  const statements = e.sf.statements.filter(x => ts.isImportDeclaration(x));
  const members = Object.values(e.children).flat();
  const childSymbols = new Set(members.map(x => x.symbol));
  const retained = [];
  for (const s of statements) {
    const named = s.importClause?.namedBindings;
    const identifiers = named && ts.isNamedImports(named) ? named.elements.map(x => x.name.text) : [];
    const hasChild = identifiers.some(x => childSymbols.has(x));
    assert(!hasChild || identifiers.every(x => childSymbols.has(x)), `${rel(e.file)}: mixed child/external import needs manual review`);
    if (!hasChild) retained.push(s.getText(e.sf));
  }
  const imports = members.sort((a, b) => a.slug.localeCompare(b.slug, 'en'))
    .map(child => `import { ${child.slug} } from './${child.kind === 'Skill' ? child.slug : child.slug}';`);
  const next = [...retained, '', ...imports].join('\n') + '\n';
  if (statements.length) edits.push({ start: statements[0].getStart(e.sf), end: statements[statements.length - 1].getEnd(), text: next.trimEnd() });
  else edits.push({ start: 0, end: 0, text: next });
}
function transformEntity(e) {
  const edits = [];
  if (e.symbol !== e.slug) patch(edits, e.decl.name, e.slug, e.sf);
  sortLocales(e, edits);
  if (e.children) {
    for (const [field, members] of Object.entries(e.children)) newMap(e, field, members, edits);
    rebuildImports(e, edits);
  }
  return editsApply(e.source, edits, e.file);
}
function transformRoot(root, domains) {
  const file = path.join(root, 'index.ts'), source = fs.readFileSync(file, 'utf8'), sf = parse(file, source), edits = [];
  const seen = new Set();
  for (const s of sf.statements) {
    if (!ts.isExportDeclaration(s) || !s.moduleSpecifier) continue;
    const oldModule = literal(s.moduleSpecifier, rel(file) + ' export module');
    const slug = oldModule.replace(/^\.\//, '').split('/')[0];
    const domain = domains.find(d => d.slug === slug);
    assert(domain, `${rel(file)}: unexpected Domain export ${slug}`);
    assert(s.exportClause && ts.isNamedExports(s.exportClause) && s.exportClause.elements.length === 1, `${rel(file)}: unsupported Domain export`);
    const name = s.exportClause.elements[0].propertyName?.text ?? s.exportClause.elements[0].name.text;
    assert(name === domain.symbol || name === domain.slug, `${rel(file)}: mismatched export ${name}`);
    assert(!seen.has(slug), `${rel(file)}: duplicate Domain export`);
    seen.add(slug);
    patch(edits, s, `export { ${slug} } from './${slug}';`, sf);
  }
  assert(seen.size === domains.length, `${rel(file)}: root export count differs from on-disk Domains`);
  return editsApply(source, edits, file);
}
function snapshot(catalog) {
  const records = catalog.entities.map(e => ({
    kind: e.kind, id: e.id, slug: e.slug, parent: e.parent,
    names: e.names, frontend: e.frontend, methodological: e.method,
  })).sort((a, b) => a.id.localeCompare(b.id));
  return crypto.createHash('sha256').update(JSON.stringify(records)).digest('hex');
}
function planOne(root) {
  const catalog = discover(root), expectedHash = snapshot(catalog), writes = new Map(), deletes = new Set();
  for (const entity of catalog.entities) {
    assert(!writes.has(entity.target), `Duplicate destination ${rel(entity.target)}`);
    writes.set(entity.target, transformEntity(entity));
    if (entity.file !== entity.target) deletes.add(entity.file);
  }
  writes.set(path.join(root, 'index.ts'), transformRoot(root, catalog.domains));
  for (const parent of catalog.entities.filter(e => e.children)) {
    const barrel = path.join(path.dirname(parent.file), 'skills/index.ts');
    if (isfile(barrel)) {
      const s = fs.readFileSync(barrel, 'utf8');
      assert(s.includes('export {'), `${rel(barrel)}: unexpected barrel content`);
      deletes.add(barrel);
    }
  }
  for (const [dest, content] of writes) {
    if (isfile(dest) && !catalog.entities.some(e => e.file === dest) && dest !== path.join(root, 'index.ts')) {
      throw Error(`Destination already exists outside authored catalog: ${rel(dest)}`);
    }
    assert(!deletes.has(dest), `Delete/write collision ${rel(dest)}`);
    parse(dest, content);
  }
  const result = { root, writes, deletes, entities: catalog.entities.length, domains: catalog.domains.length, originalHash: expectedHash };
  // Validate the semantic snapshot *before* any filesystem mutation by parsing the
  // in-memory changed files and comparing every field plus original parent ownership.
  const updated = catalog.entities.map(e => {
    const content = writes.get(e.target), sf = parse(e.target, content);
    const decl = sf.statements.filter(ts.isVariableStatement).flatMap(s => [...s.declarationList.declarations]).find(d => ts.isIdentifier(d.name) && d.name.text === e.slug);
    assert(decl?.initializer && ts.isCallExpression(decl.initializer), `Transformed declaration missing: ${rel(e.target)}`);
    const cfg = decl.initializer.arguments[0];
    const desc = val(cfg, 'description', false);
    const names = literalDict(val(cfg, e.kind === 'SkillDomain' ? 'title' : 'name', false), `${rel(e.target)}.name/title`);
    const frontend = desc ? literalDict(val(desc, 'frontend', false), `${rel(e.target)}.description.frontend`) : undefined;
    const method = desc ? literal(val(desc, 'methodological', false), `${rel(e.target)}.methodological`) : undefined;
    assert(literal(val(cfg, 'slug'), 'slug') === e.slug && literal(val(cfg, 'id'), 'id') === e.id, `Identity mutated: ${rel(e.target)}`);
    if (e.children) for (const [f, expected] of Object.entries(e.children)) {
      const refs = collectCollection(val(cfg, f, expected.length > 0), f, rel(e.target));
      assert(refs.length === expected.length && refs.every(ref => expected.some(ch => ch.slug === ref.slug && ch.slug === ref.ref)), `Hierarchy changed: ${rel(e.target)}.${f}`);
    }
    return { ...e, names, frontend, method };
  });
  assert(snapshot({ entities: updated }) === expectedHash, `${rel(root)}: localization or semantic content changed during codemod`);
  return result;
}

const packages = all
  ? children(path.join(repoRoot, 'content')).filter(book => isdir(path.join(repoRoot, 'content', book, 'data', 'skills'))).map(book => path.join(repoRoot, 'content', book, 'data', 'skills'))
  : [path.join(repoRoot, packageArg, 'data', 'skills')];
assert(packages.length > 0, 'No Skills directories found');
for (const p of packages) assert(p.startsWith(path.join(repoRoot, 'content') + path.sep), `Unsafe package path: ${p}`);
const plans = packages.map(planOne); // fail all before mutating any files
const summary = plans.map(p => ({
  package: rel(p.root),
  entities: p.entities,
  domains: p.domains,
  filesToWrite: [...p.writes].filter(([file, contents]) => !isfile(file) || fs.readFileSync(file, 'utf8') !== contents).length,
  legacyFilesToRemove: p.deletes.size,
  identityAndLocalesHash: p.originalHash,
}));
let written = 0, removed = 0;
if (write) {
  // Do not write until every package passed structural and semantic checks.
  for (const p of plans) for (const [dest, contents] of p.writes) {
    if (!isfile(dest) || fs.readFileSync(dest, 'utf8') !== contents) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, contents, 'utf8');
      written++;
    }
  }
  for (const p of plans) for (const file of p.deletes) {
    assert(isfile(file), `Expected legacy input missing while removing: ${rel(file)}`);
    fs.unlinkSync(file); removed++;
  }
  for (const p of plans) {
    const removeEmpty = dir => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) if (entry.isDirectory()) removeEmpty(path.join(dir, entry.name));
      if (dir !== p.root && fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
    };
    removeEmpty(p.root);
  }
}
console.log(JSON.stringify({ mode: write ? 'write' : 'dry-run', books: plans.length, written, removed, report: summary }, null, 2));
if (!write) console.log('Dry-run only. Re-run with --write after reviewing this report and updating Engine.');