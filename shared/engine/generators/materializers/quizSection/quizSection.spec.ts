import assert from 'node:assert/strict';
import ts from 'typescript';
import test from 'node:test';
import { materializeQuizSection, type ChildConfig } from './quizSection';

const id = (n: string) => '12345678-1234-4234-8234-1234567890' + n;
const block = (slug: string): ChildConfig => ({
  id: id('02'),
  slug,
  type: 'text',
  params: {},
  locale: { value: { en: 'Read', uk: 'Читай' } },
});
const input = () => ({
  type: 'quiz',
  id: id('01'),
  slug: 'introduction',
  params: {
    selection: { mode: 'all', questionIds: [id('03')] },
    layout: { mode: 'stack' },
    feedbackMode: 'immediate',
    interaction: {
      retries: 0,
      showErrors: true,
      showCorrectAnswers: true,
      allowExplanations: false,
      allowDeferring: false,
      allowQuestionNavigation: false,
      skippable: false,
    },
    results: { visibility: 'immediate', showScore: true },
  },
  locale: { title: { en: 'Start', uk: 'Початок' }, navigationLabel: '1' },
  content: { items: { prompt: block('prompt') }, order: ['prompt'] },
});
const renderContentBlock = (config: ChildConfig, options: { directory: string }) => ({
  exportName: config.slug,
  diagnostics: [],
  files: [{ path: options.directory + '/index.ts', kind: 'typescript' as const, content: '// child\n' }],
});

test('quiz: delegates exact subtree and preserves explicit collection/order/source locale', () => {
  const config = input();
  const options = {
    documentLanguage: 'en',
    directory: 'sections/introduction',
    languagesImport: '../../languages',
    renderContentBlock,
  };
  const first = materializeQuizSection(config as Parameters<typeof materializeQuizSection>[0], options);
  assert.deepEqual(materializeQuizSection(config as Parameters<typeof materializeQuizSection>[0], options), first);
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
  assert.match(root, /defineQuizSection|defineQuizSection/);
  assert.match(root, /typeof content.items, typeof languages/);
  assert.match(root, /"order": \["prompt"\]/);
  assert.match(root, /"en": "Start"/);
  assert.doesNotMatch(root, /"uk": "Початок"/);
  assert.match(root, new RegExp(id('03')));
  assert.match(root, /feedbackMode/);
  assert.deepEqual(config, input(), 'input must remain unchanged');
});
test('quiz: fails closed for invalid ordering, identifiers and path escapes', () => {
  const config = input();
  config.content.order = [];
  assert.throws(
    () =>
      materializeQuizSection(config as Parameters<typeof materializeQuizSection>[0], {
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
      materializeQuizSection(other as Parameters<typeof materializeQuizSection>[0], {
        documentLanguage: 'en',
        languagesImport: './languages',
        renderContentBlock,
      }),
    /identity/,
  );
});
test('quiz: unfinished assessment carries explicit blocker without fabricated bank selection', () => {
  const config = input();
  (config.params.selection as { questionIds?: string[]; flashcardIds?: string[] }).questionIds = [];
  const out = materializeQuizSection(config as Parameters<typeof materializeQuizSection>[0], {
    documentLanguage: 'en',
    languagesImport: './languages',
    renderContentBlock,
    production: { pending: true },
  });
  assert.match(out.files.at(-1)?.content ?? '', /TODO \(BLOCKER\)/);
  assert.equal(out.diagnostics[0]?.severity, 'warning');
  assert.doesNotMatch(out.files.at(-1)?.content ?? '', /feedc0de-/);
});
