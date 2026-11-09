import { z } from 'zod';

import { createQuestionFields, questionBlockSwitch, questionLocalizationSwitch } from '../question.schemas';

function createAnswerWithNumberSchema<Mode extends keyof typeof questionBlockSwitch>(mode: Mode) {
  const child = questionBlockSwitch[mode];
  const localized = questionLocalizationSwitch[mode];

  return z.strictObject({
    ...createQuestionFields('answerWithNumber', mode),
    correctAnswers: z.array(z.number()),
    placeholder: localized,
  });
}

export const answerWithNumber_Config_Schema = createAnswerWithNumberSchema('config');
export type Question_AnswerWithNumber_Config = z.infer<typeof answerWithNumber_Config_Schema>;

export const answerWithNumber_Props_Schema = createAnswerWithNumberSchema('props');
export type Question_AnswerWithNumber_Props = z.infer<typeof answerWithNumber_Props_Schema>;
