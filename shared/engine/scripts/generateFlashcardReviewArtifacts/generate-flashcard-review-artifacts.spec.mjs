import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { generateFlashcardReviewArtifacts } from './generate-flashcard-review-artifacts.mjs';

const id = 'bb75647f-203d-481a-a1c7-4d331c779d34';
const sha = 'a'.repeat(40);
const original = [
  '// Lesson UUID: ' + id + '; documentLanguage: en',
  "import { defineFlashcard, defineFlashcardSide, defineText } from '@svitlo/engine/build';",
  'const flashcard_0 = defineFlashcard({',
  '  ...{"id":"bb75647f-203d-481a-a1c7-4d331c779d35","slug":"hello","parameters":{',
  '    "flags":[{"type":"acronym","value":{"en":"ABC","uk":"АБВ"}}]}},',
  '  content: {',
  '    front: defineFlashcardSide({items: {"question": defineText({',
  '      id: "bb75647f-203d-481a-a1c7-4d331c779d36", slug: "question", type: "text", params: {},',
  '      locale: {value: {en: "Hello", uk: "Привіт"}}',
  '    })}, order: ["question"]}),',
  '    back: defineFlashcardSide({items: {"answer": defineText({',
  '      id: "bb75647f-203d-481a-a1c7-4d331c779d37", slug: "answer", type: "text", params: {},',
  '      locale: {value: {en: "Greeting", uk: "Вітання"}}',
  '    })}, order: ["answer"]})',
  '  }',
  '});',
  'export const flashcards = {items: {"hello": flashcard_0}};',
  '',
].join('\n');
function fixture({ missing = false, dynamic = false } = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-flashcard-locales-'));
  const directory = path.join(root, 'content/playground/data/lessons', id.at(-1), id, 'flashcards');
  fs.mkdirSync(directory, { recursive: true });
  let source = original;
  if (missing) source = source.replace('uk: "Привіт"', '');
  if (dynamic) source = source.replace('en: "Greeting"', 'en: dynamicValue');
  fs.writeFileSync(path.join(directory, 'index.ts'), source);
  const manifest = { sourceCommit: sha, generated: [], failures: [] };
  const output = path.join(root, '.agent-ci-artifacts');
  const run = () => generateFlashcardReviewArtifacts({
    root, output, manifest, saveManifest: () => {},
    packageName: 'content/playground', lessonId: id, languages: ['uk'],
  });
  return { root, directory, manifest, output, run };
}
test('one bounded Flashcard bank reference includes both sides, flags and pinned source links', () => {
  const state = fixture();
  try {
    state.run();
    assert.deepEqual(state.manifest.failures, []);
    assert.equal(state.manifest.generated.length, 1);
    const entry = state.manifest.generated[0];
    assert.equal(entry.flashcards, 1);
    assert.equal(entry.reviewReady, true);
    assert.equal(entry.missing, 0);
    assert.equal(entry.strings, 3);
    const source = fs.readFileSync(path.join(state.output, entry.path.slice('.agent-ci-artifacts/'.length)), 'utf8');
    assert.match(source, /Привіт/);
    assert.match(source, /Вітання/);
    assert.match(source, /АБВ/);
    assert.match(source, /content\/front\/question/);
    assert.match(source, /content\/back\/answer/);
    assert.match(source, new RegExp(sha));
    assert(!source.includes('%%MISSING%%'));
  } finally {
    fs.rmSync(state.root, { recursive: true, force: true });
  }
});
test('missing translated text marks only the requested bank locale as not review-ready', () => {
  const state = fixture({ missing: true });
  try {
    state.run();
    assert.equal(state.manifest.generated.length, 1);
    assert.equal(state.manifest.generated[0].missing, 1);
    assert.equal(state.manifest.generated[0].reviewReady, false);
    const md = fs.readFileSync(path.join(state.output, state.manifest.generated[0].path.slice('.agent-ci-artifacts/'.length)), 'utf8');
    assert.match(md, /%%MISSING%%/);
  } finally {
    fs.rmSync(state.root, { recursive: true, force: true });
  }
});
test('dynamic authoring expressions fail closed without emitting partial references', () => {
  const state = fixture({ dynamic: true });
  try {
    state.run();
    assert.equal(state.manifest.generated.length, 0);
    assert.equal(state.manifest.failures.length, 1);
    assert.match(state.manifest.failures[0].error, /Non-static Flashcard expression|Unknown or cyclic/);
  } finally {
    fs.rmSync(state.root, { recursive: true, force: true });
  }
});
test('Flashcard review refuses symlinked bank source', () => {
  const state = fixture();
  try {
    const source = path.join(state.directory, 'index.ts');
    fs.unlinkSync(source);
    const target = path.join(state.root, 'external.ts');
    fs.writeFileSync(target, original);
    fs.symlinkSync(target, source);
    state.run();
    assert.equal(state.manifest.generated.length, 0);
    assert.match(state.manifest.failures[0].error, /Symlinked Flashcard source/);
  } finally {
    fs.rmSync(state.root, { recursive: true, force: true });
  }
});
