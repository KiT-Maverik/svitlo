import assert from 'node:assert/strict';
import test from 'node:test';

import ts from 'typescript';

import { materializeFlashcardsSection, type ChildConfig } from './flashcardsSection';

const id = (n: string) => '12345678-1234-4234-8234-1234567890' + n;
const block = (slug: string): ChildConfig => ({
  id: id('02'),
  slug,
  type: 'text',
  params: {},
  locale: { value: { en: 'Read', uk: 'Читай' } },
});
const input = () => ({
  type: 'flashcards',
  id: id('01'),
  slug: 'introduction',
  params: { selection: { flashcardIds: [id('03')] } },
  locale: { title: { en: 'Start', uk: 'Початок' }, navigationLabel: '1' },
  children: ['prompt'],
  prompt: block('prompt'),
});
const renderContentBlock = (config: ChildConfig, options: { directory: string }) => ({
  exportName: config.slug,
  diagnostics: [],
  files: [{ path: options.directory + '/index.ts', kind: 'typescript' as const, content: '// child\n' }],
});

test('flashcards: delegates exact subtree and preserves explicit collection/order/source locale', () => {
  const config = input();
  const options = {
    documentLanguage: 'en',
    directory: 'sections/introduction',
    languagesImport: '../../languages',
    renderContentBlock,
  };
  const first = materializeFlashcardsSection(config as Parameters<typeof materializeFlashcardsSection>[0], options);
  assert.deepEqual(
    materializeFlashcardsSection(config as Parameters<typeof materializeFlashcardsSection>[0], options),
    first,
  );
  assert.equal(first.files.find(file => file.path === 'sections/introduction/prompt/index.ts')?.content, '// child\n');
  assert.ok(first.files.every(file => !file.path.includes('/content/items/')));
  assert.ok(first.files.every(file => !file.path.endsWith('/specification.md')));
  const root = first.files.find(file => file.path === 'sections/introduction/index.ts')?.content ?? '';
  assert.match(root, /\.\/prompt/);
  const parsed = ts.transpileModule(root, {
    reportDiagnostics: true,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  assert.equal(
    parsed.diagnostics?.filter(issue => issue.category === ts.DiagnosticCategory.Error).length ?? 0,
    0,
    'generated TS must parse without errors',
  );
  assert.match(root, /defineFlashcardsSection|defineFlashcardsSection/);
  assert.match(root, /typeof __blocks, typeof languages/);
  assert.match(root, /"children": \["prompt"\]/);
  assert.match(root, /"en": "Start"/);
  assert.doesNotMatch(root, /"uk": "Початок"/);
  assert.match(root, new RegExp(id('03')));
  assert.deepEqual(config, input(), 'input must remain unchanged');
});
test('flashcards: fails closed for invalid ordering, identifiers and path escapes', () => {
  const config = input();
  config.children = [];
  assert.throws(
    () =>
      materializeFlashcardsSection(config as Parameters<typeof materializeFlashcardsSection>[0], {
        documentLanguage: 'en',
        languagesImport: './languages',
        renderContentBlock,
      }),
    /children/,
  );
  const other = input();
  other.prompt.slug = 'mismatch';
  assert.throws(
    () =>
      materializeFlashcardsSection(other as Parameters<typeof materializeFlashcardsSection>[0], {
        documentLanguage: 'en',
        languagesImport: './languages',
        renderContentBlock,
      }),
    /identity/,
  );
});
test('flashcards: unfinished assessment carries explicit blocker without fabricated bank selection', () => {
  const config = input();
  (config.params.selection as { questionIds?: string[]; flashcardIds?: string[] }).flashcardIds = [];
  const out = materializeFlashcardsSection(config as Parameters<typeof materializeFlashcardsSection>[0], {
    documentLanguage: 'en',
    languagesImport: './languages',
    renderContentBlock,
    production: { pending: true },
  });
  assert.match(out.files.at(-1)?.content ?? '', /TODO \(BLOCKER\)/);
  assert.equal(out.diagnostics[0]?.severity, 'warning');
  assert.doesNotMatch(out.files.at(-1)?.content ?? '', /feedc0de-/);
});

test('flashcardsSection: Section notes are guarded without specification sidecars', () => {
  const result = materializeFlashcardsSection(input() as Parameters<typeof materializeFlashcardsSection>[0], {
    documentLanguage: 'en',
    directory: 'sections/introduction',
    languagesImport: '../../languages',
    production: { sequenceReason: 'Reviewed sequence.' },
    renderContentBlock,
  });
  assert.ok(result.files.every(file => !file.path.endsWith('/specification.md')));
  const root = result.files.find(file => file.path === 'sections/introduction/index.ts')!.content;
  assert.match(root, /Transfer reviewed .* Section notes/);
  assert.ok(result.diagnostics.some(item => item.message.includes('sequenceReason')));
});

test('flashcards: reviewed specification is kept beside the temporary implementation TODO', () => {
  const config = input();
  config.params.selection.flashcardIds = [];
  const original = 'Design interaction with keyboard support.\nProvide a nonvisual alternative.';
  const result = materializeFlashcardsSection(config as Parameters<typeof materializeFlashcardsSection>[0], {
    documentLanguage: 'en',
    languagesImport: './languages',
    renderContentBlock,
    production: { specification: original, methodologyIntegrated: true },
  });
  const source = result.files.find(file => file.path === 'index.ts')!.content;
  assert.match(source, /TODO \(BLOCKER\): Implement reviewed Flashcards Section/);
  assert.match(source, /\/\*\n \* TODO \(BLOCKER\): Implement reviewed Flashcards Section/);
  assert.match(source, / \* Design interaction with keyboard support\./);
  assert.match(source, / \* Provide a nonvisual alternative\./);
  assert.match(source, / \*\/\nexport const/);
  assert.equal((source.match(/TODO \(BLOCKER\)/g) ?? []).length, 1);
  assert.ok(result.files.every(file => !file.path.endsWith('specification.md')));
  assert.deepEqual(config.params.selection.flashcardIds, []);
});

test('flashcards: unfinished selection blocker lives adjacent to source definition', () => {
  const config = input();
  config.params.selection.flashcardIds = [];
  const pending = materializeFlashcardsSection(config as Parameters<typeof materializeFlashcardsSection>[0], {
    documentLanguage: 'en',
    languagesImport: './languages',
    renderContentBlock,
  }).files.find(file => file.path === 'index.ts')!.content;
  assert.match(pending, /TODO \(BLOCKER\): Implement reviewed Flashcards Section[^\n]*\nexport const/);
  assert.equal((pending.match(/TODO \(BLOCKER\)/g) ?? []).length, 1);
  assert.doesNotMatch(pending, /no Flashcards have been fabricated/);
});
test('flashcards: non-provisional bank IDs leave verified Configurator rewrite to Stage 6', () => {
  const result = materializeFlashcardsSection(input() as Parameters<typeof materializeFlashcardsSection>[0], {
    documentLanguage: 'en',
    languagesImport: './languages',
    renderContentBlock,
  });
  const source = result.files.find(file => file.path === 'index.ts')!.content;
  assert.match(source, new RegExp(id('03')));
  assert.doesNotMatch(source, /TODO \(BLOCKER\)/);
  assert.deepEqual(result.diagnostics, []);
});
