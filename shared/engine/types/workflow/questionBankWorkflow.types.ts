import type { Lesson_Config } from '../../configurators/lessons/defineLesson/defineLesson.schemas';
import type { Question_SelectOneAnswer_Config } from '../../configurators/questions/defineSelectOneAnswer/defineSelectOneAnswer.schemas';
import type { Question_SelectMultipleAnswers_Config } from '../../configurators/questions/defineSelectMultipleAnswers/defineSelectMultipleAnswers.schemas';
import type { Question_MatchBlocks_Config } from '../../configurators/questions/defineMatchBlocks/defineMatchBlocks.schemas';
import type { Question_AnswerWithText_Config } from '../../configurators/questions/defineAnswerWithText/defineAnswerWithText.schemas';
import type { Question_AnswerWithNumber_Config } from '../../configurators/questions/defineAnswerWithNumber/defineAnswerWithNumber.schemas';
import type { Question_OrderSequence_Config } from '../../configurators/questions/defineOrderSequence/defineOrderSequence.schemas';
import type { Question_BuildAnswerWithBlocks_Config } from '../../configurators/questions/defineBuildAnswerWithBlocks/defineBuildAnswerWithBlocks.schemas';
import type { Question_FillBlanksWithBlocks_Config } from '../../configurators/questions/defineFillBlanksWithBlocks/defineFillBlanksWithBlocks.schemas';
import type { Question_FillBlanksWithText_Config } from '../../configurators/questions/defineFillBlanksWithText/defineFillBlanksWithText.schemas';
import type { ContentBlock_Text_Config } from '../../configurators/contentBlocks/defineText/defineText.schemas';
import type { ContentBlock_Markdown_Config } from '../../configurators/contentBlocks/defineMarkdown/defineMarkdown.schemas';
import type { ContentBlock_Code_Config } from '../../configurators/contentBlocks/defineCode/defineCode.schemas';
import type { ContentBlock_Image_Config } from '../../configurators/contentBlocks/defineImage/defineImage.schemas';
import type { ContentBlock_Video_Config } from '../../configurators/contentBlocks/defineVideo/defineVideo.schemas';
import type { ContentBlock_Youtube_Config } from '../../configurators/contentBlocks/defineYoutube/defineYoutube.schemas';
import type { ContentBlock_Audio_Config } from '../../configurators/contentBlocks/defineAudio/defineAudio.schemas';
import type { ContentBlock_Subtitles_Config } from '../../configurators/contentBlocks/defineSubtitles/defineSubtitles.schemas';
import type { ContentBlock_Scene_Config } from '../../configurators/contentBlocks/defineScene/defineScene.schemas';
import type { ContentBlock_Carousel_Config } from '../../configurators/contentBlocks/defineCarousel/defineCarousel.schemas';
import type { ContentBlock_Checkpoint_Config } from '../../configurators/contentBlocks/defineCheckpoint/defineCheckpoint.schemas';
import type { ContentBlock_CheckpointItem_Config } from '../../configurators/contentBlocks/defineCheckpoint/defineCheckpointItem/defineCheckpointItem.schemas';
import type { ContentBlock_CheckpointAnswer_Config } from '../../configurators/contentBlocks/defineCheckpoint/defineCheckpointAnswer/defineCheckpointAnswer.schemas';
import type { CourseWorkflowStage1Languages } from './courseWorkflow.types';
import type { LessonProductionAssessmentRequirements } from './lessonAssessment.types';

/**
 * Bank-owned authoring source, located at the owning Lesson's questions/index.ts
 * during production. This is NOT a Question Configurator, bank UUID, or a
 * publishable questions/index.ts index until the explicit Stage 5 transition.
 */
export type QuestionBankWorkflowStage1Config = {
  /** Existing, verified Lesson UUID; also the bank's ownership identity. */
  ownerLessonId: Lesson_Config['id'];
};

export type QuestionBankWorkflowEvidence = {
  /** Approved Skill UUID and observable outcome this assessment measures. */
  skillId: Lesson_Config['skills'][number];
  outcome: string;
  /** Real Engine Assessment Method slug; a method is not a response widget. */
  assessmentMethod: Question_SelectOneAnswer_Config['params']['assessmentMethod'];
  cognitiveOperation: string;
  misconception: string;
  context: string;
  expectedEvidence: string;
};

/** Production-only Lesson/assessment analysis, not Question Config fields. */
export type QuestionBankWorkflowStage1Production = {
  /** Document language is the only authored locale until genuine translation. */
  languages: CourseWorkflowStage1Languages;
  /** SHA of the actual Lesson source/derived reference inspected. */
  lesson: {
    sourcePath: string;
    sourceSha: string;
    referencePath: string;
    methodologyPath: string;
    title: string;
  };
  /** Bank ownership is separate from local Quiz Section requirements. */
  assessment: LessonProductionAssessmentRequirements & {
    quizRequiredForCompletion: boolean;
  };
  /** Explain why an independent own bank is pedagogically justified. */
  ownershipRationale: string;
  audience: string;
  scope: string;
  prerequisites: string;
  /** Approved Skill/outcome/method coverage before writing individual Questions. */
  evidenceIntent: readonly QuestionBankWorkflowEvidence[];
  misconceptions: string;
  mediaNeeds: string;
  /** External sources, verified upstream banks and unresolved dependencies. */
  sourcesAndDependencies: string;
};

export type QuestionBankWorkflowStage1 = {
  config: QuestionBankWorkflowStage1Config;
  production: QuestionBankWorkflowStage1Production;
};

/** Ordered authored collections contain plain nested Config objects, never
 * built Configurators. The materializer validates key/order parity and nonempty
 * collections at its Stage 5 boundary; arbitrary string[] cannot prove uniqueness.
 */
export type QuestionBankWorkflowOrdered<Child> = {
  items: Record<string, Child>;
  order: string[];
};

export type QuestionBankWorkflowBlockProduction = {
  /** Referenced approved media/Scene implementation or explicit missing resource. */
  specification?: string;
  mediaSourcePath?: string;
  pending?: boolean;
};

export type QuestionBankWorkflowBlockNode<
  Config extends QuestionBankWorkflowBlockConfig = QuestionBankWorkflowBlockConfig,
> = {
  config: Config;
  production?: QuestionBankWorkflowBlockProduction;
};

type QuestionBankWorkflowSimpleBlockConfig =
  | ContentBlock_Text_Config
  | ContentBlock_Markdown_Config
  | ContentBlock_Code_Config
  | ContentBlock_Image_Config
  | ContentBlock_Video_Config
  | ContentBlock_Youtube_Config
  | ContentBlock_Audio_Config
  | ContentBlock_Subtitles_Config
  | ContentBlock_Scene_Config;

/** Carousel children are only Image/Scene, as in the real Carousel Config. */
export type QuestionBankWorkflowCarouselConfig = Omit<ContentBlock_Carousel_Config, 'slides'> & {
  slides: QuestionBankWorkflowOrdered<
    QuestionBankWorkflowBlockNode<ContentBlock_Image_Config | ContentBlock_Scene_Config>
  >;
};

/** Checkpoint children likewise replace *each* Configurator boundary, not the
 * real Config's scoring/locale/identity fields.
 */
export type QuestionBankWorkflowCheckpointAnswerConfig = Omit<ContentBlock_CheckpointAnswer_Config, 'content'> & {
  content: QuestionBankWorkflowOrdered<
    QuestionBankWorkflowBlockNode<QuestionBankWorkflowSimpleBlockConfig | QuestionBankWorkflowCarouselConfig>
  >;
};
export type QuestionBankWorkflowCheckpointItemConfig = Omit<
  ContentBlock_CheckpointItem_Config,
  'question' | 'answer'
> & {
  question: QuestionBankWorkflowBlockNode<ContentBlock_Text_Config>;
  answer: {
    config: QuestionBankWorkflowCheckpointAnswerConfig;
    production?: QuestionBankWorkflowBlockProduction;
  };
};
export type QuestionBankWorkflowCheckpointConfig = Omit<ContentBlock_Checkpoint_Config, 'content'> & {
  content: QuestionBankWorkflowOrdered<{
    config: QuestionBankWorkflowCheckpointItemConfig;
    production?: QuestionBankWorkflowBlockProduction;
  }>;
};

export type QuestionBankWorkflowBlockConfig =
  | QuestionBankWorkflowSimpleBlockConfig
  | QuestionBankWorkflowCarouselConfig
  | QuestionBankWorkflowCheckpointConfig;

type Blocks = QuestionBankWorkflowOrdered<QuestionBankWorkflowBlockNode>;
type CommonContent = { question: Blocks; hint?: Blocks; explanation?: Blocks };

/** Replace Configurator children of the nine real Question Config schemas. */
export type QuestionBankWorkflowSelectOneAnswerConfig = Omit<Question_SelectOneAnswer_Config, 'content'> & {
  content: CommonContent & { answers: { correct: Blocks; incorrect: Blocks; distractors: Blocks } };
};
export type QuestionBankWorkflowSelectMultipleAnswersConfig = Omit<Question_SelectMultipleAnswers_Config, 'content'> & {
  content: CommonContent & { answers: { correct: Blocks; incorrect: Blocks; distractors: Blocks } };
};
export type QuestionBankWorkflowMatchBlocksConfig = Omit<Question_MatchBlocks_Config, 'content'> & {
  content: CommonContent & {
    pairs: QuestionBankWorkflowOrdered<{ left: QuestionBankWorkflowBlockNode; right: QuestionBankWorkflowBlockNode }>;
  };
};
export type QuestionBankWorkflowAnswerWithTextConfig = Omit<Question_AnswerWithText_Config, 'content'> & {
  content: CommonContent;
};
export type QuestionBankWorkflowAnswerWithNumberConfig = Omit<Question_AnswerWithNumber_Config, 'content'> & {
  content: CommonContent;
};
export type QuestionBankWorkflowOrderSequenceConfig = Omit<Question_OrderSequence_Config, 'content'> & {
  content: CommonContent & { sequence: Blocks };
};
export type QuestionBankWorkflowBuildAnswerWithBlocksConfig = Omit<Question_BuildAnswerWithBlocks_Config, 'content'> & {
  content: CommonContent & { correctSequence: Blocks; distractors: Blocks };
};
export type QuestionBankWorkflowFillBlanksWithBlocksConfig = Omit<Question_FillBlanksWithBlocks_Config, 'content'> & {
  content: CommonContent & {
    slots: QuestionBankWorkflowOrdered<{ correctAnswer: QuestionBankWorkflowBlockNode }>;
    distractors: Blocks;
  };
};
export type QuestionBankWorkflowFillBlanksWithTextConfig = Omit<Question_FillBlanksWithText_Config, 'content'> & {
  content: CommonContent & { slots: Question_FillBlanksWithText_Config['content']['slots'] };
};

/** Every item carries substantive source-language evidence, not approval flags.
 * Source-only Config fields are derived from their real scoring-specific schemas.
 */
export type QuestionBankWorkflowQuestionProduction = {
  evidence: QuestionBankWorkflowEvidence;
  distinction: string;
  intendedUse: 'core' | 'extension';
  rationale: string;
  mediaSpecification?: string;
  /** Missing resources are explicit blockers, never fabricated paths or data. */
  pending?: boolean;
  specification?: string;
};
export type QuestionBankWorkflowQuestionNode<Config> = {
  config: Config;
  production: QuestionBankWorkflowQuestionProduction;
};

export type QuestionBankWorkflowGroups = {
  selectOneAnswer?: Record<string, QuestionBankWorkflowQuestionNode<QuestionBankWorkflowSelectOneAnswerConfig>>;
  selectMultipleAnswers?: Record<string, QuestionBankWorkflowQuestionNode<QuestionBankWorkflowSelectMultipleAnswersConfig>>;
  matchBlocks?: Record<string, QuestionBankWorkflowQuestionNode<QuestionBankWorkflowMatchBlocksConfig>>;
  answerWithText?: Record<string, QuestionBankWorkflowQuestionNode<QuestionBankWorkflowAnswerWithTextConfig>>;
  answerWithNumber?: Record<string, QuestionBankWorkflowQuestionNode<QuestionBankWorkflowAnswerWithNumberConfig>>;
  orderSequence?: Record<string, QuestionBankWorkflowQuestionNode<QuestionBankWorkflowOrderSequenceConfig>>;
  buildAnswerWithBlocks?: Record<string, QuestionBankWorkflowQuestionNode<QuestionBankWorkflowBuildAnswerWithBlocksConfig>>;
  fillBlanksWithBlocks?: Record<string, QuestionBankWorkflowQuestionNode<QuestionBankWorkflowFillBlanksWithBlocksConfig>>;
  fillBlanksWithText?: Record<string, QuestionBankWorkflowQuestionNode<QuestionBankWorkflowFillBlanksWithTextConfig>>;
};

/** Require at least one declared Question kind. Empty groups/missing source
 * copy and duplicate IDs/orders remain validation errors at the final boundary.
 */
export type QuestionBankWorkflowNonemptyGroups = {
  [Kind in keyof QuestionBankWorkflowGroups]-?: Required<Pick<QuestionBankWorkflowGroups, Kind>> &
    Partial<Omit<QuestionBankWorkflowGroups, Kind>>;
}[keyof QuestionBankWorkflowGroups];

export type QuestionBankWorkflowStage2Config = QuestionBankWorkflowStage1Config & {
  questions: QuestionBankWorkflowNonemptyGroups;
};

export interface QuestionBankWorkflowStage2 extends QuestionBankWorkflowStage1 {
  config: QuestionBankWorkflowStage2Config;
}

/** Stage 3 records *design intent*, never a second canonical Question ID
 * selection ledger. The final selection lives ONLY in the Lesson-owned
 * defineQuizSection with imports and questionIds: [approvedQuestion.id].
 */
export type QuestionBankWorkflowQuizIntent =
  | {
      kind: 'none';
      rationale: string;
      sections?: never;
    }
  | {
      kind: 'local';
      rationale: string;
      sections: QuestionBankWorkflowOrdered<{
        sectionId: string;
        sectionPath: string;
        selectionRationale: string;
        coverage: string;
        /** Real upstream provenance when a local Quiz also consumes other banks. */
        upstreamDependencies: string;
      }>;
    };

export type QuestionBankWorkflowStage3Production = QuestionBankWorkflowStage1Production & {
  quiz: QuestionBankWorkflowQuizIntent;
};

/** Final source still contains the entire independently reviewed bank.
 * Actual source-SHA approval is recorded in the owning Questions PR, not here.
 */
export interface QuestionBankWorkflowStage3 extends QuestionBankWorkflowStage2 {
  production: QuestionBankWorkflowStage3Production;
}

/** Reviewed Stage 3 is the exact source passed to the nine concrete materializers.
 * This alias grants no review approval, file-writing permission or publication.
 */
export type QuestionBankWorkflowMaterializerInput = QuestionBankWorkflowStage3;
