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
import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';

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
    correctSequence: z.array(contentBlockResolved_Schema).min(1),
    distractors: z.array(contentBlockResolved_Schema),
  }),
});
export type Question_BuildAnswerWithBlocks_Props = Omit<
  z.infer<typeof buildAnswerWithBlocks_Props_Schema>,
  'content'
> & {
  content: QuestionPublishedContent<ContentBlock_Props> & {
    correctSequence: ContentBlock_Props[];
    distractors: ContentBlock_Props[];
  };
};
