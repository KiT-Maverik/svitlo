import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseTypedLesson } from './lesson-typed-source.mjs';

const id = '12345678-1234-4234-8234-123456789001';
const questionId = '12345678-1234-4234-8234-123456789002';
const folder = 'content/math/data/lessons/1/' + id;
const sourcePath = folder + '/index.ts';
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
      plain.replace('slug: "intro"', 'slug: "intro", slug: "duplicate"'),
      plain.replace('config: {', 'config: { ...malicious,'),
      plain.replace('as const satisfies LessonWorkflowStage2', 'as const'),
      plain.replace('export const reviewedLesson', 'const reviewedLesson'),
      plain.replace('import type { LessonWorkflowStage2 }', 'import { LessonWorkflowStage2 }'),
      plain.replace("import type", "import './execute';\nimport type"),
      plain.replace('type: "lesson"', 'type: "course"'),
      plain.replace('id: "' + id + '"', 'id: "' + questionId + '"'),
    ]) assert.throws(() => parseTypedLesson(root, sourcePath, source));
  }));

test('real imported Question Configurator .id can be read as static data', () =>
  fixture(({ root, dir }) => {
    const questions = path.join(dir, 'questions');
    fs.mkdirSync(questions);
    fs.writeFileSync(path.join(questions, 'reviewQuestion.ts'),
      'export const reviewQuestion = defineSelectOneAnswer({ id: "' + questionId +
      '", slug: "reviewQuestion" });\n');
    const reviewed = plain
      .replace("import type", "import { reviewQuestion } from './questions/reviewQuestion';\nimport type")
      .replace('items: {}, order: [] as string[]',
        'items: { quiz: { config: { params: { selection: { questionIds: [reviewQuestion.id] } } } } }, order: ["quiz"] as string[]');
    const result = parseTypedLesson(root, sourcePath, reviewed);
    assert.deepEqual([...result.config.section.items.quiz.config.params.selection.questionIds], [questionId]);
    fs.writeFileSync(path.join(questions, 'reviewQuestion.ts'),
      'export const reviewQuestion = { id: "' + questionId + '" };\n');
    assert.throws(() => parseTypedLesson(root, sourcePath, reviewed),
      /real define\* Configurator/);
  }));

test('bank imports cannot escape the owned Lesson or call arbitrary PR code', () =>
  fixture(({ root }) => {
    const escaping = plain.replace('import type',
      "import { outside } from '../other';\nimport type");
    assert.throws(() => parseTypedLesson(root, sourcePath, escaping),
      /Lesson-owned relative bank imports|owned Question/);
    const call = plain.replace('order: []', 'order: [reviewQuestion.id].map(x => x)');
    assert.throws(() => parseTypedLesson(root, sourcePath, call),
      /Untrusted or unsupported/);
  }));
