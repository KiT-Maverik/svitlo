import { z } from 'zod';

import { camelCase_Schema, deepStrict_Schema } from '#schemas';
import { validateSlugAddressedContainer, type SafePlacementMap } from '../../_shared__configurators/slugAddressedContainer/slugAddressedContainer.utils';
import { contentBlockTypes } from '../../contentBlocks/contentBlock.constants';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators/common.schemas';
import type { Configurator_Mode } from '../../configurator.schemas';
import {
  localizationSwitch as contentBlockLocalizationSwitch,
} from '../../contentBlocks/contentBlock.schemas';
import type { ContentBlock_Configurator } from '../../contentBlocks/contentBlock.types';

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
    questionIds: z
      .array(z.uuid())
      .nonempty()
      .refine(ids => new Set(ids).size === ids.length, 'Quiz Question UUIDs must be unique'),
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

export const quizSection_Metadata_Config_Schema = sectionBase.extend({
  params,
  ...addUnifiedLocale(locale('config')),
});
export const quizSection_Config_Schema = quizSection_Metadata_Config_Schema
  .extend({ children: z.array(z.string()) })
  .catchall(z.unknown())
  .superRefine((value, ctx) => {
    for (const issue of validateSlugAddressedContainer(value, contentBlockTypes)) {
      ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
    }
  });
export type QuizSection_Config = z.infer<typeof quizSection_Config_Schema>;

export const quizSection_Data_Schema = sectionBase.extend({
  params,
  ...addUnifiedLocale(locale('data')),
  children: z.array(z.string()),
})
  .catchall(z.unknown())
  .superRefine((value, ctx) => {
    for (const issue of validateSlugAddressedContainer(value, contentBlockTypes)) {
      ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
    }
  });
export type QuizSection_Data = z.infer<typeof quizSection_Data_Schema>;

/** The complete base may omit translated child fields, which live in locale files. */
export type QuizSection_DataBase = Pick<QuizSection_Data, 'id' | 'slug' | 'type' | 'params'> & {
  locale?: DeepPartial<QuizSection_Locale<'data'>>;
  children: string[];
  [placementSlug: string]: unknown;
};

/** Identity and authored collection organization cannot be changed via metadata patches. */
export type QuizSection_MetadataOverrides = DeepPartial<Pick<QuizSection_Config, 'params' | 'locale'>>;
export const quizSection_Override_Config_Schema: z.ZodType<QuizSection_MetadataOverrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: quizSection_Metadata_Config_Schema.shape.params,
      locale: quizSection_Metadata_Config_Schema.shape.locale,
    }),
  ),
);

export type QuizSection_Overrides<
  Items extends Record<string, ContentBlock_Configurator>,
  Added extends Record<string, ContentBlock_Configurator> = {},
> = QuizSection_MetadataOverrides & {
  children?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
} & { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false } &
  Added & SafePlacementMap<Added> & { [Key in keyof Items & keyof Added]?: never };
