/**
 * One parameterized regression suite for nine independently owned Question
 * source emitters. This shares tests, never production source serialization.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

import ts from 'typescript';

import type { CourseWorkflowStage1Languages } from '../../../types/workflow/courseWorkflow.types';
import { materializeSelectOneAnswer } from '../selectOneAnswer/materializeSelectOneAnswer';
import { materializeSelectMultipleAnswers } from '../selectMultipleAnswers/materializeSelectMultipleAnswers';
import { materializeAnswerWithNumber } from '../answerWithNumber/materializeAnswerWithNumber';
import { materializeAnswerWithText } from '../answerWithText/materializeAnswerWithText';
import { materializeFillBlanksWithText } from '../fillBlanksWithText/materializeFillBlanksWithText';
import { materializeFillBlanksWithBlocks } from '../fillBlanksWithBlocks/materializeFillBlanksWithBlocks';
import { materializeMatchBlocks } from '../matchBlocks/materializeMatchBlocks';
import { materializeOrderSequence } from '../orderSequence/materializeOrderSequence';
import { materializeBuildAnswerWithBlocks } from '../buildAnswerWithBlocks/materializeBuildAnswerWithBlocks';

const stageLanguages = { document: 'uk', planned: ['uk', 'en'] } as const satisfies CourseWorkflowStage1Languages;
const id = (n: number) => 'b775647f-203d-481a-a1c7-4d331c' + String(n).padStart(6, '0');
const block = (slug: string, n: number) => ({
  config: { id: id(n), slug, type: 'text', params: {}, locale: { value: { uk: 'Текст' } } },
});
const collection = <T>(items: Record<string, T>) => ({ items, order: Object.keys(items) });
const makeContext = (kind: string) => ({
  directory: 'questions/' + kind,
  languages: stageLanguages,
  materializeBlock: (node: { config: { slug: string } }, props: { directory: string }) => ({
    exportName: node.config.slug,
    files: [
      { path: props.directory + '/index.ts', content: 'export const ' + node.config.slug + ' = {};\n', kind: 'typescript' as const },
    ],
  }),
});

const fixtureSelectOneAnswer = () => ({
  config: {
    id: id(1),
    slug: 'sampleQuestion',
    type: 'selectOneAnswer' as const,
    params: { assessmentMethod: 'retrieval', restrictions: [] },
    locale: {},
    content: {
      question: collection({ prompt: block('prompt', 2) }),
      hint: collection({ hint: block('hint', 8) }),
      answers: {
        correct: collection({ yes: block('yes', 3) }),
        incorrect: collection({ no: block('no', 4) }),
        distractors: collection({ maybe: block('maybe', 5) }),
      },
    },
  },
});

const fixtureSelectMultipleAnswers = () => ({
  config: {
    id: id(1),
    slug: 'sampleQuestion',
    type: 'selectMultipleAnswers' as const,
    params: { assessmentMethod: 'retrieval', restrictions: [] },
    locale: {},
    content: {
      question: collection({ prompt: block('prompt', 2) }),
      hint: collection({ hint: block('hint', 8) }),
      answers: {
        correct: collection({ yes: block('yes', 3), alsoYes: block('alsoYes', 4) }),
        incorrect: collection({ no: block('no', 5) }),
        distractors: collection({}),
      },
    },
  },
});

const fixtureAnswerWithNumber = () => ({
  config: {
    id: id(1),
    slug: 'sampleQuestion',
    type: 'answerWithNumber' as const,
    params: { assessmentMethod: 'retrieval', restrictions: [], correctAnswers: [42] },
    locale: { placeholder: { uk: 'Число', en: 'NOT REVIEWED' } },
    content: { question: collection({ prompt: block('prompt', 2) }), hint: collection({ hint: block('hint', 8) }) },
  },
});

const fixtureAnswerWithText = () => ({
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

const fixtureFillBlanksWithText = () => ({
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

const fixtureFillBlanksWithBlocks = () => ({
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

const fixtureMatchBlocks = () => ({
  config: {
    id: id(1),
    slug: 'sampleQuestion',
    type: 'matchBlocks' as const,
    params: { assessmentMethod: 'retrieval', restrictions: [] },
    locale: {},
    content: {
      question: collection({ prompt: block('prompt', 2) }),
      hint: collection({ hint: block('hint', 8) }),
      pairs: collection({ pairOne: { left: block('left', 3), right: block('right', 4) } }),
    },
  },
});

const fixtureOrderSequence = () => ({
  config: {
    id: id(1),
    slug: 'sampleQuestion',
    type: 'orderSequence' as const,
    params: { assessmentMethod: 'retrieval', restrictions: [] },
    locale: {},
    content: {
      question: collection({ prompt: block('prompt', 2) }),
      hint: collection({ hint: block('hint', 8) }),
      sequence: collection({ first: block('first', 3), second: block('second', 4) }),
    },
  },
});

const fixtureBuildAnswerWithBlocks = () => ({
  config: {
    id: id(1),
    slug: 'sampleQuestion',
    type: 'buildAnswerWithBlocks' as const,
    params: { assessmentMethod: 'retrieval', restrictions: [] },
    locale: { placeholder: { uk: 'Побудуйте', en: 'NOT REVIEWED' } },
    content: {
      question: collection({ prompt: block('prompt', 2) }),
      hint: collection({ hint: block('hint', 8) }),
      correctSequence: collection({ first: block('first', 3) }),
      distractors: collection({ wrong: block('wrong', 4) }),
    },
  },
});

const contextSelectOneAnswer = makeContext('selectOneAnswer');
const contextSelectMultipleAnswers = makeContext('selectMultipleAnswers');
const contextAnswerWithNumber = makeContext('answerWithNumber');
const contextAnswerWithText = makeContext('answerWithText');
const contextFillBlanksWithText = makeContext('fillBlanksWithText');
const contextFillBlanksWithBlocks = makeContext('fillBlanksWithBlocks');
const contextMatchBlocks = makeContext('matchBlocks');
const contextOrderSequence = makeContext('orderSequence');
const contextBuildAnswerWithBlocks = makeContext('buildAnswerWithBlocks');

const suites = [
  { kind: 'selectOneAnswer' as const, fixture: fixtureSelectOneAnswer, context: contextSelectOneAnswer, render: (node: unknown, options: unknown) => materializeSelectOneAnswer(node as never, options as never) },
  { kind: 'selectMultipleAnswers' as const, fixture: fixtureSelectMultipleAnswers, context: contextSelectMultipleAnswers, render: (node: unknown, options: unknown) => materializeSelectMultipleAnswers(node as never, options as never) },
  { kind: 'answerWithNumber' as const, fixture: fixtureAnswerWithNumber, context: contextAnswerWithNumber, render: (node: unknown, options: unknown) => materializeAnswerWithNumber(node as never, options as never) },
  { kind: 'answerWithText' as const, fixture: fixtureAnswerWithText, context: contextAnswerWithText, render: (node: unknown, options: unknown) => materializeAnswerWithText(node as never, options as never) },
  { kind: 'fillBlanksWithText' as const, fixture: fixtureFillBlanksWithText, context: contextFillBlanksWithText, render: (node: unknown, options: unknown) => materializeFillBlanksWithText(node as never, options as never) },
  { kind: 'fillBlanksWithBlocks' as const, fixture: fixtureFillBlanksWithBlocks, context: contextFillBlanksWithBlocks, render: (node: unknown, options: unknown) => materializeFillBlanksWithBlocks(node as never, options as never) },
  { kind: 'matchBlocks' as const, fixture: fixtureMatchBlocks, context: contextMatchBlocks, render: (node: unknown, options: unknown) => materializeMatchBlocks(node as never, options as never) },
  { kind: 'orderSequence' as const, fixture: fixtureOrderSequence, context: contextOrderSequence, render: (node: unknown, options: unknown) => materializeOrderSequence(node as never, options as never) },
  { kind: 'buildAnswerWithBlocks' as const, fixture: fixtureBuildAnswerWithBlocks, context: contextBuildAnswerWithBlocks, render: (node: unknown, options: unknown) => materializeBuildAnswerWithBlocks(node as never, options as never) },
];

const extraChildPaths: Partial<Record<(typeof suites)[number]['kind'], readonly string[]>> = {
  fillBlanksWithBlocks: ['/slots/firstGap/correctAnswer/index.ts', '/distractors/wrong/index.ts'],
  matchBlocks: ['/pairs/pairOne/left/index.ts', '/pairs/pairOne/right/index.ts'],
};
const extraImports: Partial<Record<(typeof suites)[number]['kind'], readonly string[]>> = {
  fillBlanksWithBlocks: ['./sampleQuestion/slots/firstGap/correctAnswer'],
  matchBlocks: ['./sampleQuestion/pairs/pairOne/left', './sampleQuestion/pairs/pairOne/right'],
};

for (const { kind, fixture, context, render } of suites) {
  test(kind + ': deterministic modular source, nested imports, source locale and syntax', () => {
    const node = fixture();
    const a = render(node, context);
    const b = render(node, context);
    assert.deepEqual(a, b);
    const main = a.files.find(file => file.path === 'questions/' + kind + '/sampleQuestion.ts');
    assert.ok(main);
    assert.match(main.content, new RegExp('define' + kind[0].toUpperCase() + kind.slice(1) + '<'));
    assert.match(main.content, /TODO \(BLOCKER\)/);
    assert.match(main.content, /import \{ prompt \} from "\.\/sampleQuestion\/question\/prompt";/);
    assert.match(main.content, /question:\s*\{\s*items:\s*\{\s*prompt\s*\}/);
    assert.doesNotMatch(main.content, /NOT REVIEWED/);
    assert(a.files.some(file => file.path.endsWith('/question/prompt/index.ts')));
    for (const role of extraChildPaths[kind] ?? []) {
      assert(a.files.some(file => file.path.endsWith(role)), kind + ': missing nested role ' + role);
    }
    for (const role of extraImports[kind] ?? []) {
      assert(main.content.includes('from ' + JSON.stringify(role)), kind + ': missing import for ' + role);
    }
    assert(!a.files.some(file => file.path.includes('/items/')));
    assert.match(main.content, /from "\.\/sampleQuestion\/question\/prompt"/);
    // Syntax-only smoke; a separate ts.createProgram test checks the real Engine Configurator ABI.
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

  test(kind + ': rejects delegated ContentBlock writing outside its semantic role', () => {
    assert.throws(
      () => render(fixture(), {
        ...context,
        materializeBlock: () => ({
          exportName: 'prompt',
          files: [{ path: 'questions/' + kind + '/otherQuestion/index.ts', content: 'export const prompt = {};\n', kind: 'typescript' as const }],
        }),
      }),
      /escaped its assigned directory/,
    );
  });

  test(kind + ': rejects missing questions, incorrect order, and pre-existing authored outputs', () => {
    const noPrompt = fixture();
    Object.assign(noPrompt.config.content.question, { items: {}, order: [] });
    assert.throws(() => render(noPrompt, context), /reviewed prompt/);
    const bad = fixture();
    bad.config.content.question.order = ['notThere'];
    assert.throws(() => render(bad, context), /order/);
    assert.throws(
      () => render(fixture(), { ...context, existingPaths: new Set(['questions/' + kind + '/sampleQuestion.ts']) }),
      /no clobber/,
    );
  });

  // A Lesson Stage 1 handoff is not a completed Question Config; never synthesize a Question.
  test(kind + ': Stage 1 editorial handoff is not a completed Question', () => {
    const planned = {
      config: { id: id(27), slug: 'plannedQuestion', type: kind },
      production: { scope: 'Question Bank needed by owning Lesson; authoring not started' },
    };
    assert.throws(
      () => render(planned, {
        ...context,
        materializeBlock: () => { throw new Error('Unexpected Stage 1 ContentBlock materialization'); },
      }),
      /params\/content required/,
    );
  });
}

// Kind-specific behavior is deliberately not flattened into the common contract.
test('selectOneAnswer: rejects duplicate child bindings instead of silently aliasing imports', () => {
  const question = fixtureSelectOneAnswer();
  Object.assign(question.config.content, { hint: collection({ prompt: block('prompt', 8) }) });
  assert.throws(
    () => materializeSelectOneAnswer(question as never, contextSelectOneAnswer),
    /generated identifier collision.*content.question.items.prompt.*content.hint.items.prompt/,
  );
});

test('selectOneAnswer: preserves a real block slug named items', () => {
  const question = fixtureSelectOneAnswer();
  Object.assign(question.config.content.question, collection({ items: block('items', 9) }));
  const result = materializeSelectOneAnswer(question as never, contextSelectOneAnswer);
  assert(result.files.some(file => file.path.endsWith('/question/items/index.ts')));
});

test('selectOneAnswer: refuses imported child without a generated entrypoint', () => {
  assert.throws(
    () =>
      materializeSelectOneAnswer(fixtureSelectOneAnswer() as never, {
        ...contextSelectOneAnswer,
        materializeBlock: (_node, props) => ({
          exportName: 'prompt',
          files: [{ path: props.directory + '/specification.md', content: '# draft\\n', kind: 'markdown' as const }],
        }),
      }),
    /missing delegated ContentBlock index\.ts/,
  );
});

test('selectMultipleAnswers: rejects duplicate child bindings instead of aliasing imports', () => {
  const question = fixtureSelectMultipleAnswers();
  Object.assign(question.config.content, { hint: collection({ prompt: block('prompt', 8) }) });
  assert.throws(
    () => materializeSelectMultipleAnswers(question as never, contextSelectMultipleAnswers),
    /generated identifier collision.*content.question.items.prompt.*content.hint.items.prompt/,
  );
});

test('selectOneAnswer: rejects source language absent from planned languages', () => {
  assert.throws(
    () => materializeSelectOneAnswer(fixtureSelectOneAnswer() as never, {
      ...contextSelectOneAnswer,
      languages: { document: 'uk' as const, planned: ['en'] as const },
    }),
    /languages.planned/,
  );
});
