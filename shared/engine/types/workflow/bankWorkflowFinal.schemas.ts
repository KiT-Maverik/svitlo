import { z } from 'zod';

import type { ContentBlock_Primitive_Type } from '../../configurators/contentBlocks/contentBlock.constants';
import { audio_Config_Schema } from '../../configurators/contentBlocks/primitive/defineAudio/defineAudio.schemas';
import { code_Config_Schema } from '../../configurators/contentBlocks/primitive/defineCode/defineCode.schemas';
import { image_Config_Schema } from '../../configurators/contentBlocks/primitive/defineImage/defineImage.schemas';
import { markdown_Config_Schema } from '../../configurators/contentBlocks/primitive/defineMarkdown/defineMarkdown.schemas';
import { scene_Config_Schema } from '../../configurators/contentBlocks/primitive/defineScene/defineScene.schemas';
import { subtitles_Config_Schema } from '../../configurators/contentBlocks/primitive/defineSubtitles/defineSubtitles.schemas';
import { text_Config_Schema } from '../../configurators/contentBlocks/primitive/defineText/defineText.schemas';
import { video_Config_Schema } from '../../configurators/contentBlocks/primitive/defineVideo/defineVideo.schemas';
import { youtube_Config_Schema } from '../../configurators/contentBlocks/primitive/defineYoutube/defineYoutube.schemas';
import {
  flashcard_Config_Schema,
  flashcardRelationshipTypes,
} from '../../configurators/flashcards/defineFlashcard/defineFlashcard.schemas';
import { answerWithNumber_Config_Schema } from '../../configurators/questions/defineAnswerWithNumber/defineAnswerWithNumber.schemas';
import { answerWithText_Config_Schema } from '../../configurators/questions/defineAnswerWithText/defineAnswerWithText.schemas';
import { buildAnswerWithBlocks_Config_Schema } from '../../configurators/questions/defineBuildAnswerWithBlocks/defineBuildAnswerWithBlocks.schemas';
import { fillBlanksWithBlocks_Config_Schema } from '../../configurators/questions/defineFillBlanksWithBlocks/defineFillBlanksWithBlocks.schemas';
import { fillBlanksWithText_Config_Schema } from '../../configurators/questions/defineFillBlanksWithText/defineFillBlanksWithText.schemas';
import { matchBlocks_Config_Schema } from '../../configurators/questions/defineMatchBlocks/defineMatchBlocks.schemas';
import { orderSequence_Config_Schema } from '../../configurators/questions/defineOrderSequence/defineOrderSequence.schemas';
import { selectMultipleAnswers_Config_Schema } from '../../configurators/questions/defineSelectMultipleAnswers/defineSelectMultipleAnswers.schemas';
import { selectOneAnswer_Config_Schema } from '../../configurators/questions/defineSelectOneAnswer/defineSelectOneAnswer.schemas';
import type { Question_Type } from '../../configurators/questions/question.constants';
import { flashcardsSection_Config_Schema } from '../../configurators/sections/defineFlashcardsSection/defineFlashcardsSection.schemas';
import { UNRESOLVED_RESOURCE_UUID } from '../../schemas/media.schemas';
import { lessonProductionAssessmentRequirements_Schema } from './lessonAssessment.types';
import { workflowChildren_Schema } from './lessonWorkflow.types';
import { workflowLanguages_Schema } from './workflowLanguages.schemas';

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
/** Exhaustive against the shared Primitive classification. Each entry may adapt
 * only editorial resource fields; accepted kinds cannot diverge from Engine.
 */
const questionPrimitiveSources = {
  text: text_Config_Schema,
  markdown: markdown_Config_Schema,
  code: code_Config_Schema,
  image: imageSource_Schema,
  video: videoSource_Schema,
  youtube: youtubeSource_Schema,
  audio: audioSource_Schema,
  subtitles: subtitlesSource_Schema,
  scene: questionSceneSource_Schema,
} as const satisfies Record<ContentBlock_Primitive_Type, z.ZodType>;
type QuestionPrimitiveSource = (typeof questionPrimitiveSources)[ContentBlock_Primitive_Type];
const simpleBlock_Schema = z.union(
  Object.values(questionPrimitiveSources) as [QuestionPrimitiveSource, ...QuestionPrimitiveSource[]],
);
// Only Image Block production can carry a visual-generation prompt. Keep the
// canonical non-Image production schema strict; missing Image assets are
// permitted only as blocked source scaffolds, never fabricated publications.
const { image, ...nonImageSources } = questionPrimitiveSources;
const nonImageBlock_Schema = z.union(
  Object.values(nonImageSources) as [
    (typeof nonImageSources)[keyof typeof nonImageSources],
    ...(typeof nonImageSources)[keyof typeof nonImageSources][],
  ],
);
const simpleBlockNode_Schema = z.union([
  z.strictObject({
    config: image,
    production: questionBankWorkflowBlockProduction_Schema.extend({ prompt: z.string().min(80) }).optional(),
  }),
  blockNode(nonImageBlock_Schema),
]);
/** Questions accept leaf blocks only; legacy composite source helpers are not valid Question children. */
export const questionBankWorkflowBlockConfig_Schema = simpleBlock_Schema;
export const questionBankWorkflowBlockNode_Schema = simpleBlockNode_Schema;
// Avoid serializing the entire recursive Block schema at every Question kind.
const block_Schema: z.ZodType<z.infer<typeof questionBankWorkflowBlockNode_Schema>> = simpleBlockNode_Schema;
const blocks_Schema: z.ZodType<{ children: string[] } & Record<string, unknown>> =
  workflowChildren_Schema(z.strictObject({}), block_Schema);
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
    pairs: workflowChildren_Schema(z.strictObject({}),
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
    slots: workflowChildren_Schema(z.strictObject({}), z.strictObject({ correctAnswer: block_Schema })),
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
type QuestionSourceConfig<Kind extends Question_Type> = Omit<z.infer<(typeof questionBaseSchemas)[Kind]>, 'content'> & {
  content: z.infer<(typeof questionContent)[Kind]>;
};
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
  selectOneAnswer: z
    .record(z.string(), questionNode(questionBankWorkflowQuestionConfig_Schemas.selectOneAnswer))
    .optional(),
  selectMultipleAnswers: z
    .record(z.string(), questionNode(questionBankWorkflowQuestionConfig_Schemas.selectMultipleAnswers))
    .optional(),
  matchBlocks: z.record(z.string(), questionNode(questionBankWorkflowQuestionConfig_Schemas.matchBlocks)).optional(),
  answerWithText: z
    .record(z.string(), questionNode(questionBankWorkflowQuestionConfig_Schemas.answerWithText))
    .optional(),
  answerWithNumber: z
    .record(z.string(), questionNode(questionBankWorkflowQuestionConfig_Schemas.answerWithNumber))
    .optional(),
  orderSequence: z
    .record(z.string(), questionNode(questionBankWorkflowQuestionConfig_Schemas.orderSequence))
    .optional(),
  buildAnswerWithBlocks: z
    .record(z.string(), questionNode(questionBankWorkflowQuestionConfig_Schemas.buildAnswerWithBlocks))
    .optional(),
  fillBlanksWithBlocks: z
    .record(z.string(), questionNode(questionBankWorkflowQuestionConfig_Schemas.fillBlanksWithBlocks))
    .optional(),
  fillBlanksWithText: z
    .record(z.string(), questionNode(questionBankWorkflowQuestionConfig_Schemas.fillBlanksWithText))
    .optional(),
} satisfies Record<Question_Type, z.ZodType>;
export const questionBankWorkflowQuestionKinds_Schema: z.ZodType<QuestionSourceGroups> = z
  .strictObject(questionBankWorkflowKindsShape)
  .refine(
    groups => Object.values(groups).some(group => group && Object.keys(group).length),
    'Question Bank must contain a Question',
  );

export const questionBankWorkflowQuizIntent_Schema = z.discriminatedUnion('kind', [
  z.strictObject({ kind: z.literal('none'), rationale: nonempty.optional() }),
  z.strictObject({
    kind: z.literal('local'),
    rationale: nonempty.optional(),
    sections: z.strictObject({
      items: z.record(
        z.string(),
        z.strictObject({
          sectionId: z.uuid(),
          sectionPath: nonempty,
          selectionRationale: nonempty.optional(),
          coverage: nonempty.optional(),
          upstreamDependencies: nonempty.optional(),
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
/** Flashcard sides own authored Primitive Configs only. */
/** Composite block sources are intentionally excluded from Flashcard sides. */
const flashcardPrimitiveSources = {
  text: text_Config_Schema,
  markdown: markdown_Config_Schema,
  code: code_Config_Schema,
  image: image_Config_Schema,
  video: video_Config_Schema,
  youtube: youtube_Config_Schema,
  audio: audio_Config_Schema,
  subtitles: subtitles_Config_Schema,
  scene: scene_Config_Schema,
} as const satisfies Record<ContentBlock_Primitive_Type, z.ZodType>;
type FlashcardPrimitiveSource = (typeof flashcardPrimitiveSources)[ContentBlock_Primitive_Type];
const flashcardBlock_Schema = z.union(
  Object.values(flashcardPrimitiveSources) as [FlashcardPrimitiveSource, ...FlashcardPrimitiveSource[]],
);
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
const flashcardSideSource_Schema = workflowChildren_Schema(z.strictObject({}), flashcardBlockNode_Schema);
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
