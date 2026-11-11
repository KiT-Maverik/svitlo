import { z } from 'zod';
import { camelCase_Schema } from '#schemas';
import { createSectionBaseSchema } from '../_shared__sections';
import type { Section_Config_Content, Section_Props_Content } from '../_shared__sections';

const base = createSectionBaseSchema('quiz');
const screen = z.strictObject({
  showDefaultContent: z.boolean().optional(),
  // Screen content references Section.content.items, never nested raw configs.
  content: z.array(camelCase_Schema).optional(),
});
const params = base.config.shape.params.extend({
  isBlocker: z.boolean().optional(),
  timeLimitSeconds: z.number().positive().optional(),
  selection: z.strictObject({
    mode: z.enum(['all', 'sample']),
    questionSlugs: z.array(camelCase_Schema).optional(),
    count: z.number().int().positive().optional(),
    shuffle: z.boolean().optional(),
    seed: z.number().optional(),
  }),
  layout: z.strictObject({
    mode: z.enum(['stack', 'stepper']),
    showProgress: z.boolean().optional(),
  }),
  feedbackMode: z.enum(['immediate', 'after-completion']),
  grading: z
    .strictObject({
      mode: z.enum(['percentage', 'points']),
      successThreshold: z.number(),
    })
    .optional(),
  interaction: z.strictObject({
    retries: z.number().int().nonnegative(),
    showErrors: z.boolean(),
    showCorrectAnswers: z.boolean(),
    allowExplanations: z.boolean(),
    allowDeferring: z.boolean(),
    allowQuestionNavigation: z.boolean(),
    skippable: z.boolean(),
  }),
  questionOptions: z
    .strictObject({
      selectOneAnswer: z
        .strictObject({
          incorrectCount: z.number().int().nonnegative().optional(),
          includeDistractors: z.boolean().optional(),
          shuffleAnswers: z.boolean().optional(),
          correctVariant: z.enum(['first', 'random']).optional(),
        })
        .optional(),
    })
    .optional(),
  results: z.strictObject({
    visibility: z.enum(['immediate', 'after-review', 'hidden']),
    showScore: z.boolean(),
  }),
  screen: z
    .strictObject({
      starting: screen.optional(),
      ending: z
        .strictObject({
          success: screen,
          fail: screen,
          retry: screen.optional(),
        })
        .optional(),
    })
    .optional(),
});

export const quizSection_Config_Schema = base.config.extend({ params });
export type QuizSection_Config = z.infer<typeof quizSection_Config_Schema> & Section_Config_Content;

export const quizSection_Props_Schema = base.props.extend({ params });
export type QuizSection_Props = z.infer<typeof quizSection_Props_Schema> & Section_Props_Content;
