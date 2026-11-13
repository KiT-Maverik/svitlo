import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema } from '#schemas';
import { addUnifiedLocale } from '../../_shared__configurators';
import { contentBlockResolved_Schema } from '../../contentBlocks/contentBlock.schemas';
import type { ContentBlock_Props } from '../../contentBlocks';
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

const questionBase = createQuestionBaseSchema('answerWithNumber');
const params = questionBase.shape.params.extend({ correctAnswers: z.array(z.number()).min(1) });

export const answerWithNumber_Config_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({ placeholder: localizationSwitch.config }),
  content: questionCommonContent_Config_Schema,
});
export type Question_AnswerWithNumber_Config = z.infer<typeof answerWithNumber_Config_Schema>;

/** Only the authored Config metadata fields are independently overridable. */
export type Question_AnswerWithNumber_MetadataOverrides = QuestionMetadataOverrides<Question_AnswerWithNumber_Config>;
export const answerWithNumber_Override_Config_Schema: z.ZodType<Question_AnswerWithNumber_MetadataOverrides> =
  z.deepPartial(
    deepStrict_Schema(
      z.object({
        params: answerWithNumber_Config_Schema.shape.params,
        locale: answerWithNumber_Config_Schema.shape.locale,
      }),
    ),
  );

export const answerWithNumber_Props_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({ placeholder: localizationSwitch.props }),
  content: questionCommonContent_Props_Schema,
});
export type Question_AnswerWithNumber_Props = Omit<z.infer<typeof answerWithNumber_Props_Schema>, 'content'> & {
  content: QuestionPublishedContent<ContentBlock_Props>;
};
