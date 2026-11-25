import assert from 'node:assert/strict';
import { test } from 'node:test';

import ts from 'typescript';

import { materializeAnswerWithText } from './materializeAnswerWithText';

const id = (n: number) => 'b775647f-203d-481a-a1c7-4d331c' + String(n).padStart(6, '0');
const block = (slug: string, n: number) => ({
  config: { id: id(n), slug, type: 'text', params: {}, locale: { value: { uk: 'Текст' } } },
});
const collection = <T>(items: Record<string, T>) => ({ items, order: Object.keys(items) });
const fixture = () => ({
  config: {
    id: id(1),
    slug: 'sampleQuestion',
    type: 'answerWithText' as const,
    params: { assessmentMethod: 'retrieval', restrictions: [] },
    locale: {
      correctAnswers: { first: { uk: 'так', en: 'NOT REVIEWED' } },
      placeholder: { uk: 'Введіть', en: 'NOT REVIEWED' },
    },
    content: { question: collection({ prompt: block('prompt', 2) }), hint: collection({ hint: block('hint', 8) }) },
  },
});
const context = {
  directory: 'questions/answerWithText',
  languages: { document: 'uk' as const, planned: ['uk', 'en'] as const },
  materializeBlock: (node: { config: { slug: string } }, props: { directory: string }) => ({
    exportName: node.config.slug,
    files: [
      {
        path: props.directory + '/index.ts',
        content: 'export const ' + node.config.slug + ' = {};\n',
        kind: 'typescript' as const,
      },
    ],
  }),
};
test('answerWithText: deterministic modular source, nested imports, source locale and syntax', () => {
  const node = fixture();
  const a = materializeAnswerWithText(node as never, context);
  const b = materializeAnswerWithText(node as never, context);
  assert.deepEqual(a, b);
  const main = a.files.find(file => file.path === 'questions/answerWithText/sampleQuestion.ts');
  assert.ok(main);
  assert.match(main.content, /defineAnswerWithText</);
  assert.match(main.content, /TODO \(BLOCKER\)/);
  assert.match(main.content, /child_content_question_items_prompt/);
  assert.doesNotMatch(main.content, /NOT REVIEWED/);
  assert(a.files.some(file => file.path.endsWith('/question/prompt/index.ts')));
  assert(!a.files.some(file => file.path.includes('/items/')));
  assert.match(main.content, /from "\.\/sampleQuestion\/question\/prompt"/);
  for (const file of a.files.filter(file => file.kind === 'typescript')) {
    const parsed = ts.transpileModule(file.content, {
      fileName: file.path,
      reportDiagnostics: true,
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    });
    assert.deepEqual(
      (parsed.diagnostics ?? []).map(issue => ts.flattenDiagnosticMessageText(issue.messageText, '\n')),
      [],
    );
  }
});
test('answerWithText: rejects delegated ContentBlock writing outside its semantic role', () => {
  assert.throws(
    () =>
      materializeAnswerWithText(fixture() as never, {
        ...context,
        materializeBlock: () => ({
          exportName: 'prompt',
          files: [
            {
              path: 'questions/answerWithText/otherQuestion/index.ts',
              content: 'export const prompt = {};\n',
              kind: 'typescript' as const,
            },
          ],
        }),
      }),
    /escaped its assigned directory/,
  );
});
test('answerWithText: rejects missing questions, incorrect order, and pre-existing authored outputs', () => {
  const noPrompt = fixture();
  Object.assign(noPrompt.config.content.question, { items: {}, order: [] });
  assert.throws(() => materializeAnswerWithText(noPrompt as never, context), /reviewed prompt/);
  const bad = fixture();
  bad.config.content.question.order = ['notThere'];
  assert.throws(() => materializeAnswerWithText(bad as never, context), /order/);
  assert.throws(
    () =>
      materializeAnswerWithText(fixture() as never, {
        ...context,
        existingPaths: new Set(['questions/answerWithText/sampleQuestion.ts']),
      }),
    /no clobber/,
  );
});

// A Lesson handoff is an editorial bank Stage 1 file, NOT a completed Question Config.
// Do not turn the known identity/scope into a synthetic Question or delegate blocks.
test('answerWithText: Stage 1 editorial handoff is not a completed Question', () => {
  const planned = {
    config: { id: id(27), slug: 'plannedQuestion', type: 'answerWithText' as const },
    production: { scope: 'Question Bank needed by owning Lesson; authoring not started' },
  };
  assert.throws(
    () =>
      materializeAnswerWithText(planned as never, {
        ...context,
        materializeBlock: () => {
          throw new Error('Unexpected Stage 1 ContentBlock materialization');
        },
      }),
    /params\/content required/,
  );
});
