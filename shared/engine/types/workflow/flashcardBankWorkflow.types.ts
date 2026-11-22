import type { CourseWorkflowStage1Languages } from './courseWorkflow.types';
import type { LessonProductionAssessmentRequirements } from './lessonAssessment.types';
import type { Lesson_Config } from '../../configurators/lessons/defineLesson/defineLesson.schemas';
import type {
  Flashcard_Config,
  Flashcard_Flag_Config,
  Flashcard_Relationship,
  Flashcard_Relationship_Type,
} from '../../configurators/flashcards/defineFlashcard/defineFlashcard.schemas';
import type { FlashcardSide_Config } from '../../configurators/flashcards/defineFlashcardSide/defineFlashcardSide.schemas';
import type { FlashcardsSection_Config } from '../../configurators/sections/defineFlashcardsSection/defineFlashcardsSection.schemas';
import type { ContentBlock_Text_Config } from '../../configurators/contentBlocks/defineText/defineText.schemas';
import type { ContentBlock_Markdown_Config } from '../../configurators/contentBlocks/defineMarkdown/defineMarkdown.schemas';
import type { ContentBlock_Code_Config } from '../../configurators/contentBlocks/defineCode/defineCode.schemas';
import type { ContentBlock_Image_Config } from '../../configurators/contentBlocks/defineImage/defineImage.schemas';
import type { ContentBlock_Video_Config } from '../../configurators/contentBlocks/defineVideo/defineVideo.schemas';
import type { ContentBlock_Audio_Config } from '../../configurators/contentBlocks/defineAudio/defineAudio.schemas';
import type { ContentBlock_Subtitles_Config } from '../../configurators/contentBlocks/defineSubtitles/defineSubtitles.schemas';
import type { ContentBlock_Youtube_Config } from '../../configurators/contentBlocks/defineYoutube/defineYoutube.schemas';
import type { ContentBlock_Carousel_Config } from '../../configurators/contentBlocks/defineCarousel/defineCarousel.schemas';
import type { ContentBlock_Checkpoint_Config } from '../../configurators/contentBlocks/defineCheckpoint/defineCheckpoint.schemas';
import type { ContentBlock_Scene_Config } from '../../configurators/contentBlocks/defineScene/defineScene.schemas';

/**
 * Flashcard Bank authoring is Lesson-owned. It has no second bank UUID.
 * A staged index.ts is an EDITORIAL source, not a defineFlashcard Configurator,
 * published bank, approval record or replacement for the final TS modules.
 */
export type FlashcardBankWorkflowLessonSource = {
  id: Lesson_Config['id'];
  /** Reviewed, assembled Lesson source (not an invented or unreviewed draft). */
  sourceSha: string;
  /** The actual purpose=flashcards Lesson reference, pinned to its source revision. */
  reference: { path: string; sourceSha: string };
  languages: CourseWorkflowStage1Languages;
  assessment: LessonProductionAssessmentRequirements;
};

/** Own Questions must be approved before Stage 1, unless explicitly N/A.
 * An absent local Quiz is never evidence that Questions are N/A.
 */
export type FlashcardBankWorkflowQuestionPrerequisite =
  | {
      kind: 'completed';
      sourceSha: string;
      reviewSha: string;
      /** A reviewed and integrated Question Bank, not a selected Quiz subset. */
      bankPath: string;
      integrated: true;
    }
  | {
      kind: 'notApplicable';
      /** Methodologist-backed decision recorded in the parent Lesson PR. */
      rationale: string;
      methodologySourceSha: string;
      parentLessonPr: number;
      questionSourceSha?: never;
    };

export type FlashcardBankWorkflowStage1Production = {
  lesson: FlashcardBankWorkflowLessonSource;
  questions: FlashcardBankWorkflowQuestionPrerequisite;
  /** The memory objective inventory, not pre-authored fabricated cards. */
  analysis: {
    recallObjectives: readonly [string, ...string[]];
    sourceFactsAndConcepts: readonly string[];
    misconceptionsAndContrasts: readonly string[];
    exclusions: readonly { target: string; reason: string }[];
    cardCountRationale: string;
    sourceGrounding: string;
  };
};

/** Stage 1 is a minimal, non-publishable bank-owned Lesson Stage 8 handoff.
 * No Card, Side, or Section may be materialized from this shape.
 */
export type FlashcardBankWorkflowStage1 = {
  config?: never;
  production: FlashcardBankWorkflowStage1Production;
};

/** Use the REAL Engine ContentBlock Config discriminated unions.
 * These are source-language authoring nodes, not resolved Props or fabricated
 * {kind:'questionField', fieldPath:...} references. Builders must resolve any
 * intentional imported Question Configurator field directly and type-safely.
 */
export type FlashcardBankWorkflowContentBlockConfig =
  | ContentBlock_Text_Config
  | ContentBlock_Markdown_Config
  | ContentBlock_Code_Config
  | ContentBlock_Image_Config
  | ContentBlock_Video_Config
  | ContentBlock_Audio_Config
  | ContentBlock_Subtitles_Config
  | ContentBlock_Youtube_Config
  | ContentBlock_Carousel_Config
  | ContentBlock_Checkpoint_Config
  | ContentBlock_Scene_Config;

/** A nested node may retain materialization-only notes without putting
 * approval, assets, or imaginary Question-source fields into Engine Config.
 */
export type FlashcardBankWorkflowBlockNode =
  | FlashcardBankWorkflowContentBlockConfig
  | {
      config: FlashcardBankWorkflowContentBlockConfig;
      production?: { specification?: string; pending?: boolean };
    };

/** FlashcardSide has exactly items/order: no UUID, slug, params or type. */
export type FlashcardBankWorkflowSideSource = Omit<FlashcardSide_Config, 'items'> & {
  items: Record<string, FlashcardBankWorkflowBlockNode>;
};

/** Flags use the Engine's actual discriminated ARRAY union, never items/order. */
export type FlashcardBankWorkflowFlags = Flashcard_Flag_Config[];

/** One graph edge authored ONCE with slug endpoints. Stage 5 expands to
 * Flashcard_Relationship on each real endpoint by UUID and position.
 */
export type FlashcardBankWorkflowRelationshipEdge = Pick<
  Flashcard_Relationship,
  'relationshipId'
> & {
  type: Flashcard_Relationship_Type;
  source: Flashcard_Config['slug'];
  target: Flashcard_Config['slug'];
};

/** Stage 2 Card Config does not permit pre-expanded endpoint relationships:
 * those are deterministically derived from the bank's canonical edge graph.
 */
export type FlashcardBankWorkflowCardConfig = Omit<Flashcard_Config, 'parameters' | 'content'> & {
  parameters: Omit<Flashcard_Config['parameters'], 'relationships' | 'flags'> & {
    flags: FlashcardBankWorkflowFlags;
    relationships?: never;
  };
  content: {
    front: FlashcardBankWorkflowSideSource;
    back: FlashcardBankWorkflowSideSource;
    hint?: FlashcardBankWorkflowSideSource;
  };
};

export type FlashcardBankWorkflowCard = {
  config: FlashcardBankWorkflowCardConfig;
  production: {
    recallObjective: string;
    grounding: string;
    /** Explain why this direction is useful, including any reverse partner. */
    directionRationale: string;
    /** Accessibility restrictions must be per retrieval direction. */
    accessibilityRationale: string;
    /** Question reuse is evidence, NOT an invented ContentBlock Config field.
     * Unresolved imports block that particular card's Stage 5 materialization.
     */
    questionReuse?: {
      questionSourceSha: string;
      exportPath: string;
      exportName: string;
      fieldPath: string;
      expectedLocales: CourseWorkflowStage1Languages['planned'];
    };
    pending?: boolean;
    specification?: string;
  };
};

export type FlashcardBankWorkflowStage2Config = {
  flashcards: {
    items: Record<string, FlashcardBankWorkflowCard>;
    order: string[];
  };
  relationships: {
    items: Record<string, FlashcardBankWorkflowRelationshipEdge>;
    order: string[];
  };
};

export type FlashcardBankWorkflowStage2 = Omit<FlashcardBankWorkflowStage1, 'config'> & {
  config: FlashcardBankWorkflowStage2Config;
  production: FlashcardBankWorkflowStage1Production & {
    design: {
      atomicityAudit: string;
      directionAndDuplicationAudit: string;
      acronymAndListAudit: string;
      mediaAndAccessibilityAudit: string;
      relationshipAudit: string;
    };
  };
};

/** This is Section PLACEMENT/SELECTION INTENT only, not a second bank or
 * another serialized UUID list. The Section owner imports the completed
 * Flashcard Configurators and writes flashcardIds: [card.id, ...].
 */
export type FlashcardBankWorkflowSectionDecision =
  | {
      kind: 'notApplicable';
      rationale: string;
    }
  | {
      kind: 'selected';
      section: Pick<FlashcardsSection_Config, 'id' | 'slug'>;
      existingSection: boolean;
      /** Existing Lesson Section ordering must be preserved when present. */
      placement: string;
      /** Named Card entries in config.flashcards.items, not copied UUIDs. */
      selectedCardSlugs: readonly [string, ...string[]];
      rationale: string;
      lessonSourceSha: string;
    };

export type FlashcardBankWorkflowStage3 = Omit<FlashcardBankWorkflowStage2, 'production'> & {
  production: FlashcardBankWorkflowStage2['production'] & {
    section: FlashcardBankWorkflowSectionDecision;
  };
};

/** The reviewed FINAL Stage 3 source is the sole Stage 5 input.
 * Independent Stage 4 reviewer identity, verdict, final SHA, production
 * approval and translation evidence live in the existing Flashcards PR,
 * not in duplicate Stage 4 Configs/Props or a second editorial file.
 */
export type FlashcardBankWorkflowMaterializerInput = FlashcardBankWorkflowStage3;
