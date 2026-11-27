import assert from 'node:assert/strict';
import { test } from 'node:test';

import ts from 'typescript';

import { lessonWorkflowCheckpointAnswerSource_Schema } from '../../../types/workflow/lessonWorkflow.types';
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
  children: ['second', 'first'],
  first: textBlock('first', 2),
  second: textBlock('second', 3),
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

test('Stage 2 Checkpoint Answer validates Primitive-only direct children', () => {
  const valid = {
    config: {
      id: id(1), slug: 'answer', type: 'checkpointAnswer' as const,
      children: ['first'],
      first: { config: textBlock('first', 2) },
    },
  };
  assert.equal(lessonWorkflowCheckpointAnswerSource_Schema.safeParse(valid).success, true);
  for (const kind of ['carousel', 'checkpoint']) {
    const invalid = {
      config: {
        ...valid.config,
        first: { config: { id: id(4), slug: 'first', type: kind, params: {}, locale: {} } },
      },
    };
    assert.equal(lessonWorkflowCheckpointAnswerSource_Schema.safeParse(invalid).success, false,
      'Reject ' + kind + ' at the Stage 2 source boundary');
  }
});

test('CheckpointAnswer delegates each ContentBlock and preserves order, imports and identity', () => {
  const { renderer, requests } = context();
  const result = materializeCheckpointAnswer(answer(), renderer);
  assert.deepEqual(requests, ['text:first/answer/second', 'text:first/answer/first']);
  const code = result.files.at(-1)!.content;
  assert.match(code, /defineCheckpointAnswer<"answer", typeof __placements, typeof languages>/);
  assert.match(code, /\bsecond,/);
  assert.ok(code.indexOf('second,') < code.indexOf('first,'));
  assert.doesNotMatch(code, /"en": "Text"/);
  assert.equal(result.files.length, 3);
  assert.deepEqual(result, materializeCheckpointAnswer(answer(), context().renderer));
  assert.equal(syntaxErrorCount(code), 0);
});

test('CheckpointAnswer fails closed on disabled authored children and stale order', () => {
  const source = answer();
  assert.throws(
    () => materializeCheckpointAnswer({ ...source, first: false as never, children: ['second'] }, context().renderer),
    /disabled/,
  );
  assert.throws(
    () => materializeCheckpointAnswer({ ...source, children: ['first'] }, context().renderer),
    /exactly once/,
  );
});

test('CheckpointAnswer rejects both composite kinds, duplicate UUIDs and unsafe destinations', () => {
  const source = answer();
  const forbidden = {
    id: id(5),
    slug: 'bad',
    type: 'checkpoint' as never,
    params: {},
    locale: { title: 'Bad' },
    children: [],
  };
  assert.throws(
    () =>
      materializeCheckpointAnswer(
        {
          ...source,
          children: ['second', 'first', 'bad'],
          bad: forbidden as never,
        },
        context().renderer,
      ),
    /invalid kind/,
  );
  const carousel = {
    id: id(6),
    slug: 'gallery',
    type: 'carousel' as never,
    children: [],
    params: {},
    locale: {},
  };
  assert.throws(
    () =>
      materializeCheckpointAnswer(
        {
          ...source,
          children: ['second', 'first', 'gallery'],
          gallery: carousel as never,
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
          first: source.first,
          second: { ...source.second, id: id(2) },
          children: ['first', 'second'],
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
