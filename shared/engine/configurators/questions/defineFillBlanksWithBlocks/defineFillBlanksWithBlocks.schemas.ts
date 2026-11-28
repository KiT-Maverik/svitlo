import { z } from 'zod';

import { deepStrict_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import {
  localizationSwitch,
  primitiveContentBlockConfigurator_Schema,
  primitiveContentBlockResolved_Schema,
} from '../../contentBlocks/contentBlock.schemas';
import type { ContentBlock_Primitive_Data } from '../../contentBlocks/contentBlock.types';
import {
  createQuestionBaseSchema,
  questionBlockCollection_Config_Schema,
  questionBlockCollection_Data_Schema,
  questionCommonContent_Config_Schema,
  questionCommonContent_Data_Schema,
  type QuestionContent,
  type QuestionMetadataOverrides,
  type QuestionPublishedContent,
} from '../question.schemas';

const questionBase = createQuestionBaseSchema('fillBlanksWithBlocks');
const params = questionBase.shape.params;

export const fillBlanksWithBlocks_Config_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({ placeholder: localizationSwitch.config }),
  content: questionCommonContent_Config_Schema.extend({
    slots: z.looseObject({ children: z.array(z.string()) }),
    distractors: questionBlockCollection_Config_Schema,
  }),
});
export type Question_FillBlanksWithBlocks_Config = z.infer<typeof fillBlanksWithBlocks_Config_Schema>;

/** Only the authored Config metadata fields are independently overridable. */
export type Question_FillBlanksWithBlocks_MetadataOverrides =
  QuestionMetadataOverrides<Question_FillBlanksWithBlocks_Config>;
export const fillBlanksWithBlocks_Override_Config_Schema: z.ZodType<Question_FillBlanksWithBlocks_MetadataOverrides> =
  z.deepPartial(
    deepStrict_Schema(
      z.object({
        params: fillBlanksWithBlocks_Config_Schema.shape.params,
        locale: fillBlanksWithBlocks_Config_Schema.shape.locale,
      }),
    ),
  );

export const fillBlanksWithBlocks_Data_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({ placeholder: localizationSwitch.data }),
  content: questionCommonContent_Data_Schema.extend({
    slots: z.looseObject({ children: z.array(z.string()) }).superRefine((slots, ctx) => {
      const keys = Object.keys(slots).filter(key => key !== 'children');
      if (
        new Set(slots.children).size !== slots.children.length ||
        slots.children.length !== keys.length ||
        keys.some(key => !slots.children.includes(key))
      ) {
        ctx.addIssue({ code: 'custom', message: 'Invalid slot order' });
      }
      for (const key of keys) {
        if (['constructor', '__proto__', 'prototype', 'children', 'items', 'order'].includes(key)) {
          ctx.addIssue({ code: 'custom', path: [key], message: 'Reserved block-slot placement key' });
        }
        if (!z.strictObject({ correctAnswer: primitiveContentBlockResolved_Schema }).safeParse(slots[key]).success) {
          ctx.addIssue({ code: 'custom', path: [key], message: 'Invalid block-answer slot' });
        }
      }
    }),
    distractors: questionBlockCollection_Data_Schema,
  }),
});
export type Question_FillBlanksWithBlocks_Data = Omit<z.infer<typeof fillBlanksWithBlocks_Data_Schema>, 'content'> & {
  content: QuestionPublishedContent<ContentBlock_Primitive_Data> & {
    slots: { children: string[] } & Record<string, unknown>;
    distractors: QuestionPublishedContent<ContentBlock_Primitive_Data>['question'];
  };
};
