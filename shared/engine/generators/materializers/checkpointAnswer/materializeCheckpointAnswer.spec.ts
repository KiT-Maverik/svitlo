import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';

import { materializeCheckpointAnswer, type CheckpointAnswerBlockSource } from './materializeCheckpointAnswer';

const id = (n: number) => '20000000-0000-4000-8000-' + String(n).padStart(12, '0');
const textBlock = (slug: string, n: number) => ({
  id: id(n),
  slug,
  type: 'text' as const,
  params: {},
  locale: { value: { uk: 'Текст', en: 'Text' } },
});
const answer = () => ({
  id: id(1),
  slug: 'answer',
  type: 'checkpointAnswer' as const,
  content: { items: { first: textBlock('first', 2), second: textBlock('second', 3) }, order: ['second', 'first'] },
});
function context() {
  const requests: string[] = [];
  return {
    requests,
    renderer: {
      directory: 'first/answer',
      documentLanguage: 'uk',
      languagesImport: '../../../../languages',
      renderChild: (child: CheckpointAnswerBlockSource, directory: string) => {
        requests.push(child.type + ':' + directory);
        return {
          exportName: child.slug,
          files: [
            {
              path: directory + '/index.ts',
              content: 'export const ' + child.slug + ' = {};\n',
              kind: 'typescript' as const,
            },
          ],
          diagnostics: [],
        };
      },
    },
  };
}

test('CheckpointAnswer delegates each ContentBlock and preserves order, imports and identity', () => {
  const { renderer, requests } = context();
  const result = materializeCheckpointAnswer(answer(), renderer);
  assert.deepEqual(requests, ['text:first/answer/second', 'text:first/answer/first']);
  const code = result.files.at(-1)!.content;
  assert.match(code, /defineCheckpointAnswer<"answer", typeof content.items, typeof languages>/);
  assert.match(code, /"second": answer_second/);
  assert.ok(code.indexOf('"second": answer_second') < code.indexOf('"first": answer_first'));
  assert.doesNotMatch(code, /"en": "Text"/);
  assert.equal(result.files.length, 3);
  assert.deepEqual(result, materializeCheckpointAnswer(answer(), context().renderer));
  assert.equal(syntaxErrorCount(code), 0);
});

test('CheckpointAnswer excludes disabled draft entries without reviving them in order', () => {
  const source = answer();
  const revised = {
    ...source,
    content: { items: { first: false as const, second: source.content.items.second }, order: ['second'] },
  };
  const result = materializeCheckpointAnswer(revised, context().renderer);
  assert.equal(result.files.length, 2);
  assert.doesNotMatch(result.files.at(-1)!.content, /answer_first/);
  assert.throws(
    () =>
      materializeCheckpointAnswer(
        { ...revised, content: { ...revised.content, order: ['first'] } },
        context().renderer,
      ),
    /exactly once/,
  );
});

test('CheckpointAnswer rejects nested Checkpoint, duplicate UUIDs and unsafe destinations', () => {
  const source = answer();
  const forbidden = {
    id: id(5),
    slug: 'bad',
    type: 'checkpoint' as never,
    params: {},
    locale: { title: 'Bad' },
    content: {},
  };
  assert.throws(
    () =>
      materializeCheckpointAnswer(
        {
          ...source,
          content: { items: { bad: forbidden as never }, order: ['bad'] },
        },
        context().renderer,
      ),
    /invalid kind/,
  );
  assert.throws(
    () =>
      materializeCheckpointAnswer(
        {
          ...source,
          content: {
            items: { first: source.content.items.first, second: { ...source.content.items.second, id: id(2) } },
            order: ['first', 'second'],
          },
        },
        context().renderer,
      ),
    /duplicate UUID/,
  );
  assert.throws(
    () => materializeCheckpointAnswer(source, { ...context().renderer, directory: '../escape' }),
    /unsafe destination/,
  );
});

test('CheckpointAnswer forbids a child delegate from writing outside its assigned item folder', () => {
  assert.throws(
    () =>
      materializeCheckpointAnswer(answer(), {
        ...context().renderer,
        renderChild: child => ({
          exportName: child.slug,
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
