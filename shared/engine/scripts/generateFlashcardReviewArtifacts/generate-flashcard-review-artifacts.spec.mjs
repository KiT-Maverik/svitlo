import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
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
  '    front: defineFlashcardSide({children: ["question"], question: defineText({',
  '      id: "bb75647f-203d-481a-a1c7-4d331c779d36", slug: "question", type: "text", params: {},',
  '      locale: {value: {en: "Hello", uk: "Привіт"}}',
  '    })}),',
  '    back: defineFlashcardSide({children: ["answer"], answer: defineText({',
  '      id: "bb75647f-203d-481a-a1c7-4d331c779d37", slug: "answer", type: "text", params: {},',
  '      locale: {value: {en: "Greeting", uk: "Вітання"}}',
  '    })})',
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
  const run = () =>
    generateFlashcardReviewArtifacts({
      root,
      output,
      manifest,
      saveManifest: () => {},
      packageName: 'content/playground',
      lessonId: id,
      languages: ['uk'],
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
    const source = fs.readFileSync(path.join(state.output, entry.path), 'utf8');
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
    const md = fs.readFileSync(path.join(state.output, state.manifest.generated[0].path), 'utf8');
    assert.match(md, /%%MISSING%%/);
  } finally {
    fs.rmSync(state.root, { recursive: true, force: true });
  }
});
test('retired items/order and orphan child slugs cannot produce review-ready Flashcards', () => {
  for (const invalid of ['order: ["question"]', 'children: ["unknown"]']) {
    const state = fixture();
    try {
      const source = path.join(state.directory, 'index.ts');
      fs.writeFileSync(source, fs.readFileSync(source, 'utf8').replace('children: ["question"]', invalid));
      state.run();
      assert.equal(state.manifest.generated.length, 0);
      assert.equal(state.manifest.failures.length, 1);
      assert.match(state.manifest.failures[0].error, /Invalid ordered Flashcard hello\/front/);
    } finally {
      fs.rmSync(state.root, { recursive: true, force: true });
    }
  }
});

test('dynamic authoring expressions fail closed without emitting partial references', () => {
  const state = fixture({ dynamic: true });
  try {
    state.run();
    assert.equal(state.manifest.generated.length, 0);
    assert.equal(state.manifest.failures.length, 1);
    assert.match(
      state.manifest.failures[0].error,
      /Non-static Flashcard expression|Unknown Flashcard source reference|Unknown or cyclic/,
    );
  } finally {
    fs.rmSync(state.root, { recursive: true, force: true });
  }
});
test('invariant Flashcard flag and learner text remain visible for linguistic review', () => {
  const state = fixture();
  try {
    const source = path.join(state.directory, 'index.ts');
    fs.writeFileSync(
      source,
      fs
        .readFileSync(source, 'utf8')
        .replace('"value":{"en":"ABC","uk":"АБВ"}', '"value":"ABC"')
        .replace('value: {en: "Greeting", uk: "Вітання"}', 'value: "Greeting"'),
    );
    state.run();
    assert.equal(state.manifest.failures.length, 0);
    assert.equal(state.manifest.generated[0].strings, 3);
    const markdown = fs.readFileSync(path.join(state.output, state.manifest.generated[0].path), 'utf8');
    assert.match(markdown, /Invariant authored copy.*ABC/);
    assert.match(markdown, /Invariant authored copy.*Greeting/);
    assert.match(markdown, /content\/back\/answer\/locale\/value/);
    assert.match(markdown, /parameters\/flags\[0\]\/value/);
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

const REAL_LESSON = 'd3048d21-8690-5255-b62c-984c69ac272c';
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const REAL_LESSON_ROOT = path.join(REPO_ROOT, 'content/playground/data/lessons', REAL_LESSON.at(-1), REAL_LESSON);
const QUESTION_FILES = ['lightTravelsStraight', 'fastestMedium', 'opaqueObjectShadow'];

test('actual authored Playground bank resolves all reused Question fronts and backs with pinned source links', () => {
  const output = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-real-flashcard-review-'));
  const manifest = { sourceCommit: sha, generated: [], failures: [] };
  try {
    generateFlashcardReviewArtifacts({
      root: REPO_ROOT,
      output,
      manifest,
      saveManifest: () => {},
      packageName: 'content/playground',
      lessonId: REAL_LESSON,
      languages: ['uk'],
    });
    assert.deepEqual(manifest.failures, []);
    assert.equal(manifest.generated.length, 1);
    const entry = manifest.generated[0];
    assert.equal(entry.reviewReady, true);
    assert.equal(entry.flashcards, 3);
    assert.equal(entry.strings, 6, 'three cards with localized fronts and backs');
    assert.equal(entry.missing, 0);
    const markdown = fs.readFileSync(path.join(output, entry.path), 'utf8');
    assert.equal((markdown.match(/^## .*?\([0-9a-f-]{36}\)$/gm) ?? []).length, 3);
    assert.equal((markdown.match(/^### front \(/gm) ?? []).length, 3);
    assert.equal((markdown.match(/^### back \(/gm) ?? []).length, 3);
    assert.match(markdown, /How does light travel in a uniform transparent medium\?/);
    assert.match(markdown, /Як поширюється світло в прозорому однорідному середовищі\?/);
    assert.match(markdown, /In a straight line\./);
    assert.match(markdown, /Прямолінійно\./);
    assert.match(markdown, /Where does light travel fastest/);
    assert.match(markdown, /Де світло поширюється найшвидше/);
    assert.match(markdown, /opaqueObjectShadowFlashcard/);
    assert.match(markdown, /Source SHA: a{40}/);
    for (const question of QUESTION_FILES) {
      assert.match(markdown, new RegExp('questions/' + question + '\\.ts'));
    }
    assert(!markdown.includes('%%MISSING%%'));
    assert(!markdown.includes('### hint ('), 'do not invent absent hint ContentBlocks');
    assert(!markdown.includes('parameters/flags'), 'do not invent absent flags');
    assert.equal((markdown.match(/Referenced authoring source:/g) ?? []).length, QUESTION_FILES.length);
  } finally {
    fs.rmSync(output, { recursive: true, force: true });
  }
});

test('copied real bank marks missing imported Question locale as not review-ready', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-real-flashcard-missing-'));
  const lessonRoot = path.join(root, 'content/playground/data/lessons', REAL_LESSON.at(-1), REAL_LESSON);
  const bankDir = path.join(lessonRoot, 'flashcards');
  const questionsDir = path.join(lessonRoot, 'questions');
  const output = path.join(root, '.agent-ci-artifacts');
  const manifest = { sourceCommit: sha, generated: [], failures: [] };
  try {
    fs.mkdirSync(bankDir, { recursive: true });
    fs.mkdirSync(questionsDir, { recursive: true });
    fs.copyFileSync(path.join(REAL_LESSON_ROOT, 'flashcards/index.ts'), path.join(bankDir, 'index.ts'));
    for (const name of QUESTION_FILES) {
      fs.copyFileSync(path.join(REAL_LESSON_ROOT, 'questions', name + '.ts'), path.join(questionsDir, name + '.ts'));
    }
    const target = path.join(questionsDir, 'lightTravelsStraight.ts');
    const source = fs.readFileSync(target, 'utf8');
    const incomplete = source.replace("uk: 'Як поширюється світло в прозорому однорідному середовищі?',", '');
    assert.notEqual(incomplete, source, 'test uses actual authored source, not synthetic text');
    fs.writeFileSync(target, incomplete);
    generateFlashcardReviewArtifacts({
      root,
      output,
      manifest,
      saveManifest: () => {},
      packageName: 'content/playground',
      lessonId: REAL_LESSON,
      languages: ['uk'],
    });
    assert.deepEqual(manifest.failures, []);
    assert.equal(manifest.generated.length, 1);
    assert.equal(manifest.generated[0].flashcards, 3);
    assert.equal(manifest.generated[0].missing, 1);
    assert.equal(manifest.generated[0].reviewReady, false);
    const markdown = fs.readFileSync(path.join(output, manifest.generated[0].path), 'utf8');
    assert.match(markdown, /%%MISSING%%/);
    assert.match(markdown, /Source SHA: a{40}/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('unresolvable Question imports cannot yield review-ready Flashcard output', () => {
  const state = fixture();
  try {
    const file = path.join(state.directory, 'index.ts');
    const source = fs.readFileSync(file, 'utf8');
    fs.writeFileSync(
      file,
      source.replace(
        "import { defineFlashcard, defineFlashcardSide, defineText } from '@svitlo/engine/build';",
        "import { defineFlashcard, defineFlashcardSide, defineText } from '@svitlo/engine/build';\n" +
          "import { stolen } from '../../../../unowned/question';",
      ),
    );
    state.run();
    assert.equal(state.manifest.generated.length, 0);
    assert.equal(state.manifest.failures.length, 1);
    assert.match(
      state.manifest.failures[0].error,
      /Missing or ambiguous Flashcard import|Unsafe Flashcard source path/,
    );
  } finally {
    fs.rmSync(state.root, { recursive: true, force: true });
  }
});

test('cyclic named Question re-exports fail closed without reading partial card content', () => {
  const state = fixture();
  try {
    const file = path.join(state.directory, 'index.ts');
    const source = fs.readFileSync(file, 'utf8');
    assert(source.includes('locale: {value: {en: "Hello", uk: "Привіт"}}'));
    fs.writeFileSync(
      file,
      source
        .replace(
          "import { defineFlashcard, defineFlashcardSide, defineText } from '@svitlo/engine/build';",
          "import { defineFlashcard, defineFlashcardSide, defineText } from '@svitlo/engine/build';\n" +
            "import { value } from './a';",
        )
        .replace('locale: {value: {en: "Hello", uk: "Привіт"}}', 'locale: value'),
    );
    fs.writeFileSync(path.join(state.directory, 'a.ts'), "export { value } from './b';\n");
    fs.writeFileSync(path.join(state.directory, 'b.ts'), "export { value } from './a';\n");
    state.run();
    assert.equal(state.manifest.generated.length, 0);
    assert.equal(state.manifest.failures.length, 1);
    assert.match(state.manifest.failures[0].error, /Cyclic Flashcard re-export/);
  } finally {
    fs.rmSync(state.root, { recursive: true, force: true });
  }
});
