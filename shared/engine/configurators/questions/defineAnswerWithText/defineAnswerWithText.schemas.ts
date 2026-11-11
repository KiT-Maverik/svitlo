import { z } from 'zod';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators';
import type { ContentBlock_Configurator, ContentBlock_Props } from '../../contentBlocks';
import { contentBlockLocalizationSwitch as localizationSwitch } from '../../contentBlocks';
import { createQuestionBaseSchema, type QuestionContent } from '../question.schemas';

const questionBase = createQuestionBaseSchema('answerWithText');
const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
    correctAnswers: z.array(localizationSwitch[mode]),
    placeholder: localizationSwitch[mode],
});

/** The schema validates Question metadata; child blocks own their validation. */
export const answerWithText_Config_Schema = questionBase.extend(addUnifiedLocale(locale('config')));
export type Question_AnswerWithText_Config = z.infer<typeof answerWithText_Config_Schema> & {
  content: QuestionContent<ContentBlock_Configurator>;
};

export const answerWithText_Props_Schema = questionBase.extend(addUnifiedLocale(locale('props')));
export type Question_AnswerWithText_Props = z.infer<typeof answerWithText_Props_Schema> & {
  content: QuestionContent<ContentBlock_Props>;
};
