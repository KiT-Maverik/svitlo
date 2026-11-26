import { z } from 'zod';

import { deepStrict_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { primitiveContentBlockResolved_Schema } from '../../contentBlocks/contentBlock.schemas';
import type { ContentBlock_Primitive_Configurator, ContentBlock_Primitive_Props } from '../../contentBlocks/contentBlock.types';
import {
  createQuestionBaseSchema,
  questionBlockCollection_Config_Schema,
  questionCommonContent_Config_Schema,
  questionCommonContent_Props_Schema,
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
    pairs: z.object({
      items: z.record(
        z.string(),
        z.object({ left: z.custom<ContentBlock_Primitive_Configurator>(), right: z.custom<ContentBlock_Primitive_Configurator>() }),
      ),
      order: z.array(z.string()),
    }),
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

export const matchBlocks_Props_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({}),
  content: questionCommonContent_Props_Schema.extend({
    pairs: z.record(z.string(), z.object({ left: primitiveContentBlockResolved_Schema, right: primitiveContentBlockResolved_Schema })),
  }),
});
export type Question_MatchBlocks_Props = Omit<z.infer<typeof matchBlocks_Props_Schema>, 'content'> & {
  content: QuestionPublishedContent<ContentBlock_Primitive_Props> & {
    pairs: Record<string, { left: ContentBlock_Primitive_Props; right: ContentBlock_Primitive_Props }>;
  };
};
