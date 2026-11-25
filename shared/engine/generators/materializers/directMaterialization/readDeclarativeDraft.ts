import * as ts from 'typescript';
import type { z } from 'zod';

import {
  assessmentWorkflowStage2_Schema,
  type AssessmentWorkflowStage2,
} from '../../../types/workflow/assessmentWorkflow.types';
import {
  flashcardBankWorkflowStage3_Schema,
  questionBankWorkflowStage3_Schema,
} from '../../../types/workflow/bankWorkflowFinal.schemas';
import type { CourseWorkflowStage3 } from '../../../types/workflow/courseWorkflow.types';
import { courseWorkflowStage3_Schema } from '../../../types/workflow/courseWorkflowFinal.schemas';
import {
  episodeWorkflowStage2_Schema,
  type EpisodeWorkflowStage2,
} from '../../../types/workflow/episodeWorkflow.types';
import type { FlashcardBankWorkflowStage3 } from '../../../types/workflow/flashcardBankWorkflow.types';
import { lessonWorkflowStage2_Schema, type LessonWorkflowStage2 } from '../../../types/workflow/lessonWorkflow.types';
import type { QuestionBankWorkflowStage3 } from '../../../types/workflow/questionBankWorkflow.types';

/**
 * A parse-only boundary for untrusted, pinned authoring bytes. No source file,
 * dependency or Configurator is imported, compiled, resolved or executed here.
 * The trusted caller owns source path, blob/commit hashes and authorization.
 */
type FinalStageValues = {
  course: CourseWorkflowStage3;
  lesson: LessonWorkflowStage2;
  episode: EpisodeWorkflowStage2;
  questions: QuestionBankWorkflowStage3;
  flashcards: FlashcardBankWorkflowStage3;
  assessment: AssessmentWorkflowStage2;
};
type StageNames = {
  course: 'CourseWorkflowStage3';
  lesson: 'LessonWorkflowStage2';
  episode: 'EpisodeWorkflowStage2';
  questions: 'QuestionBankWorkflowStage3';
  flashcards: 'FlashcardBankWorkflowStage3';
  assessment: 'AssessmentWorkflowStage2';
};
export type DeclarativeDraftEntityKind = keyof FinalStageValues;
export type DeclarativeDraftValue<K extends DeclarativeDraftEntityKind> = FinalStageValues[K];

/** Explicit annotations keep emitted declarations finite even for large Stage schemas. */
const finalStages: {
  [K in DeclarativeDraftEntityKind]: { name: StageNames[K]; schema: z.ZodType<FinalStageValues[K]> };
} = {
  course: { name: 'CourseWorkflowStage3', schema: courseWorkflowStage3_Schema },
  lesson: { name: 'LessonWorkflowStage2', schema: lessonWorkflowStage2_Schema },
  episode: { name: 'EpisodeWorkflowStage2', schema: episodeWorkflowStage2_Schema },
  questions: { name: 'QuestionBankWorkflowStage3', schema: questionBankWorkflowStage3_Schema },
  flashcards: { name: 'FlashcardBankWorkflowStage3', schema: flashcardBankWorkflowStage3_Schema },
  assessment: { name: 'AssessmentWorkflowStage2', schema: assessmentWorkflowStage2_Schema },
};
type DraftValue = null | boolean | number | string | DraftValue[] | { [key: string]: DraftValue };
type ParseContext = {
  source: ts.SourceFile;
  visited: number;
  positions: Map<string, number>;
};

const MAX_SOURCE_LENGTH = 4 * 1024 * 1024;
const MAX_DEPTH = 96;
const MAX_NODES = 100_000;
const dangerousKeys = new Set([
  '__proto__',
  'prototype',
  'constructor',
  '__defineGetter__',
  '__defineSetter__',
  '__lookupGetter__',
  '__lookupSetter__',
]);

export class DeclarativeDraftError extends Error {
  constructor(
    readonly code: 'syntax' | 'structure' | 'literal' | 'schema' | 'limit',
    readonly line: number,
    readonly column: number,
    message: string,
  ) {
    super('Declarative draft ' + code + ' at ' + line + ':' + column + ': ' + message);
    this.name = 'DeclarativeDraftError';
  }
}

function fail(
  context: ParseContext,
  node: ts.Node | number,
  code: DeclarativeDraftError['code'],
  message: string,
): never {
  const offset = typeof node === 'number' ? node : node.getStart(context.source);
  const { line, character } = context.source.getLineAndCharacterOfPosition(offset);
  throw new DeclarativeDraftError(code, line + 1, character + 1, message);
}

function withoutTypeWrappers(context: ParseContext, node: ts.Expression): ts.Expression {
  let current = node;
  let count = 0;
  while (
    ts.isParenthesizedExpression(current) ||
    ts.isAsExpression(current) ||
    ts.isSatisfiesExpression(current) ||
    ts.isTypeAssertionExpression(current)
  ) {
    if (++count > MAX_DEPTH) fail(context, current, 'limit', 'Too many parentheses or type assertions');
    current = current.expression;
  }
  return current;
}

function decode(
  context: ParseContext,
  expression: ts.Expression,
  path: readonly (string | number)[],
  depth: number,
): DraftValue {
  context.visited += 1;
  if (context.visited > MAX_NODES || depth > MAX_DEPTH) {
    fail(context, expression, 'limit', 'Draft exceeds the maximum node count or nesting depth');
  }

  const node = withoutTypeWrappers(context, expression);
  context.positions.set(JSON.stringify(path), node.getStart(context.source));

  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) {
    const value = Number(node.text.replaceAll('_', ''));
    if (!Number.isFinite(value)) fail(context, node, 'literal', 'Only finite numbers are allowed');
    return value;
  }
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;

  if (
    ts.isPrefixUnaryExpression(node) &&
    node.operator === ts.SyntaxKind.MinusToken &&
    ts.isNumericLiteral(node.operand)
  ) {
    const value = -Number(node.operand.text.replaceAll('_', ''));
    if (!Number.isFinite(value)) fail(context, node, 'literal', 'Only finite numbers are allowed');
    return value;
  }

  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((item, index) => {
      if (ts.isSpreadElement(item) || ts.isOmittedExpression(item)) {
        fail(context, item, 'literal', 'Spreads and array holes are forbidden');
      }
      return decode(context, item, [...path, index], depth + 1);
    });
  }

  if (ts.isObjectLiteralExpression(node)) {
    const result: { [key: string]: DraftValue } = Object.create(null);
    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) {
        fail(context, property, 'literal', 'Only explicit object property assignments are allowed');
      }
      const name = property.name;
      if (!ts.isIdentifier(name) && !ts.isStringLiteral(name) && !ts.isNumericLiteral(name)) {
        fail(context, name, 'literal', 'Computed and nonliteral property keys are forbidden');
      }
      const key = name.text;
      if (dangerousKeys.has(key)) fail(context, name, 'literal', 'Prototype-sensitive property key is forbidden');
      if (Object.hasOwn(result, key)) fail(context, name, 'literal', 'Duplicate property key: ' + key);
      result[key] = decode(context, property.initializer, [...path, key], depth + 1);
    }
    return result;
  }

  fail(context, node, 'literal', 'Executable or unsupported expression: ' + ts.SyntaxKind[node.kind]);
}

function isTypeOnlyImport(statement: ts.ImportDeclaration): boolean {
  // With verbatimModuleSyntax, `import { type X }` emits `import {} from ...`.
  // Such an import can run a dependency's top-level code. Require `import type`.
  return statement.importClause?.isTypeOnly === true && !statement.attributes;
}

/**
 * AST decoding without domain schema validation, exported for focused security
 * tests. Callers performing materialization MUST use readDeclarativeDraft.
 *
 * Only a final-stage satisfies expression may be exported, either directly or
 * through one immutable local const. Type positions are never interpreted.
 */
function parseWithPositions(
  sourceText: string,
  expectedEntityKind: DeclarativeDraftEntityKind,
): { value: DraftValue; source: ts.SourceFile; positions: Map<string, number> } {
  if (typeof sourceText !== 'string' || sourceText.length > MAX_SOURCE_LENGTH) {
    throw new DeclarativeDraftError('limit', 1, 1, 'Source must be a string of at most 4 MiB');
  }
  if (!Object.hasOwn(finalStages, expectedEntityKind)) {
    throw new DeclarativeDraftError('structure', 1, 1, 'Unsupported draft entity kind');
  }
  const contract = finalStages[expectedEntityKind];
  let source: ts.SourceFile;
  try {
    source = ts.createSourceFile('draft.ts', sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  } catch {
    throw new DeclarativeDraftError('syntax', 1, 1, 'Unable to parse TypeScript source');
  }
  const context: ParseContext = { source, visited: 0, positions: new Map() };
  const diagnostics =
    (source as ts.SourceFile & { parseDiagnostics?: readonly ts.Diagnostic[] }).parseDiagnostics ?? [];
  if (diagnostics.length > 0) {
    const first = diagnostics[0];
    fail(context, first.start ?? 0, 'syntax', ts.flattenDiagnosticMessageText(first.messageText, '\n'));
  }

  let declaration: ts.VariableDeclaration | undefined;
  let assignment: ts.ExportAssignment | undefined;
  for (const statement of source.statements) {
    if (ts.isImportDeclaration(statement) && isTypeOnlyImport(statement)) continue;
    if (
      ts.isVariableStatement(statement) &&
      !declaration &&
      statement.declarationList.flags & ts.NodeFlags.Const &&
      statement.modifiers === undefined &&
      statement.declarationList.declarations.length === 1
    ) {
      const candidate = statement.declarationList.declarations[0];
      if (ts.isIdentifier(candidate.name) && candidate.name.text === 'draft' && candidate.initializer) {
        declaration = candidate;
        continue;
      }
    }
    if (ts.isExportAssignment(statement) && !statement.isExportEquals && !assignment) {
      assignment = statement;
      continue;
    }
    fail(context, statement, 'structure', 'Only type-only imports, one const draft and one default export are allowed');
  }
  if (!assignment) fail(context, source.endOfFileToken, 'structure', 'Exactly one default export is required');

  let root: ts.Expression;
  const exported = withoutParentheses(context, assignment.expression);
  if (declaration) {
    if (!ts.isIdentifier(exported) || exported.text !== 'draft') {
      fail(context, assignment, 'structure', 'Default export must reference the sole const draft');
    }
    root = declaration.initializer!;
  } else {
    root = exported;
  }

  const typedRoot = withoutParentheses(context, root);
  if (
    !ts.isSatisfiesExpression(typedRoot) ||
    !ts.isTypeReferenceNode(typedRoot.type) ||
    !ts.isIdentifier(typedRoot.type.typeName) ||
    typedRoot.type.typeName.text !== contract.name ||
    typedRoot.type.typeArguments?.length
  ) {
    fail(context, typedRoot, 'structure', 'Root object must satisfy ' + contract.name);
  }
  const literal = withoutTypeWrappers(context, typedRoot.expression);
  if (!ts.isObjectLiteralExpression(literal)) {
    fail(context, literal, 'structure', 'Final-stage draft must be an object literal');
  }
  return { value: decode(context, literal, [], 0), source, positions: context.positions };
}

/** Syntax-only parser for security tests; materialization must use readDeclarativeDraft. */
export function parseInertDraftSyntax(sourceText: string, expectedEntityKind: DeclarativeDraftEntityKind): DraftValue {
  return parseWithPositions(sourceText, expectedEntityKind).value;
}

function withoutParentheses(context: ParseContext, node: ts.Expression): ts.Expression {
  let current = node;
  let count = 0;
  while (ts.isParenthesizedExpression(current)) {
    if (++count > MAX_DEPTH) fail(context, current, 'limit', 'Too many parentheses');
    current = current.expression;
  }
  return current;
}

/** Checks for schema-stripped unknown fields (including nested non-strict Zod objects). */
function rejectStrippedFields(original: DraftValue, parsed: unknown, path: string[] = []): void {
  if (Array.isArray(original)) {
    if (!Array.isArray(parsed) || original.length !== parsed.length) {
      throw new Error('Parsed schema changed the authored array at ' + path.join('.'));
    }
    original.forEach((value, index) => rejectStrippedFields(value, parsed[index], [...path, String(index)]));
  } else if (original !== null && typeof original === 'object') {
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Parsed schema changed the authored object at ' + path.join('.'));
    }
    const record = parsed as Record<string, unknown>;
    for (const key of Object.keys(original)) {
      if (!Object.hasOwn(record, key)) throw new Error('Unknown or stripped field at ' + [...path, key].join('.'));
      rejectStrippedFields(original[key], record[key], [...path, key]);
    }
  }
}

/**
 * Validate with the single canonical final-stage Zod schema chosen by the
 * trusted operation, never by a property in authored data.
 */
export function readDeclarativeDraft<K extends DeclarativeDraftEntityKind>(
  sourceText: string,
  expectedEntityKind: K,
): DeclarativeDraftValue<K> {
  const { value: original, source, positions } = parseWithPositions(sourceText, expectedEntityKind);
  const parsed = finalStages[expectedEntityKind].schema.safeParse(original);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const path = issue.path.map(part => String(part)).join('.');
    const keys = issue.path.map(part => (typeof part === 'symbol' ? String(part) : part));
    let offset = positions.get('[]') ?? 0;
    for (let count = keys.length; count >= 0; count--) {
      const found = positions.get(JSON.stringify(keys.slice(0, count)));
      if (found !== undefined) {
        offset = found;
        break;
      }
    }
    const { line, character } = source.getLineAndCharacterOfPosition(offset);
    throw new DeclarativeDraftError('schema', line + 1, character + 1, (path || '<root>') + ': ' + issue.message);
  }
  try {
    rejectStrippedFields(original, parsed.data);
  } catch (error) {
    throw new DeclarativeDraftError('schema', 1, 1, (error as Error).message);
  }
  return parsed.data as DeclarativeDraftValue<K>;
}
