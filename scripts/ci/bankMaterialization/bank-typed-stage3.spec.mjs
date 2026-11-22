import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readTypedBankStage3 } from './bank-typed-stage3.mjs';

const typed = (bank, value) => {
  const name = bank === 'questions' ? 'QuestionBankWorkflowStage3' : 'FlashcardBankWorkflowStage3';
  const exportName = bank === 'questions' ? 'questionBank' : 'flashcardBank';
  return "import type { " + name + " } from '@svitlo/engine/build';\n" +
    "export const " + exportName + " = " + value + " satisfies " + name + ";\n";
};

test('typed Questions and Flashcards Stage 3 are decoded as data without execution', () => {
  for (const bank of ['questions', 'flashcards']) {
    assert.deepEqual(readTypedBankStage3(typed(bank,
      '{ production: { languages: { document: "uk", planned: ["uk"] as const } }, config: { items: { answer: { active: true } } } }'), bank),
    { production: { languages: { document: 'uk', planned: ['uk'] } },
      config: { items: { answer: { active: true } } } });
    assert.deepEqual(readTypedBankStage3(typed(bank,
      '{value: null, amount: -3, list: [1,2], quoted: "hi"}'), bank),
    { value: null, amount: -3, list: [1,2], quoted: 'hi' });
  }
});

test('never evaluate author-controlled TypeScript calls, imports or expressions', () => {
  for (const bank of ['questions', 'flashcards']) {
    for (const payload of [
      'process.exit(1)', 'fetch("https://attacker.invalid")', 'new Date()',
      '{ ...(globalThis.leak = true) }',
      '{ foo: (function(){ throw Error("executed") })() }',
      '{ nested: (() => 1)() }',
      '{ obj: Object.create(null) }',
      '{ constructor: "yes" }',
      '{ __proto__: {} }',
      '{ a: 1, a: 2 }',
      '[1, ...other]',
    ]) assert.throws(() => readTypedBankStage3(typed(bank, payload), bank), payload);
    for (const source of [
      typed(bank, '{ a: 1 }') + 'await fetch("https://attacker.invalid");\n',
      'import {danger} from "./evil";\n' + typed(bank, '{a:1}'),
      typed(bank, '{a: 1}').replace('import type', 'import'),
      typed(bank, '{a: 1}').replace(' satisfies ', ' as '),
      typed(bank, '{a: 1}').replace(/Stage3/g, 'Stage2'),
      typed(bank, '{a: 1}').replace('export const ', 'const '),
    ]) assert.throws(() => readTypedBankStage3(source, bank));
  }
});
