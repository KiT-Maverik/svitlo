/**
 * Ordinary Content/Practice/CodingTask/LearningFlow Sections share delegation,
 * path, locale and editorial-note safety checks; Quiz and Flashcards keep
 * independent assessment-specific coverage.
 */
import assert from 'node:assert/strict';
import test from 'node:test';

import ts from 'typescript';

import { materializeCodingTaskSection } from '../codingTaskSection/codingTaskSection';
import { materializeContentSection } from '../contentSection/contentSection';
import { materializeLearningFlowSection } from '../learningFlowSection/learningFlowSection';
import { materializePracticeSection } from '../practiceSection/practiceSection';
import type { ChildConfig } from './contentSection';

const id = (n: string) => '12345678-1234-4234-8234-1234567890' + n;
const block = (slug: string): ChildConfig => ({
  id: id('02'),
  slug,
  type: 'text',
  params: {},
  locale: { value: { en: 'Read', uk: 'Читай' } },
});
const input = (kind: string) => ({
  type: kind,
  id: id('01'),
  slug: 'introduction',
  params: {},
  locale: { title: { en: 'Start', uk: 'Початок' }, navigationLabel: '1' },
  content: { items: { prompt: block('prompt') }, order: ['prompt'] },
});
const renderContentBlock = (config: ChildConfig, options: { directory: string; languagesImport: string }) => ({
  exportName: config.slug,
  diagnostics: [],
  ...(assert.equal(options.languagesImport, '../../../languages'), {}),
  files: [{ path: options.directory + '/index.ts', kind: 'typescript' as const, content: '// child\n' }],
});
const suites = [
  {
    kind: 'contentSection' as const,
    render: (node: unknown, opts: unknown) => materializeContentSection(node as never, opts as never),
  },
  {
    kind: 'practiceSection' as const,
    render: (node: unknown, opts: unknown) => materializePracticeSection(node as never, opts as never),
  },
  {
    kind: 'codingTaskSection' as const,
    render: (node: unknown, opts: unknown) => materializeCodingTaskSection(node as never, opts as never),
  },
  {
    kind: 'learningFlowSection' as const,
    render: (node: unknown, opts: unknown) => materializeLearningFlowSection(node as never, opts as never),
  },
];

for (const { kind, render } of suites) {
  const sectionType =
    kind === 'contentSection'
      ? 'content'
      : kind === 'practiceSection'
        ? 'practice'
        : kind === 'codingTaskSection'
          ? 'codingTask'
          : 'learningFlow';
  const options = {
    documentLanguage: 'en',
    directory: 'sections/introduction',
    languagesImport: '../../languages',
    renderContentBlock,
  };

  test(sectionType + ': delegates exact subtree and preserves explicit collection/order/source locale', () => {
    const config = input(sectionType);
    const first = render(config, options);
    assert.deepEqual(first, render(config, options));
    assert.equal(
      first.files.find(file => file.path === 'sections/introduction/prompt/index.ts')?.content,
      '// child\n',
    );
    assert(first.files.every(file => !file.path.includes('/content/items/')));
    assert(first.files.every(file => !file.path.endsWith('/specification.md')));
    const root = first.files.find(file => file.path === 'sections/introduction/index.ts')?.content ?? '';
    assert.match(root, /\.\/prompt/);
    if (sectionType === 'content') {
      assert.match(root, /import \{ prompt \} from "\.\/prompt"/);
      assert.match(root, /"items": \{\s*prompt,?\s*\}/);
      assert.doesNotMatch(root, /child_content_items_/);
    }
    const parsed = ts.transpileModule(root, {
      reportDiagnostics: true,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    });
    assert.equal(
      parsed.diagnostics?.filter(issue => issue.category === ts.DiagnosticCategory.Error).length ?? 0,
      0,
      'generated TS must parse without errors',
    );
    assert.match(root, new RegExp('define' + kind[0].toUpperCase() + kind.slice(1)));
    assert.match(root, /typeof content.items, typeof languages/);
    assert.match(root, /"order": \["prompt"\]/);
    assert.match(root, /"en": "Start"/);
    assert.doesNotMatch(root, /"uk": "Початок"/);
    assert.deepEqual(config, input(sectionType), 'input must remain unchanged');
  });

  test(sectionType + ': fails closed for invalid ordering, identifiers and path escapes', () => {
    const config = input(sectionType);
    config.content.order = [];
    assert.throws(
      () => render(config, { documentLanguage: 'en', languagesImport: './languages', renderContentBlock }),
      /order/,
    );
    const other = input(sectionType);
    other.content.items.prompt.slug = 'mismatch';
    assert.throws(
      () => render(other, { documentLanguage: 'en', languagesImport: './languages', renderContentBlock }),
      /identity/,
    );
  });

  test(kind + ': Section notes are guarded without specification sidecars', () => {
    const result = render(input(sectionType), { ...options, production: { sequenceReason: 'Reviewed sequence.' } });
    assert(result.files.every(file => !file.path.endsWith('/specification.md')));
    const root = result.files.find(file => file.path === 'sections/introduction/index.ts')!.content;
    assert.match(root, /Transfer reviewed .* Section notes/);
    assert(result.diagnostics.some(item => item.message.includes('sequenceReason')));
  });
}

// The Content Section has additional key/export collision and Course-ownership contracts.
test('content: verifies canonical child export, permits explicit differing map key and rejects collisions', () => {
  const alternative = materializeContentSection(input('content') as Parameters<typeof materializeContentSection>[0], {
    documentLanguage: 'en',
    directory: 'sections/introduction',
    languagesImport: '../../languages',
    renderContentBlock: (child, options) => ({
      ...renderContentBlock(child, options),
      exportName: 'actualPrompt',
    }),
  });
  const code = alternative.files.find(file => file.path === 'sections/introduction/index.ts')?.content ?? '';
  assert.match(code, /import \{ actualPrompt \} from "\.\/prompt"/);
  assert.match(code, /"prompt": actualPrompt/);
  assert.throws(
    () =>
      materializeContentSection(input('content') as Parameters<typeof materializeContentSection>[0], {
        documentLanguage: 'en',
        directory: 'sections/introduction',
        languagesImport: '../../languages',
        renderContentBlock: (child, options) => ({
          ...renderContentBlock(child, options),
          exportName: 'content',
        }),
      }),
    /generated identifier collision.*content/,
  );
});

test('content: Course placement owns the notes but does not suppress pending Section work', () => {
  const config = input('content') as Parameters<typeof materializeContentSection>[0];
  const args = {
    documentLanguage: 'en',
    directory: 'sections/introduction',
    languagesImport: '../../languages',
    production: { purpose: 'Reviewed Course-only purpose', pending: true },
    renderContentBlock,
  };
  const ordinary = materializeContentSection(config, args);
  const ordinarySource = ordinary.files.find(file => file.path === 'sections/introduction/index.ts')!.content;
  assert.match(ordinarySource, /Transfer reviewed content Section notes/);
  assert.match(ordinarySource, /Implement, validate and review the content Section production/);

  const placement = materializeContentSection(config, { ...args, noteOwnership: 'course-lesson-placement' });
  const placementSource = placement.files.find(file => file.path === 'sections/introduction/index.ts')!.content;
  assert.doesNotMatch(placementSource, /Transfer reviewed content Section notes/);
  assert.match(placementSource, /Implement, validate and review the content Section production/);
  assert.ok(placement.diagnostics.some(item => item.code === 'pending-content'));
  assert.ok(placement.diagnostics.every(item => !item.message.includes('Transfer reviewed')));
});
