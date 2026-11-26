import { z } from 'zod';

import { deepStrict_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { localizationSwitch, primitiveContentBlockResolved_Schema } from '../../contentBlocks/contentBlock.schemas';
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

export const buildAnswerWithBlocks_Props_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({ placeholder: localizationSwitch.props }),
  content: questionCommonContent_Props_Schema.extend({
    correctSequence: z.array(primitiveContentBlockResolved_Schema).min(1),
    distractors: z.array(primitiveContentBlockResolved_Schema),
  }),
});
export type Question_BuildAnswerWithBlocks_Props = Omit<
  z.infer<typeof buildAnswerWithBlocks_Props_Schema>,
  'content'
> & {
  content: QuestionPublishedContent<ContentBlock_Primitive_Props> & {
    correctSequence: ContentBlock_Primitive_Props[];
    distractors: ContentBlock_Primitive_Props[];
  };
};
