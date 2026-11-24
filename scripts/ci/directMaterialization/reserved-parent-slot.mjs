/** Trusted, byte-preserving replacement of one generated Course child stub.
 *
 * Reuse the TypeScript parser already required by the Episode analyzer; never
 * interpret TODO comments, evaluate parent code, or reconstruct a parent.
 * The publisher applies the same deterministic edit to its pinned parent blob.
 */
import ts from 'typescript';

const UUID = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i;
const safe = value =>
  typeof value === 'string' &&
  /^[A-Za-z][A-Za-z0-9]*$/.test(value) &&
  !['constructor', '__proto__', 'prototype'].includes(value);
const identifier = value => typeof value === 'string' && /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(value);
const name = node =>
  ts.isIdentifier(node) || ts.isStringLiteral(node) ? node.text : undefined;
const unwrap = node => {
  while (node && (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node)))
    node = node.expression;
  return node;
};

function singleProperty(object, key) {
  const found = object.properties.filter(property => ts.isPropertyAssignment(property) && name(property.name) === key);
  if (found.length !== 1) throw Error('Expected exactly one parent ' + key + ' property');
  return found[0];
}

/** The pinned parent supplies position and ownership; no authored orderPath is accepted. */
export function replaceReservedParentSlot(source, { kind, id, slug, placement, exportName }) {
  if (
    typeof source !== 'string' ||
    source.length > 4 * 1024 * 1024 ||
    !['episode', 'assessment'].includes(kind) ||
    !UUID.test(id ?? '') ||
    !safe(slug) ||
    !identifier(exportName) ||
    typeof placement !== 'string' ||
    placement.split('/').at(-1) !== slug
  )
    throw Error('Invalid reserved child identity');
  const parts = placement.split('/');
  const root = parts.length === 2;
  if (
    parts[0] !== 'content' ||
    (kind === 'episode' && (parts.length < 2 || parts.length > 4)) ||
    (kind === 'assessment' && ![2, 4, 5].includes(parts.length)) ||
    parts.some(part => !safe(part)) ||
    (kind === 'assessment' && parts.at(-2) !== 'content')
  )
    throw Error('Invalid reserved Course child ownership path');
  const ast = ts.createSourceFile('parent.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (ast.parseDiagnostics.length) throw Error('Invalid generated parent TypeScript');
  const declarations = ast.statements
    .filter(ts.isVariableStatement)
    .flatMap(statement => [...statement.declarationList.declarations])
    .filter(declaration => ts.isIdentifier(declaration.name) && declaration.name.text === 'content');
  if (declarations.length !== 1 || !ts.isObjectLiteralExpression(unwrap(declarations[0].initializer)))
    throw Error('Expected one generated parent content collection');
  const collection = unwrap(declarations[0].initializer);
  if (
    collection.properties.length !== 2 ||
    !ts.isObjectLiteralExpression(unwrap(singleProperty(collection, 'items').initializer)) ||
    !ts.isArrayLiteralExpression(unwrap(singleProperty(collection, 'order').initializer))
  )
    throw Error('Unsupported parent content shape');
  const items = unwrap(singleProperty(collection, 'items').initializer);
  const order = unwrap(singleProperty(collection, 'order').initializer);
  const entries = items.properties.map(property => {
    if (!ts.isPropertyAssignment(property) || !safe(name(property.name)))
      throw Error('Parent items must be a literal keyed collection');
    return { key: name(property.name), value: unwrap(property.initializer) };
  });
  const keys = entries.map(entry => entry.key);
  const ordered = order.elements.map(element => {
    const value = unwrap(element);
    if (!ts.isStringLiteral(value) || !safe(value.text)) throw Error('Parent content.order must contain literal keys');
    return value.text;
  });
  if (
    keys.length !== ordered.length ||
    new Set(keys).size !== keys.length ||
    new Set(ordered).size !== ordered.length ||
    keys.some(key => !ordered.includes(key))
  )
    throw Error('Parent content.items/order is incomplete or ambiguous');
  const orderIndex = ordered.indexOf(slug);
  const matching = entries.filter(entry => entry.key === slug);
  if (orderIndex < 0 || matching.length !== 1)
    throw Error('Reserved child stub missing from actual parent order/items');
  // This is the actual node in the pinned immediate parent, not a repeated
  // author-supplied order array, path-only guess or TODO handoff annotation.
  const slot = matching[0].value;
  const api = kind === 'episode' ? 'defineEpisodeStub' : 'defineAssessmentStub';
  const imports = ast.statements
    .filter(ts.isImportDeclaration)
    .filter(statement => ts.isStringLiteral(statement.moduleSpecifier) &&
      statement.moduleSpecifier.text === '@svitlo/engine/build');
  const imported = imports.flatMap(statement => {
    const clause = statement.importClause;
    if (!clause || clause.isTypeOnly || !clause.namedBindings || !ts.isNamedImports(clause.namedBindings))
      return [];
    return clause.namedBindings.elements
      .filter(specifier => !specifier.isTypeOnly && (specifier.propertyName?.text ?? specifier.name.text) === api)
      .map(specifier => ({ statement, specifier, binding: specifier.name.text }));
  });
  if (imported.length !== 1 ||
      !ts.isCallExpression(slot) ||
      !ts.isIdentifier(slot.expression) ||
      slot.expression.text !== imported[0].binding ||
      slot.arguments.length !== 1 ||
      !ts.isObjectLiteralExpression(unwrap(slot.arguments[0])))
    throw Error('Parent slot must be an imported draft-only ' + api + ' call');
  const props = unwrap(slot.arguments[0]);
  if (
    props.properties.length !== 2 ||
    props.properties.some(property => !ts.isPropertyAssignment(property)) ||
    !ts.isStringLiteral(unwrap(singleProperty(props, 'id').initializer)) ||
    !ts.isStringLiteral(unwrap(singleProperty(props, 'slug').initializer)) ||
    unwrap(singleProperty(props, 'id').initializer).text !== id ||
    unwrap(singleProperty(props, 'slug').initializer).text !== slug
  )
    throw Error('Reserved parent stub UUID/slug differs from the Course allocation');
  const parents = ast.statements.filter(ts.isVariableStatement).flatMap(statement =>
    [...statement.declarationList.declarations].filter(declaration => {
      const init = unwrap(declaration.initializer);
      if (!ts.isCallExpression(init) || !ts.isIdentifier(init.expression) ||
          !['defineCourse', 'defineModule', 'defineChapter'].includes(init.expression.text) ||
          init.arguments.length !== 1 || !ts.isObjectLiteralExpression(unwrap(init.arguments[0]))) return false;
      const argument = unwrap(init.arguments[0]);
      return argument.properties.some(property =>
        ts.isShorthandPropertyAssignment(property) && name(property.name) === 'content');
    }),
  );
  if (parents.length !== 1) throw Error('Parent must pass its exact content collection to one Configurator');
  const alias = 'child_' + slug;
  if (new RegExp('\\b' + alias + '\\b').test(source))
    throw Error('Child import alias is already in the parent source');
  const target = kind === 'episode' && !root ? './' + slug : './content/' + slug;
  if (ast.statements.some(statement =>
    ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier) &&
    [target, target + '/index'].includes(statement.moduleSpecifier.text)))
    throw Error('Completed child import already exists');
  const edits = [{ start: slot.getStart(ast), end: slot.end, value: alias }];
  // Remove an unused stub import after the final child of this kind is
  // restored. Do not remove imports still needed by pending sibling stubs.
  const { statement, specifier, binding } = imported[0];
  let references = 0;
  const visit = node => {
    if (ts.isIdentifier(node) && node.text === binding &&
        node !== specifier.name && node !== slot.expression) references++;
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(ast, visit);
  if (references === 0) {
    const clause = statement.importClause;
    const other = clause.namedBindings.elements.filter(value => value !== specifier);
    if (other.length === 0 && !clause.name) {
      const end = source[statement.end] === '\n' ? statement.end + 1 : statement.end;
      edits.push({ start: statement.getStart(ast), end, value: '' });
    } else if (!clause.name) {
      edits.push({
        start: statement.getStart(ast),
        end: statement.end,
        value: 'import { ' + other.map(value => value.getText(ast)).join(', ') +
          ' } from ' + JSON.stringify('@svitlo/engine/build') + ';',
      });
    }
  }
  let updated = source;
  for (const edit of edits.sort((a, b) => b.start - a.start))
    updated = updated.slice(0, edit.start) + edit.value + updated.slice(edit.end);
  const childImport = 'import { ' + exportName + ' as ' + alias +
    ' } from ' + JSON.stringify(target) + ';\n';
  return { content: childImport + updated, orderIndex, order: ordered };
}

export function verifyReservedParentSlot(source, candidate, allocation) {
  if (replaceReservedParentSlot(source, allocation).content !== candidate)
    throw Error('Parent patch is not the exact authorized one-slot restoration');
  return true;
}

/** Decode only a pinned Course-generated typed *data literal*, using the same
 * existing TypeScript parser as the parent source check. This never interprets
 * author-written Stage 1/2 TypeScript, comments or executable expressions.
 * Unlike JSON.parse of a TS substring, it survives ordinary Prettier.
 */
export function readGeneratedCourseHandoff(source, { variable, contract }) {
  if (typeof source !== 'string' || source.length > 2 * 1024 * 1024 ||
      !identifier(variable) || !identifier(contract))
    throw Error('Invalid Course-generated handoff source');
  const ast = ts.createSourceFile('handoff.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (ast.parseDiagnostics.length || ast.statements.length !== 2)
    throw Error('Course handoff must contain only its typed import and data export');
  const [imported, exported] = ast.statements;
  if (!ts.isImportDeclaration(imported) || !ts.isStringLiteral(imported.moduleSpecifier) ||
      imported.moduleSpecifier.text !== '@svitlo/engine/build' ||
      !imported.importClause?.namedBindings ||
      !ts.isNamedImports(imported.importClause.namedBindings) ||
      imported.importClause.namedBindings.elements.length !== 1 ||
      imported.importClause.namedBindings.elements[0].name.text !== contract ||
      (!imported.importClause.isTypeOnly && !imported.importClause.namedBindings.elements[0].isTypeOnly))
    throw Error('Course handoff has an unexpected authoring contract import');
  if (
    !ts.isVariableStatement(exported) ||
    !(ts.getCombinedModifierFlags(exported) & ts.ModifierFlags.Export) ||
    !(exported.declarationList.flags & ts.NodeFlags.Const) ||
    exported.declarationList.declarations.length !== 1 ||
    name(exported.declarationList.declarations[0].name) !== variable
  ) throw Error('Course handoff must export its one canonical immutable data object');
  let initializer = exported.declarationList.declarations[0].initializer;
  while (initializer && ts.isParenthesizedExpression(initializer)) initializer = initializer.expression;
  if (!initializer || !ts.isSatisfiesExpression(initializer) ||
      !ts.isTypeReferenceNode(initializer.type) || name(initializer.type.typeName) !== contract)
    throw Error('Course handoff must satisfy the exact typed seed contract');
  const literal = unwrap(initializer.expression);
  if (!ts.isObjectLiteralExpression(literal))
    throw Error('Course handoff must be a literal data object');
  const decode = node => {
    node = unwrap(node);
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isNumericLiteral(node)) {
      const value = Number(node.text);
      if (!Number.isSafeInteger(value) || value < 0) throw Error('Unsafe handoff numeric value');
      return value;
    }
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (node.kind === ts.SyntaxKind.NullKeyword) return null;
    if (ts.isArrayLiteralExpression(node)) return node.elements.map(decode);
    if (ts.isObjectLiteralExpression(node)) {
      const entries = node.properties.map(property => {
        if (!ts.isPropertyAssignment(property)) throw Error('Handoff may contain data properties only');
        const key = name(property.name);
        if (!key || ['__proto__', 'prototype', 'constructor'].includes(key))
          throw Error('Unsafe Course handoff property');
        return [key, decode(property.initializer)];
      });
      if (new Set(entries.map(([key]) => key)).size !== entries.length)
        throw Error('Duplicate Course handoff object property');
      return Object.fromEntries(entries);
    }
    throw Error('Course handoff must not contain executable TypeScript');
  };
  return decode(literal);
}
