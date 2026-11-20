import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { generateQuestionReviewArtifacts } from './generate-question-review-artifacts.mjs';

const lessonId = 'c042698a-de5b-5055-9e10-ff5621f80ed7';
const names = ['identifyUnsafeOptics', 'replaceRiskyQuickLook', 'classifyCloudObservation',
  'recognizeMakeshiftFilter', 'chooseRecordedProjection'];
const fields = ['prompt', 'hintText', 'explanationText', 'correctChoice',
  'otherChoice1', 'otherChoice2', 'otherChoice3'];
const uuid = n => '00000000-0000-5000-8000-' + String(n).padStart(12, '0');
const sourceRoot = root => path.join(root, 'content/astronomy/data/lessons/7', lessonId);
function write(root, relative, value) {
  const dest = path.join(sourceRoot(root), relative);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, value);
  return dest;
}
function makeFixture(root) {
  write(root, 'constants.ts', "export const languages = ['uk'] as const;\n");
  const registry = names.map(name => `import { ${name} } from './selectOneAnswer/${name}';`).join('\n') +
    '\nexport const questions = { selectOneAnswer: { ' + names.join(', ') + ' } };\n';
  write(root, 'questions/index.ts', registry);
  const expected = new Map();
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const dir = `questions/selectOneAnswer/${name}`;
    const imports = [];
    const items = {};
    for (let j = 0; j < fields.length; j++) {
      const field = fields[j];
      const group = j < 3 ? ['prompt', 'hintText', 'explanationText'][j] : j === 3 ? 'correct' : 'incorrect';
      const folder = j < 3 ? field : group;
      const full = `${dir}/${folder}/${field}/index.ts`;
      const translations = Object.fromEntries(['uk', 'en', 'pl', 'qm'].map(locale =>
        [locale, `${locale} exact value ${i + 1}/${j + 1}`]));
      expected.set(`${name}.${field}`, { id: uuid(100 + i * 10 + j), translations, path: full });
      write(root, full, `import { defineText } from '@svitlo/engine/build';\nexport const ${field} = defineText<"${field}", string>({\n` +
        `  id: '${uuid(100 + i * 10 + j)}', slug: '${field}', type: 'text', params: {},\n` +
        `  locale: { value: ${JSON.stringify(translations)} }\n});\n`);
      imports.push(`import { ${field} } from './${folder}/${field}';`);
      items[field] = field;
    }
    const content = `const content = {
  question: { items: { prompt }, order: ['prompt'] },
  hint: { items: { hintText }, order: ['hintText'] },
  explanation: { items: { explanationText }, order: ['explanationText'] },
  answers: {
    correct: { items: { correctChoice }, order: ['correctChoice'] },
    incorrect: { items: { otherChoice1, otherChoice2, otherChoice3 },
      order: ['otherChoice1', 'otherChoice2', 'otherChoice3'] },
    distractors: { items: {}, order: [] },
  },
};`;
    write(root, `${dir}/index.ts`, "import { defineSelectOneAnswer } from '@svitlo/engine/build';\n" +
      imports.join('\n') + '\n' + content + '\n' +
      `export const ${name} = defineSelectOneAnswer<"${name}", typeof content, string>({\n` +
      `id: '${uuid(i + 1)}', slug: '${name}', type: 'selectOneAnswer',\n` +
      `params: {assessmentMethod: 'classification', restrictions: []}, locale: {}, content });\n`);
  }
  write(root, 'sections/safeSkyChoices/index.ts', "import { defineQuizSection } from '@svitlo/engine/build';\n" +
    "import { quizIntro } from './quizIntro';\nconst content = { items: { quizIntro }, order: ['quizIntro'] };\n" +
    "export const safeSkyChoices = defineQuizSection< 'safeSkyChoices', typeof content.items, string>({\n" +
    `id: '${uuid(90)}', slug: 'safeSkyChoices', type: 'quiz',\n` +
    `params: { selection: {mode: 'all', questionIds: [${names.slice(0, 3).map((_, i) => `'${uuid(i + 1)}'`).join(', ')}], shuffle: false} },\n` +
    "locale: { title: {uk: 'Заголовок', en: 'Heading', pl: 'Nagłówek', qm: 'Başlıq'},\n" +
    "navigationLabel: {uk: 'Навігація', en: 'Navigation', pl: 'Nawigacja', qm: 'Yol'} }, content });\n");
  write(root, 'sections/safeSkyChoices/quizIntro/index.ts', "import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';\n" +
    `export const quizIntro = defineMarkdown({id: '${uuid(91)}', slug:'quizIntro', type:'markdown',\n` +
    " params:{}, locale: { value: readMarkdown(import.meta.url, ['uk','en','pl','qm']) }});\n");
  for (const locale of ['uk', 'en', 'pl', 'qm']) write(root,
    `sections/safeSkyChoices/quizIntro/${locale}.md`, `# ${locale} quiz introduction\n\n*${locale} accessible guidance*\n`);
  return expected;
}
function fixture(callback) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-modular-qreview-'));
  try {
    const expected = makeFixture(root);
    const output = path.join(root, '.agent-ci-artifacts');
    const manifest = { generated: [], failures: [], sourceCommit: '1'.repeat(40) };
    const run = (languages = ['en', 'pl', 'qm']) => generateQuestionReviewArtifacts({
      root, output, packageName: 'content/astronomy', lessonId, languages, manifest, saveManifest() {},
    });
    return callback({ root, output, manifest, expected, run });
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
}

test('modular bank preserves all five Questions, 35 Text fields and three Quiz fields for every target locale', () =>
  fixture(({ run, manifest, output, expected }) => {
    run();
    assert.equal(manifest.failures.length, 0);
    assert.equal(manifest.generated.length, 3);
    for (const entry of manifest.generated) {
      assert.equal(entry.questions, 5);
      assert.equal(entry.questionStrings, 35);
      assert.equal(entry.quizSections, 1);
      assert.equal(entry.quizStrings, 3);
      assert.equal(entry.strings, 38);
      assert.equal(entry.missing, 0);
      assert.equal(entry.reviewReady, true);
      const md = fs.readFileSync(path.join(output, 'questions/astronomy/7', lessonId, entry.locale + '.md'), 'utf8');
      for (const [key, field] of expected) {
        assert.ok(md.includes(field.id), key);
        assert.ok(md.includes(field.translations.uk), key + ' original');
        assert.ok(md.includes(field.translations[entry.locale]), key + ' target');
        assert.ok(md.includes(field.path), key + ' path');
      }
      assert.match(md, /Correct option: correctChoice/);
      assert.match(md, /Quiz Section \/ safeSkyChoices/);
      assert.match(md, /# uk quiz introduction/);
      assert.match(md, new RegExp('# ' + entry.locale + ' quiz introduction'));
      assert.match(md, /quizIntro\/index\.ts/);
      assert.match(md, /quizIntro\/uk\.md/);
    }
  }));

test('missing translation yields visible marker and reviewReady=false (without fallback)', () =>
  fixture(({ root, run, manifest, output }) => {
    const file = sourceRoot(root) + '/questions/selectOneAnswer/identifyUnsafeOptics/prompt/prompt/index.ts';
    const before = fs.readFileSync(file, 'utf8');
    fs.writeFileSync(file, before.replace('"qm":"qm exact value 1/1"', '"qm":""'));
    run(['qm']);
    assert.equal(manifest.generated[0].missing, 1);
    assert.equal(manifest.generated[0].reviewReady, false);
    assert.match(fs.readFileSync(path.join(output, 'questions/astronomy/7', lessonId, 'qm.md'), 'utf8'), /%%MISSING%%/);
  }));

for (const [name, mutate, pattern] of [
  ['broken imported Text module', root => fs.rmSync(sourceRoot(root) + '/questions/selectOneAnswer/identifyUnsafeOptics/prompt/prompt/index.ts'), /Unresolved canonical import/],
  ['missing Quiz Markdown', root => fs.rmSync(sourceRoot(root) + '/sections/safeSkyChoices/quizIntro/pl.md'), /Unresolved canonical import/],
  ['duplicate ContentBlock UUID', root => {
    const filename = sourceRoot(root) + '/questions/selectOneAnswer/identifyUnsafeOptics/hintText/hintText/index.ts';
    const data = fs.readFileSync(filename, 'utf8');
    fs.writeFileSync(filename, data.replace(uuid(101), uuid(100)));
  }, /Duplicate UUID/],
  ['invalid answer order', root => {
    const filename = sourceRoot(root) + '/questions/selectOneAnswer/identifyUnsafeOptics/index.ts';
    fs.writeFileSync(filename, fs.readFileSync(filename, 'utf8').replace("order: ['correctChoice']", 'order: []'));
  }, /Invalid ordered Question blocks/],
  ['unsafe imported runtime', root => {
    const filename = sourceRoot(root) + '/questions/selectOneAnswer/identifyUnsafeOptics/index.ts';
    fs.writeFileSync(filename, fs.readFileSync(filename, 'utf8').replace("./prompt/prompt'", "../../../outside'"));
  }, /Unsupported runtime import|Unresolved canonical import/],
]) {
  test('fail-closed: ' + name, () => fixture(({ root, run, manifest }) => {
    mutate(root);
    run(['pl']);
    assert.equal(manifest.generated.length, 0);
    assert.equal(manifest.failures.length, 1);
    assert.match(manifest.failures[0].error, pattern);
  }));
}

test('existing flat Question modules and canonical Object.values Quiz selections are statically resolved', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-flat-qreview-'));
  const flatLesson = 'd3048d21-8690-5255-b62c-984c69ac272c';
  const base = path.join(root, 'content/playground/data/lessons/c', flatLesson);
  const put = (rel, content) => {
    const filename = path.join(base, rel);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, content);
  };
  try {
    put('questions/index.ts', "import { questionOne } from './questionOne';\nexport const someQuestions = {selectOneAnswer: {questionOne}};\n");
    const block = (slug, id) => `defineText({id:'${uuid(id)}',slug:'${slug}',type:'text',params:{},locale:{value:{en:'${slug} English',kk:'${slug} Kazakh'}}})`;
    const group = (slug, id) => `{items:{${slug}: ${block(slug, id)}},order:['${slug}']}`;
    put('questions/questionOne.ts', "import { defineSelectOneAnswer, defineText } from '@svitlo/engine/build';\n" +
      `export const questionOne = defineSelectOneAnswer({id:'${uuid(1)}',slug:'questionOne',type:'selectOneAnswer',params:{assessmentMethod:'retrieval'},locale:{},content:{` +
      `question:${group('question', 2)},explanation:${group('explanation', 3)},answers:{correct:${group('correct', 4)},` +
      `distractors:{items:{},order:[]},incorrect:${group('incorrect', 5)}}}});`);
    put('sections/quiz/index.ts', "import { defineQuizSection } from '@svitlo/engine/build';\n" +
      "import { someQuestions } from '../../questions';\n" +
      "const title = {en:'Quiz',kk:'Test'};\nexport const quizSection = defineQuizSection({" +
      `id:'${uuid(6)}',slug:'quiz',type:'quiz',params:{selection:{mode:'all',questionIds:Object.values(someQuestions.selectOneAnswer).map(question => question.id)}},` +
      "locale:{title,navigationLabel:title},content:{items:{},order:[]}});");
    const output = path.join(root, '.agent-ci-artifacts');
    const manifest = { generated: [], failures: [] };
    generateQuestionReviewArtifacts({root, output, manifest, saveManifest() {}, packageName:'content/playground',
      lessonId:flatLesson, languages:['kk']});
    assert.deepEqual(manifest.failures, []);
    assert.equal(manifest.generated[0].questionStrings, 4);
    assert.equal(manifest.generated[0].quizStrings, 2);
    assert.equal(manifest.generated[0].reviewReady, true);
  } finally { fs.rmSync(root, {recursive:true,force:true}); }
});