import { test } from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { materializeAnswerWithNumber } from './materializeAnswerWithNumber';
const id = (n: number) => 'b775647f-203d-481a-a1c7-4d331c' + String(n).padStart(6, '0');
const block = (slug: string, n: number) => ({
  config: { id: id(n), slug, type: 'text', params: {}, locale: { value: { uk: 'Текст' } } },
});
const collection = <T>(items: Record<string, T>) => ({ items, order: Object.keys(items) });
const fixture = () => ({
  config: {
    id: id(1),
    slug: 'sampleQuestion',
    type: 'answerWithNumber' as const,
    params: { assessmentMethod: 'retrieval', restrictions: [], correctAnswers: [42] },
    locale: { placeholder: { uk: 'Число', en: 'NOT REVIEWED' } },
    content: { question: collection({ prompt: block('prompt', 2) }), hint: collection({ hint: block('hint', 8) }) },
  },
});
const context = {
  directory: 'questions/answerWithNumber',
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
test('answerWithNumber: deterministic modular source, nested imports, source locale and syntax', () => {
  const node = fixture();
  const a = materializeAnswerWithNumber(node as never, context);
  const b = materializeAnswerWithNumber(node as never, context);
  assert.deepEqual(a, b);
  const main = a.files.find(file => file.path === 'questions/answerWithNumber/sampleQuestion.ts');
  assert.ok(main);
  assert.match(main.content, /defineAnswerWithNumber</);
  assert.match(main.content, /TODO \(BLOCKER\)/);
  assert.match(main.content, /child_content_question_items_prompt/);
  assert.doesNotMatch(main.content, /NOT REVIEWED/);
  assert(a.files.some(file => file.path.endsWith('content/question/items/prompt/index.ts')));
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
test('answerWithNumber: rejects missing questions, incorrect order, and pre-existing authored outputs', () => {
  const noPrompt = fixture();
  Object.assign(noPrompt.config.content.question, { items: {}, order: [] });
  assert.throws(() => materializeAnswerWithNumber(noPrompt as never, context), /reviewed prompt/);
  const bad = fixture();
  bad.config.content.question.order = ['notThere'];
  assert.throws(() => materializeAnswerWithNumber(bad as never, context), /order/);
  assert.throws(
    () =>
      materializeAnswerWithNumber(fixture() as never, {
        ...context,
        existingPaths: new Set(['questions/answerWithNumber/sampleQuestion.ts']),
      }),
    /no clobber/,
  );
});

// A Lesson handoff is an editorial bank Stage 1 file, NOT a completed Question Config.
// Do not turn the known identity/scope into a synthetic Question or delegate blocks.
test('answerWithNumber: Stage 1 editorial handoff is not a completed Question', () => {
  const planned = {
    config: { id: id(27), slug: 'plannedQuestion', type: 'answerWithNumber' as const },
    production: { scope: 'Question Bank needed by owning Lesson; authoring not started' },
  };
  assert.throws(
    () =>
      materializeAnswerWithNumber(planned as never, {
        ...context,
        materializeBlock: () => {
          throw new Error('Unexpected Stage 1 ContentBlock materialization');
        },
      }),
    /params\/content required/,
  );
});
