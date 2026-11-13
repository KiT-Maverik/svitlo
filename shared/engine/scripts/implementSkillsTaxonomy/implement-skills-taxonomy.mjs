#!/usr/bin/env node
/** Editorial Markdown -> direct-composition Skill Data. English-first; dry run by default. */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import os from 'node:os';
import { checkTaxonomy } from '../checkSkillsTaxonomyStructure/check-skills-taxonomy-structure.mjs';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const slugPattern = /^[a-z][A-Za-z0-9]*$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const errors = [];
const reports = [];
const opts = { apply: false };
function diagnostic(entity, action, severity, problem) {
  const item = { entity, action, severity, problem };
  reports.push(item);
  if (severity === 'error') errors.push(item);
  console.error(JSON.stringify(item));
}
function cli() {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--apply') {
      if (opts.apply) throw Error('Duplicate flag: ' + arg);
      opts.apply = true;
    } else if (arg === '--package' || arg === '--translations') {
      const key = arg.slice(2);
      if (opts[key] || !args[i + 1] || args[i + 1].startsWith('--')) throw Error('Missing/duplicate value: ' + arg);
      opts[key] = args[++i];
    } else throw Error('Unknown argument: ' + arg);
  }
  if (!opts.package) throw Error('Usage: --package content/<textbook> [--translations <reviewed.json>] [--apply]');
  const apps = path.join(root, 'content') + path.sep;
  const pkg = path.resolve(root, opts.package);
  if (!pkg.startsWith(apps) || !fs.existsSync(path.join(pkg, 'package.json')))
    throw Error('Expected existing textbook package under content/');
  opts.packageRoot = pkg;
  opts.markdown = path.join(pkg, 'docs/skills/taxonomy.md');
  opts.targetRoot = path.join(pkg, 'data/skills');
  if (!fs.existsSync(opts.markdown)) throw Error('Missing taxonomy.md: ' + opts.markdown);
  if (opts.translations) {
    const p = path.resolve(root, opts.translations);
    if (!p.startsWith(root + path.sep) || !fs.existsSync(p))
      throw Error('Translations must be an existing file inside repository');
    opts.translations = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (!opts.translations || Array.isArray(opts.translations) || typeof opts.translations !== 'object')
      throw Error('Translations JSON must be an entity-path map');
  } else opts.translations = {};
}
function locales() {
  const source = fs.readFileSync(path.join(root, 'shared/contracts/src/types/languages.ts'), 'utf8');
  const marker = source.indexOf('export const DEFAULT_SUPPORTED_LANGUAGES = [');
  const end = source.indexOf('] as const satisfies readonly LanguageDefinition[];', marker);
  if (marker < 0 || end < 0) throw Error('Unable to read supported-language registry');
  const codes = [...source.slice(marker, end).matchAll(/\blanguage:\s*'([^']+)'/g)].map(m => m[1]);
  if (!codes.includes('en') || codes.length < 2 || new Set(codes).size !== codes.length)
    throw Error('Invalid supported-language registry');
  return codes;
}
function sourceFile(file, content) {
  const ast = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (ast.parseDiagnostics.length) throw Error('Invalid TypeScript: ' + file);
  return ast;
}
function unwrap(node) {
  while (node && (ts.isAsExpression(node) || ts.isParenthesizedExpression(node) || ts.isSatisfiesExpression(node)))
    node = node.expression;
  return node;
}
function property(object, key) {
  if (!object || !ts.isObjectLiteralExpression(object)) throw Error('Expected object for ' + key);
  const hits = object.properties.filter(p => ts.isPropertyAssignment(p) && p.name?.text === key);
  if (hits.length !== 1) throw Error('Expected one ' + key + ' property');
  return hits[0];
}
function optionalProperty(object, key) {
  return object.properties.find(p => ts.isPropertyAssignment(p) && p.name?.text === key);
}
function readCode(file, kind) {
  if (!fs.existsSync(file)) throw Error('Missing ' + kind + ' code: ' + file);
  const source = fs.readFileSync(file, 'utf8');
  const ast = sourceFile(file, source);
  let found;
  function walk(n) {
    if (
      ts.isCallExpression(n) &&
      ts.isIdentifier(n.expression) &&
      ['build' + kind + 'Config', 'define' + kind].includes(n.expression.text)
    ) {
      if (found || n.arguments.length !== 1 || !ts.isObjectLiteralExpression(n.arguments[0]))
        throw Error('Ambiguous ' + kind + ' config: ' + file);
      found = n.arguments[0];
    }
    ts.forEachChild(n, walk);
  }
  walk(ast);
  if (!found) throw Error('Missing Skill configurator: ' + file);
  return { source, ast, config: found };
}
function literal(node, field) {
  if (!(ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))) throw Error('Expected literal ' + field);
  return node.text;
}
function dict(object, field) {
  const result = {};
  const v = unwrap(object);
  if (!ts.isObjectLiteralExpression(v)) throw Error('Expected localized object ' + field);
  for (const p of v.properties) {
    if (
      !ts.isPropertyAssignment(p) ||
      !(ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) ||
      Object.hasOwn(result, p.name.text)
    )
      throw Error('Invalid/duplicate key in ' + field);
    result[p.name.text] = literal(p.initializer, field + ':' + p.name.text);
  }
  return result;
}
function checkLocaleValues(value, field, codes) {
  // Incomplete dictionaries are intentional: TypeScript must report missing
  // translations, not the code generator. Never emit empty/fallback strings.
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Missing localized ' + field);
  const invalid = Object.entries(value)
    .filter(
      ([code, text]) =>
        !codes.includes(code) ||
        typeof text !== 'string' ||
        !text.trim() ||
        /^\[(?:Not authored|TODO)\]$/i.test(text.trim()),
    )
    .map(([code]) => code);
  if (invalid.length) throw Error('Invalid locales for ' + field + ': ' + invalid.join(', '));
  return value;
}
function translations(entry, codes) {
  const given = opts.translations[entry.key] ?? {};
  if (!given || typeof given !== 'object' || Array.isArray(given)) throw Error('Invalid translations for ' + entry.key);
  if (Object.keys(given).some(k => k !== 'name' && k !== 'frontend'))
    throw Error('Unexpected translation field for ' + entry.key);
  for (const field of ['name', 'frontend'])
    if (
      given[field] !== undefined &&
      (!given[field] || typeof given[field] !== 'object' || Array.isArray(given[field]))
    )
      throw Error('Invalid ' + field + ' translations for ' + entry.key);
  if (given.name && Object.hasOwn(given.name, 'en') && given.name.en !== entry.title)
    throw Error('Translated name.en differs from approved heading');
  if (
    given.frontend &&
    entry.friendly !== '[Not authored]' &&
    Object.hasOwn(given.frontend, 'en') &&
    given.frontend.en !== entry.friendly
  )
    throw Error('Translated frontend.en differs from approved frontend text');
  return given;
}
function parse(markdown) {
  const headings = [...markdown.matchAll(/^(#{3,5}) ([^\r\n]+)\s*$/gm)];
  const entries = [];
  let domain, group;
  for (let i = 0; i < headings.length; i++) {
    const h = headings[i];
    const start = h.index,
      end = headings[i + 1]?.index ?? markdown.length;
    const body = markdown.slice(start + h[0].length, end);
    const lines = body
      .split(/\r?\n/)
      .map(v => v.trim())
      .filter(Boolean);
    const single = label => {
      const matches = lines.filter(v => v.startsWith(label + ':'));
      if (matches.length !== 1) throw Error('Missing or repeated ' + label);
      return matches[0].slice(label.length + 1).trim();
    };
    const depth = h[1].length;
    const isGroup = depth === 4 && lines.some(v => /^Skills:\s*\d+\s*$/.test(v));
    const kind = depth === 3 ? 'SkillDomain' : depth === 5 ? 'Skill' : isGroup ? 'SkillGroup' : 'Skill';
    const entry = { title: h[2].trim(), depth, kind, start, end, body, issues: [] };
    if (depth === 3) {
      domain = entry;
      group = undefined;
    } else if (kind === 'SkillGroup') group = entry;
    else if (kind === 'Skill' && depth === 4) group = undefined;
    entry.parent = kind === 'SkillDomain' ? undefined : kind === 'SkillGroup' ? domain : depth === 5 ? group : domain;
    entry.domain = kind === 'SkillDomain' ? entry : domain;
    try {
      if (!entry.parent && kind !== 'SkillDomain') throw Error('Invalid heading ancestry');
      if (depth === 5 && !group) throw Error('Skill without Group');
      entry.slug = single('Slug');
      entry.action = single('Action');
      entry.status = single('Status');
      entry.methodological = single('Methodological description');
      entry.friendly = single('User-friendly description');
      if (!slugPattern.test(entry.slug)) throw Error('Invalid lowerCamelCase Slug');
      if (!['create', 'update', 'delete', 'skip'].includes(entry.action)) throw Error('Invalid Action');
      if (!['pending', 'implemented'].includes(entry.status)) throw Error('Invalid Status');
      if (!entry.methodological || /^\[/.test(entry.methodological))
        throw Error('Missing approved methodological description');
      if (!entry.friendly || (entry.friendly.startsWith('[') && entry.friendly !== '[Not authored]'))
        throw Error('Invalid user-friendly description');
      const links = lines.filter(l => /^\[[^\]]+\]\([^)]+\)$/.test(l));
      if (links.length !== 1) throw Error('Expected one standalone Code link');
      entry.link = links[0];
      if (entry.status === 'pending' && entry.link !== '[Not implemented](#)')
        throw Error('Pending entity has non-pending Code link');
      if (entry.status === 'implemented' && entry.link === '[Not implemented](#)')
        throw Error('Implemented entity has no Code link');
      if (kind === 'SkillDomain' && !lines.some(l => /^Groups:\s*\d+\s*·\s*Skills:\s*\d+/.test(l)))
        throw Error('Domain count metadata missing');
      if (kind === 'SkillGroup' && !lines.some(l => /^Skills:\s*\d+$/.test(l)))
        throw Error('Group count metadata missing');
      if (kind === 'Skill' && lines.some(l => /^Skills:|^Groups:/.test(l)))
        throw Error('Skill has parent count metadata');
      const parentKey = entry.parent?.key;
      entry.key = parentKey ? parentKey + '/' + entry.slug : entry.slug;
    } catch (error) {
      entry.issues.push(error.message);
      entry.action ??= 'invalid';
      entry.key ??= entry.title;
    }
    entries.push(entry);
  }
  if (!entries.length) throw Error('No taxonomy entries');
  // Slugs are globally unique among Domain/Group/Skill records in this textbook.
  // Check skipped/pending entries too, case-insensitively for filesystem portability.
  const slugOwners = new Map();
  for (const e of entries) {
    if (!slugPattern.test(e.slug ?? '')) continue;
    const canonicalSlug = e.slug.toLowerCase();
    const first = slugOwners.get(canonicalSlug);
    if (first) {
      const problem = `Duplicate taxonomy slug "${e.slug}" across ${first.key} (${first.kind}) and ${e.key} (${e.kind})`;
      first.issues.push(problem);
      e.issues.push(problem);
    } else slugOwners.set(canonicalSlug, e);
  }
  for (const e of entries) {
    if (e.kind === 'SkillDomain') e.children = entries.filter(x => x.parent === e);
    if (e.kind === 'SkillGroup') e.children = entries.filter(x => x.parent === e);
  }
  return entries;
}

function fileOf(e) {
  const domain = e.domain?.slug ?? e.slug;
  if (e.kind === 'SkillDomain') return path.join(opts.targetRoot, domain, domain + '.data.ts');
  if (e.kind === 'SkillGroup') return path.join(opts.targetRoot, domain, e.slug, e.slug + '.data.ts');
  const p = e.depth === 5 ? path.join(opts.targetRoot, domain, e.parent.slug) : path.join(opts.targetRoot, domain);
  return path.join(p, 'skills', e.slug + '.data.ts');
}
function rel(file) {
  return path.relative(root, file).split(path.sep).join('/');
}
function codeLink(e) {
  const f = fileOf(e);
  return (
    '[' +
    path.basename(f) +
    '](' +
    encodeURI(path.relative(path.dirname(opts.markdown), f).split(path.sep).join('/')) +
    ')'
  );
}
function dictionary(obj, indentation = 2) {
  const inner = ' '.repeat(indentation + 2);
  const outer = ' '.repeat(indentation);
  return (
    '{\n' +
    Object.entries(obj)
      .map(([k, v]) => inner + (/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)) + ': ' + JSON.stringify(v) + ',')
      .join('\n') +
    '\n' +
    outer +
    '}'
  );
}
function existing(e) {
  const f = fileOf(e),
    code = readCode(f, e.kind);
  const id = literal(property(code.config, 'id').initializer, 'UUID');
  if (!uuidPattern.test(id)) throw Error('Invalid UUID: ' + rel(f));
  const slugProp = optionalProperty(code.config, 'slug');
  const slug = slugProp ? literal(slugProp.initializer, 'slug') : undefined;
  if (slug && slug !== e.slug) throw Error('Slug differs from canonical source filename: ' + rel(f));
  const label = e.kind === 'SkillDomain' && optionalProperty(code.config, 'title') ? 'title' : 'name';
  const name = dict(unwrap(property(code.config, label).initializer), label);
  const desc = unwrap(property(code.config, 'description').initializer);
  const methodological = literal(property(desc, 'methodological').initializer, 'methodological');
  const frontendProp = optionalProperty(desc, 'frontend');
  const frontend = frontendProp ? dict(unwrap(frontendProp.initializer), 'frontend') : undefined;
  for (const p of code.config.properties)
    if (
      !ts.isPropertyAssignment(p) ||
      !['slug', 'id', 'name', 'title', 'description', 'groups', 'skills'].includes(p.name.text)
    )
      throw Error('Unsupported config property; refusing rewrite: ' + rel(f));
  return { slug, id, name, frontend, methodological };
}
function scanRegistry() {
  const registry = new Set(),
    seenSlugs = new Map();
  if (!fs.existsSync(opts.targetRoot)) return { ids: registry, slugs: seenSlugs };
  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const f = path.join(dir, ent.name);
      if (ent.isSymbolicLink()) throw Error('Symlink in taxonomy: ' + rel(f));
      if (ent.isDirectory()) {
        walk(f);
        continue;
      }
      if (!ent.isFile() || !f.endsWith('.data.ts')) continue;
      const slug = path.basename(f, '.data.ts');
      const parts = path.relative(opts.targetRoot, f).split(path.sep);
      const kind =
        parts.length === 2 ? 'SkillDomain' : parts.length === 3 && parts[1] !== 'skills' ? 'SkillGroup' : 'Skill';
      if (!slugPattern.test(slug)) throw Error('Bad source slug: ' + rel(f));
      const info = readCode(f, kind);
      const id = literal(property(info.config, 'id').initializer, 'UUID');
      const authoredSlug = optionalProperty(info.config, 'slug');
      if (authoredSlug && literal(authoredSlug.initializer, 'slug') !== slug)
        throw Error('Slug differs from canonical source filename: ' + rel(f));
      if (!uuidPattern.test(id) || registry.has(id.toLowerCase())) throw Error('Invalid/duplicate UUID: ' + rel(f));
      if (seenSlugs.has(slug.toLowerCase())) throw Error('Duplicate existing source slug: ' + slug);
      registry.add(id.toLowerCase());
      seenSlugs.set(slug.toLowerCase(), f);
    }
  }
  walk(opts.targetRoot);
  return { ids: registry, slugs: seenSlugs };
}
function allocateId(used) {
  for (let i = 0; i < 64; i++) {
    const id = crypto.randomUUID();
    if (!used.has(id.toLowerCase())) {
      used.add(id.toLowerCase());
      return id;
    }
  }
  throw Error('Unable to allocate unique UUID');
}
function listDiskChildren(e) {
  const folder = path.dirname(fileOf(e));
  if (!fs.existsSync(folder)) return [];
  const results = [];
  const skillFolder = path.join(folder, 'skills');
  if (fs.existsSync(skillFolder)) {
    for (const name of fs.readdirSync(skillFolder).filter(n => n.endsWith('.data.ts')))
      results.push({ slug: name.slice(0, -8), kind: 'Skill' });
  }
  if (e.kind === 'SkillDomain') {
    for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
      if (entry.isDirectory() && entry.name !== 'skills') results.push({ slug: entry.name, kind: 'SkillGroup' });
    }
  }
  return results;
}
function children(e, local) {
  if (e.kind === 'Skill') return [];
  const authored = e.children || [];
  if (e.kind === 'SkillGroup' && authored.some(x => x.kind !== 'Skill'))
    throw Error('SkillGroup can contain only Skills: ' + e.key);
  const candidates = new Map();
  for (const child of [...listDiskChildren(e), ...authored]) {
    const key = child.kind + ':' + child.slug;
    candidates.set(key, { slug: child.slug, kind: child.kind });
  }
  if (!candidates.size) throw Error('Empty taxonomy parent: ' + e.key);
  return [...candidates.values()]
    .sort((a, b) => a.kind.localeCompare(b.kind) || a.slug.localeCompare(b.slug))
    .map(child => {
      const f =
        child.kind === 'SkillGroup'
          ? path.join(path.dirname(fileOf(e)), child.slug, child.slug + '.data.ts')
          : path.join(path.dirname(fileOf(e)), 'skills', child.slug + '.data.ts');
      if (!local.has(f) && !fs.existsSync(f)) throw Error('Missing approved child: ' + rel(f));
      return { ...child, file: f };
    });
}
function render(e, value, kids) {
  const imports = ['import { define' + e.kind + " } from '@svitlo/engine';"];
  const lines = [
    '  slug: ' + JSON.stringify(e.slug) + ',',
    '  id: ' + JSON.stringify(value.id) + ',',
    '  ' + (e.kind === 'SkillDomain' ? 'title' : 'name') + ': ' + dictionary(value.name) + ',',
  ];
  const groups = kids.filter(x => x.kind === 'SkillGroup');
  const skills = kids.filter(x => x.kind === 'Skill');
  if (kids.length) imports.push(''); // Separate builder from entity imports.
  for (const x of groups)
    imports.push('import { ' + x.slug + "_SkillGroup_Data } from './" + x.slug + '/' + x.slug + ".data';");
  if (skills.length)
    imports.push('import { ' + skills.map(x => x.slug + '_Skill_Data').join(', ') + " } from './skills';");
  if (e.kind === 'SkillDomain') {
    lines.push('  groups: [');
    for (const x of groups) lines.push('    ' + x.slug + '_SkillGroup_Data,');
    lines.push('  ],');
  }
  if (skills.length) {
    lines.push('  skills: [');
    for (const x of skills) lines.push('    ' + x.slug + '_Skill_Data,');
    lines.push('  ],');
  }
  lines.push('  description: {');
  lines.push('    methodological: ' + JSON.stringify(value.methodological) + ',');
  if (value.frontend) lines.push('    frontend: ' + dictionary(value.frontend, 4) + ',');
  lines.push('  },');
  return (
    imports.join('\n') +
    '\n\nexport const ' +
    e.slug +
    '_' +
    e.kind +
    '_Data = define' +
    e.kind +
    '({\n' +
    lines.join('\n') +
    '\n});\n'
  );
}
function stableMembership(e, kids) {
  if (e.kind === 'Skill') return true;
  const old = readCode(fileOf(e), e.kind).config;
  if (optionalProperty(old, 'groupIds') || optionalProperty(old, 'skillIds')) return false;
  for (const [field, kind] of [
    ['groups', 'SkillGroup'],
    ['skills', 'Skill'],
  ]) {
    if (field === 'groups' && e.kind === 'SkillGroup') continue;
    const members = kids.filter(x => x.kind === kind);
    const prop = optionalProperty(old, field);
    if (!prop) {
      if (members.length) return false;
      if (field === 'groups') continue;
      continue;
    }
    const value = unwrap(prop.initializer);
    if (ts.isArrayLiteralExpression(value)) {
      if (value.elements.length !== members.length) return false;
      const expected = new Set(members.map(x => x.slug + '_' + kind + '_Data'));
      if (value.elements.some(x => !ts.isIdentifier(x) || !expected.has(x.text))) return false;
    } else if (ts.isObjectLiteralExpression(value)) {
      if (value.properties.length !== members.length) return false;
      for (const member of members) {
        const entry = value.properties.find(p => ts.isPropertyAssignment(p) && p.name?.text === member.slug);
        if (
          !entry ||
          !ts.isIdentifier(entry.initializer) ||
          entry.initializer.text !== member.slug + '_' + kind + '_Data'
        )
          return false;
      }
    } else return false;
  }
  return true;
}
function sameDictionary(a, b) {
  return !!a && !!b && Object.keys(a).length === Object.keys(b).length && Object.keys(a).every(k => a[k] === b[k]);
}
function patchExisting(e, reviewed, methodological) {
  const file = fileOf(e),
    info = readCode(file, e.kind),
    changes = [];
  const add = (node, text) => changes.push({ start: node.getStart(info.ast), end: node.getEnd(), text });
  const label = e.kind === 'SkillDomain' && optionalProperty(info.config, 'title') ? 'title' : 'name';
  const currentName = unwrap(property(info.config, label).initializer);
  if (reviewed.name && !sameDictionary(dict(currentName, 'name'), reviewed.name))
    add(currentName, dictionary(reviewed.name));
  if (!optionalProperty(info.config, 'slug'))
    changes.push({
      start: info.config.getStart(info.ast) + 1,
      end: info.config.getStart(info.ast) + 1,
      text: '\n  slug: ' + JSON.stringify(e.slug) + ',',
    });
  const desc = unwrap(property(info.config, 'description').initializer);
  const method = property(desc, 'methodological').initializer;
  if (literal(method, 'methodological') !== methodological) add(method, JSON.stringify(methodological));
  const currentFrontend = optionalProperty(desc, 'frontend');
  if (reviewed.frontend) {
    if (currentFrontend) {
      const oldFrontend = unwrap(currentFrontend.initializer);
      if (!sameDictionary(dict(oldFrontend, 'frontend'), reviewed.frontend))
        add(oldFrontend, dictionary(reviewed.frontend, 4));
    } else
      changes.push({
        start: desc.getEnd() - 1,
        end: desc.getEnd() - 1,
        text: '\n    frontend: ' + dictionary(reviewed.frontend, 4) + ',\n  ',
      });
  }
  let content = info.source;
  for (const x of changes.sort((a, b) => b.start - a.start))
    content = content.slice(0, x.start) + x.text + content.slice(x.end);
  sourceFile(file, content);
  return content;
}
function indexContent(kids) {
  return (
    kids
      .map(k => 'export { ' + k + "_Skill_Data } from './" + k + ".data';")
      .sort()
      .join('\n') + '\n'
  );
}
function domainsFor(planned) {
  const domains = new Set();
  if (fs.existsSync(opts.targetRoot))
    for (const ent of fs.readdirSync(opts.targetRoot, { withFileTypes: true }))
      if (ent.isDirectory()) domains.add(ent.name);
  for (const file of planned.keys()) {
    const bits = path.relative(opts.targetRoot, file).split(path.sep);
    if (bits.length >= 2 && !bits[0].startsWith('..')) domains.add(bits[0]);
  }
  return [...domains].sort();
}
function rootIndex(planned) {
  return (
    domainsFor(planned)
      .map(s => 'export { ' + s + "_SkillDomain_Data } from './" + s + '/' + s + ".data';")
      .join('\n') + '\n'
  );
}
function domainPlan(d, entities, registry, codes) {
  const local = new Map(),
    done = new Set(),
    nodes = entities.filter(e => e.domain === d);
  const problems = nodes.filter(e => e.issues.length).map(e => e.key + ': ' + e.issues.join('; '));
  if (problems.length) throw Error(problems.join('; '));
  if (nodes.every(e => e.action === 'skip')) return { local, done };
  if (nodes.some(e => e.action === 'delete'))
    throw Error(
      'Manual deletion required: Action: delete is editorial only; this generator never removes Code or changes its Status',
    );
  for (const e of [...nodes].sort((a, b) => b.depth - a.depth)) {
    if (e.status === 'implemented' && e.link !== codeLink(e))
      throw Error('Implemented Code link differs from canonical source path: ' + e.key);
    if (e.action === 'skip') {
      if (e.status === 'implemented') {
        if (!fs.existsSync(fileOf(e))) throw Error('Skipped entity missing: ' + e.key);
        existing(e);
      }
      if ((e.children || []).some(x => x.action === 'delete' || (x.action === 'create' && !fs.existsSync(fileOf(x)))))
        throw Error('Parent must use Action: update when child membership changes: ' + e.key);
      continue;
    }
    const file = fileOf(e),
      found = fs.existsSync(file);
    if (e.action === 'update' && (!found || e.status !== 'implemented'))
      throw Error('Update requires existing verified entity: ' + e.key);
    if (e.action === 'create' && found && e.status !== 'implemented')
      throw Error('Create conflicts with an existing source: ' + e.key);
    if (e.action === 'create' && !found && e.status === 'implemented')
      throw Error('Implemented source missing: ' + e.key);
    const prior = found ? existing(e) : null;
    const reviewed = translations(e, codes);
    // Markdown owns English. Keep approved existing translations and overlay
    // optional reviewed translations, but do not manufacture any other locale.
    const name = { ...(prior?.name ?? {}), ...(reviewed.name ?? {}), en: e.title };
    const authoredFrontend = e.friendly !== '[Not authored]';
    const frontend = authoredFrontend
      ? { ...(prior?.frontend ?? {}), ...(reviewed.frontend ?? {}), en: e.friendly }
      : prior?.frontend || reviewed.frontend
        ? { ...(prior?.frontend ?? {}), ...(reviewed.frontend ?? {}) }
        : undefined;
    checkLocaleValues(name, 'name ' + e.key, codes);
    if (e.kind === 'Skill' && !authoredFrontend) throw Error('Skill frontend description is not authored: ' + e.key);
    if (e.kind === 'Skill' || authoredFrontend) checkLocaleValues(frontend, 'frontend ' + e.key, codes);
    else if (frontend) checkLocaleValues(frontend, 'frontend ' + e.key, codes);
    if (!found && registry.slugs.has(e.slug.toLowerCase()) && registry.slugs.get(e.slug.toLowerCase()) !== file)
      throw Error('Slug already exists elsewhere in source: ' + e.slug);
    const id = prior?.id ?? allocateId(registry.ids);
    const kids = e.kind === 'Skill' ? [] : children(e, local);
    const code =
      found && e.action === 'update' && stableMembership(e, kids)
        ? patchExisting(e, { name, frontend }, e.methodological)
        : render(e, { id, name, frontend, methodological: e.methodological }, kids);
    if (found && e.action === 'create' && prior.methodological !== e.methodological)
      throw Error('Conflicting idempotent create: ' + e.key);
    // Safe idempotent create also upgrades previously generated ID-only/slugless code:
    // keep existing UUID and translations, but emit canonical full-entity children.
    if (!found || fs.readFileSync(file, 'utf8') !== code) local.set(file, code);
    if (kids.length && kids[0].kind === 'Skill') {
      const f = path.join(path.dirname(file), 'skills/index.ts');
      const body = indexContent(kids.filter(x => x.kind === 'Skill').map(x => x.slug));
      if (!fs.existsSync(f) || fs.readFileSync(f, 'utf8') !== body) local.set(f, body);
    }
    done.add(e);
  }
  return { local, done };
}
function verify(planned) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-skill-check-'));
  const target = path.join(tmp, 'skills');
  try {
    if (fs.existsSync(opts.targetRoot)) fs.cpSync(opts.targetRoot, target, { recursive: true });
    else fs.mkdirSync(target, { recursive: true });
    for (const [file, body] of planned) {
      if (!file.startsWith(opts.targetRoot + path.sep)) continue;
      const output = path.join(target, path.relative(opts.targetRoot, file));
      fs.mkdirSync(path.dirname(output), { recursive: true });
      fs.writeFileSync(output, body);
    }
    checkTaxonomy(target);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}
function apply(changes) {
  const before = new Map(),
    temp = new Map(),
    touched = [];
  try {
    for (const [file, body] of changes) {
      if (!file.startsWith(opts.packageRoot + path.sep)) throw Error('Outside textbook: ' + file);
      let dir = opts.packageRoot;
      for (const part of path.relative(opts.packageRoot, file).split(path.sep)) {
        dir = path.join(dir, part);
        if (fs.existsSync(dir) && fs.lstatSync(dir).isSymbolicLink())
          throw Error('Symlink in destination: ' + rel(dir));
      }
      before.set(file, fs.existsSync(file) ? fs.readFileSync(file) : null);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      const staged = file + '.' + crypto.randomUUID() + '.tmp';
      fs.writeFileSync(staged, body);
      temp.set(file, staged);
    }
    for (const [file] of changes) {
      fs.renameSync(temp.get(file), file);
      touched.push(file);
    }
  } catch (error) {
    for (const f of touched.reverse()) {
      if (before.get(f) === null) fs.rmSync(f, { force: true });
      else fs.writeFileSync(f, before.get(f));
    }
    throw error;
  } finally {
    for (const f of temp.values()) fs.rmSync(f, { force: true });
  }
}
function revisedMarkdown(original, done) {
  const edits = [];
  for (const e of done) {
    const start = original.indexOf('\n', e.start) + 1;
    const section = original.slice(start, e.end);
    edits.push({
      start,
      end: e.end,
      body: section.replace(/^Status: (pending|implemented)$/m, 'Status: implemented').replace(e.link, codeLink(e)),
    });
  }
  let value = original;
  for (const e of edits.sort((a, b) => b.start - a.start))
    value = value.slice(0, e.start) + e.body + value.slice(e.end);
  return value;
}
function run() {
  cli();
  const codes = locales();
  const original = fs.readFileSync(opts.markdown, 'utf8');
  const entities = parse(original),
    domains = entities.filter(e => e.kind === 'SkillDomain');
  const registry = scanRegistry(),
    planned = new Map(),
    done = new Set();
  for (const domain of domains) {
    try {
      const out = domainPlan(domain, entities, registry, codes);
      if (!out.local.size) continue;
      const candidate = new Map([...planned, ...out.local]);
      candidate.set(path.join(opts.targetRoot, 'index.ts'), rootIndex(candidate));
      verify(candidate);
      for (const [file, body] of out.local) planned.set(file, body);
      for (const e of out.done) done.add(e);
    } catch (error) {
      diagnostic(domain.key, domain.action, 'error', error.message);
    }
  }
  if (planned.size) {
    planned.set(path.join(opts.targetRoot, 'index.ts'), rootIndex(planned));
    verify(planned);
    const md = revisedMarkdown(original, done);
    if (md !== original) planned.set(opts.markdown, md);
  }
  for (const [file, body] of [...planned])
    if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') === body) planned.delete(file);
  if (opts.apply && planned.size) apply(planned);
  console.log(
    JSON.stringify({
      mode: opts.apply ? 'apply' : 'dry-run',
      success: done.size,
      errors: errors.length,
      files: planned.size,
    }),
  );
  if (errors.length) process.exitCode = 1;
}
try {
  run();
} catch (error) {
  diagnostic('batch', 'initialization', 'error', error.message);
  process.exitCode = 1;
}
