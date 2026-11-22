/**
 * Explicit Lesson-owned Flashcard Bank Stage 1/Stage 5 source operations.
 * A bank is NOT a Card; the existing materializeFlashcard() retains that role.
 */
import type {
  FlashcardBankWorkflowStage1,
  FlashcardBankWorkflowMaterializerInput,
} from '../../../types/workflow/flashcardBankWorkflow.types';
import type {
  Flashcard_Relationship, Flashcard_Relationship_Type,
} from '../../../configurators/flashcards/defineFlashcard/defineFlashcard.schemas';
import { materializeFlashcard } from '../flashcard/materializeFlashcard';
import {
  assertBankLanguages, assertBankOrder, assertBankPath, assertBankSha,
  assertBankStatement, assertBankUuid, assertUniqueBankEntityIds, assertNoPendingBankSources,
  assertReviewedBankInput,
  authoredBankLiteral, preflightBankSource,
  type BankReviewedSource, type BankSourceSnapshot, type BankSourceResult,
  type BankSourceFile, type BankSourceDiagnostic,
} from '../bankSource/bankSourceSafety';
import { materializeAssessmentBlock, type AssessmentBlockEvidence } from '../bankSource/materializeAssessmentBlock';

export type FlashcardBankDraftAuthorization = {
  authorized: true;
  ownerLessonId: string;
  lessonSourceSha: string;
  referenceSourceSha: string;
  /** Trusted current Question Stage 4/5 completion, or Methodologist N/A SHA. */
  questionSourceSha?: string;
  questionReviewSha?: string;
  methodologySourceSha?: string;
  /** Explicit Lesson owner exception when a standalone bank is not otherwise required. */
  independentBankAuthorization?: { sourceSha: string; rationale: string };
  snapshot: BankSourceSnapshot;
};
export type FlashcardBankFinalAuthorization = Omit<FlashcardBankDraftAuthorization, 'authorized'> & {
  reviewed: BankReviewedSource;
  blocks: AssessmentBlockEvidence;
};

const symmetric = new Set<Flashcard_Relationship_Type>([
  'reverse', 'equivalent', 'contrast', 'complementary',
]);
const relationshipTypes = new Set<Flashcard_Relationship_Type>([
  'reverse', 'equivalent', 'contrast', 'complementary',
  'prerequisite', 'partOf', 'exampleOf', 'causes', 'precedes',
]);
const safeName = /^[a-z][A-Za-z0-9]*$/;

function validateStage1(
  input: FlashcardBankWorkflowStage1,
  auth: FlashcardBankDraftAuthorization | FlashcardBankFinalAuthorization,
): void {
  if (!input?.production?.lesson) throw new Error('Owning Lesson Stage 8 handoff required');
  const { lesson, questions, analysis } = input.production;
  assertBankUuid(auth.ownerLessonId, 'Flashcard owner Lesson');
  if (lesson.id !== auth.ownerLessonId) throw new Error('Flashcard Bank Lesson UUID mismatch');
  assertBankSha(lesson.sourceSha, 'Lesson source SHA');
  assertBankSha(lesson.reference.sourceSha, 'Flashcard reference SHA');
  assertBankPath(lesson.reference.path);
  if (auth.lessonSourceSha !== lesson.sourceSha ||
      auth.referenceSourceSha !== lesson.reference.sourceSha) {
    throw new Error('Stale Lesson/reference approval for Flashcards');
  }
  assertBankLanguages(lesson.languages);
  if (!lesson.assessment || typeof lesson.assessment.questionBankRequired !== 'boolean' ||
      typeof lesson.assessment.flashcardBankRequired !== 'boolean' ||
      typeof lesson.assessment.quizSectionRequired !== 'boolean' ||
      typeof lesson.assessment.flashcardsSectionRequired !== 'boolean') {
    throw new Error('All four Lesson assessment decisions must be preserved');
  }
  if (lesson.assessment.flashcardBankRequired !== true) {
    const independent = auth.independentBankAuthorization;
    if (!independent) throw new Error('Flashcards N/A: independent bank authorization required');
    assertBankSha(independent.sourceSha, 'Independent Flashcard Bank authorization');
    assertBankStatement(independent.rationale, 'Independent Flashcard Bank rationale');
    if (independent.sourceSha !== lesson.sourceSha) throw new Error('Stale independent Flashcard Bank authorization');
  }
  if (!questions || (questions.kind !== 'completed' && questions.kind !== 'notApplicable')) {
    throw new Error('Explicit Questions-first prerequisite required');
  }
  if (questions.kind === 'completed') {
    assertBankSha(questions.sourceSha, 'Completed Questions source');
    assertBankSha(questions.reviewSha, 'Completed Questions review');
    assertBankPath(questions.bankPath);
    if (questions.integrated !== true ||
        questions.sourceSha !== auth.questionSourceSha ||
        questions.reviewSha !== auth.questionReviewSha) {
      throw new Error('Missing, unintegrated or stale independently reviewed Question Bank');
    }
  } else {
    assertBankStatement(questions.rationale, 'Methodologist Questions N/A rationale');
    assertBankSha(questions.methodologySourceSha, 'Methodologist Questions N/A source');
    if (!Number.isInteger(questions.parentLessonPr) || questions.parentLessonPr <= 0 ||
        questions.methodologySourceSha !== auth.methodologySourceSha ||
        lesson.assessment.questionBankRequired) {
      throw new Error('Unauthenticated or contradictory Questions N/A decision');
    }
  }
  if (!analysis || !Array.isArray(analysis.recallObjectives) ||
      !analysis.recallObjectives.length) {
    throw new Error('Real Flashcard recall analysis required');
  }
  for (const target of analysis.recallObjectives) assertBankStatement(target, 'recall objective');
  assertBankStatement(analysis.cardCountRationale, 'card count rationale');
  assertBankStatement(analysis.sourceGrounding, 'source grounding');
  for (const exclusion of analysis.exclusions) {
    assertBankStatement(exclusion.target, 'excluded target');
    assertBankStatement(exclusion.reason, 'excluded reason');
  }
}

/** Produce exactly one bank-owned Stage 1 index; no Card, Side or Section. */
export function materializeFlashcardBankDraft(
  input: FlashcardBankWorkflowStage1,
  authorization: FlashcardBankDraftAuthorization,
): BankSourceResult {
  if (authorization.authorized !== true) throw new Error('Lesson Stage 8 authorization missing');
  validateStage1(input, authorization);
  const files: BankSourceFile[] = [{
    path: 'flashcards/index.ts', kind: 'typescript',
    content: "import type { FlashcardBankWorkflowStage1 } from '@svitlo/engine/build';\n\n" +
      '// Stage 1 editorial source. NOT a Card, Side or Flashcards Section.\n' +
      'export const flashcardBank = ' + authoredBankLiteral(input) +
      ' satisfies FlashcardBankWorkflowStage1;\n',
  }];
  return preflightBankSource(files, authorization.snapshot);
}

type Card = FlashcardBankWorkflowMaterializerInput['config']['flashcards']['items'][string];

/** Expand a single reviewed edge into both existing immutable Card UUID endpoints. */
function projectRelationships(
  bank: FlashcardBankWorkflowMaterializerInput,
): Readonly<Record<string, { items: Record<string, Flashcard_Relationship>; order: string[] }>> {
  const cards = bank.config.flashcards.items;
  const edges = bank.config.relationships;
  assertBankOrder(edges.items, edges.order, 'Flashcard relationship graph', false);
  const projected: Record<string, { items: Record<string, Flashcard_Relationship>; order: string[] }> =
    Object.fromEntries(bank.config.flashcards.order.map(slug => [slug, { items: {}, order: [] }]));
  const seenIds = new Set<string>();
  const seenPairs = new Set<string>();
  for (const key of edges.order) {
    const edge = edges.items[key];
    if (!relationshipTypes.has(edge.type)) throw new Error('Unsupported Flashcard relation ' + key);
    assertBankStatement(edge.relationshipId, 'relationship ID');
    if (!Object.hasOwn(cards, edge.source) || !Object.hasOwn(cards, edge.target) ||
        edge.source === edge.target) {
      throw new Error('Unknown/self relation endpoint: ' + key);
    }
    if (seenIds.has(edge.relationshipId)) throw new Error('Duplicate relationshipId ' + edge.relationshipId);
    seenIds.add(edge.relationshipId);
    const ends = symmetric.has(edge.type) ?
      [edge.source, edge.target].sort().join('|') : edge.source + '|' + edge.target;
    const pairKey = edge.type + '|' + ends;
    if (seenPairs.has(pairKey)) throw new Error('Duplicate or reversed relationship ' + pairKey);
    seenPairs.add(pairKey);
    for (const [from, to, position] of [
      [edge.source, edge.target, symmetric.has(edge.type) ? 'peer' : 'source'],
      [edge.target, edge.source, symmetric.has(edge.type) ? 'peer' : 'target'],
    ] as const) {
      const targetId = cards[to].config.id;
      assertBankUuid(targetId, 'relationship target Card UUID');
      projected[from].items[key] = {
        relationshipId: edge.relationshipId,
        type: edge.type,
        relatedFlashcardId: targetId,
        position,
      };
      projected[from].order.push(key);
    }
  }
  return projected;
}

function checkSides(card: Card, slug: string): void {
  if (card.production.pending) throw new Error('Pending Flashcard content ' + slug);
  if (card.production.questionReuse) {
    throw new Error('Unresolved typed Question reuse: ' + slug + ' (no verified import adapter)');
  }
  for (const role of ['front', 'back', 'hint'] as const) {
    const side = card.config.content[role];
    if (!side) continue;
    assertBankOrder(side.items, side.order, 'Flashcard ' + slug + ' ' + role, role !== 'hint');
    for (const key of side.order) {
      const node = side.items[key];
      const config = 'config' in node ? node.config : node;
      if (config.slug !== key) throw new Error('Flashcard Side Block slug mismatch at ' + slug + '/' + role + '/' + key);
      assertBankUuid(config.id, 'Flashcard Side ContentBlock');
    }
  }
  if (!card.config.content.front || !card.config.content.back) {
    throw new Error('Flashcard requires real front/back Sides');
  }
}

/**
 * Stage 5: render all Cards through the individual Card/Side/Block renderers.
 * This is a source plan, NOT a write, Lesson Section change, or publication.
 */
export function materializeFlashcardBank(
  input: FlashcardBankWorkflowMaterializerInput,
  authorization: FlashcardBankFinalAuthorization,
): BankSourceResult {
  validateStage1(input, authorization);
  assertReviewedBankInput(input, authorization.reviewed);
  const inventory = input.config.flashcards;
  assertBankOrder(inventory.items, inventory.order, 'Flashcard inventory', true);
  assertUniqueBankEntityIds(inventory);
  assertNoPendingBankSources(inventory);
  const ids = new Set<string>();
  for (const slug of inventory.order) {
    const card = inventory.items[slug];
    if (!card || card.config.slug !== slug || !safeName.test(slug)) {
      throw new Error('Flashcard key/slug mismatch: ' + slug);
    }
    assertBankUuid(card.config.id, 'Flashcard UUID ' + slug);
    if (ids.has(card.config.id.toLowerCase())) throw new Error('Duplicate Card UUID ' + card.config.id);
    ids.add(card.config.id.toLowerCase());
    assertBankStatement(card.production.recallObjective, 'Flashcard recall objective');
    assertBankStatement(card.production.grounding, 'Flashcard source grounding');
    checkSides(card, slug);
  }
  for (const key of ['atomicityAudit', 'directionAndDuplicationAudit', 'acronymAndListAudit',
    'mediaAndAccessibilityAudit', 'relationshipAudit'] as const) {
    assertBankStatement(input.production.design[key], 'Flashcard design audit ' + key);
  }
  const section = input.production.section;
  if (!section || (section.kind !== 'notApplicable' && section.kind !== 'selected')) {
    throw new Error('Explicit optional Flashcards Section intent required');
  }
  assertBankStatement(section.rationale, 'Flashcards Section rationale');
  if (section.kind === 'selected') {
    assertBankUuid(section.section.id, 'Flashcards Section UUID');
    if (!safeName.test(section.section.slug) || !section.placement.trim() ||
        section.lessonSourceSha !== input.production.lesson.sourceSha ||
        !section.selectedCardSlugs.length ||
        new Set(section.selectedCardSlugs).size !== section.selectedCardSlugs.length ||
        section.selectedCardSlugs.some(slug => !Object.hasOwn(inventory.items, slug))) {
      throw new Error('Flashcards Section selection/placement is not reviewed or real');
    }
  }
  const edges = projectRelationships(input);
  const languages = input.production.lesson.languages;
  const files: BankSourceFile[] = [];
  const diagnostics: BankSourceDiagnostic[] = [];
  const imports: string[] = [];
  const entries: string[] = [];
  for (const slug of inventory.order) {
    const card = inventory.items[slug];
    const projected = edges[slug];
    const config = {
      ...card.config,
      parameters: {
        ...card.config.parameters,
        ...(projected.order.length ? { relationships: projected } : {}),
      },
    };
    const output = materializeFlashcard(
      { config: config as unknown as Parameters<typeof materializeFlashcard>[0]['config'],
        production: { pending: card.production.pending, specification: card.production.specification } },
      {
        directory: 'flashcards', languages,
        materializeBlock: (block, context) => materializeAssessmentBlock(
          block, context, languages.planned, 'flashcardsLanguages', authorization.blocks),
      },
    );
    files.push(...output.files);
    diagnostics.push(...(output.diagnostics ?? []));
    const alias = 'card_' + slug;
    imports.push('import { ' + output.exportName + ' as ' + alias + ' } from ' + JSON.stringify('./' + slug) + ';');
    entries.push('  ' + JSON.stringify(slug) + ': ' + alias + ',');
  }
  files.push({
    path: 'flashcards/index.ts', kind: 'typescript',
    content: imports.join('\n') + '\n\nexport const flashcards = {\n' +
      entries.join('\n') + '\n};\n',
  });
  files.push({
    path: 'flashcardsLanguages.ts', kind: 'typescript',
    content: '// Approved document language only; independent translations are not generated.\n' +
      'export const languages = ' + JSON.stringify([languages.document]) + ' as const;\n',
  });
  files.push({
    path: 'flashcards.reviewed-stage3.ts.txt', kind: 'archive',
    content: authorization.reviewed.content,
  });
  const plan = preflightBankSource(files, authorization.snapshot, {
    indexPath: 'flashcards/index.ts',
    archivePath: 'flashcards.reviewed-stage3.ts.txt',
    reviewed: authorization.reviewed,
  });
  return { ...plan, diagnostics };
}
