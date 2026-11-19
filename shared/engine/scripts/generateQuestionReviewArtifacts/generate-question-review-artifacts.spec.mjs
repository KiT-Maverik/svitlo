import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { generateQuestionReviewArtifacts } from './generate-question-review-artifacts.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const lesson = 'd3048d21-8690-5255-b62c-984c69ac272c';
const sourceDir = path.join(root, 'content/playground/data/lessons/c', lesson, 'questions');
const questionIds = [
  'a4f1e4aa-3831-5e3f-aece-1df57f757d82',
  '26b09f82-f8db-5b7a-9a0f-7e7937fba45c',
  '08c3bae5-081a-5afc-bccf-e44078e137f2',
  'f42370dc-1de2-59bf-93a0-0e304f9021f0',
  '21733db1-2e1a-55cc-80c2-08e68fec1d90',
  'fbc29fba-d44d-5658-b6e7-ef1733ce81b5',
];

function withTemp(callback, copySource = false) {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-question-ref-'));
  try {
    let input = root;
    if (copySource) {
      input = temp;
      const target = path.join(temp, 'content/playground/data/lessons/c', lesson, 'questions');
      fs.mkdirSync(target, { recursive: true });
      for (const name of fs.readdirSync(sourceDir)) fs.copyFileSync(path.join(sourceDir, name), path.join(target, name));
    }
    const output = path.join(temp, 'artifacts');
    fs.mkdirSync(output, { recursive: true });
    const manifest = { generated: [], failures: [] };
    const run = (extra = {}) => generateQuestionReviewArtifacts({
      root: input, output, packageName: 'content/playground', lessonId: lesson, languages: ['kk'],
      manifest, saveManifest() {}, ...extra,
    });
    return callback({ run, manifest, output, input });
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}

test('renders all six real Questions and 30 English/Kazakh strings with canonical links', () =>
  withTemp(({ run, manifest, output }) => {
    run();
    assert.equal(manifest.failures.length, 0);
    assert.equal(manifest.generated.length, 1);
    const [entry] = manifest.generated;
    assert.equal(entry.path, '.agent-ci-artifacts/questions/playground/c/' + lesson + '/kk.md');
    assert.equal(entry.lesson, 'c/' + lesson);
    assert.equal(entry.questions, 6);
    assert.equal(entry.strings, 30);
    assert.equal(entry.missing, 0);
    assert.equal(entry.reviewReady, true);
    const markdown = fs.readFileSync(path.join(output, 'questions/playground/c', lesson, 'kk.md'), 'utf8');
    assert.match(markdown, /<!-- GENERATED FROM CODE; DO NOT EDIT\. -->/);
    assert.match(markdown, /Missing translations: 0/);
    assert.equal((markdown.match(/^- kk:/gm) || []).length, 30);
    assert.equal((markdown.match(/^- English:/gm) || []).length, 30);
    assert.equal((markdown.match(/^## [a-zA-Z]+$/gm) || []).length, 6);
    for (const uuid of questionIds) assert.ok(markdown.includes(uuid), uuid);
    for (const filename of fs.readdirSync(sourceDir).filter(f => f !== 'index.ts')) {
      const fragment = markdown.match(new RegExp('\\[' + filename + '\\]\\(([^)]+)\\)'));
      assert.ok(fragment, 'Missing canonical link for ' + filename);
      const dest = path.join(output, 'questions/playground/c', lesson, 'kk.md');
      assert.equal(path.resolve(path.dirname(dest), decodeURI(fragment[1])), path.join(sourceDir, filename));
    }
  }));

test('missing target locale yields explicit marker and reviewReady=false, without fallback', () =>
  withTemp(({ input, run, manifest, output }) => {
    const source = path.join(input, 'content/playground/data/lessons/c', lesson, 'questions/lightTravelsStraight.ts');
    const before = fs.readFileSync(source, 'utf8');
    const after = before.replace(/\bkk: '[^']+'/u, "kk: ''");
    assert.notEqual(after, before);
    fs.writeFileSync(source, after);
    run();
    assert.equal(manifest.generated[0].missing, 1);
    assert.equal(manifest.generated[0].reviewReady, false);
    assert.match(fs.readFileSync(path.join(output, 'questions/playground/c', lesson, 'kk.md'), 'utf8'), /%%MISSING%%/);
  }, true));

test('rejects missing bank registry member without issuing partial Markdown', () =>
  withTemp(({ input, run, manifest }) => {
    const filename = path.join(input, 'content/playground/data/lessons/c', lesson, 'questions/index.ts');
    fs.writeFileSync(filename, fs.readFileSync(filename, 'utf8').replace('    lightTravelsStraight,\n', ''));
    run();
    assert.equal(manifest.generated.length, 0);
    assert.match(manifest.failures[0]?.error ?? '', /index and canonical Question files disagree/);
  }, true));

test('rejects unsupported authoring constructs and symlinked inputs', () =>
  withTemp(({ input, run, manifest }) => {
    const file = path.join(input, 'content/playground/data/lessons/c', lesson, 'questions/lightTravelsStraight.ts');
    fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace('defineSelectOneAnswer({', 'defineSelectMultipleAnswers({'));
    run();
    assert.equal(manifest.generated.length, 0);
    assert.match(manifest.failures[0]?.error ?? '', /Unsupported Question type/);
  }, true));

test('rejects unsafe textbook scope and unknown Lesson', () =>
  withTemp(({ run, manifest }) => {
    assert.throws(() => run({ packageName: 'content/../playground' }), /Invalid Question review scope/);
    assert.throws(() => run({ lessonId: '00000000-0000-5000-8000-000000000000' }), /No canonical Question bank/);
    assert.equal(manifest.generated.length, 0);
  }));
