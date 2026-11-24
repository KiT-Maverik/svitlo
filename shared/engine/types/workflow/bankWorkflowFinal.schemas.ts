import { z } from 'zod';
import type { QuestionBankWorkflowGroups } from './questionBankWorkflow.types';
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
const evidence_Schema = z.strictObject({
  skillId: z.uuid(),
  outcome: nonempty,
  assessmentMethod: selectOneAnswer_Config_Schema.shape.params.shape.assessmentMethod,
  cognitiveOperation: nonempty,
  knowledgeAspect: nonempty,
  cognitiveDemand: nonempty,
  misconception: nonempty,
  context: nonempty,
  expectedEvidence: nonempty,
});
const assessment_Schema = lessonProductionAssessmentRequirements_Schema.extend({
  quizRequiredForCompletion: z.boolean(),
});
const lessonReference_Schema = z.strictObject({
  sourcePath: nonempty,
  sourceSha: sha,
  referencePath: nonempty,
  referenceSha: sha,
  methodologyPath: nonempty,
  title: nonempty,
});
const questionProduction_Schema = z.strictObject({
  evidence: evidence_Schema,
  distinction: nonempty,
  intendedUse: z.enum(['core', 'extension']),
  rationale: nonempty,
  mediaSpecification: z.string().optional(),
  pending: z.boolean().optional(),
  specification: z.string().optional(),
});
/** Question children are authored source Configs, never built Configurators.
 * Compose the same leaf schemas used by Lesson and the nine Question Configs.
 */
const blockProduction_Schema = z.strictObject({
  specification: z.string().optional(),
  mediaSourcePath: z.string().optional(),
  pending: z.boolean().optional(),
});
function blockNode<Config extends z.ZodType>(config: Config) {
  return z.strictObject({ config, production: blockProduction_Schema.optional() });
}
const simpleBlock_Schema = z.union([
  text_Config_Schema, markdown_Config_Schema, code_Config_Schema,
  image_Config_Schema, video_Config_Schema, youtube_Config_Schema,
  audio_Config_Schema, subtitles_Config_Schema, scene_Config_Schema,
]);
const carouselSource_Schema = carousel_Config_Schema.extend({
  slides: workflowOrdered_Schema(z.union([blockNode(image_Config_Schema), blockNode(scene_Config_Schema)])),
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
const block_Schema = z.union([
  simpleBlockNode_Schema, carouselNode_Schema, blockNode(checkpointSource_Schema),
]);
const blocks_Schema = workflowOrdered_Schema(block_Schema);
const commonContent_Schema = z.strictObject({
  question: blocks_Schema, hint: blocks_Schema.optional(), explanation: blocks_Schema.optional(),
});
const answerSets_Schema = z.strictObject({
  correct: blocks_Schema, incorrect: blocks_Schema, distractors: blocks_Schema,
});
const questionContent = {
  selectOneAnswer: commonContent_Schema.extend({ answers: answerSets_Schema }),
  selectMultipleAnswers: commonContent_Schema.extend({ answers: answerSets_Schema }),
  matchBlocks: commonContent_Schema.extend({
    pairs: workflowOrdered_Schema(z.strictObject({
      left: block_Schema, right: block_Schema,
    })),
  }),
  answerWithText: commonContent_Schema,
  answerWithNumber: commonContent_Schema,
  orderSequence: commonContent_Schema.extend({ sequence: blocks_Schema }),
  buildAnswerWithBlocks: commonContent_Schema.extend({
    correctSequence: blocks_Schema, distractors: blocks_Schema,
  }),
  fillBlanksWithBlocks: commonContent_Schema.extend({
    slots: workflowOrdered_Schema(z.strictObject({ correctAnswer: block_Schema })),
    distractors: blocks_Schema,
  }),
  fillBlanksWithText: commonContent_Schema.extend({
    slots: fillBlanksWithText_Config_Schema.shape.content.shape.slots,
  }),
};
const questionKinds_Schema: z.ZodType<QuestionBankWorkflowGroups> = z.strictObject({
  selectOneAnswer: z.record(z.string(), z.strictObject({
    config: selectOneAnswer_Config_Schema.extend({ content: questionContent.selectOneAnswer }),
    production: questionProduction_Schema,
  })).optional(),
  selectMultipleAnswers: z.record(z.string(), z.strictObject({
    config: selectMultipleAnswers_Config_Schema.extend({ content: questionContent.selectMultipleAnswers }),
    production: questionProduction_Schema,
  })).optional(),
  matchBlocks: z.record(z.string(), z.strictObject({
    config: matchBlocks_Config_Schema.extend({ content: questionContent.matchBlocks }),
    production: questionProduction_Schema,
  })).optional(),
  answerWithText: z.record(z.string(), z.strictObject({
    config: answerWithText_Config_Schema.extend({ content: questionContent.answerWithText }),
    production: questionProduction_Schema,
  })).optional(),
  answerWithNumber: z.record(z.string(), z.strictObject({
    config: answerWithNumber_Config_Schema.extend({ content: questionContent.answerWithNumber }),
    production: questionProduction_Schema,
  })).optional(),
  orderSequence: z.record(z.string(), z.strictObject({
    config: orderSequence_Config_Schema.extend({ content: questionContent.orderSequence }),
    production: questionProduction_Schema,
  })).optional(),
  buildAnswerWithBlocks: z.record(z.string(), z.strictObject({
    config: buildAnswerWithBlocks_Config_Schema.extend({ content: questionContent.buildAnswerWithBlocks }),
    production: questionProduction_Schema,
  })).optional(),
  fillBlanksWithBlocks: z.record(z.string(), z.strictObject({
    config: fillBlanksWithBlocks_Config_Schema.extend({ content: questionContent.fillBlanksWithBlocks }),
    production: questionProduction_Schema,
  })).optional(),
  fillBlanksWithText: z.record(z.string(), z.strictObject({
    config: fillBlanksWithText_Config_Schema.extend({ content: questionContent.fillBlanksWithText }),
    production: questionProduction_Schema,
  })).optional(),
}).refine(
  groups => Object.values(groups).some(group => group && Object.keys(group).length),
  'Question Bank must contain a Question',
);

const quizIntent_Schema = z.discriminatedUnion('kind', [
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

const questionOwnerId_Schema = z.uuid();
const questionBankConfig_Schema: z.ZodObject<{
  ownerLessonId: typeof questionOwnerId_Schema;
  questions: typeof questionKinds_Schema;
}> = z.strictObject({
  ownerLessonId: questionOwnerId_Schema,
  questions: questionKinds_Schema,
});
const questionBankProduction_Schema = z.strictObject({
    languages: workflowLanguages_Schema,
    lesson: lessonReference_Schema,
    course: z.strictObject({ id: z.uuid(), sourceSha: sha, placementPath: nonempty }).optional(),
    assessment: assessment_Schema,
    ownershipRationale: nonempty,
    audience: nonempty,
    scope: nonempty,
    prerequisites: nonempty,
    evidenceIntent: z.array(evidence_Schema).readonly(),
    misconceptions: nonempty,
    mediaNeeds: nonempty,
    sourcesAndDependencies: nonempty,
    quiz: quizIntent_Schema,
});
/** Named schema fragments keep TypeScript declaration output bounded without
 * duplicating the final authored type or weakening runtime validation.
 */
export const questionBankWorkflowStage3_Schema: z.ZodObject<{
  config: typeof questionBankConfig_Schema;
  production: typeof questionBankProduction_Schema;
}> = z.strictObject({
  config: questionBankConfig_Schema,
  production: questionBankProduction_Schema,
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
  slides: workflowOrdered_Schema(z.union([
    image_Config_Schema, sceneSource_Schema, z.literal(false),
  ])),
});
const flashcardAnswer_Schema = checkpointAnswer_Config_Schema.extend({
  content: workflowOrdered_Schema(z.union([
    text_Config_Schema, markdown_Config_Schema, code_Config_Schema,
    image_Config_Schema, video_Config_Schema, youtube_Config_Schema,
    audio_Config_Schema, subtitles_Config_Schema, sceneSource_Schema,
    flashcardCarousel_Schema, z.literal(false),
  ])),
});
const flashcardCheckpoint_Schema = checkpoint_Config_Schema.extend({
  content: workflowOrdered_Schema(z.union([
    checkpointItem_Config_Schema.extend({
      question: text_Config_Schema, answer: flashcardAnswer_Schema,
    }),
    z.literal(false),
  ])),
});
const flashcardBlock_Schema = z.union([
  text_Config_Schema, markdown_Config_Schema, code_Config_Schema,
  image_Config_Schema, video_Config_Schema, audio_Config_Schema,
  subtitles_Config_Schema, youtube_Config_Schema, scene_Config_Schema,
  flashcardCarousel_Schema, flashcardCheckpoint_Schema,
]);
const flashcardBlockNode_Schema = z.union([
  flashcardBlock_Schema,
  z.strictObject({
    config: flashcardBlock_Schema,
    production: z.strictObject({
      specification: z.string().optional(),
      pending: z.boolean().optional(),
    }).optional(),
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
    questionReuse: z.strictObject({
      questionSourceSha: sha,
      exportPath: nonempty,
      exportName: nonempty,
      fieldPath: nonempty,
      expectedLocales: workflowLanguages_Schema.shape.planned,
    }).optional(),
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
