import assert from 'node:assert/strict';
import test from 'node:test';

import {
  DeclarativeDraftError,
  parseInertDraftSyntax,
  readDeclarativeDraft,
  type DeclarativeDraftEntityKind,
} from './readDeclarativeDraft';

const stageNames: Record<DeclarativeDraftEntityKind, string> = {
  course: 'CourseWorkflowStage3',
  lesson: 'LessonWorkflowStage2',
  episode: 'EpisodeWorkflowStage2',
  questions: 'QuestionBankWorkflowStage3',
  flashcards: 'FlashcardBankWorkflowStage3',
  assessment: 'AssessmentWorkflowStage2',
};
const tick = String.fromCharCode(96);
function draft(kind: DeclarativeDraftEntityKind, object = '{ config: {}, production: {} }') {
  return (
    'import type { ' +
    stageNames[kind] +
    ' } from "@svitlo/engine/build";\n' +
    'export default ' +
    object +
    ' satisfies ' +
    stageNames[kind] +
    ';\n'
  );
}
function rejects(text: string, kind: DeclarativeDraftEntityKind = 'lesson') {
  assert.throws(
    () => parseInertDraftSyntax(text, kind),
    error => error instanceof DeclarativeDraftError && /at \d+:\d+:/.test(error.message),
  );
}

test('all six kinds enforce the selected final-stage type and canonical schema', () => {
  for (const kind of Object.keys(stageNames) as DeclarativeDraftEntityKind[]) {
    assert.deepEqual(Object.keys(parseInertDraftSyntax(draft(kind), kind) as object), ['config', 'production']);
    rejects(draft(kind), kind === 'course' ? 'lesson' : 'course');
    assert.throws(
      () => parseInertDraftSyntax(draft(kind), '__proto__' as DeclarativeDraftEntityKind),
      /Unsupported draft entity kind/,
    );
    assert.throws(() => readDeclarativeDraft(draft(kind), kind), /Declarative draft schema at \d+:\d+:/);
  }
});

test('safe literals and nested objects have no inherited prototype', () => {
  const input =
    '{ config: { id: "a", yes: true, no: false, unset: null,' +
    ' values: [-3.5, 0x10, 1_000, { test: "ok" }] },' +
    ' production: { text: "Українська العربية עברית 🌍" } }';
  const parsed = parseInertDraftSyntax(draft('lesson', input), 'lesson') as {
    config: { values: unknown[] };
    production: { text: string };
  };
  assert.equal(Object.getPrototypeOf(parsed), null);
  assert.equal(Object.getPrototypeOf(parsed.config), null);
  assert.deepEqual(parsed.config.values.slice(0, 3), [-3.5, 16, 1000]);
  assert.ok(parsed.production.text.includes('עברית'));
  assert.equal(JSON.parse(JSON.stringify(parsed)).config.id, 'a');
});

test('historical multiline methodology remains a literal without interpolation', () => {
  const text = 'Перший рядок\n  Second line — שָׁלוֹם\nThird line';
  const value = parseInertDraftSyntax(
    draft('course', '{ config: {}, production: { methodology: ' + tick + text + tick + ' } }'),
    'course',
  ) as { production: { methodology: string } };
  assert.equal(value.production.methodology, text);
});

test('sole immutable const and type-only imports and type queries are inert', () => {
  const value = [
    "import type { LessonWorkflowStage2 } from '@svitlo/engine/build';",
    "import type { Lesson_Configurator } from '@svitlo/engine/build';",
    'const draft = { config: {',
    '  sourcePatch: ({ locale: { en: "safe" } } as Parameters<typeof import("./lesson").lesson.build.overrides>[0])',
    '}, production: {} } satisfies LessonWorkflowStage2;',
    'export default draft;',
  ].join('\n');
  const parsed = parseInertDraftSyntax(value, 'lesson') as { config: { sourcePatch: { locale: { en: string } } } };
  assert.equal(parsed.config.sourcePatch.locale.en, 'safe');
});

test('valid default object followed by an executable side effect is rejected before execution', () => {
  const marker = '__SVITLO_INERT_DRAFT_TEST__';
  const before = Object.hasOwn(globalThis, marker);
  rejects(draft('lesson') + 'globalThis.' + marker + ' = true;');
  assert.equal(Object.hasOwn(globalThis, marker), before);
});

test('reject executable, computed, ambiguous and nested expressions', () => {
  const expressions = [
    'value',
    'process.env.TOKEN',
    'require("fs")',
    'import("./x")',
    'eval("x")',
    'new Date()',
    'new Function("return 2")()',
    '(() => 1)()',
    'function () {}',
    'Math.random()',
    '1 + 2',
    'true ? 1 : 2',
    'false && true',
    '2 ** 3',
    '(1, 2)',
    '({ ...other })',
    '({ [process.env.X]: 1 })',
    '({ method() {} })',
    '({ get x() { return 1; } })',
    '({ set x(value) {} })',
    '({ shorthand })',
    '[...items]',
    '[,]',
    '[1, ...items]',
    '0n',
    'Infinity',
    'NaN',
    '++count',
    'tag' + tick + 'foo' + tick,
    tick + 'foo' + '$' + '{process.env.TOKEN}' + tick,
    '({ inside: [{ escape: require("fs") }] })',
  ];
  for (const expression of expressions) {
    rejects(draft('lesson', '{ config: { x: ' + expression + ' }, production: {} }'));
  }
});

test('reject duplicate and prototype-sensitive keys, including nested and quoted names', () => {
  const keys = [
    '__proto__',
    'prototype',
    'constructor',
    '__defineGetter__',
    '__defineSetter__',
    '__lookupGetter__',
    '__lookupSetter__',
  ];
  for (const key of keys) rejects(draft('lesson', '{ config: { nested: { "' + key + '": 1 } }, production: {} }'));
  for (const value of ['{ a: 1, a: 2 }', '{ "a": 1, a: 2 }', '{ 1: 1, "1": 2 }']) {
    rejects(draft('lesson', '{ config: { nested: ' + value + ' }, production: {} }'));
  }
});

test('reject runtime imports, extra statements/exports and noncompliant root contracts', () => {
  const good = draft('lesson');
  const invalid = [
    'import "./unsafe";\n' + good,
    'import { unsafe } from "./unsafe";\n' + good,
    'import { type MaybeInert } from "./unsafe";\n' + good,
    'import * as unsafe from "./unsafe";\n' + good,
    'import unsafe = require("./unsafe");\n' + good,
    'const other = true;\n' + good,
    'export const x = 1;\n' + good,
    'export { foo } from "./foo";\n' + good,
    'export * from "./foo";\n' + good,
    'type Extra = any;\n' + good,
    'class A {}\n' + good,
    'await Promise.resolve();\n' + good,
    'export = {};\n' + good,
    'export default {};\n' + good,
    good + 'export default {} satisfies LessonWorkflowStage2;',
    'const draft = { config: {}, production: {} } satisfies LessonWorkflowStage2;\nexport default other;',
    'let draft = { config: {}, production: {} } satisfies LessonWorkflowStage2;\nexport default draft;',
    'var draft = { config: {}, production: {} } satisfies LessonWorkflowStage2;\nexport default draft;',
    'const draft = { config: {}, production: {} };\nexport default draft;',
    'const draft = { config: {}, production: {} } satisfies LessonWorkflowStage2, another = 1;\nexport default draft;',
    'export default ({} as LessonWorkflowStage2);',
    'export default <div />;',
  ];
  for (const value of invalid) rejects(value);
});

test('reject syntax errors, interpolation, excess depth and source size', () => {
  rejects(draft('lesson', '{ config: { x: ' + tick + 'bad ' + '$' + '{42}' + tick + ' }, production: {} }'));
  rejects('export default { config: {}, production: } satisfies LessonWorkflowStage2;');
  rejects('export default { config: {}, production: {');
  rejects(draft('lesson', '{ config: { value: ' + '[ '.repeat(110) + '1' + ' ]'.repeat(110) + ' }, production: {} }'));
  rejects(draft('lesson', '{ config: { value: ' + '('.repeat(110) + '1' + ')'.repeat(110) + ' }, production: {} }'));
  rejects(draft('lesson', '('.repeat(110) + '{ config: {}, production: {} }' + ')'.repeat(110)));
  assert.throws(() => parseInertDraftSyntax('x'.repeat(4 * 1024 * 1024 + 1), 'course'), /Source must be a string/);
});

test('schema errors use the operation-specific validator and are deterministic', () => {
  const input = draft('assessment', '{ config: { unexpectedField: 1 }, production: {} }');
  const getMessage = () => {
    try {
      readDeclarativeDraft(input, 'assessment');
    } catch (error) {
      return (error as Error).message;
    }
    throw new Error('Assessment schema must reject the malformed configuration');
  };
  assert.match(getMessage(), /Declarative draft schema/);
  assert.equal(getMessage(), getMessage());
});

test('canonical Course Stage3 validates the decoded plain object and rejects unknown nested keys', () => {
  const valid = {
    config: {
      id: 'ddbb8f45-c824-4f19-9f8c-25869dc6142b',
      type: 'course',
      slug: 'pilot',
      content: { items: {}, order: [] },
    },
    production: {
      languages: { document: 'en', planned: ['en'] },
      methodology: {
        purpose: 'Astronomy',
        audience: 'Learners',
        approach: 'Observation',
        depth: 'Introductory',
        accessibility: 'Screen reader support',
        scope: 'Solar system',
        entryConditions: 'None',
        sourceNotes: 'Reviewed',
      },
      outcomes: { explanation: 'Identify the concepts' },
      prerequisites: { explanation: 'None' },
      standardsAlignment: [],
      openDecisions: {},
    },
  };
  const parsed = readDeclarativeDraft(draft('course', JSON.stringify(valid)), 'course');
  assert.equal(parsed.config.slug, 'pilot');
  assert.deepEqual(JSON.parse(JSON.stringify(parsed)), valid);
  assert.throws(
    () =>
      readDeclarativeDraft(
        draft('course', JSON.stringify({ ...valid, config: { ...valid.config, params: { rogue: true } } })),
        'course',
      ),
    /Declarative draft schema at \d+:\d+:/,
  );
});

test('canonical Lesson Stage2 validates inert source with all required assessment decisions', () => {
  const valid = {
    config: {
      id: 'f9270410-238c-42f8-8686-76cb40f2d967',
      type: 'lesson',
      slug: 'pilotLesson',
      locale: { title: 'Welcome — Привіт' },
      params: { quizRequiredForCompletion: false },
      skills: ['6a5d75dc-aad8-4750-a465-b992975228e1'],
      section: { items: {}, order: [] },
      events: {},
    },
    production: {
      languages: { document: 'en', planned: ['en'] },
      methodology: 'Learning by doing',
      objective: 'Understand the topic',
      depth: 'Introduction',
      sequenceReason: 'From simple to complex',
      assessmentEvidence: 'Independent evidence',
      assessment: {
        questionBankRequired: false,
        flashcardBankRequired: false,
        quizSectionRequired: false,
        flashcardsSectionRequired: false,
      },
    },
  };
  const parsed = readDeclarativeDraft(draft('lesson', JSON.stringify(valid)), 'lesson');
  assert.equal(parsed.config.slug, 'pilotLesson');
  assert.deepEqual(JSON.parse(JSON.stringify(parsed)), valid);
});

test('schema diagnostics point to the source path and reject wrong root kind', () => {
  const text = [
    'import type { CourseWorkflowStage3 } from "@svitlo/engine/build";',
    'export default {',
    '  config: { type: "course", id: "invalid", slug: "pilot", content: { items: {}, order: [] } },',
    '  production: {},',
    '} satisfies CourseWorkflowStage3;',
  ].join('\n');
  assert.throws(
    () => readDeclarativeDraft(text, 'course'),
    error => error instanceof DeclarativeDraftError && error.code === 'schema' && error.line === 3 && error.column > 1,
  );
  rejects(draft('lesson'), 'course');
});
