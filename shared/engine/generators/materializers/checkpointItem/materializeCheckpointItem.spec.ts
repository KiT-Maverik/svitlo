import assert from 'node:assert/strict';
import { test } from 'node:test';

import ts from 'typescript';

import { materializeCheckpointItem } from './materializeCheckpointItem';

const id = (n: number) => '30000000-0000-4000-8000-' + String(n).padStart(12, '0');
const item = () => ({
  id: id(1),
  slug: 'first',
  type: 'checkpointItem' as const,
  check: true as const,
  question: { id: id(2), slug: 'prompt', type: 'text' as const, params: {}, locale: { value: 'Choose one' } },
  answer: {
    id: id(3),
    slug: 'answer',
    type: 'checkpointAnswer' as const,
    content: {
      items: { option: { id: id(4), slug: 'option', type: 'text' as const, params: {}, locale: { value: 'A' } } },
      order: ['option'],
    },
  },
});
const context = () => ({
  directory: 'first',
  documentLanguage: 'uk',
  languagesImport: '../../../languages',
  renderQuestion: (_config: unknown, directory: string) => ({
    exportName: 'prompt',
    files: [{ path: directory + '/index.ts', content: 'export const prompt = {};\n', kind: 'typescript' as const }],
    diagnostics: [],
  }),
  renderAnswer: (_config: unknown, directory: string) => ({
    exportName: 'answer',
    files: [{ path: directory + '/index.ts', content: 'export const answer = {};\n', kind: 'typescript' as const }],
    diagnostics: [],
  }),
});

test('CheckpointItem delegates its enabled Text question and identified Answer independently', () => {
  const result = materializeCheckpointItem(item(), context());
  assert.equal(result.files.length, 3);
  assert.deepEqual(
    result.files.map(f => f.path),
    ['first/question/index.ts', 'first/answer/index.ts', 'first/index.ts'],
  );
  const code = result.files.at(-1)!.content;
  assert.match(code, /defineCheckpointItem<"first", typeof answer, typeof prompt, typeof languages>/);
  assert.match(code, /import \{ prompt \} from "\.\/question"/);
  assert.match(code, /import \{ answer \} from "\.\/answer"/);
  assert.match(code, /"question": prompt/);
  assert.doesNotMatch(code, / as question| as answer|child_/);
  assert.match(code, /check: true/);
  assert.equal(syntaxErrorCount(code), 0);
  assert.deepEqual(result, materializeCheckpointItem(item(), context()));
});

test('CheckpointItem rejects an incorrect or disabled question, missing answer and reused UUID', () => {
  assert.throws(
    () => materializeCheckpointItem({ ...item(), question: { ...item().question, type: 'scene' as never } }, context()),
    /Text Config/,
  );
  assert.throws(
    () =>
      materializeCheckpointItem(
        {
          ...item(),
          question: { ...item().question, params: { disabled: true as const } },
        },
        context(),
      ),
    /enabled Text/,
  );
  assert.throws(
    () => materializeCheckpointItem({ ...item(), answer: { ...item().answer, id: id(1) } }, context()),
    /distinct/,
  );
  assert.throws(() => materializeCheckpointItem({ ...item(), check: false as never }, context()), /check flag/);
  assert.throws(() => materializeCheckpointItem(item(), { ...context(), directory: 'content/../escape' }), /unsafe/);
});

test('CheckpointItem refuses an answer delegate that claims the question file', () => {
  assert.throws(
    () =>
      materializeCheckpointItem(item(), {
        ...context(),
        renderAnswer: (_config: unknown, _directory: string) => ({
          exportName: 'answer',
          files: [{ path: 'first/question/index.ts', content: '', kind: 'typescript' as const }],
          diagnostics: [],
        }),
      }),
    /outside its owned directory/,
  );
});

test('CheckpointItem rejects an unowned sibling path returned by its question materializer', () => {
  assert.throws(
    () =>
      materializeCheckpointItem(item(), {
        ...context(),
        renderQuestion: () => ({
          exportName: 'prompt',
          files: [{ path: 'first/answer/index.ts', content: 'unowned', kind: 'typescript' as const }],
          diagnostics: [],
        }),
      }),
    /outside its owned directory/,
  );
});

/** Public TypeScript API: syntactic diagnostics without relying on internal SourceFile fields. */
function syntaxErrorCount(source: string, fileName = 'index.ts'): number {
  const result = ts.transpileModule(source, {
    fileName,
    reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022 },
  });
  return (result.diagnostics ?? []).filter(d => d.category === ts.DiagnosticCategory.Error).length;
}
