import assert from 'node:assert/strict';
import { test } from 'node:test';

import ts from 'typescript';

import { materializeCheckpointAnswer } from '../checkpointAnswer/materializeCheckpointAnswer';
import { materializeCheckpointItem } from '../checkpointItem/materializeCheckpointItem';
import { materializeScene } from '../scene/materializeScene';
import { materializeCheckpoint } from './materializeCheckpoint';

const id = (n: number) => '40000000-0000-4000-8000-' + String(n).padStart(12, '0');
const text = (slug: string, n: number) => ({
  id: id(n),
  slug,
  type: 'text' as const,
  params: {},
  locale: { value: 'Answer' },
});
const example = () => {
  const scene = {
    id: id(6),
    slug: 'practiceScene',
    type: 'scene' as const,
    params: {},
    locale: { value: { title: { uk: 'Практика', en: 'Practice' } } },
  };
  const answer = {
    id: id(4),
    slug: 'answer',
    type: 'checkpointAnswer' as const,
    children: ['practiceScene', 'explanation'],
    practiceScene: scene,
    explanation: text('explanation', 8),
  };
  const item = {
    id: id(2),
    slug: 'first',
    type: 'checkpointItem' as const,
    question: text('prompt', 3),
    answer,
    check: true as const,
  };
  return {
    id: id(1),
    slug: 'review',
    type: 'checkpoint' as const,
    params: { requireCompletion: true },
    locale: { title: { uk: 'Перевір себе', en: 'Check yourself' } },
    children: ['first'],
    first: item,
  };
};
const primitive = (config: { slug: string }, directory: string) => ({
  exportName: config.slug,
  files: [
    { path: directory + '/index.ts', content: 'export const ' + config.slug + ' = {};\n', kind: 'typescript' as const },
  ],
  diagnostics: [],
});
function materializeTree() {
  return materializeCheckpoint(example(), {
    directory: 'sections/review',
    documentLanguage: 'uk',
    languagesImport: '../../languages',
    renderItem: (item, directory) =>
      materializeCheckpointItem(item, {
        directory,
        documentLanguage: 'uk',
        languagesImport: '../../../languages',
        renderQuestion: primitive,
        renderAnswer: (answer, answerDir) =>
          materializeCheckpointAnswer(answer, {
            directory: answerDir,
            documentLanguage: 'uk',
            languagesImport: '../../../../languages',
            renderChild: (child, childDir) => {
              return child.type === 'scene'
                ? materializeScene(child, {
                    directory: childDir,
                    documentLanguage: 'uk',
                    languagesImport: '../../../../../languages',
                    production: { specification: '# Scene specification\n\nApproved prompt.\n' },
                    registered: false,
                  })
                : primitive(child, childDir);
            },
          }),
      }),
  });
}

test('Checkpoint materializes Item → Text + Answer → Primitive Scene/Text', () => {
  const result = materializeTree();
  assert.deepEqual(result, materializeTree());
  const paths = result.files.map(file => file.path);
  for (const suffix of [
    'first/index.ts',
    'first/question/index.ts',
    'first/answer/index.ts',
    'first/answer/practiceScene/index.ts',
    'first/answer/explanation/index.ts',
    'index.ts',
  ])
    assert.ok(paths.includes('sections/review/' + suffix), 'missing ' + suffix);
  const sceneSource = result.files.find(file => file.path === 'sections/review/first/answer/practiceScene/index.ts');
  assert.ok(sceneSource, 'nested Scene Config source must be emitted');
  assert.match(sceneSource.content, /# Scene specification/);
  assert.match(sceneSource.content, /Approved prompt\./);
  assert.match(sceneSource.content, /TODO \(BLOCKER\): Remove the temporary Scene specification/);
  assert.ok(!paths.some(path => path.endsWith('/specification.md')), 'Scene brief must stay inline');
  assert.equal(paths.filter(path => path.includes('/content/items/')).length, 0);
  assert.equal(paths.filter(path => path.includes('/slides/items/')).length, 0);
  const code = result.files.at(-1)!.content;
  assert.match(code, /defineCheckpoint<"review", typeof __placements, typeof languages>/);
  assert.match(code, /"uk": "Перевір себе"/);
  assert.doesNotMatch(code, /"en": "Check yourself"/);
  assert.equal(
    result.diagnostics.some(d => d.code === 'pending-scene'),
    true,
  );
  assert.equal(new Set(paths).size, paths.length, 'each file belongs to one materializer');
  for (const file of result.files.filter(file => file.kind === 'typescript')) {
    assert.equal(syntaxErrorCount(file.content, file.path), 0, file.path);
  }
});

test('Checkpoint requires exact active order, correct item type and stable child UUIDs', () => {
  const input = example();
  const options = { directory: '', documentLanguage: 'uk', languagesImport: './languages', renderItem: primitive };
  assert.throws(() => materializeCheckpoint({ ...input, children: [] }, options), /exactly once/);
  assert.throws(
    () =>
      materializeCheckpoint(
        {
          ...input,
          children: ['first', 'bad'],
          bad: { ...input.first, type: 'text' as never },
        },
        options,
      ),
    /invalid kind/,
  );
  assert.throws(
    () => materializeCheckpoint({ ...input, first: { ...input.first, id: input.id } }, options),
    /duplicate UUID/,
  );
  assert.throws(() => materializeCheckpoint(input, { ...options, directory: '../escape' }), /unsafe source/);
});

test('Checkpoint rejects disabled authored child values rather than publishing tombstones', () => {
  const input = example();
  const options = { directory: '', documentLanguage: 'uk', languagesImport: './languages', renderItem: primitive };
  assert.throws(() => materializeCheckpoint({ ...input, first: false as never }, options), /disabled/);
});

test('Checkpoint rejects a delegated item that writes into another module', () => {
  const source = example();
  assert.throws(
    () =>
      materializeCheckpoint(source, {
        directory: 'sections/review',
        documentLanguage: 'uk',
        languagesImport: '../../languages',
        renderItem: item => ({
          exportName: item.slug,
          files: [{ path: 'sections/review/index.ts', content: 'unowned', kind: 'typescript' as const }],
          diagnostics: [],
        }),
      }),
    /outside its owned directory/,
  );
});

/** Public TypeScript API: syntactic diagnostics without relying on internal SourceFile fields. */
function syntaxErrorCount(source: string, fileName = 'index.ts'): number {
  const result = ts.transpileModule(source, {
    fileName,
    reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022 },
  });
  return (result.diagnostics ?? []).filter(d => d.category === ts.DiagnosticCategory.Error).length;
}
