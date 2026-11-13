import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema } from '#schemas';
import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { contentBlockResolved_Schema } from '../../contentBlocks/contentBlock.schemas';
import type { ContentBlock_Props } from '../../contentBlocks/contentBlock.types';
import {
  createQuestionBaseSchema,
  questionBlockCollection_Config_Schema,
  questionCommonContent_Config_Schema,
  questionCommonContent_Props_Schema,
  type QuestionContent,
  type QuestionPublishedContent,
  type QuestionMetadataOverrides,
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
      correct: z.record(z.string(), contentBlockResolved_Schema),
      incorrect: z.record(z.string(), contentBlockResolved_Schema),
      distractors: z.record(z.string(), contentBlockResolved_Schema),
    }),
  }),
});
export type Question_SelectOneAnswer_Props = Omit<z.infer<typeof selectOneAnswer_Props_Schema>, 'content'> & {
  content: QuestionPublishedContent<ContentBlock_Props> & {
    answers: {
      correct: Record<string, ContentBlock_Props>;
      incorrect: Record<string, ContentBlock_Props>;
      distractors: Record<string, ContentBlock_Props>;
    };
  };
};
