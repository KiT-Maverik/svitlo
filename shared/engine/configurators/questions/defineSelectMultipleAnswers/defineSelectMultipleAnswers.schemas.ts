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
const authoredBlock = z.custom<ContentBlock_Configurator>(
  value => contentBlockConfigurator_Schema.safeParse(value).success,
);

const questionBase = createQuestionBaseSchema('selectMultipleAnswers');
const params = questionBase.shape.params;

export const selectMultipleAnswers_Config_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({}),
  content: questionCommonContent_Config_Schema.extend({ answers: z.object({
  correct: questionBlockCollection_Config_Schema,
  incorrect: questionBlockCollection_Config_Schema,
  distractors: questionBlockCollection_Config_Schema,
}) }),
});
export type Question_SelectMultipleAnswers_Config = z.infer<typeof selectMultipleAnswers_Config_Schema>;

/** Only the authored Config metadata fields are independently overridable. */
export type Question_SelectMultipleAnswers_MetadataOverrides = QuestionMetadataOverrides<Question_SelectMultipleAnswers_Config>;
export const selectMultipleAnswers_Override_Config_Schema: z.ZodType<Question_SelectMultipleAnswers_MetadataOverrides> = z.deepPartial(
  deepStrict_Schema(z.object({
    params: selectMultipleAnswers_Config_Schema.shape.params,
    locale: selectMultipleAnswers_Config_Schema.shape.locale,
  })),
);

export const selectMultipleAnswers_Props_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({}),
  content: questionCommonContent_Props_Schema.extend({ answers: z.object({
  correct: z.record(z.string(), contentBlockResolved_Schema),
  incorrect: z.record(z.string(), contentBlockResolved_Schema),
  distractors: z.record(z.string(), contentBlockResolved_Schema),
}) }),
});
export type Question_SelectMultipleAnswers_Props = Omit<z.infer<typeof selectMultipleAnswers_Props_Schema>, 'content'> & {
  content: QuestionPublishedContent<ContentBlock_Props> & { answers: {
    correct: Record<string, ContentBlock_Props>;
    incorrect: Record<string, ContentBlock_Props>;
    distractors: Record<string, ContentBlock_Props>;
  } };
};
