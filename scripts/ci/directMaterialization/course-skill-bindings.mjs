/**
 * Resolve UUID->export bindings exclusively from the unchanged, Git-pinned
 * textbook Skill taxonomy. Candidate TypeScript is never evaluated.
 * The narrow, isolated worker later verifies the actual Build Configurators
 * and membership in the canonical SkillDomain registry.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';

const UUID = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i;
const NAME = /^[A-Za-z][A-Za-z0-9]*$/;
const record = x => x !== null && typeof x === 'object' && !Array.isArray(x);
const git = (root, ...args) =>
  execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }).trimEnd();
const gitBlob = value => createHash('sha1').update('blob ' + value.length + '\0').update(value).digest('hex');

/** Visit only Course/Module/Chapter semantic targets, never Lesson seeds or editorial prose. */
export function courseSkillReferences(input) {
  const found = new Set();
  let nodes = 0;
  function targets(value, location) {
    if (value === undefined) return;
    if (!record(value)) throw Error(location + ': invalid Skill targets');
    const ids = value.skills;
    if (ids === undefined) return;
    if (!Array.isArray(ids) || ids.length > 250 ||
        ids.some(id => typeof id !== 'string' || !UUID.test(id)) ||
        new Set(ids.map(id => id.toLowerCase())).size !== ids.length)
      throw Error(location + ': invalid or duplicate Skill UUID list');
    for (const id of ids) found.add(id);
  }
  function visit(node, depth) {
    if (++nodes > 10000 || depth > 80) throw Error('Oversized Course Skill tree');
    const config = node?.config;
    if (!record(config) || !['course', 'module', 'chapter'].includes(config.type))
      throw Error('Unexpected Course Skill owner');
    targets(config.params?.outcomes, config.type + '.params.outcomes');
    targets(config.params?.prerequisites, config.type + '.params.prerequisites');
    if (config.type !== 'course') {
      targets(node.production?.outcomes, config.type + '.production.outcomes');
      targets(node.production?.prerequisites, config.type + '.production.prerequisites');
    }
    const content = config.content;
    if (!record(content?.items) || !Array.isArray(content.order) || content.order.length > 5000)
      throw Error('Course Skill owner missing reviewed ordered collection');
    for (const key of content.order) {
      const child = content.items[key];
      if (['module', 'chapter'].includes(child?.config?.type)) visit(child, depth + 1);
    }
  }
  visit(input, 0);
  if (found.size > 250) throw Error('Too many Course Skill dependencies');
  return [...found].sort();
}
function textField(config, name) {
  if (!ts.isObjectLiteralExpression(config)) return null;
  const field = config.properties.find(x =>
    ts.isPropertyAssignment(x) &&
    (ts.isIdentifier(x.name) || ts.isStringLiteral(x.name)) &&
    x.name.text === name);
  return field && ts.isStringLiteral(field.initializer) ? field.initializer.text : null;
}
function extractSkillExports(filename, content) {
  // The zero-dependency publisher imports this module only for Git verification;
  // load TypeScript solely inside the trusted, dependency-installed analyzer.
  const ts = createRequire(import.meta.url)('typescript');
  const parsed = ts.createSourceFile(filename, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (parsed.parseDiagnostics.length) throw Error('Invalid trusted Skill TypeScript: ' + filename);
  const hasDefineSkillImport = parsed.statements.some(x =>
    ts.isImportDeclaration(x) && ts.isStringLiteral(x.moduleSpecifier) &&
    x.moduleSpecifier.text === '@svitlo/engine/build' &&
    x.importClause?.namedBindings && ts.isNamedImports(x.importClause.namedBindings) &&
    x.importClause.namedBindings.elements.some(el =>
      el.name.text === 'defineSkill' && !el.propertyName && !el.isTypeOnly));
  const result = [];
  for (const item of parsed.statements) {
    if (!ts.isVariableStatement(item) || !item.modifiers?.some(x => x.kind === ts.SyntaxKind.ExportKeyword)) continue;
    for (const dec of item.declarationList.declarations) {
      const init = dec.initializer;
      if (!init || !ts.isCallExpression(init) || !ts.isIdentifier(init.expression) ||
          init.expression.text !== 'defineSkill') continue;
      if (!hasDefineSkillImport || !ts.isIdentifier(dec.name) || !NAME.test(dec.name.text) ||
          init.arguments.length !== 1) throw Error('Unsafe trusted Skill declaration in ' + filename);
      const id = textField(init.arguments[0], 'id');
      const slug = textField(init.arguments[0], 'slug');
      if (!UUID.test(id ?? '') || !NAME.test(slug ?? '') || slug !== dec.name.text)
        throw Error('Trusted Skill UUID/slug/export mismatch in ' + filename);
      result.push({ id, slug, exportName: dec.name.text });
    }
  }
  return result;
}
function checkedTree(root, folder) {
  const source = git(root, 'ls-tree', '-r', 'HEAD', '--', folder);
  if (!source) throw Error('Missing registered textbook Skill sources: ' + folder);
  const lines = source.split('\n');
  if (lines.length > 3000) throw Error('Oversized textbook Skill taxonomy');
  const entries = [];
  for (const row of lines) {
    const match = /^100644 blob ([a-f0-9]{40})\t(.+)$/.exec(row);
    if (!match || !match[2].startsWith(folder + '/') ||
        match[2].split('/').some(part => part === '.' || part === '..' || part === ''))
      throw Error('Non-regular or unsafe textbook Skill source in trusted Git tree');
    entries.push({ sha: match[1], path: match[2] });
  }
  return { source, entries };
}

/** Verify complete Skill subtree equality, then bind only canonical exported leaf Skills. */
export function resolveTrustedCourseSkills(input, textbookRoot, candidateRoot, trustedRoot) {
  const references = courseSkillReferences(input);
  if (!references.length) return [];
  if (!/^content\/[a-z][a-z0-9-]*$/.test(textbookRoot)) throw Error('Invalid textbook Skill root');
  const folder = textbookRoot + '/data/skills';
  const trusted = fs.realpathSync(trustedRoot);
  const candidate = fs.realpathSync(candidateRoot);
  const tree = checkedTree(trusted, folder);
  if (git(candidate, 'ls-tree', '-r', 'HEAD', '--', folder) !== tree.source)
    throw Error('Candidate Skill taxonomy differs from the trusted default-branch Git tree');
  if (!tree.entries.some(e => e.path === folder + '/index.ts'))
    throw Error('Missing canonical textbook Skill registry index.ts');
  let total = 0;
  const catalog = new Map();
  for (const entry of tree.entries) {
    const rel = entry.path.slice(folder.length + 1);
    if (!rel.endsWith('.ts') || rel.endsWith('/index.ts') || rel === 'index.ts' ||
        rel === '_review.ts' || rel.endsWith('.d.ts') || rel.endsWith('.spec.ts')) continue;
    const suffix = rel.slice(0, -3);
    if (!suffix.split('/').every(part => NAME.test(part))) continue;
    let parent = trusted;
    for (const part of entry.path.split('/')) {
      parent = path.join(parent, part);
      if (fs.lstatSync(parent).isSymbolicLink()) throw Error('Symlink in trusted Skill source ancestry');
    }
    const source = fs.readFileSync(parent);
    total += source.length;
    if (total > 24 * 1024 * 1024 || source.length > 2 * 1024 * 1024 ||
        gitBlob(source) !== entry.sha ||
        !Buffer.from(source.toString('utf8'), 'utf8').equals(source))
      throw Error('Malformed, oversized or changed trusted Skill source');
    for (const item of extractSkillExports(entry.path, source.toString('utf8'))) {
      if (catalog.has(item.id)) throw Error('Ambiguous duplicate trusted Skill UUID ' + item.id);
      catalog.set(item.id, {
        ...item,
        sourceSha: entry.sha,
        sourcePath: entry.path,
        importPath: '#skillsData/' + suffix,
      });
    }
  }
  return references.map(id => {
    const binding = catalog.get(id);
    if (!binding) throw Error('Unknown, stale or non-Skill taxonomy UUID ' + id);
    return binding;
  });
}
