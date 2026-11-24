import { z } from 'zod';
import { UNRESOLVED_RESOURCE_UUID } from '../../schemas/media.schemas';
import type { Question_Type } from '../../configurators/questions/question.constants';
import { workflowOrdered_Schema } from './lessonWorkflow.types';
import { text_Config_Schema } from '../../configurators/contentBlocks/defineText/defineText.schemas';
import { markdown_Config_Schema } from '../../configurators/contentBlocks/defineMarkdown/defineMarkdown.schemas';
import { code_Config_Schema } from '../../configurators/contentBlocks/defineCode/defineCode.schemas';
import { image_Config_Schema } from '../../configurators/contentBlocks/defineImage/defineImage.schemas';
import { video_Config_Schema } from '../../configurators/contentBlocks/defineVideo/defineVideo.schemas';
import { youtube_Config_Schema } from '../../configurators/contentBlocks/defineYoutube/defineYoutube.schemas';
import { audio_Config_Schema } from '../../configurators/contentBlocks/defineAudio/defineAudio.schemas';
import { subtitles_Config_Schema } from '../../configurators/contentBlocks/defineSubtitles/defineSubtitles.schemas';
import { scene_Config_Schema } from '../../configurators/contentBlocks/defineScene/defineScene.schemas';
import { carousel_Config_Schema } from '../../configurators/contentBlocks/defineCarousel/defineCarousel.schemas';
import { checkpoint_Config_Schema } from '../../configurators/contentBlocks/defineCheckpoint/defineCheckpoint.schemas';
import { checkpointItem_Config_Schema } from '../../configurators/contentBlocks/defineCheckpoint/defineCheckpointItem/defineCheckpointItem.schemas';
import { checkpointAnswer_Config_Schema } from '../../configurators/contentBlocks/defineCheckpoint/defineCheckpointAnswer/defineCheckpointAnswer.schemas';
import { flashcardsSection_Config_Schema } from '../../configurators/sections/defineFlashcardsSection/defineFlashcardsSection.schemas';
import { flashcardRelationshipTypes } from '../../configurators/flashcards/defineFlashcard/defineFlashcard.schemas';
import { workflowLanguages_Schema } from './workflowLanguages.schemas';
import { lessonProductionAssessmentRequirements_Schema } from './lessonAssessment.types';
import { flashcard_Config_Schema } from '../../configurators/flashcards/defineFlashcard/defineFlashcard.schemas';
import { selectOneAnswer_Config_Schema } from '../../configurators/questions/defineSelectOneAnswer/defineSelectOneAnswer.schemas';
import { selectMultipleAnswers_Config_Schema } from '../../configurators/questions/defineSelectMultipleAnswers/defineSelectMultipleAnswers.schemas';
import { matchBlocks_Config_Schema } from '../../configurators/questions/defineMatchBlocks/defineMatchBlocks.schemas';
import { answerWithText_Config_Schema } from '../../configurators/questions/defineAnswerWithText/defineAnswerWithText.schemas';
import { answerWithNumber_Config_Schema } from '../../configurators/questions/defineAnswerWithNumber/defineAnswerWithNumber.schemas';
import { orderSequence_Config_Schema } from '../../configurators/questions/defineOrderSequence/defineOrderSequence.schemas';
import { buildAnswerWithBlocks_Config_Schema } from '../../configurators/questions/defineBuildAnswerWithBlocks/defineBuildAnswerWithBlocks.schemas';
import { fillBlanksWithBlocks_Config_Schema } from '../../configurators/questions/defineFillBlanksWithBlocks/defineFillBlanksWithBlocks.schemas';
import { fillBlanksWithText_Config_Schema } from '../../configurators/questions/defineFillBlanksWithText/defineFillBlanksWithText.schemas';

/** Final editorial schemas compose real Configurator metadata, leaving composite
 * authored child collections to their owning materializers' order/identity checks.
 * Stage 5 never accepts an unresolved resource as a completed bank.
 */
const sha = z.string().regex(/^[a-f0-9]{40}$/i);
const nonempty = z.string().min(1);
/** Question-only production records contain real source-authoring notes, not a
 * second lesson analysis, assessment method, evidence ledger or status flag.
 */
export const questionBankWorkflowQuestionProduction_Schema = z.strictObject({
  specification: z.string().optional(),
});

/** Question children are authored source Configs, never built Configurators.
 * Compose the same leaf schemas used by Lesson and the nine Question Configs.
 */
export const questionBankWorkflowBlockProduction_Schema = z.strictObject({
  specification: z.string().optional(),
  mediaSourcePath: z.string().optional(),
});
function blockNode<Config extends z.ZodType>(config: Config) {
  return z.strictObject({ config, production: questionBankWorkflowBlockProduction_Schema.optional() });
}
/** A Question source can omit a *resource reference* which the existing
 * concrete materializer replaces with its reserved type-valid placeholder.
 * Every other actual Block Config requirement remains in force.
 */
const imageSource_Schema = z
  .object({
    ...image_Config_Schema.shape,
    locale: image_Config_Schema.shape.locale.extend({
      fileName: image_Config_Schema.shape.locale.shape.fileName.optional(),
    }),
  })
  // Apply the canonical refined Config to a provisional, typed media filename.
  // Only the file reference may be absent; dimensions/accessibility stay checked.
  .refine(
    value =>
      image_Config_Schema.safeParse({
        ...value,
        locale: { ...value.locale, fileName: value.locale.fileName ?? UNRESOLVED_RESOURCE_UUID + '.webp' },
      }).success,
    'Invalid Question Image source Config',
  );
const audioSource_Schema = audio_Config_Schema.extend({
  locale: audio_Config_Schema.shape.locale.extend({
    fileName: audio_Config_Schema.shape.locale.shape.fileName.optional(),
  }),
});
const videoSource_Schema = video_Config_Schema.extend({
  locale: video_Config_Schema.shape.locale.extend({
    fileName: video_Config_Schema.shape.locale.shape.fileName.optional(),
    posterFileName: video_Config_Schema.shape.locale.shape.posterFileName.optional(),
  }),
});
const subtitlesSource_Schema = subtitles_Config_Schema.extend({
  locale: subtitles_Config_Schema.shape.locale.extend({
    fileName: subtitles_Config_Schema.shape.locale.shape.fileName.optional(),
  }),
});
const youtubeSource_Schema = youtube_Config_Schema.extend({
  locale: youtube_Config_Schema.shape.locale.extend({
    href: youtube_Config_Schema.shape.locale.shape.href.optional(),
  }),
});
const questionSceneSource_Schema = scene_Config_Schema.omit({ params: true, locale: true }).extend({
  params: scene_Config_Schema.shape.params.optional(),
  locale: scene_Config_Schema.shape.locale.partial().optional(),
});
const simpleBlock_Schema = z.union([
  text_Config_Schema,
  markdown_Config_Schema,
  code_Config_Schema,
  imageSource_Schema,
  videoSource_Schema,
  youtubeSource_Schema,
  audioSource_Schema,
  subtitlesSource_Schema,
  questionSceneSource_Schema,
]);
const carouselSource_Schema = carousel_Config_Schema.extend({
  slides: workflowOrdered_Schema(z.union([blockNode(imageSource_Schema), blockNode(questionSceneSource_Schema)])),
});
const simpleBlockNode_Schema = blockNode(simpleBlock_Schema);
const carouselNode_Schema = blockNode(carouselSource_Schema);
const checkpointAnswerSource_Schema = checkpointAnswer_Config_Schema.extend({
  content: workflowOrdered_Schema(z.union([simpleBlockNode_Schema, carouselNode_Schema])),
});
const checkpointItemSource_Schema = checkpointItem_Config_Schema.extend({
  question: blockNode(text_Config_Schema),
  answer: blockNode(checkpointAnswerSource_Schema),
});
const checkpointSource_Schema = checkpoint_Config_Schema.extend({
  content: workflowOrdered_Schema(blockNode(checkpointItemSource_Schema)),
});
export const questionBankWorkflowBlockConfig_Schema = z.union([
  simpleBlock_Schema,
  carouselSource_Schema,
  checkpointSource_Schema,
]);
export const questionBankWorkflowBlockNode_Schema = blockNode(questionBankWorkflowBlockConfig_Schema);
export const questionBankWorkflowCarouselConfig_Schema = carouselSource_Schema;
export const questionBankWorkflowCheckpointAnswerConfig_Schema = checkpointAnswerSource_Schema;
export const questionBankWorkflowCheckpointItemConfig_Schema = checkpointItemSource_Schema;
export const questionBankWorkflowCheckpointConfig_Schema = checkpointSource_Schema;
// Avoid serializing the entire recursive Block schema at every Question kind.
const block_Schema: z.ZodType<z.infer<typeof questionBankWorkflowBlockNode_Schema>> = z.union([
  simpleBlockNode_Schema,
  carouselNode_Schema,
  blockNode(checkpointSource_Schema),
]);
const blocks_Schema: z.ZodType<{
  items: Record<string, z.infer<typeof questionBankWorkflowBlockNode_Schema>>;
  order: string[];
}> = workflowOrdered_Schema(block_Schema);
const commonContent_Schema = z.strictObject({
  question: blocks_Schema,
  hint: blocks_Schema.optional(),
  explanation: blocks_Schema.optional(),
});
const answerSets_Schema = z.strictObject({
  correct: blocks_Schema,
  incorrect: blocks_Schema,
  distractors: blocks_Schema,
});
const questionContent = {
  selectOneAnswer: commonContent_Schema.extend({ answers: answerSets_Schema }),
  selectMultipleAnswers: commonContent_Schema.extend({ answers: answerSets_Schema }),
  matchBlocks: commonContent_Schema.extend({
    pairs: workflowOrdered_Schema(
      z.strictObject({
        left: block_Schema,
        right: block_Schema,
      }),
    ),
  }),
  answerWithText: commonContent_Schema,
  answerWithNumber: commonContent_Schema,
  orderSequence: commonContent_Schema.extend({ sequence: blocks_Schema }),
  buildAnswerWithBlocks: commonContent_Schema.extend({
    correctSequence: blocks_Schema,
    distractors: blocks_Schema,
  }),
  fillBlanksWithBlocks: commonContent_Schema.extend({
    slots: workflowOrdered_Schema(z.strictObject({ correctAnswer: block_Schema })),
    distractors: blocks_Schema,
  }),
  fillBlanksWithText: commonContent_Schema.extend({
    slots: fillBlanksWithText_Config_Schema.shape.content.shape.slots,
  }),
};

/** Runtime schemas and TypeScript output types both derive from canonical
 * Question Config schemas. Compact z.ZodType annotations avoid recursively
 * serializing a giant nested Zod AST into Engine's public .d.ts files.
 */
const questionBaseSchemas = {
  selectOneAnswer: selectOneAnswer_Config_Schema,
  selectMultipleAnswers: selectMultipleAnswers_Config_Schema,
  matchBlocks: matchBlocks_Config_Schema,
  answerWithText: answerWithText_Config_Schema,
  answerWithNumber: answerWithNumber_Config_Schema,
  orderSequence: orderSequence_Config_Schema,
  buildAnswerWithBlocks: buildAnswerWithBlocks_Config_Schema,
  fillBlanksWithBlocks: fillBlanksWithBlocks_Config_Schema,
  fillBlanksWithText: fillBlanksWithText_Config_Schema,
} as const satisfies Record<Question_Type, z.ZodType>;
type QuestionSourceConfig<Kind extends Question_Type> = Omit<
  z.infer<(typeof questionBaseSchemas)[Kind]>,
  'content'
> & { content: z.infer<(typeof questionContent)[Kind]> };
export const questionBankWorkflowQuestionConfig_Schemas: {
  [Kind in Question_Type]: z.ZodType<QuestionSourceConfig<Kind>>;
} = {
  selectOneAnswer: selectOneAnswer_Config_Schema.extend({ content: questionContent.selectOneAnswer }),
  selectMultipleAnswers: selectMultipleAnswers_Config_Schema.extend({ content: questionContent.selectMultipleAnswers }),
  matchBlocks: matchBlocks_Config_Schema.extend({ content: questionContent.matchBlocks }),
  answerWithText: answerWithText_Config_Schema.extend({ content: questionContent.answerWithText }),
  answerWithNumber: answerWithNumber_Config_Schema.extend({ content: questionContent.answerWithNumber }),
  orderSequence: orderSequence_Config_Schema.extend({ content: questionContent.orderSequence }),
  buildAnswerWithBlocks: buildAnswerWithBlocks_Config_Schema.extend({ content: questionContent.buildAnswerWithBlocks }),
  fillBlanksWithBlocks: fillBlanksWithBlocks_Config_Schema.extend({ content: questionContent.fillBlanksWithBlocks }),
  fillBlanksWithText: fillBlanksWithText_Config_Schema.extend({ content: questionContent.fillBlanksWithText }),
};
type QuestionSourceConfigUnion = {
  [Kind in Question_Type]: QuestionSourceConfig<Kind>;
}[Question_Type];
type QuestionSourceNode<Kind extends Question_Type = Question_Type> = {
  config: QuestionSourceConfig<Kind>;
  production?: z.infer<typeof questionBankWorkflowQuestionProduction_Schema>;
};
const questionNode = <Config extends z.ZodType>(config: Config) =>
  z.strictObject({ config, production: questionBankWorkflowQuestionProduction_Schema.optional() });
export const questionBankWorkflowQuestionNode_Schema: z.ZodType<{
  config: QuestionSourceConfigUnion;
  production?: z.infer<typeof questionBankWorkflowQuestionProduction_Schema>;
}> = questionNode(
  z.union([
    questionBankWorkflowQuestionConfig_Schemas.selectOneAnswer,
    questionBankWorkflowQuestionConfig_Schemas.selectMultipleAnswers,
    questionBankWorkflowQuestionConfig_Schemas.matchBlocks,
    questionBankWorkflowQuestionConfig_Schemas.answerWithText,
    questionBankWorkflowQuestionConfig_Schemas.answerWithNumber,
    questionBankWorkflowQuestionConfig_Schemas.orderSequence,
    questionBankWorkflowQuestionConfig_Schemas.buildAnswerWithBlocks,
    questionBankWorkflowQuestionConfig_Schemas.fillBlanksWithBlocks,
    questionBankWorkflowQuestionConfig_Schemas.fillBlanksWithText,
  ]),
);
type QuestionSourceGroups = {
  [Kind in Question_Type]?: Record<string, QuestionSourceNode<Kind>>;
};
const questionBankWorkflowKindsShape = {
  selectOneAnswer: z.record(z.string(), questionNode(questionBankWorkflowQuestionConfig_Schemas.selectOneAnswer)).optional(),
  selectMultipleAnswers: z.record(z.string(), questionNode(questionBankWorkflowQuestionConfig_Schemas.selectMultipleAnswers)).optional(),
  matchBlocks: z.record(z.string(), questionNode(questionBankWorkflowQuestionConfig_Schemas.matchBlocks)).optional(),
  answerWithText: z.record(z.string(), questionNode(questionBankWorkflowQuestionConfig_Schemas.answerWithText)).optional(),
  answerWithNumber: z.record(z.string(), questionNode(questionBankWorkflowQuestionConfig_Schemas.answerWithNumber)).optional(),
  orderSequence: z.record(z.string(), questionNode(questionBankWorkflowQuestionConfig_Schemas.orderSequence)).optional(),
  buildAnswerWithBlocks: z.record(z.string(), questionNode(questionBankWorkflowQuestionConfig_Schemas.buildAnswerWithBlocks)).optional(),
  fillBlanksWithBlocks: z.record(z.string(), questionNode(questionBankWorkflowQuestionConfig_Schemas.fillBlanksWithBlocks)).optional(),
  fillBlanksWithText: z.record(z.string(), questionNode(questionBankWorkflowQuestionConfig_Schemas.fillBlanksWithText)).optional(),
} satisfies Record<Question_Type, z.ZodType>;
export const questionBankWorkflowQuestionKinds_Schema: z.ZodType<QuestionSourceGroups> = z
  .strictObject(questionBankWorkflowKindsShape)
  .refine(
    groups => Object.values(groups).some(group => group && Object.keys(group).length),
    'Question Bank must contain a Question',
  );

export const questionBankWorkflowQuizIntent_Schema = z.discriminatedUnion('kind', [
  z.strictObject({ kind: z.literal('none'), rationale: nonempty }),
  z.strictObject({
    kind: z.literal('local'),
    rationale: nonempty,
    sections: z.strictObject({
      items: z.record(
        z.string(),
        z.strictObject({
          sectionId: z.uuid(),
          sectionPath: nonempty,
          selectionRationale: nonempty,
          coverage: nonempty,
          upstreamDependencies: nonempty,
        }),
      ),
      order: z.array(z.string()),
    }),
  }),
]);

/** Lesson SHA pinning remains in trusted Git authorization, not authored data. */
export const questionBankWorkflowStage1_Schema = z.strictObject({
  config: z.strictObject({ ownerLessonId: z.uuid() }),
  production: z.strictObject({ languages: workflowLanguages_Schema }),
});
const questionBankStage2Config_Schema = questionBankWorkflowStage1_Schema.shape.config.extend({
  questions: questionBankWorkflowQuestionKinds_Schema,
});
const questionBankStage3Production_Schema = questionBankWorkflowStage1_Schema.shape.production.extend({
  quiz: questionBankWorkflowQuizIntent_Schema,
});
export const questionBankWorkflowStage2_Schema: z.ZodType<{
  config: z.infer<typeof questionBankStage2Config_Schema>;
  production: z.infer<typeof questionBankWorkflowStage1_Schema.shape.production>;
}> = z.strictObject({
  config: questionBankStage2Config_Schema,
  production: questionBankWorkflowStage1_Schema.shape.production,
});
export const questionBankWorkflowStage3_Schema: z.ZodType<{
  config: z.infer<typeof questionBankStage2Config_Schema>;
  production: z.infer<typeof questionBankStage3Production_Schema>;
}> = z.strictObject({
  config: questionBankStage2Config_Schema,
  production: questionBankStage3Production_Schema,
});

const lesson_Schema = z.strictObject({
  id: z.uuid(),
  sourceSha: sha,
  reference: z.strictObject({ path: nonempty, sourceSha: sha }),
  languages: workflowLanguages_Schema,
  assessment: lessonProductionAssessmentRequirements_Schema,
});
/** Flashcard sides own plain authored ContentBlock Configs. Composite blocks
 * retain the materializer's source collection shape rather than a Configurator.
 */
const sceneSource_Schema = scene_Config_Schema.omit({ params: true, locale: true }).extend({
  params: scene_Config_Schema.shape.params.optional(),
  locale: scene_Config_Schema.shape.locale.partial().optional(),
});
const flashcardCarousel_Schema = carousel_Config_Schema.extend({
  slides: workflowOrdered_Schema(z.union([image_Config_Schema, sceneSource_Schema, z.literal(false)])),
});
const flashcardAnswer_Schema = checkpointAnswer_Config_Schema.extend({
  content: workflowOrdered_Schema(
    z.union([
      text_Config_Schema,
      markdown_Config_Schema,
      code_Config_Schema,
      image_Config_Schema,
      video_Config_Schema,
      youtube_Config_Schema,
      audio_Config_Schema,
      subtitles_Config_Schema,
      sceneSource_Schema,
      flashcardCarousel_Schema,
      z.literal(false),
    ]),
  ),
});
const flashcardCheckpoint_Schema = checkpoint_Config_Schema.extend({
  content: workflowOrdered_Schema(
    z.union([
      checkpointItem_Config_Schema.extend({
        question: text_Config_Schema,
        answer: flashcardAnswer_Schema,
      }),
      z.literal(false),
    ]),
  ),
});
const flashcardBlock_Schema = z.union([
  text_Config_Schema,
  markdown_Config_Schema,
  code_Config_Schema,
  image_Config_Schema,
  video_Config_Schema,
  audio_Config_Schema,
  subtitles_Config_Schema,
  youtube_Config_Schema,
  scene_Config_Schema,
  flashcardCarousel_Schema,
  flashcardCheckpoint_Schema,
]);
const flashcardBlockNode_Schema = z.union([
  flashcardBlock_Schema,
  z.strictObject({
    config: flashcardBlock_Schema,
    production: z
      .strictObject({
        specification: z.string().optional(),
        pending: z.boolean().optional(),
      })
      .optional(),
  }),
]);
const flashcardSideSource_Schema = workflowOrdered_Schema(flashcardBlockNode_Schema);
const card_Schema = z.strictObject({
  config: flashcard_Config_Schema.omit({ content: true, parameters: true }).extend({
    content: z.strictObject({
      front: flashcardSideSource_Schema,
      back: flashcardSideSource_Schema,
      hint: flashcardSideSource_Schema.optional(),
    }),
    parameters: flashcard_Config_Schema.shape.parameters.omit({ relationships: true }).strict(),
  }),
  production: z.strictObject({
    recallObjective: nonempty,
    grounding: nonempty,
    directionRationale: nonempty,
    accessibilityRationale: nonempty,
    pending: z.boolean().optional(),
    specification: z.string().optional(),
    questionReuse: z
      .strictObject({
        questionSourceSha: sha,
        exportPath: nonempty,
        exportName: nonempty,
        fieldPath: nonempty,
        expectedLocales: workflowLanguages_Schema.shape.planned,
      })
      .optional(),
  }),
});

export const flashcardBankWorkflowStage3_Schema = z.strictObject({
  config: z.strictObject({
    flashcards: z.strictObject({ items: z.record(z.string(), card_Schema), order: z.tuple([z.string()], z.string()) }),
    relationships: z.strictObject({
      items: z.record(
        z.string(),
        z.strictObject({
          relationshipId: nonempty,
          type: z.enum(flashcardRelationshipTypes),
          source: nonempty,
          target: nonempty,
        }),
      ),
      order: z.array(z.string()),
    }),
  }),
  production: z.strictObject({
    lesson: lesson_Schema,
    analysis: z.strictObject({
      recallObjectives: z.tuple([nonempty], nonempty).readonly(),
      sourceFactsAndConcepts: z.array(z.string()).readonly(),
      misconceptionsAndContrasts: z.array(z.string()).readonly(),
      exclusions: z.array(z.strictObject({ target: nonempty, reason: nonempty })).readonly(),
      cardCountRationale: nonempty,
      sourceGrounding: nonempty,
    }),
    design: z.strictObject({
      atomicityAudit: nonempty,
      directionAndDuplicationAudit: nonempty,
      acronymAndListAudit: nonempty,
      mediaAndAccessibilityAudit: nonempty,
      relationshipAudit: nonempty,
    }),
    section: z.discriminatedUnion('kind', [
      z.strictObject({ kind: z.literal('notApplicable'), rationale: nonempty }),
      z.strictObject({
        kind: z.literal('selected'),
        section: flashcardsSection_Config_Schema.pick({ id: true, slug: true }),
        existingSection: z.boolean(),
        placement: nonempty,
        selectedCardSlugs: z.tuple([nonempty], nonempty).readonly(),
        rationale: nonempty,
        lessonSourceSha: sha,
      }),
    ]),
  }),
});
