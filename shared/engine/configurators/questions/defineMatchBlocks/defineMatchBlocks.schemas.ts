import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema } from '#schemas';
import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { contentBlockResolved_Schema } from '../../contentBlocks/contentBlock.schemas';
import type { ContentBlock_Configurator, ContentBlock_Props } from '../../contentBlocks/contentBlock.types';
import {
  createQuestionBaseSchema,
  questionBlockCollection_Config_Schema,
  questionCommonContent_Config_Schema,
  questionCommonContent_Props_Schema,
  type QuestionContent,
  type QuestionPublishedContent,
  type QuestionMetadataOverrides,
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
        z.object({ left: z.custom<ContentBlock_Configurator>(), right: z.custom<ContentBlock_Configurator>() }),
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
    pairs: z.record(z.string(), z.object({ left: contentBlockResolved_Schema, right: contentBlockResolved_Schema })),
  }),
});
export type Question_MatchBlocks_Props = Omit<z.infer<typeof matchBlocks_Props_Schema>, 'content'> & {
  content: QuestionPublishedContent<ContentBlock_Props> & {
    pairs: Record<string, { left: ContentBlock_Props; right: ContentBlock_Props }>;
  };
};
