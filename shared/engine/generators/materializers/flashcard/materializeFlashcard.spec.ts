import assert from 'node:assert/strict';
import { test } from 'node:test';

import ts from 'typescript';

import type { CourseWorkflowStage1Languages } from '../../../types/workflow/courseWorkflow.types';
import { materializeFlashcard } from './materializeFlashcard';

const stageLanguages = { document: 'uk', planned: ['uk', 'en'] } as const satisfies CourseWorkflowStage1Languages;
const id = (n: number) => 'b775647f-203d-481a-a1c7-4d331c' + String(n).padStart(6, '0');
const block = (slug: string, n: number) => ({
  config: { id: id(n), slug, type: 'text', params: {}, locale: { value: { uk: 'Слово' } } },
});
const side = (slug: string, n: number) => ({ children: [slug], [slug]: block(slug, n) });
const fixture = () => ({
  config: {
    id: id(10),
    slug: 'cardOne',
    parameters: {
      tags: ['math'],
      flags: [
        { type: 'list' as const, count: 3 },
        { type: 'acronym' as const, value: { uk: 'АБВ', en: 'NOT REVIEWED' } },
        { type: 'custom' as const, color: 'info' as const, value: { uk: 'Підказка', en: 'NOT REVIEWED' } },
      ],
      relationships: {
        children: ['reverseCard'],
        reverseCard: {
          relationshipId: 'connectionOne',
          type: 'reverse' as const,
          position: 'peer' as const,
          relatedFlashcardId: id(11),
        },
      },
    },
    content: { front: side('frontText', 1), back: side('backText', 2), hint: side('hintText', 3) },
  },
  production: { pending: true, specification: '## Reviewed card production\n' },
});
const context = {
  directory: 'flashcards',
  languages: stageLanguages,
  materializeBlock: (node: { config: { slug: string } }, ctx: { directory: string }) => ({
    exportName: node.config.slug,
    files: [
      {
        path: ctx.directory + '/index.ts',
        kind: 'typescript' as const,
        content: 'export const ' + node.config.slug + ' = 0;\n',
      },
    ],
  }),
};
test('Flashcard: three standalone sides, ordered flags, relationships, source locales, syntax', () => {
  const output = materializeFlashcard(fixture() as never, context);
  assert.deepEqual(output, materializeFlashcard(fixture() as never, context));
  const main = output.files.find(file => file.path === 'flashcards/cardOne.ts');
  assert.ok(main);
  assert.match(main.content, /defineFlashcard<"cardOne"/);
  assert.match(main.content, /typeof content.front/);
  assert.match(main.content, /typeof content.back/);
  assert.match(main.content, /typeof content.hint/);
  assert.match(main.content, /typeof parameters.flags/);
  assert.match(main.content, /relationshipId: "connectionOne"/);
  assert.match(main.content, /type: "reverse" as const/);
  assert.match(main.content, /position: "peer" as const/);
  assert.match(main.content, /TODO \(BLOCKER\)/);
  assert.doesNotMatch(main.content, /NOT REVIEWED/);
  for (const role of ['front', 'back', 'hint'])
    assert(output.files.some(file => file.path === 'flashcards/cardOne/content/' + role + '/index.ts'));
  assert(output.files.some(file => file.path === 'flashcards/cardOne/specification.md'));
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
test('Flashcard: source locale, duplicate flags, missing bank and pre-existing content blockages', () => {
  const noSource = fixture();
  Object.assign(noSource.config.parameters.flags[1], { value: { en: 'unreviewed' } });
  assert.throws(() => materializeFlashcard(noSource as never, context), /source-language/);
  const duplicate = fixture();
  duplicate.config.parameters.flags.push({ type: 'list', count: 2 } as never);
  assert.throws(() => materializeFlashcard(duplicate as never, context), /duplicate built-in/);
  const missing = fixture();
  missing.config.content.front.children = [];
  assert.throws(() => materializeFlashcard(missing as never, context), /children/);
  assert.throws(
    () =>
      materializeFlashcard(fixture() as never, {
        ...context,
        existingPaths: new Set(['flashcards/cardOne.ts']),
      }),
    /no clobber/,
  );
  assert.throws(
    () =>
      materializeFlashcard(fixture() as never, {
        ...context,
        languages: { document: 'uk' as const, planned: ['en'] as const },
      }),
    /languages.planned/,
  );
});


test('Flashcard materializer rejects invalid relationship type and position before source generation', () => {
  const invalidType = fixture();
  invalidType.config.parameters.relationships.reverseCard.type = 'unknown' as never;
  assert.throws(() => materializeFlashcard(invalidType as never, context), /invalid relationship type, position or identity/);
  const invalidPosition = fixture();
  invalidPosition.config.parameters.relationships.reverseCard.position = 'above' as never;
  assert.throws(() => materializeFlashcard(invalidPosition as never, context), /invalid relationship type, position or identity/);
});

// Stage 1 from the Lesson Flow is bank-level editorial input, not a complete Flashcard.
test('Flashcard: an initial bank handoff must not generate cards or sides', () => {
  const planned = {
    config: { id: id(28), slug: 'plannedCard' },
    production: { scope: 'Flashcard Bank needed; no individual card has been reviewed' },
  };
  assert.throws(
    () =>
      materializeFlashcard(planned as never, {
        ...context,
        materializeBlock: () => {
          throw new Error('Unexpected Stage 1 FlashcardSide/Block materialization');
        },
      }),
    /front and back FlashcardSide Config required/,
  );
});
