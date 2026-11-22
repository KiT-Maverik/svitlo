/**
 * Read-only Stage 3 parser. The candidate TypeScript is DATA, never imported,
 * transpiled and executed, or allowed to call helper functions. This deliberately
 * supports literal Config/production objects only; expressive modules fail closed.
 */
import { createRequire } from 'node:module';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';

const require = createRequire(new URL('../../../package.json', import.meta.url));
const ts = require('typescript');
const typeNames = {
  questions: 'QuestionBankWorkflowStage3',
  flashcards: 'FlashcardBankWorkflowStage3',
};
const exportNames = { questions: 'questionBank', flashcards: 'flashcardBank' };
const unsafeNames = new Set(['__proto__', 'prototype', 'constructor']);

function plain(expression, depth = 0) {
  if (depth > 64) throw Error('Bank source is too deeply nested');
  if (ts.isParenthesizedExpression(expression)) return plain(expression.expression, depth + 1);
  if (ts.isAsExpression(expression) &&
      (expression.type.kind === ts.SyntaxKind.ConstKeyword ||
        (ts.isTypeReferenceNode(expression.type) &&
          expression.type.typeName.getText() === 'const'))) {
    return plain(expression.expression, depth + 1);
  }
  if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) return expression.text;
  if (ts.isNumericLiteral(expression)) {
    const number = Number(expression.text.replaceAll('_', ''));
    if (!Number.isFinite(number)) throw Error('Non-finite bank number');
    return number;
  }
  if (expression.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (expression.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (expression.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isPrefixUnaryExpression(expression) &&
      (expression.operator === ts.SyntaxKind.MinusToken || expression.operator === ts.SyntaxKind.PlusToken) &&
      ts.isNumericLiteral(expression.operand)) {
    const n = plain(expression.operand, depth + 1);
    return expression.operator === ts.SyntaxKind.MinusToken ? -n : n;
  }
  if (ts.isArrayLiteralExpression(expression)) {
    if (expression.elements.some(element => ts.isSpreadElement(element) ||
      element.kind === ts.SyntaxKind.OmittedExpression)) throw Error('No spread/holes in bank arrays');
    return expression.elements.map(item => plain(item, depth + 1));
  }
  if (ts.isObjectLiteralExpression(expression)) {
    const result = Object.create(null);
    for (const prop of expression.properties) {
      if (!ts.isPropertyAssignment(prop) ||
          !(ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name) ||
            ts.isNumericLiteral(prop.name))) {
        throw Error('Bank objects permit only explicit literal key/value properties');
      }
      const key = prop.name.text;
      if (unsafeNames.has(key) || Object.hasOwn(result, key)) {
        throw Error('Duplicate or dangerous bank property: ' + key);
      }
      result[key] = plain(prop.initializer, depth + 1);
    }
    return result;
  }
  throw Error('Executable or nonliteral TypeScript is forbidden in a reviewed Bank Stage 3 source');
}

/**
 * Parses exactly one exported Stage 3 source with a type-only Engine import.
 * No candidate code runs, including when the source fails typechecking.
 */
export function readTypedBankStage3(content, bank) {
  const type = typeNames[bank];
  if (!type || typeof content !== 'string' || Buffer.byteLength(content) > 1024 * 1024) {
    throw Error('Invalid or oversized reviewed bank TypeScript');
  }
  const file = ts.createSourceFile('reviewed.ts', content, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS);
  if (file.parseDiagnostics.length) throw Error('Reviewed bank TypeScript has parse errors');
  let imported = false;
  let variable = false;
  let value;
  for (const statement of file.statements) {
    if (ts.isImportDeclaration(statement)) {
      const clause = statement.importClause;
      if (imported || !clause?.isTypeOnly || !ts.isStringLiteral(statement.moduleSpecifier) ||
          statement.moduleSpecifier.text !== '@svitlo/engine/build' ||
          clause.name || !clause.namedBindings || !ts.isNamedImports(clause.namedBindings) ||
          clause.namedBindings.elements.length !== 1 ||
          clause.namedBindings.elements[0].name.text !== type ||
          clause.namedBindings.elements[0].propertyName) {
        throw Error('Only the canonical type-only Stage 3 Engine import is permitted');
      }
      imported = true;
      continue;
    }
    if (!ts.isVariableStatement(statement) || variable ||
        !(statement.declarationList.flags & ts.NodeFlags.Const) ||
        !statement.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword) ||
        statement.declarationList.declarations.length !== 1) {
      throw Error('Reviewed bank must contain only one exported literal Stage 3 object');
    }
    const declaration = statement.declarationList.declarations[0];
    if (!ts.isIdentifier(declaration.name) || declaration.name.text !== exportNames[bank] ||
        !declaration.initializer || !ts.isSatisfiesExpression(declaration.initializer) ||
        !ts.isTypeReferenceNode(declaration.initializer.type) ||
        declaration.initializer.type.typeName.getText(file) !== type) {
      throw Error('Bank source must satisfy its exact canonical Stage 3 contract');
    }
    value = plain(declaration.initializer.expression);
    variable = true;
  }
  if (!imported || !variable) throw Error('Missing canonical bank Stage 3 export');
  // Normalize null-prototype objects into ordinary JSON data before Engine validation.
  return JSON.parse(JSON.stringify(value));
}

/** Full semantic check against the trusted, compiled @svitlo/engine/build types. */
export function typecheckTypedBankStage3(content, trustedRoot) {
  const directory = mkdtempSync(path.join(trustedRoot, '.bank-typed-stage3-'));
  try {
    const source = path.join(directory, 'index.ts');
    writeFileSync(source, content, 'utf8');
    const program = ts.createProgram([source], {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      types: [],
    });
    const errors = ts.getPreEmitDiagnostics(program).filter(d => d.category === ts.DiagnosticCategory.Error);
    if (errors.length) {
      throw Error('Reviewed Stage 3 semantic TypeScript check failed: ' +
        errors.slice(0, 5).map(d => ts.flattenDiagnosticMessageText(d.messageText, ' ')).join(' | '));
    }
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}
