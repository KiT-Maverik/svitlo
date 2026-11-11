import { z } from 'zod';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators';
import type { ContentBlock_Configurator, ContentBlock_Props } from '../../contentBlocks';
import { contentBlockLocalizationSwitch as localizationSwitch } from '../../contentBlocks';
import { createQuestionBaseSchema, type QuestionContent } from '../question.schemas';

const questionBase = createQuestionBaseSchema('fillBlanksWithBlocks');
const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  placeholder: localizationSwitch[mode],
});

/** The schema validates Question metadata; child blocks own their validation. */
export const fillBlanksWithBlocks_Config_Schema = questionBase.extend(addUnifiedLocale(locale('config')));
export type Question_FillBlanksWithBlocks_Config = z.infer<typeof fillBlanksWithBlocks_Config_Schema> & {
  content: QuestionContent<ContentBlock_Configurator> & {
    slots: { selector: string; correctAnswer: ContentBlock_Configurator }[];
    distractors: ContentBlock_Configurator[];
  };
};

export const fillBlanksWithBlocks_Props_Schema = questionBase.extend(addUnifiedLocale(locale('props')));
export type Question_FillBlanksWithBlocks_Props = z.infer<typeof fillBlanksWithBlocks_Props_Schema> & {
  content: QuestionContent<ContentBlock_Props> & {
    slots: { selector: string; correctAnswer: ContentBlock_Props }[];
    distractors: ContentBlock_Props[];
  };
};
