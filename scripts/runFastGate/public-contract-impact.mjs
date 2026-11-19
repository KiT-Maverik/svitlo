/**
 * @fileoverview Detect edits to the exported TypeScript surface of real
 * workspace packages. Public entrypoints are resolved from package exports;
 * transitively re-exported modules are followed, but unrelated private
 * implementation files and scripts are not considered API changes.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const suffixes = ['', '.ts', '.tsx', '.mts', '/index.ts', '/index.tsx', '/index.mts'];

function resolveModule(from, target, root) {
  if (!target.startsWith('.')) return null;
  let candidate = path.resolve(path.dirname(from), target);
  candidate = candidate.replace(/\.(?:js|mjs|jsx)$/, '');
  for (const suffix of suffixes) {
    const file = candidate + suffix;
    if (file.startsWith(root + path.sep) && fs.existsSync(file) && fs.statSync(file).isFile()) {
      return file;
    }
  }
  return null;
}

function exportLocations(value) {
  if (typeof value === 'string') return [value];
  if (!value || typeof value !== 'object') return [];
  return Object.values(value).flatMap(exportLocations);
}

export function publicModules(pkg, root = repoRoot) {
  const packageRoot = path.join(root, pkg.path);
  const entrypoints = new Set();
  for (const location of exportLocations(pkg.exports)) {
    const relative = location.replace(/^\.\//, '');
    if (!relative.startsWith('dist/')) continue;
    const source = relative
      .slice('dist/'.length)
      .replace(/\.d\.(?:ts|mts)$/, '')
      .replace(/\.(?:js|mjs)$/, '');
    for (const name of [source + '.ts', source + '.tsx', source + '.mts']) {
      const file = path.join(packageRoot, name);
      if (fs.existsSync(file)) entrypoints.add(file);
    }
  }
  // A few content packages use generated dist/textbook/index from textbook.ts.
  if (!entrypoints.size && pkg.exports) {
    for (const name of ['index.ts', 'src/index.ts', 'textbook.ts']) {
      const file = path.join(packageRoot, name);
      if (fs.existsSync(file)) entrypoints.add(file);
    }
  }
  const visited = new Set();
  const stack = [...entrypoints];
  while (stack.length) {
    const file = stack.pop();
    if (visited.has(file)) continue;
    visited.add(file);
    const source = fs.readFileSync(file, 'utf8');
    const parsed = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    const publishedShape = surface(source, file);
    for (const statement of parsed.statements) {
      if (
        ts.isExportDeclaration(statement) &&
        statement.moduleSpecifier &&
        ts.isStringLiteral(statement.moduleSpecifier)
      ) {
        const next = resolveModule(file, statement.moduleSpecifier.text, packageRoot);
        if (next && !visited.has(next)) stack.push(next);
      }
      if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
      // A non-exported imported type/schema may still appear in a published
      // declaration. Follow only imports referenced by the exported shape,
      // not unrelated dependencies used in private function bodies.
      const clause = statement.importClause;
      if (!clause) continue;
      const bindings = [];
      if (clause.name) bindings.push(clause.name.text);
      if (clause.namedBindings) {
        if (ts.isNamespaceImport(clause.namedBindings)) bindings.push(clause.namedBindings.name.text);
        else bindings.push(...clause.namedBindings.elements.map(element => element.name.text));
      }
      if (bindings.some(name => new RegExp('\\b' + name + '\\b').test(publishedShape))) {
        const next = resolveModule(file, statement.moduleSpecifier.text, packageRoot);
        if (next && !visited.has(next)) stack.push(next);
      }
    }
  }
  return new Set([...visited].map(file => path.relative(root, file).split(path.sep).join('/')));
}

function surface(source, file) {
  if (source === null) return '';
  const node = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const parts = [];
  for (const statement of node.statements) {
    const exported =
      ts.isExportDeclaration(statement) ||
      ts.isExportAssignment(statement) ||
      (ts.getCombinedModifierFlags(statement) & ts.ModifierFlags.Export) !== 0;
    // Local types can flow into the exported shape through type references.
    if (!exported && !ts.isInterfaceDeclaration(statement) && !ts.isTypeAliasDeclaration(statement)) continue;
    if (ts.isFunctionDeclaration(statement) && statement.body && statement.type) {
      parts.push(source.slice(statement.getStart(node), statement.body.getStart(node)));
    } else if (ts.isClassDeclaration(statement)) {
      const header = source.slice(statement.getStart(node), statement.members.pos);
      const members = statement.members.map(member =>
        member.body && member.type
          ? source.slice(member.getStart(node), member.body.getStart(node))
          : member.getText(node),
      );
      parts.push(header + members.join(';'));
    } else {
      parts.push(statement.getText(node));
    }
  }
  return parts.map(part => part.replace(/\s+/g, ' ').trim()).join('\n');
}

export function publicSignature(source, filename = 'index.ts') {
  return surface(source, filename);
}

function readRevision(sha, filename, root) {
  try {
    return execFileSync('git', ['show', sha + ':' + filename], {
      cwd: root,
      stdio: ['ignore', 'pipe', 'ignore'],
    }).toString('utf8');
  } catch {
    return null;
  }
}

export function changedPublicContracts(changed, workspaces, base, head, root = repoRoot) {
  const sharedChanges = changed.filter(
    file => /^(?:shared\/|content\/|apps\/)/.test(file) && /\.(?:ts|tsx|mts)$/.test(file),
  );
  if (!sharedChanges.length) return [];
  const mergeBase = execFileSync('git', ['merge-base', base, head], { cwd: root, encoding: 'utf8' }).trim();
  const byPath = new Map();
  for (const pkg of workspaces) {
    if (!sharedChanges.some(file => file.startsWith(pkg.path + '/'))) continue;
    for (const file of publicModules(pkg, root)) byPath.set(file, pkg.name);
  }
  return sharedChanges.filter(
    file =>
      byPath.has(file) &&
      surface(readRevision(mergeBase, file, root), file) !== surface(readRevision(head, file, root), file),
  );
}
