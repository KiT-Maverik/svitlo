import { z } from 'zod';

import { assessment_Config_Schema } from '../../configurators/assessments/defineAssessment/defineAssessment.schemas';
import {
  lessonWorkflowContentSection_Schema,
  lessonWorkflowQuizSection_Schema,
  workflowOrdered_Schema,
} from './lessonWorkflow.types';
import { workflowLanguages_Schema } from './workflowLanguages.schemas';

const reviewedText = z
  .string()
  .min(1)
  .refine(value => !!value.trim(), 'Reviewed Assessment text is required');
const dependency = z
  .string()
  .regex(
    /^content(?:\/[A-Za-z][A-Za-z0-9]*)+$|^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    'Assessment dependencies must identify Course Lesson placements or existing Lesson UUIDs',
  );
const placement = z.strictObject({
  courseId: z.uuid(),
  path: z.string().regex(/^content(?:\/[A-Za-z][A-Za-z0-9]*)+$/),
  orderPath: z.array(z.number().int().nonnegative()).nonempty(),
  reviewedCourseSourceBlobSha: z.string().regex(/^[a-f0-9]{40}$/i),
});

/** Allocated at authorized Course Stage 5, not an Assessment authoring stage. */
export const assessmentWorkflowSeed_Schema = z.strictObject({
  config: assessment_Config_Schema.pick({ id: true, slug: true, type: true, locale: true }).strict(),
  production: z.strictObject({
    purpose: reviewedText,
    lessonDependencies: z
      .array(dependency)
      .nonempty()
      .refine(values => new Set(values).size === values.length, 'Assessment Lesson dependencies must be unique'),
    placement,
    languages: workflowLanguages_Schema,
  }),
});
export type AssessmentWorkflowSeed = z.infer<typeof assessmentWorkflowSeed_Schema>;

/** The independent Assessment architect authors evidence intent, not Questions. */
export const assessmentWorkflowStage1_Schema = assessmentWorkflowSeed_Schema.extend({
  production: assessmentWorkflowSeed_Schema.shape.production.extend({
    design: reviewedText,
  }),
});
export type AssessmentWorkflowStage1 = z.infer<typeof assessmentWorkflowStage1_Schema>;

/** The Quiz is a single required owned node, not an optional Section list member. */
const supportingSections = workflowOrdered_Schema(lessonWorkflowContentSection_Schema);

export const assessmentWorkflowStage2_Schema = assessmentWorkflowStage1_Schema
  .extend({
    config: assessmentWorkflowStage1_Schema.shape.config.extend({
      params: assessment_Config_Schema.shape.params
        .omit({ languages: true })
        .partial()
        .extend({ languages: z.never().optional() })
        .strict()
        .optional(),
      before: supportingSections.optional(),
      quiz: lessonWorkflowQuizSection_Schema,
      after: supportingSections.optional(),
    }),
    production: assessmentWorkflowStage1_Schema.shape.production.extend({
      specification: reviewedText,
    }),
  })
  .superRefine((input, ctx) => {
    const quiz = input.config.quiz.config;
    if (quiz.params.disabled === true) {
      ctx.addIssue({
        code: 'custom',
        path: ['config', 'quiz', 'config', 'params', 'disabled'],
        message: 'Assessment Quiz cannot be disabled',
      });
    }
    const selected = quiz.params.selection?.questionIds;
    if (
      !Array.isArray(selected) ||
      !selected.length ||
      selected.some(id => typeof id !== 'string' || /^feedc0de-/i.test(id) || /^00000000-/.test(id))
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['config', 'quiz', 'config', 'params', 'selection', 'questionIds'],
        message: 'Assessment Quiz must select real reviewed upstream Question UUIDs',
      });
    }
  });
export type AssessmentWorkflowStage2 = z.infer<typeof assessmentWorkflowStage2_Schema>;
