import { z } from 'zod';

import { deepStrict_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { localizationSwitch, primitiveContentBlockResolved_Schema } from '../../contentBlocks/contentBlock.schemas';
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

const questionBase = createQuestionBaseSchema('buildAnswerWithBlocks');
const params = questionBase.shape.params;

export const buildAnswerWithBlocks_Config_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({ placeholder: localizationSwitch.config }),
  content: questionCommonContent_Config_Schema.extend({
    correctSequence: questionBlockCollection_Config_Schema,
    distractors: questionBlockCollection_Config_Schema,
  }),
});
export type Question_BuildAnswerWithBlocks_Config = z.infer<typeof buildAnswerWithBlocks_Config_Schema>;

/** Only the authored Config metadata fields are independently overridable. */
export type Question_BuildAnswerWithBlocks_MetadataOverrides =
  QuestionMetadataOverrides<Question_BuildAnswerWithBlocks_Config>;
export const buildAnswerWithBlocks_Override_Config_Schema: z.ZodType<Question_BuildAnswerWithBlocks_MetadataOverrides> =
  z.deepPartial(
    deepStrict_Schema(
      z.object({
        params: buildAnswerWithBlocks_Config_Schema.shape.params,
        locale: buildAnswerWithBlocks_Config_Schema.shape.locale,
      }),
    ),
  );

export const buildAnswerWithBlocks_Data_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({ placeholder: localizationSwitch.data }),
  content: questionCommonContent_Data_Schema.extend({
    correctSequence: questionBlockCollection_Data_Schema.refine(group => group.children.length > 0, 'A correct sequence is required'),
    distractors: questionBlockCollection_Data_Schema,
  }),
});
export type Question_BuildAnswerWithBlocks_Data = Omit<z.infer<typeof buildAnswerWithBlocks_Data_Schema>, 'content'> & {
  content: QuestionPublishedContent<ContentBlock_Primitive_Data> & {
    correctSequence: QuestionPublishedContent<ContentBlock_Primitive_Data>['question'];
    distractors: QuestionPublishedContent<ContentBlock_Primitive_Data>['question'];
  };
};
