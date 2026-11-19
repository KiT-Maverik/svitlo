import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import ts from 'typescript';
import yaml from 'yaml';

import { inspectQuestions, readQuestionsYaml, renderQuestions, runOne } from './questionsBuilder.mjs';
import { verifyQuizSelections } from './verifyQuizSelections.mjs';

const uuid = n => '00000000-0000-4000-8000-' + String(n).padStart(12, '0');
const lessonId = uuid(1);
const questionBlock = (slug, n, value = 'What is one plus one?') => ({
  id: uuid(n),
  slug,
  type: 'text',
  params: {},
  locale: { value: { en: value } },
});
const collection = items => ({ items, order: Object.keys(items) });

function sample() {
  const question = (slug, id, n) => ({
    id: uuid(id),
    slug,
    type: 'selectOneAnswer',
    params: { assessmentMethod: 'retrieval', restrictions: [] },
    locale: {},
    content: {
      question: collection({ prompt: questionBlock('prompt', n) }),
      answers: {
        correct: collection({ yes: questionBlock('yes', n + 1, 'Two') }),
        incorrect: collection({ no: questionBlock('no', n + 2, 'Three') }),
        distractors: collection({}),
      },
    },
  });
  return {
    documentLanguage: 'en',
    questions: {
      selectOneAnswer: {
        firstQuestion: question('firstQuestion', 10, 100),
        secondQuestion: question('secondQuestion', 11, 110),
      },
    },
    quizSelections: { [uuid(20)]: [uuid(10)] },
  };
}

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-questions-builder-'));
  const workspace = path.join(root, 'content', 'playground');
  const lesson = path.join(workspace, 'data', 'lessons', lessonId.at(-1), lessonId);
  fs.mkdirSync(lesson, { recursive: true });
  fs.writeFileSync(path.join(workspace, 'package.json'), '{"name":"@svitlo/playground"}\n');
  fs.writeFileSync(path.join(lesson, 'index.ts'), '// Existing authored Lesson\n');
  fs.writeFileSync(
    path.join(lesson, 'constants.ts'),
    "export const languages = ['en'] as const;\nexport type LessonLanguages = typeof languages;\n",
  );
  const source = path.join(lesson, 'questions.yaml');
  fs.writeFileSync(source, yaml.stringify(sample()));
  return { root, lesson, source, remove: () => fs.rmSync(root, { recursive: true, force: true }) };
}

test('complete bank is generated, while Quiz selection remains a small UUID handoff', () => {
  const item = sample();
  const analyzed = inspectQuestions(item);
  assert.equal(analyzed.questionCount, 2);
  assert.deepEqual(analyzed.selections[uuid(20)], [uuid(10)]);
  const { files } = renderQuestions(item, lessonId);
  assert.ok(files.has('questions/index.ts'));
  for (const slug of ['firstQuestion', 'secondQuestion']) {
    const code = files.get('questions/selectOneAnswer/' + slug + '/index.ts');
    assert.match(code, /defineSelectOneAnswer/);
  }
  assert.match(files.get('questions/index.ts'), /firstQuestion/);
  assert.match(files.get('questions/index.ts'), /secondQuestion/);
  assert.ok(
    [...files].every(
      ([, content]) =>
        ts.createSourceFile('draft.ts', content, ts.ScriptTarget.Latest, true).parseDiagnostics.length === 0,
    ),
  );
  assert.ok([...files.keys()].some(p => p.endsWith('/prompt/index.ts')));
});

test('creation-only behavior skips an already authored bank and check is read-only', () => {
  const f = fixture();
  try {
    assert.equal(runOne(f.source, '--preflight', f.root).count, 2);
    assert.equal(fs.existsSync(path.join(f.lesson, 'questions')), false);
    const generated = runOne(f.source, '--write', f.root);
    assert.equal(generated.count, 2);
    assert.equal(generated.skipped, false);
    assert.equal(runOne(f.source, '--check', f.root).changed, 0);
    const bank = path.join(f.lesson, 'questions/index.ts');
    const original = fs.readFileSync(bank, 'utf8');
    fs.writeFileSync(f.source, 'invalid: yaml\n');
    assert.equal(runOne(f.source, '--write', f.root).skipped, true);
    assert.equal(fs.readFileSync(bank, 'utf8'), original);
    assert.throws(() => runOne(f.source, '--check', f.root), /questions.yaml/);
  } finally {
    f.remove();
  }
});

test('conflicts, orphan trees and unsafe filesystem destinations are rejected before writing', () => {
  const f = fixture();
  try {
    fs.mkdirSync(path.join(f.lesson, 'questions'), { recursive: true });
    fs.writeFileSync(path.join(f.lesson, 'questions', 'draft.txt'), 'Do not delete');
    assert.throws(() => runOne(f.source, '--write', f.root), /Partial Question Bank tree/);
    assert.equal(fs.readFileSync(path.join(f.lesson, 'questions', 'draft.txt'), 'utf8'), 'Do not delete');
    fs.rmSync(path.join(f.lesson, 'questions'), { recursive: true });
    fs.mkdirSync(path.join(f.lesson, 'questions'));
    fs.symlinkSync(f.source, path.join(f.lesson, 'questions', 'index.ts'));
    assert.throws(() => runOne(f.source, '--write', f.root), /symlink/i);
  } finally {
    f.remove();
  }
});

test('duplicate IDs, wrong types, invalid selections and unknown fields fail at handoff', () => {
  const first = sample();
  first.questions.selectOneAnswer.secondQuestion.id = uuid(10);
  assert.throws(() => inspectQuestions(first), /duplicate Question UUID/);

  const wrong = sample();
  wrong.questions.selectOneAnswer.firstQuestion.type = 'answerWithText';
  assert.throws(() => inspectQuestions(wrong), /Question type\/group\/slug mismatch/);

  const missing = sample();
  missing.quizSelections[uuid(20)].push(uuid(999));
  assert.throws(() => inspectQuestions(missing), /not present in full bank/);

  const duplicate = sample();
  duplicate.quizSelections[uuid(20)] = [uuid(10), uuid(10)];
  assert.throws(() => inspectQuestions(duplicate), /duplicate selected/);

  const bad = sample();
  bad.questions.selectOneAnswer.firstQuestion.params.restrictions = ['notARealDisability'];
  assert.throws(() => inspectQuestions(bad), /restrictions/);
});

test('YAML is preserved and strict parsing rejects obsolete nested source paths', () => {
  const f = fixture();
  try {
    const source = readQuestionsYaml(f.source);
    assert.equal(source.documentLanguage, 'en');
    assert.ok(source.questions.selectOneAnswer.firstQuestion);
    assert.throws(
      () => runOne(path.join(f.lesson, 'questions/questions.yaml'), '--write', f.root),
      /Expected Lesson-root questions.yaml/,
    );
    const sourceBytes = fs.readFileSync(f.source, 'utf8');
    runOne(f.source, '--write', f.root);
    assert.equal(fs.readFileSync(f.source, 'utf8'), sourceBytes);
  } finally {
    f.remove();
  }
});

test('actual Quiz Section and registry must contain exactly the reviewed subset', () => {
  const f = fixture();
  try {
    const section = path.join(f.lesson, 'sections', 'introQuiz');
    fs.mkdirSync(section, { recursive: true });
    fs.writeFileSync(
      path.join(f.lesson, 'sections', 'index.ts'),
      "import { introQuiz } from './introQuiz';\n" +
        "export const section = { items: { introQuiz }, order: ['introQuiz'] };\n",
    );
    const sectionFile = path.join(section, 'index.ts');
    const writeSelection = id =>
      fs.writeFileSync(
        sectionFile,
        "import { defineQuizSection } from '@svitlo/engine/build';\n" +
          'export const introQuiz = defineQuizSection({\n' +
          "  id: '" +
          uuid(20) +
          "', slug: 'introQuiz', type: 'quiz',\n" +
          "  params: { selection: { mode: 'all', questionIds: ['" +
          id +
          "'] } },\n" +
          '  locale: {}, content: { items: {}, order: [] }\n' +
          '});\n',
      );
    writeSelection(uuid(10));
    const selections = sample().quizSelections;
    assert.deepEqual(verifyQuizSelections(f.lesson, selections), { sections: 1, questionIds: 1 });
    writeSelection(uuid(11));
    assert.throws(() => verifyQuizSelections(f.lesson, selections), /differ from reviewed/);
    writeSelection(uuid(10));
    fs.writeFileSync(
      path.join(f.lesson, 'sections', 'index.ts'),
      "import { introQuiz } from './introQuiz';\nexport const section = { items: {}, order: [] };\n",
    );
    assert.throws(() => verifyQuizSelections(f.lesson, selections), /absent from static Section registry/);
  } finally {
    f.remove();
  }
});
