#!/usr/bin/env node
/**
 * Safely promote already-edited English methodology from structured taxonomy
 * Markdown to existing Skill/Group/Domain *.data.ts files.
 *
 * Usage:
 *   node scripts/import-taxonomy-descriptions.mjs --package content/math
 *   node scripts/import-taxonomy-descriptions.mjs --package content/math --write
 *
 * Dry-run is the default. No translation, ID generation, file creation,
 * export rewrites, hierarchy changes, or frontend localization is performed.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import ts from 'typescript';

function fail(message) {
  throw new Error(message);
}
const root = path.resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
let packageName;
let write = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--package' && args[++i] && !packageName) packageName = args[i];
  else if (args[i] === '--write' && !write) write = true;
  else fail('Usage: --package content/<textbook> [--write]');
}
if (!packageName) fail('--package is required');
const packageRoot = path.resolve(root, packageName);
if (!packageRoot.startsWith(path.join(root, 'content') + path.sep)) fail('Package must be in content/');
const markdownPath = path.join(packageRoot, 'docs/skills/taxonomy.md');
if (!fs.existsSync(markdownPath)) fail('Taxonomy Markdown not found: ' + markdownPath);

const source = fs.readFileSync(markdownPath, 'utf8');
const sections = [];
let section = null;
for (const [index, line] of source.split(/\r?\n/).entries()) {
  const heading = line.match(/^(#{3,5}) (.+)$/);
  if (heading) {
    if (section) sections.push(section);
    section = { depth: heading[1].length, title: heading[2], line: index + 1, lines: [] };
  } else if (section) section.lines.push({ line, number: index + 1 });
}
if (section) sections.push(section);
if (!sections.length) fail('Taxonomy has no Domain/Group/Skill headings');

function parseSection(entry) {
  const prefix = 'Line ' + entry.line + ' (' + entry.title + '): ';
  const lines = entry.lines.filter(x => x.line.trim());
  if (lines.some(x => /^Code:/.test(x.line))) fail(prefix + 'legacy Code: links require template migration');
  const count = lines.filter(x => /^Skills:|^Groups:/.test(x.line));
  const kind =
    entry.depth === 3
      ? 'SkillDomain'
      : entry.depth === 5
        ? 'Skill'
        : count.some(x => x.line.startsWith('Skills:'))
          ? 'SkillGroup'
          : 'Skill';
  if (entry.depth === 3 && !count.some(x => x.line.startsWith('Groups:'))) {
    fail(prefix + 'Domain metadata missing');
  }

  const linkLines = lines.filter(x => /^\[[^\]]+\]\([^)]+\)$/.test(x.line));
  if (linkLines.length !== 1) fail(prefix + 'expected exactly one standalone Code link');
  const match = linkLines[0].line.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if (match[2] === '#') fail(prefix + 'not implemented — cannot import description');
  if (!/^[a-zA-Z0-9_.-]+\.data\.ts$/.test(match[1])) fail(prefix + 'bad Code link label');
  const target = path.resolve(path.dirname(markdownPath), decodeURI(match[2]));
  const srcRoot = path.join(packageRoot, 'src', 'data', 'skillsTaxonomy') + path.sep;
  if (!target.startsWith(srcRoot) || path.basename(target) !== match[1] || !fs.existsSync(target)) {
    fail(prefix + 'Code link target must be an existing taxonomy *.data.ts: ' + match[2]);
  }

  function field(label) {
    const found = lines.filter(x => x.line.startsWith(label));
    if (found.length !== 1) fail(prefix + 'expected exactly one ' + label);
    const value = found[0].line.slice(label.length).trim();
    if (!value || value.startsWith('%')) fail(prefix + 'empty or unfilled ' + label);
    return value;
  }
  const methodological = field('Methodological description: ');
  const friendly = field('User-friendly description: ');
  // This is editorial draft copy only. Publishing a single locale to frontend is forbidden.
  const accepted = new Set([
    ...count.map(x => x.number),
    linkLines[0].number,
    ...lines.filter(x => /^Methodological description: |^User-friendly description: /.test(x.line)).map(x => x.number),
  ]);
  const unexpected = lines.filter(x => !accepted.has(x.number));
  if (unexpected.length) fail(prefix + 'unexpected unlabeled content at line ' + unexpected[0].number);
  if (friendly !== '[Not authored]' && friendly.startsWith('[')) fail(prefix + 'invalid user-friendly placeholder');
  return { ...entry, kind, target, methodological, friendly };
}
const entries = sections.map(parseSection);
const destinations = new Set();
for (const entry of entries) {
  if (destinations.has(entry.target)) fail('Multiple Markdown entries reference ' + entry.target);
  destinations.add(entry.target);
}

function patch(entry) {
  const before = fs.readFileSync(entry.target, 'utf8');
  const ast = ts.createSourceFile(entry.target, before, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (ast.parseDiagnostics.length) fail('Cannot import into invalid TypeScript: ' + entry.target);
  let object = null;
  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === 'build' + entry.kind + 'Config' &&
      node.arguments.length === 1 &&
      ts.isObjectLiteralExpression(node.arguments[0])
    ) {
      if (object) fail('Multiple entity objects in ' + entry.target);
      object = node.arguments[0];
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  if (!object) fail('Missing build' + entry.kind + 'Config in ' + entry.target);
  const existing = object.properties.filter(
    p => p.name && (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) && p.name.text === 'description',
  );
  if (existing.length > 1) fail('Duplicate descriptions in ' + entry.target);
  if (existing.length === 1) {
    const prop = existing[0];
    if (!ts.isPropertyAssignment(prop) || !ts.isObjectLiteralExpression(prop.initializer)) {
      fail('Unrecognized existing description in ' + entry.target);
    }
    const desc = prop.initializer.properties.find(
      p =>
        ts.isPropertyAssignment(p) &&
        (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) &&
        p.name.text === 'methodological',
    );
    if (
      !desc ||
      !ts.isPropertyAssignment(desc) ||
      !ts.isStringLiteral(desc.initializer) ||
      desc.initializer.text !== entry.methodological
    ) {
      fail('Conflicting/partial existing methodological description: ' + entry.target);
    }
    return { ...entry, before, after: before, state: 'already-matched' };
  }
  const close = object.getEnd() - 1;
  const last = object.properties[object.properties.length - 1];
  if (!last) fail('Unexpected empty config: ' + entry.target);
  let prefix = before.slice(0, close);
  if (!object.properties.hasTrailingComma) {
    // Insert the missing comma after the last property, not after its comment.
    const off = last.getEnd();
    prefix = prefix.slice(0, off) + ',' + prefix.slice(off);
  }
  if (!prefix.endsWith('\n')) fail('Config closing brace must be on its own line: ' + entry.target);
  const suffix = before.slice(close);
  const after = prefix + '  description: { methodological: ' + JSON.stringify(entry.methodological) + ' },\n' + suffix;
  return { ...entry, before, after, state: 'would-update' };
}

// Validate the full input before writing any file. Conflict is a hard failure.
const changes = entries.map(patch);
const pending = changes.filter(x => x.state === 'would-update');
for (const item of changes) {
  const relative = path.relative(root, item.target).split(path.sep).join('/');
  process.stdout.write(item.state + ' ' + relative + '\n');
}
if (write) {
  for (const item of pending) fs.writeFileSync(item.target, item.after);
}
process.stdout.write(
  (write ? 'Updated ' : 'Would update ') +
    pending.length +
    '/' +
    changes.length +
    ' Code entities. User-friendly drafts are NOT published to description.frontend.\n',
);
