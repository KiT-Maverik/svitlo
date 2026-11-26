import { z } from 'zod';

import { deepStrict_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { primitiveContentBlockResolved_Schema } from '../../contentBlocks/contentBlock.schemas';
import type { ContentBlock_Primitive_Props } from '../../contentBlocks/contentBlock.types';
import {
  createQuestionBaseSchema,
  questionBlockCollection_Config_Schema,
  questionCommonContent_Config_Schema,
  questionCommonContent_Props_Schema,
  type QuestionContent,
  type QuestionMetadataOverrides,
  type QuestionPublishedContent,
} from '../question.schemas';

const questionBase = createQuestionBaseSchema('selectOneAnswer');
const params = questionBase.shape.params;

export const selectOneAnswer_Config_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({}),
  content: questionCommonContent_Config_Schema.extend({
    answers: z.object({
      correct: questionBlockCollection_Config_Schema,
      incorrect: questionBlockCollection_Config_Schema,
      distractors: questionBlockCollection_Config_Schema,
    }),
  }),
});
export type Question_SelectOneAnswer_Config = z.infer<typeof selectOneAnswer_Config_Schema>;

/** Only the authored Config metadata fields are independently overridable. */
export type Question_SelectOneAnswer_MetadataOverrides = QuestionMetadataOverrides<Question_SelectOneAnswer_Config>;
export const selectOneAnswer_Override_Config_Schema: z.ZodType<Question_SelectOneAnswer_MetadataOverrides> =
  z.deepPartial(
    deepStrict_Schema(
      z.object({
        params: selectOneAnswer_Config_Schema.shape.params,
        locale: selectOneAnswer_Config_Schema.shape.locale,
      }),
    ),
  );

export const selectOneAnswer_Props_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({}),
  content: questionCommonContent_Props_Schema.extend({
    answers: z.object({
      correct: z.record(z.string(), primitiveContentBlockResolved_Schema),
      incorrect: z.record(z.string(), primitiveContentBlockResolved_Schema),
      distractors: z.record(z.string(), primitiveContentBlockResolved_Schema),
    }),
  }),
});
export type Question_SelectOneAnswer_Props = Omit<z.infer<typeof selectOneAnswer_Props_Schema>, 'content'> & {
  content: QuestionPublishedContent<ContentBlock_Primitive_Props> & {
    answers: {
      correct: Record<string, ContentBlock_Primitive_Props>;
      incorrect: Record<string, ContentBlock_Primitive_Props>;
      distractors: Record<string, ContentBlock_Primitive_Props>;
    };
  };
};
