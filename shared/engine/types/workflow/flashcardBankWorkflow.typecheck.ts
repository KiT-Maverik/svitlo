import type { ContentBlock_Text_Config } from '../../configurators/contentBlocks/defineText/defineText.schemas';
import type { ContentBlock_Code_Config } from '../../configurators/contentBlocks/defineCode/defineCode.schemas';
import type { ContentBlock_Markdown_Config } from '../../configurators/contentBlocks/defineMarkdown/defineMarkdown.schemas';
import type {
  FlashcardBankWorkflowStage1,
  FlashcardBankWorkflowStage2,
  FlashcardBankWorkflowStage3,
  FlashcardBankWorkflowCardConfig,
  FlashcardBankWorkflowSideSource,
  FlashcardBankWorkflowFlags,
  FlashcardBankWorkflowRelationshipEdge,
  FlashcardBankWorkflowMaterializerInput,
  FlashcardBankWorkflowSectionDecision,
} from './flashcardBankWorkflow.types';

const uuid = 'b775647f-203d-481a-a1c7-4d331c000001';
const otherUuid = 'b775647f-203d-481a-a1c7-4d331c000002';

const first: ContentBlock_Text_Config = {
  id: 'b775647f-203d-481a-a1c7-4d331c000011',
  slug: 'prompt',
  type: 'text',
  params: {},
  locale: { value: { uk: 'Що таке орбіта?' } },
};
const answer: ContentBlock_Markdown_Config = {
  id: 'b775647f-203d-481a-a1c7-4d331c000012',
  slug: 'answer',
  type: 'markdown',
  params: {},
  locale: { value: { uk: 'Шлях тіла навколо іншого тіла.' } },
};
const code: ContentBlock_Code_Config = {
  id: 'b775647f-203d-481a-a1c7-4d331c000013',
  slug: 'example',
  type: 'code',
  params: { language: 'typescript', codeAsText: 'const %_%NAME%_% = 1;' },
  locale: { variables: { NAME: { uk: 'orbit' } } },
};

const front = { items: { prompt: first }, order: ['prompt'] } satisfies FlashcardBankWorkflowSideSource;
const back = { items: { answer, example: code }, order: ['answer', 'example'] } satisfies FlashcardBankWorkflowSideSource;
const flags = [
  { type: 'list', count: 2 },
  { type: 'acronym', value: { uk: 'АБ' } },
  { type: 'custom', value: { uk: 'Пам’ятай' }, color: 'info', icon: 'lightbulb' },
  { type: 'warning' },
] satisfies FlashcardBankWorkflowFlags;

const card: FlashcardBankWorkflowCardConfig = {
  id: uuid,
  slug: 'orbitRecall',
  parameters: { tags: ['astronomy'], disabilities: [], flags },
  content: { front, back, hint: { items: { hint: first }, order: ['hint'] } },
};

const prerequisite = {
  kind: 'completed',
  sourceSha: 'verified-question-source-sha',
  reviewSha: 'independent-question-review-sha',
  bankPath: 'content/math/data/lessons/1/lesson-uuid/questions/index.ts',
  integrated: true,
} as const;

const stage1 = {
  production: {
    lesson: {
      id: 'b775647f-203d-481a-a1c7-4d331c000099',
      sourceSha: 'approved-lesson-source-sha',
      reference: { path: 'scoped/flashcards/uk.md', sourceSha: 'approved-lesson-source-sha' },
      languages: { document: 'uk', planned: ['uk', 'en'] },
      assessment: {
        questionBankRequired: true,
        flashcardBankRequired: true,
        quizSectionRequired: false,
        flashcardsSectionRequired: false,
      },
    },
    questions: prerequisite,
    analysis: {
      recallObjectives: ['Recognize orbit', 'Recall definition'],
      sourceFactsAndConcepts: ['Orbital path'],
      misconceptionsAndContrasts: [],
      exclusions: [{ target: 'Long explanation', reason: 'Belongs in Lesson' }],
      cardCountRationale: 'Two distinct retrieval directions',
      sourceGrounding: 'Pinned approved Lesson methodology',
    },
  },
} satisfies FlashcardBankWorkflowStage1;

const edge = {
  relationshipId: 'orbitReverse',
  type: 'reverse',
  source: 'orbitRecall',
  target: 'orbitReverse',
} satisfies FlashcardBankWorkflowRelationshipEdge;

const stage2 = {
  ...stage1,
  config: {
    flashcards: {
      items: {
        orbitRecall: {
          config: card,
          production: {
            recallObjective: 'Define orbit',
            grounding: 'Approved Lesson',
            directionRationale: 'Definition retrieval',
            accessibilityRationale: 'Text equivalent included',
          },
        },
        orbitReverse: {
          config: { ...card, id: otherUuid, slug: 'orbitReverse' },
          production: {
            recallObjective: 'Identify an orbit',
            grounding: 'Approved Lesson',
            directionRationale: 'Meaningful reverse retrieval',
            accessibilityRationale: 'Text equivalent included',
          },
        },
      },
      order: ['orbitRecall', 'orbitReverse'],
    },
    relationships: { items: { orbitReverse: edge }, order: ['orbitReverse'] },
  },
  production: {
    ...stage1.production,
    design: {
      atomicityAudit: 'One retrieval target per card',
      directionAndDuplicationAudit: 'Opposite directions',
      acronymAndListAudit: 'Reviewed actual list and mnemonic',
      mediaAndAccessibilityAudit: 'Text alternatives',
      relationshipAudit: 'Single reverse edge',
    },
  },
} satisfies FlashcardBankWorkflowStage2;

const stage3NoSection = {
  ...stage2,
  production: { ...stage2.production, section: { kind: 'notApplicable', rationale: 'Bank for future practice' } },
} satisfies FlashcardBankWorkflowStage3;

const stage3WithSection = {
  ...stage2,
  production: {
    ...stage2.production,
    section: {
      kind: 'selected',
      section: { id: 'b775647f-203d-481a-a1c7-4d331c000020', slug: 'recap' },
      existingSection: true,
      placement: 'Keep approved Section order',
      selectedCardSlugs: ['orbitRecall'],
      rationale: 'One concise recall check in the Lesson',
      lessonSourceSha: 'approved-lesson-source-sha',
    },
  },
} satisfies FlashcardBankWorkflowStage3;

const materializerNoSection: FlashcardBankWorkflowMaterializerInput = stage3NoSection;
const materializerWithSection: FlashcardBankWorkflowMaterializerInput = stage3WithSection;
// @ts-expect-error Stage 1 has no Card collection and cannot be passed to a complete bank materializer.
const tooEarly1: FlashcardBankWorkflowMaterializerInput = stage1;
// @ts-expect-error Stage 2 lacks the separately reviewed Section decision.
const tooEarly2: FlashcardBankWorkflowMaterializerInput = stage2;

// @ts-expect-error Stage 1 handoff cannot contain fabricated Card Config.
const invalidStage1: FlashcardBankWorkflowStage1 = { ...stage1, config: stage2.config };

// @ts-expect-error A completed Stage 1 must carry explicit verified Questions status.
const noQuestions: FlashcardBankWorkflowStage1 = {
  production: { lesson: stage1.production.lesson, analysis: stage1.production.analysis },
};

// @ts-expect-error Missing Methodologist rationale and pinned SHA cannot bypass Questions first.
const unapprovedNA: FlashcardBankWorkflowStage1['production']['questions'] = { kind: 'notApplicable' };

const badFlag: FlashcardBankWorkflowFlags = [
  // @ts-expect-error Flags must use actual built-in discriminants.
  { type: 'mnemonic', value: { uk: 'АБ' } },
];

// @ts-expect-error Flags are an array, never a slugged items/order collection.
const keyedFlags: FlashcardBankWorkflowFlags = { items: {}, order: [] };

const forbiddenSideIdentity: FlashcardBankWorkflowSideSource = {
  items: { prompt: first },
  order: ['prompt'],
  // @ts-expect-error Sides are not separately UUID-addressed entities.
  id: uuid,
};

const forbiddenCardRelationship: FlashcardBankWorkflowCardConfig = {
  ...card,
  parameters: {
    ...card.parameters,
    // @ts-expect-error Authored edges are bank-owned, not mirrored Card relationships.
    relationships: { items: {}, order: [] },
  },
};

const badEdge: FlashcardBankWorkflowRelationshipEdge = {
  relationshipId: 'wrong',
  // @ts-expect-error Only the nine canonical types are permitted.
  type: 'dependsOn',
  source: 'orbitRecall',
  target: 'orbitReverse',
};

// @ts-expect-error Selected Sections require a nonempty explicitly ordered subset.
const emptySelectedSection: FlashcardBankWorkflowSectionDecision = {
  kind: 'selected',
  section: { id: uuid, slug: 'recap' },
  existingSection: false,
  placement: 'After content',
  selectedCardSlugs: [],
  rationale: 'Too broad',
  lessonSourceSha: 'verified',
};

const invalidSection: FlashcardBankWorkflowSectionDecision = {
  kind: 'notApplicable',
  rationale: 'Bank is independent',
  // @ts-expect-error A no-Section decision cannot smuggle in a UUID selection.
  flashcardIds: [uuid],
};

const badReferenceBlock: ContentBlock_Text_Config = {
  ...first,
  locale: {
    // @ts-expect-error Question-field pseudo-reference is not a valid localized ContentBlock value.
    value: { kind: 'questionField', fieldPath: 'answers.correct' },
  },
};

void materializerNoSection;
void materializerWithSection;
void tooEarly1;
void tooEarly2;
void invalidStage1;
void noQuestions;
void unapprovedNA;
void badFlag;
void keyedFlags;
void forbiddenSideIdentity;
void forbiddenCardRelationship;
void badEdge;
void emptySelectedSection;
void invalidSection;
void badReferenceBlock;
