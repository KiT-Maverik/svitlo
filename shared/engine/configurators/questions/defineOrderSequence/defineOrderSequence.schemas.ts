import { z } from 'zod';

import { deepStrict_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { primitiveContentBlockResolved_Schema } from '../../contentBlocks/contentBlock.schemas';
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

export const orderSequence_Data_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({}),
  content: questionCommonContent_Data_Schema.extend({
    sequence: questionBlockCollection_Data_Schema.refine(group => group.children.length > 0, 'A sequence is required'),
  }),
});
export type Question_OrderSequence_Data = Omit<z.infer<typeof orderSequence_Data_Schema>, 'content'> & {
  content: QuestionPublishedContent<ContentBlock_Primitive_Data> & { sequence: QuestionPublishedContent<ContentBlock_Primitive_Data>['question'] };
};
