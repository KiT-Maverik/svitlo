import { z } from 'zod';
import {
  contentBlockConfigurator_Schema,
  localizationSwitch,
  contentBlockResolved_Schema,
} from '../../contentBlocks/_shared';
import { createSectionMetaSchema } from '../section.schemas';

function createQuizSectionSchema<Mode extends keyof typeof localizationSwitch>(mode: Mode) {
  const block = { config: contentBlockConfigurator_Schema, props: contentBlockResolved_Schema }[mode];
  const screen = z.strictObject({
    showDefaultContent: z.boolean().optional(),
    content: z.array(block).optional(),
  });
  const quizParameters = z.strictObject({
    isBlocker: z.boolean().optional(),
    timeLimitSeconds: z.number().positive().optional(),
    selection: z.strictObject({
      mode: z.enum(['all', 'sample']),
      questionSlugs: z.array(z.string()).optional(),
      count: z.number().int().positive().optional(),
      shuffle: z.boolean().optional(),
      seed: z.number().optional(),
    }),
    layout: z.strictObject({ mode: z.enum(['stack', 'stepper']), showProgress: z.boolean().optional() }),
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
    screen: z.strictObject({
      starting: screen.optional(),
      ending: z
        .strictObject({
          success: screen,
          fail: screen,
          retry: screen.optional(),
        })
        .optional(),
    }),
  });
  return z.strictObject({ ...createSectionMetaSchema('quiz', mode), parameters: quizParameters });
}

export const quizSection_Config_Schema = createQuizSectionSchema('config');
export type QuizSection_Config = z.infer<typeof quizSection_Config_Schema>;

export const quizSection_Props_Schema = createQuizSectionSchema('props');
export type QuizSection_Props = z.infer<typeof quizSection_Props_Schema>;
