/**
 * Inert parsing of trusted Course-generated machine handoffs.
 *
 * This parses only a fixed import + exported const or static re-export shape.
 * It never evals or imports generated source. Keys and quotes may be formatted
 * by the shared worker before the manifest is sealed; security decisions are
 * based on AST shape and literal values, not incidental textual representation.
 */
import ts from 'typescript';

const nameOf = node => (ts.isIdentifier(node) || ts.isStringLiteral(node) ? node.text : undefined);
const safeKey = key => typeof key === 'string' && !['__proto__', 'prototype', 'constructor'].includes(key);
function sourceFile(source, filename) {
  if (typeof source !== 'string' || source.length > 2 * 1024 * 1024)
    throw Error('Invalid or oversized Course machine handoff');
  const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (ast.parseDiagnostics.length) throw Error('Invalid generated TypeScript handoff syntax');
  return ast;
}
function literal(node) {
  while (ts.isParenthesizedExpression(node)) node = node.expression;
  if (ts.isStringLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) {
    const number = Number(node.text);
    if (!Number.isFinite(number)) throw Error('Nonfinite generated handoff literal');
    return number;
  }
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken &&
      ts.isNumericLiteral(node.operand)) return -literal(node.operand);
  if (ts.isArrayLiteralExpression(node)) {
    if (node.elements.some(ts.isSpreadElement)) throw Error('Spread in generated handoff literal');
    return node.elements.map(literal);
  }
  if (ts.isObjectLiteralExpression(node)) {
    const out = {};
    for (const prop of node.properties) {
      if (!ts.isPropertyAssignment(prop) || !safeKey(nameOf(prop.name)))
        throw Error('Nonliteral property in generated handoff');
      const key = nameOf(prop.name);
      if (Object.hasOwn(out, key)) throw Error('Duplicate generated handoff property ' + key);
      out[key] = literal(prop.initializer);
    }
    return out;
  }
  throw Error('Executable or nonliteral generated handoff expression');
}

/** Strict one type-only import and one exported const with "as const satisfies". */
export function parseGeneratedHandoff(source, { symbol, contract, filename = 'draft.ts' }) {
  if (!/^[A-Za-z][A-Za-z0-9]*$/.test(symbol) || !/^[A-Za-z][A-Za-z0-9]*$/.test(contract))
    throw Error('Invalid generated handoff contract');
  const ast = sourceFile(source, filename);
  if (ast.statements.length !== 2) throw Error('Unexpected statements in generated handoff');
  const [imported, declared] = ast.statements;
  if (
    !ts.isImportDeclaration(imported) || !imported.importClause?.isTypeOnly ||
    !ts.isStringLiteral(imported.moduleSpecifier) ||
    imported.moduleSpecifier.text !== '@svitlo/engine/build' ||
    imported.importClause.name ||
    !imported.importClause.namedBindings ||
    !ts.isNamedImports(imported.importClause.namedBindings) ||
    imported.importClause.namedBindings.elements.length !== 1 ||
    nameOf(imported.importClause.namedBindings.elements[0].name) !== contract ||
    imported.importClause.namedBindings.elements[0].propertyName
  ) throw Error('Invalid generated handoff type import');
  if (
    !ts.isVariableStatement(declared) ||
    !(ts.getCombinedModifierFlags(declared) & ts.ModifierFlags.Export) ||
    !(declared.declarationList.flags & ts.NodeFlags.Const) ||
    declared.declarationList.declarations.length !== 1
  ) throw Error('Invalid generated handoff export');
  const declaration = declared.declarationList.declarations[0];
  if (!ts.isIdentifier(declaration.name) || declaration.name.text !== symbol ||
      !declaration.initializer || !ts.isSatisfiesExpression(declaration.initializer))
    throw Error('Unexpected generated handoff identifier');
  const satisfies = declaration.initializer;
  const asConst = satisfies.expression;
  if (
    !ts.isTypeReferenceNode(satisfies.type) ||
    !ts.isIdentifier(satisfies.type.typeName) ||
    satisfies.type.typeName.text !== contract ||
    !ts.isAsExpression(asConst) ||
    !ts.isTypeReferenceNode(asConst.type) ||
    !ts.isIdentifier(asConst.type.typeName) ||
    asConst.type.typeName.text !== 'const'
  ) throw Error('Invalid generated handoff type assertion');
  return literal(asConst.expression);
}

/** Return only the exact static re-export, never execute the referred module. */
export function parseGeneratedReference(source, filename = 'index.ts') {
  const ast = sourceFile(source, filename);
  if (ast.statements.length !== 1 || !ts.isExportDeclaration(ast.statements[0]))
    throw Error('Expected one generated re-export declaration');
  const exp = ast.statements[0];
  if (!exp.moduleSpecifier || !ts.isStringLiteral(exp.moduleSpecifier) ||
      !exp.exportClause || !ts.isNamedExports(exp.exportClause) ||
      exp.exportClause.elements.length !== 1 || exp.isTypeOnly)
    throw Error('Invalid generated reference declaration');
  const spec = exp.exportClause.elements[0];
  if (spec.isTypeOnly || !ts.isIdentifier(spec.name) ||
      !ts.isIdentifier(spec.propertyName) || !exp.moduleSpecifier.text)
    throw Error('Invalid generated reference symbol');
  return { original: spec.propertyName.text, alias: spec.name.text, module: exp.moduleSpecifier.text };
}
