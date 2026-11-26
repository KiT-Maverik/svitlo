import assert from 'node:assert/strict';
import { test } from 'node:test';

import ts from 'typescript';

import { materializeFillBlanksWithText } from './materializeFillBlanksWithText';

const id = (n: number) => 'b775647f-203d-481a-a1c7-4d331c' + String(n).padStart(6, '0');
const block = (slug: string, n: number) => ({
  config: { id: id(n), slug, type: 'text', params: {}, locale: { value: { uk: 'Текст' } } },
});
const collection = <T>(items: Record<string, T>) => ({ items, order: Object.keys(items) });
const fixture = () => ({
  config: {
    id: id(1),
    slug: 'sampleQuestion',
    type: 'fillBlanksWithText' as const,
    params: { assessmentMethod: 'retrieval', restrictions: [] },
    locale: { placeholder: { uk: 'Текст', en: 'NOT REVIEWED' } },
    content: {
      question: collection({ prompt: block('prompt', 2) }),
      hint: collection({ hint: block('hint', 8) }),
      slots: collection({ firstGap: { correctAnswers: { accepted: { uk: 'слово', en: 'NOT REVIEWED' } } } }),
    },
  },
});
const context = {
  directory: 'questions/fillBlanksWithText',
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
test('fillBlanksWithText: deterministic modular source, nested imports, source locale and syntax', () => {
  const node = fixture();
  const a = materializeFillBlanksWithText(node as never, context);
  const b = materializeFillBlanksWithText(node as never, context);
  assert.deepEqual(a, b);
  const main = a.files.find(file => file.path === 'questions/fillBlanksWithText/sampleQuestion.ts');
  assert.ok(main);
  assert.match(main.content, /defineFillBlanksWithText</);
  assert.match(main.content, /TODO \(BLOCKER\)/);
  assert.match(main.content, /import \{ prompt \} from "\.\/sampleQuestion\/question\/prompt";/);
  assert.match(main.content, /question:\s*\{\s*items:\s*\{\s*prompt\s*\}/);
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
test('fillBlanksWithText: rejects delegated ContentBlock writing outside its semantic role', () => {
  assert.throws(
    () =>
      materializeFillBlanksWithText(fixture() as never, {
        ...context,
        materializeBlock: () => ({
          exportName: 'prompt',
          files: [
            {
              path: 'questions/fillBlanksWithText/otherQuestion/index.ts',
              content: 'export const prompt = {};\n',
              kind: 'typescript' as const,
            },
          ],
        }),
      }),
    /escaped its assigned directory/,
  );
});
test('fillBlanksWithText: rejects missing questions, incorrect order, and pre-existing authored outputs', () => {
  const noPrompt = fixture();
  Object.assign(noPrompt.config.content.question, { items: {}, order: [] });
  assert.throws(() => materializeFillBlanksWithText(noPrompt as never, context), /reviewed prompt/);
  const bad = fixture();
  bad.config.content.question.order = ['notThere'];
  assert.throws(() => materializeFillBlanksWithText(bad as never, context), /order/);
  assert.throws(
    () =>
      materializeFillBlanksWithText(fixture() as never, {
        ...context,
        existingPaths: new Set(['questions/fillBlanksWithText/sampleQuestion.ts']),
      }),
    /no clobber/,
  );
});

// A Lesson handoff is an editorial bank Stage 1 file, NOT a completed Question Config.
// Do not turn the known identity/scope into a synthetic Question or delegate blocks.
test('fillBlanksWithText: Stage 1 editorial handoff is not a completed Question', () => {
  const planned = {
    config: { id: id(27), slug: 'plannedQuestion', type: 'fillBlanksWithText' as const },
    production: { scope: 'Question Bank needed by owning Lesson; authoring not started' },
  };
  assert.throws(
    () =>
      materializeFillBlanksWithText(planned as never, {
        ...context,
        materializeBlock: () => {
          throw new Error('Unexpected Stage 1 ContentBlock materialization');
        },
      }),
    /params\/content required/,
  );
});
