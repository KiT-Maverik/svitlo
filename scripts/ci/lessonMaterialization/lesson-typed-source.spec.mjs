import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseTypedLesson } from './lesson-typed-source.mjs';

const id = '12345678-1234-4234-8234-123456789001';
const questionId = '12345678-1234-4234-8234-123456789002';
const folder = 'content/math/data/lessons/1/' + id;
const sourcePath = folder + '/draft.ts';
const plain = [
  "import type { LessonWorkflowStage2 } from '@svitlo/engine/build';",
  'export const reviewedLesson = {',
  '  config: { id: "' + id + '", type: "lesson", slug: "intro", section: {',
  '    items: {}, order: [] as string[]',
  '  } },',
  '  production: { languages: { document: "en", planned: ["en"] as const } }',
  '} as const satisfies LessonWorkflowStage2;',
  '',
].join('\n');

function fixture(callback) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-typed-stage2-parser-'));
  try {
    const dir = path.join(root, folder);
    fs.mkdirSync(dir, { recursive: true });
    return callback({ root, dir });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('one exported literal satisfies the real Lesson Stage 2 input without executing it', () =>
  fixture(({ root }) => {
    const parsed = parseTypedLesson(root, sourcePath, plain);
    assert.equal(parsed.config.id, id);
    assert.equal(parsed.config.slug, 'intro');
    assert.deepEqual([...parsed.config.section.order], []);
    assert.deepEqual([...parsed.production.languages.planned], ['en']);
  }));

test('dynamic expressions, code imports, duplicate keys and spreads fail closed', () =>
  fixture(({ root }) => {
    for (const source of [
      plain.replace('order: []', 'order: Math.random()'),
      plain.replace('order: []', 'order: [...[]]'),
      plain.replace('slug: "intro"', 'slug: (() => "intro")()'),
      plain.replace('slug: "intro"', 'slug: "../escape"'),
      plain.replace('slug: "intro"', 'slug: ""'),
      plain.replace('slug: "intro"', 'slug: "intro", slug: "duplicate"'),
      plain.replace('config: {', 'config: { ...malicious,'),
      plain.replace('as const satisfies LessonWorkflowStage2', 'as const'),
      plain.replace('export const reviewedLesson', 'const reviewedLesson'),
      plain.replace('import type { LessonWorkflowStage2 }', 'import { LessonWorkflowStage2 }'),
      plain.replace('import type', "import './execute';\nimport type"),
      plain.replace('type: "lesson"', 'type: "course"'),
      plain.replace('id: "' + id + '"', 'id: "' + questionId + '"'),
    ])
      assert.throws(() => parseTypedLesson(root, sourcePath, source));
  }));

test('real imported Question Configurator .id can be read as static data', () =>
  fixture(({ root, dir }) => {
    const questions = path.join(dir, 'questions');
    fs.mkdirSync(questions);
    fs.writeFileSync(
      path.join(questions, 'reviewQuestion.ts'),
      'export const reviewQuestion = defineSelectOneAnswer({ id: "' + questionId + '", slug: "reviewQuestion" });\n',
    );
    const reviewed = plain
      .replace('import type', "import { reviewQuestion } from './questions/reviewQuestion';\nimport type")
      .replace(
        'items: {}, order: [] as string[]',
        'items: { quiz: { config: { params: { selection: { questionIds: [reviewQuestion.id] } } } } }, order: ["quiz"] as string[]',
      );
    const result = parseTypedLesson(root, sourcePath, reviewed);
    assert.deepEqual([...result.config.section.items.quiz.config.params.selection.questionIds], [questionId]);
    fs.writeFileSync(
      path.join(questions, 'reviewQuestion.ts'),
      'export const reviewQuestion = { id: "' + questionId + '" };\n',
    );
    assert.throws(() => parseTypedLesson(root, sourcePath, reviewed), /real define\* Configurator/);
  }));

test('named Question Bank map selection resolves only verified exported Configurator IDs', () =>
  fixture(({ root, dir }) => {
    const questions = path.join(dir, 'questions');
    const kind = path.join(questions, 'selectOneAnswer');
    fs.mkdirSync(kind, { recursive: true });
    const leaf = path.join(kind, 'reviewQuestion.ts');
    const kindIndex = path.join(kind, 'index.ts');
    const bankIndex = path.join(questions, 'index.ts');
    fs.writeFileSync(leaf, 'export const reviewQuestion = defineSelectOneAnswer({ id: "' + questionId + '" });\n');
    fs.writeFileSync(kindIndex, 'export { reviewQuestion } from "./reviewQuestion";\n');
    const validIndex = [
      'import { reviewQuestion as question_selectOneAnswer_reviewQuestion } from "./selectOneAnswer";',
      'export const questions = { "selectOneAnswer": { "reviewQuestion": question_selectOneAnswer_reviewQuestion } };',
    ].join('\n');
    fs.writeFileSync(bankIndex, validIndex);
    const reviewed = plain
      .replace('import type', "import { questions } from './questions';\nimport type")
      .replace(
        'items: {}, order: [] as string[]',
        'items: { quiz: { config: { params: { selection: { questionIds: [questions.selectOneAnswer.reviewQuestion.id] } } } } }, order: ["quiz"] as string[]',
      );
    const parsed = parseTypedLesson(root, sourcePath, reviewed);
    assert.deepEqual([...parsed.config.section.items.quiz.config.params.selection.questionIds], [questionId]);

    for (const malicious of [
      validIndex.replace('question_selectOneAnswer_reviewQuestion }', 'question_selectOneAnswer_reviewQuestion }') +
        '\nsideEffect();',
      validIndex.replace('question_selectOneAnswer_reviewQuestion } };', 'getQuestion() } };'),
      validIndex.replace('from "./selectOneAnswer"', 'from "../outside"'),
      validIndex.replace('reviewQuestion } };', 'unimported } };'),
    ]) {
      fs.writeFileSync(bankIndex, malicious);
      assert.throws(() => parseTypedLesson(root, sourcePath, reviewed));
    }
    fs.writeFileSync(bankIndex, validIndex);
    fs.writeFileSync(kindIndex, 'export { reviewQuestion } from "../outside";\n');
    assert.throws(() => parseTypedLesson(root, sourcePath, reviewed), /unsafe statement|re-export/);
    fs.writeFileSync(kindIndex, 'export { reviewQuestion } from "./reviewQuestion";\n');
    fs.rmSync(leaf);
    fs.symlinkSync(bankIndex, leaf);
    assert.throws(() => parseTypedLesson(root, sourcePath, reviewed), /Symlink/);
  }));

test('Flashcard Bank map and dynamic property expressions are checked statically', () =>
  fixture(({ root, dir }) => {
    const cards = path.join(dir, 'flashcards');
    fs.mkdirSync(cards);
    const flashcardId = '12345678-1234-4234-8234-123456789003';
    fs.writeFileSync(
      path.join(cards, 'memoryCard.ts'),
      'export const memoryCard = defineFlashcard({ id: "' + flashcardId + '" });\n',
    );
    fs.writeFileSync(
      path.join(cards, 'index.ts'),
      'import { memoryCard as card_memoryCard } from "./memoryCard";\n' +
        'export const flashcards = { "memoryCard": card_memoryCard };\n',
    );
    const source = plain
      .replace('import type', "import { flashcards } from './flashcards';\nimport type")
      .replace(
        'items: {}, order: [] as string[]',
        'items: { cards: { config: { params: { selection: { flashcardIds: [flashcards.memoryCard.id] } } } } }, order: ["cards"] as string[]',
      );
    assert.deepEqual(
      parseTypedLesson(root, sourcePath, source).config.section.items.cards.config.params.selection.flashcardIds,
      [flashcardId],
    );
    assert.throws(
      () =>
        parseTypedLesson(root, sourcePath, source.replace('flashcards.memoryCard.id', 'flashcards["memoryCard"].id')),
      /Untrusted or unsupported|static imported/,
    );
  }));

test('bank imports cannot escape the owned Lesson or call arbitrary PR code', () =>
  fixture(({ root }) => {
    const escaping = plain.replace('import type', "import { outside } from '../other';\nimport type");
    assert.throws(
      () => parseTypedLesson(root, sourcePath, escaping),
      /Lesson-owned relative bank imports|owned Question/,
    );
    const call = plain.replace('order: []', 'order: [reviewQuestion.id].map(x => x)');
    assert.throws(() => parseTypedLesson(root, sourcePath, call), /Untrusted or unsupported/);
  }));

test('bank selector imports reject forged UUIDs, side effects and symlink source paths', () =>
  fixture(({ root, dir }) => {
    const questions = path.join(dir, 'questions');
    fs.mkdirSync(questions);
    const imported = plain
      .replace('import type', "import { reviewedQuestion } from './questions/reviewedQuestion';\nimport type")
      .replace(
        'items: {}, order: [] as string[]',
        'items: { quiz: { config: { params: { selection: { questionIds: [reviewedQuestion.id] } } } } }, order: ["quiz"] as string[]',
      );
    const bank = path.join(questions, 'reviewedQuestion.ts');
    for (const unsafe of [
      'export const reviewedQuestion = defineSelectOneAnswer({ id: "not-a-uuid" });',
      'export const reviewedQuestion = makeQuestion({ id: "' + questionId + '" });',
      'export const reviewedQuestion = defineSelectOneAnswer({ id: createId() });',
      'export const reviewedQuestion = { id: "' + questionId + '" };',
    ]) {
      fs.writeFileSync(bank, unsafe);
      assert.throws(() => parseTypedLesson(root, sourcePath, imported));
    }
    fs.rmSync(bank);
    const external = path.join(root, 'outside.ts');
    fs.writeFileSync(external, 'export const reviewedQuestion = defineSelectOneAnswer({ id: "' + questionId + '" });');
    fs.symlinkSync(external, bank);
    assert.throws(() => parseTypedLesson(root, sourcePath, imported), /Symlink/);
  }));

test('reviewed Stage 2 rejects fabricated bank IDs and disabled parser protections', () =>
  fixture(({ root }) => {
    for (const authored of [
      plain.replace('order: []', 'order: [process.env.SECRET]'),
      plain.replace('slug: "intro"', 'slug: `intro-${Date.now()}`'),
      plain.replace(
        'items: {}, order: [] as string[]',
        'items: { quiz: { config: { params: { selection: { questionIds: [fake.id] } } } } }, order: ["quiz"] as string[]',
      ),
    ])
      assert.throws(() => parseTypedLesson(root, sourcePath, authored));
  }));
