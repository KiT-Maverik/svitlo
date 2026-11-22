import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';

import { materializeCheckpoint } from './materializeCheckpoint';
import { materializeCheckpointItem } from '../checkpointItem/materializeCheckpointItem';
import { materializeCheckpointAnswer } from '../checkpointAnswer/materializeCheckpointAnswer';
import { materializeCarousel } from '../carousel/materializeCarousel';
import { materializeScene } from '../scene/materializeScene';

const id = (n: number) => '40000000-0000-4000-8000-' + String(n).padStart(12, '0');
const text = (slug: string, n: number) => ({ id: id(n), slug, type: 'text' as const, params: {}, locale: { value: 'Answer' } });
const example = () => {
  const scene = { id: id(6), slug: 'practiceScene', type: 'scene' as const, params: {}, locale: { value: { title: { uk: 'Практика', en: 'Practice' } } } };
  const image = { id: id(7), slug: 'diagram', type: 'image' as const, params: { fill: true, aspectRatio: 1.5 }, locale: { fileName: 'verified.webp', alt: 'Diagram' } };
  const carousel = { id: id(5), slug: 'slides', type: 'carousel' as const, params: {}, locale: {}, slides: { items: { diagram: image, practiceScene: scene }, order: ['diagram', 'practiceScene'] } };
  const answer = { id: id(4), slug: 'answer', type: 'checkpointAnswer' as const, content: { items: { slides: carousel, explanation: text('explanation', 8) }, order: ['slides', 'explanation'] } };
  const item = { id: id(2), slug: 'first', type: 'checkpointItem' as const, question: text('prompt', 3), answer, check: true as const };
  return { id: id(1), slug: 'review', type: 'checkpoint' as const, params: { requireCompletion: true }, locale: { title: { uk: 'Перевір себе', en: 'Check yourself' } }, content: { items: { first: item }, order: ['first'] } };
};
const primitive = (config: { slug: string }, directory: string) => ({
  exportName: config.slug,
  files: [{ path: directory + '/index.ts', content: 'export const ' + config.slug + ' = {};\n', kind: 'typescript' as const }],
  diagnostics: [],
});
function materializeTree() {
  return materializeCheckpoint(example(), {
    directory: 'sections/review',
    documentLanguage: 'uk',
    languagesImport: '../../languages',
    renderItem: (item, directory) => materializeCheckpointItem(item, {
      directory, documentLanguage: 'uk', languagesImport: '../../../languages',
      renderQuestion: primitive,
      renderAnswer: (answer, answerDir) => materializeCheckpointAnswer(answer, {
        directory: answerDir, documentLanguage: 'uk', languagesImport: '../../../../languages',
        renderChild: (child, childDir) => {
          if (child.type === 'carousel') {
            return materializeCarousel(child, {
              directory: childDir, documentLanguage: 'uk', languagesImport: '../../../../../languages',
              renderChild: (slide, slideDir) => slide.type === 'scene'
                ? materializeScene(slide, {
                  directory: slideDir, documentLanguage: 'uk', languagesImport: '../../../../../../languages',
                  registered: false, production: { specification: '# Scene specification\n\nApproved prompt.\n' },
                })
                : primitive(slide, slideDir),
            });
          }
          return child.type === 'scene'
            ? materializeScene(child, {
              directory: childDir, documentLanguage: 'uk', languagesImport: '../../../../../languages',
              production: { specification: 'Reviewed scene.' }, registered: false,
            })
            : primitive(child, childDir);
        },
      }),
    }),
  });
}

test('Checkpoint recursively materializes Item → Text + Answer → Carousel → Image/Scene', () => {
  const result = materializeTree();
  assert.deepEqual(result, materializeTree());
  const paths = result.files.map(file => file.path);
  for (const suffix of [
    'content/items/first/index.ts',
    'content/items/first/question/index.ts',
    'content/items/first/answer/index.ts',
    'content/items/first/answer/content/items/slides/index.ts',
    'content/items/first/answer/content/items/slides/slides/items/practiceScene/index.ts',
    'content/items/first/answer/content/items/slides/slides/items/practiceScene/specification.md',
    'index.ts',
  ]) assert.ok(paths.includes('sections/review/' + suffix), 'missing ' + suffix);
  const code = result.files.at(-1)!.content;
  assert.match(code, /defineCheckpoint<"review", typeof content.items, typeof languages>/);
  assert.match(code, /"uk": "Перевір себе"/);
  assert.doesNotMatch(code, /"en": "Check yourself"/);
  assert.equal(result.diagnostics.some(d => d.code === 'pending-scene'), true);
  assert.equal(new Set(paths).size, paths.length, 'each file belongs to one materializer');
  for (const file of result.files.filter(file => file.kind === 'typescript')) {
    assert.equal(ts.createSourceFile(file.path, file.content, ts.ScriptTarget.Latest, true).parseDiagnostics.length, 0, file.path);
  }
});

test('Checkpoint requires exact active order, correct item type and stable child UUIDs', () => {
  const input = example();
  const options = { directory: '', documentLanguage: 'uk', languagesImport: './languages', renderItem: primitive };
  assert.throws(() => materializeCheckpoint({ ...input, content: { ...input.content, order: [] } }, options), /exactly once/);
  assert.throws(() => materializeCheckpoint({ ...input, content: { items: { bad: { ...input.content.items.first, type: 'text' as never } }, order: ['bad'] } }, options), /invalid kind/);
  assert.throws(() => materializeCheckpoint({ ...input, content: { items: { first: { ...input.content.items.first, id: input.id } }, order: ['first'] } }, options), /duplicate UUID/);
  assert.throws(() => materializeCheckpoint(input, { ...options, directory: '../escape' }), /unsafe source/);
});

test('Checkpoint omits a draft-disabled item rather than emitting false into final Config', () => {
  const first = example().content.items.first;
  const second = { ...first, id: id(11), slug: 'second' };
  const input = { ...example(), content: { items: { first: false as const, second }, order: ['second'] } };
  const result = materializeCheckpoint(input, {
    directory: '', documentLanguage: 'uk', languagesImport: './languages',
    renderItem: primitive,
  });
  assert.match(result.files.at(-1)!.content, /"second": item_second/);
  assert.doesNotMatch(result.files.at(-1)!.content, /item_first/);
});
