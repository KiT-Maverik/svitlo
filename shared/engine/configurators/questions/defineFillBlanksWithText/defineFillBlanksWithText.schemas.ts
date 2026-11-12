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

const questionBase = createQuestionBaseSchema('fillBlanksWithText');
const params = questionBase.shape.params;

export const fillBlanksWithText_Config_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({ slots: z.record(z.string(), z.object({ correctAnswers: z.record(z.string(), localizationSwitch.config) })), placeholder: localizationSwitch.config }),
  content: questionCommonContent_Config_Schema,
});
export type Question_FillBlanksWithText_Config = z.infer<typeof fillBlanksWithText_Config_Schema>;

/** Only the authored Config metadata fields are independently overridable. */
export type Question_FillBlanksWithText_MetadataOverrides = QuestionMetadataOverrides<Question_FillBlanksWithText_Config>;
export const fillBlanksWithText_Override_Config_Schema: z.ZodType<Question_FillBlanksWithText_MetadataOverrides> = z.deepPartial(
  deepStrict_Schema(z.object({
    params: fillBlanksWithText_Config_Schema.shape.params,
    locale: fillBlanksWithText_Config_Schema.shape.locale,
  })),
);

export const fillBlanksWithText_Props_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({ slots: z.array(z.object({ selector: z.string(), correctAnswers: z.array(localizationSwitch.props) })), placeholder: localizationSwitch.props }),
  content: questionCommonContent_Props_Schema,
});
export type Question_FillBlanksWithText_Props = Omit<z.infer<typeof fillBlanksWithText_Props_Schema>, 'content'> & {
  content: QuestionPublishedContent<ContentBlock_Props>;
};
