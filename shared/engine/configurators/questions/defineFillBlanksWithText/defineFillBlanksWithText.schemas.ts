import { z } from 'zod';

import { deepStrict_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { localizationSwitch, primitiveContentBlockResolved_Schema } from '../../contentBlocks/contentBlock.schemas';
import type { ContentBlock_Primitive_Data } from '../../contentBlocks/contentBlock.types';
import {
  createQuestionBaseSchema,
  questionBlockCollection_Config_Schema,
  questionCommonContent_Config_Schema,
  questionCommonContent_Data_Schema,
  type QuestionContent,
  type QuestionMetadataOverrides,
  type QuestionPublishedContent,
} from '../question.schemas';

const questionBase = createQuestionBaseSchema('fillBlanksWithText');
const params = questionBase.shape.params;

export const fillBlanksWithTextSlot_Config_Schema = z.strictObject({
  correctAnswers: z.record(z.string(), localizationSwitch.config).refine(value => Object.keys(value).length > 0),
});
export const fillBlanksWithText_Config_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({ placeholder: localizationSwitch.config }),
  content: questionCommonContent_Config_Schema.extend({
    slots: z.looseObject({ children: z.array(z.string()) }),
  }),
});
export type Question_FillBlanksWithText_Config = z.infer<typeof fillBlanksWithText_Config_Schema>;

/** Only the authored Config metadata fields are independently overridable. */
export type Question_FillBlanksWithText_MetadataOverrides =
  QuestionMetadataOverrides<Question_FillBlanksWithText_Config>;
export const fillBlanksWithText_Override_Config_Schema: z.ZodType<Question_FillBlanksWithText_MetadataOverrides> =
  z.deepPartial(
    deepStrict_Schema(
      z.object({
        params: fillBlanksWithText_Config_Schema.shape.params,
        locale: fillBlanksWithText_Config_Schema.shape.locale,
      }),
    ),
  );

export const fillBlanksWithText_Data_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({
    slots: z.looseObject({ children: z.array(z.string()) }).superRefine((slots, ctx) => {
      const keys = Object.keys(slots).filter(key => key !== 'children');
      if (
        new Set(slots.children).size !== slots.children.length ||
        slots.children.length !== keys.length ||
        keys.some(key => !slots.children.includes(key))
      ) {
        ctx.addIssue({ code: 'custom', message: 'Invalid text slot order' });
      }
      for (const key of keys) {
        if (['constructor', '__proto__', 'prototype', 'children', 'items', 'order'].includes(key)) {
          ctx.addIssue({ code: 'custom', path: [key], message: 'Reserved text-slot placement key' });
        }
        if (
          !z.strictObject({ correctAnswers: z.array(localizationSwitch.data).min(1) }).safeParse(slots[key]).success
        ) {
          ctx.addIssue({ code: 'custom', path: [key], message: 'Invalid text slot data' });
        }
      }
    }),
    placeholder: localizationSwitch.data,
  }),
  content: questionCommonContent_Data_Schema,
});
export type Question_FillBlanksWithText_Data = Omit<z.infer<typeof fillBlanksWithText_Data_Schema>, 'content'> & {
  content: QuestionPublishedContent<ContentBlock_Primitive_Data>;
};
