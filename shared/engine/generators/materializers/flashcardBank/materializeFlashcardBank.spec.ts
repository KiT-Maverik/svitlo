import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';
import { createHash } from 'node:crypto';
import {
  materializeFlashcardBankDraft, materializeFlashcardBank,
} from './materializeFlashcardBank';
import { gitBlobSha, authoredBankLiteral, type BankSourceSnapshot } from '../bankSource/bankSourceSafety';

const sha = (c: string) => c.repeat(40);
const id = (n: number) => 'b775647f-203d-481a-a1c7-4d331c' + String(n).padStart(6, '0');
const ownerLessonId = id(200);
const assessment = {
  questionBankRequired: true, flashcardBankRequired: true,
  quizSectionRequired: false, flashcardsSectionRequired: false,
};
const handoff = () => ({
  production: {
    lesson: {
      id: ownerLessonId, sourceSha: sha('a'),
      reference: { path: 'references/flashcards.md', sourceSha: sha('b') },
      languages: { document: 'uk' as const, planned: ['uk'] as ['uk'] },
      assessment,
    },
    questions: {
      kind: 'completed' as const, bankPath: 'content/math/data/questions',
      sourceSha: sha('c'), reviewSha: sha('d'), integrated: true as const,
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
  complete: true, expectedHeadSha: sha('e'), observedHeadSha: sha('e'),
  entries: {
    flashcards: { kind: 'directory' },
    ...(source === undefined ? {} : {
      'flashcards/index.ts': { kind: 'file' as const, content: source },
    }),
  },
});
const draftAuthorization = {
  authorized: true as const, ownerLessonId,
  lessonSourceSha: sha('a'), referenceSourceSha: sha('b'),
  questionSourceSha: sha('c'), questionReviewSha: sha('d'),
  snapshot: snapshot(),
};
const finalAuthorization = (input: unknown = completed()) => ({
  ownerLessonId, lessonSourceSha: sha('a'), referenceSourceSha: sha('b'),
  questionSourceSha: sha('c'), questionReviewSha: sha('d'),
  snapshot: snapshot(editor),
  reviewed: {
    approved: true as const, reviewer: 'Independent memory-design reviewer',
    content: editor, blobSha: gitBlobSha(editor),
    reviewedSourceBlobSha: gitBlobSha(editor), reviewCommitSha: sha('f'),
    reviewedInputSha256: createHash('sha256').update(authoredBankLiteral(input)).digest('hex'),
  },
  blocks: { registeredSceneIds: new Set<string>(), approvedMediaBlockIds: new Set<string>() },
});
const textBlock = (slug: string, n: number) => ({
  config: {
    id: id(n), slug, type: 'text' as const, params: {},
    locale: { value: { uk: 'Перевірене коротке формулювання' } },
  },
});
const side = (slug: string, n: number) => ({
  items: { [slug]: textBlock(slug, n) }, order: [slug],
});
const card = (slug: string, n: number) => ({
  config: {
    id: id(n), slug, parameters: { tags: ['math'], flags: [] },
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
          relationshipId: 'reviewedConnection', type: 'reverse' as const,
          source: 'alpha', target: 'beta',
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

test('Flashcard Stage 1 produces one editorial source, no fake Card or Section', () => {
  const result = materializeFlashcardBankDraft(handoff() as never, draftAuthorization);
  assert.equal(result.publishable, false);
  assert.deepEqual(result.files.map(file => file.path), ['flashcards/index.ts']);
  assert.match(result.files[0].content, /satisfies FlashcardBankWorkflowStage1/);
  assert.doesNotMatch(result.files[0].content, /defineFlashcard|defineFlashcardsSection/);
});
test('Flashcard Stage 1 rejects unreviewed Questions and unsupported N/A', () => {
  assert.throws(() => materializeFlashcardBankDraft(handoff() as never, {
    ...draftAuthorization, questionReviewSha: sha('0'),
  }), /unintegrated or stale/);
  const notApplicable = handoff();
  Object.assign(notApplicable.production.questions, {
    kind: 'notApplicable', rationale: 'No owned questions',
    methodologySourceSha: sha('a'), parentLessonPr: 99,
  });
  assert.throws(() => materializeFlashcardBankDraft(notApplicable as never, {
    ...draftAuthorization, methodologySourceSha: sha('a'),
  }), /contradictory Questions N\/A/);
  assert.throws(() => materializeFlashcardBankDraft(handoff() as never, {
    ...draftAuthorization, referenceSourceSha: sha('0'),
  }), /Stale Lesson\/reference/);
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
  assert.equal(result.files.find(file => file.path === 'flashcards.reviewed-stage3.ts.txt')?.content, editor);
  const main = result.files.find(file => file.path === 'flashcards/index.ts')?.content ?? '';
  assert(main.indexOf('"beta"') < main.indexOf('"alpha"'), 'preserve the complete reviewed order');
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
      fileName: file.path, reportDiagnostics: true,
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    });
    assert.deepEqual((parsed.diagnostics ?? []).map(error => ts.flattenDiagnosticMessageText(error.messageText, '\n')), []);
  }
});
test('Reject duplicate and broken graph links, pending Cards and incompatible selection', () => {
  const invalid = completed();
  invalid.config.relationships.items.reversePartner.target = 'notPublished';
  assert.throws(() => materializeFlashcardBank(invalid as never, finalAuthorization(invalid)), /Unknown\/self relation endpoint/);
  const self = completed();
  self.config.relationships.items.reversePartner.target = 'alpha';
  assert.throws(() => materializeFlashcardBank(self as never, finalAuthorization(self)), /Unknown\/self relation endpoint/);
  const pending = completed();
  Object.assign(pending.config.flashcards.items.alpha.production, { pending: true });
  assert.throws(() => materializeFlashcardBank(pending as never, finalAuthorization(pending)), /Pending Flashcard/);
  const badOrder = completed();
  badOrder.config.flashcards.order = ['alpha', 'alpha'];
  assert.throws(() => materializeFlashcardBank(badOrder as never, finalAuthorization(badOrder)), /order must enumerate/);
});


test('Flashcard Bank N/A requires explicit independent owner approval', () => {
  const notRequired = handoff();
  notRequired.production.lesson.assessment.flashcardBankRequired = false;
  assert.throws(() => materializeFlashcardBankDraft(notRequired as never, draftAuthorization),
    /Flashcards N\/A/);
  assert.doesNotThrow(() => materializeFlashcardBankDraft(notRequired as never, {
    ...draftAuthorization,
    independentBankAuthorization: {
      sourceSha: sha('a'), rationale: 'Explicitly approved independent memory reinforcement',
    },
  }));
});
test('Flashcard Bank rejects pending nested Side Blocks and stale reviewed structured input', () => {
  const input = completed();
  Object.assign(input.config.flashcards.items.alpha.config.content.front.items.frontText, {
    production: { pending: true },
  });
  assert.throws(() => materializeFlashcardBank(input as never, finalAuthorization(input)),
    /pending bank authoring source/);
  const auth = finalAuthorization();
  auth.reviewed.reviewedInputSha256 = sha('0') + '0'.repeat(24);
  assert.throws(() => materializeFlashcardBank(completed() as never, auth),
    /structured review input SHA-256|Structured bank input differs/);
});
