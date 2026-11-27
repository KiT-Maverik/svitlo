import assert from 'node:assert/strict';
import test from 'node:test';

import ts from 'typescript';

import { materializeLearningFlowSection, type ChildConfig } from './learningFlowSection';

const id = (n: string) => '12345678-1234-4234-8234-1234567890' + n;
const block = (slug: string): ChildConfig => ({
  id: id('02'),
  slug,
  type: 'text',
  params: {},
  locale: { value: { en: 'Read', uk: 'Читай' } },
});
const input = () => ({
  type: 'learningFlow',
  id: id('01'),
  slug: 'introduction',
  params: {},
  locale: { title: { en: 'Start', uk: 'Початок' }, navigationLabel: '1' },
  children: ['prompt'],
  prompt: block('prompt'),
});
const renderContentBlock = (config: ChildConfig, options: { directory: string }) => ({
  exportName: config.slug,
  diagnostics: [],
  files: [{ path: options.directory + '/index.ts', kind: 'typescript' as const, content: '// child\n' }],
});

test('learningFlow: delegates exact subtree and preserves explicit collection/order/source locale', () => {
  const config = input();
  const options = {
    documentLanguage: 'en',
    directory: 'sections/introduction',
    languagesImport: '../../languages',
    renderContentBlock,
  };
  const first = materializeLearningFlowSection(config as Parameters<typeof materializeLearningFlowSection>[0], options);
  assert.deepEqual(
    materializeLearningFlowSection(config as Parameters<typeof materializeLearningFlowSection>[0], options),
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
  assert.match(root, /defineLearningFlowSection|defineLearningFlowSection/);
  assert.match(root, /typeof __blocks, typeof languages/);
  assert.match(root, /"children": \["prompt"\]/);
  assert.match(root, /"en": "Start"/);
  assert.doesNotMatch(root, /"uk": "Початок"/);

  assert.deepEqual(config, input(), 'input must remain unchanged');
});
test('learningFlow: fails closed for invalid ordering, identifiers and path escapes', () => {
  const config = input();
  config.children = [];
  assert.throws(
    () =>
      materializeLearningFlowSection(config as Parameters<typeof materializeLearningFlowSection>[0], {
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
      materializeLearningFlowSection(other as Parameters<typeof materializeLearningFlowSection>[0], {
        documentLanguage: 'en',
        languagesImport: './languages',
        renderContentBlock,
      }),
    /identity/,
  );
});

test('learningFlowSection: Section notes are guarded without specification sidecars', () => {
  const result = materializeLearningFlowSection(input() as Parameters<typeof materializeLearningFlowSection>[0], {
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
