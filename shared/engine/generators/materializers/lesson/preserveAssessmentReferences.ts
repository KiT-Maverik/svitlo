import { posix } from 'node:path';
import ts from 'typescript';

import type { LessonWorkflowMaterializerInput } from '../../../types/workflow/lessonWorkflow.types';
import type { Result } from './lesson';

/**
 * Preserve the only cross-bank Configurator references owned by Lesson Sections.
 * This is deliberately NOT a general TypeScript source rewriter: inspect the
 * reviewed Stage 2 expression and change only questionIds/flashcardIds in the
 * concrete Quiz/Flashcards renderer's output. Unknown syntax fails closed.
 */
type BankKind = 'quiz' | 'flashcards';
type Selection = {
  sectionKey: string;
  kind: BankKind;
  field: 'questionIds' | 'flashcardIds';
  ids: readonly string[];
  references: { importDeclaration: string; expression: string }[];
};
type ImportBinding = { module: string; exported: string; form: 'named' | 'default' | 'namespace' };
const identifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

function unwrap(expression: ts.Expression): ts.Expression {
  while (
    ts.isParenthesizedExpression(expression) ||
    ts.isAsExpression(expression) ||
    ts.isSatisfiesExpression(expression)
  )
    expression = expression.expression;
  return expression;
}
function property(object: ts.Expression, key: string): ts.Expression | undefined {
  const root = unwrap(object);
  if (!ts.isObjectLiteralExpression(root)) return undefined;
  const values = root.properties.filter(
    item =>
      ts.isPropertyAssignment(item) &&
      (ts.isIdentifier(item.name) || ts.isStringLiteral(item.name)) &&
      item.name.text === key,
  );
  if (values.length !== 1) return undefined;
  return (values[0] as ts.PropertyAssignment).initializer;
}
function at(object: ts.Expression, keys: string[]): ts.Expression | undefined {
  let current: ts.Expression | undefined = object;
  for (const key of keys) current = current && property(current, key);
  return current;
}
function findReviewedLesson(file: ts.SourceFile): ts.Expression | undefined {
  const candidates: ts.Expression[] = [];
  for (const statement of file.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (
        declaration.initializer &&
        at(declaration.initializer, ['config', 'section', 'items']) &&
        at(declaration.initializer, ['production'])
      )
        candidates.push(declaration.initializer);
    }
  }
  return candidates.length === 1 ? candidates[0] : undefined;
}
function importedBindings(file: ts.SourceFile): Map<string, ImportBinding> {
  const bindings = new Map<string, ImportBinding>();
  for (const statement of file.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier) ||
      !statement.importClause ||
      statement.importClause.isTypeOnly
    )
      continue;
    const module = statement.moduleSpecifier.text;
    const clause = statement.importClause;
    if (clause.name) bindings.set(clause.name.text, { module, exported: 'default', form: 'default' });
    if (clause.namedBindings && ts.isNamespaceImport(clause.namedBindings))
      bindings.set(clause.namedBindings.name.text, {
        module,
        exported: '*',
        form: 'namespace',
      });
    if (clause.namedBindings && ts.isNamedImports(clause.namedBindings))
      for (const item of clause.namedBindings.elements)
        if (!item.isTypeOnly)
          bindings.set(item.name.text, {
            module,
            exported: item.propertyName?.text ?? item.name.text,
            form: 'named',
          });
  }
  return bindings;
}
function rebaseImport(module: string, sourcePath: string, generatedPath: string): string {
  if (!module.startsWith('.')) return module;
  if (!/^(?:\.\/|\.\.\/)/.test(module)) throw new Error('Stage 6: unsafe Configurator import ' + module);
  const resolved = posix.join(posix.dirname(sourcePath), module);
  if (resolved === '..' || resolved.startsWith('../') || resolved.startsWith('/'))
    throw new Error('Stage 6: Configurator import escapes repository');
  const relative = posix.relative(posix.dirname(generatedPath), resolved);
  return relative.startsWith('.') ? relative : './' + relative;
}
function pickSelections(source: string, sourcePath: string, input: LessonWorkflowMaterializerInput): Selection[] {
  const file = ts.createSourceFile(sourcePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if ((file as ts.SourceFile & { parseDiagnostics: readonly ts.Diagnostic[] }).parseDiagnostics.length)
    throw new Error('Stage 6: reviewed Stage 2 TypeScript has syntax errors');
  const root = findReviewedLesson(file);
  const imports = importedBindings(file);
  const selected: Selection[] = [];
  for (const key of input.config.section.order) {
    const node = input.config.section.items[key];
    if (node.config.type !== 'quiz' && node.config.type !== 'flashcards') continue;
    const kind = node.config.type;
    const field = kind === 'quiz' ? 'questionIds' : 'flashcardIds';
    const params = node.config.params as unknown as Record<string, unknown> | undefined;
    const selection = params?.selection as Record<string, unknown> | undefined;
    const ids = selection?.[field];
    if (!Array.isArray(ids) || !ids.length) continue; // Unresolved selection stays a TODO blocker.
    const location = ['config', 'section', 'items', key, 'config', 'params', 'selection', field];
    const array = root && at(root, location);
    if (!array || !ts.isArrayLiteralExpression(unwrap(array)))
      throw new Error(
        'Stage 6: ' +
          key +
          '.' +
          field +
          ' must be an explicit imported Configurator .id array in reviewed Stage 2 source',
      );
    const elements = (unwrap(array) as ts.ArrayLiteralExpression).elements;
    if (elements.length !== ids.length)
      throw new Error('Stage 6: reviewed ' + key + '.' + field + ' does not match evaluated Config');
    const generatedPath = posix.join(posix.dirname(sourcePath), 'sections', key, 'index.ts');
    const references = elements.map((value, i) => {
      const expression = unwrap(value as ts.Expression);
      if (!ts.isPropertyAccessExpression(expression) || expression.name.text !== 'id')
        throw new Error(
          'Stage 6: ' +
            key +
            '.' +
            field +
            ' requires imported Question/Flashcard Configurator .id, not a literal UUID',
        );
      // A canonical bank may re-export the Configurator through a named map:
      // questions.multipleChoice.example.id. Every step must be a static property.
      const members: string[] = [];
      let target: ts.Expression = expression.expression;
      while (ts.isPropertyAccessExpression(target)) {
        members.unshift(target.name.text);
        target = target.expression;
      }
      if (!ts.isIdentifier(target))
        throw new Error(
          'Stage 6: ' + key + '.' + field + ' must reference a static member of an imported Configurator or bank map',
        );
      const binding = imports.get(target.text);
      if (!binding || (!identifier.test(binding.exported) && binding.form !== 'namespace'))
        throw new Error(
          'Stage 6: ' + key + '.' + field + ' refers to a name without an executable Configurator import',
        );
      const alias = 'stage6_ref_' + i;
      const specifier = JSON.stringify(rebaseImport(binding.module, sourcePath, generatedPath));
      const statement =
        binding.form === 'named'
          ? 'import { ' + binding.exported + ' as ' + alias + ' } from ' + specifier + ';'
          : binding.form === 'default'
            ? 'import ' + alias + ' from ' + specifier + ';'
            : 'import * as ' + alias + ' from ' + specifier + ';';
      return {
        importDeclaration: statement,
        expression: alias + (members.length ? '.' + members.join('.') : '') + '.id',
      };
    });
    selected.push({ sectionKey: key, kind, field, ids, references });
  }
  return selected;
}
function applySelection(source: string, filePath: string, selection: Selection): string {
  const file = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if ((file as ts.SourceFile & { parseDiagnostics: readonly ts.Diagnostic[] }).parseDiagnostics.length)
    throw new Error('Stage 6: malformed rendered Section TypeScript');
  const name = selection.kind === 'quiz' ? 'defineQuizSection' : 'defineFlashcardsSection';
  const matches: ts.Expression[] = [];
  const visit = (n: ts.Node): void => {
    if (
      ts.isCallExpression(n) &&
      ts.isIdentifier(n.expression) &&
      n.expression.text === name &&
      n.arguments.length === 1
    )
      matches.push(n.arguments[0]);
    ts.forEachChild(n, visit);
  };
  visit(file);
  if (matches.length !== 1) throw new Error('Stage 6: unable to locate concrete ' + name + ' call');
  const array = at(matches[0], ['params', 'selection', selection.field]);
  if (!array || !ts.isArrayLiteralExpression(unwrap(array)))
    throw new Error('Stage 6: concrete Section output lost ' + selection.field);
  const values = (unwrap(array) as ts.ArrayLiteralExpression).elements.map(node =>
    ts.isStringLiteral(node) ? node.text : undefined,
  );
  if (values.length !== selection.ids.length || values.some((id, index) => id !== selection.ids[index]))
    throw new Error('Stage 6: rendered ' + selection.field + ' differs from verified Stage 2 values');
  const start = array.getStart(file),
    end = array.getEnd();
  const declarations = [...new Set(selection.references.map(reference => reference.importDeclaration))];
  return (
    declarations.join('\n') +
    '\n' +
    source.slice(0, start) +
    '[' +
    selection.references.map(ref => ref.expression).join(', ') +
    ']' +
    source.slice(end)
  );
}

/** Unchanged manifests for Sections without selected bank members. */
export function preserveAssessmentReferences(
  sourceText: string,
  sourcePath: string,
  input: LessonWorkflowMaterializerInput,
  files: Result['files'],
): Result['files'] {
  const selections = pickSelections(sourceText, sourcePath, input);
  if (!selections.length) return files;
  const replacements = new Map<string, Selection>(
    selections.map(selection => [
      posix.join(posix.dirname(sourcePath), 'sections', selection.sectionKey, 'index.ts'),
      selection,
    ]),
  );
  const visited = new Set<string>();
  const updated = files.map(file => {
    const selected = replacements.get(file.path);
    if (!selected) return file;
    if (file.kind !== 'typescript' || visited.has(file.path))
      throw new Error('Stage 6: duplicated or non-TypeScript bank Section ' + file.path);
    visited.add(file.path);
    return { ...file, content: applySelection(file.content, file.path, selected) };
  });
  if (visited.size !== selections.length)
    throw new Error('Stage 6: missing rendered Quiz/Flashcards Section for reviewed Configurator imports');
  return updated;
}
