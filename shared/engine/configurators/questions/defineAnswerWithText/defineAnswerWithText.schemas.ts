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
import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';

const questionBase = createQuestionBaseSchema('answerWithText');
const params = questionBase.shape.params;

export const answerWithText_Config_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({
    correctAnswers: z.record(z.string(), localizationSwitch.config).refine(value => Object.keys(value).length > 0),
    placeholder: localizationSwitch.config,
  }),
  content: questionCommonContent_Config_Schema,
});
export type Question_AnswerWithText_Config = z.infer<typeof answerWithText_Config_Schema>;

/** Only the authored Config metadata fields are independently overridable. */
export type Question_AnswerWithText_MetadataOverrides = QuestionMetadataOverrides<Question_AnswerWithText_Config>;
export const answerWithText_Override_Config_Schema: z.ZodType<Question_AnswerWithText_MetadataOverrides> =
  z.deepPartial(
    deepStrict_Schema(
      z.object({
        params: answerWithText_Config_Schema.shape.params,
        locale: answerWithText_Config_Schema.shape.locale,
      }),
    ),
  );

export const answerWithText_Props_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({ correctAnswers: z.array(localizationSwitch.props), placeholder: localizationSwitch.props }),
  content: questionCommonContent_Props_Schema,
});
export type Question_AnswerWithText_Props = Omit<z.infer<typeof answerWithText_Props_Schema>, 'content'> & {
  content: QuestionPublishedContent<ContentBlock_Props>;
};
