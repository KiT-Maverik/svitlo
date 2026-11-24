import { z } from 'zod';
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
const questionKinds_Schema = z
  .strictObject({
    selectOneAnswer: z
      .record(
        z.string(),
        z.strictObject({
          config: selectOneAnswer_Config_Schema.omit({ content: true }).extend({ content: z.unknown() }),
          production: questionProduction_Schema,
        }),
      )
      .optional(),
    selectMultipleAnswers: z
      .record(
        z.string(),
        z.strictObject({
          config: selectMultipleAnswers_Config_Schema.omit({ content: true }).extend({ content: z.unknown() }),
          production: questionProduction_Schema,
        }),
      )
      .optional(),
    matchBlocks: z
      .record(
        z.string(),
        z.strictObject({
          config: matchBlocks_Config_Schema.omit({ content: true }).extend({ content: z.unknown() }),
          production: questionProduction_Schema,
        }),
      )
      .optional(),
    answerWithText: z
      .record(
        z.string(),
        z.strictObject({
          config: answerWithText_Config_Schema.omit({ content: true }).extend({ content: z.unknown() }),
          production: questionProduction_Schema,
        }),
      )
      .optional(),
    answerWithNumber: z
      .record(
        z.string(),
        z.strictObject({
          config: answerWithNumber_Config_Schema.omit({ content: true }).extend({ content: z.unknown() }),
          production: questionProduction_Schema,
        }),
      )
      .optional(),
    orderSequence: z
      .record(
        z.string(),
        z.strictObject({
          config: orderSequence_Config_Schema.omit({ content: true }).extend({ content: z.unknown() }),
          production: questionProduction_Schema,
        }),
      )
      .optional(),
    buildAnswerWithBlocks: z
      .record(
        z.string(),
        z.strictObject({
          config: buildAnswerWithBlocks_Config_Schema.omit({ content: true }).extend({ content: z.unknown() }),
          production: questionProduction_Schema,
        }),
      )
      .optional(),
    fillBlanksWithBlocks: z
      .record(
        z.string(),
        z.strictObject({
          config: fillBlanksWithBlocks_Config_Schema.omit({ content: true }).extend({ content: z.unknown() }),
          production: questionProduction_Schema,
        }),
      )
      .optional(),
    fillBlanksWithText: z
      .record(
        z.string(),
        z.strictObject({
          config: fillBlanksWithText_Config_Schema.omit({ content: true }).extend({ content: z.unknown() }),
          production: questionProduction_Schema,
        }),
      )
      .optional(),
  })
  .refine(
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

export const questionBankWorkflowStage3_Schema = z.strictObject({
  config: z.strictObject({ ownerLessonId: z.uuid(), questions: questionKinds_Schema }),
  production: z.strictObject({
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
  }),
});

const flashcardQuestionPrerequisite_Schema = z.discriminatedUnion('kind', [
  z.strictObject({
    kind: z.literal('completed'),
    sourceSha: sha,
    reviewSha: sha,
    bankPath: nonempty,
    integrated: z.literal(true),
  }),
  z.strictObject({
    kind: z.literal('notApplicable'),
    rationale: nonempty,
    methodologySourceSha: sha,
    parentLessonPr: z.number().int().positive(),
  }),
]);
const lesson_Schema = z.strictObject({
  id: z.uuid(),
  sourceSha: sha,
  reference: z.strictObject({ path: nonempty, sourceSha: sha }),
  languages: workflowLanguages_Schema,
  assessment: lessonProductionAssessmentRequirements_Schema,
});
const card_Schema = z.strictObject({
  config: flashcard_Config_Schema.omit({ content: true, parameters: true }).extend({
    content: z.object({ front: z.unknown(), back: z.unknown(), hint: z.unknown().optional() }),
    parameters: z.unknown(),
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
        expectedLocales: z.array(z.string()).nonempty().readonly(),
      })
      .optional(),
  }),
});
export const flashcardBankWorkflowStage3_Schema = z.strictObject({
  config: z.strictObject({
    flashcards: z.strictObject({ items: z.record(z.string(), card_Schema), order: z.array(z.string()).nonempty() }),
    relationships: z.strictObject({
      items: z.record(
        z.string(),
        z.strictObject({
          relationshipId: nonempty,
          type: z.enum([
            'reverse',
            'equivalent',
            'contrast',
            'complementary',
            'prerequisite',
            'partOf',
            'exampleOf',
            'causes',
            'precedes',
          ]),
          source: nonempty,
          target: nonempty,
        }),
      ),
      order: z.array(z.string()),
    }),
  }),
  production: z.strictObject({
    lesson: lesson_Schema,
    questions: flashcardQuestionPrerequisite_Schema,
    analysis: z.strictObject({
      recallObjectives: z.array(nonempty).nonempty().readonly(),
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
        section: z.strictObject({ id: z.uuid(), slug: nonempty }),
        existingSection: z.boolean(),
        placement: nonempty,
        selectedCardSlugs: z.array(nonempty).nonempty().readonly(),
        rationale: nonempty,
        lessonSourceSha: sha,
      }),
    ]),
  }),
});
