import assert from 'node:assert/strict';
import { test } from 'node:test';

import ts from 'typescript';

import { materializeFlashcardSide } from './materializeFlashcardSide';

const block = (slug: string, n: number) => ({
  config: { id: 'b775647f-203d-481a-a1c7-4d331c' + String(n).padStart(6, '0'), slug, type: 'text' as const },
});
const context = {
  directory: 'flashcards/cardOne/content/front',
  role: 'front' as const,
  languages: { document: 'uk' as const, planned: ['uk', 'en'] as const },
  materializeBlock: (node: { config: { slug: string } }, ctx: { directory: string }) => ({
    exportName: node.config.slug,
    files: [
      {
        path: ctx.directory + '/index.ts',
        content: 'export const ' + node.config.slug + ' = 1;\n',
        kind: 'typescript' as const,
      },
    ],
  }),
};
test('FlashcardSide rejects Carousel and Checkpoint before delegating source generation', () => {
  for (const type of ['carousel', 'checkpoint']) {
    assert.throws(
      () =>
        materializeFlashcardSide(
          {
            items: { nested: { config: { id: 'b775647f-203d-481a-a1c7-4d331c000030', slug: 'nested', type } } },
            order: ['nested'],
          },
          context,
        ),
      /unsupported/,
    );
  }
});

test('FlashcardSide: correct child module paths, original order, no invented UUID, syntax', () => {
  const source = { items: { second: block('second', 2), first: block('first', 1) }, order: ['first', 'second'] };
  const output = materializeFlashcardSide(source, context);
  const root = output.files.find(file => file.path.endsWith('/front/index.ts'));
  assert.ok(root);
  assert.equal(output.exportName, 'front');
  assert.match(root.content, /defineFlashcardSide<typeof items, \["uk"\]>/);
  assert.match(root.content, /order: \["first","second"\]/);
  assert(!root.content.includes('id:'));
  assert(output.files.some(file => file.path.endsWith('/front/first/index.ts')));
  assert(output.files.some(file => file.path.endsWith('/front/second/index.ts')));
  assert(!output.files.some(file => file.path.includes('/items/')));
  assert.match(root.content, /from "\.\/first"/);
  assert.match(root.content, /from "\.\/second"/);
  assert.match(root.content, /import \{ first \} from "\.\/first"/);
  assert.match(root.content, /first,/);
  assert.doesNotMatch(root.content, /child_/);
  assert.deepEqual(output, materializeFlashcardSide(source, context));
  for (const file of output.files.filter(file => file.kind === 'typescript')) {
    const parsed = ts.transpileModule(file.content, {
      fileName: file.path,
      reportDiagnostics: true,
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    });
    assert.deepEqual(
      (parsed.diagnostics ?? []).map(issue => ts.flattenDiagnosticMessageText(issue.messageText, '\n')),
      [],
    );
  }
});
test('FlashcardSide: order/role/slug and create-only protections', () => {
  const first = block('first', 1);
  assert.throws(() => materializeFlashcardSide({ items: { first }, order: [] }, context), /order/);
  assert.throws(
    () => materializeFlashcardSide({ items: {}, order: [] }, context),
    /required front\/back cannot be empty/,
  );
  assert.doesNotThrow(() => materializeFlashcardSide({ items: {}, order: [] }, { ...context, role: 'hint' }));
  assert.throws(
    () =>
      materializeFlashcardSide(
        { items: { first }, order: ['first'] },
        {
          ...context,
          existingPaths: new Set(['flashcards/cardOne/content/front/index.ts']),
        },
      ),
    /no clobber/,
  );
  assert.throws(
    () =>
      materializeFlashcardSide(
        { items: { first }, order: ['first'] },
        {
          ...context,
          languages: { document: 'uk' as const, planned: ['en'] as const },
        },
      ),
    /languages.planned/,
  );
  assert.throws(
    () =>
      materializeFlashcardSide(
        { items: { first }, order: ['first'] },
        {
          ...context,
          existingPaths: new Set(['flashcards/cardOne/content/front/first/index.ts']),
        },
      ),
    /no clobber/,
  );
  assert.throws(
    () =>
      materializeFlashcardSide(
        { items: { first }, order: ['first'] },
        {
          ...context,
          materializeBlock: () => ({
            exportName: 'first',
            files: [
              {
                path: 'flashcards/cardOne/content/back/index.ts',
                kind: 'typescript' as const,
                content: 'export const first = 1;\n',
              },
            ],
          }),
        },
      ),
    /escaped its assigned directory/,
  );
});

test('FlashcardSide: refuses delegated child without an importable index', () => {
  assert.throws(
    () =>
      materializeFlashcardSide(
        { items: { first: block('first', 1) }, order: ['first'] },
        {
          ...context,
          materializeBlock: (_node, ctx) => ({
            exportName: 'first',
            files: [{ path: ctx.directory + '/specification.md', kind: 'markdown' as const, content: '# draft\\n' }],
          }),
        },
      ),
    /missing delegated ContentBlock index\.ts/,
  );
});
// Flashcard sides are created only from reviewed, ordered side Config data.
test('FlashcardSide: editorial handoff does not synthesize front/back side content', () => {
  assert.throws(
    () =>
      materializeFlashcardSide({} as never, {
        ...context,
        materializeBlock: () => {
          throw new Error('Unexpected Stage 1 child call');
        },
      }),
    /expected items\/order/,
  );
});
