#!/usr/bin/env node
/**
 * Migrate an existing textbook's Skill taxonomy to Engine define* configurators.
 * Dry-run by default. --preview creates an isolated complete Skill tree; --write
 * edits existing authored files. Never changes UUIDs, translations or barrels.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const kinds = {
  Skill: { old: 'buildSkillConfig', next: 'defineSkill' },
  SkillGroup: { old: 'buildSkillGroupConfig', next: 'defineSkillGroup' },
  SkillDomain: { old: 'buildSkillDomainConfig', next: 'defineSkillDomain' },
};
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const slugPattern = /^[a-z][a-zA-Z0-9]*$/;

function assert(value, message) {
  if (!value) throw new Error(message);
}
function parse(file, content) {
  const ast = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert(!ast.parseDiagnostics.length, 'Invalid TypeScript: ' + file);
  return ast;
}
function unwrap(node) {
  while (node && (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node)))
    node = node.expression;
  return node;
}
function properties(node, label) {
  const obj = unwrap(node);
  assert(obj && ts.isObjectLiteralExpression(obj), 'Expected object: ' + label);
  const result = new Map();
  for (const member of obj.properties) {
    assert(
      ts.isPropertyAssignment(member) && (ts.isIdentifier(member.name) || ts.isStringLiteral(member.name)),
      'Unsupported dynamic property: ' + label,
    );
    const key = member.name.text;
    assert(!result.has(key), 'Duplicate property ' + key + ': ' + label);
    result.set(key, member);
  }
  return result;
}
function string(node, label) {
  assert(node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)), 'Expected string: ' + label);
  return node.text;
}
function listFiles(root) {
  const result = [];
  function visit(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const file = path.join(dir, entry.name);
      assert(!entry.isSymbolicLink(), 'Symlink in Skill source: ' + file);
      if (entry.isDirectory()) visit(file);
      else {
        assert(entry.isFile(), 'Unexpected source entry: ' + file);
        if (entry.name.endsWith('.data.ts')) result.push(file);
      }
    }
  }
  visit(root);
  return result;
}
function sourceIdentity(root, file) {
  const parts = path.relative(root, file).split(path.sep);
  const slug = path.basename(file, '.data.ts');
  assert(slugPattern.test(slug), 'Invalid Skill slug in path: ' + file);
  const kind =
    parts.length === 2 && parts[0] === slug
      ? 'SkillDomain'
      : parts.length === 3 && parts[1] !== 'skills' && parts[1] === slug
        ? 'SkillGroup'
        : parts.length === 3 && parts[1] === 'skills' && parts[2] === slug + '.data.ts'
          ? 'Skill'
          : parts.length === 4 && parts[2] === 'skills' && parts[3] === slug + '.data.ts'
            ? 'Skill'
            : undefined;
  assert(kind, 'Unexpected taxonomy path: ' + file);
  return { kind, slug, parts, symbol: slug + '_' + kind + '_Data' };
}
function readReferences(obj, source, label, isNew, edits) {
  const refs = [];
  if (isNew) {
    assert(ts.isArrayLiteralExpression(unwrap(obj)), 'Expected configurator array: ' + label);
    for (const element of unwrap(obj).elements) {
      assert(ts.isIdentifier(element), 'Non-static child reference: ' + label);
      refs.push(element.text);
    }
  } else {
    assert(ts.isObjectLiteralExpression(unwrap(obj)), 'Expected child map: ' + label);
    const sourceObj = unwrap(obj);
    edits.push({ start: sourceObj.getStart(source), end: sourceObj.getStart(source) + 1, value: '[' });
    edits.push({ start: sourceObj.getEnd() - 1, end: sourceObj.getEnd(), value: ']' });
    for (const member of sourceObj.properties) {
      assert(
        ts.isPropertyAssignment(member) && ts.isIdentifier(member.name) && ts.isIdentifier(member.initializer),
        'Non-static child entry: ' + label,
      );
      const leading = source.text.slice(member.getStart(source), member.initializer.getStart(source));
      assert(
        new RegExp('^' + member.name.text + '\\s*:\\s*$').test(leading),
        'Comments or dynamic syntax between child key and value: ' + label,
      );
      assert(
        member.initializer.text.startsWith(member.name.text + '_'),
        'Child slug and reference do not match: ' + label,
      );
      edits.push({ start: member.getStart(source), end: member.initializer.getStart(source), value: '' });
      refs.push(member.initializer.text);
    }
  }
  assert(new Set(refs).size === refs.length, 'Duplicate child reference: ' + label);
  return refs;
}
function transformFile(root, file, content) {
  const identity = sourceIdentity(root, file);
  const source = parse(file, content);
  const names = kinds[identity.kind];
  const declarations = source.statements
    .filter(ts.isVariableStatement)
    .flatMap(statement => [...statement.declarationList.declarations])
    .filter(declaration => ts.isIdentifier(declaration.name) && declaration.name.text === identity.symbol);
  assert(declarations.length === 1, 'Expected one exported ' + identity.symbol + ': ' + file);
  const declaration = declarations[0];
  const variableStatement = source.statements.find(statement =>
    ts.isVariableStatement(statement) && statement.declarationList.declarations.includes(declaration),
  );
  assert(variableStatement.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword), 'Not exported: ' + file);
  const call = declaration.initializer;
  assert(
    call && ts.isCallExpression(call) && ts.isIdentifier(call.expression) && call.arguments.length === 1,
    'Expected one configurator call: ' + file,
  );
  const isNew = call.expression.text === names.next;
  assert(isNew || call.expression.text === names.old, 'Unexpected Skill configurator: ' + file);
  const edits = [];
  const config = properties(call.arguments[0], file);
  const required = ['slug', 'id', identity.kind === 'SkillDomain' && isNew ? 'title' : 'name', 'description'];
  for (const key of required) assert(config.has(key), 'Missing ' + key + ': ' + file);
  const allowed = new Set([...required, ...(identity.kind !== 'Skill' ? ['skills'] : []), ...(identity.kind === 'SkillDomain' ? ['groups'] : [])]);
  for (const key of config.keys()) assert(allowed.has(key), 'Unexpected config field ' + key + ': ' + file);
  assert(string(config.get('slug').initializer, file) === identity.slug, 'Slug mismatch: ' + file);
  const id = string(config.get('id').initializer, file);
  assert(uuid.test(id), 'Invalid UUID: ' + file);
  const localField = identity.kind === 'SkillDomain' && isNew ? 'title' : 'name';
  const local = config.get(localField);
  properties(local.initializer, file + '.' + localField);
  const desc = properties(config.get('description').initializer, file + '.description');
  assert(desc.has('methodological'), 'Missing methodological description: ' + file);
  string(desc.get('methodological').initializer, file + '.methodological');
  for (const key of desc.keys()) assert(key === 'methodological' || key === 'frontend', 'Unknown description: ' + file);
  assert(identity.kind !== 'Skill' || desc.has('frontend'), 'Missing Skill frontend description: ' + file);
  if (desc.has('frontend')) properties(desc.get('frontend').initializer, file + '.description.frontend');
  const refs = {};
  for (const key of ['groups', 'skills']) {
    if (config.has(key)) refs[key] = readReferences(config.get(key).initializer, source, file + '.' + key, isNew, edits);
  }
  if (!isNew) {
    edits.push({ start: call.expression.getStart(source), end: call.expression.getEnd(), value: names.next });
    if (identity.kind === 'SkillDomain') {
      const name = config.get('name').name;
      edits.push({ start: name.getStart(source), end: name.getEnd(), value: 'title' });
    }
    const candidates = source.statements.filter(statement =>
      ts.isImportDeclaration(statement) && statement.moduleSpecifier.text === '@svitlo/engine',
    );
    let found = 0;
    for (const statement of candidates) {
      const bindings = statement.importClause?.namedBindings;
      if (!bindings || !ts.isNamedImports(bindings)) continue;
      for (const spec of bindings.elements) {
        if (spec.name.text === names.old && !spec.propertyName && !spec.isTypeOnly) {
          edits.push({ start: spec.name.getStart(source), end: spec.name.getEnd(), value: names.next });
          found++;
        }
      }
    }
    assert(found === 1, 'Expected one direct Engine import for ' + names.old + ': ' + file);
  }
  const normalized = [...edits].sort((a, b) => b.start - a.start);
  let result = content;
  let right = content.length;
  for (const edit of normalized) {
    assert(edit.start >= 0 && edit.end <= right && edit.start <= edit.end, 'Overlapping rewrite: ' + file);
    result = result.slice(0, edit.start) + edit.value + result.slice(edit.end);
    right = edit.start;
  }
  const migrated = parse(file, result);
  const migratedDeclaration = migrated.statements
    .filter(ts.isVariableStatement)
    .flatMap(statement => [...statement.declarationList.declarations])
    .find(item => ts.isIdentifier(item.name) && item.name.text === identity.symbol);
  const migratedProps = properties(migratedDeclaration.initializer.arguments[0], file);
  const migratedLocal = migratedProps.get(identity.kind === 'SkillDomain' ? 'title' : 'name');
  const expressionText = (ast, node) => ast.text.slice(node.getStart(ast), node.getEnd());
  assert(
    expressionText(source, local.initializer) === expressionText(migrated, migratedLocal.initializer) &&
      expressionText(source, config.get('description').initializer) ===
        expressionText(migrated, migratedProps.get('description').initializer),
    'Localized content changed unexpectedly: ' + file,
  );
  return { file, result, changed: result !== content, id, ...identity, refs };
}

/** Preflight every file and all child relationships before making any writes. */
export function planSkillsMigration(root) {
  const sourceRoot = path.resolve(root);
  assert(fs.statSync(sourceRoot).isDirectory() && !fs.lstatSync(sourceRoot).isSymbolicLink(), 'Invalid taxonomy root');
  const files = listFiles(sourceRoot);
  assert(files.length > 0, 'No Skill entities found');
  const plan = files.map(file => transformFile(sourceRoot, file, fs.readFileSync(file, 'utf8')));
  const byPath = new Map(plan.map(item => [item.file, item]));
  const ids = new Map();
  const references = new Map();
  const counts = { SkillDomain: 0, SkillGroup: 0, Skill: 0 };
  for (const item of plan) {
    counts[item.kind]++;
    assert(!ids.has(item.id.toLowerCase()), 'Duplicate UUID in ' + item.file + ' and ' + ids.get(item.id.toLowerCase()));
    ids.set(item.id.toLowerCase(), item.file);
    for (const [key, symbols] of Object.entries(item.refs)) {
      for (const symbol of symbols) {
        const match = /^(\w+)_(Skill|SkillGroup)_Data$/.exec(symbol);
        assert(match, 'Unexpected child symbol: ' + item.file + ' / ' + symbol);
        const [, slug, kind] = match;
        assert(key === (kind === 'Skill' ? 'skills' : 'groups'), 'Child kind mismatch: ' + item.file);
        const [domain, group] = item.parts;
        const childFile = path.join(sourceRoot, domain, ...(kind === 'Skill' ? (item.kind === 'SkillGroup' ? [group] : []) : []), ...(kind === 'Skill' ? ['skills'] : []), ...(kind === 'SkillGroup' ? [slug] : []), slug + '.data.ts');
        assert(byPath.has(childFile), 'Missing referenced child: ' + childFile);
        assert(!references.has(childFile), 'Child referenced by multiple parents: ' + childFile);
        references.set(childFile, item.file);
      }
    }
  }
  for (const item of plan) {
    assert(item.kind === 'SkillDomain' || references.has(item.file), 'Unreferenced Skill or Group: ' + item.file);
    if (item.kind === 'SkillGroup') assert(item.refs.skills?.length, 'Empty Group: ' + item.file);
    if (item.kind === 'SkillDomain') assert((item.refs.groups?.length ?? 0) + (item.refs.skills?.length ?? 0) > 0, 'Empty Domain: ' + item.file);
  }
  return { root: sourceRoot, files: plan, counts, changed: plan.filter(item => item.changed).length };
}

function options(argv) {
  const opts = { write: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--write') {
      assert(!opts.write && !opts.preview, 'Choose --write or --preview');
      opts.write = true;
    } else if (arg === '--package' || arg === '--preview') {
      const key = arg.slice(2);
      assert(!opts[key] && argv[i + 1] && !argv[i + 1].startsWith('--'), 'Missing/duplicate argument: ' + arg);
      opts[key] = argv[++i];
    } else throw new Error('Unknown argument: ' + arg);
  }
  assert(opts.package && !(opts.write && opts.preview), 'Usage: --package content/<textbook> [--preview <new-directory> | --write]');
  const pkg = path.resolve(repoRoot, opts.package);
  assert(pkg.startsWith(path.join(repoRoot, 'content') + path.sep) && fs.existsSync(path.join(pkg, 'package.json')), 'Expected existing textbook package under content/');
  return { ...opts, pkg, root: path.join(pkg, 'data/skills') };
}
export function runMigration(opts) {
  const plan = planSkillsMigration(opts.root);
  if (opts.preview) {
    const preview = path.resolve(opts.preview);
    assert(preview !== plan.root && !preview.startsWith(plan.root + path.sep), 'Preview cannot be inside source');
    assert(!fs.existsSync(preview), 'Preview target must not exist: ' + preview);
    try {
      fs.cpSync(plan.root, preview, { recursive: true, errorOnExist: true, force: false });
      for (const item of plan.files) {
        if (item.changed) fs.writeFileSync(path.join(preview, path.relative(plan.root, item.file)), item.result);
      }
      const second = planSkillsMigration(preview);
      assert(second.changed === 0, 'Preview migration is not idempotent');
      assert(JSON.stringify(second.counts) === JSON.stringify(plan.counts), 'Preview entity counts changed');
    } catch (error) {
      fs.rmSync(preview, { recursive: true, force: true });
      throw error;
    }
  } else if (opts.write) {
    const written = [];
    try {
      for (const item of plan.files) {
        if (!item.changed) continue;
        const before = fs.readFileSync(item.file, 'utf8');
        written.push({ file: item.file, before });
        fs.writeFileSync(item.file, item.result);
      }
    } catch (error) {
      for (const item of written.reverse()) fs.writeFileSync(item.file, item.before);
      throw error;
    }
  }
  return plan;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const opts = options(process.argv.slice(2));
    const plan = runMigration(opts);
    console.log(JSON.stringify({
      mode: opts.preview ? 'preview' : opts.write ? 'write' : 'dry-run',
      textbook: path.relative(repoRoot, opts.pkg),
      entities: plan.counts,
      examined: plan.files.length,
      changed: plan.changed,
      preview: opts.preview ? path.resolve(opts.preview) : undefined,
    }, null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
