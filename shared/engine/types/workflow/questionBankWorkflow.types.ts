import type { z } from 'zod';
import type {
  questionBankWorkflowStage1_Schema,
  questionBankWorkflowStage2_Schema,
  questionBankWorkflowStage3_Schema,
  questionBankWorkflowQuestionKinds_Schema,
  questionBankWorkflowQuestionConfig_Schemas,
  questionBankWorkflowQuestionNode_Schema,
  questionBankWorkflowQuestionProduction_Schema,
  questionBankWorkflowBlockConfig_Schema,
  questionBankWorkflowBlockNode_Schema,
  questionBankWorkflowBlockProduction_Schema,
  questionBankWorkflowCarouselConfig_Schema,
  questionBankWorkflowCheckpointAnswerConfig_Schema,
  questionBankWorkflowCheckpointItemConfig_Schema,
  questionBankWorkflowCheckpointConfig_Schema,
  questionBankWorkflowQuizIntent_Schema,
} from './bankWorkflowFinal.schemas';

/** Only the actual Lesson UUID and source/planned languages are authored at Stage 1. */
export type QuestionBankWorkflowStage1 = z.infer<typeof questionBankWorkflowStage1_Schema>;
export type QuestionBankWorkflowStage1Config = QuestionBankWorkflowStage1['config'];
export type QuestionBankWorkflowStage1Production = QuestionBankWorkflowStage1['production'];

/** A typed ordered collection corresponds to the shared workflowOrdered_Schema.
 * Each concrete child collection is parsed by that schema at Stage 5.
 */
export type QuestionBankWorkflowOrdered<Child> = { items: Record<string, Child>; order: string[] };
export type QuestionBankWorkflowBlockProduction = z.infer<typeof questionBankWorkflowBlockProduction_Schema>;
export type QuestionBankWorkflowBlockConfig = z.infer<typeof questionBankWorkflowBlockConfig_Schema>;
export type QuestionBankWorkflowBlockNode<
  Config extends QuestionBankWorkflowBlockConfig = QuestionBankWorkflowBlockConfig,
> = Omit<z.infer<typeof questionBankWorkflowBlockNode_Schema>, 'config'> & { config: Config };
export type QuestionBankWorkflowCarouselConfig = z.infer<typeof questionBankWorkflowCarouselConfig_Schema>;
export type QuestionBankWorkflowCheckpointAnswerConfig = z.infer<typeof questionBankWorkflowCheckpointAnswerConfig_Schema>;
export type QuestionBankWorkflowCheckpointItemConfig = z.infer<typeof questionBankWorkflowCheckpointItemConfig_Schema>;
export type QuestionBankWorkflowCheckpointConfig = z.infer<typeof questionBankWorkflowCheckpointConfig_Schema>;

export type QuestionBankWorkflowQuestionProduction = z.infer<typeof questionBankWorkflowQuestionProduction_Schema>;
export type QuestionBankWorkflowQuestionConfig =
  z.infer<(typeof questionBankWorkflowQuestionConfig_Schemas)[keyof typeof questionBankWorkflowQuestionConfig_Schemas]>;
export type QuestionBankWorkflowQuestionNode<
  Config extends QuestionBankWorkflowQuestionConfig = QuestionBankWorkflowQuestionConfig,
> = Omit<z.infer<typeof questionBankWorkflowQuestionNode_Schema>, 'config'> & { config: Config };
export type QuestionBankWorkflowSelectOneAnswerConfig = z.infer<typeof questionBankWorkflowQuestionConfig_Schemas.selectOneAnswer>;
export type QuestionBankWorkflowSelectMultipleAnswersConfig = z.infer<typeof questionBankWorkflowQuestionConfig_Schemas.selectMultipleAnswers>;
export type QuestionBankWorkflowMatchBlocksConfig = z.infer<typeof questionBankWorkflowQuestionConfig_Schemas.matchBlocks>;
export type QuestionBankWorkflowAnswerWithTextConfig = z.infer<typeof questionBankWorkflowQuestionConfig_Schemas.answerWithText>;
export type QuestionBankWorkflowAnswerWithNumberConfig = z.infer<typeof questionBankWorkflowQuestionConfig_Schemas.answerWithNumber>;
export type QuestionBankWorkflowOrderSequenceConfig = z.infer<typeof questionBankWorkflowQuestionConfig_Schemas.orderSequence>;
export type QuestionBankWorkflowBuildAnswerWithBlocksConfig = z.infer<typeof questionBankWorkflowQuestionConfig_Schemas.buildAnswerWithBlocks>;
export type QuestionBankWorkflowFillBlanksWithBlocksConfig = z.infer<typeof questionBankWorkflowQuestionConfig_Schemas.fillBlanksWithBlocks>;
export type QuestionBankWorkflowFillBlanksWithTextConfig = z.infer<typeof questionBankWorkflowQuestionConfig_Schemas.fillBlanksWithText>;
export type QuestionBankWorkflowGroups = z.infer<typeof questionBankWorkflowQuestionKinds_Schema>;
/** Preserve the compile-time nonempty inventory in addition to the runtime Zod refinement. */
export type QuestionBankWorkflowNonemptyGroups = {
  [Kind in keyof QuestionBankWorkflowGroups]-?: Required<Pick<QuestionBankWorkflowGroups, Kind>> &
    Partial<Omit<QuestionBankWorkflowGroups, Kind>>;
}[keyof QuestionBankWorkflowGroups];

type ParsedStage2 = z.infer<typeof questionBankWorkflowStage2_Schema>;
export type QuestionBankWorkflowStage2Config = Omit<ParsedStage2['config'], 'questions'> & {
  questions: QuestionBankWorkflowNonemptyGroups;
};
export type QuestionBankWorkflowStage2 = Omit<ParsedStage2, 'config'> & {
  config: QuestionBankWorkflowStage2Config;
};
export type QuestionBankWorkflowQuizIntent = z.infer<typeof questionBankWorkflowQuizIntent_Schema>;
export type QuestionBankWorkflowStage3 = z.infer<typeof questionBankWorkflowStage3_Schema>;
export type QuestionBankWorkflowStage3Production = QuestionBankWorkflowStage3['production'];
