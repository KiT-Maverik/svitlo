import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { generateQuestionReviewArtifacts } from './generate-question-review-artifacts.mjs';

const lessonId = '26482aec-3c09-57a6-8534-414f649276be';
const uuid = n => '00000000-0000-4000-8000-' + String(n).padStart(12, '0');
const locales = ['uk', 'en', 'pl', 'qm'];
const names = {
  selectOneAnswer: Array.from({length: 7}, (_, i) => 'single' + (i + 1)),
  selectMultipleAnswers: ['multipleOne', 'multipleTwo'],
  matchBlocks: ['matchOne', 'matchTwo'],
};
const base = root => path.join(root, 'content/astronomy/data/lessons/e', lessonId);
function setup(root) {
  const expected = new Map();
  const put = (relative, value) => {
    const file = path.join(base(root), relative);
    fs.mkdirSync(path.dirname(file), {recursive: true});
    fs.writeFileSync(file, value);
    return file;
  };
  let sequence = 100;
  const block = (question, slug) => {
    const id = uuid(++sequence);
    const values = Object.fromEntries(locales.map(locale =>
      [locale, `${locale} actual ${question}/${slug}/${id}`]));
    expected.set(id, values);
    return `defineText({id:'${id}',slug:'${slug}',type:'text',params:{},locale:{value:${JSON.stringify(values)}}})`;
  };
  const group = entries =>
    `{items:{${entries.map(([key, value]) => `${key}:${value}`).join(',')}},order:[${entries.map(([key]) => `'${key}'`).join(',')}]}`;
  const common = (question, extraExplanation = false) => ({
    question: group([['prompt', block(question, 'prompt')]]),
    hint: group([['hintText', block(question, 'hintText')]]),
    explanation: group([['explanation1', block(question, 'explanation1')],
      ...(extraExplanation ? [['explanation2', block(question, 'explanation2')]] : [])]),
  });
  put('constants.ts', "export const languages = ['uk'] as const;\n");
  const rootImports = [], registered = [];
  for (const [type, slugs] of Object.entries(names)) {
    put(`questions/${type}/index.ts`, slugs.map(slug => `export { ${slug} } from './${slug}';`).join('\n') + '\n');
    rootImports.push(`import { ${slugs.join(', ')} } from './${type}';`);
    registered.push(`${type}:{${slugs.join(',')}}`);
    for (const [i, slug] of slugs.entries()) {
      const core = common(slug, type === 'matchBlocks' && i === 1);
      let answerField;
      if (type === 'matchBlocks') {
        const pairs = Array.from({length: i === 0 ? 4 : 2}, (_, j) => {
          const pair = 'pair' + (j + 1);
          return [pair, `{left:${block(slug, pair + 'Left')},right:${block(slug, pair + 'Right')}}`];
        });
        answerField = `pairs:${group(pairs)}`;
      } else {
        const correct = type === 'selectMultipleAnswers' ? 2 : 1;
        const incorrect = type === 'selectMultipleAnswers' ? 2 : 3;
        const values = {
          correct: group(Array.from({length: correct}, (_, j) =>
            ['correct' + (j + 1), block(slug, 'correct' + (j + 1))])),
          incorrect: group(Array.from({length: incorrect}, (_, j) =>
            ['incorrect' + (j + 1), block(slug, 'incorrect' + (j + 1))])),
          distractors: group([]),
        };
        answerField = `answers:{${Object.entries(values).map(([k,v]) => `${k}:${v}`).join(',')}}`;
      }
      const id = uuid(1 + Object.values(names).flat().indexOf(slug));
      put(`questions/${type}/${slug}.ts`,
        `import { define${type[0].toUpperCase() + type.slice(1)}, defineText } from '@svitlo/engine/build';\n` +
        `export const ${slug} = define${type[0].toUpperCase() + type.slice(1)}({` +
        `id:'${id}',slug:'${slug}',type:'${type}',params:{assessmentMethod:'classification',restrictions:[]},` +
        `locale:{},content:{question:${core.question},hint:${core.hint},explanation:${core.explanation},${answerField}}});\n`);
    }
  }
  put('questions/index.ts', rootImports.join('\n') +
    `\nexport const questions={${registered.join(',')}};\n`);
  put('sections/testQuiz/index.ts',
    "import { defineQuizSection } from '@svitlo/engine/build';\nimport { intro } from './intro';\n" +
    "const content={items:{intro},order:['intro']};\n" +
    `export const testQuiz = defineQuizSection({id:'${uuid(95)}',slug:'testQuiz',type:'quiz',` +
    `params:{selection:{mode:'all',questionIds:['${uuid(1)}']}},` +
    `locale:{title:{uk:'Тест',en:'Quiz',pl:'Test',qm:'Sınav'},` +
    `navigationLabel:{uk:'Перевірка',en:'Check',pl:'Sprawdź',qm:'Teşkerüv'}},content});\n`);
  put('sections/testQuiz/intro/index.ts',
    "import { defineMarkdown, readMarkdown } from '@svitlo/engine/build';\n" +
    `export const intro=defineMarkdown({id:'${uuid(96)}',slug:'intro',type:'markdown',` +
    "params:{},locale:{value:readMarkdown(import.meta.url,['uk','en','pl','qm'])}});\n");
  for (const locale of locales) put(`sections/testQuiz/intro/${locale}.md`,
    `# ${locale} full introduction\n\nLocalized paragraph in ${locale}.\n`);
  return {expected, put};
}
function fixture(fn) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-strict-question-'));
  try {
    const {expected, put} = setup(root);
    const manifest = {generated: [], failures: [], sourceCommit: 'f'.repeat(40)};
    const output = path.join(root, '.agent-ci-artifacts');
    const run = (languages = ['en','pl','qm']) => generateQuestionReviewArtifacts({
      root, output, manifest, saveManifest() {}, lessonId, packageName:'content/astronomy', languages,
    });
    return fn({root, expected, put, manifest, output, run});
  } finally {fs.rmSync(root, {recursive: true, force: true});}
}

test('canonical two-level indexes enumerate all 11 mixed Questions, 82 Text values and Quiz fields', () =>
  fixture(({run,manifest,output,expected}) => {
    assert.equal(expected.size, 82);
    run();
    assert.equal(manifest.failures.length, 0);
    assert.equal(manifest.generated.length, 3);
    for (const entry of manifest.generated) {
      assert.equal(entry.questions, 11);
      assert.equal(entry.questionStrings, 82);
      assert.equal(entry.quizStrings, 3);
      assert.equal(entry.quizSections, 1);
      assert.equal(entry.missing, 0);
      assert.equal(entry.reviewReady, true);
      const md = fs.readFileSync(path.join(output,'questions/astronomy/e',lessonId,entry.locale+'.md'),'utf8');
      assert.match(md,/Correct options \(2\):/);
      assert.match(md,/Pair pair1:.*→/);
      assert.match(md,/Type: matchBlocks/);
      assert.match(md,/Type: selectMultipleAnswers/);
      assert.match(md,/Quiz Section \/ testQuiz/);
      for (const [id,values] of expected) {
        assert.ok(md.includes(id), id);
        assert.ok(md.includes(values.uk), id + ' original');
        assert.ok(md.includes(values[entry.locale]), id + ' target');
      }
      assert.ok(md.includes(`# ${entry.locale} full introduction`));
    }
  }));

test('missing type-level export fails the entire requested bank', () =>
  fixture(({root,run,manifest}) => {
    fs.writeFileSync(path.join(base(root),'questions/matchBlocks/index.ts'),
      "export { matchOne } from './matchOne';\n");
    run(['en']);
    assert.equal(manifest.generated.length,0);
    assert.match(manifest.failures[0].error,/Missing canonical export|Question type index/);
  }));

test('legacy root flat file or nested Question entrypoint fails without partial output', () =>
  fixture(({put,run,manifest}) => {
    put('questions/legacyQuestion.ts', '// Old unsupported layout\n');
    run(['pl']);
    assert.equal(manifest.generated.length,0);
    assert.match(manifest.failures[0].error,/Legacy|unregistered/);
  }));

test('missing target language shows MISSING and rejects review readiness, not source content', () =>
  fixture(({root,run,manifest,output}) => {
    const file = path.join(base(root),'questions/selectOneAnswer/single1.ts');
    const original = fs.readFileSync(file,'utf8');
    fs.writeFileSync(file, original.replace(/"qm":"qm actual single1\/prompt\/[^"]+"/, '"qm":""'));
    run(['qm']);
    assert.equal(manifest.generated.length,1);
    assert.equal(manifest.generated[0].reviewReady,false);
    assert.equal(manifest.generated[0].missing,1);
    assert.match(fs.readFileSync(path.join(output,'questions/astronomy/e',lessonId,'qm.md'),'utf8'), /%%MISSING%%/);
  }));