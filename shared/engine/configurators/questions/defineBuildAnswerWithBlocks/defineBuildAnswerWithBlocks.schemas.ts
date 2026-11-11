import { z } from 'zod';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators';
import type { ContentBlock_Configurator, ContentBlock_Props } from '../../contentBlocks';
import { contentBlockLocalizationSwitch as localizationSwitch } from '../../contentBlocks';
import { createQuestionBaseSchema, type QuestionContent } from '../question.schemas';

const questionBase = createQuestionBaseSchema('buildAnswerWithBlocks');
const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
    placeholder: localizationSwitch[mode],
});

/** The schema validates Question metadata; child blocks own their validation. */
export const buildAnswerWithBlocks_Config_Schema = questionBase.extend(addUnifiedLocale(locale('config')));
export type Question_BuildAnswerWithBlocks_Config = z.infer<typeof buildAnswerWithBlocks_Config_Schema> & {
  content: QuestionContent<ContentBlock_Configurator> & {
  correctSequence: [ContentBlock_Configurator, ...ContentBlock_Configurator[]]; distractors: ContentBlock_Configurator[];
};
};

export const buildAnswerWithBlocks_Props_Schema = questionBase.extend(addUnifiedLocale(locale('props')));
export type Question_BuildAnswerWithBlocks_Props = z.infer<typeof buildAnswerWithBlocks_Props_Schema> & {
  content: QuestionContent<ContentBlock_Props> & {
  correctSequence: [ContentBlock_Props, ...ContentBlock_Props[]]; distractors: ContentBlock_Props[];
};
};
