import { z } from 'zod';

import { createQuestionFields, questionBlockSwitch, questionLocalizationSwitch } from '../question.schemas';

function createAnswerWithTextSchema<Mode extends keyof typeof questionBlockSwitch>(mode: Mode) {
  const child = questionBlockSwitch[mode];
  const localized = questionLocalizationSwitch[mode];

  return z.strictObject({
    ...createQuestionFields('answerWithText', mode),
    correctAnswers: z.array(localized),
    placeholder: localized,
  });
}

export const answerWithText_Config_Schema = createAnswerWithTextSchema('config');
export type Question_AnswerWithText_Config = z.infer<typeof answerWithText_Config_Schema>;

export const answerWithText_Props_Schema = createAnswerWithTextSchema('props');
export type Question_AnswerWithText_Props = z.infer<typeof answerWithText_Props_Schema>;
