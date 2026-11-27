import { z } from 'zod';

import { deepStrict_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import {
  primitiveContentBlockConfigurator_Schema,
  primitiveContentBlockResolved_Schema,
} from '../../contentBlocks/contentBlock.schemas';
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

const questionBase = createQuestionBaseSchema('matchBlocks');
const params = questionBase.shape.params;

export const matchBlocks_Config_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({}),
  content: questionCommonContent_Config_Schema.extend({
    pairs: z.looseObject({ children: z.array(z.string()) }),
  }),
});
export type Question_MatchBlocks_Config = z.infer<typeof matchBlocks_Config_Schema>;

/** Only the authored Config metadata fields are independently overridable. */
export type Question_MatchBlocks_MetadataOverrides = QuestionMetadataOverrides<Question_MatchBlocks_Config>;
export const matchBlocks_Override_Config_Schema: z.ZodType<Question_MatchBlocks_MetadataOverrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: matchBlocks_Config_Schema.shape.params,
      locale: matchBlocks_Config_Schema.shape.locale,
    }),
  ),
);

export const matchBlocks_Data_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({}),
  content: questionCommonContent_Data_Schema.extend({
    pairs: z.looseObject({ children: z.array(z.string()) }).superRefine((pairs, ctx) => {
      const keys = Object.keys(pairs).filter(key => key !== 'children');
      if (new Set(pairs.children).size !== pairs.children.length ||
          pairs.children.length !== keys.length || keys.some(key => !pairs.children.includes(key))) {
        ctx.addIssue({ code: 'custom', message: 'Invalid pair order' });
      }
      for (const key of keys) {
        if (['constructor', '__proto__', 'prototype', 'children', 'items', 'order'].includes(key)) {
          ctx.addIssue({ code: 'custom', path: [key], message: 'Reserved pair placement key' });
        }
        if (!z.strictObject({ left: primitiveContentBlockResolved_Schema,
                               right: primitiveContentBlockResolved_Schema }).safeParse(pairs[key]).success) {
          ctx.addIssue({ code: 'custom', path: [key], message: 'Invalid matching pair' });
        }
      }
    }),
  }),
});
export type Question_MatchBlocks_Data = Omit<z.infer<typeof matchBlocks_Data_Schema>, 'content'> & {
  content: QuestionPublishedContent<ContentBlock_Primitive_Data> & {
    pairs: { children: string[] } & Record<string, unknown>;
  };
};
