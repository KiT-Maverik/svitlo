import { z } from 'zod';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators';
import type { ContentBlock_Configurator, ContentBlock_Props } from '../../contentBlocks';
import { contentBlockLocalizationSwitch as localizationSwitch } from '../../contentBlocks';
import { createQuestionBaseSchema, type QuestionContent } from '../question.schemas';

const questionBase = createQuestionBaseSchema('answerWithNumber');
const params = questionBase.shape.params.extend({
  correctAnswers: z.array(z.number()),
});
const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  placeholder: localizationSwitch[mode],
});

/** The schema validates Question metadata; child blocks own their validation. */
export const answerWithNumber_Config_Schema = questionBase.extend({ params, ...addUnifiedLocale(locale('config')) });
export type Question_AnswerWithNumber_Config = z.infer<typeof answerWithNumber_Config_Schema> & {
  content: QuestionContent<ContentBlock_Configurator>;
};

export const answerWithNumber_Props_Schema = questionBase.extend({ params, ...addUnifiedLocale(locale('props')) });
export type Question_AnswerWithNumber_Props = z.infer<typeof answerWithNumber_Props_Schema> & {
  content: QuestionContent<ContentBlock_Props>;
};
