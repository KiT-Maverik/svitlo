#!/usr/bin/env node
/**
 * Migrate shared workspace package subpath imports to public root entrypoints.
 * Usage: node scripts/migrate-shared-imports.mjs --write|--check
 *
 * Only @svitlo/contracts retains public subpath exports.
 * Package CLIs (for example svitlo-sync-flags) must be invoked as commands,
 * not imported through package subpaths.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const packageRoots = [
  '@svitlo/engine',
  '@svitlo/ui-kit',
  '@svitlo/indexdb',
  '@svitlo/adapter-nextjs',
  '@svitlo/adapter-electron',
];

export function canonicalSharedSpecifier(value) {
  return packageRoots.find(root => value === root || value.startsWith(root + '/')) ?? value;
}

function scriptKind(filename) {
  if (filename.endsWith('.tsx')) return ts.ScriptKind.TSX;
  if (/\.[cm]?jsx?$/.test(filename)) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

function editsApplied(source, edits) {
  const ordered = [...edits].sort((a, b) => b.start - a.start);
  for (let index = 1; index < ordered.length; index++) {
    if (ordered[index].end > ordered[index - 1].start) {
      throw new Error('Overlapping import edits');
    }
  }
  let updated = source;
  for (const edit of ordered) {
    updated = updated.slice(0, edit.start) + edit.text + updated.slice(edit.end);
  }
  return updated;
}

function rewriteSpecifiers(source, filename) {
  const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, scriptKind(filename));
  const edits = [];
  const visit = node => {
    if (ts.isStringLiteral(node)) {
      const parent = node.parent;
      const direct = (ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent)) &&
        parent.moduleSpecifier === node;
      const call = ts.isCallExpression(parent) && parent.arguments[0] === node &&
        (parent.expression.kind === ts.SyntaxKind.ImportKeyword ||
          (ts.isIdentifier(parent.expression) && parent.expression.text === 'require'));
      const importType = ts.isLiteralTypeNode(parent) && ts.isImportTypeNode(parent.parent);
      if (direct || call || importType) {
        const canonical = canonicalSharedSpecifier(node.text);
        if (canonical !== node.text) {
          edits.push({ start: node.getStart(ast) + 1, end: node.getEnd() - 1, text: canonical });
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(ast);
  return editsApplied(source, edits);
}

function combineNamedImports(source, filename) {
  const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, scriptKind(filename));
  const groups = new Map();
  const diagnostics = [];
  for (const node of ast.statements) {
    if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier)) continue;
    const name = node.moduleSpecifier.text;
    if (!packageRoots.includes(name)) continue;
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push(node);
  }
  const edits = [];
  for (const [name, nodes] of groups) {
    const named = nodes.filter(node =>
      node.importClause && !node.importClause.name &&
      node.importClause.namedBindings && ts.isNamedImports(node.importClause.namedBindings)
    );
    if (!named.length) continue;
    const seen = new Map();
    const specifiers = [];
    let conflicting = false;
    for (const node of named) {
      const clause = node.importClause;
      if (node.attributes || node.assertClause) {
        diagnostics.push(filename + ': import attributes require manual review: ' + name);
        conflicting = true;
        break;
      }
      for (const spec of clause.namedBindings.elements) {
        const imported = spec.propertyName?.text ?? spec.name.text;
        const local = spec.name.text;
        const typeOnly = clause.isTypeOnly || spec.isTypeOnly;
        const existing = seen.get(local);
        if (existing && existing.imported !== imported) {
          diagnostics.push(filename + ': conflicting imported names for ' + local + ' from ' + name);
          conflicting = true;
          break;
        }
        if (existing) {
          if (!typeOnly) existing.typeOnly = false;
        } else {
          const entry = { imported, local, typeOnly };
          specifiers.push(entry);
          seen.set(local, entry);
        }
      }
      if (conflicting) break;
    }
    if (conflicting) continue;
    const allTypes = specifiers.every(item => item.typeOnly);
    const members = specifiers.map(item =>
      (item.typeOnly && !allTypes ? 'type ' : '') + item.imported +
      (item.local !== item.imported ? ' as ' + item.local : '')
    );
    const replacement = 'import ' + (allTypes ? 'type ' : '') +
      '{ ' + members.join(', ') + " } from '" + name + "';";
    const first = named[0];
    const sourceFirst = source.slice(first.getStart(ast), first.getEnd());
    if (sourceFirst !== replacement) {
      edits.push({ start: first.getStart(ast), end: first.getEnd(), text: replacement });
    }
    for (const node of nodes) {
      if (node === first) continue;
      const isNamed = named.includes(node);
      const isSideEffectOnly = !node.importClause;
      if (isNamed || isSideEffectOnly) {
        edits.push({ start: node.getStart(ast), end: node.getEnd(), text: '' });
      }
    }
  }
  return { code: editsApplied(source, edits), diagnostics };
}

export function migrateSharedImports(source, filename = 'source.ts') {
  const rewritten = rewriteSpecifiers(source, filename);
  const combined = combineNamedImports(rewritten, filename);
  return { ...combined, changed: combined.code !== source };
}

async function main() {
  const write = process.argv.includes('--write');
  if (!write && !process.argv.includes('--check')) {
    throw new Error('Choose --write or --check');
  }
  const files = execFileSync('git', ['ls-files', '-z'], {
    cwd: repositoryRoot,
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  }).split('\0').filter(file => /\.[cm]?[jt]sx?$/.test(file));
  let modified = 0;
  let failed = 0;
  const prettier = write ? await import('prettier') : null;
  for (const file of files) {
    const full = resolve(repositoryRoot, file);
    const original = readFileSync(full, 'utf8');
    const result = migrateSharedImports(original, file);
    for (const diagnostic of result.diagnostics) {
      console.error(diagnostic);
      failed++;
    }
    if (!result.changed) continue;
    modified++;
    console.log((write ? 'Migrating: ' : 'Needs migration: ') + file);
    if (write && !result.diagnostics.length) {
      const options = (await prettier.resolveConfig(full)) ?? {};
      const formatted = await prettier.format(result.code, { ...options, filepath: full });
      writeFileSync(full, formatted);
    }
  }
  console.log('Shared import files requiring changes: ' + modified + '; diagnostics: ' + failed);
  if (failed || (!write && modified)) process.exitCode = 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
