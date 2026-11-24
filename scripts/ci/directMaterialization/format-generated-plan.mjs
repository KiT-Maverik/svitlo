/**
 * Trusted, deterministic final formatting for authored TypeScript emitted by
 * any of the five direct source materializers (including nested Configurators).
 *
 * Called exactly once in the credential-free worker, after Engine planning and
 * before any trusted analyzer computes file hashes or seals a Git manifest.
 * Never load a formatter configuration or plugin from the candidate checkout.
 */
import { format } from 'prettier';
import ts from 'typescript';

// Mirrors the repository's checked-in .prettierrc.json. Keep these fixed in
// the trusted worker rather than resolving untrusted textbook-local configs.
const options = Object.freeze({
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
  endOfLine: 'lf',
  quoteProps: 'preserve',
  parser: 'typescript',
});

function parse(source, filename) {
  return ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    true,
    filename.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
}

function importGroup(specifier) {
  if (specifier.startsWith('@svitlo/')) return 1;
  if (specifier.startsWith('#') || specifier.startsWith('@/')) return 2;
  if (specifier.startsWith('./') || specifier.startsWith('../')) return 3;
  // node:* and external dependencies share the first group.
  return 0;
}

function compareImports(left, right) {
  if (left.group !== right.group) return left.group - right.group;
  if (left.specifier !== right.specifier) return left.specifier < right.specifier ? -1 : 1;
  return left.index - right.index;
}

/**
 * Only reorder the initial static import block. A side-effect-only import is a
 * barrier: reordering imports around it might change module execution order.
 * Comments attached to individual imports travel with those declarations;
 * module-level header comments remain at the top of the file.
 */
export function groupGeneratedImports(source, filename) {
  const ast = parse(source, filename);
  const statements = ast.statements;
  let start = 0;
  while (
    start < statements.length &&
    ts.isExpressionStatement(statements[start]) &&
    ts.isStringLiteral(statements[start].expression)
  ) {
    // Preserve directives such as 'use client' ahead of imports.
    start++;
  }
  if (start >= statements.length || !ts.isImportDeclaration(statements[start])) return source;
  let stop = start;
  while (stop < statements.length && ts.isImportDeclaration(statements[stop])) stop++;
  const imports = statements.slice(start, stop);
  if (imports.length < 2 || imports.some(item => !item.importClause)) return source;

  const firstStart = imports[0].getStart(ast);
  const lastEnd = imports[imports.length - 1].end;
  const entries = [];
  let precedingEnd = firstStart;
  for (const [index, item] of imports.entries()) {
    const itemStart = item.getStart(ast);
    let gap = source.slice(precedingEnd, itemStart);
    // An end-of-line comment belongs to the preceding import, not the next.
    if (index > 0) {
      const lineEnd = gap.indexOf('\n');
      const inline = lineEnd < 0 ? gap : gap.slice(0, lineEnd);
      if (/^\s*(?:\/\/|\/\*)/.test(inline)) {
        entries[entries.length - 1].text += inline;
        gap = gap.slice(inline.length);
      }
    }
    const leading = index > 0 && gap.trim() ? gap.trim() + '\n' : '';
    const specifier = item.moduleSpecifier;
    if (!ts.isStringLiteral(specifier)) return source;
    entries.push({
      index,
      group: importGroup(specifier.text),
      specifier: specifier.text,
      text: leading + source.slice(itemStart, item.end),
    });
    precedingEnd = item.end;
  }
  const sorted = entries.sort(compareImports);
  const groups = [];
  for (const entry of sorted) {
    const previous = groups[groups.length - 1];
    if (!previous || previous.group !== entry.group) groups.push({ group: entry.group, entries: [entry.text] });
    else previous.entries.push(entry.text);
  }
  const importsText = groups.map(group => group.entries.join('\n')).join('\n\n');
  const suffix = source.slice(lastEnd);
  return source.slice(0, firstStart) + importsText + (suffix.trim() ? '\n\n' + suffix.trimStart() : '\n');
}

/**
 * Unquote only actual object-literal property names that are valid ECMAScript
 * IdentifierNames. Numeric, UUID, spaced and hyphenated keys stay quoted.
 * String values, computed properties, import specifiers and other literals
 * are never passed through a string-replacement heuristic.
 */
export function unquoteGeneratedObjectKeys(source, filename) {
  const ast = parse(source, filename);
  const edits = [];
  function visit(node) {
    if (
      ts.isPropertyAssignment(node) &&
      ts.isStringLiteral(node.name) &&
      ts.isIdentifierText(node.name.text, ts.ScriptTarget.Latest)
    ) {
      edits.push({
        from: node.name.getStart(ast),
        to: node.name.end,
        replacement: node.name.text,
      });
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  for (const edit of edits.reverse()) {
    source = source.slice(0, edit.from) + edit.replacement + source.slice(edit.to);
  }
  return source;
}

export async function formatGeneratedTypeScript(source, filename) {
  if (typeof source !== 'string' || typeof filename !== 'string') throw Error('Invalid emitted TypeScript');
  const grouped = groupGeneratedImports(source, filename);
  const unquoted = unquoteGeneratedObjectKeys(grouped, filename);
  return format(unquoted, { ...options, filepath: filename });
}

/** Return a new plan. Never mutate source evidence, diagnostics or raw assets. */
export async function formatGeneratedPlan(plan) {
  if (!plan || typeof plan !== 'object' || !Array.isArray(plan.files)) {
    throw Error('Materializer did not return a file plan');
  }
  const files = [];
  for (const file of plan.files) {
    if (file?.kind === 'typescript' && typeof file.path === 'string' && /\.(?:[cm]?ts|tsx)$/.test(file.path)) {
      files.push({ ...file, content: await formatGeneratedTypeScript(file.content, file.path) });
    } else {
      files.push(file);
    }
  }
  return { ...plan, files };
}
