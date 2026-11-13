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
const authoredBlock = z.custom<ContentBlock_Configurator>(
  value => contentBlockConfigurator_Schema.safeParse(value).success,
);

const questionBase = createQuestionBaseSchema('fillBlanksWithBlocks');
const params = questionBase.shape.params;

export const fillBlanksWithBlocks_Config_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({ placeholder: localizationSwitch.config }),
  content: questionCommonContent_Config_Schema.extend({
    slots: z.object({
      items: z.record(z.string(), z.object({ correctAnswer: authoredBlock })),
      order: z.array(z.string()),
    }),
    distractors: questionBlockCollection_Config_Schema,
  }),
});
export type Question_FillBlanksWithBlocks_Config = z.infer<typeof fillBlanksWithBlocks_Config_Schema>;

/** Only the authored Config metadata fields are independently overridable. */
export type Question_FillBlanksWithBlocks_MetadataOverrides =
  QuestionMetadataOverrides<Question_FillBlanksWithBlocks_Config>;
export const fillBlanksWithBlocks_Override_Config_Schema: z.ZodType<Question_FillBlanksWithBlocks_MetadataOverrides> =
  z.deepPartial(
    deepStrict_Schema(
      z.object({
        params: fillBlanksWithBlocks_Config_Schema.shape.params,
        locale: fillBlanksWithBlocks_Config_Schema.shape.locale,
      }),
    ),
  );

export const fillBlanksWithBlocks_Props_Schema = questionBase.extend({
  params,
  ...addUnifiedLocale({ placeholder: localizationSwitch.props }),
  content: questionCommonContent_Props_Schema.extend({
    slots: z.array(z.object({ selector: z.string(), correctAnswer: contentBlockResolved_Schema })),
    distractors: z.array(contentBlockResolved_Schema),
  }),
});
export type Question_FillBlanksWithBlocks_Props = Omit<z.infer<typeof fillBlanksWithBlocks_Props_Schema>, 'content'> & {
  content: QuestionPublishedContent<ContentBlock_Props> & {
    slots: { selector: string; correctAnswer: ContentBlock_Props }[];
    distractors: ContentBlock_Props[];
  };
};
