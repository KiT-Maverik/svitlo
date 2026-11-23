import assert from 'node:assert/strict';
import ts from 'typescript';
import test from 'node:test';
import { materializePracticeSection, type ChildConfig } from './practiceSection';

const id = (n: string) => '12345678-1234-4234-8234-1234567890' + n;
const block = (slug: string): ChildConfig => ({
  id: id('02'),
  slug,
  type: 'text',
  params: {},
  locale: { value: { en: 'Read', uk: 'Читай' } },
});
const input = () => ({
  type: 'practice',
  id: id('01'),
  slug: 'introduction',
  params: {},
  locale: { title: { en: 'Start', uk: 'Початок' }, navigationLabel: '1' },
  content: { items: { prompt: block('prompt') }, order: ['prompt'] },
});
const renderContentBlock = (config: ChildConfig, options: { directory: string }) => ({
  exportName: config.slug,
  diagnostics: [],
  files: [{ path: options.directory + '/index.ts', kind: 'typescript' as const, content: '// child\n' }],
});

test('practice: delegates exact subtree and preserves explicit collection/order/source locale', () => {
  const config = input();
  const options = {
    documentLanguage: 'en',
    directory: 'sections/introduction',
    languagesImport: '../../languages',
    renderContentBlock,
  };
  const first = materializePracticeSection(config as Parameters<typeof materializePracticeSection>[0], options);
  assert.deepEqual(
    materializePracticeSection(config as Parameters<typeof materializePracticeSection>[0], options),
    first,
  );
  assert.equal(
    first.files.find(file => file.path === 'sections/introduction/content/items/prompt/index.ts')?.content,
    '// child\n',
  );
  const root = first.files.find(file => file.path === 'sections/introduction/index.ts')?.content ?? '';
  const parsed = ts.transpileModule(root, {
    reportDiagnostics: true,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  assert.equal(
    parsed.diagnostics?.filter(issue => issue.category === ts.DiagnosticCategory.Error).length ?? 0,
    0,
    'generated TS must parse without errors',
  );
  assert.match(root, /definePracticeSection|definePracticeSection/);
  assert.match(root, /typeof content.items, typeof languages/);
  assert.match(root, /"order": \["prompt"\]/);
  assert.match(root, /"en": "Start"/);
  assert.doesNotMatch(root, /"uk": "Початок"/);

  assert.deepEqual(config, input(), 'input must remain unchanged');
});
test('practice: fails closed for invalid ordering, identifiers and path escapes', () => {
  const config = input();
  config.content.order = [];
  assert.throws(
    () =>
      materializePracticeSection(config as Parameters<typeof materializePracticeSection>[0], {
        documentLanguage: 'en',
        languagesImport: './languages',
        renderContentBlock,
      }),
    /order/,
  );
  const other = input();
  other.content.items.prompt.slug = 'mismatch';
  assert.throws(
    () =>
      materializePracticeSection(other as Parameters<typeof materializePracticeSection>[0], {
        documentLanguage: 'en',
        languagesImport: './languages',
        renderContentBlock,
      }),
    /identity/,
  );
});
