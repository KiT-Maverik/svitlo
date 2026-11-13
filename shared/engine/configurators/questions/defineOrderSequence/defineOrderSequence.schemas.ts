import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema } from '#schemas';
import { addUnifiedLocale } from '../../_shared__configurators';
import { contentBlockConfigurator_Schema, contentBlockResolved_Schema } from '../../contentBlocks/contentBlock.schemas';
import type { ContentBlock_Configurator, ContentBlock_Props } from '../../contentBlocks';
import {
  createQuestionBaseSchema,
  questionBlockCollection_Config_Schema,
  questionCommonContent_Config_Schema,
  questionCommonContent_Props_Schema,
  type QuestionContent,
  type QuestionPublishedContent,
  type QuestionMetadataOverrides,
} from '../question.schemas';

const questionBase = createQuestionBaseSchema('orderSequence');
const params = questionBase.shape.params;

export const orderSequence_Config_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({}),
  content: questionCommonContent_Config_Schema.extend({ sequence: questionBlockCollection_Config_Schema }),
});
export type Question_OrderSequence_Config = z.infer<typeof orderSequence_Config_Schema>;

/** Only the authored Config metadata fields are independently overridable. */
export type Question_OrderSequence_MetadataOverrides = QuestionMetadataOverrides<Question_OrderSequence_Config>;
export const orderSequence_Override_Config_Schema: z.ZodType<Question_OrderSequence_MetadataOverrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: orderSequence_Config_Schema.shape.params,
      locale: orderSequence_Config_Schema.shape.locale,
    }),
  ),
);

export const orderSequence_Props_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({}),
  content: questionCommonContent_Props_Schema.extend({ sequence: z.array(contentBlockResolved_Schema).min(1) }),
});
export type Question_OrderSequence_Props = Omit<z.infer<typeof orderSequence_Props_Schema>, 'content'> & {
  content: QuestionPublishedContent<ContentBlock_Props> & { sequence: ContentBlock_Props[] };
};
