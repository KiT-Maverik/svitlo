/**
 * Static, non-executing proof of Lesson-owned locales for bank materialization.
 * The trusted gate independently pins the exact regular Git blob. Never execute
 * authored constants.ts or infer unapproved languages.
 */
import ts from 'typescript';
import { assertBankLanguages, assertBankUuid } from './bankSourceSafety';

export type LessonLanguageOwnership = Readonly<{
  active: readonly string[];
  planned: readonly string[];
}>;
const locale = /^[a-z]{2}(?:-[A-Z]{2})?$/;
function safeTuple(values: readonly string[], label: string): readonly string[] {
  if (!values.length || new Set(values).size !== values.length || values.some(value => !locale.test(value)))
    throw new Error('Owning Lesson constants.ts has invalid ' + label + ' languages');
  return values;
}

/** Accept only the static export emitted by Lesson Stage 6, not computed expressions. */
export function parseLessonLanguageConstants(content: string): LessonLanguageOwnership {
  const ast = ts.createSourceFile('constants.ts', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const syntaxDiagnostics = (ast as ts.SourceFile & { parseDiagnostics?: readonly ts.Diagnostic[] }).parseDiagnostics;
  if (syntaxDiagnostics?.length) throw new Error('Owning Lesson constants.ts contains invalid TypeScript');
  const definitions = ast.statements
    .filter(ts.isVariableStatement)
    .filter(statement => statement.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword))
    .flatMap(statement => [...statement.declarationList.declarations])
    .filter(declaration => ts.isIdentifier(declaration.name) && declaration.name.text === 'languages');
  if (definitions.length !== 1) throw new Error('Owning Lesson constants.ts must export exactly one languages tuple');
  let value = definitions[0].initializer;
  while (value && (ts.isSatisfiesExpression(value) || ts.isAsExpression(value) || ts.isParenthesizedExpression(value)))
    value = value.expression;
  if (!value || !ts.isArrayLiteralExpression(value) || !value.elements.every(ts.isStringLiteral))
    throw new Error('Owning Lesson constants.ts must use a static literal languages tuple');
  const active = safeTuple(value.elements.map(element => (element as ts.StringLiteral).text), 'active');
  const lines = content.split(/\r?\n/);
  const starts = lines.flatMap((line, index) => line.trim() === '// export const languages = [' ? [index] : []);
  if (starts.length > 1) throw new Error('Owning Lesson constants.ts has ambiguous restoration comments');
  let planned = active;
  if (starts.length === 1) {
    const codes: string[] = [];
    let index = starts[0] + 1;
    while (index < lines.length && lines[index].trim() !== '// ] as const satisfies SupportedLanguages;') {
      const match = lines[index].match(/^\s*\/\/\s+("[^"]+"|'[^']+')\s*,\s*$/);
      if (!match) throw new Error('Owning Lesson constants.ts has malformed language restoration comments');
      codes.push(match[1].slice(1, -1));
      index++;
    }
    if (index >= lines.length) throw new Error('Owning Lesson constants.ts has unterminated language restoration');
    planned = safeTuple(codes, 'planned');
  }
  if (active.some(language => !planned.includes(language)))
    throw new Error('Owning Lesson constants.ts active locales not in the reviewed plan');
  return { active, planned };
}

export function lessonConstantsImport(ownerLessonId: string): string {
  assertBankUuid(ownerLessonId, 'Bank owning Lesson');
  const id = ownerLessonId.toLowerCase();
  return '#lessonsData/' + id.at(-1) + '/' + id + '/constants';
}

/** Refuse source-only Bank output for a Lesson that already requires full translations. */
export function assertBankLessonLanguages(
  owner: LessonLanguageOwnership,
  bank: { document: string; planned: readonly string[] },
): void {
  assertBankLanguages(bank);
  if (!owner || !Array.isArray(owner.active) || !Array.isArray(owner.planned))
    throw new Error('Bank requires pinned Lesson constants.ts language evidence');
  safeTuple(owner.active, 'active');
  safeTuple(owner.planned, 'planned');
  if (JSON.stringify(owner.planned) !== JSON.stringify(bank.planned))
    throw new Error('Bank locale plan conflicts with owning Lesson constants.ts');
  if (owner.active.length !== 1 || owner.active[0] !== bank.document)
    throw new Error('Bank source-only generation requires owning Lesson constants.ts active language to match the Bank document language');
}
