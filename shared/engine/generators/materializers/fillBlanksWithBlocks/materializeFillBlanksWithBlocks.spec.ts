import assert from 'node:assert/strict';
import { test } from 'node:test';

import ts from 'typescript';

import { materializeFillBlanksWithBlocks } from './materializeFillBlanksWithBlocks';

const id = (n: number) => 'b775647f-203d-481a-a1c7-4d331c' + String(n).padStart(6, '0');
const block = (slug: string, n: number) => ({
  config: { id: id(n), slug, type: 'text', params: {}, locale: { value: { uk: 'Текст' } } },
});
const collection = <T>(items: Record<string, T>) => ({ children: Object.keys(items), ...items });
const fixture = () => ({
  config: {
    id: id(1),
    slug: 'sampleQuestion',
    type: 'fillBlanksWithBlocks' as const,
    params: { assessmentMethod: 'retrieval', restrictions: [] },
    locale: { placeholder: { uk: 'Пропуск', en: 'NOT REVIEWED' } },
    content: {
      question: collection({ prompt: block('prompt', 2) }),
      hint: collection({ hint: block('hint', 8) }),
      slots: collection({ firstGap: { correctAnswer: block('answer', 3) } }),
      distractors: collection({ wrong: block('wrong', 4) }),
    },
  },
});
const context = {
  directory: 'questions/fillBlanksWithBlocks',
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
test('fillBlanksWithBlocks: deterministic modular source, nested imports, source locale and syntax', () => {
  const node = fixture();
  const a = materializeFillBlanksWithBlocks(node as never, context);
  const b = materializeFillBlanksWithBlocks(node as never, context);
  assert.deepEqual(a, b);
  const main = a.files.find(file => file.path === 'questions/fillBlanksWithBlocks/sampleQuestion.ts');
  assert.ok(main);
  assert.match(main.content, /defineFillBlanksWithBlocks</);
  assert.match(main.content, /TODO \(BLOCKER\)/);
  assert.match(main.content, /import \{ prompt \} from "\.\/sampleQuestion\/question\/prompt";/);
  assert.match(main.content, /question:\s*\{\s*children:\s*\["prompt"\],?\s*prompt\s*[,}]/);
  assert.doesNotMatch(main.content, /NOT REVIEWED/);
  assert(a.files.some(file => file.path.endsWith('/question/prompt/index.ts')));
  assert(a.files.some(file => file.path.endsWith('/slots/firstGap/correctAnswer/index.ts')));
  assert(a.files.some(file => file.path.endsWith('/distractors/wrong/index.ts')));
  assert(!a.files.some(file => file.path.includes('/items/')));
  assert.ok(main.content.includes('from "./sampleQuestion/slots/firstGap/correctAnswer"'));
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
test('fillBlanksWithBlocks: rejects delegated ContentBlock writing outside its semantic role', () => {
  assert.throws(
    () =>
      materializeFillBlanksWithBlocks(fixture() as never, {
        ...context,
        materializeBlock: () => ({
          exportName: 'prompt',
          files: [
            {
              path: 'questions/fillBlanksWithBlocks/otherQuestion/index.ts',
              content: 'export const prompt = {};\n',
              kind: 'typescript' as const,
            },
          ],
        }),
      }),
    /escaped its assigned directory/,
  );
});
test('fillBlanksWithBlocks: rejects missing questions, incorrect order, and pre-existing authored outputs', () => {
  const noPrompt = fixture();
  Object.assign(noPrompt.config.content.question, { children: [] });
  assert.throws(() => materializeFillBlanksWithBlocks(noPrompt as never, context), /reviewed prompt/);
  const bad = fixture();
  bad.config.content.question.children = ['notThere'];
  assert.throws(() => materializeFillBlanksWithBlocks(bad as never, context), /children/);
  assert.throws(
    () =>
      materializeFillBlanksWithBlocks(fixture() as never, {
        ...context,
        existingPaths: new Set(['questions/fillBlanksWithBlocks/sampleQuestion.ts']),
      }),
    /no clobber/,
  );
});

// A Lesson handoff is an editorial bank Stage 1 file, NOT a completed Question Config.
// Do not turn the known identity/scope into a synthetic Question or delegate blocks.
test('fillBlanksWithBlocks: Stage 1 editorial handoff is not a completed Question', () => {
  const planned = {
    config: { id: id(27), slug: 'plannedQuestion', type: 'fillBlanksWithBlocks' as const },
    production: { scope: 'Question Bank needed by owning Lesson; authoring not started' },
  };
  assert.throws(
    () =>
      materializeFillBlanksWithBlocks(planned as never, {
        ...context,
        materializeBlock: () => {
          throw new Error('Unexpected Stage 1 ContentBlock materialization');
        },
      }),
    /params\/content required/,
  );
});
