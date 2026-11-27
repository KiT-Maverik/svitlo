import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { test } from 'node:test';

import ts from 'typescript';

import { authoredBankLiteral, gitBlobSha, type BankSourceSnapshot } from '../bankSource/bankSourceSafety';
import { materializeFlashcardBank, materializeFlashcardBankDraft } from './materializeFlashcardBank';

const sha = (c: string) => c.repeat(40);
const id = (n: number) => 'b775647f-203d-481a-a1c7-4d331c' + String(n).padStart(6, '0');
const ownerLessonId = id(200);
const assessment = {
  questionBankRequired: true,
  flashcardBankRequired: true,
  quizSectionRequired: false,
  flashcardsSectionRequired: false,
};
const handoff = () => ({
  production: {
    lesson: {
      id: ownerLessonId,
      sourceSha: sha('a'),
      reference: { path: 'references/flashcards.md', sourceSha: sha('b') },
      languages: { document: 'uk' as const, planned: ['uk'] as ['uk'] },
      assessment: { ...assessment },
    },
    analysis: {
      recallObjectives: ['Name the mathematical concept'] as [string, ...string[]],
      sourceFactsAndConcepts: ['Addition'],
      misconceptionsAndContrasts: ['Confuses order'],
      exclusions: [{ target: 'Advanced theorem', reason: 'Outside scope' }],
      cardCountRationale: 'Two different recall directions',
      sourceGrounding: 'Reviewed source',
    },
  },
});
const editor = 'export const bank = { approvedAtStage3: true };\n';
const snapshot = (source?: string): BankSourceSnapshot => ({
  complete: true,
  expectedHeadSha: sha('e'),
  observedHeadSha: sha('e'),
  entries: {
    flashcards: { kind: 'directory' },
    ...(source === undefined
      ? {}
      : {
          'flashcards/draft.ts': { kind: 'file' as const, content: source },
        }),
  },
});
const draftAuthorization = {
  authorized: true as const,
  ownerLessonId,
  lessonSourceSha: sha('a'),
  referenceSourceSha: sha('b'),
  snapshot: snapshot(),
};
const finalAuthorization = (input: unknown = completed()) => ({
  ownerLessonId,
  lessonSourceSha: sha('a'),
  referenceSourceSha: sha('b'),
  snapshot: snapshot(editor),
  source: {
    content: editor,
    blobSha: gitBlobSha(editor),
    commitSha: sha('e'),
    inputSha256: createHash('sha256').update(authoredBankLiteral(input)).digest('hex'),
  },
  blocks: { registeredSceneIds: new Set<string>(), approvedMediaBlockIds: new Set<string>() },
  ownerLanguages: {
    active: ['uk'],
    planned: (input as ReturnType<typeof completed>).production.lesson.languages.planned,
  },
});
const textBlock = (slug: string, n: number) => ({
  config: {
    id: id(n),
    slug,
    type: 'text' as const,
    params: {},
    locale: { value: { uk: 'Перевірене коротке формулювання' } },
  },
});
const side = (slug: string, n: number) => ({
  children: [slug],
  [slug]: textBlock(slug, n),
});
const card = (slug: string, n: number) => ({
  config: {
    id: id(n),
    slug,
    parameters: { tags: ['math'], flags: [] },
    content: {
      front: side('frontText', n * 10 + 1),
      back: side('backText', n * 10 + 2),
    },
  },
  production: {
    recallObjective: 'Recall a distinct meaning',
    grounding: 'Verified Lesson source',
    directionRationale: 'Checks independent retrieval direction',
    accessibilityRationale: 'Text-only accessible recall',
  },
});
const completed = () => ({
  ...handoff(),
  config: {
    flashcards: {
      items: { alpha: card('alpha', 10), beta: card('beta', 11) },
      order: ['beta', 'alpha'] as [string, ...string[]],
    },
    relationships: {
      items: {
        reversePartner: {
          relationshipId: 'reviewedConnection',
          type: 'reverse' as const,
          source: 'alpha',
          target: 'beta',
        },
      },
      order: ['reversePartner'],
    },
  },
  production: {
    ...handoff().production,
    design: {
      atomicityAudit: 'One target per side',
      directionAndDuplicationAudit: 'Distinct retrieval directions',
      acronymAndListAudit: 'No acronym or list present',
      mediaAndAccessibilityAudit: 'Text alternatives available',
      relationshipAudit: 'Reviewed reciprocal card relationship',
    },
    section: {
      kind: 'notApplicable' as const,
      rationale: 'Independent bank for later practice',
    },
  },
});

test('Flashcard Bank emits no copied language module; cards and Sides bind to Lesson constants', () => {
  const input = completed();
  input.production.lesson.languages.planned = ['uk', 'en'] as never;
  const output = materializeFlashcardBank(input as never, finalAuthorization(input));
  assert(!output.files.some(file => file.path === 'flashcardsLanguages.ts'));
  const card = output.files.find(file => file.path === 'flashcards/alpha.ts')?.content ?? '';
  const side = output.files.find(file => file.path === 'flashcards/alpha/content/front/index.ts')?.content ?? '';
  assert.match(card, /import type \{ Languages \} from "#lessonsData\/0\//);
  assert.match(card, /typeof parameters.flags/);
  assert.match(card, /, Languages>/);
  assert.match(side, /defineFlashcardSide<typeof items, Languages>/);
  assert(!output.files.some(file => file.content.includes('Restore independently reviewed Flashcard languages')));
});

test('Flashcard Stage 1 produces one editorial source, no fake Card or Section', () => {
  const result = materializeFlashcardBankDraft(handoff() as never, draftAuthorization);
  assert.equal(result.publishable, false);
  assert.deepEqual(
    result.files.map(file => file.path),
    ['flashcards/draft.ts'],
  );
  assert.match(result.files[0].content, /satisfies FlashcardBankWorkflowStage1/);
  assert.match(result.files[0].content, /export default \{/);
  assert.doesNotMatch(result.files[0].content, /export const flashcardBank|materializeFlashcardBank\(/);
  assert.doesNotMatch(result.files[0].content, /defineFlashcard|defineFlashcardsSection/);
});
test('Flashcard Stage 1 rejects a stale Lesson reference', () => {
  assert.throws(
    () =>
      materializeFlashcardBankDraft(handoff() as never, {
        ...draftAuthorization,
        referenceSourceSha: sha('0'),
      }),
    /Stale Lesson\/reference/,
  );
});
test('Reviewed Stage 3 retains all Cards, both Sides, original order and both UUID relationship endpoints', () => {
  const result = materializeFlashcardBank(completed() as never, finalAuthorization());
  assert.equal(result.publishable, false);
  assert(result.transition);
  const names = result.files.map(file => file.path);
  assert(names.includes('flashcards/alpha.ts'));
  assert(names.includes('flashcards/beta.ts'));
  assert(names.includes('flashcards/index.ts'));
  assert(names.includes('flashcards/alpha/content/front/index.ts'));
  assert(names.includes('flashcards/alpha/content/back/index.ts'));
  assert(names.includes('flashcards/alpha/content/front/frontText/index.ts'));
  assert(names.includes('flashcards/beta/content/back/backText/index.ts'));
  assert(!names.some(path => path.includes('/items/')));
  const front = result.files.find(file => file.path === 'flashcards/alpha/content/front/index.ts')?.content ?? '';
  assert.match(front, /from "\.\/frontText"/);
  assert.equal(result.transition.sourceDraftPath, 'flashcards/draft.ts');
  assert.equal(result.transition.materializedPath, 'flashcards/index.ts');
  assert(!result.files.some(file => file.path.includes('reviewed-stage3') || file.path.endsWith('/draft.ts')));
  const main = result.files.find(file => file.path === 'flashcards/index.ts')?.content ?? '';
  assert.match(main, /export const flashcards = \{\n  beta,\n  alpha,\n\};/);
  const alpha = result.files.find(file => file.path === 'flashcards/alpha.ts')?.content ?? '';
  const beta = result.files.find(file => file.path === 'flashcards/beta.ts')?.content ?? '';
  assert.match(alpha, /relationshipId: "reviewedConnection"/);
  assert.match(alpha, new RegExp(id(11)));
  assert.match(beta, new RegExp(id(10)));
  assert.match(alpha, /position: "peer"/);
  assert.match(beta, /position: "peer"/);
  assert.deepEqual(result, materializeFlashcardBank(completed() as never, finalAuthorization()));
  for (const file of result.files.filter(file => file.kind === 'typescript')) {
    const parsed = ts.transpileModule(file.content, {
      fileName: file.path,
      reportDiagnostics: true,
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    });
    assert.deepEqual(
      (parsed.diagnostics ?? []).map(error => ts.flattenDiagnosticMessageText(error.messageText, '\n')),
      [],
    );
  }
});
test('Reject duplicate and broken graph links, pending Cards and incompatible selection', () => {
  const invalid = completed();
  invalid.config.relationships.items.reversePartner.target = 'notPublished';
  assert.throws(
    () => materializeFlashcardBank(invalid as never, finalAuthorization(invalid)),
    /Unknown\/self relation endpoint/,
  );
  const self = completed();
  self.config.relationships.items.reversePartner.target = 'alpha';
  assert.throws(
    () => materializeFlashcardBank(self as never, finalAuthorization(self)),
    /Unknown\/self relation endpoint/,
  );
  const pending = completed();
  Object.assign(pending.config.flashcards.items.alpha.production, { pending: true });
  assert.throws(
    () => materializeFlashcardBank(pending as never, finalAuthorization(pending)),
    /bank\.items\.alpha: pending bank authoring source cannot be finalized/,
  );
  const badOrder = completed();
  badOrder.config.flashcards.order = ['alpha', 'alpha'];
  assert.throws(
    () => materializeFlashcardBank(badOrder as never, finalAuthorization(badOrder)),
    /order must enumerate/,
  );
});

test('Flashcard Bank rejects both Composite child kinds before source emission', () => {
  for (const type of ['carousel', 'checkpoint']) {
    const source = completed();
    Object.assign(source.config.flashcards.items.alpha.config.content.front, {
      invalid: {
        config: {
          id: id(type === 'carousel' ? 471 : 472),
          slug: 'invalid',
          type,
          params: {},
          locale: {},
        },
      },
    });
    source.config.flashcards.items.alpha.config.content.front.children.push('invalid');
    assert.throws(
      () => materializeFlashcardBank(source as never, finalAuthorization(source)),
      /Invalid reviewed flashcardBank Stage 3 input/,
    );
  }
});

test('Flashcard source materialization does not gate on editorial bank-required status', () => {
  const notRequired = handoff();
  notRequired.production.lesson.assessment.flashcardBankRequired = false;
  assert.doesNotThrow(() => materializeFlashcardBankDraft(notRequired as never, draftAuthorization));
});
test('Flashcard Bank rejects pending nested Side Blocks and stale reviewed structured input', () => {
  const input = completed();
  Object.assign(input.config.flashcards.items.alpha.config.content.front.frontText, {
    production: { pending: true },
  });
  assert.throws(
    () => materializeFlashcardBank(input as never, finalAuthorization(input)),
    /pending bank authoring source/,
  );
  const auth = finalAuthorization();
  auth.source.inputSha256 = sha('0') + '0'.repeat(24);
  assert.throws(
    () => materializeFlashcardBank(completed() as never, auth),
    /structured review input SHA-256|Structured bank input differs/,
  );
});
