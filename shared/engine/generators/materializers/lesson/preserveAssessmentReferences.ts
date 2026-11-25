import { posix } from 'node:path';

import ts from 'typescript';

import type { LessonWorkflowStage2 } from '../../../types/workflow/lessonWorkflow.types';
import { renderBlockerTodo } from '../renderBlockerTodo.mjs';
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
    // The canonical inert draft may export its Stage object directly rather
    // than using an executable materializer call or intermediate const.
    if (ts.isExportAssignment(statement)) {
      const root = unwrap(statement.expression);
      if (at(root, ['config', 'section', 'items']) && at(root, ['production'])) candidates.push(root);
    }
    if (ts.isExpressionStatement(statement) && ts.isCallExpression(statement.expression)) {
      const call = statement.expression;
      if (
        ts.isIdentifier(call.expression) &&
        call.expression.text === 'materializeLessonStage6' &&
        call.arguments.length === 1 &&
        at(call.arguments[0], ['config', 'section', 'items']) &&
        at(call.arguments[0], ['production'])
      )
        candidates.push(call.arguments[0]);
    }
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
function pickSelections(source: string, sourcePath: string, input: LessonWorkflowStage2): Selection[] {
  const file = ts.createSourceFile(sourcePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if ((file as ts.SourceFile & { parseDiagnostics: readonly ts.Diagnostic[] }).parseDiagnostics.length)
    throw new Error('Stage 6: reviewed Stage 2 TypeScript has syntax errors');
  const root = findReviewedLesson(file);
  const imports = importedBindings(file);
  const inertDefaultExport = file.statements.some(
    statement => ts.isExportAssignment(statement) && !statement.isExportEquals,
  );
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
    // In declarative drafts, UUID selections are inert reviewable data, not
    // executable references. Emit the selected IDs but keep an explicit
    // publication blocker until the Section owner integrates actual approved
    // bank Configurator references. Legacy executable drafts retain the
    // stricter imported-expression handling during the CI migration.
    if (
      inertDefaultExport &&
      elements.every(
        (value, i) =>
          ts.isStringLiteral(unwrap(value as ts.Expression)) &&
          (unwrap(value as ts.Expression) as ts.StringLiteral).text === ids[i],
      )
    ) {
      selected.push({ sectionKey: key, kind, field, ids, references: [] });
      continue;
    }
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
  if (selection.references.length === 0) {
    return (
      renderBlockerTodo(
        'Replace provisional ' +
          selection.field +
          ' UUIDs with verified imported Question/Flashcard Configurator references before publication.',
      ) +
      '\n' +
      source
    );
  }
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

/**
 * Exact bank members attested by the trusted runner. These are not authored
 * draft imports and the SHA is evidence of identity, not execution trust.
 * The runner must check each approval against the immutable Lesson-owned bank.
 */
export type TrustedBankMember = Readonly<{
  approved: true;
  id: string;
  sourceSha: string;
  importPath: string;
  exportName: string;
  memberPath?: readonly string[];
}>;
export type TrustedBankSelection = Readonly<{
  sectionKey: string;
  kind: BankKind;
  members: readonly TrustedBankMember[];
}>;

function bindTrustedBankSelections(
  selections: Selection[],
  trusted: readonly TrustedBankSelection[],
  lessonId: string,
): Selection[] {
  const seen = new Set<string>();
  const approved = new Map<string, TrustedBankSelection>();
  for (const value of trusted) {
    if (
      !value ||
      !identifier.test(value.sectionKey) ||
      (value.kind !== 'quiz' && value.kind !== 'flashcards') ||
      seen.has(value.sectionKey) ||
      !Array.isArray(value.members)
    ) {
      throw Error('Stage 6: invalid or repeated trusted bank Section selection');
    }
    seen.add(value.sectionKey);
    approved.set(value.sectionKey, value);
  }
  const base = '#lessonsData/' + lessonId.at(-1) + '/' + lessonId + '/';
  const sha = /^[0-9a-f]{40}$/i;
  const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
  const bound = selections.map(selection => {
    const matching = approved.get(selection.sectionKey);
    if (!matching) return selection;
    if (matching.kind !== selection.kind || matching.members.length !== selection.ids.length)
      throw Error('Stage 6: trusted bank selection differs from reviewed ' + selection.sectionKey);
    const category = selection.kind === 'quiz' ? 'questions/' : 'flashcards/';
    const references = matching.members.map((member, index) => {
      if (
        !member ||
        member.approved !== true ||
        !uuid.test(member.id) ||
        member.id !== selection.ids[index] ||
        !sha.test(member.sourceSha) ||
        typeof member.importPath !== 'string' ||
        !member.importPath.startsWith(base + category) ||
        !member.importPath
          .slice((base + category).length)
          .split('/')
          .every(part => identifier.test(part)) ||
        !identifier.test(member.exportName) ||
        (member.memberPath !== undefined &&
          (!Array.isArray(member.memberPath) || !member.memberPath.every(part => identifier.test(part))))
      ) {
        throw Error('Stage 6: unapproved or mismatched Lesson-owned bank member at ' + selection.sectionKey);
      }
      const alias = 'stage6_ref_' + index;
      return {
        importDeclaration:
          'import { ' + member.exportName + ' as ' + alias + ' } from ' + JSON.stringify(member.importPath) + ';',
        expression: alias + (member.memberPath?.length ? '.' + member.memberPath.join('.') : '') + '.id',
      };
    });
    return { ...selection, references };
  });
  if ([...approved.keys()].some(key => !selections.some(sel => sel.sectionKey === key)))
    throw Error('Stage 6: trusted bank selection refers to absent authored Section');
  return bound;
}

/** Unchanged manifests for Sections without selected bank members. */
export function preserveAssessmentReferences(
  sourceText: string,
  sourcePath: string,
  input: LessonWorkflowStage2,
  files: Result['files'],
  trustedBankSelections?: readonly TrustedBankSelection[],
): Result['files'] {
  const selections =
    trustedBankSelections === undefined
      ? pickSelections(sourceText, sourcePath, input)
      : bindTrustedBankSelections(
          pickSelections(sourceText, sourcePath, input),
          trustedBankSelections,
          input.config.id,
        );
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

/**
 * Project only imported Skill Configurator identifiers from the exact reviewed
 * Lesson Stage 2 expression. No textbook UUID/slug table belongs in Engine.
 *
 * #skillsData is resolved by the owning textbook package; cross-textbook
 * relative/absolute imports cannot be silently reinterpreted as local Skills.
 * Plain authored UUID strings remain non-publishable TODOs until the author
 * imports the actual Configurator in the reviewed source.
 */
export type AuthoredSkillReference = Readonly<{ id: string; path: string; exported: string }> | null;
export function reviewedSkillReferences(
  sourceText: string,
  sourcePath: string,
  input: LessonWorkflowStage2,
): readonly AuthoredSkillReference[] {
  const file = ts.createSourceFile(sourcePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if ((file as ts.SourceFile & { parseDiagnostics: readonly ts.Diagnostic[] }).parseDiagnostics.length)
    throw new Error('Stage 6: reviewed Lesson source has syntax errors');
  const root = findReviewedLesson(file);
  const skills = root && at(root, ['config', 'skills']);
  if (!skills || !ts.isArrayLiteralExpression(unwrap(skills))) return input.config.skills.map(() => null);
  const elements = (unwrap(skills) as ts.ArrayLiteralExpression).elements;
  if (elements.length !== input.config.skills.length)
    throw new Error('Stage 6: evaluated Skills differ from the reviewed Skill inventory');
  const bindings = importedBindings(file);
  return elements.map((element, index) => {
    const value = unwrap(element as ts.Expression);
    const id = input.config.skills[index];
    if (ts.isStringLiteral(value)) {
      if (value.text !== id) throw new Error('Stage 6: reviewed Skill UUID differs from evaluated input');
      return null;
    }
    if (!ts.isPropertyAccessExpression(value) || value.name.text !== 'id' || !ts.isIdentifier(value.expression))
      throw new Error('Stage 6: Skill must be an explicit imported Configurator.id or unresolved UUID');
    const binding = bindings.get(value.expression.text);
    if (
      !binding ||
      binding.form !== 'named' ||
      !identifier.test(binding.exported) ||
      !/^#skillsData\/(?:[A-Za-z][A-Za-z0-9]*\/)*[A-Za-z][A-Za-z0-9]*$/.test(binding.module)
    )
      throw new Error('Stage 6: Skill must be imported from the owning textbook #skillsData taxonomy');
    return { id, path: binding.module, exported: binding.exported };
  });
}
