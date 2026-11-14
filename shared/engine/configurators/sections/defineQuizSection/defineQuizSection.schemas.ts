import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema } from '#schemas';
import { camelCase_Schema } from '#schemas';
import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators/common.schemas';
import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { localizationSwitch as contentBlockLocalizationSwitch, contentBlockResolved_Schema } from '../../contentBlocks/contentBlock.schemas';
import type { ContentBlock_Configurator, ContentBlock_Props } from '../../contentBlocks/contentBlock.types';
import type { Configurator_Mode } from '../../configurator.schemas';

const sectionBase = identityBase_Schema.extend({
  type: z.literal('quiz'),
  params: paramsBase_Schema.shape.params.extend({
    skippable: z.boolean().optional(),
  }),
});

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: contentBlockLocalizationSwitch[mode],
  navigationLabel: contentBlockLocalizationSwitch[mode],
});
export type QuizSection_Locale<Mode extends Configurator_Mode> = z.infer<z.ZodObject<ReturnType<typeof locale<Mode>>>>;
const screen = z.strictObject({
  showDefaultContent: z.boolean().optional(),
  // Screen content references Section.content.items, never nested raw configs.
  content: z.array(camelCase_Schema).optional(),
});
const params = sectionBase.shape.params.extend({
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
      successThreshold: z.number().nonnegative(),
    })
    .refine(
      value => value.mode !== 'percentage' || value.successThreshold === undefined || value.successThreshold <= 100,
      { message: 'Percentage successThreshold must be between 0 and 100' },
    )
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

export const quizSection_Config_Schema = sectionBase.extend({
  params,
  ...addUnifiedLocale(locale('config')),
  content: z.object({
    items: z.record(z.string(), z.custom<ContentBlock_Configurator>()),
    order: z.array(z.string()),
  }),
});
export type QuizSection_Config = z.infer<typeof quizSection_Config_Schema>;

export const quizSection_Props_Schema = sectionBase.extend({
  params,
  ...addUnifiedLocale(locale('props')),
  content: z.array(contentBlockResolved_Schema),
});
export type QuizSection_Props = Omit<z.infer<typeof quizSection_Props_Schema>, 'content'> & {
  content: ContentBlock_Props[];
};

/** The complete base may omit translated child fields, which live in locale files. */
export type QuizSection_PropsBase = Pick<QuizSection_Props, 'id' | 'slug' | 'type' | 'params'> & {
  locale?: DeepPartial<QuizSection_Locale<'props'>>;
  content: ReturnType<ContentBlock_Configurator['build']['props']>['base'][];
};

/** Identity and authored collection organization cannot be changed via metadata patches. */
export type QuizSection_MetadataOverrides = DeepPartial<Pick<QuizSection_Config, 'params' | 'locale'>>;
export const quizSection_Override_Config_Schema: z.ZodType<QuizSection_MetadataOverrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: quizSection_Config_Schema.shape.params,
      locale: quizSection_Config_Schema.shape.locale,
    }),
  ),
);

export type QuizSection_Overrides<
  Items extends Record<string, ContentBlock_Configurator>,
  Added extends Record<string, ContentBlock_Configurator> = {},
> = QuizSection_MetadataOverrides & {
  content?: {
    items?: { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false };
    additionalItems?: Added & { [Key in keyof Items]?: never };
    order?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
  };
};
